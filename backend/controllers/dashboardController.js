const Dashboard = require('../models/Dashboard');

const dashboardController = {
  // Get comprehensive dashboard statistics
  getDashboardStats: async (req, res) => {
    try {
      // Fetch all data using Dashboard model methods
      const [
        revenueStats,
        orderStats,
        customerStats,
        productStats,
        topProducts,
        topCustomers,
        recentOrders,
        ordersChart,
        categoryStats,
        brandStats,
        lowStockProducts,
        orderStatusBreakdown,
        paymentMethodStats,
        monthlyGrowth
      ] = await Promise.all([
        Dashboard.getRevenueStats(),
        Dashboard.getOrderStats(),
        Dashboard.getCustomerStats(),
        Dashboard.getProductStats(),
        Dashboard.getTopProducts(10),
        Dashboard.getTopCustomers(10),
        Dashboard.getRecentOrders(15),
        Dashboard.getOrdersChart(),
        Dashboard.getCategoryStats(10),
        Dashboard.getBrandStats(10),
        Dashboard.getLowStockProducts(15),
        Dashboard.getOrderStatusBreakdown(),
        Dashboard.getPaymentMethodStats(),
        Dashboard.getMonthlyGrowth()
      ]);

      // Calculate percentage changes
      const calculatePercentageChange = (current, previous) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / previous * 100).toFixed(1);
      };

      // Process the results
      const revenue = revenueStats;
      const orders = orderStats;
      const customers = customerStats;
      const products = productStats;

      const stats = {
        revenue: {
          current: parseFloat(revenue.current_revenue || 0),
          previous: parseFloat(revenue.last_month_revenue || 0),
          total: parseFloat(revenue.total_revenue || 0),
          change: calculatePercentageChange(revenue.current_revenue, revenue.last_month_revenue),
          changeType: revenue.current_revenue >= revenue.last_month_revenue ? 'increase' : 'decrease'
        },
        orders: {
          current: parseInt(orders.current_month_orders || 0),
          previous: parseInt(orders.last_month_orders || 0),
          total: parseInt(orders.total_orders || 0),
          average_value: parseFloat(orders.average_order_value || 0),
          pending: parseInt(orders.pending_orders || 0),
          processing: parseInt(orders.processing_orders || 0),
          shipped: parseInt(orders.shipped_orders || 0),
          delivered: parseInt(orders.delivered_orders || 0),
          change: calculatePercentageChange(orders.current_month_orders, orders.last_month_orders),
          changeType: orders.current_month_orders >= orders.last_month_orders ? 'increase' : 'decrease'
        },
        customers: {
          current: parseInt(customers.current_month_customers || 0),
          previous: parseInt(customers.last_month_customers || 0),
          total: parseInt(customers.total_customers || 0),
          active: parseInt(customers.active_customers || 0),
          verified: parseInt(customers.verified_customers || 0),
          change: calculatePercentageChange(customers.current_month_customers, customers.last_month_customers),
          changeType: customers.current_month_customers >= customers.last_month_customers ? 'increase' : 'decrease'
        },
        products: {
          total: parseInt(products.total_products || 0),
          active: parseInt(products.active_products || 0),
          featured: parseInt(products.featured_products || 0),
          low_stock: parseInt(products.low_stock_products || 0),
          out_of_stock: parseInt(products.out_of_stock_products || 0),
          average_price: parseFloat(products.average_price || 0),
          total_stock_value: parseInt(products.total_stock_value || 0)
        }
      };

      res.json({
        success: true,
        data: {
          stats,
          topProducts,
          topCustomers,
          recentOrders,
          ordersChart,
          categoryStats,
          brandStats,
          lowStockProducts,
          orderStatusBreakdown,
          paymentMethodStats,
          monthlyGrowth
        }
      });

    } catch (err) {
      console.error('Dashboard stats error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching dashboard statistics'
      });
    }
  },

  // Get quick summary for header/widgets
  getQuickStats: async (req, res) => {
    try {
      const quickStats = await Dashboard.getQuickStats();

      res.json({
        success: true,
        data: quickStats
      });

    } catch (err) {
      console.error('Quick stats error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching quick statistics'
      });
    }
  },

  // Get real-time data for live updates
  getLiveData: async (req, res) => {
    try {
      const liveData = await Dashboard.getLiveData();

      res.json({
        success: true,
        data: liveData,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      console.error('Live data error:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching live data'
      });
    }
  }
};

module.exports = dashboardController;