import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image } from 'lucide-react';
import ErrorPopup from '../../../common/ErrorPopup';
import SuccessPopup from '../../../common/SuccessPopup';
import { adminApi } from '../../../../utils/adminApi';

const AddCategoryModal = ({ type = 'main', mainCategory, mainCategories, onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState(mainCategory?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    if (type === 'sub' && !selectedMainCategoryId) {
      setError('Main category is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = type === 'main' ? '/categories/main' : '/categories/sub';
      let data;

      if (type === 'main' && selectedImage) {
        // Use FormData for main categories with image
        const formData = new FormData();
        formData.append('name', categoryName.trim());
        formData.append('description', categoryDescription.trim() || '');
        formData.append('image', selectedImage);

        data = await adminApi.postFormData(endpoint, formData);
      } else {
        // Use JSON for sub categories or main categories without image
        const body = type === 'main' 
          ? {
              name: categoryName.trim(),
              description: categoryDescription.trim() || null
            }
          : {
              name: categoryName.trim(),
              description: categoryDescription.trim() || null,
              main_category_id: selectedMainCategoryId
            };

        data = await adminApi.post(endpoint, body);
      }
      
      if (data.success) {
        console.log("data " + data.data.data)
        setCategoryName('');
        setCategoryDescription('');
        setSelectedMainCategoryId(mainCategory?.id || '');
        setSelectedImage(null);
        setImagePreview(null);
        onCategoryAdded && onCategoryAdded();
        onClose();
      } else {
        setError(data.message || `Failed to create ${type} category`);
      }
    } catch (error) {
      console.error(`Error creating ${type} category:`, error);
      setError(error.response?.data?.message || `Failed to create ${type} category`);
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
            <h2 className="text-2xl font-bold text-gray-800">
              Add New {type === 'main' ? 'Main Category' : 'Sub Category'}
              {type === 'sub' && mainCategory && ` to ${mainCategory.name}`}
            </h2>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-full bg-blue-100">
              <X className="w-5 h-5 text-gray-800" />
            </motion.button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-500">
                {type === 'main' ? 'Main Category' : 'Sub Category'} Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full mt-1 px-4 py-2 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
                autoFocus
              />
            </div>
            
            <div>
              <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-500">Description (Optional)</label>
              <textarea
                id="categoryDescription"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                className="w-full mt-1 px-4 py-2 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
                rows="3"
                placeholder={`Brief description of this ${type} category...`}
              />
            </div>

            {type === 'main' && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Category Image (Optional)</label>
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
                    />
                    <motion.button
                      type="button"
                      onClick={removeImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-blue-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-400 hover:bg-blue-50 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="categoryImage"
                    />
                    <label htmlFor="categoryImage" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-blue-400 mb-2" />
                      <span className="text-xs text-blue-500 text-center">Upload Image</span>
                    </label>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">Recommended: 256x256px, PNG/JPG, Max 5MB</p>
              </div>
            )}

            {type === 'sub' && (
              <div>
                <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-500">Main Category</label>
                <select
                  id="mainCategory"
                  value={selectedMainCategoryId}
                  onChange={(e) => setSelectedMainCategoryId(e.target.value)}
                  className="w-full mt-1 px-4 py-2 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
                >
                  <option value="">Select main category</option>
                  {mainCategories?.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="flex justify-end space-x-4">
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={onClose} 
                className="px-6 py-2 font-bold text-gray-800 bg-gray-200 rounded-lg"
              >
                Cancel
              </motion.button>
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                disabled={isSubmitting}
                className="px-6 py-2 font-bold text-white bg-red-600 rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : `Save ${type === 'main' ? 'Main Category' : 'Sub Category'}`}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </AnimatePresence>
  );
};

export default AddCategoryModal;
