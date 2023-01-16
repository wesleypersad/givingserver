const express = require('express');
const { SecondaryAuthTokenContext } = require('twilio/lib/rest/accounts/v1/secondaryAuthToken');
const router = express.Router();

//bring in controllers for CRUD operations
const { getBlog, setBlog, deleteBlog } = require('../controllers/blogController');
const { getEvent, setEvent, deleteEvent } = require('../controllers/eventController');
const { getUser, setUser, deleteUser, loginUser } = require('../controllers/userController');

// just for the mongo branch
router.get('/', (req, res, next) => { 
    res.send('MONGO GENERAL PATH !!!');
})

// for the blogs data
router.get('/blog', getBlog);
router.post('/blog', setBlog);
router.delete('/blog', deleteBlog);

// for the events data
router.get('/event', getEvent);
router.post('/event', setEvent);
router.delete('/event', deleteEvent);

// for the users
router.get('/user', getUser);
router.post('/user', setUser);
router.post('/user/signup', setUser); // same as above
router.post('/user/login', loginUser);
router.delete('/user', deleteUser);

module.exports = router;