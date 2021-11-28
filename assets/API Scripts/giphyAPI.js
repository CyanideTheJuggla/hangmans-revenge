/* Using GIPHY API to get gif hints         */
/* https://developers.giphy.com/docs/api/   */


const GIPHY_API = {
    getGif: getGif
}

// Fetches gifs related to the word parameter and displays the first one returned
var getGif = function(word) {
    // the api URL with the current word to search for a gif
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=9Mj8VtVxS0fIYl8rye5eyBzrMDtkHEXO&q=" + word;

    // fetches the data from the api
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // if the response was valid gets the element holding the gif img
                var imgEl = document.getElementById("clue-gif");
                if (!imgEl) {
                    // if the gif img el doesn't exist, the div to hold the img element is created
                    var imgDivEl = document.createElement("div");
                    // sets the id and classes for styles
                    imgDivEl.setAttribute("id", "img-div-el");
                    imgDivEl.setAttribute("class", "gif-div is-flex-direction-column is-justify-content-center has-text-centered")
                    // img element is creates
                    imgEl = document.createElement("img");
                    // element for the credit for giphy
                    var textEl = document.createElement("p");
                    textEl.setAttribute("id", "giphy-credit");
                    textEl.textContent = "Powered By GIPHY";
                   
                    // sets the attributes for the img element
                    imgEl.setAttribute("id", "clue-gif");
                    imgEl.setAttribute("class", "fit");
                    imgEl.setAttribute("alt", "gif of the guess word");
                    // appends the img el and the text to the div
                    imgDivEl.appendChild(imgEl);
                    imgDivEl.appendChild(textEl);
                    // removes anything currently in the div then appends to the given div
                    clueInsultDivEl.innerHTML = "";
                    clueInsultDivEl.appendChild(imgDivEl);
                }
                // picks a random gif from the array returned and sets it as the img src attribute
                var randomNum = randNum(data.data.length);
                imgEl.setAttribute("src", data.data[randomNum].images.downsized.url);
            });
        } else {
            // creates an error message if a gif could not be found
            var errorAlert = document.createElement("p");
            errorAlert.textContent = "Gif could not be found for clue";
        }
    });
};


