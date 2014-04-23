define(
    [
        'grobo/lib',
        'grobo/state',
        'grobo/ui/button',
        'grobo/ui/panel',
        'grobo/logger'
    ],
    function (lib, refState, refButton, refPanel, logger) {

        var refMenuState = lib.create(refState, {

            name: 'Menu',
            isAnimating: false,

            init: function (config) {

                this.modality = this.EXCLUSIVE;
                this._initState(config);

                var view = lib.create(refPanel).init({
                    canvas: this.canvas,
                    style: {
                        width: this.canvas.width,
                        height: this.canvas.height,
                        background: 'green'
                    }
                });

                var panel = lib.create(refPanel).init({
                    style: {
                        width: '80%', height: '80%',
                        background: 'red'
                    }
                });
                
                var button1 = lib.create(refButton).init({
                    style: {
                        width: '50%', height: '50%'
                    },
                    label: 'Button 1'
                }),
                button2 = lib.create(refButton).init({
                    style: {
                        width: 100, height: 80
                    },
                    label: 'Button 2'
                }),
                button3 = lib.create(refButton).init({
                    style: {
                        width: 100, height: 80
                    },
                    label: 'Button 3'
                });

                view.addChild(panel);
                panel.addChild(button1).addChild(button2).addChild(button3);

                this.view = view;

                return this;
            },

            entered: function () {
                this.isAnimating = true;
                this.view.x = this.canvas.width;
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
                    this.stateManager.push(this.stateFactory.getHelp());
                }
            }
        });

        return refMenuState;
    }
);