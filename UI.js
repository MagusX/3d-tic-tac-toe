/*
Game user interface
*/
const logFont = '15px Arial';
const titleFont = '30px Arial';

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
        display = 'Game Over: Draw';
    } else {
        display = `Game Over: ${players[_winner]} wins!`;
    }
    createText(
        ctx, titleFont,
        display,
        _winner === 'player1' ? `rgb(231, 76, 60)` : `rgb(52, 152, 219)`,
        10, 50
    );
}

const renderLog = ctx => {
    const start = 500;
    if (playOption !== 0) {
        createText(ctx, logFont,
            `AI level (Minimax depth): ${intelligence}`,
            white, 10, start);
    }
    createText(ctx, logFont,
    'Keyboard:',
    white, 10, start + 50);
    createText(ctx, logFont,
    '[A / Arrow-left][D / Arrow-right]: rotate left, right',
    white, 20, start + 70);
    createText(ctx, logFont,
    '[W / Arrow-up][S / Arrow-down]: rotate up, down',
    white, 20, start + 90);
    createText(ctx, logFont,
    '[Shift]: grid ID',
    white, 20, start + 110);
}

const renderPlayOption = ctx => {
    createText(ctx, titleFont,
        'Human vs Human: Press 0', white, 500, 100);
    createText(ctx, titleFont,
        'Human vs AI (AI first): Press 1', white, 500, 150);
    createText(ctx, titleFont,
        'Human vs AI (Human first): Press 2', white, 500, 200);
}

