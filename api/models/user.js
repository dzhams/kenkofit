const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    verified: {
        type: Boolean,
        default: false
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    verificationToken: String,
    });

    const User = mongoose.model('User', userSchema);

    module.exports = User;