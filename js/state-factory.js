define(['states/game', 'states/menu'], function (GameState, MenuState) {

    var StateFactory = function () {
        this.states = {};
    };

    StateFactory.prototype = {

        getGame: function () {
            if (!this.states.game) {
                this.states.game = new GameState();
            }
            return this.states.game;
        },

        getMenu: function () {
            if (!this.states.menu) {
                this.states.menu = new MenuState();
            }
            return this.states.menu;
        }
    };

    return StateFactory;
});