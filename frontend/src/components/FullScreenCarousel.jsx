import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FullScreenCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  const slides = [
    {
      id: 1,
      title: "REDRAGON GAMING PERIPHERALS",
      subtitle: "Dominate Every Battle",
      description: "Professional-grade gaming gear trusted by esports champions",
      desktopImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      mobileImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "EXPLORE NOW",
      ctaLink: "/products"
    },
    {
      id: 2,
      title: "MECHANICAL KEYBOARDS",
      subtitle: "Every Keystroke Counts",
      description: "Precision mechanical switches for competitive gaming",
      desktopImage: "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      mobileImage: "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "VIEW KEYBOARDS",
      ctaLink: "/keyboards"
    },
    {
      id: 3,
      title: "RGB GAMING MICE",
      subtitle: "Pixel-Perfect Precision",
      description: "High-DPI sensors for unmatched accuracy",
      desktopImage: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      mobileImage: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "SHOP MICE",
      ctaLink: "/mice"
    },
    {
      id: 4,
      title: "GAMING HEADSETS",
      subtitle: "Immersive Audio Experience",
      description: "7.1 surround sound for competitive advantage",
      desktopImage: "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      mobileImage: "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "EXPLORE AUDIO",
      ctaLink: "/headsets"
    },
    {
      id: 5,
      title: "GAMING MONITORS",
      subtitle: "Ultra-Fast Refresh Rates",
      description: "144Hz and 240Hz displays for competitive edge",
      desktopImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      mobileImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "VIEW MONITORS",
      ctaLink: "/monitors"
    },
    {
      id: 6,
      title: "GAMING SETUPS",
      subtitle: "Complete Battle Stations",
      description: "Everything you need for the ultimate gaming experience",
      desktopImage: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      mobileImage: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "BUILD YOUR SETUP",
      ctaLink: "/gaming-setups"
    },
    {
      id: 7,
      title: "EXCLUSIVE DEALS",
      subtitle: "Limited Time Offers",
      description: "Premium gaming gear at unbeatable prices",
      desktopImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      mobileImage: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ctaText: "SHOP DEALS",
      ctaLink: "/deals"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];
  const isMobile = windowSize.width < 768;

  return (
    <div className="relative w-full overflow-hidden" style={{ height: isMobile ? '70vh' : '100vh' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={isMobile ? currentSlide.mobileImage : currentSlide.desktopImage}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
              style={{
                objectPosition: 'center',
                width: windowSize.width,
                height: isMobile ? '70vh' : windowSize.height
              }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="max-w-3xl">
                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-red-500 font-black text-sm sm:text-base md:text-lg mb-4 tracking-widest uppercase"
                >
                  {currentSlide.subtitle}
                </motion.p>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                >
                  {currentSlide.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 font-medium"
                >
                  {currentSlide.description}
                </motion.p>

                {/* CTA Button */}
                <motion.a
                  href={currentSlide.ctaLink}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-none font-black text-base sm:text-lg tracking-wider uppercase shadow-2xl transition-all group"
                >
                  {currentSlide.ctaText}
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Desktop Only */}
      <div className="hidden md:block">
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-red-600 text-white border border-white/20 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-red-600 text-white border border-white/20 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentIndex
                ? 'w-12 h-1.5 bg-red-600'
                : 'w-8 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-30 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/20">
        <span className="text-white font-bold text-sm">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default FullScreenCarousel;
