/* Using DataMuse API to get word lists */
/* https://www.datamuse.com/api/        */

// Array of categories for words
var categoryArray = ['art', 'astronomy', 'animal', 'color', 'cooking', 'emotion', 'holiday', 'music', 'science', 'vehicle', 'weather'];
//var currentWord;

const DictionaryAPI = {
    getRandomWord: getRandomWord
};

var randNum = function(max, min = 0) {
    var num = Math.floor(Math.random() * (max - min) + min);
    return num;
}


function getRandomWord(category) {
    var apiUrl = "https://api.datamuse.com/words?rel_trg=" + category + "&md=d";

    fetch(apiUrl).then(function(response) {
        //console.log('response received', response);
        if (response.ok) {
            response.json().then(function(data) {
                //.log('response.json().then(data)', data);
                var maxLength = data.length;
                var randomNum = randNum(maxLength);
                var randWord = (data[randomNum]);
                while(randWord.word.length < 6) {
                    randomNum = randNum(maxLength);
                    randWord = data[randomNum];
                }
                //console.log('randWord', randWord);
                currentWord = randWord;
                start();
            });
        } else {
            console.log("Word could not be retrieved, it's now hippopotamus");
            currentWord = {word: 'hippopotamus', defs: ['a large thick-skinned semiaquatic African mammal, with massive jaws and large tusks.']}
            start();
        }
    });
};

function getRandomCategory() {
    var randomNum = randNum(categoryArray.length);
    var randCat = categoryArray[randomNum];
    //console.log('randCat', randCat);
    getRandomWord(randCat);
}

var getDefinition = function() {
    //console.log('currentWord', currentWord);
    var defDiv = document.createElement("div");
    var defListEl = document.createElement("ul");
    defDiv.appendChild(defListEl);
    for ( var i = 0; i < currentWord.defs.length; i++) {
        //console.log('currentWord.defs[i]', currentWord.defs[i]);
        var def = document.createElement("p");
        def.setAttribute("id", "def-" + i);
        def.textContent = currentWord.defs[i];
        defListEl.appendChild(def);
    }
    document.body.appendChild(defDiv);
}




