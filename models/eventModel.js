const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: String, 
    allDay: Boolean,
    start: Date,
    end: Date
}, {
    timstamps: true
});

module.exports = mongoose.model('Event', eventSchema);