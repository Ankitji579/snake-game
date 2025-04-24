
const canvas = document.querySelector("#gameBoard");
const ctx = canvas.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const unitSize = 25;
let xVelocity = unitSize;
let yVelocity = 0;
let score = 0;
let running = true;

let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

let foodX, foodY;

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

function gameStart(){
    running = true;
    score = 0;
    scoreText.textContent = score;
    createFood();
    gameLoop();
}

function gameLoop(){
    if (!running) return gameOver();
    setTimeout(() => {
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkCollision();
        gameLoop();
    }, 100);
}

function clearBoard(){
    ctx.fillStyle = "#001f3f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createFood(){
    foodX = Math.floor(Math.random() * (canvas.width / unitSize)) * unitSize;
    foodY = Math.floor(Math.random() * (canvas.height / unitSize)) * unitSize;
}

function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    if (head.x === foodX && head.y === foodY) {
        score++;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake(){
    ctx.fillStyle = "lime";
    ctx.strokeStyle = "darkgreen";
    for (const part of snake) {
        ctx.fillRect(part.x, part.y, unitSize, unitSize);
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    }
}

function changeDirection(event){
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    switch (event.keyCode) {
        case LEFT: if (xVelocity === 0) {xVelocity = -unitSize; yVelocity = 0;} break;
        case UP: if (yVelocity === 0) {xVelocity = 0; yVelocity = -unitSize;} break;
        case RIGHT: if (xVelocity === 0) {xVelocity = unitSize; yVelocity = 0;} break;
        case DOWN: if (yVelocity === 0) {xVelocity = 0; yVelocity = unitSize;} break;
    }
}

function checkCollision(){
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) running = false;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) running = false;
    }
}

function gameOver(){
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function resetGame(){
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    xVelocity = unitSize;
    yVelocity = 0;
    gameStart();
}

gameStart();
