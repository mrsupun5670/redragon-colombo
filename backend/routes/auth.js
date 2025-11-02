const express = require('express');
const router = express.Router();
const { login, register, getMe, logout, adminLogin, adminChangePassword, adminForgotPassword, adminVerifyResetCode, adminResetPassword, updateProfile, changePassword, forgetPassword, resetPassword, verifyResetCode } = require('../controllers/authController');
const { registerValidation, loginValidation, adminLoginValidation, handleValidationErrors } = require('../middleware/validation');
const { auth, adminAuth } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register new customer
// @access  Public
router.post('/register', registerValidation, handleValidationErrors, register);

// @route   POST /api/auth/login
// @desc    Login customer
// @access  Public
router.post('/login', loginValidation, handleValidationErrors, login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getMe);

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', auth, changePassword);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, logout);

// @route   POST /api/auth/admin/login
// @desc    Login admin
// @access  Public
router.post('/admin/login', adminLoginValidation, handleValidationErrors, adminLogin);

// @route   PUT /api/auth/admin/change-password
// @desc    Change admin password
// @access  Private (Admin only)
router.put('/admin/change-password', auth, adminChangePassword);

// @route   POST /api/auth/admin/forgot-password
// @desc    Send admin password reset code via email
// @access  Public
router.post('/admin/forgot-password', adminForgotPassword);

// @route   POST /api/auth/admin/verify-reset-code
// @desc    Verify admin password reset code
// @access  Public
router.post('/admin/verify-reset-code', adminVerifyResetCode);

// @route   POST /api/auth/admin/reset-password
// @desc    Reset admin password using verified code
// @access  Public
router.post('/admin/reset-password', adminResetPassword);

// @route   POST /api/auth/forget-password
// @desc    Send password reset email
// @access  Public
router.post('/forget-password', forgetPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset password using code
// @access  Public
router.post('/reset-password', resetPassword);

// @route   POST /api/auth/verify-reset-code
// @desc    Verify password reset code
// @access  Public
router.post('/verify-reset-code', verifyResetCode);

module.exports = router;