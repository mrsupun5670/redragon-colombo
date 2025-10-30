import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management utilities
const getToken = () => {
  // Check for admin token first (adminToken), then regular user token
  return localStorage.getItem('adminToken') || localStorage.getItem('token');
};
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => {
  localStorage.removeItem('token');
  // Don't remove adminToken - let AdminAuthContext handle that
};

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401) - but only for customer authentication
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAdminPath = currentPath.startsWith('/admin');
      const isAdminLoginPage = currentPath === '/admin/login';
      const isCustomerLoginPage = currentPath === '/login';
      
      // Only handle customer token removal, let AdminAuthContext handle admin tokens
      if (!isAdminPath) {
        // Only remove customer token, not adminToken
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Only redirect customer routes
        if (!isCustomerLoginPage) {
          window.location.href = '/login';
        }
      }
      // For admin paths, let AdminAuthContext handle the 401 errors
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Customer authentication
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Admin authentication
  adminLogin: (credentials) => api.post('/auth/admin/login', credentials),
  
  // Profile management
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
  
  // Password reset
  forgotPassword: (email) => api.post('/auth/forget-password', { email }),
  resetPassword: (resetData) => api.post('/auth/reset-password', resetData),
  
  // Common
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Product API functions
export const productAPI = {
  // Get featured products for homepage
  getFeatured: () => api.get('/products/featured'),
  
  // Get new arrival products for homepage
  getNewArrivals: () => api.get('/products/new-arrivals'),
  
  // Get Redragon products for homepage
  getRedragonProducts: () => api.get('/products/redragon'),
  
  // Get all products with pagination and filtering
  getAll: (params = {}) => api.get('/products', { params }),
  
  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),
};

// Category API functions
export const categoryAPI = {
  // Get all main categories
  getMainCategories: () => api.get('/categories/main'),
  
  // Get all sub categories
  getSubCategories: () => api.get('/categories/sub'),
  
  // Get sub categories by main category ID
  getSubCategoriesByMainCategory: (mainCategoryId) => api.get(`/categories/sub/main/${mainCategoryId}`),
};

// Brand API functions
export const brandAPI = {
  // Get all brands
  getAll: () => api.get('/brands'),
};

// Cart API functions
export const cartAPI = {
  // Get user's cart items
  getCart: () => api.get('/cart'),
  
  // Add item to cart
  addToCart: (data) => api.post('/cart', data),
  
  // Update cart item quantity
  updateCartItem: (data) => api.put('/cart', data),
  
  // Remove item from cart
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  
  // Clear entire cart
  clearCart: () => api.delete('/cart'),
  
  // Sync guest cart to user cart
  syncCart: (data) => api.post('/cart/sync', data),
  
  // Calculate shipping (public endpoint)
  calculateShipping: (data) => api.post('/cart/calculate-shipping', data),
};

// Location API functions
export const locationAPI = {
  // Get all provinces
  getProvinces: () => api.get('/locations/provinces'),
  
  // Get districts by province ID
  getDistrictsByProvince: (provinceId) => api.get(`/locations/districts/${provinceId}`),
  
  // Get all districts
  getAllDistricts: () => api.get('/locations/districts'),
  
  // Get cities by district ID
  getCitiesByDistrict: (districtId) => api.get(`/locations/cities/${districtId}`),
  
  // Get all cities
  getAllCities: () => api.get('/locations/cities'),
};

// Address API functions
export const addressAPI = {
  // Update default shipping address (creates new row)
  updateDefaultAddress: (addressData) => api.put('/addresses/default', addressData),
  
  // Get default shipping address (most recent)
  getDefaultAddress: () => api.get('/addresses/default'),
  
  // Get all customer addresses
  getAllAddresses: () => api.get('/addresses'),
  
  // Get customer's address history
  getAddressHistory: (limit = 10) => api.get(`/addresses/history?limit=${limit}`),
  
  // Delete address
  deleteAddress: (addressId) => api.delete(`/addresses/${addressId}`),
};

// User management utilities
export const userUtils = {
  setAuthData: (token, user) => {
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  clearAuthData: () => {
    removeToken(); // Only removes 'token', not 'adminToken'
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!getToken();
  },
  
  isAdmin: () => {
    const user = userUtils.getCurrentUser();
    return user && user.type === 'admin';
  }
};

// PayHere API functions
export const payhereAPI = {
  generateHash: (paymentData) => api.post('/payhere/generate-hash', paymentData),
};

// Order API functions
export const orderAPI = {
  // Create a new order
  createOrder: (orderData) => api.post('/orders', orderData),
  
  // Get user's orders
  getUserOrders: () => api.get('/orders'),
  
  // Get order by ID
  getOrderById: (id) => api.get(`/orders/${id}`),
};

// Wishlist API functions
export const wishlistAPI = {
  // Get customer's wishlist with items
  getWishlist: () => api.get('/wishlist'),
  
  // Get wishlist item count
  getWishlistCount: () => api.get('/wishlist/count'),
  
  // Check if product is in wishlist
  checkWishlistStatus: (productId) => api.get(`/wishlist/check/${productId}`),
  
  // Add item to wishlist
  addToWishlist: (productId) => api.post('/wishlist/add', { product_id: productId }),
  
  // Remove item from wishlist
  removeFromWishlist: (productId) => api.delete(`/wishlist/remove/${productId}`),
};

// Create public API instance for promo validation (like product fetching)
const publicPromoAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Promo API functions
export const promoAPI = {
  // Validate promo code (public endpoint like product fetching)
  validatePromoCode: (promoCode) => publicPromoAPI.post('/promo/validate', { promo_code: promoCode }),

  // Admin functions (require admin auth)
  getAllPromoCodes: () => api.get('/promo'),
  createPromoCode: (data) => api.post('/promo', data),
  updatePromoCode: (id, data) => api.put(`/promo/${id}`, data),
  deletePromoCode: (id) => api.delete(`/promo/${id}`),
};

// Review API functions
export const reviewAPI = {
  // Get reviews for a product
  getProductReviews: (productId) => api.get(`/reviews/product/${productId}`),

  // Create a review (requires authentication)
  createReview: (reviewData) => api.post('/reviews', reviewData),

  // Update a review
  updateReview: (reviewId, reviewData) => api.put(`/reviews/${reviewId}`, reviewData),

  // Delete a review
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

export default api;