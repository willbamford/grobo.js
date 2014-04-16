define(['ui/view'], function (refView) {

    var refPanel = Object.create(refView);

    refPanel.init = function (config) {
        this._initView(config);
        this.style = config.style;
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