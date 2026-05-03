const express = require('express');
const router = express.Router();
const { initiatePayment, saveOrderData } = require('../controllers/paymentController');

// ১. পেমেন্ট ইন্টেন্ট তৈরি করা (Stripe Client Secret পাওয়ার জন্য)
router.post('/order', initiatePayment);

// ২. পেমেন্ট সাকসেস হওয়ার পর নাম, ঠিকানা ও ট্রানজেকশন আইডি সেভ করা
router.post('/save-order', saveOrderData);

module.exports = router;