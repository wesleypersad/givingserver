const express=require('express');

function SocketRouter(socketIO) {
    const router = express.Router(socketIO);

    // generic chat route
    router.get('/', (req, res) => {
        res.send('CHAT GENERAL PATH !!!');
    });

    // define array for different users
    let users = [];

    // socket connection
    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} user just connected!`);

        socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

        //Listens and logs the message to the console
        socket.on('message', (data) => {
            //console.log(data);
            socketIO.emit('messageResponse', data);
        });

        //Listens when a new user joins the server
        socket.on('newUser', (data) => {
            //Adds the new user to the list of users
            users.push(data);
            //console.log(users);
            console.log(`${data.userName} joined room ${data.room}`);
            //Sends the list of users to the client
            socketIO.emit('newUserResponse', users);
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} user just disconnected!`);
            //Updates the list of users when a user disconnects from the server
            users = users.filter((user) => user.socketID !== socket.id);
            // console.log(users);
            //Sends the list of users to the client
            socketIO.emit('newUserResponse', users);
            socket.disconnect();
        });
    });

    return router;
}

module.exports= SocketRouter;
