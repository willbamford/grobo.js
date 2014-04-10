define([], function () {

    var StateManager = function () {
        this.stateStack = [];
    };

    StateManager.modality = {
        POPUP: 0,
        EXCLUSIVE: 1
    },

    StateManager.prototype = {

        tick: function (delta) {

            var i = this.stateStack.length,
                state,
                statesToUpdateAndDraw = [];
            while (--i >= 0) {
                state = this.stateStack[i];
                statesToUpdateAndDraw.push(state);
                if (state.modality === StateManager.modality.EXCLUSIVE)
                    break;
            }

            this.updateStates(statesToUpdateAndDraw, delta);
            this.drawStates(statesToUpdateAndDraw, delta);
        },

        updateStates: function (states, delta) {
            var i = states.length;
            while (--i >= 0) {
                state = states[i];
                state.update(delta);
            }
        },

        drawStates: function (states, delta) {
            var i = states.length;
            while (--i >= 0) {
                state = states[i];
                state.draw(delta);
            }
        },

        handleInput: function (events) {
            // Input
        },

        change: function (state) {
            var previous;
            if (state && !this.contains(state)) {
                previous = this.pop();
                this.push(state);
            }
        },
        peek: function () {
            if (!this.isEmpty()) {
                return _.last(this.stateStack);
            }
            return null;
        },
        push: function (enterState) {
            if (!this.contains(enterState)) {

                // Obscuring
                var i = this.stateStack.length,
                    state;
                while (--i >= 0) {
                    state = this.stateStack[i];
                    state.obscured();
                    if (state.modality === StateManager.modality.EXCLUSIVE)
                        break;
                }

                this.stateStack.push(enterState);

                // Entered
                enterState.entered();
            }
            return this;
        },
        pop: function () {
            var exitState = null;
            if (!this.isEmpty()) {

                // Exiting
                exitState = this.stateStack.pop();
                exitState.exiting();

                // Revealed
                if (exitState.modality === StateManager.modality.EXCLUSIVE) {
                    var i = this.stateStack.length,
                        state;
                    while (--i >= 0) {
                        state = this.stateStack[i];
                        state.revealed();
                        if (state.modality === StateManager.modality.EXCLUSIVE)
                            break;
                    }
                }

                return exitState;
            }
            return null;
        },
        contains: function (state) {
            return _.contains(this.stateStack, state);
        },
        size: function () {
            return this.stateStack.length;
        },
        isEmpty: function () {
            return this.size() === 0;
        }
    };

    return StateManager;
});