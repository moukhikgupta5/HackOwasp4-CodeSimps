const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rno: {
        type: String,
        required: true
    },
    phno: {
        type: String,
        required: true
    },
    roomno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isRequest: {
        type: Boolean,
        default: false
    },
    // isCleaned: {
    //     type: Boolean,
    //     default: false
    // },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;