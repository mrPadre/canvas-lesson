function drawSchedule () {

    let maxResult = 600;
    let resultStep = 50;
    let progressValue = [
        {
            year: 2013,
            progress: 211
        },
        {
            year: 2014,
            progress: 354
        },
        {
            year: 2015,
            progress: 113
        },
        {
            year: 2016,
            progress: 456
        },
        {
            year: 2017,
            progress: 467
        },
        {
            year: 2018,
            progress: 245
        },
        {
            year: 2019,
            progress: 467
        },
        {
            year: 2020,
            progress: 579
        }
    ];

    let dinamicValue = [
        {
            year: 2013,
            progress: 123
        },
        {
            year: 2014,
            progress: 267
        },
        {
            year: 2015,
            progress: 157
        },
        {
            year: 2016,
            progress: 325
        },
        {
            year: 2017,
            progress: 449
        },
        {
            year: 2018,
            progress: 137
        },
        {
            year: 2019,
            progress: 399
        },
        {
            year: 2020,
            progress: 498
        }
    ];

    let circleValue = [
        {
            year: 2017,
            value: 582
        },
        {
            year: 2018,
            value: 352
        },
        {
            year: 2019,
            value: 439
        },
        {
            year: 2020,
            value: 511
        },
    ];

    let mainIndex = null;
    let indexBox = $('index-box');

    let startTime = 2013;
    let maxTime = startTime + progressValue.length;
    let Xlength = W / 2;
    let Ylength = H / 2;
    let stepY = 0;
    let stepX = 0;
    let zero = {
        x: 60,
        y: 450,
    };
    let radius = 150;
    let circleZero = {
        x: zero.x + Xlength + radius + 20,
        y: zero.y / 2
    };
    let summ = 0;
    for (let i = 0; i < circleValue.length; i++){
        summ += circleValue[i].value;
    }
    let colorArr = [
        'orange',
        'blue',
        'green',
        'red',
        'yellow',
        'lightGreen',
        'gold',
        'pink',
        'purple',
    ];

    circleValue.map((item, index) => {
        let elem = document.createElement('li');
        elem.innerText = item.year;
        elem.addEventListener('click', function () {
            mainIndex = index;
            drawCircle(circleValue);
        });
        indexBox.appendChild(elem);
    })

    function drawProgress (arr, color) {
        ctx.beginPath();
        let point = new Path2D;
        arr.map((item, index) => {
            let point2 = new Path2D;
            let stepX = Xlength / arr.length;
            let stepY = Ylength / maxResult;
            let y = zero.y - (item.progress * stepY);
            let x = zero.x + (index * stepX);
            cvs.addEventListener('mousemove', function (e) {
                if (ctx.isPointInPath(point2, e.x, e.y)) {
                   showCircleInfo(item.progress, color);
                }
            })
            ctx.fillStyle = color;
            ctx.lineWidth = '2';
            ctx.strokeStyle = color;
            point.lineTo(x, y);
            ctx.stroke(point);
            ctx.closePath();
            ctx.beginPath();
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 4;
            ctx.shadowColor = 'black';
            point2.arc(x, y, 8, 0, Math.PI*2, false);
            ctx.fill(point2);
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 0;
        });
    }


    drawProgress(progressValue, 'green');
    drawProgress(dinamicValue, 'orange');

    function drawCircle (arr) {
        let step = 0;
        let maxLength = 0;
        ctx.clearRect(circleZero.x - radius - 30, circleZero.y - radius - 30, radius * 2 + 60, radius * 2 + 60);

        arr.map((item, index) => {
            let length =  (2 * Math.PI / summ) * item.value ;
            maxLength += length;
            const circle = new Path2D();
            let disx = 15;
            let disy = 15;
            if (step >= 1.5 && step <= 2.7) {
                disx = -disx;
            } else if (step >= 2.7 && step <= 3.7) {
                disy = -disy;
                disx = -disx;
            } else if (step >= 3.7 && step <= 6) {
                disy = -disy;
            }

            ctx.beginPath();
            if (mainIndex === index) {
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                ctx.shadowBlur = 3;
                ctx.shadowColor = 'black';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.fillStyle = colorArr[index];
                circle.arc(circleZero.x + disx, circleZero.y + disy, radius, step, maxLength );
                circle.lineTo(circleZero.x + disx, circleZero.y + disy);
                cvs.addEventListener('mousemove', function (event) {
                    if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)){
                        showCircleInfo(item.value, colorArr[index]);
                    }
                });
                ctx.stroke(circle);
            } else {
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    ctx.shadowBlur = 3;
                    ctx.shadowColor = 'black';
                    ctx.fillStyle = colorArr[index];
                    circle.arc(circleZero.x, circleZero.y , radius, step, maxLength );
                    circle.lineTo(circleZero.x, circleZero.y);
                    cvs.addEventListener('mousemove', function (event) {
                        if (ctx.isPointInPath(circle, event.offsetX, event.offsetY)){
                            showCircleInfo(item.value, colorArr[index]);
                        }
                    });
            }
            ctx.fill(circle);
            step += length;
        });
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
    }
    drawCircle(circleValue);

    function showCircleInfo (progress, color) {
        ctx.beginPath();
        ctx.clearRect(innerWidth - 220, 20, 200, 100);
        const info = new Path2D();
        info.rect(innerWidth - 220, 20, 200, 100);
        ctx.strokeStyle = 'black';
        ctx.stroke(info);
        ctx.beginPath();
        ctx.font = '16px Arial';
        ctx.fillStyle = color;
        ctx.fillRect(innerWidth - 200, 70, 20, 20);
        ctx.fillText(progress,innerWidth - 200, 50 )
        ctx.fill();
        ctx.closePath();
    }



    function drawLine () {

        for (let i = 0; i < maxResult; i += resultStep) {
            let stepLength = Ylength / (maxResult / resultStep);
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.fillRect(zero.x - 3, zero.y - (stepLength * stepY), 6, 1);
            ctx.fillText(i, zero.x - 25, zero.y - (stepLength * stepY));
            ctx.fill();
            stepY += 1;
        }

        for (let i = startTime; i < maxTime; i ++) {
            let stepLength = Xlength / (maxTime - startTime);
            ctx.beginPath();
            ctx.fillStyle = 'black'
            ctx.fillRect(zero.x + (stepLength * stepX), zero.y - 3, 1, 6);
            if (i !== startTime) {
                ctx.fillText(i, zero.x + (stepLength * stepX) - 15, zero.y + 20);
            }
            ctx.fill();
            stepX += 1;
        }

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(zero.x, zero.y - Ylength);
        ctx.lineTo(zero.x - 5,zero.y - Ylength + 13);
        ctx.lineTo(zero.x + 5,zero.y - Ylength + 13);
        ctx.fill();
        ctx.moveTo(zero.x + Xlength, zero.y);
        ctx.lineTo(zero.x + Xlength - 13,zero.y + 5);
        ctx.lineTo(zero.x + Xlength - 13,zero.y - 5);
        ctx.fill();
        ctx.moveTo(zero.x - 50, zero.y);
        ctx.lineTo(zero.x + Xlength, zero.y);
        ctx.moveTo(zero.x, zero.y + 50);
        ctx.lineTo(zero.x, zero.y - Ylength);
        ctx.stroke();
    }
    drawLine();
}

drawSchedule();