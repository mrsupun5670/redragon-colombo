import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';
import ErrorPopup from '../../../common/ErrorPopup';
import SuccessPopup from '../../../common/SuccessPopup';

const AddProduct = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [product, setProduct] = useState({
    title: '',
    description: '',
    brand: '',
    category: '',
    subcategory: '',
    price: '',
    salePrice: '',
    cost: '',
    stock: '',
    weight: '',
    color: '',
    isFeatured: false,
    specifications: [{ key: '', value: '' }],
    images: [null, null, null, null, null],
  });
  
  const [brands, setBrands] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Load brands and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [brandsData, mainCategoriesData, subCategoriesData] = await Promise.all([
          adminApi.get('/brands'),
          adminApi.get('/categories/main'),
          adminApi.get('/categories/sub')
        ]);

        if (brandsData.success) setBrands(brandsData.data);
        if (mainCategoriesData.success) setMainCategories(mainCategoriesData.data);
        if (subCategoriesData.success) setSubCategories(subCategoriesData.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...product.specifications];
    newSpecs[index][field] = value;
    setProduct({ ...product, specifications: newSpecs });
  };

  const addSpecField = () => {
    setProduct({ ...product, specifications: [...product.specifications, { key: '', value: '' }] });
  };

  const removeSpecField = (index) => {
    const newSpecs = product.specifications.filter((_, i) => i !== index);
    setProduct({ ...product, specifications: newSpecs });
  };

  const handleImageUpload = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...product.images];
        newImages[index] = reader.result;
        setProduct({ ...product, images: newImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages[index] = null;
    setProduct({ ...product, images: newImages });
  };

  const renderProductDetails = () => (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
        <input
          type="text"
          value={product.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter product name"
          className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={product.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter product description"
          rows="4"
          className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
        ></textarea>
      </div>

      {/* Brand and Category Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
          <select
            value={product.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          >
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.name}>{brand.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            value={product.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          >
            <option value="">Select Category</option>
            {mainCategories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sub-category and Color Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sub-category</label>
          <select
            value={product.subcategory}
            onChange={(e) => handleInputChange('subcategory', e.target.value)}
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          >
            <option value="">Select Sub-category</option>
            {subCategories.map(subcategory => (
              <option key={subcategory.id} value={subcategory.name}>{subcategory.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <input
            type="text"
            value={product.color}
            onChange={(e) => handleInputChange('color', e.target.value)}
            placeholder="e.g., Black, Red, RGB"
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
      </div>

      {/* Quantity, Cost, Price, and Shipping Fee Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
          <input
            type="number"
            value={product.stock}
            onChange={(e) => handleInputChange('stock', e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cost (Rs.) *</label>
          <input
            type="number"
            value={product.cost}
            onChange={(e) => handleInputChange('cost', e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
      </div>

      {/* Price, Sale Price, and Weight Row */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price (Rs.) *</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price (Rs.)</label>
          <input
            type="number"
            value={product.salePrice}
            onChange={(e) => handleInputChange('salePrice', e.target.value)}
            placeholder="Leave empty for no sale"
            min="0"
            step="0.01"
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (grams)</label>
          <input
            type="number"
            value={product.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
          />
        </div>
      </div>

      {/* Featured Product Checkbox */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFeatured"
            checked={product.isFeatured}
            onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
            className="w-5 h-5 text-red-600 bg-blue-100 border-blue-300 rounded focus:ring-red-500 focus:ring-2"
          />
          <label htmlFor="isFeatured" className="ml-3 text-sm font-medium text-gray-700">
            Featured Product
          </label>
          <p className="ml-2 text-xs text-gray-500">
            (Check to display this product in the featured section)
          </p>
        </div>
      </div>
    </div>
  );

  const renderImagesAndSpecs = () => (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Product Images (Recommended: 800x800px, JPG/PNG, Max 2MB each)
        </label>
        <div className="grid grid-cols-5 gap-4">
          {product.images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              {image ? (
                <div className="relative w-full h-full group">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border-2 border-blue-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    Image {index + 1}
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-red-400 hover:bg-blue-50 transition-all">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500 text-center px-2">
                    Upload<br />Image {index + 1}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e.target.files[0])}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * First image will be used as the main product image
        </p>
      </div>

      {/* Specifications Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Product Specifications</label>
        <div className="space-y-3">
          {product.specifications.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Specification name (e.g., Switch Type)"
                value={spec.key}
                onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                className="w-1/3 px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
              />
              <input
                type="text"
                placeholder="Value (e.g., Cherry MX Red)"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                className="flex-1 px-4 py-3 text-gray-800 bg-blue-100 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-red-400"
              />
              <motion.button
                type="button"
                onClick={() => removeSpecField(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          ))}
        </div>
        <motion.button
          type="button"
          onClick={addSpecField}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center mt-4 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Specification
        </motion.button>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!product.title || !product.brand || !product.category || !product.price || !product.stock) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Find brand and category IDs
      const selectedBrand = brands.find(b => b.name === product.brand);
      const selectedMainCategory = mainCategories.find(c => c.name === product.category);
      const selectedSubCategory = subCategories.find(c => c.name === product.subcategory);
      
      if (!selectedBrand || !selectedMainCategory) {
        setError('Invalid brand or category selected');
        return;
      }

      // Add product data to FormData
      formData.append('name', product.title);
      formData.append('description', product.description);
      formData.append('brand_id', selectedBrand.id);
      formData.append('main_category_id', selectedMainCategory.id);
      if (selectedSubCategory) {
        formData.append('sub_category_id', selectedSubCategory.id);
      }
      formData.append('price', product.price);
      if (product.salePrice) {
        formData.append('sale_price', product.salePrice);
      }
      formData.append('cost_price', product.cost || 0);
      formData.append('stock_quantity', product.stock);
      formData.append('weight', product.weight || 0);
      
      // Add featured flag
      formData.append('is_featured', product.isFeatured ? 1 : 0);
      
      // Add specifications
      const specs = {};
      product.specifications.forEach(spec => {
        if (spec.key && spec.value) {
          specs[spec.key] = spec.value;
        }
      });
      formData.append('specifications', JSON.stringify(specs));

      // Add images (convert data URLs to files)
      const imageFiles = [];
      for (let i = 0; i < product.images.length; i++) {
        if (product.images[i]) {
          try {
            // Convert data URL to blob
            const response = await fetch(product.images[i]);
            const blob = await response.blob();
            const file = new File([blob], `image_${i + 1}.jpg`, { type: 'image/jpeg' });
            imageFiles.push(file);
          } catch (error) {
            console.error('Error converting image:', error);
          }
        }
      }
      
      // Add images to FormData
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      // Submit to API
      const data = await adminApi.postFormData('/products', formData);

      if (data.success) {
        setSuccess('Product created successfully!');
        // Reset form
        setProduct({
          title: '',
          description: '',
          brand: '',
          category: '',
          subcategory: '',
          price: '',
          salePrice: '',
          cost: '',
          stock: '',
          weight: '',
          color: '',
          isFeatured: false,
          specifications: [{ key: '', value: '' }],
          images: [null, null, null, null, null],
        });
        setActiveTab('details');
      } else {
        setError(data.message || 'Error creating product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Error creating product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-blue-50 rounded-2xl shadow-lg p-8"
    >
      {/* Tab Navigation */}
      <div className="flex border-b border-blue-200 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`px-6 py-3 text-lg font-medium transition-all ${
            activeTab === 'details'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Product Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('images')}
          className={`px-6 py-3 text-lg font-medium transition-all ${
            activeTab === 'images'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Images & Specifications
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {activeTab === 'details' && renderProductDetails()}
        {activeTab === 'images' && renderImagesAndSpecs()}

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="px-6 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Creating Product...' : 'Add Product'}
          </motion.button>
        </div>
      </form>
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </motion.div>
  );
};

export default AddProduct;