import React, { useState } from "react";
import { motion } from "framer-motion";
import { adminApi } from "../../../utils/adminApi";
import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const Settings = () => {
  // Password Change State
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordFeedback, setPasswordFeedback] = useState({
    type: null,
    message: "",
  });

  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // Password Change Handlers
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePasswordForm = () => {
    if (!passwordFormData.currentPassword.trim()) {
      setPasswordFeedback({
        type: "error",
        message: "Current password is required",
      });
      return false;
    }

    if (!passwordFormData.newPassword.trim()) {
      setPasswordFeedback({
        type: "error",
        message: "New password is required",
      });
      return false;
    }

    if (passwordFormData.newPassword.length < 6) {
      setPasswordFeedback({
        type: "error",
        message: "New password must be at least 6 characters long",
      });
      return false;
    }

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordFeedback({
        type: "error",
        message: "Passwords do not match",
      });
      return false;
    }

    if (passwordFormData.currentPassword === passwordFormData.newPassword) {
      setPasswordFeedback({
        type: "error",
        message: "New password must be different from current password",
      });
      return false;
    }

    return true;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setIsPasswordLoading(true);
    setPasswordFeedback({ type: null, message: "" });

    try {
      const response = await adminApi.put("/auth/admin/change-password", {
        currentPassword: passwordFormData.currentPassword,
        newPassword: passwordFormData.newPassword,
        confirmPassword: passwordFormData.confirmPassword,
      });

      if (response.success) {
        setIsPasswordLoading(false);
        setPasswordFeedback({
          type: "success",
          message: response.message || "Password changed successfully!",
        });
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setIsPasswordLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to change password";
      setPasswordFeedback({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full space-y-6 md:space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Settings
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2">
              Manage your admin account
            </p>
          </div>
        </motion.div>

        {/* Password Change Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200 p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 md:p-4 bg-red-100 rounded-lg sm:rounded-xl flex-shrink-0">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
                  Change Password
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">
                  Update your admin account password
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 md:p-8">

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Feedback Message */}
              {passwordFeedback.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 sm:p-4 md:p-5 rounded-lg flex items-start sm:items-center gap-2 sm:gap-3 ${
                    passwordFeedback.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {passwordFeedback.type === "success" ? (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-xs sm:text-sm md:text-base font-medium break-words ${
                      passwordFeedback.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {passwordFeedback.message}
                  </p>
                </motion.div>
              )}

              {/* Current Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label
                  htmlFor="currentPassword"
                  className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2 md:mb-3"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordFormData.currentPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-800"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                    tabIndex="-1"
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* New Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label
                  htmlFor="newPassword"
                  className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2 md:mb-3"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={passwordFormData.newPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-800"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                    tabIndex="-1"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    )}
                  </button>
                </div>
                <p className="text-xs sm:text-xs md:text-sm text-gray-500 mt-1.5">
                  Minimum 6 characters required
                </p>
              </motion.div>

              {/* Confirm Password */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1.5 sm:mb-2 md:mb-3"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordFormData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className="w-full px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm sm:text-base text-gray-800"
                    placeholder="Retype your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-2.5 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                    tabIndex="-1"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Submit Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col xs:flex-row gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-5 md:pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isPasswordLoading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 sm:py-3 md:py-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-xs sm:text-sm md:text-base active:bg-red-800"
                >
                  {isPasswordLoading ? (
                    <>
                      <div className="animate-spin mr-1.5 sm:mr-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      </div>
                      <span className="hidden xs:inline">Processing...</span>
                      <span className="xs:hidden">Processing</span>
                    </>
                  ) : (
                    "Change Password"
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setPasswordFormData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setPasswordFeedback({ type: null, message: "" });
                  }}
                  className="px-4 sm:px-6 md:px-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 sm:py-3 md:py-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base active:bg-gray-400"
                >
                  Reset
                </motion.button>
              </motion.div>
            </form>

            {/* Security Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 sm:mt-8 md:mt-10 p-3 sm:p-4 md:p-6 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl"
            >
              <h3 className="font-semibold text-blue-900 mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg">
                Security Tips
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base text-blue-800">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>
                    Use a strong password with uppercase, lowercase, numbers, and
                    symbols
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Don't reuse passwords from other accounts</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>Change your password regularly for better security</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="font-bold flex-shrink-0">•</span>
                  <span>
                    Never share your password with anyone, not even
                    administrators
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
