import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ConditionalRoute = ({ 
  children, 
  condition, 
  redirectTo = '/', 
  sessionKey,
  allowedSources = [],
  timeoutMinutes = 10
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let hasValidAccess = false;

    // Check session storage condition
    if (sessionKey) {
      const sessionData = sessionStorage.getItem(sessionKey);
      hasValidAccess = sessionData !== null;
    }

    // Check custom condition
    if (condition !== undefined) {
      hasValidAccess = hasValidAccess || condition;
    }

    // Check if user came from allowed sources
    if (allowedSources.length > 0) {
      const referrer = document.referrer;
      const hasValidSource = allowedSources.some(source => 
        referrer.includes(source) || location.state?.from?.includes(source)
      );
      hasValidAccess = hasValidAccess || hasValidSource;
    }

    // Check location state
    if (location.state?.allowAccess) {
      hasValidAccess = true;
    }

    // If no valid access, redirect
    if (!hasValidAccess) {
      if (sessionKey) {
        sessionStorage.removeItem(sessionKey);
      }
      navigate(redirectTo, { replace: true });
      return;
    }

    // Set up cleanup timer if sessionKey is provided
    if (sessionKey && timeoutMinutes > 0) {
      const cleanup = setTimeout(() => {
        sessionStorage.removeItem(sessionKey);
      }, timeoutMinutes * 60 * 1000);

      return () => clearTimeout(cleanup);
    }
  }, [navigate, location, condition, redirectTo, sessionKey, allowedSources, timeoutMinutes]);

  return children;
};

export default ConditionalRoute;