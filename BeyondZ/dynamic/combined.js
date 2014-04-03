
/*
File: jquery.carouFredSel-6.1.0-packed.js
*/
/*
 *	jQuery carouFredSel 6.1.0
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function ($) {
	if ($.fn.carouFredSel) {
		return
	}
	$.fn.caroufredsel = $.fn.carouFredSel = function (u, w) {
		if (this.length == 0) {
			debug(true, 'No element found for "' + this.selector + '".');
			return this
		}
		if (this.length > 1) {
			return this.each(function () {
				$(this).carouFredSel(u, w)
			})
		}
		var y = this,
		$tt0 = this[0],
		starting_position = false;
		if (y.data('_cfs_isCarousel')) {
			starting_position = y.triggerHandler('_cfs_triggerEvent', 'currentPosition');
			y.trigger('_cfs_triggerEvent', ['destroy', true])
		}
		y._cfs_init = function (o, a, b) {
			o = go_getObject($tt0, o);
			o.items = go_getItemsObject($tt0, o.items);
			o.scroll = go_getScrollObject($tt0, o.scroll);
			o.auto = go_getAutoObject($tt0, o.auto);
			o.prev = go_getPrevNextObject($tt0, o.prev);
			o.next = go_getPrevNextObject($tt0, o.next);
			o.pagination = go_getPaginationObject($tt0, o.pagination);
			o.swipe = go_getSwipeObject($tt0, o.swipe);
			o.mousewheel = go_getMousewheelObject($tt0, o.mousewheel);
			if (a) {
				opts_orig = $.extend(true, {},
				$.fn.carouFredSel.defaults, o)
			}
			opts = $.extend(true, {},
			$.fn.carouFredSel.defaults, o);
			opts.d = cf_getDimensions(opts);
			z.direction = (opts.direction == 'up' || opts.direction == 'left') ? 'next': 'prev';
			var c = y.children(),
			avail_primary = ms_getParentSize($wrp, opts, 'width');
			if (is_true(opts.cookie)) {
				opts.cookie = 'caroufredsel_cookie_' + conf.serialNumber
			}
			opts.maxDimension = ms_getMaxDimension(opts, avail_primary);
			opts.items = in_complementItems(opts.items, opts, c, b);
			opts[opts.d['width']] = in_complementPrimarySize(opts[opts.d['width']], opts, c);
			opts[opts.d['height']] = in_complementSecondarySize(opts[opts.d['height']], opts, c);
			if (opts.responsive) {
				if (!is_percentage(opts[opts.d['width']])) {
					opts[opts.d['width']] = '100%'
				}
			}
			if (is_percentage(opts[opts.d['width']])) {
				z.upDateOnWindowResize = true;
				z.primarySizePercentage = opts[opts.d['width']];
				opts[opts.d['width']] = ms_getPercentage(avail_primary, z.primarySizePercentage);
				if (!opts.items.visible) {
					opts.items.visibleConf.variable = true
				}
			}
			if (opts.responsive) {
				opts.usePadding = false;
				opts.padding = [0, 0, 0, 0];
				opts.align = false;
				opts.items.visibleConf.variable = false
			} else {
				if (!opts.items.visible) {
					opts = in_complementVisibleItems(opts, avail_primary)
				}
				if (!opts[opts.d['width']]) {
					if (!opts.items.visibleConf.variable && is_number(opts.items[opts.d['width']]) && opts.items.filter == '*') {
						opts[opts.d['width']] = opts.items.visible * opts.items[opts.d['width']];
						opts.align = false
					} else {
						opts[opts.d['width']] = 'variable'
					}
				}
				if (is_undefined(opts.align)) {
					opts.align = (is_number(opts[opts.d['width']])) ? 'center': false
				}
				if (opts.items.visibleConf.variable) {
					opts.items.visible = gn_getVisibleItemsNext(c, opts, 0)
				}
			}
			if (opts.items.filter != '*' && !opts.items.visibleConf.variable) {
				opts.items.visibleConf.org = opts.items.visible;
				opts.items.visible = gn_getVisibleItemsNextFilter(c, opts, 0)
			}
			opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0);
			opts.items.visibleConf.old = opts.items.visible;
			if (opts.responsive) {
				if (!opts.items.visibleConf.min) {
					opts.items.visibleConf.min = opts.items.visible
				}
				if (!opts.items.visibleConf.max) {
					opts.items.visibleConf.max = opts.items.visible
				}
				opts = in_getResponsiveValues(opts, c, avail_primary)
			} else {
				opts.padding = cf_getPadding(opts.padding);
				if (opts.align == 'top') {
					opts.align = 'left'
				} else if (opts.align == 'bottom') {
					opts.align = 'right'
				}
				switch (opts.align) {
				case 'center':
				case 'left':
				case 'right':
					if (opts[opts.d['width']] != 'variable') {
						opts = in_getAlignPadding(opts, c);
						opts.usePadding = true
					}
					break;
				default:
					opts.align = false;
					opts.usePadding = (opts.padding[0] == 0 && opts.padding[1] == 0 && opts.padding[2] == 0 && opts.padding[3] == 0) ? false: true;
					break
				}
			}
			if (!is_number(opts.scroll.duration)) {
				opts.scroll.duration = 500
			}
			if (is_undefined(opts.scroll.items)) {
				opts.scroll.items = (opts.responsive || opts.items.visibleConf.variable || opts.items.filter != '*') ? 'visible': opts.items.visible
			}
			opts.auto = $.extend(true, {},
			opts.scroll, opts.auto);
			opts.prev = $.extend(true, {},
			opts.scroll, opts.prev);
			opts.next = $.extend(true, {},
			opts.scroll, opts.next);
			opts.pagination = $.extend(true, {},
			opts.scroll, opts.pagination);
			opts.auto = go_complementAutoObject($tt0, opts.auto);
			opts.prev = go_complementPrevNextObject($tt0, opts.prev);
			opts.next = go_complementPrevNextObject($tt0, opts.next);
			opts.pagination = go_complementPaginationObject($tt0, opts.pagination);
			opts.swipe = go_complementSwipeObject($tt0, opts.swipe);
			opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel);
			if (opts.synchronise) {
				opts.synchronise = cf_getSynchArr(opts.synchronise)
			}
			if (opts.auto.onPauseStart) {
				opts.auto.onTimeoutStart = opts.auto.onPauseStart;
				deprecated('auto.onPauseStart', 'auto.onTimeoutStart')
			}
			if (opts.auto.onPausePause) {
				opts.auto.onTimeoutPause = opts.auto.onPausePause;
				deprecated('auto.onPausePause', 'auto.onTimeoutPause')
			}
			if (opts.auto.onPauseEnd) {
				opts.auto.onTimeoutEnd = opts.auto.onPauseEnd;
				deprecated('auto.onPauseEnd', 'auto.onTimeoutEnd')
			}
			if (opts.auto.pauseDuration) {
				opts.auto.timeoutDuration = opts.auto.pauseDuration;
				deprecated('auto.pauseDuration', 'auto.timeoutDuration')
			}
		};
		y._cfs_build = function () {
			y.data('_cfs_isCarousel', true);
			var a = y.children(),
			orgCSS = in_mapCss(y, ['textAlign', 'float', 'position', 'top', 'right', 'bottom', 'left', 'zIndex', 'width', 'height', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft']),
			newPosition = 'relative';
			switch (orgCSS.position) {
			case 'absolute':
			case 'fixed':
				newPosition = orgCSS.position;
				break
			}
			$wrp.css(orgCSS).css({
				'overflow': 'hidden',
				'position': newPosition
			});
			y.data('_cfs_origCss', orgCSS).css({
				'textAlign': 'left',
				'float': 'none',
				'position': 'absolute',
				'top': 0,
				'right': 'auto',
				'bottom': 'auto',
				'left': 0,
				'marginTop': 0,
				'marginRight': 0,
				'marginBottom': 0,
				'marginLeft': 0
			});
			sz_storeMargin(a, opts);
			sz_storeSizes(a, opts);
			if (opts.responsive) {
				sz_setResponsiveSizes(opts, a)
			}
		};
		y._cfs_bind_events = function () {
			y._cfs_unbind_events();
			y.bind(cf_e('stop', conf), function (e, a) {
				e.stopPropagation();
				if (!z.isStopped) {
					if (opts.auto.button) {
						opts.auto.button.addClass(cf_c('stopped', conf))
					}
				}
				z.isStopped = true;
				if (opts.auto.play) {
					opts.auto.play = false;
					y.trigger(cf_e('pause', conf), a)
				}
				return true
			});
			y.bind(cf_e('finish', conf), function (e) {
				e.stopPropagation();
				if (z.isScrolling) {
					sc_stopScroll(scrl)
				}
				return true
			});
			y.bind(cf_e('pause', conf), function (e, a, b) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);
				if (a && z.isScrolling) {
					scrl.isStopped = true;
					var c = getTime() - scrl.startTime;
					scrl.duration -= c;
					if (scrl.pre) {
						scrl.pre.duration -= c
					}
					if (scrl.post) {
						scrl.post.duration -= c
					}
					sc_stopScroll(scrl, false)
				}
				if (!z.isPaused && !z.isScrolling) {
					if (b) {
						tmrs.timePassed += getTime() - tmrs.startTime
					}
				}
				if (!z.isPaused) {
					if (opts.auto.button) {
						opts.auto.button.addClass(cf_c('paused', conf))
					}
				}
				z.isPaused = true;
				if (opts.auto.onTimeoutPause) {
					var d = opts.auto.timeoutDuration - tmrs.timePassed,
					perc = 100 - Math.ceil(d * 100 / opts.auto.timeoutDuration);
					opts.auto.onTimeoutPause.call($tt0, perc, d)
				}
				return true
			});
			y.bind(cf_e('play', conf), function (e, b, c, d) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);
				var v = [b, c, d],
				t = ['string', 'number', 'boolean'],
				a = cf_sortParams(v, t);
				b = a[0];
				c = a[1];
				d = a[2];
				if (b != 'prev' && b != 'next') {
					b = z.direction
				}
				if (!is_number(c)) {
					c = 0
				}
				if (!is_boolean(d)) {
					d = false
				}
				if (d) {
					z.isStopped = false;
					opts.auto.play = true
				}
				if (!opts.auto.play) {
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel stopped: Not scrolling.')
				}
				if (z.isPaused) {
					if (opts.auto.button) {
						opts.auto.button.removeClass(cf_c('stopped', conf));
						opts.auto.button.removeClass(cf_c('paused', conf))
					}
				}
				z.isPaused = false;
				tmrs.startTime = getTime();
				var f = opts.auto.timeoutDuration + c;
				dur2 = f - tmrs.timePassed;
				perc = 100 - Math.ceil(dur2 * 100 / f);
				if (opts.auto.progress) {
					tmrs.progress = setInterval(function () {
						var a = getTime() - tmrs.startTime + tmrs.timePassed,
						perc = Math.ceil(a * 100 / f);
						opts.auto.progress.updater.call(opts.auto.progress.bar[0], perc)
					},
					opts.auto.progress.interval)
				}
				tmrs.auto = setTimeout(function () {
					if (opts.auto.progress) {
						opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100)
					}
					if (opts.auto.onTimeoutEnd) {
						opts.auto.onTimeoutEnd.call($tt0, perc, dur2)
					}
					if (z.isScrolling) {
						y.trigger(cf_e('play', conf), b)
					} else {
						y.trigger(cf_e(b, conf), opts.auto)
					}
				},
				dur2);
				if (opts.auto.onTimeoutStart) {
					opts.auto.onTimeoutStart.call($tt0, perc, dur2)
				}
				return true
			});
			y.bind(cf_e('resume', conf), function (e) {
				e.stopPropagation();
				if (scrl.isStopped) {
					scrl.isStopped = false;
					z.isPaused = false;
					z.isScrolling = true;
					scrl.startTime = getTime();
					sc_startScroll(scrl)
				} else {
					y.trigger(cf_e('play', conf))
				}
				return true
			});
			y.bind(cf_e('prev', conf) + ' ' + cf_e('next', conf), function (e, b, f, g, h) {
				e.stopPropagation();
				if (z.isStopped || y.is(':hidden')) {
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel stopped or hidden: Not scrolling.')
				}
				var i = (is_number(opts.items.minimum)) ? opts.items.minimum: opts.items.visible + 1;
				if (i > itms.total) {
					e.stopImmediatePropagation();
					return debug(conf, 'Not enough items (' + itms.total + ' total, ' + i + ' needed): Not scrolling.')
				}
				var v = [b, f, g, h],
				t = ['object', 'number/string', 'function', 'boolean'],
				a = cf_sortParams(v, t);
				b = a[0];
				f = a[1];
				g = a[2];
				h = a[3];
				var k = e.type.slice(conf.events.prefix.length);
				if (!is_object(b)) {
					b = {}
				}
				if (is_function(g)) {
					b.onAfter = g
				}
				if (is_boolean(h)) {
					b.queue = h
				}
				b = $.extend(true, {},
				opts[k], b);
				if (b.conditions && !b.conditions.call($tt0, k)) {
					e.stopImmediatePropagation();
					return debug(conf, 'Callback "conditions" returned false.')
				}
				if (!is_number(f)) {
					if (opts.items.filter != '*') {
						f = 'visible'
					} else {
						var m = [f, b.items, opts[k].items];
						for (var a = 0, l = m.length; a < l; a++) {
							if (is_number(m[a]) || m[a] == 'page' || m[a] == 'visible') {
								f = m[a];
								break
							}
						}
					}
					switch (f) {
					case 'page':
						e.stopImmediatePropagation();
						return y.triggerHandler(cf_e(k + 'Page', conf), [b, g]);
						break;
					case 'visible':
						if (!opts.items.visibleConf.variable && opts.items.filter == '*') {
							f = opts.items.visible
						}
						break
					}
				}
				if (scrl.isStopped) {
					y.trigger(cf_e('resume', conf));
					y.trigger(cf_e('queue', conf), [k, [b, f, g]]);
					e.stopImmediatePropagation();
					return debug(conf, 'Carousel resumed scrolling.')
				}
				if (b.duration > 0) {
					if (z.isScrolling) {
						if (b.queue) {
							if (b.queue == 'last') {
								queu = []
							}
							if (b.queue != 'first' || queu.length == 0) {
								y.trigger(cf_e('queue', conf), [k, [b, f, g]])
							}
						}
						e.stopImmediatePropagation();
						return debug(conf, 'Carousel currently scrolling.')
					}
				}
				tmrs.timePassed = 0;
				y.trigger(cf_e('slide_' + k, conf), [b, f]);
				if (opts.synchronise) {
					var s = opts.synchronise,
					c = [b, f];
					for (var j = 0, l = s.length; j < l; j++) {
						var d = k;
						if (!s[j][2]) {
							d = (d == 'prev') ? 'next': 'prev'
						}
						if (!s[j][1]) {
							c[0] = s[j][0].triggerHandler('_cfs_triggerEvent', ['configuration', d])
						}
						c[1] = f + s[j][3];
						s[j][0].trigger('_cfs_triggerEvent', ['slide_' + d, c])
					}
				}
				return true
			});
			y.bind(cf_e('slide_prev', conf), function (e, b, c) {
				e.stopPropagation();
				var d = y.children();
				if (!opts.circular) {
					if (itms.first == 0) {
						if (opts.infinite) {
							y.trigger(cf_e('next', conf), itms.total - 1)
						}
						return e.stopImmediatePropagation()
					}
				}
				sz_resetMargin(d, opts);
				if (!is_number(c)) {
					if (opts.items.visibleConf.variable) {
						c = gn_getVisibleItemsPrev(d, opts, itms.total - 1)
					} else if (opts.items.filter != '*') {
						var f = (is_number(b.items)) ? b.items: gn_getVisibleOrg(y, opts);
						c = gn_getScrollItemsPrevFilter(d, opts, itms.total - 1, f)
					} else {
						c = opts.items.visible
					}
					c = cf_getAdjust(c, opts, b.items, $tt0)
				}
				if (!opts.circular) {
					if (itms.total - c < itms.first) {
						c = itms.total - itms.first
					}
				}
				opts.items.visibleConf.old = opts.items.visible;
				if (opts.items.visibleConf.variable) {
					var g = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0);
					if (opts.items.visible + c <= g && c < itms.total) {
						c++;
						g = cf_getItemsAdjust(gn_getVisibleItemsNext(d, opts, itms.total - c), opts, opts.items.visibleConf.adjust, $tt0)
					}
					opts.items.visible = g
				} else if (opts.items.filter != '*') {
					var g = gn_getVisibleItemsNextFilter(d, opts, itms.total - c);
					opts.items.visible = cf_getItemsAdjust(g, opts, opts.items.visibleConf.adjust, $tt0)
				}
				sz_resetMargin(d, opts, true);
				if (c == 0) {
					e.stopImmediatePropagation();
					return debug(conf, '0 items to scroll: Not scrolling.')
				}
				debug(conf, 'Scrolling ' + c + ' items backward.');
				itms.first += c;
				while (itms.first >= itms.total) {
					itms.first -= itms.total
				}
				if (!opts.circular) {
					if (itms.first == 0 && b.onEnd) {
						b.onEnd.call($tt0, 'prev')
					}
					if (!opts.infinite) {
						nv_enableNavi(opts, itms.first, conf)
					}
				}
				y.children().slice(itms.total - c, itms.total).prependTo(y);
				if (itms.total < opts.items.visible + c) {
					y.children().slice(0, (opts.items.visible + c) - itms.total).clone(true).appendTo(y)
				}
				var d = y.children(),
				i_old = gi_getOldItemsPrev(d, opts, c),
				i_new = gi_getNewItemsPrev(d, opts),
				i_cur_l = d.eq(c - 1),
				i_old_l = i_old.last(),
				i_new_l = i_new.last();
				sz_resetMargin(d, opts);
				var h = 0,
				pR = 0;
				if (opts.align) {
					var p = cf_getAlignPadding(i_new, opts);
					h = p[0];
					pR = p[1]
				}
				var i = (h < 0) ? opts.padding[opts.d[3]] : 0;
				var j = false,
				i_skp = $();
				if (opts.items.visible < c) {
					i_skp = d.slice(opts.items.visibleConf.old, c);
					if (b.fx == 'directscroll') {
						var k = opts.items[opts.d['width']];
						j = i_skp;
						i_cur_l = i_new_l;
						sc_hideHiddenItems(j);
						opts.items[opts.d['width']] = 'variable'
					}
				}
				var l = false,
				i_siz = ms_getTotalSize(d.slice(0, c), opts, 'width'),
				w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, true), opts, !opts.usePadding),
				i_siz_vis = 0,
				a_cfs = {},
				a_wsz = {},
				a_cur = {},
				a_old = {},
				a_new = {},
				a_lef = {},
				a_lef_vis = {},
				a_dur = sc_getDuration(b, opts, c, i_siz);
				switch (b.fx) {
				case 'cover':
				case 'cover-fade':
					i_siz_vis = ms_getTotalSize(d.slice(0, opts.items.visible), opts, 'width');
					break
				}
				if (j) {
					opts.items[opts.d['width']] = k
				}
				sz_resetMargin(d, opts, true);
				if (pR >= 0) {
					sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]])
				}
				if (h >= 0) {
					sz_resetMargin(i_cur_l, opts, opts.padding[opts.d[3]])
				}
				if (opts.align) {
					opts.padding[opts.d[1]] = pR;
					opts.padding[opts.d[3]] = h
				}
				a_lef[opts.d['left']] = -(i_siz - i);
				a_lef_vis[opts.d['left']] = -(i_siz_vis - i);
				a_wsz[opts.d['left']] = w_siz[opts.d['width']];
				var m = function () {},
				_a_wrapper = function () {},
				_s_paddingold = function () {},
				_a_paddingold = function () {},
				_s_paddingnew = function () {},
				_a_paddingnew = function () {},
				_s_paddingcur = function () {},
				_a_paddingcur = function () {},
				_onafter = function () {},
				_moveitems = function () {},
				_position = function () {};
				switch (b.fx) {
				case 'crossfade':
				case 'cover':
				case 'cover-fade':
				case 'uncover':
				case 'uncover-fade':
					l = y.clone(true).appendTo($wrp);
					break
				}
				switch (b.fx) {
				case 'crossfade':
				case 'uncover':
				case 'uncover-fade':
					l.children().slice(0, c).remove();
					l.children().slice(opts.items.visibleConf.old).remove();
					break;
				case 'cover':
				case 'cover-fade':
					l.children().slice(opts.items.visible).remove();
					l.css(a_lef_vis);
					break
				}
				y.css(a_lef);
				scrl = sc_setScroll(a_dur, b.easing);
				a_cfs[opts.d['left']] = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;
				if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable') {
					m = function () {
						$wrp.css(w_siz)
					};
					_a_wrapper = function () {
						scrl.anims.push([$wrp, w_siz])
					}
				}
				if (opts.usePadding) {
					if (i_new_l.not(i_cur_l).length) {
						a_cur[opts.d['marginRight']] = i_cur_l.data('_cfs_origCssMargin');
						if (h < 0) {
							i_cur_l.css(a_cur)
						} else {
							_s_paddingcur = function () {
								i_cur_l.css(a_cur)
							};
							_a_paddingcur = function () {
								scrl.anims.push([i_cur_l, a_cur])
							}
						}
					}
					switch (b.fx) {
					case 'cover':
					case 'cover-fade':
						l.children().eq(c - 1).css(a_cur);
						break
					}
					if (i_new_l.not(i_old_l).length) {
						a_old[opts.d['marginRight']] = i_old_l.data('_cfs_origCssMargin');
						_s_paddingold = function () {
							i_old_l.css(a_old)
						};
						_a_paddingold = function () {
							scrl.anims.push([i_old_l, a_old])
						}
					}
					if (pR >= 0) {
						a_new[opts.d['marginRight']] = i_new_l.data('_cfs_origCssMargin') + opts.padding[opts.d[1]];
						_s_paddingnew = function () {
							i_new_l.css(a_new)
						};
						_a_paddingnew = function () {
							scrl.anims.push([i_new_l, a_new])
						}
					}
				}
				_position = function () {
					y.css(a_cfs)
				};
				var n = opts.items.visible + c - itms.total;
				_moveitems = function () {
					if (n > 0) {
						y.children().slice(itms.total).remove();
						i_old = $(y.children().slice(itms.total - (opts.items.visible - n)).get().concat(y.children().slice(0, n).get()))
					}
					sc_showHiddenItems(j);
					if (opts.usePadding) {
						var a = y.children().eq(opts.items.visible + c - 1);
						a.css(opts.d['marginRight'], a.data('_cfs_origCssMargin'))
					}
				};
				var o = sc_mapCallbackArguments(i_old, i_skp, i_new, c, 'prev', a_dur, w_siz);
				_onafter = function () {
					sc_afterScroll(y, l, b);
					z.isScrolling = false;
					clbk.onAfter = sc_fireCallbacks($tt0, b, 'onAfter', o, clbk);
					queu = sc_fireQueue(y, queu, conf);
					if (!z.isPaused) {
						y.trigger(cf_e('play', conf))
					}
				};
				z.isScrolling = true;
				tmrs = sc_clearTimers(tmrs);
				clbk.onBefore = sc_fireCallbacks($tt0, b, 'onBefore', o, clbk);
				switch (b.fx) {
				case 'none':
					y.css(a_cfs);
					m();
					_s_paddingold();
					_s_paddingnew();
					_s_paddingcur();
					_position();
					_moveitems();
					_onafter();
					break;
				case 'fade':
					scrl.anims.push([y, {
						'opacity': 0
					},
					function () {
						m();
						_s_paddingold();
						_s_paddingnew();
						_s_paddingcur();
						_position();
						_moveitems();
						scrl = sc_setScroll(a_dur, b.easing);
						scrl.anims.push([y, {
							'opacity': 1
						},
						_onafter]);
						sc_startScroll(scrl)
					}]);
					break;
				case 'crossfade':
					y.css({
						'opacity':
						0
					});
					scrl.anims.push([l, {
						'opacity': 0
					}]);
					scrl.anims.push([y, {
						'opacity': 1
					},
					_onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingnew();
					_s_paddingcur();
					_position();
					_moveitems();
					break;
				case 'cover':
					scrl.anims.push([l, a_cfs, function () {
						_s_paddingold();
						_s_paddingnew();
						_s_paddingcur();
						_position();
						_moveitems();
						_onafter()
					}]);
					_a_wrapper();
					break;
				case 'cover-fade':
					scrl.anims.push([y, {
						'opacity': 0
					}]);
					scrl.anims.push([l, a_cfs, function () {
						y.css({
							'opacity': 1
						});
						_s_paddingold();
						_s_paddingnew();
						_s_paddingcur();
						_position();
						_moveitems();
						_onafter()
					}]);
					_a_wrapper();
					break;
				case 'uncover':
					scrl.anims.push([l, a_wsz, _onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingnew();
					_s_paddingcur();
					_position();
					_moveitems();
					break;
				case 'uncover-fade':
					y.css({
						'opacity':
						0
					});
					scrl.anims.push([y, {
						'opacity': 1
					}]);
					scrl.anims.push([l, a_wsz, _onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingnew();
					_s_paddingcur();
					_position();
					_moveitems();
					break;
				default:
					scrl.anims.push([y, a_cfs, function () {
						_moveitems();
						_onafter()
					}]);
					_a_wrapper();
					_a_paddingold();
					_a_paddingnew();
					_a_paddingcur();
					break
				}
				sc_startScroll(scrl);
				cf_setCookie(opts.cookie, y, conf);
				y.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);
				return true
			});
			y.bind(cf_e('slide_next', conf), function (e, c, d) {
				e.stopPropagation();
				var f = y.children();
				if (!opts.circular) {
					if (itms.first == opts.items.visible) {
						if (opts.infinite) {
							y.trigger(cf_e('prev', conf), itms.total - 1)
						}
						return e.stopImmediatePropagation()
					}
				}
				sz_resetMargin(f, opts);
				if (!is_number(d)) {
					if (opts.items.filter != '*') {
						var g = (is_number(c.items)) ? c.items: gn_getVisibleOrg(y, opts);
						d = gn_getScrollItemsNextFilter(f, opts, 0, g)
					} else {
						d = opts.items.visible
					}
					d = cf_getAdjust(d, opts, c.items, $tt0)
				}
				var h = (itms.first == 0) ? itms.total: itms.first;
				if (!opts.circular) {
					if (opts.items.visibleConf.variable) {
						var i = gn_getVisibleItemsNext(f, opts, d),
						g = gn_getVisibleItemsPrev(f, opts, h - 1)
					} else {
						var i = opts.items.visible,
						g = opts.items.visible
					}
					if (d + i > h) {
						d = h - g
					}
				}
				opts.items.visibleConf.old = opts.items.visible;
				if (opts.items.visibleConf.variable) {
					var i = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(f, opts, d, h), opts, opts.items.visibleConf.adjust, $tt0);
					while (opts.items.visible - d >= i && d < itms.total) {
						d++;
						i = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(f, opts, d, h), opts, opts.items.visibleConf.adjust, $tt0)
					}
					opts.items.visible = i
				} else if (opts.items.filter != '*') {
					var i = gn_getVisibleItemsNextFilter(f, opts, d);
					opts.items.visible = cf_getItemsAdjust(i, opts, opts.items.visibleConf.adjust, $tt0)
				}
				sz_resetMargin(f, opts, true);
				if (d == 0) {
					e.stopImmediatePropagation();
					return debug(conf, '0 items to scroll: Not scrolling.')
				}
				debug(conf, 'Scrolling ' + d + ' items forward.');
				itms.first -= d;
				while (itms.first < 0) {
					itms.first += itms.total
				}
				if (!opts.circular) {
					if (itms.first == opts.items.visible && c.onEnd) {
						c.onEnd.call($tt0, 'next')
					}
					if (!opts.infinite) {
						nv_enableNavi(opts, itms.first, conf)
					}
				}
				if (itms.total < opts.items.visible + d) {
					y.children().slice(0, (opts.items.visible + d) - itms.total).clone(true).appendTo(y)
				}
				var f = y.children(),
				i_old = gi_getOldItemsNext(f, opts),
				i_new = gi_getNewItemsNext(f, opts, d),
				i_cur_l = f.eq(d - 1),
				i_old_l = i_old.last(),
				i_new_l = i_new.last();
				sz_resetMargin(f, opts);
				var j = 0,
				pR = 0;
				if (opts.align) {
					var p = cf_getAlignPadding(i_new, opts);
					j = p[0];
					pR = p[1]
				}
				var k = false,
				i_skp = $();
				if (opts.items.visibleConf.old < d) {
					i_skp = f.slice(opts.items.visibleConf.old, d);
					if (c.fx == 'directscroll') {
						var l = opts.items[opts.d['width']];
						k = i_skp;
						i_cur_l = i_old_l;
						sc_hideHiddenItems(k);
						opts.items[opts.d['width']] = 'variable'
					}
				}
				var m = false,
				i_siz = ms_getTotalSize(f.slice(0, d), opts, 'width'),
				w_siz = cf_mapWrapperSizes(ms_getSizes(i_new, opts, true), opts, !opts.usePadding),
				i_siz_vis = 0,
				a_cfs = {},
				a_cfs_vis = {},
				a_cur = {},
				a_old = {},
				a_lef = {},
				a_dur = sc_getDuration(c, opts, d, i_siz);
				switch (c.fx) {
				case 'uncover':
				case 'uncover-fade':
					i_siz_vis = ms_getTotalSize(f.slice(0, opts.items.visibleConf.old), opts, 'width');
					break
				}
				if (k) {
					opts.items[opts.d['width']] = l
				}
				if (opts.align) {
					if (opts.padding[opts.d[1]] < 0) {
						opts.padding[opts.d[1]] = 0
					}
				}
				sz_resetMargin(f, opts, true);
				sz_resetMargin(i_old_l, opts, opts.padding[opts.d[1]]);
				if (opts.align) {
					opts.padding[opts.d[1]] = pR;
					opts.padding[opts.d[3]] = j
				}
				a_lef[opts.d['left']] = (opts.usePadding) ? opts.padding[opts.d[3]] : 0;
				var n = function () {},
				_a_wrapper = function () {},
				_s_paddingold = function () {},
				_a_paddingold = function () {},
				_s_paddingcur = function () {},
				_a_paddingcur = function () {},
				_onafter = function () {},
				_moveitems = function () {},
				_position = function () {};
				switch (c.fx) {
				case 'crossfade':
				case 'cover':
				case 'cover-fade':
				case 'uncover':
				case 'uncover-fade':
					m = y.clone(true).appendTo($wrp);
					m.children().slice(opts.items.visibleConf.old).remove();
					break
				}
				switch (c.fx) {
				case 'crossfade':
				case 'cover':
				case 'cover-fade':
					y.css('zIndex', 1);
					m.css('zIndex', 0);
					break
				}
				scrl = sc_setScroll(a_dur, c.easing);
				a_cfs[opts.d['left']] = -i_siz;
				a_cfs_vis[opts.d['left']] = -i_siz_vis;
				if (j < 0) {
					a_cfs[opts.d['left']] += j
				}
				if (opts[opts.d['width']] == 'variable' || opts[opts.d['height']] == 'variable') {
					n = function () {
						$wrp.css(w_siz)
					};
					_a_wrapper = function () {
						scrl.anims.push([$wrp, w_siz])
					}
				}
				if (opts.usePadding) {
					var o = i_new_l.data('_cfs_origCssMargin');
					if (pR >= 0) {
						o += opts.padding[opts.d[1]]
					}
					i_new_l.css(opts.d['marginRight'], o);
					if (i_cur_l.not(i_old_l).length) {
						a_old[opts.d['marginRight']] = i_old_l.data('_cfs_origCssMargin')
					}
					_s_paddingold = function () {
						i_old_l.css(a_old)
					};
					_a_paddingold = function () {
						scrl.anims.push([i_old_l, a_old])
					};
					var q = i_cur_l.data('_cfs_origCssMargin');
					if (j > 0) {
						q += opts.padding[opts.d[3]]
					}
					a_cur[opts.d['marginRight']] = q;
					_s_paddingcur = function () {
						i_cur_l.css(a_cur)
					};
					_a_paddingcur = function () {
						scrl.anims.push([i_cur_l, a_cur])
					}
				}
				_position = function () {
					y.css(a_lef)
				};
				var r = opts.items.visible + d - itms.total;
				_moveitems = function () {
					if (r > 0) {
						y.children().slice(itms.total).remove()
					}
					var a = y.children().slice(0, d).appendTo(y).last();
					if (r > 0) {
						i_new = gi_getCurrentItems(f, opts)
					}
					sc_showHiddenItems(k);
					if (opts.usePadding) {
						if (itms.total < opts.items.visible + d) {
							var b = y.children().eq(opts.items.visible - 1);
							b.css(opts.d['marginRight'], b.data('_cfs_origCssMargin') + opts.padding[opts.d[3]])
						}
						a.css(opts.d['marginRight'], a.data('_cfs_origCssMargin'))
					}
				};
				var s = sc_mapCallbackArguments(i_old, i_skp, i_new, d, 'next', a_dur, w_siz);
				_onafter = function () {
					y.css('zIndex', y.data('_cfs_origCss').zIndex);
					sc_afterScroll(y, m, c);
					z.isScrolling = false;
					clbk.onAfter = sc_fireCallbacks($tt0, c, 'onAfter', s, clbk);
					queu = sc_fireQueue(y, queu, conf);
					if (!z.isPaused) {
						y.trigger(cf_e('play', conf))
					}
				};
				z.isScrolling = true;
				tmrs = sc_clearTimers(tmrs);
				clbk.onBefore = sc_fireCallbacks($tt0, c, 'onBefore', s, clbk);
				switch (c.fx) {
				case 'none':
					y.css(a_cfs);
					n();
					_s_paddingold();
					_s_paddingcur();
					_position();
					_moveitems();
					_onafter();
					break;
				case 'fade':
					scrl.anims.push([y, {
						'opacity': 0
					},
					function () {
						n();
						_s_paddingold();
						_s_paddingcur();
						_position();
						_moveitems();
						scrl = sc_setScroll(a_dur, c.easing);
						scrl.anims.push([y, {
							'opacity': 1
						},
						_onafter]);
						sc_startScroll(scrl)
					}]);
					break;
				case 'crossfade':
					y.css({
						'opacity':
						0
					});
					scrl.anims.push([m, {
						'opacity': 0
					}]);
					scrl.anims.push([y, {
						'opacity': 1
					},
					_onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingcur();
					_position();
					_moveitems();
					break;
				case 'cover':
					y.css(opts.d['left'], $wrp[opts.d['width']]());
					scrl.anims.push([y, a_lef, _onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingcur();
					_moveitems();
					break;
				case 'cover-fade':
					y.css(opts.d['left'], $wrp[opts.d['width']]());
					scrl.anims.push([m, {
						'opacity': 0
					}]);
					scrl.anims.push([y, a_lef, _onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingcur();
					_moveitems();
					break;
				case 'uncover':
					scrl.anims.push([m, a_cfs_vis, _onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingcur();
					_position();
					_moveitems();
					break;
				case 'uncover-fade':
					y.css({
						'opacity':
						0
					});
					scrl.anims.push([y, {
						'opacity': 1
					}]);
					scrl.anims.push([m, a_cfs_vis, _onafter]);
					_a_wrapper();
					_s_paddingold();
					_s_paddingcur();
					_position();
					_moveitems();
					break;
				default:
					scrl.anims.push([y, a_cfs, function () {
						_position();
						_moveitems();
						_onafter()
					}]);
					_a_wrapper();
					_a_paddingold();
					_a_paddingcur();
					break

				}
				sc_startScroll(scrl);
				cf_setCookie(opts.cookie, y, conf);
				y.trigger(cf_e('updatePageStatus', conf), [false, w_siz]);
				return true
			});
			y.bind(cf_e('slideTo', conf), function (e, b, c, d, f, g, h) {
				e.stopPropagation();
				var v = [b, c, d, f, g, h],
				t = ['string/number/object', 'number', 'boolean', 'object', 'string', 'function'],
				a = cf_sortParams(v, t);
				f = a[3];
				g = a[4];
				h = a[5];
				b = gn_getItemIndex(a[0], a[1], a[2], itms, y);
				if (b == 0) {
					return false
				}
				if (!is_object(f)) {
					f = false
				}
				if (g != 'prev' && g != 'next') {
					if (opts.circular) {
						g = (b <= itms.total / 2) ? 'next': 'prev'
					} else {
						g = (itms.first == 0 || itms.first > b) ? 'next': 'prev'
					}
				}
				if (g == 'prev') {
					b = itms.total - b
				}
				y.trigger(cf_e(g, conf), [f, b, h]);
				return true
			});
			y.bind(cf_e('prevPage', conf), function (e, a, b) {
				e.stopPropagation();
				var c = y.triggerHandler(cf_e('currentPage', conf));
				return y.triggerHandler(cf_e('slideToPage', conf), [c - 1, a, 'prev', b])
			});
			y.bind(cf_e('nextPage', conf), function (e, a, b) {
				e.stopPropagation();
				var c = y.triggerHandler(cf_e('currentPage', conf));
				return y.triggerHandler(cf_e('slideToPage', conf), [c + 1, a, 'next', b])
			});
			y.bind(cf_e('slideToPage', conf), function (e, a, b, c, d) {
				e.stopPropagation();
				if (!is_number(a)) {
					a = y.triggerHandler(cf_e('currentPage', conf))
				}
				var f = opts.pagination.items || opts.items.visible,
				max = Math.ceil(itms.total / f) - 1;
				if (a < 0) {
					a = max
				}
				if (a > max) {
					a = 0
				}
				return y.triggerHandler(cf_e('slideTo', conf), [a * f, 0, true, b, c, d])
			});
			y.bind(cf_e('jumpToStart', conf), function (e, s) {
				e.stopPropagation();
				if (s) {
					s = gn_getItemIndex(s, 0, true, itms, y)
				} else {
					s = 0
				}
				s += itms.first;
				if (s != 0) {
					if (itms.total > 0) {
						while (s > itms.total) {
							s -= itms.total
						}
					}
					y.prepend(y.children().slice(s, itms.total))
				}
				return true
			});
			y.bind(cf_e('synchronise', conf), function (e, s) {
				e.stopPropagation();
				if (s) {
					s = cf_getSynchArr(s)
				} else if (opts.synchronise) {
					s = opts.synchronise
				} else {
					return debug(conf, 'No carousel to synchronise.')
				}
				var n = y.triggerHandler(cf_e('currentPosition', conf)),
				x = true;
				for (var j = 0, l = s.length; j < l; j++) {
					if (!s[j][0].triggerHandler(cf_e('slideTo', conf), [n, s[j][3], true])) {
						x = false
					}
				}
				return x
			});
			y.bind(cf_e('queue', conf), function (e, a, b) {
				e.stopPropagation();
				if (is_function(a)) {
					a.call($tt0, queu)
				} else if (is_array(a)) {
					queu = a
				} else if (!is_undefined(a)) {
					queu.push([a, b])
				}
				return queu
			});
			y.bind(cf_e('insertItem', conf), function (e, b, c, d, f) {
				e.stopPropagation();
				var v = [b, c, d, f],
				t = ['string/object', 'string/number/object', 'boolean', 'number'],
				a = cf_sortParams(v, t);
				b = a[0];
				c = a[1];
				d = a[2];
				f = a[3];
				if (is_object(b) && !is_jquery(b)) {
					b = $(b)
				} else if (is_string(b)) {
					b = $(b)
				}
				if (!is_jquery(b) || b.length == 0) {
					return debug(conf, 'Not a valid object.')
				}
				if (is_undefined(c)) {
					c = 'end'
				}
				sz_storeMargin(b, opts);
				sz_storeSizes(b, opts);
				var g = c,
				before = 'before';
				if (c == 'end') {
					if (d) {
						if (itms.first == 0) {
							c = itms.total - 1;
							before = 'after'
						} else {
							c = itms.first;
							itms.first += b.length
						}
						if (c < 0) {
							c = 0
						}
					} else {
						c = itms.total - 1;
						before = 'after'
					}
				} else {
					c = gn_getItemIndex(c, f, d, itms, y)
				}
				var h = y.children().eq(c);
				if (h.length) {
					h[before](b)
				} else {
					debug(conf, 'Correct insert-position not found! Appending item to the end.');
					y.append(b)
				}
				if (g != 'end' && !d) {
					if (c < itms.first) {
						itms.first += b.length
					}
				}
				itms.total = y.children().length;
				if (itms.first >= itms.total) {
					itms.first -= itms.total
				}
				y.trigger(cf_e('updateSizes', conf));
				y.trigger(cf_e('linkAnchors', conf));
				return true
			});
			y.bind(cf_e('removeItem', conf), function (e, c, d, f) {
				e.stopPropagation();
				var v = [c, d, f],
				t = ['string/number/object', 'boolean', 'number'],
				a = cf_sortParams(v, t);
				c = a[0];
				d = a[1];
				f = a[2];
				var g = false;
				if (c instanceof $ && c.length > 1) {
					h = $();
					c.each(function (i, a) {
						var b = y.trigger(cf_e('removeItem', conf), [$(this), d, f]);
						if (b) h = h.add(b)
					});
					return h
				}
				if (is_undefined(c) || c == 'end') {
					h = y.children().last()
				} else {
					c = gn_getItemIndex(c, f, d, itms, y);
					var h = y.children().eq(c);
					if (h.length) {
						if (c < itms.first) itms.first -= h.length
					}
				}
				if (h && h.length) {
					h.detach();
					itms.total = y.children().length;
					y.trigger(cf_e('updateSizes', conf))
				}
				return h
			});
			y.bind(cf_e('onBefore', conf) + ' ' + cf_e('onAfter', conf), function (e, a) {
				e.stopPropagation();
				var b = e.type.slice(conf.events.prefix.length);
				if (is_array(a)) {
					clbk[b] = a
				}
				if (is_function(a)) {
					clbk[b].push(a)
				}
				return clbk[b]
			});
			y.bind(cf_e('currentPosition', conf), function (e, a) {
				e.stopPropagation();
				if (itms.first == 0) {
					var b = 0
				} else {
					var b = itms.total - itms.first
				}
				if (is_function(a)) {
					a.call($tt0, b)
				}
				return b
			});
			y.bind(cf_e('currentPage', conf), function (e, a) {
				e.stopPropagation();
				var b = opts.pagination.items || opts.items.visible,
				max = Math.ceil(itms.total / b - 1),
				nr;
				if (itms.first == 0) {
					nr = 0
				} else if (itms.first < itms.total % b) {
					nr = 0
				} else if (itms.first == b && !opts.circular) {
					nr = max
				} else {
					nr = Math.round((itms.total - itms.first) / b)
				}
				if (nr < 0) {
					nr = 0
				}
				if (nr > max) {
					nr = max
				}
				if (is_function(a)) {
					a.call($tt0, nr)
				}
				return nr
			});
			y.bind(cf_e('currentVisible', conf), function (e, a) {
				e.stopPropagation();
				var b = gi_getCurrentItems(y.children(), opts);
				if (is_function(a)) {
					a.call($tt0, b)
				}
				return b
			});
			y.bind(cf_e('slice', conf), function (e, f, l, b) {
				e.stopPropagation();
				if (itms.total == 0) {
					return false
				}
				var v = [f, l, b],
				t = ['number', 'number', 'function'],
				a = cf_sortParams(v, t);
				f = (is_number(a[0])) ? a[0] : 0;
				l = (is_number(a[1])) ? a[1] : itms.total;
				b = a[2];
				f += itms.first;
				l += itms.first;
				if (items.total > 0) {
					while (f > itms.total) {
						f -= itms.total
					}
					while (l > itms.total) {
						l -= itms.total
					}
					while (f < 0) {
						f += itms.total
					}
					while (l < 0) {
						l += itms.total
					}
				}
				var c = y.children(),
				$i;
				if (l > f) {
					$i = c.slice(f, l)
				} else {
					$i = $(c.slice(f, itms.total).get().concat(c.slice(0, l).get()))
				}
				if (is_function(b)) {
					b.call($tt0, $i)
				}
				return $i
			});
			y.bind(cf_e('isPaused', conf) + ' ' + cf_e('isStopped', conf) + ' ' + cf_e('isScrolling', conf), function (e, a) {
				e.stopPropagation();
				var b = e.type.slice(conf.events.prefix.length),
				value = z[b];
				if (is_function(a)) {
					a.call($tt0, value)
				}
				return value
			});
			y.bind(cf_e('configuration', conf), function (e, a, b, c) {
				e.stopPropagation();
				var d = false;
				if (is_function(a)) {
					a.call($tt0, opts)

				} else if (is_object(a)) {
					opts_orig = $.extend(true, {},
					opts_orig, a);
					if (b !== false) d = true;
					else opts = $.extend(true, {},
					opts, a)
				} else if (!is_undefined(a)) {
					if (is_function(b)) {
						var f = eval('opts.' + a);
						if (is_undefined(f)) {
							f = ''
						}
						b.call($tt0, f)
					} else if (!is_undefined(b)) {
						if (typeof c !== 'boolean') c = true;
						eval('opts_orig.' + a + ' = b');
						if (c !== false) d = true;
						else eval('opts.' + a + ' = b')
					} else {
						return eval('opts.' + a)
					}
				}
				if (d) {
					sz_resetMargin(y.children(), opts);
					y._cfs_init(opts_orig);
					y._cfs_bind_buttons();
					var g = sz_setSizes(y, opts);
					y.trigger(cf_e('updatePageStatus', conf), [true, g])
				}
				return opts
			});
			y.bind(cf_e('linkAnchors', conf), function (e, a, b) {
				e.stopPropagation();
				if (is_undefined(a)) {
					a = $('body')
				} else if (is_string(a)) {
					a = $(a)
				}
				if (!is_jquery(a) || a.length == 0) {
					return debug(conf, 'Not a valid object.')
				}
				if (!is_string(b)) {
					b = 'a.caroufredsel'
				}
				a.find(b).each(function () {
					var h = this.hash || '';
					if (h.length > 0 && y.children().index($(h)) != -1) {
						$(this).unbind('click').click(function (e) {
							e.preventDefault();
							y.trigger(cf_e('slideTo', conf), h)
						})
					}
				});
				return true
			});
			y.bind(cf_e('updatePageStatus', conf), function (e, b, c) {
				e.stopPropagation();
				if (!opts.pagination.container) {
					return
				}
				var d = opts.pagination.items || opts.items.visible,
				pgs = Math.ceil(itms.total / d);
				if (b) {
					if (opts.pagination.anchorBuilder) {
						opts.pagination.container.children().remove();
						opts.pagination.container.each(function () {
							for (var a = 0; a < pgs; a++) {
								var i = y.children().eq(gn_getItemIndex(a * d, 0, true, itms, y));
								$(this).append(opts.pagination.anchorBuilder.call(i[0], a + 1))
							}
						})
					}
					opts.pagination.container.each(function () {
						$(this).children().unbind(opts.pagination.event).each(function (a) {
							$(this).bind(opts.pagination.event, function (e) {
								e.preventDefault();
								y.trigger(cf_e('slideTo', conf), [a * d, -opts.pagination.deviation, true, opts.pagination])
							})
						})
					})
				}
				var f = y.triggerHandler(cf_e('currentPage', conf)) + opts.pagination.deviation;
				if (f >= pgs) {
					f = 0
				}
				if (f < 0) {
					f = pgs - 1
				}
				opts.pagination.container.each(function () {
					$(this).children().removeClass(cf_c('selected', conf)).eq(f).addClass(cf_c('selected', conf))
				});
				return true
			});
			y.bind(cf_e('updateSizes', conf), function (e) {
				var a = opts.items.visible,
				a_itm = y.children(),
				avail_primary = ms_getParentSize($wrp, opts, 'width');
				itms.total = a_itm.length;
				if (z.primarySizePercentage) {
					opts.maxDimension = avail_primary;
					opts[opts.d['width']] = ms_getPercentage(avail_primary, z.primarySizePercentage)
				} else {
					opts.maxDimension = ms_getMaxDimension(opts, avail_primary)
				}
				if (opts.responsive) {
					opts.items.width = opts.items.sizesConf.width;
					opts.items.height = opts.items.sizesConf.height;
					opts = in_getResponsiveValues(opts, a_itm, avail_primary);
					a = opts.items.visible;
					sz_setResponsiveSizes(opts, a_itm)
				} else if (opts.items.visibleConf.variable) {
					a = gn_getVisibleItemsNext(a_itm, opts, 0)
				} else if (opts.items.filter != '*') {
					a = gn_getVisibleItemsNextFilter(a_itm, opts, 0)
				}
				if (!opts.circular && itms.first != 0 && a > itms.first) {
					if (opts.items.visibleConf.variable) {
						var b = gn_getVisibleItemsPrev(a_itm, opts, itms.first) - itms.first
					} else if (opts.items.filter != '*') {
						var b = gn_getVisibleItemsPrevFilter(a_itm, opts, itms.first) - itms.first
					} else {
						var b = opts.items.visible - itms.first
					}
					debug(conf, 'Preventing non-circular: sliding ' + b + ' items backward.');
					y.trigger(cf_e('prev', conf), b)
				}
				opts.items.visible = cf_getItemsAdjust(a, opts, opts.items.visibleConf.adjust, $tt0);
				opts.items.visibleConf.old = opts.items.visible;
				opts = in_getAlignPadding(opts, a_itm);
				var c = sz_setSizes(y, opts);
				y.trigger(cf_e('updatePageStatus', conf), [true, c]);
				nv_showNavi(opts, itms.total, conf);
				nv_enableNavi(opts, itms.first, conf);
				return c
			});
			y.bind(cf_e('destroy', conf), function (e, a) {
				e.stopPropagation();
				tmrs = sc_clearTimers(tmrs);
				y.data('_cfs_isCarousel', false);
				y.trigger(cf_e('finish', conf));
				if (a) {
					y.trigger(cf_e('jumpToStart', conf))
				}
				sz_resetMargin(y.children(), opts);
				if (opts.responsive) {
					y.children().each(function () {
						$(this).css($(this).data('_cfs_origCssSizes'))
					})
				}
				y.css(y.data('_cfs_origCss'));
				y._cfs_unbind_events();
				y._cfs_unbind_buttons();
				$wrp.replaceWith(y);
				return true
			});
			y.bind(cf_e('debug', conf), function (e) {
				debug(conf, 'Carousel width: ' + opts.width);
				debug(conf, 'Carousel height: ' + opts.height);
				debug(conf, 'Item widths: ' + opts.items.width);
				debug(conf, 'Item heights: ' + opts.items.height);
				debug(conf, 'Number of items visible: ' + opts.items.visible);
				if (opts.auto.play) {
					debug(conf, 'Number of items scrolled automatically: ' + opts.auto.items)
				}
				if (opts.prev.button) {
					debug(conf, 'Number of items scrolled backward: ' + opts.prev.items)
				}
				if (opts.next.button) {
					debug(conf, 'Number of items scrolled forward: ' + opts.next.items)
				}
				return conf.debug
			});
			y.bind('_cfs_triggerEvent', function (e, n, o) {
				e.stopPropagation();
				return y.triggerHandler(cf_e(n, conf), o)
			})
		};
		y._cfs_unbind_events = function () {
			y.unbind(cf_e('', conf));
			y.unbind(cf_e('', conf, false));
			y.unbind('_cfs_triggerEvent')
		};
		y._cfs_bind_buttons = function () {
			y._cfs_unbind_buttons();
			nv_showNavi(opts, itms.total, conf);
			nv_enableNavi(opts, itms.first, conf);
			if (opts.auto.pauseOnHover) {
				var b = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
				$wrp.bind(cf_e('mouseenter', conf, false), function () {
					y.trigger(cf_e('pause', conf), b)
				}).bind(cf_e('mouseleave', conf, false), function () {
					y.trigger(cf_e('resume', conf))
				})
			}
			if (opts.auto.button) {
				opts.auto.button.bind(cf_e(opts.auto.event, conf, false), function (e) {
					e.preventDefault();
					var a = false,
					b = null;
					if (z.isPaused) {
						a = 'play'
					} else if (opts.auto.pauseOnEvent) {
						a = 'pause';
						b = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)
					}
					if (a) {
						y.trigger(cf_e(a, conf), b)
					}
				})
			}
			if (opts.prev.button) {
				opts.prev.button.bind(cf_e(opts.prev.event, conf, false), function (e) {
					e.preventDefault();
					y.trigger(cf_e('prev', conf))
				});
				if (opts.prev.pauseOnHover) {
					var b = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
					opts.prev.button.bind(cf_e('mouseenter', conf, false), function () {
						y.trigger(cf_e('pause', conf), b)
					}).bind(cf_e('mouseleave', conf, false), function () {
						y.trigger(cf_e('resume', conf))
					})
				}
			}
			if (opts.next.button) {
				opts.next.button.bind(cf_e(opts.next.event, conf, false), function (e) {
					e.preventDefault();
					y.trigger(cf_e('next', conf))
				});
				if (opts.next.pauseOnHover) {
					var b = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
					opts.next.button.bind(cf_e('mouseenter', conf, false), function () {
						y.trigger(cf_e('pause', conf), b)
					}).bind(cf_e('mouseleave', conf, false), function () {
						y.trigger(cf_e('resume', conf))
					})
				}
			}
			if (opts.pagination.container) {
				if (opts.pagination.pauseOnHover) {
					var b = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
					opts.pagination.container.bind(cf_e('mouseenter', conf, false), function () {
						y.trigger(cf_e('pause', conf), b)
					}).bind(cf_e('mouseleave', conf, false), function () {
						y.trigger(cf_e('resume', conf))
					})
				}
			}
			if (opts.prev.key || opts.next.key) {
				$(document).bind(cf_e('keyup', conf, false, true, true), function (e) {
					var k = e.keyCode;
					if (k == opts.next.key) {
						e.preventDefault();
						y.trigger(cf_e('next', conf))
					}
					if (k == opts.prev.key) {
						e.preventDefault();
						y.trigger(cf_e('prev', conf))
					}
				})
			}
			if (opts.pagination.keys) {
				$(document).bind(cf_e('keyup', conf, false, true, true), function (e) {
					var k = e.keyCode;
					if (k >= 49 && k < 58) {
						k = (k - 49) * opts.items.visible;
						if (k <= itms.total) {
							e.preventDefault();
							y.trigger(cf_e('slideTo', conf), [k, 0, true, opts.pagination])
						}
					}
				})
			}
			if (opts.prev.wipe || opts.next.wipe) {
				deprecated('the touchwipe-plugin', 'the touchSwipe-plugin');
				if ($.fn.touchwipe) {
					var c = (opts.prev.wipe) ?
					function () {
						y.trigger(cf_e('prev', conf))
					}: null,
					wN = (opts.next.wipe) ?
					function () {
						y.trigger(cf_e('next', conf))
					}: null;
					if (wN || wN) {
						if (!z.touchwipe) {
							z.touchwipe = true;
							var d = {
								'min_move_x': 30,
								'min_move_y': 30,
								'preventDefaultEvents': true
							};
							switch (opts.direction) {
							case 'up':
							case 'down':
								d.wipeUp = c;
								d.wipeDown = wN;
								break;
							default:
								d.wipeLeft = wN;
								d.wipeRight = c
							}
							$wrp.touchwipe(d)
						}
					}
				}
			}
			if ($.fn.swipe) {
				var f = 'ontouchstart' in window;
				if ((f && opts.swipe.onTouch) || (!f && opts.swipe.onMouse)) {
					var g = $.extend(true, {},
					opts.prev, opts.swipe),
					scN = $.extend(true, {},
					opts.next, opts.swipe),
					swP = function () {
						y.trigger(cf_e('prev', conf), [g])
					},
					swN = function () {
						y.trigger(cf_e('next', conf), [scN])
					};
					switch (opts.direction) {
					case 'up':
					case 'down':
						opts.swipe.options.swipeUp = swN;
						opts.swipe.options.swipeDown = swP;
						break;
					default:
						opts.swipe.options.swipeLeft = swN;
						opts.swipe.options.swipeRight = swP
					}
					if (z.swipe) {
						y.swipe('destroy')
					}
					$wrp.swipe(opts.swipe.options);
					$wrp.css('cursor', 'move');
					z.swipe = true
				}
			}
			if ($.fn.mousewheel) {
				if (opts.prev.mousewheel) {
					deprecated('The prev.mousewheel option', 'the mousewheel configuration object');
					opts.prev.mousewheel = null;
					opts.mousewheel = {
						items: bt_mousesheelNumber(opts.prev.mousewheel)
					}
				}
				if (opts.next.mousewheel) {
					deprecated('The next.mousewheel option', 'the mousewheel configuration object');
					opts.next.mousewheel = null;
					opts.mousewheel = {
						items: bt_mousesheelNumber(opts.next.mousewheel)
					}
				}
				if (opts.mousewheel) {
					var h = $.extend(true, {},
					opts.prev, opts.mousewheel),
					mcN = $.extend(true, {},
					opts.next, opts.mousewheel);
					if (z.mousewheel) {
						$wrp.unbind(cf_e('mousewheel', conf, false))
					}
					$wrp.bind(cf_e('mousewheel', conf, false), function (e, a) {
						e.preventDefault();
						if (a > 0) {
							y.trigger(cf_e('prev', conf), [h])
						} else {
							y.trigger(cf_e('next', conf), [mcN])
						}
					});
					z.mousewheel = true
				}
			}
			if (opts.auto.play) {
				y.trigger(cf_e('play', conf), opts.auto.delay)
			}
			if (z.upDateOnWindowResize) {
				var i = function (e) {
					y.trigger(cf_e('finish', conf));
					if (opts.auto.pauseOnResize && !z.isPaused) {
						y.trigger(cf_e('play', conf))
					}
					sz_resetMargin(y.children(), opts);
					y.trigger(cf_e('updateSizes', conf))
				};
				var j = $(window),
				onResize = null;
				if ($.debounce && conf.onWindowResize == 'debounce') {
					onResize = $.debounce(200, i)
				} else if ($.throttle && conf.onWindowResize == 'throttle') {
					onResize = $.throttle(300, i)
				} else {
					var l = 0,
					_windowHeight = 0;
					onResize = function () {
						var a = j.width(),
						nh = j.height();
						if (a != l || nh != _windowHeight) {
							i();
							l = a;
							_windowHeight = nh
						}
					}
				}
				j.bind(cf_e('resize', conf, false, true, true), onResize)
			}
		};
		y._cfs_unbind_buttons = function () {
			var a = cf_e('', conf),
			ns2 = cf_e('', conf, false);
			ns3 = cf_e('', conf, false, true, true);
			$(document).unbind(ns3);
			$(window).unbind(ns3);
			$wrp.unbind(ns2);
			if (opts.auto.button) {
				opts.auto.button.unbind(ns2)
			}
			if (opts.prev.button) {
				opts.prev.button.unbind(ns2)
			}
			if (opts.next.button) {
				opts.next.button.unbind(ns2)
			}
			if (opts.pagination.container) {
				opts.pagination.container.unbind(ns2);
				if (opts.pagination.anchorBuilder) {
					opts.pagination.container.children().remove()
				}
			}
			if (z.swipe) {
				y.swipe('destroy');
				$wrp.css('cursor', 'default');
				z.swipe = false
			}
			if (z.mousewheel) {
				z.mousewheel = false
			}
			nv_showNavi(opts, 'hide', conf);
			nv_enableNavi(opts, 'removeClass', conf)
		};
		if (is_boolean(w)) {
			w = {
				'debug': w
			}
		}
		var z = {
			'direction': 'next',
			'isPaused': true,
			'isScrolling': false,
			'isStopped': false,
			'mousewheel': false,
			'swipe': false
		},
		itms = {
			'total': y.children().length,
			'first': 0
		},
		tmrs = {
			'auto': null,
			'progress': null,
			'startTime': getTime(),
			'timePassed': 0
		},
		scrl = {
			'isStopped': false,
			'duration': 0,
			'startTime': 0,
			'easing': '',
			'anims': []
		},
		clbk = {
			'onBefore': [],
			'onAfter': []
		},
		queu = [],
		conf = $.extend(true, {},
		$.fn.carouFredSel.configs, w),
		opts = {},
		opts_orig = $.extend(true, {},
		u),
		$wrp = y.wrap('<' + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
		conf.selector = y.selector;
		conf.serialNumber = $.fn.carouFredSel.serialNumber++;
		y._cfs_init(opts_orig, true, starting_position);
		y._cfs_build();
		y._cfs_bind_events();
		y._cfs_bind_buttons();
		if (is_array(opts.items.start)) {
			var A = opts.items.start
		} else {
			var A = [];
			if (opts.items.start != 0) {
				A.push(opts.items.start)
			}
		}
		if (opts.cookie) {
			A.unshift(parseInt(cf_getCookie(opts.cookie), 10))
		}
		if (A.length > 0) {
			for (var a = 0, l = A.length; a < l; a++) {
				var s = A[a];
				if (s == 0) {
					continue
				}
				if (s === true) {
					s = window.location.hash;
					if (s.length < 1) {
						continue
					}
				} else if (s === 'random') {
					s = Math.floor(Math.random() * itms.total)
				}
				if (y.triggerHandler(cf_e('slideTo', conf), [s, 0, true, {
					fx: 'none'
				}])) {
					break
				}
			}
		}
		var B = sz_setSizes(y, opts),
		itm = gi_getCurrentItems(y.children(), opts);
		if (opts.onCreate) {
			opts.onCreate.call($tt0, {
				'width': B.width,
				'height': B.height,
				'items': itm
			})
		}
		y.trigger(cf_e('updatePageStatus', conf), [true, B]);
		y.trigger(cf_e('linkAnchors', conf));
		if (conf.debug) {
			y.trigger(cf_e('debug', conf))
		}
		return y
	};
	$.fn.carouFredSel.serialNumber = 1;
	$.fn.carouFredSel.defaults = {
		'synchronise': false,
		'infinite': true,
		'circular': true,
		'responsive': false,
		'direction': 'left',
		'items': {
			'start': 0
		},
		'scroll': {
			'easing': 'swing',
			'duration': 500,
			'pauseOnHover': false,
			'event': 'click',
			'queue': false
		}
	};
	$.fn.carouFredSel.configs = {
		'debug': false,
		'onWindowResize': 'throttle',
		'events': {
			'prefix': '',
			'namespace': 'cfs'
		},
		'wrapper': {
			'element': 'div',
			'classname': 'caroufredsel_wrapper'
		},
		'classnames': {}
	};
	$.fn.carouFredSel.pageAnchorBuilder = function (a) {
		return '<a href="#"><span>' + a + '</span></a>'
	};
	$.fn.carouFredSel.progressbarUpdater = function (a) {
		$(this).css('width', a + '%')
	};
	$.fn.carouFredSel.cookie = {
		get: function (n) {
			n += '=';
			var b = document.cookie.split(';');
			for (var a = 0, l = b.length; a < l; a++) {
				var c = b[a];
				while (c.charAt(0) == ' ') {
					c = c.slice(1)
				}
				if (c.indexOf(n) == 0) {
					return c.slice(n.length)
				}
			}
			return 0
		},
		set: function (n, v, d) {
			var e = "";
			if (d) {
				var a = new Date();
				a.setTime(a.getTime() + (d * 24 * 60 * 60 * 1000));
				e = "; expires=" + a.toGMTString()
			}
			document.cookie = n + '=' + v + e + '; path=/'
		},
		remove: function (n) {
			$.fn.carouFredSel.cookie.set(n, "", -1)
		}
	};
	function sc_setScroll(d, e) {
		return {
			anims: [],
			duration: d,
			orgDuration: d,
			easing: e,
			startTime: getTime()
		}
	}
	function sc_startScroll(s) {
		if (is_object(s.pre)) {
			sc_startScroll(s.pre)
		}
		for (var a = 0, l = s.anims.length; a < l; a++) {
			var b = s.anims[a];
			if (!b) {
				continue
			}
			if (b[3]) {
				b[0].stop()
			}
			b[0].animate(b[1], {
				complete: b[2],
				duration: s.duration,
				easing: s.easing
			})
		}
		if (is_object(s.post)) {
			sc_startScroll(s.post)
		}
	}
	function sc_stopScroll(s, c) {
		if (!is_boolean(c)) {
			c = true
		}
		if (is_object(s.pre)) {
			sc_stopScroll(s.pre, c)
		}
		for (var a = 0, l = s.anims.length; a < l; a++) {
			var b = s.anims[a];
			b[0].stop(true);
			if (c) {
				b[0].css(b[1]);
				if (is_function(b[2])) {
					b[2]()
				}
			}
		}
		if (is_object(s.post)) {
			sc_stopScroll(s.post, c)
		}
	}
	function sc_afterScroll(a, b, o) {
		if (b) {
			b.remove()
		}
		switch (o.fx) {
		case 'fade':
		case 'crossfade':
		case 'cover-fade':
		case 'uncover-fade':
			a.css('filter', '');
			break
		}
	}
	function sc_fireCallbacks(d, o, b, a, c) {
		if (o[b]) {
			o[b].call(d, a)
		}
		if (c[b].length) {
			for (var i = 0, l = c[b].length; i < l; i++) {
				c[b][i].call(d, a)
			}
		}
		return []
	}
	function sc_fireQueue(a, q, c) {
		if (q.length) {
			a.trigger(cf_e(q[0][0], c), q[0][1]);
			q.shift()
		}
		return q
	}
	function sc_hideHiddenItems(b) {
		b.each(function () {
			var a = $(this);
			a.data('_cfs_isHidden', a.is(':hidden')).hide()
		})
	}
	function sc_showHiddenItems(b) {
		if (b) {
			b.each(function () {
				var a = $(this);
				if (!a.data('_cfs_isHidden')) {
					a.show()
				}
			})
		}
	}
	function sc_clearTimers(t) {
		if (t.auto) {
			clearTimeout(t.auto)
		}
		if (t.progress) {
			clearInterval(t.progress)
		}
		return t
	}
	function sc_mapCallbackArguments(a, b, c, d, e, f, g) {
		return {
			'width': g.width,
			'height': g.height,
			'items': {
				'old': a,
				'skipped': b,
				'visible': c,
				'new': c
			},
			'scroll': {
				'items': d,
				'direction': e,
				'duration': f
			}
		}
	}
	function sc_getDuration(a, o, b, c) {
		var d = a.duration;
		if (a.fx == 'none') {
			return 0
		}
		if (d == 'auto') {
			d = o.scroll.duration / o.scroll.items * b
		} else if (d < 10) {
			d = c / d
		}
		if (d < 1) {
			return 0
		}
		if (a.fx == 'fade') {
			d = d / 2
		}
		return Math.round(d)
	}
	function nv_showNavi(o, t, c) {
		var a = (is_number(o.items.minimum)) ? o.items.minimum: o.items.visible + 1;
		if (t == 'show' || t == 'hide') {
			var f = t
		} else if (a > t) {
			debug(c, 'Not enough items (' + t + ' total, ' + a + ' needed): Hiding navigation.');
			var f = 'hide'
		} else {
			var f = 'show'
		}
		var s = (f == 'show') ? 'removeClass': 'addClass',
		h = cf_c('hidden', c);
		if (o.auto.button) {
			o.auto.button[f]()[s](h)
		}
		if (o.prev.button) {
			o.prev.button[f]()[s](h)
		}
		if (o.next.button) {
			o.next.button[f]()[s](h)
		}
		if (o.pagination.container) {
			o.pagination.container[f]()[s](h)
		}
	}
	function nv_enableNavi(o, f, c) {
		if (o.circular || o.infinite) return;
		var a = (f == 'removeClass' || f == 'addClass') ? f: false,
		di = cf_c('disabled', c);
		if (o.auto.button && a) {
			o.auto.button[a](di)
		}
		if (o.prev.button) {
			var b = a || (f == 0) ? 'addClass': 'removeClass';
			o.prev.button[b](di)
		}
		if (o.next.button) {
			var b = a || (f == o.items.visible) ? 'addClass': 'removeClass';
			o.next.button[b](di)
		}
	}
	function go_getObject(a, b) {
		if (is_function(b)) {
			b = b.call(a)
		} else if (is_undefined(b)) {
			b = {}
		}
		return b
	}
	function go_getItemsObject(a, b) {
		b = go_getObject(a, b);
		if (is_number(b)) {
			b = {
				'visible': b
			}
		} else if (b == 'variable') {
			b = {
				'visible': b,
				'width': b,
				'height': b
			}
		} else if (!is_object(b)) {
			b = {}
		}
		return b
	}
	function go_getScrollObject(a, b) {
		b = go_getObject(a, b);
		if (is_number(b)) {
			if (b <= 50) {
				b = {
					'items': b
				}
			} else {
				b = {
					'duration': b
				}
			}
		} else if (is_string(b)) {
			b = {
				'easing': b
			}
		} else if (!is_object(b)) {
			b = {}
		}
		return b
	}
	function go_getNaviObject(a, b) {
		b = go_getObject(a, b);
		if (is_string(b)) {
			var c = cf_getKeyCode(b);
			if (c == -1) {
				b = $(b)
			} else {
				b = c
			}
		}
		return b
	}
	function go_getAutoObject(a, b) {
		b = go_getNaviObject(a, b);
		if (is_jquery(b)) {
			b = {
				'button': b
			}
		} else if (is_boolean(b)) {
			b = {
				'play': b
			}
		} else if (is_number(b)) {
			b = {
				'timeoutDuration': b
			}
		}
		if (b.progress) {
			if (is_string(b.progress) || is_jquery(b.progress)) {
				b.progress = {
					'bar': b.progress
				}
			}
		}
		return b
	}
	function go_complementAutoObject(a, b) {
		if (is_function(b.button)) {
			b.button = b.button.call(a)
		}
		if (is_string(b.button)) {
			b.button = $(b.button)
		}
		if (!is_boolean(b.play)) {
			b.play = true
		}
		if (!is_number(b.delay)) {
			b.delay = 0
		}
		if (is_undefined(b.pauseOnEvent)) {
			b.pauseOnEvent = true
		}
		if (!is_boolean(b.pauseOnResize)) {
			b.pauseOnResize = true
		}
		if (!is_number(b.timeoutDuration)) {
			b.timeoutDuration = (b.duration < 10) ? 2500 : b.duration * 5
		}
		if (b.progress) {
			if (is_function(b.progress.bar)) {
				b.progress.bar = b.progress.bar.call(a)
			}
			if (is_string(b.progress.bar)) {
				b.progress.bar = $(b.progress.bar)
			}
			if (b.progress.bar) {
				if (!is_function(b.progress.updater)) {
					b.progress.updater = $.fn.carouFredSel.progressbarUpdater
				}
				if (!is_number(b.progress.interval)) {
					b.progress.interval = 50
				}
			} else {
				b.progress = false
			}
		}
		return b
	}
	function go_getPrevNextObject(a, b) {
		b = go_getNaviObject(a, b);
		if (is_jquery(b)) {
			b = {
				'button': b
			}
		} else if (is_number(b)) {
			b = {
				'key': b
			}
		}
		return b
	}
	function go_complementPrevNextObject(a, b) {
		if (is_function(b.button)) {
			b.button = b.button.call(a)
		}
		if (is_string(b.button)) {
			b.button = $(b.button)
		}
		if (is_string(b.key)) {
			b.key = cf_getKeyCode(b.key)
		}
		return b
	}
	function go_getPaginationObject(a, b) {
		b = go_getNaviObject(a, b);
		if (is_jquery(b)) {
			b = {
				'container': b
			}
		} else if (is_boolean(b)) {
			b = {
				'keys': b
			}
		}
		return b
	}
	function go_complementPaginationObject(a, b) {
		if (is_function(b.container)) {
			b.container = b.container.call(a)
		}
		if (is_string(b.container)) {
			b.container = $(b.container)
		}
		if (!is_number(b.items)) {
			b.items = false
		}
		if (!is_boolean(b.keys)) {
			b.keys = false
		}
		if (!is_function(b.anchorBuilder) && !is_false(b.anchorBuilder)) {
			b.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder
		}
		if (!is_number(b.deviation)) {
			b.deviation = 0
		}
		return b
	}
	function go_getSwipeObject(a, b) {
		if (is_function(b)) {
			b = b.call(a)
		}
		if (is_undefined(b)) {
			b = {
				'onTouch': false
			}
		}
		if (is_true(b)) {
			b = {
				'onTouch': b
			}
		} else if (is_number(b)) {
			b = {
				'items': b
			}
		}
		return b
	}
	function go_complementSwipeObject(a, b) {
		if (!is_boolean(b.onTouch)) {
			b.onTouch = true
		}
		if (!is_boolean(b.onMouse)) {
			b.onMouse = false
		}
		if (!is_object(b.options)) {
			b.options = {}
		}
		if (!is_boolean(b.options.triggerOnTouchEnd)) {
			b.options.triggerOnTouchEnd = false
		}
		return b
	}
	function go_getMousewheelObject(a, b) {
		if (is_function(b)) {
			b = b.call(a)
		}
		if (is_true(b)) {
			b = {}
		} else if (is_number(b)) {
			b = {
				'items': b
			}
		} else if (is_undefined(b)) {
			b = false
		}
		return b
	}
	function go_complementMousewheelObject(a, b) {
		return b
	}
	function gn_getItemIndex(a, b, c, d, e) {
		if (is_string(a)) {
			a = $(a, e)
		}
		if (is_object(a)) {
			a = $(a, e)
		}
		if (is_jquery(a)) {
			a = e.children().index(a);
			if (!is_boolean(c)) {
				c = false
			}
		} else {
			if (!is_boolean(c)) {
				c = true
			}
		}
		if (!is_number(a)) {
			a = 0
		}
		if (!is_number(b)) {
			b = 0
		}
		if (c) {
			a += d.first
		}
		a += b;
		if (d.total > 0) {
			while (a >= d.total) {
				a -= d.total
			}
			while (a < 0) {
				a += d.total
			}
		}
		return a
	}
	function gn_getVisibleItemsPrev(i, o, s) {
		var t = 0,
		x = 0;
		for (var a = s; a >= 0; a--) {
			var j = i.eq(a);
			t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
			if (t > o.maxDimension) {
				return x
			}
			if (a == 0) {
				a = i.length
			}
			x++
		}
	}
	function gn_getVisibleItemsPrevFilter(i, o, s) {
		return gn_getItemsPrevFilter(i, o.items.filter, o.items.visibleConf.org, s)
	}
	function gn_getScrollItemsPrevFilter(i, o, s, m) {
		return gn_getItemsPrevFilter(i, o.items.filter, m, s)
	}
	function gn_getItemsPrevFilter(i, f, m, s) {
		var t = 0,
		x = 0;
		for (var a = s, l = i.length; a >= 0; a--) {
			x++;
			if (x == l) {
				return x
			}
			var j = i.eq(a);
			if (j.is(f)) {
				t++;
				if (t == m) {
					return x
				}
			}
			if (a == 0) {
				a = l
			}
		}
	}
	function gn_getVisibleOrg(a, o) {
		return o.items.visibleConf.org || a.children().slice(0, o.items.visible).filter(o.items.filter).length
	}
	function gn_getVisibleItemsNext(i, o, s) {
		var t = 0,
		x = 0;
		for (var a = s, l = i.length - 1; a <= l; a++) {
			var j = i.eq(a);
			t += (j.is(':visible')) ? j[o.d['outerWidth']](true) : 0;
			if (t > o.maxDimension) {
				return x
			}
			x++;
			if (x == l + 1) {
				return x
			}
			if (a == l) {
				a = -1
			}
		}
	}
	function gn_getVisibleItemsNextTestCircular(i, o, s, l) {
		var v = gn_getVisibleItemsNext(i, o, s);
		if (!o.circular) {
			if (s + v > l) {
				v = l - s
			}
		}
		return v
	}
	function gn_getVisibleItemsNextFilter(i, o, s) {
		return gn_getItemsNextFilter(i, o.items.filter, o.items.visibleConf.org, s, o.circular)
	}
	function gn_getScrollItemsNextFilter(i, o, s, m) {
		return gn_getItemsNextFilter(i, o.items.filter, m + 1, s, o.circular) - 1
	}
	function gn_getItemsNextFilter(i, f, m, s, c) {
		var t = 0,
		x = 0;
		for (var a = s, l = i.length - 1; a <= l; a++) {
			x++;
			if (x >= l) {
				return x
			}
			var j = i.eq(a);
			if (j.is(f)) {
				t++;
				if (t == m) {
					return x
				}
			}
			if (a == l) {
				a = -1
			}
		}
	}
	function gi_getCurrentItems(i, o) {
		return i.slice(0, o.items.visible)
	}
	function gi_getOldItemsPrev(i, o, n) {
		return i.slice(n, o.items.visibleConf.old + n)
	}
	function gi_getNewItemsPrev(i, o) {
		return i.slice(0, o.items.visible)
	}
	function gi_getOldItemsNext(i, o) {
		return i.slice(0, o.items.visibleConf.old)
	}
	function gi_getNewItemsNext(i, o, n) {
		return i.slice(n, o.items.visible + n)
	}
	function sz_storeMargin(i, o, d) {
		if (o.usePadding) {
			if (!is_string(d)) {
				d = '_cfs_origCssMargin'
			}
			i.each(function () {
				var j = $(this),
				m = parseInt(j.css(o.d['marginRight']), 10);
				if (!is_number(m)) {
					m = 0
				}
				j.data(d, m)
			})
		}
	}
	function sz_resetMargin(i, o, m) {
		if (o.usePadding) {
			var x = (is_boolean(m)) ? m: false;
			if (!is_number(m)) {
				m = 0
			}
			sz_storeMargin(i, o, '_cfs_tempCssMargin');
			i.each(function () {
				var j = $(this);
				j.css(o.d['marginRight'], ((x) ? j.data('_cfs_tempCssMargin') : m + j.data('_cfs_origCssMargin')))
			})
		}
	}
	function sz_storeSizes(i, o) {
		if (o.responsive) {
			i.each(function () {
				var j = $(this),
				s = in_mapCss(j, ['width', 'height']);
				j.data('_cfs_origCssSizes', s)
			})
		}
	}
	function sz_setResponsiveSizes(o, b) {
		var c = o.items.visible,
		newS = o.items[o.d['width']],
		seco = o[o.d['height']],
		secp = is_percentage(seco);
		b.each(function () {
			var a = $(this),
			nw = newS - ms_getPaddingBorderMargin(a, o, 'Width');
			a[o.d['width']](nw);
			if (secp) {
				a[o.d['height']](ms_getPercentage(nw, seco))
			}
		})
	}
	function sz_setSizes(a, o) {
		var b = a.parent(),
		$i = a.children(),
		$v = gi_getCurrentItems($i, o),
		sz = cf_mapWrapperSizes(ms_getSizes($v, o, true), o, false);
		b.css(sz);
		if (o.usePadding) {
			var p = o.padding,
			r = p[o.d[1]];
			if (o.align && r < 0) {
				r = 0
			}
			var c = $v.last();
			c.css(o.d['marginRight'], c.data('_cfs_origCssMargin') + r);
			a.css(o.d['top'], p[o.d[0]]);
			a.css(o.d['left'], p[o.d[3]])
		}
		a.css(o.d['width'], sz[o.d['width']] + (ms_getTotalSize($i, o, 'width') * 2));
		a.css(o.d['height'], ms_getLargestSize($i, o, 'height'));
		return sz
	}
	function ms_getSizes(i, o, a) {
		return [ms_getTotalSize(i, o, 'width', a), ms_getLargestSize(i, o, 'height', a)]
	}
	function ms_getLargestSize(i, o, a, b) {
		if (!is_boolean(b)) {
			b = false
		}
		if (is_number(o[o.d[a]]) && b) {
			return o[o.d[a]]
		}
		if (is_number(o.items[o.d[a]])) {
			return o.items[o.d[a]]
		}
		a = (a.toLowerCase().indexOf('width') > -1) ? 'outerWidth': 'outerHeight';
		return ms_getTrueLargestSize(i, o, a)
	}
	function ms_getTrueLargestSize(i, o, b) {
		var s = 0;
		for (var a = 0, l = i.length; a < l; a++) {
			var j = i.eq(a);
			var m = (j.is(':visible')) ? j[o.d[b]](true) : 0;
			if (s < m) {
				s = m
			}
		}
		return s
	}
	function ms_getTotalSize(i, o, b, c) {
		if (!is_boolean(c)) {
			c = false
		}
		if (is_number(o[o.d[b]]) && c) {
			return o[o.d[b]]
		}
		if (is_number(o.items[o.d[b]])) {
			return o.items[o.d[b]] * i.length
		}
		var d = (b.toLowerCase().indexOf('width') > -1) ? 'outerWidth': 'outerHeight',
		s = 0;
		for (var a = 0, l = i.length; a < l; a++) {
			var j = i.eq(a);
			s += (j.is(':visible')) ? j[o.d[d]](true) : 0
		}
		return s
	}
	function ms_getParentSize(a, o, d) {
		var b = a.is(':visible');
		if (b) {
			a.hide()
		}
		var s = a.parent()[o.d[d]]();
		if (b) {
			a.show()
		}
		return s
	}
	function ms_getMaxDimension(o, a) {
		return (is_number(o[o.d['width']])) ? o[o.d['width']] : a
	}
	function ms_hasVariableSizes(i, o, b) {
		var s = false,
		v = false;
		for (var a = 0, l = i.length; a < l; a++) {
			var j = i.eq(a);
			var c = (j.is(':visible')) ? j[o.d[b]](true) : 0;
			if (s === false) {
				s = c
			} else if (s != c) {
				v = true
			}
			if (s == 0) {
				v = true
			}
		}
		return v
	}
	function ms_getPaddingBorderMargin(i, o, d) {
		return i[o.d['outer' + d]](true) - i[o.d[d.toLowerCase()]]()
	}
	function ms_getPercentage(s, o) {
		if (is_percentage(o)) {
			o = parseInt(o.slice(0, -1), 10);
			if (!is_number(o)) {
				return s
			}
			s *= o / 100
		}
		return s
	}
	function cf_e(n, c, a, b, d) {
		if (!is_boolean(a)) {
			a = true
		}
		if (!is_boolean(b)) {
			b = true
		}
		if (!is_boolean(d)) {
			d = false
		}
		if (a) {
			n = c.events.prefix + n
		}
		if (b) {
			n = n + '.' + c.events.namespace
		}
		if (b && d) {
			n += c.serialNumber
		}
		return n
	}
	function cf_c(n, c) {
		return (is_string(c.classnames[n])) ? c.classnames[n] : n
	}
	function cf_mapWrapperSizes(a, o, p) {
		if (!is_boolean(p)) {
			p = true
		}
		var b = (o.usePadding && p) ? o.padding: [0, 0, 0, 0];
		var c = {};
		c[o.d['width']] = a[0] + b[1] + b[3];
		c[o.d['height']] = a[1] + b[0] + b[2];
		return c
	}
	function cf_sortParams(c, d) {
		var e = [];
		for (var a = 0, l1 = c.length; a < l1; a++) {
			for (var b = 0, l2 = d.length; b < l2; b++) {
				if (d[b].indexOf(typeof c[a]) > -1 && is_undefined(e[b])) {
					e[b] = c[a];
					break
				}
			}
		}
		return e
	}
	function cf_getPadding(p) {
		if (is_undefined(p)) {
			return [0, 0, 0, 0]
		}
		if (is_number(p)) {
			return [p, p, p, p]
		}
		if (is_string(p)) {
			p = p.split('px').join('').split('em').join('').split(' ')
		}
		if (!is_array(p)) {
			return [0, 0, 0, 0]
		}
		for (var i = 0; i < 4; i++) {
			p[i] = parseInt(p[i], 10)
		}
		switch (p.length) {
		case 0:
			return [0, 0, 0, 0];
		case 1:
			return [p[0], p[0], p[0], p[0]];
		case 2:
			return [p[0], p[1], p[0], p[1]];
		case 3:
			return [p[0], p[1], p[2], p[1]];
		default:
			return [p[0], p[1], p[2], p[3]]
		}
	}
	function cf_getAlignPadding(a, o) {
		var x = (is_number(o[o.d['width']])) ? Math.ceil(o[o.d['width']] - ms_getTotalSize(a, o, 'width')) : 0;
		switch (o.align) {
		case 'left':
			return [0, x];
		case 'right':
			return [x, 0];
		case 'center':
		default:
			return [Math.ceil(x / 2), Math.floor(x / 2)]
		}
	}
	function cf_getDimensions(o) {
		var a = [['width', 'innerWidth', 'outerWidth', 'height', 'innerHeight', 'outerHeight', 'left', 'top', 'marginRight', 0, 1, 2, 3], ['height', 'innerHeight', 'outerHeight', 'width', 'innerWidth', 'outerWidth', 'top', 'left', 'marginBottom', 3, 2, 1, 0]];
		var b = a[0].length,
		dx = (o.direction == 'right' || o.direction == 'left') ? 0 : 1;
		var c = {};
		for (var d = 0; d < b; d++) {
			c[a[0][d]] = a[dx][d]
		}
		return c
	}
	function cf_getAdjust(x, o, a, b) {
		var v = x;
		if (is_function(a)) {
			v = a.call(b, v)
		} else if (is_string(a)) {
			var p = a.split('+'),
			m = a.split('-');
			if (m.length > p.length) {
				var c = true,
				sta = m[0],
				adj = m[1]
			} else {
				var c = false,
				sta = p[0],
				adj = p[1]
			}
			switch (sta) {
			case 'even':
				v = (x % 2 == 1) ? x - 1 : x;
				break;
			case 'odd':
				v = (x % 2 == 0) ? x - 1 : x;
				break;
			default:
				v = x;
				break
			}
			adj = parseInt(adj, 10);
			if (is_number(adj)) {
				if (c) {
					adj = -adj
				}
				v += adj
			}
		}
		if (!is_number(v) || v < 1) {
			v = 1
		}
		return v
	}
	function cf_getItemsAdjust(x, o, a, b) {
		return cf_getItemAdjustMinMax(cf_getAdjust(x, o, a, b), o.items.visibleConf)
	}
	function cf_getItemAdjustMinMax(v, i) {
		if (is_number(i.min) && v < i.min) {
			v = i.min
		}
		if (is_number(i.max) && v > i.max) {
			v = i.max
		}
		if (v < 1) {
			v = 1
		}
		return v
	}
	function cf_getSynchArr(s) {
		if (!is_array(s)) {
			s = [[s]]
		}
		if (!is_array(s[0])) {
			s = [s]
		}
		for (var j = 0, l = s.length; j < l; j++) {
			if (is_string(s[j][0])) {
				s[j][0] = $(s[j][0])
			}
			if (!is_boolean(s[j][1])) {
				s[j][1] = true
			}
			if (!is_boolean(s[j][2])) {
				s[j][2] = true
			}
			if (!is_number(s[j][3])) {
				s[j][3] = 0
			}
		}
		return s
	}
	function cf_getKeyCode(k) {
		if (k == 'right') {
			return 39
		}
		if (k == 'left') {
			return 37
		}
		if (k == 'up') {
			return 38
		}
		if (k == 'down') {
			return 40
		}
		return - 1
	}
	function cf_setCookie(n, a, c) {
		if (n) {
			var v = a.triggerHandler(cf_e('currentPosition', c));
			$.fn.carouFredSel.cookie.set(n, v)
		}
	}
	function cf_getCookie(n) {
		var c = $.fn.carouFredSel.cookie.get(n);
		return (c == '') ? 0 : c
	}
	function in_mapCss(a, b) {
		var c = {},
		prop;
		for (var p = 0, l = b.length; p < l; p++) {
			prop = b[p];
			c[prop] = a.css(prop)
		}
		return c
	}
	function in_complementItems(a, b, c, d) {
		if (!is_object(a.visibleConf)) {
			a.visibleConf = {}
		}
		if (!is_object(a.sizesConf)) {
			a.sizesConf = {}
		}
		if (a.start == 0 && is_number(d)) {
			a.start = d
		}
		if (is_object(a.visible)) {
			a.visibleConf.min = a.visible.min;
			a.visibleConf.max = a.visible.max;
			a.visible = false
		} else if (is_string(a.visible)) {
			if (a.visible == 'variable') {
				a.visibleConf.variable = true
			} else {
				a.visibleConf.adjust = a.visible
			}
			a.visible = false
		} else if (is_function(a.visible)) {
			a.visibleConf.adjust = a.visible;
			a.visible = false
		}
		if (!is_string(a.filter)) {
			a.filter = (c.filter(':hidden').length > 0) ? ':visible': '*'
		}
		if (!a[b.d['width']]) {
			if (b.responsive) {
				debug(true, 'Set a ' + b.d['width'] + ' for the items!');
				a[b.d['width']] = ms_getTrueLargestSize(c, b, 'outerWidth')
			} else {
				a[b.d['width']] = (ms_hasVariableSizes(c, b, 'outerWidth')) ? 'variable': c[b.d['outerWidth']](true)
			}
		}
		if (!a[b.d['height']]) {
			a[b.d['height']] = (ms_hasVariableSizes(c, b, 'outerHeight')) ? 'variable': c[b.d['outerHeight']](true)
		}
		a.sizesConf.width = a.width;
		a.sizesConf.height = a.height;
		return a
	}
	function in_complementVisibleItems(a, b) {
		if (a.items[a.d['width']] == 'variable') {
			a.items.visibleConf.variable = true
		}
		if (!a.items.visibleConf.variable) {
			if (is_number(a[a.d['width']])) {
				a.items.visible = Math.floor(a[a.d['width']] / a.items[a.d['width']])
			} else {
				a.items.visible = Math.floor(b / a.items[a.d['width']]);
				a[a.d['width']] = a.items.visible * a.items[a.d['width']];
				if (!a.items.visibleConf.adjust) {
					a.align = false
				}
			}
			if (a.items.visible == 'Infinity' || a.items.visible < 1) {
				debug(true, 'Not a valid number of visible items: Set to "variable".');
				a.items.visibleConf.variable = true
			}
		}
		return a
	}
	function in_complementPrimarySize(a, b, c) {
		if (a == 'auto') {
			a = ms_getTrueLargestSize(c, b, 'outerWidth')
		}
		return a
	}
	function in_complementSecondarySize(a, b, c) {
		if (a == 'auto') {
			a = ms_getTrueLargestSize(c, b, 'outerHeight')
		}
		if (!a) {
			a = b.items[b.d['height']]
		}
		return a
	}
	function in_getAlignPadding(o, a) {
		var p = cf_getAlignPadding(gi_getCurrentItems(a, o), o);
		o.padding[o.d[1]] = p[1];
		o.padding[o.d[3]] = p[0];
		return o
	}
	function in_getResponsiveValues(o, a, b) {
		var c = cf_getItemAdjustMinMax(Math.ceil(o[o.d['width']] / o.items[o.d['width']]), o.items.visibleConf);
		if (c > a.length) {
			c = a.length
		}
		var d = Math.floor(o[o.d['width']] / c);
		o.items.visible = c;
		o.items[o.d['width']] = d;
		o[o.d['width']] = c * d;
		return o
	}
	function bt_pauseOnHoverConfig(p) {
		if (is_string(p)) {
			var i = (p.indexOf('immediate') > -1) ? true: false,
			r = (p.indexOf('resume') > -1) ? true: false
		} else {
			var i = r = false
		}
		return [i, r]
	}
	function bt_mousesheelNumber(a) {
		return (is_number(a)) ? a: null
	}
	function is_null(a) {
		return (a === null)
	}
	function is_undefined(a) {
		return (is_null(a) || typeof a == 'undefined' || a === '' || a === 'undefined')
	}
	function is_array(a) {
		return (a instanceof Array)
	}
	function is_jquery(a) {
		return (a instanceof jQuery)
	}
	function is_object(a) {
		return ((a instanceof Object || typeof a == 'object') && !is_null(a) && !is_jquery(a) && !is_array(a))
	}
	function is_number(a) {
		return ((a instanceof Number || typeof a == 'number') && !isNaN(a))
	}
	function is_string(a) {
		return ((a instanceof String || typeof a == 'string') && !is_undefined(a) && !is_true(a) && !is_false(a))
	}
	function is_function(a) {
		return (a instanceof Function || typeof a == 'function')
	}
	function is_boolean(a) {
		return (a instanceof Boolean || typeof a == 'boolean' || is_true(a) || is_false(a))
	}
	function is_true(a) {
		return (a === true || a === 'true')
	}
	function is_false(a) {
		return (a === false || a === 'false')
	}
	function is_percentage(x) {
		return (is_string(x) && x.slice( - 1) == '%')
	}
	function getTime() {
		return new Date().getTime()
	}
	function deprecated(o, n) {
		debug(true, o + ' is DEPRECATED, support for it will be removed. Use ' + n + ' instead.')
	}
	function debug(d, m) {
		if (is_object(d)) {
			var s = ' (' + d.selector + ')';
			d = d.debug
		} else {
			var s = ''
		}
		if (!d) {
			return false
		}
		if (is_string(m)) {
			m = 'carouFredSel' + s + ': ' + m
		} else {
			m = ['carouFredSel' + s + ':', m]
		}
		if (window.console && window.console.log) {
			window.console.log(m)
		}
		return false
	}
	$.extend($.easing, {
		'quadratic': function (t) {
			var a = t * t;
			return t * ( - a * t + 4 * a - 6 * t + 4)
		},
		'cubic': function (t) {
			return t * (4 * t * t - 9 * t + 6)
		},
		'elastic': function (t) {
			var a = t * t;
			return t * (33 * a * a - 106 * a * t + 126 * a - 67 * t + 15)
		}
	})
})(jQuery);
/*
File: jquery.touchSwipe.min.js
*/
/*
* touchSwipe - jQuery Plugin
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* http://labs.skinkers.com/touchSwipe/
* http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* $version: 1.3.3
*/

