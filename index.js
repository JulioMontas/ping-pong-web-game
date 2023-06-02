let backgroundColorDefault = 0

// Variables for paddle and ball
let paddle1, paddle2;
let ball;
let paddleHeight = 80;
let paddleWidth = 10;
let ballSize = 10;

// Variables for ball movement
let ballXSpeed = 5;
let ballYSpeed = 5;

// Variables for scores
let score1 = 0;
let score2 = 0;

function setup() {
//   createCanvas(800, 400);
  createCanvas(windowWidth, windowHeight); // Set canvas size to full screen
  
  // Create paddles
//   paddle1 = createVector(0, height / 2 - paddleHeight / 2);
//   paddle2 = createVector(width - paddleWidth, height / 2 - paddleHeight / 2);

  // Create paddles
  paddle1 = createVector(0, windowHeight / 2 - paddleHeight / 2);
  paddle2 = createVector(windowWidth - paddleWidth, windowHeight / 2 - paddleHeight / 2);
  
  // Create ball
//   ball = createVector(width / 2, height / 2);
  ball = createVector(windowWidth / 2, windowHeight / 2);
}

function draw() {
  background(backgroundColorDefault);
  
  // Move paddles
  movePaddle1();
  movePaddle2();
  
  // Draw paddles
  drawPaddle(paddle1);
  drawPaddle(paddle2);
  
  // Move and bounce ball
  moveBall();
  bounceBall();
  
  // Draw ball
  drawBall(ball);
  
  // Draw scores
  drawScores();
}

function movePaddle1() {
  if (keyIsDown(87) && paddle1.y > 0) { // Move paddle1 up (W key)
    paddle1.y -= 5;
  }
  if (keyIsDown(83) && paddle1.y < height - paddleHeight) { // Move paddle1 down (S key)
    paddle1.y += 5;
  }
}

function movePaddle2() {
  if (keyIsDown(UP_ARROW) && paddle2.y > 0) { // Move paddle2 up
    paddle2.y -= 5;
  }
  if (keyIsDown(DOWN_ARROW) && paddle2.y < height - paddleHeight) { // Move paddle2 down
    paddle2.y += 5;
  }
}

function drawPaddle(paddle) {
  fill(255);
  rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function moveBall() {
  ball.x += ballXSpeed;
  ball.y += ballYSpeed;
}

function bounceBall() {
  // Bounce ball off the walls
  if (ball.y < 0 || ball.y > height - ballSize) {
    ballYSpeed *= -1;
  }
  
  // Bounce ball off paddles
  if (
    (ball.x < paddleWidth && ball.y > paddle1.y && ball.y < paddle1.y + paddleHeight) || // Bounce off paddle1
    (ball.x > width - paddleWidth - ballSize && ball.y > paddle2.y && ball.y < paddle2.y + paddleHeight) // Bounce off paddle2
  ) {
    ballXSpeed *= -1;
  }
  
  // Score points
  if (ball.x < 0) {
    score2++;
    resetBall();
  }
  if (ball.x > width - ballSize) {
    score1++;
    resetBall();
  }
}

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ballXSpeed *= random() > 0.5 ? 1 : -1; // Randomize ball's initial X direction
  ballYSpeed *= random() > 0.5 ? 1 : -1; // Randomize ball's initial Y direction
}


function drawBall(ball) {
  fill(255);
  ellipse(ball.x, ball.y, ballSize, ballSize);
}

function drawScores() {
  fill(255);
  textSize(24);
  text("Score 1: " + score1, 20, 30);
  text("Score 2: " + score2, width - 140, 30);
  // if (score1 >= score1 || score2 >= score2) {
  //   backgroundColorDefault = 255
  //   setTimeout(() => {
  //     backgroundColorDefault = 0
  //   }, 100); // Delay in milliseconds before resetting the background color
  // }
}
