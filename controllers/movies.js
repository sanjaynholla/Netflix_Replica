const Movie = require('../models/movie');

// Create Movie
const createMovie = async (req, res) => {
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();
            res.status(201).json({data: savedMovie});
        } catch (error) {
            res.status(500).json({msg: error});
        }
    } else{
        res.status(403).json({msg: `You are not allowed to create movie`});
    }
}

// Update Movie
const updateMovie = async (req, res) => {
    if(req.user.isAdmin){
        try {
            const updatedMovie = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json({data: updatedMovie});
        } catch (error) {
            res.status(500).json({msg: error})
        }
    } else {
        res.status(403).json({msg: `You are not allowed to update movie`});
    }
}

// Delete Movie
const deleteMovie = async (req, res) => {
    if(req.user.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({msg: `Movie has been deleted!`});
        } catch (error) {
            res.status(500).json({msg: error})
        }
    } else {
        res.status(403).json({msg: `You are not allowed to delete movie`});
    }
}

// Get All Movie
const getAllMovie = async (req, res) => {
    if(req.user.isAdmin){
        try {
            const movies = await Movie.find();
            res.status(200).json({data: movies.reverse()});
        } catch (error) {
            res.status(500).json({msg: error})
        }
    } else {
        res.status(403).json({msg: `You are not allowed to access Movies List!`})
    }
}


// Get Movie
const getMovie = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({data: movie});
    } catch(error){
        console.log({msg: error})
    }
}

// Get Random Movie / Series
const getRandomMovie = async (req, res) => {
    const type = req.query.type;
    let movie;
    try{
        if(type === 'series'){
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ]);
        }
        res.status(200).json({data: movie});
    } catch(error){
        console.log({msg: error})
    }
}

module.exports = { 
    createMovie,
    updateMovie,
    deleteMovie,
    getMovie,
    getAllMovie,
    getRandomMovie
}