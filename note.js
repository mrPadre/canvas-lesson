primaryColor = '#F20505';
secondaryColor = '#400101';
thirdColor = '#F27405';

function drawNote () {


        let x = 100;
        let y = 100;
        let size = 40;
        let dx = 3;
        let dy = 3;
        let noteArr = [
            '♩',
            '♪',
            '♫',
            '♬',
            '♭',
            '♮',
            '♯',
            'ø',
        ];
        cvs.style.backgroundColor = 'white';

        function ImageNote (x, y, size, dx, dy, img) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.dx = dx;
            this.dy = dy;
            this.note = noteArr[Math.floor(Math.random() * noteArr.length)];
            this.color = '#400101';

            this.draw = function () {
                // let img = new Image();
                // img.src = this.image;
                // ctx.drawImage(img, this.x, this.y, this.w, this.h);
                ctx.fillStyle = this.color;
                ctx.font = `${this.size}px Arial`;
                ctx.fillText( this.note, this.x, this.y);


            }

            this.update = function () {
                if (this.x + this.size / 2 >= innerWidth || this.x - this.size / 2 <= 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.size / 2 >= innerHeight || this.y - this.size / 2 <= 0) {
                    this.dy = -this.dy;
                }
                if (mouse.x - this.x < 20 && mouse.x - this.x > -20 && mouse.y - this.y < 20 && mouse.y - this.y > -20) {
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    if (this.color === '#F20505'){
                        this.color = '#400101';
                    } else {
                        this.color = '#F20505';
                    }
                }
                if (mainBtn.offsetTop - this.y < 1
                    && (mainBtn.offsetTop + mainBtn.offsetHeight + this.size) - this.y > -1
                    && mainBtn.offsetLeft - this.x < 1
                    && (mainBtn.offsetLeft + mainBtn.offsetWidth) - this.x > -1) {
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    if (this.color === '#F20505'){
                        this.color = '#400101';
                    } else {
                        this.color = '#F20505';
                    }
                }

                this.x += this.dx;
                this.y += this.dy;


                this.draw();
            }
        }

        let noteImgArr = [];

        for (let i = 0; i < 50; i ++ ) {
            x = Math.random() * (innerWidth - size * 2) + size;
            y = Math.random() * (innerHeight - size * 2) + size;
            dx = (Math.random() - 0.5) * 3;
            dy = (Math.random() - 0.5) * 3;

            noteImgArr.push(new ImageNote(x, y, size, dx, dy, this.imag));
        }


        function animate () {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < noteImgArr.length; i++ ) {
                noteImgArr[i].update();
            }
        }
        animate();
}

drawNote();

