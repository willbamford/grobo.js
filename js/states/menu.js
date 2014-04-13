define(['state-modality', 'logger'], function (stateModality, logger) {

    var MenuState = function (config) {
        this.canvas = config.canvas;
        this.stateFactory = config.stateFactory;
        this.stateManager = config.stateManager;
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
        },
        onInput: function (event) {
            this.stateManager.push(this.stateFactory.getGame());
        }
    };

    return MenuState;
});