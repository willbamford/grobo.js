define(
    ['states/game', 'states/menu', 'states/help'],
    function (refGameState, refMenuState, refHelpState) {

        var refStateFactory = {
        
            init: function (config) {
                config['stateFactory'] = this;
                this.config = config;
                this.states = {};
                return this;
            },

            getGame: function () {
                if (!this.states.game) {
                    this.states.game = Object.create(refGameState).init(this.config);
                }
                return this.states.game;
            },

            getMenu: function () {
                if (!this.states.menu) {
                    this.states.menu = Object.create(refMenuState).init(this.config);
                }
                return this.states.menu;
            },

            getHelp: function () {
                if (!this.states.help) {
                    this.states.help = Object.create(refHelpState).init(this.config);
                }
                return this.states.help;    
            }
        };

        return refStateFactory;
    }
);