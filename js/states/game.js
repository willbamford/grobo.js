define(['state-modality', 'logger'], function (stateModality, logger) {

    var refGameState = {

        isAnimating: false,

        modality: stateModality.EXCLUSIVE,

        init: function (config) {
            this.canvas = config.canvas;
            this.stateFactory = config.stateFactory;
            this.stateManager = config.stateManager;
            return this;
        },

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

        update: function (delta) {
        },

        draw: function () {
            this.canvas.fill('blue');
        },

        onInput: function (event) {
            event.consume();
            this.stateManager.push(this.stateFactory.getHelp());
        }
    };

    return refGameState;
});