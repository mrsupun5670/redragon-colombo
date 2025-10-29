const db = require('../config/db');

class Wishlist {
  // Get or create wishlist for customer
  static async getOrCreateForCustomer(customer_id) {
    try {
      // First check if customer already has a wishlist
      const [existing] = await db.executeWithRetry(
        'SELECT * FROM wishlists WHERE customer_id = ?',
        [customer_id]
      );

      if (existing.length > 0) {
        return existing[0];
      }

      // Create new wishlist for customer
      const [result] = await db.executeWithRetry(
        'INSERT INTO wishlists (customer_id, created_at, updated_at) VALUES (?, NOW(), NOW())',
        [customer_id]
      );

      // Return the newly created wishlist
      const [newWishlist] = await db.executeWithRetry(
        'SELECT * FROM wishlists WHERE id = ?',
        [result.insertId]
      );

      return newWishlist[0];
    } catch (error) {
      throw error;
    }
  }

  // Get wishlist with items for customer
  static async getWithItemsForCustomer(customer_id) {
    try {
      const query = `
        SELECT 
          w.*,
          wi.id as item_id,
          wi.product_id,
          p.name,
          p.slug,
          p.sku,
          p.description,
          p.price,
          p.sale_price,
          p.stock_quantity,
          p.is_active,
          b.name as brand_name,
          mc.name as main_category_name,
          sc.name as sub_category_name,
          pi.image_path,
          pi.is_primary
        FROM wishlists w
        LEFT JOIN wishlist_items wi ON w.id = wi.wishlist_id
        LEFT JOIN products p ON wi.product_id = p.id
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN main_categories mc ON p.main_category_id = mc.id
        LEFT JOIN sub_categories sc ON p.sub_category_id = sc.id
        LEFT JOIN product_image_uploads pi ON p.id = pi.product_id
        WHERE w.customer_id = ?
        ORDER BY w.created_at DESC, pi.is_primary DESC
      `;

      const [rows] = await db.executeWithRetry(query, [customer_id]);

      if (rows.length === 0) {
        return { wishlist: null, items: [] };
      }

      const wishlist = {
        id: rows[0].id,
        customer_id: rows[0].customer_id,
        created_at: rows[0].created_at,
        updated_at: rows[0].updated_at
      };

      // Group products and their images
      const productMap = new Map();
      
      rows.forEach(row => {
        if (row.product_id) {
          if (!productMap.has(row.product_id)) {
            productMap.set(row.product_id, {
              item_id: row.item_id,
              id: row.product_id,
              name: row.name,
              slug: row.slug,
              sku: row.sku,
              description: row.description,
              price: row.price,
              sale_price: row.sale_price,
              stock_quantity: row.stock_quantity,
              is_active: row.is_active,
              brand_name: row.brand_name,
              main_category_name: row.main_category_name,
              sub_category_name: row.sub_category_name,
              images: []
            });
          }

          // Add image if exists
          if (row.image_path) {
            const product = productMap.get(row.product_id);
            const existingImage = product.images.find(img => img.image_path === row.image_path);
            if (!existingImage) {
              product.images.push({
                image_path: row.image_path,
                is_primary: row.is_primary
              });
            }
          }
        }
      });

      const items = Array.from(productMap.values());

      return { wishlist, items };
    } catch (error) {
      throw error;
    }
  }

  // Add item to wishlist
  static async addItem(customer_id, product_id) {
    try {
      // Get or create wishlist
      const wishlist = await this.getOrCreateForCustomer(customer_id);

      // Check if item already exists
      const [existing] = await db.executeWithRetry(
        'SELECT * FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?',
        [wishlist.id, product_id]
      );

      if (existing.length > 0) {
        return { success: false, message: 'Product already in wishlist' };
      }

      // Add item to wishlist
      const [result] = await db.executeWithRetry(
        'INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (?, ?)',
        [wishlist.id, product_id]
      );

      // Update wishlist updated_at
      await db.executeWithRetry(
        'UPDATE wishlists SET updated_at = NOW() WHERE id = ?',
        [wishlist.id]
      );

      return { success: true, item_id: result.insertId };
    } catch (error) {
      throw error;
    }
  }

  // Remove item from wishlist
  static async removeItem(customer_id, product_id) {
    try {
      // Get customer's wishlist
      const [wishlist] = await db.executeWithRetry(
        'SELECT * FROM wishlists WHERE customer_id = ?',
        [customer_id]
      );

      if (wishlist.length === 0) {
        return { success: false, message: 'Wishlist not found' };
      }

      // Remove item from wishlist
      const [result] = await db.executeWithRetry(
        'DELETE FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?',
        [wishlist[0].id, product_id]
      );

      if (result.affectedRows === 0) {
        return { success: false, message: 'Product not found in wishlist' };
      }

      // Update wishlist updated_at
      await db.executeWithRetry(
        'UPDATE wishlists SET updated_at = NOW() WHERE id = ?',
        [wishlist[0].id]
      );

      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // Check if product is in customer's wishlist
  static async isProductInWishlist(customer_id, product_id) {
    try {
      const query = `
        SELECT wi.* 
        FROM wishlist_items wi
        JOIN wishlists w ON wi.wishlist_id = w.id
        WHERE w.customer_id = ? AND wi.product_id = ?
      `;

      const [rows] = await db.executeWithRetry(query, [customer_id, product_id]);
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get wishlist item count for customer
  static async getItemCount(customer_id) {
    try {
      const query = `
        SELECT COUNT(*) as count
        FROM wishlist_items wi
        JOIN wishlists w ON wi.wishlist_id = w.id
        WHERE w.customer_id = ?
      `;

      const [rows] = await db.executeWithRetry(query, [customer_id]);
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Wishlist;