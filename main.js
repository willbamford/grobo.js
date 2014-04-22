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
        'grobo/canvas'
    ],
    function (lib, refStateFactory, refStateManager, refEngine, refCanvas) {

        var canvas          = lib.create(refCanvas).init('canvas'),
            stateManager    = lib.create(refStateManager).init(canvas),
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