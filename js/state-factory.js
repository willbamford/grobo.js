(function (icx) {

    var StateFactory = function () {
        this.states = {};
    };

    StateFactory.prototype = {

        getGame: function () {
            if (!this.states.game) {
                this.states.game = new icx.states.Game();
            }
            return this.states.game;
        },

        getMenu: function () {
            if (!this.states.menu) {
                this.states.menu = new icx.states.Menu();
            }
            return this.states.menu;
        }
    };

    icx.StateFactory = StateFactory;

} (window.icx));