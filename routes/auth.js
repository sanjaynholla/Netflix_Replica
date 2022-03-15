const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/auth');

// Register
router.route('/register').post(registerUser);

// Login
router.route('/login').post(loginUser);

module.exports = router