define(['lib', 'ui/view', 'geom'], function (lib, refView, geom) {

    var refButton = lib.create(refView, {

        NORMAL_BACKGROUND_STYLE: 'white',
        ACTIVE_BACKGROUND_STYLE: 'purple',

        init: function (config) {
            var self = this;
            this._initView(config);
            this.label = config.label;
            this.backgroundStyle = this.NORMAL_BACKGROUND_STYLE;

            this.on('click', function (event) {
                alert('Click!');
                event.consume();
            });

            this.on('press', function (event) {
                self.backgroundStyle = self.ACTIVE_BACKGROUND_STYLE;
                event.consume();
            });

            this.on('release', function (event) {
                self.backgroundStyle = self.NORMAL_BACKGROUND_STYLE;
                event.consume();
            });

            return this;
        },

        update: function (delta) {},

        draw: function () {
            var x = this.getWorldX(),
                y = this.getWorldY();
            this.canvas.fillRect(this.backgroundStyle, x, y, this.width, this.height);
            this.canvas.fillText('black', this.label, x + 20, y + 20);
        }
    });

    return refButton;
});