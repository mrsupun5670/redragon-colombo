import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Key, ArrowRight, Lock, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ParticleEffect from "../components/common/ParticleEffect";
import ErrorPopup from "../components/common/ErrorPopup";
import SuccessPopup from "../components/common/SuccessPopup";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.forgotPassword(email.trim());

      if (response.data && response.data.success) {
        setSuccess("6-digit verification code has been sent to your email!");
        setStep(2);
      } else {
        setError(response.data?.message || "Failed to send reset code. Please try again.");
      }
      // hello
    } catch (err) {
      setError(err.response?.data?.message || "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // Validate password length
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    // Validate code format
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code!");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.resetPassword({
        code: code.trim(),
        newPassword,
        confirmPassword,
      });

      if (response.data && response.data.success) {
        setSuccess("Password has been reset successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data?.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800">
      <ParticleEffect />
      <Navbar />
      <div className="flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="bg-white/70 backdrop-blur-xl border-2 border-red-500/20 rounded-2xl shadow-2xl shadow-red-500/10 overflow-hidden">
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full items-center justify-center mb-4 shadow-lg shadow-red-500/30"
                      >
                        <RefreshCw className="w-10 h-10 text-white" />
                      </motion.div>
                      <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
                        Forgot Password
                      </h1>
                      <p className="text-gray-600 font-semibold mt-2">
                        Enter your email to receive a reset code.
                      </p>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: "spring" }}
                      >
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-xl shadow-red-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? "Sending..." : "Send Code"} <ArrowRight className="w-5 h-5" />
                        </button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="bg-white/70 backdrop-blur-xl border-2 border-red-500/20 rounded-2xl shadow-2xl shadow-red-500/10 overflow-hidden">
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full items-center justify-center mb-4 shadow-lg shadow-red-500/30"
                      >
                        <Key className="w-10 h-10 text-white" />
                      </motion.div>
                      <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
                        Reset Password
                      </h1>
                      <p className="text-gray-600 font-semibold mt-2">
                        A code has been sent to {email}.
                      </p>
                    </div>

                    <form onSubmit={handleResetSubmit} className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                          Verification Code (6 digits)
                        </label>
                        <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="123456"
                            maxLength="6"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all text-center text-lg font-bold tracking-widest"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            minLength="6"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            minLength="6"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                      >
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-xl shadow-red-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                        >
                          {loading ? "Resetting..." : "Reset Password"} <RefreshCw className="w-5 h-5" />
                        </button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default ForgotPasswordPage;
