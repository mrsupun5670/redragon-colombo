import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Tag,
  Percent,
  Calendar,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';

const PromoList = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [deletePromoId, setDeletePromoId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    promo_code: '',
    discount_price: ''
  });

  // Load promo codes
  const loadPromoCodes = async () => {
    try {
      setLoading(true);
      const response = await adminApi.get('/promo');
      if (response.success) {
        setPromoCodes(response.data);
      }
    } catch (err) {
      setError('Failed to load promo codes');
      console.error('Error loading promo codes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPromoCodes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.promo_code || !formData.discount_price) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (editingPromo) {
        await adminApi.put(`/promo/${editingPromo.id}`, formData);
      } else {
        await adminApi.post('/promo', formData);
      }
      
      setShowAddModal(false);
      setEditingPromo(null);
      setFormData({ promo_code: '', discount_price: '' });
      loadPromoCodes();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save promo code');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/promo/${id}`);
      loadPromoCodes();
      setDeletePromoId(null);
    } catch (err) {
      setError('Failed to delete promo code');
    }
  };

  // Handle edit
  const handleEdit = (promo) => {
    setEditingPromo(promo);
    setFormData({
      promo_code: promo.promo_code,
      discount_price: promo.discount_price
    });
    setShowAddModal(true);
  };

  // Filter promo codes
  const filteredPromoCodes = promoCodes.filter(promo =>
    promo.promo_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promo Codes</h1>
          <p className="text-gray-600">Manage discount promo codes</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setEditingPromo(null);
            setFormData({ promo_code: '', discount_price: '' });
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Promo Code
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search promo codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Promo Codes List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading promo codes...</p>
          </div>
        ) : filteredPromoCodes.length === 0 ? (
          <div className="p-8 text-center">
            <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No promo codes found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'No promo codes match your search.' : 'Get started by adding your first promo code.'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Promo Code
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Promo Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPromoCodes.map((promo, index) => (
                  <motion.tr
                    key={promo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <Tag className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {promo.promo_code}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Percent className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-600">
                          {promo.discount_price}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(promo)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDeletePromoId(promo.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingPromo ? 'Edit Promo Code' : 'Add New Promo Code'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    value={formData.promo_code}
                    onChange={(e) => setFormData({ ...formData, promo_code: e.target.value.toUpperCase() })}
                    placeholder="e.g., SUMMER20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discount_price}
                    onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                    placeholder="e.g., 20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingPromo(null);
                    setFormData({ promo_code: '', discount_price: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {editingPromo ? 'Update' : 'Add'} Promo Code
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletePromoId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete Promo Code
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this promo code? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeletePromoId(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deletePromoId)}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PromoList;