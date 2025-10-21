const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const { auth, adminAuth } = require('../middleware/auth');

// ========== DELIVERY ZONES ==========

// Public routes (for customers)
router.get('/zones', deliveryController.getDeliveryZones);
router.post('/calculate-delivery', deliveryController.calculateDeliveryCharge);

// Admin routes (CRUD operations)
router.get('/zones/admin', adminAuth, deliveryController.getAllDeliveryZones);
router.get('/zones/:id', adminAuth, deliveryController.getDeliveryZoneById);
router.post('/zones', adminAuth, deliveryController.createDeliveryZone);
router.put('/zones/:id', adminAuth, deliveryController.updateDeliveryZone);
router.delete('/zones/:id', adminAuth, deliveryController.deleteDeliveryZone);

// ========== PAYMENT METHODS ==========

// Public routes (for customers)
router.get('/payment-methods', deliveryController.getPaymentMethods);
router.post('/calculate-payment-fee', deliveryController.calculatePaymentFee);

// Admin routes
router.get('/payment-methods/admin', adminAuth, deliveryController.getAllPaymentMethods);
router.put('/payment-methods/:id', adminAuth, deliveryController.updatePaymentMethod);

// ========== ORDER TOTAL CALCULATION ==========

// Calculate complete order total (subtotal + delivery + payment fee)
router.post('/calculate-total', deliveryController.calculateOrderTotal);

module.exports = router;
