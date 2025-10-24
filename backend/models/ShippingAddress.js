const db = require('../config/db');

const ShippingAddress = {
  // Create or update customer's default shipping address
  async createOrUpdateDefault(customerId, addressData) {
    try {
      // First, remove any existing default addresses for this customer
      await db.query(
        'DELETE FROM shipping_addresses WHERE customers_customer_id = ? AND order_id IS NULL',
        [customerId]
      );

      // Create new default address (order_id will be NULL for default addresses)
      const [result] = await db.query(
        `INSERT INTO shipping_addresses 
         (customers_customer_id, phone, address_line1, address_line2, city_name, 
          district_name, province_name, postal_code) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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

  // Get customer's default shipping address
  async getDefaultByCustomerId(customerId) {
    try {
      const [rows] = await db.query(
        `SELECT * FROM shipping_addresses 
         WHERE customers_customer_id = ? AND order_id IS NULL 
         ORDER BY created_at DESC LIMIT 1`,
        [customerId]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  },

  // Get all shipping addresses for a customer
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

  // Create shipping address for a specific order
  async createForOrder(orderId, customerId, addressData) {
    try {
      const [result] = await db.query(
        `INSERT INTO shipping_addresses 
         (order_id, customers_customer_id, phone, address_line1, address_line2, 
          city_name, district_name, province_name, postal_code, delivery_notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
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

  // Get shipping address by order ID
  async getByOrderId(orderId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM shipping_addresses WHERE order_id = ?',
        [orderId]
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
        'DELETE FROM shipping_addresses WHERE id = ? AND customers_customer_id = ? AND order_id IS NULL',
        [addressId, customerId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ShippingAddress;