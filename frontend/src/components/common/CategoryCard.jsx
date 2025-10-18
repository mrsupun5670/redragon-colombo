import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <a href={`/products?category=${category.name}`}>
        <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-bold text-white text-center uppercase">{category.name}</h3>
        </div>
      </a>
    </motion.div>
  );
};

export default CategoryCard;
