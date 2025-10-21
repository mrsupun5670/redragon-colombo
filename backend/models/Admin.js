const pool = require('../config/db');

const Admin = {
  // Find admin by username (parameterized query)
  findByUsername: async (username) => {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? OR email = ?', [username, username]);
    return rows[0];
  },

  // Find admin by ID
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
    return rows[0];
  },

  // Update last login timestamp
  updateLastLogin: async (id) => {
    const [result] = await pool.query(
      'UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
    return result;
  },

  // Create new admin
  create: async (adminData) => {
    const [result] = await pool.query(
      'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)',
      [adminData.username, adminData.email, adminData.password_hash]
    );
    return result;
  }
};

module.exports = Admin;