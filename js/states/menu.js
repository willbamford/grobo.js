define(
    ['state-modality', 'ui/button', 'ui/panel', 'logger'],
    function (stateModality, refButton, refPanel, logger) {

        var refMenuState = {

            modality: stateModality.EXCLUSIVE,

            init: function (config) {
                this.canvas = config.canvas;
                this.stateFactory = config.stateFactory;
                this.stateManager = config.stateManager;
                this.panel = Object.create(refPanel).init(this.canvas, null, this.canvas.width - 40, this.canvas.height - 40, 20, 20, 'red');
                
                var button1 = Object.create(refButton).init(this.canvas, null, 100, 40, 20, 20, 'Button 1'),
                    button2 = Object.create(refButton).init(this.canvas, null, 100, 40, 20, 80, 'Button 2');
                this.panel.addChild(button1).addChild(button2);
                return this;
            },

            entered: function () {
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

            update: function (delta) {},

            draw: function (delta) {
                this.canvas.fill('green');
                // this.button1.draw(delta);
                // this.button2.draw(delta);
                this.panel.draw(delta);
            },

            onInput: function (event) {
                event.consume();
                this.stateManager.push(this.stateFactory.getGame());
            }
        };

        return refMenuState;
    }
);