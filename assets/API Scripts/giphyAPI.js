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
                var imgDivEl = document.createElement("div");
                var imgEl = document.createElement("img");
                imgEl.setAttribute("id", "clue-gif");
                imgEl.setAttribute("src", data.data[0].images.downsized.url);
                imgEl.setAttribute("alt", "gif of the guess word");
                imgDivEl.appendChild(imgEl);
                document.body.appendChild(imgDivEl);
                
            });
        } else {
            var errorAlert = document.createElement("p");
            errorAlert.textContent = "Gif could not be found for clue";
        }
    });
};


