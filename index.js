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
    } else if (e.key == 'r') {
        keypressed = 'stretch';
    } else if (e.key == 'f') {
        keypressed = 'shrink';
    }
});

window.addEventListener('keyup', e => {
    keypressed = '';
});



let dist = 200;
let layer1 = new Board(300, 200, 100, 50, 'rgb(255, 255, 255)', 50);
let layer2 = new Board(300, 200 + dist, 100, 50, 'rgb(255, 255, 255)', dist);
let layer3 = new Board(300, 200 + dist * 2, 100, 50, 'rgb(255, 255, 255)', dist * 2);

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
}

main();