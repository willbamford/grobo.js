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

            this.on('touchdown', function (event) {
                self.backgroundStyle = self.ACTIVE_BACKGROUND_STYLE;
                event.consume();
            });

            this.on('touchup', function (event) {
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

        /*
        handleInput: function (event) {
            switch (event.name) {
                case 'click':
                    this.handleClick(event);
                    break;
                case 'touchup':
                    this.handleTouchUp(event);
                    break;
                case 'touchdown':
                    this.handleTouchDown(event);
                    break;
            }
        },

        handleClick: function (event) {
            var isClicked = geom.isPointInsideRect(
                event.x, event.y,
                this.getWorldX(), this.getWorldY(),
                this.width, this.height
            );
            if (isClicked) {
                alert('Click!');
                event.isConsumed = true;
            }
        },

        handleTouchUp: function (event) {
            
            event.consume();
        },

        handleTouchDown: function (event) {
            
            event.consume();
        }
        */
    });

    return refButton;
});