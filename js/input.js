define([], function () {

    var refInput = {

        init: function (canvas) {
            this.canvas = canvas;
            return this;
        },

        on: function (eventName, fn) {
            var self = this;
            switch (eventName) {
                case 'click':
                    this.canvas.getElement().addEventListener('click', function (e) {
                        fn(generateEvent(self.canvas, e, 'click'));
                        e.preventDefault();
                    });
                    break;
                case 'touchdown':
                    this.canvas.getElement().addEventListener('mousedown', function (e) {
                        fn(generateEvent(self.canvas, e, 'touchdown'));
                        e.preventDefault();
                    });
                    break;
                case 'touchup':
                    this.canvas.getElement().addEventListener('mouseup', function (e) {
                        fn(generateEvent(self.canvas, e, 'touchup'));
                        e.preventDefault();
                    });
                    break;
            }
        },

        off: function (eventName, fn) {
            var map = {
                'click': 'click',
                'touchup': 'mouseup',
                'touchdown': 'mousedown'
            };
            this.canvas.getElement().removeEventListener(map[eventName], fn, false);
        },

        onEvent: function (fn) {
            this.on('click', fn);
            this.on('touchdown', fn);
            this.on('touchup', fn);
        },

        offEvent: function (fn) {
            this.off('click', fn);
            this.off('touchdown', fn);
            this.off('touchup', fn);
        }
    };

    function generateEvent(canvas, sourceEvent, name) {
        var coords = canvas.getCoords(sourceEvent);
        return {
            name: name,
            x: coords.x,
            y: coords.y,
            isConsumed: false,
            consume: function () {
                this.isConsumed = true;
            }
        }
    };

    return refInput;
});