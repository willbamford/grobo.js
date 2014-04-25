define(['grobo/helpers/style'], function (style) { 

    "use strict";

    describe('Style helper', function () {

        describe('measure size', function () {

            it('should return percent of context', function () {
                expect(style.measureSize('75%', 80)).toEqual(60);
            });

            it('should return value if input value is numeric', function () {
                expect(style.measureSize(3)).toEqual(3);
                expect(style.measureSize(3, 2)).toEqual(3);
            });

            it('should return default if value is undefined or null', function () {
                var undefinedSize = style.measureSize(undefined, 100),
                    nullSize = style.measureSize(null, 100);
                expect(undefinedSize).toEqual(0);
                expect(nullSize).toEqual(0);
            });

            it('should return zero if value and default is undefined or null', function () {
                var undefinedSize = style.measureSize(undefined, 100, null),
                    nullSize = style.measureSize(null, 100, undefined);
                expect(undefinedSize).toEqual(0);
                expect(nullSize).toEqual(0);
            });

        });
    });
});