import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderDetailsModal from './OrderDetailsModal';
import { Search } from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredStatus, setFilteredStatus] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderLoading, setSelectedOrderLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const statusFilters = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (filteredStatus !== 'all') {
          params.append('status', filteredStatus);
        }
        
        if (debouncedSearchQuery.trim()) {
          params.append('search', debouncedSearchQuery.trim());
        }

        const response = await adminApi.get(`/orders/admin/all?${params.toString()}`);        
        if (response.success) {
          setOrders(response.data);
          setError(null);
        } else {
          setError('Failed to load orders');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filteredStatus, debouncedSearchQuery]);

  // Fetch full order details when order is clicked
  const handleOrderClick = async (order) => {
    try {
      setSelectedOrderLoading(true);
      const response = await adminApi.get(`/orders/admin/${order.id}`);
      
      if (response.success) {
        // Transform the detailed order data to match modal expectations
        const detailedOrder = {
          ...order,
          items: response.data.items || [],
          customer_notes: response.data.customer_notes,
          payment_method_name: response.data.payment_method_name,
          // Add any missing fields from the detailed response
          address: response.data.address || 'Address not available', // You might need to add shipping address to the API
          phone: response.data.customer_phone || 'Phone not available',
          postal_code: response.data.postal_code || 'N/A',
        };
        setSelectedOrder(detailedOrder);
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      // Still show the modal with basic order info
      setSelectedOrder({
        ...order,
        items: [],
        address: 'Address not available',
        phone: order.customer_phone || 'Phone not available'
      });
    } finally {
      setSelectedOrderLoading(false);
    }
  };

  // Refresh orders after status update
  const refreshOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filteredStatus !== 'all') {
        params.append('status', filteredStatus);
      }
      
      if (debouncedSearchQuery.trim()) {
        params.append('search', debouncedSearchQuery.trim());
      }

      const response = await adminApi.get(`/orders/admin/all?${params.toString()}`);
      
      if (response.success) {
        setOrders(response.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error refreshing orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Transform orders to match expected format
  const transformedOrders = orders.map(order => ({
    id: order.id,
    customer: order.customer_name,
    date: new Date(order.created_at).toLocaleDateString(),
    total: parseFloat(order.total),
    status: order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1),
    order_number: order.order_number,
    payment_status: order.payment_status,
    customer_email: order.customer_email,
    customer_phone: order.customer_phone,
    payment_method_name: order.payment_method_name
  }));

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <span className="ml-3 text-gray-600">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {statusFilters.map(status => (
            <button 
              key={status}
              onClick={() => setFilteredStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold ${filteredStatus === status ? 'bg-red-600 text-white' : 'bg-blue-100 text-blue-800'}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order # or Customer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg text-base"
          />
          {searchQuery !== debouncedSearchQuery && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-blue-200">
            <th className="p-4">Order #</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Date</th>
            <th className="p-4">Total (Rs.)</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {transformedOrders.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                {searchQuery ? 'No orders found matching your search.' : 'No orders found.'}
              </td>
            </tr>
          ) : (
            transformedOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-blue-200 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <td className="p-4">{order.order_number || order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4">Rs. {order.total.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-orange-100 text-orange-800' : 
                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Loading overlay when fetching order details */}
      {selectedOrderLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
            <span>Loading order details...</span>
          </div>
        </div>
      )}
      
      {selectedOrder && !selectedOrderLoading && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => {
            setSelectedOrder(null);
            refreshOrders(); // Refresh orders after modal closes
          }} 
          setOrders={setOrders} 
        />
      )}
    </div>
  );
};

export default OrderList;