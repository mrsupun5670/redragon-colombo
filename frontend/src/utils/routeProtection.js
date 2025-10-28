// Utility functions for protected route management

/**
 * Set payment session when initiating payment process
 * Call this before redirecting to payment pages
 */
export const setPaymentSession = (orderData = {}) => {
  const paymentSession = {
    timestamp: Date.now(),
    orderId: orderData.orderId,
    amount: orderData.amount,
    ...orderData
  };
  sessionStorage.setItem('payment_session', JSON.stringify(paymentSession));
};

/**
 * Clear payment session
 * Call this after payment is completed or cancelled
 */
export const clearPaymentSession = () => {
  sessionStorage.removeItem('payment_session');
};

/**
 * Check if payment session is valid
 */
export const hasValidPaymentSession = () => {
  const session = sessionStorage.getItem('payment_session');
  if (!session) return false;
  
  try {
    const data = JSON.parse(session);
    const age = Date.now() - data.timestamp;
    const maxAge = 30 * 60 * 1000; // 30 minutes
    
    return age < maxAge;
  } catch {
    return false;
  }
};

/**
 * Navigate to payment success page
 * Use this instead of direct navigation
 */
export const navigateToPaymentSuccess = (navigate, orderData = {}) => {
  setPaymentSession(orderData);
  navigate('/payment/success', { 
    state: { 
      fromCheckout: true,
      ...orderData 
    } 
  });
};

/**
 * Navigate to payment cancel page
 * Use this instead of direct navigation
 */
export const navigateToPaymentCancel = (navigate, orderData = {}) => {
  setPaymentSession(orderData);
  navigate('/payment/cancel', { 
    state: { 
      fromCheckout: true,
      ...orderData 
    } 
  });
};

/**
 * Set forgot password session
 * Call this before redirecting to forgot password page
 */
export const setForgotPasswordSession = () => {
  sessionStorage.setItem('forgot_password_session', 'true');
};

/**
 * Clear forgot password session
 */
export const clearForgotPasswordSession = () => {
  sessionStorage.removeItem('forgot_password_session');
};

/**
 * Navigate to forgot password page safely
 */
export const navigateToForgotPassword = (navigate) => {
  setForgotPasswordSession();
  navigate('/forgot-password', { state: { fromLogin: true } });
};