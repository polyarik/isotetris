function controls() {
    document.onkeydown = (event) => {
        const key = event.keyCode;
    
        if (key == 87 || key == 38)
            rotateTetromino(fallingTetromino);
        else if (key == 65 || key == 37)
            moveTetromino(fallingTetromino, "left");
        else if (key == 68 || key == 39)
            moveTetromino(fallingTetromino, "right");
        else if (key == 83 || key == 40)
            acceleratedFall = true;
    };
    
    document.onkeyup = (event) => {
        const key = event.keyCode;
    
        if (key == 83 || key == 40)
            acceleratedFall = false;
    };
    
    //TODO: mobile controls
}