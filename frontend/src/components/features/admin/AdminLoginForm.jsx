import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

const AdminLoginForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 space-y-8 bg-blue-50 rounded-2xl shadow-2xl"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">Admin Login</h2>
        <p className="mt-2 text-sm text-gray-500">Welcome back, please login to your account.</p>
      </div>
      <form className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-12 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-12 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
        >
          Login
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AdminLoginForm;
