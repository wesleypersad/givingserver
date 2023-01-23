const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }, 
    allDay: Boolean,
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timstamps: true
});

module.exports = mongoose.model('Event', eventSchema);