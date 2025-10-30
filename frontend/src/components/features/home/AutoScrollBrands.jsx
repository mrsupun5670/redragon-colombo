import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const AutoScrollBrands = ({ brands }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();

  const handleBrandClick = (brandName) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  useEffect(() => {
    if (isPaused) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 180; // Width of each brand card
    const gap = 24; // Gap between cards (gap-6 = 24px)
    const itemWidth = cardWidth + gap;

    let timeout;
    let scrollTimeout;

    const scrollToNext = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        // Reset to 0 when we reach the end of the first set of brands
        if (nextIndex >= brands.length) {
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

      // Wait 2.5 seconds before scrolling to next brand
      timeout = setTimeout(scrollToNext, 2500);
    }, 100);

    return () => {
      clearTimeout(timeout);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, isPaused, brands.length]);

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedBrands.map((brand, index) => (
          <motion.div
            key={`${brand.name}-${index}`}
            className="flex-shrink-0 w-45 group cursor-pointer"
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleBrandClick(brand.name)}
          >
            <div className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 border-2 border-gray-200 hover:border-red-500 p-6 h-32 flex items-center justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
                style={{ width: 'auto', height: 'auto', maxHeight: '80px' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays for seamless edges */}
      <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10 ${width < 768 ? 'hidden' : ''}`} />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default AutoScrollBrands;
