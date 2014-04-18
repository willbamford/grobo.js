define([], function () {

    var refInput = {

        eventMap: {
            click:   'click',
            press:   'mousedown',
            release: 'mouseup',
            move:    'mousemove'
        },

        init: function (canvas) {
            this.canvas = canvas;
            return this;
        },

        on: function (eventName, fn) {
            var self = this,
                canvasEventName = this.eventMap[eventName];
            this.canvas.getElement().addEventListener(canvasEventName, function (e) {
                fn(generateEvent(self.canvas, e, eventName));
                e.preventDefault();
            });
        },

        off: function (eventName, fn) {
            this.canvas.getElement().removeEventListener(this.eventMap[eventName], fn, false);
        },

        onEvent: function (fn) {
            this.on('click', fn);
            this.on('press', fn);
            this.on('release', fn);
            this.on('move', fn);
        },

        offEvent: function (fn) {
            this.off('click', fn);
            this.off('press', fn);
            this.off('release', fn);
            this.off('move', fn);
        }
    };

    function generateEvent(canvas, sourceEvent, name) {
        var coords = canvas.getCoords(sourceEvent);
        return {
            name: name,
            x: coords.x,
            y: coords.y,
            isConsumed: false,
            consume: function () {
                this.isConsumed = true;
            }
        };
    }

    return refInput;
});