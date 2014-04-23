/*
require.config({
    urlArgs: 'bust=' + (new Date()).getTime()
});
*/

require(
    [
        'grobo/lib',
        'grobo/state-manager',
        'grobo/engine',
        'grobo/canvas',
        'demo/state-factory'
    ],
    function (lib, refStateManager, refEngine, refCanvas, refStateFactory) {

        var canvas = lib.create(refCanvas).init('canvas'),
            stateManager = lib.create(refStateManager).init(canvas),
            config = {
                stateManager: stateManager,
                canvas: canvas
            },
            stateFactory = lib.create(refStateFactory).init(config),
            engine = lib.create(refEngine).init(stateManager);

        stateManager.change(stateFactory.getGame());
        engine.start();

        var listener = function () {
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                width = w.innerWidth || e.clientWidth || g.clientWidth,
                height = w.innerHeight || e.clientHeight || g.clientHeight;

            canvas.resize(Math.round(width), Math.round(innerHeight));
        };

        window.addEventListener('resize', listener);
        window.addEventListener('orientationchange', listener);

        listener();
    }
);