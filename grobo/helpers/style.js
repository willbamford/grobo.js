define([], function () {

    var style = {
        measureSize: function (value, context) {

            if (!value) {
                return 0;
            }

            // // Pixels
            // if (typeof value === 'number' && isFinite(value)) {
            //     return value;
            // }

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
    
    // measureSize: function (value, context) {

    //         console.log(value);
    //         console.log(context);
    //         console.log(value.slice(0, -1));
            
    //         if (value && typeof value === 'string') {
    //              if (value.slice(-1) === '%') {
    //                 return (value.slice(0, -1) * 100) / context;
    //             }
    //         }
    //         return value;
    //     },

    return style;
});