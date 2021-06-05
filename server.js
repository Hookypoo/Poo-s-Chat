
const express = require("express");
const socket = require("socket.io");

//App setup
const app = express();
const server = app.listen(4000, function () {
    console.log("Listening  on port 4000")
});

//add static files
app.use(express.static("public"));

//socket setup
const io = socket(server);

io.on("connection", function (socket) {
    // console.log("made socket connection", socket.id);

    socket.on("chat", function (data) {
        io.sockets.emit("chat", data);
    })

    socket.on("typing", function(data){
        socket.broadcast.emit("typing", data);
    })
})
