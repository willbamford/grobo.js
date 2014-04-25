define(
    [
        'grobo/lib',
        'grobo/ui/view',
        'grobo/ui/image'
    ],
    function (lib, refView, refImage) {

        "use strict";

        var refButton = lib.create(refView, {

            currentStyle: null,
            currentImageView: null,
            imageViews: null,

            init: function (config) {
                var self = this;
                this._initView(config);

                this.label = config.label;
                this.initImageViews();
                this.setCurrentStyle('normal');

                this.on('press', function (event) {
                    self.setCurrentStyle('active');
                    event.consume();
                });

                this.on('release', function (event) {
                    self.setCurrentStyle('normal');
                    event.consume();
                });

                this.on('over', function (event) {
                    self.setCurrentStyle('hover');
                });

                this.on('out', function (event) {
                    self.setCurrentStyle('normal');
                });
                return this;
            },

            initImageViews: function () {
                 var self = this,
                     style = this.style;
                 this.imageViews = {};
                 lib.each(['normal', 'hover', 'active'], function (name) {
                     var imageView;
                     if (style[name] && style[name].imageUrl) {
                         imageView = lib.create(refImage).init({
                             url: style[name].imageUrl
                         });
                         imageView.setParent(self);
                         self.imageViews[name] = imageView;
                     }
                 });
            },

            update: function (delta) {},

            draw: function () {

                var x = this.getWorldX(), y = this.getWorldY(),
                    width = this.width, height = this.height,
                    canvas = this.getCanvas(),
                    context = canvas.getContext(),
                    style = this.currentStyle;

                canvas.fillRectWithStyle(style.background, x, y, width, height);

                if (this.currentImageView) {
                    console.log(this.currentImageView);
                    this.currentImageView.draw();
                }

                if (this.label) {
                    context.font = 'bold 16px sans-serif';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    canvas.fillTextWithStyle(style.text, this.label, x + width / 2, y + height / 2);
                }
            },

            setCurrentStyle: function (name) {
                var style = this.style;
                this.currentStyle = style[name];
                if (this.imageViews)
                     this.currentImageView = this.imageViews[name] || null;
            }
        });

        return refButton;
    }
);