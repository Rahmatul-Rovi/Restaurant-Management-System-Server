const express = require('express');
const router = express.Router();
const { initiatePayment, saveOrderData, getUserOrders } = require('../controllers/paymentController');

const paymentRoutes = (app, db) => {
    app.post('/api/order', initiatePayment);
    app.post('/api/save-order', (req, res) => saveOrderData(req, res, db));
    app.get('/api/user-orders', (req, res) => getUserOrders(req, res, db));
};

module.exports = paymentRoutes;