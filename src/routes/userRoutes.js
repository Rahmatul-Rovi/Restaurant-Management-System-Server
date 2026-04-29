// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { saveUser, getAllUsers, makeAdmin, deleteUser, getUserByEmail, updateUserProfile } = require('../controllers/userController');

router.post('/', saveUser);

router.get('/', getAllUsers);

router.get('/:email', getUserByEmail)

router.patch('/admin/:id', makeAdmin);

router.delete('/:id', deleteUser);

router.patch('/update/:email', updateUserProfile);

module.exports = router;