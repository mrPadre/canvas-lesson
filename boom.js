
async function drawBoom (strong) {

    function editColor () {
        const colorArr = [
            '#488C03',
            '#74BF04',
            '#A7F205',
            '#F21B07',
            '#8C1F1F',
        ];
        let newColor = colorArr[Math.floor(Math.random() * colorArr.length )]
        return newColor;
    }


    let x;
    let y;
    let radius;
    let dx;
    let dy;
    let color = editColor();

    class Boom  {
       constructor( x, y, radius, dx, dy) {
           this.x = x;
           this.y = y;
           this.radius = radius;
           this.dx = dx;
           this.dy = dy;
           this.color = color;
       }
       drawCircle () {
           ctx.fillStyle = this.color;
           ctx.beginPath();
           ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
           //ctx.fillRect(this.x, this.y, 40, 40);
           ctx.fill();
       }
       update () {
           this.x += this.dx;
           this.y += this.dy;
           if (this.radius >= 1) {
               this.radius -= 1;
           }
           this.drawCircle();
       }
    }

    let circleArr = [];
    for (let i = 0; i < 50; i++) {
        //x = Math.random() * (innerWidth - radius * 2) + radius;
        //y = Math.random() * (innerHeight - radius * 2) + radius;
        x = mouse.x;
        y = mouse.y;
        dx = (Math.random() - 0.5) * 20;
        dy = (Math.random() - 0.5) * 20;
        radius = 40;

        circleArr.push(new Boom(x, y, radius, dx, dy));
    }
    async function animate () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        requestAnimationFrame(animate);
        for (let i = 0; i < circleArr.length; i ++) {
            circleArr[i].update();
        }
    }
    animate();
}

cvs.addEventListener('click', () => drawBoom( 50));