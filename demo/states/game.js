define(
    [
        'grobo/lib',
        'grobo/state',
        'grobo/ui/view',
        'grobo/ui/image',
        'grobo/logger'
    ],
    function (lib, refState, refView, refImage, logger) {

        var refGameState = lib.create(refState, {

            name: 'Game',
            isAnimating: false,

            init: function (config) {
                this.modality = this.EXCLUSIVE;
                this._initState(config);

                this.view = lib.create(refView).init({
                    canvas: this.canvas,
                    style: {
                        spacing: '10%',
                        background: 'orange'
                    }
                });

                var image = lib.create(refImage).init({
                    url: 'http://www.google.co.uk/images/srpr/logo11w.png',
                    style: {
                        left: 0,
                        width: '50%',
                        height: '50%'
                    }
                });

                this.view.addChild(image);

                var image2 = lib.create(refImage).init({
                    url: 'http://www.google.co.uk/images/srpr/logo11w.png',
                    scaleToFit: false,
                    style: {
                        bottom: 0,
                        right: 0,
                        width: '100%',
                        height: '50%'
                    }
                });

                this.view.addChild(image2);
                this.view.addChild(image);

                return this;
            },

            update: function (delta) {},

            draw: function () {
                this.view.draw();
            },

            handleInput: function (event) {
                this._handleInputState(event);
                if (event.name === 'click') {
                    event.consume();
                    this.stateManager.push(this.stateFactory.getMenu());
                }
            }
        });

        return refGameState;
    }
);