define(['grobo/lib', 'grobo/canvas/events'], function (lib, refCanvasEvents) { 

    describe('Canvas events', function () {
        
        var canvasEvents,
            mockCanvas;

        function createMockSourceEvent(x, y) {
            return {
                offsetX: x,
                offsetY: y,
                preventDefault: function () {}
            };
        }

        beforeEach(function () {
            mockCanvas = {
                listeners: [],
                simulateClickEvent: function (event) {
                    if (this.listeners.click)
                        this.listeners.click(event);
                },
                simulateMouseDownEvent: function (event) {
                    if (this.listeners.mousedown)
                        this.listeners.mousedown(event);
                },
                simulateMouseUpEvent: function (event) {
                    if (this.listeners.mouseup)
                        this.listeners.mouseup(event);
                },
                simulateMouseMoveEvent: function (event) {
                    if (this.listeners.mousemove)
                        this.listeners.mousemove(event);
                },
                getElement: function () {
                    var self = this;
                    return {
                        addEventListener: function (eventName, fn) {
                            self.listeners[eventName] = fn;
                        },
                        removeEventListener: function (eventName, fn, flag) {
                            self.listeners[eventName] = null;
                        }
                    };
                },
                getCoordsForEvent: function (event) {
                    return { x: event.offsetX, y: event.offsetY };
                }
            };
            canvasEvents = lib.create(refCanvasEvents).init(mockCanvas);
        });

        it('should return "this" on init', function () {
            expect(typeof lib.create(refCanvasEvents).init(mockCanvas)).toEqual('object');
        });

        describe('wildcard event handling', function () {

            it('should be able to register for all events', function () {
                var fn = function (e) {};
                spyOn(canvasEvents, 'on');
                canvasEvents.onInput(fn);
                expect(canvasEvents.on).toHaveBeenCalledWith('click', fn);
                expect(canvasEvents.on).toHaveBeenCalledWith('press', fn);
                expect(canvasEvents.on).toHaveBeenCalledWith('release', fn);
                expect(canvasEvents.on).toHaveBeenCalledWith('move', fn);
            });

            it('should be able to deregister all events', function () {
                var fn = function (e) {};
                spyOn(canvasEvents, 'off');
                canvasEvents.offInput(fn);
                expect(canvasEvents.off).toHaveBeenCalledWith('click', fn);
                expect(canvasEvents.off).toHaveBeenCalledWith('press', fn);
                expect(canvasEvents.off).toHaveBeenCalledWith('release', fn);
                expect(canvasEvents.off).toHaveBeenCalledWith('move', fn);
            });
        });

        describe('on', function () {

            it('should be able to register for "click" events', function () {
                var clicked = false,
                    name = null;
                canvasEvents.on('click', function (e) {
                    clicked = true;
                    name = e.name;
                });
                mockCanvas.simulateClickEvent(createMockSourceEvent(0, 0));
                expect(clicked).toBeTruthy();
                expect(name).toEqual('click');
            });

            it('should be able to deregister for "click" events', function () {
                var clicked = false,
                    fn = function (e) {clicked = true;};
                canvasEvents.on('click', fn);
                canvasEvents.off('click', fn);
                mockCanvas.simulateClickEvent(createMockSourceEvent(0, 0));
                expect(clicked).toBeFalsy();
            });

            it('should prevent default on the triggering "click" event', function () {
                var event = createMockSourceEvent(0, 0);
                spyOn(event, 'preventDefault');
                canvasEvents.on('click', function (e) {});
                mockCanvas.simulateClickEvent(event);
                expect(event.preventDefault).toHaveBeenCalled();
            });

            it('should be able to register and deregister for "press" events', function () {
                var press = false, name = null,
                    listener = function (e) {
                        press = true;
                        name = e.name;
                    },
                    mockEvent = createMockSourceEvent(0, 0);
                canvasEvents.on('press', listener);
                mockCanvas.simulateMouseDownEvent(mockEvent);
                expect(press).toBeTruthy();
                expect(name).toEqual('press');
                press = false;
                canvasEvents.off('press', listener);
                mockCanvas.simulateMouseDownEvent(mockEvent);
                expect(press).toBeFalsy();
            });

            it('should be able to register and deregister for "release" events', function () {
                var release = false, name = null,
                    listener = function (e) {
                        release = true;
                        name = e.name;
                    },
                    mockEvent = createMockSourceEvent(0, 0);
                canvasEvents.on('release', listener);
                mockCanvas.simulateMouseUpEvent(mockEvent);
                expect(release).toBeTruthy();
                expect(name).toEqual('release');
                release = false;
                canvasEvents.off('release', listener);
                mockCanvas.simulateMouseDownEvent(mockEvent);
                expect(release).toBeFalsy();
            });

            it('should be able to register and deregister for "move" events', function () {
                var move = false, name = null,
                    listener = function (e) {
                        move = true;
                        name = e.name;
                    },
                    mockEvent = createMockSourceEvent(0, 0);
                canvasEvents.on('move', listener);
                mockCanvas.simulateMouseMoveEvent(mockEvent);
                expect(move).toBeTruthy();
                expect(name).toEqual('move');
                move = false;
                canvasEvents.off('move', listener);
                mockCanvas.simulateMouseMoveEvent(mockEvent);
                expect(move).toBeFalsy();
            });
        });
    });
});