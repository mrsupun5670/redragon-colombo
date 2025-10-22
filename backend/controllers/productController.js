const Product = require('../models/Product');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.getFeatured();
    
    res.json({
      success: true,
      message: 'Featured products retrieved successfully',
      data: products
    });
  } catch (err) {
    console.error('Get featured products error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get new arrival products
exports.getNewArrivals = async (req, res) => {
  try {
    const products = await Product.getNewArrivals();
    
    res.json({
      success: true,
      message: 'New arrival products retrieved successfully',
      data: products
    });
  } catch (err) {
    console.error('Get new arrivals error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get Redragon products
exports.getRedragonProducts = async (req, res) => {
  try {
    const products = await Product.getByBrand('Redragon');
    
    res.json({
      success: true,
      message: 'Redragon products retrieved successfully',
      data: products
    });
  } catch (err) {
    console.error('Get Redragon products error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get all products with pagination
exports.getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    
    const products = await Product.getAll(limit, offset);
    
    res.json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
      pagination: {
        page,
        limit,
        total: products.length
      }
    });
  } catch (err) {
    console.error('Get all products error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (err) {
    console.error('Get product by ID error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// Create new product with images
exports.createProduct = async (req, res) => {
  try {
    const {
      name, description, specifications, brand_id, main_category_id,
      sub_category_id, price, sale_price, cost_price, stock_quantity,
      shipping_fee, color_id, weight, sku, is_featured, is_new_arrival, is_redragon
    } = req.body;

    // Validate required fields
    if (!name || !brand_id || !main_category_id || !price || !stock_quantity) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, brand_id, main_category_id, price, stock_quantity'
      });
    }

    // Generate slug and SKU if not provided
    const slug = await Product.generateSlug(name);
    const productSku = sku || `SKU-${Date.now()}`;

    // Parse specifications if it's a string
    let parsedSpecs = {};
    try {
      parsedSpecs = typeof specifications === 'string' 
        ? JSON.parse(specifications) 
        : specifications || {};
    } catch (e) {
      parsedSpecs = {};
    }

    const productData = {
      name: name.trim(),
      slug,
      sku: productSku,
      description: description || '',
      specifications: parsedSpecs,
      brand_id: parseInt(brand_id),
      main_category_id: parseInt(main_category_id),
      sub_category_id: sub_category_id ? parseInt(sub_category_id) : null,
      price: parseFloat(price),
      sale_price: sale_price ? parseFloat(sale_price) : null,
      cost_price: cost_price ? parseFloat(cost_price) : null,
      stock_quantity: parseInt(stock_quantity),
      shipping_fee: shipping_fee ? parseFloat(shipping_fee) : 0,
      color_id: color_id ? parseInt(color_id) : null,
      weight: weight ? parseFloat(weight) : null,
      is_active: 1,
      is_featured: parseInt(is_featured) || 0,
      is_new_arrival: parseInt(is_new_arrival) || 0,
      is_redragon: parseInt(is_redragon) || 0
    };

    // Debug: Log the product data being created
    console.log('Creating product with data:', productData);
    
    // Create product
    const result = await Product.create(productData);
    const productId = result.insertId;

    // Handle image uploads if files are provided
    if (req.files && req.files.length > 0) {
      try {
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          
          // Convert buffer to base64 for Cloudinary upload
          const b64 = Buffer.from(file.buffer).toString('base64');
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          
          // Upload to Cloudinary using the utility function
          const uploadResult = await uploadToCloudinary(dataURI, 'products');

          // Save image info to database
          const imageQuery = `
            INSERT INTO product_image_uploads (product_id, image_path, public_id, is_primary)
            VALUES (?, ?, ?, ?)
          `;
          await require('../config/db').execute(imageQuery, [
            productId,
            uploadResult.url,
            uploadResult.public_id,
            i === 0 ? 1 : 0 // First image is primary
          ]);
        }
      } catch (imageError) {
        console.error('Error uploading images:', imageError);
        // Continue without failing the product creation
      }
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { id: productId, ...productData }
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product: ' + error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name, description, specifications, brand_id, main_category_id,
      sub_category_id, price, sale_price, cost_price, stock_quantity,
      shipping_fee, color_id, weight, sku, is_active, is_featured, is_new_arrival, is_redragon
    } = req.body;

    // Check if product exists
    const existingProduct = await Product.getById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Generate new slug if name changed
    const slug = name !== existingProduct.name 
      ? await Product.generateSlug(name, productId)
      : existingProduct.slug;

    // Parse specifications if it's a string
    let parsedSpecs = {};
    try {
      parsedSpecs = typeof specifications === 'string' 
        ? JSON.parse(specifications) 
        : specifications || {};
    } catch (e) {
      parsedSpecs = existingProduct.specifications || {};
    }

    const productData = {
      name: name?.trim() || existingProduct.name,
      slug,
      sku: sku || existingProduct.sku,
      description: description !== undefined ? description : existingProduct.description,
      specifications: parsedSpecs,
      brand_id: brand_id ? parseInt(brand_id) : existingProduct.brand_id,
      main_category_id: main_category_id ? parseInt(main_category_id) : existingProduct.main_category_id,
      sub_category_id: sub_category_id ? parseInt(sub_category_id) : existingProduct.sub_category_id,
      price: price ? parseFloat(price) : existingProduct.price,
      sale_price: sale_price ? parseFloat(sale_price) : existingProduct.sale_price,
      cost_price: cost_price ? parseFloat(cost_price) : existingProduct.cost_price,
      stock_quantity: stock_quantity !== undefined ? parseInt(stock_quantity) : existingProduct.stock_quantity,
      shipping_fee: shipping_fee !== undefined ? parseFloat(shipping_fee) : (existingProduct.shipping_fee || 0),
      color_id: color_id ? parseInt(color_id) : existingProduct.color_id,
      weight: weight ? parseFloat(weight) : existingProduct.weight,
      is_active: is_active !== undefined ? parseInt(is_active) : existingProduct.is_active,
      is_featured: is_featured !== undefined ? parseInt(is_featured) : (existingProduct.is_featured || 0),
      is_new_arrival: is_new_arrival !== undefined ? parseInt(is_new_arrival) : (existingProduct.is_new_arrival || 0),
      is_redragon: is_redragon !== undefined ? parseInt(is_redragon) : (existingProduct.is_redragon || 0)
    };

    // Update product
    await Product.update(productId, productData);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { id: productId, ...productData }
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product: ' + error.message
    });
  }
};

// Delete product (soft delete)
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const existingProduct = await Product.getById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete the product
    await Product.delete(productId);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product: ' + error.message
    });
  }
};

