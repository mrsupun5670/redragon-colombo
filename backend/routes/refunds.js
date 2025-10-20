const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createRefund,
  getAllRefunds,
  getRefundById,
  getCustomerRefunds,
  updateRefundStatus,
  getRefundStatistics
} = require('../controllers/refundController');

// Customer routes
router.post('/', protect, createRefund); // Create refund request
router.get('/my-refunds', protect, getCustomerRefunds); // Get customer's refunds

// Admin routes (add admin middleware if needed)
router.get('/', getAllRefunds); // Get all refunds (with filters)
router.get('/statistics', getRefundStatistics); // Get refund statistics
router.get('/:id', getRefundById); // Get refund by ID
router.put('/:id/status', updateRefundStatus); // Update refund status

module.exports = router;
