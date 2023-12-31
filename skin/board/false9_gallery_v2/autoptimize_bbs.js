/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */

!function (a, b, c, d) {
    function e(b, c) {
        this.settings = null,
        this.options = a.extend({}, e.Defaults, c),
        this.$element = a(b),
        this._handlers = {},
        this._plugins = {},
        this._supress = {},
        this._current = null,
        this._speed = null,
        this._coordinates = [],
        this._breakpoint = null,
        this._width = null,
        this._items = [],
        this._clones = [],
        this._mergers = [],
        this._widths = [],
        this._invalidated = {},
        this._pipe = [],
        this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: {
                start: null,
                current: null
            },
            direction: null
        },
        this._states = {
            current: {},
            tags: {
                initializing: ["busy"],
                animating: ["busy"],
                dragging: ["interacting"]
            }
        },
        a.each([
            "onResize", "onThrottledResize"
        ], a.proxy(function (b, c) {
            this._handlers[c] = a.proxy(this[c], this)
        }, this)),
        a.each(e.Plugins, a.proxy(function (a, b) {
            this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this)
        }, this)),
        a.each(e.Workers, a.proxy(function (b, c) {
            this._pipe.push({
                filter: c.filter,
                run: a.proxy(c.run, this)
            })
        }, this)),
        this.setup(),
        this.initialize()
    }
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab"
    },
    e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    },
    e.Type = {
        Event: "event",
        State: "state"
    },
    e.Plugins = {},
    e.Workers = [
        {
            filter: [
                "width", "settings"
            ],
            run: function () {
                this._width = this.$element.width()
            }
        },
        {
            filter: [
                "width", "items", "settings"
            ],
            run: function (a) {
                a.current = this._items && this._items[this.relative(this._current)]
            }
        },
        {
            filter: [
                "items", "settings"
            ],
            run: function () {
                this
                    .$stage
                    .children(".cloned")
                    .remove()
            }
        },
        {
            filter: [
                "width", "items", "settings"
            ],
            run: function (a) {
                var b = this.settings.margin || "",
                    c = !this.settings.autoWidth,
                    d = this.settings.rtl,
                    e = {
                        width: "auto",
                        "margin-left": d
                            ? b
                            : "",
                        "margin-right": d
                            ? ""
                            : b
                    };
                ! c && this
                    .$stage
                    .children()
                    .css(e),
                a.css = e
            }
        }, {
            filter: [
                "width", "items", "settings"
            ],
            run: function (a) {
                var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                    c = null,
                    d = this._items.length,
                    e = !this.settings.autoWidth,
                    f = [];
                for (a.items =
                    { merge: !1,
                    width: b
                }; d--;) 
                    c = this._mergers[d],
                    c = this.settings.mergeFit && Math.min(c, this.settings.items) || c,
                    a.items.merge = c > 1 || a.items.merge,
                    f[d] = e
                        ? b * c
                        : this._items[d].width();
                
                this._widths = f
            }
        }, {
            filter: [
                "items", "settings"
            ],
            run: function () {
                var b = [],
                    c = this._items,
                    d = this.settings,
                    e = Math.max(2 * d.items, 4),
                    f = 2 * Math.ceil(c.length / 2),
                    g = d.loop && c.length
                        ? d.rewind
                            ? e
                            : Math.max(e, f)
                        : 0,
                    h = "",
                    i = "";
                for (g /= 2; g > 0;) 
                    b.push(this.normalize(b.length / 2, !0)),
                    h += c[b[b.length - 1]][0].outerHTML,
                    b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
                    i = c[b[b.length - 1]][0].outerHTML + i,
                    g -= 1;
                
                this._clones = b,
                a(h).addClass("cloned").appendTo(this.$stage),
                a(i).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: [
                "width", "items", "settings"
            ],
            run: function () {
                for (
                    var a = this.settings.rtl
                        ? 1
                        : -1,
                    b = this._clones.length + this._items.length,
                    c = -1,
                    d = 0,
                    e = 0,
                    f =[]; ++ c < b;
                ) 
                    d = f[c - 1] || 0,
                    e = this._widths[this.relative(c)] + this.settings.margin,
                    f.push(d + e * a);
                
                this._coordinates = f
            }
        }, {
            filter: [
                "width", "items", "settings"
            ],
            run: function () {
                var a = this.settings.stagePadding,
                    b = this._coordinates,
                    c = {
                        width: Math.ceil(Math.abs(b[b.length - 1])) + 2 *a,
                        "padding-left": a || "",
                        "padding-right": a || ""
                    };
                this.$stage.css(c)
            }
        }, {
            filter: [
                "width", "items", "settings"
            ],
            run: function (a) {
                var b = this._coordinates.length,
                    c = !this.settings.autoWidth,
                    d = this.$stage.children();
                if (c && a.items.merge) 
                    for (; b--;) 
                        a.css.width = this._widths[this.relative(b)],
                        d.eq(b).css(a.css);
                    
                 else 
                    c && (a.css.width = a.items.width, d.css(a.css))
                
            }
        }, {
            filter: ["items"],
            run: function () {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: [
                "width", "items", "settings"
            ],
            run: function (a) {
                a.current = a.current
                    ? this
                        .$stage
                        .children()
                        .index(a.current)
                    : 0,
                a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)),
                this.reset(a.current)
            }
        }, {
            filter: ["position"],
            run: function () {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: [
                "width", "position", "items", "settings"
            ],
            run: function () {
                var a,
                    b,
                    c,
                    d,
                    e = this.settings.rtl
                        ? 1
                        : -1,
                    f = 2 * this.settings.stagePadding,
                    g = this.coordinates(this.current()) + f,
                    h = g + this.width() * e,
                    i = [];
                for (c = 0, d = this._coordinates.length; c < d; c++) 
                    a = this._coordinates[c - 1] || 0,
                    b = Math.abs(this._coordinates[c]) + f * e,
                    (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
                
                this
                    .$stage
                    .children(".active")
                    .removeClass("active"),
                this
                    .$stage
                    .children(":eq(" + i.join("), :eq(") + ")")
                    .addClass("active"),
                this
                    .$stage
                    .children(".center")
                    .removeClass("center"),
                this.settings.center && this
                    .$stage
                    .children()
                    .eq(this.current())
                    .addClass("center")
            }
        }
    ],
    e.prototype.initializeStage = function () {
        this.$stage = this.$element.find("." + this.settings.stageClass),
        this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {class: this.settings.stageClass}).wrap(a("<div/>", {class: this.settings.stageOuterClass})), this.$element.append(this.$stage.parent()))
    },
    e.prototype.initializeItems = function () {
        var b = this.$element.find(".owl-item");
        if (b.length) 
            return this._items = b.get().map(function (b) {
                return a(b)
            }),
            this._mergers = this._items.map(function () {
                return 1
            }),
            void this.refresh();
        
        this.replace(this
            .$element
            .children()
            .not(this.$stage.parent())),
        this.isVisible()
            ? this.refresh()
            : this.invalidate("width"),
        this
            .$element
            .removeClass(this.options.loadingClass)
            .addClass(this.options.loadedClass)
    },
    e.prototype.initialize = function () {
        if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
            var a,
                b,
                c;
            a = this.$element.find("img"),
            b = this.settings.nestedItemSelector
                ? "." + this.settings.nestedItemSelector
                : d,
            c = this
                .$element
                .children(b)
                .width(),
            a.length && c <= 0 && this.preloadAutoWidthImages(a)
        }
        this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized")
    },
    e.prototype.isVisible = function () {
        return !this.settings.checkVisibility || this.$element.is(":visible")
    },
    e.prototype.setup = function () {
        var b = this.viewport(),
            c = this.options.responsive,
            d = -1,
            e = null;
        c
            ? (a.each(c, function (a) {
                a <= b && a > d && (d = Number(a))
            }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this
                .$element
                .attr("class")
                .replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d)))
            : e = a.extend({}, this.options),
        this.trigger("change", {
            property: {
                name: "settings",
                value: e
            }
        }),
        this._breakpoint = d,
        this.settings = e,
        this.invalidate("settings"),
        this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        })
    },
    e.prototype.optionsLogic = function () {
        this.settings.autoWidth && (this.settings.stagePadding =! 1, this.settings.merge =! 1)
    },
    e.prototype.prepare = function (b) {
        var c = this.trigger("prepare", {content: b});
        return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)),
        this.trigger("prepared", {content: c.data}),
        c.data
    },
    e.prototype.update = function () {
        for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
            return this[a]
        }, this._invalidated), e =
            {}; b < c;) 
            (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e),
            b ++;
        
        this._invalidated = {},
        !this.is("valid") && this.enter("valid")
    },
    e.prototype.width = function (a) {
        switch (a = a || e.Width.Default) {
            case e.Width.Inner:
            case e.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    },
    e.prototype.refresh = function () {
        this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed")
    },
    e.prototype.onThrottledResize = function () {
        b.clearTimeout(this.resizeTimer),
        this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
    },
    e.prototype.onResize = function () {
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (
            this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented()
                ? (this.leave("resizing"), !1)
                : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized"))
        )))
    },
    e.prototype.registerEventHandlers = function () {
        a.support.transition && this.$stage.on(a
            .support
            .transition
            .end + ".owl.core", a.proxy(this.onTransitionEnd, this)),
        !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return !1
        })),
        this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)))
    },
    e.prototype.onDragStart = function (b) {
        var d = null;
        3 !== b.which && (
            a.support.transform
                ? (d = this
                    .$stage
                    .css("transform")
                    .replace(/.*\(|\)| /g, "")
                    .split(","), d =
                    { x: d[
                        16 === d.length
                            ? 12
                            : 4
                    ],
                    y: d[
                        16 === d.length
                            ? 13
                            : 5
                    ]
                })
                : (d = this.$stage.position(), d =
                    {
                    x: this.settings.rtl
                        ? d.left + this.$stage.width() - this.width() + this.settings.margin
                        : d.left,
                    y: d.top
                }),
            this.is("animating") && (
                a.support.transform
                    ? this.animate(d.x)
                    : this.$stage.stop(),
                this.invalidate("position")
            ),
            this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type),
            this.speed(0),
            this._drag.time =( new Date).getTime(),
            this._drag.target = a(b.target),
            this
                ._drag
                .stage
                .start = d,
            this
                ._drag
                .stage
                .current = d,
            this._drag.pointer = this.pointer(b),
            a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)),
            a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
                var d = this.difference(this._drag.pointer, this.pointer(b));
                a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)),
                Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"))
            }, this))
        )
    },
    e.prototype.onDragMove = function (a) {
        var b = null,
            c = null,
            d = null,
            e = this.difference(this._drag.pointer, this.pointer(a)),
            f = this.difference(this
                ._drag
                .stage
                .start, e);
        this.is("dragging") && (
            a.preventDefault(),
            this.settings.loop
                ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x =(( f.x - b) % c + c) % c + b)
                : (
                    b = this.settings.rtl
                        ? this.coordinates(this.maximum())
                        : this.coordinates(this.minimum()),
                    c = this.settings.rtl
                        ? this.coordinates(this.minimum())
                        : this.coordinates(this.maximum()),
                    d = this.settings.pullDrag
                        ? -1 * e.x / 5
                        : 0,
                    f.x = Math.max(Math.min(f.x, b + d), c + d)
                ),
            this
                ._drag
                .stage
                .current = f,
            this.animate(f.x)
        )
    },
    e.prototype.onDragEnd = function (b) {
        var d = this.difference(this._drag.pointer, this.pointer(b)),
            e = this
                ._drag
                .stage
                .current,
            f = d.x > 0 ^ this.settings.rtl
                ? "left"
                : "right";
        a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(
            e.x,
            0 !== d.x
                ? f
                : this._drag.direction
        )), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this
            ._drag
            .target
            .one("click.owl.core", function () {
                return !1
            })),
        this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
    },
    e.prototype.closest = function (b, c) {
        var e = -1,
            f = 30,
            g = this.width(),
            h = this.coordinates();
        return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
            return "left" === c && b > i - f && b < i + f
                ? e = a
                : "right" === c && b > i - g - f && b < i - g + f
                    ? e = a + 1
                    : this.op(b, "<", i) && this.op(
                        b,
                        ">",
                        h[a + 1] !== d
                            ? h[a + 1]
                            : i - g
                    ) && (
                        e = "left" === c
                            ? a + 1
                            : a
                    ),
            -1 === e
        }, this)),
        this.settings.loop || (
            this.op(b, ">", h[this.minimum()])
                ? e = b = this.minimum()
                : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())
        ),
        e
    },
    e.prototype.animate = function (b) {
        var c = this.speed() > 0;
        this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
            ? this.$stage.css({
                transform: "translate3d(" + b + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s" + (
                    this.settings.slideTransition
                        ? " " + this.settings.slideTransition
                        : ""
                )
            })
            : c
                ? this.$stage.animate({
                    left: b + "px"
                }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this))
                : this.$stage.css({
                    left: b + "px"
                })
    },
    e.prototype.is = function (a) {
        return this._states.current[a] && this._states.current[a] > 0
    },
    e.prototype.current = function (a) {
        if (a === d) 
            return this._current;
        
        if (0 === this._items.length) 
            return d;
        
        if (a = this.normalize(a), this._current !== a) {
            var b = this.trigger("change", {
                property: {
                    name: "position",
                    value: a
                }
            });
            b.data !== d && (a = this.normalize(b.data)),
            this._current = a,
            this.invalidate("position"),
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    },
    e.prototype.invalidate = function (b) {
        return "string" === a.type(b) && (this._invalidated[b] =! 0, this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, b) {
            return b
        })
    },
    e.prototype.reset = function (a) {
        (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    },
    e.prototype.normalize = function (a, b) {
        var c = this._items.length,
            e = b
                ? 0
                : this._clones.length;
        return !this.isNumeric(a) || c < 1
            ? a = d
            : (a < 0 || a >= c + e) && (a =(( a - e / 2) % c + c) % c + e / 2),
        a
    },
    e.prototype.relative = function (a) {
        return a -= this._clones.length / 2,
        this.normalize(a, !0)
    },
    e.prototype.maximum = function (a) {
        var b,
            c,
            d,
            e = this.settings,
            f = this._coordinates.length;
        if (e.loop) 
            f = this._clones.length / 2 + this._items.length - 1;
         else if (e.autoWidth || e.merge) {
            if (b = this._items.length) 
                for (c = this._items[-- b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d);) 
                
                f = b + 1
            
        } else 
            f = e.center
                ? this._items.length - 1
                : this._items.length - e.items;
        
        return a && (f -= this._clones.length / 2),
        Math.max(f, 0)
    },
    e.prototype.minimum = function (a) {
        return a
            ? 0
            : this._clones.length / 2
    },
    e.prototype.items = function (a) {
        return a === d
            ? this._items.slice()
            : (a = this.normalize(a, !0), this._items[a])
    },
    e.prototype.mergers = function (a) {
        return a === d
            ? this._mergers.slice()
            : (a = this.normalize(a, !0), this._mergers[a])
    },
    e.prototype.clones = function (b) {
        var c = this._clones.length / 2,
            e = c + this._items.length,
            f = function (a) {
                return a % 2 == 0
                    ? e + a / 2
                    : c - (a + 1) / 2
            };
        return b === d
            ? a.map(this._clones, function (a, b) {
                return f(b)
            })
            : a.map(this._clones, function (a, c) {
                return a === b
                    ? f(c)
                    : null
            })
    },
    e.prototype.speed = function (a) {
        return a !== d && (this._speed = a),
        this._speed
    },
    e.prototype.coordinates = function (b) {
        var c,
            e = 1,
            f = b - 1;
        return b === d
            ? a.map(this._coordinates, a.proxy(function (a, b) {
                return this.coordinates(b)
            }, this))
            : (
                this.settings.center
                    ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c +=( this.width() - c + (this._coordinates[f] || 0)) / 2 * e)
                    : c = this._coordinates[f] || 0,
                c = Math.ceil(c)
            )
    },
    e.prototype.duration = function (a, b, c) {
        return 0 === c
            ? 0
            : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    },
    e.prototype.to = function (a, b) {
        var c = this.current(),
            d = null,
            e = a - this.relative(c),
            f = (e > 0) - (e < 0),
            g = this._items.length,
            h = this.minimum(),
            i = this.maximum();
        this.settings.loop
            ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d =(( a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c)))
            : this.settings.rewind
                ? (i += 1, a =( a % i + i) % i)
                : a = Math.max(h, Math.min(i, a)),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update()
    },
    e.prototype.next = function (a) {
        a = a || !1,
        this.to(this.relative(this.current()) + 1, a)
    },
    e.prototype.prev = function (a) {
        a = a || !1,
        this.to(this.relative(this.current()) - 1, a)
    },
    e.prototype.onTransitionEnd = function (a) {
        if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) 
            return !1;
        
        this.leave("animating"),
        this.trigger("translated")
    },
    e.prototype.viewport = function () {
        var d;
        return this.options.responsiveBaseElement !== b
            ? d = a(this.options.responsiveBaseElement).width()
            : b.innerWidth
                ? d = b.innerWidth
                : c.documentElement && c.documentElement.clientWidth
                    ? d = c.documentElement.clientWidth
                    : console.warn("Can not detect viewport width."),
        d
    },
    e.prototype.replace = function (b) {
        this.$stage.empty(),
        this._items = [],
        b && (
            b = b instanceof jQuery
                ? b
                : a(b)
        ),
        this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)),
        b.filter(function () {
            return 1 === this.nodeType
        }).each(a.proxy(function (a, b) {
            b = this.prepare(b),
            this.$stage.append(b),
            this._items.push(b),
            this._mergers.push(1 * b
                .find("[data-merge]")
                .addBack("[data-merge]")
                .attr("data-merge") || 1)
        }, this)),
        this.reset(
            this.isNumeric(this.settings.startPosition)
                ? this.settings.startPosition
                : 0
        ),
        this.invalidate("items")
    },
    e.prototype.add = function (b, c) {
        var e = this.relative(this._current);
        c = c === d
            ? this._items.length
            : this.normalize(c, !0),
        b = b instanceof jQuery
            ? b
            : a(b),
        this.trigger("add", {
            content: b,
            position: c
        }),
        b = this.prepare(b),
        0 === this._items.length || c === this._items.length
            ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b
                .find("[data-merge]")
                .addBack("[data-merge]")
                .attr("data-merge") || 1))
            : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b
                .find("[data-merge]")
                .addBack("[data-merge]")
                .attr("data-merge") || 1)),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", {
            content: b,
            position: c
        })
    },
    e.prototype.remove = function (a) {
        (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
            content: this._items[a],
            position: a
        }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: a
        }))
    },
    e.prototype.preloadAutoWidthImages = function (b) {
        b.each(a.proxy(function (b, c) {
            this.enter("pre-loading"),
            c = a(c),
            a(new Image).one("load", a.proxy(function (a) {
                c.attr("src", a.target.src),
                c.css("opacity", 1),
                this.leave("pre-loading"),
                !this.is("pre-loading") && !this.is("initializing") && this.refresh()
            }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"))
        }, this))
    },
    e.prototype.destroy = function () {
        this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));
        for (var d in this._plugins) 
            this._plugins[d].destroy();
        
        this
            .$stage
            .children(".cloned")
            .remove(),
        this.$stage.unwrap(),
        this
            .$stage
            .children()
            .contents()
            .unwrap(),
        this
            .$stage
            .children()
            .unwrap(),
        this.$stage.remove(),
        this
            .$element
            .removeClass(this.options.refreshClass)
            .removeClass(this.options.loadingClass)
            .removeClass(this.options.loadedClass)
            .removeClass(this.options.rtlClass)
            .removeClass(this.options.dragClass)
            .removeClass(this.options.grabClass)
            .attr("class", this
                .$element
                .attr("class")
                .replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), ""))
            .removeData("owl.carousel")
    },
    e.prototype.op = function (a, b, c) {
        var d = this.settings.rtl;
        switch (b) {
            case "<":
                return d
                    ? a > c
                    : a < c;
            case ">":
                return d
                    ? a < c
                    : a > c;
            case ">=":
                return d
                    ? a <= c
					: a >= c;
            case "<="
                : return d
                    ? a >= c
                    : a <= c
        }
    },
    e.prototype.on = function (a, b, c, d) {
        a.addEventListener
            ? a.addEventListener(b, c, d)
            : a.attachEvent && a.attachEvent("on" + b, c)
    },
    e.prototype.off = function (a, b, c, d) {
        a.removeEventListener
            ? a.removeEventListener(b, c, d)
            : a.detachEvent && a.detachEvent("on" + b, c)
    },
    e.prototype.trigger = function (b, c, d, f, g) {
        var h = {
                item: {
                    count: this._items.length,
                    index: this.current()
                }
            },
            i = a.camelCase(a
                .grep([
                    "on", b, d
                ], function (a) {
                    return a
                })
                .join("-")
                .toLowerCase()),
            j = a.Event([
                b,
                "owl",
                d || "carousel"
            ].join(".").toLowerCase(), a.extend({
                relatedTarget: this
            }, h, c));
        return this._supress[b] || (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j)
        }), this.register({type: e.Type.Event, name: b}), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)),
        j
    },
    e.prototype.enter = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++
        }, this))
    },
    e.prototype.leave = function (b) {
        a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
            this._states.current[b]--
        }, this))
    },
    e.prototype.register = function (b) {
        if (b.type === e.Type.Event) {
            if (a.event.special[b.name] || (a.event.special[b.name] =
                {}), ! a
                    .event
                    .special[b.name]
                    .owl) {
                var c = a
                    .event
                    .special[b.name]
                    ._default;
                a
                    .event
                    .special[b.name]
                    ._default = function (a) {
                    return ! c || ! c.apply || a.namespace && -1 !== a.namespace.indexOf("owl")
                        ? a.namespace && a.namespace.indexOf("owl") > -1
                        : c.apply(this, arguments)
                },
                a
                    .event
                    .special[b.name]
                    .owl = !0
            }
        } else 
            b.type === e.Type.State && (
                this._states.tags[b.name]
                    ? this._states.tags[b.name] = this
                        ._states
                        .tags[b.name]
                        .concat(b.tags)
                    : this._states.tags[b.name] = b.tags,
                this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
                    return a.inArray(c, this._states.tags[b.name]) === d
                }, this))
            )
        
    },
    e.prototype.suppress = function (b) {
        a.each(b, a.proxy(function (a, b) {
            this._supress[b] = !0
        }, this))
    },
    e.prototype.release = function (b) {
        a.each(b, a.proxy(function (a, b) {
            delete this._supress[b]
        }, this))
    },
    e.prototype.pointer = function (a) {
        var c = {
            x: null,
            y: null
        };
        return a = a.originalEvent || a || b.event,
        a = a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
                ? a.changedTouches[0]
                : a,
        a.pageX
            ? (c.x = a.pageX, c.y = a.pageY)
            : (c.x = a.clientX, c.y = a.clientY),
        c
    },
    e.prototype.isNumeric = function (a) {
        return !isNaN(parseFloat(a))
    },
    e.prototype.difference = function (a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    },
    a.fn.owlCarousel = function (b) {
        var c = Array
            .prototype
            .slice
            .call(arguments, 1);
        return this.each(function () {
            var d = a(this),
                f = d.data("owl.carousel");
            f || (f = new e(this, "object" == typeof b && b), d.data("owl.carousel", f), a.each([
                "next",
                "prev",
                "to",
                "destroy",
                "refresh",
                "replace",
                "add",
                "remove"
            ], function (b, c) {
                f.register({type: e.Type.Event, name: c}),
                f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
                    a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]))
                }, f))
            })),
            "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c)
        })
    },
    a
        .fn
        .owlCarousel
        .Constructor = e
}(window.Zepto || window.jQuery, window, document),
function (a, b, c, d) {
    var e = function (b) {
        this._core = b,
        this._interval = null,
        this._visible = null,
        this._handlers = {
            "initialized.owl.carousel": a.proxy(function (a) {
                a.namespace && this
                    ._core
                    .settings
                    .autoRefresh && this.watch()
            }, this)
        },
        this._core.options = a.extend({}, e.Defaults, this._core.options),
        this
            ._core
            .$element
            .on(this._handlers)
    };
    e.Defaults = {
        autoRefresh: !0,
        autoRefreshInterval: 500
    },
    e.prototype.watch = function () {
        this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this
            ._core
            .settings
            .autoRefreshInterval))
    },
    e.prototype.refresh = function () {
        this._core.isVisible() !== this._visible && (this._visible =! this._visible, this
            ._core
            .$element
            .toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
    },
    e.prototype.destroy = function () {
        var a,
            c;
        b.clearInterval(this._interval);
        for (a in this._handlers) 
            this
                ._core
                .$element
                .off(a, this._handlers[a]);
        
        for (c in Object.getOwnPropertyNames(this)) 
            "function" != typeof this[c] && (this[c] = null)
        
    },
    a
        .fn
        .owlCarousel
        .Constructor
        .Plugins
        .AutoRefresh = e
}(window.Zepto || window.jQuery, window, document),

	
	
	function (a, b, c, d) {
    var e = function (b) {
        this._core = b,
        this._loaded = [],
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
                if (b.namespace && this._core.settings && this
                        ._core
                        .settings
                        .lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var c = this._core.settings,
                        e = c.center && Math.ceil(c.items / 2) || c.items,
                        f = c.center && -1 * e || 0,
                        g = (
                            b.property && b.property.value !== d
                                ? b.property.value
                                : this._core.current()
                        ) + f,
                        h = this
                            ._core
                            .clones()
                            .length,
                        i = a.proxy(function (a, b) {
                            this.load(b)
                        }, this);
                    for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e ++)); f++ <e;)this.load(h/2+this._core.relative(g)), h&&a.each(this._core.clones(this._core.relative(g)), i), g++}}, this)}, this._core.options=a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1, lazyLoadEager:0}, e.prototype.load=function(c){var d=this._core.$stage.children().eq(c), e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0), this._loaded)> -1 || (e.each(a.proxy(function (c, d) {
                        var e,
                            f = a(d),
                            g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
                        this._core.trigger("load", {
                            element: f,
                            url: g
                        }, "lazy"),
                        f.is("img")
                            ? f.one("load.owl.lazy", a.proxy(function () {
                                f.css("opacity", 1),
                                this._core.trigger("loaded", {
                                    element: f,
                                    url: g
                                }, "lazy")
                            }, this)).attr("src", g)
                            : f.is("source")
                                ? f.one("load.owl.lazy", a.proxy(function () {
                                    this._core.trigger("loaded", {
                                        element: f,
                                        url: g
                                    }, "lazy")
                                }, this)).attr("srcset", g)
                                : (e = new Image, e.onload = a.proxy(function () {
                                    f.css({
                                        "background-image": 'url("' + g + '")',
                                        opacity: "1"
                                    }),
                                    this._core.trigger("loaded", {
                                        element: f,
                                        url: g
                                    }, "lazy")
                                }, this), e.src = g)
                    }, this)), this._loaded.push(d.get(0)))},
                e.prototype.destroy = function () {
                    var a,
                        b;
                    for (a in this.handlers) 
                        this
                            ._core
                            .$element
                            .off(a, this.handlers[a]);
                    
                    for (b in Object.getOwnPropertyNames(this)) 
                        "function" != typeof this[b] && (this[b] = null)
                    
                },
                a
                    .fn
                    .owlCarousel
                    .Constructor
                    .Plugins
                    .Lazy = e
            }
            (window.Zepto || window.jQuery, window, document),
            function (a, b, c, d) {
                var e = function (c) {
                    this._core = c,
                    this._previousHeight = null,
                    this._handlers = {
                        "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
                            a.namespace && this
                                ._core
                                .settings
                                .autoHeight && this.update()
                        }, this),
                        "changed.owl.carousel": a.proxy(function (a) {
                            a.namespace && this
                                ._core
                                .settings
                                .autoHeight && "position" === a.property.name && this.update()
                        }, this),
                        "loaded.owl.lazy": a.proxy(function (a) {
                            a.namespace && this
                                ._core
                                .settings
                                .autoHeight && a
                                .element
                                .closest("." + this
                                    ._core
                                    .settings
                                    .itemClass)
                                .index() === this._core.current() && this.update()
                        }, this)
                    },
                    this._core.options = a.extend({}, e.Defaults, this._core.options),
                    this
                        ._core
                        .$element
                        .on(this._handlers),
                    this._intervalId = null;
                    var d = this;
                    a(b).on("load", function () {
                        d
                            ._core
                            .settings
                            .autoHeight && d.update()
                    }),
                    a(b).resize(function () {
                        d
                            ._core
                            .settings
                            .autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function () {
                            d.update()
                        }, 250))
                    })
                };
                e.Defaults = {
                    autoHeight: !1,
                    autoHeightClass: "owl-height"
                },
                e.prototype.update = function () {
                    var b = this._core._current,
                        c = b + this
                            ._core
                            .settings
                            .items,
                        d = this
                            ._core
                            .settings
                            .lazyLoad,
                        e = this
                            ._core
                            .$stage
                            .children()
                            .toArray()
                            .slice(b, c),
                        f = [],
                        g = 0;
                    a.each(e, function (b, c) {
                        f.push(a(c).height())
                    }),
                    g = Math.max.apply(null, f),
                    g <= 1 && d && this._previousHeight && (g = this._previousHeight),
                    this._previousHeight = g,
                    this
                        ._core
                        .$stage
                        .parent()
                        .height(g)
                        .addClass(this
                            ._core
                            .settings
                            .autoHeightClass)
                },
                e.prototype.destroy = function () {
                    var a,
                        b;
                    for (a in this._handlers) 
                        this
                            ._core
                            .$element
                            .off(a, this._handlers[a]);
                    
                    for (b in Object.getOwnPropertyNames(this)) 
                        "function" != typeof this[b] && (this[b] = null)
                    
                },
                a
                    .fn
                    .owlCarousel
                    .Constructor
                    .Plugins
                    .AutoHeight = e
            }(window.Zepto || window.jQuery, window, document),
            function (a, b, c, d) {
                var e = function (b) {
                    this._core = b,
                    this._videos = {},
                    this._playing = null,
                    this._handlers = {
                        "initialized.owl.carousel": a.proxy(function (a) {
                            a.namespace && this._core.register({type: "state", name: "playing", tags: ["interacting"]})
                        }, this),
                        "resize.owl.carousel": a.proxy(function (a) {
                            a.namespace && this
                                ._core
                                .settings
                                .video && this.isInFullScreen() && a.preventDefault()
                        }, this),
                        "refreshed.owl.carousel": a.proxy(function (a) {
                            a.namespace && this._core.is("resizing") && this
                                ._core
                                .$stage
                                .find(".cloned .owl-video-frame")
                                .remove()
                        }, this),
                        "changed.owl.carousel": a.proxy(function (a) {
                            a.namespace && "position" === a.property.name && this._playing && this.stop()
                        }, this),
                        "prepared.owl.carousel": a.proxy(function (b) {
                            if (b.namespace) {
                                var c = a(b.content).find(".owl-video");
                                c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
                            }
                        }, this)
                    },
                    this._core.options = a.extend({}, e.Defaults, this._core.options),
                    this
                        ._core
                        .$element
                        .on(this._handlers),
                    this
                        ._core
                        .$element
                        .on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
                            this.play(a)
                        }, this))
                };
                e.Defaults = {
                    video: !1,
                    videoHeight: !1,
                    videoWidth: !1
                },
                e.prototype.fetch = function (a, b) {
                    var c = function () {
                            return a.attr("data-vimeo-id")
                                ? "vimeo"
                                : a.attr("data-vzaar-id")
                                    ? "vzaar"
                                    : "youtube"
                        }(),
                        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
                        e = a.attr("data-width") || this
                            ._core
                            .settings
                            .videoWidth,
                        f = a.attr("data-height") || this
                            ._core
                            .settings
                            .videoHeight,
                        g = a.attr("href");
                    if (! g) 
                        throw new Error("Missing video URL.");
                    
                    if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) 
                        c = "youtube";
                     else if (d[3].indexOf("vimeo") > -1) 
                        c = "vimeo";
                     else {
                        if (!(d[3].indexOf("vzaar") > -1)) 
                            throw new Error("Video URL not supported.");
                        
                        c = "vzaar"
                    } d = d[6],
                    this._videos[g] = {
                        type: c,
                        id: d,
                        width: e,
                        height: f
                    },
                    b.attr("data-video", g),
                    this.thumbnail(a, this._videos[g])
                },
                e.prototype.thumbnail = function (b, c) {
                    var d,
                        e,
                        f,
                        g = c.width && c.height
                            ? "width:" + c.width + "px;height:" + c.height + "px;"
                            : "",
                        h = b.find("img"),
                        i = "src",
                        j = "",
                        k = this._core.settings,
                        l = function (c) {
                            e = '<div class="owl-video-play-icon"></div>',
                            d = k.lazyLoad
                                ? a("<div/>", {
                                    class: "owl-video-tn " + j,
                                    srcType: c
                                })
                                : a("<div/>", {
                                    class: "owl-video-tn",
                                    style: "opacity:1;background-image:url(" + c + ")"
                                }),
                            b.after(d),
                            b.after(e)
                        };
                    if (b.wrap(a("<div/>", {
                        class: "owl-video-wrapper",
                        style: g
                    })), this
                            ._core
                            .settings
                            .lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) 
                        return l(h.attr(i)),
                        h.remove(),
                        !1;
                    
                    "youtube" === c.type
                        ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f))
                        : "vimeo" === c.type
                            ? a.ajax({
                                type: "GET",
                                url: "//vimeo.com/api/v2/video/" + c.id + ".json",
                                jsonp: "callback",
                                dataType: "jsonp",
                                success: function (a) {
                                    f = a[0].thumbnail_large,
                                    l(f)
                                }
                            })
                            : "vzaar" === c.type && a.ajax({
                                type: "GET",
                                url: "//vzaar.com/api/videos/" + c.id + ".json",
                                jsonp: "callback",
                                dataType: "jsonp",
                                success: function (a) {
                                    f = a.framegrab_url,
                                    l(f)
                                }
                            })
                },
                e.prototype.stop = function () {
                    this._core.trigger("stop", null, "video"),
                    this
                        ._playing
                        .find(".owl-video-frame")
                        .remove(),
                    this._playing.removeClass("owl-video-playing"),
                    this._playing = null,
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video")
                },
                e.prototype.play = function (b) {
                    var c,
                        d = a(b.target),
                        e = d.closest("." + this
                            ._core
                            .settings
                            .itemClass),
                        f = this._videos[e.attr("data-video")],
                        g = f.width || "100%",
                        h = f.height || this
                            ._core
                            .$stage
                            .height();
                    this._playing || (
                        this._core.enter("playing"),
                        this._core.trigger("play", null, "video"),
                        e = this._core.items(this._core.relative(e.index())),
                        this._core.reset(e.index()),
                        c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),
                        c.attr("height", h),
                        c.attr("width", g),
                        "youtube" === f.type
                            ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id)
                            : "vimeo" === f.type
                                ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1")
                                : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"),
                        a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),
                        this._playing = e.addClass("owl-video-playing")
                    )
                },
                e.prototype.isInFullScreen = function () {
                    var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
                    return b && a(b).parent().hasClass("owl-video-frame")
                },
                e.prototype.destroy = function () {
                    var a,
                        b;
                    this
                        ._core
                        .$element
                        .off("click.owl.video");
                    for (a in this._handlers) 
                        this
                            ._core
                            .$element
                            .off(a, this._handlers[a]);
                    
                    for (b in Object.getOwnPropertyNames(this)) 
                        "function" != typeof this[b] && (this[b] = null)
                    
                },
                a
                    .fn
                    .owlCarousel
                    .Constructor
                    .Plugins
                    .Video = e
            }(window.Zepto || window.jQuery, window, document),
            function (a, b, c, d) {
                var e = function (b) {
                    this.core = b,
                    this.core.options = a.extend({}, e.Defaults, this.core.options),
                    this.swapping = !0,
                    this.previous = d,
                    this.next = d,
                    this.handlers = {
                        "change.owl.carousel": a.proxy(function (a) {
                            a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
                        }, this),
                        "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
                            a.namespace && (this.swapping = "translated" == a.type)
                        }, this),
                        "translate.owl.carousel": a.proxy(function (a) {
                            a.namespace && this.swapping && (this
                                .core
                                .options
                                .animateOut || this
                                .core
                                .options
                                .animateIn) && this.swap()
                        }, this)
                    },
                    this
                        .core
                        .$element
                        .on(this.handlers)
                };
                e.Defaults = {
                    animateOut: !1,
                    animateIn: !1
                },
                e.prototype.swap = function () {
                    if (1 === this
                            .core
                            .settings
                            .items && a.support.animation && a.support.transition) {
                        this.core.speed(0);
                        var b,
                            c = a.proxy(this.clear, this),
                            d = this
                                .core
                                .$stage
                                .children()
                                .eq(this.previous),
                            e = this
                                .core
                                .$stage
                                .children()
                                .eq(this.next),
                            f = this
                                .core
                                .settings
                                .animateIn,
                            g = this
                                .core
                                .settings
                                .animateOut;
                        this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d
                            .one(a
                                .support
                                .animation
                                .end, c)
                            .css({
                                left: b + "px"
                            })
                            .addClass("animated owl-animated-out")
                            .addClass(g)), f && e
                            .one(a
                                .support
                                .animation
                                .end, c)
                            .addClass("animated owl-animated-in")
                            .addClass(f))
                    }
                },
                e.prototype.clear = function (b) {
                    a(b.target)
                        .css({left: ""})
                        .removeClass("animated owl-animated-out owl-animated-in")
                        .removeClass(this
                            .core
                            .settings
                            .animateIn)
                        .removeClass(this
                            .core
                            .settings
                            .animateOut),
                    this.core.onTransitionEnd()
                },
                e.prototype.destroy = function () {
                    var a,
                        b;
                    for (a in this.handlers) 
                        this
                            .core
                            .$element
                            .off(a, this.handlers[a]);
                    
                    for (b in Object.getOwnPropertyNames(this)) 
                        "function" != typeof this[b] && (this[b] = null)
                    
                },
                a
                    .fn
                    .owlCarousel
                    .Constructor
                    .Plugins
                    .Animate = e
            }(window.Zepto || window.jQuery, window, document),
            function (a, b, c, d) {
                var e = function (b) {
                    this._core = b,
                    this._call = null,
                    this._time = 0,
                    this._timeout = 0,
                    this._paused = !0,
                    this._handlers = {
                        "changed.owl.carousel": a.proxy(function (a) {
                            a.namespace && "settings" === a.property.name
                                ? this
                                    ._core
                                    .settings
                                    .autoplay
                                        ? this.play()
                                        : this.stop()
                                    : a.namespace && "position" === a.property.name && this._paused && (this._time = 0)
                        }, this),
                        "initialized.owl.carousel": a.proxy(function (a) {
                            a.namespace && this
                                ._core
                                .settings
                                .autoplay && this.play()
                        }, this),
                        "play.owl.autoplay": a.proxy(function (a, b, c) {
                            a.namespace && this.play(b, c)
                        }, this),
                        "stop.owl.autoplay": a.proxy(function (a) {
                            a.namespace && this.stop()
                        }, this),
                        "mouseover.owl.autoplay": a.proxy(function () {
                            this
                                ._core
                                .settings
                                .autoplayHoverPause && this._core.is("rotating") && this.pause()
                        }, this),
                        "mouseleave.owl.autoplay": a.proxy(function () {
                            this
                                ._core
                                .settings
                                .autoplayHoverPause && this._core.is("rotating") && this.play()
                        }, this),
                        "touchstart.owl.core": a.proxy(function () {
                            this
                                ._core
                                .settings
                                .autoplayHoverPause && this._core.is("rotating") && this.pause()
                        }, this),
                        "touchend.owl.core": a.proxy(function () {
                            this
                                ._core
                                .settings
                                .autoplayHoverPause && this.play()
                        }, this)
                    },
                    this
                        ._core
                        .$element
                        .on(this._handlers),
                    this._core.options = a.extend({}, e.Defaults, this._core.options)
                };
                e.Defaults = {
                    autoplay: !1,
                    autoplayTimeout: 5e3,
                    autoplayHoverPause: !1,
                    autoplaySpeed: !1
                },
                e.prototype._next = function (d) {
                    this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()),
                    this._core.is("interacting") || c.hidden || this._core.next(d || this
                        ._core
                        .settings
                        .autoplaySpeed)
                },
                e.prototype.read = function () {
                    return(new Date).getTime() - this._time
                },
                e.prototype.play = function (c, d) {
                    var e;
                    this._core.is("rotating") || this._core.enter("rotating"),
                    c = c || this
                        ._core
                        .settings
                        .autoplayTimeout,
                    e = Math.min(this._time % (this._timeout || c), c),
                    this._paused
                        ? (this._time = this.read(), this._paused =! 1)
                        : b.clearTimeout(this._call),
                    this._time += this.read() % c - e,
                    this._timeout = c,
                    this._call = b.setTimeout(a.proxy(this._next, this, d), c - e)
                },
                e.prototype.stop = function () {
                    this._core.is("rotating") && (this._time = 0, this._paused =! 0, b.clearTimeout(this._call), this._core.leave("rotating"))
                },
                e.prototype.pause = function () {
                    this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused =! 0, b.clearTimeout(this._call))
                },
                e.prototype.destroy = function () {
                    var a,
                        b;
                    this.stop();
                    for (a in this._handlers) 
                        this
                            ._core
                            .$element
                            .off(a, this._handlers[a]);
                    
                    for (b in Object.getOwnPropertyNames(this)) 
                        "function" != typeof this[b] && (this[b] = null)
                    
                },
                a
                    .fn
                    .owlCarousel
                    .Constructor
                    .Plugins
                    .autoplay = e
            }(window.Zepto || window.jQuery, window, document),
            function (a, b, c, d) {
                "use strict";
                var e = function (b) {
                    this._core = b,
                    this._initialized = !1,
                    this._pages = [],
                    this._controls = {},
                    this._templates = [],
                    this.$element = this._core.$element,
                    this._overrides = {
                        next: this._core.next,
                        prev: this._core.prev,
                        to: this._core.to
                    },
                    this._handlers = {
                        "prepared.owl.carousel": a.proxy(function (b) {
                            b.namespace && this
                                ._core
                                .settings
                                .dotsData && this._templates.push('<div class="' + this
                                ._core
                                .settings
                                .dotClass + '">' + a(b.content)
                                .find("[data-dot]")
                                .addBack("[data-dot]")
                                .attr("data-dot") + "</div>")
                        }, this),
                        "added.owl.carousel": a.proxy(function (a) {
                            a.namespace && this
                                ._core
                                .settings
                                .dotsData && this._templates.splice(a.position, 0, this._templates.pop())
                        }, this),
                        "remove.owl.carousel": a.proxy(function (a) {
                            a.namespace && this
                                ._core
                                .settings
                                .dotsData && this._templates.splice(a.position, 1)
                        }, this),
                        "changed.owl.carousel": a.proxy(function (a) {
                            a.namespace && "position" == a.property.name && this.draw()
                        }, this),
                        "initialized.owl.carousel": a.proxy(function (a) {
                            a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized =! 0, this._core.trigger("initialized", null, "navigation"))
                        }, this),
                        "refreshed.owl.carousel": a.proxy(function (a) {
                            a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
                        }, this)
                    },
                    this._core.options = a.extend({}, e.Defaults, this._core.options),
                    this.$element.on(this._handlers)
                };
                e.Defaults = {
                    nav: !1,
                    navText: [
                        '<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'
                    ],
                    navSpeed: !1,
                    navElement: 'button type="button" role="presentation"',
                    navContainer: !1,
                    navContainerClass: "owl-nav",
                    navClass: [
                        "owl-prev", "owl-next"
                    ],
                    slideBy: 1,
                    dotClass: "owl-dot",
                    dotsClass: "owl-dots",
                    dots: !0,
                    dotsEach: !1,
                    dotsData: !1,
                    dotsSpeed: !1,
                    dotsContainer: !1
                },
                e.prototype.initialize = function () {
                    var b,
                        c = this._core.settings;
                    this._controls.$relative = (
                        c.navContainer
                            ? a(c.navContainer)
                            : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)
                    ).addClass("disabled"),
                    this._controls.$previous = a("<" + c.navElement + ">")
                        .addClass(c.navClass[0])
                        .html(c.navText[0])
                        .prependTo(this._controls.$relative)
                        .on("click", a.proxy(function (a) {
                            this.prev(c.navSpeed)
                        }, this)),
                    this._controls.$next = a("<" + c.navElement + ">")
                        .addClass(c.navClass[1])
                        .html(c.navText[1])
                        .appendTo(this._controls.$relative)
                        .on("click", a.proxy(function (a) {
                            this.next(c.navSpeed)
                        }, this)),
                    c.dotsData || (this._templates =[a('<button role="button">')
                            .addClass(c.dotClass)
                            .append(a("<span>"))
                            .prop("outerHTML")]),
                    this._controls.$absolute = (
                        c.dotsContainer
                            ? a(c.dotsContainer)
                            : a("<div>").addClass(c.dotsClass).appendTo(this.$element)
                    ).addClass("disabled"),
                    this
                        ._controls
                        .$absolute
                        .on("click", "button", a.proxy(function (b) {
                            var d = a(b.target).parent().is(this._controls.$absolute)
                                ? a(b.target).index()
                                : a(b.target).parent().index();
                            b.preventDefault(),
                            this.to(d, c.dotsSpeed)
                        }, this));
                    for (b in this._overrides) 
                        this._core[b] = a.proxy(this[b], this)
                    
                },
                e.prototype.destroy = function () {
                    var a,
                        b,
                        c,
                        d,
                        e;
                    e = this._core.settings;
                    for (a in this._handlers) 
                        this.$element.off(a, this._handlers[a]);
                    
                    for (b in this._controls) 
                        "$relative" === b && e.navContainer
                            ? this._controls[b].html("")
                            : this._controls[b].remove();
                    
                    for (d in this.overides) 
                        this._core[d] = this._overrides[d];
                    
                    for (c in Object.getOwnPropertyNames(this)) 
                        "function" != typeof this[c] && (this[c] = null)
                    
                },
                e.prototype.update = function () {
                    var a,
                        b,
                        c,
                        d = this
                            ._core
                            .clones()
                            .length / 2,
                        e = d + this
                            ._core
                            .items()
                            .length,
                        f = this._core.maximum(!0),
                        g = this._core.settings,
                        h = g.center || g.autoWidth || g.dotsData
                            ? 1
                            : g.dotsEach || g.items;
                    if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) 
                        for (this._pages =[], a = d, b = 0, c = 0; a < e; a++) {
                            if (b >= h || 0 === b) {
                                if (this._pages.push({
                                    start: Math.min(f, a - d),
                                    end: a - d + h - 1
                                }), Math.min(f, a - d) === f) 
                                    break;
                                
                                b = 0,
                                ++ c
                            }
                            b += this._core.mergers(this._core.relative(a))
                        }
                    
                },
                e.prototype.draw = function () {
                        var b,
                        c = this._core.settings,
                        d = this
                                ._core
                                .items()
                                .length<=c.items, e=this._core.relative(this._core.current()), f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled", !c.nav||d), c.nav&&(this._controls.$previous.toggleClass("disabled", !f&&e<=this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f&&e>=this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots||d), c.dots&&(b=this._pages.length-this._controls.$absolute.children().length, c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b> 0
                                    ? this
                                        ._controls
                                        .$absolute
                                        .append(new Array(b + 1).join(this._templates[0]))
                                    : b < 0 && this
                                        ._controls
                                        .$absolute
                                        .children()
                                        .slice(b)
                                        .remove(),
                        this
                                ._controls
                                .$absolute
                                .find(".active")
                                .removeClass("active"),
                        this
                                ._controls
                                .$absolute
                                .children()
                                .eq(a.inArray(this.current(), this._pages))
                                .addClass("active")
                    )
                },
                e.prototype.onTrigger = function (b) {
                    var c = this._core.settings;
                    b.page = {
                        index: a.inArray(this.current(), this._pages),
                        count: this._pages.length,
                        size: c && (
                            c.center || c.autoWidth || c.dotsData
                                ? 1
                                : c.dotsEach || c.items
                        )
                    }
                },
                e.prototype.current = function () {
                    var b = this._core.relative(this._core.current());
                    return a.grep(this._pages, a.proxy(function (a, c) {
                        return a.start <= b&&a.end >= b
                    }, this)).pop()
                },
                e.prototype.getPosition = function (b) {
                    var c,
                        d,
                        e = this._core.settings;
                    return "page" == e.slideBy
                        ? (
                            c = a.inArray(this.current(), this._pages),
                            d = this._pages.length,
                            b
                                ? ++ c
                                : -- c,
                            c = this._pages[(c % d + d) % d].start
                        )
                        : (
                                c = this._core.relative(this._core.current()),
                                d = this
                                    ._core
                                    .items()
                                    .length,
                                b
                                    ? c += e.slideBy
                                    : c -= e.slideBy
                            ),
                    c
                },
                e.prototype.next = function (b) {
                    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
                },
                e.prototype.prev = function (b) {
                    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
                },
                e.prototype.to = function (b, c, d) {
                    var e;
                    ! d && this._pages.length
                        ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
                        : a.proxy(this._overrides.to, this._core)(b, c)
                },
                a
                    .fn
                    .owlCarousel
                    .Constructor
                    .Plugins
                    .Navigation = e
            }(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
                "use strict";
                var e = function (c) {
                    this._core = c,
                    this._hashes = {},
                    this.$element = this._core.$element,
                    this._handlers = {
                        "initialized.owl.carousel": a.proxy(function (c) {
                            c.namespace && "URLHash" === this
                                ._core
                                .settings
                                .startPosition && a(b).trigger("hashchange.owl.navigation")
                        }, this),
                        "prepared.owl.carousel": a.proxy(function (b) {
                            if (b.namespace) {
                                var c = a(b.content)
                                    .find("[data-hash]")
                                    .addBack("[data-hash]")
                                    .attr("data-hash");
                                if (! c) 
                                    return;
                                
                                this._hashes[c] = b.content
                            }
                        }, this),
                        "changed.owl.carousel": a.proxy(function (c) {
                            if (c.namespace && "position" === c.property.name) {
                                var d = this._core.items(this._core.relative(this._core.current())),
                                    e = a.map(this._hashes, function (a, b) {
                                        return a === d
                                            ? b
                                            : null
                                    }).join();
                                if (! e || b
                                        .location
                                        .hash
                                        .slice(1) === e) 
                                    return;
                                
                                b.location.hash = e
                            }
                        }, this)
                    },
                    this._core.options = a.extend({}, e.Defaults, this._core.options),
                    this.$element.on(this._handlers),
                    a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
                        var c = b
                                .location
                                .hash
                                .substring(1),
                            e = this
                                ._core
                                .$stage
                                .children(),
                            f = this._hashes[c] && e.index(this._hashes[c]);
                        f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0)
                    }, this))
                };
                e.Defaults = {
                    URLhashListener: !1
                },
                e.prototype.destroy = function () {
                    var c,
                        d;
                    a(b).off("hashchange.owl.navigation");
                    for (c in this._handlers) 
                        this
                            ._core
                            .$element
                            .off(c, this._handlers[c]);
                    
                    for (d in Object.getOwnPropertyNames(this)) 
                        "function" != typeof this[d] && (this[d] = null)
                    
                },
                a
                    .fn
                    .owlCarousel
                    .Constructor
                    .Plugins
                    .Hash = e
            }(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
                function e(b, c) {
                    var e = !1,
                        f = b.charAt(0).toUpperCase() + b.slice(1);
                    return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
                        if (g[b] !== d) 
                            return e = ! c || b,
                            !1
                        
                    }),
                    e
                }
                function f(a) {
                    return e(a, !0)
                }
                var g = a("<support>").get(0).style,
                    h = "Webkit Moz O ms".split(" "),
                    i = {
                        transition: {
                            end: {
                                WebkitTransition: "webkitTransitionEnd",
                                MozTransition: "transitionend",
                                OTransition: "oTransitionEnd",
                                transition: "transitionend"
                            }
                        },
                        animation: {
                            end: {
                                WebkitAnimation: "webkitAnimationEnd",
                                MozAnimation: "animationend",
                                OAnimation: "oAnimationEnd",
                                animation: "animationend"
                            }
                        }
                    },
                    j = {
                        csstransforms: function () {
                            return !! e("transform")
                        },
                        csstransforms3d: function () {
                            return !! e("perspective")
                        },
                        csstransitions: function () {
                            return !! e("transition")
                        },
                        cssanimations: function () {
                            return !! e("animation")
                        }
                    };
                j.csstransitions() && (a.support.transition = new String(f("transition")), a
                    .support
                    .transition
                    .end = i.transition.end[a.support.transition]),
                j.cssanimations() && (a.support.animation = new String(f("animation")), a
                    .support
                    .animation
                    .end = i.animation.end[a.support.animation]),
                j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d())
            }(window.Zepto || window.jQuery, window, document);
            !function (t, e) {
                "object" == typeof exports && "object" == typeof module
                    ? module.exports = e()
                    : "function" == typeof define && define.amd
                        ? define("Barba", [], e)
                        : "object" == typeof exports
                            ? exports.Barba = e()
                            : t.Barba = e()
            }(this, function () {
                return function (t) {
                    function e(r) {
                        if (n[r]) 
                            return n[r].exports;
                        
                        var i = n[r] = {
                            exports: {},
                            id: r,
                            loaded: !1
                        };
                        return t[r].call(i.exports, i, i.exports, e),
                        i.loaded = !0,
                        i.exports
                    }
                    var n = {};
                    return e.m = t,
                    e.c = n,
                    e.p = "http://localhost:8080/dist",
                    e(0)
                }([
                    function (t, e, n) {
                        "function" != typeof Promise && (window.Promise = n(1));
                        var r = {
                            version: "1.0.0",
                            BaseTransition: n(4),
                            BaseView: n(6),
                            BaseCache: n(8),
                            Dispatcher: n(7),
                            HistoryManager: n(9),
                            Pjax: n(10),
                            Prefetch: n(13),
                            Utils: n(5)
                        };
                        t.exports = r
                    },
                    function (t, e, n) {
                        (function (e) {
                            !function (n) {
                                function r() {}
                                function i(t, e) {
                                    return function () {
                                        t.apply(e, arguments)
                                    }
                                }
                                function o(t) {
                                    if ("object" != typeof this) 
                                        throw new TypeError("Promises must be constructed via new");
                                    
                                    if ("function" != typeof t) 
                                        throw new TypeError("not a function");
                                    
                                    this._state = 0,
                                    this._handled = !1,
                                    this._value = void 0,
                                    this._deferreds = [],
                                    h(t, this)
                                }
                                function s(t, e) {
                                    for (; 3 === t._state;) 
                                        t = t._value;
                                    
                                    return 0 === t._state
                                        ? void t._deferreds.push(e)
                                        : (t._handled =! 0, void l(function () {
                                            var n = 1 === t._state
                                                ? e.onFulfilled
                                                : e.onRejected;
                                            if (null === n) 
                                                return void(
                                                    1 === t._state
                                                        ? a
                                                        : c
                                                )(e.promise, t._value);
                                            
                                            var r;
                                            try {
                                                r = n(t._value)
                                            } catch (t) {
                                                return void c(e.promise, t)
                                            }
                                            a(e.promise, r)
                                        }))
                                }
                                function a(t, e) {
                                    try {
                                        if (e === t) 
                                            throw new TypeError("A promise cannot be resolved with itself.");
                                        
                                        if (e && ("object" == typeof e || "function" == typeof e)) {
                                            var n = e.then;
                                            if (e instanceof o) 
                                                return t._state = 3,
                                                t._value = e,
                                                void u(t);
                                            
                                            if ("function" == typeof n) 
                                                return void h(i(n, e), t)
                                            
                                        }
                                        t._state = 1,
                                        t._value = e,
                                        u(t)
                                    } catch (e) {
                                        c(t, e)
                                    }
                                }
                                function c(t, e) {
                                    t._state = 2,
                                    t._value = e,
                                    u(t)
                                }
                                function u(t) {
                                    2 === t._state && 0 === t._deferreds.length && l(function () {
                                        t._handled || p(t._value)
                                    });
                                    for (var e = 0, n = t._deferreds.length; e < n; e++) 
                                        s(t, t._deferreds[e]);
                                    
                                    t._deferreds = null
                                }
                                function f(t, e, n) {
                                    this.onFulfilled = "function" == typeof t
                                        ? t
                                        : null,
                                    this.onRejected = "function" == typeof e
                                        ? e
                                        : null,
                                    this.promise = n
                                }
                                function h(t, e) {
                                    var n = !1;
                                    try {
                                        t(function (t) {
                                            n || (n =! 0, a(e, t))
                                        }, function (t) {
                                            n || (n =! 0, c(e, t))
                                        })
                                    } catch (t) {
                                        if (n) 
                                            return;
                                        
                                        n = !0,
                                        c(e, t)
                                    }
                                }
                                var d = setTimeout,
                                    l = "function" == typeof e && e || function (t) {
                                        d(t, 0)
                                    },
                                    p = function (t) {
                                        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
                                    };
                                o.prototype.catch = function (t) {
                                    return this.then(null, t)
                                },
                                o.prototype.then = function (t, e) {
                                    var n = new this.constructor(r);
                                    return s(this, new f(t, e, n)),
                                    n
                                },
                                o.all = function (t) {
                                    var e = Array
                                        .prototype
                                        .slice
                                        .call(t);
                                    return new o(function (t, n) {
                                        function r(o, s) {
                                            try {
                                                if (s && ("object" == typeof s || "function" == typeof s)) {
                                                    var a = s.then;
                                                    if ("function" == typeof a) 
                                                        return void a.call(s, function (t) {
                                                            r(o, t)
                                                        }, n)
                                                    
                                                }
                                                e[o] = s,
                                                0 === -- i && t(e)
                                            } catch (t) {
                                                n(t)
                                            }
                                        }
                                        if (0 === e.length) 
                                            return t([]);
                                        
                                        for (var i = e.length, o = 0; o < e.length; o++) 
                                            r(o, e[o])
                                        
                                    })
                                },
                                o.resolve = function (t) {
                                    return t && "object" == typeof t && t.constructor === o
                                        ? t
                                        : new o(function (e) {
                                            e(t)
                                        })
                                },
                                o.reject = function (t) {
                                    return new o(function (e, n) {
                                        n(t)
                                    })
                                },
                                o.race = function (t) {
                                    return new o(function (e, n) {
                                        for (var r = 0, i = t.length; r < i; r++) 
                                            t[r].then(e, n)
                                        
                                    })
                                },
                                o._setImmediateFn = function (t) {
                                    l = t
                                },
                                o._setUnhandledRejectionFn = function (t) {
                                    p = t
                                },
                                "undefined" != typeof t && t.exports
                                    ? t.exports = o
                                    : n.Promise || (n.Promise = o)
                            }(this)
                        }).call(e, n(2).setImmediate)
                    },
                    function (t, e, n) {
                        (function (t, r) {
                            function i(t, e) {
                                this._id = t,
                                this._clearFn = e
                            }
                            var o = n(3).nextTick,
                                s = Function.prototype.apply,
                                a = Array.prototype.slice,
                                c = {},
                                u = 0;
                            e.setTimeout = function () {
                                return new i(s.call(setTimeout, window, arguments), clearTimeout)
                            },
                            e.setInterval = function () {
                                return new i(s.call(setInterval, window, arguments), clearInterval)
                            },
                            e.clearTimeout = e.clearInterval = function (t) {
                                t.close()
                            },
                            i.prototype.unref = i.prototype.ref = function () {},
                            i.prototype.close = function () {
                                this._clearFn.call(window, this._id)
                            },
                            e.enroll = function (t, e) {
                                clearTimeout(t._idleTimeoutId),
                                t._idleTimeout = e
                            },
                            e.unenroll = function (t) {
                                clearTimeout(t._idleTimeoutId),
                                t._idleTimeout = -1
                            },
                            e._unrefActive = e.active = function (t) {
                                clearTimeout(t._idleTimeoutId);
                                var e = t._idleTimeout;
                                e >= 0 && (t._idleTimeoutId = setTimeout(function () {
                                    t._onTimeout && t._onTimeout()
                                }, e))
                            },
                            e.setImmediate = "function" == typeof t
                                ? t
                                : function (t) {
                                    var n = u++,
                                        r = !(arguments.length < 2) && a.call(arguments, 1);
                                    return c[n] = !0,
                                    o(function () {
                                        c[n] && (
                                            r
                                                ? t.apply(null, r)
                                                : t.call(null),
                                            e.clearImmediate(n)
                                        )
                                    }),
                                    n
                                },
                            e.clearImmediate = "function" == typeof r
                                ? r
                                : function (t) {
                                    delete c[t]
                                }
                        }).call(e, n(2).setImmediate, n(2).clearImmediate)
                    },
                    function (t, e) {
                        function n() {
                            h && u && (
                                h =! 1,
                                u.length
                                    ? f = u.concat(f)
                                    : d = -1,
                                f.length && r()
                            )
                        }
                        function r() {
                            if (! h) {
                                var t = s(n);
                                h = !0;
                                for (var e = f.length; e;) {
                                    for (u = f, f =[]; ++ d < e;) 
                                        u && u[d].run();
                                    
                                    d = -1,
                                    e = f.length
                                }
                                u = null,
                                h = !1,
                                a(t)
                            }
                        }
                        function i(t, e) {
                            this.fun = t,
                            this.array = e
                        }
                        function o() {}
                        var s,
                            a,
                            c = t.exports = {};
                        !function () {
                            try {
                                s = setTimeout
                            } catch (t) {
                                s = function () {
                                    throw new Error("setTimeout is not defined")
                                }
                            }
                            try {
                                a = clearTimeout
                            } catch (t) {
                                a = function () {
                                    throw new Error("clearTimeout is not defined")
                                }
                            }
                        }();
                        var u,
                            f = [],
                            h = !1,
                            d = -1;
                        c.nextTick = function (t) {
                            var e = new Array(arguments.length - 1);
                            if (arguments.length > 1) 
                                for (var n = 1; n < arguments.length; n++) 
                                    e[n - 1] = arguments[n];
                                
                            
                            f.push(new i(t, e)),
                            1 !== f.length || h || s(r, 0)
                        },
                        i.prototype.run = function () {
                            this.fun.apply(null, this.array)
                        },
                        c.title = "browser",
                        c.browser = !0,
                        c.env = {},
                        c.argv = [],
                        c.version = "",
                        c.versions = {},
                        c.on = o,
                        c.addListener = o,
                        c.once = o,
                        c.off = o,
                        c.removeListener = o,
                        c.removeAllListeners = o,
                        c.emit = o,
                        c.binding = function (t) {
                            throw new Error("process.binding is not supported")
                        },
                        c.cwd = function () {
                            return "/"
                        },
                        c.chdir = function (t) {
                            throw new Error("process.chdir is not supported")
                        },
                        c.umask = function () {
                            return 0
                        }
                    },
                    function (t, e, n) {
                        var r = n(5),
                            i = {
                                oldContainer: void 0,
                                newContainer: void 0,
                                newContainerLoading: void 0,
                                extend: function (t) {
                                    return r.extend(this, t)
                                },
                                init: function (t, e) {
                                    var n = this;
                                    return this.oldContainer = t,
                                    this._newContainerPromise = e,
                                    this.deferred = r.deferred(),
                                    this.newContainerReady = r.deferred(),
                                    this.newContainerLoading = this.newContainerReady.promise,
                                    this.start(),
                                    this._newContainerPromise.then(function (t) {
                                        n.newContainer = t,
                                        n.newContainerReady.resolve()
                                    }),
                                    this.deferred.promise
                                },
                                done: function () {
                                    this
                                        .oldContainer
                                        .parentNode
                                        .removeChild(this.oldContainer),
                                    this
                                        .newContainer
                                        .style
                                        .visibility = "visible",
                                    this.deferred.resolve()
                                },
                                start: function () {}
                            };
                        t.exports = i
                    },

					
                    function (t, e) {
                        var n = {
                            getCurrentUrl: function () {
                                return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
                            },
                            cleanLink: function (t) {
                                return t.replace(/#.*/, "")
                            },
                            xhrTimeout: 5e3,
                            xhr: function (t) {
                                var e = this.deferred(),
                                    n = new XMLHttpRequest;
                                return n.onreadystatechange = function () {
                                    if (4 === n.readyState) 
                                        return 200 === n.status
                                            ? e.resolve(n.responseText)
                                            : e.reject(new Error("xhr: HTTP code is not 200"))
                                    
                                },
                                n.ontimeout = function () {
                                    return e.reject(new Error("xhr: Timeout exceeded"))
                                },
                                n.open("GET", t),
                                n.timeout = this.xhrTimeout,
                                n.setRequestHeader("x-barba", "yes"),
                                n.send(),
                                e.promise
                            },
                            extend: function (t, e) {
                                var n = Object.create(t);
                                for (var r in e) 
                                    e.hasOwnProperty(r) && (n[r] = e[r]);
                                
                                return n
                            },
                            deferred: function () {
                                return new function () {
                                    this.resolve = null,
                                    this.reject = null,
                                    this.promise = new Promise(function (t, e) {
                                        this.resolve = t,
                                        this.reject = e
                                    }.bind(this))
                                }
                            },
                            getPort: function (t) {
                                var e = "undefined" != typeof t
                                        ? t
                                        : window.location.port,
                                    n = window.location.protocol;
                                return "" != e
                                    ? parseInt(e)
                                    : "http:" === n
                                        ? 80
                                        : "https:" === n
                                            ? 443
                                            : void 0
                            }
                        };
                        t.exports = n
                    },
                    function (t, e, n) {
                        var r = n(7),
                            i = n(5),
                            o = {
                                namespace: null,
                                extend: function (t) {
                                    return i.extend(this, t)
                                },
                                init: function () {
                                    var t = this;
                                    r.on("initStateChange", function (e, n) {
                                        n && n.namespace === t.namespace && t.onLeave()
                                    }),
                                    r.on("newPageReady", function (e, n, r) {
                                        t.container = r,
                                        e.namespace === t.namespace && t.onEnter()
                                    }),
                                    r.on("transitionCompleted", function (e, n) {
                                        e.namespace === t.namespace && t.onEnterCompleted(),
                                        n && n.namespace === t.namespace && t.onLeaveCompleted()
                                    })
                                },
                                onEnter: function () {},
                                onEnterCompleted: function () {},
                                onLeave: function () {},
                                onLeaveCompleted: function () {}
                            };
                        t.exports = o
                    },
                    function (t, e) {
                        var n = {
                            events: {},
                            on: function (t, e) {
                                this.events[t] = this.events[t] || [],
                                this.events[t].push(e)
                            },
                            off: function (t, e) {
                                t in this.events != !1 && this.events[t].splice(this.events[t].indexOf(e), 1)
                            },
                            trigger: function (t) {
                                if (t in this.events != !1) 
                                    for (var e = 0; e < this.events[t].length; e++) 
                                        this.events[t][e].apply(this, Array
                                            .prototype
                                            .slice
                                            .call(arguments, 1))
                                    
                                
                            }
                        };
                        t.exports = n
                    },
                    function (t, e, n) {
                        var r = n(5),
                            i = {
                                data: {},
                                extend: function (t) {
                                    return r.extend(this, t)
                                },
                                set: function (t, e) {
                                    this.data[t] = e
                                },
                                get: function (t) {
                                    return this.data[t]
                                },
                                reset: function () {
                                    this.data = {}
                                }
                            };
                        t.exports = i
                    },
                    function (t, e) {
                        var n = {
                            history: [],
                            add: function (t, e) {
                                e || (e = void 0),
                                this.history.push({url: t, namespace: e})
                            },
                            currentStatus: function () {
                                return this.history[this.history.length - 1]
                            },
                            prevStatus: function () {
                                var t = this.history;
                                return t.length < 2
                                    ? null
                                    : t[t.length - 2]
                            }
                        };
                        t.exports = n
                    },
                    function (t, e, n) {
                        var r = n(5),
                            i = n(7),
                            o = n(11),
                            s = n(8),
                            a = n(9),
                            c = n(12),
                            u = {
                                Dom: c,
                                History: a,
                                Cache: s,
                                cacheEnabled: !0,
                                transitionProgress: !1,
                                ignoreClassLink: "no-barba",
                                start: function () {
                                    this.init()
                                },
                                init: function () {
                                    var t = this.Dom.getContainer(),
                                        e = this.Dom.getWrapper();
                                    e.setAttribute("aria-live", "polite"),
                                    this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(t)),
                                    i.trigger("initStateChange", this.History.currentStatus()),
                                    i.trigger("newPageReady", this.History.currentStatus(), {}, t, this.Dom.currentHTML),
                                    i.trigger("transitionCompleted", this.History.currentStatus()),
                                    this.bindEvents()
                                },
                                bindEvents: function () {
                                    document.addEventListener("click", this.onLinkClick.bind(this)),
                                    window.addEventListener("popstate", this.onStateChange.bind(this))
                                },
                                getCurrentUrl: function () {
                                    return r.cleanLink(r.getCurrentUrl())
                                },
                                goTo: function (t) {
                                    window.history.pushState(null, null, t),
                                    this.onStateChange()
                                },
                                forceGoTo: function (t) {
                                    window.location = t
                                },
                                load: function (t) {
                                    var e,
                                        n = r.deferred(),
                                        i = this;
                                    return e = this.Cache.get(t),
                                    e || (e = r.xhr(t), this.Cache.set(t, e)),
                                    e.then(function (t) {
                                        var e = i.Dom.parseResponse(t);
                                        i.Dom.putContainer(e),
                                        i.cacheEnabled || i.Cache.reset(),
                                        n.resolve(e)
                                    }, function () {
                                        i.forceGoTo(t),
                                        n.reject()
                                    }),
                                    n.promise
                                },
                                getHref: function (t) {
                                    if (t) 
                                        return t.getAttribute && "string" == typeof t.getAttribute("xlink:href")
                                            ? t.getAttribute("xlink:href")
                                            : "string" == typeof t.href
                                                ? t.href
                                                : void 0
                                    
                                },
                                onLinkClick: function (t) {
                                    for (var e = t.target; e && !this.getHref(e);) 
                                        e = e.parentNode;
                                    
                                    if (this.preventCheck(t, e)) {
                                        t.stopPropagation(),
                                        t.preventDefault(),
                                        i.trigger("linkClicked", e, t);
                                        var n = this.getHref(e);
                                        this.goTo(n)
                                    }
                                },
                                preventCheck: function (t, e) {
                                    if (!window.history.pushState) 
                                        return !1;
                                    
                                    var n = this.getHref(e);
                                    return !(! e || ! n) && (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) && ((! e.target || "_blank" !== e.target) && (window.location.protocol === e.protocol && window.location.hostname === e.hostname && (r.getPort() === r.getPort(e.port) && (!(n.indexOf("#") > -1) && ((! e.getAttribute || "string" != typeof e.getAttribute("download")) && (r.cleanLink(n) != r.cleanLink(location.href) && ! e.classList.contains(this.ignoreClassLink))))))))
                                },
                                getTransition: function () {
                                    return o
                                },
                                onStateChange: function () {
                                    var t = this.getCurrentUrl();
                                    if (this.transitionProgress && this.forceGoTo(t), this
                                            .History
                                            .currentStatus()
                                            .url === t) 
                                        return !1;
                                    
                                    this.History.add(t);
                                    var e = this.load(t),
                                        n = Object.create(this.getTransition());
                                    this.transitionProgress = !0,
                                    i.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                                    var r = n.init(this.Dom.getContainer(), e);
                                    e.then(this.onNewContainerLoaded.bind(this)),
                                    r.then(this.onTransitionEnd.bind(this))
                                },
                                onNewContainerLoaded: function (t) {
                                    var e = this.History.currentStatus();
                                    e.namespace = this.Dom.getNamespace(t),
                                    i.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), t, this.Dom.currentHTML)
                                },
                                onTransitionEnd: function () {
                                    this.transitionProgress = !1,
                                    i.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
                                }
                            };
                        t.exports = u
                    },
                    function (t, e, n) {
                        var r = n(4),
                            i = r.extend({
                                start: function () {
                                    this.newContainerLoading.then(this.finish.bind(this))
                                },
                                finish: function () {
                                    document.body.scrollTop = 0,
                                    this.done()
                                }
                            });
                        t.exports = i
                    },
                    function (t, e) {
                        var n = {
                            dataNamespace: "namespace",
                            wrapperId: "barba-wrapper",
                            containerClass: "barba-container",
                            currentHTML: document.documentElement.innerHTML,
                            parseResponse: function (t) {
                                this.currentHTML = t;
                                var e = document.createElement("div");
                                e.innerHTML = t;
                                var n = e.querySelector("title");
                                return n && (document.title = n.textContent),
                                this.getContainer(e)
                            },
                            getWrapper: function () {
                                var t = document.getElementById(this.wrapperId);
                                if (! t) 
                                    throw new Error("Barba.js: wrapper not found!");
                                
                                return t
                            },
                            getContainer: function (t) {
                                if (t || (t = document.body), ! t) 
                                    throw new Error("Barba.js: DOM not ready!");
                                
                                var e = this.parseContainer(t);
                                if (e && e.jquery && (e = e[0]), ! e) 
                                    throw new Error("Barba.js: no container found");
                                
                                return e
                            },
                            getNamespace: function (t) {
                                return t && t.dataset
                                    ? t.dataset[this.dataNamespace]
                                    : t
                                        ? t.getAttribute("data-" + this.dataNamespace)
                                        : null
                            },
                            putContainer: function (t) {
                                t.style.visibility = "hidden";
                                var e = this.getWrapper();
                                e.appendChild(t)
                            },
                            parseContainer: function (t) {
                                return t.querySelector("." + this.containerClass)
                            }
                        };
                        t.exports = n
                    },
                    function (t, e, n) {
                        var r = n(5),
                            i = n(10),
                            o = {
                                ignoreClassLink: "no-barba-prefetch",
                                init: function () {
                                    return !!window.history.pushState && (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)))
                                },
                                onLinkEnter: function (t) {
                                    for (var e = t.target; e && ! i.getHref(e);) 
                                        e = e.parentNode;
                                    
                                    if (e && ! e.classList.contains(this.ignoreClassLink)) {
                                        var n = i.getHref(e);
                                        if (i.preventCheck(t, e) && ! i.Cache.get(n)) {
                                            var o = r.xhr(n);
                                            i.Cache.set(n, o)
                                        }
                                    }
                                }
                            };
                        t.exports = o
                    }
                ])
            });









