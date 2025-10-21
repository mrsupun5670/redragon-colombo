import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import RefundDetailsModal from './RefundDetailsModal';

const initialRefunds = [
  {
    id: 1,
    customer: 'Nimal Perera',
    email: 'nimal.perera@gmail.com',
    phone: '0771234567',
    order_id: 1248,
    product_name: 'Redragon K552 Keyboard',
    quantity: 1,
    refund_amount: 15000,
    reason: 'Defective Product',
    detailed_description: 'Some keys are not working properly. The spacebar sticks and the Enter key requires excessive force.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400'
    ],
    status: 'pending',
    requested_at: '2024-01-15 10:30:00',
    order_date: '2024-01-10'
  },
  {
    id: 2,
    customer: 'Saman Fernando',
    email: 'saman.fernando@yahoo.com',
    phone: '0712345678',
    order_id: 1247,
    product_name: 'Logitech G502 Mouse',
    quantity: 1,
    refund_amount: 7550,
    reason: 'Wrong Item Received',
    detailed_description: 'I ordered the black version but received the white one instead.',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
    ],
    status: 'approved',
    requested_at: '2024-01-14 15:20:00',
    reviewed_at: '2024-01-15 09:00:00',
    admin_notes: 'Verified with shipping records. Approved for full refund.',
    order_date: '2024-01-08'
  },
  {
    id: 3,
    customer: 'Kamal Silva',
    email: 'kamal.silva@gmail.com',
    phone: '0765432109',
    order_id: 1246,
    product_name: 'SteelSeries Arctis 7 Headset',
    quantity: 1,
    refund_amount: 30000,
    reason: 'Product Damaged During Shipping',
    detailed_description: 'Package arrived with visible damage. Headset ear cup is cracked.',
    images: [
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=400',
      'https://images.unsplash.com/photo-1590658165737-15a047b7a9ea?w=400',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'
    ],
    status: 'pending',
    requested_at: '2024-01-13 14:45:00',
    order_date: '2024-01-09'
  }
];

const RefundList = () => {
  const [refunds, setRefunds] = useState(initialRefunds);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRefund, setSelectedRefund] = useState(null);

  const statusFilters = [
    { value: 'all', label: 'All Refunds' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'processed', label: 'Processed' }
  ];

  const filteredRefunds = refunds.filter(refund => {
    const matchesSearch =
      refund.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.order_id.toString().includes(searchQuery);

    const matchesStatus = filterStatus === 'all' || refund.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
      processed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle }
    };
    const config = badges[status] || badges.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleUpdateStatus = (refundId, newStatus, adminNotes) => {
    setRefunds(prevRefunds =>
      prevRefunds.map(refund =>
        refund.id === refundId
          ? {
              ...refund,
              status: newStatus,
              admin_notes: adminNotes,
              reviewed_at: new Date().toISOString()
            }
          : refund
      )
    );
  };

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Refund Management</h2>
          <p className="text-gray-600 mt-1">Review and process customer refund requests</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer, email, or order #"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg text-base focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map(filter => (
          <button
            key={filter.value}
            onClick={() => setFilterStatus(filter.value)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === filter.value
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Refunds Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-blue-200">
              <th className="p-4 font-bold text-gray-700">Refund ID</th>
              <th className="p-4 font-bold text-gray-700">Customer</th>
              <th className="p-4 font-bold text-gray-700">Order #</th>
              <th className="p-4 font-bold text-gray-700">Product</th>
              <th className="p-4 font-bold text-gray-700">Amount</th>
              <th className="p-4 font-bold text-gray-700">Reason</th>
              <th className="p-4 font-bold text-gray-700">Status</th>
              <th className="p-4 font-bold text-gray-700">Requested</th>
              <th className="p-4 font-bold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.map((refund, index) => (
              <motion.tr
                key={refund.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <td className="p-4 font-semibold">#{refund.id}</td>
                <td className="p-4">
                  <div>
                    <p className="font-semibold text-gray-900">{refund.customer}</p>
                    <p className="text-xs text-gray-600">{refund.email}</p>
                  </div>
                </td>
                <td className="p-4 font-semibold">#{refund.order_id}</td>
                <td className="p-4 max-w-xs truncate">{refund.product_name}</td>
                <td className="p-4 font-bold text-red-600">Rs. {refund.refund_amount.toLocaleString()}</td>
                <td className="p-4 max-w-xs">
                  <span className="text-sm">{refund.reason}</span>
                </td>
                <td className="p-4">{getStatusBadge(refund.status)}</td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(refund.requested_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedRefund(refund)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredRefunds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No refund requests found</p>
          </div>
        )}
      </div>

      {/* Refund Details Modal */}
      {selectedRefund && (
        <RefundDetailsModal
          refund={selectedRefund}
          onClose={() => setSelectedRefund(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default RefundList;
