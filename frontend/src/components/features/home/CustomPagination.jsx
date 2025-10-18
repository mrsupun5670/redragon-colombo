import React from 'react';
import { motion } from 'framer-motion';

const CustomPagination = ({ slides, activeIndex }) => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-10">
      {slides.map((_, index) => (
        <div key={index} className="w-8 h-1 md:w-12 md:h-2 bg-white/30 rounded-sm overflow-hidden">
          {index === activeIndex && (
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomPagination;
