(function (icx) {

    var StateManager = function () {
        this.currentStates = [];
        this.activeDrawables = [];
        this.activeUpdateables = [];
    };

    StateManager.prototype = {

        change: function (state) {
            var previous;
            if (state && !this.contains(state)) {
                previous = this.pop();
                this.push(state);
            }
        },
        peek: function () {
            if (!this.isEmpty()) {
                return _.last(this.currentStates);
            }
            return null;
        },
        push: function (state) {
            if (!this.contains(state)) {
                this.currentStates.push(state);
            }
            return this;
        },
        pop: function () {
            var state = null;
            if (!this.isEmpty()) {
                state = this.currentStates.pop();
                return state;
            }
            return null;
        },
        contains: function (state) {
            return _.contains(this.currentStates, state);
        },
        size: function () {
            return this.currentStates.length;
        },
        isEmpty: function () {
            return this.size() === 0;
        }
    };

    icx.StateManager = StateManager;

} (window.icx));