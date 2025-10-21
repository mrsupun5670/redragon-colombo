const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple, handleUploadError } = require('../middleware/upload');
const { auth, adminAuth } = require('../middleware/auth');
const ProductImage = require('../models/ProductImage');
const { uploadToCloudinary, deleteFromCloudinary, uploadMultipleToCloudinary } = require('../config/cloudinary');

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
      
      // Convert buffer to base64 for Cloudinary upload
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      
      // Upload to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(dataURI, 'redragon-products');
      
      // Save to database with Cloudinary URL
      await ProductImage.create(productId, cloudinaryResult.url, false, cloudinaryResult.public_id);

      res.json({
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: cloudinaryResult.url,
          public_id: cloudinaryResult.public_id,
          width: cloudinaryResult.width,
          height: cloudinaryResult.height,
          format: cloudinaryResult.format
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload image'
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
      
      // Convert all files to base64 for Cloudinary upload
      const filePromises = req.files.map(file => {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        return uploadToCloudinary(dataURI, 'redragon-products');
      });
      
      // Upload all images to Cloudinary
      const cloudinaryResults = await Promise.all(filePromises);
      
      // Prepare data for database
      const imageData = cloudinaryResults.map(result => ({
        url: result.url,
        public_id: result.public_id
      }));
      
      // Save to database
      await ProductImage.createMultiple(productId, imageData);

      res.json({
        success: true,
        message: `${req.files.length} images uploaded successfully`,
        data: {
          images: cloudinaryResults.map(result => ({
            url: result.url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format
          }))
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload images'
      });
    }
  });
});

// Get all images for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const images = await ProductImage.getByProductId(productId);

    res.json({
      success: true,
      message: 'Images retrieved successfully',
      data: images
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
    const image = await ProductImage.getById(imageId);
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    // Delete from Cloudinary if public_id exists
    if (image.public_id) {
      try {
        await deleteFromCloudinary(image.public_id);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError);
        // Continue with database deletion even if Cloudinary deletion fails
      }
    }
    
    // Delete from database
    await ProductImage.delete(imageId);

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