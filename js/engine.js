define(['fps', 'logger'], function (fps, logger) {

    var refEngine = {

        init: function (stateManager) {
            var self = this;
            this.stateManager = stateManager;
            this.tickCount = 0;
            this.requestId = null;
            this.isRunning = false;
            this.lastTime = null;

            fps.init(500, function (framesPerSecond) {
                logger.info(framesPerSecond);
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
            this.tickCount += 1;
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
});