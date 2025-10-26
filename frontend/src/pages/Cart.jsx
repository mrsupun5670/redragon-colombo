import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Shield,
  Truck,
  CreditCard,
  Tag,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ErrorPopup from "../components/common/ErrorPopup";
import SuccessPopup from "../components/common/SuccessPopup";
import CartContext from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    loading,
    error,
    cartSubtotal,
    shippingCost,
    cartTotal,
    cartItemCount,
    isFreeShippingEligible,
    amountForFreeShipping,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useContext(CartContext);
  
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [success, setSuccess] = useState(null);
  const [popupError, setPopupError] = useState(null);

  // Calculate final total with discount
  const finalTotal = cartTotal - discount;

  // Handle quantity updates
  const handleUpdateQuantity = async (productId, change) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      await updateQuantity(productId, newQuantity);
    }
  };

  // Handle item removal
  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  // Apply promo code
  const applyPromo = () => {
    if (promoCode.toUpperCase() === "REDRAGON10") {
      setDiscount(cartSubtotal * 0.1);
      setSuccess("Promo code applied! 10% discount");
    } else if (promoCode) {
      setPopupError("Invalid promo code");
    }
  };
  
  const handleCheckoutClick = () => {
      navigate("/checkout");
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* <DevelopmentWatermark /> */}
      <Navbar />

      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 pt-24 pb-12 border-b-4 border-red-700">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                  Shopping Cart
                </h1>
              </div>
              <p className="text-white/90 font-semibold">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05, x: -5 }}
              className="hidden md:flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-black uppercase text-sm shadow-xl hover:shadow-2xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {cartItems.length === 0 ? (
          // Empty Cart
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full items-center justify-center mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some awesome gaming gear to get started!
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-black uppercase shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Shop Now
            </motion.a>
          </motion.div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 border-gray-100 hover:border-red-500/20"
                  >
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="w-full sm:w-32 h-32 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border-2 border-gray-200 cursor-pointer hover:border-red-500 transition-colors"
                        >
                          <img
                            src={item.images[0].image_path ? item.images[0].image_path : "/image_not_there.avif"}
                            alt={item.name}
                            className="w-full h-full object-contain p-3"
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="font-bold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2 cursor-pointer hover:text-red-600 transition-colors"
                          >
                            {item.name}
                          </h3>
                          {item.brand_name && (
                            <div className="flex items-center gap-2 mb-3">
                              <Shield className="w-4 h-4 text-red-500" />
                              <span className="text-xs text-gray-600 font-semibold">
                                {item.brand_name} • 1 Year Warranty
                              </span>
                            </div>
                          )}
                          <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                            Rs. {parseFloat(item.sale_price || item.price).toLocaleString()}
                            {item.sale_price && parseFloat(item.sale_price) < parseFloat(item.price) && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                Rs. {parseFloat(item.price).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                          {/* Quantity Control */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="w-8 h-8 bg-gray-100 hover:bg-red-500 text-gray-700 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <div className="w-12 h-8 bg-gray-50 rounded-lg flex items-center justify-center font-black text-gray-900">
                              {item.quantity}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="w-8 h-8 bg-gray-100 hover:bg-red-500 text-gray-700 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="bg-gradient-to-r from-gray-50 to-white px-4 sm:px-6 py-3 border-t-2 border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-600">
                          Item Total
                        </span>
                        <span className="text-lg font-black text-gray-900">
                          Rs. {(parseFloat(item.sale_price || item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Promo Code Section - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:hidden bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-red-500" />
                  <h3 className="font-black text-gray-900">Promo Code</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-red-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-semibold"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyPromo}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-black uppercase text-sm shadow-lg"
                  >
                    Apply
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 sticky top-24"
              >
                <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase">
                  Order Summary
                </h2>

                {/* Free Shipping Progress */}
                {!isFreeShippingEligible && amountForFreeShipping > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-700">
                        Add Rs. {amountForFreeShipping.toLocaleString()} more for FREE shipping!
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${Math.min((cartSubtotal / 15000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">Subtotal</span>
                    <span className="font-black text-gray-900">
                      Rs. {cartSubtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">                   
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-semibold">Discount</span>
                      <span className="font-black text-green-600">
                        - Rs. {discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-black text-gray-900">Total</span>
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Promo Code - Desktop */}
                <div className="hidden lg:block mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-red-500" />
                    <h3 className="font-black text-gray-900 text-sm">Promo Code</h3>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 bg-gray-50 border-2 border-gray-200 focus:border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all text-sm font-semibold"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={applyPromo}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-black uppercase text-xs shadow-lg"
                    >
                      Apply
                    </motion.button>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                onClick={handleCheckoutClick}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all mb-4"
                >
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </span>
                </motion.button>

                {/* Trust Badges */}
                <div className="space-y-3 pt-4 border-t-2 border-gray-100">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-semibold">
                      100% Genuine Products
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-semibold">
                      Free shipping over Rs. 15,000
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="font-semibold">
                      Secure Payment Gateway
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
      <ErrorPopup message={popupError} onClose={() => setPopupError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default Cart;
