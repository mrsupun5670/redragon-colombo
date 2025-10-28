import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      navigate('/', { replace: true });
      return;
    }

    // Check if user came from login page or has valid forgot password session
    const validSources = ['/login'];
    const referrer = document.referrer;
    const hasForgotPasswordSession = sessionStorage.getItem('forgot_password_session');
    const hasValidState = location.state?.fromLogin;
    
    // Allow access if:
    // 1. User has a forgot password session (from previous step)
    // 2. User came from login page
    // 3. User has valid state indicating they came from login
    const hasValidAccess = hasForgotPasswordSession || 
                          hasValidState || 
                          validSources.some(source => referrer.includes(source));

    if (!hasValidAccess) {
      // Redirect to login page if no valid access
      navigate('/login', { replace: true });
    }

    // Set forgot password session when accessing this route validly
    if (hasValidAccess && !hasForgotPasswordSession) {
      sessionStorage.setItem('forgot_password_session', 'true');
    }

    // Clean up session after 30 minutes
    const cleanup = setTimeout(() => {
      sessionStorage.removeItem('forgot_password_session');
    }, 30 * 60 * 1000);

    return () => clearTimeout(cleanup);
  }, [navigate, location, user]);

  // If user is logged in, don't render the component
  if (user) {
    return null;
  }

  return children;
};

export default ForgotPasswordRoute;