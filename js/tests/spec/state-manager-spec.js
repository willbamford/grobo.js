define(['state-manager', 'state-modality'], function (refStateManager, stateModality) { 

    describe('State manager', function () {
        
        var stateManager,
            states = {
                a: createStubPopupState(),
                b: createStubPopupState(),
                c: createStubPopupState()
            };

        function createStubPopupState() {
            return createStubState(stateModality.POPUP);
        };

        function createStubExclusiveState() {
            return createStubState(stateModality.EXCLUSIVE);
        };

        function createStubState(modality) {
            return {
                modality: modality,
                entered: function () {},
                exiting: function () {},
                obscured: function () {},
                revealed: function () {},
                update: function () {},
                draw: function () {},
                onInput: function (event) {}
            };
        };

        function createConsumableEvent() {
            return {
                _isConsumed: false,
                isConsumed: function () { return this._isConsumed; },
                consume: function () {
                    this._isConsumed = true;
                }
            };
        };

        beforeEach(function () {
            var input = {
                onEvent: function () {}
            };
            stateManager = Object.create(refStateManager).init(input);
        });

        it('should return "this" on init', function () {
            expect(typeof Object.create(refStateManager)).toEqual('object');
        });

        it('should contain no active states initially', function () {
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

        describe('tick', function () {

            beforeEach(function () {

                /*
                 *    | D [POPUP]     | update and draw third
                 *    | C [POPUP]     | update and draw second
                 *    | B [EXCLUSIVE] | update and draw first
                 *    | A [POPUP]     |
                 *    -----------------
                 */

                var self = this,
                    stateA = createStubPopupState(),
                    stateB = createStubExclusiveState(),
                    stateC = createStubPopupState(),
                    stateD = createStubPopupState();

                this.callTrace = '';

                stateA.update = function (delta) { self.callTrace += '[U-A:' + delta + ']'; };
                stateB.update = function (delta) { self.callTrace += '[U-B:' + delta + ']'; };
                stateC.update = function (delta) { self.callTrace += '[U-C:' + delta + ']'; };
                stateD.update = function (delta) { self.callTrace += '[U-D:' + delta + ']'; };

                stateA.draw = function (delta) { self.callTrace += '[D-A:' + delta + ']'; };
                stateB.draw = function (delta) { self.callTrace += '[D-B:' + delta + ']'; };
                stateC.draw = function (delta) { self.callTrace += '[D-C:' + delta + ']'; };
                stateD.draw = function (delta) { self.callTrace += '[D-D:' + delta + ']'; };

                stateManager.push(stateA).push(stateB).push(stateC).push(stateD);
            });

            it('should call update and draw on states in order', function () {
                var delta = 5;
                stateManager.tick(delta);
                expect(this.callTrace).toEqual('[U-B:5][U-C:5][U-D:5][D-B:5][D-C:5][D-D:5]');
            });
        });

        describe('input', function () {

            var stateA, stateB, stateC, stateD;

            beforeEach(function () {
                
                /*
                 *    | D [POPUP]     | update and draw third
                 *    | C [POPUP]     | update and draw second
                 *    | B [EXCLUSIVE] | update and draw first
                 *    | A [POPUP]     |
                 *    -----------------
                 */
                var self = this;
                stateA = createStubPopupState();
                stateB = createStubExclusiveState();
                stateC = createStubPopupState();
                stateD = createStubPopupState();
                this.callTrace = '';
                stateManager.push(stateA).push(stateB).push(stateC).push(stateD);
                stateA.onInput = function (event) { self.callTrace += '[I-A]'; };
                stateB.onInput = function (event) { self.callTrace += '[I-B]'; };
                stateC.onInput = function (event) { self.callTrace += '[I-C]'; };
                stateD.onInput = function (event) { self.callTrace += '[I-D]'; };
            });

            it('should register for all events', function () {
                var input = {
                        onEvent: function (fn) {}
                    };
                spyOn(input, 'onEvent');
                stateManager = Object.create(refStateManager).init(input);
                expect(input.onEvent, stateManager.onInput).toHaveBeenCalled();
            });

            it('should pass input events through the stack until exclusive state', function () {             
                stateManager.onInput(createConsumableEvent());
                expect(this.callTrace).toEqual('[I-D][I-C][I-B]');
            });

            it('should pass input events through the stack until consumed', function () {
                stateC.onInput = function (event) { event.consume(); };            
                stateManager.onInput(createConsumableEvent());
                expect(this.callTrace).toEqual('[I-D]');
            });
        });
    });
});