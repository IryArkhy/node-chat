const path = require("path")
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./src/utils/messages");
const { joinUser, getCurrentUser, userLeave,
    getRoomUsers } = require("./src/utils/users");


const botName = 'ChatCord Bot';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder 
app.use(express.static(path.join(__dirname, "src")));

//Run when a client connects 
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const id = socket.id
        const user = joinUser({ id, username, room })
        socket.join(user.room)
        //This method will emit to the user that's connecting.
        socket.emit("message", formatMessage(botName, 'Welcome to ChatCord!'));
        //Broadcast when a user connects. Will emit to everybody eccept the user that's connecting.
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has joined the chat!`));
        //Send users and room info
        io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room) });
    })
    //If you want to broadcast to everybody ==> io.emit()

    //Listen for chat message
    socket.on("chatMsg", (message) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, message));
    });
    //Runs when user disconects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`))
        };

        //Send users and room info
        io.to(user.room).emit('roomUser', { room: user.room, users: getRoomUsers(user.room) })
    });
});
const port = 3000 || process.env.PORT;

server.listen(port, () => console.log(`Server running on port ${port} 🔥`));