const hangman = {
    height: 360, 
    width: 169, 
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

const start = (event) => {
    hangman.wrongAnswers = 0;
    hangman.rightAnswers = 0;
    hangmanMove();
    $('.button').click = letterKey;
    $('.button').attr('disabled', false)
    const startButton = $('.startContainer');
    startButton.animate({ opacity: 0.0 }, 750, () => {
        startButton.css('display', 'none');
    });
    $('.gameWindow').css('display', 'block');
    $('.gameWindow').animate({ opacity: 1 }, 250);
}

const end = () => {
    $('.button').off('click');
    const startButton = $('.startContainer');
    startButton.css('display', 'block');
    startButton.animate({ opacity: 1.0 }, 750);
    $('.gameWindow').animate({ opacity: 0 }, 250,  ()=>{
        $('.gameWindow').css('display', 'none')
    });
}

const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));

const testWord = "HIPPOPOTAMUS";
let currentWord;

const populateWord = (word) => {
    currentWord = word.split('');
    for (let i = 0; i < currentWord.length; i++) {
        const span = document.createElement('span');
        span.setAttribute('data-position', i);
        span.textContent = '_'
        document.getElementsByClassName('wordContainer')[0].appendChild(span);
    };
}

const generateKeys = () =>{
    let row;
    for (let i = 0; i < alphabet.length; i++) {
        const element = alphabet[i].toUpperCase();;
        const btn = document.createElement('button');
        btn.setAttribute('data-letter', element);
        btn.innerHTML = element;
        btn.className = 'button ';
        btn.onclick = letterKey;
        if(i == 0 || i == 9 || i == 18) {
            row = document.createElement('div');
            row.className = 'buttonContainer';
            document.getElementsByClassName('buttonParent')[0].appendChild(row);
        }
        row.appendChild(btn);
    }
    populateWord(testWord);
}

const letterKey = (e) => {
    const playerInput = $(e.target).attr('data-letter');
    const IsCorrect = checkInput(playerInput);
    IsCorrect ? correctAnswer(playerInput) : wrongAnswer();
    $(e.target).attr('disabled',true);

}

const checkInput = (inputValue) => {
    console.log('checkInput(inputVal)', inputValue);
    return currentWord.includes(inputValue);
}

const correctAnswer = (playerInput) =>{
    hangman.rightAnswers++;
    const pos = [];
    for (let p = 0; p < currentWord.length; p++) {
        const element = currentWord[p];
        if(element == playerInput) pos.push(p);
    }
    console.log('Correct at: ' + pos.length + ' position' + (pos.length == 1 ? '' : 's'));
    for (let i = 0; i < pos.length; i++) {
        const element = pos[i];
        console.log(element);
        $('span[data-position="' + element + '"]').html(playerInput);
    }
    if (hangman.rightAnswers >= currentWord.length) {
        win();
    }
}

const lose = () => {
    console.log('You lost, you suck.\nDictionaryAPI.getDefinition(currentWord)');
    setTimeout(end, 1500);
}

const win = () => {
    console.log('WIN! \nDictionaryAPI.getDefinition(currentWord)');
}

const insult = () => {
    console.log('EvilInsultAPI.getInsult()');
}

const hint = () => {
    console.log('GIPHY_API.gifHint(currentWord)');
}

const wrongAnswer = () => {
    console.log('WRONG');
    hangman.wrongAnswers++;
    hangmanMove();
    console.log('hangman.wrongAnswers', hangman.wrongAnswers);
    if(hangman.wrongAnswers == 6){
        lose();
    }
}

const hangmanMove = () => {
    $('.stickman_parts').attr('src', hangman.imgSrc[hangman.wrongAnswers]).css('height', '359px').css('width', '170px');
};

/*
width: 170px;
height: 359px;
*/

$(document).ready(()=>{
    $('.startButton').click(start);
});
console.log('main.js: OK!');
