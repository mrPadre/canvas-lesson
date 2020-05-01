function $(id) {
    return document.getElementById(id);
}

function add (tag, parent) {
    let elem = document.createElement(tag);
    if (parent) {
        parent.appendChild(elem);
    }
    return elem;
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

function drawCircle () {

    function Circle (x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            //ctx.strokeStyle = 'black';
            //ctx.stroke();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        this.update = function () {
            if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
                this.dx = -this.dx
            }
            if (this.y + this.radius >= innerHeight|| this.y - this.radius <= 0) {
                this.dy = -this.dy
            }
            this.x += this.dx;
            this.y += this.dy;

            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > minRadius) {
                this.radius -= 1;
            }

            this.draw();
        }
    }

    let circleArr = [];
    for (let i = 0; i < 800; i ++) {
        let radius = 2;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 3;
        let dy = (Math.random() - 0.5) * 3;

        circleArr.push(new Circle(x, y, dx, dy, radius));
    }

    async function animate() {
         requestAnimationFrame(animate);
            ctx.clearRect(0, 0 , innerWidth, innerHeight);
            for (let i = 0; i < circleArr.length; i ++) {
                circleArr[i].update();
            }
    }
    animate();
}
//drawCircle();

