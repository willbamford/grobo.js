define(
    [
        'grobo/lib',
        'grobo/ui/view'
    ],
    function (lib, refView) {

        "use strict";

        var refImage = lib.create(refView, {

            image: null,
            scaleToFit: true,
            clip: true,

            init: function (config) {
                var self = this;
                this._initView(config);

                if (config.url)
                    this.setImageFromUrl(config.url);
                else
                    this.setImage(config.image);

                if (config.scaleToFit !== undefined)
                    this.scaleToFit = config.scaleToFit;

                return this;
            },

            setImageFromUrl: function (url) {
                if (!this.image)
                    this.image = new Image();
                this.image.src = url;
            },

            setImage: function (image) {
                this.image = image;
            },

            update: function (delta) {},

            draw: function () {
                var canvas = this.getCanvas(),
                    context = canvas.getContext(),
                    x = this.getWorldX(),
                    y = this.getWorldY(),
                    width = this.width,
                    height = this.height,
                    image = this.image;

                if (image) {
                    if (this.scaleToFit) {
                        context.drawImage(image, x, y, width, height);
                    } else {

                        if (this.clip) {
                            context.save();
                            context.rect(x, y, width, height);
                            context.clip();
                        }

                        context.drawImage(image, x, y);

                        if (this.clip) {
                            context.restore();
                        }
                    }
                }
            }
        });

        return refImage;
    }
);