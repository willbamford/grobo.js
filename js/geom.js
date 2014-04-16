define([], function () {

    var geom = {
        isPointInsideRect: function (x, y, leftX, topY, width, height) {
            return (x >= leftX) && (x <= leftX + width) &&
                (y >= topY) && (y <= topY + height);
        }
    };

    return geom;
});