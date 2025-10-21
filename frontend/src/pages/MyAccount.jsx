import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Package,
  History,
  RefreshCw,
  Settings,
  LogOut,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Edit,
  Calendar,
  DollarSign,
  TruckIcon,
  Clock,
  CheckCircle,
  CreditCard,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleEffect from '../components/common/ParticleEffect';
import RefundRequestModal from '../components/common/RefundRequestModal';
import EditProfileModal from '../components/common/EditProfileModal';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Mock user data (replace with actual data from context/API)
  const [userData, setUserData] = useState({
    firstName: 'Nimal',
    lastName: 'Perera',
    email: 'nimal.perera@gmail.com',
    phone: '0771234567',
    address: 'No. 45/2, Dutugemunu Street, Colombo 06',
    city: 'Colombo',
    postalCode: '00600',
    joinedDate: '2023-05-15',
    totalOrders: 12,
    totalSpent: 285000,
    memberSince: '8 months'
  });

  // Handle profile update
  const handleSaveProfile = async (updatedData) => {
    // Here you would typically make an API call to update the user data
    // For now, we'll just update the state
    setUserData(prev => ({
      ...prev,
      ...updatedData
    }));

    // In a real app, you would do something like:
    // const response = await api.updateUserProfile(updatedData);
    // setUserData(response.data);
  };

  // Mock orders data
  const orders = [
    {
      id: '#1248',
      date: '2024-01-15',
      items: 3,
      total: 45000,
      deliveryCharge: 628,
      paymentFee: 318.84,
      deliveryZone: 'Inside Colombo',
      paymentMethod: 'Card Payment',
      status: 'Delivered',
      trackingNumber: 'RD123456789',
      estimatedDelivery: '2024-01-18',
      deliveredDate: '2024-01-17',
      deliveryAddress: 'No. 45/2, Dutugemunu Street, Colombo 06',
      products: [
        { name: 'Redragon K552 Keyboard', qty: 1, price: 15000, weight: 0.8 },
        { name: 'Logitech G502 Mouse', qty: 1, price: 7550, weight: 0.5 },
        { name: 'Gaming Headset', qty: 1, price: 22450, weight: 0.3 }
      ],
      deliveryUpdates: [
        { date: '2024-01-17 14:30', status: 'Delivered', message: 'Package delivered successfully to recipient' },
        { date: '2024-01-17 09:15', status: 'Out for Delivery', message: 'Package is out for delivery' },
        { date: '2024-01-16 16:20', status: 'In Transit', message: 'Package arrived at Colombo sorting facility' },
        { date: '2024-01-15 11:00', status: 'Confirmed', message: 'Order confirmed and packaged' }
      ]
    },
    {
      id: '#1247',
      date: '2024-01-10',
      items: 1,
      total: 30000,
      deliveryCharge: 500,
      paymentFee: 0,
      deliveryZone: 'Outside Colombo',
      paymentMethod: 'Cash on Delivery',
      status: 'Shipped',
      trackingNumber: 'RD987654321',
      estimatedDelivery: '2024-01-14',
      deliveryAddress: 'No. 125, Galle Road, Panadura',
      products: [
        { name: 'SteelSeries Arctis 7 Headset', qty: 1, price: 30000, weight: 0.3 }
      ],
      deliveryUpdates: [
        { date: '2024-01-12 10:45', status: 'In Transit', message: 'Package in transit to Panadura' },
        { date: '2024-01-11 14:30', status: 'Shipped', message: 'Package shipped from warehouse' },
        { date: '2024-01-10 11:00', status: 'Confirmed', message: 'Order confirmed and ready for shipping' }
      ]
    },
    {
      id: '#1246',
      date: '2024-01-05',
      items: 2,
      total: 42500,
      deliveryCharge: 400,
      paymentFee: 5572.50,
      deliveryZone: 'Suburbs (Gampaha)',
      paymentMethod: 'Koko Payment',
      status: 'Processing',
      estimatedDelivery: '2024-01-09',
      deliveryAddress: 'No. 78/A, Kandy Road, Gampaha',
      products: [
        { name: 'Corsair K70 RGB Keyboard', qty: 1, price: 22500, weight: 0.8 },
        { name: 'Razer Mouse Pad', qty: 1, price: 20000, weight: 0.2 }
      ],
      deliveryUpdates: [
        { date: '2024-01-06 09:00', status: 'Processing', message: 'Order is being prepared for shipment' },
        { date: '2024-01-05 15:30', status: 'Confirmed', message: 'Payment received and order confirmed' }
      ]
    }
  ];

  // Mock refunds data
  const refunds = [
    {
      id: 1,
      order_id: '#1245',
      product_name: 'Defective Keyboard',
      amount: 15000,
      status: 'approved',
      requested_at: '2024-01-12',
      reason: 'Defective Product'
    },
    {
      id: 2,
      order_id: '#1240',
      product_name: 'Wrong Mouse Model',
      amount: 7550,
      status: 'processed',
      requested_at: '2024-01-08',
      reason: 'Wrong Item Received'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User, mobileLabel: 'Home' },
    { id: 'orders', label: 'My Orders', icon: Package, mobileLabel: 'Orders' },
    { id: 'refunds', label: 'My Refunds', icon: RefreshCw, mobileLabel: 'Refunds' },
    { id: 'settings', label: 'Settings', icon: Settings, mobileLabel: 'Settings' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-800',
      'Shipped': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Pending': 'bg-orange-100 text-orange-800',
      'approved': 'bg-green-100 text-green-800',
      'processed': 'bg-blue-100 text-blue-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Overview Section
  const OverviewSection = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Welcome back, {userData.firstName}!</h2>
        <p className="text-sm sm:text-base text-white/90">Manage your orders, refunds, and account settings</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Total Orders</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{userData.totalOrders}</p>
            </div>
            <div className="bg-blue-100 p-3 sm:p-4 rounded-xl flex-shrink-0">
              <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Total Spent</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 break-words">Rs. {userData.totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 p-3 sm:p-4 rounded-xl flex-shrink-0">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100 sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-gray-500 text-xs sm:text-sm font-medium">Member Since</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{userData.memberSince}</p>
            </div>
            <div className="bg-purple-100 p-3 sm:p-4 rounded-xl flex-shrink-0">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Account Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Account Details</h3>
          <button
            onClick={() => setShowEditProfile(true)}
            className="flex items-center justify-center sm:justify-start gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors px-4 py-2 bg-red-50 sm:bg-transparent rounded-lg sm:rounded-none hover:bg-red-100 sm:hover:bg-transparent"
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm sm:text-base">Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Full Name</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{userData.firstName} {userData.lastName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <div className="bg-green-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Email Address</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{userData.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <div className="bg-purple-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Phone Number</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">{userData.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-0 bg-gray-50 sm:bg-transparent rounded-lg sm:rounded-none">
            <div className="bg-orange-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Address</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{userData.address}</p>
              <p className="text-xs sm:text-sm text-gray-600">{userData.city}, {userData.postalCode}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Orders Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Orders</h3>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-red-600 hover:text-red-700 font-semibold text-sm sm:text-base self-start sm:self-auto"
          >
            View All →
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {orders.slice(0, 2).map((order, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2 sm:gap-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{order.id}</span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{order.items} items • {order.date}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-bold text-gray-900 text-base sm:text-lg">Rs. {order.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Orders Section
  const OrdersSection = () => {
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [showTrackingFor, setShowTrackingFor] = useState(null);
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [selectedOrderForRefund, setSelectedOrderForRefund] = useState(null);

    const toggleOrderExpansion = (orderId) => {
      setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const handleRefundRequest = (order) => {
      setSelectedOrderForRefund(order);
      setShowRefundModal(true);
    };

    return (
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 px-1">My Orders</h2>

        {orders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-100"
          >
            {/* Order Header - Always Visible */}
            <div
              className="p-3 sm:p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleOrderExpansion(order.id)}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Order {order.id}</h3>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)} whitespace-nowrap`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">Placed on {new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{order.items} items • {order.deliveryZone}</p>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0">
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">Rs. {(order.total + order.deliveryCharge + order.paymentFee).toLocaleString()}</p>
                    {order.trackingNumber && (
                      <p className="text-xs text-blue-600 mt-1 font-medium">
                        Track: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOrderExpansion(order.id);
                    }}
                    className="text-xs sm:text-sm text-red-600 font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Order Details */}
            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 pt-0 border-t border-gray-200">
            {/* Delivery Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 mt-3 sm:mt-4">
              <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-blue-50 rounded-lg">
                <TruckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500">Delivery Address</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1 break-words">{order.deliveryAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-green-50 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    {order.deliveredDate ? 'Delivered On' : 'Estimated Delivery'}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 mt-1">
                    {new Date(order.deliveredDate || order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-3 sm:mb-4">
              <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">Order Items:</h4>
              <div className="space-y-2">
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-2.5 sm:px-3 bg-gray-50 rounded-lg gap-1 sm:gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xs sm:text-sm text-gray-900 font-medium break-words">{product.name}</span>
                      <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">×{product.qty}</span>
                      <span className="text-gray-400 text-xs whitespace-nowrap">({product.weight}kg)</span>
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-gray-900 self-start sm:self-auto">Rs. {product.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Items Subtotal:</span>
                <span className="font-semibold">Rs. {order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Delivery Charge:</span>
                <span className="font-semibold">Rs. {order.deliveryCharge.toLocaleString()}</span>
              </div>
              {order.paymentFee > 0 && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Payment Processing:</span>
                  <span className="font-semibold">Rs. {order.paymentFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200 text-sm sm:text-base">
                <span className="font-bold text-gray-900">Total Paid:</span>
                <span className="font-bold text-red-600">
                  Rs. {(order.total + order.deliveryCharge + order.paymentFee).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-600 flex items-center gap-1">
                  <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                  Payment Method:
                </span>
                <span className="font-semibold">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Delivery Tracking */}
            {order.deliveryUpdates && (
              <div className="mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTrackingFor(showTrackingFor === order.id ? null : order.id);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <span className="font-semibold text-blue-900 flex items-center gap-2">
                    <TruckIcon className="w-4 h-4" />
                    Delivery Tracking
                  </span>
                  <span className="text-blue-600 text-sm">
                    {showTrackingFor === order.id ? '▲ Hide' : '▼ Show'}
                  </span>
                </button>

                {showTrackingFor === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 space-y-3"
                  >
                    {order.deliveryUpdates.map((update, idx) => (
                      <div key={idx} className="flex gap-3 relative">
                        {idx < order.deliveryUpdates.length - 1 && (
                          <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                        )}
                        <div className="flex-shrink-0">
                          <div className={`w-5 h-5 rounded-full ${
                            update.status === 'Delivered' ? 'bg-green-500' :
                            update.status === 'Out for Delivery' ? 'bg-blue-500' :
                            update.status === 'In Transit' ? 'bg-yellow-500' :
                            'bg-gray-400'
                          } flex items-center justify-center`}>
                            {update.status === 'Delivered' && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 text-sm">{update.status}</p>
                            <p className="text-xs text-gray-500">{update.date}</p>
                          </div>
                          <p className="text-sm text-gray-600">{update.message}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 sm:py-2 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                <FileText className="w-4 h-4" />
                View Invoice
              </button>
              {order.status === 'Delivered' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefundRequest(order);
                  }}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-2 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                >
                  <RefreshCw className="w-4 h-4" />
                  Request Refund
                </button>
              )}
              {(order.status === 'Shipped' || order.status === 'Processing') && (
                <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 sm:py-2 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base">
                  <TruckIcon className="w-4 h-4" />
                  Track Order
                </button>
              )}
            </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Refund Request Modal */}
        {showRefundModal && selectedOrderForRefund && (
          <RefundRequestModal
            order={selectedOrderForRefund}
            onClose={() => {
              setShowRefundModal(false);
              setSelectedOrderForRefund(null);
            }}
            onSubmit={(refundData) => {
              console.log('Refund submitted:', refundData);
              // Handle refund submission
              setShowRefundModal(false);
              setSelectedOrderForRefund(null);
            }}
          />
        )}
      </div>
    );
  };

  // Refunds Section
  const RefundsSection = () => (
    <div className="space-y-3 sm:space-y-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 px-1">My Refunds</h2>

      {refunds.length > 0 ? (
        refunds.map((refund, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Refund #{refund.id}</h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(refund.status)} whitespace-nowrap`}>
                      {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Order: {refund.order_id}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 break-words">Product: {refund.product_name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Reason: {refund.reason}</p>
                  <p className="text-xs sm:text-sm text-gray-500">Requested: {new Date(refund.requested_at).toLocaleDateString()}</p>
                </div>
                <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Refund Amount</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">Rs. {refund.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="bg-white rounded-xl p-8 sm:p-12 text-center shadow-lg border-2 border-gray-100">
          <RefreshCw className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-500 text-base sm:text-lg">No refund requests yet</p>
        </div>
      )}
    </div>
  );

  // Settings Section
  const SettingsSection = () => (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 px-1">Account Settings</h2>

      {/* Edit Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Profile Information</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Update your personal information and contact details</p>
        <button
          onClick={() => setShowEditProfile(true)}
          className="flex items-center gap-2 w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2.5 sm:py-3 rounded-lg font-bold transition-all justify-center text-sm sm:text-base"
        >
          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
          Edit Profile
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Change Password</h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-sm sm:text-base"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-sm sm:text-base"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-sm sm:text-base"
              placeholder="Confirm new password"
            />
          </div>
          <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-2.5 sm:py-3 rounded-lg font-bold transition-all text-sm sm:text-base">
            Update Password
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border-2 border-gray-100"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Logout</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Sign out of your account on this device</p>
        <button className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-3 rounded-lg font-bold transition-all justify-center text-sm sm:text-base">
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          Logout
        </button>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection />;
      case 'orders':
        return <OrdersSection />;
      case 'refunds':
        return <RefundsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ParticleEffect />
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-8 sm:pb-16">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Mobile User Profile Card */}
          <div className="lg:hidden mb-4 bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-bold text-gray-900 truncate">{userData.firstName} {userData.lastName}</h2>
                <p className="text-xs text-gray-500 truncate">{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-4 sm:mb-6 bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 relative">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Navigation</p>
              <p className="text-xs text-gray-400">← Swipe to see all →</p>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max pb-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                          : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.mobileLabel || tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Gradient fade indicators */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6 pb-6 border-b border-gray-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                    {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{userData.firstName} {userData.lastName}</h2>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          userData={userData}
          onClose={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default MyAccount;
