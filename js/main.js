require(
    [   'state-factory',
        'state-manager',
        'engine',
        'canvas',
        'input'
    ],
    function (refStateFactory, refStateManager, refEngine, refCanvas, refInput) {

        var canvas = Object.create(refCanvas).init('canvas'),
            input = Object.create(refInput).init(canvas),
            stateManager = Object.create(refStateManager).init(input),
            config = {
                stateManager: stateManager,
                canvas: canvas
            },
            stateFactory = Object.create(refStateFactory).init(config),
            engine = Object.create(refEngine).init(stateManager);

        stateManager.change(stateFactory.getMenu());
        engine.start();

        // window.setTimeout(function () { stateManager.push(menuState); }, 2000);
        // window.setTimeout(function () { stateManager.pop(); }, 3000);
        // window.setTimeout(function () { stateManager.push(menuState); }, 4000);

        window.setTimeout(function () { engine.stop(); }, 10000);
    }
);