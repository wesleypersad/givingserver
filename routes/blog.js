const express = require('express');

//bring in the middleware for user authenication
const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getBlog, getBlogAll, setBlog, deleteBlog, editBlog } = require('../controllers/blogController');

// require auth for all routes i.e. valid suer has to be logged in
router.use(requireAuth);

// for the blogs data
router.get('/', getBlog);
router.get('/all', getBlogAll);
router.post('/', setBlog);
router.delete('/', deleteBlog);
router.put('/', editBlog);

module.exports = router;