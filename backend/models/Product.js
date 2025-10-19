const db = require('../config/db');

class Product {
  // Get all featured products
  static async getFeatured() {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        WHERE p.is_featured = 1 AND p.is_active = 1
        ORDER BY p.created_at DESC
      `;
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get all new arrival products
  static async getNewArrivals() {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        WHERE p.is_new_arrival = 1 AND p.is_active = 1
        ORDER BY p.created_at DESC
      `;
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get products by brand (specifically for Redragon)
  static async getByBrand(brandName) {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        WHERE LOWER(b.name) = LOWER(?) AND p.is_active = 1
        ORDER BY p.created_at DESC
      `;
      const [rows] = await db.execute(query, [brandName]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get all products with pagination
  static async getAll(limit = 20, offset = 0) {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        WHERE p.is_active = 1
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `;
      const [rows] = await db.execute(query, [limit, offset]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get product by ID
  static async getById(productId) {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        WHERE p.id = ? AND p.is_active = 1
      `;
      const [rows] = await db.execute(query, [productId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Legacy methods for backward compatibility
  static getAll_old(callback) {
    const query = 'SELECT * FROM products';
    db.query(query, callback);
  }
  
  static getById_old(id, callback) {
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [id], callback);
  }
  
  static create(product, callback) {
    const query = 'INSERT INTO products SET ?';
    db.query(query, product, callback);
  }
  
  static update(id, product, callback) {
    const query = 'UPDATE products SET ? WHERE id = ?';
    db.query(query, [product, id], callback);
  }
  
  static delete(id, callback) {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Product;