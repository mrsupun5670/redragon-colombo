const pool = require('../config/db');

const Dashboard = {
  // Get revenue statistics
  getRevenueStats: async () => {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    const [rows] = await pool.query(`
      SELECT 
        COALESCE(SUM(CASE WHEN created_at >= ? THEN total END), 0) as current_revenue,
        COALESCE(SUM(CASE WHEN created_at >= ? AND created_at < ? THEN total END), 0) as last_month_revenue,
        COALESCE(SUM(total), 0) as total_revenue,
        COUNT(CASE WHEN created_at >= ? THEN 1 END) as current_month_orders,
        COUNT(CASE WHEN created_at >= ? AND created_at < ? THEN 1 END) as last_month_orders
      FROM orders 
      WHERE payment_status = 'paid'
    `, [currentMonthStart, lastMonthStart, currentMonthStart, currentMonthStart, lastMonthStart, currentMonthStart]);
    
    return rows[0];
  },

  // Get order statistics
  getOrderStats: async () => {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) as total_orders,
        COUNT(CASE WHEN created_at >= ? THEN 1 END) as current_month_orders,
        COUNT(CASE WHEN created_at >= ? AND created_at < ? THEN 1 END) as last_month_orders,
        AVG(total) as average_order_value,
        COUNT(CASE WHEN order_status = 'pending' THEN 1 END) as pending_orders,
        COUNT(CASE WHEN order_status = 'processing' THEN 1 END) as processing_orders,
        COUNT(CASE WHEN order_status = 'shipped' THEN 1 END) as shipped_orders,
        COUNT(CASE WHEN order_status = 'delivered' THEN 1 END) as delivered_orders
      FROM orders
    `, [currentMonthStart, lastMonthStart, currentMonthStart]);
    
    return rows[0];
  },

  // Get customer statistics
  getCustomerStats: async () => {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) as total_customers,
        COUNT(CASE WHEN created_at >= ? THEN 1 END) as current_month_customers,
        COUNT(CASE WHEN created_at >= ? AND created_at < ? THEN 1 END) as last_month_customers,
        COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_customers,
        COUNT(CASE WHEN email_verified = 1 THEN 1 END) as verified_customers
      FROM customers
    `, [currentMonthStart, lastMonthStart, currentMonthStart]);
    
    return rows[0];
  },

  // Get product statistics
  getProductStats: async () => {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_products,
        COUNT(CASE WHEN is_featured = 1 THEN 1 END) as featured_products,
        COUNT(CASE WHEN stock_quantity <= 10 THEN 1 END) as low_stock_products,
        COUNT(CASE WHEN stock_quantity = 0 THEN 1 END) as out_of_stock_products,
        AVG(price) as average_price,
        SUM(stock_quantity) as total_stock_value
      FROM products
    `);
    
    return rows[0];
  },

  // Get top selling products with primary image
  getTopProducts: async (limit = 10) => {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.stock_quantity,
        b.name as brand_name,
        pi.image_path as primary_image,
        SUM(oi.quantity) as total_sold,
        SUM(oi.quantity * oi.price) as total_revenue,
        COUNT(DISTINCT o.id) as order_count
      FROM products p
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN product_image_uploads pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE o.payment_status IN ('paid', 'pending')
      GROUP BY p.id, p.name, p.price, p.stock_quantity, b.name, pi.image_path
      ORDER BY total_sold DESC
      LIMIT ?
    `, [limit]);
    
    return rows;
  },

  // Get top customers by spending
  getTopCustomers: async (limit = 10) => {
    const [rows] = await pool.query(`
      SELECT 
        c.customer_id as id,
        c.first_name,
        c.last_name,
        CONCAT(c.first_name, ' ', c.last_name) as full_name,
        c.email,
        c.phone,
        COUNT(DISTINCT o.id) as total_orders,
        SUM(o.total) as total_spent,
        AVG(o.total) as average_order_value,
        MAX(o.created_at) as last_order_date,
        CASE 
          WHEN SUM(o.total) >= 100000 THEN 'VIP'
          WHEN SUM(o.total) >= 50000 THEN 'Premium'
          ELSE 'Regular'
        END as customer_tier
      FROM customers c
      INNER JOIN orders o ON c.customer_id = o.customer_id
      WHERE o.payment_status IN ('paid', 'pending')
      GROUP BY c.customer_id, c.first_name, c.last_name, c.email, c.phone
      ORDER BY total_spent DESC
      LIMIT ?
    `, [limit]);
    
    return rows;
  },

  // Get recent orders
  getRecentOrders: async (limit = 15) => {
    const [rows] = await pool.query(`
      SELECT 
        o.id,
        o.order_number,
        o.total,
        o.order_status,
        o.payment_status,
        o.created_at,
        CONCAT(c.first_name, ' ', c.last_name) as customer_name,
        c.email as customer_email,
        pm.name as payment_method_name,
        COUNT(oi.id) as items_count
      FROM orders o
      INNER JOIN customers c ON o.customer_id = c.customer_id
      LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id, o.order_number, o.total, o.order_status, o.payment_status, o.created_at, c.first_name, c.last_name, c.email, pm.name
      ORDER BY o.created_at DESC
      LIMIT ?
    `, [limit]);
    
    return rows;
  },

  // Get orders chart data (last 30 days)
  getOrdersChart: async () => {
    const [rows] = await pool.query(`
      SELECT 
        DATE(created_at) as order_date,
        COUNT(*) as order_count,
        SUM(total) as daily_revenue
      FROM orders
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at)
      ORDER BY order_date ASC
    `);
    
    return rows;
  },

  // Get category performance
  getCategoryStats: async (limit = 10) => {
    const [rows] = await pool.query(`
      SELECT 
        mc.id,
        mc.name,
        mc.slug,
        COUNT(DISTINCT p.id) as product_count,
        COALESCE(SUM(oi.quantity), 0) as total_sold,
        COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue,
        COUNT(DISTINCT o.id) as order_count
      FROM main_categories mc
      LEFT JOIN products p ON mc.id = p.main_category_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id AND o.payment_status = 'paid'
      GROUP BY mc.id, mc.name, mc.slug
      ORDER BY total_revenue DESC
      LIMIT ?
    `, [limit]);
    
    return rows;
  },

  // Get brand performance - check if brands table has logo_url column
  getBrandStats: async (limit = 10) => {
    const [rows] = await pool.query(`
      SELECT 
        b.id,
        b.name,
        b.slug,
        COUNT(DISTINCT p.id) as product_count,
        COALESCE(SUM(oi.quantity), 0) as total_sold,
        COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue,
        COUNT(DISTINCT o.id) as order_count
      FROM brands b
      LEFT JOIN products p ON b.id = p.brand_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id AND o.payment_status = 'paid'
      WHERE b.is_active = 1
      GROUP BY b.id, b.name, b.slug
      ORDER BY total_revenue DESC
      LIMIT ?
    `, [limit]);
    
    return rows;
  },

  // Get low stock products
  getLowStockProducts: async (limit = 15) => {
    const [rows] = await pool.query(`
      SELECT 
        p.id,
        p.name,
        p.sku,
        p.stock_quantity,
        p.price,
        b.name as brand_name,
        mc.name as category_name
      FROM products p
      LEFT JOIN brands b ON p.brand_id = b.id
      LEFT JOIN main_categories mc ON p.main_category_id = mc.id
      WHERE p.is_active = 1 AND p.stock_quantity <= 10
      ORDER BY p.stock_quantity ASC
      LIMIT ?
    `, [limit]);
    
    return rows;
  },

  // Get order status breakdown
  getOrderStatusBreakdown: async () => {
    const [rows] = await pool.query(`
      SELECT 
        order_status,
        COUNT(*) as count,
        SUM(total) as total_value,
        AVG(total) as average_value
      FROM orders
      GROUP BY order_status
      ORDER BY count DESC
    `);
    
    return rows;
  },

  // Get payment method statistics
  getPaymentMethodStats: async () => {
    const [rows] = await pool.query(`
      SELECT 
        pm.name,
        pm.slug,
        COUNT(o.id) as order_count,
        SUM(o.total) as total_revenue,
        AVG(o.total) as average_order_value
      FROM payment_methods pm
      LEFT JOIN orders o ON pm.id = o.payment_method_id
      GROUP BY pm.id, pm.name, pm.slug
      ORDER BY total_revenue DESC
    `);
    
    return rows;
  },

  // Get monthly growth comparison (last 12 months)
  getMonthlyGrowth: async () => {
    const [rows] = await pool.query(`
      SELECT 
        YEAR(created_at) as year,
        MONTH(created_at) as month,
        COUNT(*) as order_count,
        SUM(total) as revenue,
        COUNT(DISTINCT customer_id) as unique_customers
      FROM orders
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        AND payment_status = 'paid'
      GROUP BY YEAR(created_at), MONTH(created_at)
      ORDER BY year DESC, month DESC
    `);
    
    return rows;
  },

  // Get quick stats for widgets
  getQuickStats: async () => {
    const [rows] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURDATE()) as today_orders,
        (SELECT COUNT(*) FROM orders WHERE order_status = 'pending') as pending_orders,
        (SELECT COUNT(*) FROM products WHERE stock_quantity <= 10) as low_stock_alerts,
        (SELECT COUNT(*) FROM customers WHERE DATE(created_at) = CURDATE()) as new_customers_today,
        (SELECT SUM(total) FROM orders WHERE DATE(created_at) = CURDATE() AND payment_status = 'paid') as today_revenue
    `);
    
    return rows[0];
  },

  // Get live data for real-time updates
  getLiveData: async () => {
    const [rows] = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)) as orders_last_hour,
        (SELECT COUNT(*) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)) as orders_last_24h,
        (SELECT SUM(total) FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR) AND payment_status = 'paid') as revenue_last_hour,
        (SELECT COUNT(*) FROM customers WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)) as new_customers_last_hour,
        (SELECT COUNT(*) FROM order_items oi JOIN orders o ON oi.order_id = o.id WHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)) as items_sold_last_hour
    `);
    
    return rows[0];
  }
};

module.exports = Dashboard;