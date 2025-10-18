const pool = require('../config/db');

const Customer = {
  // Create new customer with parameterized queries (SQL injection protection)
  create: async (newCustomer) => {
    const [result] = await pool.query(
      'INSERT INTO customers (first_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)',
      [newCustomer.first_name, newCustomer.last_name, newCustomer.email, newCustomer.phone, newCustomer.password_hash]
    );
    return result;
  },

  // Find customer by email (parameterized query)
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM customers WHERE email = ?', [email]);
    return rows;
  },

  // Find customer by ID (parameterized query)
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
    return rows;
  },

  // Find customer by phone
  findByPhone: async (phone) => {
    const [rows] = await pool.query('SELECT * FROM customers WHERE phone = ?', [phone]);
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

    const [result] = await pool.query(
      `UPDATE customers SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE customer_id = ?`,
      values
    );
    return result;
  }
};

module.exports = Customer;
