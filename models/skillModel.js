const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    skills: {
        type: String,
        required: true
    },
    donerid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'donated'
    }
}, {
    timstamps: true
});

module.exports = mongoose.model('skill', skillSchema);