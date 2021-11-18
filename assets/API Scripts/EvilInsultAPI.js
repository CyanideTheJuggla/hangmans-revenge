/* Using EvilInsult API to get insults  */
/* https://evilinsult.com/              */

const EvilInsultAPI = {
    pathURL: 'https://evilinsult.com/generate_insult.php?lang=en&type=json',
    getInsult: () => {
        fetch(EvilInsultAPI.pathURL)
            .then((response)=>{
                console.log(response.json());
                return response;
            })
            .then((data)=>{
                console.log('data', data);
            });
    }
}

console.log(EvilInsultAPI.pathURL);
