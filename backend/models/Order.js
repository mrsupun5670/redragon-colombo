const db = require('../config/db');

class Order {
  // Get all orders with customer and payment method details
  static async getAll(limit = 50, offset = 0) {
    try {
      const query = `
        SELECT 
          o.*,
          CONCAT(c.first_name, ' ', c.last_name) as customer_name,
          c.email as customer_email,
          c.phone as customer_phone,
          pm.name as payment_method_name
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.customer_id
        LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
        ORDER BY o.created_at DESC
        LIMIT ? OFFSET ?
      `;
      const [rows] = await db.execute(query, [limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get order by ID with all details
  static async getById(orderId) {
    try {
      const query = `
        SELECT 
          o.*,
          CONCAT(c.first_name, ' ', c.last_name) as customer_name,
          c.email as customer_email,
          c.phone as customer_phone,
          pm.name as payment_method_name
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.customer_id
        LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
        WHERE o.id = ?
      `;
      const [rows] = await db.execute(query, [orderId]);
      
      if (rows.length === 0) {
        return null;
      }

      const order = rows[0];
      
      // Get order items
      const itemsQuery = `
        SELECT * FROM order_items 
        WHERE order_id = ?
        ORDER BY id
      `;
      const [items] = await db.execute(itemsQuery, [orderId]);
      order.items = items;
      
      return order;
    } catch (error) {
      throw error;
    }
  }

  // Update order status
  static async updateStatus(orderId, orderStatus) {
    try {
      const query = `
        UPDATE orders 
        SET order_status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;
      const [result] = await db.execute(query, [orderStatus, orderId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  static async updatePaymentStatus(orderId, paymentStatus) {
    try {
      const query = `
        UPDATE orders 
        SET payment_status = ?, 
            paid_at = CASE WHEN ? = 'paid' THEN CURRENT_TIMESTAMP ELSE NULL END,
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `;
      const [result] = await db.execute(query, [paymentStatus, paymentStatus, orderId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get orders by status
  static async getByStatus(status, limit = 50, offset = 0) {
    try {
      const query = `
        SELECT 
          o.*,
          CONCAT(c.first_name, ' ', c.last_name) as customer_name,
          c.email as customer_email,
          c.phone as customer_phone,
          pm.name as payment_method_name
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.customer_id
        LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
        WHERE o.order_status = ?
        ORDER BY o.created_at DESC
        LIMIT ? OFFSET ?
      `;
      const [rows] = await db.execute(query, [status, limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Search orders by order number or customer name
  static async search(searchTerm, limit = 50, offset = 0) {
    try {
      const query = `
        SELECT 
          o.*,
          CONCAT(c.first_name, ' ', c.last_name) as customer_name,
          c.email as customer_email,
          c.phone as customer_phone,
          pm.name as payment_method_name
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.customer_id
        LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
        WHERE o.order_number LIKE ? 
           OR CONCAT(c.first_name, ' ', c.last_name) LIKE ?
           OR c.email LIKE ?
        ORDER BY o.created_at DESC
        LIMIT ? OFFSET ?
      `;
      const searchPattern = `%${searchTerm}%`;
      const [rows] = await db.execute(query, [searchPattern, searchPattern, searchPattern, limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Legacy create method (keeping for backwards compatibility)
  static create(order, callback) {
    const query = 'INSERT INTO orders SET ?';
    db.query(query, order, callback);
  }
}

module.exports = Order;