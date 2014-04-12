define([], function () {

    var Canvas = function (elementId) {
        this.element = document.getElementById(elementId);
        this.context2d = this.element.getContext('2d');
    };

    Canvas.prototype = {
        clear: function () {
            this.context2d.clearRect(0, 0, this.element.width, this.element.height);
        },
        fill: function (style) {
            this.context2d.fillStyle = style;
            this.context2d.fillRect(0, 0, this.element.width, this.element.height);
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