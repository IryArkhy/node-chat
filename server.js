const path = require("path")
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder 
app.use(express.static(path.join(__dirname, "src")));

//Run when a client connects 
io.on('connection', socket => {
    //This method will emit to the user that's connecting.
    socket.emit("message", "Welcome to chat!");

    //Broadcast when a user connects. Will emit to everybody eccept the user that's connecting.
    socket.broadcast.emit("message", "A user has joined the chat!")

    //If you want to broadcast to everybody ==> io.emit()

    //Runs when user disconects
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat")
    })

    //Listen for chat message
    socket.on("chatMsg", (message) => {
        io.emit('message', message);
    })
});
const port = 3000 || process.env.PORT;

server.listen(port, () => console.log(`Server running on port ${port} 🔥`));