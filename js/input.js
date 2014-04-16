define([], function () {

    var refInput = {

        init: function (canvas) {
            this.canvasElement = canvas.getElement();
            return this;
        },

        on: function (eventName, fn) {
            switch (eventName) {
                case 'click':
                    this.canvasElement.addEventListener('click', function (e) {
                        fn(generateEvent(e, 'click'));
                        e.preventDefault();
                    });
                    break;
                case 'touchdown':
                    this.canvasElement.addEventListener('mousedown', function (e) {
                        fn(generateEvent(e, 'touchdown'));
                        e.preventDefault();
                    });
                    break;
                case 'touchup':
                    this.canvasElement.addEventListener('mouseup', function (e) {
                        fn(generateEvent(e, 'touchup'));
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
            this.canvasElement.removeEventListener(map[eventName], fn, false);
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

    function generateEvent(sourceEvent, name) {
        return {
            name: name,
            x: sourceEvent.clientX - sourceEvent.target.offsetLeft,
            y: sourceEvent.clientY - sourceEvent.target.offsetTop,
            isConsumed: false,
            consume: function () {
                this.isConsumed = true;
            }
        }
    };

    return refInput;
});