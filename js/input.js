define([], function () {

    var Input = function (canvas) {
        this.canvas = canvas.getElement();
    };

    Input.prototype = {
        on: function (eventName, fn) {
            switch (eventName) {
                case 'click':
                    this.canvas.addEventListener('click', function (e) {
                        var coords = generateRelativeCoords(e);
                        var event = {
                            name: 'click',
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
        },
        onEvent: function (fn) {
            this.on('click', fn);
        },
        offEvent: function (fn) {
            this.off('click', fn);
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