import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TruckIcon, Plus, Edit, Trash2, X, Save, MapPin, DollarSign, Package, CreditCard, Wallet, Eye, EyeOff } from 'lucide-react';
import api from '../../../../services/api';
import ErrorPopup from '../../../common/ErrorPopup';
import SuccessPopup from '../../../common/SuccessPopup';

const DeliverySettings = () => {
  const [activeTab, setActiveTab] = useState('zones'); // 'zones' or 'payment'
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [showEditZoneModal, setShowEditZoneModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [zoneForm, setZoneForm] = useState({
    zone_name: '',
    base_charge: '',
    extra_charge: '',
    min_weight: '1.00'
  });

  const [paymentForm, setPaymentForm] = useState({
    method_name: '',
    display_name: '',
    fee_type: 'percentage',
    fee_value: '',
    description: '',
    is_active: true
  });

  useEffect(() => {
    fetchDeliveryZones();
    fetchPaymentMethods();
  }, []);

  const fetchDeliveryZones = async () => {
    try {
      setLoading(true);
      const response = await api.get('/delivery/zones/admin');
      setDeliveryZones(response.data);
    } catch (error) {
      console.error('Error fetching delivery zones:', error);
      setError('Failed to fetch delivery zones');
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const response = await api.get('/delivery/payment-methods/admin');
      setPaymentMethods(response.data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      setError('Failed to fetch payment methods');
    } finally {
      setLoading(false);
    }
  };

  const handleAddZone = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/delivery/zones', zoneForm);
      setSuccess('Delivery zone added successfully!');
      setShowAddZoneModal(false);
      setZoneForm({ zone_name: '', base_charge: '', extra_charge: '', min_weight: '1.00' });
      fetchDeliveryZones();
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to add delivery zone');
    } finally {
      setLoading(false);
    }
  };

  const handleEditZone = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/delivery/zones/${selectedZone.id}`, zoneForm);
      setSuccess('Delivery zone updated successfully!');
      setShowEditZoneModal(false);
      setSelectedZone(null);
      fetchDeliveryZones();
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to update delivery zone');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteZone = async (id) => {
    if (!window.confirm('Are you sure you want to delete this delivery zone?')) return;

    try {
      setLoading(true);
      await api.delete(`/delivery/zones/${id}`);
      setSuccess('Delivery zone deleted successfully!');
      fetchDeliveryZones();
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to delete delivery zone');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/delivery/payment-methods/${selectedPayment.id}`, paymentForm);
      setSuccess('Payment method updated successfully!');
      setShowEditPaymentModal(false);
      setSelectedPayment(null);
      fetchPaymentMethods();
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to update payment method');
    } finally {
      setLoading(false);
    }
  };

  const openEditZoneModal = (zone) => {
    setSelectedZone(zone);
    setZoneForm({
      zone_name: zone.zone_name,
      base_charge: zone.base_charge,
      extra_charge: zone.extra_charge,
      min_weight: zone.min_weight
    });
    setShowEditZoneModal(true);
  };

  const openEditPaymentModal = (payment) => {
    setSelectedPayment(payment);
    setPaymentForm({
      method_name: payment.method_name,
      display_name: payment.display_name,
      fee_type: payment.fee_type,
      fee_value: payment.fee_value,
      description: payment.description,
      is_active: payment.is_active
    });
    setShowEditPaymentModal(true);
  };

  const calculateExampleDelivery = (zone, weight) => {
    if (weight <= zone.min_weight) {
      return parseFloat(zone.base_charge);
    }
    const extraWeight = weight - zone.min_weight;
    return parseFloat(zone.base_charge) + (extraWeight * parseFloat(zone.extra_charge));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">Delivery & Payment Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('zones')}
          className={`px-6 py-3 text-lg font-medium transition-colors ${
            activeTab === 'zones'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <TruckIcon className="w-5 h-5 inline mr-2" />
          Delivery Zones
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-6 py-3 text-lg font-medium transition-colors ${
            activeTab === 'payment'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <CreditCard className="w-5 h-5 inline mr-2" />
          Payment Methods
        </button>
      </div>

      {/* Delivery Zones Tab */}
      {activeTab === 'zones' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Manage delivery zones and weight-based shipping charges
            </p>
            <button
              onClick={() => setShowAddZoneModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add Delivery Zone
            </button>
          </div>

          {/* Delivery Zones List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliveryZones.map((zone) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100 hover:border-red-200 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <h3 className="text-xl font-bold text-gray-900">{zone.zone_name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditZoneModal(zone)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteZone(zone.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Base Charge:</span>
                    <span className="text-lg font-bold text-blue-600">Rs. {parseFloat(zone.base_charge).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Extra Charge/kg:</span>
                    <span className="text-lg font-bold text-green-600">Rs. {parseFloat(zone.extra_charge).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Min Weight:</span>
                    <span className="text-lg font-bold text-gray-900">{parseFloat(zone.min_weight).toFixed(2)} kg</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">Example Calculations:</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>• 0.8 kg: Rs. {Math.round(calculateExampleDelivery(zone, 0.8)).toLocaleString()}</p>
                      <p>• 2.5 kg: Rs. {Math.round(calculateExampleDelivery(zone, 2.5)).toLocaleString()}</p>
                      <p>• 5.1 kg: Rs. {Math.round(calculateExampleDelivery(zone, 5.1)).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    {zone.is_active ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Active</span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">Inactive</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Manage payment methods and processing fees
            </p>
          </div>

          {/* Payment Methods List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100 hover:border-red-200 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    {method.method_name === 'card' && <CreditCard className="w-5 h-5 text-red-500" />}
                    {method.method_name === 'koko' && <Wallet className="w-5 h-5 text-purple-500" />}
                    {method.method_name === 'cod' && <Package className="w-5 h-5 text-green-500" />}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{method.display_name}</h3>
                  </div>
                  <button
                    onClick={() => openEditPaymentModal(method)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">Fee Type:</p>
                    <p className="text-sm font-bold text-gray-900 capitalize">{method.fee_type}</p>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">Fee Value:</p>
                    <p className="text-lg font-bold text-orange-600">
                      {method.fee_type === 'percentage' ? `${method.fee_value}%` : `Rs. ${method.fee_value}`}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">Description:</p>
                    <p className="text-xs text-gray-700">{method.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    {method.is_active ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add Zone Modal */}
      <AnimatePresence>
        {showAddZoneModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Delivery Zone</h2>
                <button
                  onClick={() => setShowAddZoneModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddZone} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Zone Name *</label>
                  <input
                    type="text"
                    required
                    value={zoneForm.zone_name}
                    onChange={(e) => setZoneForm({ ...zoneForm, zone_name: e.target.value })}
                    placeholder="e.g., Inside Colombo"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Base Charge (Rs) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={zoneForm.base_charge}
                    onChange={(e) => setZoneForm({ ...zoneForm, base_charge: e.target.value })}
                    placeholder="300.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Extra Charge per KG (Rs) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={zoneForm.extra_charge}
                    onChange={(e) => setZoneForm({ ...zoneForm, extra_charge: e.target.value })}
                    placeholder="80.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Weight (KG) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0.01"
                    value={zoneForm.min_weight}
                    onChange={(e) => setZoneForm({ ...zoneForm, min_weight: e.target.value })}
                    placeholder="1.00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddZoneModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Zone'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Zone Modal */}
      <AnimatePresence>
        {showEditZoneModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Delivery Zone</h2>
                <button
                  onClick={() => setShowEditZoneModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditZone} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Zone Name *</label>
                  <input
                    type="text"
                    required
                    value={zoneForm.zone_name}
                    onChange={(e) => setZoneForm({ ...zoneForm, zone_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Base Charge (Rs) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={zoneForm.base_charge}
                    onChange={(e) => setZoneForm({ ...zoneForm, base_charge: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Extra Charge per KG (Rs) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={zoneForm.extra_charge}
                    onChange={(e) => setZoneForm({ ...zoneForm, extra_charge: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Weight (KG) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0.01"
                    value={zoneForm.min_weight}
                    onChange={(e) => setZoneForm({ ...zoneForm, min_weight: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditZoneModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Zone'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Payment Method Modal */}
      <AnimatePresence>
        {showEditPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Payment Method</h2>
                <button
                  onClick={() => setShowEditPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Display Name *</label>
                  <input
                    type="text"
                    required
                    value={paymentForm.display_name}
                    onChange={(e) => setPaymentForm({ ...paymentForm, display_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fee Type *</label>
                  <select
                    required
                    value={paymentForm.fee_type}
                    onChange={(e) => setPaymentForm({ ...paymentForm, fee_type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Fee Value * {paymentForm.fee_type === 'percentage' ? '(%)' : '(Rs)'}
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={paymentForm.fee_value}
                    onChange={(e) => setPaymentForm({ ...paymentForm, fee_value: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={paymentForm.description}
                    onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={paymentForm.is_active}
                    onChange={(e) => setPaymentForm({ ...paymentForm, is_active: e.target.checked })}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-bold text-gray-700">
                    Active (visible to customers)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditPaymentModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Method'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Error and Success Popups */}
      {error && <ErrorPopup message={error} onClose={() => setError('')} />}
      {success && <SuccessPopup message={success} onClose={() => setSuccess('')} />}
    </div>
  );
};

export default DeliverySettings;