(function(g){function P(c){if(c&&void 0===c.allowPageScroll&&(void 0!==c.swipe||void 0!==c.swipeStatus))c.allowPageScroll=G;c||(c={});c=g.extend({},g.fn.swipe.defaults,c);return this.each(function(){var b=g(this),f=b.data(w);f||(f=new W(this,c),b.data(w,f))})}function W(c,b){var f,p,r,s;function H(a){var a=a.originalEvent,c,Q=n?a.touches[0]:a;d=R;n?h=a.touches.length:a.preventDefault();i=0;j=null;k=0;!n||h===b.fingers||b.fingers===x?(r=f=Q.pageX,s=p=Q.pageY,y=(new Date).getTime(),b.swipeStatus&&(c= l(a,d))):t(a);if(!1===c)return d=m,l(a,d),c;e.bind(I,J);e.bind(K,L)}function J(a){a=a.originalEvent;if(!(d===q||d===m)){var c,e=n?a.touches[0]:a;f=e.pageX;p=e.pageY;u=(new Date).getTime();j=S();n&&(h=a.touches.length);d=z;var e=a,g=j;if(b.allowPageScroll===G)e.preventDefault();else{var o=b.allowPageScroll===T;switch(g){case v:(b.swipeLeft&&o||!o&&b.allowPageScroll!=M)&&e.preventDefault();break;case A:(b.swipeRight&&o||!o&&b.allowPageScroll!=M)&&e.preventDefault();break;case B:(b.swipeUp&&o||!o&&b.allowPageScroll!= N)&&e.preventDefault();break;case C:(b.swipeDown&&o||!o&&b.allowPageScroll!=N)&&e.preventDefault()}}h===b.fingers||b.fingers===x||!n?(i=U(),k=u-y,b.swipeStatus&&(c=l(a,d,j,i,k)),b.triggerOnTouchEnd||(e=!(b.maxTimeThreshold?!(k>=b.maxTimeThreshold):1),!0===D()?(d=q,c=l(a,d)):e&&(d=m,l(a,d)))):(d=m,l(a,d));!1===c&&(d=m,l(a,d))}}function L(a){a=a.originalEvent;a.preventDefault();u=(new Date).getTime();i=U();j=S();k=u-y;if(b.triggerOnTouchEnd||!1===b.triggerOnTouchEnd&&d===z)if(d=q,(h===b.fingers||b.fingers=== x||!n)&&0!==f){var c=!(b.maxTimeThreshold?!(k>=b.maxTimeThreshold):1);if((!0===D()||null===D())&&!c)l(a,d);else if(c||!1===D())d=m,l(a,d)}else d=m,l(a,d);else d===z&&(d=m,l(a,d));e.unbind(I,J,!1);e.unbind(K,L,!1)}function t(){y=u=p=f=s=r=h=0}function l(a,c){var d=void 0;b.swipeStatus&&(d=b.swipeStatus.call(e,a,c,j||null,i||0,k||0,h));if(c===m&&b.click&&(1===h||!n)&&(isNaN(i)||0===i))d=b.click.call(e,a,a.target);if(c==q)switch(b.swipe&&(d=b.swipe.call(e,a,j,i,k,h)),j){case v:b.swipeLeft&&(d=b.swipeLeft.call(e, a,j,i,k,h));break;case A:b.swipeRight&&(d=b.swipeRight.call(e,a,j,i,k,h));break;case B:b.swipeUp&&(d=b.swipeUp.call(e,a,j,i,k,h));break;case C:b.swipeDown&&(d=b.swipeDown.call(e,a,j,i,k,h))}(c===m||c===q)&&t(a);return d}function D(){return null!==b.threshold?i>=b.threshold:null}function U(){return Math.round(Math.sqrt(Math.pow(f-r,2)+Math.pow(p-s,2)))}function S(){var a;a=Math.atan2(p-s,r-f);a=Math.round(180*a/Math.PI);0>a&&(a=360-Math.abs(a));return 45>=a&&0<=a?v:360>=a&&315<=a?v:135<=a&&225>=a? A:45<a&&135>a?C:B}function V(){e.unbind(E,H);e.unbind(F,t);e.unbind(I,J);e.unbind(K,L)}var O=n||!b.fallbackToMouseEvents,E=O?"touchstart":"mousedown",I=O?"touchmove":"mousemove",K=O?"touchend":"mouseup",F="touchcancel",i=0,j=null,k=0,e=g(c),d="start",h=0,y=p=f=s=r=0,u=0;try{e.bind(E,H),e.bind(F,t)}catch(P){g.error("events not supported "+E+","+F+" on jQuery.swipe")}this.enable=function(){e.bind(E,H);e.bind(F,t);return e};this.disable=function(){V();return e};this.destroy=function(){V();e.data(w,null); return e}}var v="left",A="right",B="up",C="down",G="none",T="auto",M="horizontal",N="vertical",x="all",R="start",z="move",q="end",m="cancel",n="ontouchstart"in window,w="TouchSwipe";g.fn.swipe=function(c){var b=g(this),f=b.data(w);if(f&&"string"===typeof c){if(f[c])return f[c].apply(this,Array.prototype.slice.call(arguments,1));g.error("Method "+c+" does not exist on jQuery.swipe")}else if(!f&&("object"===typeof c||!c))return P.apply(this,arguments);return b};g.fn.swipe.defaults={fingers:1,threshold:75, maxTimeThreshold:null,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,click:null,triggerOnTouchEnd:!0,allowPageScroll:"auto",fallbackToMouseEvents:!0};g.fn.swipe.phases={PHASE_START:R,PHASE_MOVE:z,PHASE_END:q,PHASE_CANCEL:m};g.fn.swipe.directions={LEFT:v,RIGHT:A,UP:B,DOWN:C};g.fn.swipe.pageScroll={NONE:G,HORIZONTAL:M,VERTICAL:N,AUTO:T};g.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:x}})(jQuery);
/*
File: jquery.sticky.js
*/
// Sticky Plugin
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//              It will only set the 'top' and 'position' of your element, you
//              might need to adjust the width in some cases.

