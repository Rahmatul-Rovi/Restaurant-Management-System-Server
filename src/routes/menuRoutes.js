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

    //Add new Item
    router.post('/', (req,res)=>  addMenuItem(req,res, menuCollection));

    // for search route
    router.get('/search', (req, res) => searchMenu(req, res, menuCollection));

    // All Menu
    router.get('/', (req, res) => getMenu(req, res, menuCollection));

    // Popular / Biryani Menu
    router.get('/popular', (req, res) => getPopularMenu(req, res, menuCollection));
    

    // Dynamic Category
    router.get('/:category', (req, res) => getMenuByCategory(req, res, menuCollection));

    router.delete('/:id', (req, res)=> deleteMenuItem(req,res, menuCollection));

    return router;
};

module.exports = menuRoutes;