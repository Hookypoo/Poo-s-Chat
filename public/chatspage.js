//Querying the DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle"); 
const output = document.getElementById("output");
const newContact = document.getElementById("new-contact");
const btn = document.getElementById("sendMessage");
const feedback = document.getElementById("feedback");
//replace handle above from chatroom.html with userhandle below coming in from index.html page below.

//Get username from url
const { username } = Qs.parse(location.search, { 
    ignoreQueryPrefix: true
    });
    //console.log(username);
    
//message submit
// userhandle.addEventListener("submit", (e) => {
//     e.preventDefault();
// });

//get message text
// const handle = e.target.elements.user-handle.value;
// console.log(handle);

    
//Make connection on frontend/client
const socket = io.connect("http://localhost:4000");

//emit events to server from front end..........................................................

//send new user's name to server to be added to chat group list
socket.emit("newUser",  username );

let time;
btn.addEventListener("click", function () {
    socket.emit("chat", {
        message: message.value,        
    });
    time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
     return time;
});

// message.addEventListener("keypress", function () {
//     socket.emit("typing", handle.value);
// });

//Listen for events coming back from server

socket.on("newUser", username => {
    outputUser(username);
    //console.log(username)
    
    newContact.scrollTop = newContact.scrollHeight;
});

socket.on("chat", function (data) {
    feedback.innerHTML = "";
    output.innerHTML += "<p>"+ data.message + " " + "<time>" + time + "</time>" + "</p>";
});

socket.on("typing", function (data) {
    feedback.innerHTML = "<p><em>" + data.handle + " " + " is typing a message....</em></p>";
});

//output or display a new user to main chatroom with all other users 

function outputUser(username) {      
    const div = document.createElement("div");
    div.classList.add("contact-info");
    div.innerHTML = `<div class="contact-avatar">
                        <i class="fas fa-user fa-2x contact-img3"></i>
                    </div>
                    <div class="contact-name">
                        <h4>${username}</h4>                                  
                    </div>
                    <div class="contact-message"><p>last message info here and container strecthes</p></div>
                    <time>12:30</time>`;
    document.querySelector(".new-contact").appendChild(div);
}


// Registering service worker

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
        .then((reg) => console.log("service worker registered"))
        .catch((err) => console.log("service worker was not registered"))
}


// `<div class="contact-avatar">
//                          <i class="fas fa-user fa-2x contact-img3"></i>
//                      </div>
//                      <div class="contact-name">
//                          <h4>${username}</h4>                                  
//                      </div>
//                      <div class="contact-message"><p>A warm welcome to my the new user</p></div>
//                      <time>9:55</time>
//   document.querySelectorAll(".new-contact").appendChild(div);`