(function($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper'
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function() {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;
            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;
                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement
                            .css('position', '')
                            .css('top', '')
                            .removeClass(s.className);
                        s.stickyElement.parent().removeClass(s.className);
                        s.currentTop = null;
                    }
                }
                else {
                    var newTop = documentHeight - s.stickyElement.outerHeight()
                        - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop != newTop) {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .addClass(s.className);
                        s.stickyElement.parent().addClass(s.className);
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();
        },
        methods = {
            init: function(options) {
                var o = $.extend(defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);

                    stickyId = stickyElement.attr('id');
                    wrapper = $('<div></div>')
                        .attr('id', stickyId + '-sticky-wrapper')
                        .addClass(o.wrapperClassName);
                    stickyElement.wrapAll(wrapper);
                    var stickyWrapper = stickyElement.parent();
                    stickyWrapper.css('height', stickyElement.outerHeight());
                    sticked.push({
                        topSpacing: o.topSpacing,
                        bottomSpacing: o.bottomSpacing,
                        stickyElement: stickyElement,
                        currentTop: null,
                        stickyWrapper: stickyWrapper,
                        className: o.className
                    });
                });
            },
            update: scroller
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function() {
        setTimeout(scroller, 0);
    });
})(jQuery);

/*
File: jquery.parallax-1.1.3.js
*/
/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
 var ua = $.browser;
 //console.log(ua);
	var $window = $(window);
	var windowHeight = $window.height();
	
	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
	
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		var pattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i;
		// function to be called whenever the window is scrolled or resized
		function update(){
	
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){
				$this.each(function(){
					$this.css('backgroundPosition', "top left");
					$this.css('backgroundAttachment', "scroll");
				});
				return;
			}
			var pos = $window.scrollTop();				

			$this.each(function(){
				
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);

/*
File: jquery.localscroll-1.2.7-min.js
*/
/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);
/*
File: jquery.scrollTo-1.4.3.1-min.js
*/
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
/*
File: jquery.cycle.all.js
*/
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9998 (27-OCT-2011)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;(function($, undefined) {

var ver = '2.9998';

// if $.support is not defined (pre jQuery 1.3) add what I need
if ($.support == undefined) {
	$.support = {
		opacity: !($.browser.msie)
	};
}

function debug(s) {
	$.fn.cycle.debug && log(s);
}		
function log() {
	window.console && console.log && console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
}
$.expr[':'].paused = function(el) {
	return el.cyclePause;
}


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

$.fn.cycle = function(options, arg2) {
	var o = { s: this.selector, c: this.context };

	// in 1.3+ we can fix mistakes with the ready state
	if (this.length === 0 && options != 'stop') {
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing slideshow');
			$(function() {
				$(o.s,o.c).cycle(options,arg2);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}

	// iterate the matched nodeset
	return this.each(function() {
		var opts = handleArguments(this, options, arg2);
		if (opts === false)
			return;

		opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
		
		// stop existing slideshow for this container (if there is one)
		if (this.cycleTimeout)
			clearTimeout(this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;

		var $cont = $(this);
		var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
		var els = $slides.get();

		var opts2 = buildOptions($cont, $slides, els, opts, o);
		if (opts2 === false)
			return;

		if (els.length < 2) {
			log('terminating; too few slides: ' + els.length);
			return;
		}

		var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

		// if it's an auto slideshow, kick it off
		if (startTime) {
			startTime += (opts2.delay || 0);
			if (startTime < 10)
				startTime = 10;
			debug('first timeout: ' + startTime);
			this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards)}, startTime);
		}
	});
};

function triggerPause(cont, byHover, onPager) {
	var opts = $(cont).data('cycle.opts');
	var paused = !!cont.cyclePause;
	if (paused && opts.paused)
		opts.paused(cont, opts, byHover, onPager);
	else if (!paused && opts.resumed)
		opts.resumed(cont, opts, byHover, onPager);
}

// process the args that were passed to the plugin fn
function handleArguments(cont, options, arg2) {
	if (cont.cycleStop == undefined)
		cont.cycleStop = 0;
	if (options === undefined || options === null)
		options = {};
	if (options.constructor == String) {
		switch(options) {
		case 'destroy':
		case 'stop':
			var opts = $(cont).data('cycle.opts');
			if (!opts)
				return false;
			cont.cycleStop++; // callbacks look for change
			if (cont.cycleTimeout)
				clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
			opts.elements && $(opts.elements).stop();
			$(cont).removeData('cycle.opts');
			if (options == 'destroy')
				destroy(opts);
			return false;
		case 'toggle':
			cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
			checkInstantResume(cont.cyclePause, arg2, cont);
			triggerPause(cont);
			return false;
		case 'pause':
			cont.cyclePause = 1;
			triggerPause(cont);
			return false;
		case 'resume':
			cont.cyclePause = 0;
			checkInstantResume(false, arg2, cont);
			triggerPause(cont);
			return false;
		case 'prev':
		case 'next':
			var opts = $(cont).data('cycle.opts');
			if (!opts) {
				log('options not found, "prev/next" ignored');
				return false;
			}
			$.fn.cycle[options](opts);
			return false;
		default:
			options = { fx: options };
		};
		return options;
	}
	else if (options.constructor == Number) {
		// go to the requested slide
		var num = options;
		options = $(cont).data('cycle.opts');
		if (!options) {
			log('options not found, can not advance slide');
			return false;
		}
		if (num < 0 || num >= options.elements.length) {
			log('invalid slide index: ' + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout(cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go(options.elements, options, 1, num >= options.currSlide);
		return false;
	}
	return options;
	
	function checkInstantResume(isPaused, arg2, cont) {
		if (!isPaused && arg2 === true) { // resume now!
			var options = $(cont).data('cycle.opts');
			if (!options) {
				log('options not found, can not resume');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout(cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			go(options.elements, options, 1, !options.backwards);
		}
	}
};

function removeFilter(el, opts) {
	if (!$.support.opacity && opts.cleartype && el.style.filter) {
		try { el.style.removeAttribute('filter'); }
		catch(smother) {} // handle old opera versions
	}
};

// unbind event handlers
function destroy(opts) {
	if (opts.next)
		$(opts.next).unbind(opts.prevNextEvent);
	if (opts.prev)
		$(opts.prev).unbind(opts.prevNextEvent);
	
	if (opts.pager || opts.pagerAnchorBuilder)
		$.each(opts.pagerAnchors || [], function() {
			this.unbind().remove();
		});
	opts.pagerAnchors = null;
	if (opts.destroy) // callback
		opts.destroy(opts);
};

// one-time initialization
function buildOptions($cont, $slides, els, options, o) {
	var startingSlideSpecified;
	// support metadata plugin (v1.0 and v2.0)
	var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
	var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
	if (meta)
		opts = $.extend(opts, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount || els.length;

	var cont = $cont[0];
	$cont.data('cycle.opts', opts);
	opts.$cont = $cont;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before ? [opts.before] : [];
	opts.after = opts.after ? [opts.after] : [];

	// push some after callbacks
	if (!$.support.opacity && opts.cleartype)
		opts.after.push(function() { removeFilter(this, opts); });
	if (opts.continuous)
		opts.after.push(function() { go(els,opts,0,!opts.backwards); });

	saveOriginalOpts(opts);

	// clearType corrections
	if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
		clearTypeFix($slides);

	// container requires non-static position so that slides can be position within
	if ($cont.css('position') == 'static')
		$cont.css('position', 'relative');
	if (opts.width)
		$cont.width(opts.width);
	if (opts.height && opts.height != 'auto')
		$cont.height(opts.height);

	if (opts.startingSlide != undefined) {
		opts.startingSlide = parseInt(opts.startingSlide,10);
		if (opts.startingSlide >= els.length || opts.startSlide < 0)
			opts.startingSlide = 0; // catch bogus input
		else 
			startingSlideSpecified = true;
	}
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;
	else
		opts.startingSlide = 0;

	// if random, mix up the slide array
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i < els.length; i++)
			opts.randomMap.push(i);
		opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		if (startingSlideSpecified) {
			// try to find the specified starting slide and if found set start slide index in the map accordingly
			for ( var cnt = 0; cnt < els.length; cnt++ ) {
				if ( opts.startingSlide == opts.randomMap[cnt] ) {
					opts.randomIndex = cnt;
				}
			}
		}
		else {
			opts.randomIndex = 1;
			opts.startingSlide = opts.randomMap[1];
		}
	}
	else if (opts.startingSlide >= els.length)
		opts.startingSlide = 0; // catch bogus input
	opts.currSlide = opts.startingSlide || 0;
	var first = opts.startingSlide;

	// set position and zIndex on all the slides
	$slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
		var z;
		if (opts.backwards)
			z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
		else
			z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
		$(this).css('z-index', z)
	});

	// make sure first slide is visible
	$(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
	removeFilter(els[first], opts);

	// stretch slides
	if (opts.fit) {
		if (!opts.aspect) {
	        if (opts.width)
	            $slides.width(opts.width);
	        if (opts.height && opts.height != 'auto')
	            $slides.height(opts.height);
		} else {
			$slides.each(function(){
				var $slide = $(this);
				var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
				if( opts.width && $slide.width() != opts.width ) {
					$slide.width( opts.width );
					$slide.height( opts.width / ratio );
				}

				if( opts.height && $slide.height() < opts.height ) {
					$slide.height( opts.height );
					$slide.width( opts.height * ratio );
				}
			});
		}
	}

	if (opts.center && ((!opts.fit) || opts.aspect)) {
		$slides.each(function(){
			var $slide = $(this);
			$slide.css({
				"margin-left": opts.width ?
					((opts.width - $slide.width()) / 2) + "px" :
					0,
				"margin-top": opts.height ?
					((opts.height - $slide.height()) / 2) + "px" :
					0
			});
		});
	}

	if (opts.center && !opts.fit && !opts.slideResize) {
	  	$slides.each(function(){
	    	var $slide = $(this);
	    	$slide.css({
	      		"margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
	      		"margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
	    	});
	  	});
	}
		
	// stretch container
	var reshape = opts.containerResize && !$cont.innerHeight();
	if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for(var j=0; j < els.length; j++) {
			var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
			if (!w) w = e.offsetWidth || e.width || $e.attr('width');
			if (!h) h = e.offsetHeight || e.height || $e.attr('height');
			maxw = w > maxw ? w : maxw;
			maxh = h > maxh ? h : maxh;
		}
		if (maxw > 0 && maxh > 0)
			$cont.css({width:maxw+'px',height:maxh+'px'});
	}

	var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$cont.hover(
			function(){
				pauseFlag = true;
				this.cyclePause++;
				triggerPause(cont, true);
			},
			function(){
				pauseFlag && this.cyclePause--;
				triggerPause(cont, true);
			}
		);

	if (supportMultiTransitions(opts) === false)
		return false;

	// apparently a lot of people use image slideshows without height/width attributes on the images.
	// Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts || 0;
	$slides.each(function() {
		// try to get height/width of each slide
		var $el = $(this);
		this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
		this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

		if ( $el.is('img') ) {
			// sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
			// an image is being downloaded and the markup did not include sizing info (height/width attributes);
			// there seems to be some "default" sizes used in this situation
			var loadingIE	= ($.browser.msie  && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
			var loadingFF	= ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
			var loadingOp	= ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
			var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
			// don't requeue for images that are still loading but have a valid size
			if (loadingIE || loadingFF || loadingOp || loadingOther) {
				if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
					log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
					setTimeout(function() {$(o.s,o.c).cycle(options)}, opts.requeueTimeout);
					requeue = true;
					return false; // break each loop
				}
				else {
					log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore || {};
	opts.cssAfter = opts.cssAfter || {};
	opts.cssFirst = opts.cssFirst || {};
	opts.animIn = opts.animIn || {};
	opts.animOut = opts.animOut || {};

	$slides.not(':eq('+first+')').css(opts.cssBefore);
	$($slides[first]).css(opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parseInt(opts.timeout,10);
		// ensure that timeout and speed settings are sane
		if (opts.speed.constructor == String)
			opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
		if (!opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
		while((opts.timeout - opts.speed) < buffer) // sanitize timeout
			opts.timeout += opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (!opts.speedIn)
		opts.speedIn = opts.speed;
	if (!opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = first;
	if (opts.random) {
		if (++opts.randomIndex == els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide == 0 ? (els.length-1) : opts.startingSlide-1;
	else
		opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

	// run transition init fn
	if (!opts.multiFx) {
		var init = $.fn.cycle.transitions[opts.fx];
		if ($.isFunction(init))
			init($cont, $slides, opts);
		else if (opts.fx != 'custom' && !opts.multiFx) {
			log('unknown transition: ' + opts.fx,'; slideshow terminating');
			return false;
		}
	}

	// fire artificial events
	var e0 = $slides[first];
	if (!opts.skipInitializationCallbacks) {
		if (opts.before.length)
			opts.before[0].apply(e0, [e0, e0, opts, true]);
		if (opts.after.length)
			opts.after[0].apply(e0, [e0, e0, opts, true]);
	}
	if (opts.next)
		$(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1)});
	if (opts.prev)
		$(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0)});
	if (opts.pager || opts.pagerAnchorBuilder)
		buildPager(els,opts);

	exposeAddSlide(opts, els);

	return opts;
};

// save off original opts so we can restore after clearing state
function saveOriginalOpts(opts) {
	opts.original = { before: [], after: [] };
	opts.original.cssBefore = $.extend({}, opts.cssBefore);
	opts.original.cssAfter  = $.extend({}, opts.cssAfter);
	opts.original.animIn	= $.extend({}, opts.animIn);
	opts.original.animOut   = $.extend({}, opts.animOut);
	$.each(opts.before, function() { opts.original.before.push(this); });
	$.each(opts.after,  function() { opts.original.after.push(this); });
};

function supportMultiTransitions(opts) {
	var i, tx, txs = $.fn.cycle.transitions;
	// look for multiple effects
	if (opts.fx.indexOf(',') > 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
		// discard any bogus effect names
		for (i=0; i < opts.fxs.length; i++) {
			var fx = opts.fxs[i];
			tx = txs[fx];
			if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
				log('discarding unknown transition: ',fx);
				opts.fxs.splice(i,1);
				i--;
			}
		}
		// if we have an empty list then we threw everything away!
		if (!opts.fxs.length) {
			log('No valid transitions named; slideshow terminating.');
			return false;
		}
	}
	else if (opts.fx == 'all') {  // auto-gen the list of transitions
		opts.multiFx = true;
		opts.fxs = [];
		for (p in txs) {
			tx = txs[p];
			if (txs.hasOwnProperty(p) && $.isFunction(tx))
				opts.fxs.push(p);
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		// munge the fxs array to make effect selection random
		var r1 = Math.floor(Math.random() * 20) + 30;
		for (i = 0; i < r1; i++) {
			var r2 = Math.floor(Math.random() * opts.fxs.length);
			opts.fxs.push(opts.fxs.splice(r2,1)[0]);
		}
		debug('randomized fx sequence: ',opts.fxs);
	}
	return true;
};

// provide a mechanism for adding slides after the slideshow has started
function exposeAddSlide(opts, els) {
	opts.addSlide = function(newSlide, prepend) {
		var $s = $(newSlide), s = $s[0];
		if (!opts.autostopCount)
			opts.countdown++;
		els[prepend?'unshift':'push'](s);
		if (opts.els)
			opts.els[prepend?'unshift':'push'](s); // shuffle needs this
		opts.slideCount = els.length;

		// add the slide to the random map and resort
		if (opts.random) {
			opts.randomMap.push(opts.slideCount-1);
			opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
		}

		$s.css('position','absolute');
		$s[prepend?'prependTo':'appendTo'](opts.$cont);

		if (prepend) {
			opts.currSlide++;
			opts.nextSlide++;
		}

		if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
			clearTypeFix($s);

		if (opts.fit && opts.width)
			$s.width(opts.width);
		if (opts.fit && opts.height && opts.height != 'auto')
			$s.height(opts.height);
		s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
		s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

		$s.css(opts.cssBefore);

		if (opts.pager || opts.pagerAnchorBuilder)
			$.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

		if ($.isFunction(opts.onAddSlide))
			opts.onAddSlide($s);
		else
			$s.hide(); // default behavior
	};
}

// reset internal state; we do this on every pass in order to support multiple effects
$.fn.cycle.resetState = function(opts, fx) {
	fx = fx || opts.fx;
	opts.before = []; opts.after = [];
	opts.cssBefore = $.extend({}, opts.original.cssBefore);
	opts.cssAfter  = $.extend({}, opts.original.cssAfter);
	opts.animIn	= $.extend({}, opts.original.animIn);
	opts.animOut   = $.extend({}, opts.original.animOut);
	opts.fxFn = null;
	$.each(opts.original.before, function() { opts.before.push(this); });
	$.each(opts.original.after,  function() { opts.after.push(this); });

	// re-init
	var init = $.fn.cycle.transitions[fx];
	if ($.isFunction(init))
		init(opts.$cont, $(opts.elements), opts);
};

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
function go(els, opts, manual, fwd) {
	// opts.busy is true if we're in the middle of an animation
	if (manual && opts.busy && opts.manualTrump) {
		// let manual transitions requests trump active ones
		debug('manualTrump in go(), stopping active transition');
		$(els).stop(true,true);
		opts.busy = 0;
	}
	// don't begin another timeout-based transition if there is one active
	if (opts.busy) {
		debug('transition active, ignoring new tx request');
		return;
	}

	var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

	// stop cycling if we have an outstanding stop request
	if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
		return;

	// check to see if we should stop cycling based on autostop options
	if (!manual && !p.cyclePause && !opts.bounce &&
		((opts.autostop && (--opts.countdown <= 0)) ||
		(opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
		if (opts.end)
			opts.end(opts);
		return;
	}

	// if slideshow is paused, only transition on a manual trigger
	var changed = false;
	if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
		changed = true;
		var fx = opts.fx;
		// keep trying to get the slide size if we don't have it yet
		curr.cycleH = curr.cycleH || $(curr).height();
		curr.cycleW = curr.cycleW || $(curr).width();
		next.cycleH = next.cycleH || $(next).height();
		next.cycleW = next.cycleW || $(next).width();

		// support multiple transition types
		if (opts.multiFx) {
			if (fwd && (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length))
				opts.lastFx = 0;
			else if (!fwd && (opts.lastFx == undefined || --opts.lastFx < 0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs[opts.lastFx];
		}

		// one-time fx overrides apply to:  $('div').cycle(3,'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		$.fn.cycle.resetState(opts, fx);

		// run the before callbacks
		if (opts.before.length)
			$.each(opts.before, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});

		// stage the after callacks
		var after = function() {
			opts.busy = 0;
			$.each(opts.after, function(i,o) {
				if (p.cycleStop != opts.stopCount) return;
				o.apply(next, [curr, next, opts, fwd]);
			});
			if (!p.cycleStop) {
				// queue next transition
				queueNext();
			}
		};

		debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
		
		// get ready to perform the transition
		opts.busy = 1;
		if (opts.fxFn) // fx function provided?
			opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
			$.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
		else
			$.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
	}
	else {
		queueNext();
	}

	if (changed || opts.nextSlide == opts.currSlide) {
		// calculate the next slide
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (++opts.randomIndex == els.length) {
				opts.randomIndex = 0;
				opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
			}
			opts.nextSlide = opts.randomMap[opts.randomIndex];
			if (opts.nextSlide == opts.currSlide)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
		}
		else if (opts.backwards) {
			var roll = (opts.nextSlide - 1) < 0;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
				opts.currSlide = roll ? 0 : opts.nextSlide+1;
			}
		}
		else { // sequence
			var roll = (opts.nextSlide + 1) == els.length;
			if (roll && opts.bounce) {
				opts.backwards = !opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = roll ? 0 : opts.nextSlide+1;
				opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
			}
		}
	}
	if (changed && opts.pager)
		opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
	
	function queueNext() {
		// stage the next transition
		var ms = 0, timeout = opts.timeout;
		if (opts.timeout && !opts.continuous) {
			ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
         if (opts.fx == 'shuffle')
            ms -= opts.speedOut;
      }
		else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
			ms = 10;
		if (ms > 0)
			p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards) }, ms);
	}
};

// invoked after transition
$.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
   $(pager).each(function() {
       $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
   });
};

// calculate timeout value for current transition
function getTimeout(curr, next, opts, fwd) {
	if (opts.timeoutFn) {
		// call user provided calc fn
		var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
		while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
			t += opts.speed;
		debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
		if (t !== false)
			return t;
	}
	return opts.timeout;
};

// expose next/prev function, caller must pass in state
$.fn.cycle.next = function(opts) { advance(opts,1); };
$.fn.cycle.prev = function(opts) { advance(opts,0);};

// advance slide forward or back
function advance(opts, moveForward) {
	var val = moveForward ? 1 : -1;
	var els = opts.elements;
	var p = opts.$cont[0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout(timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val < 0) {
		// move back to the previously display slide
		opts.randomIndex--;
		if (--opts.randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap[opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide < 0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide >= els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
	if ($.isFunction(cb))
		cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
	go(els, opts, 1, moveForward);
	return false;
};

function buildPager(els, opts) {
	var $p = $(opts.pager);
	$.each(els, function(i,o) {
		$.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
	});
	opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
};

$.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
	var a;
	if ($.isFunction(opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder(i,el);
		debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
	}
	else
		a = '<a href="#">'+(i+1)+'</a>';
		
	if (!a)
		return;
	var $a = $(a);
	// don't reparent if anchor is in the dom
	if ($a.parents('body').length === 0) {
		var arr = [];
		if ($p.length > 1) {
			$p.each(function() {
				var $clone = $a.clone(true);
				$(this).append($clone);
				arr.push($clone[0]);
			});
			$a = $(arr);
		}
		else {
			$a.appendTo($p);
		}
	}

	opts.pagerAnchors =  opts.pagerAnchors || [];
	opts.pagerAnchors.push($a);
	
	var pagerFn = function(e) {
		e.preventDefault();
		opts.nextSlide = i;
		var p = opts.$cont[0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout(timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
		if ($.isFunction(cb))
			cb(opts.nextSlide, els[opts.nextSlide]);
		go(els,opts,1,opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
	}
	
	if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
		$a.hover(pagerFn, function(){/* no-op */} );
	}
	else {
		$a.bind(opts.pagerEvent, pagerFn);
	}
	
	if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
		$a.bind('click.cycle', function(){return false;}); // suppress click
	
	var cont = opts.$cont[0];
	var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$a.hover(
			function() { 
				pauseFlag = true;
				cont.cyclePause++; 
				triggerPause(cont,true,true);
			}, function() { 
				pauseFlag && cont.cyclePause--; 
				triggerPause(cont,true,true);
			} 
		);
	}
};

// helper fn to calculate the number of slides between the current and the next
$.fn.cycle.hopsFromLast = function(opts, fwd) {
	var hops, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		hops = c > l ? c - l : opts.slideCount - l;
	else
		hops = c < l ? l - c : l + opts.slideCount - c;
	return hops;
};

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
function clearTypeFix($slides) {
	debug('applying clearType background-color hack');
	function hex(s) {
		s = parseInt(s,10).toString(16);
		return s.length < 2 ? '0'+s : s;
	};
	function getBg(e) {
		for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
			var v = $.css(e,'background-color');
			if (v && v.indexOf('rgb') >= 0 ) {
				var rgb = v.match(/\d+/g);
				return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
			}
			if (v && v != 'transparent')
				return v;
		}
		return '#ffffff';
	};
	$slides.each(function() { $(this).css('background-color', getBg(this)); });
};

// reset common props before the next transition
$.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
	$(opts.elements).not(curr).hide();
	if (typeof opts.cssBefore.opacity == 'undefined')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w !== false && next.cycleW > 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h !== false && next.cycleH > 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter || {};
	opts.cssAfter.display = 'none';
	$(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
	$(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
};

// the actual fn for effecting a transition
$.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
	var $l = $(curr), $n = $(next);
	var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
	$n.css(opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'number')
			speedIn = speedOut = speedOverride;
		else
			speedIn = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function() {
		$n.animate(opts.animIn, speedIn, easeIn, function() {
			cb();
		});
	};
	$l.animate(opts.animOut, speedOut, easeOut, function() {
		$l.css(opts.cssAfter);
		if (!opts.sync) 
			fn();
	});
	if (opts.sync) fn();
};

// transition definitions - only fade is defined here, transition pack defines the rest
$.fn.cycle.transitions = {
	fade: function($cont, $slides, opts) {
		$slides.not(':eq('+opts.currSlide+')').css('opacity',0);
		opts.before.push(function(curr,next,opts) {
			$.fn.cycle.commonReset(curr,next,opts);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn	   = { opacity: 1 };
		opts.animOut   = { opacity: 0 };
		opts.cssBefore = { top: 0, left: 0 };
	}
};

$.fn.cycle.ver = function() { return ver; };

// override these globally if you like (they are all optional)
$.fn.cycle.defaults = {
	activePagerClass: 'activeSlide', // class name used for the active pager link
	after:		   null,  // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
	allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
	animIn:		   null,  // properties that define how the slide animates in
	animOut:	   null,  // properties that define how the slide animates out
	aspect:		   false,  // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
	autostop:	   0,	  // true to end slideshow after X transitions (where X == slide count)
	autostopCount: 0,	  // number of transitions (optionally used with autostop to define X)
	backwards:     false, // true to start slideshow at last slide and move backwards through the stack
	before:		   null,  // transition callback (scope set to element to be shown):	 function(currSlideElement, nextSlideElement, options, forwardFlag)
	center: 	   null,  // set to true to have cycle add top/left margin to each slide (use with width and height options)
	cleartype:	   !$.support.opacity,  // true if clearType corrections should be applied (for IE)
	cleartypeNoBg: false, // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
	containerResize: 1,	  // resize container to fit largest slide
	continuous:	   0,	  // true to start next transition immediately after current one completes
	cssAfter:	   null,  // properties that defined the state of the slide after transitioning out
	cssBefore:	   null,  // properties that define the initial state of the slide before transitioning in
	delay:		   0,	  // additional delay (in ms) for first transition (hint: can be negative)
	easeIn:		   null,  // easing for "in" transition
	easeOut:	   null,  // easing for "out" transition
	easing:		   null,  // easing method for both in and out transitions
	end:		   null,  // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
	fastOnEvent:   0,	  // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
	fit:		   0,	  // force slides to fit container
	fx:			  'fade', // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
	fxFn:		   null,  // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
	height:		  'auto', // container height (if the 'fit' option is true, the slides will be set to this height as well)
	manualTrump:   true,  // causes manual transition to stop an active transition instead of being ignored
	metaAttr:     'cycle',// data- attribute that holds the option data for the slideshow
	next:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
	nowrap:		   0,	  // true to prevent slideshow from wrapping
	onPagerEvent:  null,  // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
	onPrevNextEvent: null,// callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
	pager:		   null,  // element, jQuery object, or jQuery selector string for the element to use as pager container
	pagerAnchorBuilder: null, // callback fn for building anchor links:  function(index, DOMelement)
	pagerEvent:	  'click.cycle', // name of event which drives the pager navigation
	pause:		   0,	  // true to enable "pause on hover"
	pauseOnPagerHover: 0, // true to pause when hovering over pager link
	prev:		   null,  // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
	prevNextEvent:'click.cycle',// event which drives the manual transition to the previous or next slide
	random:		   0,	  // true for random, false for sequence (not applicable to shuffle fx)
	randomizeEffects: 1,  // valid when multiple effects are used; true to make the effect sequence random
	requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
	requeueTimeout: 250,  // ms delay for requeue
	rev:		   0,	  // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
	shuffle:	   null,  // coords for shuffle animation, ex: { top:15, left: 200 }
	skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
	slideExpr:	   null,  // expression for selecting slides (if something other than all children is required)
	slideResize:   1,     // force slide width/height to fixed size before every transition
	speed:		   1000,  // speed of the transition (any valid fx speed value)
	speedIn:	   null,  // speed of the 'in' transition
	speedOut:	   null,  // speed of the 'out' transition
	startingSlide: 0,	  // zero-based index of the first slide to be displayed
	sync:		   1,	  // true if in/out transitions should occur simultaneously
	timeout:	   5000,  // milliseconds between slide transitions (0 to disable auto advance)
	timeoutFn:     null,  // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
	updateActivePagerLink: null, // callback fn invoked to update the active pager link (adds/removes activePagerClass style)
	width:         null   // container width (if the 'fit' option is true, the slides will be set to this width as well)
};

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
$.fn.cycle.transitions.none = function($cont, $slides, opts) {
	opts.fxFn = function(curr,next,opts,after){
		$(next).show();
		$(curr).hide();
		after();
	};
};

// not a cross-fade, fadeout only fades out the top slide
$.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
	$slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
	opts.before.push(function(curr,next,opts,w,h,rev) {
		$(curr).css('zIndex',opts.slideCount + (!rev === true ? 1 : 0));
		$(next).css('zIndex',opts.slideCount + (!rev === true ? 0 : 1));
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

// scrollUp/Down/Left/Right
$.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top = -h;
};
$.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var h = $cont.height();
	opts.cssFirst.top = 0;
	opts.cssBefore.top = -h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push($.fn.cycle.commonReset);
	var w = $cont.width();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = -w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
	$cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
		opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
	$cont.css('overflow','hidden');
	opts.before.push(function(curr, next, opts, fwd) {
		if (opts.rev)
			fwd = !fwd;
		$.fn.cycle.commonReset(curr,next,opts);
		opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
		opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

// slideX/slideY
$.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$(opts.elements).not(curr).hide();
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

// shuffle
$.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
	var i, w = $cont.css('overflow', 'visible').width();
	$slides.css({left: 0, top: 0});
	opts.before.push(function(curr,next,opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
	});
	// only adjust speed once!
	if (!opts.speedAdjusted) {
		opts.speed = opts.speed / 2; // shuffle has 2 transitions
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle || {left:-w, top:15};
	opts.els = [];
	for (i=0; i < $slides.length; i++)
		opts.els.push($slides[i]);

	for (i=0; i < opts.currSlide; i++)
		opts.els.push(opts.els.shift());

	// custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
	opts.fxFn = function(curr, next, opts, cb, fwd) {
		if (opts.rev)
			fwd = !fwd;
		var $el = fwd ? $(curr) : $(next);
		$(next).css(opts.cssBefore);
		var count = opts.slideCount;
		$el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
			var hops = $.fn.cycle.hopsFromLast(opts, fwd);
			for (var k=0; k < hops; k++)
				fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
			if (fwd) {
				for (var i=0, len=opts.els.length; i < len; i++)
					$(opts.els[i]).css('z-index', len-i+count);
			}
			else {
				var z = $(curr).css('z-index');
				$el.css('z-index', parseInt(z,10)+1+count);
			}
			$el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
				$(fwd ? this : curr).hide();
				if (cb) cb();
			});
		});
	};
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
};

// turnUp/Down/Left/Right
$.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	$.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

// zoom
$.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.cssBefore.left = next.cycleW/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
		$.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

// fadeZoom
$.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,false);
		opts.cssBefore.left = next.cycleW/2;
		opts.cssBefore.top = next.cycleH/2;
		$.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

// blindX
$.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.width = next.cycleW;
		opts.animOut.left   = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
// blindY
$.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
// blindZ
$.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
	var h = $cont.css('overflow','hidden').height();
	var w = $cont.width();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		opts.animIn.height = next.cycleH;
		opts.animOut.top   = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

// growX - grow horizontally from centered 0 width
$.fn.cycle.transitions.growX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true);
		opts.cssBefore.left = this.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// growY - grow vertically from centered 0 height
$.fn.cycle.transitions.growY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false);
		opts.cssBefore.top = this.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// curtainX - squeeze in both edges horizontally
$.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,false,true,true);
		opts.cssBefore.left = next.cycleW/2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW/2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
// curtainY - squeeze in both edges vertically
$.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,false,true);
		opts.cssBefore.top = next.cycleH/2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH/2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

// cover - curr slide covered by next slide
$.fn.cycle.transitions.cover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts);
		if (d == 'right')
			opts.cssBefore.left = -w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top = -h;
		else
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// uncover - curr slide moves off next slide
$.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
	var d = opts.direction || 'left';
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		if (d == 'right')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top = -h;
		else if (d == 'down')
			opts.animOut.top = h;
		else
			opts.animOut.left = -w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

// toss - move top slide and fade away
$.fn.cycle.transitions.toss = function($cont, $slides, opts) {
	var w = $cont.css('overflow','visible').width();
	var h = $cont.height();
	opts.before.push(function(curr, next, opts) {
		$.fn.cycle.commonReset(curr,next,opts,true,true,true);
		// provide default toss settings if animOut not provided
		if (!opts.animOut.left && !opts.animOut.top)
			$.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
		else
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

// wipe - clip animation
$.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
	var w = $cont.css('overflow','hidden').width();
	var h = $cont.height();
	opts.cssBefore = opts.cssBefore || {};
	var clip;
	if (opts.clip) {
		if (/l2r/.test(opts.clip))
			clip = 'rect(0px 0px '+h+'px 0px)';
		else if (/r2l/.test(opts.clip))
			clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
		else if (/t2b/.test(opts.clip))
			clip = 'rect(0px '+w+'px 0px 0px)';
		else if (/b2t/.test(opts.clip))
			clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
		else if (/zoom/.test(opts.clip)) {
			var top = parseInt(h/2,10);
			var left = parseInt(w/2,10);
			clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match(/(\d+)/g);
	var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

	opts.before.push(function(curr, next, opts) {
		if (curr == next) return;
		var $curr = $(curr), $next = $(next);
		$.fn.cycle.commonReset(curr,next,opts,true,true,false);
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
		(function f() {
			var tt = t ? t - parseInt(step * (t/count),10) : 0;
			var ll = l ? l - parseInt(step * (l/count),10) : 0;
			var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
			var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
			$next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
			(step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
		})();
	});
	$.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
	opts.animIn	   = { left: 0 };
	opts.animOut   = { left: 0 };
};

})(jQuery);
/*
File: jquery.maximage.js
*/
/*	--------------------------------------------------------------------
	MaxImage 2.0 (Fullscreen Slideshow for use with jQuery Cycle Plugin)
	--------------------------------------------------------------------
	
	Examples and documentation at: http://www.aaronvanderzwan.com/maximage/2.0/
	Copyright (c) 2007-2012 Aaron Vanderzwan
	Dual licensed under the MIT and GPL licenses.
	
	NOTES:
	This plugin is intended to simplify the creation of fullscreen 
	background slideshows.  It is intended to be used alongside the 
	jQuery Cycle plugin: 
	http://jquery.malsup.com/cycle/
	
	If you simply need a fullscreen background image, please
	refer to the following document for ways to do this that
	are much more simple:
	http://css-tricks.com/perfect-full-page-background-image/
	
	If you have any questions please contact Aaron Vanderzwan
	at http://www.aaronvanderzwan.com/blog/
	Documentation at:
	http://blog.aaronvanderzwan.com/2012/07/maximage-2-0/
	
	HISTORY:
	MaxImage 2.0 is a project first built as jQuery MaxImage Plugin 
	(http://www.aaronvanderzwan.com/maximage/). Once CSS3 came along, 
	the background-size:cover solved the problem MaxImage
	was intended to solve.  However, fully customizable
	fullscreen slideshows is still fairly complex and I have not
	found any helpers for integrating with the jQuery Cycle Plugin.
	MaxCycle is intended to solve this problem.
	
	TABLE OF CONTENTS:
	@Modern
		@setup
		@resize
		@preload
	@Old
		@setup
		@preload
		@onceloaded
		@maximage
		@windowresize
		@doneresizing
	@Cycle
		@setup
	@Adjust
		@center
		@fill
		@maxcover
		@maxcontain
	@Utils
		@browser_tests
		@construct_slide_object
		@sizes
	@modern_browser
	@debug
		
*/
/*!	
 * Maximage Version: 2.0.8 (16-Jan-2012) - http://www.aaronvanderzwan.com/maximage/2.0/
 */



(function ($) {
	"use strict";
	$.fn.maximage = function (settings, helperSettings) {

		var config;

		if (typeof settings == 'object' || settings === undefined) config = $.extend( $.fn.maximage.defaults, settings || {} );
		if (typeof settings == 'string') config = $.fn.maximage.defaults;
		
		/*jslint browser: true*/
		$.Body = $('body');
		$.Window = $(window);
		$.Scroll = $('html, body');
		$.Events = {
			RESIZE: 'resize'
		};
		
		this.each(function() {
			var $self = $(this),
				preload_count = 0,
				imageCache = [];
			
			/* --------------------- */
			
			// @Modern
			
			/* 
			MODERN BROWSER NOTES:
				Modern browsers have CSS3 background-size option so we setup the DOM to be the following structure for cycle plugin:
				div = cycle
					div = slide with background-size:cover
					div = slide with background-size:cover
					etc.
			*/
			
			var Modern = {
				setup: function(){
					if($.Slides.length > 0){
						// Setup images
						for(var i in $.Slides) {
							// Set our image
							var $img = $.Slides[i];
							if(typeof $img.url == 'undefined') continue;
							// Create a div with a background image so we can use CSS3's position cover (for modern browsers)
							$self.append('<div class="mc-image ' + $img.theclass + '" title="' + $img.alt + '" style="background-image:url(\'' + $img.url + '\');' + $img.style + '" data-href="'+ $img.datahref +'">'+ $img.content +'</div>');
						}
						
						// Begin our preload process (increments itself after load)
						Modern.preload(0);
						
						// If using Cycle, this resets the height and width of each div to always fill the window; otherwise can be done with CSS
						Modern.resize();
					}
				},
				preload: function(n){
					// Preload all of the images but never show them, just use their completion so we know that they are done
					// 		and so that the browser can cache them / fade them in smoothly
					
					// Create new image object
					var $img = $('<img/>');
					$img.load(function() {
						// Once the first image has completed loading, start the slideshow, etc.
						if(preload_count==0) {
							// Only start cycle after first image has loaded
							Cycle.setup();
							
							// Run user defined onFirstImageLoaded() function
							config.onFirstImageLoaded();
						}
						
						// preload_count starts with 0, $.Slides.length starts with 1
						if(preload_count==($.Slides.length-1)) {
							// If we have just loaded the final image, run the user defined function onImagesLoaded()
							config.onImagesLoaded( $self );
						}else{ 
							// Increment the counter
							preload_count++;
							
							// Load the next image
							Modern.preload(preload_count);
						}
					});
					
					// Set the src... this triggers begin of load
					$img[0].src = $.Slides[n].url;
					
					// Push to external array to avoid cleanup by aggressive garbage collectors
					imageCache.push($img[0]);
				},
				resize: function(){
					// Cycle sets the height of each slide so when we resize our browser window this becomes a problem.
					//  - the cycle option 'slideResize' has to be set to false otherwise it will trump our resize
					$.Window
						.bind($.Events.RESIZE,
						function(){
							// Remove scrollbars so we can take propper measurements
							$.Scroll.addClass('mc-hide-scrolls');
							
							// Set vars so we don't have to constantly check it
							$.Window
								.data('h', Utils.sizes().h)
								.data('w', Utils.sizes().w);
							
							// Set container and slides height and width to match the window size
							$self
								.height($.Window.data('h')).width($.Window.data('w'))
								.children()
								.height($.Window.data('h')).width($.Window.data('w'));
							
							// This is special noise for cycle (cycle has separate height and width for each slide)
							$self.children().each(function(){
								this.cycleH = $.Window.data('h');
								this.cycleW = $.Window.data('w');
							});
							
							// Put the scrollbars back to how they were
							$($.Scroll).removeClass('mc-hide-scrolls');
						});
				}
			}
			
			
			
			/* --------------------- */
			
			// @Old
			
			/* 
			OLD BROWSER NOTES:
				We setup the dom to be the following structure for cycle plugin on old browsers:
				div = cycle
					div = slide
						img = full screen size image
					div = slide
						img = full screen size image
					etc.
			*/
			
			var Old = {
				setup: function(){
					var c, t, $div;
					
					// Clear container
					if($.BrowserTests.msie && !config.overrideMSIEStop){
						// Stop IE from continually trying to preload images that we already removed
						document.execCommand("Stop", false);
					}
					$self.html('');
					
					$.Body.addClass('mc-old-browser');
					
					if($.Slides.length > 0){
						// Remove scrollbars so we can take propper measurements
						$.Scroll.addClass('mc-hide-scrolls');
						
						// Cache our new dimensions
						$.Window
							.data('h', Utils.sizes().h)
							.data('w', Utils.sizes().w);
						
						// Add our loading div to the DOM
						$('body').append($("<div></div>").attr("class", "mc-loader").css({'position':'absolute','left':'-9999px'}));
						
						//  Loop through slides
						for(var j in $.Slides) {
							// Determine content (if container or image)
							if($.Slides[j].content.length == 0){
								c = '<img src="' + $.Slides[j].url + '" />';
							}else{
								c = $.Slides[j].content;
							}
							
							// Create Div
							$div = $("<div>" + c + "</div>").attr("class", "mc-image mc-image-n" + j + " " + $.Slides[j].theclass);
							
							// Add new container div to the DOM
							$self.append( $div );
							
							// Account for slides without images
							if($('.mc-image-n' + j).children('img').length == 0){
							}else{
								// Add first image to loader to get that started
								$('div.mc-loader').append( $('.mc-image-n' + j).children('img').first().clone().addClass('not-loaded') );
							}
						}
						
						// Begin preloading
						Old.preload();
						
						// Setup the resize function to listen for window changes
						Old.windowResize();
					}
				},
				preload: function(){
					// Intervals to tell if an images have loaded
					var t = setInterval(function() {
						$('.mc-loader').children('img').each(function(i){
							// Check if image is loaded
							var $img = $(this);
							
							// Loop through not-loaded images
							if($img.hasClass('not-loaded')){
								if( $img.height() > 0 ){
									// Remove Dom notice
									$(this).removeClass('not-loaded');
									
									// Set the dimensions
									var $img1 = $('div.mc-image-n' + i).children('img').first();
									
									$img1
										.data('h', $img.height())
										.data('w', $img.width())
										.data('ar', ($img.width() / $img.height()));
									
									// Go on
									Old.onceLoaded(i)
								}
							}
						});
					
						if( $('.not-loaded').length == 0){
							// Remove our loader element because all of our images are now loaded
							$('.mc-loader').remove();
							
							// Clear interval when all images are loaded
							clearInterval(t);
						}
					}, 1000);
				},
				onceLoaded: function(m){
					// Do maximage magic
					Old.maximage(m);
					
					// Once the first image has completed loading, start the slideshow, etc.
					if(m == 0) {
						// If we changed the visibility before, make sure it is back on
						$self.css({'visibility':'visible'});
						
						// Run user defined onFirstImageLoaded() function
						config.onFirstImageLoaded();
					
					// After everything is done loading, clean up
					}else if(m == $.Slides.length - 1){
						// Only start cycle after the first image has loaded
						Cycle.setup();
						
						// Put the scrollbars back to how they were
						$($.Scroll).removeClass('mc-hide-scrolls');
						
						// If we have just loaded the final image, run the user defined function onImagesLoaded()
						config.onImagesLoaded( $self );
						
						if(config.debug) {
							debug(' - Final Maximage - ');debug($self);
						}
					}
				},
				maximage: function(p){
					// Cycle sets the height of each slide so when we resize our browser window this becomes a problem.
					//  - the cycle option 'slideResize' has to be set to false otherwise it will trump our resize
					$('div.mc-image-n' + p)
						.height($.Window.data('h'))
						.width($.Window.data('w'))
						.children('img')
						.first()
						.each(function(){
							Adjust.maxcover($(this));
						});
				},
				windowResize: function(){
					$.Window
						.bind($.Events.RESIZE,
						function(){
							clearTimeout(this.id);
							this.id = setTimeout(Old.doneResizing, 200);
						});
				},
				doneResizing: function(){
					// The final resize (on finish)
					// Remove scrollbars so we can take propper measurements
					$($.Scroll).addClass('mc-hide-scrolls');
					
					// Cache our window's new dimensions
					$.Window
						.data('h', Utils.sizes().h)
						.data('w', Utils.sizes().w);
					
					// Set the container's height and width
					$self.height($.Window.data('h')).width($.Window.data('w'))
					
					// Set slide's height and width to match the window size
					$self.find('.mc-image').each(function(n){
						Old.maximage(n);
					});
					
					// Update cycle's ideas of what our slide's height and width should be
					var curr_opts = $self.data('cycle.opts');
					if(curr_opts != undefined){
						curr_opts.height = $.Window.data('h');
						curr_opts.width = $.Window.data('w');
						jQuery.each(curr_opts.elements, function(index, item) {
						    item.cycleW = $.Window.data('w');
							item.cycleH = $.Window.data('h');
						});
					}
					
					// Put the scrollbars back to how they were
					$($.Scroll).removeClass('mc-hide-scrolls');
				}
			}
			
			
			/* --------------------- */
			
			// @Cycle
			
			var Cycle = {
				setup: function(){
					var h,w;
					
					$self.addClass('mc-cycle');
					
					// Container sizes (if not set)
					$.Window
						.data('h', Utils.sizes().h)
						.data('w', Utils.sizes().w);
					
					// Prefer CSS Transitions
					jQuery.easing.easeForCSSTransition = function(x, t, b, c, d, s) {
						return b+c;
					};
					
					var cycleOptions = $.extend({
						fit:1,
						containerResize:0,
						height:$.Window.data('h'),
						width:$.Window.data('w'),
						slideResize: false,
						easing: ($.BrowserTests.cssTransitions && config.cssTransitions ? 'easeForCSSTransition' : 'swing')
					}, config.cycleOptions);
					
					$self.cycle( cycleOptions );
				}
			}
			
			
			
			/* --------------------- */
			
			// @Adjust = Math to center and fill all elements
			
			var Adjust = {
				center: function($item){
					// Note: if alignment is 'left' or 'right' it can be controlled with CSS once verticalCenter 
					// 	and horizontal center are set to false in the plugin options
					if(config.verticalCenter){
						$item.css({marginTop:(($item.height() - $.Window.data('h'))/2) * -1})
					}
					if(config.horizontalCenter){
						$item.css({marginLeft:(($item.width() - $.Window.data('w'))/2) * -1});
					}
				},
				fill: function($item){
					var $storageEl = $item.is('object') ? $item.parent().first() : $item;
					
					if(typeof config.backgroundSize == 'function'){
						// If someone wants to write their own fill() function, they can: example customBackgroundSize.html
						config.backgroundSize( $item );
					}else if(config.backgroundSize == 'cover'){
						if($.Window.data('w') / $.Window.data('h') < $storageEl.data('ar')){
							$item
								.height($.Window.data('h'))
								.width(($.Window.data('h') * $storageEl.data('ar')).toFixed(0));
						}else{
							$item
								.height(($.Window.data('w') / $storageEl.data('ar')).toFixed(0))
								.width($.Window.data('w'));
						}
					}else if(config.backgroundSize == 'contain'){
						if($.Window.data('w') / $.Window.data('h') < $storageEl.data('ar')){
							$item
								.height(($.Window.data('w') / $storageEl.data('ar')).toFixed(0))
								.width($.Window.data('w'));
						}else{
							$item
								.height($.Window.data('h'))
								.width(($.Window.data('h') * $storageEl.data('ar')).toFixed(0));
						}
					}else{
						debug('The backgroundSize option was not recognized for older browsers.');
					}
				},
				maxcover: function($item){
					Adjust.fill($item);
					Adjust.center($item);
				},
				maxcontain: function($item){
					Adjust.fill($item);
					Adjust.center($item);
				}
			}
			
			
			
			/* --------------------- */
			
			// @Utils = General utilities for the plugin
			
			var Utils = {
				browser_tests: function(){
					var $div = $('<div />')[0],
						vendor = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
						p = 'transition',
						obj = {
							cssTransitions: false,
							cssBackgroundSize: ( "backgroundSize" in $div.style && config.cssBackgroundSize ), // Can override cssBackgroundSize in options
							html5Video: false,
							msie: false
						};
					
					// Test for CSS Transitions
					if(config.cssTransitions){
						if(typeof $div.style[p] == 'string') { obj.cssTransitions = true }
					
						// Tests for vendor specific prop
						p = p.charAt(0).toUpperCase() + p.substr(1);
						for(var i=0; i<vendor.length; i++) {
							if(vendor[i] + p in $div.style) { obj.cssTransitions = true; }
						}
					}
					
					// Check if we can play html5 videos
					if( !!document.createElement('video').canPlayType ) {
						obj.html5Video = true;
					}
					
					// Check for MSIE since we lost $.browser in jQuery
					obj.msie = (Utils.msie() !== undefined);
					
					
					if(config.debug) {
						debug(' - Browser Test - ');debug(obj);
					}
					
					return obj;
				},
				construct_slide_object: function(){
					var obj = new Object(),
						arr = new Array(),
						temp = '';
					
					$self.children().each(function(i){
						var $img = $(this).is('img') ? $(this).clone() : $(this).find('img').first().clone();
						
						// reset obj
						obj = {};
						
						// set attributes to obj
						obj.url = $img.attr('src');
						obj.title = $img.attr('title') != undefined ? $img.attr('title') : '';
						obj.alt = $img.attr('alt') != undefined ? $img.attr('alt') : '';
						obj.theclass = $img.attr('class') != undefined ? $img.attr('class') : '';
						obj.styles = $img.attr('style') != undefined ? $img.attr('style') : '';
						obj.orig = $img.clone();
						obj.datahref = $img.attr('data-href') != undefined ? $img.attr('data-href') : '';
						obj.content = "";
						
						// Setup content for within container
						if($(this).find('img').length > 0){
							if($.BrowserTests.cssBackgroundSize){
								$(this).find('img').first().remove();
							}
							obj.content = $(this).html();
						}
						
						// Stop loading image so we can load them sequentiallyelse{
						$img[0].src = "";
						
						// Remove original object (only on nonIE. IE hangs if you remove an image during load)
						if($.BrowserTests.cssBackgroundSize){
							$(this).remove();
						}
						
						// attach obj to arr
						arr.push(obj);
					});
					
					
					if(config.debug) {
						debug(' - Slide Object - ');debug(arr);
					}
					return arr;
				},
				msie: function(){
				    var undef,
				        v = 3,
				        div = document.createElement('div'),
				        all = div.getElementsByTagName('i');

				    while (
				        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				        all[0]
				    );
					
				    return v > 4 ? v : undef;
				},
				sizes: function(){
					var sizes = {h:0,w:0};
					
					if(config.fillElement == "window"){
						sizes.h = $.Window.height();
						sizes.w = $.Window.width();
					}else{
						var $fillElement = $self.parents(config.fillElement).first();
						
						// Height
						if($fillElement.height() == 0 || $fillElement.data('windowHeight') == true){
							$fillElement.data('windowHeight',true);
							sizes.h = $.Window.height();
						}else{
							sizes.h = $fillElement.height();
						}
					
						// Width
						if($fillElement.width() == 0 || $fillElement.data('windowWidth') == true){
							$fillElement.data('windowWidth',true);
							sizes.w = $.Window.width();
						}else{
							sizes.w = $fillElement.width();
						}
					}
					
					return sizes;
				}
			}
			
			
			
			/* --------------------- */
			
			// @Instantiation
			
			// Helper Function
			// Run tests to see what our browser can handle
			$.BrowserTests = Utils.browser_tests();
			
			if(typeof settings == 'string'){
				// TODO: Resize object fallback for old browsers,  If we are trying to size an HTML5 video and our browser doesn't support it
				if($.BrowserTests.html5Video || !$self.is('video')) {
					var to, 
						$storageEl = $self.is('object') ? $self.parent().first() : $self; // Can't assign .data() to '<object>'
					
					if( !$.Body.hasClass('mc-old-browser') )
						$.Body.addClass('mc-old-browser');
					
					// Cache our window's new dimensions
					$.Window
						.data('h', Utils.sizes().h)
						.data('w', Utils.sizes().w);
				
					// Please include height and width attributes on your html elements
					$storageEl
						.data('h', $self.height())
						.data('w', $self.width())
						.data('ar', $self.width() / $self.height());
				
					// We want to resize these elements with the window
					$.Window
						.bind($.Events.RESIZE,
						function(){
							// Cache our window's new dimensions
							$.Window
								.data('h', Utils.sizes().h)
								.data('w', Utils.sizes().w);
						
							// Limit resize runs
							to = $self.data('resizer');
							clearTimeout(to);
							to = setTimeout( Adjust[settings]($self), 200 );
							$self.data('resizer', to);
						});
				
					// Initial run
					Adjust[settings]($self);
				}
			}else{
				// Construct array of image objects for us to use
				$.Slides = Utils.construct_slide_object();
				
				// If we are allowing background-size:cover run Modern
				if($.BrowserTests.cssBackgroundSize){
					if(config.debug) debug(' - Using Modern - ');
					Modern.setup();
				}else{
					if(config.debug) debug(' - Using Old - ');
					Old.setup();
				}
			}
		});
		
		// private function for debugging
		function debug($obj) {
			if (window.console && window.console.log) {
				window.console.log($obj);
			}
		}
	}
	
	// Default options
	$.fn.maximage.defaults = {
		debug: false,
		cssBackgroundSize: true,  // Force run the functionality used for newer browsers
		cssTransitions: true,  // Force run the functionality used for old browsers
		verticalCenter: true, // Only necessary for old browsers
		horizontalCenter: true, // Only necessary for old browsers
		scaleInterval: 20, // Only necessary for old browsers
		backgroundSize: 'cover', // Only necessary for old browsers (this can be function)
		fillElement: 'window', // Either 'window' or a CSS selector for a parent element
		overrideMSIEStop: false, // This gives the option to not 'stop' load for MSIE (stops coded background images from loading so we can preload)... 
								 // If setting this option to true, please beware of IE7/8 "Stack Overflow" error but if there are more than 13 slides
								 // The description of the bug: http://blog.aaronvanderzwan.com/forums/topic/stack-overflow-in-ie-7-8/#post-33038
		onFirstImageLoaded: function(){},
		onImagesLoaded: function(){}
	}
})(jQuery);
/*
File: jquery.colorbox.js
*/
/*
	jQuery ColorBox v1.3.31
	(c) 2013 Jack Moore - jacklmoore.com/colorbox
	updated: 2013-01-28
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function ($, document, window) {
	var
	// Default settings object.
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		transition: "fade",
		speed: 1300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		inline: false,
		html: false,
		iframe: false,
		fastIframe: true,
		photo: false,
		href: false,
		title: false,
		rel: false,
		opacity: 1,
		preloading: true,
		className: false,

		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",

		open: false,
		returnFocus: true,
		reposition: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,
		overlayClose: false,
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined
	},
	
	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',
	
	// Events
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',
	
	// Special Handling for IE
	isIE = !$.support.leadingWhitespace, // IE6 to IE8
	isIE6 = isIE && !window.XMLHttpRequest, // IE6
	event_ie6 = prefix + '_IE6',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,
	
	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	element,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div",
	className,
	init;

	// ****************
	// HELPER FUNCTIONS
	// ****************
	
	// Convience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);

		if (id) {
			element.id = prefix + id;
		}

		if (css) {
			element.style.cssText = css;
		}

		return $(element);
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var
		max = $related.length,
		newIndex = (index + increment) % max;
		
		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : $window.height()) / 100) : 1) * parseInt(size, 10));
	}
	
	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.
	function isImage(url) {
		return settings.photo || /\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(url);
	}

	// Assigns function results to their respective properties
	function makeSettings() {
		var i,
			data = $.data(element, colorbox);
		
		if (data == null) {
			settings = $.extend({}, defaults);
			if (console && console.log) {
				console.log('Error: cboxElement missing settings object');
			}
		} else {
			settings = $.extend({}, data);
		}
		
		for (i in settings) {
			if ($.isFunction(settings[i]) && i.slice(0, 2) !== 'on') { // checks to make sure the function isn't one of the callbacks, they will be handled at the appropriate time.
				settings[i] = settings[i].call(element);
			}
		}
		
		settings.rel = settings.rel || element.rel || $(element).data('rel') || 'nofollow';
		settings.href = settings.href || $(element).attr('href');
		settings.title = settings.title || element.title;
		
		if (typeof settings.href === "string") {
			settings.href = $.trim(settings.href);
		}
	}

	function trigger(event, callback) {
		$(document).trigger(event);
		$('*', $box).trigger(event);
		if (callback) {
			callback.call(element);
		}
	}

	// Slideshow functionality
	function slideshow() {
		var
		timeOut,
		className = prefix + "Slideshow_",
		click = "click." + prefix,
		start,
		stop;
		
		if (settings.slideshow && $related[1]) {
			start = function () {
				$slideshow
					.html(settings.slideshowStop)
					.unbind(click)
					.bind(event_complete, function () {
						if (settings.loop || $related[index + 1]) {
							timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
						}
					})
					.bind(event_load, function () {
						clearTimeout(timeOut);
					})
					.one(click + ' ' + event_cleanup, stop);
				$box.removeClass(className + "off").addClass(className + "on");
				timeOut = setTimeout(publicMethod.next, settings.slideshowSpeed);
			};
			
			stop = function () {
				clearTimeout(timeOut);
				$slideshow
					.html(settings.slideshowStart)
					.unbind([event_complete, event_load, event_cleanup, click].join(' '))
					.one(click, function () {
						publicMethod.next();
						start();
					});
				$box.removeClass(className + "on").addClass(className + "off");
			};
			
			if (settings.slideshowAuto) {
				start();
			} else {
				stop();
			}
		} else {
			$box.removeClass(className + "off " + className + "on");
		}
	}

	function launch(target) {
		if (!closing) {
			
			element = target;
			
			makeSettings();
			
			$related = $(element);
			
			index = 0;
			
			if (settings.rel !== 'nofollow') {
				$related = $('.' + boxElement).filter(function () {
					var data = $.data(this, colorbox),
						relRelated;

					if (data) {
						relRelated =  $(this).data('rel') || data.rel || this.rel;
					}
					
					return (relRelated === settings.rel);
				});
				index = $related.index(element);
				
				// Check direct calls to ColorBox.
				if (index === -1) {
					$related = $related.add(element);
					index = $related.length - 1;
				}
			}
			
			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.
				
				// Show colorbox so the sizes can be calculated in older versions of jQuery
				$box.css({visibility:'hidden', display:'block'});
				
				$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden').appendTo($content);

				// Cache values needed for size calculations
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();//Subtraction needed for IE6
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);

				if (settings.returnFocus) {
					$(element).blur();
					$(document).one(event_closed, function () {
						$(element).focus();
					});
				}
				
				$overlay.css({
					opacity: parseFloat(settings.opacity),
					cursor: settings.overlayClose ? "pointer" : "auto",
					visibility: 'visible'
				}).fadeIn().css({height:0}).animate({"height":"100%"}, "slow");
				
				// Opens inital empty ColorBox prior to content being loaded
				settings.w = setSize(settings.initialWidth, 'x');
				settings.h = setSize(settings.initialHeight, 'y');
				publicMethod.position();

				if (isIE6) {
					$window.bind('resize.' + event_ie6 + ' scroll.' + event_ie6, function () {
						$overlay.css({width: $window.width(), height: $window.height(), top: $window.scrollTop(), left: $window.scrollLeft()});
					}).trigger('resize.' + event_ie6);
				}
				
				trigger(event_open, settings.onOpen);
				
				$groupControls.add($title).hide().delay(2000).css({top:-80}).animate({"top":"0px"}, "slow");
				
				$close.html(settings.close).show().delay(2000).css({top:-73}).animate({"top":"0px"}, "slow");
				
				
			}
			
			publicMethod.load(true);
		}
	}

	// ColorBox's markup needs to be added to the DOM prior to being called
	// so that the browser will go ahead and load the CSS background images.
	function appendHTML() {
		if (!$box && document.body) {
			init = false;

			$window = $(window);
			$box = $tag(div).attr({id: colorbox, 'class': isIE ? prefix + (isIE6 ? 'IE6' : 'IE') : ''}).hide();
			$overlay = $tag(div, "Overlay", isIE6 ? 'position:absolute' : '').hide();
			$loadingOverlay = $tag(div, "LoadingOverlay").add($tag(div, "LoadingGraphic"));
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$next = $tag(div, "Next"),
				$prev = $tag(div, "Previous"),
				$slideshow = $tag(div, "Slideshow").bind(event_open, slideshow),
				$close = $tag(div, "Close")
			);
			
			$wrap.append( // The 3x3 Grid that makes up ColorBox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});
			
			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none');
			
			$groupControls = $next.add($prev).add($current).add($slideshow);

			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
		}
	}

	// Add ColorBox's event bindings
	function addBindings() {
		function clickHandler(e) {
			// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
			// See: http://jacklmoore.com/notes/click-events/
			if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
				e.preventDefault();
				launch(this);
			}
		}

		if ($box) {
			if (!init) {
				init = true;

				// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
				$next.click(function () {
					publicMethod.next();
				});
				$prev.click(function () {
					publicMethod.prev();
				});
				$close.click(function () {
					publicMethod.close();
				});
				$overlay.click(function () {
					if (settings.overlayClose) {
						publicMethod.close();
					}
				});
				
				// Key Bindings
				$(document).bind('keydown.' + prefix, function (e) {
					var key = e.keyCode;
					if (open && settings.escKey && key === 27) {
						e.preventDefault();
						publicMethod.close();
					}
					if (open && settings.arrowKey && $related[1]) {
						if (key === 37) {
							e.preventDefault();
							$prev.click();
						} else if (key === 39) {
							e.preventDefault();
							$next.click();
						}
					}
				});

				if ($.isFunction($.fn.on)) {
					$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
				} else { // For jQuery 1.3.x -> 1.6.x
					$('.'+boxElement).live('click.'+prefix, clickHandler);
				}
			}
			return true;
		}
		return false;
	}

	// Don't do anything if ColorBox already exists.
	if ($.colorbox) {
		return;
	}

	// Append the HTML when the DOM loads
	$(appendHTML);


	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.fn.colorbox.close();
	// Usage from within an iframe: parent.$.fn.colorbox.close();
	// ****************
	
	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var $this = this;
		
		options = options || {};
		
		appendHTML();

		if (addBindings()) {
			if ($.isFunction($this)) { // assume a call to $.colorbox
				$this = $('<a/>');
				options.open = true;
			} else if (!$this[0]) { // colorbox being applied to empty collection
				return $this;
			}
			
			if (callback) {
				options.onComplete = callback;
			}
			
			$this.each(function () {
				$.data(this, colorbox, $.extend({}, $.data(this, colorbox) || defaults, options));
			}).addClass(boxElement);
			
			if (($.isFunction(options.open) && options.open.call($this)) || options.open) {
				launch($this[0]);
			}
		}
		
		return $this;
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		css,
		top = 0,
		left = 0,
		offset = $box.offset(),
		scrollTop,
		scrollLeft;
		
		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height
		$box.css({top: -9e4, left: -9e4});

		scrollTop = $window.scrollTop();
		scrollLeft = $window.scrollLeft();

		if (settings.fixed && !isIE6) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.right !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.right, 'x'), 0);
		} else if (settings.left !== false) {
			left += setSize(settings.left, 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}
		
		if (settings.bottom !== false) {
			top += Math.max($window.height() - settings.h - loadedHeight - interfaceHeight - setSize(settings.bottom, 'y'), 0);
		} else if (settings.top !== false) {
			top += setSize(settings.top, 'y');
		} else {
			top += Math.round(Math.max($window.height() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}

		$box.css({top: offset.top, left: offset.left, visibility:'visible'});

		// setting the speed to 0 to reduce the delay between same-sized content.
		speed = ($box.width() === settings.w + loadedWidth && $box.height() === settings.h + loadedHeight) ? 0 : speed || 0;
		
		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";
		
		function modalDimensions(that) {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt(that.style.width,10) - interfaceWidth)+'px';
			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt(that.style.height,10) - interfaceHeight)+'px';
		}

		css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};

		if(speed===0){ // temporary workaround to side-step jQuery-UI 1.8 bug (http://bugs.jquery.com/ticket/12273)
			$box.css(css);
		}
		$box.dequeue().animate(css, {
			duration: speed,
			complete: function () {
				modalDimensions(this);
				
				active = false;
				
				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";
				
				if (settings.reposition) {
					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
						$window.bind('resize.' + prefix, publicMethod.position);
					}, 1);
				}

				if (loadedCallback) {
					loadedCallback();
				}
			},
			step: function () {
				modalDimensions(this);
			}
		});
	};

	publicMethod.resize = function (options) {
		if (open) {
			options = options || {};
			
			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}
			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}
			$loaded.css({width: settings.w});
			
			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}
			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}
			if (!options.innerHeight && !options.height) {
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}
			$loaded.css({height: settings.h});
			
			publicMethod.position(settings.transition === "none" ? 0 : settings.speed);
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}
		
		var callback, speed = settings.transition === "none" ? 0 : settings.speed;
		
		$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.

		$loaded = $tag(div, 'LoadedContent').append(object);
		
		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}
		
		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.scrolling ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);
		
		$loadingBay.hide();
		
		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.
		//$(photo).css({'float': 'none', marginLeft: 'auto', marginRight: 'auto'});
		
		$(photo).css({'float': 'none'});

		
		callback = function () {
			var total = $related.length,
				iframe,
				frameBorder = 'frameBorder',
				allowTransparency = 'allowTransparency',
				complete;
			
			if (!open) {
				return;
			}
			
			function removeFilter() {
				if (isIE) {
					$box[0].style.removeAttribute('filter');
				}
			}
			
			complete = function () {
				clearTimeout(loadingTimer);
				$loadingOverlay.remove();
				trigger(event_complete, settings.onComplete);
			};
			
			if (isIE) {
				//This fadeIn helps the bicubic resampling to kick-in.
				if (photo) {
					$loaded.fadeIn(100);
				}
			}
			
			$title.html(settings.title).add($loaded).show();
			
			if (total > 1) { // handle grouping
				if (typeof settings.current === "string") {
					$current.html(settings.current.replace('{current}', index + 1).replace('{total}', total)).show();
				}
				
				$next[(settings.loop || index < total - 1) ? "show" : "hide"]().html(settings.next);
				$prev[(settings.loop || index) ? "show" : "hide"]().html(settings.previous);
				
				if (settings.slideshow) {
					$slideshow.show();
				}
				
				// Preloads images within a rel group
				if (settings.preloading) {
					$.each([getIndex(-1), getIndex(1)], function(){
						var src,
							img,
							i = $related[this],
							data = $.data(i, colorbox);

						if (data && data.href) {
							src = data.href;
							if ($.isFunction(src)) {
								src = src.call(i);
							}
						} else {
							src = i.href;
						}

						if (isImage(src)) {
							img = new Image();
							img.src = src;
						}
					});
				}
			} else {
				$groupControls.hide();
			}
			
			if (settings.iframe) {
				iframe = $tag('iframe')[0];
				
				if (frameBorder in iframe) {
					iframe[frameBorder] = 0;
				}
				
				if (allowTransparency in iframe) {
					iframe[allowTransparency] = "true";
				}

				if (!settings.scrolling) {
					iframe.scrolling = "no";
				}
				
				$(iframe)
					.attr({
						src: settings.href,
						name: (new Date()).getTime(), // give the iframe a unique name to prevent caching
						'class': prefix + 'Iframe',
						allowFullScreen : true, // allow HTML5 video to go fullscreen
						webkitAllowFullScreen : true,
						mozallowfullscreen : true
					})
					.one('load', complete)
					.appendTo($loaded);
				
				$(document).one(event_purge, function () {
					iframe.src = "//about:blank";
				});

				if (settings.fastIframe) {
					$(iframe).trigger('load');
				}
			} else {
				complete();
			}
			
			if (settings.transition === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};
		
		if (settings.transition === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	publicMethod.load = function (launched) {
		var href, setResize, prep = publicMethod.prep, $inline;
		
		active = true;
		
		photo = false;
		
		element = $related[index];
		
		if (!launched) {
			makeSettings();
		}

		if (className) {
			$box.add($overlay).removeClass(className);
		}
		if (settings.className) {
			$box.add($overlay).addClass(settings.className);
		}
		className = settings.className;
		
		trigger(event_purge);
		
		trigger(event_load, settings.onLoad);
		
		settings.h = settings.height ?
				setSize(settings.height, 'y') - loadedHeight - interfaceHeight :
				settings.innerHeight && setSize(settings.innerHeight, 'y');
		
		settings.w = settings.width ?
				setSize(settings.width, 'x') - loadedWidth - interfaceWidth :
				settings.innerWidth && setSize(settings.innerWidth, 'x');
		
		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;
		
		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.maxWidth) {
			settings.mw = setSize(settings.maxWidth, 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.maxHeight) {
			settings.mh = setSize(settings.maxHeight, 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}
		
		href = settings.href;
		
		loadingTimer = setTimeout(function () {
			$loadingOverlay.appendTo($content);
		}, 100);
		
		if (settings.inline) {
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when ColorBox closes or loads new content.
			$inline = $tag(div).hide().insertBefore($(href)[0]);

			$(document).one(event_purge, function () {
				$inline.replaceWith($loaded.children());
			});

			prep($(href));
		} else if (settings.iframe) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.html) {
			prep(settings.html);
		} else if (isImage(href)) {
			$(photo = new Image())
			.addClass(prefix + 'Photo')
			.bind('error',function () {
				settings.title = false;
				prep($tag(div, 'Error').html(settings.imgError));
			})
			.one('load', function () {
				var percent;

				if (settings.scalePhotos) {
					setResize = function () {
						photo.height -= photo.height * percent;
						photo.width -= photo.width * percent;
					};
					if (settings.mw && photo.width > settings.mw) {
						percent = (photo.width - settings.mw) / photo.width;
						setResize();
					}
					if (settings.mh && photo.height > settings.mh) {
						percent = (photo.height - settings.mh) / photo.height;
						setResize();
					}
				}
				
				if (settings.h) {
					photo.style.marginTop = Math.max(settings.h - photo.height, 0) / 2 + 'px';
				}
				
				if ($related[1] && (settings.loop || $related[index + 1])) {
					photo.style.cursor = 'pointer';
					photo.onclick = function () {
						publicMethod.next();
					};
				}
				
				if (isIE) {
					photo.style.msInterpolationMode = 'bicubic';
				}
				
				setTimeout(function () { // A pause because Chrome will sometimes report a 0 by 0 size otherwise.
					prep(photo);
				}, 1);
			});
			
			setTimeout(function () { // A pause because Opera 10.6+ will sometimes not run the onload function otherwise.
				photo.src = href;
			}, 1);
		} else if (href) {
			$loadingBay.load(href, settings.data, function (data, status) {
				prep(status === 'error' ? $tag(div, 'Error').html(settings.xhrError) : $(this).contents());
			});
		}
	};
		
	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (settings.loop || $related[index + 1])) {
			index = getIndex(1);
			publicMethod.load();
		}
	};
	
	publicMethod.prev = function () {
		if (!active && $related[1] && (settings.loop || index)) {
			index = getIndex(-1);
			publicMethod.load();
		}
	};

	// Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {
			
			closing = true;
			
			open = false;
			
			trigger(event_cleanup, settings.onCleanup);
			
			$window.unbind('.' + prefix + ' .' + event_ie6);
			
			$overlay.fadeTo(200, 0);
			
			$box.stop().fadeTo(300, 0, function () {
			
				$box.add($overlay).css({'opacity': 1, cursor: 'auto'}).hide();
				
				trigger(event_purge);
				
				$loaded.empty().remove(); // Using empty first may prevent some IE7 issues.
				
				setTimeout(function () {
					closing = false;
					trigger(event_closed, settings.onClosed);
				}, 1);
			});
		}
	};

	// Removes changes ColorBox made to the document, but does not remove the plugin
	// from jQuery.
	publicMethod.remove = function () {
		$([]).add($box).add($overlay).remove();
		$box = null;
		$('.' + boxElement)
			.removeData(colorbox)
			.removeClass(boxElement);

		$(document).unbind('click.'+prefix);
	};

	// A method for fetching the current element ColorBox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(element);
	};

	publicMethod.settings = defaults;

}(jQuery, document, window));

/*
File: isotope.js
*/
/**
 * Isotope v1.4.110721
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2011 David DeSandro / Metafizzy
 */
/*jshint curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, undef: true */
/*global Modernizr: true */
(function(a,b,c){function f(a){var b=document.documentElement.style,c;if(typeof b[a]=="string")return a;a=d(a);for(var f=0,g=e.length;f<g;f++){c=e[f]+a;if(typeof b[c]=="string")return c}}function d(a){return a.charAt(0).toUpperCase()+a.slice(1)}var e="Moz Webkit Khtml O Ms".split(" "),g=f("transform"),h={csstransforms:function(){return!!g},csstransforms3d:function(){var a=!!f("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),g=b('<div id="modernizr" />').appendTo("html");a=g.height()===3,g.remove(),e.remove()}return a},csstransitions:function(){return!!f("transitionProperty")}};if(a.Modernizr)for(var i in h)Modernizr.hasOwnProperty(i)||Modernizr.addTest(i,h[i]);else a.Modernizr=function(){var a={_version:"1.6ish: miniModernizr for Isotope"},c=" ",d,e;for(e in h)d=h[e](),a[e]=d,c+=" "+(d?"":"no-")+e;b("html").addClass(c);return a}();if(Modernizr.csstransforms){var j=Modernizr.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},k=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},h,i={},k;f[c]=d,b.extend(e,f);for(h in e)k=e[h],i[h]=j[h](k);var l=i.translate||"",m=i.scale||"",n=l+m;b.data(a,"isoTransform",e),a.style[g]=n};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){k(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){k(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var l=b.event,m;l.special.smartresize={setup:function(){b(this).bind("resize",l.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",l.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",m&&clearTimeout(m),m=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c){this.element=b(c),this._create(a),this._init()};var n=["overflow","position","width","height"];b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:Modernizr.csstransforms&&!b.browser.opera?{opacity:0,scale:.001}:{opacity:0},visibleStyle:Modernizr.csstransforms&&!b.browser.opera?{opacity:1,scale:1}:{opacity:1},animationEngine:b.browser.opera?"jquery":"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(c){this.options=b.extend({},b.Isotope.settings,c),this.styleQueue=[],this.elemCount=0;var d=this.element[0].style;this.originalStyle={};for(var e=0,f=n.length;e<f;e++){var g=n[e];this.originalStyle[g]=d[g]||null}this.element.css({overflow:"hidden",position:"relative"}),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems();var i=b(document.createElement("div")).prependTo(this.element);this.offset=i.position(),i.remove();var j=this;setTimeout(function(){j.element.addClass(j.options.containerClass)},0),this.options.resizable&&b(a).bind("smartresize.isotope",function(){j.resize()})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0);return c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var e in a)c="_update"+d(e),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,"");switch(a){case"css":case"none":this.isUsingJQueryAnimation=!1;break;case"jquery":this.isUsingJQueryAnimation=!0;break;default:this.isUsingJQueryAnimation=!Modernizr.csstransitions}this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){this.usingTransforms=this.options.transformsEnabled&&Modernizr.csstransforms&&Modernizr.csstransitions&&!this.isUsingJQueryAnimation,this.getPositionStyles=this.usingTransforms?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c);return a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g),c&&d.elemCount++})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order"));return(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b+=this.offset.left,c+=this.offset.top;var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(),b&&b.call(a),this.isLaidOut=!0},_processStyleQueue:function(){var a=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",c=this.options.animationOptions,d=this._isInserting&&this.isUsingJQueryAnimation,e;b.each(this.styleQueue,function(b,f){e=d&&f.$el.hasClass("no-transition")?"css":a,f.$el[e](f.style,c)}),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a,!0);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._processStyleQueue(),delete c._isInserting,b&&b(a)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a),a.remove()},shuffle:function(){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout()},destroy:function(){var c=this.usingTransforms;this.$allAtoms.removeClass(this.options.hiddenClass+" "+this.options.itemClass).each(function(){this.style.position=null,this.style.top=null,this.style.left=null,this.style.opacity=null,c&&(this.style[g]=null)});var d=this.element[0].style;for(var e=0,f=n.length;e<f;e++){var h=n[e];d[h]=this.originalStyle[h]}this.element.unbind(".isotope").removeClass(this.options.containerClass).removeData("isotope"),b(a).unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",e=a?"height":"width",f=a?"rows":"cols",g=this.element[e](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+d(e)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][f]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];this._getSegments(a);return this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=~~(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=~~(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){var b=this.find("img"),c=[],d=this,e=b.length;if(!b.length){a.call(this);return this}b.one("load error",function(){--e===0&&(e=b.length,b.one("load error",function(){--e===0&&a.call(d)}).each(function(){this.src=c.shift()}))}).each(function(){c.push(this.src),this.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="});return this};var o=function(a){this.console&&console.error(a)};b.fn.isotope=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"isotope");if(!d)o("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");else{if(!b.isFunction(d[a])||a.charAt(0)==="_"){o("no such method '"+a+"' for isotope instance");return}d[a].apply(d,c)}})}else this.each(function(){var c=b.data(this,"isotope");c?(c.option(a),c._init()):b.data(this,"isotope",new b.Isotope(a,this))});return this}})(window,jQuery);
/*
File: jquery.flexslider.js
*/
/*
 * jQuery FlexSlider v2.1
 * http://www.woothemes.com/flexslider/
 *
 * Copyright 2012 WooThemes
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Contributing author: Tyler Smith (@mbmufffin)
 */

