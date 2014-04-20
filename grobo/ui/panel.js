define(
    [
        'grobo/lib',
        'grobo/ui/view'
    ],
    function (lib, refView) {

        var refPanel = lib.create(refView, {
            init: function (config) {
                this._initView(config);
                return this;
            },

            draw: function () {
                var x = this.getWorldX(),
                    y = this.getWorldY();
                this.canvas.fillRect(this.style.background, x, y, this.width, this.height);
                this.drawChildren();
            }
        });

        return refPanel;
    }
);