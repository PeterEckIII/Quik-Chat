// Make connection
const socket = io.connect("http://localhost:3000");

const username = document.querySelector("#username");
const message = document.querySelector("#message");
const output = document.querySelector("#output");
const send = document.querySelector("#send-message");
const feedback = document.querySelector(".feedback");

send.addEventListener("click", function() {
    // When send is clicked, send the data in the 
    // two inputs to the other sockets (on the server side)
    socket.emit("chat", {
        message: message.value,
        username: username.value
    });

    // Set the values to empty after pressing send
    username.value = "";
    message.value = "";
});

// When typing occurs, send the username to the sockets
message.addEventListener("keypress", function() {
    socket.emit("typing", username.value);
});

// Listens for the chat message coming back from the server
// Sets the output text to the username and message 
socket.on("chat", function(data) {
    output.innerHTML += "<p><strong>" + data.username + ": </strong>" + data.message + "</p>";
    feedback.innerHTML = "";
});

socket.on("typing", function(data) {
    feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});