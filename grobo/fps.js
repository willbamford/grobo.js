define([], function () {

    var fps = {
        init: function (sampleSize, callback) {
            this.time = 0;
            this.frame = 0;
            this.sampleSize = sampleSize || 100;
            this.framesPerSecond = 0;
            this.callback = callback;
        },
        tick: function (delta) {
            this.frame++;
            this.time += delta;
            if (this.frame === this.sampleSize) {
                this.framesPerSecond = ((this.frame / this.time) * 1000).toFixed(2);
                if (this.callback) {
                    this.callback(this.framesPerSecond);
                }
                this.time = 0;
                this.frame = 0;
            }
        }
    };
    return fps;
});