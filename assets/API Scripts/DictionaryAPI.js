/* Using DataMuse API to get word lists */
/* https://www.datamuse.com/api/        */

const DictionaryAPI = {
    pathURL: "https://api.datamuse.com/"
}

var getWordList = function(category) {
    var apiUrl = "https://api.datamuse.com/words?rel_trg=" + category + "&md=d";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                
            });
        } else {
            alert('Something went wrong!');
        }
    });
}

