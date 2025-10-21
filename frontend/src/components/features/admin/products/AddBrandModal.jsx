import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';

const AddBrandModal = ({ onClose, onBrandAdded }) => {
  const [brandName, setBrandName] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (file) => {
    if (file) {
      setBrandImage(file); // Store file object for upload
    }
  };

  const removeImage = () => {
    setBrandImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!brandName.trim()) {
      alert('Brand name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', brandName.trim());
      
      if (brandImage) {
        formData.append('image', brandImage);
      }

      const response = await adminApi.postFormData('http://localhost:5001/api/brands', formData);

      const data = await response.json();
      
      if (data.success) {
        setBrandName('');
        setBrandImage(null);
        onBrandAdded && onBrandAdded(); // Callback to refresh brands list
        onClose();
      } else {
        alert(data.message || 'Failed to create brand');
      }
    } catch (error) {
      console.error('Error creating brand:', error);
      alert('Failed to create brand');
    } finally {
      setIsSubmitting(false);
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
          className="bg-blue-50 rounded-2xl shadow-2xl p-8 w-full max-w-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Brand</h2>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-full bg-blue-100">
              <X className="w-5 h-5 text-gray-800" />
            </motion.button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="brandName" className="block text-sm font-medium text-gray-500">Brand Name</label>
              <input
                type="text"
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full mt-1 px-4 py-2 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg"
              />
            </div>

            {/* Brand Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Brand Logo</label>
              <div className="relative group">
                {brandImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(brandImage)}
                      alt="Brand logo preview"
                      className="w-full h-48 object-contain bg-white rounded-lg border-2 border-blue-200 p-4"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-red-400 hover:bg-blue-50 transition-all">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 text-center px-2 font-semibold">
                      Click to upload brand logo
                    </span>
                    <span className="text-xs text-gray-400 mt-1">Recommended: 400x200px (2:1 ratio)</span>
                    <span className="text-xs text-gray-400">PNG, JPG, SVG (transparent background preferred)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="px-6 py-2 font-bold text-gray-800 bg-gray-200 rounded-lg">
                Cancel
              </motion.button>
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                disabled={isSubmitting}
                className="px-6 py-2 font-bold text-white bg-red-600 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Brand'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddBrandModal;
