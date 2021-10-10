//Querying the DOM
const message = document.getElementById("message");
const output = document.getElementById("output");
const newContact = document.getElementById("new-contact");
const btn = document.getElementById("sendMessage");
const indexBtn = document.getElementById("submit-username");
const feedback = document.getElementById("feedback");


//Get username from url
const { username } = Qs.parse(location.search, { 
    ignoreQueryPrefix: true
    });
//console.log(username);
//.................................................Get and share username with chat.js...............................

let userTitle =  username;

let userHandle = JSON.stringify(userTitle);
    console.log(userHandle);
    localStorage.setItem("userHandle", userHandle);


//message submit
// userhandle.addEventListener("submit", (e) => {
//     e.preventDefault();
// });

//get message text
// const handle = e.target.elements.user-handle.value;
// console.log(handle);

    
//Make connection on frontend/client
const socket = io.connect("http://localhost:4000");

//..................................emit events to server from front end.............................................

//send new user's name to server to be added to chat group list
socket.emit("newUser",  username );

//.................................Listen for events coming back from server..........................................

socket.on("newUser", username => {
    outputUser(username);
    //console.log(username)    

    //scroll Down
    newContact.scrollTop = newContact.scrollHeight;
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


