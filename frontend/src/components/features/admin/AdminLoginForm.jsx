import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import ErrorPopup from '../../common/ErrorPopup';
import SuccessPopup from '../../common/SuccessPopup';
import AdminForgotPassword from './AdminForgotPassword';

const AdminLoginForm = ({ error: initialError }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(initialError);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await login(username, password);
      
      if (result.success) {
        setSuccess('Admin login successful! Redirecting...');
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else {
        setError(result.message || 'Admin login failed');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-blue-50 rounded-2xl shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full items-center justify-center mb-4 shadow-lg shadow-blue-500/30"
          >
            <User className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-500">Welcome back, please login to your admin account.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Username or Email"
              className="w-full px-12 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="w-full px-12 pr-12 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
          
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className={`w-full px-6 py-3 text-lg font-bold text-white ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
            } rounded-lg transition-all shadow-lg`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
              className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Back to Customer Login
          </a>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AdminForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
};

export default AdminLoginForm;
