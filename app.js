const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");


let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

// Retrieve the high score from the local storage, or set it to 0 if not present
let highScore = localStorage.getItem("high-score") || 0;

// Display the high score on the page
highScoreElement.innerHTML = `High Score: ${highScore}`;

// Function to change the position of the food on the game board
const changeFoodPosition = () => {
    // Generate random X and Y coordinates for the food within the range of 1 to 30
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Function to handle game over
const handleGameOver = () => {
    // Clear the interval for the game loop
    clearInterval(setIntervalId);

    // Show an alert indicating the game is over and prompt the user to replay
    alert("Game Over! Press OK to replay");

    // Reload the page to start a new game
    location.reload();
}

// Function to change the direction of the player based on the pressed arrow key
const changeDirection = (e) => {
    if (e.key === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
    // Call the 'initgame' function to reinitialize the game with the updated direction
    initgame();
}

// Attach click event listeners to the control elements for touch-based input
controls.forEach(key => {
    // When a control element is clicked, call 'changeDirection' function with the corresponding arrow key
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
});
// Function to initialize and update the game state
const initgame = () => {
    // If the game is over, handle the game over condition and return
    if (gameOver) return handleGameOver();

    // Initialize the HTML markup with the food element at the food position
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

    // Check if the snake's head position matches the food position (ate the food)
    if (snakeX === foodX && snakeY === foodY) {
        // Change the position of the food
        changeFoodPosition();

        // Increase the length of the snake's body
        snakeBody.push([foodX, foodY]);

        // Increase the score
        score++;

        // Update the high score if the current score is higher
        highScore = score >= highScore ? score : highScore;

        // Store the updated high score in the local storage
        localStorage.setItem("high-score", highScore);

        // Update the score element on the page
        scoreElement.innerHTML = `Score: ${score}`;

        // Update the high score element on the page
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    // Update the positions of the snake's body segments
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Update the position of the snake's head based on the velocity (direction)
    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    // Check if the snake has hit the boundaries of the play board
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        // Set the game over flag if the snake is out of bounds
        gameOver = true;
    }

    // Generate the HTML markup for the snake's body segments and check for collisions
    for (let i = 0; i < snakeBody.length; i++) {
        // Generate HTML markup for each snake body segment and add it to the HTML markup string
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;

        // Check if there's a collision (snake biting itself) excluding the head
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            // Set the game over flag if there's a collision
            gameOver = true;
        }
    }

    // Update the game board with the new HTML markup representing the game state
    playBoard.innerHTML = htmlMarkup;
}

setIntervalId = setInterval(initgame, 125)
changeFoodPosition();
document.addEventListener("keydown", changeDirection);