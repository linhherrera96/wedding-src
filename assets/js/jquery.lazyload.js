!(function (t, e, o, i) {
  var r = t(e);
  (t.fn.lazyload = function (o) {
    var i,
      n = this,
      a = {
        threshold: 0,
        failure_limit: 0,
        event: "scroll.lazyload",
        effect: "show",
        container: e,
        data_attribute: "original",
        data_srcset: "srcset",
        skip_invisible: !1,
        appear: null,
        load: null,
        placeholder:
          "data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=",
      };
    function f() {
      var e = 0;
      n.each(function () {
        var o = t(this);
        if (!a.skip_invisible || o.is(":visible"))
          if (t.abovethetop(this, a) || t.leftofbegin(this, a));
          else if (t.belowthefold(this, a) || t.rightoffold(this, a)) {
            if (++e > a.failure_limit) return !1;
          } else o.trigger("appear"), (e = 0);
      });
    }
    return (
      o &&
        (void 0 !== o.failurelimit &&
          ((o.failure_limit = o.failurelimit), delete o.failurelimit),
        void 0 !== o.effectspeed &&
          ((o.effect_speed = o.effectspeed), delete o.effectspeed),
        t.extend(a, o)),
      (i = void 0 === a.container || a.container === e ? r : t(a.container)),
      0 === a.event.indexOf("scroll") &&
        i.off(a.event).on(a.event, function () {
          return f();
        }),
      this.each(function () {
        var e = this,
          o = t(e);
        (e.loaded = !1),
          (void 0 !== o.attr("src") && !1 !== o.attr("src")) ||
            (o.is("img") && o.attr("src", a.placeholder)),
          o.one("appear", function () {
            if (!this.loaded) {
              if (a.appear) {
                var i = n.length;
                a.appear.call(e, i, a);
              }
              t("<img />")
                .one("load", function () {
                  var i = o.attr("data-" + a.data_attribute),
                    r = o.attr("data-" + a.data_srcset);
                  i != o.attr("src") &&
                    (o.hide(),
                    o.is("img") &&
                      (o.attr("src", i), null != r && o.attr("srcset", r)),
                    o.is("video")
                      ? o.attr("poster", i)
                      : o.css("background-image", "url('" + i + "')"),
                    o[a.effect](a.effect_speed)),
                    (e.loaded = !0);
                  var f = t.grep(n, function (t) {
                    return !t.loaded;
                  });
                  if (((n = t(f)), a.load)) {
                    var l = n.length;
                    a.load.call(e, l, a);
                  }
                })
                .attr({
                  src: o.attr("data-" + a.data_attribute),
                  srcset: o.attr("data-" + a.data_srcset) || "",
                });
            }
          }),
          0 !== a.event.indexOf("scroll") &&
            o.off(a.event).on(a.event, function () {
              e.loaded || o.trigger("appear");
            });
      }),
      r.off("resize.lazyload").bind("resize.lazyload", function () {
        f();
      }),
      /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) &&
        r.on("pageshow", function (e) {
          e.originalEvent &&
            e.originalEvent.persisted &&
            n.each(function () {
              t(this).trigger("appear");
            });
        }),
      t(function () {
        f();
      }),
      this
    );
  }),
    (t.belowthefold = function (o, i) {
      return (
        (void 0 === i.container || i.container === e
          ? (e.innerHeight ? e.innerHeight : r.height()) + r.scrollTop()
          : t(i.container).offset().top + t(i.container).height()) <=
        t(o).offset().top - i.threshold
      );
    }),
    (t.rightoffold = function (o, i) {
      return (
        (void 0 === i.container || i.container === e
          ? r.width() + r.scrollLeft()
          : t(i.container).offset().left + t(i.container).width()) <=
        t(o).offset().left - i.threshold
      );
    }),
    (t.abovethetop = function (o, i) {
      return (
        (void 0 === i.container || i.container === e
          ? r.scrollTop()
          : t(i.container).offset().top) >=
        t(o).offset().top + i.threshold + t(o).height()
      );
    }),
    (t.leftofbegin = function (o, i) {
      return (
        (void 0 === i.container || i.container === e
          ? r.scrollLeft()
          : t(i.container).offset().left) >=
        t(o).offset().left + i.threshold + t(o).width()
      );
    }),
    (t.inviewport = function (e, o) {
      return !(
        t.rightoffold(e, o) ||
        t.leftofbegin(e, o) ||
        t.belowthefold(e, o) ||
        t.abovethetop(e, o)
      );
    }),
    t.extend(t.expr[":"], {
      "below-the-fold": function (e) {
        return t.belowthefold(e, { threshold: 0 });
      },
      "above-the-top": function (e) {
        return !t.belowthefold(e, { threshold: 0 });
      },
      "right-of-screen": function (e) {
        return t.rightoffold(e, { threshold: 0 });
      },
      "left-of-screen": function (e) {
        return !t.rightoffold(e, { threshold: 0 });
      },
      "in-viewport": function (e) {
        return t.inviewport(e, { threshold: 0 });
      },
      "above-the-fold": function (e) {
        return !t.belowthefold(e, { threshold: 0 });
      },
      "right-of-fold": function (e) {
        return t.rightoffold(e, { threshold: 0 });
      },
      "left-of-fold": function (e) {
        return !t.rightoffold(e, { threshold: 0 });
      },
    });
})(jQuery, window, document);
