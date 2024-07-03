function initLocalClocks() {
    for (
        var e = new Date(),
            t = e.getHours(),
            s = e.getMinutes(),
            a = [
                { hand: "hours", angle: 30 * t + s / 2 },
                { hand: "minutes", angle: 6 * s },
                { hand: "seconds", angle: 6 * e.getSeconds() },
            ],
            n = 0;
        n < a.length;
        n++
    )
        for (var o = document.querySelectorAll("." + a[n].hand), r = 0; r < o.length; r++)
            (o[r].style.webkitTransform = "rotateZ(" + a[n].angle + "deg)"), (o[r].style.transform = "rotateZ(" + a[n].angle + "deg)"), "minutes" === a[n].hand && o[r].parentNode.setAttribute("data-second-angle", a[n + 1].angle);
}
function setUpMinuteHands() {
    var e = document.querySelectorAll(".minutes-container"),
        t = e[0].getAttribute("data-second-angle");
    t > 0 &&
        setTimeout(function () {
            moveMinuteHands(e);
        }, 1e3 * ((360 - t) / 6 + 0.1));
}
function moveMinuteHands(e) {
    for (var t = 0; t < e.length; t++) (e[t].style.webkitTransform = "rotateZ(6deg)"), (e[t].style.transform = "rotateZ(6deg)");
    setInterval(function () {
        for (var t = 0; t < e.length; t++) void 0 === e[t].angle ? (e[t].angle = 12) : (e[t].angle += 6), (e[t].style.webkitTransform = "rotateZ(" + e[t].angle + "deg)"), (e[t].style.transform = "rotateZ(" + e[t].angle + "deg)");
    }, 6e4);
}
function moveSecondHands() {
    var e = document.querySelectorAll(".seconds-container");
    setInterval(function () {
        for (var t = 0; t < e.length; t++) void 0 === e[t].angle ? (e[t].angle = 6) : (e[t].angle += 6), (e[t].style.webkitTransform = "rotateZ(" + e[t].angle + "deg)"), (e[t].style.transform = "rotateZ(" + e[t].angle + "deg)");
    }, 1e3);
}
document.addEventListener("DOMContentLoaded", () => {
    const e = Array.prototype.slice.call(document.querySelectorAll(".screen-block")),
        t = document.querySelector(".logo"),
        s = document.querySelector(".menu"),
        a = ["wheel", "keydown"];
    let n = !0,
        o = !0;
    const r = (e) => {
        n &&
            (i(e),
            (n = !n),
            setTimeout(() => {
                n = !n;
            }, 1e3));
    };
    setTopPanelStyle = (a) => {
        const n = getComputedStyle(e[a])
            .backgroundColor.replace(/rgba?|\(|\)/g, "")
            .split(", ");
        setTimeout(() => {
            n.filter((e) => e < 100).length ? (t.classList.remove("dark"), s.classList.remove("dark")) : (t.classList.add("dark"), s.classList.add("dark"));
        }, 600);
    };
    const l = (e) => {
            e.deltaY ? (e.deltaY > 0 || e.deltaY < -0) && r(e) : r(e);
        },
        c = (e, t, s) => {
            t && t.classList.remove("previous", "previous-back"), e.classList.remove("current", "current-back"), e.classList.add(s);
        },
        d = (e, t) => {
            setTimeout(() => {
                e.classList.remove(t);
            }, 1600);
        },
        i = (a) => {
            const n = document.querySelector(".screen-block.previous") || document.querySelector(".screen-block.previous-back"),
                r = document.querySelector(".screen-block.current") || document.querySelector(".screen-block.current-back"),
                l = e.indexOf(r);
            (a.deltaY > 0 || 40 === a.keyCode) &&
                (c(r, n, "previous"),
                d(r, "previous"),
                ((t) => {
                    e[t + 1] ? e[t + 1].classList.add("current") : e[0].classList.add("current");
                })(l),
                e[0].classList.contains("first-slide") && e[0].classList.remove("first-slide"),
                t.classList.add("back"),
                s.classList.add("back"),
                setTimeout(() => {
                    t.classList.remove("back"), s.classList.remove("back");
                }, 600),
                setTopPanelStyle(e[l + 1] ? l + 1 : 0),
                l === e.length - 1 && (o = !1)),
                (a.deltaY < 0 || 38 === a.keyCode) &&
                    (o
                        ? e[l - 1] &&
                          (c(r, n, "previous-back"),
                          d(r, "previous-back"),
                          setTopPanelStyle(e[l - 1] ? l - 1 : e.length - 1),
                          setTimeout(() => {
                              t.classList.remove("back"), s.classList.remove("back");
                          }, 600),
                          e[l - 1].classList.add("current-back"),
                          t.classList.add("back"),
                          s.classList.add("back"))
                        : (c(r, n, "previous-back"),
                          d(r, "previous-back"),
                          ((t) => {
                              e[t - 1] ? e[t - 1].classList.add("current-back") : e[e.length - 1].classList.add("current-back");
                          })(l),
                          setTopPanelStyle(e[l - 1] ? l - 1 : e.length - 1),
                          setTimeout(() => {
                              t.classList.remove("back"), s.classList.remove("back");
                          }, 600),
                          t.classList.add("back"),
                          s.classList.add("back")));
        };
    (() => a.forEach((e) => document.addEventListener(e, l)))(), setTopPanelStyle(0), e[0].classList.add("current"), e[0].classList.add("first-slide");
}),
    $(window).on("load", function () {
        initLocalClocks(), moveSecondHands(), setUpMinuteHands();
    }),
    $(".light div").children().addClass("light");
