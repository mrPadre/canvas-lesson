
function drawMenu () {
    let menu = [
        {
            name: 'Шарики',
            func: () => drawCircle(),
            use: 'index.html'
        },
        {
            name: 'Ноты',
            func: () => drawNote(),
            use: 'note.html'
        },
        {
            name: 'Взрывы',
            func: () => drawBoom(),
            use: 'boom.html'
        },
        {
            name: 'Волна',
            func: () => drawWaves(),
            use: 'wave.html'
        },
        {
            name: 'Сабзиро',
            func: () => drawSprite(),
            use: 'sprite.html'
        },
        {
            name: 'Созвездия',
            func: () => drawLine(),
            use: 'line.html'
        },
        {
            name: 'Графики',
            func: () => drawSchedule(),
            use: 'schedule.html'
        },
    ];
    let canvas = document.getElementById('menu');
    let mtx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = canvas.offsetHeight ;
    let cx = 0;
    let cy = 0;
    let bx = 0;
    let by = 0;
    let posx = bx - 6;
    let posy = by - 6;
    let posx1 = bx - 6;
    let posy1 = by - 6;
    let speed = 2;

    let container = document.createElement('div');
    container.className = 'menu-container';
    body[0].appendChild(container);

    class Booble {
        constructor (x, y, dx, dy) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = 20;
            this.currentAngle = 0;
            this.vx = Math.cos(this.currentAngle) * this.radius;
            this.vy = Math.sin(this.currentAngle) * this.radius;
        }
        draw() {
            mtx.beginPath();
            mtx.arc(this.x, this.y, this.radius, 0, 2* Math.PI, false);
            mtx.arc(this.x + (this.radius * 2) + this.vx, this.y  + (this.radius * 2) + this.vy, this.radius - 5, 0, 2* Math.PI, false);
            mtx.arc(this.x  + (this.radius * 3) + this.vx, this.y  + (this.radius * 3) + this.vy, this.radius - 10, 0, 2* Math.PI, false);
            mtx.arc(this.x  + (this.radius * 4) + this.vx, this.y  + (this.radius * 4) + this.vy, this.radius - 15, 0, 2* Math.PI, false);
            mtx.fill();
        }
        update() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.currentAngle += 10;

            this.draw();
        }
    }


    let currentAngle = 0;
    let currentAngle1 = 0;

    function drawMenuBuble() {
        let x = mouse.x;
        let y = mouse.y;
        let radius = 10;

        let vx = Math.cos(currentAngle)* (radius + 7);
        let vy = Math.sin(currentAngle)* (radius + 7);
        let vx1 = Math.cos(currentAngle1)* (radius * 2 + 4);
        let vy1 = Math.sin(currentAngle1)* (radius * 2 + 4);
        mtx.beginPath();
        mtx.fillStyle = primaryColor;
        mtx.arc(x, y, radius, 0, 2*Math.PI,false);
        mtx.fill();
        mtx.beginPath();
        mtx.fillStyle = secondaryColor;
        mtx.arc(x + vx, y + vy, radius / 2, 0, 2*Math.PI,false);
        mtx.fill();
        mtx.beginPath();
        mtx.fillStyle = thirdColor;
        mtx.arc(x + vx1, y + vy1, radius / 3, 0, 2*Math.PI,false);
        mtx.fill();

        currentAngle += 0.05;
        currentAngle1 -= 0.05;
    }


    function strokeDraw () {
        if (posx < bx - 9 && posy < by - 9) {
            posx = bx - 9;
            posy = by - 9;
            posx1 = bx - 6;
            posy1 = by - 6;
        }
        mtx.beginPath();
        mtx.fillStyle = secondaryColor;
        mtx.arc(posx, posy, 8, 0 , 2* Math.PI, false);
        mtx.fill();
        mtx.beginPath();
        mtx.fillStyle = thirdColor;
        mtx.arc(posx1, posy1, 5, 0 , 2* Math.PI, false);
        mtx.fill();
        if (posy <= by - 9 && posx <= bx + 150 + 9) {
            posx += speed;
        } else if (posy <= by + 50 + 9 && posx >= bx + 150 + 9) {
            posy += speed;
        } else if (posy >= by + 50 + 9 && posx >= bx - 9) {
            posx -= speed;
        } else if (posy >= by - 9 && posx <= bx - 9) {
            posy -= speed;
        }

        if (posy1 <= by + 50 + 6 && posx1 <= bx - 6) {
            posy1 += speed;
        } else if (posy1 >= by + 50 + 6 && posx1 <= bx + 150 + 6) {
            posx1 += speed;
        } else if (posy1 >= by - 6 && posx1 >= bx + 150 + 6) {
            posy1 -= speed;
        } else if (posy1 <= by -6 && posx1 >= bx - 6) {
            posx1 -= speed;
        }
    }

    function btnPosition (xp, yp, topY, leftX) {
        cx = xp;
        cy = yp;
        bx = leftX;
        by = topY;

    }

    function btnCleanPosition () {
        cx = 0;
        cy = 0;
        bx = 0;
        by = 0;
        posx = bx - 6;
        posy = by - 6;

    }

    menu.map((item, index) => {
        let menuItem = document.createElement('button');
        let pageHref = document.createElement('a');
        pageHref.href = item.use;
        menuItem.innerText = item.name;
        menuItem.className = 'menuItem';
        menuItem.style.color = secondaryColor;
        menuItem.style.borderColor = secondaryColor;
        menuItem.addEventListener('click', function () {
        });
        menuItem.addEventListener('mouseover', function (e) {
            menuItem.style.backgroundColor = primaryColor;
            menuItem.style.borderColor = primaryColor;
            btnPosition(e.x, e.y, e.target.offsetTop, e.target.offsetLeft);
        });
        menuItem.addEventListener('mouseleave', function () {
            menuItem.style.background = 'none';
            menuItem.style.borderColor = secondaryColor;
            btnCleanPosition();
        });
        pageHref.appendChild(menuItem);
        container.appendChild(pageHref);
    })



    function looper() {
        mtx.clearRect(0,0, w, h);
        requestAnimationFrame(looper);

        if (cy === 0) {
            drawMenuBuble();
        } else {
            strokeDraw();
        }

    }
    looper();

}
drawMenu();