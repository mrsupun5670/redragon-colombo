import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { userUtils, cartAPI } from '../services/api';

const CartContext = createContext();

// Guest cart local storage key
const GUEST_CART_KEY = 'guest_cart';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return userUtils.isAuthenticated();
  }, []);

  // Check if user is admin
  const isAdmin = useCallback(() => {
    return userUtils.isAdmin();
  }, []);

  // Save guest cart to localStorage
  const saveGuestCart = useCallback((items) => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  }, []);

  // Load guest cart from localStorage
  const loadGuestCart = useCallback(() => {
    try {
      const storedCart = localStorage.getItem(GUEST_CART_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error loading guest cart:', error);
      return [];
    }
  }, []);

  // Clear guest cart from localStorage
  const clearGuestCart = useCallback(() => {
    try {
      localStorage.removeItem(GUEST_CART_KEY);
    } catch (error) {
      console.error('Error clearing guest cart:', error);
    }
  }, []);

  // Load cart from database (authenticated users - not admins)
  const loadDatabaseCart = useCallback(async () => {
    if (!isAuthenticated() || isAdmin()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.getCart();
      setCartItems(response.data.data?.items || response.data.items || []);
    } catch (err) {
      console.error('Error loading database cart:', err);
      setError('Failed to load cart');
      // Fallback to guest cart on error
      const guestItems = loadGuestCart();
      setCartItems(guestItems);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, loadGuestCart]);

  // Add item to cart
  const addToCart = useCallback(async (product, quantity = 1) => {
    try {
      setError(null);

      if (isAuthenticated() && !isAdmin()) {
        // Add to database cart (only for customers, not admins)
        const response = await cartAPI.addToCart({ product_id: product.id, quantity });
        
        // Update cart items from response if available
        if (response.data.data?.items || response.data.items) {
          setCartItems(response.data.data?.items || response.data.items);
        } else {
          await loadDatabaseCart();
        }
      } else {
        // Guest user - update localStorage
        setCartItems((prevItems) => {
          const itemInCart = prevItems.find((item) => item.id === product.id);
          let newItems;
          
          if (itemInCart) {
            newItems = prevItems.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            );
          } else {
            newItems = [...prevItems, { ...product, quantity }];
          }
          
          saveGuestCart(newItems);
          return newItems;
        });
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      const errorMessage = err.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      throw new Error(errorMessage); // Re-throw so components can handle specific errors
    }
  }, [isAuthenticated, saveGuestCart, loadDatabaseCart]);

  // Remove item from cart
  const removeFromCart = useCallback(async (productId) => {
    try {
      setError(null);
      
      if (isAuthenticated()) {
       
        // Remove from database cart
        await cartAPI.removeFromCart(productId);
        await loadDatabaseCart();
      } else {
        // Guest user - update localStorage
        setCartItems((prevItems) => {
          const newItems = prevItems.filter((item) => item.id !== productId);
          saveGuestCart(newItems);
          return newItems;
        });
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Failed to remove item from cart');
    }
  }, [isAuthenticated, saveGuestCart, loadDatabaseCart]);

  // Update item quantity
  const updateQuantity = useCallback(async (productId, quantity) => {
    try {
      setError(null);
      
      if (quantity <= 0) {
        return removeFromCart(productId);
      }
      
      if (isAuthenticated()) {
        // Update database cart
        const response = await cartAPI.updateCartItem({ product_id: productId, quantity });
        
        // Update cart items from response if available
        if (response.data.data?.items || response.data.items) {
          setCartItems(response.data.data?.items || response.data.items);
        } else {
          await loadDatabaseCart();
        }
      } else {
        // Guest user - update localStorage
        setCartItems((prevItems) => {
          const newItems = prevItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          saveGuestCart(newItems);
          return newItems;
        });
      }
    } catch (err) {
      console.error('Error updating cart quantity:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update item quantity';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [isAuthenticated, removeFromCart, saveGuestCart, loadDatabaseCart]);

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      setError(null);
      
      if (isAuthenticated()) {
       
        // Clear database cart
        await cartAPI.clearCart();
      }
      
      // Clear local state and localStorage
      setCartItems([]);
      clearGuestCart();
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart');
    }
  }, [isAuthenticated, clearGuestCart]);

  // Sync cart on user authentication status change
  const syncCart = useCallback(async () => {
    if (isAuthenticated() && !isAdmin()) {
      // Customer user logged in - sync guest cart to database (skip for admins)
      const guestItems = loadGuestCart();
      if (guestItems.length > 0) {
        try {
          // Sync with backend
          const response = await cartAPI.syncCart({ cart_items: guestItems });
          
          // Update cart items from response if available
          if (response.data.data?.items || response.data.items) {
            setCartItems(response.data.data?.items || response.data.items);
          } else {
            await loadDatabaseCart();
          }
          
          clearGuestCart(); // Clear guest cart after successful sync
        } catch (err) {
          console.error('Error syncing cart:', err);
          const errorMessage = err.response?.data?.message || 'Failed to sync cart';
          setError(errorMessage);
          // Keep guest items in state if sync fails
          setCartItems(guestItems);
        }
      } else {
        // No guest items, load database cart
        await loadDatabaseCart();
      }
    } else {
      // User logged out - load guest cart
      const guestItems = loadGuestCart();
      setCartItems(guestItems);
    }
  }, [isAuthenticated, loadGuestCart, loadDatabaseCart, clearGuestCart]);

  // Load cart on component mount and auth status change
  useEffect(() => {
    const initCart = async () => {
      if (isAuthenticated() && !isAdmin()) {
        // Load database cart for customers only
        await loadDatabaseCart();
      } else {
        // Guest users and admins use guest cart
        const guestItems = loadGuestCart();
        setCartItems(guestItems);
      }
    };

    initCart();
  }, [isAuthenticated, isAdmin, loadDatabaseCart, loadGuestCart]);

  // Calculate cart subtotal (using sale price if available)
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.sale_price || item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);
  }, [cartItems]);

  // Calculate total weight (in kg)
  const totalWeight = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const weight = parseFloat(item.weight) || 1000; // Default to 1000g if not specified
      const quantity = parseInt(item.quantity) || 0;
      return sum + ((weight / 1000) * quantity); // Convert grams to kg
    }, 0);
  }, [cartItems]);

  // Calculate shipping using the same logic as backend
  const calculateShipping = useCallback((subtotal, weightInKg) => {
    // Free shipping for orders over Rs. 15,000
    if (subtotal >= 15000) {
      return 0;
    }
    
    // Weight-based shipping calculation
    const baseShipping = 300;
    const weightThreshold = 1; // 1kg
    const additionalPerKg = 50;
    
    if (weightInKg <= weightThreshold) {
      return baseShipping;
    }
    
    const additionalWeight = weightInKg - weightThreshold;
    const additionalCost = Math.ceil(additionalWeight) * additionalPerKg;
    
    return baseShipping + additionalCost;
  }, []);

  // Calculate shipping cost
  const shippingCost = useMemo(() => {
    return calculateShipping(cartSubtotal, totalWeight);
  }, [cartSubtotal, totalWeight, calculateShipping]);

  // Calculate total (subtotal + shipping)
  const cartTotal = useMemo(() => {
    return cartSubtotal + shippingCost;
  }, [cartSubtotal, shippingCost]);

  // Get cart item count
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
  }, [cartItems]);

  // Check if eligible for free shipping
  const isFreeShippingEligible = useMemo(() => {
    return cartSubtotal >= 15000;
  }, [cartSubtotal]);

  // Amount needed for free shipping
  const amountForFreeShipping = useMemo(() => {
    return Math.max(0, 15000 - cartSubtotal);
  }, [cartSubtotal]);

  return (
    <CartContext.Provider
      value={{
        // Cart state
        cartItems,
        loading,
        error,
        
        // Cart actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCart,
        
        // Cart calculations
        cartSubtotal,
        shippingCost,
        cartTotal,
        totalWeight,
        cartItemCount,
        
        // Shipping info
        isFreeShippingEligible,
        amountForFreeShipping,
        freeShippingThreshold: 15000,
        
        // Utility functions
        calculateShipping,
        isAuthenticated
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;