;(function ($) {

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el),
        vars = $.extend({}, $.flexslider.defaults, options),
        namespace = vars.namespace,
        touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
        eventType = (touch) ? "touchend" : "click",
        vertical = vars.direction === "vertical",
        reverse = vars.reverse,
        carousel = (vars.itemWidth > 0),
        fade = vars.animation === "fade",
        asNav = vars.asNavFor !== "",
        methods = {};
    
    // Store a reference to the slider object
    $.data(el, "flexslider", slider);
    
    // Privat slider methods
    methods = {
      init: function() {
        slider.animating = false;
        slider.currentSlide = vars.startAt;
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = vars.selector.substr(0,vars.selector.search(' '));
        slider.slides = $(vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(vars.sync).length > 0;
        // SLIDE:
        if (vars.animation === "slide") vars.animation = "swing";
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        // TOUCH/USECSS:
        slider.transitions = !vars.video && !fade && vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        // CONTROLSCONTAINER:
        if (vars.controlsContainer !== "") slider.controlsContainer = $(vars.controlsContainer).length > 0 && $(vars.controlsContainer);
        // MANUAL:
        if (vars.manualControls !== "") slider.manualControls = $(vars.manualControls).length > 0 && $(vars.manualControls);
        
        // RANDOMIZE:
        if (vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }
        
        slider.doMath();
        
        // ASNAV:
        if (asNav) methods.asNav.setup();
        
        // INIT
        slider.setup("init");
        
        // CONTROLNAV:
        if (vars.controlNav) methods.controlNav.setup();
        
        // DIRECTIONNAV:
        if (vars.directionNav) methods.directionNav.setup();
        
        // KEYBOARD:
        if (vars.keyboard && ($(slider.containerSelector).length === 1 || vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, vars.pauseOnAction);
          });
        }
        
        // PAUSEPLAY
        if (vars.pausePlay) methods.pausePlay.setup();
        
        // SLIDSESHOW
        if (vars.slideshow) {
          if (vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) slider.pause();
            }, function() {
              if (!slider.manualPause && !slider.manualPlay) slider.play();
            });
          }
          // initialize animation
          (vars.initDelay > 0) ? setTimeout(slider.play, vars.initDelay) : slider.play();
        }
        
        // TOUCH
        if (touch && vars.touch) methods.touch();
        
        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && vars.smoothHeight)) $(window).bind("resize focus", methods.resize);
        
        
        // API: start() Callback
        setTimeout(function(){
          vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          slider.slides.click(function(e){
            e.preventDefault();
            var $slide = $(this),
                target = $slide.index();
            if (!$(vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
              slider.direction = (slider.currentItem < target) ? "next" : "prev";
              slider.flexAnimate(target, vars.pauseOnAction, false, true, true);
            }
          });
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item;
          
          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');
          
          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              item = (vars.controlNav === "thumbnails") ? '<img src="' + slider.slides.eq(i).attr("data-thumb") + '"/>' : '<a>' + j + '</a>';
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }
          
          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();
          
          methods.controlNav.active();
        
          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();
            var $this = $(this),
                target = slider.controlNav.index($this);

            if (!$this.hasClass(namespace + 'active')) {
              slider.direction = (target > slider.currentSlide) ? "next" : "prev";
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.controlNavScaffold.delegate('a', "click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();
          
          slider.controlNav.live(eventType, function(event) {
            event.preventDefault();
            var $this = $(this),
                target = slider.controlNav.index($this);
                
            if (!$this.hasClass(namespace + 'active')) {
              (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
              slider.flexAnimate(target, vars.pauseOnAction);
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.controlNav.live("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        set: function() {
          var selector = (vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li><a class="' + namespace + 'prev" href="#">' + vars.prevText + '</a></li><li><a class="' + namespace + 'next" href="#">' + vars.nextText + '</a></li></ul>');
        
          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }
        
          methods.directionNav.update();
        
          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, vars.pauseOnAction);
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.directionNav.bind("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass);
          } else if (!vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass);
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass);
            } else {
              slider.directionNav.removeClass(disabledClass);
            }
          } else {
            slider.directionNav.removeClass(disabledClass);
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');
        
          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();
            if ($(this).hasClass(namespace + 'pause')) {
              slider.manualPause = true;
              slider.manualPlay = false;
              slider.pause();
            } else {
              slider.manualPause = false;
              slider.manualPlay = true;
              slider.play();
            }
          });
          // Prevent iOS click event bug
          if (touch) {
            slider.pausePlay.bind("click touchstart", function(event) {
              event.preventDefault();
            });
          }
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').text(vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').text(vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          scrolling = false;
              
        el.addEventListener('touchstart', onTouchStart, false);
        function onTouchStart(e) {
          if (slider.animating) {
            e.preventDefault();
          } else if (e.touches.length === 1) {
            slider.pause();
            // CAROUSEL: 
            cwidth = (vertical) ? slider.h : slider. w;
            startT = Number(new Date());
            // CAROUSEL:
            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                     (carousel && reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                     (carousel && slider.currentSlide === slider.last) ? slider.limit :
                     (carousel) ? ((slider.itemW + vars.itemMargin) * slider.move) * slider.currentSlide : 
                     (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
            startX = (vertical) ? e.touches[0].pageY : e.touches[0].pageX;
            startY = (vertical) ? e.touches[0].pageX : e.touches[0].pageY;

            el.addEventListener('touchmove', onTouchMove, false);
            el.addEventListener('touchend', onTouchEnd, false);
          }
        }

        function onTouchMove(e) {
          dx = (vertical) ? startX - e.touches[0].pageY : startX - e.touches[0].pageX;
          scrolling = (vertical) ? (Math.abs(dx) < Math.abs(e.touches[0].pageX - startY)) : (Math.abs(dx) < Math.abs(e.touches[0].pageY - startY));
          
          if (!scrolling || Number(new Date()) - startT > 500) {
            e.preventDefault();
            if (!fade && slider.transitions) {
              if (!vars.animationLoop) {
                dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
              }
              slider.setProps(offset + dx, "setTouch");
            }
          }
        }
        
        function onTouchEnd(e) {
          // finish the touch by undoing the touch session
          el.removeEventListener('touchmove', onTouchMove, false);
          
          if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
            var updateDx = (reverse) ? -dx : dx,
                target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');
            
            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
              slider.flexAnimate(target, vars.pauseOnAction);
            } else {
              if (!fade) slider.flexAnimate(slider.currentSlide, vars.pauseOnAction, true);
            }
          }
          el.removeEventListener('touchend', onTouchEnd, false);
          startX = null;
          startY = null;
          dx = null;
          offset = null;
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) slider.doMath();
          
          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (vars.smoothHeight) methods.smoothHeight();
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
        }
      },
      sync: function(action) {
        var $obj = $(vars.sync).data("flexslider"),
            target = slider.animatingTo;
        
        switch (action) {
          case "animate": $obj.flexAnimate(target, vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      }
    }
    
    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";
      
      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;
          
          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }
        
        slider.animating = true;
        slider.animatingTo = target;
        // API: before() animation Callback
        vars.before(slider);
        
        // SLIDESHOW:
        if (pause) slider.pause();
        
        // SYNC:
        if (slider.syncExists && !fromNav) methods.sync("animate");
        
        // CONTROLNAV
        if (vars.controlNav) methods.controlNav.active();
        
        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');
        
        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;
        
        // DIRECTIONNAV:
        if (vars.directionNav) methods.directionNav.update();
        
        if (target === slider.last) {
          // API: end() of cycle Callback
          vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!vars.animationLoop) slider.pause();
        }
        
        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;
          
          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = (vars.itemWidth > slider.w) ? vars.itemMargin * 2 : vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", vars.animationSpeed);
          if (slider.transitions) {
            if (!vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              slider.wrapup(dimension);
            });
          } else {
            slider.container.animate(slider.args, vars.animationSpeed, vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).fadeOut(vars.animationSpeed, vars.easing);
            slider.slides.eq(target).fadeIn(vars.animationSpeed, vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            
            slider.slides.unbind("webkitTransitionEnd transitionend");
            slider.slides.eq(slider.currentSlide).bind("webkitTransitionEnd transitionend", function() {
              // API: after() animation Callback
              vars.after(slider);
            });
            
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
          }
        }
        // SMOOTH HEIGHT:
        if (vars.smoothHeight) methods.smoothHeight(vars.animationSpeed);
      }
    } 
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      vars.after(slider);
    }
    
    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating) slider.flexAnimate(slider.getTarget("next"));
    }
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.playing = false;
      // PAUSEPLAY:
      if (vars.pausePlay) methods.pausePlay.update("play");
      // SYNC:
      if (slider.syncExists) methods.sync("pause");
    }
    // SLIDESHOW:
    slider.play = function() {
      slider.animatedSlides = setInterval(slider.animateSlides, vars.slideshowSpeed);
      slider.playing = true;
      // PAUSEPLAY:
      if (vars.pausePlay) methods.pausePlay.update("pause");
      // SYNC:
      if (slider.syncExists) methods.sync("play");
    }
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    }
    slider.getTarget = function(dir) {
      slider.direction = dir; 
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    }
    
    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());
            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
      }
      
      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) slider.container.css(slider.args);
    }
    
    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;
            
        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") slider.container.find('.clone').remove();
          slider.container.append(slider.slides.first().clone().addClass('clone')).prepend(slider.slides.last().clone().addClass('clone'));
        }
        slider.newSlides = $(vars.selector, slider);
        
        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (vars.smoothHeight) methods.smoothHeight();
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE: 
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            slider.slides.eq(slider.currentSlide).fadeIn(vars.animationSpeed, vars.easing);
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (vars.smoothHeight) methods.smoothHeight();
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");
    }
    
    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = vars.itemMargin,
          minItems = vars.minItems,
          maxItems = vars.maxItems;
      
      slider.w = slider.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = vars.itemWidth + slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? maxItems * slider.itemT : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * minItems))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * maxItems))/maxItems :
                       (vars.itemWidth > slider.w) ? slider.w : vars.itemWidth;
        slider.visible = Math.floor(slider.w/(slider.itemW + slideMargin));
        slider.move = (vars.move > 0 && vars.move < slider.visible ) ? vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (vars.itemWidth > slider.w) ? ((slider.itemW + (slideMargin * 2)) * slider.count) - slider.w - slideMargin : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
    }
    
    slider.update = function(pos, action) {
      slider.doMath();
      
      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }
      
      // update controlNav
      if (vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (vars.directionNav) methods.directionNav.update();
      
    }
    
    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);
      
      slider.count += 1;
      slider.last = slider.count - 1;
      
      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }
      
      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");
      
      // update slider.slides
      slider.slides = $(vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();
      
      //FlexSlider: added() Callback
      vars.added(slider);
    }
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;
      
      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;
      
      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }
      
      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");
      
      // update slider.slides
      slider.slides = $(vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();
      
      // FlexSlider: removed() Callback
      vars.removed(slider);
    }
    
    //FlexSlider: Initialize
    methods.init();
  }
  
  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    
    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
    
    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item
    
    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item
    
    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
    
    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
                                    
    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
  }


  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) options = {};
    
    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

        if ($slides.length === 1) {
          $slides.fadeIn(400);
          if (options.start) options.start($this);
        } else if ($this.data('flexslider') == undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") $slider.flexAnimate(options, true);
      }
    }
  }  

})(jQuery);
/*
File: jquery.jigowatt.js
*/
jQuery(document).ready(function($){

	$('#contactform').submit(function(){

		var action = $(this).attr('action');
		var formValid = true;
		
		var n = $(this).find('input#name');
		var e = $(this).find('input#email');
		var p = $(this).find('input#phone');
		var c = $(this).find('textarea#message');
		if(n.prop("defaultValue") == n.val()){
			formValid = false;
			n.addClass('invalid');
		}else {
			n.removeClass('invalid');
		}
		if(e.prop("defaultValue") == e.val()){
			formValid = false;
			e.addClass('invalid');
		}else {
			e.removeClass('invalid');
		}
		if(p.prop("defaultValue") == p.val()){
			formValid = false;
			p.addClass('invalid');
		}else {
			p.removeClass('invalid');
		}

		if(c.prop("defaultValue") == c.val()){
			formValid = false;
			c.addClass('invalid');
		}else {
			c.removeClass('invalid');
		}
		
		if(formValid == false){
			return false;
		}
		
		$("#message").slideUp(750,function() {
			$('#message').hide();
			$('#submit').attr('disabled','disabled');
			$.post(action, $('#contactform').serialize(), function(data){
				data = eval('('+ data +')');
				document.getElementById('message').innerHTML = data.message;
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit').removeAttr('disabled');
				if(data.status == 1){
					$('#contactform').slideUp('slow');
				}
			});
		});

		return false;

	});

});
/*
File: jquery.metadata.js
*/
/*******************************************************************************
 jquery.mb.components
 Copyright (c) 2001-2010. Matteo Bicocchi (Pupunzi); Open lab srl, Firenze - Italy
 email: mbicocchi@open-lab.com
 site: http://pupunzi.com

 Licences: MIT, GPL
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 ******************************************************************************/

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
	metadata : {
		defaults : {
			type: 'class',
			name: 'metadata',
			cre: /({.*})/,
			single: 'metadata'
		},
		setType: function( type, name ){
			this.defaults.type = type;
			this.defaults.name = name;
		},
		get: function( elem, opts ){
			var settings = $.extend({},this.defaults,opts);
			// check for empty string in single property
			if ( !settings.single.length ) settings.single = 'metadata';
			
			var data = $.data(elem, settings.single);
			// returned cached data if it already exists
			if ( data ) return data;
			
			data = "{}";
			
			if ( settings.type == "class" ) {
				var m = settings.cre.exec( elem.className );
				if ( m )
					data = m[1];
			} else if ( settings.type == "elem" ) {
				if( !elem.getElementsByTagName )
					return undefined;
				var e = elem.getElementsByTagName(settings.name);
				if ( e.length )
					data = $.trim(e[0].innerHTML);
			} else if ( elem.getAttribute != undefined ) {
				var attr = elem.getAttribute( settings.name );
				if ( attr )
					data = attr;
			}
			
			if ( data.indexOf( '{' ) <0 )
			data = "{" + data + "}";
			
			data = eval("(" + data + ")");
			
			$.data( elem, settings.single, data );
			return data;
		}
	}
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
	return $.metadata.get( this[0], opts );
};

})(jQuery);
/*
File: jquery.mb.YTPlayer.js
*/
/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.YTPlayer.js
 *
 *  Copyright (c) 2001-2013. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 01/04/13 11.00
 *  *****************************************************************************
 */


