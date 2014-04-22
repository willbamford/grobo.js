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
                simulateEvent: function (name, event) {
                    if (this.listeners[name])
                        this.listeners[name](event);
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
                mockCanvas.simulateEvent('click', createMockSourceEvent(0, 0));
                expect(clicked).toBeTruthy();
                expect(name).toEqual('click');
            });

            it('should be able to deregister for "click" events', function () {
                var clicked = false,
                    fn = function (e) {clicked = true;};
                canvasEvents.on('click', fn);
                canvasEvents.off('click', fn);
                mockCanvas.simulateEvent('click', createMockSourceEvent(0, 0));
                expect(clicked).toBeFalsy();
            });

            it('should be able to register and deregister for "press" events', function () {
                var press = false, name = null,
                    listener = function (e) {
                        press = true;
                        name = e.name;
                    },
                    mockEvent = createMockSourceEvent(0, 0);
                canvasEvents.on('press', listener);
                mockCanvas.simulateEvent('mousedown', mockEvent);
                expect(press).toBeTruthy();
                expect(name).toEqual('press');
                press = false;
                canvasEvents.off('press', listener);
                mockCanvas.simulateEvent('mousedown', mockEvent);
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
                mockCanvas.simulateEvent('mouseup', mockEvent);
                expect(release).toBeTruthy();
                expect(name).toEqual('release');
                release = false;
                canvasEvents.off('release', listener);
                mockCanvas.simulateEvent('mouseup', mockEvent);
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
                mockCanvas.simulateEvent('mousemove', mockEvent);
                expect(move).toBeTruthy();
                expect(name).toEqual('move');
                move = false;
                canvasEvents.off('move', listener);
                mockCanvas.simulateEvent('mousemove', mockEvent);
                expect(move).toBeFalsy();
            });

            it('should use "touch" events if available and fallback to mouse events', function () {
                var press = false, name = null,
                    listener = function (e) {
                        press = true;
                        name = e.name;
                    },
                    mockEvent = createMockSourceEvent(0, 0);
                canvasEvents.isTouchSupported = function () { return true; }
                canvasEvents.on('press', listener);
                mockCanvas.simulateEvent('touchstart', mockEvent);
                expect(press).toBeTruthy();
                expect(name).toEqual('press');
                press = false;
                canvasEvents.off('press', listener);
                mockCanvas.simulateEvent('touchstart', mockEvent);
                expect(press).toBeFalsy();
            });
        });
    });
});