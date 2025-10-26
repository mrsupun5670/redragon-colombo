const db = require('../config/db');
const { auth } = require('../middleware/auth');

const orderController = {
  // Create a new order
  createOrder: async (req, res) => {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const {
        order_number,
        subtotal,
        shipping_fee,
        payment_fee,
        total,
        payment_method,
        shipping_info,
        items
      } = req.body;
      
      const customer_id = req.user.id;
      
      // Get payment method ID
      const [paymentMethods] = await connection.query(
        'SELECT id FROM payment_methods WHERE slug = ?',
        [payment_method]
      );
      
      if (paymentMethods.length === 0) {
        throw new Error('Invalid payment method');
      }
      
      const payment_method_id = paymentMethods[0].id;
      
      // Insert order
      const [orderResult] = await connection.query(
        `INSERT INTO orders (
          order_number, customer_id, subtotal, shipping_fee, discount, total, 
          payment_method_id, payment_status, order_status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', NOW(), NOW())`,
        [
          order_number,
          customer_id,
          subtotal,
          shipping_fee,
          payment_fee, // Using payment_fee as discount field for now
          total,
          payment_method_id
        ]
      );
      
      const order_id = orderResult.insertId;
      
      // Insert order items
      for (const item of items) {
        await connection.query(
          `INSERT INTO order_items (
            order_id, product_id, product_name, product_image, 
            price, quantity, subtotal, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
          [
            order_id,
            item.product_id,
            item.product_name,
            item.product_image,
            item.price,
            item.quantity,
            item.subtotal
          ]
        );
      }
      
      // Save shipping address
      if (shipping_info) {
        await connection.query(
          `INSERT INTO shipping_addresses (
            order_id, customers_customer_id, phone,
            address_line1, address_line2, city_name, district_name, 
            province_name, postal_code, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
          [
            order_id,
            customer_id,
            shipping_info.phone,
            shipping_info.addressLine1,
            shipping_info.addressLine2,
            shipping_info.city,
            shipping_info.district,
            shipping_info.province,
            shipping_info.postalCode
          ]
        );
      }
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Order created successfully',
        data: {
          order_id,
          order_number
        }
      });
      
    } catch (error) {
      await connection.rollback();
      console.error('Error creating order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      });
    } finally {
      connection.release();
    }
  },

  // Get user's orders
  getUserOrders: async (req, res) => {
    try {
      const customer_id = req.user.id;
      console.log('req.user object:', req.user);
      console.log('Fetching orders for customer_id:', customer_id);
      
      const [orders] = await db.query(
        `SELECT 
          o.id, o.order_number, o.subtotal, o.shipping_fee, o.discount,
          o.total, o.payment_status, o.order_status, o.created_at,
          pm.name as payment_method
        FROM orders o
        LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
        WHERE o.customer_id = ?
        ORDER BY o.created_at DESC`,
        [customer_id]
      );
      
      console.log('Found orders:', orders.length);
      console.log('Orders data:', orders);
      
      // Get order items for each order
      for (let order of orders) {
        const [items] = await db.query(
          `SELECT product_id, product_name, product_image, price, quantity, subtotal
          FROM order_items WHERE order_id = ?`,
          [order.id]
        );
        order.items = items;
        console.log(`Order ${order.id} has ${items.length} items`);
      }
      
      res.json({
        success: true,
        data: orders
      });
      
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders'
      });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const customer_id = req.user.id;
      
      const [orders] = await db.query(
        `SELECT 
          o.*, pm.name as payment_method
        FROM orders o
        LEFT JOIN payment_methods pm ON o.payment_method_id = pm.id
        WHERE o.id = ? AND o.customer_id = ?`,
        [id, customer_id]
      );
      
      if (orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
      
      const order = orders[0];
      
      // Get order items
      const [items] = await db.query(
        `SELECT * FROM order_items WHERE order_id = ?`,
        [id]
      );
      
      order.items = items;
      
      res.json({
        success: true,
        data: order
      });
      
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order'
      });
    }
  }
};

module.exports = orderController;