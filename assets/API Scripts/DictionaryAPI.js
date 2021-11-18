/* Using DataMuse API to get word lists */
/* https://www.datamuse.com/api/        */

const DictionaryAPI = {
    getRandomWord: getRandomWord
}

var getRandomWord = function(category) {
    var apiUrl = "https://api.datamuse.com/words?rel_trg=" + category + "&md=d";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var maxLength = data.length;
                var randNum = Math.floor(Math.random() * maxLength);
                var randWord = (data[randNum]);
                console.log(data[randNum]);
                return randWord;
                
            });
        } else {
            alert('Something went wrong!');
        }
    });
}

