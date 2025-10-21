// Utility functions for making authenticated admin API calls

const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

const getAuthHeaders = () => {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Wrapper for fetch with admin authentication
export const adminFetch = async (url, options = {}) => {
  const headers = {
    ...getAuthHeaders(),
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
  
  delete: (url) => adminFetch(url, {
    method: 'DELETE'
  })
};