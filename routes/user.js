const express = require('express');

//bring in the middleware for user authenication if required
//const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getUser, setUser, deleteUser, loginUser, editUser } = require('../controllers/userController');

// require auth for all routes i.e. valid user has to be logged in
//router.use(requireAuth);

// for the users
router.get('/', getUser);
router.post('/', setUser);
router.post('/signup', setUser); // same as above
router.post('/login', loginUser);
router.delete('/', deleteUser);
router.put('/', editUser);

module.exports = router;