define(
    [
        'grobo/lib',
        'grobo/ui/view',
        'grobo/helpers/geom'
    ],
    function (lib, refView, geom) {

        var refButton = lib.create(refView, {

            NORMAL_BACKGROUND_STYLE: 'white',
            ACTIVE_BACKGROUND_STYLE: 'purple',
            HOVER_BACKGROUND_STYLE: 'green',

            init: function (config) {
                var self = this;
                this._initView(config);
                this.label = config.label;
                this.style.background = this.NORMAL_BACKGROUND_STYLE;

                this.on('click', function (event) {
                    alert('Click!');
                    event.consume();
                });

                this.on('press', function (event) {
                    self.style.background = self.ACTIVE_BACKGROUND_STYLE;
                    event.consume();
                });

                this.on('release', function (event) {
                    self.style.background = self.NORMAL_BACKGROUND_STYLE;
                    event.consume();
                });

                this.on('over', function (event) {
                    self.style.background = self.HOVER_BACKGROUND_STYLE;
                });

                this.on('out', function (event) {
                    self.style.background = self.NORMAL_BACKGROUND_STYLE;
                });

                return this;
            },

            update: function (delta) {},

            draw: function () {
                var x = this.getWorldX(),
                    y = this.getWorldY(),
                    canvas = this.canvas,
                    context = canvas.getContext();
                canvas.fillRect(this.style.background, x, y, this.width, this.height);
                context.font = 'bold 16px sans-serif';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                canvas.fillText('black', this.label, x + this.width / 2, y + this.height / 2);
            }
        });

        return refButton;
    }
);