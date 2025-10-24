const express = require('express');
const router = express.Router();
const { login, register, getMe, logout, adminLogin, updateProfile } = require('../controllers/authController');
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

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, logout);

// @route   POST /api/auth/admin/login
// @desc    Login admin
// @access  Public
router.post('/admin/login', adminLoginValidation, handleValidationErrors, adminLogin);

module.exports = router;