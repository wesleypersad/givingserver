const Payment = require('../models/paymentModel');

// getPayment
// GET request
const getPayment = async (req, res) => {
    // get the username to filter result to users documents
    const donerid = req.user.username;

    try {
        //const data = await Payment.find({});
        const data = await Payment.find({"donerid": donerid});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// getPaymentCount
// GET request for number of documents
const getPaymentCount = async (req, res) => {
    try {
        const data = await Payment.countDocuments();

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};


// GET request for all Payments
const getPaymentAll = async (req, res) => {
    // get all the Payment documents
    try {
        const data = await Payment.find({});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// setPayment
// POST request
const setPayment = async (req, res) => {
    const {amount, charity} = req.body;
    const donerid = req.user.username;

    try {
        const data = await Payment.create({
            amount: amount,
            charity: charity,
            donerid: donerid
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(200).json({error: error.message});
    }
};

// deletePayment
// DELETE request - delete by _id
const deletePayment = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await Payment.deleteOne({_id: req.body._id});

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// edit item
// PUT request to edit existing record by _id
const editPayment = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await Payment.updateOne({_id: req.body._id},
                            {
                                amount: req.body.amount,
                                charity: req.body.charity,
                                status: req.body.status
                            });

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

module.exports = {
    getPayment, getPaymentCount, getPaymentAll, setPayment, deletePayment, editPayment
};