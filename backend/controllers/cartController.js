const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findByCustomerId(req.user.id);
    if (!cart) {
      cart = { id: await Cart.create(req.user.id) };
    }
    
    const items = await Cart.getCartItems(cart.id);
    console.log(items);
    
    
    const summary = {
      item_count: items.length,
      total_quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => {
        const price = parseFloat(item.sale_price || item.price) || 0;
        return sum + (price * item.quantity);
      }, 0),
      total_weight: items.reduce((sum, item) => {
        const weight = parseFloat(item.weight) || 1000; // Default 1kg
        return sum + (weight * item.quantity);
      }, 0)
    };
    
    summary.shipping = summary.subtotal >= 15000 ? 0 : 300;
    summary.total = summary.subtotal + summary.shipping;
    
    res.json({ 
      success: true,
      message: 'Cart retrieved successfully',
      data: { items, summary }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  try {
    // Validate input
    if (!product_id || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    // Get or create cart
    let cart = await Cart.findByCustomerId(req.user.id);
    if (!cart) {
      cart = { id: await Cart.create(req.user.id) };
    }

    // Check current quantity in cart
    const currentQuantity = await Cart.getCartItemCount(cart.id, product_id);
    const totalQuantity = currentQuantity + quantity;

    // Validate product and stock
    await Cart.validateProduct(product_id, totalQuantity);

    // Add to cart
    await Cart.addToCart(cart.id, product_id, quantity);
    
    // Return updated cart
    const items = await Cart.getCartItems(cart.id);
    res.status(201).json({ 
      success: true,
      message: 'Item added to cart', 
      data: { items }
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    if (error.message.includes('not found') || error.message.includes('not available') || error.message.includes('stock')) {
      return res.status(400).json({ 
        success: false,
        message: error.message 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.updateCartItem = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    // Validate input
    if (!product_id || quantity < 0) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    const cart = await Cart.findByCustomerId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // If quantity is 0, remove the item
    if (quantity === 0) {
      await Cart.removeFromCart(cart.id, product_id);
    } else {
      // Validate product and stock
      await Cart.validateProduct(product_id, quantity);
      await Cart.updateItemQuantity(cart.id, product_id, quantity);
    }

    // Return updated cart
    const items = await Cart.getCartItems(cart.id);
    res.json({ 
      success: true,
      message: 'Cart item updated', 
      data: { items }
    });
  } catch (error) {
    console.error('Update cart error:', error);
    if (error.message.includes('not found') || error.message.includes('not available') || error.message.includes('stock')) {
      return res.status(400).json({ 
        success: false,
        message: error.message 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findByCustomerId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    await Cart.removeFromCart(cart.id, productId);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findByCustomerId(req.user.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    await Cart.clearCart(cart.id);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.syncCart = async (req, res) => {
  const { cart_items } = req.body;
  try {
    let cart = await Cart.findByCustomerId(req.user.id);
    if (!cart) {
      cart = { id: await Cart.create(req.user.id) };
    }

    // Smart merge: if item exists in both guest and database cart, sum quantities
    for (const item of cart_items) {
      await Cart.addToCart(cart.id, item.id, item.quantity);
    }

    // Return the updated cart items
    const items = await Cart.getCartItems(cart.id);
    res.json({ 
      success: true,
      message: 'Cart synced successfully', 
      data: { items }
    });
  } catch (error) {
    console.error('Cart sync error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};