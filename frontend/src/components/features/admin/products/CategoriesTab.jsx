import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Plus, ChevronDown, X, Trash2 } from 'lucide-react';
import AddCategoryModal from './AddCategoryModal';
import { adminApi } from '../../../../utils/adminApi';
import ErrorPopup from '../../../common/ErrorPopup';
import SuccessPopup from '../../../common/SuccessPopup';

const CategoriesTab = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedMainCategoryForSub, setSelectedMainCategoryForSub] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editMainCategoryId, setEditMainCategoryId] = useState('');
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch main categories
  const fetchMainCategories = React.useCallback(async () => {
    try {
      const data = await adminApi.get('/categories/main');
      if (data.success) {
        setMainCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching main categories:', error);
    }
  }, []);

  // Fetch sub categories
  const fetchSubCategories = React.useCallback(async () => {
    try {
      const data = await adminApi.get('/categories/sub');
      if (data.success) {
        setSubCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching sub categories:', error);
    }
  }, []);

  // Fetch all categories
  const fetchCategories = React.useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchMainCategories(), fetchSubCategories()]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchMainCategories, fetchSubCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Get subcategories for a main category
  const getSubCategoriesForMain = (mainCategoryId) => {
    return subCategories.filter(sub => sub.main_category_id === mainCategoryId);
  };

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
    setEditDescription(category.description || '');
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubcategory(subcategory);
    setEditName(subcategory.name);
    setEditDescription(subcategory.description || '');
    setEditMainCategoryId(subcategory.main_category_id);
  };

  const handleSaveCategoryEdit = async () => {
    if (!editName.trim()) {
      setError('Category name is required');
      return;
    }

    setUpdating(true);
    try {
      const data = await adminApi.put(`/categories/main/${editingCategory.id}`, {
        name: editName.trim(),
        description: editDescription.trim() || null
      });
      
      if (data.success) {
        await fetchCategories();
        setEditingCategory(null);
        setEditName('');
        setEditDescription('');
        setSuccess('Category updated successfully!');
      } else {
        setError(data.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      setError('Failed to update category');
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveSubcategoryEdit = async () => {
    if (!editName.trim()) {
      setError('Sub category name is required');
      return;
    }

    if (!editMainCategoryId) {
      setError('Main category is required');
      return;
    }

    setUpdating(true);
    try {
      const data = await adminApi.put(`/categories/sub/${editingSubcategory.id}`, {
        name: editName.trim(),
        description: editDescription.trim() || null,
        main_category_id: editMainCategoryId
      });
      
      if (data.success) {
        await fetchCategories();
        setEditingSubcategory(null);
        setEditName('');
        setEditDescription('');
        setEditMainCategoryId('');
        setSuccess('Sub category updated successfully!');
      } else {
        setError(data.message || 'Failed to update sub category');
      }
    } catch (error) {
      console.error('Error updating sub category:', error);
      setError('Failed to update sub category');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteMainCategory = async (categoryId, categoryName) => {
    if (!window.confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const data = await adminApi.delete(`/categories/main/${categoryId}`);
      
      if (data.success) {
        await fetchCategories();
        setSuccess('Category deleted successfully!');
      } else {
        setError(data.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setError("Failed to delete category, it has products or sub categories associated with it.");
    }
  };

  const handleDeleteSubCategory = async (subCategoryId, subCategoryName) => {
    if (!window.confirm(`Are you sure you want to delete "${subCategoryName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const data = await adminApi.delete(`/categories/sub/${subCategoryId}`);
      
      if (data.success) {
        await fetchCategories();
        setSuccess('Sub category deleted successfully!');
      } else {
        setError(data.message || 'Failed to delete sub category');
      }
    } catch (error) {
      console.error('Error deleting sub category:', error);
      setError('Failed to delete sub category , it has products associated with it.');
    }
  };

  const handleAddSubCategory = (mainCategory) => {
    setSelectedMainCategoryForSub(mainCategory);
    setIsSubModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditingSubcategory(null);
    setEditName('');
    setEditDescription('');
    setEditMainCategoryId('');
  };

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories ({mainCategories.length} main, {subCategories.length} sub)</h2>
        <motion.button onClick={() => setIsModalOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center px-4 py-2 text-white bg-red-600 rounded-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Main Category
        </motion.button>
      </div>
      <div className="space-y-2">
        {mainCategories.map((category) => {
          const categorySubCategories = getSubCategoriesForMain(category.id);
          return (
            <div key={category.id} className="bg-blue-100 rounded-lg">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-200"
                onClick={() => toggleCategory(category.id)}
              >
                <div>
                  <h3 className="font-bold">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={(e) => handleEditCategory(e, category)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-blue-200 text-blue-800 hover:bg-blue-300"
                  >
                    <Edit className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMainCategory(category.id, category.name);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-red-200 text-red-800 hover:bg-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
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
                        <h4 className="font-semibold">Sub-categories ({categorySubCategories.length})</h4>
                        <motion.button 
                          onClick={() => handleAddSubCategory(category)}
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }} 
                          className="flex items-center px-3 py-1 text-sm text-white bg-green-600 rounded-lg"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Sub-category
                        </motion.button>
                      </div>
                      <ul className="space-y-2">
                        {categorySubCategories.map((subcategory) => (
                          <li key={subcategory.id} className="flex items-center justify-between p-3 bg-blue-200 rounded-lg">
                            <div>
                              <span className="font-medium">{subcategory.name}</span>
                              {subcategory.description && (
                                <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <motion.button
                                onClick={() => handleEditSubcategory(subcategory)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-blue-300 text-blue-800 hover:bg-blue-400"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteSubCategory(subcategory.id, subcategory.name)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-red-300 text-red-800 hover:bg-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </li>
                        ))}
                        {categorySubCategories.length === 0 && (
                          <li className="text-center text-gray-500 py-4">
                            No sub-categories yet. Click "Add Sub-category" to create one.
                          </li>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
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
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                    rows="3"
                    placeholder="Brief description of this category..."
                  />
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
                  disabled={updating}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
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
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                    autoFocus
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                    rows="3"
                    placeholder="Brief description of this subcategory..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Category</label>
                  <select
                    value={editMainCategoryId}
                    onChange={(e) => setEditMainCategoryId(e.target.value)}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                  >
                    <option value="">Select main category</option>
                    {mainCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                  onClick={handleSaveSubcategoryEdit}
                  disabled={updating}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isModalOpen && (
        <AddCategoryModal 
          type="main"
          onClose={() => setIsModalOpen(false)} 
          onCategoryAdded={fetchCategories}
        />
      )}
      
      {isSubModalOpen && (
        <AddCategoryModal 
          type="sub"
          mainCategory={selectedMainCategoryForSub}
          mainCategories={mainCategories}
          onClose={() => {
            setIsSubModalOpen(false);
            setSelectedMainCategoryForSub(null);
          }} 
          onCategoryAdded={fetchCategories}
        />
      )}
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default CategoriesTab;
