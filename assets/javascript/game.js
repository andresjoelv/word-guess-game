// references to DOM elements
var $wins = document.getElementById('wins');
var $placeHolders = document.getElementById('placeholders');
var $guessesLeft = document.getElementById('guesses-left');
var $guessedLetters = document.getElementById('guessed-letters');
var $message = document.getElementById('message');
var $songImg = document.getElementById('song-img');

var audio = new Audio('assets/mp3/Numb.mp3');


// Create game object

var game = {
    wordBank: ['Numb', 'In-the-End', 'New-Divide', "What-I-have-Done", 'Crawling', 'Burn-It-Down'],
    wins : 0,
    guessesLeft : 12,
    pickedWord : "",
    userGuess : "",
    pickedWordPlaceHolderArr : [],
    guessedLetterBank : [],
    letterGuess(letter) {
        if(this.guessedLetterBank.indexOf(letter) === -1){
            this.guessedLetterBank.push(letter);
    
            // check
            for(var i = 0; i < this.pickedWord.length; i++){
                 if(this.pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                     this.pickedWordPlaceHolderArr[i] = this.pickedWord[i];
                 }
            }
            $placeHolders.innerHTML = game.pickedWordPlaceHolderArr.join(' ');

            this.checkIncorrect(letter);
        } else {
            $message.textContent = 'you already guessed that letter, try a new one';
        }
    },
    checkIncorrect(letter) {
        // if incorrect
        if(this.pickedWordPlaceHolderArr.indexOf(letter.toLowerCase()) === -1 && this.pickedWordPlaceHolderArr.indexOf(letter.toUpperCase()) === -1){
            this.guessesLeft--;
            // write to DOM 
            $guessesLeft.textContent = this.guessesLeft;
            $guessedLetters.textContent = this.guessedLetterBank.join(' ');
        }
        this.checkLoss();
    },
    checkLoss(){
        if(this.guessesLeft === 0){
            alert('You lost! the word was: ' + this.pickedWord);
            this.reset();
        }
        this.checkWin();
    },
    checkWin() {
        console.log(this.pickedWord.toLowerCase());
        console.log(this.pickedWordPlaceHolderArr.join('').toLowerCase());
        if(this.pickedWord.toLowerCase() === this.pickedWordPlaceHolderArr.join('').toLowerCase()){
            alert('you win!the word was: ' + this.pickedWord);
            audio.pause();
            audio.currentTime = 0;
            this.reset();
        }
    },
    reset() {
        audio = new Audio('assets/mp3/' + this.pickedWord + '.mp3');
        audio.play();
        this.pickedWordPlaceHolderArr = [];
        this.pickedWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        console.log(game.pickedWord);
        for(var i = 0; i < this.pickedWord.length; i++) {
            if(this.pickedWord[i] === '-') {
                this.pickedWordPlaceHolderArr.push('-');
            }
            else {
                this.pickedWordPlaceHolderArr.push('_');
            }
        }
        this.guessesLeft = 12;
        this.guessedLetterBank = [];
        $placeHolders.textContent = this.pickedWordPlaceHolderArr.join(' ');
        $guessedLetters.textContent = "";
        $guessesLeft.textContent = this.guessesLeft;
    }
};


game.pickedWord = game.wordBank[Math.floor(Math.random() * game.wordBank.length)];
console.log(game.pickedWord);
for(var i = 0; i < game.pickedWord.length; i++) {
    if(game.pickedWord[i] === '-') {
        game.pickedWordPlaceHolderArr.push('-');
    }
    else {
        game.pickedWordPlaceHolderArr.push('_');
    }
}
$placeHolders.innerHTML = game.pickedWordPlaceHolderArr.join(' ');


// Detect key down
document.onkeyup = function(event) {
    $message.textContent = "-";
    //audio.play();

    // check if it's a letter
    if(event.keyCode >= 65 && event.keyCode <= 90) {
        game.letterGuess(event.key);
    }
    else{
        alert("that's not a letter!");
    }
}