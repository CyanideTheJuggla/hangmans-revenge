//scorecard. stores image source links, right answers, wrong answers, and the round time 
const hangman = {
    imgSrc: [
        './assets/img/Hangman_post.png',
        './assets/img/Hangman1.png',
        './assets/img/Hangman2.png',
        './assets/img/Hangman3.png',
        './assets/img/Hangman4.png',
        './assets/img/Hangman5.png',
        './assets/img/Hangman6.png'
    ],
    rightAnswers: 0,
    wrongAnswers: 0,
    roundTime: 0
};

let timeElapsed = 0;
let timer;
let wordLetters;

//stolen from the internet, generates an array of the alphabet.
const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));

const testWord = "HIPPOPOTAMUS";

const resetState = () => {
    //remove clues/insults
    $('#clue-insult div').remove();
    //set hangman game stats to 0
    hangman.wrongAnswers = 0;
    hangman.rightAnswers = 0;
    //kill timer if it exists, remove definition for reassignment, reset time elapsed
    clearInterval(timer);
    timer = undefined;
    timeElapsed = 0;
    hangmanMove();
}

const animatedScreenFade = () => {
    //fade start modal
    const startButton = $('#play-modal');
    startButton.animate({ opacity: 0.0 }, 750, () => {
        //remove it so it doesn't cause issues
        startButton.css('display', 'none');
        startButton.removeClass('is-active');
    });
    //fade in and display game window
    $('.gameWindow').css('display', 'block');
    $('.gameWindow').animate({ opacity: 1 }, 250);
}

const timeKeep = () => {
    timeElapsed += 100;
    $('.timeElapsed').html(new Date(0,0,0,0,0,0,timeElapsed).toLocaleTimeString().substring(3,8));
}

const start = () => {
    generateKeys();//generate keys
    resetState();//reset states
    populateWord(testWord);//populate word blanks
    animatedScreenFade();//animated start screen
    
    //keep track of elapsed time for scoring
    timer = setInterval(timeKeep, 100)
}

const end = () => {
    wordList.push(currentWord);
    saveWords();
    //destroy click events for buttons
    $('.letter-button').off('click');
    const startButton = $('#play-modal');
    //show and fade in start button
    startButton.css('display', 'block');
    startButton.animate({ opacity: 1.0 }, 750);
    //fade out and remove game window
    $('.gameWindow').animate({ opacity: 0 }, 250,  ()=>{
        $('.gameWindow').css('display', 'none');
    });
}

 function populateWord(){
    //destroy anything in wordContainer
    $('#letter-spaces span.cont').html('');
    //split word into array
    console.log('currentWord', currentWord);
    wordLetters = currentWord.word.split('');
    console.log('wordLetters', wordLetters);
    for (let i = 0; i < wordLetters.length; i++) {
        //console.log(wordLetters[i]);
        //populate blanks for each letter within their own span element
        const blank_ = document.createElement('p');
        blank_.setAttribute('data-position', i);
        blank_.textContent = '_'
        //add blank_ to wordContainer
        $('#letter-spaces span.cont').append(blank_);
    };

}

const generateKeys = () =>{
    $('#letter-buttons').html('');
    let row;
    for (let i = 0; i < alphabet.length; i++) {
        const inputValue = alphabet[i].toLowerCase();
        //create button element
        const btn = document.createElement('button');
        //add input value to button
        btn.setAttribute('data-letter', inputValue);
        btn.innerHTML = inputValue;
        //set css class
        btn.className = 'btn letter-button is-size-5-mobile is-size-3-tablet';
        //add click event
        btn.onclick = letterKey;
        if(i == 0 || i == 9 || i == 18) {
            //3 rows of ~9 keys
            row = document.createElement('div');
            row.className = 'buttonContainer';
            document.getElementById('letter-buttons').appendChild(row);
        }
        row.appendChild(btn);
    }
}

const letterKey = (e) => {
    //get letter from dataset
    const playerInput = e.target.dataset.letter;
    console.log('Fired letterKey');
    //check if it's correct or not
    const IsCorrect = checkInput(playerInput);
    //send the input where it needs to go
    IsCorrect ? 
        correctAnswer(playerInput) : 
        wrongAnswer();
    //disable the key
    $(e.target).attr('disabled', true);
}

const checkInput = (inputValue) => {
    inputValue = inputValue.toLowerCase();
    console.log('checkInput(inputVal)', inputValue);
    console.log('wordLetters', wordLetters);
    console.log('wordLetters.includes(inputValue)', wordLetters.includes(inputValue));
    return wordLetters.includes(inputValue);
}

const correctAnswer = (playerInput) =>{;
    const pos = [];
    const wordArry = currentWord.word.split('');
    for (let p = 0; p < wordArry.length; p++) {
        //find each position of the correct input
        const element = wordArry[p];
        console.log('element', element);
        console.log('playerInput', playerInput);
        //add to array
        if(element == playerInput) pos.push(p);
    }
    console.log('Correct at: ' + pos.length + ' position' + (pos.length == 1 ? '' : 's'));
    //swap blank for letter at each position in pos array
    for (let i = 0; i < pos.length; i++) {
        const element = pos[i];
        console.log(element);
        $('p[data-position="' + element + '"]').html(playerInput);
        //increase rightanswers on score card per correct letter
        hangman.rightAnswers++
    }
    //if we have all the letters, we win!
    if (hangman.rightAnswers >= currentWord.word.length) {
        win();
    }
}

const wrongAnswer = () => {
    insult();
    console.log('WRONG');
    //add strike to scorecard
    hangman.wrongAnswers++;
    //add to hangman
    hangmanMove();
    //hangman has 6 parts, so if we've hung hangman then we lose
    if(hangman.wrongAnswers == 6){
        lose();
    }
    
}

const win = () => {
    wordList.push(currentWord);
    saveWords();
    endGame();
    //TODO
    console.log('WIN! \nDictionaryAPI.getDefinition(currentWord)');
    setTimeout(end, 1500);//just for now
}

const lose = () => {
    wordList.push(currentWord);
    saveWords();
    endGame();
    //TODO
    $('.letter-button').attr('disabled', true);
    console.log('You lost, you suck.\nDictionaryAPI.getDefinition(currentWord)');
    setTimeout(end, 1500);//just for now
}

const insult = () => {
    //insult
    $('.insultContainer').remove();
    const insult = getInsult();
    const insultDiv = document.createElement('div');
    insultDiv.className = 'insultContainer';
    insultDiv.setAttribute('style', 'display: flex; justify-content: center;');
    insultDiv.textContent += insult;
    $('#clue-insult').append(insultDiv);
}

const hangmanMove = () => {
    //swap out the image and makes sure the dimensions are set
    $('.stickman_parts')
        .attr('src', hangman.imgSrc[hangman.wrongAnswers])
        .css('height', '359px')
        .css('width', '170px');
};

console.log('gameplay.js: OK!');