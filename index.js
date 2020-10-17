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


function main() {
    requestAnimationFrame(main);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    renderBoards(ctx, keypressed);
}

main();