const mongoose =  require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true, 'Unique Username is Required!'],
            unique: true
        },
        email:{
            type: String,
            required: [true, 'Unique Email is Required'],
            unique: true
        },
        password:{
            type: String,
            required: [true, 'Password is Required']
        },
        profilePic:{
            type: String,
            default: ''
        },
        isAdmin:{
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User',UserSchema);