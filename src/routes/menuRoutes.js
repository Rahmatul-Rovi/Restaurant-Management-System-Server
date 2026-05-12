const express = require('express');

const { 
    getMenu, 
    getPopularMenu, 
    getMenuByCategory, 
    searchMenu,
    deleteMenuItem,
    addMenuItem, 
    updateMenuItem
} = require('../controllers/menuController');

const menuRoutes = () => {

    const router = express.Router();

    // Add Item
    router.post('/', addMenuItem);

    // Search first the search 
    router.get('/search', searchMenu);

    // Popular route
    router.get('/popular', getPopularMenu);

    // All menu
    router.get('/', getMenu);

    // Delete
    router.delete('/:id', deleteMenuItem);

    router.patch('/:id', updateMenuItem);

    // Lastly Dynamic route 
    router.get('/:category', getMenuByCategory);

    return router;
};

module.exports = menuRoutes;