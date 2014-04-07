describe('State Manager', function () {
    
    var stateManager,
        states = {
            a: ['state A'],
            b: ['state B'],
            c: ['state C']
        };

    beforeEach(function () {
        stateManager = new icx.StateManager();
    });

    it ('should have no state initially', function () {
        expect(stateManager.isEmpty()).toBeTruthy();
    });

    it('peek should return top state', function () {
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

        it('should return null if the stack if empty', function () {
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