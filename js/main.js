require(
    [   'state-factory',
        'state-manager',
        'engine',
        'canvas',
        'input'
    ],
    function (StateFactory, StateManager, Engine, Canvas, Input) {

        var canvas = new Canvas('canvas'),
            input = new Input(canvas),
            stateManager = new StateManager(input),
            config = {
                stateManager: stateManager,
                canvas: canvas
            },
            stateFactory = new StateFactory({stateManager: stateManager, canvas: canvas}),
            engine = new Engine(stateManager);

        stateManager.change(stateFactory.getMenu());
        engine.start();

        // window.setTimeout(function () { stateManager.push(menuState); }, 2000);
        // window.setTimeout(function () { stateManager.pop(); }, 3000);
        // window.setTimeout(function () { stateManager.push(menuState); }, 4000);

        window.setTimeout(function () { engine.stop(); }, 10000);
    }
);