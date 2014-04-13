define([], function () {

    var Button = function (canvas, label, x, y, width, height) {
        this.canvas = canvas;
        this.label = label;
        this.x = x; this.y = y;
        this.width = width; this.height = height;
    };

    Button.prototype = {
        update: function (delta) {

        },
        draw: function (delta) {
            this.canvas.fillRect('white', this.x, this.y, this.width, this.height);
            this.canvas.fillText('black', this.label, this.x + 20, this.y + 20);
        }
    };

    return Button;
});