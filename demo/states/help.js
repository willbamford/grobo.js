define(
    [
        'grobo/lib',
        'grobo/state',
        'grobo/logger'
    ],
    function (lib, refState, logger) {

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
                this.canvas.fillWithStyle('rgba(0, 0, 0, 0.5)');
            },

            handleInput: function (event) {
                this._handleInputState(event);
                if (event.name === 'click') {
                    this.stateManager.pop();
                }
                event.consume();
            }
        });

        return refHelpState;
    }
);