define(['state-modality', 'ui/button', 'logger'], function (stateModality, Button, logger) {

    var MenuState = function (config) {
        this.canvas = config.canvas;
        this.stateFactory = config.stateFactory;
        this.stateManager = config.stateManager;

        this.button1 = new Button(this.canvas, 'Hit me!', 20, 20, 100, 40);
        this.button2 = new Button(this.canvas, 'Button 2', 20, 80, 100, 40);
    };

    MenuState.prototype = {
        modality: stateModality.EXCLUSIVE,
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
            this.button1.draw(delta);
            this.button2.draw(delta);
        },
        onInput: function (event) {
            this.stateManager.push(this.stateFactory.getGame());
        }
    };

    return MenuState;
});