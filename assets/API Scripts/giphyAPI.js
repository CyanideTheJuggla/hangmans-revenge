/* Using GIPHY API to get gif hints         */
/* https://developers.giphy.com/docs/api/   */

const GIPHY_API = {
    pathURL: 'https://api.giphy.com/v1/gifs/search'
}


var getGif = function(word) {
    var apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=9Mj8VtVxS0fIYl8rye5eyBzrMDtkHEXO&q=" + word;

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var imgEl = document.querySelector("#gif-img");
                imgEl.setAttribute("src", data.data[0].images.downsized.url);
                console.log(data);
            });
        } else {
            alert('Something went wrong!');
        }
    });
};