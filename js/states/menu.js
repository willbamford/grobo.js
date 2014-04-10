(function (icx) {

    var MenuState = function () {};

    MenuState.prototype = {
        entered: function () {
            
        },
        leaving: function () {

        },
        obscuring: function () {

        },
        revealed: function () {

        }
    };

    icx.states.Menu = MenuState;

} (window.icx));