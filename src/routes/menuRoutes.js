const express = require('express');
const router = express.Router();
const { 
    getMenu, 
    getPopularMenu, 
    getMenuByCategory, 
    searchMenu 
} = require('../controllers/menuController');

const menuRoutes = (db) => {
    const menuCollection = db.collection("menu");

    // for search route
    router.get('/search', (req, res) => searchMenu(req, res, menuCollection));

    // All Menu
    router.get('/', (req, res) => getMenu(req, res, menuCollection));

    // Popular / Biryani Menu
    router.get('/popular', (req, res) => getPopularMenu(req, res, menuCollection));

    // Dynamic Category
    router.get('/:category', (req, res) => getMenuByCategory(req, res, menuCollection));

    return router;
};

module.exports = menuRoutes;