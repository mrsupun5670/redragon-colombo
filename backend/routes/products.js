const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getNewArrivals,
  getRedragonProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { auth, adminAuth } = require('../middleware/auth');



// Public routes for displaying products on homepage
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/redragon', getRedragonProducts);

// General product routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (admin only)
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;