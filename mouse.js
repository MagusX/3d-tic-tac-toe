/*
Mouse interaction
*/

const distance = (mX, mY, gridX, gridY) => {
    const a = mX - gridX;
    const b = mY - gridY;
    return Math.sqrt(a * a + b * b);
}

// Mouse hover
const hover = (ctx, grid) => {
    grid.renderHover(ctx, playerA);
}

// If mouse inside grid (target) ellipse
const interact = (ctx, grids) => {
    for (let i = 0; i < grids.length; i++) {
        if (distance(mouseX, mouseY, grids[i].x, grids[i].y) < grids[i].height) {
            if (grids[i].selected) break;
            hover(ctx, grids[i]);
            onTarget = true;
            target = grids[i];
            break;
        }
        onTarget = false;
        target = null;
    }
}