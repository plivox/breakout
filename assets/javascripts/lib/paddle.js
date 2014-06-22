
define('lib/paddle', ['jquery', 'lib/stage'], function($, stage) {

    var Paddle = function() {
        this.width = 50;
        this.height = 10; 
        this.x = (stage.width / 2) - (this.width / 2);
        this.color = '#449FD1';
        
        $(document).on('keydown', $.proxy(this.onKeyDown, this));
        $(document).on('keyup', $.proxy(this.onKeyUp, this));
    }

    Paddle.prototype = {
        draw: function() {
            stage.ctx.beginPath();
            stage.ctx.fillStyle = this.color;
            stage.ctx.rect(this.x, stage.height - this.height, this.width, this.height);
            stage.ctx.closePath();
            stage.ctx.fill();
        },
        onKeyDown: function(event) {
            if (event.keyCode == 39)
                this.right = true;
            else if (event.keyCode == 37)
                this.left = true;
        },
        onKeyUp: function(event) {
            if (event.keyCode == 39)
                this.right = false;
            else if (event.keyCode == 37)
                this.left = false;
        }        
    }

    return new Paddle();
});
