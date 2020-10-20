/*
Initialize 3D boards
*/

const w = 100;
const h = 10;
let dist = 200;
const white = 'rgb(255, 255, 255)';
let grid0 = new Grid(0, 500, 200, w, h, white);
let grid1 = new Grid(1, 500, 200, w, h, white);
let grid2 = new Grid(2, 500, 200, w, h, white);
let grid3 = new Grid(3, 500, 200, w, h, white);
let grid4 = new Grid(4, 700, 200, w, h, white); // center
let grid5 = new Grid(5, 500, 200, w, h, white);
let grid6 = new Grid(6, 500, 200, w, h, white);
let grid7 = new Grid(7, 500, 200, w, h, white);
let grid8 = new Grid(8, 500, 200, w, h, white);

let grid9 = new Grid(9, 500, 200 + dist, w, h, white, dist);
let grid10 = new Grid(10, 500, 200 + dist, w, h, white, dist);
let grid11 = new Grid(11, 500, 200 + dist, w, h, white, dist);
let grid12 = new Grid(12, 500, 200 + dist, w, h, white, dist);
let grid13 = new Grid(13, 500, 200 + dist, w, h, white, dist); // center
let grid14 = new Grid(14, 500, 200 + dist, w, h, white, dist);
let grid15 = new Grid(15, 500, 200 + dist, w, h, white, dist);
let grid16 = new Grid(16, 500, 200 + dist, w, h, white, dist);
let grid17 = new Grid(17, 500, 200 + dist, w, h, white, dist);

let grid18 = new Grid(18, 300, 200 + dist * 2, w, h, white, dist * 2);
let grid19 = new Grid(19, 300, 200 + dist * 2, w, h, white, dist * 2);
let grid20 = new Grid(20, 300, 200 + dist * 2, w, h, white, dist * 2);
let grid21 = new Grid(21, 300, 200 + dist * 2, w, h, white, dist * 2);
let grid22 = new Grid(22, 500, 200 + dist * 2, w, h, white, dist * 2); // center
let grid23 = new Grid(23, 300, 200 + dist * 2, w, h, white, dist * 2);
let grid24 = new Grid(24, 300, 200 + dist * 2, w, h, white, dist * 2);
let grid25 = new Grid(25, 300, 200 + dist * 2, w, h, white, dist * 2);
let grid26 = new Grid(26, 300, 200 + dist * 2, w, h, white, dist * 2);

let grids = [];
grids.push(grid0);grids.push(grid1);grids.push(grid2);
grids.push(grid3);grids.push(grid4);grids.push(grid5);
grids.push(grid6);grids.push(grid7);grids.push(grid8);

grids.push(grid9);grids.push(grid10);grids.push(grid11);
grids.push(grid12);grids.push(grid13);grids.push(grid14);
grids.push(grid15);grids.push(grid16);grids.push(grid17);

grids.push(grid18);grids.push(grid19);grids.push(grid20);
grids.push(grid21);grids.push(grid22);grids.push(grid23);
grids.push(grid24);grids.push(grid25);grids.push(grid26);

let vertexes = [];
const renderBoards = (ctx, key) => {
    grid4.attach({grid0, grid1, grid2, grid3, grid5, grid6, grid7, grid8});

    for (let i = 0; i < 9; i++) {
        grids[i].motionPersist();
        vertexes[i] = grids[i].getVertexes();
    }

    for (let i = 9; i < 27; i++) {
        grids[i].motionPersistClone(vertexes[i % 9]);
    }

    for (let i = 26; i >= 0; i--) {
        grids[i].run(ctx, key);
    }
}

const logGrids = () => {
    let str = '';
    for (let grid of grids) {
        if (grid.player === '') {
            str += '+';
        } else {
            str += grid.player.toString();
        }
        if ((grid.id + 1) % 9 == 0) {
            str += '\n\n';
        }
        else if ((grid.id + 1) % 3 == 0) {
            str += '\n';
        }
    }
    console.log(str);
}