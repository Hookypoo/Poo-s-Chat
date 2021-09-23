//Make connection on frontend/client
const socket = io.connect("http://localhost:4000");

//get time

// const date = new Date();
//const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
// const time = date.getHours()+":"+date.getMinutes();
//console.log(time);


//Querying the DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle"); 
const output = document.getElementById("output");
const btn = document.getElementById("sendMessage");
const feedback = document.getElementById("feedback");
//replace handle above from chatroom.html with userhandle below coming in from index.html page below.
const userhandle = document.getElementById("user-handle");




//emit events to server from front end 

let time;

btn.addEventListener("click", function () {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value,
    });
    time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
    // return time;
});

message.addEventListener("keypress", function () {
    socket.emit("typing", handle.value);
})

//Listen for events coming back from server

socket.on("chat", function (data) {
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ":" + " " + "</strong>" + data.message + " " + "<time>" + time + "</time>" + "</p>";
});

socket.on("typing", function (data) {
    feedback.innerHTML = "<p><em>" + data.handle + " " + " is typing a message....</em></p>";
})

// Registering service worker

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then((reg) => console.log("service worker registered"))
        .catch((err) => console.log("service worker was not registered"))
}
