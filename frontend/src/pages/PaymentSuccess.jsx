import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Loader, AlertCircle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ParticleEffect from "../components/common/ParticleEffect";
import { kokoPaymentAPI } from "../services/api";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      setVerifying(true);

      // Get order details from URL parameters or session storage
      const orderId = searchParams.get('order_id');
      const sessionId = searchParams.get('session_id');

      // Or retrieve from session storage if available
      const storedOrderId = sessionId || sessionStorage.getItem('koko_order_id');
      const storedSessionId = sessionId || sessionStorage.getItem('koko_session_id');

      if (storedOrderId && storedSessionId) {
        // Verify payment with Koko
        const response = await kokoPaymentAPI.verifyPayment({
          order_id: storedOrderId,
          session_id: storedSessionId
        });

        if (response.data.success) {
          setVerified(response.data.data.is_paid);
          setPaymentDetails(response.data.data);

          if (!response.data.data.is_paid) {
            setError('Payment verification pending. Please check your email for confirmation.');
          }
        } else {
          setError('Unable to verify payment status. Please check your email or account.');
        }
      } else {
        // No order details found - payment may still be processing
        setVerified(false);
        setError('Payment is being processed. You will receive a confirmation email shortly.');
      }
    } catch (err) {
      console.error('Payment verification error:', err);
      setError('Unable to verify payment. Please check your email for confirmation.');
      // Don't fail the page - payment may have succeeded even if verification fails
      setVerified(true);
    } finally {
      setVerifying(false);
    }
  };

  // Clear session storage
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('koko_order_id');
      sessionStorage.removeItem('koko_session_id');
    };
  }, []);

  // Auto redirect after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/account');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Show verification loading state
  if (verifying) {
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
              className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
            >
              Verifying Payment...
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600"
            >
              Please wait while we confirm your payment with Koko Payment gateway.
            </motion.p>
          </motion.div>
        </div>

        <Footer />
      </div>
    );
  }

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
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
              verified ? 'bg-green-500' : 'bg-amber-500'
            }`}
          >
            {verified ? (
              <CheckCircle className="w-12 h-12 text-white" />
            ) : (
              <AlertCircle className="w-12 h-12 text-white" />
            )}
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            {verified ? 'Payment Successful!' : 'Payment Processing...'}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 mb-8"
          >
            {verified
              ? 'Thank you for your purchase. Your order has been confirmed and will be processed shortly.'
              : 'Your payment is being processed. You will receive a confirmation email shortly.'}
          </motion.p>

          {/* Error Message (if any) */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg"
            >
              <p className="text-amber-800 font-semibold">{error}</p>
            </motion.div>
          )}

          {/* Info Box */}
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

            {/* Payment Details (if available) */}
            {paymentDetails && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold">Order ID:</span> {paymentDetails.order_id}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Status:</span> {paymentDetails.payment_status}
                </p>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
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

          {/* Auto-redirect message */}
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