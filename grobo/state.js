define(
    ['grobo/logger'],
    function (logger) {

        var refState = {

            POPUP: 0,
            EXCLUSIVE: 1,

            name: 'Base',
            modality: null,
            canvas: null,
            stateFactory: null,
            stateManager: null,
            view: null,

            init: function (config) {
                this._initState(config);
                return this;
            },

            entered: function () {
                // logger.info('Entered ' + this.getName() + ' state');
            },

            exiting: function () {
                // logger.info('Exiting ' + this.getName() + ' state');
            },

            obscured: function () {
                // logger.info('Obscured ' + this.getName() + ' state');
            },

            revealed: function () {
                // logger.info('Entered ' + this.getName() + ' state');
            },

            update: function (delta) {},

            draw: function () {},

            handleInput: function (event) {
                this._handleInputState(event);
            },

            handleResize: function (event) {
                this._handleResizeState(event);
            },

            _initState: function (config) {
                this.canvas = config.canvas || null;
                this.stateFactory = config.stateFactory || null;
                this.stateManager = config.stateManager || null;
            },

            _handleInputState: function (event) {
                if (this.view)
                    this.view.handleInput(event);
            },

            _handleResizeState: function (event) {
                if (this.view)
                    this.view.handleResize(event);
            },

            getName: function () {
                return this.name || 'unknown';
            }
        };

        return refState;
    }
);