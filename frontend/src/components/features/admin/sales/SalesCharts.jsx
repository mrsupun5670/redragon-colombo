import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, RotateCcw } from 'lucide-react';

const SalesCharts = () => {
  // Revenue & Profit data (last 12 months)
  const revenueData = [
    { month: 'Jan', revenue: 185000, profit: 45000, orders: 156 },
    { month: 'Feb', revenue: 198000, profit: 52000, orders: 178 },
    { month: 'Mar', revenue: 224000, profit: 61000, orders: 195 },
    { month: 'Apr', revenue: 235000, profit: 68000, orders: 210 },
    { month: 'May', revenue: 245000, profit: 72000, orders: 225 },
    { month: 'Jun', revenue: 268000, profit: 81000, orders: 248 },
    { month: 'Jul', revenue: 282000, profit: 89000, orders: 265 },
    { month: 'Aug', revenue: 295000, profit: 95000, orders: 278 },
    { month: 'Sep', revenue: 305000, profit: 102000, orders: 290 },
    { month: 'Oct', revenue: 325000, profit: 112000, orders: 315 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  // Key metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: 'Rs. 2,562,000',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Net Profit',
      value: 'Rs. 777,000',
      change: '+22.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Total Orders',
      value: '2,360',
      change: '+15.8%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Returns',
      value: '42',
      change: '-8.3%',
      trend: 'down',
      icon: RotateCcw,
      color: 'from-orange-500 to-red-600'
    },
  ];

  // Best selling categories (for pie chart simulation)
  const categories = [
    { name: 'Keyboards', value: 35, color: 'from-red-500 to-orange-500', amount: 'Rs. 896,700' },
    { name: 'Mice', value: 28, color: 'from-blue-500 to-cyan-500', amount: 'Rs. 717,360' },
    { name: 'Headsets', value: 22, color: 'from-purple-500 to-pink-500', amount: 'Rs. 563,640' },
    { name: 'Monitors', value: 15, color: 'from-green-500 to-emerald-500', amount: 'Rs. 384,300' },
  ];

  // Top performing products
  const topProducts = [
    { rank: 1, name: 'Redragon K552', sold: 245, revenue: 'Rs. 367,500', profit: 'Rs. 85,750' },
    { rank: 2, name: 'Logitech G502', sold: 189, revenue: 'Rs. 302,400', profit: 'Rs. 72,576' },
    { rank: 3, name: 'Razer BlackWidow', sold: 156, revenue: 'Rs. 312,000', profit: 'Rs. 74,880' },
    { rank: 4, name: 'SteelSeries Arctis', sold: 128, revenue: 'Rs. 256,000', profit: 'Rs. 61,440' },
    { rank: 5, name: 'Corsair K70 RGB', sold: 112, revenue: 'Rs. 224,000', profit: 'Rs. 53,760' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Sales Analytics</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Comprehensive business performance overview</p>
        </div>
        <select className="w-full sm:w-auto px-3 md:px-4 py-2 text-sm md:text-base bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400">
          <option>Last 12 Months</option>
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden p-4 md:p-6"
          >
            <div className={`absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${metric.color} opacity-10 rounded-bl-full`}></div>
            <div className="relative">
              <div className={`inline-flex p-2 md:p-3 bg-gradient-to-br ${metric.color} rounded-lg md:rounded-xl mb-3 md:mb-4`}>
                <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <p className="text-xs md:text-sm text-gray-500 mb-1">{metric.title}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{metric.value}</p>
              <div className={`flex items-center text-xs md:text-sm font-semibold ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" /> : <TrendingDown className="w-3 h-3 md:w-4 md:h-4 mr-1" />}
                {metric.change} vs last period
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue & Profit Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Revenue & Profit Trends</h3>
          <div className="flex items-end justify-between h-48 md:h-64 lg:h-80 overflow-x-auto">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-end gap-1 px-1">
                {/* Revenue bar */}
                <div className="relative w-full group">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                    style={{ height: `${(data.revenue / maxRevenue) * 280}px` }}
                  >
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      Revenue: Rs. {data.revenue.toLocaleString()}<br />
                      Profit: Rs. {data.profit.toLocaleString()}<br />
                      Orders: {data.orders}
                    </div>
                  </div>
                </div>
                {/* Profit bar */}
                <div
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
                  style={{ height: `${(data.profit / maxRevenue) * 280}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Profit</span>
            </div>
          </div>
        </motion.div>

        {/* Sales by Category (Pie Chart Alternative) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Sales by Category</h3>
          <div className="space-y-4">
            {categories.map((cat, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                  <span className="text-sm font-bold text-gray-900">{cat.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 bg-gradient-to-r ${cat.color} rounded-full transition-all duration-500`}
                    style={{ width: `${cat.value}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{cat.amount}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Total Categories</p>
            <p className="text-2xl font-bold text-gray-900">Rs. 2,562,000</p>
          </div>
        </motion.div>
      </div>

      {/* Top Products & Returns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Top Performing Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Top Performing Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600">Rank</th>
                  <th className="text-left py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600">Product</th>
                  <th className="text-center py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600 hidden sm:table-cell">Sold</th>
                  <th className="text-right py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600 hidden md:table-cell">Revenue</th>
                  <th className="text-right py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-600">Profit</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.rank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 md:py-3">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg ${
                        product.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                        product.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        product.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                        'bg-gradient-to-br from-blue-400 to-blue-600'
                      } flex items-center justify-center text-white font-bold text-xs md:text-sm`}>
                        {product.rank}
                      </div>
                    </td>
                    <td className="py-2 md:py-3 text-xs md:text-sm font-medium text-gray-900 truncate max-w-[120px] md:max-w-none">{product.name}</td>
                    <td className="text-center py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">{product.sold}</td>
                    <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-gray-900 hidden md:table-cell whitespace-nowrap">{product.revenue}</td>
                    <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-green-600 whitespace-nowrap">{product.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Returns & Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Returns & Refunds</h3>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Returns</p>
              <p className="text-3xl font-bold text-red-600">42</p>
              <p className="text-xs text-red-500 mt-1">↓ 8.3% from last month</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Refund Amount</p>
              <p className="text-2xl font-bold text-orange-600">Rs. 125,800</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Return Rate</p>
              <p className="text-2xl font-bold text-yellow-600">1.78%</p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Top Return Reasons</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Defective</span>
                  <span className="font-semibold text-gray-900">45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wrong Item</span>
                  <span className="font-semibold text-gray-900">30%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Not as Described</span>
                  <span className="font-semibold text-gray-900">25%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SalesCharts;
