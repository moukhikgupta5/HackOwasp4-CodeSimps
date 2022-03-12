const mongoose = require('mongoose');

const SweeperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phno: {
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
    date: {
        type: Date,
        default: Date.now
    }
})

const Sweeper = mongoose.model('Sweeper', SweeperSchema);

module.exports = Sweeper;