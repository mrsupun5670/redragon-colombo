const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const { uploadSingle, handleUploadError } = require('../middleware/upload');
const {
  getAllMainCategories,
  getAllSubCategories,
  getSubCategoriesByMainCategory,
  createMainCategory,
  createSubCategory,
  updateMainCategory,
  updateSubCategory,
  deleteMainCategory,
  deleteSubCategory
} = require('../controllers/categoryController');

// Public routes
router.get('/main', getAllMainCategories); // Get all main categories
router.get('/sub', getAllSubCategories); // Get all sub categories
router.get('/sub/main/:mainCategoryId', getSubCategoriesByMainCategory); // Get sub categories by main category

// Admin routes for main categories
router.post('/main', adminAuth, uploadSingle, createMainCategory); // Create main category
router.put('/main/:id', adminAuth, updateMainCategory); // Update main category
router.delete('/main/:id', adminAuth, deleteMainCategory); // Delete main category

// Admin routes for sub categories
router.post('/sub', adminAuth, createSubCategory); // Create sub category
router.put('/sub/:id', adminAuth, updateSubCategory); // Update sub category
router.delete('/sub/:id', adminAuth, deleteSubCategory); // Delete sub category

// Error handling middleware
router.use(handleUploadError);

module.exports = router;