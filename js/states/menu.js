define(
    ['lib', 'states/state', 'ui/button', 'ui/panel', 'logger'],
    function (lib, refState, refButton, refPanel, logger) {

        var refMenuState = lib.create(refState, {

            name: 'Menu',
            isAnimating: false,

            init: function (config) {

                this.modality = this.EXCLUSIVE;
                this._initState(config);

                var view = lib.create(refPanel).init({
                    canvas: this.canvas,
                    width: this.canvas.width, height: this.canvas.height,
                    x: 0, y: 0,
                    style: 'green'
                });

                var panel = lib.create(refPanel).init({
                    canvas: this.canvas,
                    width: this.canvas.width - 20, height: this.canvas.height - 20,
                    x: 10, y: 10,
                    style: 'red'
                });
                
                var button1 = lib.create(refButton).init({
                    canvas: this.canvas,
                    width: 100, height: 40,
                    x: 20, y: 20,
                    label: 'Button 1'
                }),
                button2 = lib.create(refButton).init({
                    canvas: this.canvas,
                    width: 100, height: 40,
                    x: 20, y: 80,
                    label: 'Button 2'
                });

                view.addChild(panel);
                panel.addChild(button1).addChild(button2);

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