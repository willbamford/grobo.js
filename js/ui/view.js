define([], function () {

    var refView = {

        canvas: null,
        parentView: null,
        childViews: null,
        width: 0,
        height: 0,
        x: 0,
        y: 0,

        _viewInit: function (canvas, parentView, width, height, x, y) {
            this.canvas = canvas;
            this.parentView = parentView;
            this.width = width;
            this.height = height;
            this.x = x || 0;
            this.y = y || 0;
            this.childViews = [];
        },

        init: function (canvas, parentView, width, height, x, y) {
            this._viewInit(canvas, parentView, width, height, x, y);
            return this;
        },

        addChildView: function (view) {
            this.childViews.push(view);
            return this;
        },

        removeChildView: function (view) {
            var i = this.childViews.indexOf(view);
            if (i !== -1) {
                this.childViews.splice(i, 1);
            }
        },

        getWorldX: function () {
            return this.parentView ? this.parentView.getWorldX() + this.x : this.x;
        },

        getWorldY: function () {
            return this.parentView ? this.parentView.getWorldY() + this.y : this.y;
        }
    };

    return refView;
});