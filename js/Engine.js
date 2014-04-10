(function (icx) {

    var Engine = function (stateManager) {
        this.stateManager = stageManager;
        this.stepCount = 0;
        this.requestId = null;
        this.isRunning = false;
    };

    Engine.prototype = {

        start: function () {
            icx.info('Engine::start()');
            if (!this.isRunning) {
                this.requestId = window.requestAnimationFrame(this.step.bind(this));
                this.isRunning = true;
            }
        },

        stop: function () {
            icx.info('Engine::stop()');
            if (this.isRunning) {
                window.cancelAnimationFrame(this.requestId);
                this.isRunning = false;
            }
        },

        step: function () {
            icx.info('Engine::step(' + this.stepCount + ')');
            this.stepCount += 1;
            this.requestId = window.requestAnimationFrame(this.step.bind(this));

            if (this.stateManager) {
                this.stateManager.update();
                this.stateManager.draw();
            }
        }
    };

    icx.Engine = Engine;

} (window.icx));