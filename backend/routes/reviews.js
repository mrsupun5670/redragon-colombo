const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

// Get all reviews for a product (public endpoint)
router.get('/product/:productId', reviewController.getProductReviews);

// Create a new review (requires authentication)
router.post('/', auth, reviewController.createReview);

// Update a review (requires authentication)
router.put('/:id', auth, reviewController.updateReview);

// Delete a review (requires authentication)
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
