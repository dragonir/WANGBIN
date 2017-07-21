"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PI = Math.PI;
var TAU = 2 * PI;
var cos = function cos(n) {
	return Math.cos(n);
};
var sin = function sin(n) {
	return Math.sin(n);
};

var canvas = document.querySelector(".canvas");
var ctx = canvas.getContext("2d");

var emojis = ["😭", "😢", "☹️", "🙁", "😐", "🙂", "😊", "😁", "😂"];

var tick = 0,
    opts = {
	cells: {
		size: 30
	},
	noise: {
		xOff: 10,
		yOff: 10,
		zOff: 5
	}
};

var Cell = function () {
	function Cell(x, y, size) {
		_classCallCheck(this, Cell);

		this.position = { x: x, y: y };
		this.size = size;
		this.draw();
	}

	Cell.prototype.draw = function draw() {
		var noiseVal = (noise.simplex3(this.position.x / (opts.noise.xOff * 50), this.position.y / (opts.noise.yOff * 50), tick / (opts.noise.zOff * 50)) + 1) / 2;
		ctx.font = this.size + "px sans-serif";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.fillText(emojis[Math.round(noiseVal * 8)], this.position.x, this.position.y);
	};

	return Cell;
}();

function initGUI() {
	var GUI = new dat.GUI();

	var f1 = GUI.addFolder("cells");
	f1.open();
	f1.add(opts.cells, "size").step(1).min(15).max(50);
	var f2 = GUI.addFolder("noise");
	f2.open();
	f2.add(opts.noise, "xOff").step(1).min(1).max(100);
	f2.add(opts.noise, "yOff").step(1).min(1).max(100);
	f2.add(opts.noise, "zOff").step(1).min(1).max(100);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw() {
	ctx.fillStyle = "rgb(5,5,5)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var x = undefined,
	    y = undefined,
	    cell = undefined,
	    cols = Math.floor(window.innerWidth / opts.cells.size),
	    rows = Math.floor(window.innerHeight / opts.cells.size);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			x = (i + 1) * opts.cells.size;
			y = (j + 1) * opts.cells.size;
			cell = new Cell(x, y, opts.cells.size);
		}
	}
}

function loop() {
	tick++;
	draw();
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
}();

window.onresize = function () {
	return resize();
};

window.onload = function () {
	noise.seed(Math.round(2000 * Math.random()));
	resize();
	initGUI();
	loop();
};