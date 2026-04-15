// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { saveUser, getAllUsers, makeAdmin } = require('../controllers/userController');

router.post('/', saveUser);

router.get('/', getAllUsers);

router.patch('/admin/:id', makeAdmin);
module.exports = router;