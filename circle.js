primaryColor = '#F26E50';
secondaryColor = '#404040';
thirdColor = '#F27244';
function drawCircle () {
    cvs.style.backgroundColor = 'white';
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
drawCircle();
