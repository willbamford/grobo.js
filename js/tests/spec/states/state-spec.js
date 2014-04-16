define(['lib', 'states/state'], function (lib, refState) { 

    var state;

    describe('State', function () {

        beforeEach(function () {
            state = lib.create(refState);
        });

        it('should return self on initialisation', function () {
            var state2 = state.init({});
            expect(state2).toEqual(state);
        });

        it('should provide default methods for "entered", "exiting", "obscured" and "revealed"', function () {
            state.init({});
            expect(typeof state.entered).toEqual('function');
            expect(typeof state.exiting).toEqual('function');
            expect(typeof state.obscured).toEqual('function');
            expect(typeof state.revealed).toEqual('function');
        });

        it('should provide default methods for "update", "draw" and "handleInput"', function () {
            state.init({});
            expect(typeof state.update).toEqual('function');
            expect(typeof state.draw).toEqual('function');
            expect(typeof state.handleInput).toEqual('function');
        });

        it('should be able to initialise with modality, canvas, stateFactory and stateManager', function () {
            var modality = refState.EXCLUSIVE,
                canvas = 'canvas',
                stateFactory = 'stateFactory',
                stateManager = 'stateManager'
            state.init({
                modality: modality,
                canvas: canvas,
                stateFactory: stateFactory,
                stateManager: stateManager
            });
            expect(state.modality).toEqual(modality);
            expect(state.canvas).toEqual(canvas);
            expect(state.stateFactory).toEqual(stateFactory);
            expect(state.stateManager).toEqual(stateManager);
        });
    });
});