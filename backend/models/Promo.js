const db = require('../config/db');

class Promo {
  // Validate promo code and get discount
  static async validatePromoCode(promoCode) {
    try {
      const query = 'SELECT * FROM promo WHERE promo_code = ?';
      const [rows] = await db.executeWithRetry(query, [promoCode]);
      
      if (rows.length > 0) {
        return {
          valid: true,
          discount: rows[0].discount_price,
          promo: rows[0]
        };
      }
      
      return {
        valid: false,
        discount: 0,
        promo: null
      };
    } catch (error) {
      throw error;
    }
  }

  // Get all promo codes (admin)
  static async getAllPromoCodes() {
    try {
      const query = 'SELECT * FROM promo ORDER BY id DESC';
      const [rows] = await db.executeWithRetry(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Create new promo code (admin)
  static async createPromoCode(promoCode, discountPrice) {
    try {
      const query = 'INSERT INTO promo (promo_code, discount_price) VALUES (?, ?)';
      const [result] = await db.executeWithRetry(query, [promoCode, discountPrice]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update promo code (admin)
  static async updatePromoCode(id, promoCode, discountPrice) {
    try {
      const query = 'UPDATE promo SET promo_code = ?, discount_price = ? WHERE id = ?';
      const [result] = await db.executeWithRetry(query, [promoCode, discountPrice, id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete promo code (admin)
  static async deletePromoCode(id) {
    try {
      const query = 'DELETE FROM promo WHERE id = ?';
      const [result] = await db.executeWithRetry(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Promo;