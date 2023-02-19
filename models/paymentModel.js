const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    charity: {
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

module.exports = mongoose.model('Payment', paymentSchema);