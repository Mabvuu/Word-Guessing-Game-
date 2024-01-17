
// Word and Hint Object
const options = {
    aroma: "pleasing smell",
    pepper: "salt's partner",
    halt: "put a stop to",
    jump: "Rise suddenly",
    shuffle: "Mix cards up",
    combine: "Add; Mix",
    chaos:"Total disorder",
    labyrinth: "Maze",
    disturb: "Interrupt; upset",
    shift: "Move; Period of word",
    machine: "Device or appliance",
};

// Initial References
const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInspection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "",
randomHint = "";
let winCount = 0,
 lossCount = 0;

 //Generate random value
 const generateRandomValue =(array) => Math.floor(Math.random () * array.length);

 // Block all the buttons
 const blocker = () => {
    let lettersButtons = document.querySelectorAll (".letters");
   stopGame();
 };

 //start game
 startBtn.addEventListener("click", ()=>{
    controls.classList.add("hide");
    init();
 });  

 //Stop Game
 const stopGame = () => {
   controls.classList.remove("hide");
};


 //Generate Word Function
 const generateWord = () => {
   letterContainer.classList.remove("hide");
   userInspection.innerText = "";
   randomWord = words[generateRandomValue(words)];
   randomHint = options[randomWord]; 
   hintRef.innerHTML = `<div id="wordHint"><span>Hint: ${randomHint}</span></div>`; // Use backticks (`) for template literals
   let displayItem = "";
   randomWord.split("").forEach(value => {
     displayItem += '<span class="inputSpace">_</span>';
   });

   //Display each element as span
   userInspection.innerHTML = displayItem;
   userInspection.innerHTML += `<div id="chanceCount"> Chances Left: ${lossCount}</div>`;

  
 };

 //Initial Fnction
 const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint ="";
    message.innerText = "";
    userInspection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    //For creating letter buttons
    for(let i = 65; i<91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");

        //Numbers to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        
   // character button onclick
   button.addEventListener("click", () => {
      message.innerText = 'Correct Letter';
   message.style.color = "#8d9e6f";
   let charArray = randomWord.toUpperCase (). split ("");
   let inputSpace = document.getElementsByClassName ("inputSpace");

   // If array contains clcked value replace the matched Dash with Letter
   if(charArray.includes(button.innerText)){
      charArray.forEach((char,index) => {
         //If character in array is same as clicked button
         if(char === button.innerText){
         button.classList.add("correct");

         //Replace with dash letter
         inputSpace[index].innerText = char;
         //increment counter
         winCount += 1;
         //If winCount equals word length
         if(winCount == charArray.length){
            resultText.innerHTML ="You Won";
            startBtn.innerText = "Restart";
            //Block all buttons
            blocker();
         }
      }
      });
   }
   else{
      //lose count
      button.classList.add("incorrect");
      lossCount -= 1;
      document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;

      message.innerText = 'incorrect letter';
      message.style.color = '#ff0000';
      if(lossCount == 0){
         word.innerHTML = `The word was: <span>${randomWord}</span>`;

         resultText.innerHTML = "Game Over";
         blocker();
      }

   }

   //Display clicked buttons
   button.disabled = true;

   });
 
   


    //Append generated buttons to the letters container
   letterContainer.appendChild(button);
    }
 };

 window.onload = () => {
   init();
};