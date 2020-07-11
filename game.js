/*
  Code modified from:
  Game monster of Charles Lee - CEO - CoderSchool
  using graphics purchased from craftpix.net/
*/

let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

let bgReady, player1Ready, player2Ready, ballReady;
let bgImage, player1Image, player2Image, ballImage;
let ballX = 380;
let ballY = 320;
//Ball setting 
let ball = {
  bounce: 0.8,
  power: 1.1,
  velX: (Math.random() * 1 + 1) * (Math.floor(Math.random() * 2) || -1),
  velY: (Math.random() * 1 + 1) * (Math.floor(Math.random() * 2) || -1)
}
ballX += ball.velX
ballY += ball.velY

let startTime = Date.now();
let SECONDS_PER_ROUND = 90;
let elapsedTime = 0;
let gameOver = true

function loadImages() {
  bgImage = new Image();
  bgImage.src = "images/court_02 - Copy.png";
  bgImage.onload = function () {
    // show the background image
    bgReady = true;  
  };
  player1Image = new Image();
  player1Image.onload = function () {
    // show the player1 image
    player1Ready = true;
  };
  player1Image.src = "images/Run (4).png";

  player2Image = new Image();
  player2Image.onload = function () {
    // show the player2 image
    player2Ready = true;
  };
  player2Image.src = "images/Run (17).png";
  ballImage = new Image();
  ballImage.onload = function () {
    // show the player2 image
    ballReady = true;
  };
  ballImage.src = "images/ball.png";
  gameOver = false
}

/** 
 * Setting up our characters.
 * 
 * Note that player1X represents the X position of our player1.
 * player1Y represents the Y position.
 * We'll need these values to know where to "draw" the player1.
 * 
 * The same applies to the player2.
 */

let player1X = 160;
let player1Y = 300;

let player2X = 600;
let player2Y = 300;

let score1 = 0
let score2 = 0



