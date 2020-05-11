(function () {
  'use strict';

  class Stage {
    constructor() {
      this.canvas = document.getElementById('stage');
      this.ctx = this.canvas.getContext('2d');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.color = 'black';
    }

    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }

    draw() {
      // Optional if not background
      this.clear();

      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.rect(0, 0, this.width, this.height);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }

  class Ball {
    constructor() {
      this.x = stage.width / 2;
      this.y = 250;
      this.r = 5;
      this.dx = 1.7;
      this.dy = 4;
      this.color = 'white';
    }

    draw() {
      stage.ctx.beginPath();
      stage.ctx.fillStyle = this.color;
      stage.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      stage.ctx.closePath();
      stage.ctx.fill();
    }
  }

  class Paddle {
    constructor() {
      this.width = 50;
      this.height = 10;
      this.x = stage.width / 2 - this.width / 2;
      this.color = '#449FD1';

      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
    }

    draw() {
      stage.ctx.beginPath();
      stage.ctx.fillStyle = this.color;
      stage.ctx.rect(this.x, stage.height - this.height, this.width, this.height);
      stage.ctx.closePath();
      stage.ctx.fill();
    }

    onKeyDown = (event) => {
      if (event.keyCode == 39) this.right = true;
      else if (event.keyCode == 37) this.left = true;
    }

    onKeyUp = (event) => {
      if (event.keyCode == 39) this.right = false;
      else if (event.keyCode == 37) this.left = false;
    }
  }

  class Bricks {
    constructor() {
      this.rows = 5;
      this.cols = 8;
      this.width = stage.width / this.cols - 2;
      this.height = 20;
      this.padding = 2;
      this.color = '#F99637';
      this.elements = new Array(this.rows);

      // Initialize bricks array
      for (let i = 0; i < this.rows; i++) {
        this.elements[i] = new Array(this.cols);
        for (let j = 0; j < this.cols; j++) this.elements[i][j] = 1;
      }
    }

    draw() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          // Draw or not draw the brick
          if (this.elements[i][j] == 1) {
            stage.ctx.beginPath();
            stage.ctx.fillStyle = this.color;
            stage.ctx.rect(
              j * (this.width + this.padding) + this.padding,
              i * (this.height + this.padding) + this.padding,
              this.width,
              this.height,
            );
            stage.ctx.closePath();
            stage.ctx.fill();
          }
        }
      }
    }

    colWidth() {
      return this.width + this.padding
    }

    rowHeight() {
      return this.height + this.padding
    }
  }

  class Particle {
    constructor(x, y, vx, vy) {
      this.x = x || 0;
      this.y = y || 0;
      this.vx = vx || 0;
      this.vy = vy || 0;
    }

    update(vx, vy) {
  (vx = vx || 0), (vy = vy || 0);

      this.x += this.vx + vx;
      this.y += this.vy + vy;
    }
  }

  class ParticleSystem {
    constructor(center, count) {
      this.particles = [];
      this.count = count || 0;
      this.color = '#f9a85b';
      this.finished = false;
      this.center = {
        x: center.x || 0,
        y: center.y || 0,
      };

      // Initialization
      for (let i = 0; i < this.count; i++) {
        var x = this.center.x,
          y = this.center.y,
          vx = Math.random() * 6 - 1.5,
          vy = Math.random() * 6 - 1.5;

        this.particles.push(new Particle(x, y, vx, vy));
      }
    }

    draw(vx, vy) {
      var finished = 0;

      for (let i = 0; i < this.count; i++) {
        if (
          this.particles[i].x > 0 &&
          this.particles[i].x < stage.width &&
          this.particles[i].y > 0 &&
          this.particles[i].y < stage.height
        ) {
          this.particles[i].update();

          stage.ctx.fillStyle = this.color;
          stage.ctx.fillRect(this.particles[i].x, this.particles[i].y, 2, 2);
        } else {
          finished++;
        }
      }

      if (finished == this.count) {
        console.log(finished);
        this.finished = true;
      }
    }
  }

  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return setTimeout(callback, 1000 / 60)
      }
    )
  })();

  window.cancelAnimationFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      function (handle) {
        clearTimeout(handle);
      }
    )
  })();

  const stage$1 = new Stage();
  window.stage = stage$1;

  const ball = new Ball();
  const paddle = new Paddle();
  const bricks = new Bricks();

  var particles = [];

  function animate() {
    let timer = null;

    // Main loop
    timer = window.requestAnimationFrame(animate);

    // Draw stage
    stage$1.draw();

    // Draw the ball
    ball.draw();

    // Move the paddle
    if (paddle.right && paddle.x < stage$1.width - paddle.width) paddle.x += 5;
    else if (paddle.left && paddle.x > 0) paddle.x -= 5;

    // Draw the paddle
    paddle.draw();

    // Bricks
    let col = Math.floor(ball.x / bricks.colWidth());
    let row = Math.floor(ball.y / bricks.rowHeight());

    // If so, reverse the ball and mark the brick as broken
    if (
      ball.y < bricks.rows * bricks.rowHeight() &&
      row >= 0 &&
      col >= 0 &&
      bricks.elements[row][col] == 1
    ) {
      particles.push(new ParticleSystem({ x: ball.x, y: ball.y }, 100));
      bricks.elements[row][col] = 0;
      ball.dy = -ball.dy;
    }

    // Draw the bricks
    bricks.draw();

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      if (!particles[i].finished) {
        particles[i].draw();
      }
    }

    // X
    if (ball.x + ball.dx > stage$1.width || ball.x + ball.dx < 0) {
      ball.dx = -ball.dx;
    }

    // Y (for testing)
    // if (ball.y + ball.dy > stage.height || ball.y + ball.dy < 0) {
    //   ball.dy = -ball.dy
    // }

    if (ball.y + ball.dy < 0) {
      ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > stage$1.height) {
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;

        // Gameover
      } else {
        cancelAnimationFrame(timer);
        stage$1.draw();
      }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
  }

  animate();

}());
//# sourceMappingURL=bundle.js.map
