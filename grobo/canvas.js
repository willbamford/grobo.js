define([], function () {

    var refCanvas = {

        width: 0,
        height: 0,

        init: function (el, w) {
            this.element = typeof el === 'string' ? document.getElementById(el) : el;
            this.context2d = this.element.getContext('2d');
            this.width = this.element.width;
            this.height = this.element.height;
            this.window = w || window;
            return this;
        },

        getElement: function () {
            return this.element;
        },

        getContext: function () {
            return this.context2d;
        },

        getCoordsForEvent: function (event) {
            var rect = this.element.getBoundingClientRect(),
                clientX = 0,
                clientY = 0;

            if (event.type === 'touchstart' ||
                event.type === 'touchmove') {
                if (event.touches && event.touches.length) {
                    clientX = event.touches[0].clientX;
                    clientY = event.touches[0].clientY;
                }
            } else if (event.type === 'touchend') {
                if (event.changedTouches && event.changedTouches.length) {
                    clientX = event.changedTouches[0].clientX;
                    clientY = event.changedTouches[0].clientY;
                }
            } else if (
                event.type === 'click' ||
                event.type === 'mousedown' ||
                event.type === 'mousemove' ||
                event.type === 'mouseup') {
                clientX = event.clientX;
                clientY = event.clientY;
            }

            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        },

        isTouchSupported: function () {
            return 'ontouchmove' in document.documentElement &&
                'ontouchstart' in document.documentElement &&
                'ontouchend' in document.documentElement;
        },

        on: function (eventName, fn) {

            var self = this,
                element = this.element,
                sourceEventType = null;

            switch (eventName) {
                case 'click':
                    element.addEventListener(eventName, function (e) {
                        fn(generateEvent(self, e, eventName));
                    });
                    break;
                case 'press':
                    sourceEventType = this.isTouchSupported() ? 'touchstart' : 'mousedown';
                    element.addEventListener(sourceEventType, function (e) {
                        fn(generateEvent(self, e, eventName));
                    });
                    break;
                case 'release':
                    sourceEventType = this.isTouchSupported() ? 'touchend' : 'mouseup';
                    element.addEventListener(sourceEventType, function (e) {
                        fn(generateEvent(self, e, eventName));
                    });
                    break;
                case 'move':
                    sourceEventType = this.isTouchSupported() ? 'touchmove' : 'mousemove';
                        element.addEventListener(sourceEventType, function (e) {
                        fn(generateEvent(self, e, eventName));
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
                element = this.getElement(),
                sourceEventType = null;

            switch (eventName) {
                case 'click':
                    element.removeEventListener(eventName, fn);
                    break;
                case 'press':
                    sourceEventType = this.isTouchSupported() ? 'touchstart' : 'mousedown';
                    element.removeEventListener(sourceEventType, fn);
                    break;
                case 'release':
                    sourceEventType = this.isTouchSupported() ? 'touchend' : 'mouseup';
                    element.removeEventListener(sourceEventType, fn);
                    break;
                case 'move':
                    sourceEventType = this.isTouchSupported() ? 'touchmove' : 'mousemove';
                    element.removeEventListener(sourceEventType, fn);
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

        clear: function () {
            this.context2d.clearRect(0, 0, this.width, this.height);
        },

        fill: function (style) {
            this.fillRect(style, 0, 0, this.width, this.height);
        },

        fillRect: function (style, x, y, width, height) {
            this.context2d.fillStyle = style;
            this.context2d.fillRect(x, y, width, height);
        },

        fillText: function (style, text, x, y) {
            this.context2d.fillStyle = style;
            this.context2d.fillText(text, x, y);
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

    return refCanvas;
});