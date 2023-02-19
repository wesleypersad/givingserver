const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    description: {
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

module.exports = mongoose.model('item', itemSchema);