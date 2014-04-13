define([], function () {

    var Canvas = function (elementId) {
        this.element = document.getElementById(elementId);
        this.context2d = this.element.getContext('2d');

        // TODO: remove
        window.context2d = this.context2d;
    };

    Canvas.prototype = {
        clear: function () {
            this.context2d.clearRect(0, 0, this.element.width, this.element.height);
        },
        fill: function (style) {
            this.fillRect(style, 0, 0, this.element.width, this.element.height);
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
        }
    };

    return Canvas;
});