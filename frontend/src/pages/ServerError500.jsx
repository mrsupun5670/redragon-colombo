import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

const ServerError500 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-700 pt-24 pb-20 border-b-4 border-red-800">
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
              500
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              Server Error
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
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-6">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase">
            Something Went Wrong
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            We're experiencing some technical difficulties on our server. Our team has been notified and is working hard to fix the issue. Thank you for your patience!
          </p>

          {/* Status Code Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 mb-8 border-2 border-red-200"
          >
            <p className="text-sm text-gray-600 font-mono mb-2">
              Error Code: HTTP 500 - Internal Server Error
            </p>
            <p className="text-sm text-gray-600">
              The server encountered an unexpected condition and was unable to complete your request.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-red-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all border-2 border-red-600"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>
          </div>

          {/* What You Can Do */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-8">
            <h3 className="text-xl font-black text-gray-900 mb-6 uppercase">
              What Can You Do?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Refresh the Page",
                  desc: "Sometimes the issue is temporary. Try refreshing.",
                  icon: "🔄",
                },
                {
                  title: "Clear Your Cache",
                  desc: "Clear browser cache and cookies then try again.",
                  icon: "🧹",
                },
                {
                  title: "Check Back Later",
                  desc: "The issue may be resolved shortly. Please check back.",
                  icon: "⏰",
                },
                {
                  title: "Contact Support",
                  desc: "Reach out to our team for immediate assistance.",
                  icon: "📞",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-left bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="font-black text-gray-900 uppercase text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Home", href: "/" },
              { title: "Products", href: "/products" },
              { title: "Support", href: "/about" },
            ].map((link, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={link.href}
                  className="block bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 p-4 rounded-xl border-2 border-red-200 transition-all text-center font-bold text-red-600 uppercase tracking-wide"
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Support Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 border-2 border-red-400 text-white"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0 text-4xl">⚙️</div>
              <div className="flex-1">
                <p className="font-black text-lg mb-2 uppercase">
                  Our Team is Working on It
                </p>
                <p className="text-white/90 mb-4">
                  If this issue persists, please report it to our support team. We appreciate your patience.
                </p>
                <a
                  href="mailto:support@redragoncolombo.lk"
                  className="inline-block bg-white text-red-600 px-6 py-2 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-100 transition-all"
                >
                  📧 Report Issue
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServerError500;
