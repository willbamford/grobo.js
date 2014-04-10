require(['state-manager'], function (StateManager) {
});

/*
(function () {
    
    var stateFactory = new icx.StateFactory(),
        stateManager = new icx.StateManager(),
        engine = new icx.Engine(stateManager),
        menuState = stateFactory.getMenu(),
        gameState = stateFactory.getGame();

    stateManager.change(menuState);
    engine.start();
    window.setTimeout(function () { engine.stop(); }, 2000);

} ());
*/