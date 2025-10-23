import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

const NotFound404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 pt-24 pb-20 border-b-4 border-red-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              404
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              Page Not Found
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Error Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-6">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase">
            Oops! Something went wrong
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            The page you're looking for doesn't exist or has been moved. It might have been deleted or the URL could be incorrect. Let's get you back on track!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all border-2 border-red-600"
              >
                Browse Products
              </Link>
            </motion.div>
          </div>

          {/* Helpful Links */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-8">
            <h3 className="text-xl font-black text-gray-900 mb-6 uppercase">
              Need Help? Try These:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Shop Products", href: "/products" },
                { title: "View Categories", href: "/categories" },
                { title: "My Cart", href: "/cart" },
                { title: "My Account", href: "/account" },
              ].map((link, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="text-left"
                >
                  <Link
                    to={link.href}
                    className="text-red-600 hover:text-red-700 font-bold uppercase tracking-wide transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Support Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200"
          >
            <p className="text-gray-700 font-semibold mb-2">
              Still having trouble?
            </p>
            <p className="text-gray-600 mb-4">
              Contact our support team and we'll be happy to help you find what you're looking for.
            </p>
            <a
              href="mailto:info@redragoncolombo.lk"
              className="text-red-600 hover:text-red-700 font-bold uppercase tracking-wide transition-colors"
            >
              📧 Support@redragoncolombo.lk
            </a>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default NotFound404;
