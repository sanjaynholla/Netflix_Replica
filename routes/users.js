const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, getUser, getAllUsers, getUserStats} = require('../controllers/users');
const verifyToken = require('../middleware/verifyToken');

//Update User
router.route('/:id').put(verifyToken, updateUser);

//Delete User
router.route('/:id').delete(verifyToken, deleteUser);

//Get User
router.route('/find/:id').get(getUser);

// Get All Users
router.route('/').get(verifyToken, getAllUsers);

// Get User Stats
router.route('/stats').get(getUserStats);

module.exports = router