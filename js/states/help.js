define(['state-modality', 'logger'], function (stateModality, logger) {

    var refHelpState = {

        modality: stateModality.POPUP,

        init: function (config) {
            this.canvas = config.canvas;
            this.stateFactory = config.stateFactory;
            this.stateManager = config.stateManager;
            return this;
        },

        entered: function () {
            logger.info('Entered help state');
        },

        exiting: function () {
            logger.info('Exiting help state');
        },

        obscured: function () {
            logger.info('Obscured help state');
        },

        revealed: function () {
            logger.info('Revealed help state');
        },

        update: function (delta) {},

        draw: function (delta) {
            this.canvas.fill('rgba(0, 0, 0, 0.5)');
        },

        onInput: function (event) {
            event.consume();
            this.stateManager.pop();
        }
    };

    return refHelpState;
});