
require.config({
    baseUrl: 'assets/javascripts',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        jquery: 'vendors/jquery-1.11.1.min'
    }
});

require(['jquery', 'lib/stage', 'lib/ball', 'lib/paddle', 'lib/bricks', 'lib/particle'], function($, stage) {

    var ball = require('lib/ball'),
        paddle = require('lib/paddle'),
        bricks = require('lib/bricks'),        
        timer = null;

    // Particle system class
    var Particle = require('lib/particle'),
        particles = [];

    function animate() {
        // Loop
        timer = window.requestAnimationFrame(animate);

        // Draw stage
        stage.draw();

        // Draw the ball
        ball.draw();

        // Move the paddle
        if (paddle.right && paddle.x < (stage.width - paddle.width))
            paddle.x += 5;
        else if (paddle.left && paddle.x > 0)
            paddle.x -= 5;

        // Draw the paddle
        paddle.draw();

        // Bricks
        col = Math.floor(ball.x / bricks.colWidth());
        row = Math.floor(ball.y / bricks.rowHeight());

        // If so, reverse the ball and mark the brick as broken
        if (ball.y < bricks.rows * bricks.rowHeight() && row >= 0 && col >= 0 && bricks.elements[row][col] == 1) {
            particles.push(new Particle({x: ball.x, y: ball.y}, 500));
            bricks.elements[row][col] = 0;
            ball.dy = -ball.dy;
        }

        // Draw the bricks
        bricks.draw();

        // Draw particles
        particles.forEach(function(p) {
            (!p.finished) ? p.draw() : delete p;
        });

        // X
        if (ball.x + ball.dx > stage.width || ball.x + ball.dx < 0)
            ball.dx = -ball.dx;

        // Y
        // if (ball.y + ball.dy > stage.height || ball.y + ball.dy < 0)
        //     ball.dy = -ball.dy;

        if (ball.y + ball.dy < 0) {
            ball.dy = -ball.dy;

        } else if (ball.y + ball.dy > stage.height) {

            if (ball.x > paddle.x && ball.x < (paddle.x + paddle.width)) {
                ball.dy = -ball.dy;

            // Gameover
            } else {
                cancelAnimationFrame(timer);
                stage.draw();
            }
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    animate();
});
