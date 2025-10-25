const crypto = require('crypto');

const payhereController = {
  // Generate PayHere payment hash
  generateHash: (req, res) => {
    try {
      const {
        order_id,
        amount,
        currency,
        first_name,
        last_name,
        email,
        phone,
        address,
        city,
        country
      } = req.body;

      const merchant_id = process.env.PAYHERE_MERCHANT_ID;
      const merchant_secret = process.env.PAYHERE_SECRET;

      // PayHere hash generation format (updated 2023-01-16)
      const formatted_amount = parseFloat(amount).toFixed(2);
      const merchant_secret_hash = crypto.createHash('md5').update(merchant_secret).digest('hex');
      const hash_string = merchant_id + order_id + formatted_amount + currency + merchant_secret_hash;
      
      // Generate MD5 hash
      const hash = crypto.createHash('md5').update(hash_string).digest('hex').toUpperCase();

      res.json({
        success: true,
        data: {
          merchant_id,
          order_id,
          amount: formatted_amount,
          currency,
          hash,
          first_name,
          last_name,
          email,
          phone,
          address,
          city,
          country,
          return_url: `${process.env.FRONTEND_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
          notify_url: `${req.protocol}://${req.get('host')}/api/payhere/notify`
        }
      });
    } catch (error) {
      console.error('PayHere hash generation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate payment hash'
      });
    }
  },

  // Handle PayHere payment notification
  handleNotification: (req, res) => {
    try {
      const {
        merchant_id,
        order_id,
        payhere_amount,
        payhere_currency,
        status_code,
        md5sig
      } = req.body;

      const merchant_secret = process.env.PAYHERE_SECRET;
      
      // Verify the signature (updated format)
      const merchant_secret_hash = crypto.createHash('md5').update(merchant_secret).digest('hex');
      const local_md5sig = crypto
        .createHash('md5')
        .update(merchant_id + order_id + payhere_amount + payhere_currency + status_code + merchant_secret_hash)
        .digest('hex')
        .toUpperCase();

      if (local_md5sig === md5sig) {
        // Signature is valid
        if (status_code == 2) {
          // Payment success
          console.log(`Payment successful for order: ${order_id}`);
          // TODO: Update order status in database
        } else {
          // Payment failed or cancelled
          console.log(`Payment failed for order: ${order_id}, status: ${status_code}`);
        }
        
        res.status(200).send('OK');
      } else {
        console.log('Invalid signature in PayHere notification');
        res.status(400).send('Invalid signature');
      }
    } catch (error) {
      console.error('PayHere notification error:', error);
      res.status(500).send('Error processing notification');
    }
  }
};

module.exports = payhereController;