import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  // Handle different data sources (database vs static data)
  const productImage = product.image || product.primary_image || 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80';
  const productPrice = product.sale_price || product.price;
  const originalPrice = product.price;
  const hasDiscount = product.sale_price && parseFloat(product.sale_price) < parseFloat(product.price);
  const rating = product.rating || 4; // Default rating
  const reviews = product.reviews || 0; // Default reviews
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-60 object-cover"
        />
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            SALE
          </div>
        )}
        {product.is_new_arrival && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
            NEW
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <div className="text-xs text-gray-400 mb-1">
          {product.brand_name}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "fill-current" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 ml-2 text-sm">
            ({reviews} reviews)
          </span>
        </div>
        <div className="mb-4">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <p className="text-red-500 font-bold text-xl">
                Rs. {parseFloat(productPrice).toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm line-through">
                Rs. {parseFloat(originalPrice).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-red-500 font-bold text-xl">
              Rs. {parseFloat(productPrice).toLocaleString()}
            </p>
          )}
        </div>
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
