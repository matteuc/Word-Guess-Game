var wins = 0;
var guesses, num_blanks;
var revealed = [];
var bank = [];
var curr_word = "";

// update win counter
function updateWins() {
    wins++;
    document.getElementById('win-counter').innerHTML = wins;
}

// update guess counter
function updateGuesses() {
    document.getElementById('guess-counter').innerHTML = guesses;
}

function displayMessage(curr_word, win) {
    var elem = document.getElementById('instructions');
    var word = document.getElementById('blanks');
    if (win) {
        elem.innerHTML = "You won!\n\nPress any key to play again.";
    } else {
        elem.innerHTML = "You lost!\n\nPress any key to play again";
        word.innerHTML = curr_word;
        num_blanks = 0;
    }
}

// Print the appropriate number of blanks for the current word
function printBlanks(word) {
    var elem = document.getElementById('blanks');
    elem.innerHTML = "";

    for (var i = 0; i < word.length; i++) {
        if (word[i] === ' ') {
            elem.innerHTML += "\xa0\xa0\xa0";
            num_blanks--;
        } else {
            elem.innerHTML += "__";
        }
        
        !(i === word.length - 1) ? elem.innerHTML += '\xa0': ''
    }

}
// Reveal letters within word if letter is in current word
function revealLetters(word, letter) {
    var elem = document.getElementById('blanks');
    elem.innerHTML = "";
    revealed.push(letter);

    for (var i = 0; i < word.length; i++) {
        if (revealed.includes(word[i]) && word[i] !== " ") {
            elem.innerHTML += word[i];
            word[i] === letter ? num_blanks-- : '';
        } else if (word[i] === " ") {
            console.log("test");
            elem.innerHTML += "\xa0";
        } else {
            elem.innerHTML += "__";
        }

        !(i === word.length - 1) ? elem.innerHTML += '\xa0': ''
    }

}
// Add letter to word bank if letter is not in current word
function addToBank(letter) {
    var elem = document.getElementById('letter-bank');
    elem.innerHTML += ' ' + letter;
    bank.push(letter);
    guesses--;
    updateGuesses();
}

function resetBank() {
    var elem = document.getElementById('letter-bank');
    elem.innerHTML = "";
}

function newRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function changeImage(newSrc) {
    document.getElementById('word-image').src = newSrc;
}

var puppy_words = ["corgi", "pug", "beagle", "husky", "chow chow", "golden retriever", "poodle", "french bulldog", "border collie"];

document.onkeyup = function (event) {
    // Set a new word if one does not already exist or all blanks have been filled
    if (curr_word === "" || num_blanks === 0) {
        curr_word = newRandomWord(puppy_words);
        num_blanks = curr_word.length;
        printBlanks(curr_word);
        guesses = curr_word.length * 2;
        updateGuesses();
        revealed = [];
        bank = [];
        resetBank();
    }

    var letter = event.key.toLowerCase();
    // Reveal letters if entered key is within current word
    (curr_word.includes(letter) && !revealed.includes(letter)) ? revealLetters(curr_word, letter): (!bank.includes(letter) && !revealed.includes(letter)) ? addToBank(letter) : '';


    if (num_blanks === 0 && guesses !== 0) {
        //Display Victory Messaage
        displayMessage(curr_word, true);
        updateWins();
        changeImage("assets/images/" + curr_word + ".jpg");
    } else if (guesses === 0) {
        //Display Defeat Message
        displayMessage(curr_word, false);
        changeImage("assets/images/" + curr_word + ".jpg");
    }


}