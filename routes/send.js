const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

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

router.get('/', (req, res) => {
    res.send('GENERIC SEND ROUTE !!!');
});
router.post('/sms', (req,res) => {
    //NB body data received as a JSON object already not a raw string
    const json = req.body;

    // send the message to TWILIO
    client.messages
    .create({body: `${json.message}`, from: `${fromNum}`, to: `${toNum}`})
    .then(message => console.log(message.sid));

    // send the response back
    res.json(json);
});
router.post('/email', (req,res) => {
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

    // send the response back
    res.json(json);
});

module.exports = router;