const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/sales/categories
// @desc    Get sales by category with time period filter
// @access  Admin
router.get('/categories', adminAuth, salesController.getCategoriesSales);

// @route   GET /api/sales/metrics
// @desc    Get sales metrics (revenue, profit, orders) with time period filter
// @access  Admin
router.get('/metrics', adminAuth, salesController.getSalesMetrics);

// @route   GET /api/sales/chart-data
// @desc    Get chart data for revenue and profit trends with time period filter
// @access  Admin
router.get('/chart-data', adminAuth, salesController.getChartData);

module.exports = router;
