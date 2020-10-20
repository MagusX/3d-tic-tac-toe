/*
Main
*/

// javascript canvas for 2d drawing
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
        case 'Shift':
            keypressed = 'id';
            break;
        case '0':
            keypressed = '0';
            break;
        case '1': {
            keypressed = '1';
            alert('AI IS LOADING...');
            break;
        }
        case '2':
            keypressed = '2';
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
        console.log(playerA);
        makeMove(target, playerA ? -1 : 1);
        winner = evaluate(grids)._winner;
        playerA = !playerA;
        if ((playOption === 1 || playOption === 2) && playerA) {
            AImove(grids);
            winner = evaluate(grids)._winner;
        }
        // logGrids();
    }
});

const keyboardControl = (ctx, key) => {
    if (key === 'id') {
        renderSecret(ctx);
        for (let i = 0; i < 27; i++) {
            grids[i].renderId(ctx);
        }
    } 
}

let playOption = null;
// 0: human vs human
// 1: ai vs human
// 2: human vs ai
let players = {
    player1: 'Player A',
    player2: 'Player B'
};
let playerA = true; // AI first
let winner = null;

// Menu option
const selectOption = () => {
    if (keypressed >= '0' && keypressed < '3') {
        playOption = parseInt(keypressed, 10);
    }
    
    if (playOption && playOption !== 0) {
        players['player1'] = 'AI';
        players['player2'] = 'Human';
    }
    
    if (playOption === 1) {
        AImove(grids);
    } else if (playOption === 2) {
        playerA = false;
    }
}

// Run animation loop
function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    if (playOption === null) {
        renderPlayOption(ctx);
        selectOption();
        return;
    }

    if (winner) {
        renderGameOver(ctx, winner);
    }
    renderBoards(ctx, keypressed);
    interact(ctx, grids);
    keyboardControl(ctx, keypressed);
    renderLog(ctx);
}

main(); // Start program