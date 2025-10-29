import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown, TrendingUp, Eye, 
  AlertTriangle, CheckCircle, Clock, Truck, Star, Award, BarChart3, Zap
} from 'lucide-react';
import { adminApi } from '../../../utils/adminApi';

const Dashboard = ({ setActiveTab }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await adminApi.get('/dashboard/stats');
        
        if (response.success) {
          setDashboardData(response.data);
          setLastUpdated(new Date());
          setError(null);
        } else {
          setError('Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { stats, topProducts, topCustomers, recentOrders, ordersChart, lowStockProducts } = dashboardData || {};

  console.log("recent orders", recentOrders);
  
  // Create stats cards from API data
  const statsCards = [
    {
      name: 'Total Revenue',
      value: `Rs. ${stats?.revenue?.current?.toLocaleString() || '0'}`,
      change: `${stats?.revenue?.change >= 0 ? '+' : ''}${stats?.revenue?.change || 0}%`,
      changeType: stats?.revenue?.changeType || 'increase',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      total: `Rs. ${stats?.revenue?.total?.toLocaleString() || '0'}`,
      subtitle: 'This month vs last month'
    },
    {
      name: 'Total Orders',
      value: `${stats?.orders?.current?.toLocaleString() || '0'}`,
      change: `${stats?.orders?.change >= 0 ? '+' : ''}${stats?.orders?.change || 0}%`,
      changeType: stats?.orders?.changeType || 'increase',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600',
      total: `${stats?.orders?.total?.toLocaleString() || '0'} total`,
      subtitle: 'This month vs last month'
    },
    {
      name: 'Total Customers',
      value: `${stats?.customers?.current?.toLocaleString() || '0'}`,
      change: `${stats?.customers?.change >= 0 ? '+' : ''}${stats?.customers?.change || 0}%`,
      changeType: stats?.customers?.changeType || 'increase',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      total: `${stats?.customers?.total?.toLocaleString() || '0'} total`,
      subtitle: 'New this month vs last month'
    },
    {
      name: 'Active Products',
      value: `${stats?.products?.active?.toLocaleString() || '0'}`,
      change: `${stats?.products?.low_stock || 0} low stock`,
      changeType: 'info',
      icon: Package,
      color: 'from-orange-500 to-red-600',
      total: `${stats?.products?.total?.toLocaleString() || '0'} total`,
      subtitle: 'Total products'
    },
  ];

  // Process chart data from recent orders for last 30 days
  const processRecentOrdersForChart = (orders) => {
    // Group orders by date
    const ordersByDate = {};
    if (orders && orders.length > 0) {
      orders.forEach(order => {
        const date = order.created_at.split('T')[0]; // Get YYYY-MM-DD
        if (!ordersByDate[date]) {
          ordersByDate[date] = {
            orders: 0,
            revenue: 0,
            items: 0
          };
        }
        ordersByDate[date].orders += 1;
        ordersByDate[date].revenue += parseFloat(order.total);
        ordersByDate[date].items += parseInt(order.items_count);
      });
    }
    
    // Create last 30 days array
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayData = ordersByDate[dateStr] || { orders: 0, revenue: 0, items: 0 };
      last30Days.push({
        day: 30 - i,
        date: dateStr,
        orders: dayData.orders,
        revenue: dayData.revenue,
        items: dayData.items
      });
    }
    
    return last30Days;
  };

  const ordersChartData = processRecentOrdersForChart(recentOrders);
  const maxRevenue = Math.max(...ordersChartData.map(d => d.revenue), 1);
  

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          {loading && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-xs text-blue-600">Updating...</span>
            </div>
          )}
          <div className="text-xs sm:text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab('orders')}
          className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-blue-900">Pending Orders</p>
            <p className="text-2xl font-bold text-blue-600">{stats?.orders?.pending || 0}</p>
          </div>
          <Clock className="w-8 h-8 text-blue-500" />
        </button>
        
        <button
          onClick={() => setActiveTab('products')}
          className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-red-900">Low Stock</p>
            <p className="text-2xl font-bold text-red-600">{stats?.products?.low_stock || 0}</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </button>
        
        <button
          onClick={() => setActiveTab('customers')}
          className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-green-900">Active Customers</p>
            <p className="text-2xl font-bold text-green-600">{stats?.customers?.active || 0}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </button>
        
        <button
          onClick={() => setActiveTab('orders')}
          className="flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
        >
          <div>
            <p className="text-sm font-medium text-purple-900">Shipped</p>
            <p className="text-2xl font-bold text-purple-600">{stats?.orders?.shipped || 0}</p>
          </div>
          <Truck className="w-8 h-8 text-purple-500" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Gradient background */}
            <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full`}></div>

            <div className="relative p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 bg-gradient-to-br ${stat.color} rounded-lg md:rounded-xl`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className={`flex items-center text-xs md:text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  ) : stat.changeType === 'decrease' ? (
                    <ArrowDown className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1 md:mt-2">{stat.subtitle}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.total}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Orders Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Orders Overview</h3>
              <p className="text-xs md:text-sm text-gray-500">Last 30 days performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
              <span className="text-xs md:text-sm font-semibold text-green-600">+23.5%</span>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-48 md:h-64 gap-0.5 md:gap-1 overflow-x-auto">
            {ordersChartData && ordersChartData.length > 0 ? (
              ordersChartData.map((data, index) => {
                const maxHeight = 200; // Fixed max height in pixels
                const barHeightPx = data.revenue > 0 ? Math.max((data.revenue / maxRevenue) * maxHeight, 20) : 4;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center justify-end group min-w-[8px]">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-cyan-500 relative"
                      style={{ 
                        height: `${barHeightPx}px`
                      }}
                    >
                      <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {new Date(data.date).toLocaleDateString()}: {data.orders} orders
                        <br />Rs. {data.revenue?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No order data available</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>30 days ago</span>
            <span>15 days ago</span>
            <span>Today</span>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Recent Orders</h3>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
            >
              View All <Eye className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-2 md:space-y-3">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.slice(0, 8).map((order, index) => (
                <div key={order.id} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">
                      #{order.order_number || order.id}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{order.customer_name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xs md:text-sm font-bold text-gray-900 whitespace-nowrap">
                      Rs. {parseFloat(order.total).toLocaleString()}
                    </p>
                    <span className={`text-xs px-2 py-0.5 md:py-1 rounded-full whitespace-nowrap ${
                      order.order_status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.order_status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      order.order_status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                      order.order_status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                      order.order_status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No recent orders</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Top Products</h3>
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
            >
              View All <Eye className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 md:py-3 text-xs font-semibold text-gray-600">Product</th>
                  <th className="text-right py-2 md:py-3 text-xs font-semibold text-gray-600">Sold</th>
                  <th className="text-right py-2 md:py-3 text-xs font-semibold text-gray-600 hidden sm:table-cell">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts && topProducts.length > 0 ? (
                  topProducts.slice(0, 5).map((product, index) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 md:py-3">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${
                            index === 0 ? 'from-yellow-400 to-orange-500' :
                            index === 1 ? 'from-gray-300 to-gray-400' :
                            index === 2 ? 'from-orange-400 to-orange-600' :
                            'from-blue-400 to-blue-600'
                          } flex items-center justify-center text-white font-bold text-xs mr-2 md:mr-3`}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.brand_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-700">
                        {product.total_sold || 0}
                      </td>
                      <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-gray-900 hidden sm:table-cell">
                        Rs. {parseFloat(product.total_revenue || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No product sales data</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Customers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Top Customers</h3>
            <button
              onClick={() => setActiveTab('customers')}
              className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors"
            >
              View All <Eye className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 md:py-3 text-xs font-semibold text-gray-600">Customer</th>
                  <th className="text-center py-2 md:py-3 text-xs font-semibold text-gray-600 hidden sm:table-cell">Orders</th>
                  <th className="text-right py-2 md:py-3 text-xs font-semibold text-gray-600">Spent</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers && topCustomers.length > 0 ? (
                  topCustomers.slice(0, 5).map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 md:py-3">
                        <div className="flex items-center">
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs mr-2 md:mr-3">
                            {customer.full_name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{customer.full_name}</p>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs px-1.5 md:px-2 py-0.5 rounded-full ${
                                customer.customer_tier === 'VIP' ? 'bg-yellow-100 text-yellow-700' : 
                                customer.customer_tier === 'Premium' ? 'bg-purple-100 text-purple-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {customer.customer_tier}
                              </span>
                              <span className="text-xs text-gray-400">
                                Avg: Rs. {parseFloat(customer.average_order_value || 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">
                        {customer.total_orders || 0}
                      </td>
                      <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-gray-900">
                        Rs. {parseFloat(customer.total_spent || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No customer data</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts && lowStockProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-red-50 border border-red-200 rounded-xl md:rounded-2xl p-4 md:p-6"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
            <h3 className="text-lg md:text-xl font-bold text-red-900">Low Stock Alerts</h3>
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {lowStockProducts.length} items
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-3 border border-red-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand_name} • {product.category_name}</p>
                    <p className="text-xs text-gray-400">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right ml-2">
                    <p className={`text-sm font-bold ${
                      product.stock_quantity === 0 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {product.stock_quantity} left
                    </p>
                    <p className="text-xs text-gray-500">Rs. {parseFloat(product.price).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {lowStockProducts.length > 6 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setActiveTab('products')}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                View all {lowStockProducts.length} low stock items →
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
