const List = require('../models/list')

// Create List
const createList = async (req, res) => {
    if(req.user.isAdmin){
        try {
            const list = await List.create(req.body);
            res.status(201).json({data: list});
        } catch (error) {
            res.status(500).json({msg: error});
        }
    } else {
        res.status(403).json({msg: `You are not allowed to create List`});
    }
}

// Delete List
const deleteList = async (req, res) => {
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json({msg: `The List is Deleted!`});
        } catch (error) {
            res.status(500).json({msg: error});
        }
    } else {
        res.status(403).json({msg: `You are not allowed to Delete List`});
    }
}

// Get All List
const getAllList = async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    { $match: { type: typeQuery, genre: genreQuery } },
                    { $sample: { size: 10 } },
                ]);
            } else {
                list = await List.aggregate([
                    { $match: { type: typeQuery } },
                    { $sample: { size: 10 } },
                ]);
            }
        } else {
            list = await List.aggregate([ { $sample: { size: 10 } } ] );
        }
        res.status(200).json({data: list});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

module.exports = {
    createList,
    deleteList,
    getAllList
}