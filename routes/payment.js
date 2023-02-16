const express = require('express');

//bring in the middleware for user authenication
const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getPayment, getPaymentAll, setPayment, deletePayment } = require('../controllers/paymentController');

// require auth for all routes i.e. valid user has to be logged in
router.use(requireAuth);

// for the Payments data
router.get('/', getPayment);
router.get('/all', getPaymentAll);
router.post('/', setPayment);
router.delete('/', deletePayment);

module.exports = router;