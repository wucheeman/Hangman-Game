// GLOBALS
// =============================================================================
var displayArea = document.querySelector("#game");
var gameOutcome;
var guessedSoFar;
var lettersGuessed;
var numLettersKnown;
var secretWord = ''; // word to be guessed
// TODO: start with single word, grow to 10 word array and as a stretch, use a file of words
var words = ['bat'];
var wrongGuessesLeft;
var userGuess;

// FUNCTIONS
//==============================================================================
function continueOrEndGame() {
  console.log("In continueOrEndGame(")
  // Determines if user has guessed complete word or run out of guesses
  // TODO: add parameters if needed and logic
  return 'win'; // scaffolding
}

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
  return words[Math.floor(Math.random() * words.length)]
}

function getResult(userGuess) {
  console.log('getResult was sent ' + userGuess);
  result = [];
  // TODO reject if letter has been guessed before
  if (secretWord.indexOf(userGuess) > -1) {
    // TODO determine index of first occurrence and put it into guessOutcome
    // Be sure this is not just reprising 'indexOf()'. Return empty [] if letter
    // not in word
    result.push(0); // scaffolding, assumes guess of 'b'
    console.log(result);
    // TODO: check if letter appears multiple times in word, using 
    // <string>.indexOf(<value>, <starting_index>)
    return result;
  }
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
  userGuess = "";
}

function makeWordForScreen() {
  // maintains display of word begin guessed
  // TODO: add logic for update as game progresses
  // TODO: decide if needs parameters
  var wordForScreen = []
  for (var i = 0; i < secretWord.length; i++ ) {
    wordForScreen.push(' _ ');
  }//
  return wordForScreen;
}

function setUpGame() {
  initializeGlobals();
  console.log('the secret word is: ' + secretWord);
  // display initial info
  displayArea.innerHTML = getGameInfo();
}

function updateCounters() {
  //TODO: add parameter and logic to update counters
  // including guessedSoFar and numLettersKnown and ???
  console.log("In updateCounters");
}

function updateDisplays() {
  console.log("in updateDisplays");
  // TODO: add parameter and logic to update displays
}

function updateGameState(guessResult) {
  updateCounters(); // TODO: add arguments as needed
  updateDisplays(); // TODO: add arguments as needed
}

// GAME
//==============================================================================
// single play of hangman
function main() {
  console.log("starting game in main");
  var guessResult = [];
  var gameStatus = "continue";
  var gameNotOver = true;
  setUpGame();
  // start looping until single play is over
//  while (gameNotOver) {
    document.onkeyup = function(e) {
      console.log("it's on!");
      userGuess = getUserGuess(e);
      console.log("userGuess is: " + userGuess);
      guessResult = getResult(userGuess);
      console.log("guessResult is: " + guessResult);
      updateGameState(guessResult);
      gameStatus = continueOrEndGame();
      console.log("gameStatus is: " + gameStatus);
      // decide to keep looping or celebrate win/commiserate loss
      // with celebrateWin or consoleForLoss
      // TODO: add logic to play another round or quit
      // use window.location.reload(); to force page refresh/play another round
      // use window.close() to close; say 'ok bye and set timer first -- it's abrupt!
    } // end of onkeyup function
} // end of main