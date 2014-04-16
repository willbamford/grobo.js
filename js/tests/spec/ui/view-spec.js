define(['lib', 'ui/view'], function (lib, refView) { 

    var view;

    describe('View', function () {

        beforeEach(function () {
            view = lib.create(refView);
        });

        it('should return "this" on init', function () {
            var view2 = view.init({ canvas: null });
            expect(view2).toEqual(view);
        });

        it('should be able to initialise with the canvas and parent view', function () {
            var parent = lib.create(refView),
                canvas = {};
            view.init({
                canvas: canvas,
                parent: parent
            });
            expect(view.canvas).toEqual(canvas);
            expect(view.parent).toEqual(parent);
        });

        it('should be able to initialise with dimensions and an (x, y) coordinate', function () {
            var config = {
                canvas: {},
                parent: lib.create(refView),
                width: 400,
                height: 300,
                x: 5,
                y: 10
            };
            view.init(config);
            expect(view.width).toEqual(400);
            expect(view.height).toEqual(300);
            expect(view.x).toEqual(5);
            expect(view.y).toEqual(10);
        });

        it('should default (x, y) coordinate to (0, 0)', function () {
            var config = {
                canvas: {},
                parent: lib.create(refView),
                width: 100,
                height: 100
            };
            view.init(config);
            expect(view.x).toEqual(0);
            expect(view.y).toEqual(0);
        });

        describe('child view management', function () {

            it('should be able to chain add', function () {
                view.init({});
                view.addChild(lib.create(refView)).addChild(lib.create(refView));
                expect(view.children.length).toEqual(2);
            });

            it('should set the child\'s parent on add', function () {
                var child = lib.create(refView);
                view.init({});
                view.addChild(child);
                expect(child.parent).toEqual(view);
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
                var parentsParentView = lib.create(refView).init({
                    canvas: {},
                    parent: null,
                    x: 100,
                    y: 200
                }),
                parentView = lib.create(refView).init({
                    canvas: {},
                    parent: parentsParentView,
                    x: 300,
                    y: 400
                });
                view.init({
                    canvas: {},
                    parent: parentView,
                    x: 500,
                    y: 600
                });
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

            it('should pass events to children until consumed', function () {

                var callTrace = '',
                    child1 = { handleInput: function (event) { callTrace += '[child1]'; } },
                    child2 = { handleInput: function (event) { callTrace += '[child2]'; event.consume(); } },
                    child3 = { handleInput: function (event) { callTrace += '[child3]'; } },
                    mockEvent = {
                        isConsumed: false,
                        consume: function () {
                            this.isConsumed = true;
                        }
                    };
                view.init({});
                view.addChild(child1).addChild(child2).addChild(child3);
                view.handleInput(mockEvent);
                expect(callTrace).toEqual('[child3][child2]');
            });
        });

        describe('event binding', function () {

            it('should be able to bind multiple callbacks to the "click" event', function () {
                var hasClicked1 = false, hasClicked2 = false;
                view.init({});
                view.onClick(function (event) { hasClicked1 = true; });
                view.onClick(function (event) { hasClicked2 = true; });
                view.handleInput({ name: 'click' });
                expect(hasClicked1).toBeTruthy();
                expect(hasClicked2).toBeTruthy();
            });

            it('should be able to unbind a callback from the "click" event', function () {
                var hasClicked1 = false, hasClicked2 = false,
                    callback1 = function (event) { hasClicked1 = true; },
                    callback2 = function (event) { hasClicked2 = true; };
                view.init({});
                view.onClick(callback1);
                view.onClick(callback2);
                view.offClick(callback1);
                view.handleInput({ name: 'click' });
                expect(hasClicked1).toBeFalsy();
                expect(hasClicked2).toBeTruthy();
            });
        });
    });
});