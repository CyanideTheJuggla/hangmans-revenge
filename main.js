//modals
var playBtn = document.getElementById("play-button");
var playModalEl = document.getElementById("play-modal");
var endModalEl = document.getElementById("end-modal");
var highScoresBtn = document.getElementById("high-scores-btn");
var playAgainBtn = document.getElementById("play-again-btn");

var clueInsultDivEl = document.getElementById("clue-insult");
var currentWord;

// function called when play button clicked
var play = () => {
    // removes the modal showing the play button before start of game
    document.getElementById("play-modal").classList.remove("is-active");
    // removes the end game modal if showing
    endModalEl.classList.remove("is-active");
    // calls the function to get a random category and word and starts the game
    getRandomCategory();
    
}

// end game function
var endGame = () => {
    // shows the end game modal
    endModalEl.classList.add("is-active");
    // calls the function to show the previously played words
    showWordButtons();
}


// listeners for when buttons are clicked
$('#clue').on("click", function() {
    getGif(currentWord.word);
});
$('#new-word').on("click", getRandomCategory);
$('.letter-button').on('click', letterKey)
$('#play-button').on('click', play);
$('#play-again-btn').on('click', play);

// loads the words from local storage into wordList array
loadWords();