/*Browser detection patch*/
(function(){if(!(8>jQuery.fn.jquery.split(".")[1])){jQuery.browser={};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.msie=!1;var a=navigator.userAgent;jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var c,b;if(-1!=(b=a.indexOf("Opera"))){if(jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=a.substring(b+6),-1!=(b= a.indexOf("Version")))jQuery.browser.fullVersion=a.substring(b+8)}else if(-1!=(b=a.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=a.substring(b+5);else if(-1!=(b=a.indexOf("Chrome")))jQuery.browser.webkit=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=a.substring(b+7);else if(-1!=(b=a.indexOf("Safari"))){if(jQuery.browser.webkit=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=a.substring(b+7),-1!=(b=a.indexOf("Version")))jQuery.browser.fullVersion= a.substring(b+8)}else if(-1!=(b=a.indexOf("Firefox")))jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=a.substring(b+8);else if((c=a.lastIndexOf(" ")+1)<(b=a.lastIndexOf("/")))jQuery.browser.name=a.substring(c,b),jQuery.browser.fullVersion=a.substring(b+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName);if(-1!=(a=jQuery.browser.fullVersion.indexOf(";")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0, a);if(-1!=(a=jQuery.browser.fullVersion.indexOf(" ")))jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,a);jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));jQuery.browser.version=jQuery.browser.majorVersion}})(jQuery);

