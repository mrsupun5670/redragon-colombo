const db = require('../config/db');

class ProductReview {
  // Get all reviews for a product
  static async findByProductId(productId) {
    const [rows] = await db.queryWithRetry(
      `SELECT
        pr.id,
        pr.product_id,
        pr.customer_id,
        pr.rating,
        pr.review_text,
        pr.created_at,
        COALESCE(CONCAT(c.first_name, ' ', c.last_name), 'Anonymous') as customer_name
       FROM product_reviews pr
       LEFT JOIN customers c ON pr.customer_id = c.customer_id
       WHERE pr.product_id = ?
       ORDER BY pr.created_at DESC`,
      [productId]
    );
    return rows;
  }

  // Get review by ID
  static async findById(id) {
    const [rows] = await db.queryWithRetry(
      `SELECT
        pr.id,
        pr.product_id,
        pr.customer_id,
        pr.rating,
        pr.review_text,
        pr.created_at,
        COALESCE(CONCAT(c.first_name, ' ', c.last_name), 'Anonymous') as customer_name
       FROM product_reviews pr
       LEFT JOIN customers c ON pr.customer_id = c.customer_id
       WHERE pr.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Create a new review
  static async create({ product_id, customer_id, rating, review_text }) {
    const [result] = await db.queryWithRetry(
      `INSERT INTO product_reviews (product_id, customer_id, rating, review_text, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [product_id, customer_id, rating, review_text]
    );
    return result.insertId;
  }

  // Update a review
  static async update(id, { rating, review_text }) {
    const [result] = await db.queryWithRetry(
      `UPDATE product_reviews
       SET rating = ?, review_text = ?
       WHERE id = ?`,
      [rating, review_text, id]
    );
    return result.affectedRows > 0;
  }

  // Delete a review
  static async delete(id) {
    const [result] = await db.queryWithRetry(
      `DELETE FROM product_reviews WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }

  // Check if customer has purchased this product
  static async hasCustomerPurchased(customerId, productId) {
    const [rows] = await db.queryWithRetry(
      `SELECT 1 FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       WHERE o.customer_id = ? AND oi.product_id = ?
       LIMIT 1`,
      [customerId, productId]
    );
    return rows.length > 0;
  }

  // Check if customer has already reviewed this product
  static async hasCustomerReviewed(customerId, productId) {
    const [rows] = await db.queryWithRetry(
      `SELECT 1 FROM product_reviews
       WHERE customer_id = ? AND product_id = ?
       LIMIT 1`,
      [customerId, productId]
    );
    return rows.length > 0;
  }

  // Get average rating for a product
  static async getAverageRating(productId) {
    const [rows] = await db.queryWithRetry(
      `SELECT AVG(CAST(rating AS DECIMAL(3,2))) as average_rating, COUNT(*) as total_reviews
       FROM product_reviews
       WHERE product_id = ?`,
      [productId]
    );
    return rows[0];
  }
}

module.exports = ProductReview;
