let canvas;
let canvasWrapper;
let isMobile;

function checkDevice() {
	isMobile = /Android|webOS|iPhone|iPad|iPod|Windows Phone|BlackBerry/i.test(navigator.userAgent);

	if (isMobile) {
		document.querySelector(".controls-desktop").style.display = "none";
		document.querySelector(".controls-mobile").style.display = "unset";
	}

	document.onkeydown = () => {
        document.querySelector("#controls-radio").checked = true;
        init();
    };
}

function init() {
	canvas = document.querySelector("canvas");
	canvasWrapper = document.querySelector(".canvas-wrapper");
	resize();

	initGame();
}

function resize() {
	if (canvasWrapper) {
		canvas.width = canvasWrapper.clientWidth;
		canvas.height = canvasWrapper.clientHeight;

		render(canvas);
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}