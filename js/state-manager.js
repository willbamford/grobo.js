define(['state-modality'], function (stateModality) {

    var StateManager = function (input) {
        input.onEvent(this.onInput);
        this.stack = [];
    };

    StateManager.prototype = {

        tick: function (delta) {

            var i = this.stack.length,
                state,
                statesToUpdateAndDraw = [];
            while (--i >= 0) {
                state = this.stack[i];
                statesToUpdateAndDraw.push(state);
                if (state.modality === stateModality.EXCLUSIVE)
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
                return _.last(this.stack);
            }
            return null;
        },
        push: function (enterState) {
            if (!this.contains(enterState)) {

                // Obscuring
                var i = this.stack.length,
                    state;
                while (--i >= 0) {
                    state = this.stack[i];
                    state.obscured();
                    if (state.modality === stateModality.EXCLUSIVE)
                        break;
                }

                this.stack.push(enterState);

                // Entered
                enterState.entered();
            }
            return this;
        },
        pop: function () {
            var exitState = null;
            if (!this.isEmpty()) {

                // Exiting
                exitState = this.stack.pop();
                exitState.exiting();

                // Revealed
                if (exitState.modality === stateModality.EXCLUSIVE) {
                    var i = this.stack.length,
                        state;
                    while (--i >= 0) {
                        state = this.stack[i];
                        state.revealed();
                        if (state.modality === stateModality.EXCLUSIVE)
                            break;
                    }
                }

                return exitState;
            }
            return null;
        },
        contains: function (state) {
            return _.contains(this.stack, state);
        },
        size: function () {
            return this.stack.length;
        },
        isEmpty: function () {
            return this.size() === 0;
        },
        onInput: function (event) {
            this.stack[this.stack.length - 1].onInput(event);
        }
    };

    return StateManager;
});