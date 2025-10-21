import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Package,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
  ZoomIn
} from 'lucide-react';

const RefundDetailsModal = ({ refund, onClose, onUpdateStatus }) => {
  const [adminNotes, setAdminNotes] = useState(refund.admin_notes || '');
  const [selectedImage, setSelectedImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleApprove = async () => {
    if (!adminNotes.trim()) {
      alert('Please add admin notes before approving');
      return;
    }
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onUpdateStatus(refund.id, 'approved', adminNotes);
    setProcessing(false);
    onClose();
  };

  const handleReject = async () => {
    if (!adminNotes.trim()) {
      alert('Please add admin notes explaining the rejection');
      return;
    }
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onUpdateStatus(refund.id, 'rejected', adminNotes);
    setProcessing(false);
    onClose();
  };

  const handleMarkProcessed = async () => {
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    onUpdateStatus(refund.id, 'processed', adminNotes);
    setProcessing(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">Refund Request Details</h2>
              <p className="text-white/90 mt-1">Refund ID: #{refund.id} | Order #{refund.order_id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Customer & Order Info */}
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-blue-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Customer Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <User className="w-4 h-4 mt-1 mr-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="font-semibold text-gray-900">{refund.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 mt-1 mr-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900">{refund.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 mt-1 mr-3 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-900">{refund.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refund Details */}
                <div className="bg-green-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-green-600" />
                    Refund Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Product</p>
                      <p className="font-semibold text-gray-900">{refund.product_name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="font-semibold text-gray-900">{refund.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Refund Amount</p>
                        <p className="font-bold text-green-600 text-lg">Rs. {refund.refund_amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reason</p>
                      <p className="font-semibold text-gray-900">{refund.reason}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(refund.order_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Requested Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(refund.requested_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Description */}
                <div className="bg-yellow-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                    Customer Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{refund.detailed_description}</p>
                </div>
              </div>

              {/* Right Column - Images & Admin Actions */}
              <div className="space-y-6">
                {/* Evidence Images */}
                <div className="bg-purple-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <ZoomIn className="w-5 h-5 mr-2 text-purple-600" />
                    Evidence Images ({refund.images.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {refund.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt={`Evidence ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg border-2 border-purple-200 group-hover:border-purple-500 transition-all"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-gray-600" />
                    Admin Notes
                  </h3>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add your review notes here..."
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    disabled={refund.status === 'processed'}
                  />
                  {refund.reviewed_at && (
                    <p className="text-xs text-gray-500 mt-2">
                      Last reviewed: {new Date(refund.reviewed_at).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                {refund.status === 'pending' && (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleReject}
                      disabled={processing}
                      className="flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      Reject
                    </button>
                    <button
                      onClick={handleApprove}
                      disabled={processing}
                      className="flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all disabled:opacity-50"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Approve
                    </button>
                  </div>
                )}

                {refund.status === 'approved' && (
                  <button
                    onClick={handleMarkProcessed}
                    disabled={processing}
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-all disabled:opacity-50"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Mark as Processed
                  </button>
                )}

                {(refund.status === 'rejected' || refund.status === 'processed') && (
                  <div className={`p-4 rounded-lg ${
                    refund.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    <p className="font-semibold text-center">
                      This refund has been {refund.status}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Image Zoom Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[90vh]"
            >
              <img
                src={selectedImage}
                alt="Zoomed evidence"
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default RefundDetailsModal;
