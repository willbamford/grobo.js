require(
    [   'state-factory',
        'state-manager',
        'engine',
        'canvas'
    ],
    function (StateFactory, StateManager, Engine, canvas) {
        var stateManager = new StateManager(),
            config = {
                stateManager: stateManager,
                canvas: canvas
            },
            stateFactory = new StateFactory({stateManager: stateManager, canvas: canvas}),
            engine = new Engine(stateManager),
            menuState = stateFactory.getMenu(),
            gameState = stateFactory.getGame();
        canvas.init();
        stateManager.change(gameState);
        engine.start();

        window.setTimeout(function () { stateManager.push(menuState); }, 2000);
        window.setTimeout(function () { stateManager.pop(); }, 3000);
        window.setTimeout(function () { stateManager.push(menuState); }, 4000);

        window.setTimeout(function () { engine.stop(); }, 5000);
    }
);