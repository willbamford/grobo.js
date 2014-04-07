(function (icx) {

    var StateManager = function () {
        this.currentStates = [];
        this.activeDrawables = [];
        this.activeUpdateables = [];
    };

    StateManager.prototype = {

        // change: function (state) {
        //     if (!_.contains(this.currentStates, state)) {
        //         icx.info('Changing state: ' + state);



        //     } else {
        //         icx.info('Not changing state: ' + state);
        //     }
        // },
        pop: function () {
            var state = null;
            if (!this.isEmpty()) {
                state = this.currentStates.pop();
                return state;
            }
            return null;
        },
        push: function (state) {
            if (!_.contains(this.currentStates, state)) {
                this.currentStates.push(state);
            }
        },
        peek: function () {
            if (!this.isEmpty()) {
                return _.last(this.currentStates);
            }
            return null;
        },

        isEmpty: function () {
            return this.currentStates.length > 0;
        }
    };

    icx.StateManager = StateManager;

} (window.icx));