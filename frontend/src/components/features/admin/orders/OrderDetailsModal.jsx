import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck } from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';

const OrderDetailsModal = ({ order, onClose, setOrders }) => {
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (newStatus) => {
    try {
      setUpdating(true);
      
      // Call backend API to update order status
      const response = await adminApi.put(`/orders/admin/${order.id}/status`, {
        order_status: newStatus.toLowerCase()
      });
      
      if (response.success) {
        // Update local state only if API call succeeds
        setOrders(prevOrders => prevOrders.map(o => 
          o.id === order.id 
            ? { ...o, status: newStatus, trackingNumber: newStatus === 'Shipped' ? trackingNumber : o.trackingNumber } 
            : o
        ));
        onClose();
      } else {
        console.error('Failed to update order status:', response.message);
        alert('Failed to update order status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="bg-blue-50 rounded-2xl shadow-2xl p-8 w-full max-w-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Order #{order.id}</h2>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-full bg-blue-100">
              <X className="w-5 h-5 text-gray-800" />
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Customer Details</h3>
              <p><strong>Name:</strong> {order.customer}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Order Summary</h3>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> Rs. {order.total.toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Order Items</h3>
            <ul className="space-y-2">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <li key={item.product_name || item.name || index} className="flex justify-between">
                    <span>{item.product_name || item.name} (x{item.quantity || item.qty})</span>
                    <span>Rs. {parseFloat(item.price).toLocaleString()}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No items found for this order</li>
              )}
            </ul>
          </div>
          <div className="mt-8">
            {order.status === 'Pending' && (
              <motion.button 
                onClick={() => updateStatus('Confirmed')} 
                disabled={updating}
                whileHover={{ scale: updating ? 1 : 1.05 }} 
                whileTap={{ scale: updating ? 1 : 0.95 }} 
                className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg ${
                  updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {updating ? 'Updating...' : 'Mark as Confirmed'}
              </motion.button>
            )}
            {order.status === 'Confirmed' && (
              <motion.button 
                onClick={() => updateStatus('Processing')} 
                disabled={updating}
                whileHover={{ scale: updating ? 1 : 1.05 }} 
                whileTap={{ scale: updating ? 1 : 0.95 }} 
                className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg ${
                  updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {updating ? 'Updating...' : 'Mark as Processing'}
              </motion.button>
            )}
            {order.status === 'Processing' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Tracking Number</label>
                  <input 
                    type="text" 
                    value={trackingNumber} 
                    onChange={(e) => setTrackingNumber(e.target.value)} 
                    disabled={updating}
                    className="w-full mt-1 px-4 py-2 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg disabled:opacity-50" 
                  />
                </div>
                <motion.button 
                  onClick={() => updateStatus('Shipped')} 
                  disabled={updating}
                  whileHover={{ scale: updating ? 1 : 1.05 }} 
                  whileTap={{ scale: updating ? 1 : 0.95 }} 
                  className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg flex items-center justify-center ${
                    updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  <Truck className="w-5 h-5 mr-2" />
                  {updating ? 'Updating...' : 'Mark as Shipped'}
                </motion.button>
              </div>
            )}
            {order.status === 'Shipped' && (
              <motion.button 
                onClick={() => updateStatus('Delivered')} 
                disabled={updating}
                whileHover={{ scale: updating ? 1 : 1.05 }} 
                whileTap={{ scale: updating ? 1 : 0.95 }} 
                className={`w-full px-6 py-3 text-lg font-bold text-white rounded-lg ${
                  updating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {updating ? 'Updating...' : 'Mark as Delivered'}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
