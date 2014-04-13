define(['state-modality', 'logger'], function (stateModality, logger) {

    var GameState = function (config) {
        this.canvas = config.canvas;
        this.stateFactory = config.stateFactory;
        this.stateManager = config.stateManager;
    };

    GameState.prototype = {
        modality: stateModality.EXCLUSIVE,
        entered: function () {
            logger.info('Entered game state');
        },
        exiting: function () {
            logger.info('Exiting game state');
        },
        obscured: function () {
            logger.info('Obscured game state');
        },
        revealed: function () {
            logger.info('Revealed game state');
        },
        update: function (delta) {},
        draw: function (delta) {
            this.canvas.fill('blue');
        },
        onInput: function (event) {
            this.stateManager.pop();
        }
    };

    return GameState;
});