!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){function u(t,e,o){var n,s="$()."+i+'("'+e+'")';return t.each(function(t,u){var h=a.data(u,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+s);var d=h[e];if(!d||"_"==e.charAt(0))return void r(s+" is not a valid method");var l=d.apply(h,o);n=void 0===n?l:n}),void 0!==n?n:t}function h(t,e){t.each(function(t,o){var n=a.data(o,i);n?(n.option(e),n._init()):(n=new s(o,e),a.data(o,i,n))})}a=a||e||t.jQuery,a&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=n.call(arguments,1);return u(this,t,e)}return h(this,t),this},o(a))}function o(t){!t||t&&t.bridget||(t.bridget=i)}var n=Array.prototype.slice,s=t.console,r="undefined"==typeof s?function(){}:function(t){s.error(t)};return o(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},o=i[t]=i[t]||[];return o.indexOf(e)==-1&&o.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},o=i[t]=i[t]||{};return o[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var o=i.indexOf(e);return o!=-1&&i.splice(o,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var o=this._onceEvents&&this._onceEvents[t],n=0;n<i.length;n++){var s=i[n],r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=u[e];t[i]=0}return t}function o(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function n(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var n=o(e);r=200==Math.round(t(n.width)),s.isBoxSizeOuter=r,i.removeChild(e)}}function s(e){if(n(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var s=o(e);if("none"==s.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==s.boxSizing,l=0;l<h;l++){var f=u[l],c=s[f],m=parseFloat(c);a[f]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,y=a.paddingTop+a.paddingBottom,g=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,I=d&&r,x=t(s.width);x!==!1&&(a.width=x+(I?0:p+_));var S=t(s.height);return S!==!1&&(a.height=S+(I?0:y+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(y+z),a.outerWidth=a.width+g,a.outerHeight=a.height+v,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},u=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=u.length,d=!1;return s}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var o=e[i],n=o+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var o=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?o.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,o){t=i.makeArray(t);var n=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!o)return void n.push(t);e(t,o)&&n.push(t);for(var i=t.querySelectorAll(o),s=0;s<i.length;s++)n.push(i[s])}}),n},i.debounceMethod=function(t,e,i){i=i||100;var o=t.prototype[e],n=e+"Timeout";t.prototype[e]=function(){var t=this[n];clearTimeout(t);var e=arguments,s=this;this[n]=setTimeout(function(){o.apply(s,e),delete s[n]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var s=i.toDashed(o),r="data-"+s,a=document.querySelectorAll("["+r+"]"),u=document.querySelectorAll(".js-"+s),h=i.makeArray(a).concat(i.makeArray(u)),d=r+"-options",l=t.jQuery;h.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(d);try{i=s&&JSON.parse(s)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var u=new e(t,i);l&&l.data(t,o,u)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function o(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function n(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var s=document.documentElement.style,r="string"==typeof s.transition?"transition":"WebkitTransition",a="string"==typeof s.transform?"transform":"WebkitTransform",u={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[r],h={transform:a,transition:r,transitionDuration:r+"Duration",transitionProperty:r+"Property",transitionDelay:r+"Delay"},d=o.prototype=Object.create(t.prototype);d.constructor=o,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var o=h[i]||i;e[o]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),o=t[e?"left":"right"],n=t[i?"top":"bottom"],s=parseFloat(o),r=parseFloat(n),a=this.layout.size;o.indexOf("%")!=-1&&(s=s/100*a.width),n.indexOf("%")!=-1&&(r=r/100*a.height),s=isNaN(s)?0:s,r=isNaN(r)?0:r,s-=e?a.paddingLeft:a.paddingRight,r-=i?a.paddingTop:a.paddingBottom,this.position.x=s,this.position.y=r},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop"),n=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[n];e[s]=this.getXValue(a),e[r]="";var u=o?"paddingTop":"paddingBottom",h=o?"top":"bottom",d=o?"bottom":"top",l=this.position.y+t[u];e[h]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),n&&!this.isTransitioning)return void this.layoutPosition();var s=t-i,r=e-o,a={};a.transform=this.getTranslate(s,r),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),o=this.layout._getOption("originTop");return t=i?t:-t,e=o?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+n(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(u,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var f={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=f[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(u,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var c={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(c)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return r&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,o,n,s){return e(t,i,o,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,o,n){"use strict";function s(t,e){var i=o.getQueryElement(t);if(!i)return void(u&&u.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,h&&(this.$element=h(this.element)),this.options=o.extend({},this.constructor.defaults),this.option(e);var n=++l;this.element.outlayerGUID=n,f[n]=this,this._create();var s=this._getOption("initLayout");s&&this.layout()}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],o=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var n=m[o]||1;return i*n}var u=t.console,h=t.jQuery,d=function(){},l=0,f={};s.namespace="outlayer",s.Item=n,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var c=s.prototype;o.extend(c,e.prototype),c.option=function(t){o.extend(this.options,t)},c._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},c._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),o.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},c.reloadItems=function(){this.items=this._itemize(this.element.children)},c._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0;n<e.length;n++){var s=e[n],r=new i(s,this);o.push(r)}return o},c._filterFindItemElements=function(t){return o.filterFindElements(t,this.options.itemSelector)},c.getItemElements=function(){return this.items.map(function(t){return t.element})},c.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},c._init=c.layout,c._resetLayout=function(){this.getSize()},c.getSize=function(){this.size=i(this.element)},c._getMeasurement=function(t,e){var o,n=this.options[t];n?("string"==typeof n?o=this.element.querySelector(n):n instanceof HTMLElement&&(o=n),this[t]=o?i(o)[e]:n):this[t]=0},c.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},c._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},c._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var o=this._getItemLayoutPosition(t);o.item=t,o.isInstant=e||t.isLayoutInstant,i.push(o)},this),this._processLayoutQueue(i)}},c._getItemLayoutPosition=function(){return{x:0,y:0}},c._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},c.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},c._positionItem=function(t,e,i,o,n){o?t.goTo(e,i):(t.stagger(n*this.stagger),t.moveTo(e,i))},c._postLayout=function(){this.resizeContainer()},c.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},c._getContainerSize=d,c._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},c._emitCompleteOnItems=function(t,e){function i(){n.dispatchEvent(t+"Complete",null,[e])}function o(){r++,r==s&&i()}var n=this,s=e.length;if(!e||!s)return void i();var r=0;e.forEach(function(e){e.once(t,o)})},c.dispatchEvent=function(t,e,i){var o=e?[e].concat(i):i;if(this.emitEvent(t,o),h)if(this.$element=this.$element||h(this.element),e){var n=h.Event(e);n.type=t,this.$element.trigger(n,i)}else this.$element.trigger(t,i)},c.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},c.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},c.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},c.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){o.removeFrom(this.stamps,t),this.unignore(t)},this)},c._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o.makeArray(t)},c._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},c._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},c._manageStamp=d,c._getElementOffset=function(t){var e=t.getBoundingClientRect(),o=this._boundingRect,n=i(t),s={left:e.left-o.left-n.marginLeft,top:e.top-o.top-n.marginTop,right:o.right-e.right-n.marginRight,bottom:o.bottom-e.bottom-n.marginBottom};return s},c.handleEvent=o.handleEvent,c.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},c.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},c.onresize=function(){this.resize()},o.debounceMethod(s,"onresize",100),c.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},c.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},c.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},c.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},c.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},c.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},c.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},c.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},c.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},c.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},c.getItems=function(t){t=o.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},c.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),o.removeFrom(this.items,t)},this)},c.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete f[e],delete this.element.outlayerGUID,h&&h.removeData(this.element,this.constructor.namespace)},s.data=function(t){t=o.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&f[e]},s.create=function(t,e){var i=r(s);return i.defaults=o.extend({},s.defaults),o.extend(i.defaults,e),i.compatOptions=o.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(n),o.htmlInit(i,t),h&&h.bridget&&h.bridget(t,i),i};var m={ms:1,s:1e3};return s.Item=n,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),o=i._create;i._create=function(){this.id=this.layout.itemGUID++,o.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var n=i.destroy;return i.destroy=function(){n.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var o=i.prototype,n=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"];return n.forEach(function(t){o[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),o.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!=this.isotope.size.innerHeight},o._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},o.getColumnWidth=function(){this.getSegmentSize("column","Width")},o.getRowHeight=function(){this.getSegmentSize("row","Height")},o.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},o.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},o.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},o.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function n(){i.apply(this,arguments)}return n.prototype=Object.create(o),n.prototype.constructor=n,e&&(n.options=e),n.prototype.namespace=t,i.modes[t]=n,n},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry-layout/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var o=i.prototype;return o._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},o.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var o=this.columnWidth+=this.gutter,n=this.containerWidth+this.gutter,s=n/o,r=o-n%o,a=r&&r<1?"round":"floor";s=Math[a](s),this.cols=Math.max(s,1)},o.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,o=e(i);this.containerWidth=o&&o.innerWidth},o._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&e<1?"round":"ceil",o=Math[i](t.size.outerWidth/this.columnWidth);o=Math.min(o,this.cols);for(var n=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",s=this[n](o,t),r={x:this.columnWidth*s.col,y:s.y},a=s.y+t.size.outerHeight,u=o+s.col,h=s.col;h<u;h++)this.colYs[h]=a;return r},o._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},o._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;o<i;o++)e[o]=this._getColGroupY(o,t);return e},o._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},o._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,o=t>1&&i+t>this.cols;i=o?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},o._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this._getOption("originLeft"),s=n?o.left:o.right,r=s+i.outerWidth,a=Math.floor(s/this.columnWidth);a=Math.max(0,a);var u=Math.floor(r/this.columnWidth);u-=r%this.columnWidth?0:1,u=Math.min(this.cols-1,u);for(var h=this._getOption("originTop"),d=(h?o.top:o.bottom)+i.outerHeight,l=a;l<=u;l++)this.colYs[l]=Math.max(d,this.colYs[l])},o._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},o._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/masonry",["../layout-mode","masonry-layout/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),o=i.prototype,n={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)n[s]||(o[s]=e.prototype[s]);var r=o.measureColumns;o.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=o._getOption;return o._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var o={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,o},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope-layout/js/item","isotope-layout/js/layout-mode","isotope-layout/js/layout-modes/masonry","isotope-layout/js/layout-modes/fit-rows","isotope-layout/js/layout-modes/vertical"],function(i,o,n,s,r,a){return e(t,i,o,n,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope-layout/js/item"),require("isotope-layout/js/layout-mode"),require("isotope-layout/js/layout-modes/masonry"),require("isotope-layout/js/layout-modes/fit-rows"),require("isotope-layout/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,o,n,s,r){function a(t,e){return function(i,o){for(var n=0;n<t.length;n++){var s=t[n],r=i.sortData[s],a=o.sortData[s];if(r>a||r<a){var u=void 0!==e[s]?e[s]:e,h=u?1:-1;return(r>a?1:-1)*h}}return 0}}var u=t.jQuery,h=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},d=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=s,d.LayoutMode=r;var l=d.prototype;l._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var t in r.modes)this._initLayoutMode(t)},l.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},l._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){var o=t[i];o.id=this.itemGUID++}return this._updateItemsSortData(t),t},l._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?n.extend(e.options,i):i,this.modes[t]=new e(this)},l.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},l._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},l.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},l._init=l.arrange,l._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},l._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},l._bindArrangeComplete=function(){function t(){e&&i&&o&&n.dispatchEvent("arrangeComplete",null,[n.filteredItems])}var e,i,o,n=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){o=!0,t()})},l._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],o=[],n=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var u=s(a);u&&i.push(a),u&&a.isHidden?o.push(a):u||a.isHidden||n.push(a)}}return{matches:i,needReveal:o,needHide:n}},l._getFilterTest=function(t){return u&&this.options.isJQueryFiltering?function(e){return u(e.element).is(t);
}:"function"==typeof t?function(e){return t(e.element)}:function(e){return o(e.element,t)}},l.updateSortData=function(t){var e;t?(t=n.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},l._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=f(i)}},l._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){var o=t[i];o.updateSortData()}};var f=function(){function t(t){if("string"!=typeof t)return t;var i=h(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),s=n&&n[1],r=e(s,o),a=d.sortDataParsers[i[1]];return t=a?function(t){return t&&a(r(t))}:function(t){return t&&r(t)}}function e(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},l._sort=function(){if(this.options.sortBy){var t=n.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=a(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},l._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},l._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},l._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},l._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},l._manageStamp=function(t){this._mode()._manageStamp(t)},l._getContainerSize=function(){return this._mode()._getContainerSize()},l.needsResizeLayout=function(){return this._mode().needsResizeLayout()},l.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},l.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},l._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},l.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;i<n;i++)o=e[i],this.element.appendChild(o.element);var s=this._filter(e).matches;for(i=0;i<n;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<n;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var c=l.remove;return l.remove=function(t){t=n.makeArray(t);var e=this.getItems(t);c.call(this,t);for(var i=e&&e.length,o=0;i&&o<i;o++){var s=e[o];n.removeFrom(this.filteredItems,s)}},l.shuffle=function(){for(var t=0;t<this.items.length;t++){var e=this.items[t];e.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},l._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var o=t.apply(this,e);return this.options.transitionDuration=i,o},l.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},d});

