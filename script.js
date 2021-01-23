const gameContainer = document.getElementById("game");
let flipCount = 0;
let clicks = 0;
let selected = [10,10];
let colorA = "";
let colorB = "";
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  clicks++; //clicks variable guarantees a user cannot click many cards in under a second
  if (clicks < 3) {
    newCard(event);
  }

  // you can use event.target to see which element was clicked
  if (flipCount === 2) {
    colorA = gameContainer.children[selected[0]].style.backgroundColor;
    colorB = gameContainer.children[selected[1]].style.backgroundColor;
    
    if (colorA !== colorB) {
      flipCount = 0;
      setTimeout( function() {
        //getting an error on these two lines when I test clicking
        //multiple times in under second. However, the game is still functional.
        gameContainer.children[selected[0]].style.backgroundColor = "white";
        gameContainer.children[selected[1]].style.backgroundColor = "white";
  
        selected = [10,10];
        clicks = 0;
      }, 1000);
      //if the same card is clicked twice
    } else if (gameContainer.children[selected[0]] === gameContainer.children[selected[1]]) {
      selected[1] = 10;
      flipCount = 1;
      clicks = 1;
      //if the two flipped cards are not the same color
    } else {
      flipCount = 0;
      selected = [10,10];
      clicks = 0;
    }
  }
}

// This function takes an event as input then amends the array of 
// flipped cards
function newCard(event) {
  const color = event.target.className;
  event.target.style.backgroundColor = color;

  for (let i = 0; i < gameContainer.children.length; i++) {
    if (event.target.parentElement.children[i] === event.target){

      //checking to see how many cards are flipped
      if (selected[0] === 10 && selected[1] === 10) {
        selected[0] = i;
      } else {
        selected[1] = i;
      }
    }
  }
  flipCount++;
}

// when the DOM loads
createDivsForColors(shuffledColors);