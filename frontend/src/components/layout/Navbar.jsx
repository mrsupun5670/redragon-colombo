import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Heart,
  Package,
} from "lucide-react";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  // TODO: Get cart count from CartContext
  const cartItemCount = 3;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-red-500/20 transition-all duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
                className="h-10 w-auto object-contain transition-transform group-hover:scale-110"
              />
              <img 
                src="/images/logo/redragon_logo_text.png" 
                alt="Redragon Text Logo"
                className="h-8 ml-2"
              />
            </a>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "Categories", href: "/categories" },
              { name: "About", href: "/about" },
            ].map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 font-bold text-gray-700 hover:text-red-500 transition-colors group"
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


            {/* Wishlist */}
            <motion.a
              href="/wishlist"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl transition-all bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-500 border border-gray-200"
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

            {/* User Account Icon - Desktop only */}
            <motion.a
              href="/account"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl transition-all bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-500 border border-gray-200"
              title="My Account"
            >
              <User className="w-5 h-5" />
            </motion.a>

            {/* Sign Up Button - Only show when not authenticated */}
            {!loading && !isAuthenticated && (
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                href="/register"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl border-2 border-white/20"
              >
                <Package className="w-4 h-4" />
                Sign Up
              </motion.a>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-700 border border-gray-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>


      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t-2 border-red-500/20 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for gaming gear..."
                  className="w-full px-6 py-3 pl-12 bg-gray-100 border-gray-200 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all text-gray-900 placeholder-gray-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>

              {/* Auth Section */}
              {!loading && (
                <AnimatePresence mode="wait">
                  {isAuthenticated && user ? (
                    <motion.div
                      key="user-greeting-mobile"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border-2 border-red-500/20"
                    >
                      <img src={user.avatar || '/images/logo/dragon_logo.png'} alt={user.firstName || user.first_name} className="w-12 h-12 rounded-full" />
                      <div>
                        <div className="font-bold text-gray-900">Welcome, {user.firstName || user.first_name}</div>
                        <a href="/account" className="text-sm text-red-500 hover:underline">View Account</a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="auth-buttons-mobile"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <motion.a
                        href="/login"
                        className="block px-4 py-3 text-center text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all border-2 border-transparent hover:border-red-500/20"
                      >
                        Login
                      </motion.a>
                      <motion.a
                        href="/register"
                        className="block px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-center shadow-lg border-2 border-white/20"
                      >
                        Sign Up
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Divider */}
              <hr className="border-gray-200" />

              {/* Navigation Links */}
              <div className="space-y-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "Products", href: "/products" },
                  { name: "Categories", href: "/categories" },
                  { name: "My Account", href: "/account", icon: User, highlight: true },
                  { name: "Deals", href: "/deals" },
                  { name: "About", href: "/about" },
                ].map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-3 ${
                      link.highlight
                        ? 'bg-red-50 text-red-600 border-2 border-red-500/30 hover:bg-red-100'
                        : 'text-gray-700 hover:text-red-500 hover:bg-red-50 border-2 border-transparent hover:border-red-500/20'
                    } rounded-xl font-bold transition-all`}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
