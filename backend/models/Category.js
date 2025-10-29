const db = require('../config/db');

class Category {
  // Get all main categories
  static async getAllMainCategories() {
    try {
      const query = `
        SELECT * FROM main_categories 
        ORDER BY name ASC
      `;
      const result = await db.executeWithRetry(query);
      
      if (!result || !Array.isArray(result) || result.length === 0) {
        console.error('Database query returned invalid result:', result);
        return [];
      }
      
      const [rows] = result;
      return rows || [];
    } catch (error) {
      console.error('Error in getAllMainCategories:', error);
      throw error;
    }
  }

  // Get all sub categories
  static async getAllSubCategories() {
    try {
      const query = `
        SELECT sc.*, mc.name as main_category_name 
        FROM sub_categories sc
        LEFT JOIN main_categories mc ON sc.main_category_id = mc.id
        ORDER BY mc.name ASC, sc.name ASC
      `;
      const [rows] = await db.executeWithRetry(query);
      return rows || [];
      
    } catch (error) {
      console.error('Error in getAllSubCategories:', error);
      throw error;
    }
  }

  // Get sub categories by main category ID
  static async getSubCategoriesByMainCategory(mainCategoryId) {
    try {
      const query = `
        SELECT * FROM sub_categories 
        WHERE main_category_id = ?
        ORDER BY name ASC
      `;
      const [rows] = await db.executeWithRetry(query, [mainCategoryId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get main category by ID
  static async getMainCategoryById(categoryId) {
    try {
      const query = 'SELECT * FROM main_categories WHERE id = ?';
      const [rows] = await db.executeWithRetry(query, [categoryId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Get sub category by ID
  static async getSubCategoryById(categoryId) {
    try {
      const query = `
        SELECT sc.*, mc.name as main_category_name 
        FROM sub_categories sc
        LEFT JOIN main_categories mc ON sc.main_category_id = mc.id
        WHERE sc.id = ?
      `;
      const [rows] = await db.executeWithRetry(query, [categoryId]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Create new main category
  static async createMainCategory(categoryData) {
    try {
      const { name, description, icon } = categoryData;
      const query = `
        INSERT INTO main_categories (name, description, icon)
        VALUES (?, ?, ?)
      `;
      const [result] = await db.executeWithRetry(query, [name, description || null, icon || null]);
      return {
        id: result.insertId,
        name,
        description: description || null,
        icon: icon || null
      };
    } catch (error) {
      throw error;
    }
  }

  // Create new sub category
  static async createSubCategory(categoryData) {
    try {
      const { name, description, main_category_id } = categoryData;
      const query = `
        INSERT INTO sub_categories (name, description, main_category_id)
        VALUES (?, ?, ?)
      `;
      const [result] = await db.executeWithRetry(query, [name, description || null, main_category_id]);
      return {
        id: result.insertId,
        name,
        description: description || null,
        main_category_id
      };
    } catch (error) {
      throw error;
    }
  }

  // Update main category
  static async updateMainCategory(categoryId, categoryData) {
    try {
      const { name, description, icon } = categoryData;
      const query = `
        UPDATE main_categories 
        SET name = ?, description = ?, icon = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      const [result] = await db.executeWithRetry(query, [name, description || null, icon || null, categoryId]);
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return await this.getMainCategoryById(categoryId);
    } catch (error) {
      throw error;
    }
  }

  // Update sub category
  static async updateSubCategory(categoryId, categoryData) {
    try {
      const { name, description, main_category_id } = categoryData;
      const query = `
        UPDATE sub_categories 
        SET name = ?, description = ?, main_category_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      const [result] = await db.executeWithRetry(query, [name, description || null, main_category_id, categoryId]);
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return await this.getSubCategoryById(categoryId);
    } catch (error) {
      throw error;
    }
  }

  // Delete main category
  static async deleteMainCategory(categoryId) {
    try {
      // Check if category is used by any products
      const checkProductQuery = 'SELECT COUNT(*) as count FROM products WHERE main_category_id = ?';
      const [productResult] = await db.executeWithRetry(checkProductQuery, [categoryId]);
      
      if (productResult[0].count > 0) {
        throw new Error('Cannot delete main category. It is being used by products.');
      }

      // Check if category has sub categories
      const checkSubQuery = 'SELECT COUNT(*) as count FROM sub_categories WHERE main_category_id = ?';
      const [subResult] = await db.executeWithRetry(checkSubQuery, [categoryId]);
      
      if (subResult[0].count > 0) {
        throw new Error('Cannot delete main category. It has sub categories.');
      }

      const query = 'DELETE FROM main_categories WHERE id = ?';
      const [result] = await db.executeWithRetry(query, [categoryId]);
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete sub category
  static async deleteSubCategory(categoryId) {
    try {
      // Check if category is used by any products
      const checkQuery = 'SELECT COUNT(*) as count FROM products WHERE sub_category_id = ?';
      const [checkResult] = await db.executeWithRetry(checkQuery, [categoryId]);
      
      if (checkResult[0].count > 0) {
        throw new Error('Cannot delete sub category. It is being used by products.');
      }

      const query = 'DELETE FROM sub_categories WHERE id = ?';
      const [result] = await db.executeWithRetry(query, [categoryId]);
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Check if main category name already exists
  static async mainCategoryExistsByName(name, excludeId = null) {
    try {
      let query = 'SELECT COUNT(*) as count FROM main_categories WHERE LOWER(name) = LOWER(?)';
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

  // Check if sub category name already exists within the same main category
  static async subCategoryExistsByName(name, mainCategoryId, excludeId = null) {
    try {
      let query = 'SELECT COUNT(*) as count FROM sub_categories WHERE LOWER(name) = LOWER(?) AND main_category_id = ?';
      const params = [name, mainCategoryId];
      
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

module.exports = Category;