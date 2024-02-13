const canvas= document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");  // to store the 2D rendering Context
let x = canvas.width/3;
let y = canvas.height-200;
let dx = 2;
let dy = -2;
let radius_circle = 10; 
let xPaddle = canvas.width/2;

let paddleHeight= 10;
let paddleWidth = 60;   // for more complicate level do it smaller
let rightPressed = false;
let leftPressed = false; 
let brickHeight =20;
let brickWidth = 60;
let colBricksNumber = 7;
let rowBrickNumber = 3;
const brick = [];
for (let c=0; c<colBricksNumber; c++){
    brick[c]=[];
    
    for (let r=0; r<rowBrickNumber; r++){
        brick[c][r]={x:0, y:0 , status: 1};
    }
}

function draw_bricks(){
    for (let c=0;c<colBricksNumber; c++){
    
        for (let r=0; r<rowBrickNumber; r++){
            let offsetLeft = 10;
            let offsetTop = 10;
            let padding = 10;
            let xBrick = c * (brickWidth + padding) + offsetLeft; 
            let yBrick = r * (brickHeight + padding) + offsetTop;
            if( brick[c][r].status===1){
                brick[c][r].x = xBrick;
                brick[c][r].y = yBrick;
                ctx.beginPath();
                ctx.rect(xBrick, yBrick,brickWidth, brickHeight);
                ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();}
        }}

    

}

document.addEventListener("keydown",handKeyDown);
document.addEventListener("keyup", handKeyUp);
function handKeyDown(e){
    if(e.key == "left" || e.key == "ArrowLeft")//Edge (16 and earlier) and Firefox (36 and earlier) use "Left"
    {
        leftPressed = true;
    }
    else if(e.key == "right" || e.key == "ArrowRight")//Edge (16 and earlier) and Firefox (36 and earlier) use "Left"
    {
        rightPressed = true;
    }
}

function handKeyUp(e){
    if(e.key == "left" || e.key == "ArrowLeft")//Edge (16 and earlier) and Firefox (36 and earlier) use "Left"
    {
        leftPressed = false;
    }
    else if(e.key == "right" || e.key == "ArrowRight")//Edge (16 and earlier) and Firefox (36 and earlier) use "Left"
    {
        rightPressed = false;
    }
}
function collision_detection(){
    for (let c=0;c<colBricksNumber;c++)
    for(let r=0;r<rowBrickNumber; r++){
        if(brick[c][r].status === 1){
            if (x  > brick[c][r].x && x< brick[c][r].x +brickWidth && y< brick[c][r].y+ brickHeight && y>brick[c][r].y )
            {
                brick[c][r].status = 0;
                dy = -dy;
            }}
}}




function draw_circle(){
    ctx.beginPath();
    ctx.arc(x, y, radius_circle, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(xPaddle,canvas.height - paddleHeight,paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath;
}
function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height); // clear before i create the next frame so that we only see the new frame 
    draw_circle();
    drawPaddle();
    draw_bricks();
    collision_detection();
    if(x + dx < radius_circle || x+dx > canvas.width - radius_circle){   //if the ball go out the canvas right or left, change its direction 
        dx= -dx;
    }
    if(y + dy< radius_circle){  // if the ball go out of the canvas in up direction change its direction down
        dy= -dy;
    }
    else if(y + dy > canvas.height - radius_circle){ // if the ball attend to touch the bottom of canvas
        if(x > xPaddle && x < xPaddle + paddleWidth ) // if the ball arrive on the paddle it is fine chnage direction
        {
            dy = - dy;
        }
        else{   // if the paddle doesnt receive the ball game over
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);  // to stop the game
        }
    }
    
    if (rightPressed && xPaddle  <canvas.width - paddleWidth){  //doesnt matter if its enter a little bit in the wall 
        xPaddle += 7;
    }
    else if (leftPressed && xPaddle>0){
        xPaddle -= 7;
    }
    x += dx;
    y += dy;

    
    

}
const interval = setInterval(draw, 10)
