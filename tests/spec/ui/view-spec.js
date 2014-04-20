define(['grobo/lib', 'grobo/ui/view'], function (lib, refView) { 

    function createMockEvent(x, y, name) {
        return {
            name: (name || 'click'),
            x: (x || 0),
            y: (y || 0),
            isConsumed: false,
            consume: function () {
                this.isConsumed = true;
            }
        };
    }

    var view;

    describe('View', function () {

        beforeEach(function () {
            view = lib.create(refView);
        });

        describe('layout', function () {

            var mockCanvas;

            beforeEach(function () {
                mockCanvas = { width: 100, height: 50 };
            });

            it('should default to 100% width and height', function () {
                view.init({
                    canvas: mockCanvas,
                    style: { width: 100, height: 50 }
                });
                var child = lib.create(refView);
                child.init({
                    style: {}
                });
                view.addChild(child);
                expect(child.width).toEqual(100);
                expect(child.height).toEqual(50);
            });

            it('should center the view within parent if only size (width / height) set', function () {
                view.init({
                    canvas: mockCanvas,
                    style: { width: 100, height: 50 }
                });
                var child = lib.create(refView);
                child.init({
                    style: {
                        width: 10,
                        height: '50%'
                    }
                });
                view.addChild(child);
                expect(child.width).toEqual(10);
                expect(child.height).toEqual(25);
                expect(child.x).toEqual(45);
                expect(child.y).toEqual(13);
            });

            it('should map left and top directly to x and y', function () {
                view.init({
                    canvas: mockCanvas,
                    style: { width: 100, height: 50 }
                });
                var child = lib.create(refView);
                child.init({
                    style: { 
                        left: 10,
                        top: 20
                    }
                });
                view.addChild(child);
                expect(child.x).toEqual(10);
                expect(child.y).toEqual(20);
            });

            xit('should layout child when added to a new parent', function () {});
        });

        it('should return "this" on init', function () {
            var view2 = view.init({});
            expect(view2).toEqual(view);
        });

        it('should be able to initialise with the canvas', function () {
            var parent = lib.create(refView),
                canvas = {};
            view.init({
                canvas: canvas
            });
            expect(view.canvas).toEqual(canvas);
        });

        describe('child view management', function () {

            it('should be able to chain add', function () {
                view.init({});
                view.addChild(lib.create(refView)).addChild(lib.create(refView));
                expect(view.children.length).toEqual(2);
            });

            it('should set the child\'s parent and canvas on add', function () {
                var child = lib.create(refView),
                    mockCanvas = { width: 10, height: 10 };
                view.init({ canvas: mockCanvas });
                view.addChild(child);
                expect(child.parent).toEqual(view);
                expect(child.canvas).toEqual(mockCanvas);
            });

            it('should be able to remove', function () {
                var child1 = lib.create(refView),
                    child2 = lib.create(refView),
                    child3 = lib.create(refView);
                view.init({});
                view.addChild(child1).addChild(child2).addChild(child3);
                expect(view.children.length).toEqual(3);
                view.removeChild(child2);
                expect(view.children.length).toEqual(2);
                expect(view.children[0]).toEqual(child1);
                expect(view.children[1]).toEqual(child3);
            });

            it('should unset the child\'s parent on remove', function () {
                var child = lib.create(refView);
                view.init({});
                view.addChild(child);
                view.removeChild(child);
                expect(child.parent).toBeNull();
            });
        });

        describe('world coordinates', function () {

            it('should be relative to that of own local coordinates and the parent', function () {
                var mockCanvas = { width: 400, height: 300 },
                    grandparentView,
                    parentView;

                grandparentView = lib.create(refView).init({
                    canvas: mockCanvas,
                    style: {
                        left: 100,
                        top: 200
                    }
                });

                parentView = lib.create(refView).init({
                    style: {
                        left: 300,
                        top: 400
                    }
                });

                view.init({
                    style: {
                        left: 500,
                        top: 600
                    }
                });

                parentView.addChild(view);
                grandparentView.addChild(parentView);

                expect(view.getWorldX()).toEqual(900);
                expect(view.getWorldY()).toEqual(1200);
            });

        });

        describe('draw', function () {

            it('should draw child views', function () {
                view.init({ canvas: null });
                spyOn(view, 'drawChildren');
                view.draw();
                expect(view.drawChildren).toHaveBeenCalled();
            });

            it('should invoke "draw" on all children when drawing all children', function () {
                var child1 = lib.create(refView),
                    child2 = lib.create(refView),
                    child3 = lib.create(refView);
                spyOn(child1, 'draw');
                spyOn(child2, 'draw');
                spyOn(child3, 'draw');
                view.init({});
                view.addChild(child1).addChild(child2).addChild(child3);
                view.draw();
                expect(child1.draw).toHaveBeenCalled();
                expect(child2.draw).toHaveBeenCalled();
                expect(child3.draw).toHaveBeenCalled();
            });
        });

        describe('input', function () {

            describe('child event handling', function () {

                var child1, child2, child3;

                beforeEach(function () {
                    callTrace = '';
                    child1 = lib.create(refView, { handleInput: function (event) { callTrace += '[child1]'; } } );
                    child2 = lib.create(refView, { handleInput: function (event) { callTrace += '[child2]'; event.consume() } } );
                    child3 = lib.create(refView, { handleInput: function (event) { callTrace += '[child3]'; } } );
                    view.init({});
                    view.addChild(child1).addChild(child2).addChild(child3);
                });

                it('should pass "click" events to children until consumed', function () {
                    var mockEvent = createMockEvent(0, 0, 'click');
                    view.handleClick(mockEvent);
                    expect(callTrace).toEqual('[child3][child2]');
                });

                it('should pass "press" events to children until consumed', function () {
                    var mockEvent = createMockEvent(0, 0, 'press');
                    view.handlePress(mockEvent);
                    expect(callTrace).toEqual('[child3][child2]');
                });

                it('should pass "release" events to children until consumed', function () {
                    var mockEvent = createMockEvent(0, 0, 'release');
                    view.handleRelease(mockEvent);
                    expect(callTrace).toEqual('[child3][child2]');
                });

            });

            describe('should dispatch unconsumed events to listeners', function () {

                var callTrace;

                beforeEach(function () {
                    callTrace = '';
                    view.init({
                        style: {
                            left: 10, top: 10,
                            width: 100, height: 100
                        }
                    });
                });

                it('bound to "click" and event is inside the view', function () {

                    var mockEvent = createMockEvent(11, 11, 'click');
                    view.on('click', function (event) {
                        callTrace += '[click1]';
                    });
                    view.on('click', function (event) {
                        callTrace += '[click2]';
                    });
                    view.handleClick(mockEvent);
                    expect(callTrace).toEqual('[click1][click2]');
                });

                it('bound to "press" and event is inside the view', function () {

                    var mockEvent = createMockEvent(11, 11, 'press');
                    view.on('press', function (event) {
                        callTrace += '[press1]';
                    });
                    view.on('press', function (event) {
                        callTrace += '[press2]';
                    });
                    view.handlePress(mockEvent);
                    expect(callTrace).toEqual('[press1][press2]');
                });

                it('bound to "release" and event is inside the view', function () {

                    var mockEvent = createMockEvent(11, 11, 'release');
                    view.on('release', function (event) {
                        callTrace += '[release1]';
                    });
                    view.on('release', function (event) {
                        callTrace += '[release2]';
                    });
                    view.handlePress(mockEvent);
                    expect(callTrace).toEqual('[release1][release2]');
                });
            });

            describe('derived boundary events', function () {

                it('should generate "over" event when pointer moves from outside to inside', function () {

                    var moveFromEvent = createMockEvent(21, 21, 'move'),
                        moveToEvent = createMockEvent(20, 20, 'move');
                    view.init({
                        style: {
                            left: 10, top: 10,
                            width: 10, height: 10
                        }
                    });
                    spyOn(view, 'handleOver');
                    view.handleMove(moveFromEvent);
                    expect(view.handleOver).not.toHaveBeenCalledWith(moveToEvent);
                    view.handleMove(moveToEvent);
                    expect(view.handleOver).toHaveBeenCalledWith(moveToEvent);
                });

                it('should generate "out" event when pointer moves from inside to outside', function () {
                    var moveFromEvent = createMockEvent(10, 10, 'move'),
                        moveToEvent = createMockEvent(9, 9, 'move');
                    view.init({
                        style: {
                            left: 10, top: 10,
                            width: 10, height: 10
                        }
                    });
                    spyOn(view, 'handleOut');
                    view.handleMove(moveFromEvent);
                    expect(view.handleOut).not.toHaveBeenCalledWith(moveToEvent);
                    view.handleMove(moveToEvent);
                    expect(view.handleOut).toHaveBeenCalledWith(moveToEvent);
                });
            });

            it('should provide a single method for handling events (which in turn delegates to specific event handlers)', function () {

                var mockClickEvent = createMockEvent(0, 0, 'click'),
                    mockPress = createMockEvent(0, 0, 'press'),
                    mockRelease = createMockEvent(0, 0, 'release'),
                    mockMove = createMockEvent(0, 0, 'move');
                view.init({});
                spyOn(view, 'handleClick');
                spyOn(view, 'handlePress');
                spyOn(view, 'handleRelease');
                spyOn(view, 'handleMove');
                view.handleInput(mockClickEvent);
                view.handleInput(mockPress);
                view.handleInput(mockRelease);
                view.handleInput(mockMove);
                expect(view.handleClick).toHaveBeenCalledWith(mockClickEvent);
                expect(view.handlePress).toHaveBeenCalledWith(mockPress);
                expect(view.handleRelease).toHaveBeenCalledWith(mockRelease);
                expect(view.handleMove).toHaveBeenCalledWith(mockMove);
            });
        });

        describe('event binding', function () {

            it('should be able to bind and unbind listeners to events', function () {
                var hasClicked1 = false, hasClicked2 = false, hasClicked3 = false,
                    callback1 = function (event) { hasClicked1 = true; },
                    callback2 = function (event) { hasClicked2 = true; },
                    callback3 = function (event) { hasClicked3 = true; },
                    clickX = 150, clickY = 150,
                    mockEvent = createMockEvent(clickX, clickY);
                view.init({
                    style: {
                        left: 100, top: 100,
                        width: 100, height: 100
                    }
                });
                view.on('click', callback1);
                view.on('click', callback2);
                view.on('click', callback3);
                view.off('click', callback2);
                view.handleClick(mockEvent);
                expect(hasClicked1).toBeTruthy();
                expect(hasClicked2).toBeFalsy();
                expect(hasClicked3).toBeTruthy();
            });

        });
    });
});