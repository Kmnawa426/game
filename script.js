// Game Elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

// Canvas dimensions
canvas.width = 500;
canvas.height = 400;

// Game Variables
let basketX = canvas.width / 2 - 30; // initial X position of the basket
const basketWidth = 60;
const basketHeight = 20;
let score = 0;
let fallingObjectX = Math.random() * (canvas.width - 20);
let fallingObjectY = -20; // start off-screen
const objectRadius = 15;
const objectSpeed = 3;
let isGameOver = false;

// Basket Movement
const moveSpeed = 5; // speed of the basket

// Event listener for basket movement
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && basketX > 0) {
    basketX -= moveSpeed;
  } else if (event.key === "ArrowRight" && basketX < canvas.width - basketWidth) {
    basketX += moveSpeed;
  }
});

// Game Loop
function gameLoop() {
  if (isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff6347";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
    return;
  }

  // Clear canvas for new frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw basket
  ctx.fillStyle = "#FF6F61";
  ctx.fillRect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);

  // Draw falling object
  ctx.fillStyle = "#FFEB3B";
  ctx.beginPath();
  ctx.arc(fallingObjectX, fallingObjectY, objectRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  // Move falling object
  fallingObjectY += objectSpeed;

  // Check if object hits the bottom
  if (fallingObjectY + objectRadius >= canvas.height - basketHeight && 
      fallingObjectX > basketX && fallingObjectX < basketX + basketWidth) {
    // Object caught
    score += 1;
    scoreDisplay.textContent = score;
    fallingObjectY = -20;  // Reset position of the falling object
    fallingObjectX = Math.random() * (canvas.width - 20); // New random X position
  }

  // If object falls off screen
  if (fallingObjectY > canvas.height) {
    isGameOver = true;
  }

  // Continue the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
