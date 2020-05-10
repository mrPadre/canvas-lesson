primaryColor = '#FF9C63';
secondaryColor = '#FFCB70';
thirdColor = '#3C7A57';
function drawWaves () {

        let inc = 0.001;
        let size = 150;
        let step = 1;
        let incStep = 0.01;
        let height = H / 2;
        let arc = 0.004;
        let arcStep = 0.00001;

        cvs.style.backgroundColor = '#152D47';
        ctx.strokeStyle = `#FF6457`;
        function animate() {
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            requestAnimationFrame(animate);

            ctx.beginPath();
            ctx.moveTo(0, H / 2);
            for (let j = 0; j < W; j++) {
                ctx.lineTo(j , height + Math.sin(j * arc + inc) * size);
            }
            ctx.stroke();

            if (size <= 150 || size >= 250) {
                step = -step;
            }
            if (arc <= 0.5 || arc >= -0.5) {
                arcStep = -arcStep;
            }

            inc += incStep;
            size -= step;
            arc += arcStep;
        }
        animate();

}

drawWaves();