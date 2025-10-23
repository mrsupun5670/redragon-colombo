import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { getOptimizedImageUrl, handleImageError, getAspectRatioStyle } from "../../utils/imageUtils";
import CartContext from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const productImage = getOptimizedImageUrl(product, 'card');
  const productPrice = product.sale_price || product.price;
  const originalPrice = product.price;
  const hasDiscount =
    product.sale_price &&
    parseFloat(product.sale_price) < parseFloat(product.price);
  const rating = product.rating || 4; // Default rating
  const reviews = product.reviews || 0; // Default reviews

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (isAddingToCart || product.stock_quantity <= 0) return;
    
    try {
      setIsAddingToCart(true);
      await addToCart(product, 1);
      
      // Show success feedback (you could add a toast notification here)
      console.log('Added to cart:', product.name);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Show error feedback
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-64 object-cover bg-gray-700"
          style={getAspectRatioStyle('1/1')}
          onError={handleImageError}
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
        <div className="text-xs text-gray-400 mb-1">{product.brand_name}</div>
        <h3 className="text-lg font-bold text-white mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-current" : ""}`}
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
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stock_quantity <= 0}
            className={`rounded-lg flex items-center justify-center p-2 sm:flex-1 sm:px-2 sm:py-1 sm:gap-1 transition-colors ${
              product.stock_quantity <= 0
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : isAddingToCart
                ? 'bg-orange-500 text-white'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline text-xs sm:text-sm font-semibold">
              {isAddingToCart 
                ? 'Adding...' 
                : product.stock_quantity <= 0 
                ? 'Out of Stock' 
                : 'Add to Cart'
              }
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-gray-700 text-white px-1 py-1 sm:px-2 sm:py-1 rounded-lg text-xs sm:text-sm font-semibold"
          >
            Buy Now
          </motion.button>
        </div>
        <div className="mt-4 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
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
