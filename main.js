var clueInsultDivEl = document.getElementById("clue-insult");
var currentWord;


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