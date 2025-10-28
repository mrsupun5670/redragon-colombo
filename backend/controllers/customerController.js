const Customer = require('../models/Customer');

const customerController = {
  // Get all customers for admin
  getAllCustomersForAdmin: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 50,
        search = '',
        status = 'all'
      } = req.query;

      const offset = (parseInt(page) - 1) * parseInt(limit);
      
      const customers = await Customer.getAll(
        parseInt(limit),
        offset,
        search,
        status
      );

      res.json({
        success: true,
        data: customers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: customers.length
        }
      });
    } catch (err) {
      console.error('Get customers error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching customers'
      });
    }
  },

  // Get customer by ID for admin
  getCustomerByIdForAdmin: async (req, res) => {
    try {
      const { id } = req.params;
      
      const customer = await Customer.getByIdDetailed(id);
      
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }

      // Get customer orders
      const orders = await Customer.getCustomerOrders(id, 10, 0);

      res.json({
        success: true,
        data: {
          ...customer,
          recent_orders: orders
        }
      });
    } catch (err) {
      console.error('Get customer by ID error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching customer details'
      });
    }
  },

  // Get customer orders
  getCustomerOrders: async (req, res) => {
    try {
      const { id } = req.params;
      const { page = 1, limit = 20 } = req.query;
      
      const offset = (parseInt(page) - 1) * parseInt(limit);
      
      const orders = await Customer.getCustomerOrders(id, parseInt(limit), offset);

      res.json({
        success: true,
        data: orders
      });
    } catch (err) {
      console.error('Get customer orders error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching customer orders'
      });
    }
  },

  // Update customer status
  updateCustomerStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { is_active } = req.body;

      // Validate input
      if (typeof is_active !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value. Must be true or false.'
        });
      }

      // Check if customer exists
      const existingCustomer = await Customer.findById(id);
      if (!existingCustomer || existingCustomer.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }

      // Update customer status
      const updated = await Customer.updateStatus(id, is_active);

      if (!updated) {
        return res.status(400).json({
          success: false,
          message: 'Failed to update customer status'
        });
      }

      res.json({
        success: true,
        message: `Customer ${is_active ? 'activated' : 'deactivated'} successfully`
      });
    } catch (err) {
      console.error('Update customer status error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while updating customer status'
      });
    }
  },

  // Update email verification status
  updateEmailVerification: async (req, res) => {
    try {
      const { id } = req.params;
      const { email_verified } = req.body;

      // Validate input
      if (typeof email_verified !== 'boolean') {
        return res.status(400).json({
          success: false,
          message: 'Invalid verification value. Must be true or false.'
        });
      }

      // Check if customer exists
      const existingCustomer = await Customer.findById(id);
      if (!existingCustomer || existingCustomer.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }

      // Update email verification status
      const updated = await Customer.updateEmailVerification(id, email_verified);

      if (!updated) {
        return res.status(400).json({
          success: false,
          message: 'Failed to update email verification status'
        });
      }

      res.json({
        success: true,
        message: `Customer email ${email_verified ? 'verified' : 'unverified'} successfully`
      });
    } catch (err) {
      console.error('Update email verification error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while updating email verification'
      });
    }
  },

  // Get customer statistics
  getCustomerStatistics: async (req, res) => {
    try {
      const stats = await Customer.getStatistics();

      res.json({
        success: true,
        data: stats
      });
    } catch (err) {
      console.error('Get customer statistics error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching customer statistics'
      });
    }
  }
};

module.exports = customerController;