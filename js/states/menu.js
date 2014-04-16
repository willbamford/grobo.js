define(
    ['lib', 'states/state', 'ui/button', 'ui/panel', 'logger'],
    function (lib, refState, refButton, refPanel, logger) {

        var refMenuState = lib.create(refState, {

            name: 'Menu',
            isAnimating: false,

            init: function (config) {
                this.modality = this.EXCLUSIVE;
                this._initState(config);

                this.view = lib.create(refPanel).init({
                    canvas: this.canvas,
                    parent: null,
                    width: this.canvas.width, height: this.canvas.height,
                    x: 0, y: 0,
                    style: 'red'
                });
                
                var button1 = lib.create(refButton).init({
                    canvas: this.canvas,
                    parent: null,
                    width: 100, height: 40,
                    x: 20, y: 20,
                    label: 'Button 1'
                }),
                button2 = lib.create(refButton).init({
                    canvas: this.canvas,
                    parent: null,
                    width: 100, height: 40,
                    x: 20, y: 80,
                    label: 'Button 2'
                });
                this.view.addChild(button1).addChild(button2);
                return this;
            },

            update: function (delta) {
                if (this.isAnimating) {
                    if (this.view.x > 0) {
                        this.view.x -= delta;
                        if (this.view.x <= 0) {
                            this.view.x = 0;
                            this.isAnimating = false;
                        }
                    }
                }
            },

            draw: function () {
                this.view.draw();
            },

            handleInput: function (event) {
                this.view.handleInput(event);
                if (event.name === 'click' && !event.isConsumed) {
                    event.consume();
                    this.stateManager.push(this.stateFactory.getGame());
                }
            }
        });

        return refMenuState;
    }
);