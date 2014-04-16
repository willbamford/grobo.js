define(['lib', 'states/state'], function (lib, refState) { 

    var state;

    describe('State', function () {

        beforeEach(function () {
            state = lib.create(refState);
        });

        it('should return "this" on init', function () {
            var state2 = state.init();
            expect(state2).toEqual(state);
        });

        it('should provide default methods for "entered", "exiting", "obscured" and "revealed"', function () {
            state.init();
            expect(typeof state.entered).toEqual('function');
            expect(typeof state.exiting).toEqual('function');
            expect(typeof state.obscured).toEqual('function');
            expect(typeof state.revealed).toEqual('function');
        });

        it('should have a default modality of null', function () {
            expect(state.modality).toBeNull();
        });
    });
});