define(['grobo/logger'], function (logger) {

    var refEvents = {

        init: function (canvas) {
            this.canvas = canvas;
            return this;
        },

        on: function (eventName, fn) {

            var self = this,
                canvasElement = this.canvas.getElement(),
                eventType = null;

            switch (eventName) {
                case 'click':
                    canvasElement.addEventListener('click', function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                        e.preventDefault();
                    });
                    break;
                case 'press':
                    eventType = this.isTouchSupported() ? 'touchstart' : 'mousedown';
                    canvasElement.addEventListener(eventType, function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                    });
                    break;
                case 'release':
                    eventType = this.isTouchSupported() ? 'touchend' : 'mouseup';
                    canvasElement.addEventListener(eventType, function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                    });
                    break;
                case 'move':
                    eventType = this.isTouchSupported() ? 'touchmove' : 'mousemove';
                        canvasElement.addEventListener(eventType, function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                        e.preventDefault();
                    });
                    break;
            }
        },

        isTouchSupported: function () {
            return 'ontouchmove' in document.documentElement &&
                'ontouchstart' in document.documentElement &&
                'ontouchend' in document.documentElement;
        },

        off: function (eventName, fn) {

            var self = this,
                canvasElement = this.canvas.getElement(),
                eventType = null;

            switch (eventName) {
                case 'click':
                    canvasElement.removeEventListener('click', fn);
                    break;
                case 'press':
                    eventType = this.isTouchSupported() ? 'touchstart' : 'mousedown';
                    canvasElement.removeEventListener(eventType, fn);
                    break;
                case 'release':
                    eventType = this.isTouchSupported() ? 'touchend' : 'mouseup';
                    canvasElement.removeEventListener(eventType, fn);
                    break;
                case 'move':
                    eventType = this.isTouchSupported() ? 'touchmove' : 'mousemove';
                    canvasElement.removeEventListener(eventType, fn);
                    break;
            }
        },

        onInput: function (fn) {
            this.on('click', fn);
            this.on('press', fn);
            this.on('release', fn);
            this.on('move', fn);
        },

        offInput: function (fn) {
            this.off('click', fn);
            this.off('press', fn);
            this.off('release', fn);
            this.off('move', fn);
        }
    };

    function generateEvent(canvas, sourceEvent, name) {
        var coords = canvas.getCoordsForEvent(sourceEvent);
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

    return refEvents;
});