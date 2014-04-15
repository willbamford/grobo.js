define([], function () {

    var list = document.getElementById('logger');

    return {

        log: function (message) {
            console.log(message);
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(message));
            list.appendChild(item);
        },

        info: function (message) {
            this.log('Info: ' + message);
        },

        err: function (e) {
            this.log('Error: ' + e);
        }
    };
});