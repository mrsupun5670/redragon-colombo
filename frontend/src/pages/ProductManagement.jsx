import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import ProductList from '../components/features/admin/products/ProductList';
import AddProduct from '../components/features/admin/products/AddProduct';
import CategoriesTab from '../components/features/admin/products/CategoriesTab';
import BrandsTab from '../components/features/admin/products/BrandsTab';

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [activeProductsTab, setActiveProductsTab] = useState('list');

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Product Management</h1>
        <div className="flex border-b border-blue-200">
          <button
            className={`px-6 py-3 text-lg font-medium ${activeTab === 'products' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium ${activeTab === 'categories' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium ${activeTab === 'brands' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('brands')}
          >
            Brands
          </button>
        </div>
        <div className="py-8">
          {activeTab === 'products' && (
            <div>
              <div className="flex border-b border-blue-200">
                <button
                  className={`px-4 py-2 text-md font-medium ${activeProductsTab === 'list' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
                  onClick={() => setActiveProductsTab('list')}
                >
                  Product List
                </button>
                <button
                  className={`px-4 py-2 text-md font-medium ${activeProductsTab === 'add' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
                  onClick={() => setActiveProductsTab('add')}
                >
                  Add Product
                </button>
              </div>
              <div className="py-4">
                {activeProductsTab === 'list' && <ProductList />}
                {activeProductsTab === 'add' && <AddProduct />}
              </div>
            </div>
          )}
          {activeTab === 'categories' && <CategoriesTab />}
          {activeTab === 'brands' && <BrandsTab />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;
