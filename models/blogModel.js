const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: String,
    author: {
        type: String,
        required: true
    },
    link: String,
    image: String
}, {
    timstamps: true
});

module.exports = mongoose.model('Blog', blogSchema);