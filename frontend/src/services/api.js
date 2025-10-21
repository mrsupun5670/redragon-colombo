import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management utilities
const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

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
    // Handle unauthorized errors (401)
    if (error.response?.status === 401) {
      // Token expired or invalid - remove token and redirect to login
      removeToken();
      localStorage.removeItem('user');
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login' && window.location.pathname !== '/admin/login') {
        window.location.href = '/login';
      }
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
  
  // Get all products with pagination
  getAll: (params = {}) => api.get('/products', { params }),
  
  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),
};

// User management utilities
export const userUtils = {
  setAuthData: (token, user) => {
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  clearAuthData: () => {
    removeToken();
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

export default api;