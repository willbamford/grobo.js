define([], function () {

    var canvas,
        context2d;
    return {
        init: function () {
            canvas = document.getElementById('canvas');
            context2d = canvas.getContext('2d');

            // TODO: remove
            window.canvas = canvas;
            window.ctx = context2d;
        },
        clear: function () {
            context2d.clearRect(0, 0, canvas.width, canvas.height);
        },
        fill: function (style) {
            context2d.fillStyle = style;
            context2d.fillRect(0, 0, canvas.width, canvas.height);
        },
        getContext: function () {
            return context2d;
        }
    };
});