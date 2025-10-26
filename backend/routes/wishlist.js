const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlistStatus,
  getWishlistCount
} = require('../controllers/wishlistController');

// All wishlist routes require authentication
router.use(auth);

// Get customer's wishlist with items
router.get('/', getWishlist);

// Get wishlist item count
router.get('/count', getWishlistCount);

// Check if product is in wishlist
router.get('/check/:product_id', checkWishlistStatus);

// Add item to wishlist
router.post('/add', addToWishlist);

// Remove item from wishlist
router.delete('/remove/:product_id', removeFromWishlist);

module.exports = router;