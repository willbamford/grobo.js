define(['ui/view'], function (refView) {

    var refButton = Object.create(refView);

    refButton.init = function (canvas, parentView, width, height, x, y, label) {
        this._viewInit(canvas, parentView, width, height, x, y);
        this.label = label;
        return this;
    };

    refButton.update = function (delta) {

    },

    refButton.draw = function (delta) {
        var x = this.getWorldX(),
            y = this.getWorldY();
        this.canvas.fillRect('white', x, y, this.width, this.height);
        this.canvas.fillText('black', this.label, x + 20, y + 20);
    };

    return refButton;
});