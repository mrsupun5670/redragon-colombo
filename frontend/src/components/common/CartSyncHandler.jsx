import { useEffect, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import CartContext from '../../context/CartContext';

const CartSyncHandler = () => {
  const { isAuthenticated } = useAuth();
  const { syncCart } = useContext(CartContext);

  useEffect(() => {
    // Sync cart whenever authentication status changes
    syncCart();
  }, [isAuthenticated, syncCart]);

  // This component doesn't render anything
  return null;
};

export default CartSyncHandler;