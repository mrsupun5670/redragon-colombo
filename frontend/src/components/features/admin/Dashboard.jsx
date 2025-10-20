import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown, TrendingUp, Eye } from 'lucide-react';

const Dashboard = ({ setActiveTab }) => {
  const stats = [
    {
      name: 'Total Revenue',
      value: 'Rs. 2,456,780',
      change: '+20.1%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Total Orders',
      value: '1,248',
      change: '+15.3%',
      changeType: 'increase',
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Total Customers',
      value: '856',
      change: '+12.5%',
      changeType: 'increase',
      icon: Users,
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Total Products',
      value: '342',
      change: '-2.4%',
      changeType: 'decrease',
      icon: Package,
      color: 'from-orange-500 to-red-600'
    },
  ];

  const topProducts = [
    { id: 1, name: 'Redragon K552 Keyboard', sold: 245, revenue: 'Rs. 14,697.55', stock: 100 },
    { id: 2, name: 'Logitech G502 Mouse', sold: 189, revenue: 'Rs. 11,308.11', stock: 50 },
    { id: 3, name: 'Razer BlackWidow V3', sold: 156, revenue: 'Rs. 20,278.44', stock: 45 },
    { id: 4, name: 'SteelSeries Arctis 7', sold: 92, revenue: 'Rs. 13,799.08', stock: 75 },
    { id: 5, name: 'Corsair K70 RGB', sold: 78, revenue: 'Rs. 11,919.22', stock: 32 },
  ];

  const topCustomers = [
    { id: 1, name: 'Nimal Perera', orders: 24, spent: 'Rs. 125,000', status: 'VIP' },
    { id: 2, name: 'Saman Fernando', orders: 18, spent: 'Rs. 98,500', status: 'VIP' },
    { id: 3, name: 'Kamal Silva', orders: 15, spent: 'Rs. 76,200', status: 'Regular' },
    { id: 4, name: 'Sanduni Rajapaksha', orders: 12, spent: 'Rs. 65,400', status: 'Regular' },
    { id: 5, name: 'Chaminda Jayawardena', orders: 10, spent: 'Rs. 54,800', status: 'Regular' },
  ];

  const recentOrders = [
    { id: '#1248', customer: 'Nimal Perera', amount: 'Rs. 15,000', status: 'Delivered', date: '2024-10-15' },
    { id: '#1247', customer: 'Saman Fernando', amount: 'Rs. 7,550', status: 'Processing', date: '2024-10-15' },
    { id: '#1246', customer: 'Kamal Silva', amount: 'Rs. 30,000', status: 'Shipped', date: '2024-10-14' },
    { id: '#1245', customer: 'Sanduni Rajapaksha', amount: 'Rs. 5,000', status: 'Pending', date: '2024-10-14' },
    { id: '#1244', customer: 'Chaminda Jayawardena', amount: 'Rs. 12,300', status: 'Delivered', date: '2024-10-13' },
  ];

  // Mock data for orders chart (last 30 days)
  const ordersChartData = [
    { day: 1, orders: 12 }, { day: 2, orders: 19 }, { day: 3, orders: 15 }, { day: 4, orders: 25 },
    { day: 5, orders: 22 }, { day: 6, orders: 18 }, { day: 7, orders: 30 }, { day: 8, orders: 28 },
    { day: 9, orders: 24 }, { day: 10, orders: 32 }, { day: 11, orders: 28 }, { day: 12, orders: 35 },
    { day: 13, orders: 40 }, { day: 14, orders: 38 }, { day: 15, orders: 42 }, { day: 16, orders: 45 },
    { day: 17, orders: 50 }, { day: 18, orders: 48 }, { day: 19, orders: 52 }, { day: 20, orders: 55 },
    { day: 21, orders: 58 }, { day: 22, orders: 54 }, { day: 23, orders: 60 }, { day: 24, orders: 62 },
    { day: 25, orders: 65 }, { day: 26, orders: 63 }, { day: 27, orders: 68 }, { day: 28, orders: 70 },
    { day: 29, orders: 72 }, { day: 30, orders: 75 }
  ];

  const maxOrders = Math.max(...ordersChartData.map(d => d.orders));

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Dashboard Overview</h1>
        <div className="text-xs sm:text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
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
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs md:text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1 md:mt-2">vs last month</p>
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
            {ordersChartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-end group min-w-[8px]">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-cyan-500 relative"
                  style={{ height: `${(data.orders / maxOrders) * 100}%` }}
                >
                  <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Day {data.day}: {data.orders} orders
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span>Day 1</span>
            <span>Day 15</span>
            <span>Day 30</span>
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
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">{order.id}</p>
                  <p className="text-xs text-gray-500 truncate">{order.customer}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="text-xs md:text-sm font-bold text-gray-900 whitespace-nowrap">{order.amount}</p>
                  <span className={`text-xs px-2 py-0.5 md:py-1 rounded-full whitespace-nowrap ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
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
                {topProducts.map((product, index) => (
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
                        <span className="text-xs md:text-sm font-medium text-gray-900 truncate">{product.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-700">{product.sold}</td>
                    <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-gray-900 hidden sm:table-cell">{product.revenue}</td>
                  </tr>
                ))}
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
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 md:py-3">
                      <div className="flex items-center">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs mr-2 md:mr-3">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{customer.name}</p>
                          <span className={`text-xs px-1.5 md:px-2 py-0.5 rounded-full ${
                            customer.status === 'VIP' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {customer.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-2 md:py-3 text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">{customer.orders}</td>
                    <td className="text-right py-2 md:py-3 text-xs md:text-sm font-bold text-gray-900">{customer.spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
