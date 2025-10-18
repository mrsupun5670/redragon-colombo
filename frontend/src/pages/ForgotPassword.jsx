import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Key, ArrowRight, Lock, RefreshCw } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ParticleEffect from "../components/common/ParticleEffect";

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send a password reset email
    console.log(`Password reset request for ${email}`);
    setStep(2);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // Here you would typically verify the code and reset the password
    console.log("Password has been reset.");
    alert("Password has been reset successfully!");
    // Redirect to login or home
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
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-xl shadow-red-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                        >
                          Send Code <ArrowRight className="w-5 h-5" />
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
                          Verification Code
                        </label>
                        <div className="relative">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Enter code"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
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
                            placeholder="••••••••"
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
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-xl shadow-red-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                        >
                          Reset Password <RefreshCw className="w-5 h-5" />
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
    </div>
  );
};

export default ForgotPasswordPage;
