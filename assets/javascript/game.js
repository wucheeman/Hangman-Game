// initialize variables
// TODO: start with single word, grow to 10 word array and as a stretch, use a file of words
var words = ['bat'];
var lengthOfWord = words.length;
var wrongGuessesLeft = words.length;
var lettersGuessed = [];
var numLettersKnown = 0;
var guessedSoFar = '';

// Define functions

// function celebrateWin
// play happy sound and display congratulations

// function declareLoss
// play sad sound and commiserate

// function gameInfo -- displays initial and updated info on game
//  how many letters in word
//  how many wrong guesses left
//  letters guessed
//  prompt user to press a key

// getRandomWord
// computer selects word at random from words and returns it

// function getUserGuess
/// get user keypress
// accept upper or lower case letters; convert upper case to lower case
// reject non-letters and prompt for a letter

// function guessResult
// take user guess and compare with word
// if letter in word one or more times, update guessedSoFar and numLettersKnown
// if letter not in word, update wrongGuessesLeft
// if numLettersKnown = lengthOfWord, call celebrateWin
// if wrongGuessesLeft = 0, call declareLoss
// else continue loop

// Game
// display welcome to game
// Get key press to start game loop
document.onkeyup = function(event) {

// computer gets word from getRandomWork

// display initial info via call to gameInfo

// get user input via getUserGuess

// determine outcome of guess via guessResult

} // end of game loop started at onkeyup

// TODO: convert to object
// TODO: use to drive color coding of blocks
// TODO: extend to some theme
// TODO: use window.onload and init rather than onkeyup