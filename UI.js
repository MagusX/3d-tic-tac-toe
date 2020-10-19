/*
Game user interface
*/

const renderGameOver = (ctx, winner) => {
    ctx.beginPath();
    ctx.font = '30px Arial';
    ctx.fillStyle = winner === 'A' ? `rgb(231, 76, 60)` : `rgb(52, 152, 219)`;
    ctx.fillText(`Player ${winner} wins`, 10, 50);
}