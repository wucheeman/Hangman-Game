// GLOBALS
// =============================================================================
var displayArea = document.querySelector("#game");
var gameOutcome;
// var guessedSoFar; TODO delete?
var lettersGuessed;
var numLettersKnown;
var secretWord = ''; // word to be guessed
var wordForScreen = '';
// TODO: start with single word, grow to 10 word array and as a stretch, use a file of words
var words = ['battle']; // test with 'battlement' next
var wrongGuessesLeft;
var userGuess;

// FUNCTIONS
//==============================================================================
// Done until single play is completed
function askToPlayAgain() {
  // Lets player decide to continue or quit
  // TODO: puts ups a button that calls playOn() and another button that calls
  // stop()
  // TODO delete next few lines when logic has been filled in
  var goOn = confirm("Press 'OK' to play again and 'Cancel' to quit");
  console.log("goOn = " + goOn);
  if (goOn) {
    playOn(); // TODO collapse to this function?
  }
  else {
    stop();  // TODO collapse to this function?
  }
}

function celebrateWin() {
  // TODO: build screen to say you won!
  console.log('Yay, you won!');
}

function commiserateLoss() {
  // TODO: build screen to say you won!
  console.log('Boohoo, you lost!');
}

function continueOrEndGame() {
  console.log("In continueOrEndGame");
  // user has guessed complete word
  if (numLettersKnown === numLettersNeeded){
    return 'win';
  }
  else if (wrongGuessesLeft === 0) {
    return 'lose';
  }
  return 'continue';
}

function getGameInfo() {
  //  creates message relaying info on game and prompts for key press
  console.log("In getGameInfo");
  return ("<p>Your mystery word is: " + wordForScreen + "</p><br>" +
         "<p>Wrong guesses left: " + wrongGuessesLeft + "</p><br>" +
         "<p>Letters guessed so far: " + lettersGuessed +  "</p><br>" +
         "<p>Make your best guess at a letter to fill in a blank and then press a key!</p>");
}
//done
function getNumLettersNeeded(){
  // Returns number of letters needed to get correct answer. Counts duplicated
  // letters once
  var distinctLetters = []
  for (i = 0; i < secretWord.length; i++) {
    if (!isInArray(secretWord[i], distinctLetters)) {
      distinctLetters.push(secretWord[i]);
    }
  }
  return distinctLetters.length;
}

function getRandomWord() {
  // computer returns randomly selected word
  return words[Math.floor(Math.random() * words.length)]
}
// done
function getResult(userGuess) {
  console.log('getResult was sent ' + userGuess);
  var indexResult = []; // indices where letter appears i secretWord
  var searchIndex = 0;
  while (searchIndex > -1) {
    index = (secretWord.indexOf(userGuess, searchIndex));
    if (index > -1) {
      console.log(index);
      indexResult.push(index);
      searchIndex = index;
    }
    else {
      searchIndex = -1;
    }
    console.log(indexResult);
    return indexResult;
  }
}
// Done
function getUserGuess(event) {
  // gets result of user keypress and normalizes it
  return String.fromCharCode(event.which).toLowerCase();
}
// Done
function initializeGlobals() {
  // initializes global vars for individual play of game
  secretWord = getRandomWord();
  wrongGuessesLeft = secretWord.length;
  lettersGuessed = [];
  numLettersKnown = 0;
  numLettersNeeded = getNumLettersNeeded();
  console.log('numLettersNeeded = ' + numLettersNeeded);
  // guessedSoFar = []; TODO: delete?
  gameOutcome = "";
  userGuess = "";
  wordForScreen = makeInitialWordForScreen();
}
// Done
function isInArray(value, array) {
  return (array.indexOf(value) > -1);
}
//done
function makeInitialWordForScreen() {
  // TODO collapse into makeWordForScreen?
  var tempWord = '';
  for (var i = 0; i < secretWord.length; i++ ) {
    tempWord = tempWord + '_'; // TODO - make more legible, e.g. ' _ '
  }
  return tempWord;
}

// Done
function makeWordForScreen(char) {
  // maintains display of word guessed
  console.log("In makeWordForScreen");
  var tempWord = '';
  for (var i = 0; i < secretWord.length; i++ ) {
      if (secretWord[i] === char) {
        tempWord = tempWord + char;
      }
      else {
        tempWord = tempWord + wordForScreen.charAt(i);
      }
    }
  console.log(tempWord);
  wordForScreen = tempWord;
}

// Done
function playOn() {
  // reloads game so player can play another round
  window.location.reload();
}
// Done
function setUpGame() {
  initializeGlobals();
  console.log('the secret word is: ' + secretWord);
  // display initial info
  updateDisplay(getGameInfo());
}
// Done until refinement time
function stop() {
  // closes window when player says quit
  // TODO: say 'ok bye and set timer for a short period.
  window.close(); 
}
// Done
function updateCounters(guessResult) {
  //Updates global counters with outcome of guess
  console.log("In updateCounters");
  lettersGuessed.push(userGuess);
  lettersGuessed.sort(); // can this be combined with the line above?
  // tests for array with info on correct guess
  if (guessResult.length !== 0) {
    console.log("Updating counters for a correct guess");
    numLettersKnown++;
  }
  // array is empty from incorrect guess
  else {
    console.log("Updating counters for an incorrect guess");
    wrongGuessesLeft--;
  }
}

function updateDisplay(message) {
  displayArea.innerHTML = message;
}

function updateGameState(guessResult) {
  updateCounters(guessResult); // TODO: add arguments as needed
  makeWordForScreen(userGuess);
  updateDisplay(getGameInfo());
}

// Done
function yayOrNay(gameStatus) {
  if (gameStatus == 'win') {
    celebrateWin();
    askToPlayAgain();
  }
  else if (gameStatus == 'lose') {
    commiserateLoss()
    askToPlayAgain();
  }
  // if reach here, game is not over
}

// RESUME: Segregate all interaction with the DOM into a single 'render' function.
// Keep commiting changes each time I finish work on a function. No need to push
// every change.

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
    document.onkeyup = function(e) {
      console.log("it's on!");
      userGuess = getUserGuess(e);
      console.log("userGuess is: " + userGuess);
      guessResult = getResult(userGuess);
      console.log("guessResult is: " + guessResult);
      updateGameState(guessResult);
      gameStatus = continueOrEndGame();
      console.log("gameStatus is: " + gameStatus);
      yayOrNay(gameStatus);
      // game not over, so loop around
    } // end of onkeyup function
} // end of main