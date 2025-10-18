import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Phone, Mail, ShoppingBag, Calendar } from 'lucide-react';

const customersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '0771234567',
    orders: 5,
    status: 'Active',
    address: '123 Main Street, Colombo 03',
    city: 'Colombo',
    postalCode: '00300',
    joinedDate: '2023-05-15',
    totalSpent: 75000
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '0712345678',
    orders: 2,
    status: 'Active',
    address: '456 Galle Road, Colombo 04',
    city: 'Colombo',
    postalCode: '00400',
    joinedDate: '2023-08-20',
    totalSpent: 25000
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    mobile: '0765432109',
    orders: 10,
    status: 'Inactive',
    address: '789 Kandy Road, Kandy',
    city: 'Kandy',
    postalCode: '20000',
    joinedDate: '2023-01-10',
    totalSpent: 150000
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    mobile: '0756789012',
    orders: 1,
    status: 'Active',
    address: '321 Negombo Road, Negombo',
    city: 'Negombo',
    postalCode: '11500',
    joinedDate: '2023-10-05',
    totalSpent: 12000
  },
];

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerToToggle, setCustomerToToggle] = useState(null);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.mobile.includes(searchQuery)
  );

  const handleStatusClick = (e, customer) => {
    e.stopPropagation();
    setCustomerToToggle(customer);
    setShowConfirmation(true);
  };

  const confirmStatusToggle = () => {
    if (customerToToggle) {
      setCustomers(customers.map(customer =>
        customer.id === customerToToggle.id
          ? { ...customer, status: customer.status === 'Active' ? 'Inactive' : 'Active' }
          : customer
      ));
    }
    setShowConfirmation(false);
    setCustomerToToggle(null);
  };

  const cancelStatusToggle = () => {
    setShowConfirmation(false);
    setCustomerToToggle(null);
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
      <div className="flex justify-end mb-4">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg text-base"
          />
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-blue-200">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Mobile</th>
            <th className="p-4">No of Orders</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <motion.tr
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleRowClick(customer)}
              className="border-b border-blue-200 hover:bg-blue-100 cursor-pointer"
            >
              <td className="p-4">{customer.name}</td>
              <td className="p-4">{customer.email}</td>
              <td className="p-4">{customer.mobile}</td>
              <td className="p-4">{customer.orders}</td>
              <td className="p-4">
                <motion.span
                  onClick={(e) => handleStatusClick(e, customer)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    customer.status === 'Active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {customer.status}
                </motion.span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={cancelStatusToggle}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Status Change</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to change the status of <strong>{customerToToggle?.name}</strong> from{' '}
                <span className={`font-semibold ${customerToToggle?.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {customerToToggle?.status}
                </span>{' '}
                to{' '}
                <span className={`font-semibold ${customerToToggle?.status === 'Active' ? 'text-red-600' : 'text-green-600'}`}>
                  {customerToToggle?.status === 'Active' ? 'Inactive' : 'Active'}
                </span>?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelStatusToggle}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusToggle}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customer Details Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedCustomer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-base font-semibold text-gray-900">{selectedCustomer.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-base font-semibold text-gray-900">{selectedCustomer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mobile</p>
                        <p className="text-base font-semibold text-gray-900">{selectedCustomer.mobile}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joined Date</p>
                        <p className="text-base font-semibold text-gray-900">
                          {new Date(selectedCustomer.joinedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900">{selectedCustomer.address}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedCustomer.city}, {selectedCustomer.postalCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Statistics */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedCustomer.orders}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">
                          Rs. {selectedCustomer.totalSpent.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Account Status</p>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        selectedCustomer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedCustomer.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerList;
