require(
    [   'state-factory',
        'state-manager',
        'engine'
    ],
    function (StateFactory, StateManager, Engine) {
        var stateFactory = new StateFactory(),
            stateManager = new StateManager(),
            engine = new Engine(stateManager),
            menuState = stateFactory.getMenu(),
            gameState = stateFactory.getGame();

        stateManager.change(menuState);
        engine.start();
        window.setTimeout(function () { engine.stop(); }, 2000);
    }
);