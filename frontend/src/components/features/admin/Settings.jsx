import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, MapPin, Save, Edit2, X, Check } from 'lucide-react';

const Settings = () => {
  const [deliveryFees, setDeliveryFees] = useState({
    colombo: 300,
    outsideColombo: 500
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedFees, setEditedFees] = useState({
    colombo: 300,
    outsideColombo: 500
  });

  const handleEdit = () => {
    setEditedFees(deliveryFees);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedFees(deliveryFees);
    setIsEditing(false);
  };

  const handleSave = () => {
    setDeliveryFees(editedFees);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Settings</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Manage your store configuration</p>
        </div>
      </div>

      {/* Delivery Fee Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Colombo Delivery Fee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">Colombo Area</h3>
                <p className="text-xs md:text-sm text-gray-500">Delivery fee within Colombo</p>
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Fee (Rs.)
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Rs.</span>
                <input
                  type="number"
                  value={editedFees.colombo}
                  onChange={(e) => setEditedFees({ ...editedFees, colombo: parseFloat(e.target.value) || 0 })}
                  className="flex-1 px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                  placeholder="Enter fee"
                />
              </div>
            </div>
          ) : (
            <div className="mt-4 bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Current Fee</p>
              <p className="text-3xl font-bold text-blue-600">Rs. {deliveryFees.colombo.toFixed(2)}</p>
            </div>
          )}
        </motion.div>

        {/* Outside Colombo Delivery Fee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">Outside Colombo</h3>
                <p className="text-xs md:text-sm text-gray-500">Delivery fee outside Colombo</p>
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Fee (Rs.)
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Rs.</span>
                <input
                  type="number"
                  value={editedFees.outsideColombo}
                  onChange={(e) => setEditedFees({ ...editedFees, outsideColombo: parseFloat(e.target.value) || 0 })}
                  className="flex-1 px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  placeholder="Enter fee"
                />
              </div>
            </div>
          ) : (
            <div className="mt-4 bg-purple-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Current Fee</p>
              <p className="text-3xl font-bold text-purple-600">Rs. {deliveryFees.outsideColombo.toFixed(2)}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4"
      >
        {isEditing ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm md:text-base"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm md:text-base"
            >
              <Check className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Save Changes
            </motion.button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
            className="w-full sm:w-auto flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm md:text-base"
          >
            <Edit2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Edit Delivery Fees
          </motion.button>
        )}
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6"
      >
        <div className="flex items-center mb-3 md:mb-4">
          <div className="p-2 md:p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg md:rounded-xl mr-3 md:mr-4">
            <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base md:text-xl font-bold text-gray-900">Delivery Fee Summary</h3>
            <p className="text-xs md:text-sm text-gray-500">Current delivery charges overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Colombo</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">Rs. {deliveryFees.colombo.toFixed(2)}</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Outside Colombo</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">Rs. {deliveryFees.outsideColombo.toFixed(2)}</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
