//
// This is the code for the GIVING backend server for the Final Project by Wesley V Persad
// This server will handle all the endpoints for the GIVING frontend React Application
//

//use express and body parser to recieve data from front end
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const fetch = require('node-fetch');

// get dotenv variabls
require('dotenv').config();

// define variables for TWILIO to send texts
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNum = process.env.TWILIO_FROM_NUM;
const toNum = process.env.TWILIO_TO_NUM;
const client = require('twilio')(accountSid, authToken);

// define variables for emails
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// define variable for charities API key
const charitiesAPIKey = process.env.CHARITIES_API_KEY;

// create an instance of express to serve our end point
const app = express();

// ensure app can service requests from all sources
// configure our express instance with some body-parser settings
// including handling JSON data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// START OF ENDPOINT DEFINITION
app.get('/', (req, res) => {
    res.send('Welcome to the GIVING server !!!');
});
app.get('/charity', async (req, res) => {
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
});
app.post('/twilio', (req,res) => {
    //NB body data received as a JSON object already not a raw string
    const json = req.body;

    // send the message to TWILIO
    client.messages
    .create({body: `${json.message}`, from: `${fromNum}`, to: `${toNum}`})
    .then(message => console.log(message.sid));

    // send the respons back
    res.json(json);
});
app.post('/email', (req,res) => {
    //NB body data received as a JSON object already not a raw string
    const json = req.body;
    console.log(json.message);

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const msg = {
        to: 'vas.udeo.persad@gmail.com', // Change to your recipient
        from: 'vasudeo.persad@gmail.com', // Change to your verified sender
        subject: `Sending with SendGrid is Fun: ${json.message}`,
        text: `${json.message}`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    (async () => {
        try {
            
            await sgMail.send(msg);
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
            }
        }
    })();
    console.log('Email Sent');

    // send the respons back
    res.json(json);
});
// END OF ENDPOINT DEFINITION

// use port 5000 or port assigned by local environment for the server
const port = process.env.PORT || 5000;

// finally, launch our server on port assigned port.
const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});