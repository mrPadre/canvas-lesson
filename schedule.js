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

    let startTime = 2013;
    let maxTime = startTime + progressValue.length;
    let Xlength = W / 2;
    let Ylength = H / 2;
    let stepY = 0;
    let stepX = 0;
    let zero = {
        x: 60,
        y: 350,
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

    function drawProgress (arr, color) {
        ctx.beginPath();
        arr.map((item, index) => {
            let stepX = Xlength / arr.length;
            let stepY = Ylength / maxResult;
            let y = zero.y - (item.progress * stepY);
            let x = zero.x + (index * stepX);
            ctx.fillStyle = color;
            ctx.lineWidth = '1';
            ctx.strokeStyle = color;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI*2, false);
            ctx.fill();
        })
    }

    drawProgress(progressValue, 'green');
    drawProgress(dinamicValue, 'orange');

    function drawCircle (arr) {
        let step = 0;
        let maxLength = 0;
        arr.map((item, index) => {
            let length =  (2 * Math.PI / summ) * item.value ;
            maxLength += length;
            const circle = new Path2D();
            ctx.beginPath();
            ctx.fillStyle = colorArr[index];
            circle.arc(circleZero.x, circleZero.y , radius, step, maxLength );
            circle.lineTo(circleZero.x, circleZero.y);
            ctx.fill(circle);
            step += length;
        })
    }
    drawCircle(circleValue);



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