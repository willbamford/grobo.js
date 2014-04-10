(function (icx) {

    var GameState = function () {};

    GameState.prototype = {
        entered: function () {
            
        },
        leaving: function () {

        },
        obscuring: function () {

        },
        revealed: function () {

        }
    };

    icx.states.Game = GameState;

} (window.icx));