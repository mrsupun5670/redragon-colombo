const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { adminAuth } = require('../middleware/auth');

// @route   GET /api/customers/admin/all
// @desc    Get all customers for admin
// @access  Admin
router.get('/admin/all', adminAuth, customerController.getAllCustomersForAdmin);

// @route   GET /api/customers/admin/:id
// @desc    Get customer by ID for admin (with detailed info)
// @access  Admin
router.get('/admin/:id', adminAuth, customerController.getCustomerByIdForAdmin);

// @route   GET /api/customers/admin/:id/orders
// @desc    Get customer orders
// @access  Admin
router.get('/admin/:id/orders', adminAuth, customerController.getCustomerOrders);

// @route   PUT /api/customers/admin/:id/status
// @desc    Update customer status (active/inactive)
// @access  Admin
router.put('/admin/:id/status', adminAuth, customerController.updateCustomerStatus);

// @route   PUT /api/customers/admin/:id/verification
// @desc    Update email verification status
// @access  Admin
router.put('/admin/:id/verification', adminAuth, customerController.updateEmailVerification);

// @route   GET /api/customers/admin/statistics
// @desc    Get customer statistics
// @access  Admin
router.get('/admin/statistics', adminAuth, customerController.getCustomerStatistics);

module.exports = router;