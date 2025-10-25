const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth } = require('../middleware/auth');

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

module.exports = router;