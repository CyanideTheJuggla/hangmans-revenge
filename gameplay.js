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
    //remove hide class from quote box
    $('#word-quote').removeClass('hide');
    //set hangman game stats to 0
    hangman.wrongAnswers = 0;
    hangman.rightAnswers = 0;
    //kill timer if it exists, remove definition for reassignment, reset time elapsed
    clearInterval(timer);
    timer = undefined;
    timeElapsed = 0;
    setTimeout(hangmanMove, 120);
}

const animatedScreenFade = (fadeOut, fadeIn) => {
    //fade passed class selector
    const fadeOutEl = $('.' + fadeOut);
    const fadeInEl = $('.' + fadeIn)
    fadeOutEl.animate({ opacity: 0.0 }, 200, () => {
        //remove it so it doesn't cause issues
        fadeOutEl.css('display', 'none');
        fadeOutEl.removeClass('is-active');
    });
    //fade in and display passed class selector
    fadeInEl.css('display', 'block');
    fadeInEl.animate({ opacity: 1 }, 500);
}

const timeKeep = () => {
    timeElapsed += 100;
    $('.timeElapsed').html(new Date(0,0,0,0,0,0,timeElapsed).toLocaleTimeString().substring(3,8));
}

const start = () => {
    generateKeys(); //generate keys
    animatedScreenFade('modal', 'gameWindow'); //animated screen fade out/in
    resetState(); //reset states
    populateWord(); //populate word blanks
    timer = setInterval(timeKeep, 100); //keep track of elapsed time for scoring
}

const end = () => {
    $('.letter-button').off('click'); //destroy click events for buttons
    animatedScreenFade('gameWindow', 'endModal'); //fade out and remove game window
}

 function populateWord(){
    $('#letter-spaces span.cont').html(''); //destroy anything in wordContainer
    console.log('currentWord', currentWord); //split word into array
    wordLetters = currentWord.word.split('');
    console.log('wordLetters', wordLetters);
    for (let i = 0; i < wordLetters.length; i++) {
        //console.log(wordLetters[i]);
        const blank_ = document.createElement('p'); //populate blanks for each letter within their own span element
        blank_.setAttribute('data-position', i);
        blank_.textContent = '_'
        $('#letter-spaces span.cont').append(blank_); //add blank_ to wordContainer
    };

}

const generateKeys = () =>{
    $('#letter-buttons').html('');
    let row;
    for (let i = 0; i < alphabet.length; i++) {
        const inputValue = alphabet[i].toLowerCase();
        const btn = document.createElement('button'); //create button element
        btn.setAttribute('data-letter', inputValue); //add input value to button
        btn.innerHTML = inputValue;
        btn.className = 'btn letter-button is-size-5-mobile is-size-3-tablet'; //set css classes
        btn.onclick = letterKey; //add click event
        if(i == 0 || i == 9 || i == 18) { //3 rows of ~9 keys
            row = document.createElement('div'); 
            row.className = 'buttonContainer';
            document.getElementById('letter-buttons').appendChild(row);
        }
        row.appendChild(btn);
    }
}

const letterKey = (e) => {
    const playerInput = e.target.dataset.letter; //get letter from dataset
    //console.log('Fired letterKey');
    checkInput(playerInput) ? //check if it's correct or not
        correctAnswer(playerInput) :  //send the input where it needs to go
        wrongAnswer();
    $(e.target).attr('disabled', true); //disable the key
}

const checkInput = (inputValue) => {
    inputValue = inputValue.toLowerCase();
    //console.log('checkInput(inputVal)', inputValue);
    //console.log('wordLetters', wordLetters);
    //console.log('wordLetters.includes(inputValue)', wordLetters.includes(inputValue));
    return wordLetters.includes(inputValue);
}

const correctAnswer = (playerInput) =>{;
    const pos = [];
    const wordArry = currentWord.word.split('');
    for (let p = 0; p < wordArry.length; p++) {
        const element = wordArry[p]; //find each position of the correct input
        //console.log('element', element);
        //console.log('playerInput', playerInput);
        if(element == playerInput) pos.push(p); //add to array
    }
    console.log('Correct at: ' + pos.length + ' position' + (pos.length == 1 ? '' : 's'));
    for (let i = 0; i < pos.length; i++) { //swap blank for letter at each position in pos array
        const element = pos[i];
        console.log(element);
        $('p[data-position="' + element + '"]').html(playerInput);
        hangman.rightAnswers++; //increase rightanswers on score card per correct letter
    }
    if (hangman.rightAnswers >= currentWord.word.length) { //if we have all the letters, we win!
        win();
    }
}

const wrongAnswer = () => {
    insult();
    //console.log('WRONG');
    hangman.wrongAnswers++;//add strike to scorecard
    hangmanMove();//add to hangman
    if(hangman.wrongAnswers == 6){ //hangman has 6 parts, so if we've hung hangman then we lose
        lose();
    }
    
}

const calculateScore = () => {
    hangman.timeElapsed = timeElapsed / 1000;
    //score calculation
    const score = (Math.round(
            (hangman.rightAnswers - hangman.wrongAnswers) / hangman.timeElapsed)
        ) * currentWord.score;
    //console.log('score', score);
    //creating score elements
    const right = document.createElement('p');
    right.textContent = 'Right Answers: ' + hangman.rightAnswers;
    const wrong = document.createElement('p');
    wrong.textContent = 'Wrong Answers: ' + hangman.wrongAnswers
    const time = document.createElement('p');
    time.textContent = 'Time: ' + hangman.timeElapsed;
    const wordScore = document.createElement('p');
    wordScore.textContent = 'Word Score: ' + currentWord.score;
    const calcContainer = document.createElement('span');
    calcContainer.textContent = 'Calculation: ';
    const calc = document.createElement('p');
    calc.textContent = `((Right Answers [${hangman.rightAnswers}] - Wrong Answers [${hangman.wrongAnswers}]) / Time Elapsed [${hangman.timeElapsed }]) * Word Score [${currentWord.score}] `;
    const totalScore = `Total: ${score.toFixed(0)} points`
    //attaching score elements
    const scoreSheet = $('#score');
    scoreSheet.html('');
    scoreSheet.append(right);
    scoreSheet.append(wrong);
    scoreSheet.append(time);
    scoreSheet.append(wordScore);
    scoreSheet.append(document.createElement('hr'));
    calcContainer.append(calc);
    scoreSheet.append(calcContainer);
    scoreSheet.append(document.createElement('hr'));
    scoreSheet.append(totalScore);
    scoreSheet.prepend('Score:')
}

const win = () => {
    $('.letter-button').attr('disabled', true);
    console.log('WIN! \nDictionaryAPI.getDefinition(currentWord)');
    $('#endTitle').html('Win!');
    calculateScore();
    setTimeout(end, 1000);
}

const lose = () => {
    $('.letter-button').attr('disabled', true);
    $('#endTitle').html('Game Over');
    calculateScore();
    //console.log('You lost, you suck.\nDictionaryAPI.getDefinition(currentWord)');
    setTimeout(end, 1000);
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
    $('.stickman_parts').attr('src', hangman.imgSrc[hangman.wrongAnswers]);
        //.css('height', '359px')
        //.css('width', '170px');
};

console.log('gameplay.js: OK!');