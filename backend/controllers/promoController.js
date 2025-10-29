const Promo = require('../models/Promo');

// Validate promo code
exports.validatePromoCode = async (req, res) => {
  try {
    const { promo_code } = req.body;
    
    if (!promo_code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }

    const result = await Promo.validatePromoCode(promo_code);
    
    if (result.valid) {
      return res.json({
        success: true,
        message: 'Promo code is valid',
        data: {
          valid: true,
          discount: result.discount,
          promo_code: result.promo.promo_code
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid promo code',
        data: {
          valid: false,
          discount: 0
        }
      });
    }
  } catch (error) {
    console.error('Validate promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all promo codes (admin only)
exports.getAllPromoCodes = async (req, res) => {
  try {
    const promoCodes = await Promo.getAllPromoCodes();
    res.json({
      success: true,
      message: 'Promo codes retrieved successfully',
      data: promoCodes
    });
  } catch (error) {
    console.error('Get promo codes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create promo code (admin only)
exports.createPromoCode = async (req, res) => {
  try {
    const { promo_code, discount_price } = req.body;
    
    if (!promo_code || discount_price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Promo code and discount price are required'
      });
    }

    const result = await Promo.createPromoCode(promo_code, discount_price);
    res.status(201).json({
      success: true,
      message: 'Promo code created successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Create promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update promo code (admin only)
exports.updatePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { promo_code, discount_price } = req.body;
    
    if (!promo_code || discount_price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Promo code and discount price are required'
      });
    }

    const result = await Promo.updatePromoCode(id, promo_code, discount_price);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }

    res.json({
      success: true,
      message: 'Promo code updated successfully'
    });
  } catch (error) {
    console.error('Update promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete promo code (admin only)
exports.deletePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Promo.deletePromoCode(id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }

    res.json({
      success: true,
      message: 'Promo code deleted successfully'
    });
  } catch (error) {
    console.error('Delete promo code error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};