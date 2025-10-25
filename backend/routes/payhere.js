const express = require('express');
const router = express.Router();
const payhereController = require('../controllers/payhereController');
const { auth } = require('../middleware/auth');

router.post('/generate-hash', auth, payhereController.generateHash);

router.post('/notify', payhereController.handleNotification);

module.exports = router;