(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);
!function(a,b,c,d){"use strict";function e(b,c){this.element=b;var d={};a.each(a(this.element).data(),function(a,b){var c=function(a){return a&&a[0].toLowerCase()+a.slice(1)},e=c(a.replace("fluidbox",""));(""!==e||null!==e)&&("false"==b?b=!1:"true"==b&&(b=!0),d[e]=b)}),this.settings=a.extend({},i,c,d),this.settings.viewportFill=Math.max(Math.min(parseFloat(this.settings.viewportFill),1),0),this.settings.stackIndex<this.settings.stackIndexDelta&&(settings.stackIndexDelta=settings.stackIndex),this._name=h,this.init()}var f=a(b),g=a(c),h="fluidbox",i={immediateOpen:!1,loader:!1,maxWidth:0,maxHeight:0,resizeThrottle:500,stackIndex:1e3,stackIndexDelta:10,viewportFill:.95},j={},k=0;("undefined"==typeof console||"undefined"===console.warn)&&(console={},console.warn=function(){}),a.isFunction(a.throttle)||console.warn("Fluidbox: The jQuery debounce/throttle plugin is not found/loaded. Even though Fluidbox works without it, the window resize event will fire extremely rapidly in browsers, resulting in significant degradation in performance upon viewport resize.");var l=function(){var a,b=c.createElement("fakeelement"),e={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(a in e)if(b.style[a]!==d)return e[a]},m=l(),n={dom:function(){var b=a("<div />",{"class":"fluidbox__wrap",css:{zIndex:this.settings.stackIndex-this.settings.stackIndexDelta}});if(a(this.element).addClass("fluidbox--closed").wrapInner(b).find("img").first().css({opacity:1}).addClass("fluidbox__thumb").after('<div class="fluidbox__ghost" />'),this.settings.loader){var c=a("<div />",{"class":"fluidbox__loader",css:{zIndex:2}});a(this.element).find(".fluidbox__wrap").append(c)}},prepareFb:function(){var b=this,c=a(this.element);c.trigger("thumbloaddone.fluidbox"),n.measure.fbElements.call(this),b.bindEvents(),c.addClass("fluidbox--ready"),b.bindListeners(),c.trigger("ready.fluidbox")},measure:{viewport:function(){j.viewport={w:f.width(),h:f.height()}},fbElements:function(){var b=this,c=a(this.element),d=c.find("img").first(),e=c.find(".fluidbox__ghost"),f=c.find(".fluidbox__wrap");b.instanceData.thumb={natW:d[0].naturalWidth,natH:d[0].naturalHeight,w:d.width(),h:d.height()},e.css({width:d.width(),height:d.height(),top:d.offset().top-f.offset().top+parseInt(d.css("borderTopWidth"))+parseInt(d.css("paddingTop")),left:d.offset().left-f.offset().left+parseInt(d.css("borderLeftWidth"))+parseInt(d.css("paddingLeft"))})}},checkURL:function(a){var b=0;return/[\s+]/g.test(a)?(console.warn("Fluidbox: Fluidbox opening is halted because it has detected characters in your URL string that need to be properly encoded/escaped. Whitespace(s) have to be escaped manually. See RFC3986 documentation."),b=1):/[\"\'\(\)]/g.test(a)&&(console.warn("Fluidbox: Fluidbox opening will proceed, but it has detected characters in your URL string that need to be properly encoded/escaped. These will be escaped for you. See RFC3986 documentation."),b=0),b},formatURL:function(a){return a.replace(/"/g,"%22").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29")}};a.extend(e.prototype,{init:function(){var b=this,c=a(this.element),d=c.find("img").first();if(n.measure.viewport(),(!b.instanceData||!b.instanceData.initialized)&&c.is("a")&&1===c.children().length&&(c.children().is("img")||c.children().is("picture")&&1===c.find("img").length)&&"none"!==c.css("display")&&"none"!==c.children().css("display")&&"none"!==c.parents().css("display")){c.removeClass("fluidbox--destroyed"),b.instanceData={},b.instanceData.initialized=!0,b.instanceData.originalNode=c.html(),k+=1,b.instanceData.id=k,c.addClass("fluidbox__instance-"+k),c.addClass("fluidbox--initialized"),n.dom.call(b),c.trigger("init.fluidbox");var e=new Image;d.width()>0&&d.height()>0?n.prepareFb.call(b):(e.onload=function(){n.prepareFb.call(b)},e.onerror=function(){c.trigger("thumbloadfail.fluidbox")},e.src=d.attr("src"))}},open:function(){var b=this,c=a(this.element),d=c.find("img").first(),e=c.find(".fluidbox__ghost"),f=c.find(".fluidbox__wrap");b.instanceData.state=1,e.off(m),a(".fluidbox--opened").fluidbox("close");var g=a("<div />",{"class":"fluidbox__overlay",css:{zIndex:-1}});if(f.append(g),c.removeClass("fluidbox--closed").addClass("fluidbox--loading"),n.checkURL(d.attr("src")))return b.close(),!1;e.css({"background-image":"url("+n.formatURL(d.attr("src"))+")",opacity:1}),n.measure.fbElements.call(b);var h;b.settings.immediateOpen?(c.addClass("fluidbox--opened fluidbox--loaded").find(".fluidbox__wrap").css({zIndex:b.settings.stackIndex+b.settings.stackIndexDelta}),c.trigger("openstart.fluidbox"),b.compute(),d.css({opacity:0}),a(".fluidbox__overlay").css({opacity:1}),e.one(m,function(){c.trigger("openend.fluidbox")}),h=new Image,h.onload=function(){if(c.trigger("imageloaddone.fluidbox"),1===b.instanceData.state){if(b.instanceData.thumb.natW=h.naturalWidth,b.instanceData.thumb.natH=h.naturalHeight,c.removeClass("fluidbox--loading"),n.checkURL(h.src))return b.close({error:!0}),!1;e.css({"background-image":"url("+n.formatURL(h.src)+")"}),b.compute()}},h.onerror=function(){b.close({error:!0}),c.trigger("imageloadfail.fluidbox"),c.trigger("delayedloadfail.fluidbox")},h.src=c.attr("href")):(h=new Image,h.onload=function(){return c.trigger("imageloaddone.fluidbox"),c.removeClass("fluidbox--loading").addClass("fluidbox--opened fluidbox--loaded").find(".fluidbox__wrap").css({zIndex:b.settings.stackIndex+b.settings.stackIndexDelta}),c.trigger("openstart.fluidbox"),n.checkURL(h.src)?(b.close({error:!0}),!1):(e.css({"background-image":"url("+n.formatURL(h.src)+")"}),b.instanceData.thumb.natW=h.naturalWidth,b.instanceData.thumb.natH=h.naturalHeight,b.compute(),d.css({opacity:0}),a(".fluidbox__overlay").css({opacity:1}),void e.one(m,function(){c.trigger("openend.fluidbox")}))},h.onerror=function(){b.close({error:!0}),c.trigger("imageloadfail.fluidbox")},h.src=c.attr("href"))},compute:function(){var b=this,c=a(this.element),d=c.find("img").first(),e=c.find(".fluidbox__ghost"),g=c.find(".fluidbox__wrap"),h=b.instanceData.thumb.natW,i=b.instanceData.thumb.natH,k=b.instanceData.thumb.w,l=b.instanceData.thumb.h,m=h/i,n=j.viewport.w/j.viewport.h;b.settings.maxWidth>0?(h=b.settings.maxWidth,i=h/m):b.settings.maxHeight>0&&(i=b.settings.maxHeight,h=i*m);var o,p,q,r,s;n>m?(o=i<j.viewport.h?i:j.viewport.h*b.settings.viewportFill,q=o/l,r=h*(l*q/i)/k,s=q):(p=h<j.viewport.w?h:j.viewport.w*b.settings.viewportFill,r=p/k,q=i*(k*r/h)/l,s=r),b.settings.maxWidth&&b.settings.maxHeight&&console.warn("Fluidbox: Both maxHeight and maxWidth are specified. You can only specify one. If both are specified, only the maxWidth property will be respected. This will not generate any error, but may cause unexpected sizing behavior.");var t=f.scrollTop()-d.offset().top+.5*(l*(s-1))+.5*(f.height()-l*s),u=.5*(k*(s-1))+.5*(f.width()-k*s)-d.offset().left,v=parseInt(100*r)/100+","+parseInt(100*q)/100;e.css({transform:"translate("+parseInt(100*u)/100+"px,"+parseInt(100*t)/100+"px) scale("+v+")",top:d.offset().top-g.offset().top,left:d.offset().left-g.offset().left}),c.find(".fluidbox__loader").css({transform:"translate("+parseInt(100*u)/100+"px,"+parseInt(100*t)/100+"px) scale("+v+")"}),c.trigger("computeend.fluidbox")},recompute:function(){this.compute()},close:function(b){var c=this,e=a(this.element),f=e.find("img").first(),g=e.find(".fluidbox__ghost"),h=e.find(".fluidbox__wrap"),i=e.find(".fluidbox__overlay"),j=a.extend(null,{error:!1},b);return null===c.instanceData.state||typeof c.instanceData.state==typeof d||0===c.instanceData.state?!1:(c.instanceData.state=0,e.trigger("closestart.fluidbox"),e.removeClass(function(a,b){return(b.match(/(^|\s)fluidbox--(opened|loaded|loading)+/g)||[]).join(" ")}).addClass("fluidbox--closed"),g.css({transform:"translate(0,0) scale(1,1)",top:f.offset().top-h.offset().top+parseInt(f.css("borderTopWidth"))+parseInt(f.css("paddingTop")),left:f.offset().left-h.offset().left+parseInt(f.css("borderLeftWidth"))+parseInt(f.css("paddingLeft"))}),e.find(".fluidbox__loader").css({transform:"none"}),g.one(m,function(){g.css({opacity:0}),f.css({opacity:1}),i.remove(),h.css({zIndex:c.settings.stackIndex-c.settings.stackIndexDelta}),e.trigger("closeend.fluidbox")}),j.error&&g.trigger("transitionend"),void i.css({opacity:0}))},bindEvents:function(){var b=this,c=a(this.element);c.on("click.fluidbox",function(a){a.preventDefault(),a.stopPropagation(),b.instanceData.state&&0!==b.instanceData.state?b.close():b.open()}),g.on("keydown",function(a){27===a.keyCode&&b.close()})},bindListeners:function(){var b=this,c=a(this.element),d=function(){n.measure.viewport(),n.measure.fbElements.call(b),c.hasClass("fluidbox--opened")&&b.compute()};a.isFunction(a.throttle)?f.on("resize.fluidbox"+b.instanceData.id,a.throttle(b.settings.resizeThrottle,d)):f.on("resize.fluidbox"+b.instanceData.id,d),c.on("reposition.fluidbox",function(){b.reposition()}),c.on("recompute.fluidbox, compute.fluidbox",function(){b.compute()}),c.on("destroy.fluidbox",function(){b.destroy()}),c.on("close.fluidbox",function(){b.close()})},unbind:function(){a(this.element).off("click.fluidbox reposition.fluidbox recompute.fluidbox compute.fluidbox destroy.fluidbox close.fluidbox"),f.off("resize.fluidbox"+this.instanceData.id)},reposition:function(){n.measure.fbElements.call(this)},destroy:function(){var b=this.instanceData.originalNode;this.unbind(),a.data(this.element,"plugin_"+h,null),a(this.element).removeClass(function(a,b){return(b.match(/(^|\s)fluidbox[--|__]\S+/g)||[]).join(" ")}).empty().html(b).addClass("fluidbox--destroyed").trigger("destroyed.fluidbox")},getMetadata:function(){return this.instanceData}}),a.fn[h]=function(b){var c=arguments;if(b===d||"object"==typeof b)return this.each(function(){a.data(this,"plugin_"+h)||a.data(this,"plugin_"+h,new e(this,b))});if("string"==typeof b&&"_"!==b[0]&&"init"!==b){var f;return this.each(function(){var d=a.data(this,"plugin_"+h);d instanceof e&&"function"==typeof d[b]?f=d[b].apply(d,Array.prototype.slice.call(c,1)):console.warn('Fluidbox: The method "'+b+'" used is not defined in Fluidbox. Please make sure you are calling the correct public method.')}),f!==d?f:this}return this}}(jQuery,window,document);





var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue =[])).push(function () {
    "use strict";
    var a = (_gsScope.document || {}).documentElement,
        b = _gsScope,
        c = function (c, d) {
            var e = "x" === d
                    ? "Width"
                    : "Height",
                f = "scroll" + e,
                g = "client" + e,
                h = document.body;
            return c === b || c === a || c === h
                ? Math.max(a[f], h[f]) - (b["inner" + e] || a[g] || h[g])
                : c[f] - c["offset" + e]
        },
        d = function (a) {
            return "string" == typeof a && (a = TweenLite.selector(a)),
            a.length && a !== b && a[0] && a[0].style && ! a.nodeType && (a = a[0]),
            a === b || a.nodeType && a.style
                ? a
                : null
        },
        e = function (c, d) {
            var e = "scroll" + (
                "x" === d
                    ? "Left"
                    : "Top"
            );
            return c === b && (
                null != c.pageXOffset
                    ? e = "page" + d.toUpperCase() + "Offset"
                    : c = null != a[e]
                        ? a
                        : document.body
            ),
            function () {
                return c[e]
            }
        },
        f = function (c, f) {
            var g = d(c).getBoundingClientRect(),
                h = document.body,
                i = ! f || f === b || f === h,
                j = i
                    ? {
                        top: a.clientTop -(window.pageYOffset || a.scrollTop || h.scrollTop || 0),
                        left: a.clientLeft -(window.pageXOffset || a.scrollLeft || h.scrollLeft || 0)
                    }
                    : f.getBoundingClientRect(),
                k = {
                    x: g.left - j.left,
                    y: g.top - j.top
                };
            return ! i && f && (k.x += e(f, "x")(), k.y += e(f, "y")()),
            k
        },
        g = function (a, b, d) {
            var e = typeof a;
            return isNaN(a)
                ? "number" === e || "string" === e && "=" === a.charAt(1)
                    ? a
                    : "max" === a
                        ? c(b, d)
                        : Math.min(c(b, d), f(a, b)[d])
                : parseFloat(a)
        },
        h = _gsScope._gsDefine.plugin({
            propName: "scrollTo",
            API: 2,
            global: !0,
            version: "1.9.1",
            init: function (a, c, d) {
                return this._wdw = a === b,
                this._target = a,
                this._tween = d,
                "object" != typeof c
                    ? (c =
                        { y: c
                    }, "string" == typeof c.y && "max" !== c.y && "=" !== c.y.charAt(1) && (c.x = c.y))
                    : c.nodeType && (c =
                        { y: c,
                        x: c
                    }),
                this.vars = c,
                this._autoKill = c.autoKill !== !1,
                this.getX = e(a, "x"),
                this.getY = e(a, "y"),
                this.x = this.xPrev = this.getX(),
                this.y = this.yPrev = this.getY(),
                null != c.x
                    ? (this._addTween(this, "x", this.x, g(c.x, a, "x") - (c.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x"))
                    : this.skipX = !0,
                null != c.y
                    ? (this._addTween(this, "y", this.y, g(c.y, a, "y") - (c.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y"))
                    : this.skipY = !0,
                !0
            },
            set: function (a) {
                this
                    ._super
                    .setRatio
                    .call(this, a);
                var d = this._wdw || !this.skipX
                        ? this.getX()
                        : this.xPrev,
                    e = this._wdw || !this.skipY
                        ? this.getY()
                        : this.yPrev,
                    f = e - this.yPrev,
                    g = d - this.xPrev,
                    i = h.autoKillThreshold;
                this.x < 0 && (this.x = 0),
                this.y < 0 && (this.y = 0),
                this._autoKill && (!this.skipX && (g > i || - i > g) && d < c(this._target, "x") && (this.skipX =! 0), !this.skipY && (f > i || - i > f) && e < c(this._target, "y") && (this.skipY =! 0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this
                    .vars
                    .onAutoKill
                    .apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
                this._wdw
                    ? b.scrollTo(
                        this.skipX
                            ? d
                            : this.x,
                        this.skipY
                            ? e
                            : this.y
                    )
                    : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)),
                this.xPrev = this.x,
                this.yPrev = this.y
            }
        }),
        i = h.prototype;
    h.max = c,
    h.getOffset = f,
    h.buildGetter = e,
    h.autoKillThreshold = 7,
    i._kill = function (a) {
        return a.scrollTo_x && (this.skipX =! 0),
        a.scrollTo_y && (this.skipY =! 0),
        this
            ._super
            ._kill
            .call(this, a)
    }
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
function (a) {
    "use strict";
    var b = function () {
        return(_gsScope.GreenSockGlobals || _gsScope)[a]
    };
    "undefined" != typeof module && module.exports
        ? (require("../TweenLite.min.js"), module.exports = b())
        : "function" == typeof define && define.amd && define(["TweenLite"], b)
}("ScrollToPlugin");
(function ($) {
    "use strict";
    $(document).ready(function () {
        initLoad();
        lightBox();
        btns();
        grid();
        owlCarousels();
        if (typeof googleMaps != 'undefined' && $.isFunction(googleMaps)) {
            googleMaps();
        }
        if (typeof twitterFeed != 'undefined' && $.isFunction(twitterFeed)) {
            twitterFeed();
        }
    });
    function initLoad() {
        var menu = $(".nav");
        var menuIcon = $(".menu-icon");
        var menuItem = $(".nav .st");
        var spanOne = $(".transition span:nth-child(1)");
        var spanTwo = $(".transition span:nth-child(2)");
        var submenuBtn = $(".menu .menu-item-has-children");
        var preloader = $(".preloader");
		/*
        setTimeout(function () {
            TweenMax.to(preloader, 1, {
                height: 0,
                ease: Power2.easeInOut
            });
            TweenMax.to(".main-content", 1.6, {
                opacity: 1,
                ease: Power2.easeInOut
            });
            setTimeout(function () {
                preloader.remove();
            }, 1000);
        }, 800);
		
        if ($("#wpadminbar").length > 0) {
            $("#wpadminbar a").addClass('no-barba');
        }
		*/

		/*
        Barba
            .Pjax
            .Dom
            .wrapperId = "ajax-a";
        Barba
            .Pjax
            .Dom
            .containerClass = "ajax-b";
        Barba.Pjax.start();
		*/

        var pageTransition = Barba.BaseTransition.extend({
            start: function () {
                //Promise.all([this.newContainerLoading, this.transitionStart()]).then(this.transitionEnd.bind(this));
            },
			/*
            transitionStart: function () {
                menuIcon.removeClass("active");
                TweenMax.to(menuItem, 0.7, {
                    autoAlpha: 0,
                    ease: Power4.easeInOut
                }, 0.05);
                TweenMax.to(spanOne, 0.6, {
                    width: "0",
                    delay: 0.4,
                    ease: Power2.easeInOut
                });
                TweenMax.to(spanTwo, 1, {
                    height: "130%",
                    rotation: 6,
                    ease: Power2.easeInOut
                });
                TweenMax.to(".main-content", 0.8, {
                    opacity: 0,
                    ease: Power2.easeInOut
                });
                return new Promise(function (resolve, reject) {
                    window.setTimeout(function () {
                        TweenMax.to(window, 1, {
                            scrollTo: 0,
                            ease: Power2.easeOut
                        });
                        resolve();
                    }, 1000);
                });
            },
			*/
            transitionEnd: function () {
                this.done();
                ajaxLoad();
                menu.hide();
                TweenMax.to(".main-content", 1.6, {
                    opacity: 1,
                    ease: Power2.easeInOut
                });
                TweenMax.set(menuItem, {clearProps: "all"});
                TweenMax.set(spanOne, {clearProps: "all"});
                TweenMax.to(spanTwo, 1, {
                    height: 0,
                    ease: Power2.easeInOut,
                    clearProps: "all"
                });
            }
        });
        Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
            eval(container.querySelector("script").innerHTML);
        });
        Barba.Pjax.getTransition = function () {
            return pageTransition;
        };
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }
        menuIcon.on("click", function () {
            if (menuIcon.hasClass("active")) {
                menuIcon.removeClass("active");
                TweenMax.to(menuItem, 0.7, {
                    autoAlpha: 0,
                    ease: Power4.easeInOut
                }, 0.05);
                TweenMax.to(spanOne, 0.6, {
                    width: 0,
                    delay: 0.4,
                    ease: Power2.easeInOut
                });
                setTimeout(function () {
                    menu.hide();
                    TweenMax.set(menuItem, {clearProps: "all"});
                    TweenMax.set(spanOne, {clearProps: "all"});
                    TweenMax.to(spanTwo, 1, {
                        height: 0,
                        ease: Power2.easeInOut,
                        clearProps: "all"
                    });
                }, 1000);
            } else {
                menu.show();
                menuIcon.addClass("active");
                TweenMax.to(spanTwo, 1, {
                    height: "130%",
                    rotation: 6,
                    ease: Power2.easeInOut
                });
                TweenMax.to(spanOne, 0.6, {
                    width: "55%",
                    delay: 0.8,
                    ease: Power2.easeInOut
                });
                TweenMax.from(menuItem, 0.7, {
                    autoAlpha: 0,
                    delay: 0.8,
                    ease: Power4.easeInOut
                }, 0.05);
            }
        });
        $(".menu .menu-item-has-children")
            .find(">:first-child")
            .attr("href", "javascript:void(0)")
            submenuBtn
            .on("click", function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).find(".sub-menu").slideUp(200);
                } else {
                    $(this).addClass("active");
                    $(this).find(".sub-menu").slideDown(200);
                }
            });
    }
    function lightBox() {
        if ($(".lightbox").length > 0) {
            $("a.lightbox").fluidbox();
            $(".lightbox a").fluidbox();
        }
    }
    function btns() {
        if ($(".top-btn").length > 0) {
            var topBtn = $(".top-btn");
            $(window).on("scroll", function () {
                var scroll = $(window).scrollTop();
                if (scroll >= 100) {
                    TweenMax.to(topBtn, 0.5, {
                        y: -30,
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                } else {
                    TweenMax.to(topBtn, 0.5, {
                        y: 0,
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                }
            });
            topBtn.on("click", function () {
                TweenMax.to(window, 1.2, {
                    scrollTo: 0,
                    ease: Power2.easeOut
                });
            });
        }
        if ($(".filter-btn").length > 0) {
            var filterBtn = $(".filter-btn");
            var filter = $(".filter");
            var contentOne = $(".main-content");
            var overlayOne = $(".transition span:nth-child(1)");
            $(window).on("scroll", function () {
                var scroll = $(window).scrollTop();
                if (scroll >= 300) {
                    TweenMax.to(filterBtn, 0.5, {
                        y: -30,
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                } else {
                    TweenMax.to(filterBtn, 0.5, {
                        y: 0,
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    TweenMax.to(overlayOne, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    TweenMax.to(contentOne, 0.5, {
                        x: 0,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(filter, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    filterBtn.removeClass("close");
                }
            });
            filterBtn.on("click", function () {
                if (filterBtn.hasClass("close")) {
                    TweenMax.to(overlayOne, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    TweenMax.to(contentOne, 0.5, {
                        x: 0,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(filter, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    $(this).removeClass("close");
                } else {
                    overlayOne.css({"width": "100%", "opacity": "0", "z-index": "998"});
                    TweenMax.to(overlayOne, 0.5, {
                        autoAlpha: 0.4,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(contentOne, 0.5, {
                        x: -80,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(filter, 0.5, {
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                    $(this).addClass("close");
                }
            });
            $(".filter ul li a").on("click", function () {
                TweenMax.to(window, 1.2, {
                    scrollTo: ".portfolio__grid",
                    ease: Power2.easeOut
                });
            });
        }
        if ($(".share-btn").length > 0) {
            var shareBtn = $(".share-btn");
            var share = $(".share");
            var contentTwo = $(".main-content");
            var overlayTwo = $(".transition span:nth-child(1)");
            $(window).on("scroll", function () {
                var scroll = $(window).scrollTop();
                if (scroll >= 300) {
                    TweenMax.to(shareBtn, 0.5, {
                        y: -30,
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                } else {
                    TweenMax.to(shareBtn, 0.5, {
                        y: 0,
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    TweenMax.to(overlayTwo, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    TweenMax.to(contentTwo, 0.5, {
                        x: 0,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(share, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    shareBtn.removeClass("close");
                }
            });
            shareBtn.on("click", function () {
                if (shareBtn.hasClass("close")) {
                    TweenMax.to(overlayTwo, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    TweenMax.to(contentTwo, 0.5, {
                        x: 0,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(share, 0.5, {
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                    $(this).removeClass("close");
                } else {
                    overlayTwo.css({"width": "100%", "opacity": "0", "z-index": "998"});
                    TweenMax.to(overlayTwo, 0.5, {
                        autoAlpha: 0.4,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(contentTwo, 0.5, {
                        x: -80,
                        ease: Power2.easeOut
                    });
                    TweenMax.to(share, 0.5, {
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                    $(this).addClass("close");
                }
            });
        }
        if ($(".project-btn").length > 0) {
            var projectBtn = $(".project-btn");
            $(window).on("scroll", function () {
                var scroll = $(window).scrollTop();
                if (scroll >= 300) {
                    TweenMax.to(projectBtn, 0.5, {
                        y: -30,
                        autoAlpha: 1,
                        ease: Power2.easeOut
                    });
                } else {
                    TweenMax.to(projectBtn, 0.5, {
                        y: 0,
                        autoAlpha: 0,
                        ease: Power2.easeOut,
                        clearProps: "all"
                    });
                }
            });
        }
    }
	
    function grid() {
        $("body").imagesLoaded(function () {
            if ($(".portfolio__grid").length > 0) {
                var $portfolio_grid = $(".portfolio__grid");
                $portfolio_grid.isotope({
                    itemSelector: ".item",
                    percentPosition: true,
                    visibleStyle: {
                        opacity: 1,
                        transform: "none"
                    },
                    hiddenStyle: {
                        opacity: 0,
                        transform: "none"
                    },
                    masonry: {
                        columnWidth: ".sizer"
                    }
                });
                $(".filter a").on("click", function () {
                    var selector = $(this).attr("data-filter");
                    $portfolio_grid.isotope({filter: selector});
                    return false;
                });
            }
            if ($(".hover--two").length > 0) {
                var caption = $(".hover--two .item .caption");
                caption.each(function (index) {
                    var _this = $(this);
                    var newClass = "count" + Math.floor(Math.random() * 9999) + 1;
                    _this.attr("data-tooltip-content", "." + newClass);
                    _this.find(".inner").addClass(newClass);
                });
                caption.tooltipster({
                    plugins: ["follower"],
                    delay: 0,
                    animationDuration: 0,
                    offset: [10, 10]
                });
            }
            if ($(".portfolio-interactive-links").length > 0) {
                $(".portfolio-interactive-links ul li:first-child div").addClass("active");
                $(".portfolio-interactive-links ul li").on("mouseenter", function () {
                    var _this = $(this);
                    var img = _this.find("div");
                    $(".portfolio-interactive-links ul li div").removeClass("active");
                    img.addClass("active");
                });
            }
            if ($(".blog.two--columns").length > 0) {
                var $blog_grid = $(".blog.two--columns");
                $blog_grid.isotope({
                    itemSelector: ".item",
                    percentPosition: true,
                    masonry: {
                        columnWidth: ".sizer"
                    }
                });
            }
        });
    }
    function owlCarousels() {
        if ($(".main-slideshow").length > 0) {
            $(".main-slideshow").owlCarousel({
                loop: false,
                autoplay: true,
                autoplayTimeout: 8000,
                nav: false,
                dots: true,
                margin: 0,
                animateOut: "fadeOut",
                items: 1
            });
        }
        if ($(".portfolio-showcase").length > 0) {
            $(".portfolio-showcase").owlCarousel({
                loop: true,
                nav: true,
                dots: false,
                items: 1,
                mouseDrag: false,
                animateIn: "slideInUp",
                animateOut: "fadeOut",
                navText: ["<i class='icon up ion-md-arrow-up'></i>", "<i class='icon down ion-md-arrow-down'></i>"]
            });
        }
        if ($(".portfolio-showcase--three").length > 0) {
            $(".portfolio-showcase--three").owlCarousel({
                loop: false,
                nav: true,
                dots: false,
                margin: 35,
                animateOut: "fadeOut",
                navText: [
                    "<i class='icon ion-md-arrow-back'></i>", "<i class='icon ion-md-arrow-forward'></i>"
                ],
                responsive: {
                    0: {
                        items: 1
                    },
                    767: {
                        items: 2
                    },
                    1199: {
                        items: 3
                    }
                }
            });
            $(".portfolio-showcase--three").on("mousewheel", ".owl-stage", function (e) {
                if (e.deltaY > 0) {
                    $(".portfolio-showcase--three").trigger("prev.owl.carousel", [1000]);
                } else {
                    $(".portfolio-showcase--three").trigger("next.owl.carousel", [1000]);
                } e.preventDefault();
            });
        }
        if ($(".photography-carousel").length > 0) {
            $(".photography-carousel").owlCarousel({
                loop: true,
                nav: true,
                dots: false,
                items: 1,
                navText: ["<i class='icon ion-md-arrow-back'></i>", "<i class='icon ion-md-arrow-forward'></i>"]
            });
        }
        if ($(".single-carousel").length > 0) {
            $(".single-carousel").owlCarousel({
                items: 1,
                loop: true,
                dots: false,
                nav: true,
                navText: [
                    "<i class='icon ion-md-arrow-back'></i>", "<i class='icon ion-md-arrow-forward'></i>"
                ],
                autoHeight: true
            });
        }
    }
    function ajaxLoad() {
        lightBox();
        btns();
        grid();
        owlCarousels();
        if (typeof googleMaps != 'undefined' && $.isFunction(googleMaps)) {
            googleMaps();
        }
        if (typeof twitterFeed != 'undefined' && $.isFunction(twitterFeed)) {
            twitterFeed();
        }
    }
})(jQuery);
!function (a, b) {
    "use strict";
        function c() {
            if (! e) {
                e = !0;
                var a,
                    c,
                    d,
                    f,
                    g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                    h = !!navigator.userAgent.match(/Trident.*rv:11\./),
                    i = b.querySelectorAll("iframe.wp-embedded-content");
                for (c = 0; c < i.length; c++) {
                    if (d = i[c], ! d.getAttribute("data-secret")) 
                        f = Math
                            .random()
                            .toString(36)
                            .substr(2, 10),
                        d.src += "#?secret=" + f,
                        d.setAttribute("data-secret", f);
                    
                    if (g || h) 
                        a = d.cloneNode(!0),
                        a.removeAttribute("security"),
                        d.parentNode.replaceChild(a, d)
                    
                }
            }
        }
        var d = !1,
    e = !1;
        if (b.querySelector) 
            if (a.addEventListener) 
                d = !0;
            
        
        if (a.wp = a.wp || {}, ! a.wp.receiveEmbedMessage) 
            if (a.wp.receiveEmbedMessage = function (c) {
                var d = c.data;
                if (d) 
                    if (d.secret || d.message || d.value) 
                        if (!/[^a-zA-Z0-9]/.test(d.secret)) {
                            var e,
                                f,
                                g,
                                h,
                                i,
                                j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
                                k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
                            for (e = 0; e < k.length; e++) 
                                k[e].style.display = "none";
                            
                            for (e = 0; e < j.length; e++) 
                                if (f = j[e], c.source === f.contentWindow) {
                                    if (f.removeAttribute("style"), "height" === d.message) {
                                        if (g = parseInt(d.value, 10), g > 1e3) 
                                            g = 1e3;
                                         else if (~~ g < 200) 
                                            g = 200;
                                        
                                        f.height = g
                                    }
                                    if ("link" === d.message) 
                                        if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host) 
                                            if (b.activeElement === f) 
                                                a
                                                    .top
                                                    .location
                                                    .href = d.value
                                            
                                        
                                    
                                }
                            
                         else 
                        ;
                    
                
            }
        }
    ,
    d
) 
    a.addEventListener("message", a.wp.receiveEmbedMessage, !1),
    b.addEventListener("DOMContentLoaded", c, !1),
    a.addEventListener("load", c, !1)
}(window, document);