const axios = require('axios');
const crypto = require('crypto');

const kokoPaymentController = {
  // Initialize Koko Payment
  initializePayment: async (req, res) => {
    try {
      const {
        order_number,
        amount,
        currency,
        customer_name,
        customer_email,
        customer_phone,
        shipping_info,
        items
      } = req.body;

      const merchant_id = process.env.KOKO_MERCHANT_ID;
      const merchant_secret = process.env.KOKO_SECRET_KEY;
      const koko_api_url = process.env.KOKO_API_URL || 'https://api.koko.lk';

      // Validate required environment variables
      if (!merchant_id || !merchant_secret) {
        return res.status(400).json({
          success: false,
          message: 'Koko Payment credentials not configured. Please contact support.'
        });
      }

      // Prepare Koko Payment payload
      const paymentPayload = {
        merchant_id: merchant_id,
        order_id: order_number,
        amount: parseFloat(amount).toFixed(2),
        currency: currency || 'LKR',
        customer: {
          name: customer_name,
          email: customer_email,
          phone: customer_phone
        },
        shipping_address: {
          address: shipping_info.addressLine1,
          city: shipping_info.city,
          country: shipping_info.country || 'Sri Lanka'
        },
        items: items.map(item => ({
          name: item.product_name,
          price: parseFloat(item.price).toFixed(2),
          quantity: item.quantity
        })),
        return_url: `${process.env.FRONTEND_URL}/payment/success`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        notify_url: `${req.protocol}://${req.get('host')}/api/koko-payment/notify`
      };

      // Generate signature for request
      const signature = generateKokoSignature(paymentPayload, merchant_secret);
      paymentPayload.signature = signature;

      // Call Koko API to initialize payment
      const kokoResponse = await axios.post(
        `${koko_api_url}/api/v1/checkout/initialize`,
        paymentPayload,
        {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${merchant_id}`
          }
        }
      );

      // Return payment session details to frontend
      res.json({
        success: true,
        data: {
          session_id: kokoResponse.data.session_id,
          payment_url: kokoResponse.data.payment_url,
          order_id: order_number,
          amount: amount
        }
      });

    } catch (error) {
      console.error('Koko Payment initialization error:', error.response?.data || error.message);

      // More detailed error handling
      let errorMessage = 'Failed to initialize Koko Payment';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Unable to connect to payment gateway. Please try again later.';
      }

      res.status(500).json({
        success: false,
        message: errorMessage
      });
    }
  },

  // Handle Koko Payment notification/webhook
  handleNotification: async (req, res) => {
    try {
      const {
        order_id,
        session_id,
        status,
        amount,
        signature
      } = req.body;

      const merchant_secret = process.env.KOKO_SECRET_KEY;

      // Verify signature
      const isValidSignature = verifyKokoSignature(req.body, merchant_secret, signature);

      if (!isValidSignature) {
        console.log('Invalid Koko Payment signature');
        return res.status(400).json({
          success: false,
          message: 'Invalid signature'
        });
      }

      // Handle payment status
      if (status === 'success' || status === 'completed') {
        // Payment successful - order is already created in checkout
        console.log(`Koko Payment successful for order: ${order_id}`);
        // Database update can be done if needed (e.g., update payment_status to 'paid')
        res.json({
          success: true,
          message: 'Payment notification received'
        });
      } else if (status === 'failed' || status === 'cancelled') {
        // Payment failed or cancelled
        console.log(`Koko Payment failed for order: ${order_id}, status: ${status}`);
        res.json({
          success: true,
          message: 'Payment notification received'
        });
      } else {
        // Pending or unknown status
        console.log(`Koko Payment status for order: ${order_id}: ${status}`);
        res.json({
          success: true,
          message: 'Payment notification received'
        });
      }
    } catch (error) {
      console.error('Koko Payment notification error:', error);
      res.status(500).json({
        success: false,
        message: 'Error processing notification'
      });
    }
  },

  // Verify payment status
  verifyPayment: async (req, res) => {
    try {
      const { order_id, session_id } = req.body;

      const merchant_id = process.env.KOKO_MERCHANT_ID;
      const merchant_secret = process.env.KOKO_SECRET_KEY;
      const koko_api_url = process.env.KOKO_API_URL || 'https://api.koko.lk';

      if (!merchant_id || !merchant_secret) {
        return res.status(400).json({
          success: false,
          message: 'Koko Payment credentials not configured'
        });
      }

      // Call Koko API to verify payment
      const verifyResponse = await axios.get(
        `${koko_api_url}/api/v1/checkout/${session_id}/status`,
        {
          timeout: 10000,
          headers: {
            'Authorization': `Bearer ${merchant_id}`
          }
        }
      );

      const paymentStatus = verifyResponse.data.status;

      res.json({
        success: true,
        data: {
          order_id,
          session_id,
          payment_status: paymentStatus,
          is_paid: paymentStatus === 'success' || paymentStatus === 'completed'
        }
      });

    } catch (error) {
      console.error('Koko Payment verification error:', error.response?.data || error.message);
      res.status(500).json({
        success: false,
        message: 'Failed to verify payment status'
      });
    }
  }
};

// Helper function to generate Koko signature
function generateKokoSignature(payload, secret) {
  // Create signature string from payload (order by keys)
  const signableFields = ['merchant_id', 'order_id', 'amount', 'currency'];
  const signatureString = signableFields
    .map(field => `${field}=${payload[field]}`)
    .join('|');

  const fullString = `${signatureString}|${secret}`;
  return crypto.createHash('sha256').update(fullString).digest('hex');
}

// Helper function to verify Koko signature
function verifyKokoSignature(payload, secret, providedSignature) {
  const signableFields = ['order_id', 'amount', 'status'];
  const signatureString = signableFields
    .map(field => `${field}=${payload[field]}`)
    .join('|');

  const fullString = `${signatureString}|${secret}`;
  const calculatedSignature = crypto.createHash('sha256').update(fullString).digest('hex');

  return calculatedSignature === providedSignature;
}

module.exports = kokoPaymentController;
