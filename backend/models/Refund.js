const pool = require('../config/db');

const Refund = {
  // Create new refund request
  create: async (refundData) => {
    const [result] = await pool.queryWithRetry(
      `INSERT INTO refunds (order_id, customer_id, product_name, quantity, refund_amount, reason, detailed_description, images)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        refundData.order_id,
        refundData.customer_id,
        refundData.product_name,
        refundData.quantity,
        refundData.refund_amount,
        refundData.reason,
        refundData.detailed_description,
        JSON.stringify(refundData.images)
      ]
    );
    return result;
  },

  // Find all refunds
  findAll: async (filters = {}) => {
    let query = `
      SELECT r.*,
             c.first_name, c.last_name, c.email, c.phone,
             o.total as order_total, o.status as order_status
      FROM refunds r
      LEFT JOIN customers c ON r.customer_id = c.customer_id
      LEFT JOIN orders o ON r.order_id = o.order_id
    `;

    const conditions = [];
    const params = [];

    if (filters.status) {
      conditions.push('r.status = ?');
      params.push(filters.status);
    }

    if (filters.customer_id) {
      conditions.push('r.customer_id = ?');
      params.push(filters.customer_id);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY r.requested_at DESC';

    const [rows] = await pool.queryWithRetry(query, params);
    return rows;
  },

  // Find refund by ID
  findById: async (refundId) => {
    const [rows] = await pool.queryWithRetry(
      `SELECT r.*,
              c.first_name, c.last_name, c.email, c.phone,
              o.total as order_total, o.status as order_status, o.date as order_date
       FROM refunds r
       LEFT JOIN customers c ON r.customer_id = c.customer_id
       LEFT JOIN orders o ON r.order_id = o.order_id
       WHERE r.refund_id = ?`,
      [refundId]
    );
    return rows[0];
  },

  // Find refunds by customer ID
  findByCustomer: async (customerId) => {
    const [rows] = await pool.queryWithRetry(
      `SELECT r.*, o.total as order_total, o.status as order_status
       FROM refunds r
       LEFT JOIN orders o ON r.order_id = o.order_id
       WHERE r.customer_id = ?
       ORDER BY r.requested_at DESC`,
      [customerId]
    );
    return rows;
  },

  // Update refund status
  updateStatus: async (refundId, status, adminNotes, adminId) => {
    const [result] = await pool.queryWithRetry(
      `UPDATE refunds
       SET status = ?, admin_notes = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ?, updated_at = CURRENT_TIMESTAMP
       WHERE refund_id = ?`,
      [status, adminNotes, adminId, refundId]
    );
    return result;
  },

  // Get refund statistics
  getStatistics: async () => {
    const [rows] = await pool.queryWithRetry(`
      SELECT
        COUNT(*) as total_refunds,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_refunds,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_refunds,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_refunds,
        SUM(CASE WHEN status = 'processed' THEN 1 ELSE 0 END) as processed_refunds,
        SUM(CASE WHEN status IN ('approved', 'processed') THEN refund_amount ELSE 0 END) as total_refund_amount
      FROM refunds
    `);
    return rows[0];
  }
};

module.exports = Refund;
