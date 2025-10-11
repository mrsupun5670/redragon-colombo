/**
 * PRODUCT CARD COMPONENT - Individual Product Display
 *
 * PURPOSE:
 *   - Display single product in a grid/list layout
 *   - Show product image, name, price, rating
 *   - Add to cart button
 *
 * PROPS:
 *   - product: { id, name, price, image, rating, stock }
 *
 * WHAT TO INCLUDE:
 *   - Product image (clickable to detail page)
 *   - Product name
 *   - Price (formatted with currency)
 *   - Rating stars (optional)
 *   - Stock status (In Stock / Out of Stock)
 *   - Add to Cart button
 *   - Quick view icon (optional)
 *
 * STYLING:
 *   - Card: White background, shadow on hover
 *   - Image: 1:1 aspect ratio, hover zoom effect
 *   - Button: Red background, full width
 *   - Border radius: rounded-lg
 *
 * INTERACTIONS:
 *   - Click image/name → Navigate to product detail
 *   - Click Add to Cart → Add item to cart context
 *   - Hover → Elevate card, show quick actions
 *
 * RELATED FILES:
 *   - Cart Context: src/context/CartContext.js
 *   - Product Detail Page: src/pages/ProductDetail.js
 */

import React from 'react';

const ProductCard = ({ product }) => {
  // TODO: Connect to CartContext for add to cart functionality
  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    // Future: dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <a href={`/product/${product.id}`}>
          <img
            src={product.image || '/images/products/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </a>

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Out of Stock
          </div>
        )}

        {/* Sale Badge (if on sale) */}
        {product.salePrice && (
          <div className="absolute top-2 left-2 bg-redragon-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">

        {/* Product Name */}
        <a href={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-redragon-600 transition duration-200 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </a>

        {/* Rating (Optional - Static for now) */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.salePrice ? (
              <div>
                <span className="text-lg font-bold text-redragon-600">
                  Rs. {product.salePrice.toLocaleString()}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold transition duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-redragon-600 hover:bg-redragon-700 text-white shadow-red'
          }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
