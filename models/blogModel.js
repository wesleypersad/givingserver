const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String
}, {
    timstamps: true
});

module.exports = mongoose.model('Blog', blogSchema);