/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the player2 has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  if(elapsedTime == SECONDS_PER_ROUND){ //if timel
    gameOver = true
    document.getElementById("over").style.display = "block"
    return 
  }
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);


  if (87 in keysDown) { // Player is holding up key
    player1Y -= 2;
  }
  if (83 in keysDown) { // Player is holding down key
    player1Y += 2;
  }
  if (65 in keysDown) { // Player is holding left key
    player1X -= 2;
  }
  if (68 in keysDown) { // Player is holding right key
    player1X += 2;
  }

  if (38 in keysDown) { // Player is holding up key
    player2Y -= 2;
  }
  if (40 in keysDown) { // Player is holding down key
    player2Y += 2;
  }
  if (37 in keysDown) { // Player is holding left key
    player2X -= 2;
  }
  if (39 in keysDown) { // Player is holding right key
    player2X += 2;
  }
  // Check if player and player2 collided. Our images
  // are about 32 pixels big.

  if (player1X + 25 >= ballX   
    && ballX + 40 >= player1X + 25
    && player1Y + 60 >= ballY  
    && ballY + 40 >= player1Y){
    // && ballY +20>= player1Y){
    ball.velX *= -ball.power
    ballX = player1X + 50
  }
  console.log("player1 Pos:", player1X, player1Y, "Ball Pos:", ballX, ballY)
  
  if (player2X + 25 >= ballX   
    && ballX + 40 >= player2X + 25
    && player2Y + 60 >= ballY  
    && ballY + 40 >= player2Y){
    // && ballY +20>= player1Y){
    ball.velX *= -ball.power
    ballX = player2X - 25
    }
    console.log("player1 Pos:", player2X, player2Y, "Ball Pos:", ballX, ballY)

  // if(player2X + 25 >= ballX   
  //   && ballX + 40 >= player2X + 25
  //   && player2Y + 60 == ballY  
  //   && ballY + 40 == player2Y){
  //     ball.velY = ball.velY
  //     ballY = 
  //   }

  //   if(player1X + 25 >= ballX   
  //     && ballX + 40 >= player1X + 25
  //     && player1Y + 60 == ballY  
  //     && ballY + 40 == player1Y){
  //       ball.velY = ball.velY
  //     }

  // if ((player1X <= (ballX + 40) && (ballY <= player1Y + 70 || player1Y <= ballY + 40 )) || ((ballX <= player1X + 50) && (ballY <= player1Y + 70 || player1Y <= ballY + 40 ))){
  //   ball.velX = -ball.velX 
  //   console.log("Vel", ball.velX)
  // }

  // if ((player2X <= (ballX + 40) && (ballY <= (player2Y + 70) || player2Y <= ballY + 40 )) || ((ballX <= player2X + 50) && (ballY <= player2Y + 70 || player2Y <= ballY + 40 ))){
  //   ball.velX = -ball.velX 
  // }
  
  if(player1X >= 340){
    player1X = 340
  }
  if(player1X < 63){
    player1X = 63
  }
  
  if(player1Y <= 130){
    player1Y = 130
  }
  if(player1Y > 445){
    player1Y = 445
  }

  if(player2X >= 695){
    player2X = 695
  }
  if(player2X < 410){
    player2X = 410
  }
  
  if(player2Y <= 130){
    player2Y = 130
  }
  if(player2Y > 445){
    player2Y = 445
  }

  ballX += ball.velX;
  ballY += ball.velY;
  
  // bottom bound / floor
  if (ballY  >= 465) {
    ball.velY *= -ball.bounce
    ballY = 465 
  }
  // top bound / ceiling
  if (ballY  < 140) {
    ball.velY *= -ball.bounce
    ballY = 140
  }

  // left bound
  if ((ballX <= 95 && ballY <= 210) || (ballX <= 90 && ballY + 40>= 450 )) {
    ball.velX *= -ball.bounce
    ballX = 95
  }
  // right bound
  if ((ballX + 40 >= 715 && ballY <= 215) || (ballX +40 >= 715 && ballY +40 >= 450)) {
    ball.velX *= -ball.bounce
    ballX = (700 - 40)
  }
  // GOOOOOOOOOOOOOOOOOOOOALLLLLLLLLLLL !! left
  if (((ballX < 52) && (ballY > 215)) || ((ballX < 52) && ((ballY + 40) < 450 ))) {
    ballX = 52;
    ball.velY = 0
    ball.velX = 0
    score1 ++
    document.getElementById("goal").style.display = "block"
    document.getElementById("start").style.display = "block"
    gameOver = true
    return
  }
  // GOOOOOOOOOOOOOOOOOOOOALLLLLLLLLLLL !! right
  if (((ballX + 40 > 755) && (ballY > 215)) || (ballX +40 > 755 && ((ballY + 40) < 450 ))) {
    ballX = 715;
    ball.velY = 0
    ball.velX = 0
    score2 ++
    document.getElementById("goal").style.display = "block"
    document.getElementById("start").style.display = "block"
    gameOver = true
    return
  }

  // ++ Velocity top
  if (ballY  <= 140 && 591 >= ballX 
    &&ballX >=575>=575) {
    ball.velY = -(ball.velY += 2)
    ballY = 140
  }
  
  if (ballY  <= 140 && 207 >= ballX >= 223) {
    ball.velY = -(ball.velY += 2)
    
    ballY = 145
  }
  // ++Velocity bot
  if (ballY  >= 465 && 207 >= ballX >= 223) {
    ball.velY = -(ball.velY += 2)
    
    ballY = 465 
  }
  
  if (ballY  >=465 && 591 >= ballX >=575) {
    ball.velY = -(ball.velY += 2) 
    ballY = 465
  }
};
// when player1 meet the edge of the canvas it turn to the opposite side




/**
 * This function, render, runs as often as possible.
 */
let render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (player1Ready) {
    ctx.drawImage(player1Image, player1X, player1Y);
  }
  if (player2Ready) {
    ctx.drawImage(player2Image, player2X, player2Y);
  }
  if (ballReady) {
    ctx.drawImage(ballImage, ballX, ballY);
  }
  ctx.fillText(`Macth time: ${SECONDS_PER_ROUND - elapsedTime}`, 340, 105);
  ctx.fillText(`${score2}`, 370, 45, 50, 20);
  ctx.fillText(`${score1}`, 420, 45, 50, 20);
  ctx.font = "20px Georgia";
  
  if (gameOver = true){
  }
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
let main = function () {
  update(); 
  render(); 
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!


loadImages();
setupKeyboardListeners();
main();

function resetbtn () {
  player1X = 160;
  player1Y = 300;

  player2X = 600;
  player2Y = 300;

  ballX = 380;
  ballY = 320;

  document.getElementById("goal").style.display = "none";
  document.getElementById("start").style.display = "none";

  ball.velX = (Math.random() * 1 + 1) * (Math.floor(Math.random() * 2) || -1),
  ball.velY = (Math.random() * 1 + 1) * (Math.floor(Math.random() * 2) || -1)

  update()
  render()
}

