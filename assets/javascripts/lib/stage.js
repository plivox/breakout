
window.requestAnimationFrame = function() {
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback) {
            return setTimeout(callback, 1000 / 60);
        }
    );
}();

window.cancelAnimationFrame = function() {
    return (
        window.cancelAnimationFrame       || 
        window.webkitCancelAnimationFrame || 
        window.mozCancelAnimationFrame    || 
        window.oCancelAnimationFrame      || 
        window.msCancelAnimationFrame     || 
        function(handle) {
            console.log(handle);
            clearTimeout(handle);
        }
    );
}();

define('lib/stage', ['jquery'], function($) {

    var Stage = function() {
        console.log('init stage');

        this.canvas = $('#stage');
        this.ctx = this.canvas[0].getContext('2d');
        this.width = this.canvas.width();
        this.height = this.canvas.height();
        this.color = 'black';
    }

    Stage.prototype = {
        clear: function() {            
            this.ctx.clearRect(0, 0, this.width, this.height);
        },
        draw: function() {
            // Optional if not background
            this.clear();

            this.ctx.beginPath();
            this.ctx.fillStyle = this.color;
            this.ctx.rect(0, 0, this.width, this.height);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    return new Stage();
});
