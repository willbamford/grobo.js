define(['lib', 'states/state', 'logger'], function (lib, refState, logger) {

    var refGameState = lib.create(refState, {

        name: 'Game',
        isAnimating: false,

        init: function (config) {
            this.modality = this.EXCLUSIVE;
            this._initState(config);
            return this;
        },

        update: function (delta) {},

        draw: function () {
            this.canvas.fill('blue');
        },

        handleInput: function (event) {
            if (event.name === 'click') {
                event.consume();
                this.stateManager.push(this.stateFactory.getMenu());
            }
        }
    });

    return refGameState;
});