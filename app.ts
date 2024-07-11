const canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement | null;
if (!canvas) {
    throw new Error('Cannot find the canvas element.');
}

const context = canvas.getContext('2d');
if (!context) {
    throw new Error('Cannot get the canvas context.');
}

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

let painting = false;
let brushColor = 'black';
let brushSize = 5;
let isEraser = false;

const colorPicker = document.getElementById('colorPicker') as HTMLInputElement | null;
if (colorPicker) {
    colorPicker.addEventListener('input', (e) => {
        brushColor = (e.target as HTMLInputElement).value;
        isEraser = false;
    });
}

const brushSizeInput = document.getElementById('brushSize') as HTMLInputElement | null;
if (brushSizeInput) {
    brushSizeInput.addEventListener('input', (e) => {
        brushSize = parseInt((e.target as HTMLInputElement).value, 10);
    });
}

const eraserButton = document.getElementById('eraserButton') as HTMLButtonElement | null;
if (eraserButton) {
    eraserButton.addEventListener('click', () => {
        isEraser = true;
    });
}

const startPosition = (e: MouseEvent) => {
    painting = true;
    draw(e);
};

const finishedPosition = () => {
    painting = false;
    context.beginPath();
};

const draw = (e: MouseEvent) => {
    if (!painting) return;

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
