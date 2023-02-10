const express = require('express');

//bring in the middleware for user authenication
const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getEvent, getEventAll,setEvent, deleteEvent } = require('../controllers/eventController');

// require auth for all routes i.e. valid user has to be logged in
router.use(requireAuth);

// for the events data
router.get('/', getEvent);
router.get('/all', getEventAll);
router.post('/', setEvent);
router.delete('/', deleteEvent);

module.exports = router;