
// GLOBAL VARIABLES
// =============================================================================
var displayArea = document.querySelector(".displayArea"); // was #game
var buttonArea = document.querySelector("#buttonArea");
var gameOutcome;
var lettersGuessed;
var numLettersKnown;
var secretWord = ''; // word to be guessed
var wordForScreen = '';
var words = ['bat', 'battlement', 'lemming', 'zebra', 'automobile'];
var wrongGuessesLeft;
var userGuess;

// FUNCTIONS
//==============================================================================
// Done until single play is completed
function askToPlayAgain() {
      updateButtonArea(makeTwoButtons());
}

function celebrateWin() {
  // console.log('Yay, you won!');
  // play song/update screen
  var endGameSong = document.getElementById("audioplayer");
  // add attribute 'controls' to audio tag to make them visible
  endGameSong.innerHTML = '<audio autoplay src="assets/audio/hallelujah.mp3"/>';
  message = '<p>Congratulations, you\'ve won!</p>';
  updateDisplay(message);
}

function commiserateLoss() {
  // console.log('Boohoo, you lost!');
  // play song/update screen
  var endGameSong = document.getElementById("audioplayer");
  // add attribute 'controls' to audio tag to make them visible
  endGameSong.innerHTML = '<audio autoplay src="assets/audio/funeral.mp3"/>';
  message = '<p>So sorry, you lost!</p>';
  updateDisplay(message);
}

function continueOrEndGame() {
  // console.log("In continueOrEndGame");
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
  // console.log("In getGameInfo");
  return ("<h6>Press a key to make your best guess!</h6>" +
          "<hr>" +
          "<p>Your mystery word is: " + wordForScreen + "</p><br>" +
          "<p>Wrong guesses left: " + wrongGuessesLeft + "</p><br>" +
          "<p>Letters guessed so far: " + lettersGuessed +  "</p>");
}

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
  // console.log('getResult was sent ' + userGuess);
  var indexResult = []; // indices where letter appears i secretWord
  var searchIndex = 0;
  while (searchIndex > -1) {
    index = (secretWord.indexOf(userGuess, searchIndex));
    if (index > -1) {
      // console.log(index);
      indexResult.push(index);
      searchIndex = index;
    }
    else {
      searchIndex = -1;
    }
    // console.log(indexResult);
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
  // console.log('numLettersNeeded = ' + numLettersNeeded);
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
  // TODO not DRY; collapse into makeWordForScreen
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
  // console.log("In makeWordForScreen");
  var tempWord = '';
  for (var i = 0; i < secretWord.length; i++ ) {
      if (secretWord[i] === char) {
        tempWord = tempWord + char;
      }
      else {
        tempWord = tempWord + wordForScreen.charAt(i);
      }
    }
  // console.log(tempWord);
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
  // console.log('the secret word is: ' + secretWord);
  // display initial info
  updateButtonArea(removeButton());
  updateDisplay(getGameInfo());
}

function stop() {
  // closes window when player says quit
  // TODO: say 'ok bye' and set timer for a short period.
  window.close(); 
}

// TODO: Not DRY; move functionality to updateDisplay and delete
function updateButtonArea(message) {
  buttonArea.innerHTML = message;
}

function updateCounters(guessResult) {
  //Updates global counters with outcome of guess
  // console.log("In updateCounters");
  lettersGuessed.push(userGuess);
  lettersGuessed.sort();
  // tests for array with info on correct guess
  if (guessResult.length !== 0) {
    // console.log("Updating counters for a correct guess");
    numLettersKnown++;
  }
  // array is empty from incorrect guess
  else {
    // console.log("Updating counters for an incorrect guess");
    wrongGuessesLeft--;
  }
}

function updateDisplay(message) {
  displayArea.innerHTML = message;
}

function updateGameState(guessResult) {
  updateCounters(guessResult);
  makeWordForScreen(userGuess);
  updateDisplay(getGameInfo());
}

// TODO: Not DRY; move functionality to updateDisplay and delete
function updateHeaderText(message) {
  headerText.innerHTML = message;
}

function yayOrNay(gameStatus) {
  if (gameStatus == 'win') {
    celebrateWin();
    askToPlayAgain();
  }
  else if (gameStatus == 'lose') {
    commiserateLoss()
    // console.log("back from commiserateLoss");
    askToPlayAgain();
  }
  // if reach here, game is not over
}

/*
RESUME:
[x] rip out html for annoying ad and evm products
[x] update html and js to overwrite the game status
[x] run initial test of full game - win case and lose case
[x] review todos; remove those that don't point to future work
[] review homework assignment to see what else needs to be done in game and outside; List in Wunderlist.
[] finish the game
[] test
[] remove this list and commit final copy of game
[] do the outside-the-game part of the assignment`
*/

// GAME
//==============================================================================

function main() {
  // console.log("starting game in main");
  var guessResult = [];
  var gameStatus = "continue";
  var gameNotOver = true;
  setUpGame();
  // start looping
    document.onkeyup = function(e) {
      // console.log("it's on!");
      userGuess = getUserGuess(e);
      // console.log("userGuess is: " + userGuess);
      // TODO: needs code to reject non-letter characters
      // TODO: needs code to reject letters that have been guessed before
      guessResult = getResult(userGuess);
      // console.log("guessResult is: " + guessResult);
      updateGameState(guessResult);
      gameStatus = continueOrEndGame();
      // console.log("gameStatus is: " + gameStatus);
      yayOrNay(gameStatus);
      // game not over, so loop around
    } // end of onkeyup function
} // end of main