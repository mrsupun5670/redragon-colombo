const db = require('../config/db');
const { getSriLankanTimestamp } = require('../utils/timezone');

const ShippingAddress = {
  // Create new customer address (keeps history, doesn't delete old ones)
  async createNewDefault(customerId, addressData) {
    try {
      const [result] = await db.query(
        `INSERT INTO shipping_addresses 
         (customers_customer_id, phone, address_line1, address_line2, city_name, 
          district_name, province_name, postal_code, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ${getSriLankanTimestamp()})`,
        [
          customerId,
          addressData.phone,
          addressData.address_line1,
          addressData.address_line2 || null,
          addressData.city_name,
          addressData.district_name,
          addressData.province_name,
          addressData.postal_code
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  // Legacy method name for backward compatibility
  async createOrUpdateDefault(customerId, addressData) {
    return this.createNewDefault(customerId, addressData);
  },

  // Get customer's most recent default shipping address
  async getDefaultByCustomerId(customerId) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM shipping_addresses 
         WHERE customers_customer_id = ? 
         ORDER BY created_at DESC LIMIT 1`,
        [customerId]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get all shipping addresses for a customer (including history)
  async getAllByCustomerId(customerId) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM shipping_addresses 
         WHERE customers_customer_id = ? 
         ORDER BY created_at DESC`,
        [customerId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get customer's address history 
  async getAddressHistory(customerId, limit = 10) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM shipping_addresses 
         WHERE customers_customer_id = ? 
         ORDER BY created_at DESC 
         LIMIT ?`,
        [customerId, limit]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Create shipping address for a specific order (now just creates address, no order reference)
  async createForOrder(customerId, addressData) {
    try {
      const [result] = await db.query(
        `INSERT INTO shipping_addresses 
         (customers_customer_id, phone, address_line1, address_line2, 
          city_name, district_name, province_name, postal_code, delivery_notes, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ${getSriLankanTimestamp()})`,
        [
          customerId,
          addressData.phone,
          addressData.address_line1,
          addressData.address_line2 || null,
          addressData.city_name,
          addressData.district_name,
          addressData.province_name,
          addressData.postal_code,
          addressData.delivery_notes || null
        ]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  // Get shipping address by ID
  async getById(addressId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM shipping_addresses WHERE id = ?',
        [addressId]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Delete shipping address
  async delete(addressId, customerId) {
    try {
      const [result] = await db.query(
        'DELETE FROM shipping_addresses WHERE id = ? AND customers_customer_id = ?',
        [addressId, customerId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ShippingAddress;