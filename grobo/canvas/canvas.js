define([], function () {

    var refCanvas = {

        width: 0,
        height: 0,

        init: function (elementId) {
            this.element = document.getElementById(elementId);
            this.context2d = this.element.getContext('2d');
            this.width = this.element.width;
            this.height = this.element.height;
            return this;
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
            } else if (event.type === 'mousedown' ||
                event.type === 'mousemove' ||
                event.type === 'mouseup') {
                clientX = event.clientX;
                clientY = event.clientY;
            }

            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }
    };

    return refCanvas;
});