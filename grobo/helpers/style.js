define([], function () {

    "use strict";

    var style = {
        measureSize: function (value, context) {

            if (!value) {
                return 0;
            }

            // Units (e.g. percentage)
            if (typeof value === 'string') {
                 if (value.slice(-1) === '%') {
                    var n = value.slice(0, -1);
                    return (n * context) / 100;
                }
            }

            // Pixels
            return value;
        }
    };

    return style;
});