// Get product images
exports.getProductImages = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const existingProduct = await Product.getById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product images retrieved successfully',
      data: existingProduct.images || []
    });

  } catch (error) {
    console.error('Get product images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving product images: ' + error.message
    });
  }
};

// Update product images
exports.updateProductImages = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const existingProduct = await Product.getById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Handle new image uploads if files are provided
    if (req.files && req.files.length > 0) {
      try {
        // Delete old image records from database
        const deleteQuery = 'DELETE FROM product_image_uploads WHERE product_id = ?';
        await require('../config/db').execute(deleteQuery, [productId]);

        // Upload new images
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
          
          // Convert buffer to base64 for Cloudinary upload
          const b64 = Buffer.from(file.buffer).toString('base64');
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          
          // Upload to Cloudinary
          const uploadResult = await uploadToCloudinary(dataURI, 'products');

          // Save new image info to database
          const imageQuery = `
            INSERT INTO product_image_uploads (product_id, image_path, public_id, is_primary)
            VALUES (?, ?, ?, ?)
          `;
          await require('../config/db').execute(imageQuery, [
            productId,
            uploadResult.url,
            uploadResult.public_id,
            i === 0 ? 1 : 0 // First image is primary
          ]);
        }

        res.json({
          success: true,
          message: 'Product images updated successfully'
        });

      } catch (imageError) {
        console.error('Error uploading images:', imageError);
        res.status(500).json({
          success: false,
          message: 'Error uploading images: ' + imageError.message
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'No images provided'
      });
    }

  } catch (error) {
    console.error('Update product images error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product images: ' + error.message
    });
  }
};