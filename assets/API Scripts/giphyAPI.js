/* Using GIPHY API to get gif hints         */
/* https://developers.giphy.com/docs/api/   */


const GIPHY_API = {
    getGif: getGif
}

// Fetches gifs related to the word parameter and displays the first one returned
var getGif = function(word) {
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=9Mj8VtVxS0fIYl8rye5eyBzrMDtkHEXO&q=" + word;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var imgEl = document.getElementById("clue-gif");
                if (!imgEl) {
                    var quote = document.getElementById("word-quote");
                    quote.classList.add ("hide");
                    var imgDivEl = document.createElement("div");
                    imgEl = document.createElement("img");
                    var textEl = document.createElement("p");
                    
                    textEl.textContent = "Powered By GIPHY";
                    imgEl.setAttribute("id", "clue-gif");
                    imgEl.setAttribute("class", "fit");
                    imgEl.setAttribute("alt", "gif of the guess word");
                    imgDivEl.appendChild(imgEl);
                    imgDivEl.appendChild(textEl);
                    clueInsultDivEl.appendChild(imgDivEl);
                }
                var randomNum = randNum(data.data.length);
                imgEl.setAttribute("src", data.data[randomNum].images.downsized.url);
            });
        } else {
            var errorAlert = document.createElement("p");
            errorAlert.textContent = "Gif could not be found for clue";
        }
    });
};


