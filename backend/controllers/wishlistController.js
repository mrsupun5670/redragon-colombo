const Wishlist = require('../models/Wishlist');

// Get customer's wishlist with items
const getWishlist = async (req, res) => {
  try {
    const customer_id = req.user.id;
    
    const { wishlist, items } = await Wishlist.getWithItemsForCustomer(customer_id);
    
    res.json({
      success: true,
      data: {
        wishlist,
        items
      }
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wishlist'
    });
  }
};

// Add item to wishlist
const addToWishlist = async (req, res) => {
  try {
    const customer_id = req.user.id;
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const result = await Wishlist.addItem(customer_id, product_id);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Product added to wishlist',
        item_id: result.item_id
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product to wishlist'
    });
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const customer_id = req.user.id;
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const result = await Wishlist.removeItem(customer_id, parseInt(product_id));
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Product removed from wishlist'
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove product from wishlist'
    });
  }
};

// Check if product is in wishlist
const checkWishlistStatus = async (req, res) => {
  try {
    const customer_id = req.user.id;
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const isInWishlist = await Wishlist.isProductInWishlist(customer_id, parseInt(product_id));
    
    res.json({
      success: true,
      data: {
        isInWishlist
      }
    });
  } catch (error) {
    console.error('Error checking wishlist status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check wishlist status'
    });
  }
};

// Get wishlist item count
const getWishlistCount = async (req, res) => {
  try {
    const customer_id = req.user.id;
    
    const count = await Wishlist.getItemCount(customer_id);
    
    res.json({
      success: true,
      data: {
        count
      }
    });
  } catch (error) {
    console.error('Error getting wishlist count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get wishlist count'
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlistStatus,
  getWishlistCount
};