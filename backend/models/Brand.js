const db = require('../config/db');

class Brand {
  // Get all brands
  static async getAll() {
    try {
      const query = `
        SELECT * FROM brands 
        ORDER BY name ASC
      `;
      const [rows] = await db.executeWithRetry(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get brand by ID
  static async getById(brandId) {
    try {
      const query = 'SELECT * FROM brands WHERE id = ?';
      const [rows] = await db.executeWithRetry(query, [brandId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Create new brand
  static async create(brandData) {
    try {
      const { name, image_url } = brandData;
      const query = `
        INSERT INTO brands (name, logo_url, slug)
        VALUES (?, ?, ?)
      `;
      const [result] = await db.executeWithRetry(query, [name, image_url || null, name.toLowerCase().replace(/\s+/g, '-')]);
      return {
        id: result.insertId,
        name,
        image_url: image_url || null
      };
    } catch (error) {
      throw error;
    }
  }

  // Update brand
  static async update(brandId, brandData) {
    try {
      const { name, image_url } = brandData;
      const query = `
        UPDATE brands 
        SET name = ?, logo_url = ?
        WHERE id = ?
      `;
      const [result] = await db.executeWithRetry(query, [name, image_url || null, brandId]);
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return await this.getById(brandId);
    } catch (error) {
      throw error;
    }
  }

  // Delete brand
  static async delete(brandId) {
    try {
      // Check if brand is used by any products
      const checkQuery = 'SELECT COUNT(*) as count FROM products WHERE brand_id = ?';
      const [checkResult] = await db.executeWithRetry(checkQuery, [brandId]);
      
      if (checkResult[0].count > 0) {
        throw new Error('Cannot delete brand. It is being used by products.');
      }

      const query = 'DELETE FROM brands WHERE id = ?';
      const [result] = await db.executeWithRetry(query, [brandId]);
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Check if brand name already exists
  static async existsByName(name, excludeId = null) {
    try {
      let query = 'SELECT COUNT(*) as count FROM brands WHERE LOWER(name) = LOWER(?)';
      const params = [name];
      
      if (excludeId) {
        query += ' AND id != ?';
        params.push(excludeId);
      }
      
      const [rows] = await db.executeWithRetry(query, params);
      return rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Brand;