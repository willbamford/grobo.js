define([], function () {

    var lib = {

        each: function (arr, fn) {
            if (arr && arr.length > 0) {
                var i = 0, len = arr.length;
                while (i < len) {
                    if (fn(arr[i], i)) break;
                    i++;
                }
            }
        },

        reverseEach: function (arr, fn) {
            if (arr && arr.length > 0) {
                var i = arr.length;
                while (--i >= 0) {
                    fn(arr[i], i);
                }
            }
        },

        contains: function (arr, el) {
            return arr ? (arr.indexOf(el) !== -1) : false;
        },

        last: function (arr) {
            if (arr && arr.length > 0) {
                return arr[arr.length - 1];
            }
            return null;
        },

        until: function (arr, fn) {
            if (arr && arr.length > 0) {
                var i = 0, len = arr.length;
                while (i < len) {
                    if (fn(arr[i])) break;
                    i++;
                }
            }
        },

        reverseUntil: function (arr, fn) {
            if (arr && arr.length > 0) {
                var i = arr.length;
                while (--i >= 0) {
                    if (fn(arr[i])) break;
                }
            }
        },

        create: function (parent, augment) {
            function F() {}
            F.prototype = parent;
            var derived = new F(), i, len, props, prop;
            if (augment) {
                props = Object.keys(augment);
                len = props.length;
                for (i = 0; i < len; i++) {
                    prop = props[i];
                    derived[prop] = augment[prop];
                }
            }
            return derived;
        }
    };
    return lib;
});