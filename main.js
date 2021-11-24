//modals
var playBtn = document.getElementById("play-button");
var playModalEl = document.getElementById("play-modal");
var endModalEl = document.getElementById("end-modal");
var highScoresBtn = document.getElementById("high-scores-btn");
var playAgainBtn = document.getElementById("play-again-btn");

var clueInsultDivEl = document.getElementById("clue-insult");
var currentWord;

var play = () => {
    document.getElementById("play-modal").classList.remove("is-active");
    console.log('fired');
    getRandomCategory();
    generateKeys(); //generate keys
}

const end = () => {
    //destroy click events for buttons
    $('.letter-button').off('click');
    //hide page content
    var pageEl = document.getElementById("main-page-content");
    pageEl.classList.add("hide");
   //display endModal El 
    endModalEl.setAttribute("class", "is-active");
    showDef();
    var playAgain = () => {
        endModalEl.classList.add("hide");
        pageEl.classList.remove("hide");
        
    }
    start();
    playAgainBtn.addEventListener("click", playAgain);
}

$(document).ready(()=>{
    console.log('launching document.ready');
    
});

$('#clue').on("click", function() {
    getGif(currentWord.word);
});
$('#new-word').on("click", getRandomCategory);
$('.letter-button').on('click', letterKey)
$('#play-button').on('click', play);