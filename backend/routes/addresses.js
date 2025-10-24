const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const authMiddleware = require('../middleware/auth');

// All address routes are protected (customer only)
router.use(authMiddleware.auth);

// @route   PUT /api/addresses/default
// @desc    Create or update customer's default shipping address
// @access  Private (Customer)
router.put('/default', addressController.updateDefaultAddress);

// @route   GET /api/addresses/default
// @desc    Get customer's default shipping address
// @access  Private (Customer)
router.get('/default', addressController.getDefaultAddress);

// @route   GET /api/addresses
// @desc    Get all customer addresses
// @access  Private (Customer)
router.get('/', addressController.getAllAddresses);

// @route   DELETE /api/addresses/:addressId
// @desc    Delete customer address
// @access  Private (Customer)
router.delete('/:addressId', addressController.deleteAddress);

module.exports = router;