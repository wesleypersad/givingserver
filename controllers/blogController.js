const Blog = require('../models/blogModel');

// getBlog
// GET request
const getBlog = async (req, res) => {
    const data = await Blog.find({});
    //const data = await Data.find({"username": /substring/});

    res.status(200).json(data);
};

// setBlog
// POST request
const setBlog = async (req, res) => {
    if (!req.body) {
        res.status(400).json({message: 'Please add some JSON in body'});
        return;
    }

    const data = await Blog.create({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    });

    res.status(200).json(data);
};

// deleteBLog
// DELETE request
const deleteBlog = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({message: 'Please add a JSON title in body'});
        return;
    }

    // get result of attempt to delete the record with that username
    const result = await Blog.deleteOne({title: req.body.title});

    res.status(200).json(result);
};

module.exports = {
    getBlog, setBlog, deleteBlog
};