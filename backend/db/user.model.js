const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    Email:{
        type: String,
    unique: true,
    required: true 
    },
    Password:{
        type: String,
    required: true
    }
})


const User = new mongoose.model('User', userSchema);

module.exports =  User;
