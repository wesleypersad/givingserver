const Event = require('../models/eventModel');

// getEvent
// GET request
const getEvent = async (req, res) => {
    const data = await Event.find({});

    res.status(200).json(data);
};

// setEvent
// POST request
const setEvent = async (req, res) => {
    if (!req.body) {
        res.status(400).json({message: 'Please add some JSON in body'})
    }

    const data = await Event.create({
        title: req.body.title,
        allDay: req.body.allDay,
        start: req.body.start,
        end: req.body.end
    });

    res.status(200).json(data);
};

// deleteEvent
// DELETE request
const deleteEvent = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({message: 'Please add a JSON event title in body'});
        return;
    }

    // get result of attempt to delete the record with that username
    const result = await Event.deleteOne({title: req.body.title});

    res.status(200).json(result);
};

module.exports = {
    getEvent, setEvent, deleteEvent
};