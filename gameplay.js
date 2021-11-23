//scorecard. stores image source links, right answers, wrong answers, and the round time 
const hangman = {
    imgSrc: [
        'assets/img/empty.png',
        'assets/img/Stickman1.png',
        'assets/img/Stickman2.png',
        'assets/img/Stickman3.png',
        'assets/img/Stickman4.png',
        'assets/img/Stickman5.png',
        'assets/img/Stickman6.png'
    ],
    rightAnswers: 0,
    wrongAnswers: 0
};

//stolen from the internet, generates an array of the alphabet.
const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));

const testWord = "HIPPOPOTAMUS";

//let currentWord;

const start = () => {
    //generate keys
    generateKeys();
    //set hangman game stats to 0
    hangman.wrongAnswers = 0;
    hangman.rightAnswers = 0;
    hangmanMove();
    //set up click events
    $('.button').click = letterKey;
    //remove disabled attributes from previous game  
    $('.button').attr('disabled', false);
    //populate word blanks
    populateWord(testWord);
    //fade start button
    const startButton = $('.startContainer');
    startButton.animate({ opacity: 0.0 }, 750, () => {
        //remove it so it doesn't cause issues
        startButton.css('display', 'none');
    });
    //fade in and display game window
    $('.gameWindow').css('display', 'block');
    $('.gameWindow').animate({ opacity: 1 }, 250);
}

const end = () => {
    //destroy click events for buttons
    $('.button').off('click');
    const startButton = $('.startContainer');
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
    $('.wordContainer').html('');
    //split word into array
    //console.log('currentWord', currentWord);
    const wordLetters = currentWord.word.split('');
    //console.log('wordLetters', wordLetters);
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
    $('.buttonParent').html('');
    let row;
    for (let i = 0; i < alphabet.length; i++) {
        const inputValue = alphabet[i].toUpperCase();
        //create button element
        const btn = document.createElement('button');
        //add input value to button
        btn.setAttribute('data-letter', inputValue);
        btn.innerHTML = inputValue;
        //set css class
        btn.className = 'button';
        //add click event
        btn.onclick = letterKey;
        if(i == 0 || i == 9 || i == 18) {
            //3 rows of ~9 keys
            row = document.createElement('div');
            row.className = 'buttonContainer';
            document.getElementsByClassName('buttonParent')[0].appendChild(row);
        }
        row.appendChild(btn);
    }
}

const letterKey = (e) => {
    //get letter from dataset
    const playerInput = e.target.dataset.letter;
    //check if it's correct or not
    const IsCorrect = checkInput(playerInput);
    //send the input where it needs to go
    IsCorrect ? 
        correctAnswer(playerInput) : 
        wrongAnswer();
    //disable the key
    $(e.target).attr('disabled',true);
}

const checkInput = (inputValue) => {
    console.log('checkInput(inputVal)', inputValue);
    return currentWord.includes(inputValue);
}

const correctAnswer = (playerInput) =>{;
    const pos = [];
    for (let p = 0; p < currentWord.length; p++) {
        //find each position of the correct input
        const element = currentWord[p];
        //add to array
        if(element == playerInput) pos.push(p);
    }
    console.log('Correct at: ' + pos.length + ' position' + (pos.length == 1 ? '' : 's'));
    //swap blank for letter at each position in pos array
    for (let i = 0; i < pos.length; i++) {
        const element = pos[i];
        console.log(element);
        $('span[data-position="' + element + '"]').html(playerInput);
        //increase rightanswers on score card per correct letter
        hangman.rightAnswers++
    }
    //if we have all the letters, we win!
    if (hangman.rightAnswers >= currentWord.length) {
        win();
    }
}

const wrongAnswer = () => {
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
    //TODO
    console.log('WIN! \nDictionaryAPI.getDefinition(currentWord)');
    setTimeout(end, 1500);//just for now
}

const lose = () => {
    //TODO
    $('.button').attr('disabled', true);
    console.log('You lost, you suck.\nDictionaryAPI.getDefinition(currentWord)');
    setTimeout(end, 1500);//just for now
}

const insult = () => {
    //TODO
    console.log('EvilInsultAPI.getInsult()');
}

const hint = () => {
    //TODO
    console.log('GIPHY_API.getGif(currentWord)');
};

const hangmanMove = () => {
    //swap out the image and makes sure the dimensions are set
    $('.stickman_parts')
        .attr('src', hangman.imgSrc[hangman.wrongAnswers])
        .css('height', '359px')
        .css('width', '170px');
};

console.log('gameplay.js: OK!');