/*******************************************************************************
 * jQuery.mb.components: jquery.mb.CSSAnimate
 ******************************************************************************/

jQuery.fn.CSSAnimate=function(a,b,k,l,f){return this.each(function(){var c=jQuery(this);if(0!==c.length&&a){"function"==typeof b&&(f=b,b=jQuery.fx.speeds._default);"function"==typeof k&&(f=k,k=0);"function"==typeof l&&(f=l,l="cubic-bezier(0.65,0.03,0.36,0.72)");if("string"==typeof b)for(var j in jQuery.fx.speeds)if(b==j){b=jQuery.fx.speeds[j];break}else b=null;if(jQuery.support.transition){var e="",h="transitionEnd";jQuery.browser.webkit?(e="-webkit-",h="webkitTransitionEnd"):jQuery.browser.mozilla? (e="-moz-",h="transitionend"):jQuery.browser.opera?(e="-o-",h="otransitionend"):jQuery.browser.msie&&(e="-ms-",h="msTransitionEnd");j=[];for(d in a){var g=d;"transform"===g&&(g=e+"transform",a[g]=a[d],delete a[d]);"transform-origin"===g&&(g=e+"transform-origin",a[g]=a[d],delete a[d]);j.push(g);c.css(g)||c.css(g,0)}d=j.join(",");c.css(e+"transition-property",d);c.css(e+"transition-duration",b+"ms");c.css(e+"transition-delay",k+"ms");c.css(e+"transition-timing-function",l);c.css(e+"backface-visibility", "hidden");setTimeout(function(){c.css(a)},0);setTimeout(function(){c.called||!f?c.called=!1:f()},b+20);c.on(h,function(a){c.off(h);c.css(e+"transition","");a.stopPropagation();"function"==typeof f&&(c.called=!0,f());return!1})}else{for(var d in a)"transform"===d&&delete a[d],"transform-origin"===d&&delete a[d],"auto"===a[d]&&delete a[d];if(!f||"string"===typeof f)f="linear";c.animate(a,b,f)}}})}; jQuery.fn.CSSAnimateStop=function(){var a="",b="transitionEnd";jQuery.browser.webkit?(a="-webkit-",b="webkitTransitionEnd"):jQuery.browser.mozilla?(a="-moz-",b="transitionend"):jQuery.browser.opera?(a="-o-",b="otransitionend"):jQuery.browser.msie&&(a="-ms-",b="msTransitionEnd");jQuery(this).css(a+"transition","");jQuery(this).off(b)}; jQuery.support.transition=function(){var a=(document.body||document.documentElement).style;return void 0!==a.transition||void 0!==a.WebkitTransition||void 0!==a.MozTransition||void 0!==a.MsTransition||void 0!==a.OTransition}();

