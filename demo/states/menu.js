define(
    [
        'grobo/lib',
        'grobo/state',
        'grobo/ui/view',
        'grobo/ui/button',
        'grobo/logger'
    ],
    function (lib, refState, refView, refButton, logger) {

        var refMenuState = lib.create(refState, {

            name: 'Menu',
            isAnimating: false,

            init: function (config) {

                this.modality = this.EXCLUSIVE;
                this._initState(config);

                var view = lib.create(refView).init({
                    canvas: this.canvas,
                    style: {
                        width: '100%',
                        height: '100%',
                        background: 'black'
                    }
                });

                var panel = lib.create(refView).init({
                    style: {
                        spacing: 3,
                        background: 'black'
                    }
                });
                
                view.addChild(panel);

                var context = this.canvas.getContext();
                var numCols = 4, numRows = 4,
                    col, row,
                    button,
                    buttons = [];

                var makeButton = function (col, row) {
                    button = lib.create(refButton).init({
                        style: {
                            left: (col * 100 / numCols) + '%',
                            top: (row * 100 / numRows) + '%',
                            width: (100 / numCols + '%'),
                            height: (100 / numRows + '%'),
                            spacing: 3,
                            normal: {
                                background: 'rgb(0, 127, 255)',
                                text: 'black'
                            },
                            active: {
                                background: 'pink',
                                text: 'white'
                            },
                            hover: {
                                background: 'white',
                                text: 'green'
                            }
                        },
                        label: col + 'x' + row
                    });
                    button.on('click', function (event) {
                        logger.info(col + 'x' + row);
                        event.consume();
                    });
                    panel.addChild(button);
                };

                for (col = 0; col < numCols; col++) {
                    for (row = 0; row < numRows; row++) {
                        makeButton(col, row);
                    }
                }

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