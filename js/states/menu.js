define(['state-modality'], function (stateModality) {

    var MenuState = function (config) {
        this.canvas = config.canvas;
    };

    MenuState.prototype = {
        modality: stateModality.EXCLUSIVE,
        entered: function () {
            
        },
        exiting: function () {

        },
        obscured: function () {

        },
        revealed: function () {

        },
        update: function (delta) {

        },
        draw: function (delta) {
            this.canvas.fill('green');
        }
    };

    return MenuState;
});