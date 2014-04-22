define(['grobo/lib', 'grobo/canvas/canvas'], function (lib, refCanvas) {

    describe('Canvas', function () {

        var canvas;

        beforeEach(function () {
            canvas = lib.create(refCanvas);
        });

        describe('get coordinates for event', function () {

            beforeEach(function () {
                canvas.element = {};
                canvas.element.getBoundingClientRect = function () {
                    return {
                        left: 50,
                        top: 80,
                        right: 100,
                        bottom: 200
                    };
                };
            });

            it('should be able to obtain for "mousedown", "mousemove" and "mouseup"', function () {
                var coords;
                coords = canvas.getCoordsForEvent({type: 'mousedown', clientX: 80, clientY: 90});
                expect(coords).toEqual({x: 30, y: 10});
                coords = canvas.getCoordsForEvent({type: 'mousemove', clientX: 81, clientY: 91});
                expect(coords).toEqual({x: 31, y: 11});
                coords = canvas.getCoordsForEvent({type: 'mouseup', clientX: 82, clientY: 92});
                expect(coords).toEqual({x: 32, y: 12});
            });

            it('should be able to obtain for "touchstart"', function () {
                var touches, coords;
                touches = [{
                    clientX: 54,
                    clientY: 88
                }],
                coords = canvas.getCoordsForEvent({
                    type: 'touchstart',
                    touches: touches
                });
                expect(coords.x).toEqual(4);
                expect(coords.y).toEqual(8);

                coords = canvas.getCoordsForEvent({
                    type: 'touchmove',
                    touches: touches
                });
                expect(coords.x).toEqual(4);
                expect(coords.y).toEqual(8);
            });

            it('should be able to obtain for "touchend"', function () {
                var coords = canvas.getCoordsForEvent({
                    type: 'touchend',
                    changedTouches: [{
                        clientX: 54,
                        clientY: 88
                    }],
                    touches: []
                });
                expect(coords.x).toEqual(4);
                expect(coords.y).toEqual(8);
            });
        });
    });
});