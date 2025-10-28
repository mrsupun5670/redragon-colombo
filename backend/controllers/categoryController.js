const Category = require('../models/Category');
const { uploadToCloudinary } = require('../config/cloudinary');

// Get all main categories
exports.getAllMainCategories = async (req, res) => {
  try {
    const categories = await Category.getAllMainCategories();
    
    res.json({
      success: true,
      message: 'Main categories retrieved successfully',
      data: categories
    });
  } catch (error) {
    console.error('Get main categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get all sub categories
exports.getAllSubCategories = async (req, res) => {
  try {
    const categories = await Category.getAllSubCategories();
        res.json({
      success: true,
      message: 'Sub categories retrieved successfully',
      data: categories || []
    });
  } catch (error) {
    console.error('❌ Get sub categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// Get sub categories by main category ID
exports.getSubCategoriesByMainCategory = async (req, res) => {
  try {
    const { mainCategoryId } = req.params;
    const categories = await Category.getSubCategoriesByMainCategory(mainCategoryId);
    
    res.json({
      success: true,
      message: 'Sub categories retrieved successfully',
      data: categories
    });
  } catch (error) {
    console.error('Get sub categories by main category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Create new main category
exports.createMainCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    // Check if category name already exists
    const exists = await Category.mainCategoryExistsByName(name.trim());
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Main category name already exists'
      });
    }

    let iconUrl = null;

    console.log('Before - Received file:', req.file);

    // Handle image upload if file is provided
    if (req.file) {
    console.log('Received file:', req.file);
      
      try {
        // Convert buffer to base64 for Cloudinary upload
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        
        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(dataURI, 'categories');
                
        iconUrl = uploadResult.url;
        console.log('🔍 Icon URL extracted:', iconUrl);
        
        // Verify we got a complete URL
        if (!iconUrl || iconUrl === 'https://res.cloudinary.com/dgcautrc4/image/upload/') {
          console.error('❌ Invalid Cloudinary URL received:', iconUrl);
          console.error('❌ Full upload result was:', uploadResult);
          throw new Error('Invalid image URL received from Cloudinary');
        }
        
        console.log('✅ Valid URL received, continuing...');
      } catch (imageError) {
        console.error('Error uploading category image:', imageError);
        return res.status(500).json({
          success: false,
          message: 'Error uploading category image'
        });
      }
    }

    const categoryData = {
      name: name.trim(),
      description: description?.trim() || null,
      icon: iconUrl
    };

    const newCategory = await Category.createMainCategory(categoryData);
    
    res.status(201).json({
      success: true,
      message: 'Main category created successfully',
      data: newCategory
    });
  } catch (error) {
    console.error('Create main category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Create new sub category
exports.createSubCategory = async (req, res) => {
  try {
    const { name, description, main_category_id } = req.body;
    
    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    if (!main_category_id) {
      return res.status(400).json({
        success: false,
        message: 'Main category is required'
      });
    }

    // Check if main category exists
    const mainCategory = await Category.getMainCategoryById(main_category_id);
    if (!mainCategory) {
      return res.status(400).json({
        success: false,
        message: 'Main category not found'
      });
    }

    // Check if sub category name already exists within the same main category
    const exists = await Category.subCategoryExistsByName(name.trim(), main_category_id);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Sub category name already exists in this main category'
      });
    }

    const categoryData = {
      name: name.trim(),
      description: description?.trim() || null,
      main_category_id
    };

    const newCategory = await Category.createSubCategory(categoryData);
    
    res.status(201).json({
      success: true,
      message: 'Sub category created successfully',
      data: newCategory
    });
  } catch (error) {
    console.error('Create sub category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Update main category
exports.updateMainCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    // Check if category exists
    const existingCategory = await Category.getMainCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Main category not found'
      });
    }

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    // Check if category name already exists (excluding current category)
    const exists = await Category.mainCategoryExistsByName(name.trim(), id);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Main category name already exists'
      });
    }

    const categoryData = {
      name: name.trim(),
      description: description?.trim() || null
    };

    const updatedCategory = await Category.updateMainCategory(id, categoryData);
    
    res.json({
      success: true,
      message: 'Main category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    console.error('Update main category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Update sub category
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, main_category_id } = req.body;
    
    // Check if category exists
    const existingCategory = await Category.getSubCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Sub category not found'
      });
    }

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }

    if (!main_category_id) {
      return res.status(400).json({
        success: false,
        message: 'Main category is required'
      });
    }

    // Check if main category exists
    const mainCategory = await Category.getMainCategoryById(main_category_id);
    if (!mainCategory) {
      return res.status(400).json({
        success: false,
        message: 'Main category not found'
      });
    }

    // Check if sub category name already exists within the same main category (excluding current category)
    const exists = await Category.subCategoryExistsByName(name.trim(), main_category_id, id);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Sub category name already exists in this main category'
      });
    }

    const categoryData = {
      name: name.trim(),
      description: description?.trim() || null,
      main_category_id
    };

    const updatedCategory = await Category.updateSubCategory(id, categoryData);
    
    res.json({
      success: true,
      message: 'Sub category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    console.error('Update sub category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Delete main category
exports.deleteMainCategory = async (req, res) => {
  console.log('Deleting main category');
  try {
    const { id } = req.params;
    
    // Check if category exists
    const existingCategory = await Category.getMainCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Main category not found'
      });
    }

    const deleted = await Category.deleteMainCategory(id);
    
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete main category'
      });
    }
    
    res.json({
      success: true,
      message: 'Main category deleted successfully'
    });
  } catch (error) {
    console.error('Delete main category error:', error);
    
    if (error.message.includes('Cannot delete')) {
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

// Delete sub category
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if category exists
    const existingCategory = await Category.getSubCategoryById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Sub category not found'
      });
    }

    const deleted = await Category.deleteSubCategory(id);
    
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: 'Failed to delete sub category'
      });
    }
    
    res.json({
      success: true,
      message: 'Sub category deleted successfully'
    });
  } catch (error) {
    console.error('Delete sub category error:', error);
    
    if (error.message.includes('Cannot delete')) {
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