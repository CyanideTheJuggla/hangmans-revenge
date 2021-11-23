//play modal
var playBtn = document.getElementById("play-button");
var playModalEl = document.getElementById("play-modal");
var endModalEl = document.getElementById("end-modal");
var highScoresBtn = document.getElementById("high-scores-btn");
var playAgainBtn = document.getElementById("play-again-btn");

var play = () => {
    document.getElementById("play-modal").classList.remove("is-active");
    getRandomCategory();
}

// var endGame = () => {
//     endModalEl.classList.add("is-active");
// }

playBtn.addEventListener("click", play);



const stickman = {
    height: 360, 
    width: 169, 
    imgSrc: [
        'assets/img/Hangman_post.png',
        'assets/img/Hangman1.png',
        'assets/img/Hangman2.png',
        'assets/img/Hangman3.png',
        'assets/img/Hangman4.png',
        'assets/img/Hangman5.png',
        'assets/img/Hangman6.png'
    ],
    imgPoint: 0
};

const hangmanMove = () => {
    stickman.imgPoint++;
    if(stickman.imgPoint < stickman.imgSrc.length) {
        $('.stickman_parts').css('background-image', `url("${stickman.imgSrc[stickman.imgPoint]}")`);
        //bgx = Number.parseInt(bgx.substring(0, bgx.length - 2));
        //$('.stickman_parts').css('background-position-x', (bgx + stickman.width) + 'px');
        console.log($('.stickman_parts').css('background-image'));
    } else {
        console.log('END');
    }
};





var clueInsultDivEl = document.getElementById("clue-insult");
var currentWord;

console.log('main.js: OK!');


$(document).ready(()=>{
    console.log('launching document.ready');
    
});

$('#clue').on("click", function() {
    getGif(currentWord.word);
});
$('#new-word').on("click", getRandomCategory);
$('.letter-button').on('click', letterKey)
playBtn.addEventListener("click", play);
