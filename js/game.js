let field = [];
let trash = [];
let score;

let gameStartTime;
let pauseStartTime;

let fallingTetromino = {
    "x": 0,
    "y": 0,
    "shape": [],
    "color": 0
};

let acceleratedFall = false;

//let pauseElem; (checkbox)
let timeElem;
let scoreElem;

let interval;

function initGame() {
    controls();

    timeElem = document.querySelector(".time").querySelector("span");
    scoreElem = document.querySelector(".score").querySelector("span");
}

function startGame() {
    for (let y = 0; y < fieldHeight; y++) {
        field[y] = [];
        trash[y] = [];

        for (let x = 0; x < fieldWidth; x++) {
            field[y][x] = 0;
            trash[y][x] = 0;
        }
    }

    addTetromino();
    
    score = 0;
    updateScore(scoreElem);

    gameStartTime = Date.now();
    updateTime(timeElem);

    acceleratedFall = false;
    let currTick = 0;

    interval = setInterval(() => {
        currTick++;
        tick(currTick);
    }, tickDelay);
}

function tick(currTick) {
    //if (!pause)

    if (currTick % 5 == 0) {
        updateTime(timeElem, Date.now() - gameStartTime);

        checkTrash();

        if (acceleratedFall || currTick % 40 == 0) {
            if ( !moveTetromino(fallingTetromino) )
                land(fallingTetromino);

            render(canvas);
        }
    }
}

function finishGame() {
    clearInterval(interval);

    //show end screen

    alert("score: " + score); //TEMP

    startGame();
}

function addTetromino() {
    const tetrominoesCount = tetrominoes.length;
    const colorsCount = images["cube"].length;

    const type = getRandomInt(0, tetrominoesCount - 1);
    fallingTetromino.shape = JSON.parse( tetrominoes[type] );

    if (colorMode == "random")
        fallingTetromino.color = getRandomInt(1, colorsCount);
    else
        fallingTetromino.color = Math.floor((type + 1) / tetrominoesCount * colorsCount);

    fallingTetromino.x = Math.floor(fieldWidth / 2) - Math.floor(fallingTetromino.shape[0].length / 2);
    fallingTetromino.y = 0;

    if ( checkCollision(fallingTetromino) ) {
        finishGame();
		return false;
    }

    map(field, fallingTetromino);
    render(canvas);
}

function moveTetromino(tetromino, side = "bottom") {
    if ( checkCollision(tetromino, side) )
        return false;

    if (side == "bottom")
        tetromino.y += 1;
    else
        tetromino.x += (side == "right") ? 1 : -1;

    map(field, tetromino);
    render(canvas);

    return true;
}

function rotateTetromino(tetromino) {
    rotateMatrix(tetromino.shape);

    if ( checkCollision(tetromino) ) {
        rotateMatrix(tetromino.shape, false);
        return false;
    }

    map(field, tetromino);
    render(canvas);

    return true;
}

function rotateMatrix(matrix, clockwise = true) {
    const size = matrix.length;

    if (clockwise) {
		for (let i = 0; i < size/2; i++) {
            for (let j = i; j < size - i - 1; j++) {
                const tmp = matrix[size - j - 1][i];
                matrix[size - j - 1][i] = matrix[size - i - 1][size - j - 1];
                matrix[size - i - 1][size - j - 1] = matrix[j][size - i - 1];
                matrix[j][size - i - 1] = matrix[i][j];
                matrix[i][j] = tmp;
            }
        }
    } else {
		for (let i = 0; i < size/2; i++) {
            for (let j = i; j < size - i - 1; j++) {
                const tmp = matrix[i][j];
                matrix[i][j] = matrix[j][size - i - 1];
                matrix[j][size - i - 1] = matrix[size - i - 1][size - j - 1];
                matrix[size - i - 1][size - j - 1] = matrix[size - j - 1][i];
                matrix[size - j - 1][i] = tmp;
            }
        }
    }
}

function checkCollision(tetromino, side) {
    let x0 = tetromino.x;
    let y0 = tetromino.y;

    if (side == "left")
        x0 -= 1;
    else if (side == "right")
        x0 += 1;
    else if (side == "bottom")
        y0 += 1;

    for (let y = 0; y < tetromino.shape.length; y++) {
        const line = tetromino.shape[y];

        for (let x = 0; x < line.length; x++) {
            if ( line[x] ) {
                if (!trash[y0 + y] || trash[y0 + y][x0 + x] != 0)
                    return true;
            }
        }
    }

    return false;
}

function map(field, tetromino) {
    for (let y = 0; y < fieldHeight; y++) {
        for (let x = 0; x < fieldWidth; x++) {
            field[y][x] = 0;
        }
    }

    const x0 = tetromino.x;
    const y0 = tetromino.y;

    for (let y = 0; y < tetromino.shape.length; y++) {
        const line = tetromino.shape[y];

        for (let x = 0; x < line.length; x++) {
            if ( line[x] ) {
                field[y0 + y][x0 + x] = tetromino.color;
            }
        }
    }
}

function land(tetromino) {
    let x0 = tetromino.x;
    let y0 = tetromino.y;

    for (let y = 0; y < tetromino.shape.length; y++) {
        const line = tetromino.shape[y];

        for (let x = 0; x < line.length; x++) {
            if ( line[x] )
                trash[y0 + y][x0 + x] = tetromino.color;
        }
    }

    score += 5;
    updateScore(scoreElem, score);

    addTetromino();
}

function checkTrash() {
    let completedLines = 0;

    for (let y = fieldHeight - 1; y >= 0; y--) {
        const count = trash[y].filter(x => x > 0).length;

        if (count) {
            if (count == fieldWidth) {
                completedLines++;

                for (let x = 0; x < fieldWidth; x++) {
                    trash[y][x] = 0;
                }
            } else if (completedLines) {
                for (let x = 0; x < fieldWidth; x++) {
                    trash[y + completedLines][x] = trash[y][x];
                    trash[y][x] = 0;
                }
            }
        }
    }

    if (completedLines) {
        score += completedLines * (completedLines*25 + 75);
        updateScore(scoreElem, score);
    }
}

function updateScore(elem, score = 0) {
    elem.innerText = `score: ${score}`;
}

function updateTime(elem, time = 0) {
    //TEMP
    const seconds = Math.round(time / 1000);
    elem.innerText = `time: ${seconds} s`;
}