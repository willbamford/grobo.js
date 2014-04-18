define(['lib', 'input'], function (lib, refInput) { 

    describe('Input', function () {
        
        var input,
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
                getCoords: function (event) {
                    return { x: event.offsetX, y: event.offsetY };
                }
            };
            input = lib.create(refInput).init(mockCanvas);
        });

        it('should return "this" on init', function () {
            expect(typeof lib.create(refInput).init(mockCanvas)).toEqual('object');
        });

        describe('wildcard event handling', function () {

            it('should be able to register for all events', function () {
                var fn = function (e) {};
                spyOn(input, 'on');
                input.onEvent(fn);
                expect(input.on).toHaveBeenCalledWith('click', fn);
                expect(input.on).toHaveBeenCalledWith('press', fn);
                expect(input.on).toHaveBeenCalledWith('release', fn);
                expect(input.on).toHaveBeenCalledWith('move', fn);
            });

            it('should be able to deregister all events', function () {
                var fn = function (e) {};
                spyOn(input, 'off');
                input.offEvent(fn);
                expect(input.off).toHaveBeenCalledWith('click', fn);
                expect(input.off).toHaveBeenCalledWith('press', fn);
                expect(input.off).toHaveBeenCalledWith('release', fn);
                expect(input.off).toHaveBeenCalledWith('move', fn);
            });
        });

        describe('event handling', function () {

            it('should be able to register for "click" events', function () {
                var clicked = false,
                    name = null;
                input.on('click', function (e) {
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
                input.on('click', fn);
                input.off('click', fn);
                mockCanvas.simulateClickEvent(createMockSourceEvent(0, 0));
                expect(clicked).toBeFalsy();
            });

            it('should prevent default on the triggering event', function () {
                var event = createMockSourceEvent(0, 0);
                spyOn(event, 'preventDefault');
                input.on('click', function (e) {});
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
                input.on('press', listener);
                mockCanvas.simulateMouseDownEvent(mockEvent);
                expect(press).toBeTruthy();
                expect(name).toEqual('press');
                press = false;
                input.off('press', listener);
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
                input.on('release', listener);
                mockCanvas.simulateMouseUpEvent(mockEvent);
                expect(release).toBeTruthy();
                expect(name).toEqual('release');
                release = false;
                input.off('release', listener);
                mockCanvas.simulateMouseDownEvent(mockEvent);
                expect(release).toBeFalsy();
            });
        });
    });
});