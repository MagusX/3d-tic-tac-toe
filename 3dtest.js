const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'rgb(5,5,5)';
const ctx = canvas.getContext('2d');

const width = 100;
const height = 100;

let mousepressed = false;
let keypressed = '';


window.addEventListener('keydown', e => {
    if (e.key == 'w') {
        keypressed = 'up';
    } else if (e.key == 's') {
        keypressed = 'down';
    } else if (e.key == 'a') {
        keypressed = 'left';
    } else if (e.key == 'd') {
        keypressed ='right';
    }
});

window.addEventListener('keyup', e => {
    keypressed = '';
});

const getY = (x, a, b) => {
    return (b / a) * Math.sqrt(Math.abs(a * a - x * x));
}

const drawPoint = (_x, _y) => {
    ctx.fillStyle = 'rgb(255,100,100)';
    ctx.beginPath();
    ctx.ellipse(_x, _y, 3, 3, Math.PI / 4, 0, 2 * Math.PI);
    ctx.fill();
}


const centerX = 700;
const centerY = 150;
const horRad = 100;
let verRad = 50; // vertical scroll
const boxHeight = horRad - verRad;

let x0 = centerX - horRad + 20;
let y0 = centerY - 100;
let x1 = centerX + horRad - 20;
let y1 = centerY - 10;

let x2 = centerX - horRad - 10;
let y2 = centerY + 10;
let x3 = centerX - horRad + 10;
let y3 = centerY + 10;

let x4 = centerX - horRad + 20;
let y4 = centerY - 10 + boxHeight;
let x5 = centerX + horRad - 20;
let y5 = centerY - 10 + boxHeight;

let x6 = centerX - horRad - 10;
let y6 = centerY + 10 + boxHeight;
let x7 = centerX - horRad + 10;
let y7 = centerY + 10 + boxHeight;

let velX = 0.2;
let ySide = 1;
let t = 0;
let xvel = 0;
let yvel = 0;

const moveDot = () => {
    x0 = centerX + horRad * Math.cos(t);
    y0 = centerY + verRad * Math.sin(t);

    x1 = centerX + horRad * Math.cos(t + Math.PI / 2);
    y1 = centerY + verRad * Math.sin(t + Math.PI / 2);

    x2 = centerX + horRad * Math.cos(t + Math.PI);
    y2 = centerY + verRad * Math.sin(t + Math.PI);

    x3 = centerX + horRad * Math.cos(t - Math.PI / 2);
    y3 = centerY + verRad * Math.sin(t - Math.PI / 2);

    x4 = x0;
    y4 = y0 + boxHeight;

    x5 = x1;
    y5 = y1 + boxHeight;

    x6 = x2;
    y6 = y2 + boxHeight;

    x7 = x3;
    y7 = y3 + boxHeight;

    if (keypressed == 'up' && verRad >= 0) {
        verRad -= 1;
    } else if (keypressed == 'down' && verRad <= 100) {
        verRad += 1;
    }

    if (keypressed == 'left') {
        t += 0.02;
    } else if (keypressed == 'right') {
        t -= 0.02;
    }

   
    if (t > 2 * Math.PI) {
        t = 0;
    }
    // console.log(x, y);
}

const drawRect = (_x0, _y0, _x1, _y1, _x2, _y2, _x3, _y3, _x4, _y4, _x5, _y5, _x6, _y6, _x7, _y7) => {
    //ctx.fillStyle = 'rgb(100,5,5)';
    // ctx.beginPath();
    // ctx.lineWidth = '2';
    // ctx.strokeStyle = 'rgb(255,255,255)';
    // ctx.rect(x, y, width, height);
    // ctx.stroke();
    
    // ctx.fill();

    ctx.beginPath();       // Start a new path
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.moveTo(_x0, _y0);    // Move the pen to (30, 50)
    ctx.lineTo(_x1, _y1);  // Draw a line to (150, 100)
    ctx.lineTo(_x2, _y2);    // Move the pen to (30, 50)
    ctx.lineTo(_x3, _y3);  // Draw a line to (150, 100)
    ctx.lineTo(_x0, _y0);

    ctx.moveTo(_x4, _y4);
    ctx.lineTo(_x5, _y5);
    ctx.lineTo(_x6, _y6);
    ctx.lineTo(_x7, _y7);
    ctx.lineTo(_x4, _y4);

    // ctx.moveTo(_x0, _y0);
    // ctx.lineTo(_x4, _y4);
    // ctx.moveTo(_x1, _y1);
    // ctx.lineTo(_x5, _y5);
    // ctx.moveTo(_x2, _y2);
    // ctx.lineTo(_x6, _y6);
    // ctx.moveTo(_x3, _y3);
    // ctx.lineTo(_x7, _y7);
    
    ctx.stroke();
}

function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // drawPoint(5, 10);
    // drawRect();
    moveDot();

    drawRect(x0, y0, x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7);
}

main();