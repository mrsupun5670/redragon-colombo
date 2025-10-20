const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { uploadSingle, uploadMultiple, handleUploadError } = require('../middleware/upload');
const { auth, adminAuth } = require('../middleware/auth');
const ProductImage = require('../models/ProductImage');

// Upload single product image
router.post('/upload/single/:productId', adminAuth, (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }

    try {
      const productId = req.params.productId;
      const imagePath = `/uploads/products/${req.file.filename}`;
      
      // Save to database
      await ProductImage.create(productId, imagePath, false);

      res.json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          filename: req.file.filename,
          path: imagePath,
          size: req.file.size
        }
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save image to database'
      });
    }
  });
});

// Upload multiple product images
router.post('/upload/multiple/:productId', adminAuth, (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files uploaded'
      });
    }

    try {
      const productId = req.params.productId;
      const imagePaths = req.files.map(file => `/uploads/products/${file.filename}`);
      
      // Save to database
      await ProductImage.createMultiple(productId, imagePaths);

      res.json({
        success: true,
        message: `${req.files.length} images uploaded successfully`,
        data: {
          files: req.files.map(file => ({
            filename: file.filename,
            path: `/uploads/products/${file.filename}`,
            size: file.size
          }))
        }
      });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save images to database'
      });
    }
  });
});

// Get all images for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const images = await ProductImage.getByProductId(productId);
    
    // Add full URL to images
    const imagesWithUrls = images.map(image => ({
      ...image,
      url: `${req.protocol}://${req.get('host')}${image.image_path}`
    }));

    res.json({
      success: true,
      message: 'Images retrieved successfully',
      data: imagesWithUrls
    });
  } catch (error) {
    console.error('Get images error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// Set image as primary
router.put('/set-primary/:imageId', adminAuth, async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    await ProductImage.setPrimary(imageId, productId);

    res.json({
      success: true,
      message: 'Primary image updated successfully'
    });
  } catch (error) {
    console.error('Set primary image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// Delete image
router.delete('/:imageId', adminAuth, async (req, res) => {
  try {
    const imageId = req.params.imageId;
    
    // Get image info before deleting
    const [images] = await db.execute('SELECT * FROM product_images WHERE id = ?', [imageId]);
    
    if (images.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const image = images[0];
    
    // Delete from database
    await ProductImage.delete(imageId);
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '../uploads/products', path.basename(image.image_path));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router;