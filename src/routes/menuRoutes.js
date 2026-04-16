const express = require('express');

const { 
    getMenu, 
    getPopularMenu, 
    getMenuByCategory, 
    searchMenu,
    deleteMenuItem,
    addMenuItem 
} = require('../controllers/menuController');

const menuRoutes = () => {

    const router = express.Router(); // ✅ ভিতরে নিতে হবে

    // ✅ Add Item
    router.post('/', addMenuItem);

    // ✅ Search আগে রাখতে হবে
    router.get('/search', searchMenu);

    // ✅ Popular route
    router.get('/popular', getPopularMenu);

    // ✅ All menu
    router.get('/', getMenu);

    // ✅ Delete
    router.delete('/:id', deleteMenuItem);

    // ⚠️ Dynamic route সবশেষে
    router.get('/:category', getMenuByCategory);

    return router;
};

module.exports = menuRoutes;