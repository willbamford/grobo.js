define(['lib'], function (lib) { 

    describe('Library', function () {

        describe('each', function () {
            
            it('should iterate over array and pass element and index to callback function', function () {
                var arr = ['twinsen', 'zoe', 'funfrock'],
                    trace = '';
                lib.each(arr, function (el, i) {
                    trace += '[' + el + ':' + i + ']';
                });
                expect(trace).toEqual('[twinsen:0][zoe:1][funfrock:2]');
            });

            it('reverse should do the same but in reverse', function () {
                var arr = ['twinsen', 'zoe', 'funfrock'],
                    trace = '';
                lib.reverseEach(arr, function (el, i) {
                    trace += '[' + el + ':' + i + ']';
                });
                expect(trace).toEqual('[funfrock:2][zoe:1][twinsen:0]');
            });
        });

        describe('contains', function () {

            it('should return true if the array contains the element', function () {
                var arr = ['a', 'b', 'c'];
                expect(lib.contains(arr, 'b')).toBeTruthy();
            });

            it('should return false if the array does not contain the element', function () {
                var arr = ['a', 'b', 'c'];
                expect(lib.contains(arr, 'd')).toBeFalsy();
            });
        });

        describe('last', function () {

            it('should return the last element', function() {
                var arr = ['a', 'b', 'c'];
                expect(lib.last(arr)).toEqual('c');
            });
        });

        describe('until', function () {

            it('should call callback function until true returned', function () {
                var arr = ['one', 'two', 'three'],
                    callTrace = '';
                lib.until(arr, function (element) {
                    callTrace += '[' + element + ']';
                    return element === 'two';
                });
                expect(callTrace).toEqual('[one][two]');
            });

            it('should call callback function until true returned (last element to first)', function () {
                var arr = ['one', 'two', 'three'],
                    callTrace = '';
                lib.reverseUntil(arr, function (element) {
                    callTrace += '[' + element + ']';
                    return element === 'two';
                });
                expect(callTrace).toEqual('[three][two]');
            });
        });

    });
});