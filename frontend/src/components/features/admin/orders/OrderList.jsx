import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrderDetailsModal from './OrderDetailsModal';
import { Search } from 'lucide-react';

const initialOrders = [
  { id: 1, customer: 'Nimal Perera', date: '2023-10-26', total: 15000, status: 'Pending', address: 'No. 45/2, Dutugemunu Street, Colombo 06', phone: '0771234567', items: [{ name: 'Redragon K552 Keyboard', qty: 1, price: 15000 }] },
  { id: 2, customer: 'Saman Fernando', date: '2023-10-25', total: 7550, status: 'Processing', trackingNumber: 'ABC123456', address: '123/5A, Galle Road, Dehiwala', phone: '0712345678', items: [{ name: 'Logitech G502 Mouse', qty: 1, price: 7550 }] },
  { id: 3, customer: 'Kamal Silva', date: '2023-10-24', total: 30000, status: 'Shipped', trackingNumber: 'XYZ789012', address: '78, Peradeniya Road, Kandy', phone: '0765432109', items: [{ name: 'SteelSeries Arctis 7 Headset', qty: 1, price: 30000 }] },
  { id: 4, customer: 'Sanduni Rajapaksha', date: '2023-10-23', total: 5000, status: 'Delivered', address: '15/A, Negombo Road, Wattala', phone: '0756789012', items: [{ name: 'Razer Mouse Bungee', qty: 1, price: 5000 }] },
  { id: 5, customer: 'Chaminda Jayawardena', date: '2023-10-22', total: 22500, status: 'Delivered', address: '234/B, High Level Road, Maharagama', phone: '+94782345678', items: [{ name: 'Corsair K70 RGB Keyboard', qty: 1, price: 22500 }] },
];

const OrderList = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filteredStatus, setFilteredStatus] = useState('Pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const statusFilters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  const filteredOrders = orders
    .filter(order => filteredStatus === 'All' || order.status === filteredStatus)
    .filter(order => 
      order.id.toString().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {statusFilters.map(status => (
            <button 
              key={status}
              onClick={() => setFilteredStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold ${filteredStatus === status ? 'bg-red-600 text-white' : 'bg-blue-100 text-blue-800'}`}>
              {status}
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
          {filteredOrders.map((order, index) => (
            <motion.tr
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-blue-200 hover:bg-blue-100 cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <td className="p-4">{order.id}</td>
              <td className="p-4">{order.customer}</td>
              <td className="p-4">{order.date}</td>
              <td className="p-4">{order.total.toLocaleString()}</td>
              <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>{order.status}</span></td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} setOrders={setOrders} />}
    </div>
  );
};

export default OrderList;