!(function (n, i, t) {
  "use strict";
  var s = i.Modernizr,
    e = n("body");
  (n.DLMenu = function (i, t) {
    (this.$el = n(t)), this._init(i);
  }),
    (n.DLMenu.defaults = {
      animationClasses: {
        classin: "dl-animate-in-1",
        classout: "dl-animate-out-1",
      },
      onLevelClick: function (n, i) {
        return !1;
      },
      onLinkClick: function (n, i) {
        return !1;
      },
    }),
    (n.DLMenu.prototype = {
      _init: function (i) {
        (this.options = n.extend(!0, {}, n.DLMenu.defaults, i)),
          this._config(),
          (this.animEndEventName =
            {
              WebkitAnimation: "webkitAnimationEnd",
              OAnimation: "oAnimationEnd",
              msAnimation: "MSAnimationEnd",
              animation: "animationend",
            }[s.prefixed("animation")] + ".dlmenu"),
          (this.transEndEventName =
            {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd",
              msTransition: "MSTransitionEnd",
              transition: "transitionend",
            }[s.prefixed("transition")] + ".dlmenu"),
          (this.supportAnimations = s.cssanimations),
          (this.supportTransitions = s.csstransitions),
          this._initEvents();
      },
      _config: function () {
        (this.open = !1),
          (this.$trigger = this.$el.children(".dl-trigger")),
          (this.$menu = this.$el.children("ul.navbar-nav")),
          (this.$menuitems = this.$menu.find("li:not(.dl-back)")),
          this.$el
            .find("ul.sub-menu")
            .prepend('<li class="dl-back"><a href="#">back</a></li>'),
          (this.$back = this.$menu.find("li.dl-back"));
      },
      _initEvents: function () {
        var i = this;
        this.$trigger.on("click.dlmenu", function () {
          return i.open ? i._closeMenu() : i._openMenu(), !1;
        }),
          this.$menuitems.on("click.dlmenu", function (t) {
            t.stopPropagation();
            var s = n(this),
              e = s.children("ul.sub-menu");
            if (e.length > 0) {
              var a = e.clone().css("opacity", 0).insertAfter(i.$menu),
                o = function () {
                  i.$menu
                    .off(i.animEndEventName)
                    .removeClass(i.options.animationClasses.classout)
                    .addClass("dl-subview"),
                    s
                      .addClass("dl-subviewopen")
                      .parents(".dl-subviewopen:first")
                      .removeClass("dl-subviewopen")
                      .addClass("dl-subview"),
                    a.remove();
                };
              return (
                setTimeout(function () {
                  a.addClass(i.options.animationClasses.classin),
                    i.$menu.addClass(i.options.animationClasses.classout),
                    i.supportAnimations
                      ? i.$menu.on(i.animEndEventName, o)
                      : o.call(),
                    i.options.onLevelClick(s, s.children("a:first").text());
                }),
                !1
              );
            }
            i.options.onLinkClick(s, t);
          }),
          this.$back.on("click.dlmenu", function (t) {
            var s = n(this),
              e = s.parents("ul.sub-menu:first"),
              a = e.parent(),
              o = e.clone().insertAfter(i.$menu),
              l = function () {
                i.$menu
                  .off(i.animEndEventName)
                  .removeClass(i.options.animationClasses.classin),
                  o.remove();
              };
            return (
              setTimeout(function () {
                o.addClass(i.options.animationClasses.classout),
                  i.$menu.addClass(i.options.animationClasses.classin),
                  i.supportAnimations
                    ? i.$menu.on(i.animEndEventName, l)
                    : l.call(),
                  a.removeClass("dl-subviewopen");
                var n = s.parents(".dl-subview:first");
                n.is("li") && n.addClass("dl-subviewopen"),
                  n.removeClass("dl-subview");
              }),
              !1
            );
          });
      },
      closeMenu: function () {
        this.open && this._closeMenu();
      },
      _closeMenu: function () {
        var n = this,
          i = function () {
            n.$menu.off(n.transEndEventName), n._resetMenu();
          };
        this.$menu.removeClass("navbar-navopen"),
          this.$menu.addClass("navbar-nav-toggle"),
          this.$trigger.removeClass("dl-active"),
          this.supportTransitions
            ? this.$menu.on(this.transEndEventName, i)
            : i.call(),
          (this.open = !1);
      },
      openMenu: function () {
        this.open || this._openMenu();
      },
      _openMenu: function () {
        var i = this;
        e.off("click").on("click.dlmenu", function () {
          i._closeMenu();
        }),
          this.$menu
            .addClass("navbar-navopen navbar-nav-toggle")
            .on(this.transEndEventName, function () {
              n(this).removeClass("navbar-nav-toggle");
            }),
          this.$trigger.addClass("dl-active"),
          (this.open = !0);
      },
      _resetMenu: function () {
        this.$menu.removeClass("dl-subview"),
          this.$menuitems.removeClass("dl-subview dl-subviewopen");
      },
    });
  var a = function (n) {
    i.console && i.console.error(n);
  };
  n.fn.dlmenu = function (i) {
    if ("string" == typeof i) {
      var t = Array.prototype.slice.call(arguments, 1);
      this.each(function () {
        var s = n.data(this, "dlmenu");
        if (!s) {
          a(
            "cannot call methods on dlmenu prior to initialization; attempted to call method '" +
              i +
              "'"
          );
          return;
        }
        if (!n.isFunction(s[i]) || "_" === i.charAt(0)) {
          a("no such method '" + i + "' for dlmenu instance");
          return;
        }
        s[i].apply(s, t);
      });
    } else
      this.each(function () {
        var t = n.data(this, "dlmenu");
        t ? t._init() : (t = n.data(this, "dlmenu", new n.DLMenu(i, this)));
      });
    return this;
  };
})(jQuery, window);
