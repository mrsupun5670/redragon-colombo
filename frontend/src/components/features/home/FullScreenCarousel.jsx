import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import CustomPagination from './CustomPagination';


const slides = [
  {
    image: 'https://images.unsplash.com/photo-1587831990711-23d7e4a6453b?q=80&w=3270&auto=format&fit=crop',
    title: 'Ultimate Gaming Experience',
    subtitle: 'High-performance PCs for the dedicated gamer.',
    position: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1598992645182-2c62a4452488?q=80&w=3270&auto=format&fit=crop',
    title: 'Precision Engineered Keyboards',
    subtitle: 'Mechanical keyboards for unmatched speed and accuracy.',
    position: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983d34?q=80&w=3270&auto=format&fit=crop',
    title: 'Crystal Clear Audio',
    subtitle: 'Immersive headsets to hear every detail.',
    position: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=3270&auto=format&fit=crop',
    title: 'Next-Gen Graphics Cards',
    subtitle: 'Experience games in stunning 8K resolution.',
    position: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=3270&auto=format&fit=crop',
    title: 'Ergonomic Gaming Mice',
    subtitle: 'Designed for comfort and precision in the heat of battle.',
    position: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=3270&auto=format&fit=crop',
    title: 'Custom PC Builds',
    subtitle: 'Tailor-made systems to match your gaming style.',
    position: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=3270&auto=format&fit=crop',
    title: 'Liquid Cooling Solutions',
    subtitle: 'Keep your system cool under pressure for maximum performance.',
    position: 'center',
  },
];

const FullScreenCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-screen">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[EffectFade, Autoplay, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full fullscreen-carousel"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
                <AnimatePresence>
                  {index === activeIndex && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="max-w-2xl p-8"
                    >
                      <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-lg">
                        {slide.title}
                      </h1>
                      <p className="text-xl md:text-2xl font-semibold mt-4 text-gray-300 drop-shadow-md">
                        {slide.subtitle}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <CustomPagination slides={slides} activeIndex={activeIndex} />
    </div>
  );
};

export default FullScreenCarousel;
