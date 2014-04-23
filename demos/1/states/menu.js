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
                        width: '100%',
                        height: '100%',
                        background: 'green'
                    }
                });

                var panel = lib.create(refPanel).init({
                    style: {
                        width: '90%', height: '90%',
                        background: 'red'
                    }
                });
                
                var button1 = lib.create(refButton).init({
                    style: {
                        top: 0,
                        left: 0,
                        width: '50%',
                        height: '50%',
                        spacing: 10
                    },
                    label: 'Button 1 (TL)'
                }),
                button2 = lib.create(refButton).init({
                    style: {
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '50%',
                        spacing: 10
                    },
                    label: 'Button 2 (TR)'
                }),
                button3 = lib.create(refButton).init({
                    style: {
                        bottom: 0,
                        left: 0,
                        width: '50%',
                        height: '50%',
                        spacing: 10
                    },
                    label: 'Button 3 (BL)'
                }),
                button4 = lib.create(refButton).init({
                    style: {
                        bottom: 0,
                        right: 0,
                        width: '50%',
                        height: '50%',
                        spacing: 10
                    },
                    label: 'Button 4 (BR)'
                });

                view.addChild(panel);
                panel.addChild(button1).addChild(button2).addChild(button3).addChild(button4);

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
                this._handleInputState(event);
                if (event.name === 'click' && !event.isConsumed) {
                    event.consume();
                    this.stateManager.push(this.stateFactory.getHelp());
                }
            }
        });

        return refMenuState;
    }
);