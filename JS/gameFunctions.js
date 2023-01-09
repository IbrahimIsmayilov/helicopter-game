// FUNCTIONS

// Draw Start Screen
function drawStart() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${bestScore}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285)

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

// Run The Game
function runGame() {
  // LOGIC
  moveHeli();
  moveWalls();
  checkCollisions();

  // DRAW
  drawGame();
}

function moveHeli() {
  // Accelerate upward if mouse is pressed
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  // Apply Gravity (Accel)
  heli.speed += heli.accel;

  // Constrain Speed (max/min)
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  // Move Helicopter by Its Speed
  heli.y += heli.speed;
}

function moveWalls() {
  // Constrain Speed (max/min)
  if (walls.speed < -7) {
    walls.speed = -7;
  }

  // Wall 1
  // Add acceleration to this later
  wall1.x += walls.speed;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }

  // Wall 2
  wall2.x += walls.speed;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }

  // Wall 3
  wall3.x += walls.speed;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }

  // Make the walls speed up / the game more difficult
  walls.speed += walls.accel;
  console.log(walls.speed);
}

function gameOver() {
  explosion.play();
  state = "gameover";
  updateScore();

  setTimeout(reset, 2000)
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

// Helper Functions
function updateScore() {
  if (distance > bestScore) {
    bestScore = distance;
  }
}

function reset() {
  state = "start";
  distance = 0;
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.7
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };

  walls = {
    speed: -3,
    accel: -0.001
  }
}



function drawWalls() {
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}

function checkCollisions() {
  // Collision with Top and Bottom Green Bars
  checkTopBottomCollisions();

  // Collision with the Walls
  checkWallCollisions();
}
function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${bestScore}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}

function checkWallCollisions() {
  if (heli.x + heli.w > wall1.x && heli.x < wall1.x + wall1.w && heli.y + heli.h > wall1.y && heli.y < wall1.x + wall1.h && wall1.x + wall1.w < heli.x) {
    gameOver();
  }

  if (heli.x + heli.w > wall2.x && heli.x < wall2.x + wall2.w && heli.y + heli.h > wall2.y && heli.y < wall2.x + wall2.h && wall2.x + wall2.w < heli.x) {
    gameOver();
  }

  if (heli.x + heli.w > wall3.x && heli.x < wall3.x + wall3.w && heli.y + heli.h > wall3.y && heli.y < wall3.x + wall3.h && wall3.x + wall3.w < heli.x) {
    gameOver();
  }
}

function checkTopBottomCollisions() {
  if (heli.y < 50) {
    gameOver();
  } else if (heli.y + heli.h > cnv.height - 50) {
    gameOver();
  }
}

