// GLOBALS

var displayArea = document.querySelector("#game");
var gameOutcome;
var guessedSoFar;
var lettersGuessed;
var numLettersKnown;
var secretWord = ''; // word to be guessed
// TODO: start with single word, grow to 10 word array and as a stretch, use a file of words
var words = ['bat'];
var wrongGuessesLeft;

  // TODO delete these?
var userGuess;
var firstKeyUp;


// FUNCTIONS

function getGameInfo() {
  //  maintains info on game and prompts for key press
  var wordForScreen = makeWordForScreen();
  return ("<p>Your mystery word is: " + wordForScreen + "</p><br>" +
         "<p>Wrong guesses left: " + wrongGuessesLeft + "</p><br>" +
         "<p>Letters guessed so far: " + lettersGuessed +  "</p><br>" +
         "<p>Make your best guess at a letter to fill in a blank and then press a key!</p>");
}

function getRandomWord() {
  // computer returns randomly selected word
  // TODO add random selection
  return words[Math.floor(Math.random() * words.length)]
}

function getUserGuess(event) {
  // gets result of user keypress and normalizes it
  return String.fromCharCode(event.which).toLowerCase();
}

function initializeGlobals() {
  // initializes global vars for individual play of game
  secretWord = getRandomWord();
  wrongGuessesLeft = secretWord.length;
  lettersGuessed = [];
  numLettersKnown = 0;
  guessedSoFar = [];
  gameOutcome = "";
  // TODO delete this?
  userGuess = "";
}

function makeWordForScreen() {
  // maintains display of word begin guessed
  // TODO: add logic for update as game progresses
  // TODO: decide if needs parameters
  var wordForScreen = []
  for (var i = 0; i < secretWord.length; i++ ) {
    wordForScreen.push(' _ ');
  }
  return wordForScreen;
}

function setUpGame() {
  initializeGlobals();
  console.log('the secret word is: ' + secretWord);
  // display initial info
  displayArea.innerHTML = getGameInfo();
}


// GAME
// single play of hangman
function main() {
  setUpGame();
  // loop until game is over
  document.onkeyup = function(e) {
    console.log("it's on!");
    userGuess = getUserGuess(e);
    console.log("userGuess is: " + userGuess);
    // RESUME compare to word and update display

  } // end of loop started with onkeyup
} // end of main