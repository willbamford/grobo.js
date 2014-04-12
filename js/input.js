define([], function () {

    var Input = function (canvas) {
        this.canvas = canvas;
    };

    Input.prototype = {
        on: function (eventName, fn) {
            switch (eventName) {
                case 'click':
                    this.canvas.addEventListener('click', function (e) {
                        var coords = generateRelativeCoords(e);
                        var event = {
                            x: coords.x,
                            y: coords.y
                        };
                        fn(event);
                        e.preventDefault();
                    });
                    break;
            }
        },
        off: function (eventName, fn) {
            switch (eventName) {
                case 'click':
                    this.canvas.removeEventListener('click', fn, false);
                    break;
            }
        }
    };

    function generateRelativeCoords(event) {
        return {
            x: event.clientX - event.target.offsetLeft,
            y: event.clientY - event.target.offsetTop 
        };
    }

    return Input;
});