/**
 * NAVBAR COMPONENT - Top Navigation Bar
 *
 * PURPOSE:
 *   - Display Redragon logo
 *   - Main navigation links (Home, Products, Categories, etc.)
 *   - Shopping cart icon with item count
 *   - Admin login link
 *
 * WHAT TO INCLUDE:
 *   - Redragon logo (links to home)
 *   - Navigation menu (responsive hamburger on mobile)
 *   - Search bar (future feature)
 *   - Cart icon with badge showing item count
 *   - Admin login button
 *   - Sticky header on scroll
 *
 * STYLING:
 *   - Background: Dark (bg-dark-900)
 *   - Logo height: 50-60px
 *   - Hover effects: Red highlight (text-redragon-600)
 *   - Mobile: Hamburger menu, slide-in sidebar
 *
 * RELATED FILES:
 *   - Logo: /public/images/logo/dragon_logo.png
 *   - Cart Context: src/context/CartContext.js
 *   - Auth Context: src/context/AuthContext.js
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Menu, X, User, Heart, Package } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // TODO: Get cart count from CartContext
  const cartItemCount = 3;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white shadow-2xl border-b-2 border-red-500/20'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <a href="/" className="flex items-center group">
              <img
                src="/images/logo/dragon_logo.png"
                alt="Redragon"
                className="h-16 w-auto object-contain transition-transform group-hover:scale-110"
              />
              <div className="ml-3 hidden lg:block">
                <div className={`text-xl font-black group-hover:text-red-500 transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'
                }`}>
                  REDRAGON
                </div>
                <div className={`text-xs font-medium ${
                  isScrolled ? 'text-gray-600' : 'text-white/90 drop-shadow-md'
                }`}>Gaming Gear</div>
              </div>
            </a>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'Categories', href: '/categories' },
              { name: 'Deals', href: '/deals' },
              { name: 'About', href: '/about' }
            ].map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 font-bold hover:text-red-500 transition-colors group ${
                  isScrolled ? 'text-gray-700' : 'text-white drop-shadow-lg'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-600 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Right Side: Search, Cart & Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className={`hidden md:flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                isScrolled
                  ? 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-500 border border-gray-200'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30'
              }`}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Wishlist */}
            <motion.a
              href="/wishlist"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                isScrolled
                  ? 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-500 border border-gray-200'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30'
              }`}
            >
              <Heart className="w-5 h-5" />
            </motion.a>

            {/* Shopping Cart */}
            <motion.a
              href="/cart"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl border-2 border-white/20"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.a>

            {/* User Profile */}
            <motion.a
              href="/login"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
                isScrolled
                  ? 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-500 border border-gray-200'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30'
              }`}
            >
              <User className="w-5 h-5" />
            </motion.a>

            {/* Register Button */}
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl border-2 border-white/20"
            >
              <Package className="w-4 h-4" />
              Sign Up
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-xl ${
                isScrolled
                  ? 'bg-gray-100 text-gray-700 border border-gray-200'
                  : 'bg-white/20 text-white backdrop-blur-md border border-white/30'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pb-4 overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for gaming gear..."
                  className="w-full px-6 py-3 pl-12 bg-white/10 backdrop-blur-md border-2 border-white/20 focus:border-red-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all text-white placeholder-white/60"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t-2 border-red-500/20 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Products', href: '/products' },
                { name: 'Categories', href: '/categories' },
                { name: 'Deals', href: '/deals' },
                { name: 'About', href: '/about' }
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all border-2 border-transparent hover:border-red-500/20"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="/login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="block px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all border-2 border-transparent hover:border-red-500/20"
              >
                Login
              </motion.a>
              <motion.a
                href="/register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="block px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-center shadow-lg border-2 border-white/20"
              >
                Sign Up Free
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
