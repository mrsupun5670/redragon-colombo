const Product = require('../models/Product');

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

// Legacy CRUD operations (using old callback style)
exports.createProduct = (req, res) => {
  const product = req.body;
  Product.create(product, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error creating product' });
    }
    res.status(201).json({ success: true, data: result });
  });
};

exports.updateProduct = (req, res) => {
  const product = req.body;
  Product.update(req.params.id, product, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error updating product' });
    }
    res.json({ success: true, data: result });
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error deleting product' });
    }
    res.json({ success: true, data: result });
  });
};