(function (icx) {

    var list = document.getElementById('logger');
    var logger = {
        log: function (message) {
            console.log(message);
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(message));
            list.appendChild(item);
        },
        info: function (message) {
            logger.log('Info: ' + message);
        },
        err: function (e) {
            logger.log('Error: ' + e);
        }
    };

    icx.logger = logger;
    icx.info = logger.info;
    icx.err = logger.err;

} (window.icx));