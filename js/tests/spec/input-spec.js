define(['lib', 'input'], function (lib, refInput) { 

    describe('Input', function () {
        
        var input,
            mockCanvas;

        function createMockSourceEvent(clientX, clientY, offsetLeft, offsetTop) {
            return {
                clientX: clientX,
                clientY: clientY,
                target: {
                    offsetLeft: offsetLeft,
                    offsetTop: offsetTop
                },
                preventDefault: function () {}
            };
        }

        beforeEach(function () {
            mockCanvas = {
                listeners: [],
                simulateClick: function (event) {
                    if (this.listeners['click']) this.listeners['click'](event);
                },
                simulateMouseDown: function (event) {
                    if (this.listeners['mousedown']) this.listeners['mousedown'](event);
                },
                simulateMouseUp: function (event) {
                    if (this.listeners['mouseup']) this.listeners['mouseup'](event);
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
                    }
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
                expect(input.on).toHaveBeenCalledWith('touchdown', fn);
                expect(input.on).toHaveBeenCalledWith('touchup', fn);
            });

            it('should be able to deregister all events', function () {
                var fn = function (e) {};
                spyOn(input, 'off');
                input.offEvent(fn);
                expect(input.off).toHaveBeenCalledWith('click', fn);
                expect(input.off).toHaveBeenCalledWith('touchdown', fn);
                expect(input.off).toHaveBeenCalledWith('touchup', fn);
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
                mockCanvas.simulateClick(createMockSourceEvent(0, 0, 0, 0));
                expect(clicked).toBeTruthy();
                expect(name).toEqual('click');
            });

            it('should be able to deregister for "click" events', function () {
                var clicked = false,
                    fn = function (e) {clicked = true;};
                input.on('click', fn);
                input.off('click', fn);
                mockCanvas.simulateClick(createMockSourceEvent(0, 0, 0, 0));
                expect(clicked).toBeFalsy();
            });

            it('should prevent default on the triggering event', function () {
                var event = createMockSourceEvent(0, 0, 0, 0);
                spyOn(event, 'preventDefault');
                input.on('click', function (e) {});
                mockCanvas.simulateClick(event);
                expect(event.preventDefault).toHaveBeenCalled();
            });

            it('should return event with coordinates relative to canvas', function () {
                var event;
                input.on('click', function (e) {
                    event = e;
                });
                mockCanvas.simulateClick(createMockSourceEvent(100, 90, 50, 60));
                expect(event.x).toEqual(100 - 50);
                expect(event.y).toEqual(90 - 60);
            });

            it('should be able to register and deregister for "touchdown" events', function () {
                var touchDown = false, name = null,
                    listener = function (e) {
                        touchDown = true;
                        name = e.name;
                    },
                    mockEvent = createMockSourceEvent(0, 0, 0, 0);
                input.on('touchdown', listener);
                mockCanvas.simulateMouseDown(mockEvent);
                expect(touchDown).toBeTruthy();
                expect(name).toEqual('touchdown');
                touchDown = false;
                input.off('touchdown', listener);
                mockCanvas.simulateMouseDown(mockEvent);
                expect(touchDown).toBeFalsy();
            });

            it('should be able to register and deregister for "touchup" events', function () {
                var touchUp = false, name = null,
                    listener = function (e) {
                        touchUp = true;
                        name = e.name;
                    },
                    mockEvent = createMockSourceEvent(0, 0, 0, 0);
                input.on('touchup', listener);
                mockCanvas.simulateMouseUp(mockEvent);
                expect(touchUp).toBeTruthy();
                expect(name).toEqual('touchup');
                touchUp = false;
                input.off('touchup', listener);
                mockCanvas.simulateMouseDown(mockEvent);
                expect(touchUp).toBeFalsy();
            });
        });
    });
});