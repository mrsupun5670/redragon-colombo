const pool = require('../config/db');

const Sales = {
  // Get sales by category with time period filter
  getCategoriesSales: async (period = 'Last 12 Months') => {
    let dateCondition = '';

    // Determine date range based on period
    const now = new Date();
    let startDate = new Date();

    switch(period) {
      case 'Today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'This Week':
        const currentDay = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - currentDay);
        break;
      case 'This Month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'This Year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'Last 3 Months':
        startDate = new Date(now.getTime() - (3 * 30 * 24 * 60 * 60 * 1000));
        break;
      case 'Last 6 Months':
        startDate = new Date(now.getTime() - (6 * 30 * 24 * 60 * 60 * 1000));
        break;
      case 'Last 12 Months':
      default:
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
    }

    // Format date for MySQL
    dateCondition = `o.created_at >= '${startDate.toISOString().split('T')[0]}'`;

    try {
      // Get sales by category
      const [categoriesData] = await pool.query(`
        SELECT
          mc.id,
          mc.name,
          COUNT(DISTINCT o.id) as order_count,
          SUM(oi.quantity) as total_quantity,
          SUM(oi.quantity * oi.price) as total_sales,
          AVG(oi.price) as average_price
        FROM main_categories mc
        LEFT JOIN products p ON mc.id = p.main_category_id
        LEFT JOIN order_items oi ON p.id = oi.product_id
        LEFT JOIN orders o ON oi.order_id = o.id AND ${dateCondition}
        WHERE mc.is_active = 1
        GROUP BY mc.id, mc.name
        ORDER BY total_sales DESC
      `);

      // Get total sales across all categories
      const [totalResult] = await pool.query(`
        SELECT
          COALESCE(SUM(oi.quantity * oi.price), 0) as total_sales
        FROM order_items oi
        LEFT JOIN orders o ON oi.order_id = o.id
        WHERE ${dateCondition}
      `);

      const totalSales = parseFloat(totalResult[0]?.total_sales || 0);

      // Format the response
      const categories = categoriesData.map(cat => ({
        id: cat.id,
        name: cat.name,
        order_count: parseInt(cat.order_count || 0),
        total_quantity: parseInt(cat.total_quantity || 0),
        total_sales: parseFloat(cat.total_sales || 0),
        average_price: parseFloat(cat.average_price || 0)
      }));

      return {
        categories,
        totalSales
      };
    } catch (error) {
      console.error('Error fetching categories sales:', error);
      throw error;
    }
  },

  // Get sales metrics (revenue, profit, orders) with time period filter
  getSalesMetrics: async (period = 'Today') => {
    let dateCondition = '';

    // Determine date range based on period
    const now = new Date();
    let startDate = new Date();

    switch(period) {
      case 'Today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'This Week':
        const currentDay = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - currentDay);
        break;
      case 'This Month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'This Year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'Last 3 Months':
        startDate = new Date(now.getTime() - (3 * 30 * 24 * 60 * 60 * 1000));
        break;
      case 'Last 6 Months':
        startDate = new Date(now.getTime() - (6 * 30 * 24 * 60 * 60 * 1000));
        break;
      case 'Last 12 Months':
      default:
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
    }

    // Format date for MySQL
    dateCondition = `o.created_at >= '${startDate.toISOString().split('T')[0]}'`;

    try {
      // Get revenue (total order amounts)
      const [revenueData] = await pool.query(`
        SELECT
          COALESCE(SUM(o.total), 0) as total_revenue,
          COUNT(DISTINCT o.id) as total_orders
        FROM orders o
        WHERE ${dateCondition} AND o.payment_status IN ('paid', 'pending')
      `);

      // Get cost (based on products cost price)
      const [costData] = await pool.query(`
        SELECT
          COALESCE(SUM(oi.quantity * p.cost_price), 0) as total_cost
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        LEFT JOIN orders o ON oi.order_id = o.id
        WHERE ${dateCondition} AND o.payment_status IN ('paid', 'pending')
      `);

      const totalRevenue = parseFloat(revenueData[0]?.total_revenue || 0);
      const totalOrders = parseInt(revenueData[0]?.total_orders || 0);
      const totalCost = parseFloat(costData[0]?.total_cost || 0);
      const netProfit = totalRevenue - totalCost;

      return {
        totalRevenue,
        netProfit,
        totalOrders,
        period
      };
    } catch (error) {
      console.error('Error fetching sales metrics:', error);
      throw error;
    }
  },

  // Get chart data for revenue and profit trends
  getChartData: async (period = 'Today') => {
    const now = new Date();
    let chartData = [];
    let startDate = new Date();
    let groupBy = '';

    switch(period) {
      case 'Today':
        // Hourly data for today
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        groupBy = 'HOUR(o.created_at)';
        break;
      case 'This Week':
        // Daily data for this week
        const currentDay = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - currentDay);
        groupBy = 'DATE(o.created_at)';
        break;
      case 'This Month':
        // Daily data for this month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupBy = 'DATE(o.created_at)';
        break;
      case 'This Year':
        // Monthly data for this year
        startDate = new Date(now.getFullYear(), 0, 1);
        groupBy = 'MONTH(o.created_at)';
        break;
      case 'Last 3 Months':
        // Monthly data for last 3 months
        startDate = new Date(now.getTime() - (3 * 30 * 24 * 60 * 60 * 1000));
        groupBy = 'MONTH(o.created_at)';
        break;
      case 'Last 6 Months':
        // Monthly data
        startDate = new Date(now.getTime() - (6 * 30 * 24 * 60 * 60 * 1000));
        groupBy = 'MONTH(o.created_at)';
        break;
      case 'Last 12 Months':
      default:
        // Monthly data
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        groupBy = 'MONTH(o.created_at)';
        break;
    }

    const dateCondition = `o.created_at >= '${startDate.toISOString().split('T')[0]}'`;

    try {
      // Get revenue and profit data grouped by period
      const [data] = await pool.query(`
        SELECT
          ${groupBy} as period_key,
          DATE(o.created_at) as date_label,
          COALESCE(SUM(o.total), 0) as revenue,
          COALESCE(SUM(oi.quantity * p.cost_price), 0) as cost,
          COALESCE(SUM(o.total), 0) - COALESCE(SUM(oi.quantity * p.cost_price), 0) as profit,
          COUNT(DISTINCT o.id) as orders
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE ${dateCondition} AND o.payment_status IN ('paid', 'pending')
        GROUP BY ${groupBy}, DATE(o.created_at)
        ORDER BY DATE(o.created_at) ASC
      `);

      // Format data based on period
      const formattedData = data.map((item, index) => {
        let label = '';

        switch(period) {
          case 'Today':
            const hour = item.period_key || 0;
            label = `${String(hour).padStart(2, '0')}:00`;
            break;
          case 'This Week':
            const date = new Date(item.date_label);
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            label = days[date.getDay()];
            break;
          case 'This Month':
            const monthDate = new Date(item.date_label);
            label = monthDate.getDate().toString();
            break;
          case 'This Year':
          case 'Last 3 Months':
          case 'Last 6 Months':
          case 'Last 12 Months':
            const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthIndex = item.period_key - 1;
            label = monthsName[monthIndex] || `M${item.period_key}`;
            break;
          default:
            label = item.date_label || `Period ${index + 1}`;
        }

        return {
          label,
          revenue: parseFloat(item.revenue || 0),
          profit: parseFloat(item.profit || 0),
          cost: parseFloat(item.cost || 0),
          orders: parseInt(item.orders || 0)
        };
      });

      // Fill missing periods with zero data
      let completeData = formattedData;
      if (period === 'Today') {
        completeData = fillMissingHours(formattedData);
      } else if (period === 'This Week') {
        completeData = fillMissingWeekDays(formattedData, startDate);
      } else if (period === 'This Month') {
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        completeData = fillMissingMonthDays(formattedData, daysInMonth);
      } else if (period === 'This Year' || period === 'Last 3 Months' || period === 'Last 6 Months' || period === 'Last 12 Months') {
        completeData = fillMissingMonths(formattedData, period);
      }

      return completeData;
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }
};

