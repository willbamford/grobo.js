define(['grobo/lib', 'grobo/canvas'], function (lib, refCanvas) {

    "use strict";

    describe('Canvas', function () {

        var canvas,
            mockElement,
            mockWindow;

        beforeEach(function () {
            canvas = lib.create(refCanvas);
            mockElement = {
                width: 400,
                height: 300,
                _listeners: {},
                getContext: function (type) {
                    return (type === '2d') ? {} : null;
                },
                simulateEvent: function (name, event) {
                    if (this._listeners[name])
                        this._listeners[name](event);
                },
                addEventListener: function (eventName, fn) {
                    this._listeners[eventName] = fn;
                },
                removeEventListener: function (eventName, fn, flag) {
                    this._listeners[eventName] = null;
                },
                getBoundingClientRect: function () {
                    return {
                        left: 50,
                        top: 80,
                        right: 100,
                        bottom: 200
                    };
                }
            };
            mockWindow = {
                _listener: null,
                simulateResize: function () {
                    if (this._listener) this._listener({});
                },
                addEventListener: function (name, fn) {
                    if (name === 'resize')
                        this._listener = fn;
                },
                removeEventListener: function (name, fn, flag) {
                    if (name === 'resize')
                        this._listener = null;
                }
            };
        });

        it('should be able to access canvas context and element after initialisation', function () {
            var c = canvas.init(mockElement, mockWindow);
            expect(c.getElement()).toEqual(mockElement);
            expect(c.getContext()).toEqual(mockElement.getContext('2d'));
        });

        describe('resize', function () {

            it('should be able to resize the canvas', function () {
                canvas.init(mockElement, mockWindow);
                expect(canvas.width).toEqual(400);
                expect(canvas.height).toEqual(300);
                expect(mockElement.width).toEqual(400);
                expect(mockElement.height).toEqual(300);
                canvas.resize(640, 480);
                expect(canvas.width).toEqual(640);
                expect(canvas.height).toEqual(480);
                expect(mockElement.width).toEqual(640);
                expect(mockElement.height).toEqual(480);
            });

            it('should trigger resize event on listeners', function () {
                var event = null,
                    listener = function (e) {
                        event = e;
                    };
                canvas.init(mockElement, mockWindow);
                canvas.onResize(listener);
                canvas.resize(1, 1);
                expect(event.name).toEqual('resize');
                expect(event.origin).toEqual(canvas);
                event = null;
                canvas.offResize(listener);
                canvas.resize(2, 2);
                expect(event).toBeNull();
            });

            it('should not trigger resize event if dimensions do not change', function () {
                var event = null;
                canvas.init(mockElement, mockWindow);
                canvas.onResize(function (e) {
                    event = e;
                });
                canvas.resize(400, 300);
                expect(event).toBeNull();
            });
        });

        describe('get coordinates for event', function () {

            beforeEach(function () {
                canvas.init(mockElement, mockWindow);
            });

            it('should be able to obtain for "click", "mousedown", "mousemove" and "mouseup"', function () {
                var coords;
                coords = canvas.getCoordsForEvent({type: 'click', clientX: 80, clientY: 90});
                expect(coords).toEqual({x: 30, y: 10});
                coords = canvas.getCoordsForEvent({type: 'mousedown', clientX: 81, clientY: 91});
                expect(coords).toEqual({x: 31, y: 11});
                coords = canvas.getCoordsForEvent({type: 'mousemove', clientX: 82, clientY: 92});
                expect(coords).toEqual({x: 32, y: 12});
                coords = canvas.getCoordsForEvent({type: 'mouseup', clientX: 83, clientY: 93});
                expect(coords).toEqual({x: 33, y: 13});
            });

            it('should be able to obtain for "touchstart"', function () {
                var touches, coords;
                touches = [{
                    clientX: 54,
                    clientY: 88
                }],
                coords = canvas.getCoordsForEvent({
                    type: 'touchstart',
                    touches: touches
                });
                expect(coords.x).toEqual(4);
                expect(coords.y).toEqual(8);

                coords = canvas.getCoordsForEvent({
                    type: 'touchmove',
                    touches: touches
                });
                expect(coords.x).toEqual(4);
                expect(coords.y).toEqual(8);
            });

            it('should be able to obtain for "touchend"', function () {
                var coords = canvas.getCoordsForEvent({
                    type: 'touchend',
                    changedTouches: [{
                        clientX: 54,
                        clientY: 88
                    }],
                    touches: []
                });
                expect(coords.x).toEqual(4);
                expect(coords.y).toEqual(8);
            });
        });

        describe('event handling', function () {

            function createMockSourceEvent(x, y) {
                return {
                    offsetX: x,
                    offsetY: y,
                    preventDefault: function () {}
                };
            }

            beforeEach(function () {
                canvas.init(mockElement, mockWindow);
            });

            describe('wildcard', function () {

                it('should be able to bind to all input events', function () {
                    var fn = function (e) {};
                    spyOn(canvas, 'on');
                    canvas.onInput(fn);
                    expect(canvas.on).toHaveBeenCalledWith('click', fn);
                    expect(canvas.on).toHaveBeenCalledWith('press', fn);
                    expect(canvas.on).toHaveBeenCalledWith('release', fn);
                    expect(canvas.on).toHaveBeenCalledWith('move', fn);
                });

                it('should be able unbind from all input events', function () {
                    var fn = function (e) {};
                    spyOn(canvas, 'off');
                    canvas.offInput(fn);
                    expect(canvas.off).toHaveBeenCalledWith('click', fn);
                    expect(canvas.off).toHaveBeenCalledWith('press', fn);
                    expect(canvas.off).toHaveBeenCalledWith('release', fn);
                    expect(canvas.off).toHaveBeenCalledWith('move', fn);
                });
            });

            describe('on and off', function () {

                it('should be able to bind to "click" events', function () {
                    var clicked = false,
                        name = null;
                    canvas.on('click', function (e) {
                        clicked = true;
                        name = e.name;
                    });
                    mockElement.simulateEvent('click', createMockSourceEvent(0, 0));
                    expect(clicked).toBeTruthy();
                    expect(name).toEqual('click');
                });

               it('should be able to unbind from "click" events', function () {
                    var clicked = false,
                        fn = function (e) {clicked = true;};
                    canvas.on('click', fn);
                    canvas.off('click', fn);
                    mockElement.simulateEvent('click', createMockSourceEvent(0, 0));
                    expect(clicked).toBeFalsy();
                });

                it('should be able bind and unbind from "press" events', function () {
                    var press = false, name = null,
                        listener = function (e) {
                            press = true;
                            name = e.name;
                        },
                        mockEvent = createMockSourceEvent(0, 0);
                    canvas.isTouchSupported = function () { return false; };
                    canvas.on('press', listener);
                    mockElement.simulateEvent('mousedown', mockEvent);
                    expect(press).toBeTruthy();
                    expect(name).toEqual('press');

                    press = false;
                    canvas.off('press', listener);
                    mockElement.simulateEvent('mousedown', mockEvent);
                    expect(press).toBeFalsy();
                });

                it('should be able bind and unbind from "release" events', function () {
                    var release = false, name = null,
                        listener = function (e) {
                            release = true;
                            name = e.name;
                        },
                        mockEvent = createMockSourceEvent(0, 0);
                    canvas.isTouchSupported = function () { return false; };
                    canvas.on('release', listener);
                    mockElement.simulateEvent('mouseup', mockEvent);
                    expect(release).toBeTruthy();
                    expect(name).toEqual('release');

                    release = false;
                    canvas.off('release', listener);
                    mockElement.simulateEvent('mouseup', mockEvent);
                    expect(release).toBeFalsy();
                });

                it('should be able bind and unbind from "move" events', function () {
                    var move = false, name = null,
                        listener = function (e) {
                            move = true;
                            name = e.name;
                        },
                        mockEvent = createMockSourceEvent(0, 0);
                    canvas.isTouchSupported = function () { return false; };
                    canvas.on('move', listener);
                    
                    mockElement.simulateEvent('mousemove', mockEvent);
                    expect(move).toBeTruthy();
                    expect(name).toEqual('move');
                    
                    move = false;
                    mockElement.simulateEvent('mouseover', mockEvent);
                    expect(move).toBeTruthy();
                    expect(name).toEqual('move');

                    move = false;
                    mockElement.simulateEvent('mouseout', mockEvent);
                    expect(move).toBeTruthy();
                    expect(name).toEqual('move');
                    
                    move = false;
                    canvas.off('move', listener);
                    mockElement.simulateEvent('mousemove', mockEvent);
                    mockElement.simulateEvent('mouseover', mockEvent);
                    mockElement.simulateEvent('mouseout', mockEvent);
                    expect(move).toBeFalsy();
                });

                it('should use "touch" events if available and fallback to mouse events', function () {
                    var press = false, name = null,
                        listener = function (e) {
                            press = true;
                            name = e.name;
                        },
                        mockEvent = createMockSourceEvent(0, 0);
                    canvas.isTouchSupported = function () { return true; }
                    canvas.on('press', listener);
                    mockElement.simulateEvent('touchstart', mockEvent);
                    expect(press).toBeTruthy();
                    expect(name).toEqual('press');
                    press = false;
                    canvas.off('press', listener);
                    mockElement.simulateEvent('touchstart', mockEvent);
                    expect(press).toBeFalsy();
                });

                it('should be able bind and unbind from "resize" events', function () {
                    var resize = false,
                        name = null,
                        listener = function (e) {
                            resize = true;
                            name = e.name;
                        };
                    canvas.on('resize', listener);
                    expect(resize).toBeFalsy();
                    canvas.resize(100, 100);
                    expect(resize).toBeTruthy();

                    resize = false;
                    canvas.off('resize', listener);
                    canvas.resize(200, 100);
                    expect(resize).toBeFalsy();
                });
            });
        });
    });
});