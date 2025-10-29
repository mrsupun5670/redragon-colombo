const db = require('../config/db');

const Cart = {
  async findByCustomerId(customerId) {
    const [rows] = await db.queryWithRetry('SELECT * FROM carts WHERE customer_id = ?', [customerId]);
    return rows[0];
  },

  async create(customerId) {
    const [result] = await db.queryWithRetry('INSERT INTO carts (customer_id) VALUES (?)', [customerId]);
    return result.insertId;
  },

  async getCartItems(cartId) {
    const [rows] = await db.queryWithRetry(
      `SELECT p.id, p.name, p.slug, p.price, p.sale_price, p.weight, p.stock_quantity, 
              ci.quantity, b.name as brand_name, iu.image_path as primary_image
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       JOIN brands b ON p.brand_id = b.id
       LEFT JOIN product_image_uploads iu ON p.id = iu.product_id AND iu.is_primary = 1
       WHERE ci.cart_id = ? AND p.is_active = 1`,
      [cartId]
    );
    
    return rows;
  },

  async addToCart(cartId, productId, quantity) {
    const [result] = await db.queryWithRetry(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
      [cartId, productId, quantity, quantity]
    );
    return result;
  },

  async updateItemQuantity(cartId, productId, quantity) {
    const [result] = await db.queryWithRetry(
      'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
      [quantity, cartId, productId]
    );
    return result;
  },

  async removeFromCart(cartId, productId) {
    const [result] = await db.queryWithRetry('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
    return result;
  },

  async clearCart(cartId) {
    const [result] = await db.queryWithRetry('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    return result;
  },

  async validateProduct(productId, requestedQuantity) {
    const [rows] = await db.queryWithRetry(
      'SELECT id, name, stock_quantity, is_active FROM products WHERE id = ?',
      [productId]
    );
    
    if (rows.length === 0) {
      throw new Error('Product not found');
    }
    
    const product = rows[0];
    
    if (!product.is_active) {
      throw new Error('Product is not available');
    }
    
    if (product.stock_quantity < requestedQuantity) {
      throw new Error(`Only ${product.stock_quantity} items available in stock`);
    }
    
    return product;
  },

  async getCartItemCount(cartId, productId) {
    const [rows] = await db.queryWithRetry(
      'SELECT quantity FROM cart_items WHERE cart_id = ? AND product_id = ?',
      [cartId, productId]
    );
    return rows.length > 0 ? rows[0].quantity : 0;
  },
};

module.exports = Cart;