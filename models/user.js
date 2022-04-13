const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    department: String,
    password: {
        type: String,
        required: true,
        minlength: 8,
        
    },
})


let userModel = mongoose.model('User', userSchema);


module.exports = {
    userModel,
}