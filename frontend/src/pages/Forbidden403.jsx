import React from "react";
import { motion } from "framer-motion";
import { Shield, Home } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

const Forbidden403 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-600 pt-24 pb-20 border-b-4 border-orange-700">
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
              403
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              Access Forbidden
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
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mb-6">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase">
            Access Denied
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
            We're sorry, but you don't have permission to access this resource. This could be due to insufficient privileges, authentication requirements, or regional restrictions. Please check your credentials or contact support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-orange-600 px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all border-2 border-orange-600"
              >
                Go Back
              </button>
            </motion.div>
          </div>

          {/* Reasons & Solutions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-8">
            <h3 className="text-xl font-black text-gray-900 mb-6 uppercase">
              Why am I seeing this?
            </h3>

            <div className="space-y-4 text-left">
              {[
                {
                  title: "Authentication Required",
                  desc: "You may need to log in to access this resource.",
                },
                {
                  title: "Insufficient Permissions",
                  desc: "Your account doesn't have the required access level.",
                },
                {
                  title: "Regional Restrictions",
                  desc: "This resource may not be available in your region.",
                },
                {
                  title: "Expired Access",
                  desc: "Your access permissions may have expired.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full font-bold text-sm">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900 uppercase text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Log In", href: "/login" },
              { title: "Browse Products", href: "/products" },
              { title: "My Account", href: "/account" },
              { title: "Shop Categories", href: "/categories" },
            ].map((link, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="text-left"
              >
                <Link
                  to={link.href}
                  className="block bg-gradient-to-r from-gray-50 to-gray-100 hover:from-orange-50 hover:to-red-50 p-4 rounded-xl border-2 border-gray-100 hover:border-orange-500/30 transition-all text-center font-bold text-gray-900 hover:text-orange-600 uppercase tracking-wide"
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
            className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200"
          >
            <p className="text-gray-700 font-semibold mb-2">
              Think this is a mistake?
            </p>
            <p className="text-gray-600 mb-4">
              Our support team can help resolve permission issues and get you access.
            </p>
            <a
              href="mailto:info@redragoncolombo.lk"
              className="text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors"
            >
              📧 Contact Support
            </a>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Forbidden403;
