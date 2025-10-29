const Sales = require('../models/Sales');

const salesController = {
  // Get categories sales data with time period filter
  getCategoriesSales: async (req, res) => {
    try {
      const { period = 'Last 12 Months' } = req.query;

      // Validate period parameter
      const validPeriods = [
        'Today',
        'This Week',
        'This Month',
        'This Year',
        'Last 3 Months',
        'Last 6 Months',
        'Last 12 Months'
      ];

      if (!validPeriods.includes(period)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid period parameter'
        });
      }

      // Fetch sales data
      const salesData = await Sales.getCategoriesSales(period);

      // Return response
      res.json({
        success: true,
        data: {
          categories: salesData.categories,
          totalSales: salesData.totalSales,
          period: period
        }
      });
    } catch (error) {
      console.error('Error in getCategoriesSales:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories sales data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get sales metrics (revenue, profit, orders) with time period filter
  getSalesMetrics: async (req, res) => {
    try {
      const { period = 'Today' } = req.query;

      // Validate period parameter
      const validPeriods = [
        'Today',
        'This Week',
        'This Month',
        'This Year',
        'Last 3 Months',
        'Last 6 Months',
        'Last 12 Months'
      ];

      if (!validPeriods.includes(period)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid period parameter'
        });
      }

      // Fetch metrics data
      const metricsData = await Sales.getSalesMetrics(period);

      // Return response
      res.json({
        success: true,
        data: {
          totalRevenue: metricsData.totalRevenue,
          netProfit: metricsData.netProfit,
          totalOrders: metricsData.totalOrders,
          period: period
        }
      });
    } catch (error) {
      console.error('Error in getSalesMetrics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch sales metrics',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get chart data for revenue and profit trends
  getChartData: async (req, res) => {
    try {
      const { period = 'Today' } = req.query;

      // Validate period parameter
      const validPeriods = [
        'Today',
        'This Week',
        'This Month',
        'This Year',
        'Last 3 Months',
        'Last 6 Months',
        'Last 12 Months'
      ];

      if (!validPeriods.includes(period)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid period parameter'
        });
      }

      // Fetch chart data
      const chartData = await Sales.getChartData(period);

      // Return response
      res.json({
        success: true,
        data: {
          chartData,
          period: period
        }
      });
    } catch (error) {
      console.error('Error in getChartData:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch chart data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = salesController;
