
define('lib/ball', ['jquery', 'lib/stage'], function($, stage) {

    var Ball = function() {
        this.x = stage.width / 2;
        this.y = 250;
        this.r = 5;
        this.dx = 1.7;
        this.dy = 4;
        this.color = 'white';
    }

    Ball.prototype = {
        draw: function() {
            stage.ctx.beginPath();
            stage.ctx.fillStyle = this.color;
            stage.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
            stage.ctx.closePath();
            stage.ctx.fill();
        }
    }

    return new Ball();
});
