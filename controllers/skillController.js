const Skill = require('../models/skillModel');

// getSkill
// GET request
const getSkill = async (req, res) => {
    // get the username to filter result to users documents
    const donerid = req.user.username;

    //const data = await Skill.find({});
    const data = await Skill.find({"donerid": donerid});

    res.status(200).json(data);
};

// GET request for all Skills
const getSkillAll = async (req, res) => {
    // get all the Skill documents

    const data = await Skill.find({});

    res.status(200).json(data);
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

    // get result of attempt to delete the record with that username
    const result = await Skill.deleteOne({_id: req.body._id});

    res.status(200).json(result);
};

module.exports = {
    getSkill, getSkillAll, setSkill, deleteSkill
};