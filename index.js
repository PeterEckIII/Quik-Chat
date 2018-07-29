const express = require("express");
const app = express();
const socket = require("socket.io");

app.use(express.static("public"));

const server = app.listen(3000, function() {
    console.log("Listening on port 3000");
});

const io = socket(server);

io.on("connection", function(socket) {
    console.log("Socket Connection works!", socket.id);

    //  Listens for the chat emit from the client
    socket.on("chat", function(data) {
        // Refers to all sockets on the server
        io.emit("chat", data);
    })

    // Broadcast sends a message to all sockets but the one involved in an action
    socket.on("typing", function(data) {
        socket.broadcast.emit("typing", data);
    });
});

