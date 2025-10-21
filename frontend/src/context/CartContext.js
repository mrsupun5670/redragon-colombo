import React, { createContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart subtotal
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);
  }, [cartItems]);

  // Calculate total weight (in kg)
  const totalWeight = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const weight = parseFloat(item.weight) || 1.0; // Default to 1kg if not specified
      const quantity = parseInt(item.quantity) || 0;
      return sum + (weight * quantity);
    }, 0);
  }, [cartItems]);

  // Get cart item count
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        totalWeight,
        cartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;