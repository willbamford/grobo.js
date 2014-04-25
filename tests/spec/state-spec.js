define(['grobo/lib', 'grobo/state'], function (lib, refState) { 

    "use strict";

    var state;

    describe('State', function () {

        beforeEach(function () {
            state = lib.create(refState);
        });

        it('should return self on initialisation', function () {
            var s = state.init({});
            expect(s).toEqual(state);
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

        it('should be able to initialise with canvas, stateFactory and stateManager', function () {
            var canvas = 'canvas',
                stateFactory = 'stateFactory',
                stateManager = 'stateManager';
            state.init({
                canvas: canvas,
                stateFactory: stateFactory,
                stateManager: stateManager
            });
            expect(state.canvas).toEqual(canvas);
            expect(state.stateFactory).toEqual(stateFactory);
            expect(state.stateManager).toEqual(stateManager);
        });

        it('should send input event to primary view on input', function () {
            var event = {},
                mockView = {
                    handleInput: function (event) {}
                };
            spyOn(mockView, 'handleInput');
            state.handleInput(event);
            expect(mockView.handleInput).not.toHaveBeenCalled(); 
            state.view = mockView;
            state.handleInput(event);
            expect(mockView.handleInput).toHaveBeenCalledWith(event);
        });

        it('should send resize event to primary view on resize', function () {
            var event = {},
                mockView = {
                    handleResize: function (event) {}
                };
            spyOn(mockView, 'handleResize');
            state.handleResize(event);
            expect(mockView.handleResize).not.toHaveBeenCalled(); 
            state.view = mockView;
            state.handleResize(event);
            expect(mockView.handleResize).toHaveBeenCalledWith(event);
        });
    });
});