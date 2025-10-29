const ShippingAddress = require('../models/ShippingAddress');

const addressController = {
  // Create or update customer's default shipping address
  async updateDefaultAddress(req, res) {
    try {
      const customerId = req.user.id;
      const { 
        phone, 
        addressLine1, 
        addressLine2, 
        cityName, 
        districtName, 
        provinceName, 
        postalCode 
      } = req.body;

      console.log(req.body);
      

      // Validate required fields
      if (!phone || !addressLine1 || !cityName || !districtName || !provinceName || !postalCode) {
        return res.status(400).json({
          success: false,
          message: 'All required address fields must be provided'
        });
      }

      const addressData = {
        phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        city_name: cityName,
        district_name: districtName,
        province_name: provinceName,
        postal_code: postalCode
      };

      const addressId = await ShippingAddress.createOrUpdateDefault(customerId, addressData);

      res.json({
        success: true,
        message: 'Default shipping address updated successfully',
        data: { addressId }
      });
    } catch (error) {
      console.error('Update default address error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get customer's default shipping address
  async getDefaultAddress(req, res) {
    try {
      const customerId = req.user.id;
      
      const address = await ShippingAddress.getDefaultByCustomerId(customerId);
      
      res.json({
        success: true,
        message: 'Default address retrieved successfully',
        data: address
      });
    } catch (error) {
      console.error('Get default address error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get all customer addresses
  async getAllAddresses(req, res) {
    try {
      const customerId = req.user.id;
      
      const addresses = await ShippingAddress.getAllByCustomerId(customerId);
      
      res.json({
        success: true,
        message: 'Addresses retrieved successfully',
        data: addresses
      });
    } catch (error) {
      console.error('Get all addresses error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get customer's address history
  async getAddressHistory(req, res) {
    try {
      const customerId = req.user.id;
      const limit = parseInt(req.query.limit) || 10;
      
      const addressHistory = await ShippingAddress.getAddressHistory(customerId, limit);
      
      res.json({
        success: true,
        message: 'Address history retrieved successfully',
        data: addressHistory
      });
    } catch (error) {
      console.error('Get address history error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Delete address
  async deleteAddress(req, res) {
    try {
      const customerId = req.user.id;
      const { addressId } = req.params;
      
      const deleted = await ShippingAddress.delete(addressId, customerId);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Address not found or cannot be deleted'
        });
      }
      
      res.json({
        success: true,
        message: 'Address deleted successfully'
      });
    } catch (error) {
      console.error('Delete address error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
};

module.exports = addressController;