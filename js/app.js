/*
 * a list that holds all cards
 */

let cardList = [
             "diamond",
             "paper-plane-o",
             "anchor",
             "bolt",
             "cube",
             "anchor",
             "leaf",
             "bicycle",
             "diamond",
             "bomb",
             "leaf",
             "bomb",
             "bolt",
             "bicycle",
             "paper-plane-o",
             "cube"
];

let cardArray = [];
const deck = document.querySelector(".deck");
let li;
let icon;
let firstClick;
let firstCard;
let secondCard;
let second;
const moveSpan = document.querySelector(".moves");
const timeSpan = document.querySelector(".time");
let moveCounter;
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
let totalStar;
let timeOut;

// Displaying the cards on the page
 
// - Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(cardList);

// - looping through each card and creating its HTML
// - adding each card's HTML to the page
cardList.forEach(function(square) {
	
	li = document.createElement("li");
	li.className = "card";
	icon = document.createElement("i");
	icon.className = "fa fa-"+square;
	li.appendChild(icon);
	deck.appendChild(li);

})

 // setting up the event listener for a card. If a card is clicked:
 // *  - the card's symbol is displayed 
deck.addEventListener ("click", cardClicked);

firstClick = false;

// events happen when a card is clicked
function cardClicked(clicked) {
    if ((clicked.target.className != "card open show" 
      && clicked.target.className !="card match")
      && clicked.target.nodeName === "LI"){
          clicked.target.className = "card open show";

        // *    + incrementing the move counter and displaying it on the page 
        moves();
        // *  - adding the card to a *list* of "open" cards
        openCard(clicked.target);

        if (!firstClick) {
            firstClick  = true;
            timer();
        }

    }

}

// events happen when a card is opened
function openCard(card) {

    cardArray.push(card);

    if (cardArray.length === 2) {
        firstCard = cardArray[0].querySelector("i");
        secondCard = cardArray[1].querySelector("i");

        // *  - if the list already has another card, checking if the two cards match
        if (firstCard.className === secondCard.className) {
            // *    + if the cards do match, locking the cards in the open position
            ifMatched();
            // increased the number of matched cards and finally shows a modal
            incrementMatched ();
        } 

    }else if (cardArray.length === 3) {
         // *    + if the cards do not match, removing the cards from the list and hiding the card's symbol 
                ifNotMatched();

    }

}

// events happen when two cards are matched
function ifMatched() {
   cardArray[0].className  = "card match";
   cardArray[1].className  = "card match";
   cardArray = [];
}

// events happen when two cards are not matched
function ifNotMatched() {
    cardArray[0].className  = "card";
    cardArray[1].className  = "card";
    cardArray.splice(0,2);
}


moveCounter = 0;
moveSpan.innerText = moveCounter;
totalStar  = "3 stars";

// events happen when the moves increment
function moves () {
	moveCounter++;
	moveSpan.innerText = moveCounter;

    // two stars will be shown if there are more than 5 moves
	if (moveCounter >30){
		star1.className = "hidden";
		totalStar = "2 stars";
	} 
        // one star will be shown if there are more than 10 moves
	if (moveCounter >40) {
		star2.className = "hidden";
		totalStar = "1 star";
	}

}

// function to increment the number of matched cards 
let match = 0;
function incrementMatched () {
	match += 2;

	if (match === 16) {
        // time stops when all cards are matched
        clearTimeout(timeOut);
         // *    + if all cards have matched, display a message with the final score
		showModal();
	}
}

//the modal
const modal = document.getElementById('myModal');

//the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, the modal opens 
function showModal() {
	let message = "Congratulations!!..You won with " + totalStar + " and " + moveCounter +" moves and you took " + second +" seconds.";
	let p = document.querySelector(".message");
	p.textContent = message;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), the modal closes
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, it closes
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

// total time calculation in seconds
second = 0;
timeSpan.innerText = second;
function timer(){
	second++;
    timeSpan.innerText = second;
	timeOut = setTimeout (timer, 1000);
}

// funtion to reload the game
function reload(){
	location.reload();
	
}

// new game by clicking restart icon 
const restart = document.getElementsByClassName("fa fa-repeat");
restart[0].addEventListener ("click", reload);

// new game by clicking "play again" button
const btn = document.getElementById("myBtn");
btn.addEventListener ("click", reload);