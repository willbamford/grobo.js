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

                this.view = Object.create(refPanel).init({
                    canvas: this.canvas,
                    parent: null,
                    width: this.canvas.width, height: this.canvas.height,
                    x: 0, y: 0,
                    style: 'red'
                });
                
                var button1 = Object.create(refButton).init({
                    canvas: this.canvas,
                    parent: null,
                    width: 100, height: 40,
                    x: 20, y: 20,
                    label: 'Button 1'
                }),
                button2 = Object.create(refButton).init({
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
                //this.canvas.fill('green');
                // this.button1.draw(delta);
                // this.button2.draw(delta);
                this.view.draw();
            },

            onInput: function (event) {
                this.view.onInput(event);
                // event.consume();
                if (!event.isConsumed) {
                    this.stateManager.push(this.stateFactory.getGame());
                }
            }
        };

        return refMenuState;
    }
);