function $(id) {
    return document.getElementById(id);
}


const body = document.getElementsByTagName('body');
let cvs = $('canvas');
let ctx = cvs.getContext('2d');
let H = cvs.height = window.innerHeight;
let W = cvs.width = window.innerWidth;
let mainBtn = document.createElement('button');
//body[0].appendChild(mainBtn);
mainBtn.className = 'main-button';
mainBtn.innerText = 'Нажать';

let mouse = {
    x: undefined,
    y: undefined
}

const maxRadius = 60;
const minRadius = 5;
let primaryColor = '#F26E50';
let secondaryColor = '#A6998A';
let thirdColor = '#F27244';
let useFunc = '';

let colorArray = [
    '#A6998A',
    '#73675D',
    '#404040',
    '#F26E50',
    '#F27244',
]

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener('resize', function () {
    cvs.height = window.innerHeight;
    cvs.width = window.innerWidth;
})
