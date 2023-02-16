const Item = require('../models/itemModel');

// getItem
// GET request
const getItem = async (req, res) => {
    // get the username to filter result to users documents
    const donerid = req.user.username;

    //const data = await Item.find({});
    const data = await Item.find({"donerid": donerid});

    res.status(200).json(data);
};

// GET request for all Items
const getItemAll = async (req, res) => {
    // get all the Item documents

    const data = await Item.find({});

    res.status(200).json(data);
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

    // get result of attempt to delete the record with that username
    const result = await Item.deleteOne({_id: req.body._id});

    res.status(200).json(result);
};

// edit item
// PUT request to edit existing record by _id
const editItem = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    // get result of attempt to delete the record with that username
    const result = await Item.updateOne({_id: req.body._id},
                        {description: req.body.description});

    res.status(200).json(result);
};

module.exports = {
    getItem, getItemAll, setItem, deleteItem, editItem
};