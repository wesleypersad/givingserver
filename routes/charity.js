const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// get dotenv variabls
require('dotenv').config();

// get the API key
const charitiesAPIKey = process.env.CHARITIES_API_KEY;
const charitiesAPIURI = process.env.CHARITIES_API_URI;

// just for the charity branch
router.get('/', (req, res, next) => { 
    res.send('CHARITY GENERAL PATH !!!');
})

router.get('/details/:charnum', async (req, res) => {
    try {
        console.log(req.params.charnum);
        const charnum = req.params.charnum;
        const response = await fetch(`${charitiesAPIURI}/allcharitydetails/${charnum}/0`, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': `${charitiesAPIKey}`
            }
        });
        res.json(await response.json());
    } catch(error) {
        console.log(error.message);
        return null;
    };
});

router.get('/searchname/:name', async (req, res) => {
    try {
        console.log(req.params.name);
        const name = req.params.name;
        const response = await fetch(`${charitiesAPIURI}/searchCharityName/${name}`, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': `${charitiesAPIKey}`
            }
        });
        res.json(await response.json());
    } catch(error) {
        console.log(error.message);
        return null;
    };
});

router.get('/financialhistory/:charnum', async (req, res) => {
    try {
        console.log(req.params.charnum);
        const charnum = req.params.charnum;
        const response = await fetch(`${charitiesAPIURI}/charityfinancialhistory/${charnum}/0`, {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': `${charitiesAPIKey}`
            }
        });
        res.json(await response.json());
    } catch(error) {
        console.log(error.message);
        return null;
    };
});

module.exports = router;