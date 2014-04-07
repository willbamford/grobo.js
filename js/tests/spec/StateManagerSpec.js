describe('State Manager', function () {
    
    var stateManager;

    beforeEach(function () {
        stateManager = new icx.StateManager();
    });

    it('should be able to create new instance', function () {
        stateManager = new icx.StateManager();
        expect(stateManager).not.toBe(null);
    });
});