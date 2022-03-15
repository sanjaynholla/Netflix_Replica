const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { createMovie, updateMovie, deleteMovie, getMovie, getAllMovie, getRandomMovie} = require('../controllers/movies')

// Create Movie
router.route('/').post(verifyToken, createMovie);

// Update Movie
router.route('/:id').put(verifyToken, updateMovie);

// Delete Movie
router.route('/:id').delete(verifyToken, deleteMovie);

// Get Movie
router.route('/find/:id').get(getMovie);

// Get All Movie
router.route('/').get(verifyToken, getAllMovie);

// Get Random Movie / Series
router.route('/random').get(getRandomMovie);

module.exports = router;