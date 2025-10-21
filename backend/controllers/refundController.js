const Refund = require('../models/Refund');
const Order = require('../models/Order');

exports.createRefund = async (req, res) => {
  try {
    const {
      order_id,
      product_name,
      quantity,
      refund_amount,
      reason,
      detailed_description,
      images
    } = req.body;

    const customer_id = req.user.id; // From auth middleware

    // Validation
    if (!order_id || !product_name || !refund_amount || !reason) {
      return res.status(400).json({
        success: false,
        msg: 'Please provide all required fields'
      });
    }

    // Create refund request
    const result = await Refund.create({
      order_id,
      customer_id,
      product_name,
      quantity: quantity || 1,
      refund_amount,
      reason,
      detailed_description: detailed_description || '',
      images: images || []
    });

    res.status(201).json({
      success: true,
      msg: 'Refund request submitted successfully',
      refund_id: result.insertId
    });

  } catch (err) {
    console.error('Create refund error:', err);
    res.status(500).json({
      success: false,
      msg: 'Server error. Please try again later.'
    });
  }
};

exports.getAllRefunds = async (req, res) => {
  try {
    const { status } = req.query;

    const filters = {};
    if (status) filters.status = status;

    const refunds = await Refund.findAll(filters);

    res.json({
      success: true,
      refunds
    });

  } catch (err) {
    console.error('Get refunds error:', err);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

exports.getRefundById = async (req, res) => {
  try {
    const { id } = req.params;

    const refund = await Refund.findById(id);

    if (!refund) {
      return res.status(404).json({
        success: false,
        msg: 'Refund not found'
      });
    }

    res.json({
      success: true,
      refund
    });

  } catch (err) {
    console.error('Get refund error:', err);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

exports.getCustomerRefunds = async (req, res) => {
  try {
    const customer_id = req.user.id;

    const refunds = await Refund.findByCustomer(customer_id);

    res.json({
      success: true,
      refunds
    });

  } catch (err) {
    console.error('Get customer refunds error:', err);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

exports.updateRefundStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;
    const admin_id = req.user.id; // From auth middleware

    // Validate status
    const validStatuses = ['pending', 'approved', 'rejected', 'processed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid status'
      });
    }

    await Refund.updateStatus(id, status, admin_notes || '', admin_id);

    res.json({
      success: true,
      msg: `Refund ${status} successfully`
    });

  } catch (err) {
    console.error('Update refund status error:', err);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};

exports.getRefundStatistics = async (req, res) => {
  try {
    const stats = await Refund.getStatistics();

    res.json({
      success: true,
      statistics: stats
    });

  } catch (err) {
    console.error('Get refund statistics error:', err);
    res.status(500).json({
      success: false,
      msg: 'Server error'
    });
  }
};
