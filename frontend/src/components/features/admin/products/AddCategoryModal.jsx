import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Upload } from 'lucide-react';

const AddCategoryModal = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [subcategories, setSubcategories] = useState(['']);

  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = value;
    setSubcategories(newSubcategories);
  };

  const addSubcategoryField = () => {
    setSubcategories([...subcategories, '']);
  };

  const removeSubcategoryField = (index) => {
    const newSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(newSubcategories);
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCategoryImage(null);
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
            <h2 className="text-2xl font-bold text-gray-800">Add New Category</h2>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-full bg-blue-100">
              <X className="w-5 h-5 text-gray-800" />
            </motion.button>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-500">Category Name</label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full mt-1 px-4 py-2 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg"
              />
            </div>

            {/* Category Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Category Image</label>
              <div className="relative group">
                {categoryImage ? (
                  <div className="relative">
                    <img
                      src={categoryImage}
                      alt="Category preview"
                      className="w-full h-48 object-cover rounded-lg border-2 border-blue-200"
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
                      Click to upload category image
                    </span>
                    <span className="text-xs text-gray-400 mt-1">Recommended: 800x600px (4:3 ratio)</span>
                    <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
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
            <div>
              <label className="block text-sm font-medium text-gray-500">Sub-categories</label>
              <div className="space-y-2 mt-1">
                {subcategories.map((subcategory, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      value={subcategory}
                      onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                      className="w-full px-4 py-2 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg" 
                    />
                    <motion.button type="button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => removeSubcategoryField(index)} className="p-2 rounded-lg bg-red-100 text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                ))}
              </div>
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={addSubcategoryField} 
                className="flex items-center mt-2 px-3 py-1 text-sm text-white bg-green-600 rounded-lg"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Sub-category
              </motion.button>
            </div>
            <div className="flex justify-end space-x-4">
              <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="px-6 py-2 font-bold text-gray-800 bg-gray-200 rounded-lg">
                Cancel
              </motion.button>
              <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-2 font-bold text-white bg-red-600 rounded-lg">
                Save Category
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddCategoryModal;
