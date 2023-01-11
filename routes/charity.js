const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// get the API key
const charitiesAPIKey = process.env.CHARITIES_API_KEY;

router.get('/', async (req, res, next) => {
    try {
        //res.send('Perform the charity fetch here !!!');
        const response = await fetch('https://api.charitycommission.gov.uk/register/api/charitydetails/214779/0', {
            method: 'GET',
            // Request headers
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': `${charitiesAPIKey}`,
            }
        });
        res.json(await response.json());
    } catch (err) {
        next(err);
    }
});

module.exports = router;