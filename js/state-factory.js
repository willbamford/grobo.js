define(
    ['states/game', 'states/menu', 'states/help'],
    function (GameState, MenuState, HelpState) {

        var refStateFactory = {
        
            init: function (config) {
                config['stateFactory'] = this;
                this.config = config;
                this.states = {};
                return this;
            },

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
            },

            getHelp: function () {
                if (!this.states.help) {
                    this.states.help = new HelpState(this.config);
                }
                return this.states.help;    
            }
        };

        return refStateFactory;
    }
);