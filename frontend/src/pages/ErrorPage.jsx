import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RotateCcw, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

const ErrorPage = () => {
  const [errorTitle, setErrorTitle] = useState("Something Went Wrong");
  const [errorMessage, setErrorMessage] = useState(
    "An unexpected error occurred. Please try again or contact support if the issue persists."
  );
  const [errorCode, setErrorCode] = useState("Unknown Error");

  // Get error details from URL params or state
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    const message = params.get("message");
    const code = params.get("code");

    if (title) setErrorTitle(title);
    if (message) setErrorMessage(message);
    if (code) setErrorCode(code);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-500 via-orange-500 to-red-600 pt-24 pb-20 border-b-4 border-red-700">
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
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
              Oops!
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              An Error Occurred
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
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-red-500 to-orange-600 rounded-full mb-6 shadow-lg">
              <AlertTriangle className="w-14 h-14 text-white" />
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 uppercase">
            {errorTitle}
          </h2>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-red-200"
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {errorMessage}
            </p>
            {errorCode !== "Unknown Error" && (
              <p className="text-sm text-gray-600 font-mono bg-white rounded px-4 py-2 inline-block">
                Error Code: {errorCode}
              </p>
            )}
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider shadow-lg hover:shadow-xl transition-all border-2 border-white/20"
              >
                <RotateCcw className="w-5 h-5" />
                Go Back
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
                Home
              </Link>
            </motion.div>
          </div>

          {/* Helpful Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "Try These Steps",
                items: [
                  "Refresh your browser",
                  "Clear cache and cookies",
                  "Check your internet connection",
                  "Try again in a few moments",
                ],
                icon: "📋",
              },
              {
                title: "Popular Pages",
                items: [
                  "Home Page",
                  "Browse Products",
                  "Shop Categories",
                  "Contact Support",
                ],
                icon: "🔗",
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-lg font-black text-gray-900 uppercase">
                    {section.title}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <motion.li
                      key={i}
                      whileHover={{ x: 5 }}
                      className="text-gray-700 font-semibold flex items-center gap-2"
                    >
                      <span className="text-red-500">→</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Home", href: "/" },
              { title: "Products", href: "/products" },
              { title: "Categories", href: "/categories" },
            ].map((link, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="text-left"
              >
                <Link
                  to={link.href}
                  className="block bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 p-4 rounded-xl border-2 border-red-200 transition-all text-center font-bold text-red-600 uppercase tracking-wide"
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 border-2 border-red-400 text-white"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <p className="font-black text-lg mb-2 uppercase">
                  Need Help?
                </p>
                <p className="text-white/90 mb-4">
                  Our support team is here to help you resolve any issues you encounter. Feel free to reach out!
                </p>
                <a
                  href="mailto:support@redragoncolombo.lk"
                  className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold uppercase tracking-wide hover:bg-gray-100 transition-all"
                >
                  Contact Support
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

export default ErrorPage;
