//Make connection on frontend/client
const socket = io.connect("http://localhost:4000");

//Querying the DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const output = document.getElementById("output");
const btn = document.getElementById("sendMessage");
const feedback = document.getElementById("feedback");


//emit events from front end to server

btn.addEventListener("click", function () {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value,        
    });
    
});


message.addEventListener("keypress", function() {
    socket.emit("typing", handle.value);
})

//Listen for events coming back from server

socket.on("chat", function (data) {
    feedback.innerHTML="";
    output.innerHTML += "<p><strong>" + data.handle + ":" + " " +"</strong>" + data.message + "</p>";
});

socket.on("typing", function(data){
    feedback.innerHTML = "<p><em>" + data +" " + " is typing a message....</em></p>"; 
})