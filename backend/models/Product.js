const db = require('../config/db');

class Product {
  // Get all featured products
  static async getFeatured() {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name,
               pi.image_path as primary_image
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        LEFT JOIN product_image_uploads pi ON p.id = pi.product_id AND pi.is_primary = 1
        WHERE p.is_featured = 1 AND p.is_active = 1
        ORDER BY p.created_at DESC
      `;
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get new arrival products (latest products by creation date)
  static async getNewArrivals() {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name,
               pi.image_path as primary_image
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        LEFT JOIN product_image_uploads pi ON p.id = pi.product_id AND pi.is_primary = 1
        WHERE p.is_active = 1
        ORDER BY p.created_at DESC
        LIMIT 10
      `;
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      console.error('Get new arrivals error:', error);
      throw error;
    }
  }

  // Get products by brand (specifically for Redragon)
  static async getByBrand(brandName) {
    try {
      const query = `
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name,
               pi.image_path as primary_image
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        LEFT JOIN product_image_uploads pi ON p.id = pi.product_id AND pi.is_primary = 1
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
        SELECT p.*, b.name as brand_name, mc.name as main_category_name, sc.name as sub_category_name,
               pi.image_path as primary_image
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        LEFT JOIN product_image_uploads pi ON p.id = pi.product_id AND pi.is_primary = 1
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

  // Get product by ID with all images
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
      
      if (rows.length === 0) {
        return null;
      }

      const product = rows[0];
      
      // Get all images for this product
      const imageQuery = `
        SELECT * FROM product_image_uploads 
        WHERE product_id = ? 
        ORDER BY is_primary DESC, created_at ASC
      `;
      const [images] = await db.execute(imageQuery, [productId]);
      product.images = images;
      
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Create new product
  static async create(productData) {
    try {
      const query = `
        INSERT INTO products (
          name, slug, sku, description, specifications, brand_id, main_category_id, 
          sub_category_id, price, sale_price, cost_price, stock_quantity, 
          color_id, weight, is_active, is_featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        productData.name,
        productData.slug,
        productData.sku,
        productData.description,
        JSON.stringify(productData.specifications),
        productData.brand_id,
        productData.main_category_id,
        productData.sub_category_id,
        productData.price,
        productData.sale_price,
        productData.cost_price,
        productData.stock_quantity,
        productData.color_id,
        productData.weight || 0,
        productData.is_active !== undefined ? productData.is_active : 1,
        productData.is_featured || 0
      ];
      
      const [result] = await db.execute(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update product
  static async update(productId, productData) {
    try {
      const query = `
        UPDATE products SET 
          name = ?, slug = ?, sku = ?, description = ?, specifications = ?,
          brand_id = ?, main_category_id = ?, sub_category_id = ?, price = ?,
          sale_price = ?, cost_price = ?, stock_quantity = ?,
          color_id = ?, weight = ?, is_active = ?, is_featured = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      const values = [
        productData.name,
        productData.slug,
        productData.sku,
        productData.description,
        JSON.stringify(productData.specifications),
        productData.brand_id,
        productData.main_category_id,
        productData.sub_category_id,
        productData.price,
        productData.sale_price,
        productData.cost_price,
        productData.stock_quantity,
        productData.color_id,
        productData.weight || 0,
        productData.is_active !== undefined ? productData.is_active : 1,
        productData.is_featured || 0,
        productId
      ];
      
      const [result] = await db.execute(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete product (soft delete)
  static async delete(productId) {
    try {
      const query = 'UPDATE products SET is_active = 0 WHERE id = ?';
      const [result] = await db.execute(query, [productId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Generate unique slug
  static async generateSlug(name, id = null) {
    try {
      let baseSlug = name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      let slug = baseSlug;
      let counter = 1;

      while (true) {
        const query = id 
          ? 'SELECT id FROM products WHERE slug = ? AND id != ?'
          : 'SELECT id FROM products WHERE slug = ?';
        const params = id ? [slug, id] : [slug];
        const [rows] = await db.execute(query, params);

        if (rows.length === 0) {
          return slug;
        }

        slug = `${baseSlug}-${counter}`;
        counter++;
      }
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
  
  static create_old(product, callback) {
    const query = 'INSERT INTO products SET ?';
    db.query(query, product, callback);
  }
  
  static update_old(id, product, callback) {
    const query = 'UPDATE products SET ? WHERE id = ?';
    db.query(query, [product, id], callback);
  }
  
  static delete_old(id, callback) {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], callback);
  }
}

module.exports = Product;