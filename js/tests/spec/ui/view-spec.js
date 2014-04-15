define(['ui/view'], function (refView) { 

    var view;

    describe('View', function () {

        beforeEach(function () {
            view = Object.create(refView);
        });

        it('should return "this" on init', function () {
            var view2 = view.init();
            expect(view2).toEqual(view);
        });

        it('should be able to initialise with the canvas and parent view', function () {
            var parent = Object.create(refView);
            var canvas = {};
            view.init(canvas, parent);
            expect(view.canvas).toEqual(canvas);
            expect(view.parent).toEqual(parent);
        });

        it('should be able to initialise with dimensions and an (x, y) coordinate', function () {
            view.init({}, Object.create(refView), 400, 300, 5, 10);
            expect(view.width).toEqual(400);
            expect(view.height).toEqual(300);
            expect(view.x).toEqual(5);
            expect(view.y).toEqual(10);
        });

        it('should default (x, y) coordinate to (0, 0)', function () {
            view.init({}, Object.create(refView), 100, 100);
            expect(view.x).toEqual(0);
            expect(view.y).toEqual(0);
        });

        describe('child view management', function () {

            it('should be able to chain add', function () {
                view.init();
                view.addChild(Object.create(refView)).addChild(Object.create(refView));
                expect(view.children.length).toEqual(2);
            });

            it('should set the child\'s parent on add', function () {
                var child = Object.create(refView);
                view.init();
                view.addChild(child);
                expect(child.parent).toEqual(view);
            });

            it('should be able to remove', function () {
                var child1 = Object.create(refView),
                    child2 = Object.create(refView),
                    child3 = Object.create(refView);
                view.init();
                view.addChild(child1).addChild(child2).addChild(child3);
                expect(view.children.length).toEqual(3);
                view.removeChild(child2);
                expect(view.children.length).toEqual(2);
                expect(view.children[0]).toEqual(child1);
                expect(view.children[1]).toEqual(child3);
            });

            it('should unset the child\'s parent on remove', function () {
                var child = Object.create(refView);
                view.init();
                view.addChild(child);
                view.removeChild(child);
                expect(child.parent).toBeNull();
            });
        });

        describe('world coordinates', function () {

            it('should be relative to that of own local coordinates and the parent', function () {
                var parentsParentView = Object.create(refView).init({}, null, 0, 0, 100, 200),
                    parent = Object.create(refView).init({}, parentsParentView, 0, 0, 300, 400);
                view.init({}, parent, 0, 0, 500, 600);
                expect(view.getWorldX()).toEqual(900);
                expect(view.getWorldY()).toEqual(1200);
            });

        });

        describe('draw', function () {

            it('should draw child views', function () {
                var delta = 10;
                view.init({}, null, 0, 0, 0, 0);
                spyOn(view, 'drawChildren');
                view.draw(delta);
                expect(view.drawChildren).toHaveBeenCalledWith(delta);
            });

            it('should invoke "draw" on all children when drawing all children', function () {
                var delta = 99,
                    child1 = Object.create(refView),
                    child2 = Object.create(refView),
                    child3 = Object.create(refView);
                spyOn(child1, 'draw');
                spyOn(child2, 'draw');
                spyOn(child3, 'draw');
                view.init();
                view.addChild(child1).addChild(child2).addChild(child3);
                view.draw(delta);
                expect(child1.draw).toHaveBeenCalledWith(delta);
                expect(child2.draw).toHaveBeenCalledWith(delta);
                expect(child3.draw).toHaveBeenCalledWith(delta);
            });
        });
    });
});