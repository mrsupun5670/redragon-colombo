const pool = require('../config/db');

const Admin = {
  // Find admin by username (parameterized query)
  findByUsername: async (username) => {
    const [rows] = await pool.queryWithRetry('SELECT * FROM admins WHERE username = ? OR email = ?', [username, username]);
    return rows[0];
  },

  // Find admin by ID
  findById: async (id) => {
    const [rows] = await pool.queryWithRetry('SELECT * FROM admins WHERE id = ?', [id]);
    return rows[0];
  },

  // Update last login timestamp
  updateLastLogin: async (id) => {
    const [result] = await pool.queryWithRetry(
      'UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
    return result;
  },

  // Create new admin
  create: async (adminData) => {
    const [result] = await pool.queryWithRetry(
      'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)',
      [adminData.username, adminData.email, adminData.password_hash]
    );
    return result;
  },

  // Update admin password
  updatePassword: async (id, newPasswordHash) => {
    const [result] = await pool.queryWithRetry(
      'UPDATE admins SET password_hash = ? WHERE id = ?',
      [newPasswordHash, id]
    );
    return result;
  },

  // Find admin by email
  findByEmail: async (email) => {
    const [rows] = await pool.queryWithRetry(
      'SELECT * FROM admins WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  // Set password reset OTP and expiry
  setPasswordResetCode: async (email, resetCode, resetCodeExpiry) => {
    const [result] = await pool.queryWithRetry(
      'UPDATE admins SET password_reset_code = ?, password_reset_code_expiry = ? WHERE email = ?',
      [resetCode, resetCodeExpiry, email]
    );
    return result;
  },

  // Find admin by reset code
  findByResetCode: async (resetCode) => {
    const [rows] = await pool.queryWithRetry(
      'SELECT * FROM admins WHERE password_reset_code = ? AND password_reset_code_expiry > NOW()',
      [resetCode]
    );
    return rows[0];
  },

  // Clear password reset code
  clearPasswordResetCode: async (id) => {
    const [result] = await pool.queryWithRetry(
      'UPDATE admins SET password_reset_code = NULL, password_reset_code_expiry = NULL WHERE id = ?',
      [id]
    );
    return result;
  }
};

module.exports = Admin;