const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'});
};

// getUser
// GET request
const getUser = async (req, res) => {
    const data = await User.find({});
    //const data = await Data.find({"username": /substring/});

    res.status(200).json(data);
};

// setUser and also used for /user/signup
// POST request
const setUser = async (req, res) => {
    const {username, password, email} = req.body;

    try {
        const user = await User.signup(username, password, email);

        // create a token
        const token = createToken(user._id);

        // return usename & token
        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// loginUser
// POST request
const loginUser = async (req, res) => {
    const {username, password, email} = req.body;

    try {
        const user = await User.login(username, password);

        // create a token
        const token = createToken(user._id);

        // return username & token
        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// deleteUser
// DELETE request - delete by _id
const deleteUser = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        return;
    }

    // get result of attempt to delete the record with that username
    const result = await User.deleteOne({_id: req.body._id});

    res.status(200).json(result);
};

module.exports = {
    getUser, setUser, deleteUser, loginUser
};