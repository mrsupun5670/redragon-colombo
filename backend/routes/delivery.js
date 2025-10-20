const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const { protect, adminOnly } = require('../middleware/auth');

// ========== DELIVERY ZONES ==========

// Public routes (for customers)
router.get('/zones', deliveryController.getDeliveryZones);
router.post('/calculate-delivery', deliveryController.calculateDeliveryCharge);

// Admin routes (CRUD operations)
router.get('/zones/admin', protect, adminOnly, deliveryController.getAllDeliveryZones);
router.get('/zones/:id', protect, adminOnly, deliveryController.getDeliveryZoneById);
router.post('/zones', protect, adminOnly, deliveryController.createDeliveryZone);
router.put('/zones/:id', protect, adminOnly, deliveryController.updateDeliveryZone);
router.delete('/zones/:id', protect, adminOnly, deliveryController.deleteDeliveryZone);

// ========== PAYMENT METHODS ==========

// Public routes (for customers)
router.get('/payment-methods', deliveryController.getPaymentMethods);
router.post('/calculate-payment-fee', deliveryController.calculatePaymentFee);

// Admin routes
router.get('/payment-methods/admin', protect, adminOnly, deliveryController.getAllPaymentMethods);
router.put('/payment-methods/:id', protect, adminOnly, deliveryController.updatePaymentMethod);

// ========== ORDER TOTAL CALCULATION ==========

// Calculate complete order total (subtotal + delivery + payment fee)
router.post('/calculate-total', deliveryController.calculateOrderTotal);

module.exports = router;
