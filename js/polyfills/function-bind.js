define([], function () {

    // Adapted from:
    // https://github.com/cujojs/poly/blob/master/function.js
    if (!Function.prototype.bind) {

        var self = this,
            slice = [].slice,
            bind = function bind(obj) {
            var args = slice.call(arguments, 1),
                self = this,
                nop = function () {},
                bound = function () {
                  return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
                };
            nop.prototype = this.prototype || {}; // Firefox cries sometimes if prototype is undefined
            bound.prototype = new nop();
            return bound;
        };
        Function.prototype.bind = bind;
    }
});