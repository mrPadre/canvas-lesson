primaryColor = '#1CA2F3';
secondaryColor = '#151110';
thirdColor = '#42B7FE';

function drawSprite () {

        cvs.style.backgroundColor = 'white';
        let sprite = new Image();
        let x = 0;
        let dx = 66;
        let tick_count = 0;
        sprite.src = 'src/image/subziro.png';
        sprite.onload = function () {
            tick();
        }
        let position = {
            x: 0,
            y: innerHeight - 150
        }
        function down() {
            if (position.y <= innerHeight - 150) {
                position.y = innerHeight - 150;
            }
        }
        function front(speed) {
            if (position.x <= W - 65) {
                position.x += speed;
            }
        }
        function back(speed) {
            if (position.x >= 0) {
                position.x -= speed;
            }
        }
        function up() {
            if (position.y >= 0) {
                position.y -= 100;
                if (position.x <= W - 150){
                    position.x += 50
                }
                setTimeout(() => down(), 100);
            }
        }


        document.addEventListener('keydown', function (event) {
            let key = event.keyCode;
            if (key === 39) {
                front(10);

            } else if (key === 37 ) {
                back(10);

            } else if (key === 38) {
                up();
            }
            console.log(event.keyCode);
        });



        async function tick () {
            if (tick_count > 5) {
                draw();
                tick_count = 0;
            }

            tick_count += 1;
            requestAnimationFrame(tick);
        }
        async function draw () {
            if (x >= 380) {
                x = 0;
            }
            x += dx;
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            ctx.drawImage(sprite, x, 0, 65, 150, position.x, position.y, 75, 150);
        }

}
drawSprite();