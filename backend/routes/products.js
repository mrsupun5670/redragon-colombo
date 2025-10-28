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
  deleteProduct,
  getProductImages,
  updateProductImages
} = require('../controllers/productController');
const { adminAuth, optionalAuth } = require('../middleware/auth');
const { uploadMultiple, handleUploadError } = require('../middleware/upload');



// Public routes for displaying products on homepage
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/redragon', getRedragonProducts);

// General product routes (with optional auth to detect admin vs customer)
router.get('/', optionalAuth, getAllProducts);
router.get('/:id', optionalAuth, getProductById);
router.get('/:id/images', getProductImages);

// Protected routes (admin only)
router.post('/', adminAuth, uploadMultiple, createProduct);
router.put('/:id', adminAuth, updateProduct);
router.put('/:id/images', adminAuth, uploadMultiple, updateProductImages);
router.delete('/:id', adminAuth, deleteProduct);

// Error handling middleware
router.use(handleUploadError);

module.exports = router;