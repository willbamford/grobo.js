define(['states/game', 'states/menu'], function (GameState, MenuState) {

    var StateFactory = function (config) {
        config['stateFactory'] = this;
        this.config = config;
        this.states = {};
    };

    StateFactory.prototype = {

        getGame: function () {
            if (!this.states.game) {
                this.states.game = new GameState(this.config);
            }
            return this.states.game;
        },

        getMenu: function () {
            if (!this.states.menu) {
                this.states.menu = new MenuState(this.config);
            }
            return this.states.menu;
        }
    };

    return StateFactory;
});