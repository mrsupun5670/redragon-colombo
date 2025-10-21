import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';

const AddCategoryModal = ({ type = 'main', mainCategory, mainCategories, onClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState(mainCategory?.id || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      alert('Category name is required');
      return;
    }

    if (type === 'sub' && !selectedMainCategoryId) {
      alert('Main category is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = type === 'main' 
        ? 'http://localhost:5001/api/categories/main'
        : 'http://localhost:5001/api/categories/sub';

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

      const response = await adminApi.post(endpoint, body);

      const data = await response.json();
      
      if (data.success) {
        setCategoryName('');
        setCategoryDescription('');
        setSelectedMainCategoryId(mainCategory?.id || '');
        onCategoryAdded && onCategoryAdded();
        onClose();
      } else {
        alert(data.message || `Failed to create ${type} category`);
      }
    } catch (error) {
      console.error(`Error creating ${type} category:`, error);
      alert(`Failed to create ${type} category`);
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
    </AnimatePresence>
  );
};

export default AddCategoryModal;
