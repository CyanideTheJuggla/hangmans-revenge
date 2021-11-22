/* Using DataMuse API to get word lists */
/* https://www.datamuse.com/api/        */

// Array of categories for words
var categoryArray = ['art', 'astronomy', 'animal', 'color', 'cooking', 'emotion', 'holiday', 'music', 'science', 'vehicle', 'weather'];
var currentWord;

const DictionaryAPI = {
    getRandomWord: getRandomWord
};

var randNum = function(max, min = 0) {
    var num = Math.floor(Math.random() * (max - min) + min);
    return num;
}


var getRandomWord = function(category) {
    var apiUrl = "https://api.datamuse.com/words?rel_trg=" + category + "&md=d";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var maxLength = data.length;
                var randomNum = randNum(maxLength);
                var randWord = (data[randomNum]);
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
}

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
}




