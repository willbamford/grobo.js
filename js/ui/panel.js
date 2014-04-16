define(['ui/view'], function (refView) {

    var refPanel = Object.create(refView);

    refPanel.init = function (canvas, parent, width, height, x, y, style) {
        this._initView(canvas, parent, width, height, x, y);
        this.style = style;
        return this;
    };

    refPanel.draw = function () {
        var x = this.getWorldX(),
            y = this.getWorldY();
        this.canvas.fillRect(this.style, this.x, this.y, this.width, this.height);
        this.drawChildren();
    };

    return refPanel;
});