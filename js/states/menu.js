define(
    ['state-modality', 'ui/button', 'ui/panel', 'logger'],
    function (stateModality, refButton, refPanel, logger) {

        var refMenuState = {

            isAnimating: false,

            modality: stateModality.EXCLUSIVE,

            view: null,

            init: function (config) {
                this.canvas = config.canvas;
                this.stateFactory = config.stateFactory;
                this.stateManager = config.stateManager;

                this.view = Object.create(refPanel).init(
                    this.canvas, null,
                    this.canvas.width, this.canvas.height, 0, 0,
                    'red'
                );
                
                var button1 = Object.create(refButton).init(this.canvas, null, 100, 40, 20, 20, 'Button 1'),
                    button2 = Object.create(refButton).init(this.canvas, null, 100, 40, 20, 80, 'Button 2');
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
                //this.canvas.fill('green');
                // this.button1.draw(delta);
                // this.button2.draw(delta);
                this.view.draw();
            },

            onInput: function (event) {
                this.view.onInput(event);
                // event.consume();
                // this.stateManager.push(this.stateFactory.getGame());
            }
        };

        return refMenuState;
    }
);