define(
    ['grobo/lib', 'grobo/helpers/geom', 'grobo/helpers/style'],
    function (lib, geom, styleHelper) {

        var refView = {

            canvas: null,
            parent: null,
            children: null,
            style: {},
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            listeners: null,
            wasLastEventInside: false,

            _initView: function (config) {
                this.canvas             = config.canvas || null;
                this.style              = config.style || {};
                this.width              = config.width || 0;
                this.height             = config.height || 0;
                this.x                  = config.x || 0;
                this.y                  = config.y || 0;
                this.children           = [];
                this.listeners          = {
                    'click': [],
                    'press': [],
                    'release': [],
                    'move': [],
                    'over': [],
                    'out': []
                };
                this.wasLastEventInside = false;
                this.layout();
            },

            init: function (config) {
                this._initView(config);
                return this;
            },

            layout: function () {

                var style = this.style,
                    parent = this.parent || this.canvas,
                    styleWidth = style.width || '100%',
                    styleHeight = style.height || '100%',
                    parentWidth = parent ? parent.width : 0,
                    parentHeight = parent ? parent.height : 0;

                // console.log('styleWidth: ' + styleWidth + ', styleHeight: ' + styleHeight + ', parentWidth: ' + parentWidth + ', parentHeight: ' + parentHeight);

                // this.x = style.x || 0;
                // this.y = style.y || 0;

                this.width = styleHelper.measureSize(styleWidth, parentWidth);
                this.height = styleHelper.measureSize(styleHeight, parentHeight);

                if (typeof style.left !== "undefined" || typeof style.right !== "undefined") {
                    this.x = style.left;
                } else {
                    this.x = Math.round((parentWidth - this.width) / 2);
                }

                if (typeof style.top !== "undefined" || typeof style.bottom !== "undefined") {
                    this.y = style.top;
                } else {
                    this.y = Math.round((parentHeight - this.height) / 2);
                }

                lib.each(this.children, function (child) {
                    child.layout();
                });
            },

            addChild: function (view) {
                view.parent = this;
                view.canvas = this.canvas;
                view.layout();
                this.children.push(view);
                return this;
            },

            removeChild: function (view) {
                var i = this.children.indexOf(view);
                if (i !== -1) {
                    this.children.splice(i, 1);
                    view.parent = null;
                }
            },

            getWorldX: function () {
                return this.parent ? this.parent.getWorldX() + this.x : this.x;
            },

            getWorldY: function () {
                return this.parent ? this.parent.getWorldY() + this.y : this.y;
            },

            draw: function () {
                this.drawChildren();
            },  

            drawChildren: function () {
                lib.each(this.children, function (child) {
                    child.draw();
                });
            },

            on: function (eventName, fn) {
                var listeners = this.listeners[eventName],
                    i = listeners.indexOf(fn);
                if (i === -1)
                    listeners.push(fn);
            },

            off: function (eventName, fn) {
                var listeners = this.listeners[eventName],
                    i = listeners.indexOf(fn);
                if (i !== -1)
                    listeners.splice(i, 1);
            },

            handleInput: function (event) {
                switch (event.name) {
                    case 'click':
                        this.handleClick(event);
                        break;
                    case 'press':
                        this.handlePress(event);
                        break;
                    case 'release':
                        this.handleRelease(event);
                        break;
                    case 'move':
                        this.handleMove(event);
                        break;
                }
            },

            handleInputChildren: function (event) {
                lib.reverseUntil(this.children, function (child) {
                    child.handleInput(event);
                    return event.isConsumed;
                });
                return event.isConsumed;
            },

            isEventInside: function (event) {
                return geom.isPointInsideRect(
                    event.x, event.y,
                    this.getWorldX(), this.getWorldY(),
                    this.width, this.height
                );
            },

            handleClick: function (event) {
                if (!this.handleInputChildren(event)) {
                    this.triggerIfInside(event);
                }
            },

            handlePress: function (event) {
                if (!this.handleInputChildren(event)) {
                    this.triggerIfInside(event);
                }
            },

            handleRelease: function (event) {
                if (!this.handleInputChildren(event)) {
                    this.triggerIfInside(event);
                }
            },

            handleMove: function (event) {
                var isInside = this.isEventInside(event);
                if (!this.handleInputChildren(event)) {
                    if (isInside)
                        this.trigger(event);
                }
                
                if (!this.wasLastEventInside && isInside)
                    this.handleOver(event);
                else if (this.wasLastEventInside && !isInside)
                    this.handleOut(event);
                this.wasLastEventInside = isInside;
            },

            handleOver: function (event) {
                this.trigger({ name: 'over', source: event });
            },

            handleOut: function (event) {
                this.trigger({ name: 'out', source: event });
            },

            trigger: function (event) {
                var listeners = this.listeners[event.name];
                if (listeners && listeners.length > 0) {
                    lib.each(listeners, function (listener) {
                        listener(event);
                    });
                }
                /* this.draw(); */
            },

            triggerIfInside: function (event) {
                if (this.isEventInside(event))
                    this.trigger(event);
            }
        };

        return refView;
    }
);