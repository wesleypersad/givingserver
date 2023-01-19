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
    const {title, allDay, start, end} = req.body;

    try {
        const data = await Event.create({
            title: title,
            allDay: allDay,
            start: start,
            end: end
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

module.exports = {
    getEvent, setEvent, deleteEvent
};