/*
 * Metadata - jQuery plugin for parsing metadata from elements
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jörn Zaefferer, Paul McLanahan
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function(c){c.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(b,c){this.defaults.type=b;this.defaults.name=c},get:function(b,f){var d=c.extend({},this.defaults,f);d.single.length||(d.single="metadata");var a=c.data(b,d.single);if(a)return a;a="{}";if("class"==d.type){var e=d.cre.exec(b.className);e&&(a=e[1])}else if("elem"==d.type){if(!b.getElementsByTagName)return;e=b.getElementsByTagName(d.name);e.length&&(a=c.trim(e[0].innerHTML))}else void 0!= b.getAttribute&&(e=b.getAttribute(d.name))&&(a=e);0>a.indexOf("{")&&(a="{"+a+"}");a=eval("("+a+")");c.data(b,d.single,a);return a}}});c.fn.metadata=function(b){return c.metadata.get(this[0],b)}})(jQuery);

/***************************************************************************************/


String.prototype.getVideoID = function () {
	var movieURL;
	if (this.substr(0, 16) == "http://youtu.be/") {
		movieURL = this.replace("http://youtu.be/", "");
	} else if (this.indexOf("http") > -1) {
		movieURL = this.match(/[\\?&]v=([^&#]*)/)[1];
	} else {
		movieURL = this
	}
	return movieURL;
};

var isDevice = 'ontouchstart' in window;

function onYouTubePlayerAPIReady() {
	if (jQuery.mbYTPlayer.YTAPIReady)
		return;
	jQuery(document).trigger("YTAPIReady");
	jQuery.mbYTPlayer.YTAPIReady = true;
}

(function (jQuery) {
if(typeof template_url != 'undefined'){
	var iconsPath  = template_url + '/images/icons';
}
	jQuery.mbYTPlayer = {
		name           : "jquery.mb.YTPlayer",
		version        : "2.2",
		author         : "Matteo Bicocchi",
		defaults       : {
			containment            : "body",
			ratio                  : "16/9",
			showYTLogo             : false,
			videoURL               : null,
			startAt                : 0,
			autoPlay               : true,
			addRaster              : false,
			opacity                : 1,
			quality                : "default",
			mute                   : false,
			loop                   : true,
			showControls           : true,
			printUrl               : true,
			onReady                : function (event) {},
			onStateChange          : function (event) {},
			onPlaybackQualityChange: function (event) {},
			onError                : function (event) {},
			iconsPath			   : '/wp-content/themes/eleven/'
		},
		//todo: use @font-face instead
		controls       : {
			play  : "<img src='"+iconsPath+"/play.png'>",
			pause : "<img src='"+iconsPath+"/pause.png'>",
			mute  : "<img src='"+iconsPath+"/mute.png'>",
			unmute: "<img src='"+iconsPath+"/unmute.png'>",
			ytLogo: "<img src='"+iconsPath+"/YTLogo.png'>"
		},
		rasterImg      : "",
		rasterImgRetina: "",

		buildPlayer: function (options) {

			if (isDevice)
				return;

			document.YTP = {};

			return this.each(function () {
				var YTPlayer = this;
				var $YTPlayer = jQuery(YTPlayer);

				YTPlayer.loop = 0;
				YTPlayer.opt = {};
				var property = {};
				if (jQuery.metadata) {
					jQuery.metadata.setType("class");
					property = $YTPlayer.metadata();
				}
				if (jQuery.isEmptyObject(property))
					property = $YTPlayer.data("property") ? eval('(' + $YTPlayer.data("property") + ')') : {};

				jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property);

				if (!$YTPlayer.attr("id"))
					$YTPlayer.attr("id", "id_" + new Date().getTime());

				YTPlayer.opt.id = YTPlayer.id;
				YTPlayer.isAlone = false;

				/*to maintain back compatibility
				 * ***********************************************************/
				if (YTPlayer.opt.isBgndMovie)
					YTPlayer.opt.containment = "body";

				if (YTPlayer.opt.isBgndMovie && YTPlayer.opt.isBgndMovie.mute != undefined)
					YTPlayer.opt.mute = YTPlayer.opt.isBgndMovie.mute;

				if (!YTPlayer.opt.videoURL)
					YTPlayer.opt.videoURL = $YTPlayer.attr("href");

				/************************************************************/

				var playerID = "mbYTP_" + YTPlayer.id;
				var videoID = this.opt.videoURL ? this.opt.videoURL.getVideoID() : $YTPlayer.attr("href") ? $YTPlayer.attr("href").getVideoID() : false;

				// 'start':this.opt.startAt,'modestbranding':1, 'allowfullscreen':true, 'wmode':"transparent"
				var playerVars = { 'autoplay': 0, 'modestbranding': 1, 'controls': 0, 'showinfo': 0, 'rel': 0, 'enablejsapi': 1, 'version': 3, 'playerapiid': playerID, 'origin': '*', 'allowfullscreen': true, 'wmode': "transparent"};

				var canPlayHTML5 = false;
				var v = document.createElement('video');
				if (v.canPlayType) {
					canPlayHTML5 = true;
				}

				if (canPlayHTML5 && !jQuery.browser.msie)
					jQuery.extend(playerVars, {'html5': 1});

				var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
				var overlay = jQuery("<div/>").css({position: YTPlayer.isBackground ? "absolute" : "absolute", top: 0, left: 0, width: "100%", height: "100%"}).addClass("YTPOverlay");

				YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? jQuery(this) : jQuery(YTPlayer.opt.containment);
				YTPlayer.isBackground = YTPlayer.opt.containment.get(0).tagName.toLowerCase() == "body";

				if (YTPlayer.opt.addRaster) {
					var retina = (window.retina || window.devicePixelRatio > 1);
					overlay.css({backgroundImage: "url(" + (retina ? jQuery.mbYTPlayer.rasterImgRetina : jQuery.mbYTPlayer.rasterImg) + ")"});
				}

				var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
				wrapper.css({position: "absolute", zIndex: 1, minWidth: "100%", minHeight: "100%", overflow: "hidden", opacity: 0});
				playerBox.css({position: "absolute", zIndex: 0, width: "100%", height: "100%", top: 0, left: 0, overflow: "hidden", opacity: this.opt.opacity});
				wrapper.append(playerBox);

				if (YTPlayer.isBackground && document.YTP.isInit)
					return;

				YTPlayer.opt.containment.children().each(function () {
					if (jQuery(this).css("position") == "static")
						jQuery(this).css("position", "relative");
				});

				if (YTPlayer.isBackground) {
					jQuery("body").css({position: "relative", minWidth: "100%", minHeight: "100%", zIndex: 1, boxSizing: "border-box"});
					wrapper.css({position: "absolute", top: 0, left: 0, zIndex: 0});
					$YTPlayer.hide();
					YTPlayer.opt.containment.prepend(wrapper);
				} else
					YTPlayer.opt.containment.prepend(wrapper);

				YTPlayer.wrapper = wrapper;

				playerBox.css({opacity: 1});
				playerBox.after(overlay);

				// add YT API to the header
				var tag = document.createElement('script');
				tag.src = "http://www.youtube.com/player_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

				jQuery(document).on("YTAPIReady", function () {

					if ((YTPlayer.isBackground && document.YTP.isInit) || YTPlayer.opt.isInit)
						return;

					if (YTPlayer.isBackground)
						document.YTP.isInit = true;
					YTPlayer.opt.isInit = true;

					YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;

					jQuery(document).on("getVideoInfo_" + YTPlayer.opt.id, function () {

						var player = new YT.Player(playerID, {
							videoId   : videoID,
							playerVars: playerVars,
							events    : {
								'onReady': function (event) {
									YTPlayer.player = event.target;
									YTPlayer.playerEl = YTPlayer.player.getIframe();
									$YTPlayer.optimizeDisplay();

									jQuery(window).resize(function () {
										$YTPlayer.optimizeDisplay();
									});

									if (YTPlayer.opt.showControls)
										jQuery(YTPlayer).buildYTPControls();

									YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);

									if (YTPlayer.opt.startAt >= 0)
										YTPlayer.player.seekTo(parseFloat(YTPlayer.opt.startAt), true);

									if (YTPlayer.opt.mute) {
										jQuery(YTPlayer).muteYTPVolume();
										//setTimeout(function(){jQuery(YTPlayer).muteYTPVolume();},3000)
									}

									if (!YTPlayer.opt.autoPlay) {
										YTPlayer.checkForStartAt = setInterval(function () {
											if (YTPlayer.player.getCurrentTime() >= YTPlayer.opt.startAt) {
												clearInterval(YTPlayer.checkForStartAt);
												$YTPlayer.pauseYTP();
												/*
												 setTimeout(function(){
												 jQuery(YTPlayer.playerEl).CSSAnimate({opacity:1},2000);
												 YTPlayer.wrapper.CSSAnimate({opacity:YTPlayer.opt.opacity},2000);
												 },1000);
												 */
											}
										}, 1);
									} else {
										$YTPlayer.playYTP();
									}
									//jQuery(YTPlayer.playerEl).CSSAnimate({opacity:1},2000);

									if (typeof YTPlayer.opt.onReady == "function")
										YTPlayer.opt.onReady($YTPlayer);
								},

								'onStateChange'          : function (event) {

									/*
									 -1 (unstarted)
									 0 (ended)
									 1 (playing)
									 2 (paused)
									 3 (buffering)
									 5 (video cued).
									 */

									if (typeof event.target.getPlayerState != "function")
										return;
									var state = event.target.getPlayerState();

									var playerBox = jQuery(YTPlayer.playerEl);
									var controls = jQuery("#controlBar_" + YTPlayer.id);
									playerBox.css({opacity: 1});

									var data = YTPlayer.opt;

									if (state == 0) {
										if (YTPlayer.state == state)
											return;

										YTPlayer.state = state;
										YTPlayer.player.pauseVideo();
										var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;

										if (data.loop) {
											YTPlayer.wrapper.css({opacity: 0});
											YTPlayer.player.seekTo(startAt);
											$YTPlayer.playYTP();

										} else if (!YTPlayer.isBackground) {
											YTPlayer.player.seekTo(startAt, true);
											$YTPlayer.playYTP();
											setTimeout(function () {
												$YTPlayer.pauseYTP();
											}, 10);
										}

										if (!data.loop && YTPlayer.isBackground)
											YTPlayer.wrapper.CSSAnimate({opacity: 0}, 2000);
										else if (data.loop) {
											YTPlayer.wrapper.css({opacity: 0});
											YTPlayer.loop++;
										}

										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
										jQuery(YTPlayer).trigger("YTPEnd");
									}

									if (state == 3) {
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;
										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
										jQuery(YTPlayer).trigger("YTPBuffering");
									}

									if (state == -1) {
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;
										jQuery(YTPlayer).trigger("YTPUnstarted");
									}

									if (state == 1) {
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;

										if (YTPlayer.opt.autoPlay && YTPlayer.loop == 0) {
											YTPlayer.wrapper.CSSAnimate({opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity}, 2000);
										} else {
											YTPlayer.wrapper.css({opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity});
										}

										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.pause);
										$YTPlayer.css({background: "transparent"});

										jQuery(YTPlayer).trigger("YTPStart");
									}

									if (state == 2) {
										if (YTPlayer.state == state)
											return;
										YTPlayer.state = state;
										controls.find(".mb_YTVPPlaypause").html(jQuery.mbYTPlayer.controls.play);
										jQuery(YTPlayer).trigger("YTPPause");
									}
								},
								'onPlaybackQualityChange': function () {},
								'onError'                : function () {}
							}
						});
					});

					//Get video info from FEEDS API
					//todo: add video title and other info
					if (!jQuery.browser.msie) { //YTPlayer.opt.ratio == "auto" &&
						jQuery.getJSON('http://gdata.youtube.com/feeds/api/videos/' + videoID + '?v=2&alt=jsonc', function (data, status, xhr) {
							var videoData = data.data;

							if (YTPlayer.opt.ratio == "auto")
								if (videoData.aspectRatio && videoData.aspectRatio === "widescreen")
									YTPlayer.opt.ratio = "16/9";
								else
									YTPlayer.opt.ratio = "4/3";

							if (!YTPlayer.isBackground) {
								var bgndURL = videoData.thumbnail.hqDefault;
								$YTPlayer.css({background: "url(" + bgndURL + ") center center", backgroundSize: "cover"});
							}

							jQuery(document).trigger("getVideoInfo_" + YTPlayer.opt.id);

						});
					} else {
						YTPlayer.opt.ratio == "auto" ? YTPlayer.opt.ratio = "16/9" : YTPlayer.opt.ratio;
						jQuery(document).trigger("getVideoInfo_" + YTPlayer.opt.id);
					}
				})
			});
		},

		changeMovie: function (url, opt) {
			var YTPlayer = jQuery(this).get(0);
			var data = YTPlayer.opt;
			if (opt) {
				jQuery.extend(data, opt);
			}
			data.movieURL = url.getVideoID();

			jQuery(YTPlayer).getPlayer().loadVideoByUrl("http://www.youtube.com/v/" + data.movieURL, 0);
			jQuery(YTPlayer).optimizeDisplay();
		},

		getPlayer: function () {
			return jQuery(this).get(0).player;
		},

		playerDestroy: function () {
			var playerBox = this.get(0).opt.wrapper;
			playerBox.remove();
			jQuery("#controlBar_" + this.get(0).id).remove();
		},

		playYTP: function () {
			var YTPlayer = jQuery(this).get(0);
			var data = YTPlayer.opt;
			var controls = jQuery("#controlBar_" + YTPlayer.id);

			var playBtn = controls.find(".mb_YTVPPlaypause");
			playBtn.html(jQuery.mbYTPlayer.controls.pause);
			YTPlayer.player.playVideo();
		},

		stopYTP: function () {
			var YTPlayer = jQuery(this).get(0);
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var playBtn = controls.find(".mb_YTVPPlaypause");
			playBtn.html(jQuery.mbYTPlayer.controls.play);
			YTPlayer.player.stopVideo();
		},

		pauseYTP: function () {
			var YTPlayer = jQuery(this).get(0);
			var data = YTPlayer.opt;
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var playBtn = controls.find(".mb_YTVPPlaypause");
			playBtn.html(jQuery.mbYTPlayer.controls.play);
			YTPlayer.player.pauseVideo();
		},

		setYTPVolume: function (val) {
			var YTPlayer = jQuery(this).get(0);
			if (!val && !YTPlayer.opt.vol && player.getVolume() == 0)
				jQuery(YTPlayer).unmuteYTPVolume();
			else if ((!val && YTPlayer.player.getVolume() > 0) || (val && YTPlayer.player.getVolume() == val))
				jQuery(YTPlayer).muteYTPVolume();
			else
				YTPlayer.opt.vol = val;
			YTPlayer.player.setVolume(YTPlayer.opt.vol);
		},

		muteYTPVolume: function () {
			var YTPlayer = jQuery(this).get(0);
			YTPlayer.opt.vol = YTPlayer.player.getVolume() || 50;
			YTPlayer.player.mute();
			YTPlayer.player.setVolume(0);
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var muteBtn = controls.find(".mb_YTVPMuteUnmute");
			muteBtn.html(jQuery.mbYTPlayer.controls.unmute);
		},

		unmuteYTPVolume: function () {
			var YTPlayer = jQuery(this).get(0);

			YTPlayer.player.unMute();
			YTPlayer.player.setVolume(YTPlayer.opt.vol);

			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var muteBtn = controls.find(".mb_YTVPMuteUnmute");
			muteBtn.html(jQuery.mbYTPlayer.controls.mute);
		},

		manageYTPProgress: function () {
			var YTPlayer = jQuery(this).get(0);
			var data = YTPlayer.opt;
			var controls = jQuery("#controlBar_" + YTPlayer.id);
			var progressBar = controls.find(".mb_YTVPProgress");
			var loadedBar = controls.find(".mb_YTVPLoaded");
			var timeBar = controls.find(".mb_YTVTime");
			var totW = progressBar.outerWidth();

			var currentTime = Math.floor(YTPlayer.player.getCurrentTime());
			var totalTime = Math.floor(YTPlayer.player.getDuration());
			var timeW = (currentTime * totW) / totalTime;
			var startLeft = 0;

			var loadedW = YTPlayer.player.getVideoLoadedFraction() * 100;

			loadedBar.css({left: startLeft, width: loadedW + "%"});
			timeBar.css({left: 0, width: timeW});
			return {totalTime: totalTime, currentTime: currentTime};
		},

		buildYTPControls: function () {
			var YTPlayer = jQuery(this).get(0);
			var data = YTPlayer.opt;
			var controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTVPBar").css({whiteSpace: "noWrap", position: YTPlayer.isBackground ? "absolute" : "absolute", zIndex: YTPlayer.isBackground ? 10000 : 1000}).hide();
			var buttonBar = jQuery("<div/>").addClass("buttonBar");
			var playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTVPPlaypause").click(function () {
				if (YTPlayer.player.getPlayerState() == 1)
					jQuery(YTPlayer).pauseYTP();
				else
					jQuery(YTPlayer).playYTP();
			});

			var MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTVPMuteUnmute").click(function () {
				if (YTPlayer.player.isMuted()) {
					jQuery(YTPlayer).unmuteYTPVolume();
				} else {
					jQuery(YTPlayer).muteYTPVolume();
				}
			});

			var idx = jQuery("<span/>").addClass("mb_YTVPTime");

			var viewOnYT = jQuery(jQuery.mbYTPlayer.controls.ytLogo).on("click", function () {window.open(data.videoURL, "viewOnYT")});
			var viewOnlyYT = jQuery(jQuery.mbYTPlayer.controls.onlyYT).toggle(
					function () {
						jQuery(YTPlayer.wrapper).css({zIndex: 10000}).CSSAnimate({opacity: 1}, 1000, 0);
						YTPlayer.isAlone = true;
					}, function () {
						jQuery(YTPlayer.wrapper).CSSAnimate({opacity: YTPlayer.opt.opacity}, 500, function () {
							jQuery(YTPlayer.wrapper).css({zIndex: -1});
							YTPlayer.isAlone = false;
						});
					});

			var movieUrl = jQuery("<span/>").addClass("mb_YTVPUrl").append(viewOnYT);
			var onlyVideo = jQuery("<span/>").addClass("mb_OnlyYT").append(viewOnlyYT);

			var progressBar = jQuery("<div/>").addClass("mb_YTVPProgress").css("position", "absolute").click(function (e) {
				timeBar.css({width: (e.clientX - timeBar.offset().left)});
				YTPlayer.timeW = e.clientX - timeBar.offset().left;
				controlBar.find(".mb_YTVPLoaded").css({width: 0});
				var totalTime = Math.floor(YTPlayer.player.getDuration());
				YTPlayer.goto = (timeBar.outerWidth() * totalTime) / progressBar.outerWidth();

				YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), true);
				controlBar.find(".mb_YTVPLoaded").css({width: 0});
			});

			var loadedBar = jQuery("<div/>").addClass("mb_YTVPLoaded").css("position", "absolute");
			var timeBar = jQuery("<div/>").addClass("mb_YTVTime").css("position", "absolute");

			progressBar.append(loadedBar).append(timeBar);
			buttonBar.append(playpause).append(MuteUnmute).append(idx);

			if (data.printUrl && data.videoURL.indexOf("http") >= 0)
				buttonBar.append(movieUrl);

			if (YTPlayer.isBackground)
				buttonBar.append(onlyVideo);

			controlBar.append(buttonBar).append(progressBar);

			if (!YTPlayer.isBackground) {
				controlBar.addClass("inlinePlayer");
				YTPlayer.wrapper.before(controlBar);
			} else {
				jQuery("body").after(controlBar);
			}
			controlBar.fadeIn();

			clearInterval(YTPlayer.getState);
			var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
			YTPlayer.getState = setInterval(function () {
				var prog = jQuery(YTPlayer).manageYTPProgress();
				controlBar.find(".mb_YTVPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime));
				if (data.loop && parseFloat(YTPlayer.player.getDuration() - 1) < YTPlayer.player.getCurrentTime() && YTPlayer.player.getPlayerState() == 1) {
					YTPlayer.player.seekTo(startAt);
					YTPlayer.player.play();
					jQuery(YTPlayer).trigger("YTPEnd");
					//jQuery(YTPlayer).playYTP();
				}
			}, 1);
		},
		formatTime      : function (s) {
			var min = Math.floor(s / 60);
			var sec = Math.floor(s - (60 * min));
			return (min < 9 ? "0" + min : min) + " : " + (sec < 9 ? "0" + sec : sec);
		}
	};
	jQuery.fn.toggleVolume = function () {
		var YTPlayer = this.get(0);
		if (!YTPlayer)
			return;

		if (YTPlayer.player.isMuted()) {
			jQuery(YTPlayer).unmuteYTPVolume();
			return true;
		} else {
			jQuery(YTPlayer).muteYTPVolume();
			return false;
		}
	};

	jQuery.fn.optimizeDisplay = function () {
		var YTPlayer = this.get(0);
		var data = YTPlayer.opt;
		var playerBox = jQuery(YTPlayer.playerEl);
		var win = {};
		var el = !YTPlayer.isBackground ? data.containment : jQuery(window);

		win.width = el.width();
		win.height = el.height();

		var margin = 24;
		var vid = {};
		vid.width = win.width + ((win.width * margin) / 100);
		vid.height = data.ratio == "16/9" ? Math.ceil((9 * win.width) / 16) : Math.ceil((3 * win.width) / 4);
		vid.marginTop = -((vid.height - win.height) / 2);
		vid.marginLeft = -((win.width * (margin / 2)) / 100);

		if (vid.height < win.height) {
			vid.height = win.height + ((win.height * margin) / 100);
			vid.width = data.ratio == "16/9" ? Math.floor((16 * win.height) / 9) : Math.floor((4 * win.height) / 3);
			vid.marginTop = -((win.height * (margin / 2)) / 100);
			vid.marginLeft = -((vid.width - win.width) / 2);
		}
		playerBox.css({width: vid.width, height: vid.height, marginTop: vid.marginTop, marginLeft: vid.marginLeft});
	};

	jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer;
	jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie;
	jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer;
	jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy;
	jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildYTPControls;
	jQuery.fn.playYTP = jQuery.mbYTPlayer.playYTP;
	jQuery.fn.stopYTP = jQuery.mbYTPlayer.stopYTP;
	jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pauseYTP;
	jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.muteYTPVolume;
	jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmuteYTPVolume;
	jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setYTPVolume;
	jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageYTPProgress;

	jQuery.mbYTPlayer.YTAPIReady = false;

})(jQuery);

