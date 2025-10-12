import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Award, TrendingUp, Sparkles } from 'lucide-react';

const ModernCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      title: "ULTIMATE GAMING EXPERIENCE",
      subtitle: "Next-Gen RGB Peripherals",
      description: "Elevate your gameplay with premium mechanical keyboards, ultra-responsive mice, and immersive audio",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Explore Collection",
      badge: "NEW",
      discount: "UP TO 40% OFF",
      gradient: "from-red-600/90 via-orange-600/80 to-red-700/90",
      icon: Sparkles
    },
    {
      id: 2,
      title: "PRECISION MEETS PERFORMANCE",
      subtitle: "Mechanical Keyboards",
      description: "Experience the perfect keystroke with our premium mechanical switches and RGB backlighting",
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Shop Keyboards",
      badge: "BESTSELLER",
      discount: "SAVE 35%",
      gradient: "from-red-500/90 via-orange-500/80 to-yellow-600/90",
      icon: Award
    },
    {
      id: 3,
      title: "DOMINATE THE BATTLEFIELD",
      subtitle: "High-DPI Gaming Mice",
      description: "Ultra-precise tracking and customizable buttons for competitive gaming advantage",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "Discover Mice",
      badge: "TRENDING",
      discount: "LIMITED OFFER",
      gradient: "from-red-600/90 via-orange-500/80 to-yellow-500/90",
      icon: TrendingUp
    },
    {
      id: 4,
      title: "IMMERSIVE AUDIO QUALITY",
      subtitle: "Gaming Headsets",
      description: "Crystal clear sound and premium comfort for extended gaming sessions",
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      cta: "View Headsets",
      badge: "HOT DEAL",
      discount: "30% OFF",
      gradient: "from-green-600/90 via-emerald-500/80 to-teal-500/90",
      icon: Zap
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return slides.length - 1;
      if (nextIndex >= slides.length) return 0;
      return nextIndex;
    });
  };

  const currentSlide = slides[currentIndex];
  const Icon = currentSlide.icon;

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl overflow-hidden shadow-2xl group">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            rotateY: { duration: 0.6 }
          }}
          className="absolute inset-0 flex items-center"
          style={{ perspective: '1200px' }}
        >
          {/* Background Image with 3D Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${currentSlide.gradient} mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-xl">
                  <Icon className="w-4 h-4 text-yellow-300" />
                  <span className="text-white font-black text-sm tracking-wider">{currentSlide.badge}</span>
                </div>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full shadow-xl animate-pulse">
                  <span className="text-white font-black text-sm tracking-wider">{currentSlide.discount}</span>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight tracking-tight drop-shadow-2xl"
                style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
              >
                {currentSlide.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-2xl md:text-4xl font-bold text-yellow-300 mb-6"
                style={{ textShadow: '0 5px 20px rgba(0,0,0,0.4)' }}
              >
                {currentSlide.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
              >
                {currentSlide.description}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-white text-gray-900 rounded-2xl font-black text-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {currentSlide.cta}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>

          {/* 3D Product Preview (Right Side) */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 10, 0],
                rotateZ: [0, 5, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent blur-3xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-2xl flex items-center justify-center border border-white/40 shadow-xl transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-7 h-7 text-white" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-2xl flex items-center justify-center border border-white/40 shadow-xl transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-7 h-7 text-white" />
      </motion.button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`relative overflow-hidden rounded-full transition-all ${
              index === currentIndex
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
          >
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-30 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-xl">
        <span className="text-white font-bold text-sm">
          {currentIndex + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
};

export default ModernCarousel;
