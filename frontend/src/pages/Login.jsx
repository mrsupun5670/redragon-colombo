import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ParticleEffect from "../components/common/ParticleEffect";
import ErrorPopup from "../components/common/ErrorPopup";
import SuccessPopup from "../components/common/SuccessPopup";
import { useAuth } from "../context/AuthContext";
import { navigateToForgotPassword } from "../utils/routeProtection";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the redirect path from location state (set by CustomerProtectedRoute)
  const from = location.state?.from || "/";

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await login({ email, password });
      
      if (result.success) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setError(result.message || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800">
      <ParticleEffect />
      <Navbar />
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />

      <div className="flex items-center justify-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full max-w-md"
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
                  <LogIn className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
                  Login
                </h1>
                <p className="text-gray-600 font-semibold mt-2">
                  Welcome back, please login to your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
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
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="kamal.perera@gmail.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/80 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Input */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-white/80 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigateToForgotPassword(navigate)}
                    className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'} text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-xl shadow-red-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2`}
                  >
                    <LogIn className="w-5 h-5" />
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </motion.div>
              </form>
            </div>

            {/* Sign up link */}
            <div className="bg-gradient-to-r from-gray-50 to-white/0 p-4 text-center border-t-2 border-gray-100">
              <p className="text-sm font-semibold text-gray-700">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="font-black text-red-600 hover:text-red-700 transition-colors flex items-center justify-center gap-1"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
