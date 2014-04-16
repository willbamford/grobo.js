define(
    ['lib', 'states/state', 'ui/button', 'ui/panel', 'logger'],
    function (lib, refState, refButton, refPanel, logger) {

        var refMenuState = {

            isAnimating: false,

            modality: refState.EXCLUSIVE,

            view: null,

            init: function (config) {
                this.canvas = config.canvas;
                this.stateFactory = config.stateFactory;
                this.stateManager = config.stateManager;

                this.view = lib.create(refPanel).init({
                    canvas: this.canvas,
                    parent: null,
                    width: this.canvas.width, height: this.canvas.height,
                    x: 0, y: 0,
                    style: 'red'
                });
                
                var button1 = lib.create(refButton).init({
                    canvas: this.canvas,
                    parent: null,
                    width: 100, height: 40,
                    x: 20, y: 20,
                    label: 'Button 1'
                }),
                button2 = lib.create(refButton).init({
                    canvas: this.canvas,
                    parent: null,
                    width: 100, height: 40,
                    x: 20, y: 80,
                    label: 'Button 2'
                });
                this.view.addChild(button1).addChild(button2);
                return this;
            },

            entered: function () {
                this.isAnimating = true;
                this.view.x = this.canvas.width;
                logger.info('Entered menu state');
            },

            exiting: function () {
                logger.info('Exiting menu state');
            },

            obscured: function () {
                logger.info('Menu state obscured');
            },

            revealed: function () {
                logger.info('Menu state revealed');
            },

            update: function (delta) {
                if (this.isAnimating) {
                    if (this.view.x > 0) {
                        this.view.x -= delta;
                        if (this.view.x <= 0) {
                            this.view.x = 0;
                            this.isAnimating = false;
                        }
                    }
                }
            },

            draw: function () {
                this.view.draw();
            },

            handleInput: function (event) {
                this.view.handleInput(event);
                if (event.name === 'click' && !event.isConsumed) {
                    event.consume();
                    this.stateManager.push(this.stateFactory.getGame());
                }
            }
        };

        return refMenuState;
    }
);