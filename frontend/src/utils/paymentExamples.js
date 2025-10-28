// Example implementations for payment flow
// Add these to your checkout/payment processing components

import { navigateToPaymentSuccess, navigateToPaymentCancel, clearPaymentSession } from './routeProtection';

/**
 * Example: Handle successful payment
 * Call this when payment is confirmed successful
 */
export const handlePaymentSuccess = (navigate, orderData) => {
  // Example order data
  const exampleOrderData = {
    orderId: orderData.orderId || 'ORD-12345',
    amount: orderData.amount || 29999,
    transactionId: orderData.transactionId || 'TXN-67890',
    paymentMethod: orderData.paymentMethod || 'Credit Card'
  };

  // Navigate to success page with protection
  navigateToPaymentSuccess(navigate, exampleOrderData);
};

/**
 * Example: Handle payment cancellation
 * Call this when payment is cancelled or fails
 */
export const handlePaymentCancel = (navigate, orderData) => {
  // Example order data
  const exampleOrderData = {
    orderId: orderData.orderId || 'ORD-12345',
    reason: orderData.reason || 'Payment cancelled by user'
  };

  // Navigate to cancel page with protection
  navigateToPaymentCancel(navigate, exampleOrderData);
};

/**
 * Example: Process payment and redirect
 * This is how you would integrate with your payment processing
 */
export const processPayment = async (navigate, paymentData) => {
  try {
    // Your payment processing logic here
    const response = await fetch('/api/payment/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });

    const result = await response.json();

    if (result.success) {
      handlePaymentSuccess(navigate, result.data);
    } else {
      handlePaymentCancel(navigate, { reason: result.message });
    }
  } catch (error) {
    handlePaymentCancel(navigate, { reason: 'Payment processing failed' });
  }
};

/**
 * Example: PayHere integration
 * This is how you would integrate with PayHere payment gateway
 */
export const initializePayHere = (navigate, orderData) => {
  // PayHere configuration
  const payment = {
    sandbox: true, // Set to false for live
    merchant_id: "YOUR_MERCHANT_ID",
    return_url: undefined, // We'll handle this with our protected routes
    cancel_url: undefined, // We'll handle this with our protected routes
    notify_url: "YOUR_NOTIFY_URL",
    order_id: orderData.orderId,
    items: orderData.items,
    amount: orderData.amount,
    currency: "LKR",
    hash: orderData.hash, // Generate hash on backend
    first_name: orderData.firstName,
    last_name: orderData.lastName,
    email: orderData.email,
    phone: orderData.phone,
    address: orderData.address,
    city: orderData.city,
    country: "Sri Lanka",
  };

  // PayHere callbacks
  payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    handlePaymentSuccess(navigate, { orderId, ...orderData });
  };

  payhere.onDismissed = function onDismissed() {
    console.log("Payment dismissed");
    handlePaymentCancel(navigate, { reason: "Payment dismissed by user" });
  };

  payhere.onError = function onError(error) {
    console.log("Error:" + error);
    handlePaymentCancel(navigate, { reason: "Payment error: " + error });
  };

  // Start payment
  payhere.startPayment(payment);
};

/**
 * Example: Cleanup after payment completion
 * Call this on payment success/cancel pages when user navigates away
 */
export const cleanupPaymentSession = () => {
  clearPaymentSession();
};