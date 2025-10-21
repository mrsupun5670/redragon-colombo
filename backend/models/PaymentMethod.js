const db = require('../config/db');

class PaymentMethod {
  // Get all active payment methods
  static async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM payment_methods WHERE is_active = 1 ORDER BY id ASC'
    );
    return rows;
  }

  // Get all payment methods (including inactive) for admin
  static async findAllForAdmin() {
    const [rows] = await db.query(
      'SELECT * FROM payment_methods ORDER BY created_at DESC'
    );
    return rows;
  }

  // Get payment method by ID
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM payment_methods WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Get payment method by method name
  static async findByName(method_name) {
    const [rows] = await db.query(
      'SELECT * FROM payment_methods WHERE method_name = ? AND is_active = 1',
      [method_name]
    );
    return rows[0];
  }

  // Create new payment method
  static async create({ method_name, display_name, fee_type, fee_value, description }) {
    const [result] = await db.query(
      `INSERT INTO payment_methods (method_name, display_name, fee_type, fee_value, description)
       VALUES (?, ?, ?, ?, ?)`,
      [method_name, display_name, fee_type || 'percentage', fee_value || 0, description]
    );
    return result.insertId;
  }

  // Update payment method
  static async update(id, { method_name, display_name, fee_type, fee_value, description, is_active }) {
    const updates = [];
    const values = [];

    if (method_name !== undefined) {
      updates.push('method_name = ?');
      values.push(method_name);
    }
    if (display_name !== undefined) {
      updates.push('display_name = ?');
      values.push(display_name);
    }
    if (fee_type !== undefined) {
      updates.push('fee_type = ?');
      values.push(fee_type);
    }
    if (fee_value !== undefined) {
      updates.push('fee_value = ?');
      values.push(fee_value);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(is_active);
    }

    if (updates.length === 0) {
      return false;
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE payment_methods SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Delete payment method
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM payment_methods WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  // Calculate payment fee
  static async calculateFee(methodName, subtotal) {
    const method = await this.findByName(methodName);

    if (!method) {
      throw new Error('Payment method not found');
    }

    if (!method.is_active) {
      throw new Error('Payment method is not active');
    }

    let fee = 0;

    if (method.fee_type === 'percentage') {
      fee = (subtotal * parseFloat(method.fee_value)) / 100;
    } else if (method.fee_type === 'fixed') {
      fee = parseFloat(method.fee_value);
    }

    // Round to 2 decimal places
    return Math.round(fee * 100) / 100;
  }
}

module.exports = PaymentMethod;
