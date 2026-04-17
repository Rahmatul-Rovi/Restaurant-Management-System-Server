// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { saveUser, getAllUsers, makeAdmin, deleteUser } = require('../controllers/userController');

router.post('/', saveUser);

router.get('/', getAllUsers);

router.patch('/admin/:id', makeAdmin);

router.delete('/:id', deleteUser);
module.exports = router;