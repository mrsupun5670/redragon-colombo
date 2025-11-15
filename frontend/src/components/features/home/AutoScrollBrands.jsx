import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

const AutoScrollBrands = ({ brands }) => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { width } = useWindowDimensions();

  const handleBrandClick = (brandName) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  const handleManualScroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      setIsPaused(true);
      const scrollAmount = 300;
      scrollContainer.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scroll = () => {
      scrollContainer.scrollLeft += 1.5; // scroll speed

      // **IF SCROLL END REACHED → RESET TO START**
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {brands.map((brand, index) => (
  <motion.div
    key={`${brand.name}-${index}`}
    className="flex-shrink-0 w-45 group cursor-pointer"
    whileHover={{ scale: 1.15 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={() => handleBrandClick(brand.name)}
  >
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 
      border border-gray-200 group-hover:border-red-500
      shadow-md group-hover:shadow-xl group-hover:shadow-red-500/20
      p-6 h-32 flex items-center justify-center relative"
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="object-contain transition-all duration-300 
          group-hover:scale-125 group-hover:object-cover"
        style={{ maxHeight: '80px' }}
      />
      
      {/* Optional subtle gradient highlight */}
      <div className="absolute inset-0 pointer-events-none opacity-0 
        group-hover:opacity-20 transition-all duration-300
        bg-gradient-to-br from-white via-transparent to-transparent"
      />
    </div>
  </motion.div>
))}

      </div>

      {/* Buttons */}
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

      </div>
  );
};

export default AutoScrollBrands;
