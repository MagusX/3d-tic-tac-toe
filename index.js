/*
Main
*/

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
canvas.style.backgroundColor = 'rgb(5,5,5)';
const ctx = canvas.getContext('2d');

let keypressed = '';
let mouseX = 0;
let mouseY = 0;
let onTarget = false;
let target = null;

window.addEventListener('keydown', e => {
    if (winner) return;
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            keypressed = 'up';
            break;
        case 's':
        case 'ArrowDown':
            keypressed = 'down';
            break;
        case 'a':
        case 'ArrowLeft':
            keypressed = 'left';
            break;
        case 'd':
        case 'ArrowRight':
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
    if (winner) return;
    keypressed = '';
});

canvas.addEventListener('mousemove', e => {
    if (winner) return;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

canvas.addEventListener('click', e => {
    if (winner) return;
    if (onTarget) {
        target.selected = true;
        target.player = 1;
        playerA = !playerA;
        if (playerA) {
            AImove(grids);
        }
        logGrids();

        winner = gameOver(grids);
    }
});


const keyboardControl = (ctx, key) => {
    // if (key === 'stretch') {
    //     for (let i = 0; i < 27; i++) {
    //         grids[i].layerOffset += 1;
    //         if (grids[i].layerOffset )             
    //     }
    // } else if (key === 'zoom_out') {
    //     for (let i = 0; i < 27; i++) {
    //         if (grids[i].height >= 0) {
    //             grids[i].layerOffset -= 1;
    //         }
    //     }
    // } else 
    if (key === 'id') {
        for (let i = 0; i < 27; i++) {
            grids[i].renderId(ctx);
        }
    } 
}

let playerA = true; // AI first
let winner = null;
AImove(grids);
function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    if (winner) {
        renderGameOver(ctx, winner);
    }
    renderBoards(ctx, keypressed);
    interact(ctx, grids);
    keyboardControl(ctx, keypressed);
}

main();