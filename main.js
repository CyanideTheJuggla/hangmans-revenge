var clueInsultDivEl = document.getElementById("clue-insult");
var currentWord;

const stickman = {
    height: 360, 
    width: 169, 
    imgSrc: [
        'assets/img/StickmanFull.png',
        'assets/img/Stickman1.png',
        'assets/img/Stickman2.png',
        'assets/img/Stickman3.png',
        'assets/img/Stickman4.png',
        'assets/img/Stickman5.png',
        'assets/img/Stickman6.png'
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