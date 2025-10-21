const Brand = require('../models/Brand');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.getAll();
    
    res.json({
      success: true,
      message: 'Brands retrieved successfully',
      data: brands
    });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.getById(id);
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Brand retrieved successfully',
      data: brand
    });
  } catch (error) {
    console.error('Get brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Create new brand
exports.createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Brand name is required'
      });
    }

    // Check if brand name already exists
    const exists = await Brand.existsByName(name.trim());
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Brand name already exists'
      });
    }

    let imageUrl = null;
    
    // Handle image upload to Cloudinary if provided
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        
        const cloudinaryResult = await uploadToCloudinary(dataURI, 'redragon-brands');
        imageUrl = cloudinaryResult.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload brand image'
        });
      }
    }

    const brandData = {
      name: name.trim(),
      image_url: imageUrl
    };

    const newBrand = await Brand.create(brandData);
    
    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: newBrand
    });
  } catch (error) {
    console.error('Create brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Update brand
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    // Check if brand exists
    const existingBrand = await Brand.getById(id);
    if (!existingBrand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Brand name is required'
      });
    }

    // Check if brand name already exists (excluding current brand)
    const exists = await Brand.existsByName(name.trim(), id);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Brand name already exists'
      });
    }

    let imageUrl = existingBrand.image_url;
    
    // Handle image upload to Cloudinary if provided
    if (req.file) {
      try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        
        const cloudinaryResult = await uploadToCloudinary(dataURI, 'redragon-brands');
        imageUrl = cloudinaryResult.url;
        
        // TODO: Delete old image from Cloudinary if it exists
        // This would require storing the public_id in the database
        
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload brand image'
        });
      }
    }

    const brandData = {
      name: name.trim(),
      image_url: imageUrl
    };

    const updatedBrand = await Brand.update(id, brandData);
    
    res.json({
      success: true,
      message: 'Brand updated successfully',
      data: updatedBrand
    });
  } catch (error) {
    console.error('Update brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Delete brand
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if brand exists
    const existingBrand = await Brand.getById(id);
    if (!existingBrand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    const deleted = await Brand.delete(id);
    
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete brand'
      });
    }
    
    res.json({
      success: true,
      message: 'Brand deleted successfully'
    });
  } catch (error) {
    console.error('Delete brand error:', error);
    
    if (error.message.includes('Cannot delete brand')) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};