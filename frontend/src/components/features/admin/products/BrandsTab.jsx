import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Plus, X, Upload, Trash2 } from 'lucide-react';
import AddBrandModal from './AddBrandModal';
import { adminApi } from '../../../../utils/adminApi';
import ErrorPopup from '../../../common/ErrorPopup';
import SuccessPopup from '../../../common/SuccessPopup';

const BrandsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      const data = await adminApi.get('/brands');
      
      if (data.success) {
        setBrands(data.data);
      } else {
        console.error('Failed to fetch brands:', data.message);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleEditClick = (brand) => {
    setEditingBrand(brand);
    setEditName(brand.name);
    setEditImage(brand.logo_url);
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) {
      setError('Brand name is required');
      return;
    }

    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append('name', editName.trim());
      
      // If editImage is a file, append it
      if (editImage && typeof editImage !== 'string') {
        formData.append('image', editImage);
      }

      const data = await adminApi.putFormData(`/brands/${editingBrand.id}`, formData);
      
      if (data.success) {
        await fetchBrands(); // Refresh the list
        setEditingBrand(null);
        setEditName('');
        setEditImage(null);
        setSuccess('Brand updated successfully!');
      } else {
        setError(data.message || 'Failed to update brand');
      }
    } catch (error) {
      console.error('Error updating brand:', error);
      setError('Failed to update brand');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingBrand(null);
    setEditName('');
    setEditImage(null);
  };

  const handleImageUpload = (file) => {
    if (file) {
      setEditImage(file); // Store the file object for upload
    }
  };

  const removeImage = () => {
    setEditImage(null);
  };

  const handleDeleteBrand = async (brandId, brandName) => {
    if (!window.confirm(`Are you sure you want to delete "${brandName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const data = await adminApi.delete(`/brands/${brandId}`);
      
      if (data.success) {
        await fetchBrands(); // Refresh the list
        setSuccess('Brand deleted successfully!');
      } else {
        setError(data.message || 'Failed to delete brand');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      setError('Failed to delete brand');
    }
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
        <h2 className="text-2xl font-bold">Brands ({brands.length})</h2>
        <motion.button onClick={() => setIsModalOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center px-4 py-2 text-white bg-red-600 rounded-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Brand
        </motion.button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-blue-200">
            <th className="p-4">Brand</th>
            <th className="p-4">Logo</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <motion.tr
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-blue-200 hover:bg-blue-100"
            >
              <td className="p-4 font-semibold">{brand.name}</td>
              <td className="p-4">
                {(brand.logo_url || brand.image_url) ? (
                  <img 
                    src={brand.logo_url || brand.image_url} 
                    alt={brand.name}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No logo</span>
                )}
              </td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => handleEditClick(brand)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-blue-100 text-blue-500 hover:bg-blue-200"
                  >
                    <Edit className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteBrand(brand.id, brand.name)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* Edit Brand Modal */}
      <AnimatePresence>
        {editingBrand && (
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
                <h3 className="text-xl font-bold text-gray-900">Edit Brand</h3>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 text-gray-800 bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                    autoFocus
                  />
                </div>

                {/* Brand Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
                  <div className="relative group">
                    {editImage ? (
                      <div className="relative">
                        <img
                          src={typeof editImage === 'string' ? editImage : URL.createObjectURL(editImage)}
                          alt="Brand logo preview"
                          className="w-full h-48 object-contain bg-white rounded-lg border-2 border-gray-200 p-4"
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
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
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
        <AddBrandModal 
          onClose={() => setIsModalOpen(false)} 
          onBrandAdded={fetchBrands}
        />
      )}
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default BrandsTab;