const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20,20);


const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
]

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos]; //destructuring
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 && (arena[y + o.y] && arena[y+o.y][x+o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) =>{
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, 
                                 y + offset.y,
                                 1, 1);
            }
        })
    });
}


function merge(arena, player) {
    player.matrix.forEach((row, y) => {//forEach in js is like enumerate in Python
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    })
}

function playerSpace() {
    while (player.pos.y != 0) {
        playerDrop();
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        console.log('smashed');
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerRotate(dir) {
    rotate(player.matrix, dir);
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++ x) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

const player = {
    pos: {x: 5, y: 0},
    matrix: matrix,
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0,0, canvas.width, canvas.height);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0;
let dropInterval = 1000; // milliseconds to drop

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);

document.addEventListener('keydown', (event) => {
    // note that there are no parens after the case.
    // furthermore, STOP FORGETTING THE BREAK!!
    switch(event.key) {
        case 'ArrowLeft':
            playerMove(-1);
            break;
        case 'ArrowRight':
            playerMove(+1);
            break;
        case 'ArrowDown':
            playerDrop();
            break;
        case 'ArrowUp':
            playerRotate(-1);
            break;
        case ' ':
            playerSpace();
            break;
    }
})



update();
