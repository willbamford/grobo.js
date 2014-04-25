define(
    [
        'grobo/fps',
        'grobo/logger',
        'grobo/polyfills/function-bind',
        'grobo/polyfills/animation-frame'
    ],
    function (fps, logger) {

        "use strict";

        var refEngine = {

            init: function (stateManager) {
                this.stateManager = stateManager;
                this.requestId = null;
                this.isRunning = false;
                this.lastTime = null;
                fps.init(120, function (framesPerSecond) {
                    // logger.info(framesPerSecond);
                });
                return this;
            },

            start: function () {
                if (!this.isRunning) {
                    this.requestId = window.requestAnimationFrame(this.tick.bind(this));
                    this.isRunning = true;
                }
            },

            stop: function () {
                if (this.isRunning) {
                    window.cancelAnimationFrame(this.requestId);
                    this.isRunning = false;
                }
            },

            tick: function () {
                var currentTime = new Date(),
                    delta = 0;

                if (this.lastTime) {
                    delta = currentTime - this.lastTime;
                }
                this.stateManager.tick(delta);
                this.lastTime = currentTime;

                this.requestId = window.requestAnimationFrame(this.tick.bind(this));

                fps.tick(delta);
            }
        };

        return refEngine;
    }
);