/*
File: main.js
*/
/*===========================================================*/
/*	Extend jQuery
/*===========================================================*/
(function($){
  $.fn.list_ticker = function(options){
    
    var defaults = {
      speed:4000,
	  effect:'slide'
    };
    
    var options = $.extend(defaults, options);
    
    return this.each(function(){
      
      var obj = $(this);
      var list = obj.children();
      list.not(':first').hide();
      
      setInterval(function(){
        
        list = obj.children();
        list.not(':first').hide();
        
        var first_li = list.eq(0)
        var second_li = list.eq(1)
		
		if(options.effect == 'slide'){
			first_li.slideUp();
			second_li.slideDown(function(){
				first_li.remove().appendTo(obj);
			});
		} else if(options.effect == 'fade'){
			first_li.fadeOut(function(){
				second_li.fadeIn();
				first_li.remove().appendTo(obj);
			});
		}
      }, options.speed)
    });
  };
})(jQuery);

/*===========================================================*/
/*	Stick Navigation & Separators
/*===========================================================*/

jQuery(function($){
	if(typeof jQuery('body').sticky == 'function'){
		if(!jQuery('#navigation').hasClass('no-sticky')){
			$("#navigation").sticky({topSpacing:0});
		}
	} else { console.log('Sticky plugin not loaded');}
	
		$("ul#menu").click(function(){
			if( $("ul#menu li").css('display') != 'inline' ){
				if($("ul#menu").hasClass('showmenu')) {
        			$("ul#menu").removeClass('showmenu');
					$("ul#menu li").css('display','none');
    			} else {
					$("ul#menu").addClass('showmenu');
        			$("ul#menu li").css('display','block');
    			}
			}
		});
		
		$(window).resize(function() {
			if( $(window).width() >= 943 ){
				if( $("ul#menu li").css('display' ) == 'none' )
					$("ul#menu li").css('display','inline');
			}
			else{
				$("ul#menu li").css('display','none');
			}
		});
		
	});
	
jQuery(function($){
	if(typeof jQuery('body').parallax == 'function'){
		$('.separator-bg, .parallax').each(function(){
			var speed = "0.1";
			if(typeof $(this).attr('data-speed') != 'undefined' && $(this).attr('data-speed') != ''){
			
				speed = $(this).attr('data-speed');
			}
			$(this).parallax("50%", speed);
		});
	} else { console.log('Parallax plugin not loaded');}
	
	if(typeof jQuery('body').localScroll == 'function'){
		$('#navigation ul').localScroll({duration:1000, target:'body', offset: -100});
	} else { console.log('LocalScroll plugin not loaded');}
	
	if(typeof $('.clapat-accordion').html() == 'string'){
		$('.clapat-accordion').accordion();
	}
	
	jQuery('.scroll-top').click(function(){
		jQuery('html, body').animate({ scrollTop: 0}, 1000);
	});
});
	

/*===========================================================*/
/*	Full screen slider
/*===========================================================*/	
	
jQuery(function($){

		if(typeof  jQuery('body').maximage == 'function'){
            $('#maximage').maximage({
                cycleOptions: {
                    fx: 'fade',
                    speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
                    timeout: 4000,
                    prev: '#arrow_left',
                    next: '#arrow_right',
                    pause: 1,
                },
                onFirstImageLoaded: function(){
                    jQuery('#cycle-loader').hide();
                    jQuery('#maximage').fadeIn('slow');
                }
            });
		} else { console.log('Max image plugin not loaded');}
    
            // Helper function to Fill and Center the HTML5 Video
			if(jQuery('video,object').length > 0){
				jQuery('video,object').maximage('maxcover');
			}
            // To show it is dynamic html text
			if(jQuery('.in-slide-content').length > 0){
				jQuery('.in-slide-content').delay(1200).fadeIn();
			}
			
			$("button").not(".command").click(function(){
				$("button").not(".command").removeClass("sel");
				$(this).addClass("sel");
			});
			if(typeof  jQuery('body').mb_YTPlayer == 'function'){
			/* Only for debug */
	        jQuery("#bgndVideo").on("YTPStart", function(){ jQuery("#eventListener").html("YTPStart")});
            jQuery("#bgndVideo").on("YTPEnd", function(){ jQuery("#eventListener").html("YTPEnd")});
            jQuery("#bgndVideo").on("YTPPause", function(){ jQuery("#eventListener").html("YTPPause")});
            jQuery("#bgndVideo").on("YTPBuffering", function(){ jQuery("#eventListener").html("YTPBuffering")});

            jQuery("#bgndVideo").mb_YTPlayer();
			}
});	
	
	
/*===========================================================*/
/*	Colorbox
/*===========================================================*/	
	
jQuery(function($){
	/* Fix for bad closed tags generated by WordPress*/
	$('a.groupX').each(function(){
		if($(this).html() == ''){
			$(this).parent().remove();
		}
	});
	
	$('.single .flexslider').flexslider({
				animation: "slide",
				controlNav: false,
				directionNav: true,
			  });
	
	if(typeof jQuery('body').colorbox == 'function'){
		$(".groupX").colorbox({rel:'groupX',
			transition:"fade",
			speed: 1700, 
			onComplete:function(){
				$('.flexslider').flexslider({
				animation: "slide",
				controlNav: false,
				directionNav: true,
			  });
			}
		});
		
		$(".group1").colorbox({rel:'group1',
			transition:"fade",
			speed: 1700, 
			onComplete:function(){
				$('.flexslider').flexslider({
				animation: "slide",
				controlNav: false,
				directionNav: true,
			  });
			}
		});
		
		$(".open1").colorbox({rel:'open1',
			transition:"fade",
			speed: 1700, 
			onComplete:function(){
				$('.flexslider').flexslider({
				animation: "slide",
				controlNav: false,
				directionNav: true,
			  });
			}
		});			
		$(".open2").live('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parent().find('.open3').click();
		});
		// $(".open2").colorbox({rel:'open2',
			// transition:"fade",
			// speed: 1700, 
			// onComplete:function(){
				// $('.flexslider').flexslider({
				// animation: "slide",
				// controlNav: false,
				// directionNav: true,
			  // });
			// }
		// });			
		
		$(".open3").colorbox({rel:'open3',
			transition:"fade",
			speed: 1700, 
			onComplete:function(){
				$('.flexslider').flexslider({
				animation: "slide",
				controlNav: false,
				directionNav: true,
			  });
			}
		});			
		
	} else { console.log('ColorBox plugin not loaded');}		
});
					
			
/*===========================================================*/
/*	Portfolio Isotope
/*===========================================================*/				

jQuery(window).load(function(){
	if(typeof $ == 'undefined'){
		var $ = jQuery;
	}
	
	if(typeof jQuery('body').isotope == 'function'){
        var $container = $('.portfolio');
        $container.isotope({
            filter: '*',
			animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false,
				
            }
        });
    
        $('nav.primary ul a').click(function(){
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
          return false;
        });
    
        var $optionSets = $('nav.primary ul'),
               $optionLinks = $optionSets.find('a');
         
               $optionLinks.click(function(){
                  var $this = $(this);
              // don't proceed if already selected
              if ( $this.hasClass('selected') ) {
                  return false;
              }
           var $optionSet = $this.parents('nav.primary ul');
           $optionSet.find('.selected').removeClass('selected');
           $this.addClass('selected'); 
        });
    } else { console.log('Isotope plugin not loaded');}
});
	
	
/*===========================================================*/
/*	Google Map
/*===========================================================*/		
function initialize() {

	if(typeof jQuery('#map_canvas').html() != 'string') return;
            var latlng = new google.maps.LatLng(gMap.lat, gMap.lng);
            var settings = {
                zoom: gMap.zoom,
                center: latlng,
                mapTypeControl: false,
				scrollwheel: false,
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                navigationControl: false,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP};
            var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
			
            var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h2 id="firstHeading" class="firstHeading">'+GmapMarkerTitle+'</h2>'+
                '<div id="bodyContent">'+
                '<p>'+GmapMarkerText+'</p>'+
                '</div>'+
                '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            
            var companyImage = new google.maps.MarkerImage(GmapMarkerImage,
                new google.maps.Size(58,63),
                new google.maps.Point(0,0),
                new google.maps.Point(35,20)
            );
    
			if(gMap.marker != false){   
		
				var companyPos = new google.maps.LatLng(gMap.lat, gMap.lng);
		
				var companyMarker = new google.maps.Marker({
					position: companyPos,
					map: map,
					icon: companyImage,               
					title:GmapMarkerTitle,
					zIndex: 3});
				google.maps.event.addListener(companyMarker, 'click', function() {
					infowindow.open(map,companyMarker);
				});
			}	
        }					
		
/*===========================================================*/
/*	Automatically Highlights Navigation Item
/*===========================================================*/

function calculateScroll() {

	if(typeof $ == 'undefined'){
		var $ = jQuery;
	}
	
	if($('#menu li').length < 2) return;
	
	var topRange = 400;
	var contentTop		=	[];
	var contentBottom	=	[];
	var winTop		=	$(window).scrollTop();

		//rangeTop is used for changing the class a little sooner that reaching the top of the page
		//rangeBottom is similar but used for when scrolling bottom to top
		var rangeTop	=	200;
		var rangeBottom	=	500;
		
		// TODO: Remove this when content is available 
		// var rangeTop	=	20;
		// var rangeBottom	=	50;

		$('#menu').find('a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top );
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})

		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
				$('#menu li')
				.removeClass('current')
				.eq(i).addClass('current');
			}
		});
}

jQuery(document).ready(function($) {
	calculateScroll()
	$(window).scroll(function(event) {
		calculateScroll();
	});
});
	
	
/*===========================================================*/
/*	Carousel
/*===========================================================*/
jQuery(function($) {
    //	Scrolled by user interaction
	if($('#news-carousel').length > 0){
            $('#news-carousel').carouFredSel({
                auto: false,
				width: '100%',
				prev : {
	       			button      : "#prev2",
	        		key         : "left",
	        		items       : 1,
	        		duration    : 750
	    			},
				next : {
					button      : "#next2",
					key         : "right",
					items       : 1,
					duration    : 750
				},				
                mousewheel: false,
                swipe: {
                    onMouse: false,
                    onTouch: true
                }
            });
	}
	
	if($('#testimonials-carousel').length > 0){		
			$('#testimonials-carousel').carouFredSel({
                auto: true,
				prev : {
	       			button      : "#prev",
	        		key         : "left",
	        		items       : 1,
	        		duration    : 750
	    			},
				next : {
					button      : "#next",
					key         : "right",
					items       : 1,
					duration    : 750
				},
				
                mousewheel: false,
                swipe: {
                    onMouse: false,
                    onTouch: true
                }
            });
	}
	

});
	
/*===========================================================*/
/*	Functionality
/*===========================================================*/

jQuery(function($){
	if($('.fadeText').length > 0){
		$('.fadeText').list_ticker({speed:6000});
	}
	
	$('#commentform').live('submit', function(e){
		e.preventDefault();
		var action = $(this).attr('action');
		var fields = $(this).serialize();
		$.post(action, fields, function(data){
			var comments = $(data).find('.commentlist').html();
			$('.commentlist').html(comments);
			$('textarea#comments').val('Message');
		});
		
	});
	
	$('.comment-reply-link').live('click', function(e){
		e.preventDefault();
		$.get($(this).attr('href'), function(data){
			var form = $(data).find('#commentform').html();
			$('#commentform').html(form);
		});
	})
	
	$('.dropcap.notfirst').each(function(){
		var found = false;
		 var classes = $(this).attr('class');
		$('>*', this).each(function(){
			if($(this).html() != '' && $(this).html() != '&nbsp;' && found == false){
				$(this).attr('class', classes);
			//	$(this).addClass('dropcap');
			 $(this).removeClass('notfirst');
				found = true;
			}
		});
		if(found == true){ $(this).removeClass('dropcap'); }
	});
});

/*
Eleven V1.01 dynamic portfolio fix
*/

jQuery(function($){
	$(window).resize(function() {
		fixTeamResponsive();	
	});
	fixTeamResponsive();
});

function fixTeamResponsive(){
	var $ = jQuery;
	if( $('.ourteam > .container').width() > 720 ){
		$('.ourteam > .container .team').each(function(){
			var id = $(this).attr('data-id');
			if(id % 4 == 0) {
				$(this).addClass('last');
			}
			else {
				$(this).removeClass('last');
			}
		});
	} else{
		$('.ourteam > .container .team').removeClass('last');
	}
}