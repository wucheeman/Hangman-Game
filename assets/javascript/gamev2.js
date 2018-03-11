// RESUME: do a simple version of index.html to test Will's fix to askToPlayAgain
// then marry up updated.html and the js so it works.


// GLOBAL VARIABLES
// =============================================================================
var displayArea = document.querySelector(".displayArea"); // was #game
// var headerText = document.querySelector('#headerText'); //TODO delete
var buttonArea = document.querySelector("#buttonArea");
var gameOutcome;
var lettersGuessed;
var numLettersKnown;
var secretWord = ''; // word to be guessed
var wordForScreen = '';
// TODO: start with single word, grow to 10 word array and as a stretch, use a file of words
var words = ['bat', 'battlement', 'lemming', 'zebra', 'automobile'];
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
  // TODO: Will says this should work - test it with an old version of index.html
  // setTimeout(
    // () => {
    //   var goOn = confirm("Press 'OK' to play again and 'Cancel' to quit");
    //   console.log("goOn = " + goOn);
    //   if (goOn) {
    //     playOn(); // TODO collapse to this function?
    //   }
    //   else {
    //     stop();  // TODO collapse to this function?
    //   }
    // }
    // () => {
      updateButtonArea(makeTwoButtons());
  //   }
  // )

}

function celebrateWin() {
  console.log('Yay, you won!');
  // play song/update screen
  var endGameSong = document.getElementById("audioplayer");
  // add attribute 'controls' to audio tag to make them visible
  endGameSong.innerHTML = '<audio autoplay src="assets/audio/hallelujah.mp3"/>';
  message = '<p>Congratulations, you\'ve won!</p>';
  updateDisplay(message);
}

function commiserateLoss() {
  console.log('Boohoo, you lost!');
  // play song/update screen
  var endGameSong = document.getElementById("audioplayer");
  // add attribute 'controls' to audio tag to make them visible
  endGameSong.innerHTML = '<audio autoplay src="assets/audio/funeral.mp3"/>';
  message = '<p>So sorry, you lost!</p>';
  updateDisplay(message);
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
  return ("<h6>Press a key to make your best guess!</h6>" +
          "<hr>" +
          "<p>Your mystery word is: " + wordForScreen + "</p><br>" +
          "<p>Wrong guesses left: " + wrongGuessesLeft + "</p><br>" +
          "<p>Letters guessed so far: " + lettersGuessed +  "</p>");
}

// TODO: delete
// function getNewHeaderText() {
//   return ("Make your best guess at a letter to fill in a blank and then press a key!");
// }

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

// done
function makeTwoButtons(){
    return(
            '<div class="text-center">' +
            '  <div class="btn-group mr-2" role="group" aria-label="First group">' +
            '    <button onclick="playOn()" class="btn btn-success btn-lg" type="button">New Game</button>' +
            '  </div>' +
            '  <div class="btn-group mr-2" role="group" aria-label="Second group">' +
            '    <button onclick="stop()" class="btn btn-danger btn-lg" type="button">Let\'s Quit</button>' +
            '</div>'); 
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

// done
function removeButton() {
  return("<button class='btn btn-primary btn-block start' type='button'>Keep Playing!</button>")
}

// Done
function setUpGame() {
  initializeGlobals();
  console.log('the secret word is: ' + secretWord);
  // display initial info
  // updateHeaderText(getNewHeaderText()); TODO: delete
  updateButtonArea(removeButton());
  updateDisplay(getGameInfo());
}

// Done until refinement time
function stop() {
  // closes window when player says quit
  // TODO: say 'ok bye and set timer for a short period.
  window.close(); 
}

// TODO: move functionality to updateDisplay and delete
function updateButtonArea(message) {
  buttonArea.innerHTML = message;
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
  // displayArea.innerHTML = ""; TODO: remove
  displayArea.innerHTML = message;
}

function updateGameState(guessResult) {
  updateCounters(guessResult); // TODO: add arguments as needed
  makeWordForScreen(userGuess);
  updateDisplay(getGameInfo());
}

// TODO: move functionality to updateDisplay and delete
function updateHeaderText(message) {
  headerText.innerHTML = message;
}

// Done
function yayOrNay(gameStatus) {
  if (gameStatus == 'win') {
    celebrateWin();
    // setTimeout(askToPlayAgain, 5000);
    askToPlayAgain();
  }
  else if (gameStatus == 'lose') {
    commiserateLoss()
    console.log("back from commiserateLoss");
    // setTimeout(askToPlayAgain, 5000);
    askToPlayAgain();
  }
  // if reach here, game is not over
}

/*
RESUME:
[x] rip out html for annoying ad and evm products
[x] update html and js to overwrite the game status
[ ] run initial test of full game - win case and lose case
[] review todos and do the must-does; reject is one that needs to be in
[] review homework assignment to see what else needs to be done in game and outside
[] finish the game
[] test
[] do the outside-the-game part of the assignment`
*/

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