document.onkeydown = () => {
    document.querySelector("#controls-radio").checked = true;
    init();
};

function initControls() {
    if (isMobile)
        initMobileControls();
    else
        initDesktopControls();
}

function initDesktopControls() {
    document.onkeydown = (event) => {
        switch (event.keyCode) {
            case 87:
            case 38:
            case 75:
                rotateTetromino(fallingTetromino);
                break;

            case 68:
            case 39:
            case 76:
                moveTetromino(fallingTetromino, "right");
                break;

            case 65:
            case 37:
            case 72:
                moveTetromino(fallingTetromino, "left");
                break;

            case 83:
            case 40:
            case 74:
                acceleratedFall = true;
                break;

            case 27:
            case 13:
                pause();
        }   
    };
    
    document.onkeyup = (event) => {
        const key = event.keyCode;
    
        if (key == 83 || key == 40 || key == 74)
            acceleratedFall = false;
    };
}

function initMobileControls() {
    document.onkeydown = () => {
        return false;
    }

    document.onkeyup = () => {
        return false;
    }

    document.oncontextmenu = () => {
        return false;
    }

    let touchInterval;

    document.ontouchstart = (event) => {
        const x = event.touches[0].clientX;
        const y = event.touches[0].clientY;
        
        const cw = canvasWrapper.clientWidth;
        const ch = canvasWrapper.clientHeight;
        
        const y1 = ch/cw * x; // the main diagonal
        const y2 = -ch/cw * x + ch; // side diagonal
        
        if (y < y1) {
            if (y < y2)
                rotateTetromino(fallingTetromino);
            else {
                touchInterval = setInterval(() => {
                    moveTetromino(fallingTetromino, "right");
                }, touchDelay);
            }
        } else {
            if (y < y2){
                touchInterval = setInterval(() => {
                    moveTetromino(fallingTetromino, "left");
                }, touchDelay);
            }
            else
                acceleratedFall = true;
        }
    };

    document.ontouchend = (event) => {
        clearInterval(touchInterval);
        acceleratedFall = false;
    };
}

function initEndScreenControls(endScreen) {
    document.onkeydown = () => {
        return false;
    };

    document.onkeyup = (event) => {
        const key = event.keyCode;
    
        if (key == 27 || key == 13)
        startGame();
    };
}