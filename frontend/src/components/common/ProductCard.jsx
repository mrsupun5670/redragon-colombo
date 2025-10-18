import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 ml-2 text-sm">
            ({product.reviews} reviews)
          </span>
        </div>
        <p className="text-red-500 font-bold text-2xl mb-4">
          Rs. {product.price.toLocaleString()}
        </p>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white rounded-lg flex items-center justify-center p-2 sm:flex-1 sm:px-2 sm:py-1 sm:gap-1"
          >
            <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline text-xs sm:text-sm font-semibold">Add to Cart</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gray-700 text-white px-1 py-1 sm:px-2 sm:py-1 rounded-lg text-xs sm:text-sm font-semibold"
          >
            Buy Now
          </motion.button>
        </div>
        <div className="mt-4 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-400 hover:text-white font-bold flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Add to Watchlist
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
