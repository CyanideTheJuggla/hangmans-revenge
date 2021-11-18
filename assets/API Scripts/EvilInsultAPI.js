/* Using EvilInsult API to get insults  */
/* https://evilinsult.com/              */

const EvilInsultAPI = {
    pathURL: 'https://evilinsult.com/generate_insult.php?lang=en&type=json',
    getInsult: () => {
        fetch(EvilInsultAPI.pathURL)
            .then((response)=>{
                console.log(response.json());
                return response.json();
            })
            .then((data)=>{
                console.log('data', data);
            });
    }
}

var getInsult = function() {
    var apiUrl = "https://evilinsult.com/generate_insult.php?lang=en&type=json";

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

