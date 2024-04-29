// Game constants and variable
let inputDir = {x : 0, y : 0};
const moveSound = new Audio('move.mp3');
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio ('gameover.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [ 
    {x : 6, y : 9}
];
let food = {x : 12, y : 9};

// Game Function 
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // Part-1 : Updating the Snake array & Food

    // Colliding function 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir = {x : 0, y : 0}
        alert("Game Over!!! Press any key to play again!");
        snakeArr = [{x : 6, y : 9}];
        score = 0;
        scoreBox.innerHTML = score;
    }

    // After eating the food update the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = score;
        if(score > hiScoreVal) {
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            hiScoreBox.innerHTML = hiScoreVal;
        }
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a) * Math.random()) , y : Math.round(a + (b-a) * Math.random())}
        for (let i = 0; i < snakeArr.length; i++) {
            if(food.x === snakeArr[i].x && food.y === snakeArr[i].y){
                food = {x : Math.round(a + (b-a) * Math.random()) , y : Math.round(a + (b-a) * Math.random())}
            }
        }
    }

    // Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part-2 : Display the Snake and Food

    // Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display tha Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}



// Main logic starts here
let hiScoreVal
let hiScore = localStorage.getItem("hiscore")
if(hiScore === null) {
    hiScoreVal = 0;
    localStorage.setItem("hiscore" , JSON.stringify(hiScoreVal));
}
else {
    hiScoreVal = JSON.parse(hiScore)
    hiScoreBox.innerHTML = hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x : 0 , y : 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
        break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})