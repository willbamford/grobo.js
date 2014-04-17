define(['lib', 'geom'], function (lib, geom) {

    var refView = {

        canvas: null,
        parent: null,
        children: null,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        clickListeners: null,

        _initView: function (config) {
            this.canvas         = config.canvas || null;
            this.parent         = config.parent || null;
            this.width          = config.width || 0;
            this.height         = config.height || 0;
            this.x              = config.x || 0;
            this.y              = config.y || 0;
            this.children       = [];
            this.clickListeners = [];
        },

        init: function (config) {
            this._initView(config);
            return this;
        },

        addChild: function (view) {
            view.parent = this;
            this.children.push(view);
            return this;
        },

        removeChild: function (view) {
            var i = this.children.indexOf(view);
            if (i !== -1) {
                this.children.splice(i, 1);
                view.parent = null;
            }
        },

        getWorldX: function () {
            return this.parent ? this.parent.getWorldX() + this.x : this.x;
        },

        getWorldY: function () {
            return this.parent ? this.parent.getWorldY() + this.y : this.y;
        },

        draw: function () {
            this.drawChildren();
        },  

        drawChildren: function () {
            lib.each(this.children, function (child) {
                child.draw();
            });
        },

        handleInput: function (event) {
            switch (event.name) {
                case 'click':
                    this.handleClick(event);
                    break;
            }
        },

        handleInputChildren: function (event) {
            lib.reverseUntil(this.children, function (child) {
                child.handleInput(event);
                return event.isConsumed;
            });
            return event.isConsumed;
        },

        isEventInside: function (event) {
            return geom.isPointInsideRect(
                event.x, event.y,
                this.getWorldX(), this.getWorldY(),
                this.width, this.height
            );
        },

        handleClick: function (event) {
            if (!this.handleInputChildren(event) && this.isEventInside(event)) {
                lib.each(this.clickListeners, function (listener) {
                    listener(event);
                });
            }
        },

        onClick: function (fn) {
            var i = this.clickListeners.indexOf(fn);
            if (i === -1)
                this.clickListeners.push(fn);
        },

        offClick: function (fn) {
            var i = this.clickListeners.indexOf(fn);
            if (i !== -1)
                this.clickListeners.splice(i, 1);
        }
    };

    return refView;
});