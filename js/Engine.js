define([], function () {

    var Engine = function (stateManager) {
        this.stateManager = stateManager;
        this.tickCount = 0;
        this.requestId = null;
        this.isRunning = false;
    };

    Engine.prototype = {

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
            this.tickCount += 1;
            this.requestId = window.requestAnimationFrame(this.tick.bind(this));
            this.stateManager.tick();
        }
    };

    return Engine;
});