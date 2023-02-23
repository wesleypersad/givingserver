const express=require('express');

function SocketRouter(IO) {
    const router = express.Router(IO);

    // generic chat route
    router.get('/', (req, res) => {
        res.send('CHAT GENERAL PATH !!!');
    });

    // define array for different users
    let users = [];

    //define function to get socket Id from user
    const getCurentUser = (id) => {
        return users.find(user => user.socketID === id);
    };

    // define function to get all users in a room
    const getUsersRoom = (room) => {
        return users.filter(user => user.room === room);
    };

    // socket connection
    IO.on('connection', (socket) => {
        console.log(`${socket.id} user just connected!`);

        //Listens when a new user joins the server
        socket.on('joinRoom', (data) => {
            //Adds the new user to the list of users
            users.push(data);

            //set the current user from it's socket.id
            const user = getCurentUser(socket.id);

            console.log(`${user.userName} joined room ${user.room}`);

            // join the room
            socket.join(user.room);

            //Sends the list of users in th same room to each client
            IO.to(user.room).emit('newUserResponse', getUsersRoom(user.room));

            // when I type a message
            socket.on('typing', (data) => IO.to(user.room).emit('typingResponse', data));

            //Listens and logs the message to the console
            socket.on('message', (data) => {
                //console.log(data);
                //console.log('socketID = ', getCurentUser(socket.id));
                IO.to(user.room).emit('messageResponse', data);
            });

            socket.on('disconnect', () => {
                console.log(`${socket.id} user just disconnected!`);
                //Updates the list of users when a user disconnects from the server
                users = users.filter((user) => user.socketID !== socket.id);
                // console.log(users);
                //Sends the list of users to the client
                IO.to(user.room).emit('newUserResponse', getUsersRoom(user.room));
                socket.disconnect();
            });
        });
    });

    return router;
}

module.exports= SocketRouter;
