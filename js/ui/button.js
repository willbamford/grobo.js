define(['ui/view', 'geom'], function (refView, geom) {

    var refButton = Object.create(refView);

    refButton.init = function (config) {
        this._initView(config);
        this.label = config.label;
        return this;
    };

    refButton.update = function (delta) {},

    refButton.draw = function () {
        var x = this.getWorldX(),
            y = this.getWorldY();
        this.canvas.fillRect('white', x, y, this.width, this.height);
        this.canvas.fillText('black', this.label, x + 20, y + 20);
    };

    refButton.onInput = function (event) {
        switch (event.name) {
            case 'click':
                this.onClick(event);
                break;
            case 'touchup':
                this.onTouchUp(event);
                break;
            case 'touchdown':
                this.onTouchDown(event);
                break;
        }
    };

    refButton.onClick = function (event) {
        var isClicked = geom.isPointInsideRect(
            event.x, event.y,
            this.getWorldX(), this.getWorldY(),
            this.width, this.height
        );
        if (isClicked) {
            alert('Click!');
            event.isConsumed = true;
        }
    };

    refButton.onTouchUp = function (event) {
        
        event.consume();
    };

    refButton.onTouchDown = function (event) {
        
        event.consume();
    };

    return refButton;
});