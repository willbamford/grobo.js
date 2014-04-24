define(
    [
        'grobo/lib',
        'grobo/ui/view'
    ],
    function (lib, refView) {

        var refButton = lib.create(refView, {

            currentStyle: null,

            init: function (config) {
                var self = this;
                this._initView(config);
                this.label = config.label;

                this.currentStyle = this.style.normal;

                this.on('press', function (event) {
                    self.currentStyle = self.style.active;
                    event.consume();
                });

                this.on('release', function (event) {
                    self.currentStyle = self.style.normal;
                    event.consume();
                });

                this.on('over', function (event) {
                    self.currentStyle = self.style.hover || self.style.active;
                });

                this.on('out', function (event) {
                    self.currentStyle = self.style.normal;
                });

                return this;
            },

            update: function (delta) {},

            draw: function () {
                var x = this.getWorldX(), y = this.getWorldY(),
                    width = this.width, height = this.height,
                    canvas = this.canvas,
                    context = canvas.getContext(),
                    style = this.currentStyle;

                canvas.fillRectWithStyle(style.background, x, y, width, height);
                context.font = 'bold 16px sans-serif';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                canvas.fillTextWithStyle(style.text, this.label, x + width / 2, y + height / 2);
            }
        });

        return refButton;
    }
);