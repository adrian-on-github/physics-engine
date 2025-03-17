"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const Balls = [];

let LEFT, UP, RIGHT, DOWN;
let friction = 0.1;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // v = Vector, n = Number
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtr(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n) {
    return new Vector(this.x * n, this.y * n);
  }

  normal() {
    return new Vector(this.y, -this.x).unit();
  }

  //returns a vector with same direction and 1 length
  unit() {
    if (this.mag() === 0) {
      return new Vector(0, 0);
    } else {
      return new Vector(this.x / this.mag(), this.y / this.mag());
    }
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  drawVec(start_x, start_y, n, color) {
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }
}

class Ball {
  constructor(x, y, r) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 0.1;
    this.player = false;
    Balls.push(this);
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  display() {
    this.vel.drawVec(1450, 600, 10, "green");
    this.acc.unit().drawVec(1450, 600, 50, "blue");
    // this.acc.normal().drawVec(1450, 600, 50, "black");
    ctx.beginPath();
    ctx.arc(1450, 600, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
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
    b.acc.x = -b.acceleration;
  }
  if (UP) {
    b.acc.y = -b.acceleration;
  }
  if (RIGHT) {
    b.acc.x = b.acceleration;
  }
  if (DOWN) {
    b.acc.y = b.acceleration;
  }
  if (!UP && !DOWN) {
    b.acc.y = 0;
  }
  if (!RIGHT && !LEFT) {
    b.acc.x = 0;
  }

  b.acc = b.acc.unit().mult(b.acceleration);
  b.vel = b.vel.add(b.acc);
  b.vel = b.vel.mult(1 - friction);
  b.pos.x += b.vel.x;
  b.pos.y += b.vel.y;

  b.pos = b.pos.add(b.vel);
}

function coll_det_bb(b1, b2) {
  if (b1.r + b2.r >= b2.pos.subtr(b1.pos).mag()) {
    return true;
  } else {
    return false;
  }
}

function pen_res_bb(b1, b2) {
  let dist = b1.pos.subtr(b2.pos);
  let pen_depth = b1.r + b2.r - dist.mag();
  let pen_res = dist.unit().mult(pen_depth / 2);
  b1.pos = b1.pos.add(pen_res);
  b2.pos = b2.pos.add(pen_res.mult(-1));
}

function mainLoop() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  Balls.forEach((b, index) => {
    b.drawBall();
    if (b.player) {
      keyControl(b);
    }
    for (let i = index + 1; i < Balls.length; i++) {
      if (coll_det_bb(Balls[index], Balls[i])) {
        pen_res_bb(Balls[index], Balls[i]);
      }
    }

    b.display();
  });

  requestAnimationFrame(mainLoop);
}

let Ball1 = new Ball(200, 200, 30);
let Ball2 = new Ball(300, 250, 40);
Ball1.player = true;

requestAnimationFrame(mainLoop);
