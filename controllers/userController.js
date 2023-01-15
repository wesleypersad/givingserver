const User = require('../models/userModel');

// getUser
// GET request
const getUser = async (req, res) => {
    const data = await User.find({});
    //const data = await Data.find({"username": /substring/});

    res.status(200).json(data);
};

// setUser
// POST request
const setUser = async (req, res) => {
    if (!req.body) {
        res.status(400).json({message: 'Please add some JSON in body'});
        return;
    }

    const data = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    res.status(200).json(data);
};

// loginUser
// POST request
const loginUser = async (req, res) => {
    if (!req.body) {
        res.status(400).json({message: 'Please add some JSON in body'});
        return;
    }

    // see if the username exists
    const username = req.body.username;
    const data = await User.find({"username": `${username}`});

    if (data == null) {
        return res.status(400).send('Cannot find user');
    }

    try {
        //compare passwords
        if (req.body.password == data[0].password) {
            //res.send('Success');
            res.status(200).json(data); 
        } else {
            res.status(403).send('Not Allowed');
        }
        
    } catch {
        res.status(500).send();
    }
};

// deleteUser
// DELETE request
const deleteUser = async (req, res) => {
    if (!req.body.username) {
        res.status(400).json({message: 'Please add a JSON username in body'});
        return;
    }

    // get result of attempt to delete the record with that username
    const result = await User.deleteOne({username: req.body.username});

    res.status(200).json(result);
};

module.exports = {
    getUser, setUser, deleteUser, loginUser
};