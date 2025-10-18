import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const AutoScrollCategories = ({ categories }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isPaused) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 160; // Width of each card
    const gap = 24; // Gap between cards (gap-6 = 24px)
    const itemWidth = cardWidth + gap;

    let timeout;
    let scrollTimeout;

    const scrollToNext = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        // Reset to 0 when we reach the end of the first set of categories
        if (nextIndex >= categories.length) {
          // Jump instantly to the start without animation
          setTimeout(() => {
            if (scrollContainer) {
              scrollContainer.style.scrollBehavior = 'auto';
              scrollContainer.scrollLeft = 0;
              setTimeout(() => {
                scrollContainer.style.scrollBehavior = 'smooth';
              }, 50);
            }
          }, 0);
          return 0;
        }

        return nextIndex;
      });
    };

    // Scroll to the current position
    scrollTimeout = setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.style.scrollBehavior = 'smooth';
        scrollContainer.scrollLeft = currentIndex * itemWidth;
      }

      // Wait 2 seconds before scrolling to next item
      timeout = setTimeout(scrollToNext, 2000);
    }, 100);

    return () => {
      clearTimeout(timeout);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, isPaused, categories.length]);

  // Duplicate categories for seamless loop
  const duplicatedCategories = [...categories, ...categories];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedCategories.map((category, index) => (
          <motion.div
            key={`${category.name}-${index}`}
            className="flex-shrink-0 w-40 group cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.location.href = `/products?category=${category.name}`}
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
      </div>

      {/* Gradient overlays for seamless edges */}
      <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-800 to-transparent pointer-events-none z-10 ${width < 768 ? 'hidden' : ''}`} />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default AutoScrollCategories;
