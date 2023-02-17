const Event = require('../models/eventModel');

// getEvent
// GET request
const getEvent = async (req, res) => {
    // get the username to filter result to users documents
    const author = req.user.username;

    const data = await Event.find({"author": author});

    res.status(200).json(data);
};

// getEventAll
// GET request for all events
const getEventAll= async (req, res) => {
    // get all event documents

    const data = await Event.find({});

    res.status(200).json(data);
};

// setEvent
// POST request
const setEvent = async (req, res) => {
    const {title, allDay, start, end} = req.body;
    const author = req.user.username;

    try {
        const data = await Event.create({
            title: title,
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

    // get result of attempt to delete the record with that username
    const result = await Event.deleteOne({_id: req.body._id});

    res.status(200).json(result);
};

const editEvent = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    // get result of attempt to delete the record with that username
    const result = await Event.updateOne({_id: req.body._id},
                        {
                            title: req.body.title,
                            allDay: req.body.allDay,
                            start: req.body.start,
                            end: req.body.end,
                            body: req.body.body
                        });

    res.status(200).json(result);
};

module.exports = {
    getEvent, getEventAll, setEvent, deleteEvent, editEvent
};