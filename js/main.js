let canvas;
let canvasWrapper;


function init() {
	canvas = document.querySelector("canvas");

	canvasWrapper = document.querySelector(".canvas-wrapper");
	resize();

	initGame();
	startGame();
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