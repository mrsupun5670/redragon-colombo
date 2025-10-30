import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Phone, Mail, ShoppingBag, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerLoading, setSelectedCustomerLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerToToggle, setCustomerToToggle] = useState(null);
  const [filteredStatus, setFilteredStatus] = useState('all');

  const statusFilters = ['all', 'active', 'inactive', 'verified', 'unverified'];

  // Debounce search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (filteredStatus !== 'all') {
          params.append('status', filteredStatus);
        }
        
        if (debouncedSearchQuery.trim()) {
          params.append('search', debouncedSearchQuery.trim());
        }

        const response = await adminApi.get(`/customers/admin/all?${params.toString()}`);
        
        if (response.success) {
          setCustomers(response.data);
          setError(null);
        } else {
          setError('Failed to load customers');
        }
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [filteredStatus, debouncedSearchQuery]);

  const handleStatusClick = (e, customer) => {
    e.stopPropagation();
    setCustomerToToggle(customer);
    setShowConfirmation(true);
  };

  const confirmStatusToggle = async () => {
    if (customerToToggle) {
      try {
        const newStatus = !customerToToggle.is_active;
        
        const response = await adminApi.put(`/customers/admin/${customerToToggle.id}/status`, {
          is_active: newStatus
        });
        
        if (response.success) {
          // Update local state
          setCustomers(customers.map(customer =>
            customer.id === customerToToggle.id
              ? { ...customer, is_active: newStatus }
              : customer
          ));
        } else {
          console.error('Failed to update customer status:', response.message);
          alert('Failed to update customer status. Please try again.');
        }
      } catch (error) {
        console.error('Error updating customer status:', error);
        alert('Error updating customer status. Please try again.');
      }
    }
    setShowConfirmation(false);
    setCustomerToToggle(null);
  };

  const cancelStatusToggle = () => {
    setShowConfirmation(false);
    setCustomerToToggle(null);
  };

  const handleRowClick = async (customer) => {
    try {
      setSelectedCustomerLoading(true);
      
      // Fetch detailed customer info
      const response = await adminApi.get(`/customers/admin/${customer.id}`);
      
      if (response.success) {
        setSelectedCustomer(response.data);
      } else {
        // Fallback to basic customer info
        setSelectedCustomer(customer);
      }
    } catch (error) {
      console.error('Error fetching customer details:', error);
      // Fallback to basic customer info
      setSelectedCustomer(customer);
    } finally {
      setSelectedCustomerLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          <span className="ml-3 text-gray-600">Loading customers...</span>
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
    <div className="bg-blue-50 rounded-2xl shadow-lg p-4 md:p-8">
      {/* Mobile-responsive filter and search layout */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        {/* Status Filter Chips - Horizontally scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {statusFilters.map(status => (
            <button
              key={status}
              onClick={() => setFilteredStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap flex-shrink-0 text-sm md:text-base transition-all ${filteredStatus === status ? 'bg-red-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Bar - Full width on mobile, fixed width on desktop */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, Email or Mobile"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm md:text-base text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
          />
          {searchQuery !== debouncedSearchQuery && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>

      {/* Horizontally scrollable table on mobile */}
      <div className="overflow-x-auto -mx-4 md:mx-0 md:rounded-xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-blue-200 bg-blue-100/50">
              <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Name</th>
              <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Email</th>
              <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Phone</th>
              <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Total Orders</th>
              <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Total Spent</th>
              <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
              <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Verified</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-sm text-gray-500">
                  {debouncedSearchQuery ? 'No customers found matching your search.' : 'No customers found.'}
                </td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleRowClick(customer)}
                  className="border-b border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                >
                  <td className="p-3 md:p-4 text-xs md:text-sm font-medium whitespace-nowrap">{customer.full_name}</td>
                  <td className="p-3 md:p-4 text-xs md:text-sm whitespace-nowrap">{customer.email}</td>
                  <td className="p-3 md:p-4 text-xs md:text-sm whitespace-nowrap">{customer.phone}</td>
                  <td className="p-3 md:p-4 text-xs md:text-sm text-center whitespace-nowrap">{customer.total_orders}</td>
                  <td className="p-3 md:p-4 text-xs md:text-sm font-medium whitespace-nowrap">Rs. {parseFloat(customer.total_spent).toLocaleString()}</td>
                  <td className="p-3 md:p-4 text-xs md:text-sm">
                    <motion.span
                      onClick={(e) => handleStatusClick(e, customer)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 md:px-3 py-1 rounded-full font-semibold cursor-pointer transition-all whitespace-nowrap inline-block ${
                        customer.is_active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {customer.is_active ? 'Active' : 'Inactive'}
                    </motion.span>
                  </td>
                  <td className="p-3 md:p-4 text-xs md:text-sm">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      {customer.email_verified ? (
                        <CheckCircle className="w-4 md:w-5 h-4 md:h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 md:w-5 h-4 md:h-5 text-red-500 flex-shrink-0" />
                      )}
                      <span className={`font-semibold hidden md:inline ${
                        customer.email_verified ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {customer.email_verified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Loading overlay when fetching customer details */}
      {selectedCustomerLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
            <span>Loading customer details...</span>
          </div>
        </div>
      )}

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
                Are you sure you want to change the status of <strong>{customerToToggle?.full_name}</strong> from{' '}
                <span className={`font-semibold ${customerToToggle?.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  {customerToToggle?.is_active ? 'Active' : 'Inactive'}
                </span>{' '}
                to{' '}
                <span className={`font-semibold ${customerToToggle?.is_active ? 'text-red-600' : 'text-green-600'}`}>
                  {customerToToggle?.is_active ? 'Inactive' : 'Active'}
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
                        <p className="text-base font-semibold text-gray-900">{selectedCustomer.full_name}</p>
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
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-base font-semibold text-gray-900">{selectedCustomer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joined Date</p>
                        <p className="text-base font-semibold text-gray-900">
                          {new Date(selectedCustomer.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${selectedCustomer.email_verified ? 'bg-green-100' : 'bg-red-100'}`}>
                      {selectedCustomer.email_verified ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Verification</p>
                      <p className={`text-base font-semibold ${selectedCustomer.email_verified ? 'text-green-700' : 'text-red-700'}`}>
                        {selectedCustomer.email_verified ? 'Verified' : 'Unverified'}
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
                        <p className="text-2xl font-bold text-gray-900">{selectedCustomer.total_orders}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">
                          Rs. {parseFloat(selectedCustomer.total_spent).toLocaleString()}
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
                        selectedCustomer.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedCustomer.is_active ? 'Active' : 'Inactive'}
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
