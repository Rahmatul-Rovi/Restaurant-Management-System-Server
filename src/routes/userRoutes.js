// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { saveUser, getAllUsers, makeAdmin, deleteUser, getUserByEmail, updateUserProfile } = require('../controllers/userController');

router.post('/', saveUser);

router.get('/', getAllUsers);



router.patch('/admin/:id', makeAdmin);

router.patch('/update/:email', updateUserProfile);

router.delete('/:id', deleteUser);



router.get('/:email', getUserByEmail)

module.exports = router;