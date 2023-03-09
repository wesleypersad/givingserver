const express = require('express');

//bring in the middleware for user authenication
const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getPayment, getPaymentCount, getPaymentAll, setPayment, deletePayment, editPayment } = require('../controllers/paymentController');

// require auth for all routes i.e. valid user has to be logged in
router.use(requireAuth);

// for the Payments data
router.get('/', getPayment);
router.get('/count', getPaymentCount);
router.get('/all', getPaymentAll);
router.post('/', setPayment);
router.delete('/', deletePayment);
router.put('/', editPayment);

module.exports = router;