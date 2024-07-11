"use strict";
var canvas = document.getElementById('drawingCanvas');
if (!canvas) {
    throw new Error('Cannot find the canvas element.');
}
var context = canvas.getContext('2d');
if (!context) {
    throw new Error('Cannot get the canvas context.');
}
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;
var painting = false;
var brushColor = 'black';
var brushSize = 5;
var isEraser = false;
var colorPicker = document.getElementById('colorPicker');
if (colorPicker) {
    colorPicker.addEventListener('input', function (e) {
        brushColor = e.target.value;
        isEraser = false;
    });
}
var brushSizeInput = document.getElementById('brushSize');
if (brushSizeInput) {
    brushSizeInput.addEventListener('input', function (e) {
        brushSize = parseInt(e.target.value, 10);
    });
}
var eraserButton = document.getElementById('eraserButton');
if (eraserButton) {
    eraserButton.addEventListener('click', function () {
        isEraser = true;
    });
}
var startPosition = function (e) {
    painting = true;
    draw(e);
};
var finishedPosition = function () {
    painting = false;
    context.beginPath();
};
var draw = function (e) {
    if (!painting)
        return;
    context.lineWidth = brushSize;
    context.lineCap = 'round';
    context.strokeStyle = isEraser ? 'white' : brushColor;
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
