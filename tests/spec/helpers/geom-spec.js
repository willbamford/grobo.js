define(['grobo/lib', 'grobo/helpers/geom'], function (lib, geom) { 

    describe('Geometry helper', function () {

        describe('rect contains point', function () {

            it('should return true if point is inside', function () {

                var dataProvider = [
                    { x: 15, y: 15, leftX: 10, topY: 10, width: 10, height: 10, expectContains: true},
                    { x: 10, y: 10, leftX: 10, topY: 10, width: 10, height: 10, expectContains: true},
                    { x: 20, y: 20, leftX: 10, topY: 10, width: 10, height: 10, expectContains: true},
                    { x: 9, y: 9, leftX: 10, topY: 10, width: 10, height: 10, expectContains: false},
                    { x: 21, y: 21, leftX: 10, topY: 10, width: 10, height: 10, expectContains: false}
                ];

                lib.each(dataProvider, function (d) {
                    expect(
                        geom.isPointInsideRect(d.x, d.y, d.leftX, d.topY, d.width, d.height)
                    ).toEqual(
                        d.expectContains
                    );
                });
            });
        });
    });
});