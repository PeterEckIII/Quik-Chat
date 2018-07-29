const express = require("express");
const app = express();
const socket = require("socket.io");

app.use(express.static("public"));

const server = app.listen(3000, function() {
    console.log("Listening on port 3000");
});

const io = socket(server);
io.on("connection", function() {
    console.log("Socket Connection works!");
});

