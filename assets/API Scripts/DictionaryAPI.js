/* Using DataMuse API to get word lists */
/* https://www.datamuse.com/api/        */

// End game element to show previous words
var wordListEl = document.getElementById("past-word-list");
// Div for displaying definition
var defTextDivEl = document.createElement("div");
// Array of categories for words
var categoryArray = ['art', 'astronomy', 'animal', 'color', 'cooking', 'emotion', 'holiday', 'music', 'science', 'vehicle', 'weather'];

// stores the previously guessed words
var wordList = [];

const DictionaryAPI = {
    getRandomWord: getRandomWord
};

// gets a random number given a max and optionally a min number
var randNum = function(max, min = 0) {
    var num = Math.floor(Math.random() * (max - min) + min);
    return num;
};

// Gets a random word based on a category
function getRandomWord(category) {
    // datamuse api url to retrieve random word
    var apiUrl = "https://api.datamuse.com/words?rel_trg=" + category + "&md=d";

    // calls the api and handles the response
    fetch(apiUrl).then(function(response) {
        
        if (response.ok) {
            response.json().then(function(data) {
                // if response if ok, get the number of words returned
                var maxLength = data.length;
                //get a random number up to the number of words returned from api
                var randomNum = randNum(maxLength);
                // gets the random word from the returned data
                var randWord = (data[randomNum]);
                // checks that the word is at least 6 letters
                while(randWord.word.length < 6) {
                    // gets a different word if too short
                    randomNum = randNum(maxLength);
                    randWord = data[randomNum];
                }
                // stores the current word
                currentWord = randWord;
                // starts the game
                start();
            });
        } else {
            // if the response was not valid, uses a placeholder word and starts game
            console.log("Word could not be retrieved, it's now hippopotamus");
            currentWord = {word: 'hippopotamus', defs: ['a large thick-skinned semiaquatic African mammal, with massive jaws and large tusks.']}
            start();
        }
    });
};

// Gets a random category to call the api with
function getRandomCategory() {
    // gets a random number under the max words in the categoryArray
    var randomNum = randNum(categoryArray.length);
    // retrieves the category at the given index
    var randCat = categoryArray[randomNum];
    console.log('randCat', randCat);
    // calls the api to get a random word based on the category
    getRandomWord(randCat);
};

// saves the words in wordList to localStorage
var saveWords = function() {
    localStorage.setItem("wordList", JSON.stringify(wordList));
}

// Loads the words from local storage
var loadWords = function() {
    // retrieves the word list
    wordList = JSON.parse(localStorage.getItem("wordList"));

    // if the wordList is empty, creates the empty wordList
    if (!wordList) {
        wordList = [];
    }
    
};

// Creates buttons for each word in wordList
var showWordButtons = function() {
    // removes the words from previous rounds
    var pastWordsDivEl = document.getElementById("past-words-div");
    if (pastWordsDivEl) {
        pastWordsDivEl.remove();
    }
    // creates the div and list elements to store the buttons
    pastWordsDivEl = document.createElement("div");
    var pastWordsListEl = document.createElement("ul");
    pastWordsListEl.classList.add("past-word-list");
    // adds the list element to the div
    pastWordsDivEl.appendChild(pastWordsListEl);

    // iterates through all the words in the wordList array
    for (var i = 0; i < wordList.length; i++) {
        // creates a button element
        var wordBtnEl = document.createElement("button");
        // sets the id to btn-[word]
        wordBtnEl.setAttribute("id", "btn-" + wordList[i].word);
        // adds the class
        wordBtnEl.classList.add("word-btn");
        // sets the button to show the word
        wordBtnEl.textContent = wordList[i].word;
        // appends the button to the list element
        pastWordsListEl.appendChild(wordBtnEl);
    }
    // adds an empty element to the top of the past-words div so it is at top
    wordListEl.appendChild(defTextDivEl);
    // appends the list of buttons to the word list element
    wordListEl.appendChild(pastWordsDivEl);
}

// Function to handle the past words button click
var handleBtnEvent = function(event) {
    // gets the button that was clicked
    var wordBtn = event.target;
    // variable to store the selected word
    var selectedWord;
    // goes through the wordList to find the matching word objects
    for (var i = 0; i < wordList.length; i++) {
        if (wordList[i].word === wordBtn.textContent) {
            // if the word from wordList matches the word from the button, it is stored
            selectedWord = wordList[i];
        }
    }
    // calls the function to show the definitions for selected word
    showDef(selectedWord);
}

// Shows the definitions for the word passed in
var showDef = function(wordObject) {
    // gets the definitions aray from the word object
    var definitions = wordObject.defs;
    // gets the definitions div and removes it if it exists already
    // this clears out past word definitions so multiple can be viewed
    var defDivEl = document.getElementById("def-div");
    if(defDivEl) {
        defDivEl.remove();
    }
    // creates the div to hold the definitions
    defDivEl = document.createElement("div");
    // sets the id of the div
    defDivEl.setAttribute("id", "def-div");
    // creates the list element and appends it to the div element
    var defListEl = document.createElement("ul");
    defDivEl.appendChild(defListEl);
    // creates a <p> element for each definitions and appends to list
    for (var i = 0; i < definitions.length; i++) {
        var defText = document.createElement("p");
        defText.textContent = definitions[i];
        defListEl.appendChild(defText);
    }
    // adds the div holding defintions to the already created div in the past words list
    defTextDivEl.appendChild(defDivEl);
};


// calls handleBtnEvent function when a button in the wordListEl is clicked
$(wordListEl).on("click", ".word-btn", handleBtnEvent);

