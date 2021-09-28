//Make connection on frontend/client
const socket = io.connect("http://localhost:4000");

//Querying the DOM

const message = document.getElementById("message");
const btn = document.getElementById("sendMessage");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
//...................................emit events to server from front end............................................ 

let time;

btn.addEventListener("click", (e) => { 
    socket.emit("chat", {
        message: message.value,             
    });    
    time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });     
});

// message.addEventListener("submit", (e) => { 
//     e.preventDefault();

//     //Clear and focus input
//     e.target.elements.message.value="";
//     e.target.elements.message.focus();
// });

// message.addEventListener("keypress", function () {
//     socket.emit("typing", handle.value);
// })
//..................................................Get username from localstorage....................................

let names = JSON.parse(localStorage.getItem("userHandle"));
    console.log(names + " " + "Rules");

//.......................................Listen for events coming back from server....................................

socket.on("newUser", username => {    
    console.log(username);    
});

    socket.on("chat",function(data) {         
        feedback.innerHTML = "";
        output.innerHTML += "<p><strong>" + names + ":" + " " + "</strong>" + data.message + " " + "<time>" + time + "</time>" + "</p>";
    });    
   
// socket.on("typing", function (data) {
//     feedback.innerHTML = "<p><em>" + data.handle + " " + " is typing a message....</em></p>";
// })
