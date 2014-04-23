define(
    [
        'grobo/lib',
        'demos/1/states/game',
        'demos/1/states/menu',
        'demos/1/states/help'
    ],
    function (lib, refGameState, refMenuState, refHelpState) {

        var refStateFactory = {
        
            init: function (config) {
                config.stateFactory = this;
                this.config = config;
                this.states = {};
                return this;
            },

            getGame: function () {
                if (!this.states.game) {
                    this.states.game = lib.create(refGameState).init(this.config);
                }
                return this.states.game;
            },

            getMenu: function () {
                if (!this.states.menu) {
                    this.states.menu = lib.create(refMenuState).init(this.config);
                }
                return this.states.menu;
            },

            getHelp: function () {
                if (!this.states.help) {
                    this.states.help = lib.create(refHelpState).init(this.config);
                }
                return this.states.help;    
            }
        };

        return refStateFactory;
    }
);