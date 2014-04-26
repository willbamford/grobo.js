define(
    ['grobo/lib', 'grobo/helpers/geom', 'grobo/helpers/style'],
    function (lib, geom, styleHelper) {

        "use strict";

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
            layoutIsRequired: false,

            init: function (config) {
                this._initView(config);
                return this;
            },

            layout: function () {

                var style = this.style,
                    parent = this.parent || this.getCanvas(),
                    styleWidth = style.width || '100%',
                    styleHeight = style.height || '100%',
                    parentWidth = parent ? parent.width : 0,
                    parentHeight = parent ? parent.height : 0,
                    width = Math.round(styleHelper.measureSize(styleWidth, parentWidth)),
                    height = Math.round(styleHelper.measureSize(styleHeight, parentHeight)),
                    left, right, top, bottom,
                    spacingLeft = style.spacingLeft !== undefined ? style.spacingLeft : style.spacing,
                    spacingRight = style.spacingRight !== undefined ? style.spacingRight : style.spacing,
                    spacingTop = style.spacingTop !== undefined ? style.spacingTop : style.spacing,
                    spacingBottom = style.spacingBottom !== undefined ? style.spacingBottom : style.spacing,
                    x, y;

                left = style.left !== undefined ? Math.round(styleHelper.measureSize(style.left, parentWidth)) : undefined;
                right = style.right !== undefined ? Math.round(styleHelper.measureSize(style.right, parentWidth)) : undefined;
                top = style.top !== undefined ? Math.round(styleHelper.measureSize(style.top, parentHeight)) : undefined;
                bottom = style.bottom !== undefined ? Math.round(styleHelper.measureSize(style.bottom, parentHeight)) : undefined;

                if (left !== undefined && right !== undefined) {
                    x = left;
                    width = (parentWidth - right) - x;
                } else if (left !== undefined) {
                    x = left;
                } else if (right !== undefined) {
                    x = parentWidth - width - right;
                } else {
                    x = Math.round((parentWidth - width) / 2);
                }

                if (top !== undefined && bottom !== undefined) {
                    y = top;
                    height = (parentHeight - bottom) - y;
                } else if (top !== undefined) {
                    y = top;
                } else if (bottom !== undefined) {
                    y = parentHeight - height - bottom;
                } else {
                    y = Math.round((parentHeight - height) / 2);
                }

                spacingLeft = spacingLeft ? Math.round(styleHelper.measureSize(spacingLeft, parentWidth)) : 0;
                spacingRight = spacingRight ? Math.round(styleHelper.measureSize(spacingRight, parentWidth)) : 0;
                spacingTop = spacingTop ? Math.round(styleHelper.measureSize(spacingTop, parentHeight)) : 0;
                spacingBottom = spacingBottom ? Math.round(styleHelper.measureSize(spacingBottom, parentHeight)) : 0;

                if (spacingLeft) {
                    x += spacingLeft;
                    width -= spacingLeft;
                }

                if (spacingRight) {
                    width -= spacingRight;
                }

                if (spacingTop) {
                    y += spacingTop;
                    height -= spacingTop;
                }

                if (spacingBottom) {
                    height -= spacingBottom;
                }

                if (width < 0) width = 0;
                if (height < 0) height = 0;

                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;

                lib.each(this.children, function (child) {
                    child.layout();
                });

                this.requiresLayout(false);
            },

            requiresLayout: function (required) {
                this.layoutIsRequired = required;
            },

            setParent: function (parent) {
                this.parent = parent;
                this.requiresLayout(true);
            },

            addChild: function (view) {
                view.setParent(this);
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

            getCanvas: function () {
                return this.canvas || (this.parent ? this.parent.getCanvas() : null);
            },

            draw: function () {
                this._drawView();
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

            handleResize: function (event) {
                this.requiresLayout(true);
                this.layout();
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
                if (!this.handleInputChildren(event))
                    this.triggerIfInside(event);
            },

            handlePress: function (event) {
                if (!this.handleInputChildren(event))
                    this.triggerIfInside(event);
            },

            handleRelease: function (event) {
                if (!this.handleInputChildren(event))
                    this.triggerIfInside(event);
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
            },

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
                this.requiresLayout(true);
            },

            _drawView: function () {
                var x = this.getWorldX(),
                    y = this.getWorldY(),
                    width = this.width,
                    height = this.height,
                    canvas = this.getCanvas(),
                    style = this.style;

                if (style.background)
                    canvas.fillRectWithStyle(style.background, x, y, width, height);

                this.drawChildren();
            }
        };

        return refView;
    }
);