/* Using DataMuse API to get word lists */
/* https://www.datamuse.com/api/        */

const DictionaryAPI = {
    pathURL: "https://api.datamuse.com/"
}

var getWordList = function(category) {
    var apiUrl = "https://api.datamuse.com/words?rel_trg=" + category;

    fetch(apiUrl);
}

