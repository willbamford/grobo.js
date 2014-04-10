(function () {
    
    var stateManager = new icx.StateManager(),
        engine = new icx.Engine(stateManager);

    // stateManager.change(/* state here */);
    engine.start();

    window.setTimeout(function () { engine.stop(); }, 2000);

} ());