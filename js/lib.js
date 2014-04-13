define([], function () {

    function checkArray(arr) {
        if (!arr) throw 'Input array null or undefined';
    }

    var lib = {
        each: function (arr, fn) {
            checkArray(arr);
            var i = 0, len = arr.length;
            while (i < len) {
                if (fn(arr[i], i)) break;
                i++;
            }
        },
        reverseEach: function (arr, fn) {
            checkArray(arr);
            var i = arr.length;
            while (--i >= 0) {
                fn(arr[i], i);
            }
        },
        contains: function (arr, el) {
            checkArray(arr);
            var i = 0, len = arr.length;
            while (i < len) {
                if (arr[i] === el)
                    return true;
                i++;
            }
            return false;
        },
        last: function (arr) {
            checkArray(arr);
            return arr[arr.length - 1];
        },
        until: function (arr, fn) {
            checkArray(arr);
            var i = 0, len = arr.length;
            while (i < len) {
                if (fn(arr[i])) break;
                i++;
            }
        },
        reverseUntil: function (arr, fn) {
            checkArray(arr);
            var i = arr.length;
            while (--i >= 0) {
                if (fn(arr[i])) break;
            }
        }
    };
    return lib;
});