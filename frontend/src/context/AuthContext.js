import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI, userUtils } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if token exists in localStorage
        if (userUtils.isAuthenticated()) {
          const storedUser = userUtils.getCurrentUser();
          
          if (storedUser) {
            // Verify token with backend
            try {
              const res = await authAPI.getCurrentUser();
              if (res.data.success) {
                setUser(res.data.user);
              } else {
                // Token invalid, clear stored data
                userUtils.clearAuthData();
                setUser(null);
              }
            } catch (err) {
              // Token invalid or expired, clear stored data
              userUtils.clearAuthData();
              setUser(null);
            }
          } else {
            // No stored user but token exists, clear token
            userUtils.clearAuthData();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        userUtils.clearAuthData();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials, isAdmin = false) => {
    try {
      const response = isAdmin 
        ? await authAPI.adminLogin(credentials)
        : await authAPI.login(credentials);

      if (response.data.success) {
        const { token, user: userData } = response.data;
        
        // Store auth data
        userUtils.setAuthData(token, userData);
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);

      if (response.data.success) {
        const { token, user: newUser } = response.data;
        
        // Store auth data
        userUtils.setAuthData(token, newUser);
        setUser(newUser);
        
        return { success: true, user: newUser };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout API error:', err);
    } finally {
      // Always clear local data, even if API call fails
      userUtils.clearAuthData();
      setUser(null);
    }
  };

  // Helper functions
  const isAuthenticated = () => userUtils.isAuthenticated() && user;
  const isAdmin = () => userUtils.isAdmin();

  const value = {
    user,
    loading,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;