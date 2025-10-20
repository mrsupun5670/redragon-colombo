import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Plus, ChevronDown, X, Upload } from 'lucide-react';
import AddCategoryModal from './AddCategoryModal';

const initialCategories = [
  {
    id: 1,
    name: 'Keyboards',
    image: null,
    subcategories: [
      { id: 101, name: 'Mechanical' },
      { id: 102, name: 'Membrane' },
    ]
  },
  { id: 2, name: 'Mice', image: null, subcategories: [] },
  { id: 3, name: 'Headsets', image: null, subcategories: [] },
];

const CategoriesTab = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);

  const toggleCategory = (id) => {
    if (expandedCategory === id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(id);
    }
  };

  const handleEditCategory = (e, category) => {
    e.stopPropagation();
    setEditingCategory(category);
    setEditName(category.name);
    setEditImage(category.image);
  };

  const handleEditSubcategory = (categoryId, subcategory) => {
    setEditingSubcategory({ categoryId, subcategory });
    setEditName(subcategory.name);
  };

  const handleSaveCategoryEdit = () => {
    setCategories(categories.map(cat =>
      cat.id === editingCategory.id ? { ...cat, name: editName, image: editImage } : cat
    ));
    setEditingCategory(null);
    setEditName('');
    setEditImage(null);
  };

  const handleSaveSubcategoryEdit = () => {
    setCategories(categories.map(cat =>
      cat.id === editingSubcategory.categoryId
        ? {
            ...cat,
            subcategories: cat.subcategories.map(sub =>
              sub.id === editingSubcategory.subcategory.id
                ? { ...sub, name: editName }
                : sub
            )
          }
        : cat
    ));
    setEditingSubcategory(null);
    setEditName('');
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditingSubcategory(null);
    setEditName('');
    setEditImage(null);
  };

  const handleImageUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEditImage(null);
  };

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <motion.button onClick={() => setIsModalOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center px-4 py-2 text-white bg-red-600 rounded-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </motion.button>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="bg-blue-100 rounded-lg">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-200"
              onClick={() => toggleCategory(category.id)}
            >
              <h3 className="font-bold">{category.name}</h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={(e) => handleEditCategory(e, category)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-blue-200 text-blue-800 hover:bg-blue-300"
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
                <motion.div animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}>
                  <ChevronDown />
                </motion.div>
              </div>
            </div>
            <AnimatePresence>
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Sub-categories</h4>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center px-3 py-1 text-sm text-white bg-green-600 rounded-lg">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Sub-category
                      </motion.button>
                    </div>
                    <ul className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id} className="flex items-center justify-between p-2 bg-blue-200 rounded-lg">
                          <span>{subcategory.name}</span>
                          <motion.button
                            onClick={() => handleEditSubcategory(category.id, subcategory)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-blue-300 text-blue-800 hover:bg-blue-400"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Edit Category Modal */}
      <AnimatePresence>
        {editingCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCancelEdit}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Category</h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                    autoFocus
                  />
                </div>

                {/* Category Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                  <div className="relative group">
                    {editImage ? (
                      <div className="relative">
                        <img
                          src={editImage}
                          alt="Category preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
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
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 hover:bg-gray-50 transition-all">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
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
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCategoryEdit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Subcategory Modal */}
      <AnimatePresence>
        {editingSubcategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCancelEdit}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Subcategory</h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSubcategoryEdit}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isModalOpen && <AddCategoryModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default CategoriesTab;
