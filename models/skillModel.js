const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    skills: {
        type: String,
        required: true
    },
    donerid: {
        type: String,
        required: true
    }
}, {
    timstamps: true
});

module.exports = mongoose.model('skill', skillSchema);