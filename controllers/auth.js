const User = require('../models/user');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT_SECRET_KEY).toString()
    });

    try {
        const user = await newUser.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
    
    // if(user){
    //     return res.status(200).json(user);
    // }
    // else{
    //     return res.status(400).json({err: "Something Went wrong!!!"})
    // }
}

// LOGIN

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({msg: `User Doesn't Exist!`});
        }

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPT_SECRET_KEY);
        const decryptpassword = bytes.toString(CryptoJS.enc.Utf8);

        const {password, ...info} = user._doc;

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: "5d"}
        );

        if(req.body.password === decryptpassword){
            return res.status(200).json({msg: `Logged in as ${user.username}`, data: {...info, accessToken}});
        } else {
            return res.status(404).json({msg: `Wrong user credentials! Try Again!`});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { registerUser, loginUser }