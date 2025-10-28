import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user came from checkout or has valid payment session
    const validSources = [
      '/checkout',
      '/cart'
    ];

    const referrer = document.referrer;
    const hasValidSession = sessionStorage.getItem('payment_session');
    const hasValidState = location.state?.fromCheckout;
    
    // Allow access if:
    // 1. User has a valid payment session
    // 2. User came from checkout (state)
    // 3. User navigated from checkout/cart page
    const hasValidAccess = hasValidSession || 
                          hasValidState || 
                          validSources.some(source => referrer.includes(source));

    if (!hasValidAccess) {
      // Clear any payment session and redirect to home
      sessionStorage.removeItem('payment_session');
      navigate('/', { replace: true });
    }

    // Clean up payment session after 5 minutes
    const cleanup = setTimeout(() => {
      sessionStorage.removeItem('payment_session');
    }, 5 * 60 * 1000);

    return () => clearTimeout(cleanup);
  }, [navigate, location]);

  return children;
};

export default PaymentRoute;