const jwt = require('jsonwebtoken');
//const { UserBindingContext } = require('twilio/lib/rest/chat/v2/service/user/userBinding');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {

    // verify authenication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    };

    // split to get token in form 'Bearer 1234.5678.8901'
    const token = authorization.split(' ')[1];

    // try to veryify the token
    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        // attach user property to req object
        req.user = await User.findOne({ _id }).select('_id');
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    };
}

module.exports = requireAuth;