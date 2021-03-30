document.onkeydown = () => {
    document.querySelector("#controls-radio").checked = true;
    init();
};

function gameControls() {
    document.onkeydown = (event) => {
        switch (event.keyCode) {
            case 87:
            case 38:
                rotateTetromino(fallingTetromino);
                break;

            case 65:
            case 37:
                moveTetromino(fallingTetromino, "left");
                break;

            case 68:
            case 39:
                moveTetromino(fallingTetromino, "right");
                break;

            case 83:
            case 40:
                acceleratedFall = true;
                break;
        }   
    };
    
    document.onkeyup = (event) => {
        const key = event.keyCode;
    
        if (key == 83 || key == 40)
            acceleratedFall = false;
    };
    
    //TODO: mobile controls
}