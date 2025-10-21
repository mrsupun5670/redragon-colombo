// Utility functions for making authenticated admin API calls

const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

const getAuthHeaders = (isFormData = false) => {
  const token = getAdminToken();
  const headers = {};
  
  // Don't set Content-Type for FormData, let browser set it with boundary
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Wrapper for fetch with admin authentication
export const adminFetch = async (url, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...getAuthHeaders(isFormData),
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  // If unauthorized, redirect to admin login
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    throw new Error('Authentication required');
  }

  return response;
};

// Helper methods for common admin API operations
export const adminApi = {
  get: (url) => adminFetch(url),
  
  post: (url, data) => adminFetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  put: (url, data) => adminFetch(url, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  putFormData: (url, formData) => adminFetch(url, {
    method: 'PUT',
    body: formData
  }),
  
  postFormData: (url, formData) => adminFetch(url, {
    method: 'POST',
    body: formData
  }),
  
  delete: (url) => adminFetch(url, {
    method: 'DELETE'
  })
};