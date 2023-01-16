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
    const {title, body, author} = req.body;

    try {
        const data = await Blog.create({
            title: title,
            body: body,
            author: author
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(200).json({error: error.message});
    }
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