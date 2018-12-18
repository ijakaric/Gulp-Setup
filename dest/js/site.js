"use strict";

(function () {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
				}var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
					var n = e[i][1][r];return o(n || r);
				}, p, p.exports, r, e, n, t);
			}return n[i].exports;
		}for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
			o(t[i]);
		}return o;
	}return r;
})()({ 1: [function (require, module, exports) {
		"use strict";

		module.exports = {
			$dom: {
				window: $('window'),
				body: $('body')
			},

			vars: {
				windowWidth: window.innerWidth
			},

			functions: {
				escKey: function escKey(callback) {
					$(document).on('keyup', function (e) {
						if (e.keyCode === 27) {
							callback();
						}
					});
				},

				clickOutsideContainer: function clickOutsideContainer(selector, container, closeBtn, callback) {
					selector.on('mouseup', function (e) {
						e.preventDefault();
						if (!container.is(e.target) && container.has(e.target).length === 0 && !closeBtn.is(e.target)) {
							callback();
						}
					});
				}
			}
		};
	}, {}], 2: [function (require, module, exports) {
		"use strict";

		var Global = require('./global');
		module.exports = {
			/*-------------------------------------------------------------------------------
   	# Cache dom and strings
   -------------------------------------------------------------------------------*/
			$dom: {
				menuBtn: $('.js-menu-btn'),
				menuNav: $('.js-main-nav'),
				menuHasSub: $('.menu-item-has-children')
			},

			classes: {
				open: 'open',
				openMenu: 'menu-open'
			},

			/*-------------------------------------------------------------------------------
   	# Initialize
   -------------------------------------------------------------------------------*/
			init: function init() {
				// get dom and strings
				var $dom = this.$dom;
				var classes = this.classes;

				// functions
				function closeNav() {
					$dom.menuBtn.removeClass(classes.open);
					$dom.menuNav.removeClass(classes.open);
					Global.$dom.body.removeClass(classes.openMenu);
				}

				if (Global.vars.windowWidth < 768) {
					$dom.menuHasSub.each(function (i, el) {
						$(el).append('<span class="sub-icon font-plus-circle" data-open-sub></span>');
					});
				}

				// bind events
				$dom.menuBtn.on('click', function (e) {
					e.preventDefault();
					$dom.menuBtn.toggleClass(classes.open);
					$dom.menuNav.toggleClass(classes.open);
					Global.$dom.body.toggleClass(classes.openMenu);
				});

				$dom.menuNav.on('click', '[data-open-sub]', function () {
					if (Global.vars.windowWidth < 768) {
						$(this).siblings('.sub-menu').slideToggle();
					}
				});

				Global.functions.clickOutsideContainer($dom.menuNav, $dom.menuNav.children('ul'), $dom.menuBtn, closeNav);

				Global.functions.escKey(closeNav);
			}
		};
	}, { "./global": 1 }], 3: [function (require, module, exports) {
		"use strict";

		module.exports = {
			/*-------------------------------------------------------------------------------
   	# Cache dom and strings
   -------------------------------------------------------------------------------*/
			$dom: {
				slider: $('.js-slider')
			},

			/*-------------------------------------------------------------------------------
   	# Initialize
   -------------------------------------------------------------------------------*/
			init: function init() {
				// get dom and strings
				var $dom = this.$dom;

				// slider
				$dom.slider.slick({
					infinite: true,
					slidesToShow: 4,
					slidesToScroll: 1,
					speed: 1000,
					arrows: false,
					responsive: [{
						breakpoint: 991,
						settings: {
							slidesToShow: 3
						}
					}, {
						breakpoint: 767,
						settings: {
							slidesToShow: 2
						}
					}]
				});
			}
		};
	}, {}], 4: [function (require, module, exports) {
		jQuery(function ($) {
			// Site Menu
			var menu = require('./_site/menu');
			menu.init();

			// Slick Slider
			var sliders = require('./_site/sliders');
			sliders.init();
		});
	}, { "./_site/menu": 2, "./_site/sliders": 3 }] }, {}, [4]);