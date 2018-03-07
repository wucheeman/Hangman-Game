
// GLOBAL VARIABLES
// ================
// TODO: start with single word, grow to 10 word array and as a stretch, use a file of words
var words = ['bat'];
var secretWord = ''; // word to be guessed
var wrongGuessesLeft;
var lettersGuessed;
var numLettersKnown;
var guessedSoFar;
var gameOutcome;
  // TODO delete these?
var userGuess;
var firstKeyUp;


//RESUME: Use a button, as in snippets/button-example.html, not onkeyup and see
// if that will fix the 'wait' problem 
// thinks about using callback functions as with snippets/callback_example.html

// FUNCTIONS
// =========
function getGameInfo() {
  //  maintains info on game and prompts for key press
  var wordForScreen = makeWordForScreen();
  return ("<p>Your mystery word is: " + wordForScreen + "</p><br>" +
         "<p>Wrong guesses left: " + wrongGuessesLeft + "</p><br>" +
         "<p>Letters guessed so far: " + lettersGuessed +  "</p><br>" +
         "<p>Make your best guess at letter to fill in a blank!</p>");
}

function getRandomWord() {
  // computer returns randomly selected word
  // TODO add random selection
  return words[Math.floor(Math.random() * words.length)]
}

function getUserGuess() {
  // gets result of user keypress and normalizes it
  console.log('In getUserGuess');
  document.onkeypress = getKeyPress;
  // var userGuess = getKeyPress();
  console.log('User guessed ' + userGuess);

  // TODO: // reject non-letters and prompt for a letter
  console.log('userGuess is: ' + userGuess);
  return userGuess.toLowerCase();
}

function getKeyPress(event) {
  console.log('in getKeyPress')
  // document.onkeyup = function(event) {
  userGuess = event.key;
  console.log('user guessed ' + userGuess);
}

function guessResult(userGuess) {
  // take user guess and compare with word
  var outcome = "";
  console.log('guessResult received ' + userGuess);
  // TODO reject if letter has been guessed before
  // determine if letter in word at least once
  if (secretWord.indexOf(userGuess) > -1) {
    console.log('user guessed correctly')
    // TODO: check if letter appears multiple times in word, using 
    // <string>.indexOf(<value>, <starting_index>) 
    // TODO: update guessedSoFar and numLettersKnown and ???
    // TODO: determine if user has guessed complete word and end loop
  }
  else {
    // update wrongGuessesLeft
    // if wrongGuessesLeft = 0, outcome = 'lost';
    // else outcome = 'continue';
  }
  // TODO: determine result programmatically in if .. else.. above
  return 'won';
}

// TODO: Delete?
// function init() {
//   console.log('in init');
//   main();
// }

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
  // TODO: decide if needs parameters and add logic for update
  var wordForScreen = []
  for (var i = 0; i < secretWord.length; i++ ) {
    wordForScreen.push(' _ ');
  }
  return wordForScreen;
}

// GAME
function main() {
  var notDone = true; //
  var displayArea = document.querySelector("#game");
  // start outer loop for multiple plays
  while (notDone) {
    console.log('outer loop started');
    var gameInPlay = true;
    // start middle loop for individual play of game
    while (gameInPlay) {
      initializeGlobals();
      console.log('Secret word is: ' + secretWord);
      // display initial info
      var gameInfo = getGameInfo();
      displayArea.innerHTML = gameInfo;
      // start inner loop for guessing and evaluation
      var stillGuessing = true;
      var userGuess = "";
      var guessOutcome = "";
      while (stillGuessing) {
        console.log('calling getUserGuess');
        userGuess = getUserGuess();
        guessOutcome = guessResult(userGuess);
        if ((guessOutcome === 'won') || (guessOutcome === 'lost')) {
          console.log('inside logic to continue or end inner loop');
          stillGuessing = false;
        }
        console.log('player has guessed word or run out of guesses');
      } // end inner loop
      // TODO - set value programmatically
      gameInPlay = false;
      console.log('individual play over')
    } // ends middle loop
    // TODO: Ask user if she wants to play again and continue or quit accordingly
    notDone = false; // ends outer loop of game play
  }
} // end of main


// TODO delete?
// document.onkeyup = function(event) {
//   console.log('hello');
//   main();
// } // end of game loop started at onkeyup