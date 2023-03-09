const Item = require('../models/itemModel');

// getItem
// GET request
const getItem = async (req, res) => {
    // get the username to filter result to users documents
    const donerid = req.user.username;

    try {
        //const data = await Item.find({});
        const data = await Item.find({"donerid": donerid});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// getItemCount
// GET request for number of documents
const getItemCount = async (req, res) => {
    try {
        const data = await Item.countDocuments();

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};


// GET request for all Items
const getItemAll = async (req, res) => {
    // get all the Item documents
    try {
        const data = await Item.find({});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// setItem
// POST request
const setItem = async (req, res) => {
    const {description} = req.body;
    const donerid = req.user.username;

    try {
        const data = await Item.create({
            description: description,
            donerid: donerid
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(200).json({error: error.message});
    }
};

// deleteItem
// DELETE request - delete by _id
const deleteItem = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await Item.deleteOne({_id: req.body._id});

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// edit item
// PUT request to edit existing record by _id
const editItem = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
    // get result of attempt to delete the record with that username
    const result = await Item.updateOne({_id: req.body._id},
                    {
                        description: req.body.description,
                        status: req.body.status
                    });

    res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

module.exports = {
    getItem, getItemCount, getItemAll, setItem, deleteItem, editItem
};