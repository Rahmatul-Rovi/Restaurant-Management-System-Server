const express = require('express');
const router = express.Router();
const { initiatePayment, paymentSuccess } = require('../controllers/paymentController');

// পেমেন্ট শুরু করার জন্য POST রুট
router.post('/order', initiatePayment);

// পেমেন্ট সাকসেস হলে SSLCommerz এখানে ডাটা পাঠাবে
router.post('/payment/success/:tranId', paymentSuccess);

module.exports = router;