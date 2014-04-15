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
            var parentView = Object.create(refView);
            var canvas = {};
            view.init(canvas, parentView);
            expect(view.canvas).toEqual(canvas);
            expect(view.parentView).toEqual(parentView);
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

        it('should be able to chain add child views', function () {
            view.init();
            view.addChildView(Object.create(refView)).addChildView(Object.create(refView));
            expect(view.childViews.length).toEqual(2);
        });

        it('should be able to remove child views', function () {
            var child1 = Object.create(refView),
                child2 = Object.create(refView),
                child3 = Object.create(refView);
            view.init();
            view.addChildView(child1).addChildView(child2).addChildView(child3);
            expect(view.childViews.length).toEqual(3);
            view.removeChildView(child2);
            expect(view.childViews.length).toEqual(2);
            expect(view.childViews[0]).toEqual(child1);
            expect(view.childViews[1]).toEqual(child3);
        });

        it('should return world coordinates relative to that of own local coordinates and the parent', function () {
            var parentsParentView = Object.create(refView).init({}, null, 0, 0, 100, 200),
                parentView = Object.create(refView).init({}, parentsParentView, 0, 0, 300, 400);
            view.init({}, parentView, 0, 0, 500, 600);
            expect(view.getWorldX()).toEqual(900);
            expect(view.getWorldY()).toEqual(1200);
        });
    });
});