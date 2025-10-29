const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController');
const { auth, adminAuth } = require('../middleware/auth');

// Public routes (no auth required for promo validation)
router.post('/validate', promoController.validatePromoCode);

// Admin routes
router.get('/', auth, adminAuth, promoController.getAllPromoCodes);
router.post('/', auth, adminAuth, promoController.createPromoCode);
router.put('/:id', auth, adminAuth, promoController.updatePromoCode);
router.delete('/:id', auth, adminAuth, promoController.deletePromoCode);

module.exports = router;