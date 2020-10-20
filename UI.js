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

const renderGameOver = (ctx, winner) => {
    // ctx.beginPath();
    // ctx.font = titleFont;
    // ctx.fillStyle = winner === 'A' ? `rgb(231, 76, 60)` : `rgb(52, 152, 219)`;
    // ctx.fillText(`Player ${winner} wins`, 10, 50);
    createText(
        ctx, titleFont,
        `${winner} wins`,
        winner === 'A' ? `rgb(231, 76, 60)` : `rgb(52, 152, 219)`,
        10, 50
    );
}

const renderLog = ctx => {
    const start = 500;
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
