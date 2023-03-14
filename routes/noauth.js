// THIS FILE CONTAINS PATHS THAT DO NOT REQUIRE A LOGIN
const express = require('express');

//bring in the middleware for user authenication - NOT REQUIRED
//const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getUserCount, getUserAll } = require('../controllers/userController');
const { getSkillCount, getSkillAll } = require('../controllers/skillController');
const { getPaymentCount, getPaymentAll } = require('../controllers/paymentController');
const { getItemCount, getItemAll } = require('../controllers/itemController');
const { getEventCount, getEventAll } = require('../controllers/eventController');
const { getBlogCount, getBlogAll } = require('../controllers/blogController');

// require auth for all routes i.e. valid suer has to be logged in - NOT REQUIRED
//router.use(requireAuth);

// for the blogs data
router.get('/userall', getUserAll);
router.get('/usercount', getUserCount);
router.get('/skillall', getSkillAll);
router.get('/skillcount', getSkillCount);
router.get('/paymentall', getPaymentAll);
router.get('/paymentcount', getPaymentCount);
router.get('/itemall', getItemAll);
router.get('/itemcount', getItemCount);
router.get('/eventall', getEventAll);
router.get('/eventcount', getEventCount);
router.get('/blogall', getBlogAll);
router.get('/blogcount', getBlogCount);

module.exports = router;