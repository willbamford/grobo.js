define(
    [
        'grobo/lib',
        'grobo/state',
        'grobo/polyfills/function-bind'
    ],
    function (lib, refState) {

        "use strict";

        var refStateManager = {

            init: function (canvas) {
                canvas.onInput(this.handleInput.bind(this));
                canvas.onResize(this.handleResize.bind(this));
                this.stack = [];
                return this;
            },

            getActiveStates: function () {
                var activeStates = [];
                lib.reverseUntil(this.stack, function (state) {
                    activeStates.push(state);
                    return state.modality === refState.EXCLUSIVE;
                });
                return activeStates.reverse();
            },

            tick: function (delta) {
                var activeStates = this.getActiveStates();
                this.update(activeStates, delta);
                this.draw(activeStates);
            },

            update: function (states, delta) {
                lib.each(states, function (state) {
                    state.update(delta);
                });
            },

            draw: function (states) {
               lib.each(states, function (state) {
                    state.draw();
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
                        return state.modality === refState.EXCLUSIVE;
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
                    lib.reverseUntil(this.stack, function (state) {
                        state.revealed();
                        return state.modality === refState.EXCLUSIVE;
                    });

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

            handleInput: function (event) {
                lib.reverseUntil(this.stack, function (state) {
                    state.handleInput(event);
                    return state.modality === refState.EXCLUSIVE || event.isConsumed;
                });
            },

            handleResize: function (event) {
                lib.each(this.stack, function (state) {
                    state.handleResize(event);
                });
            },

            toString: function () {
                lib.each(this.stack, function (state, i) {
                    console.log(i + ' state: ' + state.modality);
                });
            }
        };

        return refStateManager;
    }
);