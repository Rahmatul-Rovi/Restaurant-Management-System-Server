const express = require('express');
const router = express.Router();
const { initiatePayment, paymentSuccess } = require('../controllers/paymentController');

// এখন এই initiatePayment ফাংশনটি খুঁজে পাবে
router.post('/order', initiatePayment);

// Stripe এর জন্য এটা আপাতত না রাখলেও চলে, তাও থাকলো এরর এড়াতে
router.post('/payment/success/:tranId', paymentSuccess);

module.exports = router;