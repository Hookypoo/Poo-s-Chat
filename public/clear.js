//Query Dom
const testInput = document.getElementById("testinput");
const testForm = document.getElementById("test-form");
const btn = document.querySelector("test-button");


 testForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    
    const wordTest = e.target.elements.testinput.value;

    e.target.elements.testinput.value ="";
    e.target.elements.testinput.focus();

    //console.log(wordTest);
 });

 
 
 

//testInput submit
// testInput.addEventListener("submit", (e) => {
//     e.preventDefault();

//     //get input text
// });



// testInput.addEventListener("submit", (e) => { 
//     e.preventDefault();

//     //Clear and focus input
//     e.target.elements.message.value="";




