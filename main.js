//modal
var playBtn = document.getElementById("play-button");
var modalEl = document.getElementById("play-modal");

var play = () => {
    modalEl.classList.remove("is-active");

    //generate new word from dictionary api
    //create letter spaces 
}

playBtn.addEventListener("click", play);

//set timer
let timeElapsed = 0;
let timer;

//set word letter spaces variable
let wordLetters;

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

const hangmanMove = () => {
    //swap out the image and makes sure the dimensions are set
    $('.stickman_parts')
        .attr('src', hangman.imgSrc[hangman.wrongAnswers])
};

//stolen from the internet, generates an array of the alphabet.
const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));

const insult = () => {
    //insult
    const insult = getInsult();
    const insultDiv = document.getElementById("")
    insultDiv.className = 'insultContainer';
    insultDiv.setAttribute('style', 'display: flex; justify-content: center;');
    insultDiv.textContent += insult;
    $('#clue-insult').append(insultDiv);
}




$(document).ready(()=>{
    getRandomCategory();
});

console.log(GIPHY_API.pathURL);
//console.log(EvilInsultAPI.pathURL);
console.log(DictionaryAPI.pathURL);

console.log('main.js: OK!');


$('#clue').on("click", function() {
    getGif(currentWord.word);
});
$('#new-word').on("click", getRandomCategory);

$('.startButton').click(start);