/* Using GIPHY API to get gif hints         */
/* https://developers.giphy.com/docs/api/   */

const GIPHY_API = {
    pathURL: 'https://api.giphy.com/v1/gifs/search?api_key=9Mj8VtVxS0fIYl8rye5eyBzrMDtkHEXO&q=food'
}


var getGif = function(word) {
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=9Mj8VtVxS0fIYl8rye5eyBzrMDtkHEXO&q=" + word;

    fetch(apiUrl);
}