// Helper function to fill missing hours (7 AM to 10 PM only)
function fillMissingHours(data) {
  const complete = [];
  for (let hour = 7; hour <= 22; hour++) {
    const label = `${String(hour).padStart(2, '0')}:00`;
    const existing = data.find(d => d.label === label);
    complete.push(existing || { label, revenue: 0, profit: 0, cost: 0, orders: 0 });
  }
  return complete;
}

// Helper function to fill missing week days in natural order (Sun-Sat)
function fillMissingWeekDays(data, weekStartDate) {
  const complete = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStartDate);
    currentDate.setDate(weekStartDate.getDate() + i);
    const label = days[currentDate.getDay()];

    // Find existing data for this date
    const dateStr = currentDate.toISOString().split('T')[0];
    const existing = data.find(d => {
      // Match by day name
      return d.label === label;
    });

    complete.push(existing || { label, revenue: 0, profit: 0, cost: 0, orders: 0 });
  }
  return complete;
}

// Helper function to fill missing month days (all days even with 0 values)
function fillMissingMonthDays(data, totalDays) {
  const complete = [];

  for (let day = 1; day <= totalDays; day++) {
    const label = day.toString();
    const existing = data.find(d => d.label === label);
    complete.push(existing || { label, revenue: 0, profit: 0, cost: 0, orders: 0 });
  }
  return complete;
}

// Helper function to fill missing months in natural order (Jan-Dec)
function fillMissingMonths(data, period) {
  const complete = [];
  const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (period === 'This Year') {
    // Show all 12 months
    for (let month = 1; month <= 12; month++) {
      const label = monthsName[month - 1];
      const existing = data.find(d => d.label === label);
      complete.push(existing || { label, revenue: 0, profit: 0, cost: 0, orders: 0 });
    }
  } else if (period === 'Last 3 Months') {
    // Show last 3 months in order
    const now = new Date();
    for (let i = 2; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = monthsName[monthDate.getMonth()];
      const existing = data.find(d => d.label === label);
      complete.push(existing || { label, revenue: 0, profit: 0, cost: 0, orders: 0 });
    }
  } else if (period === 'Last 6 Months') {
    // Show last 6 months in order
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = monthsName[monthDate.getMonth()];
      const existing = data.find(d => d.label === label);
      complete.push(existing || { label, revenue: 0, profit: 0, cost: 0, orders: 0 });
    }
  } else if (period === 'Last 12 Months') {
    // Show last 12 months in order
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = monthsName[monthDate.getMonth()];
      const existing = data.find(d => d.label === label);
      complete.push(existing || { label, revenue: 0, profit: 0, cost: 0, orders: 0 });
    }
  }

  return complete;
}

module.exports = Sales;
