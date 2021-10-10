//Make connection on frontend/client
const socket = io.connect("http://localhost:4000");

//Querying the DOM
const contactTitle = document.getElementById("contact-Title");
const message = document.getElementById("message");
const btn = document.getElementById("sendMessage");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const chatWindow = document.getElementById("chat-window");
const roomForm = document.getElementById("room-form");

//...................................emit events to server from front end............................................ 

let time;

btn.addEventListener("click", (e) => { 
    socket.emit("chat", {
        message: message.value,             
    });         
    time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });     
});


roomForm.addEventListener("submit", (e) => { 
    e.preventDefault();

    //const clearInput = e.target.elements.message.value;

    //Clear and focus input
    e.target.elements.message.type.value="";
    e.target.elements.message.focus();
});

// message.addEventListener("keypress", function () {
//     socket.emit("typing", handle.value);
// })
//..................................................Get username from localstorage....................................

let names = JSON.parse(localStorage.getItem("userHandle"));
    console.log(names + " " + "Rules");
    contactTitle.innerHTML = "<strong>" + names + "</strong>";
    
//.......................................Listen for events coming back from server....................................

socket.on("newUser", username => {    
    console.log(username);    
});

    socket.on("chat",function(data) {         
        feedback.innerHTML = "";       
        output.innerHTML += "<p><strong>" + names + ":" + "   " + "</strong>" + data.message + " " + "<time>" + time + "</time>" + "</p>";
        
    });   
    
    
   
// socket.on("typing", function (data) {
//     feedback.innerHTML = "<p><em>" + data.handle + " " + " is typing a message....</em></p>";
//





// // When the user scrolls the page, execute myFunction.............................fixed  position header code...........
// window.onscroll = function() {myStickyHeader()};

// // Get the header
// var header = document.getElementById("sticky-header");

// // Get the offset position of the navbar
// var sticky = header.offsetTop;

// // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myStickyHeader() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }
