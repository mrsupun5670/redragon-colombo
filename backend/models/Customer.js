const pool = require('../config/db');
const { getSriLankanTimestamp } = require('../utils/timezone');

const Customer = {
  // Create new customer with parameterized queries (SQL injection protection)
  create: async (newCustomer) => {
    const [result] = await pool.queryWithRetry(
      'INSERT INTO customers (first_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)',
      [newCustomer.first_name, newCustomer.last_name, newCustomer.email, newCustomer.phone, newCustomer.password_hash]
    );
    return result;
  },

  // Find customer by email (parameterized query)
  findByEmail: async (email) => {
    const [rows] = await pool.queryWithRetry('SELECT * FROM customers WHERE email = ?', [email]);
    return rows;
  },

  // Find customer by ID (parameterized query)
  findById: async (id) => {
    const [rows] = await pool.queryWithRetry('SELECT * FROM customers WHERE customer_id = ?', [id]);
    return rows;
  },

  // Find customer by phone
  findByPhone: async (phone) => {
    const [rows] = await pool.queryWithRetry('SELECT * FROM customers WHERE phone = ?', [phone]);
    return rows;
  },

  // Update customer information
  update: async (id, updateData) => {
    const fields = [];
    const values = [];

    // Dynamically build update query with only provided fields
    Object.keys(updateData).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    });

    values.push(id);

    const [result] = await pool.queryWithRetry(
      `UPDATE customers SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE customer_id = ?`,
      values
    );
    return result;
  },

  // Set password reset code
  setPasswordResetCode: async (email, resetCode, expiresAt) => {
    const [result] = await pool.queryWithRetry(
      'UPDATE customers SET reset_code = ?, reset_code_expires = ? WHERE email = ?',
      [resetCode, expiresAt, email]
    );
    return result;
  },

  // Find customer by reset code
  findByResetCode: async (code) => {
    const [rows] = await pool.queryWithRetry(
      'SELECT * FROM customers WHERE reset_code = ? AND reset_code_expires > NOW()',
      [code]
    );
    return rows;
  },

  // Clear password reset code
  clearPasswordResetCode: async (id) => {
    const [result] = await pool.queryWithRetry(
      'UPDATE customers SET reset_code = NULL, reset_code_expires = NULL WHERE customer_id = ?',
      [id]
    );
    return result;
  },

  // Update password
  updatePassword: async (id, newPasswordHash) => {
    const [result] = await pool.queryWithRetry(
      'UPDATE customers SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE customer_id = ?',
      [newPasswordHash, id]
    );
    return result;
  },

  // Admin management methods
  
  // Get all customers with pagination and filtering
  getAll: async (limit = 50, offset = 0, search = '', status = 'all') => {
    try {
      let query = `
        SELECT 
          c.customer_id as id,
          c.first_name,
          c.last_name,
          CONCAT(c.first_name, ' ', c.last_name) as full_name,
          c.email,
          c.phone,
          c.is_active,
          c.email_verified,
          c.created_at,
          c.updated_at,
          COUNT(DISTINCT o.id) as total_orders,
          COALESCE(SUM(o.total), 0) as total_spent
        FROM customers c
        LEFT JOIN orders o ON c.customer_id = o.customer_id
      `;
      
      const conditions = [];
      const params = [];
      
      // Add search condition
      if (search && search.trim()) {
        conditions.push(`(
          c.first_name LIKE ? OR 
          c.last_name LIKE ? OR 
          c.email LIKE ? OR 
          c.phone LIKE ? OR
          CONCAT(c.first_name, ' ', c.last_name) LIKE ?
        )`);
        const searchTerm = `%${search.trim()}%`;
        params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
      }
      
      // Add status filter
      if (status !== 'all') {
        if (status === 'active') {
          conditions.push('c.is_active = 1');
        } else if (status === 'inactive') {
          conditions.push('c.is_active = 0');
        } else if (status === 'verified') {
          conditions.push('c.email_verified = 1');
        } else if (status === 'unverified') {
          conditions.push('c.email_verified = 0');
        }
      }
      
      // Add WHERE clause if conditions exist
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      
      query += `
        GROUP BY c.customer_id
        ORDER BY c.created_at DESC
        LIMIT ? OFFSET ?
      `;
      
      params.push(parseInt(limit), parseInt(offset));
      
      const [rows] = await pool.queryWithRetry(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get customer by ID with detailed info
  getByIdDetailed: async (customerId) => {
    try {
      const query = `
        SELECT 
          c.customer_id as id,
          c.first_name,
          c.last_name,
          CONCAT(c.first_name, ' ', c.last_name) as full_name,
          c.email,
          c.phone,
          c.is_active,
          c.email_verified,
          c.created_at,
          c.updated_at,
          COUNT(DISTINCT o.id) as total_orders,
          COALESCE(SUM(o.total), 0) as total_spent
        FROM customers c
        LEFT JOIN orders o ON c.customer_id = o.customer_id
        WHERE c.customer_id = ?
        GROUP BY c.customer_id
      `;
      
      const [rows] = await pool.queryWithRetry(query, [customerId]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  },

  // Get customer orders
  getCustomerOrders: async (customerId, limit = 20, offset = 0) => {
    try {
      const query = `
        SELECT 
          o.id,
          o.order_number,
          o.total,
          o.order_status,
          o.payment_status,
          o.created_at,
          pm.name as payment_method_name
        FROM orders o
        LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
        WHERE o.customer_id = ?
        ORDER BY o.created_at DESC
        LIMIT ? OFFSET ?
      `;
      
      const [rows] = await pool.queryWithRetry(query, [customerId, parseInt(limit), parseInt(offset)]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Update customer status (active/inactive)
  updateStatus: async (customerId, isActive) => {
    try {
      const query = `
        UPDATE customers 
        SET is_active = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE customer_id = ?
      `;
      const [result] = await pool.queryWithRetry(query, [isActive ? 1 : 0, customerId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Update email verification status
  updateEmailVerification: async (customerId, isVerified) => {
    try {
      const query = `
        UPDATE customers 
        SET email_verified = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE customer_id = ?
      `;
      const [result] = await pool.queryWithRetry(query, [isVerified ? 1 : 0, customerId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  },

  // Get customer statistics
  getStatistics: async () => {
    try {
      const query = `
        SELECT
          COUNT(*) as total_customers,
          SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_customers,
          SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive_customers,
          SUM(CASE WHEN email_verified = 1 THEN 1 ELSE 0 END) as verified_customers,
          SUM(CASE WHEN email_verified = 0 THEN 1 ELSE 0 END) as unverified_customers,
          SUM(CASE WHEN created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 ELSE 0 END) as new_customers_30_days
        FROM customers
      `;
      
      const [rows] = await pool.queryWithRetry(query);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Customer;
