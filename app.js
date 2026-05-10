//Game Constants & variable
let inputDir = {x:0,y:0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');

let speed = 5;
let score = 0;
let highscoreval = 0;
let lastpaintTime = 0;

let snakeArr = [
    {x:13,y:15}
];

let food = {x:6,y:7};

// Game Functions
function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime - lastpaintTime)/1000 < 1/speed){
        return;
    }

    lastpaintTime = ctime;
    gameEngine();
}

// ❗ FIXED COLLISION FUNCTION
function isCollide(snake){
    // self collision
    for(let i=1;i<snake.length;i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // wall collision (FIXED)
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
        return true;
    }

    return false; // ❗ important
}

function gameEngine(){

    // Game Over
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game over! Press any key to play again");

        snakeArr = [{x:13,y:15}];
        score = 0;

        musicSound.play();
    }

    // Food eaten
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;


        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });

        let a = 2;
        let b = 16;
        if(score > highscoreval){
    highscoreval = score;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
    highscoreBox.innerHTML = "HighScore:" + highscoreval; // ❗ extra 0 hata diya
}

        // ❗ food sirf yaha generate hoga
        food = {
            x: Math.round(a + (b-a) * Math.random()),
            y: Math.round(a + (b-a) * Math.random())
        };
    }

    // Moving snake
    for (let i = snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display
    board.innerHTML = "";

    snakeArr.forEach((e,index)=>{
        let snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        } else{
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    // Food display
    let foodElement = document.createElement('div');

    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');
    board.appendChild(foodElement);

    // Score update
    scoreBox.innerHTML = "Score:" + score;
}

// 🔥 IMPORTANT: ye sab gameEngine ke bahar hona chahiye

let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
} else {
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore:" + highscoreval;
}

// Start game
musicSound.play();
window.requestAnimationFrame(main);

// Controls
window.addEventListener('keydown', e => {
    inputDir = {x:0,y:1};
    moveSound.play();

    switch (e.key) {
        case "ArrowUp":
            inputDir = {x:0,y:-1};
            break;

        case "ArrowDown":
            inputDir = {x:0,y:1};
            break;

        case "ArrowLeft":
            inputDir = {x:-1,y:0};
            break;

        case "ArrowRight":
            inputDir = {x:1,y:0};
            break;
    }
});