var _extends =
        Object.assign ||
        function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
        }, 
    _typeof =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                  return typeof t;
              }
            : function (t) {
                  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
              };
!(function (t, e) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : (t.LazyLoad = e());
})(this, function () {
    "use strict";
    function t(t, e, n) {
        var o = e._settings;
        (!n && i(t)) || (C(o.callback_enter, t), R.indexOf(t.tagName) > -1 && (N(t, e), I(t, o.class_loading)), E(t, e), a(t), C(o.callback_set, t));
    }
    var e = {
            elements_selector: "img",
            container: document,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "bg",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            load_delay: 0,
            callback_load: null,
            callback_error: null,
            callback_set: null,
            callback_enter: null,
            callback_finish: null,
            to_webp: !1,
        },
        n = function (t) {
            return _extends({}, e, t);
        },
        o = function (t, e) {
            return t.getAttribute("data-" + e);
        },
        r = function (t, e, n) {
            var o = "data-" + e;
            null !== n ? t.setAttribute(o, n) : t.removeAttribute(o);
        },
        a = function (t) {
            return r(t, "was-processed", "true");
        },
        i = function (t) {
            return "true" === o(t, "was-processed");
        },
        s = function (t, e) {
            return r(t, "ll-timeout", e);
        },
        c = function (t) {
            return o(t, "ll-timeout");
        },
        l = function (t) {
            return t.filter(function (t) {
                return !i(t);
            });
        },
        u = function (t, e) {
            return t.filter(function (t) {
                return t !== e;
            });
        },
        d = function (t, e) {
            var n,
                o = new t(e);
            try {
                n = new CustomEvent("LazyLoad::Initialized", { detail: { instance: o } });
            } catch (t) {
                (n = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: o });
            }
            window.dispatchEvent(n);
        },
        f = function (t, e) {
            return e ? t.replace(/\.(jpe?g|png)/gi, ".webp") : t;
        },
        _ = "undefined" != typeof window,
        v = (_ && !("onscroll" in window)) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        g = _ && "IntersectionObserver" in window,
        h = _ && "classList" in document.createElement("p"),
        b =
            _ &&
            (function () {
                var t = document.createElement("canvas");
                return !(!t.getContext || !t.getContext("2d")) && 0 === t.toDataURL("image/webp").indexOf("data:image/webp");
            })(),
        m = function (t, e, n, r) {
            for (var a, i = 0; (a = t.children[i]); i += 1)
                if ("SOURCE" === a.tagName) {
                    var s = o(a, n);
                    p(a, e, s, r);
                }
        },
        p = function (t, e, n, o) {
            n && t.setAttribute(e, f(n, o));
        },
        y = function (t, e) {
            var n = b && e.to_webp,
                r = o(t, e.data_src),
                a = o(t, e.data_bg);
            if (r) {
                var i = f(r, n);
                t.style.backgroundImage = 'url("' + i + '")';
            }
            if (a) {
                var s = f(a, n);
                t.style.backgroundImage = s;
            }
        },
        w = {
            IMG: function (t, e) {
                var n = b && e.to_webp,
                    r = e.data_srcset,
                    a = t.parentNode;
                a && "PICTURE" === a.tagName && m(a, "srcset", r, n);
                var i = o(t, e.data_sizes);
                p(t, "sizes", i);
                var s = o(t, r);
                p(t, "srcset", s, n);
                var c = o(t, e.data_src);
                p(t, "src", c, n);
            },
            IFRAME: function (t, e) {
                var n = o(t, e.data_src);
                p(t, "src", n);
            },
            VIDEO: function (t, e) {
                var n = e.data_src,
                    r = o(t, n);
                m(t, "src", n), p(t, "src", r), t.load();
            },
        },
        E = function (t, e) {
            var n = e._settings,
                o = t.tagName,
                r = w[o];
            if (r) return r(t, n), e._updateLoadingCount(1), void (e._elements = u(e._elements, t));
            y(t, n);
        },
        I = function (t, e) {
            h ? t.classList.add(e) : (t.className += (t.className ? " " : "") + e);
        },
        L = function (t, e) {
            h
                ? t.classList.remove(e)
                : (t.className = t.className
                      .replace(new RegExp("(^|\\s+)" + e + "(\\s+|$)"), " ")
                      .replace(/^\s+/, "")
                      .replace(/\s+$/, ""));
        },
        C = function (t, e) {
            t && t(e);
        },
        O = function (t, e, n) {
            t.addEventListener(e, n);
        },
        k = function (t, e, n) {
            t.removeEventListener(e, n);
        },
        x = function (t, e, n) {
            O(t, "load", e), O(t, "loadeddata", e), O(t, "error", n);
        },
        A = function (t, e, n) {
            k(t, "load", e), k(t, "loadeddata", e), k(t, "error", n);
        },
        z = function (t, e, n) {
            var o = n._settings,
                r = e ? o.class_loaded : o.class_error,
                a = e ? o.callback_load : o.callback_error,
                i = t.target;
            L(i, o.class_loading), I(i, r), C(a, i), n._updateLoadingCount(-1);
        },
        N = function (t, e) {
            var n = function n(r) {
                    z(r, !0, e), A(t, n, o);
                },
                o = function o(r) {
                    z(r, !1, e), A(t, n, o);
                };
            x(t, n, o);
        },
        R = ["IMG", "IFRAME", "VIDEO"],
        S = function (e, n, o) {
            t(e, o), n.unobserve(e);
        },
        M = function (t) {
            var e = c(t);
            e && (clearTimeout(e), s(t, null));
        },
        j = function (t, e, n) {
            var o = n._settings.load_delay,
                r = c(t);
            r ||
                ((r = setTimeout(function () {
                    S(t, e, n), M(t);
                }, o)),
                s(t, r));
        },
        D = function (t) {
            return t.isIntersecting || t.intersectionRatio > 0;
        },
        T = function (t) {
            return { root: t.container === document ? null : t.container, rootMargin: t.thresholds || t.threshold + "px" };
        },
        U = function (t, e) {
            (this._settings = n(t)), this._setObserver(), (this._loadingCount = 0), this.update(e);
        };
    return (
        (U.prototype = {
            _manageIntersection: function (t) {
                var e = this._observer,
                    n = this._settings.load_delay,
                    o = t.target;
                n ? (D(t) ? j(o, e, this) : M(o)) : D(t) && S(o, e, this);
            },
            _onIntersection: function (t) {
                t.forEach(this._manageIntersection.bind(this));
            },
            _setObserver: function () {
                g && (this._observer = new IntersectionObserver(this._onIntersection.bind(this), T(this._settings)));
            },
            _updateLoadingCount: function (t) {
                (this._loadingCount += t), 0 === this._elements.length && 0 === this._loadingCount && C(this._settings.callback_finish);
            },
            update: function (t) {
                var e = this,
                    n = this._settings,
                    o = t || n.container.querySelectorAll(n.elements_selector);
                (this._elements = l(Array.prototype.slice.call(o))),
                    !v && this._observer
                        ? this._elements.forEach(function (t) {
                              e._observer.observe(t);
                          })
                        : this.loadAll();
            },
            destroy: function () {
                var t = this;
                this._observer &&
                    (this._elements.forEach(function (e) {
                        t._observer.unobserve(e);
                    }),
                    (this._observer = null)),
                    (this._elements = null),
                    (this._settings = null);
            },
            load: function (e, n) {
                t(e, this, n);
            },
            loadAll: function () {
                var t = this;
                this._elements.forEach(function (e) {
                    t.load(e);
                });
            },
        }),
        _ &&
            (function (t, e) {
                if (e)
                    if (e.length) for (var n, o = 0; (n = e[o]); o += 1) d(t, n);
                    else d(t, e);
            })(U, window.lazyLoadOptions),
        U
    );
});
var myLazyLoad = new LazyLoad({ elements_selector: ".lazy" });
