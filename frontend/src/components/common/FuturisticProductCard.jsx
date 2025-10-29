import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, ShoppingCart, Eye } from 'lucide-react';
import { getOptimizedImageUrl, handleImageError, getAspectRatioStyle } from '../../utils/imageUtils';

const FuturisticProductCard = ({ product, showCategory = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);


  const handleProductClick = (e) => {
    // Prevent navigation if clicking on buttons
    if (e?.target?.closest('button')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-full h-full"
      style={{ perspective: '1000px' }}
    >
      {/* Main Card with 3D Transform */}
      <motion.div
        animate={isHovered ? { rotateY: 5, rotateX: -5 } : { rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
             style={{ padding: '2px' }}>
          <div className="absolute inset-[2px] bg-white rounded-2xl" />
        </div>

        {/* Product Image Section */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
          {/* Sliding Background Pattern */}
          <motion.div
            animate={isHovered ? { x: [0, 100], y: [0, 100] } : { x: 0, y: 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #ef4444 0, #ef4444 1px, transparent 0, transparent 50%)`,
              backgroundSize: '10px 10px'
            }}
          />

          {/* Product Image with 3D Effect */}
          <motion.div
            animate={isHovered ? { scale: 1.15, z: 50 } : { scale: 1, z: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => handleProductClick(e)}
            className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src={getOptimizedImageUrl(product, 'card')}
              alt={product.name}
              className="w-full h-full object-contain relative z-10"
              style={getAspectRatioStyle('1/1')}
              onError={handleImageError}
            />

            {/* 3D Shadow Layer */}
            <motion.div
              animate={isHovered ? { scale: 1.15, opacity: 0.3 } : { scale: 1, opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-2xl"
              style={{ transform: 'translateZ(-50px)' }}
            />
          </motion.div>

          {/* Sliding Light Effect */}
          <motion.div
            animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          />

          {/* Category Badge - Slide in from top */}
          {showCategory && product.category && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg"
            >
              {product.category}
            </motion.div>
          )}

          {/* Quick View Button - Slide in from right */}
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={isHovered ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={handleProductClick}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors z-20"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Product Info Section with Sliding Content */}
        <div className="relative p-4 sm:p-5 flex-1 flex flex-col bg-white z-10">
          {/* Product Name - Slide up */}
          <motion.h3
            animate={isHovered ? { y: -5 } : { y: 0 }}
            onClick={handleProductClick}
            className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base min-h-[40px] sm:min-h-[48px] group-hover:text-red-600 transition-colors cursor-pointer"
          >
            {product.name}
          </motion.h3>

          {/* Rating & Reviews - Fade in */}
          <motion.div
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: -5 }}
            className="flex items-center gap-2 mb-3"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Star
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                      i < product.rating
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-gray-500 font-semibold">
              ({product.reviews?.toLocaleString() || product.soldCount})
            </span>
          </motion.div>

          {/* Price Section with 3D Effect */}
          <div className="flex items-end justify-between mb-4 mt-auto">
            <motion.div
              animate={isHovered ? { scale: 1.05, x: 5 } : { scale: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price</div>
              <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                Rs. {product.price.toLocaleString()}
              </div>
            </motion.div>

            {/* Warranty Badge - Slide in */}
            {product.warranty && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={isHovered ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-lg"
              >
                <Shield className="w-3 h-3 text-red-500" />
                <span className="font-semibold hidden sm:inline">{product.warranty}</span>
              </motion.div>
            )}
          </div>

          {/* Divider with Sliding Effect */}
          <motion.div
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0.5 }}
            transition={{ duration: 0.4 }}
            className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent mb-4 origin-center"
          />

     
        </div>

        {/* 3D Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating particles effect */}
        <motion.div
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                bottom: '20%',
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FuturisticProductCard;
