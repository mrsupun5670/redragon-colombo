import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Filter, X, Plus, Trash2, Upload, Search } from 'lucide-react';
import { adminApi } from '../../../../utils/adminApi';
import ErrorPopup from '../../../common/ErrorPopup';
import SuccessPopup from '../../../common/SuccessPopup';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brandNames, setBrandNames] = useState(['all']);
  const [mainCategoryNames, setMainCategoryNames] = useState(['all']);
  const [subCategoryNames, setSubCategoryNames] = useState(['all']);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    stockStatus: 'all',
    status: 'all',
    priceSort: 'none',
    brand: 'all',
    category: 'all',
    subcategory: 'all'
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch products, brands, and categories in parallel using authenticated API calls
      const [productsData, brandsData, mainCategoriesData, subCategoriesData] = await Promise.all([
        adminApi.get('/products'),
        adminApi.get('/brands'),
        adminApi.get('/categories/main'),
        adminApi.get('/categories/sub')
      ]);

      if (productsData.success) {
        setAllProducts(productsData.data);
        setProducts(productsData.data);
      }

      if (brandsData.success) {
        setBrands(brandsData.data);
        setBrandNames(['all', ...brandsData.data.map(b => b.name)]);
      }

      if (mainCategoriesData.success) {
        setMainCategories(mainCategoriesData.data);
        setMainCategoryNames(['all', ...mainCategoriesData.data.map(c => c.name)]);
      }

      if (subCategoriesData.success) {
        setSubCategories(subCategoriesData.data);
        setSubCategoryNames(['all', ...subCategoriesData.data.map(c => c.name)]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = async (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      brand_name: product.brand_name,
      main_category_name: product.main_category_name,
      sub_category_name: product.sub_category_name,
      price: product.price,
      sale_price: product.sale_price,
      cost_price: product.cost_price,
      stock_quantity: product.stock_quantity,
      shipping_fee: product.shipping_fee || 0,
      is_active: product.is_active
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setActiveTab('details');

    // Fetch existing product images
    try {
      const imagesData = await adminApi.get(`/products/${product.id}/images`);
      
      if (imagesData.success && imagesData.data) {
        const existingImageData = imagesData.data;
        const existingPreviews = [];
        
        // Fill up to 5 image slots with existing images
        for (let i = 0; i < 5; i++) {
          if (existingImageData[i]) {
            existingPreviews[i] = existingImageData[i].image_path;
          } else {
            existingPreviews[i] = null;
          }
        }
        
        setImagePreviews(existingPreviews);
      }
    } catch (error) {
      console.error('Error fetching product images:', error);
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageSelect = (index, file) => {
    if (file) {
      const newSelectedImages = [...selectedImages];
      const newImagePreviews = [...imagePreviews];
      
      newSelectedImages[index] = file;
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        newImagePreviews[index] = e.target.result;
        setImagePreviews([...newImagePreviews]);
      };
      reader.readAsDataURL(file);
      
      setSelectedImages(newSelectedImages);
    }
  };

  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    const newImagePreviews = [...imagePreviews];
    
    // Clear the image at this index
    newSelectedImages[index] = null;
    newImagePreviews[index] = null;
    
    setSelectedImages(newSelectedImages);
    setImagePreviews(newImagePreviews);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      // Basic validation
      if (!editFormData.name || !editFormData.price || !editFormData.stock_quantity) {
        setError('Please fill in required fields');
        return;
      }

      // Find brand and category IDs from names
      const selectedBrand = brands.find(b => b.name === editFormData.brand_name);
      const selectedMainCategory = mainCategories.find(c => c.name === editFormData.main_category_name);
      const selectedSubCategory = subCategories.find(c => c.name === editFormData.sub_category_name);

      // Prepare data for API
      const updateData = {
        name: editFormData.name,
        description: editFormData.description,
        price: parseFloat(editFormData.price),
        sale_price: editFormData.sale_price ? parseFloat(editFormData.sale_price) : null,
        cost_price: parseFloat(editFormData.cost_price) || 0,
        stock_quantity: parseInt(editFormData.stock_quantity),
        shipping_fee: parseFloat(editFormData.shipping_fee) || 0,
        is_active: editFormData.is_active
      };

      // Add brand and category IDs if selected
      if (selectedBrand) {
        updateData.brand_id = selectedBrand.id;
      }
      if (selectedMainCategory) {
        updateData.main_category_id = selectedMainCategory.id;
      }
      if (selectedSubCategory) {
        updateData.sub_category_id = selectedSubCategory.id;
      }

      // First update the product details
      const data = await adminApi.put(`/products/${editingProduct.id}`, updateData);

      if (data.success) {
        // If there are images to upload, handle them separately
        if (selectedImages.some(img => img !== null && img !== undefined)) {
          try {
            const formData = new FormData();
            selectedImages.forEach((image) => {
              if (image) {
                formData.append('images', image);
              }
            });

            const imageData = await adminApi.putFormData(
              `/products/${editingProduct.id}/images`,
              formData
            );
            if (!imageData.success) {
              console.warn('Image upload failed:', imageData.message);
            }
          } catch (imageError) {
            console.error('Error uploading images:', imageError);
          }
        }

        setSuccess('Product updated successfully!');
        setEditingProduct(null);
        setEditFormData({});
        setSelectedImages([]);
        setImagePreviews([]);
        fetchData(); // Refresh the list
      } else {
        setError(data.message || 'Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Error updating product. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...allProducts];

    // Filter by search query (ID or name)
    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.id.toString().includes(searchQuery) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by stock status
    if (filters.stockStatus === 'inStock') {
      filtered = filtered.filter(p => p.stock_quantity > 0);
    } else if (filters.stockStatus === 'outOfStock') {
      filtered = filtered.filter(p => p.stock_quantity === 0);
    }

    // Filter by status
    if (filters.status !== 'all') {
      const statusValue = filters.status === 'Active' ? 1 : 0;
      filtered = filtered.filter(p => p.is_active === statusValue);
    }

    // Filter by brand
    if (filters.brand !== 'all') {
      filtered = filtered.filter(p => p.brand_name === filters.brand);
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.main_category_name === filters.category);
    }

    // Filter by subcategory
    if (filters.subcategory !== 'all') {
      filtered = filtered.filter(p => p.sub_category_name === filters.subcategory);
    }

    // Sort by price
    if (filters.priceSort === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.priceSort === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setProducts(filtered);
  }, [allProducts, filters, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      stockStatus: 'all',
      status: 'all',
      priceSort: 'none',
      brand: 'all',
      category: 'all',
      subcategory: 'all'
    });
    setProducts(allProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
      {/* Filter Bar */}
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center mb-4 gap-3 md:gap-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-700">Product List ({products.length})</h3>

          {/* Search Bar */}
          <div className="flex-1 lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base text-gray-800 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={resetFilters}
              className="flex-1 lg:flex-initial px-3 md:px-4 py-2 text-xs md:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
            >
              <X className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 lg:flex-initial px-3 md:px-4 py-2 text-xs md:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              <Filter className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
              {showFilters ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 p-3 md:p-4 bg-blue-100 rounded-lg"
          >
            {/* Stock Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Stock Status</label>
              <select
                value={filters.stockStatus}
                onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
              >
                <option value="all">All</option>
                <option value="inStock">In Stock</option>
                <option value="outOfStock">Out of Stock</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
              >
                <option value="all">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Price Sort */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
              <select
                value={filters.priceSort}
                onChange={(e) => setFilters({ ...filters, priceSort: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
              >
                <option value="none">Default</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
              >
                {brandNames.map(brand => (
                  <option key={brand} value={brand}>{brand === 'all' ? 'All Brands' : brand}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
              >
                {mainCategoryNames.map(category => (
                  <option key={category} value={category}>{category === 'all' ? 'All Categories' : category}</option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Subcategory</label>
              <select
                value={filters.subcategory}
                onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-400"
              >
                {subCategoryNames.map(subcategory => (
                  <option key={subcategory} value={subcategory}>{subcategory === 'all' ? 'All Subcategories' : subcategory}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="p-2 md:p-3 text-xs md:text-sm">ID</th>
                <th className="p-2 md:p-3 text-xs md:text-sm">Name</th>
                <th className="p-2 md:p-3 text-xs md:text-sm hidden lg:table-cell">Cost</th>
                <th className="p-2 md:p-3 text-xs md:text-sm">Price</th>
                <th className="p-2 md:p-3 text-xs md:text-sm hidden xl:table-cell">Date</th>
                <th className="p-2 md:p-3 text-xs md:text-sm">Stock</th>
                <th className="p-2 md:p-3 text-xs md:text-sm hidden sm:table-cell">Sold</th>
                <th className="p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">Status</th>
                <th className="p-2 md:p-3 text-xs md:text-sm">Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-blue-200 hover:bg-blue-100"
                >
                  <td className="p-2 md:p-3 text-xs md:text-sm">#{product.id}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm font-medium max-w-[150px] md:max-w-none truncate">{product.name}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm hidden lg:table-cell">Rs. {product.cost_price ? parseFloat(product.cost_price).toFixed(2) : '0.00'}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm font-semibold whitespace-nowrap">Rs. {parseFloat(product.price).toFixed(2)}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm hidden xl:table-cell whitespace-nowrap">{new Date(product.created_at).toLocaleDateString()}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm">
                    <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      product.stock_quantity === 0
                        ? 'bg-red-100 text-red-800'
                        : product.stock_quantity < 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock_quantity}
                    </span>
                  </td>
                  <td className="p-2 md:p-3 text-xs md:text-sm hidden sm:table-cell">{product.sold_count || 0}</td>
                  <td className="p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">
                    <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      product.is_active === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.is_active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-2 md:p-3">
                    <motion.button
                      onClick={() => handleEditClick(product)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 md:p-2 rounded-lg bg-blue-100 text-blue-500 hover:bg-blue-200"
                    >
                      <Edit className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {editingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setEditingProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Edit Product</h2>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-4 md:mb-8 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-medium transition-all whitespace-nowrap ${
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
                  className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === 'images'
                      ? 'text-red-500 border-b-2 border-red-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Images & Specs
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleEditSubmit}>
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    {/* Product Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                      <input
                        type="text"
                        value={editFormData.name || ''}
                        onChange={(e) => handleEditFormChange('name', e.target.value)}
                        placeholder="Enter product name"
                        className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={editFormData.description || ''}
                        onChange={(e) => handleEditFormChange('description', e.target.value)}
                        placeholder="Enter product description"
                        rows="4"
                        className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                      />
                    </div>

                    {/* Brand and Category Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                        <select
                          value={editFormData.brand_name || ''}
                          onChange={(e) => handleEditFormChange('brand_name', e.target.value)}
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
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
                          value={editFormData.main_category_name || ''}
                          onChange={(e) => handleEditFormChange('main_category_name', e.target.value)}
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                        >
                          <option value="">Select Category</option>
                          {mainCategories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Sub-category and Color Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sub-category</label>
                        <select
                          value={editFormData.sub_category_name || ''}
                          onChange={(e) => handleEditFormChange('sub_category_name', e.target.value)}
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                        >
                          <option value="">Select Sub-category</option>
                          {subCategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.name}>{subcategory.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={editFormData.is_active === 1 ? 'Active' : 'Inactive'}
                          onChange={(e) => handleEditFormChange('is_active', e.target.value === 'Active' ? 1 : 0)}
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    {/* Quantity and Cost Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                        <input
                          type="number"
                          value={editFormData.stock_quantity || ''}
                          onChange={(e) => handleEditFormChange('stock_quantity', e.target.value)}
                          placeholder="0"
                          min="0"
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cost (Rs.) *</label>
                        <input
                          type="number"
                          value={editFormData.cost_price || ''}
                          onChange={(e) => handleEditFormChange('cost_price', e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                    </div>

                    {/* Price and Sale Price Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price (Rs.) *</label>
                        <input
                          type="number"
                          value={editFormData.price || ''}
                          onChange={(e) => handleEditFormChange('price', e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price (Rs.)</label>
                        <input
                          type="number"
                          value={editFormData.sale_price || ''}
                          onChange={(e) => handleEditFormChange('sale_price', e.target.value)}
                          placeholder="Leave empty for no sale"
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'images' && (
                  <div className="space-y-6">
                    {/* Image Upload Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Product Images (Recommended: 800x800px, JPG/PNG, Max 2MB each)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <div key={index} className="relative aspect-square">
                            {imagePreviews[index] ? (
                              <div className="relative w-full h-full">
                                <img
                                  src={imagePreviews[index]}
                                  alt={`Product ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 hover:bg-gray-50 transition-all">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-xs text-gray-500 text-center px-2">
                                  Upload<br />Image {index + 1}
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      handleImageSelect(index, file);
                                    }
                                  }}
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
                        <div className="flex items-center space-x-3">
                          <input
                            type="text"
                            placeholder="Specification name (e.g., Switch Type)"
                            className="w-1/3 px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g., Cherry MX Red)"
                            className="flex-1 px-4 py-3 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-400"
                          />
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center mt-4 px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Specification
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end mt-8 space-x-4 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isUpdating}
                    whileHover={{ scale: isUpdating ? 1 : 1.02 }}
                    whileTap={{ scale: isUpdating ? 1 : 0.98 }}
                    className="px-6 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default ProductList;