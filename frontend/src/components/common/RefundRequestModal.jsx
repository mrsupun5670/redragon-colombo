import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, AlertCircle, CheckCircle } from 'lucide-react';

const RefundRequestModal = ({ order, onClose, onSubmit }) => {
  const orderProducts = order.products || order.items || [];
  const [formData, setFormData] = useState({
    product_name: orderProducts[0]?.name || '',
    quantity: 1,
    reason: '',
    detailed_description: '',
    images: []
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const refundReasons = [
    'Defective Product',
    'Wrong Item Received',
    'Item Not as Described',
    'Changed Mind',
    'Product Damaged During Shipping',
    'Missing Parts/Accessories',
    'Other'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setUploading(true);
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(images => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...images]
      }));
      setUploading(false);
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.reason) {
      setError('Please select a reason for refund');
      return;
    }

    if (formData.images.length === 0) {
      setError('Please upload at least one image showing the issue');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        order_id: order.id,
        refund_amount: order.total
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to submit refund request');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-red-500 to-orange-500 p-6 flex justify-between items-center z-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Request Refund</h2>
              <p className="text-white/90 text-sm mt-1">Order #{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg flex items-center"
            >
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <p className="font-semibold text-green-900">Refund Request Submitted!</p>
                <p className="text-sm text-green-700">We'll review your request within 24-48 hours.</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-center"
            >
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <p className="text-red-900">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Product Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product *</label>
              <select
                value={formData.product_name}
                onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                required
              >
                {orderProducts.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name} - Rs. {item.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Quantity *</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Refund *</label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                required
              >
                <option value="">Select a reason</option>
                {refundReasons.map((reason, index) => (
                  <option key={index} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                value={formData.detailed_description}
                onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                placeholder="Please provide detailed information about the issue..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none resize-none"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Upload Images * (Max 5 images)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Please upload clear photos showing the issue with the product
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Evidence ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {formData.images.length < 5 && (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-500 hover:bg-gray-50 transition-all">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={success || uploading}
                className={`flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-bold hover:from-red-600 hover:to-orange-600 transition-all ${
                  (success || uploading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {success ? 'Request Submitted' : 'Submit Refund Request'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RefundRequestModal;
