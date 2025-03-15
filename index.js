"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Balls = [];

let LEFT, UP, RIGHT, DOWN;
let friction = 0.1;

class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel_x = 0;
    this.vel_y = 0;
    this.acc_x = 0;
    this.acc_y = 0;
    this.acceleration = 0.1;
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

  display() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.acc_x * 1000, this.y + this.acc_y * 1000);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.vel_x * 100, this.y + this.vel_y * 100);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }
}

function keyControl(b) {
  // SETS UP, DOWN, LEFT, RIGHT TRUE IF PRESS KEYDOWN
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

  // SETS UP, DOWN, LEFT, RIGHT FALSE IF PRESS KEYUP
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

  if (LEFT) {
    b.acc_x = -b.acceleration;
  }
  if (UP) {
    b.acc_y = -b.acceleration;
  }
  if (RIGHT) {
    b.acc_x = b.acceleration;
  }
  if (DOWN) {
    b.acc_y = b.acceleration;
  }
  if (!UP && !DOWN) {
    b.acc_y = 0;
  }
  if (!RIGHT && !LEFT) {
    b.acc_x = 0;
  }

  b.vel_x += b.acc_x;
  b.vel_y += b.acc_y;
  b.vel_x *= 1 - friction;
  b.vel_y *= 1 - friction;
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
    b.display();
  });
  requestAnimationFrame(mainLoop);
}

let Ball1 = new Ball(100, 100, 30);
Ball1.player = true;

requestAnimationFrame(mainLoop);
