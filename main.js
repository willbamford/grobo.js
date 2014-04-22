/*
require.config({
    urlArgs: 'bust=' + (new Date()).getTime()
});
*/

require(
    [
        'grobo/lib',
        'grobo/state-factory',
        'grobo/state-manager',
        'grobo/engine',
        'grobo/canvas/canvas',
        'grobo/canvas/events'
    ],
    function (lib, refStateFactory, refStateManager, refEngine, refCanvas, refCanvasEvents) {

        var canvas          = lib.create(refCanvas).init('canvas'),
            canvasEvents    = lib.create(refCanvasEvents).init(canvas),
            stateManager    = lib.create(refStateManager).init(canvasEvents),
            config = {
                stateManager: stateManager,
                canvas: canvas
            },
            stateFactory    = lib.create(refStateFactory).init(config),
            engine          = lib.create(refEngine).init(stateManager);

        stateManager.change(stateFactory.getGame());
        engine.start();

        // window.setTimeout(function () { stateManager.push(menuState); }, 2000);
        // window.setTimeout(function () { stateManager.pop(); }, 3000);
        // window.setTimeout(function () { stateManager.push(menuState); }, 4000);
        // window.setTimeout(function () { engine.stop(); }, 10000);
    }
);