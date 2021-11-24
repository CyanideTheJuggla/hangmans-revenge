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
    endModalEl.classList.remove("is-active");
   //console.,log('fired');
    getRandomCategory();
    
}

var endGame = () => {
    endModalEl.classList.add("is-active");
    showWordButtons();
}

var clueInsultDivEl = document.getElementById("clue-insult");
var currentWord;

$(document).ready(()=>{
   //console.,log('launching document.ready');
    
});

$('#clue').on("click", function() {
    getGif(currentWord.word);
});
$('#new-word').on("click", getRandomCategory);
$('.letter-button').on('click', letterKey)
$('#play-button').on('click', play);
$('#play-again-btn').on('click', play);

loadWords();
