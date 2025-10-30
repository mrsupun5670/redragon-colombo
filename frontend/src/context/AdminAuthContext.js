import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if admin is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('adminToken');
      
      if (storedToken) {
        try {
          const response = await fetch('http://localhost:5001/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          });

          const data = await response.json();
          
          if (response.ok && data.success && data.user && data.user.type === 'admin') {
            setAdmin(data.user);
            setToken(storedToken);
            setError(null);
          } else {
            // Invalid token or not an admin
            localStorage.removeItem('adminToken');
            localStorage.removeItem('user'); // Also remove user data
            setAdmin(null);
            setToken(null);
            setError(data.message || 'Authentication failed');
          }
        } catch (error) {
          console.error('Error checking admin auth:', error);
          localStorage.removeItem('adminToken');
          localStorage.removeItem('user'); // Also remove user data
          setAdmin(null);
          setToken(null);
          setError('An error occurred during authentication.');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Also store user data for userUtils.isAdmin()
        setToken(data.token);
        setAdmin(data.user);
        setError(null);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user'); // Also remove user data
    setAdmin(null);
    setToken(null);
    setError(null);
  };

  const value = {
    admin,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
    error
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};