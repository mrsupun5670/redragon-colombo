const express = require('express');
const router = express.Router();
const { uploadSingle, handleUploadError } = require('../middleware/upload');
const { auth, adminAuth } = require('../middleware/auth');
const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand
} = require('../controllers/brandController');

// Public routes
router.get('/', getAllBrands); // Get all brands
router.get('/:id', getBrandById); // Get brand by ID

// Admin routes
router.post('/', adminAuth, (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }
    
    // Call the createBrand controller
    createBrand(req, res);
  });
});

router.put('/:id', adminAuth, (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }
    
    // Call the updateBrand controller
    updateBrand(req, res);
  });
});

router.delete('/:id', adminAuth, deleteBrand); // Delete brand

module.exports = router;