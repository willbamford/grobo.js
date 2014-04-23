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
        'demos/1/state-factory'
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

        window.setTimeout(function () {
            canvas.resize(400, 300);
        }, 2000);

        window.addEventListener('resize', function () {
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                width = w.innerWidth || e.clientWidth || g.clientWidth,
                height = w.innerHeight|| e.clientHeight|| g.clientHeight;

            canvas.resize(Math.round(width / 2), Math.round(height / 2));
        });

        // window.setTimeout(function () { stateManager.push(menuState); }, 2000);
        // window.setTimeout(function () { stateManager.pop(); }, 3000);
        // window.setTimeout(function () { stateManager.push(menuState); }, 4000);
        // window.setTimeout(function () { engine.stop(); }, 10000);
    }
);