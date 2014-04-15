define(['lib'], function (lib) {

    var refView = {

        canvas: null,
        parent: null,
        children: null,
        width: 0,
        height: 0,
        x: 0,
        y: 0,

        _initView: function (canvas, parent, width, height, x, y) {
            this.canvas = canvas;
            this.parent = parent;
            this.width = width;
            this.height = height;
            this.x = x || 0;
            this.y = y || 0;
            this.children = [];
        },

        init: function (canvas, parent, width, height, x, y) {
            this._initView(canvas, parent, width, height, x, y);
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

        draw: function (delta) {
            this.drawChildren(delta);
        },

        drawChildren: function (delta) {
            lib.each(this.children, function (childView) {
                childView.draw(delta);
            });
        }
    };

    return refView;
});