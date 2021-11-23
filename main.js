//modal
var playBtn = document.getElementById("play-button");


var play = () => {
    document.getElementById("play-modal").classList.remove("is-active");
    getRandomCategory();
}


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
