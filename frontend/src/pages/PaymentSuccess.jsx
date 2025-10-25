import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ParticleEffect from "../components/common/ParticleEffect";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate('/account');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-100">
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
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 mb-8"
          >
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">What's Next?</h2>
            </div>
            <p className="text-gray-600 mb-4">
              You will receive an email confirmation with your order details and tracking information.
            </p>
            <p className="text-gray-600">
              Your order will be processed within 1-2 business days and shipped to your address.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/account')}
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              View My Orders
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-gray-500 mt-8"
          >
            You will be automatically redirected to your account in 10 seconds.
          </motion.p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;