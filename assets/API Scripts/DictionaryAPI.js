/* Using DataMuse API to get word lists */
/* https://www.datamuse.com/api/        */

// Array of categories for words
var categoryArray = ['art', 'astronomy', 'animal', 'color', 'cooking', 'emotion', 'holiday', 'music', 'science', 'vehicle', 'weather'];
//var currentWord;

var wordList = [];

const DictionaryAPI = {
    getRandomWord: getRandomWord
};

var randNum = function(max, min = 0) {
    var num = Math.floor(Math.random() * (max - min) + min);
    return num;
};


var getRandomWord = function(category) {
    var apiUrl = "https://api.datamuse.com/words?rel_trg=" + category + "&md=d";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var maxLength = data.length;
                var randomNum = randNum(maxLength);
                var randWord = (data[randomNum]);
                while(randWord.word.length < 6) {
                    randomNum = randNum(maxLength);
                    randWord = data[randomNum];
                }
                console.log(randWord);
                currentWord = randWord;
                return randWord;
                
            });
        } else {
            var alertText = document.createElement("p");
            alertText.textContent = "Word could not be retrieved";
        }
    });
};

var getRandomCategory = function() {
    var randomNum = randNum(categoryArray.length);
    var randCat = categoryArray[randomNum];
    console.log(randCat);
    var randomWord = getRandomWord(randCat);
    return randomWord;
};

var getDefinition = function() {
    console.log(currentWord);
    var defDiv = document.createElement("div");
    var defListEl = document.createElement("ul");
    defDiv.appendChild(defListEl);
    for ( var i = 0; i < currentWord.defs.length; i++) {
        console.log(currentWord.defs[i]);
        var def = document.createElement("p");
        def.setAttribute("id", "def-" + i);
        def.textContent = currentWord.defs[i];
        defListEl.appendChild(def);
    }
    document.body.appendChild(defDiv);
};

var loadWords = function() {
    wordList = JSON.parse(localStorage.getItem("wordList"));

    if (!wordList) {
        wordList = [];
    }
    var pastWordsDivEl = document.createElement("div");
    var pastWordsListEl = document.createElement("ul");
    pastWordsListEl.classList.add("past-word-list");
    pastWordsDivEl.appendChild(pastWordsListEl);

    for (var i = 0; i < wordList.length; i++) {
        var wordBtnEl = document.createElement("button");
        wordBtnEl.setAttribute("id", "btn-" + wordList.word);
        wordBtnEl.classList.add("word-btn");
        wordBtnEl.textContent = wordList.word;
        pastWordsListEl.appendChild(wordBtnEl);
    }
};

var handleBtnEvent = function(event) {
    var wordBtn = event.target;
    var selectedWord;
    for (var i = 0; i < wordList.length; i++) {
        if (wordList[i].word === wordBtn.textContent) {
            selectedWord = wordList[i];
        }
    }
    showDef(selectedWord);
}

var showDef = function(wordObject) {
    var definitions = wordObject.defs;
    var defDivEl = document.getElementById("def-div");
    if(defDivEl) {
        defDivEl.remove();
    }
    defDivEl = document.createElement("div");
    defDivEl.setAttribute("id", "def-div");
    var defListEl = document.createElement("ul");
    defDivEl.appendChild(defListEl);
    for (var i = 0; i < definitions.length; i++) {
        var defText = document.createElement("p");
        defText.textContent = definitions[i];
        defListEl.appendChild(defText);
    }
};

// var getDefinition = function() {
//     console.log(currentWord);
//     var defDiv = document.createElement("div");
//     var defListEl = document.createElement("ul");
//     defDiv.appendChild(defListEl);
//     for ( var i = 0; i < currentWord.defs.length; i++) {
//         console.log(currentWord.defs[i]);
//         var def = document.createElement("p");
//         def.setAttribute("id", "def-" + i);
//         def.textContent = currentWord.defs[i];
//         defListEl.appendChild(def);
//     }
//     document.body.appendChild(defDiv);
// };


$(".past-word-list").on("click", ".word-btn", handleBtnEvent);

