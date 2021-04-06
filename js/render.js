let images = {
    "cube": [
        loadImage("cube-red"),
        loadImage("cube-orange"),
        loadImage("cube-yellow"),
        loadImage("cube-green"),
        loadImage("cube-cyan"),
        loadImage("cube-blue"),
        loadImage("cube-indigo")
    ],

    "outline": loadImage("outline")
};

function loadImage(name) {
	let img = new Image();
    img.src = `assets/images/${name}.png`;
    
    return img;
}

function render(canvas) {
    ctx = canvas.getContext("2d");
    cw = canvas.width;
    ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);

    const cubeSize = Math.min(
        Math.floor(cw / (fieldWidth + fieldHeight)*2),
        Math.floor(ch / (fieldWidth + fieldHeight + 2)*4)
    );

    if ( !field[0] )
        return false;

    const tetrominoX = fallingTetromino.x;
    const tetrominoY = fallingTetromino.y;

    for (let y = 0; y < fieldHeight; y++) {
        for (let x = 0; x < fieldWidth; x++) {
            const pos = calcPos(x, y, cubeSize);
            let image = images.outline;

            if (field[y][x]
                || fallingTetromino.shape[y - tetrominoY]
                && fallingTetromino.shape[y - tetrominoY][x - tetrominoX]
            ) {
                let imageNum = 0;

				if (colorMode == "normal" || colorMode == "random") {
                    if ( field[y][x] )
                        imageNum = field[y][x] - 1;
                    else
                        imageNum = fallingTetromino.color - 1;
                } else if (colorMode == "rainbow") {
                    const colorsNum = images.cube.length;
                    imageNum = Math.floor((y + 1) / fieldHeight * colorsNum);

                    if (imageNum >= colorsNum)
                        imageNum = colorsNum - 1;
                }
                
                image = images.cube[imageNum];
            }

            ctx.drawImage(image, pos.x, pos.y, cubeSize, cubeSize);
        }
    }
}

function calcPos(x, y, cubeSize) {
    const xShift = (x - y)/2 - (fieldWidth - fieldHeight)/4 - 1/2;
    const yShift =  (x + y)/4 - (fieldWidth + fieldHeight)/8 - 1/4;

    const xPos = xShift*cubeSize + cw/2
    const yPos = yShift*cubeSize + ch/2;

    return {"x": xPos, "y": yPos};
}

function changeColorMode(mode) {
    colorMode = mode;
    render(canvas);
}