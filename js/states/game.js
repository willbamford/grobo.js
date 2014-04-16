define(['lib', 'states/state', 'logger'], function (lib, refState, logger) {

    var refGameState = lib.create(refState, {

        isAnimating: false,

        init: function (config) {
            config['modality'] = this.EXCLUSIVE;
            this._initState(config);
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

        update: function (delta) {},

        draw: function () {
            this.canvas.fill('blue');
        },

        handleInput: function (event) {
            if (event.name === 'click') {
                event.consume();
                this.stateManager.push(this.stateFactory.getHelp());
            }
        }
    });

    return refGameState;
});