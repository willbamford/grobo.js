define([], function () {

    var refState = {

        POPUP: 0,
        EXCLUSIVE: 1,

        modality: null,
        canvas: null,
        stateFactory: null,
        stateManager: null,

        _initState: function (config) {
            this.modality = config.modality || null;
            this.canvas = config.canvas || null;
            this.stateFactory = config.stateFactory || null;
            this.stateManager = config.stateManager || null;
        },

        init: function (config) {
            this._initState(config);
            return this;
        },

        entered: function () {},

        exiting: function () {},

        obscured: function () {},

        revealed: function () {},

        update: function (delta) {},

        draw: function () {},

        handleInput: function (event) {}
    };

    return refState;
});