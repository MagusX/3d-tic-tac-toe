/*
Game user interface
*/
const logFont = '15px Arial';
const titleFont = '30px Arial';
const secretFont = 'italic bold 20px Consolas';

const createText = (ctx, _font, text, color, x, y) => {
    ctx.beginPath();
    ctx.font = _font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.closePath();
}

const renderGameOver = (ctx, _winner) => {
    let display;
    if (_winner === 'draw') {
        display = 'Draw. Press F5 to restart.';
    } else {
        display = `${players[_winner]} wins! Press F5 to restart.`;
    }
    createText(
        ctx, titleFont,
        display,
        _winner === 'player1' ? `rgb(255,180,20)` : `rgb(144,235,235)`,
        10, 50
    );
}

const renderWinIndicator = (ctx, move) => {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.moveTo(move[0].x, move[0].y);
    ctx.lineTo(move[1].x, move[1].y);
    ctx.stroke();
    ctx.closePath();
}

// Secret :)
const renderSecret = ctx => {
    createText(ctx, secretFont, '18120185', white, innerWidth - 120, 30);
}

const renderGame = () => {
    let menu = document.getElementsByClassName('main-menu')[0];
    let game = document.getElementsByClassName('game')[0];
    menu.setAttribute('hidden', 'true');
    game.removeAttribute('hidden');
    selectOption();
}

const renderAILog = () => { 
    intelligence = parseInt(document.getElementById('depth').value, 10);
    pruning = document.getElementById('pruning').checked;
    const aiEl = document.getElementById('ai');
    aiEl.innerText = `AI:\n>Method: minimax\n>Depth: ${intelligence}\n>Pruning: ${pruning}`;
    intelligence--;
}

const renderAISpeed = () => {
    document.getElementById('runtime').innerText = `\n>Avg runtime: ${(totalRuntime / turns).toFixed(2)} ms`
}

const modeEl = document.getElementById('mode');
const menuButtons = document.getElementsByClassName('menu');
menuButtons[0].addEventListener('click', e => {
    playOption = 0;
    modeEl.innerText = 'Human vs Human';
    renderGame();
});

menuButtons[1].addEventListener('click', e => {
    playOption = 2;
    modeEl.innerText = 'Human vs AI';
    renderAILog();
    renderGame();
});

menuButtons[2].addEventListener('click', e => {
    playOption = 1;
    modeEl.innerText = 'AI vs Human';
    renderAILog();
    renderGame();
});