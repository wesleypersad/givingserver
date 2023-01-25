const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// get dotenv variabls
require('dotenv').config();

// get the API key
const charitiesAPIKey = process.env.CHARITIES_API_KEY;
const charitiesAPIURI = process.env.CHARITIES_API_URI;

router.get('/', async (req, res) => {
    try {
        const response = await fetch(`${charitiesAPIURI}/charitydetails/214779/0`, {
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