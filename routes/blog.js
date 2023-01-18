const express = require('express');
//const { SecondaryAuthTokenContext } = require('twilio/lib/rest/accounts/v1/secondaryAuthToken');

//bring in the middleware for user authenication
const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getBlog, setBlog, deleteBlog } = require('../controllers/blogController');

// require auth for all routes i.e. valid suer has to be logged in
router.use(requireAuth);

// for the blogs data
router.get('/', getBlog);
router.post('/', setBlog);
router.delete('/', deleteBlog);

module.exports = router;