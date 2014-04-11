define(['state-modality'], function (stateModality) {

    var GameState = function (config) {
        this.canvas = config.canvas;
    };

    GameState.prototype = {
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
            this.canvas.fill('blue');
        }
    };

    return GameState;
});