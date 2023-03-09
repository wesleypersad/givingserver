const express = require('express');

//bring in the middleware for user authenication
const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getItem, getItemCount, getItemAll, setItem, deleteItem, editItem } = require('../controllers/itemController');

// require auth for all routes i.e. valid user has to be logged in
router.use(requireAuth);

// for the Items data
router.get('/', getItem);
router.get('/count', getItemCount);
router.get('/all', getItemAll);
router.post('/', setItem);
router.delete('/', deleteItem);
router.put('/', editItem);

module.exports = router;