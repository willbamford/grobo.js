define(['input'], function (Input) { 

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
                addEventListener: function (eventName, fn) {
                    this.listeners[eventName] = fn;
                },
                removeEventListener: function (eventName, fn, flag) {
                    this.listeners[eventName] = null;
                },
                simulateClick: function (event) {
                    var listener = this.listeners['click'];
                    if (listener) {
                        listener(event);
                    }
                }
            };
            input = new Input(mockCanvas);
        });

        it('should be able to instantiate', function () {
            expect(input).not.toBeNull();
        });

        describe('click event handling', function () {

            it('should be able to register for "click" events', function () {
                var clicked = false;
                input.on('click', function (e) {clicked = true;});
                mockCanvas.simulateClick(createClientEvent(0, 0, 0, 0));
                expect(clicked).toBeTruthy();
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