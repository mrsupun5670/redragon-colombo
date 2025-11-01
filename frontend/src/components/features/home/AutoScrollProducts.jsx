import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import ProductCard from '../../common/ProductCard.jsx';

const AutoScrollProducts = memo(({ products, bg_color }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();

  const { cardWidth, gap } = useMemo(() => ({
    cardWidth: width < 768 ? 250 : 300,
    gap: width < 768 ? 16 : 24
  }), [width]);
  
  useEffect(() => {
    if (isPaused || products.length === 0) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const itemWidth = cardWidth + gap;

    let timeout;
    let scrollTimeout;

    const scrollToNext = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= products.length) {
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

    scrollTimeout = setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.style.scrollBehavior = 'smooth';
        scrollContainer.scrollLeft = currentIndex * itemWidth;
      }

      timeout = setTimeout(scrollToNext, 2000);
    }, 100);

    return () => {
      clearTimeout(timeout);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, isPaused, products.length, cardWidth, gap]);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className={`flex-shrink-0 ${width < 768 ? 'w-64' : 'w-72'} group cursor-pointer`}
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r ${bg_color} to-transparent pointer-events-none z-10 ${width < 768 ? 'hidden' : ''}`} />
      <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l ${bg_color} to-transparent pointer-events-none z-10`} />
    </div>
  );
});

AutoScrollProducts.displayName = 'AutoScrollProducts';

export default AutoScrollProducts;