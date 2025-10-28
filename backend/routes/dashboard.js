const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/dashboard/stats
// @desc    Get comprehensive dashboard statistics
// @access  Admin
router.get('/stats', adminAuth, dashboardController.getDashboardStats);

// @route   GET /api/dashboard/quick
// @desc    Get quick summary statistics
// @access  Admin
router.get('/quick', adminAuth, dashboardController.getQuickStats);

// @route   GET /api/dashboard/live
// @desc    Get real-time data for live updates
// @access  Admin
router.get('/live', adminAuth, dashboardController.getLiveData);

module.exports = router;