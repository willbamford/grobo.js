define([], function () {

    var refState = {

        POPUP: 0,
        EXCLUSIVE: 1,

        modality: null,

        init: function () {
            return this;
        },

        entered: function () {},

        exiting: function () {},

        obscured: function () {},

        revealed: function () {}
    };

    return refState;
});