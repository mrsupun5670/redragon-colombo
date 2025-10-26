import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ParticleEffect from "../components/common/ParticleEffect";

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 15 seconds
    const timer = setTimeout(() => {
      navigate('/checkout');
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-100">
      <ParticleEffect />
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <XCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 mb-8"
          >
            Your payment was cancelled. No charges have been made to your account.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What happened?</h2>
            <p className="text-gray-600 mb-4">
              You cancelled the payment process before it was completed. Your order has not been placed.
            </p>
            <p className="text-gray-600">
              Your cart items are still saved. You can try the payment again or choose a different payment method.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/checkout')}
              className="px-8 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-gray-500 mt-8"
          >
            You will be automatically redirected to checkout in 15 seconds.
          </motion.p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentCancel;