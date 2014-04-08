describe('State manager', function () {
    
    var stateManager,
        states = {
            a: createStubPopupState(),
            b: createStubPopupState(),
            c: createStubPopupState()
        };

    function createStubPopupState() {
        return createStubState(icx.StateManager.modality.POPUP);
    };

    function createStubExclusiveState() {
        return createStubState(icx.StateManager.modality.EXCLUSIVE);
    };

    function createStubState(modality) {
        return {
            modality: modality,
            entered: function () {},
            exiting: function () {},
            obscured: function () {},
            revealed: function () {}
        };
    };

    beforeEach(function () {
        stateManager = new icx.StateManager();
    });

    it ('should contain no active states initially', function () {
        expect(stateManager.isEmpty()).toBeTruthy();
    });

    it('should return top state on peek', function () {
        expect(stateManager.peek()).toBeNull();
        stateManager.push(states.a);
        expect(stateManager.peek()).toEqual(states.a);
        stateManager.push(states.b);
        expect(stateManager.peek()).toEqual(states.b);
    });

    describe('push', function () {

        beforeEach(function () {
            stateManager.push(states.a);
        });

        it('should invoke "entered" on pushed state', function () {
            var state = createStubPopupState();
            spyOn(state, 'entered');
            stateManager.push(state);
            expect(state.entered).toHaveBeenCalled();
        });

        it('should invoke "obscured" on hidden states', function () {

            /*
             *    Pushing X [EXCLUSIVE] onto...
             * 
             *    | D [POPUP]     | obscure
             *    | C [POPUP]     | obscure
             *    | B [EXCLUSIVE] | obscure
             *    | A [POPUP]     | already obscured by above
             *    -----------------
             */

            var stateA = createStubPopupState(),
                stateB = createStubExclusiveState(),
                stateC = createStubPopupState(),
                stateD = createStubPopupState(),
                stateX = createStubExclusiveState();

            stateManager.push(stateA).push(stateB).push(stateC).push(stateD);

            spyOn(stateA, 'obscured');
            spyOn(stateB, 'obscured');
            spyOn(stateC, 'obscured');
            spyOn(stateD, 'obscured');

            stateManager.push(stateX);
            expect(stateA.obscured).not.toHaveBeenCalled();
            expect(stateB.obscured).toHaveBeenCalled();
            expect(stateC.obscured).toHaveBeenCalled();
            expect(stateD.obscured).toHaveBeenCalled();
        });

        it('should increase stack size', function () {
            stateManager.push(states.a);
            expect(stateManager.size()).toEqual(1);
            expect(stateManager.peek()).toEqual(states.a);
        });

        it('should silently fail if already exists in stack', function () {
            stateManager.push(states.a).push(states.b).push(states.a);
            expect(stateManager.size()).toEqual(2);
        });

        it('should be cumulative', function () {
            stateManager.push(states.a);
            stateManager.push(states.b);
            expect(stateManager.size()).toEqual(2);
            expect(stateManager.peek()).toEqual(states.b);
        });

        it('should be chainable', function () {
            stateManager.push(states.a).push(states.b);
            expect(stateManager.peek()).toEqual(states.b);
        });
    });

    describe('pop', function () {

        it('should return null if the stack is empty', function () {
            expect(stateManager.pop()).toBeNull();
        });

        it ('should return top item and decrease stack size', function () {
            stateManager.push(states.a).push(states.b);
            expect(stateManager.pop()).toEqual(states.b);
            expect(stateManager.peek()).toEqual(states.a);
            expect(stateManager.pop()).toEqual(states.a);
            expect(stateManager.peek()).toBeNull();
            expect(stateManager.isEmpty()).toBeTruthy();
        });

        it('should invoke "exiting" on popped state', function () {
            var state = createStubExclusiveState();
            stateManager.push(state);
            spyOn(state, 'exiting');
            stateManager.pop(state);
            expect(state.exiting).toHaveBeenCalled();
        });

        it('should invoke "revealed" on unhidden states', function () {

            /*
             *    | D [EXCLUSIVE] | Pop
             *    | C [POPUP]     | revealed
             *    | B [EXCLUSIVE] | revealed
             *    | A [POPUP]     | not revealed, obscured by above
             *    -----------------
             */

            var stateA = createStubPopupState(),
                stateB = createStubExclusiveState(),
                stateC = createStubPopupState(),
                stateD = createStubExclusiveState();

            stateManager.push(stateA).push(stateB).push(stateC).push(stateD);

            spyOn(stateA, 'revealed'); // Not
            spyOn(stateB, 'revealed');
            spyOn(stateC, 'revealed');
            spyOn(stateD, 'revealed'); // Not

            stateManager.pop();
            expect(stateA.revealed).not.toHaveBeenCalled();
            expect(stateB.revealed).toHaveBeenCalled();
            expect(stateC.revealed).toHaveBeenCalled();
            expect(stateD.revealed).not.toHaveBeenCalled();
        });

        it('should not invoke "revealed" if popped state is a popup', function () {

            /*
             *    | B [POPUP]     | Pop
             *    | A [EXCLUSIVE] | already revealed
             *    -----------------
             */

            var stateA = createStubExclusiveState(),
                stateB = createStubPopupState();

            stateManager.push(stateA).push(stateB);

            spyOn(stateA, 'revealed'); // Not

            stateManager.pop();
            expect(stateA.revealed).not.toHaveBeenCalled();
        });
    });

    describe('change', function () {

        it('should result in new state being pushed', function () {
            stateManager.change(states.a);
            expect(stateManager.peek()).toEqual(states.a);
        });

        it('should pop top state and replace with new state', function () {
            stateManager.push(states.a).push(states.b);
            stateManager.change(states.c);
            expect(stateManager.size()).toEqual(2);
            expect(stateManager.peek()).toEqual(states.c);
        });
    });
});