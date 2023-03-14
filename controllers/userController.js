const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'});
};

// getUser
// GET request
const getUser = async (req, res) => {
    try {
        const data = await User.find({});
        //const data = await Data.find({"username": /substring/});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};

// getUserCount
// GET request for number of documents
const getUserCount = async (req, res) => {
    try {
        const data = await User.countDocuments();

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};

// GET request for all Users
const getUserAll = async (req, res) => {
    // get all the User documents
    try {
        const data = await User.find({});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// getUserUsername
// GET request for User document with a specific username
const getUserUsername = async (req, res) => {
    // get the username parameter
    const username = req.params.username;

    try {
        const data = await User.find({'username': `${username}`});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};

// setUser and also used for /user/signup
// POST request
const setUser = async (req, res) => {
    const {username, password, email, mobile, role} = req.body;

    try {
        const user = await User.signup(username, password, email, mobile, role);

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

        // return the role to the front end
        const role = user.role;

        // return username & token
        res.status(200).json({username, token, role});
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
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await User.deleteOne({_id: req.body._id});

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});
    };
};

const editUser = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await User.updateOne({_id: req.body._id},
                        {
                            username: req.body.username,
                            password: req.body.password,
                            email: req.body.email,
                            mobile: req.body.mobile,
                            role: req.body.role
                        });

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});
    };
};

module.exports = {
    getUser, getUserCount, getUserAll, getUserUsername, setUser, deleteUser, loginUser, editUser
};