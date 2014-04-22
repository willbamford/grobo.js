define(['grobo/logger'], function (logger) {

    var refEvents = {

        init: function (canvas, w) {
            this.canvas = canvas;
            this.window = w || window;
            return this;
        },

        isTouchSupported: function () {
            return 'ontouchmove' in document.documentElement &&
                'ontouchstart' in document.documentElement &&
                'ontouchend' in document.documentElement;
        },

        on: function (eventName, fn) {

            var self = this,
                canvasElement = this.canvas.getElement(),
                sourceEventType = null;

            switch (eventName) {
                case 'click':
                    canvasElement.addEventListener(eventName, function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                    });
                    break;
                case 'press':
                    sourceEventType = this.isTouchSupported() ? 'touchstart' : 'mousedown';
                    canvasElement.addEventListener(sourceEventType, function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                    });
                    break;
                case 'release':
                    sourceEventType = this.isTouchSupported() ? 'touchend' : 'mouseup';
                    canvasElement.addEventListener(sourceEventType, function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                    });
                    break;
                case 'move':
                    sourceEventType = this.isTouchSupported() ? 'touchmove' : 'mousemove';
                        canvasElement.addEventListener(sourceEventType, function (e) {
                        fn(generateEvent(self.canvas, e, eventName));
                    });
                    break;
                case 'resize':
                    this.window.addEventListener(eventName, function (e) {
                        fn({ name: 'resize' });
                    });
                    break;
            }
        },

        off: function (eventName, fn) {

            var self = this,
                canvasElement = this.canvas.getElement(),
                sourceEventType = null;

            switch (eventName) {
                case 'click':
                    canvasElement.removeEventListener(eventName, fn);
                    break;
                case 'press':
                    sourceEventType = this.isTouchSupported() ? 'touchstart' : 'mousedown';
                    canvasElement.removeEventListener(sourceEventType, fn);
                    break;
                case 'release':
                    sourceEventType = this.isTouchSupported() ? 'touchend' : 'mouseup';
                    canvasElement.removeEventListener(sourceEventType, fn);
                    break;
                case 'move':
                    sourceEventType = this.isTouchSupported() ? 'touchmove' : 'mousemove';
                    canvasElement.removeEventListener(sourceEventType, fn);
                    break;
                case 'resize':
                    this.window.removeEventListener(eventName, fn);
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
        },

        setWindow: function (w) {
            win = w;
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