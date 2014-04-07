(function (icx) {

    var StateManager = function () {
        this.currentStates = [];
        this.activeDrawables = [];
        this.activeUpdateables = [];
    };

    StateManager.prototype = {

        change: function (state) {
            if (!_.contains(this.currentStates, state)) {
                icx.info('Changing state: ' + state);



            } else {
                icx.info('Not changing state: ' + state);
            }
        },
        pop: function () {
            return {};
        },
        push: function (state) {
        },
        peek: function () {
            return {};
        }
    };

    icx.StateManager = StateManager;

} (window.icx));