(function (icx) {

    var StateManager = function () {
        this.activeStates = [];
    };

    StateManager.modality = {
        POPUP: 0,
        EXCLUSIVE: 1
    },

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
                return _.last(this.activeStates);
            }
            return null;
        },
        push: function (enterState) {
            if (!this.contains(enterState)) {

                // Obscuring
                var i = this.activeStates.length,
                    state;
                while (--i >= 0) {
                    state = this.activeStates[i];
                    this._stateObscured(state);
                    if (state.modality === StateManager.modality.EXCLUSIVE)
                        break;
                }

                this.activeStates.push(enterState);

                // Entered
                this._stateEntered(enterState);
            }
            return this;
        },
        pop: function () {
            var exitState = null;
            if (!this.isEmpty()) {

                // Exiting
                exitState = this.activeStates.pop();
                this._stateExiting(exitState);

                // Revealed
                if (exitState.modality === StateManager.modality.EXCLUSIVE) {
                    var i = this.activeStates.length,
                        state;
                    while (--i >= 0) {
                        state = this.activeStates[i];
                        this._stateRevealed(state);
                        if (state.modality === StateManager.modality.EXCLUSIVE)
                            break;
                    }
                }

                return exitState;
            }
            return null;
        },
        contains: function (state) {
            return _.contains(this.activeStates, state);
        },
        size: function () {
            return this.activeStates.length;
        },
        isEmpty: function () {
            return this.size() === 0;
        },

        _stateEntered: function (state) {
            if (typeof(state.entered) === 'function') {
                state.entered();
            }
        },
        _stateExiting: function (state) {
            if (typeof(state.exiting) === 'function') {
                state.exiting();
            }
        },
        _stateRevealed: function (state) {
            if (typeof(state.revealed) === 'function') {
                state.revealed();
            }
        },
        _stateObscured: function (state) {
            if (typeof(state.obscured) === 'function') {
                state.obscured();
            }
        },

    };

    icx.StateManager = StateManager;

} (window.icx));