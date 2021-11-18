
const stickman = {
    height: 360, 
    width: 169, 
    imgSrc: [
        'assets/img/StickmanFull.png',
        'assets/img/Stickman1.png',
        'assets/img/Stickman2.png',
        'assets/img/Stickman3.png',
        'assets/img/Stickman4.png',
        'assets/img/Stickman5.png',
        'assets/img/Stickman6.png'
    ],
    imgPoint: 0
};

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const generateKeys = () =>{
    
    //<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" ></button>
    let row;
    for (let i = 0; i < alphabet.length; i++) {
        const element = alphabet[i].toUpperCase();;
        const btn = document.createElement('button');
        btn.setAttribute('data-letter', element);
        btn.innerHTML = element;
        btn.className = 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored';
        btn.onclick = letterKey;
        if(i == 0 || i == 9 || i == 18) {
            row = document.createElement('div');
            row.className = 'buttonContainer';
            document.getElementsByClassName('buttonParent')[0].appendChild(row);
        }
        row.appendChild(btn);
    }
}

const letterKey = (e) => {
    console.log($(e.target).parent().attr('data-letter'));
}

const hangmanMove = () => {
    stickman.imgPoint++;
    if(stickman.imgPoint < stickman.imgSrc.length) {
        $('.stickman_parts').attr('src', stickman.imgSrc[stickman.imgPoint]);
    } else {
        stickman.imgPoint = 0;
        hangmanMove();
    }
};

$(document).ready(()=>{generateKeys()});

console.log('main.js: OK!');