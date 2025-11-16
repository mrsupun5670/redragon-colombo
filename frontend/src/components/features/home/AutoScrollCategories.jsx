import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const AutoScrollCategories = ({ categories }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { width } = useWindowDimensions();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  // Manual scroll
  const handleManualScroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    setIsPaused(true);

    const scrollAmount = 250;
    if (direction === 'left') {
      scrollContainer.scrollLeft -= scrollAmount;
    } else {
      scrollContainer.scrollLeft += scrollAmount;
    }
  };

  // Continuous scrolling loop
  useEffect(() => {
    if (isPaused) return;
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame;

    const autoScroll = () => {
      scrollContainer.scrollLeft += 1.2; // speed
      // If we reach the end of first list, snap back smoothly
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <div className="relative w-full overflow-hidden py-4">

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* REAL CATEGORIES LIST */}
        {categories.map((category, index) => (
          <motion.div
            key={`${category.name}-${index}`}
            className="flex-shrink-0 w-40 group cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-red-500/50 shadow-lg hover:shadow-red-500/20">
              <div className="relative h-32 overflow-hidden bg-gray-900/50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-white text-center uppercase tracking-wide">
                  {category.name}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}

        {/* GHOST COPY (INVISIBLE) - For seamless scroll */}
        {categories.map((category, index) => (
          <div key={`ghost-${index}`} className="w-40 opacity-0 pointer-events-none" />
        ))}
      </div>

      {/* Left / Right Manual Buttons */}
      <button
        onClick={() => handleManualScroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-20 shadow-lg focus:outline-none"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => handleManualScroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-20 shadow-lg focus:outline-none"
      >
        <ChevronRight size={24} />
      </button>

      {/* Fading edges */}
    </div>
  );
};

export default AutoScrollCategories;
