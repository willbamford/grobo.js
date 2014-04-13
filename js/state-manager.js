define(['lib', 'state-modality'], function (lib, stateModality) {

    var StateManager = function (input) {
        input.onEvent(this.onInput.bind(this));
        this.stack = [];
    };

    StateManager.prototype = {

        tick: function (delta) {
            var statesToUpdateAndDraw = [];
            lib.reverseUntil(this.stack, function (state) {
                statesToUpdateAndDraw.push(state);
                return state.modality === stateModality.EXCLUSIVE;
            });
            this.updateStates(statesToUpdateAndDraw, delta);
            this.drawStates(statesToUpdateAndDraw, delta);
        },

        updateStates: function (states, delta) {
            lib.reverseEach(states, function (state) {
                state.update(delta);
            });
        },

        drawStates: function (states, delta) {
           lib.reverseEach(states, function (state) {
                state.draw(delta);
            });
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
                return lib.last(this.stack);
            }
            return null;
        },
        push: function (enterState) {
            if (!this.contains(enterState)) {

                // Obscuring
                lib.reverseUntil(this.stack, function (state) {
                    state.obscured();
                    return state.modality === stateModality.EXCLUSIVE;
                });

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
                    lib.reverseUntil(this.stack, function (state) {
                        state.revealed();
                        return state.modality === stateModality.EXCLUSIVE;
                    });
                }

                return exitState;
            }
            return null;
        },
        contains: function (state) {
            return lib.contains(this.stack, state);
        },
        size: function () {
            return this.stack.length;
        },
        isEmpty: function () {
            return this.size() === 0;
        },
        onInput: function (event) {
            lib.reverseUntil(this.stack, function (state) {
                state.onInput(event);
                return state.modality === stateModality.EXCLUSIVE || event.isConsumed();
            });
        }
    };

    return StateManager;
});