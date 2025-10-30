const ProductReview = require('../models/ProductReview');

// Get all reviews for a product (public endpoint)
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate product ID
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const reviews = await ProductReview.findByProductId(productId);

    res.json({
      success: true,
      data: reviews.map(review => ({
        id: review.id,
        product_id: review.product_id,
        customer_id: review.customer_id,
        customer_name: review.customer_name,
        rating: review.rating,
        review_text: review.review_text,
        created_at: review.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
};

// Create a new review (requires authentication and purchase)
exports.createReview = async (req, res) => {
  try {
    const { product_id, rating, review_text } = req.body;
    const customer_id = req.user.id;

    // Validate input
    if (!product_id || !rating || !review_text) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, rating, and review text are required'
      });
    }

    // Validate rating
    const ratingNum = parseInt(rating);
    if (ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Validate review text length
    if (review_text.trim().length < 10 || review_text.trim().length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Review text must be between 10 and 1000 characters'
      });
    }

    // Check if customer has purchased this product
    const hasPurchased = await ProductReview.hasCustomerPurchased(customer_id, product_id);
    if (!hasPurchased) {
      return res.status(403).json({
        success: false,
        message: 'You can only review products you have purchased'
      });
    }

    // Check if customer has already reviewed this product
    const hasReviewed = await ProductReview.hasCustomerReviewed(customer_id, product_id);
    if (hasReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Create the review
    const reviewId = await ProductReview.create({
      product_id,
      customer_id,
      rating: ratingNum,
      review_text: review_text.trim()
    });

    // Fetch the created review
    const review = await ProductReview.findById(reviewId);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: {
        id: review.id,
        product_id: review.product_id,
        customer_id: review.customer_id,
        customer_name: review.customer_name,
        rating: review.rating,
        review_text: review.review_text,
        created_at: review.created_at
      }
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create review'
    });
  }
};

// Update a review (only owner can update)
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review_text } = req.body;
    const customer_id = req.user.id;

    // Get the review
    const review = await ProductReview.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the review owner
    if (review.customer_id !== customer_id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own reviews'
      });
    }

    // Validate input if provided
    if (rating !== undefined) {
      const ratingNum = parseInt(rating);
      if (ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
      }
    }

    if (review_text !== undefined) {
      if (review_text.trim().length < 10 || review_text.trim().length > 1000) {
        return res.status(400).json({
          success: false,
          message: 'Review text must be between 10 and 1000 characters'
        });
      }
    }

    // Update the review
    const updated = await ProductReview.update(id, {
      rating: rating !== undefined ? parseInt(rating) : review.rating,
      review_text: review_text !== undefined ? review_text.trim() : review.review_text
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Failed to update review'
      });
    }

    // Fetch updated review
    const updatedReview = await ProductReview.findById(id);

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: {
        id: updatedReview.id,
        product_id: updatedReview.product_id,
        customer_id: updatedReview.customer_id,
        customer_name: updatedReview.customer_name,
        rating: updatedReview.rating,
        review_text: updatedReview.review_text,
        created_at: updatedReview.created_at
      }
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update review'
    });
  }
};

// Delete a review (only owner can delete)
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const customer_id = req.user.id;

    // Get the review
    const review = await ProductReview.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the review owner
    if (review.customer_id !== customer_id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews'
      });
    }

    // Delete the review
    const deleted = await ProductReview.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Failed to delete review'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review'
    });
  }
};
