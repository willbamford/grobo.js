define([], function () {
    var lib = {
        each: function (arr, fn) {
            var i = 0, len = arr.length;
            while (i < len) {
                if (fn(arr[i], i)) break;
                i++;
            }
        },
        reverseEach: function (arr, fn) {
            var i = arr.length, el;
            while (--i >= 0) {
                el = arr[i];
                fn(arr[i], i);
            }
        },
        contains: function (arr, el) {
            var i = 0, len = arr.length;
            while (i < len) {
                if (arr[i] === el)
                    return true;
                i++;
            }
            return false;
        },
        last: function (arr) {
            return arr[arr.length - 1];
        },
        until: function (arr, fn) {
            var i = 0, len = arr.length;
            while (i < len) {
                if (fn(arr[i])) break;
                i++;
            }
        },
        reverseUntil: function (arr, fn) {
            var i = arr.length, el;
            while (--i >= 0) {
                el = arr[i];
                if (fn(arr[i])) break;
            }
        }
    };
    return lib;
});