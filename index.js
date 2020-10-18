const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'rgb(5,5,5)';
const ctx = canvas.getContext('2d');

let keypressed = '';
let mouseX = 0;
let mouseY = 0;
let onTarget = false;
let target = null;

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w':
            keypressed = 'up';
            break;
        case 's':
            keypressed = 'down';
            break;
        case 'a':
            keypressed = 'left';
            break;
        case 'd':
            keypressed = 'right';
            break;
        case 'r':
            keypressed = 'stretch';
            break;
        case 'f':
            keypressed = 'shrink';
            break;
        case 'Shift':
            keypressed = 'id';
            break;
    }
});

window.addEventListener('keyup', e => {
    keypressed = '';
});

canvas.addEventListener('mousemove', e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

canvas.addEventListener('click', e => {
    if (onTarget) {
        target.selected = true;
        playerA = !playerA;
    }
});


// const keyboardControl = (ctx, key) => {
//     if (key === 'stretch') {
//         for (let i = 0; i < 27; i++) {
//             grids[i].layerOffset += 1;
//             if (grids[i].layerOffset )             
//         }
//     } else if (key === 'zoom_out') {
//         for (let i = 0; i < 27; i++) {
//             if (grids[i].height >= 0) {
//                 grids[i].layerOffset -= 1;
//             }
//         }
//     } else if (key === 'id') {
//         for (let i = 0; i < 27; i++) {
//             grids[i].renderId(ctx);
//         }
//     } 
// }

let playerA = true;
function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    console.log(playerA);

    renderBoards(ctx, keypressed);
    interact(ctx, grids);
}

main();