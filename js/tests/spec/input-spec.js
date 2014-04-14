define(['input'], function (refInput) { 

    describe('Input', function () {
        
        var input,
            mockCanvas;

        function createClientEvent(clientX, clientY, offsetLeft, offsetTop) {
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
                    var listener = this.listeners['click'];
                    if (listener) {
                        listener(event);
                    }
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
            input = Object.create(refInput).init(mockCanvas);
        });

        it('should return "this" on init', function () {
            expect(typeof Object.create(refInput)).toEqual('object');
        });

        it('should be able to instantiate', function () {
            expect(input).not.toBeNull();
        });

        describe('wildcard event handling', function () {

            it('should be able to register for all events', function () {
                var fn = function (e) {};
                spyOn(input, 'on');
                input.onEvent(fn);
                expect(input.on).toHaveBeenCalledWith('click', fn);
            });

            it('should be able to deregister all events', function () {
                var fn = function (e) {};
                spyOn(input, 'off');
                input.offEvent(fn);
                expect(input.off).toHaveBeenCalledWith('click', fn);
            });
        });

        describe('click event handling', function () {

            it('should be able to register for "click" events', function () {
                var clicked = false,
                    name = null;
                input.on('click', function (e) {
                    clicked = true;
                    name = e.name;
                });
                mockCanvas.simulateClick(createClientEvent(0, 0, 0, 0));
                expect(clicked).toBeTruthy();
                expect(name).toEqual('click');
            });

            it('should be able to deregister for "click" events', function () {
                var clicked = false,
                    fn = function (e) {clicked = true;};
                input.on('click', fn);
                input.off('click', fn);
                mockCanvas.simulateClick(createClientEvent(0, 0, 0, 0));
                expect(clicked).toBeFalsy();
            });

            it('should prevent default on the triggering event', function () {
                var event = createClientEvent(0, 0, 0, 0);
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
                mockCanvas.simulateClick(createClientEvent(100, 90, 50, 60));
                expect(event.x).toEqual(100 - 50);
                expect(event.y).toEqual(90 - 60);
            });
        });
    });
});