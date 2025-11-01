import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Share2,
  Eye,
  Package,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ParticleEffect from "../components/common/ParticleEffect";
import DevelopmentWatermark from "../components/common/DevelopmentWatermark";
import FuturisticProductCard from "../components/common/FuturisticProductCard";
import ErrorPopup from "../components/common/ErrorPopup";
import SuccessPopup from "../components/common/SuccessPopup";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../hooks/useCart";
import { wishlistAPI } from "../services/api";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addToCart: addToCartContext } = useCart();

  // Load wishlist on component mount
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        
        if (isAuthenticated) {
          // Authenticated user - load from database
          const response = await wishlistAPI.getWishlist();
          if (response.data.success) {
            setWishlistItems(response.data.data.items || []);
          } else {
            setWishlistItems([]);
          }
        } else {
          // Guest user - load from localStorage
          const guestWishlist = JSON.parse(localStorage.getItem('guest_wishlist')) || [];
          setWishlistItems(guestWishlist);
        }
      } catch (error) {
        setError('Failed to load wishlist');
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [isAuthenticated]);

  // Remove from wishlist
  const removeFromWishlist = async (id) => {
    try {
      if (isAuthenticated) {
        // Authenticated user - remove from database
        const response = await wishlistAPI.removeFromWishlist(id);
        if (response.data.success) {
          const updatedItems = wishlistItems.filter((item) => item.id !== id);
          setWishlistItems(updatedItems);
          setSuccess('Product removed from wishlist!');
        } else {
          setError('Failed to remove product from wishlist');
        }
      } else {
        // Guest user - remove from localStorage
        const updatedItems = wishlistItems.filter((item) => item.id !== id);
        setWishlistItems(updatedItems);
        localStorage.setItem('guest_wishlist', JSON.stringify(updatedItems));
        setSuccess('Product removed from wishlist!');
      }
      
      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      setError('Failed to remove product from wishlist');
    }
  };

  // Add to cart
  const addToCart = async (product) => {
    try {
      await addToCartContext(product, 1);
      setSuccess(`${product.name} added to cart!`);
    } catch (error) {
      setError(error.message || 'Failed to add product to cart');
    }
  };

  // Share wishlist (placeholder)
  const shareWishlist = () => {
    setError("Wishlist sharing feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* <DevelopmentWatermark /> */}
      <ParticleEffect />
      <Navbar />

      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 pt-24 pb-12 border-b-4 border-red-700 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                  My Wishlist
                </h1>
              </div>
              <p className="text-white/90 font-semibold">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareWishlist}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-white/30 transition-all border-2 border-white/30"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </motion.button>

              <motion.a
                href="/"
                whileHover={{ scale: 1.05, x: -5 }}
                className="hidden md:flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-xl font-black uppercase text-sm shadow-xl hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          // Loading State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full items-center justify-center mb-6 animate-pulse">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">
              Loading your wishlist...
            </h2>
            <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </motion.div>
        ) : wishlistItems.length === 0 ? (
          // Empty Wishlist
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full items-center justify-center mb-6">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding products you love to keep track of them!
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-black uppercase shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Discover Products
            </motion.a>
          </motion.div>
        ) : (
          <>
            {/* Wishlist Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                    {wishlistItems.length}
                  </div>
                  <div className="text-sm font-bold text-gray-600 uppercase">
                    Items
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                    Rs. {wishlistItems.reduce((sum, item) => sum + (parseFloat(item.sale_price || item.price) || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm font-bold text-gray-600 uppercase">
                    Total Value
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-green-600">
                    {wishlistItems.filter(item => item.stock_quantity > 0).length}
                  </div>
                  <div className="text-sm font-bold text-gray-600 uppercase">
                    In Stock
                  </div>
                </div>
                
              </div>
            </motion.div>

            {/* Wishlist Items Grid */}
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors border-2 border-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>

                    {/* Product Card */}
                    <div className="h-full">
                      <FuturisticProductCard product={item} showCategory />
                    </div>

                    {/* Quick Actions Overlay */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-20 left-0 right-0 mx-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-3 opacity-0 group-hover:opacity-100 transition-all z-10 border-2 border-red-500/20"
                    >
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCartContext(item, 1)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-1 shadow-lg"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Add
                        </motion.button>
                        <motion.a
                          href={`/product/${item.id}`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </motion.a>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* Recommendations Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full items-center justify-center mb-4"
                >
                  <Package className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 uppercase tracking-tight">
                  You Might Also{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                    Like
                  </span>
                </h2>
                <p className="text-gray-600 font-semibold">
                  More awesome products to add to your wishlist
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-16 mt-12 border-t-4 border-red-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Heart className="w-16 h-16 text-white mx-auto mb-6 fill-white" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
              Found Your Perfect Setup?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-semibold">
              Move items from wishlist to cart and complete your order today!
            </p>
            <motion.a
              href="/cart"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-2xl"
            >
              <ShoppingCart className="w-5 h-5" />
              View Cart
            </motion.a>
          </motion.div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default Wishlist;
