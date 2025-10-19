import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, ArrowRight, User, Phone, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ParticleEffect from "../components/common/ParticleEffect";
import ErrorPopup from "../components/common/ErrorPopup";
import SuccessPopup from "../components/common/SuccessPopup";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const { firstName, lastName, email, phone, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error for this field when user starts typing
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  // Client-side validation
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!firstName || firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }
    if (!lastName || lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation (Sri Lankan format)
    const phoneRegex = /^(\+94|0)?[0-9]{9,10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      errors.phone = "Please enter a valid phone number (e.g., 0771234567)";
    }

    // Password validation
    if (!password || password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])/.test(password)) {
      errors.password = "Password must contain uppercase, lowercase, number, and special character (#@$!%*?&)";
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    // Client-side validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setError("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const result = await register({ firstName, lastName, email, phone, password });
      
      if (result.success) {
        setSuccess("Registration successful! Redirecting to home...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setLoading(false);
        setError(result.message || "Registration failed");
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
          className="w-full max-w-lg"
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
                  <UserPlus className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
                  Create Account
                </h1>
                <p className="text-gray-600 font-semibold mt-2">
                  Join the Redragon community.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name Input */}
                  <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">First Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" className={`w-full pl-12 pr-4 py-3 bg-white/80 border-2 ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all`} required />
                    </div>
                    {validationErrors.firstName && <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>}
                  </motion.div>

                  {/* Last Name Input */}
                  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" className={`w-full pl-12 pr-4 py-3 bg-white/80 border-2 ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all`} required />
                    </div>
                    {validationErrors.lastName && <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>}
                  </motion.div>
                </div>

                {/* Mobile Number Input */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" name="phone" value={phone} onChange={onChange} placeholder="0771234567" className={`w-full pl-12 pr-4 py-3 bg-white/80 border-2 ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all`} required />
                  </div>
                  {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                </motion.div>

                {/* Email Input */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={email} onChange={onChange} placeholder="your.email@example.com" className={`w-full pl-12 pr-4 py-3 bg-white/80 border-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all`} required />
                  </div>
                  {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                </motion.div>

                {/* Password Input */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      value={password} 
                      onChange={onChange} 
                      placeholder="••••••••" 
                      className={`w-full pl-12 pr-12 py-3 bg-white/80 border-2 ${validationErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all`} 
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
                  {validationErrors.password && <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>}
                  <p className="text-xs text-gray-500 mt-1">Must contain 8+ characters, uppercase, lowercase, number & special character (#@$!%*?&)</p>
                </motion.div>

                {/* Confirm Password Input */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      name="confirmPassword" 
                      value={confirmPassword} 
                      onChange={onChange} 
                      placeholder="••••••••" 
                      className={`w-full pl-12 pr-12 py-3 bg-white/80 border-2 ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all`} 
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {validationErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>}
                </motion.div>

                <div className="flex gap-4 pt-4">
                  {/* Cancel Button */}
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }} className="w-1/2">
                    <button type="button" onClick={() => navigate('/')} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-xl font-black uppercase tracking-wider transition-all">
                      Cancel
                    </button>
                  </motion.div>
                  {/* Submit Button */}
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }} className="w-1/2">
                    <button type="submit" disabled={loading} className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'} text-white py-4 rounded-xl font-black uppercase tracking-wider shadow-xl shadow-red-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-2`}>
                      <UserPlus className="w-5 h-5" />
                      {loading ? 'Creating Account...' : 'Register'}
                    </button>
                  </motion.div>
                </div>
              </form>
            </div>

            {/* Login link */}
            <div className="bg-gradient-to-r from-gray-50 to-white/0 p-4 text-center border-t-2 border-gray-100">
              <p className="text-sm font-semibold text-gray-700">
                Already have an account?{' '}
                <a href="/login" className="font-black text-red-600 hover:text-red-700 transition-colors flex items-center justify-center gap-1">
                  Login Now <ArrowRight className="w-4 h-4" />
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

export default RegisterPage;
