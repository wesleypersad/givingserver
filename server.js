//
// This is the code for the GIVING backend server for the Final Project by Wesley V Persad
// This server will handle all the endpoints for the GIVING frontend React Application
//

//use express and body parser to recieve data from front end
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// define seperate routes in seprerate files
const user = require('./routes/user');
const blog= require('./routes/blog');
const event = require('./routes/event');
const charity = require('./routes/charity');
const payment = require('./routes/payment');
const skill = require('./routes/skill');
const item = require('./routes/item');
const send = require('./routes/send');
const noauth = require('./routes/noauth');

// create an instance of express to serve our end point
const app = express();

// create a server for socket chat handling
const http = require('http').createServer(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

// socket router
const socketRouter = require('./routes/SocketRouter')(socketIO);    //socket

// get dotenv variabls
require('dotenv').config();

// initiate connection to Mongo DB
const connectDB = require('./config/db');
connectDB();

// ensure app can service requests from all sources
// configure our express instance with some body-parser settings
// including handling JSON data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define routes in seperate file
app.use('/user', user);
app.use('/blog', blog);
app.use('/event', event);
app.use('/charity', charity);
app.use('/payment', payment);
app.use('/skill', skill);
app.use('/item', item);
app.use('/send', send);
app.use('/chat', socketRouter);
app.use('/noauth', noauth);

// START OF ENDPOINT DEFINITION
app.get('/', (req, res) => {
    res.send('Welcome to the GIVING server !!!');
});
// END OF ENDPOINT DEFINITION

// use port 5000 or port assigned by local environment for the server
const port = process.env.PORT || 5000;

// finally, launch our server on port assigned port.
const server = http.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});