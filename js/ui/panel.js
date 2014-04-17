define(['lib', 'ui/view'], function (lib, refView) {

    var refPanel = lib.create(refView, {
        init: function (config) {
            this._initView(config);
            this.style = config.style;
            return this;
        },

        draw: function () {
            var x = this.getWorldX(),
                y = this.getWorldY();
            this.canvas.fillRect(this.style, x, y, this.width, this.height);
            this.drawChildren();
        }
    });

    return refPanel;
});