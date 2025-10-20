const db = require('../config/db');

class ProductImage {
  // Add image to product
  static async create(productId, imagePath, isPrimary = false) {
    try {
      // If this is set as primary, remove primary flag from other images
      if (isPrimary) {
        await db.execute(
          'UPDATE product_image_uploads SET is_primary = 0 WHERE product_id = ?',
          [productId]
        );
      }

      const query = `
        INSERT INTO product_image_uploads (product_id, image_path, is_primary)
        VALUES (?, ?, ?)
      `;
      const [result] = await db.execute(query, [productId, imagePath, isPrimary ? 1 : 0]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get all images for a product
  static async getByProductId(productId) {
    try {
      const query = `
        SELECT * FROM product_image_uploads 
        WHERE product_id = ? 
        ORDER BY is_primary DESC, created_at ASC
      `;
      const [rows] = await db.execute(query, [productId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get primary image for a product
  static async getPrimaryByProductId(productId) {
    try {
      const query = `
        SELECT * FROM product_image_uploads 
        WHERE product_id = ? AND is_primary = 1 
        LIMIT 1
      `;
      const [rows] = await db.execute(query, [productId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Delete image
  static async delete(imageId) {
    try {
      const query = 'DELETE FROM product_image_uploads WHERE id = ?';
      const [result] = await db.execute(query, [imageId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Set image as primary
  static async setPrimary(imageId, productId) {
    try {
      // Remove primary flag from all images of this product
      await db.execute(
        'UPDATE product_image_uploads SET is_primary = 0 WHERE product_id = ?',
        [productId]
      );

      // Set this image as primary
      const query = 'UPDATE product_image_uploads SET is_primary = 1 WHERE id = ? AND product_id = ?';
      const [result] = await db.execute(query, [imageId, productId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Bulk create images for a product
  static async createMultiple(productId, imagePaths) {
    try {
      if (!imagePaths || imagePaths.length === 0) {
        return [];
      }

      // First image is primary by default
      const results = [];
      for (let i = 0; i < imagePaths.length; i++) {
        const isPrimary = i === 0;
        const result = await this.create(productId, imagePaths[i], isPrimary);
        results.push(result);
      }
      
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductImage;