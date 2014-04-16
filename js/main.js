require(
    [
        'lib',
        'state-factory',
        'state-manager',
        'engine',
        'canvas',
        'input'
    ],
    function (lib, refStateFactory, refStateManager, refEngine, refCanvas, refInput) {

        var canvas          = lib.create(refCanvas).init('canvas'),
            input           = lib.create(refInput).init(canvas),
            stateManager    = lib.create(refStateManager).init(input),
            config = {
                stateManager: stateManager,
                canvas: canvas
            },
            stateFactory    = lib.create(refStateFactory).init(config),
            engine          = lib.create(refEngine).init(stateManager);

        stateManager.change(stateFactory.getMenu());
        engine.start();

        // window.setTimeout(function () { stateManager.push(menuState); }, 2000);
        // window.setTimeout(function () { stateManager.pop(); }, 3000);
        // window.setTimeout(function () { stateManager.push(menuState); }, 4000);

        window.setTimeout(function () { engine.stop(); }, 10000);
    }
);