const Blog = require('../models/blogModel');

// getBlog
// GET request
const getBlog = async (req, res) => {
    // get the username to filter result to users documents
    const author = req.user.username;

    try {
        //const data = await Blog.find({});
        const data = await Blog.find({"author": author});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// getBlogCount
// GET request for number of documents
const getBlogCount = async (req, res) => {
    try {
        const data = await Blog.countDocuments();

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};


// GET request for all blogs
const getBlogAll = async (req, res) => {
    // get all the blog documents

    try {
        const data = await Blog.find({});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// setBlog
// POST request
const setBlog = async (req, res) => {
    const {title, body} = req.body;
    const author = req.user.username;

    try {
        const data = await Blog.create({
            title: title,
            body: body,
            author: author,
            created: new Date().toJSON()
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(200).json({error: error.message});
    }
};

// deleteBLog
// DELETE request - delete by _id
const deleteBlog = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await Blog.deleteOne({_id: req.body._id});

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// editBLog
// PUT request - update by _id
const editBlog = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await Blog.updateOne({_id: req.body._id},
                        {
                            title: req.body.title,
                            body: req.body.body
                        });

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

module.exports = {
    getBlog, getBlogCount, getBlogAll, setBlog, deleteBlog, editBlog
};