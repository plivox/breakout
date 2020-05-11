import { Stage, Ball, Paddle, Bricks, ParticleSystem } from './lib/breakout'

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
})()

window.cancelAnimationFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    function (handle) {
      clearTimeout(handle)
    }
  )
})()

const stage = new Stage()
window.stage = stage

const ball = new Ball()
const paddle = new Paddle()
const bricks = new Bricks()

var particles = []

function animate() {
  let timer = null

  // Main loop
  timer = window.requestAnimationFrame(animate)

  // Draw stage
  stage.draw()

  // Draw the ball
  ball.draw()

  // Move the paddle
  if (paddle.right && paddle.x < stage.width - paddle.width) paddle.x += 5
  else if (paddle.left && paddle.x > 0) paddle.x -= 5

  // Draw the paddle
  paddle.draw()

  // Bricks
  let col = Math.floor(ball.x / bricks.colWidth())
  let row = Math.floor(ball.y / bricks.rowHeight())

  // If so, reverse the ball and mark the brick as broken
  if (
    ball.y < bricks.rows * bricks.rowHeight() &&
    row >= 0 &&
    col >= 0 &&
    bricks.elements[row][col] == 1
  ) {
    particles.push(new ParticleSystem({ x: ball.x, y: ball.y }, 100))
    bricks.elements[row][col] = 0
    ball.dy = -ball.dy
  }

  // Draw the bricks
  bricks.draw()

  // Draw particles
  for (let i = 0; i < particles.length; i++) {
    if (!particles[i].finished) {
      particles[i].draw()
    } else {
      // particles.splice(particles[i])
    }
  }

  // X
  if (ball.x + ball.dx > stage.width || ball.x + ball.dx < 0) {
    ball.dx = -ball.dx
  }

  // Y (for testing)
  // if (ball.y + ball.dy > stage.height || ball.y + ball.dy < 0) {
  //   ball.dy = -ball.dy
  // }

  if (ball.y + ball.dy < 0) {
    ball.dy = -ball.dy
  } else if (ball.y + ball.dy > stage.height) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy

      // Gameover
    } else {
      cancelAnimationFrame(timer)
      stage.draw()
    }
  }

  ball.x += ball.dx
  ball.y += ball.dy
}

animate()
