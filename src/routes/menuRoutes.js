const express = require('express');
const router = express.Router();
const { getMenu, getPopularMenu } = require('../controllers/menuController');

const menuRoutes = (db) => {
    const menuCollection = db.collection("menu");

    router.get('/', (req, res) => getMenu(req, res, menuCollection));

    router.get('/popular', (req, res) => getPopularMenu(req, res, menuCollection));

    return router;
};

module.exports = menuRoutes;