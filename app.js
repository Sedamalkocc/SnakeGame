const playBoard = document.querySelector(".play-board")

let foodX, foodY;
let snakeX = 5, snkaeY = 10;
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
const initgame = () => {
    let htmlMarkup = `<div class ="food" style="grid-area:${foodY}/${foodX}"></div>`;
    htmlMarkup += `<div class ="head" style="grid-area:${snkaeY}/${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();

initgame();
