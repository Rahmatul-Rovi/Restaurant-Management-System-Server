const express = require('express');
const router = express.Router();
// ✅ সব function import করো
const { initiatePayment, saveOrderData, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/paymentController');

const paymentRoutes = (app, db) => {
    app.post('/api/order', initiatePayment);
    app.post('/api/save-order', (req, res) => saveOrderData(req, res, db));
    app.get('/api/user-orders', (req, res) => getUserOrders(req, res, db));
    app.get('/api/admin/all-orders', (req, res) => getAllOrders(req, res, db));
    app.patch('/api/admin/order-status/:id', (req, res) => updateOrderStatus(req, res, db));
};

module.exports = paymentRoutes;