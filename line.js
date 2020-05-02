function drawLine () {
    let particles = [];
    let properties = {
        bgColor: 'rgba(17, 17, 19, 1)',
        particleColor: 'white',
        particleRadius: 6,
        particleCount: 60,
        particleMaxVelocity: 0.5,
        lineLength: 150,
        particleLife: 25,
    }

    if (window.innerWidth < 400) {
        properties.particleCount = 20;
    }

    class Particles {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.velocityX = Math.random()*(properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random()*(properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }
        position () {
            if (this.x >= innerWidth || this.x <= 0) {
                this.velocityX = -this.velocityX;
            }
            if (this.y >= innerHeight || this.y <= 0) {
                this.velocityY = -this.velocityY;
            }
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife () {
            if (this.life < 1) {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.velocityX = Math.random()*(properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }
            this.life --;
        }

    }

    function reDrawBackGroundColor() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, innerWidth, innerHeight)
    }
    
    function reDrawParticles() {
        for (let i in particles) {
            particles[i].reCalculateLife();
            particles[i].reDraw();
            particles[i].position();
        }
    }

    function connectLines () {
        let x1, x2, y1, y2, length, opacity;
        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length <= properties.lineLength) {
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = '0,5';
                    ctx.strokeStyle = 'rgba(255, 255, 255, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }

    }

    function loop () {
        reDrawBackGroundColor();
        reDrawParticles();
        connectLines();
        requestAnimationFrame(loop);
    }
    
    function init() {
        for (let i = 0; i < properties.particleCount; i++){
            particles.push(new Particles);
        }
        loop();
    }
    init();
}
drawLine();