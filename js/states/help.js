define(['lib', 'states/state', 'logger'], function (lib, refState, logger) {

    var refHelpState = lib.create(refState, {

        name: 'Help',
        modality: refState.POPUP,

        init: function (config) {
            this.modality = this.POPUP;
            this._initState(config);
            return this;
        },

        update: function (delta) {},

        draw: function (delta) {
            this.canvas.fill('rgba(0, 0, 0, 0.5)');
        },

        handleInput: function (event) {
            if (event.name === 'click') {
                event.consume();
                this.stateManager.pop();
            }
        }
    });

    return refHelpState;
});