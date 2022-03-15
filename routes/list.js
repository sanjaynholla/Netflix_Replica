const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { createList, deleteList, getAllList } = require('../controllers/list')

// Create List
router.route('/').post(verifyToken,createList);

// Delete List
router.route('/:id').delete(verifyToken, deleteList);

// Get All List
router.route('/').get(verifyToken, getAllList);


module.exports = router;