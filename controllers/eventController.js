const Event = require('../models/eventModel');

// getEvent
// GET request
const getEvent = async (req, res) => {
    // get the username to filter result to users documents
    const author = req.user.username;

    try {
        const data = await Event.find({"author": author});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// getEventCount
// GET request for number of documents
const getEventCount = async (req, res) => {
    try {
        const data = await Event.countDocuments();

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};


// getEventAll
// GET request for all events
const getEventAll= async (req, res) => {
    // get all event documents
    try {
        const data = await Event.find({});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// setEvent
// POST request
const setEvent = async (req, res) => {
    const {title, body, allDay, start, end} = req.body;
    const author = req.user.username;

    try {
        const data = await Event.create({
            title: title,
            body: body,
            allDay: allDay,
            start: start,
            end: end,
            author: author
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// deleteEvent
// DELETE request - delete by _id
const deleteEvent = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON event _id in body'});
        return;
    }

    try {
        // get result of attempt to delete the record with that username
        const result = await Event.deleteOne({_id: req.body._id});

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

const editEvent = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await Event.updateOne({_id: req.body._id},
                        {
                            title: req.body.title,
                            body: req.body.body,
                            allDay: req.body.allDay,
                            start: req.body.start,
                            end: req.body.end,
                            body: req.body.body
                        });

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

module.exports = {
    getEvent, getEventCount, getEventAll, setEvent, deleteEvent, editEvent
};