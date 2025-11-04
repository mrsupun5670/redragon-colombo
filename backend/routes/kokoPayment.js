const express = require('express');
const router = express.Router();
const kokoPaymentController = require('../controllers/kokoPaymentController');
const { auth } = require('../middleware/auth');

// @route   POST /api/koko-payment/initialize
// @desc    Initialize Koko Payment
// @access  Private (Authenticated users only)
router.post('/initialize', auth, kokoPaymentController.initializePayment);

// @route   POST /api/koko-payment/notify
// @desc    Handle Koko Payment webhook notification
// @access  Public (Koko servers call this)
router.post('/notify', kokoPaymentController.handleNotification);

// @route   POST /api/koko-payment/verify
// @desc    Verify Koko Payment status
// @access  Private (Authenticated users only)
router.post('/verify', auth, kokoPaymentController.verifyPayment);

module.exports = router;
