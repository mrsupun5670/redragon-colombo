const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, orderController.createOrder);

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', auth, orderController.getUserOrders);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, orderController.getOrderById);

// Admin routes
// @route   GET /api/orders/admin/all
// @desc    Get all orders for admin
// @access  Admin
router.get('/admin/all', adminAuth, orderController.getAllOrdersForAdmin);

// @route   GET /api/orders/admin/:id
// @desc    Get order by ID for admin (with all details)
// @access  Admin
router.get('/admin/:id', adminAuth, orderController.getOrderByIdForAdmin);

// @route   PUT /api/orders/admin/:id/status
// @desc    Update order status
// @access  Admin
router.put('/admin/:id/status', adminAuth, orderController.updateOrderStatus);

// @route   PUT /api/orders/admin/:id/payment
// @desc    Update payment status
// @access  Admin
router.put('/admin/:id/payment', adminAuth, orderController.updatePaymentStatus);

module.exports = router;