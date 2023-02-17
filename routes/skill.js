const express = require('express');

//bring in the middleware for user authenication
const requireAuth = require('../middleware/requireAuth');

// instantiate router
const router = express.Router();

//bring in controllers for CRUD operations
const { getSkill, getSkillAll, setSkill, deleteSkill, editSkill } = require('../controllers/skillController');

// require auth for all routes i.e. valid user has to be logged in
router.use(requireAuth);

// for the Skills data
router.get('/', getSkill);
router.get('/all', getSkillAll);
router.post('/', setSkill);
router.delete('/', deleteSkill);
router.put('/', editSkill);

module.exports = router;