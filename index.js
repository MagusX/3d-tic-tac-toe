const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'rgb(5,5,5)';
const ctx = canvas.getContext('2d');

let keypressed = '';
window.addEventListener('keydown', e => {
    if (e.key == 'w') {
        keypressed = 'up';
    } else if (e.key == 's') {
        keypressed = 'down';
    } else if (e.key == 'a') {
        keypressed = 'left';
    } else if (e.key == 'd') {
        keypressed = 'right';
    }
});

window.addEventListener('keyup', e => {
    keypressed = '';
});


const w = 100;
const h = 10;
let dist = 200;
let layer1 = new Board(300, 200, w, h, 'rgb(255, 255, 255)', 50);
let layer2 = new Board(300, 200 + dist, w, h, 'rgb(255, 255, 255)', dist);
let layer3 = new Board(300, 200 + dist * 2, w, h, 'rgb(255, 255, 255)', dist * 2);
let grid0 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);
let grid1 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);
let grid2 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);
let grid3 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);
let grid4 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);
let grid5 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);
let grid6 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);
let grid7 = new Board(500, 200, w, h, 'rgb(255, 255, 255)', 50);


function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    layer1.run(ctx, keypressed);
    layer1.motionPersist();
    const vertexes = layer1.getVertexes();

    layer2.run(ctx, keypressed);
    layer2.motionPersistClone(vertexes);

    layer3.run(ctx, keypressed);
    layer3.motionPersistClone(vertexes);

    grid0.run(ctx, keypressed);
    grid0.motionPersist();

    grid1.run(ctx, keypressed);
    grid1.motionPersist();

    grid2.run(ctx, keypressed);
    grid2.motionPersist();

    grid3.run(ctx, keypressed);
    grid3.motionPersist();

    grid4.run(ctx, keypressed);
    grid4.motionPersist();

    grid5.run(ctx, keypressed);
    grid5.motionPersist();

    grid6.run(ctx, keypressed);
    grid6.motionPersist();

    grid7.run(ctx, keypressed);
    grid7.motionPersist();

    layer1.attach({grid0, grid1, grid2, grid3, grid4, grid5, grid6, grid7});
}

main();