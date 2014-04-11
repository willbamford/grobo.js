define([], function () {

    var Engine = function (stateManager) {
        this.stateManager = stateManager;
        this.tickCount = 0;
        this.requestId = null;
        this.isRunning = false;
        this.lastTime = null;
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
            var currentTime = new Date(),
                delta = 0;
            this.tickCount += 1;
            if (this.lastTime) {
                delta = currentTime - this.lastTime;
            }
            this.stateManager.tick(delta);
            this.lastTime = currentTime;
            
            this.requestId = window.requestAnimationFrame(this.tick.bind(this));
        }
    };

    return Engine;
});