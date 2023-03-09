const Skill = require('../models/skillModel');

// getSkill
// GET request
const getSkill = async (req, res) => {
    // get the username to filter result to users documents
    const donerid = req.user.username;

    try {
        //const data = await Skill.find({});
        const data = await Skill.find({"donerid": donerid});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// getSkillCount
// GET request for number of documents
const getSkillCount = async (req, res) => {
    try {
        const data = await Skill.countDocuments();

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});
    };
};

// GET request for all Skills
const getSkillAll = async (req, res) => {
    // get all the Skill documents
    try {
        const data = await Skill.find({});

        res.status(200).json(data);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// setSkill
// POST request
const setSkill = async (req, res) => {
    const {skills} = req.body;
    const donerid = req.user.username;

    try {
        const data = await Skill.create({
            skills: skills,
            donerid: donerid
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(200).json({error: error.message});
    }
};

// deleteSkill
// DELETE request - delete by _id
const deleteSkill = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
        // get result of attempt to delete the record with that username
        const result = await Skill.deleteOne({_id: req.body._id});

        res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

// edit skill
// PUT request to edit existing record by _id
const editSkill = async (req, res) => {
    if (!req.body._id) {
        res.status(400).json({message: 'Please add a JSON _id in body'});
        //res.status(400).json(req.body);
        return;
    };

    try {
    // get result of attempt to delete the record with that username
    const result = await Skill.updateOne({_id: req.body._id},
                    {
                        skills: req.body.skills,
                        status: req.body.status
                    });

    res.status(200).json(result);
    } catch (err) {
        res.json({message: err.message});	
    };
};

module.exports = {
    getSkill, getSkillCount, getSkillAll, setSkill, deleteSkill, editSkill
};