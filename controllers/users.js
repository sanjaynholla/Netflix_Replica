const User = require('../models/user');
const CryptoJS = require('crypto-js');

// Get All Users
const getAllUsers = async (req, res) => {
    const query = req.query.new;

    if(req.user.isAdmin){
        try {
            const Users = query ? await User.find().sort({_id: -1}).limit(10) : await User.find();
            res.status(200).json({data: Users});
        } catch (error) {
            res.status(500).json({msg: error})
        }
    } else {
        res.status(403).json({msg: `You are not allowed to access Users List!`})
    }
}


// Get User
const getUser = async (req, res) => {
    try{
        const users = await User.findById(req.params.id);
        const {password, ...info} = users._doc;
        res.status(200).json({data: info});
    } catch(error){
        console.log({msg: error})
    }
}

// Update User
const updateUser = async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT_SECRET_KEY).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json({msg: updatedUser});
        } catch (error) {
            res.status(500).json({msg: error})
        }
    } else {
        res.status(403).json({msg: `You can only update your account!`})
    }
}

// Delete User
const deleteUser = async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({msg: `User has been deleted!`});
        } catch (error) {
            res.status(500).json({msg: error})
        }
    } else {
        res.status(403).json({msg: `You can only Delete your account!`})
    }
}

// User Stats
const getUserStats = async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear()-1);
    const monthsArray = [
        "January",
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    try {
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month: "$createdAt"}
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                },
            },
        ]);
        res.status(200).json({msg: data})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = { 
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats
}