define(['lib', 'ui/view', 'geom'], function (lib, refView, geom) {

    var refButton = lib.create(refView, {

        NORMAL_BACKGROUND_STYLE: 'white',
        ACTIVE_BACKGROUND_STYLE: 'purple',
        HOVER_BACKGROUND_STYLE: 'green',

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

            this.on('over', function (event) {
                self.backgroundStyle = self.HOVER_BACKGROUND_STYLE;
            });

            this.on('out', function (event) {
                self.backgroundStyle = self.NORMAL_BACKGROUND_STYLE;
            });

            return this;
        },

        update: function (delta) {},

        draw: function () {
            var x = this.getWorldX(),
                y = this.getWorldY(),
                canvas = this.canvas,
                context = canvas.getContext();
            canvas.fillRect(this.backgroundStyle, x, y, this.width, this.height);
            context.font = 'bold 16px sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            canvas.fillText('black', this.label, x + this.width / 2, y + this.height / 2);
        }
    });

    return refButton;
});