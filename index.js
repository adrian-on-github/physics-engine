"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Balls = [];

let LEFT, UP, RIGHT, DOWN;

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel_x = 0;
    this.vel_y = 0;
    this.velocity = 4;
    this.player = false;
    Balls.push(this);
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
  }
}

function keyControl(b) {
  canvas.addEventListener("keydown", (event) => {
    if (event.keyCode === 87) {
      // W
      UP = true;
    }
    if (event.keyCode === 65) {
      // A
      LEFT = true;
    }
    if (event.keyCode === 83) {
      // S
      DOWN = true;
    }
    if (event.keyCode === 68) {
      // D
      RIGHT = true;
    }
  });

  canvas.addEventListener("keyup", (event) => {
    if (event.keyCode === 87) {
      // W
      UP = false;
    }
    if (event.keyCode === 65) {
      // A
      LEFT = false;
    }
    if (event.keyCode === 83) {
      // S
      DOWN = false;
    }
    if (event.keyCode === 68) {
      // D
      RIGHT = false;
    }
  });

  if (UP) {
    b.vel_y = -b.velocity;
  }
  if (DOWN) {
    b.vel_y = b.velocity;
  }
  if (LEFT) {
    b.vel_x = -b.velocity;
  }
  if (RIGHT) {
    b.vel_x = b.velocity;
  }
  if (!UP && !DOWN) {
    b.vel_y = 0;
  }
  if (!RIGHT && !LEFT) {
    b.vel_x = 0;
  }
  b.x += b.vel_x;
  b.y += b.vel_y;
}

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  Balls.forEach((b) => {
    b.drawBall();
    if (b.player) {
      keyControl(b);
    }
  });
  requestAnimationFrame(mainLoop);
}

let Ball1 = new Ball(100, 100, 30);
let Ball2 = new Ball(200, 90, 20);
Ball1.player = true;

requestAnimationFrame(mainLoop);
