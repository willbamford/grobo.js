define([], function () {

    var refInput = {

        init: function (canvas) {
            this.canvas = canvas.getElement();
            return this;
        },

        on: function (eventName, fn) {
            switch (eventName) {
                case 'click':
                    this.canvas.addEventListener('click', function (e) {
                        var coords = generateRelativeCoords(e);
                        event = generateConsumableEvent('click');
                        event.x = coords.x;
                        event.y = coords.y;
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

    function generateConsumableEvent(name) {
        return {
            name: name,
            isConsumed: false,
            consume: function () {
                this.isConsumed = true;
            }
        };
    }

    return refInput;
});