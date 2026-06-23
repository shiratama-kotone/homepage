(window.webpackJsonp = window.webpackJsonp || []).push([
	[1],
	[function(t, n, e) {
		var r = function(t, n) {
			return this instanceof r ? t instanceof r ? t : ("string" == typeof t &&
				(t = this.select(t, n)), t && t.nodeName && (t = [t]), void(this.nodes =
					this.slice(t))) : new r(t, n)
		};
		r.prototype = {get length() {
				return this.nodes.length
			}
		}, r.prototype.nodes = [], r.prototype.addClass = function() {
			return this.eacharg(arguments, (function(t, n) {
				t.classList.add(n)
			}))
		}, r.prototype.adjacent = function(t, n, e) {
			return "number" == typeof n && (n = 0 === n ? [] : new Array(n).join().split(
				",").map(Number.call, Number)), this.each((function(i, o) {
				var a = document.createDocumentFragment();
				r(n || {}).map((function(n, e) {
					var a = "function" == typeof t ? t.call(this, n, e, i, o) : t;
					return "string" == typeof a ? this.generate(a) : r(a)
				})).each((function(t) {
					this.isInPage(t) ? a.appendChild(r(t).clone().first()) : a.appendChild(
						t)
				})), e.call(this, i, a)
			}))
		}, r.prototype.after = function(t, n) {
			return this.adjacent(t, n, (function(t, n) {
				t.parentNode.insertBefore(n, t.nextSibling)
			}))
		}, r.prototype.append = function(t, n) {
			return this.adjacent(t, n, (function(t, n) {
				t.appendChild(n)
			}))
		}, r.prototype.args = function(t, n, e) {
			return "function" == typeof t && (t = t(n, e)), "string" != typeof t &&
				(t = this.slice(t).map(this.str(n, e))), t.toString().split(/[\s,]+/).filter(
					(function(t) {
						return t.length
					}))
		}, r.prototype.array = function(t) {
			t = t;
			var n = this;
			return this.nodes.reduce((function(e, i, o) {
				var a;
				return t ? ((a = t.call(n, i, o)) || (a = !1), "string" == typeof a &&
					(a = r(a)), a instanceof r && (a = a.nodes)) : a = i.innerHTML, e.concat(!
					1 !== a ? a : [])
			}), [])
		}, r.prototype.attr = function(t, n, e) {
			return e = e ? "data-" : "", this.pairs(t, n, (function(t, n) {
				return t.getAttribute(e + n)
			}), (function(t, n, r) {
				t.setAttribute(e + n, r)
			}))
		}, r.prototype.before = function(t, n) {
			return this.adjacent(t, n, (function(t, n) {
				t.parentNode.insertBefore(n, t)
			}))
		}, r.prototype.children = function(t) {
			return this.map((function(t) {
				return this.slice(t.children)
			})).filter(t)
		}, r.prototype.clone = function() {
			return this.map((function(t, n) {
				var e = t.cloneNode(!0),
					r = this.getAll(e);
				return this.getAll(t).each((function(t, n) {
					for (var e in this.mirror) this.mirror[e] && this.mirror[e](t, r
						.nodes[n])
				})), e
			}))
		}, r.prototype.getAll = function(t) {
			return r([t].concat(r("*", t).nodes))
		}, r.prototype.mirror = {}, r.prototype.mirror.events = function(t, n) {
			if (t._e)
				for (var e in t._e) t._e[e].forEach((function(t) {
					r(n).on(e, t)
				}))
		}, r.prototype.mirror.select = function(t, n) {
			r(t).is("select") && (n.value = t.value)
		}, r.prototype.mirror.textarea = function(t, n) {
			r(t).is("textarea") && (n.value = t.value)
		}, r.prototype.closest = function(t) {
			return this.map((function(n) {
				do {
					if (r(n).is(t)) return n
				} while ((n = n.parentNode) && n !== document)
			}))
		}, r.prototype.data = function(t, n) {
			return this.attr(t, n, !0)
		}, r.prototype.each = function(t) {
			return this.nodes.forEach(t.bind(this)), this
		}, r.prototype.eacharg = function(t, n) {
			return this.each((function(e, r) {
				this.args(t, e, r).forEach((function(t) {
					n.call(this, e, t)
				}), this)
			}))
		}, r.prototype.empty = function() {
			return this.each((function(t) {
				for (; t.firstChild;) t.removeChild(t.firstChild)
			}))
		}, r.prototype.filter = function(t) {
			var n = function(n) {
				return n.matches = n.matches || n.msMatchesSelector || n.webkitMatchesSelector,
					n.matches(t || "*")
			};
			return "function" == typeof t && (n = t), t instanceof r && (n =
				function(n) {
					return -1 !== t.nodes.indexOf(n)
				}), r(this.nodes.filter(n))
		}, r.prototype.find = function(t) {
			return this.map((function(n) {
				return r(t || "*", n)
			}))
		}, r.prototype.first = function() {
			return this.nodes[0] || !1
		}, r.prototype.generate = function(t) {
			return /^\s*<tr[> ]/.test(t) ? r(document.createElement("table")).html(t)
				.children().children().nodes : /^\s*<t(h|d)[> ]/.test(t) ? r(document.createElement(
					"table")).html(t).children().children().children().nodes : /^\s*</.test(
					t) ? r(document.createElement("div")).html(t).children().nodes :
				document.createTextNode(t)
		}, r.prototype.handle = function() {
			var t = this.slice(arguments).map((function(t) {
				return "function" == typeof t ? function(n) {
					n.preventDefault(), t.apply(this, arguments)
				} : t
			}), this);
			return this.on.apply(this, t)
		}, r.prototype.hasClass = function() {
			return this.is("." + this.args(arguments).join("."))
		}, r.prototype.html = function(t) {
			return void 0 === t ? this.first().innerHTML || "" : this.each((function(
				n) {
				n.innerHTML = t
			}))
		}, r.prototype.is = function(t) {
			return 0 < this.filter(t).length
		}, r.prototype.isInPage = function(t) {
			return t !== document.body && document.body.contains(t)
		}, r.prototype.last = function() {
			return this.nodes[this.length - 1] || !1
		}, r.prototype.map = function(t) {
			return t ? r(this.array(t)).unique() : this
		}, r.prototype.not = function(t) {
			return this.filter((function(n) {
				return !r(n).is(t || !0)
			}))
		}, r.prototype.off = function(t) {
			return this.eacharg(t, (function(t, n) {
				r(t._e ? t._e[n] : []).each((function(e) {
					t.removeEventListener(n, e)
				}))
			}))
		}, r.prototype.on = function(t, n, e) {
			if ("string" == typeof n) {
				var i = n;
				n = function(t) {
					var n = arguments;
					r(t.currentTarget).find(i).each((function(r) {
						if (r === t.target || r.contains(t.target)) {
							try {
								Object.defineProperty(t, "currentTarget", {
									get: function() {
										return r
									}
								})
							} catch (r) {}
							e.apply(r, n)
						}
					}))
				}
			}
			var o = function(t) {
				return n.apply(this, [t].concat(t.detail || []))
			};
			return this.eacharg(t, (function(t, n) {
				t.addEventListener(n, o), t._e = t._e || {}, t._e[n] = t._e[n] || [],
					t._e[n].push(o)
			}))
		}, r.prototype.pairs = function(t, n, e, r) {
			if (void 0 !== n) {
				var i = t;
				(t = {})[i] = n
			}
			return "object" == typeof t ? this.each((function(n) {
				for (var e in t) r(n, e, t[e])
			})) : this.length ? e(this.first(), t) : ""
		}, r.prototype.param = function(t) {
			return Object.keys(t).map(function(n) {
				return this.uri(n) + "=" + this.uri(t[n])
			}.bind(this)).join("&")
		}, r.prototype.parent = function(t) {
			return this.map((function(t) {
				return t.parentNode
			})).filter(t)
		}, r.prototype.prepend = function(t, n) {
			return this.adjacent(t, n, (function(t, n) {
				t.insertBefore(n, t.firstChild)
			}))
		}, r.prototype.remove = function() {
			return this.each((function(t) {
				t.parentNode && t.parentNode.removeChild(t)
			}))
		}, r.prototype.removeClass = function() {
			return this.eacharg(arguments, (function(t, n) {
				t.classList.remove(n)
			}))
		}, r.prototype.replace = function(t, n) {
			var e = [];
			return this.adjacent(t, n, (function(t, n) {
				e = e.concat(this.slice(n.children)), t.parentNode.replaceChild(n, t)
			})), r(e)
		}, r.prototype.scroll = function() {
			return this.first().scrollIntoView({
				behavior: "smooth"
			}), this
		}, r.prototype.select = function(t, n) {
			return t = t.replace(/^\s*/, "").replace(/\s*$/, ""), /^</.test(t) ? r()
				.generate(t) : (n || document).querySelectorAll(t)
		}, r.prototype.serialize = function() {
			var t = this;
			return this.slice(this.first().elements).reduce((function(n, e) {
				return !e.name || e.disabled || "file" === e.type ? n :
					/(checkbox|radio)/.test(e.type) && !e.checked ? n :
					"select-multiple" === e.type ? (r(e.options).each((function(r) {
						r.selected && (n += "&" + t.uri(e.name) + "=" + t.uri(r.value))
					})), n) : n + "&" + t.uri(e.name) + "=" + t.uri(e.value)
			}), "").slice(1)
		}, r.prototype.siblings = function(t) {
			return this.parent().children(t).not(this)
		}, r.prototype.size = function() {
			return this.first().getBoundingClientRect()
		}, r.prototype.slice = function(t) {
			return t && 0 !== t.length && "string" != typeof t &&
				"[object Function]" !== t.toString() ? t.length ? [].slice.call(t.nodes ||
					t) : [t] : []
		}, r.prototype.str = function(t, n) {
			return function(e) {
				return "function" == typeof e ? e.call(this, t, n) : e.toString()
			}
		}, r.prototype.text = function(t) {
			return void 0 === t ? this.first().textContent || "" : this.each((
				function(n) {
					n.textContent = t
				}))
		}, r.prototype.toggleClass = function(t, n) {
			return !!n === n ? this[n ? "addClass" : "removeClass"](t) : this.eacharg(
				t, (function(t, n) {
					t.classList.toggle(n)
				}))
		}, r.prototype.trigger = function(t) {
			var n = this.slice(arguments).slice(1);
			return this.eacharg(t, (function(t, e) {
				var r, i = {
					bubbles: !0,
					cancelable: !0,
					detail: n
				};
				try {
					r = new window.CustomEvent(e, i)
				} catch (t) {
					(r = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0,
						n)
				}
				t.dispatchEvent(r)
			}))
		}, r.prototype.unique = function() {
			return r(this.nodes.reduce((function(t, n) {
				return null != n && !1 !== n && -1 === t.indexOf(n) ? t.concat(n) :
					t
			}), []))
		}, r.prototype.uri = function(t) {
			return encodeURIComponent(t).replace(/!/g, "%21").replace(/'/g, "%27").replace(
				/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(
				/%20/g, "+")
		}, r.prototype.wrap = function(t) {
			return this.map((function(n) {
				return r(t).each((function(t) {
					(function(t) {
						for (; t.firstElementChild;) t = t.firstElementChild;
						return r(t)
					})(t).append(n.cloneNode(!0)), n.parentNode.replaceChild(t, n)
				}))
			}))
		}, t.exports && (t.exports = r, t.exports.u = r)
	}, , function(t, n, e) {
		"use strict";
		(function(t) {
			/*!
			 * The buffer module from node.js, for the browser.
			 *
			 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
			 * @license  MIT
			 */
			var r = e(15),
				i = e(16),
				o = e(17);

			function a() {
				return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
			}

			function s(t, n) {
				if (a() < n) throw new RangeError("Invalid typed array length");
				return u.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(n)).__proto__ = u.prototype :
					(null === t && (t = new u(n)), t.length = n), t
			}

			function u(t, n, e) {
				if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(t, n, e);
				if ("number" == typeof t) {
					if ("string" == typeof n) throw new Error(
						"If encoding is specified then the first argument must be a string");
					return f(this, t)
				}
				return c(this, t, n, e)
			}

			function c(t, n, e, r) {
				if ("number" == typeof n) throw new TypeError(
					'"value" argument must not be a number');
				return "undefined" != typeof ArrayBuffer && n instanceof ArrayBuffer ?
					function(t, n, e, r) {
						if (n.byteLength, e < 0 || n.byteLength < e) throw new RangeError(
							"'offset' is out of bounds");
						if (n.byteLength < e + (r || 0)) throw new RangeError(
							"'length' is out of bounds");
						n = void 0 === e && void 0 === r ? new Uint8Array(n) : void 0 === r ?
							new Uint8Array(n, e) : new Uint8Array(n, e, r);
						u.TYPED_ARRAY_SUPPORT ? (t = n).__proto__ = u.prototype : t = l(t, n);
						return t
					}(t, n, e, r) : "string" == typeof n ? function(t, n, e) {
						"string" == typeof e && "" !== e || (e = "utf8");
						if (!u.isEncoding(e)) throw new TypeError(
							'"encoding" must be a valid string encoding');
						var r = 0 | d(n, e),
							i = (t = s(t, r)).write(n, e);
						i !== r && (t = t.slice(0, i));
						return t
					}(t, n, e) : function(t, n) {
						if (u.isBuffer(n)) {
							var e = 0 | p(n.length);
							return 0 === (t = s(t, e)).length ? t : (n.copy(t, 0, 0, e), t)
						}
						if (n) {
							if ("undefined" != typeof ArrayBuffer && n.buffer instanceof ArrayBuffer ||
								"length" in n) return "number" != typeof n.length || (r = n.length) !=
								r ? s(t, 0) : l(t, n);
							if ("Buffer" === n.type && o(n.data)) return l(t, n.data)
						}
						var r;
						throw new TypeError(
							"First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
						)
					}(t, n)
			}

			function h(t) {
				if ("number" != typeof t) throw new TypeError(
					'"size" argument must be a number');
				if (t < 0) throw new RangeError('"size" argument must not be negative')
			}

			function f(t, n) {
				if (h(n), t = s(t, n < 0 ? 0 : 0 | p(n)), !u.TYPED_ARRAY_SUPPORT)
					for (var e = 0; e < n; ++e) t[e] = 0;
				return t
			}

			function l(t, n) {
				var e = n.length < 0 ? 0 : 0 | p(n.length);
				t = s(t, e);
				for (var r = 0; r < e; r += 1) t[r] = 255 & n[r];
				return t
			}

			function p(t) {
				if (t >= a()) throw new RangeError(
					"Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(
						16) + " bytes");
				return 0 | t
			}

			function d(t, n) {
				if (u.isBuffer(t)) return t.length;
				if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer
					.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return
					t.byteLength;
				"string" != typeof t && (t = "" + t);
				var e = t.length;
				if (0 === e) return 0;
				for (var r = !1;;) switch (n) {
					case "ascii":
					case "latin1":
					case "binary":
						return e;
					case "utf8":
					case "utf-8":
					case void 0:
						return z(t).length;
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return 2 * e;
					case "hex":
						return e >>> 1;
					case "base64":
						return F(t).length;
					default:
						if (r) return z(t).length;
						n = ("" + n).toLowerCase(), r = !0
				}
			}

			function _(t, n, e) {
				var r = !1;
				if ((void 0 === n || n < 0) && (n = 0), n > this.length) return "";
				if ((void 0 === e || e > this.length) && (e = this.length), e <= 0)
					return "";
				if ((e >>>= 0) <= (n >>>= 0)) return "";
				for (t || (t = "utf8");;) switch (t) {
					case "hex":
						return k(this, n, e);
					case "utf8":
					case "utf-8":
						return N(this, n, e);
					case "ascii":
						return E(this, n, e);
					case "latin1":
					case "binary":
						return S(this, n, e);
					case "base64":
						return C(this, n, e);
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return U(this, n, e);
					default:
						if (r) throw new TypeError("Unknown encoding: " + t);
						t = (t + "").toLowerCase(), r = !0
				}
			}

			function g(t, n, e) {
				var r = t[n];
				t[n] = t[e], t[e] = r
			}

			function y(t, n, e, r, i) {
				if (0 === t.length) return -1;
				if ("string" == typeof e ? (r = e, e = 0) : e > 2147483647 ? e =
					2147483647 : e < -2147483648 && (e = -2147483648), e = +e, isNaN(e) &&
					(e = i ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length
				) {
					if (i) return -1;
					e = t.length - 1
				} else if (e < 0) {
					if (!i) return -1;
					e = 0
				}
				if ("string" == typeof n && (n = u.from(n, r)), u.isBuffer(n)) return 0 ===
					n.length ? -1 : v(t, n, e, r, i);
				if ("number" == typeof n) return n &= 255, u.TYPED_ARRAY_SUPPORT &&
					"function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype
					.indexOf.call(t, n, e) : Uint8Array.prototype.lastIndexOf.call(t, n,
						e) : v(t, [n], e, r, i);
				throw new TypeError("val must be string, number or Buffer")
			}

			function v(t, n, e, r, i) {
				var o, a = 1,
					s = t.length,
					u = n.length;
				if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) ||
						"ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
					if (t.length < 2 || n.length < 2) return -1;
					a = 2, s /= 2, u /= 2, e /= 2
				}

				function c(t, n) {
					return 1 === a ? t[n] : t.readUInt16BE(n * a)
				}
				if (i) {
					var h = -1;
					for (o = e; o < s; o++)
						if (c(t, o) === c(n, -1 === h ? 0 : o - h)) {
							if (-1 === h && (h = o), o - h + 1 === u) return h * a
						} else -1 !== h && (o -= o - h), h = -1
				} else
					for (e + u > s && (e = s - u), o = e; o >= 0; o--) {
						for (var f = !0, l = 0; l < u; l++)
							if (c(t, o + l) !== c(n, l)) {
								f = !1;
								break
							}
						if (f) return o
					}
				return -1
			}

			function m(t, n, e, r) {
				e = Number(e) || 0;
				var i = t.length - e;
				r ? (r = Number(r)) > i && (r = i) : r = i;
				var o = n.length;
				if (o % 2 != 0) throw new TypeError("Invalid hex string");
				r > o / 2 && (r = o / 2);
				for (var a = 0; a < r; ++a) {
					var s = parseInt(n.substr(2 * a, 2), 16);
					if (isNaN(s)) return a;
					t[e + a] = s
				}
				return a
			}

			function w(t, n, e, r) {
				return q(z(n, t.length - e), t, e, r)
			}

			function b(t, n, e, r) {
				return q(function(t) {
					for (var n = [], e = 0; e < t.length; ++e) n.push(255 & t.charCodeAt(
						e));
					return n
				}(n), t, e, r)
			}

			function x(t, n, e, r) {
				return b(t, n, e, r)
			}

			function M(t, n, e, r) {
				return q(F(n), t, e, r)
			}

			function T(t, n, e, r) {
				return q(function(t, n) {
					for (var e, r, i, o = [], a = 0; a < t.length && !((n -= 2) < 0); ++
						a) e = t.charCodeAt(a), r = e >> 8, i = e % 256, o.push(i), o.push(
						r);
					return o
				}(n, t.length - e), t, e, r)
			}

			function C(t, n, e) {
				return 0 === n && e === t.length ? r.fromByteArray(t) : r.fromByteArray(
					t.slice(n, e))
			}

			function N(t, n, e) {
				e = Math.min(t.length, e);
				for (var r = [], i = n; i < e;) {
					var o, a, s, u, c = t[i],
						h = null,
						f = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
					if (i + f <= e) switch (f) {
						case 1:
							c < 128 && (h = c);
							break;
						case 2:
							128 == (192 & (o = t[i + 1])) && (u = (31 & c) << 6 | 63 & o) > 127 &&
								(h = u);
							break;
						case 3:
							o = t[i + 1], a = t[i + 2], 128 == (192 & o) && 128 == (192 & a) &&
								(u = (15 & c) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (u < 55296 ||
									u > 57343) && (h = u);
							break;
						case 4:
							o = t[i + 1], a = t[i + 2], s = t[i + 3], 128 == (192 & o) && 128 ==
								(192 & a) && 128 == (192 & s) && (u = (15 & c) << 18 | (63 & o) <<
									12 | (63 & a) << 6 | 63 & s) > 65535 && u < 1114112 && (h = u)
					}
					null === h ? (h = 65533, f = 1) : h > 65535 && (h -= 65536, r.push(h >>>
						10 & 1023 | 55296), h = 56320 | 1023 & h), r.push(h), i += f
				}
				return function(t) {
					var n = t.length;
					if (n <= A) return String.fromCharCode.apply(String, t);
					var e = "",
						r = 0;
					for (; r < n;) e += String.fromCharCode.apply(String, t.slice(r, r +=
						A));
					return e
				}(r)
			}
			n.Buffer = u, n.SlowBuffer = function(t) {
					+t != t && (t = 0);
					return u.alloc(+t)
				}, n.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ?
				t.TYPED_ARRAY_SUPPORT : function() {
					try {
						var t = new Uint8Array(1);
						return t.__proto__ = {
							__proto__: Uint8Array.prototype,
							foo: function() {
								return 42
							}
						}, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(
							1, 1).byteLength
					} catch (t) {
						return !1
					}
				}(), n.kMaxLength = a(), u.poolSize = 8192, u._augment = function(t) {
					return t.__proto__ = u.prototype, t
				}, u.from = function(t, n, e) {
					return c(null, t, n, e)
				}, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype,
					u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species &&
					u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
						value: null,
						configurable: !0
					})), u.alloc = function(t, n, e) {
					return function(t, n, e, r) {
						return h(n), n <= 0 ? s(t, n) : void 0 !== e ? "string" == typeof r ?
							s(t, n).fill(e, r) : s(t, n).fill(e) : s(t, n)
					}(null, t, n, e)
				}, u.allocUnsafe = function(t) {
					return f(null, t)
				}, u.allocUnsafeSlow = function(t) {
					return f(null, t)
				}, u.isBuffer = function(t) {
					return !(null == t || !t._isBuffer)
				}, u.compare = function(t, n) {
					if (!u.isBuffer(t) || !u.isBuffer(n)) throw new TypeError(
						"Arguments must be Buffers");
					if (t === n) return 0;
					for (var e = t.length, r = n.length, i = 0, o = Math.min(e, r); i < o; ++
						i)
						if (t[i] !== n[i]) {
							e = t[i], r = n[i];
							break
						}
					return e < r ? -1 : r < e ? 1 : 0
				}, u.isEncoding = function(t) {
					switch (String(t).toLowerCase()) {
						case "hex":
						case "utf8":
						case "utf-8":
						case "ascii":
						case "latin1":
						case "binary":
						case "base64":
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return !0;
						default:
							return !1
					}
				}, u.concat = function(t, n) {
					if (!o(t)) throw new TypeError(
						'"list" argument must be an Array of Buffers');
					if (0 === t.length) return u.alloc(0);
					var e;
					if (void 0 === n)
						for (n = 0, e = 0; e < t.length; ++e) n += t[e].length;
					var r = u.allocUnsafe(n),
						i = 0;
					for (e = 0; e < t.length; ++e) {
						var a = t[e];
						if (!u.isBuffer(a)) throw new TypeError(
							'"list" argument must be an Array of Buffers');
						a.copy(r, i), i += a.length
					}
					return r
				}, u.byteLength = d, u.prototype._isBuffer = !0, u.prototype.swap16 =
				function() {
					var t = this.length;
					if (t % 2 != 0) throw new RangeError(
						"Buffer size must be a multiple of 16-bits");
					for (var n = 0; n < t; n += 2) g(this, n, n + 1);
					return this
				}, u.prototype.swap32 = function() {
					var t = this.length;
					if (t % 4 != 0) throw new RangeError(
						"Buffer size must be a multiple of 32-bits");
					for (var n = 0; n < t; n += 4) g(this, n, n + 3), g(this, n + 1, n + 2);
					return this
				}, u.prototype.swap64 = function() {
					var t = this.length;
					if (t % 8 != 0) throw new RangeError(
						"Buffer size must be a multiple of 64-bits");
					for (var n = 0; n < t; n += 8) g(this, n, n + 7), g(this, n + 1, n + 6),
						g(this, n + 2, n + 5), g(this, n + 3, n + 4);
					return this
				}, u.prototype.toString = function() {
					var t = 0 | this.length;
					return 0 === t ? "" : 0 === arguments.length ? N(this, 0, t) : _.apply(
						this, arguments)
				}, u.prototype.equals = function(t) {
					if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
					return this === t || 0 === u.compare(this, t)
				}, u.prototype.inspect = function() {
					var t = "",
						e = n.INSPECT_MAX_BYTES;
					return this.length > 0 && (t = this.toString("hex", 0, e).match(
							/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " +
						t + ">"
				}, u.prototype.compare = function(t, n, e, r, i) {
					if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
					if (void 0 === n && (n = 0), void 0 === e && (e = t ? t.length : 0),
						void 0 === r && (r = 0), void 0 === i && (i = this.length), n < 0 ||
						e > t.length || r < 0 || i > this.length) throw new RangeError(
						"out of range index");
					if (r >= i && n >= e) return 0;
					if (r >= i) return -1;
					if (n >= e) return 1;
					if (this === t) return 0;
					for (var o = (i >>>= 0) - (r >>>= 0), a = (e >>>= 0) - (n >>>= 0), s =
							Math.min(o, a), c = this.slice(r, i), h = t.slice(n, e), f = 0; f <
						s; ++f)
						if (c[f] !== h[f]) {
							o = c[f], a = h[f];
							break
						}
					return o < a ? -1 : a < o ? 1 : 0
				}, u.prototype.includes = function(t, n, e) {
					return -1 !== this.indexOf(t, n, e)
				}, u.prototype.indexOf = function(t, n, e) {
					return y(this, t, n, e, !0)
				}, u.prototype.lastIndexOf = function(t, n, e) {
					return y(this, t, n, e, !1)
				}, u.prototype.write = function(t, n, e, r) {
					if (void 0 === n) r = "utf8", e = this.length, n = 0;
					else if (void 0 === e && "string" == typeof n) r = n, e = this.length,
						n = 0;
					else {
						if (!isFinite(n)) throw new Error(
							"Buffer.write(string, encoding, offset[, length]) is no longer supported"
						);
						n |= 0, isFinite(e) ? (e |= 0, void 0 === r && (r = "utf8")) : (r = e,
							e = void 0)
					}
					var i = this.length - n;
					if ((void 0 === e || e > i) && (e = i), t.length > 0 && (e < 0 || n <
							0) || n > this.length) throw new RangeError(
						"Attempt to write outside buffer bounds");
					r || (r = "utf8");
					for (var o = !1;;) switch (r) {
						case "hex":
							return m(this, t, n, e);
						case "utf8":
						case "utf-8":
							return w(this, t, n, e);
						case "ascii":
							return b(this, t, n, e);
						case "latin1":
						case "binary":
							return x(this, t, n, e);
						case "base64":
							return M(this, t, n, e);
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return T(this, t, n, e);
						default:
							if (o) throw new TypeError("Unknown encoding: " + r);
							r = ("" + r).toLowerCase(), o = !0
					}
				}, u.prototype.toJSON = function() {
					return {
						type: "Buffer",
						data: Array.prototype.slice.call(this._arr || this, 0)
					}
				};
			var A = 4096;

			function E(t, n, e) {
				var r = "";
				e = Math.min(t.length, e);
				for (var i = n; i < e; ++i) r += String.fromCharCode(127 & t[i]);
				return r
			}

			function S(t, n, e) {
				var r = "";
				e = Math.min(t.length, e);
				for (var i = n; i < e; ++i) r += String.fromCharCode(t[i]);
				return r
			}

			function k(t, n, e) {
				var r = t.length;
				(!n || n < 0) && (n = 0), (!e || e < 0 || e > r) && (e = r);
				for (var i = "", o = n; o < e; ++o) i += Y(t[o]);
				return i
			}

			function U(t, n, e) {
				for (var r = t.slice(n, e), i = "", o = 0; o < r.length; o += 2) i +=
					String.fromCharCode(r[o] + 256 * r[o + 1]);
				return i
			}

			function P(t, n, e) {
				if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
				if (t + n > e) throw new RangeError(
					"Trying to access beyond buffer length")
			}

			function R(t, n, e, r, i, o) {
				if (!u.isBuffer(t)) throw new TypeError(
					'"buffer" argument must be a Buffer instance');
				if (n > i || n < o) throw new RangeError(
					'"value" argument is out of bounds');
				if (e + r > t.length) throw new RangeError("Index out of range")
			}

			function B(t, n, e, r) {
				n < 0 && (n = 65535 + n + 1);
				for (var i = 0, o = Math.min(t.length - e, 2); i < o; ++i) t[e + i] = (
					n & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i)
			}

			function O(t, n, e, r) {
				n < 0 && (n = 4294967295 + n + 1);
				for (var i = 0, o = Math.min(t.length - e, 4); i < o; ++i) t[e + i] = n >>>
					8 * (r ? i : 3 - i) & 255
			}

			function j(t, n, e, r, i, o) {
				if (e + r > t.length) throw new RangeError("Index out of range");
				if (e < 0) throw new RangeError("Index out of range")
			}

			function D(t, n, e, r, o) {
				return o || j(t, 0, e, 4), i.write(t, n, e, r, 23, 4), e + 4
			}

			function L(t, n, e, r, o) {
				return o || j(t, 0, e, 8), i.write(t, n, e, r, 52, 8), e + 8
			}
			u.prototype.slice = function(t, n) {
				var e, r = this.length;
				if ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (n =
						void 0 === n ? r : ~~n) < 0 ? (n += r) < 0 && (n = 0) : n > r && (n =
						r), n < t && (n = t), u.TYPED_ARRAY_SUPPORT)(e = this.subarray(t, n))
					.__proto__ = u.prototype;
				else {
					var i = n - t;
					e = new u(i, void 0);
					for (var o = 0; o < i; ++o) e[o] = this[o + t]
				}
				return e
			}, u.prototype.readUIntLE = function(t, n, e) {
				t |= 0, n |= 0, e || P(t, n, this.length);
				for (var r = this[t], i = 1, o = 0; ++o < n && (i *= 256);) r += this[
					t + o] * i;
				return r
			}, u.prototype.readUIntBE = function(t, n, e) {
				t |= 0, n |= 0, e || P(t, n, this.length);
				for (var r = this[t + --n], i = 1; n > 0 && (i *= 256);) r += this[t +
					--n] * i;
				return r
			}, u.prototype.readUInt8 = function(t, n) {
				return n || P(t, 1, this.length), this[t]
			}, u.prototype.readUInt16LE = function(t, n) {
				return n || P(t, 2, this.length), this[t] | this[t + 1] << 8
			}, u.prototype.readUInt16BE = function(t, n) {
				return n || P(t, 2, this.length), this[t] << 8 | this[t + 1]
			}, u.prototype.readUInt32LE = function(t, n) {
				return n || P(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t +
					2] << 16) + 16777216 * this[t + 3]
			}, u.prototype.readUInt32BE = function(t, n) {
				return n || P(t, 4, this.length), 16777216 * this[t] + (this[t + 1] <<
					16 | this[t + 2] << 8 | this[t + 3])
			}, u.prototype.readIntLE = function(t, n, e) {
				t |= 0, n |= 0, e || P(t, n, this.length);
				for (var r = this[t], i = 1, o = 0; ++o < n && (i *= 256);) r += this[
					t + o] * i;
				return r >= (i *= 128) && (r -= Math.pow(2, 8 * n)), r
			}, u.prototype.readIntBE = function(t, n, e) {
				t |= 0, n |= 0, e || P(t, n, this.length);
				for (var r = n, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o +=
					this[t + --r] * i;
				return o >= (i *= 128) && (o -= Math.pow(2, 8 * n)), o
			}, u.prototype.readInt8 = function(t, n) {
				return n || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] +
					1) : this[t]
			}, u.prototype.readInt16LE = function(t, n) {
				n || P(t, 2, this.length);
				var e = this[t] | this[t + 1] << 8;
				return 32768 & e ? 4294901760 | e : e
			}, u.prototype.readInt16BE = function(t, n) {
				n || P(t, 2, this.length);
				var e = this[t + 1] | this[t] << 8;
				return 32768 & e ? 4294901760 | e : e
			}, u.prototype.readInt32LE = function(t, n) {
				return n || P(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t +
					2] << 16 | this[t + 3] << 24
			}, u.prototype.readInt32BE = function(t, n) {
				return n || P(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 |
					this[t + 2] << 8 | this[t + 3]
			}, u.prototype.readFloatLE = function(t, n) {
				return n || P(t, 4, this.length), i.read(this, t, !0, 23, 4)
			}, u.prototype.readFloatBE = function(t, n) {
				return n || P(t, 4, this.length), i.read(this, t, !1, 23, 4)
			}, u.prototype.readDoubleLE = function(t, n) {
				return n || P(t, 8, this.length), i.read(this, t, !0, 52, 8)
			}, u.prototype.readDoubleBE = function(t, n) {
				return n || P(t, 8, this.length), i.read(this, t, !1, 52, 8)
			}, u.prototype.writeUIntLE = function(t, n, e, r) {
				(t = +t, n |= 0, e |= 0, r) || R(this, t, n, e, Math.pow(2, 8 * e) - 1,
					0);
				var i = 1,
					o = 0;
				for (this[n] = 255 & t; ++o < e && (i *= 256);) this[n + o] = t / i &
					255;
				return n + e
			}, u.prototype.writeUIntBE = function(t, n, e, r) {
				(t = +t, n |= 0, e |= 0, r) || R(this, t, n, e, Math.pow(2, 8 * e) - 1,
					0);
				var i = e - 1,
					o = 1;
				for (this[n + i] = 255 & t; --i >= 0 && (o *= 256);) this[n + i] = t /
					o & 255;
				return n + e
			}, u.prototype.writeUInt8 = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 1, 255, 0), u.TYPED_ARRAY_SUPPORT ||
					(t = Math.floor(t)), this[n] = 255 & t, n + 1
			}, u.prototype.writeUInt16LE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ?
					(this[n] = 255 & t, this[n + 1] = t >>> 8) : B(this, t, n, !0), n + 2
			}, u.prototype.writeUInt16BE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ?
					(this[n] = t >>> 8, this[n + 1] = 255 & t) : B(this, t, n, !1), n + 2
			}, u.prototype.writeUInt32LE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ?
					(this[n + 3] = t >>> 24, this[n + 2] = t >>> 16, this[n + 1] = t >>>
						8, this[n] = 255 & t) : O(this, t, n, !0), n + 4
			}, u.prototype.writeUInt32BE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ?
					(this[n] = t >>> 24, this[n + 1] = t >>> 16, this[n + 2] = t >>> 8,
						this[n + 3] = 255 & t) : O(this, t, n, !1), n + 4
			}, u.prototype.writeIntLE = function(t, n, e, r) {
				if (t = +t, n |= 0, !r) {
					var i = Math.pow(2, 8 * e - 1);
					R(this, t, n, e, i - 1, -i)
				}
				var o = 0,
					a = 1,
					s = 0;
				for (this[n] = 255 & t; ++o < e && (a *= 256);) t < 0 && 0 === s && 0 !==
					this[n + o - 1] && (s = 1), this[n + o] = (t / a >> 0) - s & 255;
				return n + e
			}, u.prototype.writeIntBE = function(t, n, e, r) {
				if (t = +t, n |= 0, !r) {
					var i = Math.pow(2, 8 * e - 1);
					R(this, t, n, e, i - 1, -i)
				}
				var o = e - 1,
					a = 1,
					s = 0;
				for (this[n + o] = 255 & t; --o >= 0 && (a *= 256);) t < 0 && 0 === s &&
					0 !== this[n + o + 1] && (s = 1), this[n + o] = (t / a >> 0) - s &
					255;
				return n + e
			}, u.prototype.writeInt8 = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 1, 127, -128), u.TYPED_ARRAY_SUPPORT ||
					(t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[n] = 255 & t, n +
					1
			}, u.prototype.writeInt16LE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ?
					(this[n] = 255 & t, this[n + 1] = t >>> 8) : B(this, t, n, !0), n + 2
			}, u.prototype.writeInt16BE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ?
					(this[n] = t >>> 8, this[n + 1] = 255 & t) : B(this, t, n, !1), n + 2
			}, u.prototype.writeInt32LE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 4, 2147483647, -2147483648),
					u.TYPED_ARRAY_SUPPORT ? (this[n] = 255 & t, this[n + 1] = t >>> 8,
						this[n + 2] = t >>> 16, this[n + 3] = t >>> 24) : O(this, t, n, !0),
					n + 4
			}, u.prototype.writeInt32BE = function(t, n, e) {
				return t = +t, n |= 0, e || R(this, t, n, 4, 2147483647, -2147483648),
					t < 0 && (t = 4294967295 + t + 1), u.TYPED_ARRAY_SUPPORT ? (this[n] =
						t >>> 24, this[n + 1] = t >>> 16, this[n + 2] = t >>> 8, this[n + 3] =
						255 & t) : O(this, t, n, !1), n + 4
			}, u.prototype.writeFloatLE = function(t, n, e) {
				return D(this, t, n, !0, e)
			}, u.prototype.writeFloatBE = function(t, n, e) {
				return D(this, t, n, !1, e)
			}, u.prototype.writeDoubleLE = function(t, n, e) {
				return L(this, t, n, !0, e)
			}, u.prototype.writeDoubleBE = function(t, n, e) {
				return L(this, t, n, !1, e)
			}, u.prototype.copy = function(t, n, e, r) {
				if (e || (e = 0), r || 0 === r || (r = this.length), n >= t.length &&
					(n = t.length), n || (n = 0), r > 0 && r < e && (r = e), r === e)
					return 0;
				if (0 === t.length || 0 === this.length) return 0;
				if (n < 0) throw new RangeError("targetStart out of bounds");
				if (e < 0 || e >= this.length) throw new RangeError(
					"sourceStart out of bounds");
				if (r < 0) throw new RangeError("sourceEnd out of bounds");
				r > this.length && (r = this.length), t.length - n < r - e && (r = t.length -
					n + e);
				var i, o = r - e;
				if (this === t && e < n && n < r)
					for (i = o - 1; i >= 0; --i) t[i + n] = this[i + e];
				else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT)
					for (i = 0; i < o; ++i) t[i + n] = this[i + e];
				else Uint8Array.prototype.set.call(t, this.subarray(e, e + o), n);
				return o
			}, u.prototype.fill = function(t, n, e, r) {
				if ("string" == typeof t) {
					if ("string" == typeof n ? (r = n, n = 0, e = this.length) : "string" ==
						typeof e && (r = e, e = this.length), 1 === t.length) {
						var i = t.charCodeAt(0);
						i < 256 && (t = i)
					}
					if (void 0 !== r && "string" != typeof r) throw new TypeError(
						"encoding must be a string");
					if ("string" == typeof r && !u.isEncoding(r)) throw new TypeError(
						"Unknown encoding: " + r)
				} else "number" == typeof t && (t &= 255);
				if (n < 0 || this.length < n || this.length < e) throw new RangeError(
					"Out of range index");
				if (e <= n) return this;
				var o;
				if (n >>>= 0, e = void 0 === e ? this.length : e >>> 0, t || (t = 0),
					"number" == typeof t)
					for (o = n; o < e; ++o) this[o] = t;
				else {
					var a = u.isBuffer(t) ? t : z(new u(t, r).toString()),
						s = a.length;
					for (o = 0; o < e - n; ++o) this[o + n] = a[o % s]
				}
				return this
			};
			var I = /[^+\/0-9A-Za-z-_]/g;

			function Y(t) {
				return t < 16 ? "0" + t.toString(16) : t.toString(16)
			}

			function z(t, n) {
				var e;
				n = n || 1 / 0;
				for (var r = t.length, i = null, o = [], a = 0; a < r; ++a) {
					if ((e = t.charCodeAt(a)) > 55295 && e < 57344) {
						if (!i) {
							if (e > 56319) {
								(n -= 3) > -1 && o.push(239, 191, 189);
								continue
							}
							if (a + 1 === r) {
								(n -= 3) > -1 && o.push(239, 191, 189);
								continue
							}
							i = e;
							continue
						}
						if (e < 56320) {
							(n -= 3) > -1 && o.push(239, 191, 189), i = e;
							continue
						}
						e = 65536 + (i - 55296 << 10 | e - 56320)
					} else i && (n -= 3) > -1 && o.push(239, 191, 189);
					if (i = null, e < 128) {
						if ((n -= 1) < 0) break;
						o.push(e)
					} else if (e < 2048) {
						if ((n -= 2) < 0) break;
						o.push(e >> 6 | 192, 63 & e | 128)
					} else if (e < 65536) {
						if ((n -= 3) < 0) break;
						o.push(e >> 12 | 224, e >> 6 & 63 | 128, 63 & e | 128)
					} else {
						if (!(e < 1114112)) throw new Error("Invalid code point");
						if ((n -= 4) < 0) break;
						o.push(e >> 18 | 240, e >> 12 & 63 | 128, e >> 6 & 63 | 128, 63 & e |
							128)
					}
				}
				return o
			}

			function F(t) {
				return r.toByteArray(function(t) {
					if ((t = function(t) {
							return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
						}(t).replace(I, "")).length < 2) return "";
					for (; t.length % 4 != 0;) t += "=";
					return t
				}(t))
			}

			function q(t, n, e, r) {
				for (var i = 0; i < r && !(i + e >= n.length || i >= t.length); ++i) n[
					i + e] = t[i];
				return i
			}
		}).call(this, e(14))
	}, function(t, n, e) {
		"use strict";
		var r = function(t, n) {
				return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
			},
			i = function(t) {
				var n;
				return 1 === t.length && (n = t, t = function(t, e) {
					return r(n(t), e)
				}), {
					left: function(n, e, r, i) {
						for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
							var o = r + i >>> 1;
							t(n[o], e) < 0 ? r = o + 1 : i = o
						}
						return r
					},
					right: function(n, e, r, i) {
						for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
							var o = r + i >>> 1;
							t(n[o], e) > 0 ? i = o : r = o + 1
						}
						return r
					}
				}
			};
		var o = i(r),
			a = o.right,
			s = (o.left, a);
		var u = Array.prototype,
			c = (u.slice, u.map, function(t, n, e) {
				t = +t, n = +n, e = (i = arguments.length) < 2 ? (n = t, t = 0, 1) : i <
					3 ? 1 : +e;
				for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(
						i); ++r < i;) o[r] = t + r * e;
				return o
			}),
			h = Math.sqrt(50),
			f = Math.sqrt(10),
			l = Math.sqrt(2),
			p = function(t, n, e) {
				var r, i, o, a, s = -1;
				if (e = +e, (t = +t) === (n = +n) && e > 0) return [t];
				if ((r = n < t) && (i = t, t = n, n = i), 0 === (a = d(t, n, e)) || !
					isFinite(a)) return [];
				if (a > 0)
					for (t = Math.ceil(t / a), n = Math.floor(n / a), o = new Array(i =
							Math.ceil(n - t + 1)); ++s < i;) o[s] = (t + s) * a;
				else
					for (t = Math.floor(t * a), n = Math.ceil(n * a), o = new Array(i =
							Math.ceil(t - n + 1)); ++s < i;) o[s] = (t - s) / a;
				return r && o.reverse(), o
			};

		function d(t, n, e) {
			var r = (n - t) / Math.max(0, e),
				i = Math.floor(Math.log(r) / Math.LN10),
				o = r / Math.pow(10, i);
			return i >= 0 ? (o >= h ? 10 : o >= f ? 5 : o >= l ? 2 : 1) * Math.pow(10,
				i) : -Math.pow(10, -i) / (o >= h ? 10 : o >= f ? 5 : o >= l ? 2 : 1)
		}

		function _(t, n, e) {
			var r = Math.abs(n - t) / Math.max(0, e),
				i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
				o = r / i;
			return o >= h ? i *= 10 : o >= f ? i *= 5 : o >= l && (i *= 2), n < t ? -
				i : i
		}
		var g = function(t) {
			for (var n, e, r, i = t.length, o = -1, a = 0; ++o < i;) a += t[o].length;
			for (e = new Array(a); --i >= 0;)
				for (n = (r = t[i]).length; --n >= 0;) e[--a] = r[n];
			return e
		};
		var y = Array.prototype.slice,
			v = function(t) {
				return t
			},
			m = 1,
			w = 2,
			b = 3,
			x = 4,
			M = 1e-6;

		function T(t) {
			return "translate(" + (t + .5) + ",0)"
		}

		function C(t) {
			return "translate(0," + (t + .5) + ")"
		}

		function N(t) {
			return function(n) {
				return +t(n)
			}
		}

		function A(t) {
			var n = Math.max(0, t.bandwidth() - 1) / 2;
			return t.round() && (n = Math.round(n)),
				function(e) {
					return +t(e) + n
				}
		}

		function E() {
			return !this.__axis
		}

		function S(t, n) {
			var e = [],
				r = null,
				i = null,
				o = 6,
				a = 6,
				s = 3,
				u = t === m || t === x ? -1 : 1,
				c = t === x || t === w ? "x" : "y",
				h = t === m || t === b ? T : C;

			function f(f) {
				var l = null == r ? n.ticks ? n.ticks.apply(n, e) : n.domain() : r,
					p = null == i ? n.tickFormat ? n.tickFormat.apply(n, e) : v : i,
					d = Math.max(o, 0) + s,
					_ = n.range(),
					g = +_[0] + .5,
					y = +_[_.length - 1] + .5,
					T = (n.bandwidth ? A : N)(n.copy()),
					C = f.selection ? f.selection() : f,
					S = C.selectAll(".domain").data([null]),
					k = C.selectAll(".tick").data(l, n).order(),
					U = k.exit(),
					P = k.enter().append("g").attr("class", "tick"),
					R = k.select("line"),
					B = k.select("text");
				S = S.merge(S.enter().insert("path", ".tick").attr("class", "domain").attr(
						"stroke", "currentColor")), k = k.merge(P), R = R.merge(P.append(
						"line").attr("stroke", "currentColor").attr(c + "2", u * o)), B = B.merge(
						P.append("text").attr("fill", "currentColor").attr(c, u * d).attr("dy",
							t === m ? "0em" : t === b ? "0.71em" : "0.32em")), f !== C && (S = S.transition(
							f), k = k.transition(f), R = R.transition(f), B = B.transition(f), U =
						U.transition(f).attr("opacity", M).attr("transform", (function(t) {
							return isFinite(t = T(t)) ? h(t) : this.getAttribute("transform")
						})), P.attr("opacity", M).attr("transform", (function(t) {
							var n = this.parentNode.__axis;
							return h(n && isFinite(n = n(t)) ? n : T(t))
						}))), U.remove(), S.attr("d", t === x || t == w ? a ? "M" + u * a +
						"," + g + "H0.5V" + y + "H" + u * a : "M0.5," + g + "V" + y : a ? "M" +
						g + "," + u * a + "V0.5H" + y + "V" + u * a : "M" + g + ",0.5H" + y),
					k.attr("opacity", 1).attr("transform", (function(t) {
						return h(T(t))
					})), R.attr(c + "2", u * o), B.attr(c, u * d).text(p), C.filter(E).attr(
						"fill", "none").attr("font-size", 10).attr("font-family", "sans-serif")
					.attr("text-anchor", t === w ? "start" : t === x ? "end" : "middle"), C
					.each((function() {
						this.__axis = T
					}))
			}
			return f.scale = function(t) {
				return arguments.length ? (n = t, f) : n
			}, f.ticks = function() {
				return e = y.call(arguments), f
			}, f.tickArguments = function(t) {
				return arguments.length ? (e = null == t ? [] : y.call(t), f) : e.slice()
			}, f.tickValues = function(t) {
				return arguments.length ? (r = null == t ? null : y.call(t), f) : r &&
					r.slice()
			}, f.tickFormat = function(t) {
				return arguments.length ? (i = t, f) : i
			}, f.tickSize = function(t) {
				return arguments.length ? (o = a = +t, f) : o
			}, f.tickSizeInner = function(t) {
				return arguments.length ? (o = +t, f) : o
			}, f.tickSizeOuter = function(t) {
				return arguments.length ? (a = +t, f) : a
			}, f.tickPadding = function(t) {
				return arguments.length ? (s = +t, f) : s
			}, f
		}

		function k(t) {
			return S(x, t)
		}
		var U = {
			value: function() {}
		};

		function P() {
			for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
				if (!(t = arguments[n] + "") || t in r) throw new Error("illegal type: " +
					t);
				r[t] = []
			}
			return new R(r)
		}

		function R(t) {
			this._ = t
		}

		function B(t, n) {
			return t.trim().split(/^|\s+/).map((function(t) {
				var e = "",
					r = t.indexOf(".");
				if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(
						t)) throw new Error("unknown type: " + t);
				return {
					type: t,
					name: e
				}
			}))
		}

		function O(t, n) {
			for (var e, r = 0, i = t.length; r < i; ++r)
				if ((e = t[r]).name === n) return e.value
		}

		function j(t, n, e) {
			for (var r = 0, i = t.length; r < i; ++r)
				if (t[r].name === n) {
					t[r] = U, t = t.slice(0, r).concat(t.slice(r + 1));
					break
				}
			return null != e && t.push({
				name: n,
				value: e
			}), t
		}
		R.prototype = P.prototype = {
			constructor: R,
			on: function(t, n) {
				var e, r = this._,
					i = B(t + "", r),
					o = -1,
					a = i.length;
				if (!(arguments.length < 2)) {
					if (null != n && "function" != typeof n) throw new Error(
						"invalid callback: " + n);
					for (; ++o < a;)
						if (e = (t = i[o]).type) r[e] = j(r[e], t.name, n);
						else if (null == n)
						for (e in r) r[e] = j(r[e], t.name, null);
					return this
				}
				for (; ++o < a;)
					if ((e = (t = i[o]).type) && (e = O(r[e], t.name))) return e
			},
			copy: function() {
				var t = {},
					n = this._;
				for (var e in n) t[e] = n[e].slice();
				return new R(t)
			},
			call: function(t, n) {
				if ((e = arguments.length - 2) > 0)
					for (var e, r, i = new Array(e), o = 0; o < e; ++o) i[o] = arguments[
						o + 2];
				if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
				for (o = 0, e = (r = this._[t]).length; o < e; ++o) r[o].value.apply(n,
					i)
			},
			apply: function(t, n, e) {
				if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
				for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(
					n, e)
			}
		};
		var D = P,
			L = "http://www.w3.org/1999/xhtml",
			I = {
				svg: "http://www.w3.org/2000/svg",
				xhtml: L,
				xlink: "http://www.w3.org/1999/xlink",
				xml: "http://www.w3.org/XML/1998/namespace",
				xmlns: "http://www.w3.org/2000/xmlns/"
			},
			Y = function(t) {
				var n = t += "",
					e = n.indexOf(":");
				return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
					I.hasOwnProperty(n) ? {
						space: I[n],
						local: t
					} : t
			};

		function z(t) {
			return function() {
				var n = this.ownerDocument,
					e = this.namespaceURI;
				return e === L && n.documentElement.namespaceURI === L ? n.createElement(
					t) : n.createElementNS(e, t)
			}
		}

		function F(t) {
			return function() {
				return this.ownerDocument.createElementNS(t.space, t.local)
			}
		}
		var q = function(t) {
			var n = Y(t);
			return (n.local ? F : z)(n)
		};

		function H() {}
		var V = function(t) {
			return null == t ? H : function() {
				return this.querySelector(t)
			}
		};

		function $() {
			return []
		}
		var X = function(t) {
				return null == t ? $ : function() {
					return this.querySelectorAll(t)
				}
			},
			Z = function(t) {
				return function() {
					return this.matches(t)
				}
			},
			J = function(t) {
				return new Array(t.length)
			};

		function W(t, n) {
			this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI,
				this._next = null, this._parent = t, this.__data__ = n
		}
		W.prototype = {
			constructor: W,
			appendChild: function(t) {
				return this._parent.insertBefore(t, this._next)
			},
			insertBefore: function(t, n) {
				return this._parent.insertBefore(t, n)
			},
			querySelector: function(t) {
				return this._parent.querySelector(t)
			},
			querySelectorAll: function(t) {
				return this._parent.querySelectorAll(t)
			}
		};
		var Q = "$";

		function G(t, n, e, r, i, o) {
			for (var a, s = 0, u = n.length, c = o.length; s < c; ++s)(a = n[s]) ? (a
				.__data__ = o[s], r[s] = a) : e[s] = new W(t, o[s]);
			for (; s < u; ++s)(a = n[s]) && (i[s] = a)
		}

		function K(t, n, e, r, i, o, a) {
			var s, u, c, h = {},
				f = n.length,
				l = o.length,
				p = new Array(f);
			for (s = 0; s < f; ++s)(u = n[s]) && (p[s] = c = Q + a.call(u, u.__data__,
				s, n), c in h ? i[s] = u : h[c] = u);
			for (s = 0; s < l; ++s)(u = h[c = Q + a.call(t, o[s], s, o)]) ? (r[s] = u,
				u.__data__ = o[s], h[c] = null) : e[s] = new W(t, o[s]);
			for (s = 0; s < f; ++s)(u = n[s]) && h[p[s]] === u && (i[s] = u)
		}

		function tt(t, n) {
			return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
		}

		function nt(t) {
			return function() {
				this.removeAttribute(t)
			}
		}

		function et(t) {
			return function() {
				this.removeAttributeNS(t.space, t.local)
			}
		}

		function rt(t, n) {
			return function() {
				this.setAttribute(t, n)
			}
		}

		function it(t, n) {
			return function() {
				this.setAttributeNS(t.space, t.local, n)
			}
		}

		function ot(t, n) {
			return function() {
				var e = n.apply(this, arguments);
				null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
			}
		}

		function at(t, n) {
			return function() {
				var e = n.apply(this, arguments);
				null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(
					t.space, t.local, e)
			}
		}
		var st = function(t) {
			return t.ownerDocument && t.ownerDocument.defaultView || t.document && t ||
				t.defaultView
		};

		function ut(t) {
			return function() {
				this.style.removeProperty(t)
			}
		}

		function ct(t, n, e) {
			return function() {
				this.style.setProperty(t, n, e)
			}
		}

		function ht(t, n, e) {
			return function() {
				var r = n.apply(this, arguments);
				null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r,
					e)
			}
		}

		function ft(t, n) {
			return t.style.getPropertyValue(n) || st(t).getComputedStyle(t, null).getPropertyValue(
				n)
		}

		function lt(t) {
			return function() {
				delete this[t]
			}
		}

		function pt(t, n) {
			return function() {
				this[t] = n
			}
		}

		function dt(t, n) {
			return function() {
				var e = n.apply(this, arguments);
				null == e ? delete this[t] : this[t] = e
			}
		}

		function _t(t) {
			return t.trim().split(/^|\s+/)
		}

		function gt(t) {
			return t.classList || new yt(t)
		}

		function yt(t) {
			this._node = t, this._names = _t(t.getAttribute("class") || "")
		}

		function vt(t, n) {
			for (var e = gt(t), r = -1, i = n.length; ++r < i;) e.add(n[r])
		}

		function mt(t, n) {
			for (var e = gt(t), r = -1, i = n.length; ++r < i;) e.remove(n[r])
		}

		function wt(t) {
			return function() {
				vt(this, t)
			}
		}

		function bt(t) {
			return function() {
				mt(this, t)
			}
		}

		function xt(t, n) {
			return function() {
				(n.apply(this, arguments) ? vt : mt)(this, t)
			}
		}
		yt.prototype = {
			add: function(t) {
				this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute(
					"class", this._names.join(" ")))
			},
			remove: function(t) {
				var n = this._names.indexOf(t);
				n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class",
					this._names.join(" ")))
			},
			contains: function(t) {
				return this._names.indexOf(t) >= 0
			}
		};

		function Mt() {
			this.textContent = ""
		}

		function Tt(t) {
			return function() {
				this.textContent = t
			}
		}

		function Ct(t) {
			return function() {
				var n = t.apply(this, arguments);
				this.textContent = null == n ? "" : n
			}
		}

		function Nt() {
			this.innerHTML = ""
		}

		function At(t) {
			return function() {
				this.innerHTML = t
			}
		}

		function Et(t) {
			return function() {
				var n = t.apply(this, arguments);
				this.innerHTML = null == n ? "" : n
			}
		}

		function St() {
			this.nextSibling && this.parentNode.appendChild(this)
		}

		function kt() {
			this.previousSibling && this.parentNode.insertBefore(this, this.parentNode
				.firstChild)
		}

		function Ut() {
			return null
		}

		function Pt() {
			var t = this.parentNode;
			t && t.removeChild(this)
		}

		function Rt() {
			return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling)
		}

		function Bt() {
			return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling)
		}
		var Ot = {},
			jt = null;
		"undefined" != typeof document && ("onmouseenter" in document.documentElement ||
			(Ot = {
				mouseenter: "mouseover",
				mouseleave: "mouseout"
			}));

		function Dt(t, n, e) {
			return t = Lt(t, n, e),
				function(n) {
					var e = n.relatedTarget;
					e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this,
						n)
				}
		}

		function Lt(t, n, e) {
			return function(r) {
				var i = jt;
				jt = r;
				try {
					t.call(this, this.__data__, n, e)
				} finally {
					jt = i
				}
			}
		}

		function It(t) {
			return t.trim().split(/^|\s+/).map((function(t) {
				var n = "",
					e = t.indexOf(".");
				return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), {
					type: t,
					name: n
				}
			}))
		}

		function Yt(t) {
			return function() {
				var n = this.__on;
				if (n) {
					for (var e, r = 0, i = -1, o = n.length; r < o; ++r) e = n[r], t.type &&
						e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(
							e.type, e.listener, e.capture);
					++i ? n.length = i : delete this.__on
				}
			}
		}

		function zt(t, n, e) {
			var r = Ot.hasOwnProperty(t.type) ? Dt : Lt;
			return function(i, o, a) {
				var s, u = this.__on,
					c = r(n, o, a);
				if (u)
					for (var h = 0, f = u.length; h < f; ++h)
						if ((s = u[h]).type === t.type && s.name === t.name) return this.removeEventListener(
							s.type, s.listener, s.capture), this.addEventListener(s.type, s.listener =
							c, s.capture = e), void(s.value = n);
				this.addEventListener(t.type, c, e), s = {
					type: t.type,
					name: t.name,
					value: n,
					listener: c,
					capture: e
				}, u ? u.push(s) : this.__on = [s]
			}
		}

		function Ft(t, n, e) {
			var r = st(t),
				i = r.CustomEvent;
			"function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent(
					"Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) :
				i.initEvent(n, !1, !1)), t.dispatchEvent(i)
		}

		function qt(t, n) {
			return function() {
				return Ft(this, t, n)
			}
		}

		function Ht(t, n) {
			return function() {
				return Ft(this, t, n.apply(this, arguments))
			}
		}
		var Vt = [null];

		function $t(t, n) {
			this._groups = t, this._parents = n
		}

		function Xt() {
			return new $t([
				[document.documentElement]
			], Vt)
		}
		$t.prototype = Xt.prototype = {
			constructor: $t,
			select: function(t) {
				"function" != typeof t && (t = V(t));
				for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i <
					e; ++i)
					for (var o, a, s = n[i], u = s.length, c = r[i] = new Array(u), h = 0; h <
						u; ++h)(o = s[h]) && (a = t.call(o, o.__data__, h, s)) && (
						"__data__" in o && (a.__data__ = o.__data__), c[h] = a);
				return new $t(r, this._parents)
			},
			selectAll: function(t) {
				"function" != typeof t && (t = X(t));
				for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++
					o)
					for (var a, s = n[o], u = s.length, c = 0; c < u; ++c)(a = s[c]) && (
						r.push(t.call(a, a.__data__, c, s)), i.push(a));
				return new $t(r, i)
			},
			filter: function(t) {
				"function" != typeof t && (t = Z(t));
				for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i <
					e; ++i)
					for (var o, a = n[i], s = a.length, u = r[i] = [], c = 0; c < s; ++c)
						(o = a[c]) && t.call(o, o.__data__, c, a) && u.push(o);
				return new $t(r, this._parents)
			},
			data: function(t, n) {
				if (!t) return d = new Array(this.size()), h = -1, this.each((function(
					t) {
					d[++h] = t
				})), d;
				var e, r = n ? K : G,
					i = this._parents,
					o = this._groups;
				"function" != typeof t && (e = t, t = function() {
					return e
				});
				for (var a = o.length, s = new Array(a), u = new Array(a), c = new Array(
						a), h = 0; h < a; ++h) {
					var f = i[h],
						l = o[h],
						p = l.length,
						d = t.call(f, f && f.__data__, h, i),
						_ = d.length,
						g = u[h] = new Array(_),
						y = s[h] = new Array(_);
					r(f, l, g, y, c[h] = new Array(p), d, n);
					for (var v, m, w = 0, b = 0; w < _; ++w)
						if (v = g[w]) {
							for (w >= b && (b = w + 1); !(m = y[b]) && ++b < _;);
							v._next = m || null
						}
				}
				return (s = new $t(s, i))._enter = u, s._exit = c, s
			},
			enter: function() {
				return new $t(this._enter || this._groups.map(J), this._parents)
			},
			exit: function() {
				return new $t(this._exit || this._groups.map(J), this._parents)
			},
			join: function(t, n, e) {
				var r = this.enter(),
					i = this,
					o = this.exit();
				return r = "function" == typeof t ? t(r) : r.append(t + ""), null != n &&
					(i = n(i)), null == e ? o.remove() : e(o), r && i ? r.merge(i).order() :
					i
			},
			merge: function(t) {
				for (var n = this._groups, e = t._groups, r = n.length, i = e.length,
						o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
					for (var u, c = n[s], h = e[s], f = c.length, l = a[s] = new Array(f),
							p = 0; p < f; ++p)(u = c[p] || h[p]) && (l[p] = u);
				for (; s < r; ++s) a[s] = n[s];
				return new $t(a, this._parents)
			},
			order: function() {
				for (var t = this._groups, n = -1, e = t.length; ++n < e;)
					for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0;)(r = i[o]) &&
						(a && 4 ^ r.compareDocumentPosition(a) && a.parentNode.insertBefore(
							r, a), a = r);
				return this
			},
			sort: function(t) {
				function n(n, e) {
					return n && e ? t(n.__data__, e.__data__) : !n - !e
				}
				t || (t = tt);
				for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o <
					r; ++o) {
					for (var a, s = e[o], u = s.length, c = i[o] = new Array(u), h = 0; h <
						u; ++h)(a = s[h]) && (c[h] = a);
					c.sort(n)
				}
				return new $t(i, this._parents).order()
			},
			call: function() {
				var t = arguments[0];
				return arguments[0] = this, t.apply(null, arguments), this
			},
			nodes: function() {
				var t = new Array(this.size()),
					n = -1;
				return this.each((function() {
					t[++n] = this
				})), t
			},
			node: function() {
				for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
					for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
						var a = r[i];
						if (a) return a
					}
				return null
			},
			size: function() {
				var t = 0;
				return this.each((function() {
					++t
				})), t
			},
			empty: function() {
				return !this.node()
			},
			each: function(t) {
				for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
					for (var i, o = n[e], a = 0, s = o.length; a < s; ++a)(i = o[a]) && t
						.call(i, i.__data__, a, o);
				return this
			},
			attr: function(t, n) {
				var e = Y(t);
				if (arguments.length < 2) {
					var r = this.node();
					return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(
						e)
				}
				return this.each((null == n ? e.local ? et : nt : "function" == typeof n ?
					e.local ? at : ot : e.local ? it : rt)(e, n))
			},
			style: function(t, n, e) {
				return arguments.length > 1 ? this.each((null == n ? ut : "function" ==
					typeof n ? ht : ct)(t, n, null == e ? "" : e)) : ft(this.node(), t)
			},
			property: function(t, n) {
				return arguments.length > 1 ? this.each((null == n ? lt : "function" ==
					typeof n ? dt : pt)(t, n)) : this.node()[t]
			},
			classed: function(t, n) {
				var e = _t(t + "");
				if (arguments.length < 2) {
					for (var r = gt(this.node()), i = -1, o = e.length; ++i < o;)
						if (!r.contains(e[i])) return !1;
					return !0
				}
				return this.each(("function" == typeof n ? xt : n ? wt : bt)(e, n))
			},
			text: function(t) {
				return arguments.length ? this.each(null == t ? Mt : ("function" ==
					typeof t ? Ct : Tt)(t)) : this.node().textContent
			},
			html: function(t) {
				return arguments.length ? this.each(null == t ? Nt : ("function" ==
					typeof t ? Et : At)(t)) : this.node().innerHTML
			},
			raise: function() {
				return this.each(St)
			},
			lower: function() {
				return this.each(kt)
			},
			append: function(t) {
				var n = "function" == typeof t ? t : q(t);
				return this.select((function() {
					return this.appendChild(n.apply(this, arguments))
				}))
			},
			insert: function(t, n) {
				var e = "function" == typeof t ? t : q(t),
					r = null == n ? Ut : "function" == typeof n ? n : V(n);
				return this.select((function() {
					return this.insertBefore(e.apply(this, arguments), r.apply(this,
						arguments) || null)
				}))
			},
			remove: function() {
				return this.each(Pt)
			},
			clone: function(t) {
				return this.select(t ? Bt : Rt)
			},
			datum: function(t) {
				return arguments.length ? this.property("__data__", t) : this.node().__data__
			},
			on: function(t, n, e) {
				var r, i, o = It(t + ""),
					a = o.length;
				if (!(arguments.length < 2)) {
					for (s = n ? zt : Yt, null == e && (e = !1), r = 0; r < a; ++r) this.each(
						s(o[r], n, e));
					return this
				}
				var s = this.node().__on;
				if (s)
					for (var u, c = 0, h = s.length; c < h; ++c)
						for (r = 0, u = s[c]; r < a; ++r)
							if ((i = o[r]).type === u.type && i.name === u.name) return u.value
			},
			dispatch: function(t, n) {
				return this.each(("function" == typeof n ? Ht : qt)(t, n))
			}
		};
		var Zt = Xt,
			Jt = function(t) {
				return "string" == typeof t ? new $t([
					[document.querySelector(t)]
				], [document.documentElement]) : new $t([
					[t]
				], Vt)
			},
			Wt = 0;

		function Qt() {
			this._ = "@" + (++Wt).toString(36)
		}
		Qt.prototype = function() {
			return new Qt
		}.prototype = {
			constructor: Qt,
			get: function(t) {
				for (var n = this._; !(n in t);)
					if (!(t = t.parentNode)) return;
				return t[n]
			},
			set: function(t, n) {
				return t[this._] = n
			},
			remove: function(t) {
				return this._ in t && delete t[this._]
			},
			toString: function() {
				return this._
			}
		};

		function Gt(t, n, e, r, i, o, a, s, u, c) {
			this.target = t, this.type = n, this.subject = e, this.identifier = r,
				this.active = i, this.x = o, this.y = a, this.dx = s, this.dy = u, this._ =
				c
		}
		Gt.prototype.on = function() {
			var t = this._.on.apply(this._, arguments);
			return t === this._ ? this : t
		};
		var Kt = function(t, n, e) {
			t.prototype = n.prototype = e, e.constructor = t
		};

		function tn(t, n) {
			var e = Object.create(t.prototype);
			for (var r in n) e[r] = n[r];
			return e
		}

		function nn() {}
		var en = "\\s*([+-]?\\d+)\\s*",
			rn = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
			on = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
			an = /^#([0-9a-f]{3,8})$/,
			sn = new RegExp("^rgb\\(" + [en, en, en] + "\\)$"),
			un = new RegExp("^rgb\\(" + [on, on, on] + "\\)$"),
			cn = new RegExp("^rgba\\(" + [en, en, en, rn] + "\\)$"),
			hn = new RegExp("^rgba\\(" + [on, on, on, rn] + "\\)$"),
			fn = new RegExp("^hsl\\(" + [rn, on, on] + "\\)$"),
			ln = new RegExp("^hsla\\(" + [rn, on, on, rn] + "\\)$"),
			pn = {
				aliceblue: 15792383,
				antiquewhite: 16444375,
				aqua: 65535,
				aquamarine: 8388564,
				azure: 15794175,
				beige: 16119260,
				bisque: 16770244,
				black: 0,
				blanchedalmond: 16772045,
				blue: 255,
				blueviolet: 9055202,
				brown: 10824234,
				burlywood: 14596231,
				cadetblue: 6266528,
				chartreuse: 8388352,
				chocolate: 13789470,
				coral: 16744272,
				cornflowerblue: 6591981,
				cornsilk: 16775388,
				crimson: 14423100,
				cyan: 65535,
				darkblue: 139,
				darkcyan: 35723,
				darkgoldenrod: 12092939,
				darkgray: 11119017,
				darkgreen: 25600,
				darkgrey: 11119017,
				darkkhaki: 12433259,
				darkmagenta: 9109643,
				darkolivegreen: 5597999,
				darkorange: 16747520,
				darkorchid: 10040012,
				darkred: 9109504,
				darksalmon: 15308410,
				darkseagreen: 9419919,
				darkslateblue: 4734347,
				darkslategray: 3100495,
				darkslategrey: 3100495,
				darkturquoise: 52945,
				darkviolet: 9699539,
				deeppink: 16716947,
				deepskyblue: 49151,
				dimgray: 6908265,
				dimgrey: 6908265,
				dodgerblue: 2003199,
				firebrick: 11674146,
				floralwhite: 16775920,
				forestgreen: 2263842,
				fuchsia: 16711935,
				gainsboro: 14474460,
				ghostwhite: 16316671,
				gold: 16766720,
				goldenrod: 14329120,
				gray: 8421504,
				green: 32768,
				greenyellow: 11403055,
				grey: 8421504,
				honeydew: 15794160,
				hotpink: 16738740,
				indianred: 13458524,
				indigo: 4915330,
				ivory: 16777200,
				khaki: 15787660,
				lavender: 15132410,
				lavenderblush: 16773365,
				lawngreen: 8190976,
				lemonchiffon: 16775885,
				lightblue: 11393254,
				lightcoral: 15761536,
				lightcyan: 14745599,
				lightgoldenrodyellow: 16448210,
				lightgray: 13882323,
				lightgreen: 9498256,
				lightgrey: 13882323,
				lightpink: 16758465,
				lightsalmon: 16752762,
				lightseagreen: 2142890,
				lightskyblue: 8900346,
				lightslategray: 7833753,
				lightslategrey: 7833753,
				lightsteelblue: 11584734,
				lightyellow: 16777184,
				lime: 65280,
				limegreen: 3329330,
				linen: 16445670,
				magenta: 16711935,
				maroon: 8388608,
				mediumaquamarine: 6737322,
				mediumblue: 205,
				mediumorchid: 12211667,
				mediumpurple: 9662683,
				mediumseagreen: 3978097,
				mediumslateblue: 8087790,
				mediumspringgreen: 64154,
				mediumturquoise: 4772300,
				mediumvioletred: 13047173,
				midnightblue: 1644912,
				mintcream: 16121850,
				mistyrose: 16770273,
				moccasin: 16770229,
				navajowhite: 16768685,
				navy: 128,
				oldlace: 16643558,
				olive: 8421376,
				olivedrab: 7048739,
				orange: 16753920,
				orangered: 16729344,
				orchid: 14315734,
				palegoldenrod: 15657130,
				palegreen: 10025880,
				paleturquoise: 11529966,
				palevioletred: 14381203,
				papayawhip: 16773077,
				peachpuff: 16767673,
				peru: 13468991,
				pink: 16761035,
				plum: 14524637,
				powderblue: 11591910,
				purple: 8388736,
				rebeccapurple: 6697881,
				red: 16711680,
				rosybrown: 12357519,
				royalblue: 4286945,
				saddlebrown: 9127187,
				salmon: 16416882,
				sandybrown: 16032864,
				seagreen: 3050327,
				seashell: 16774638,
				sienna: 10506797,
				silver: 12632256,
				skyblue: 8900331,
				slateblue: 6970061,
				slategray: 7372944,
				slategrey: 7372944,
				snow: 16775930,
				springgreen: 65407,
				steelblue: 4620980,
				tan: 13808780,
				teal: 32896,
				thistle: 14204888,
				tomato: 16737095,
				turquoise: 4251856,
				violet: 15631086,
				wheat: 16113331,
				white: 16777215,
				whitesmoke: 16119285,
				yellow: 16776960,
				yellowgreen: 10145074
			};

		function dn() {
			return this.rgb().formatHex()
		}

		function _n() {
			return this.rgb().formatRgb()
		}

		function gn(t) {
			var n, e;
			return t = (t + "").trim().toLowerCase(), (n = an.exec(t)) ? (e = n[1].length,
					n = parseInt(n[1], 16), 6 === e ? yn(n) : 3 === e ? new bn(n >> 8 & 15 |
						n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1) : 8 ===
					e ? new bn(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (255 & n) / 255) :
					4 === e ? new bn(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 &
						240, n >> 4 & 15 | 240 & n, ((15 & n) << 4 | 15 & n) / 255) : null) :
				(n = sn.exec(t)) ? new bn(n[1], n[2], n[3], 1) : (n = un.exec(t)) ? new bn(
					255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = cn.exec(
					t)) ? vn(n[1], n[2], n[3], n[4]) : (n = hn.exec(t)) ? vn(255 * n[1] /
					100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = fn.exec(t)) ? Cn(
					n[1], n[2] / 100, n[3] / 100, 1) : (n = ln.exec(t)) ? Cn(n[1], n[2] /
					100, n[3] / 100, n[4]) : pn.hasOwnProperty(t) ? yn(pn[t]) :
				"transparent" === t ? new bn(NaN, NaN, NaN, 0) : null
		}

		function yn(t) {
			return new bn(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
		}

		function vn(t, n, e, r) {
			return r <= 0 && (t = n = e = NaN), new bn(t, n, e, r)
		}

		function mn(t) {
			return t instanceof nn || (t = gn(t)), t ? new bn((t = t.rgb()).r, t.g, t
				.b, t.opacity) : new bn
		}

		function wn(t, n, e, r) {
			return 1 === arguments.length ? mn(t) : new bn(t, n, e, null == r ? 1 : r)
		}

		function bn(t, n, e, r) {
			this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
		}

		function xn() {
			return "#" + Tn(this.r) + Tn(this.g) + Tn(this.b)
		}

		function Mn() {
			var t = this.opacity;
			return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" :
					"rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " +
				Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0,
					Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t +
					")")
		}

		function Tn(t) {
			return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" :
				"") + t.toString(16)
		}

		function Cn(t, n, e, r) {
			return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 &&
				(t = NaN), new En(t, n, e, r)
		}

		function Nn(t) {
			if (t instanceof En) return new En(t.h, t.s, t.l, t.opacity);
			if (t instanceof nn || (t = gn(t)), !t) return new En;
			if (t instanceof En) return t;
			var n = (t = t.rgb()).r / 255,
				e = t.g / 255,
				r = t.b / 255,
				i = Math.min(n, e, r),
				o = Math.max(n, e, r),
				a = NaN,
				s = o - i,
				u = (o + i) / 2;
			return s ? (a = n === o ? (e - r) / s + 6 * (e < r) : e === o ? (r - n) /
					s + 2 : (n - e) / s + 4, s /= u < .5 ? o + i : 2 - o - i, a *= 60) : s =
				u > 0 && u < 1 ? 0 : a, new En(a, s, u, t.opacity)
		}

		function An(t, n, e, r) {
			return 1 === arguments.length ? Nn(t) : new En(t, n, e, null == r ? 1 : r)
		}

		function En(t, n, e, r) {
			this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
		}

		function Sn(t, n, e) {
			return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n +
				(e - n) * (240 - t) / 60 : n)
		}

		function kn(t, n, e, r, i) {
			var o = t * t,
				a = o * t;
			return ((1 - 3 * t + 3 * o - a) * n + (4 - 6 * o + 3 * a) * e + (1 + 3 *
				t + 3 * o - 3 * a) * r + a * i) / 6
		}
		Kt(nn, gn, {
			copy: function(t) {
				return Object.assign(new this.constructor, this, t)
			},
			displayable: function() {
				return this.rgb().displayable()
			},
			hex: dn,
			formatHex: dn,
			formatHsl: function() {
				return Nn(this).formatHsl()
			},
			formatRgb: _n,
			toString: _n
		}), Kt(bn, wn, tn(nn, {
			brighter: function(t) {
				return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new bn(this.r *
					t, this.g * t, this.b * t, this.opacity)
			},
			darker: function(t) {
				return t = null == t ? .7 : Math.pow(.7, t), new bn(this.r * t, this
					.g * t, this.b * t, this.opacity)
			},
			rgb: function() {
				return this
			},
			displayable: function() {
				return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g <
					255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity &&
					this.opacity <= 1
			},
			hex: xn,
			formatHex: xn,
			formatRgb: Mn,
			toString: Mn
		})), Kt(En, An, tn(nn, {
			brighter: function(t) {
				return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new En(this.h,
					this.s, this.l * t, this.opacity)
			},
			darker: function(t) {
				return t = null == t ? .7 : Math.pow(.7, t), new En(this.h, this.s,
					this.l * t, this.opacity)
			},
			rgb: function() {
				var t = this.h % 360 + 360 * (this.h < 0),
					n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
					e = this.l,
					r = e + (e < .5 ? e : 1 - e) * n,
					i = 2 * e - r;
				return new bn(Sn(t >= 240 ? t - 240 : t + 120, i, r), Sn(t, i, r),
					Sn(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
			},
			displayable: function() {
				return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l &&
					this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
			},
			formatHsl: function() {
				var t = this.opacity;
				return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ?
						"hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) +
					"%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")")
			}
		}));
		var Un = function(t) {
			return function() {
				return t
			}
		};

		function Pn(t, n) {
			return function(e) {
				return t + e * n
			}
		}

		function Rn(t, n) {
			var e = n - t;
			return e ? Pn(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) :
				Un(isNaN(t) ? n : t)
		}

		function Bn(t) {
			return 1 == (t = +t) ? On : function(n, e) {
				return e - n ? function(t, n, e) {
					return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e,
						function(r) {
							return Math.pow(t + r * n, e)
						}
				}(n, e, t) : Un(isNaN(n) ? e : n)
			}
		}

		function On(t, n) {
			var e = n - t;
			return e ? Pn(t, e) : Un(isNaN(t) ? n : t)
		}
		var jn = function t(n) {
			var e = Bn(n);

			function r(t, n) {
				var r = e((t = wn(t)).r, (n = wn(n)).r),
					i = e(t.g, n.g),
					o = e(t.b, n.b),
					a = On(t.opacity, n.opacity);
				return function(n) {
					return t.r = r(n), t.g = i(n), t.b = o(n), t.opacity = a(n), t + ""
				}
			}
			return r.gamma = t, r
		}(1);

		function Dn(t) {
			return function(n) {
				var e, r, i = n.length,
					o = new Array(i),
					a = new Array(i),
					s = new Array(i);
				for (e = 0; e < i; ++e) r = wn(n[e]), o[e] = r.r || 0, a[e] = r.g || 0,
					s[e] = r.b || 0;
				return o = t(o), a = t(a), s = t(s), r.opacity = 1,
					function(t) {
						return r.r = o(t), r.g = a(t), r.b = s(t), r + ""
					}
			}
		}
		Dn((function(t) {
			var n = t.length - 1;
			return function(e) {
				var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, n - 1) : Math.floor(e * n),
					i = t[r],
					o = t[r + 1],
					a = r > 0 ? t[r - 1] : 2 * i - o,
					s = r < n - 1 ? t[r + 2] : 2 * o - i;
				return kn((e - r / n) * n, a, i, o, s)
			}
		})), Dn((function(t) {
			var n = t.length;
			return function(e) {
				var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
					i = t[(r + n - 1) % n],
					o = t[r % n],
					a = t[(r + 1) % n],
					s = t[(r + 2) % n];
				return kn((e - r / n) * n, i, o, a, s)
			}
		}));
		var Ln = function(t, n) {
				var e, r = n ? n.length : 0,
					i = t ? Math.min(r, t.length) : 0,
					o = new Array(i),
					a = new Array(r);
				for (e = 0; e < i; ++e) o[e] = Jn(t[e], n[e]);
				for (; e < r; ++e) a[e] = n[e];
				return function(t) {
					for (e = 0; e < i; ++e) a[e] = o[e](t);
					return a
				}
			},
			In = function(t, n) {
				var e = new Date;
				return n -= t = +t,
					function(r) {
						return e.setTime(t + n * r), e
					}
			},
			Yn = function(t, n) {
				return n -= t = +t,
					function(e) {
						return t + n * e
					}
			},
			zn = function(t, n) {
				var e, r = {},
					i = {};
				for (e in null !== t && "object" == typeof t || (t = {}), null !== n &&
					"object" == typeof n || (n = {}), n) e in t ? r[e] = Jn(t[e], n[e]) : i[
					e] = n[e];
				return function(t) {
					for (e in r) i[e] = r[e](t);
					return i
				}
			},
			Fn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
			qn = new RegExp(Fn.source, "g");
		var Hn, Vn, $n, Xn, Zn = function(t, n) {
				var e, r, i, o = Fn.lastIndex = qn.lastIndex = 0,
					a = -1,
					s = [],
					u = [];
				for (t += "", n += "";
					(e = Fn.exec(t)) && (r = qn.exec(n));)(i = r.index) > o && (i = n.slice(
						o, i), s[a] ? s[a] += i : s[++a] = i), (e = e[0]) === (r = r[0]) ? s[a] ?
					s[a] += r : s[++a] = r : (s[++a] = null, u.push({
						i: a,
						x: Yn(e, r)
					})), o = qn.lastIndex;
				return o < n.length && (i = n.slice(o), s[a] ? s[a] += i : s[++a] = i),
					s.length < 2 ? u[0] ? function(t) {
						return function(n) {
							return t(n) + ""
						}
					}(u[0].x) : function(t) {
						return function() {
							return t
						}
					}(n) : (n = u.length, function(t) {
						for (var e, r = 0; r < n; ++r) s[(e = u[r]).i] = e.x(t);
						return s.join("")
					})
			},
			Jn = function(t, n) {
				var e, r = typeof n;
				return null == n || "boolean" === r ? Un(n) : ("number" === r ? Yn :
					"string" === r ? (e = gn(n)) ? (n = e, jn) : Zn : n instanceof gn ? jn :
					n instanceof Date ? In : Array.isArray(n) ? Ln : "function" != typeof n
					.valueOf && "function" != typeof n.toString || isNaN(n) ? zn : Yn)(t,
					n)
			},
			Wn = function(t, n) {
				return n -= t = +t,
					function(e) {
						return Math.round(t + n * e)
					}
			},
			Qn = 180 / Math.PI,
			Gn = {
				translateX: 0,
				translateY: 0,
				rotate: 0,
				skewX: 0,
				scaleX: 1,
				scaleY: 1
			},
			Kn = function(t, n, e, r, i, o) {
				var a, s, u;
				return (a = Math.sqrt(t * t + n * n)) && (t /= a, n /= a), (u = t * e +
						n * r) && (e -= t * u, r -= n * u), (s = Math.sqrt(e * e + r * r)) &&
					(e /= s, r /= s, u /= s), t * r < n * e && (t = -t, n = -n, u = -u, a = -
						a), {
						translateX: i,
						translateY: o,
						rotate: Math.atan2(n, t) * Qn,
						skewX: Math.atan(u) * Qn,
						scaleX: a,
						scaleY: s
					}
			};

		function te(t, n, e, r) {
			function i(t) {
				return t.length ? t.pop() + " " : ""
			}
			return function(o, a) {
				var s = [],
					u = [];
				return o = t(o), a = t(a),
					function(t, r, i, o, a, s) {
						if (t !== i || r !== o) {
							var u = a.push("translate(", null, n, null, e);
							s.push({
								i: u - 4,
								x: Yn(t, i)
							}, {
								i: u - 2,
								x: Yn(r, o)
							})
						} else(i || o) && a.push("translate(" + i + n + o + e)
					}(o.translateX, o.translateY, a.translateX, a.translateY, s, u),
					function(t, n, e, o) {
						t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({
							i: e.push(i(e) + "rotate(", null, r) - 2,
							x: Yn(t, n)
						})) : n && e.push(i(e) + "rotate(" + n + r)
					}(o.rotate, a.rotate, s, u),
					function(t, n, e, o) {
						t !== n ? o.push({
							i: e.push(i(e) + "skewX(", null, r) - 2,
							x: Yn(t, n)
						}) : n && e.push(i(e) + "skewX(" + n + r)
					}(o.skewX, a.skewX, s, u),
					function(t, n, e, r, o, a) {
						if (t !== e || n !== r) {
							var s = o.push(i(o) + "scale(", null, ",", null, ")");
							a.push({
								i: s - 4,
								x: Yn(t, e)
							}, {
								i: s - 2,
								x: Yn(n, r)
							})
						} else 1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r +
							")")
					}(o.scaleX, o.scaleY, a.scaleX, a.scaleY, s, u), o = a = null,
					function(t) {
						for (var n, e = -1, r = u.length; ++e < r;) s[(n = u[e]).i] = n.x(t);
						return s.join("")
					}
			}
		}
		var ne = te((function(t) {
				return "none" === t ? Gn : (Hn || (Hn = document.createElement("DIV"),
						Vn = document.documentElement, $n = document.defaultView), Hn.style
					.transform = t, t = $n.getComputedStyle(Vn.appendChild(Hn), null).getPropertyValue(
						"transform"), Vn.removeChild(Hn), t = t.slice(7, -1).split(","), Kn(+
						t[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
			}), "px, ", "px)", "deg)"),
			ee = te((function(t) {
				return null == t ? Gn : (Xn || (Xn = document.createElementNS(
					"http://www.w3.org/2000/svg", "g")), Xn.setAttribute("transform", t), (
					t = Xn.transform.baseVal.consolidate()) ? (t = t.matrix, Kn(t.a, t.b,
					t.c, t.d, t.e, t.f)) : Gn)
			}), ", ", ")", ")");
		Math.SQRT2;

		function re(t) {
			return function(n, e) {
				var r = t((n = An(n)).h, (e = An(e)).h),
					i = On(n.s, e.s),
					o = On(n.l, e.l),
					a = On(n.opacity, e.opacity);
				return function(t) {
					return n.h = r(t), n.s = i(t), n.l = o(t), n.opacity = a(t), n + ""
				}
			}
		}
		re(Rn), re(On);
		var ie = Math.PI / 180,
			oe = 180 / Math.PI,
			ae = .96422,
			se = 1,
			ue = .82521,
			ce = 4 / 29,
			he = 6 / 29,
			fe = 3 * he * he,
			le = he * he * he;

		function pe(t) {
			if (t instanceof _e) return new _e(t.l, t.a, t.b, t.opacity);
			if (t instanceof xe) return Me(t);
			t instanceof bn || (t = mn(t));
			var n, e, r = me(t.r),
				i = me(t.g),
				o = me(t.b),
				a = ge((.2225045 * r + .7168786 * i + .0606169 * o) / se);
			return r === i && i === o ? n = e = a : (n = ge((.4360747 * r + .3850649 *
				i + .1430804 * o) / ae), e = ge((.0139322 * r + .0971045 * i + .7141733 *
				o) / ue)), new _e(116 * a - 16, 500 * (n - a), 200 * (a - e), t.opacity)
		}

		function de(t, n, e, r) {
			return 1 === arguments.length ? pe(t) : new _e(t, n, e, null == r ? 1 : r)
		}

		function _e(t, n, e, r) {
			this.l = +t, this.a = +n, this.b = +e, this.opacity = +r
		}

		function ge(t) {
			return t > le ? Math.pow(t, 1 / 3) : t / fe + ce
		}

		function ye(t) {
			return t > he ? t * t * t : fe * (t - ce)
		}

		function ve(t) {
			return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) -
				.055)
		}

		function me(t) {
			return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055,
				2.4)
		}

		function we(t) {
			if (t instanceof xe) return new xe(t.h, t.c, t.l, t.opacity);
			if (t instanceof _e || (t = pe(t)), 0 === t.a && 0 === t.b) return new xe(
				NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
			var n = Math.atan2(t.b, t.a) * oe;
			return new xe(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l,
				t.opacity)
		}

		function be(t, n, e, r) {
			return 1 === arguments.length ? we(t) : new xe(t, n, e, null == r ? 1 : r)
		}

		function xe(t, n, e, r) {
			this.h = +t, this.c = +n, this.l = +e, this.opacity = +r
		}

		function Me(t) {
			if (isNaN(t.h)) return new _e(t.l, 0, 0, t.opacity);
			var n = t.h * ie;
			return new _e(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity)
		}

		function Te(t) {
			return function(n, e) {
				var r = t((n = be(n)).h, (e = be(e)).h),
					i = On(n.c, e.c),
					o = On(n.l, e.l),
					a = On(n.opacity, e.opacity);
				return function(t) {
					return n.h = r(t), n.c = i(t), n.l = o(t), n.opacity = a(t), n + ""
				}
			}
		}
		Kt(_e, de, tn(nn, {
			brighter: function(t) {
				return new _e(this.l + 18 * (null == t ? 1 : t), this.a, this.b,
					this.opacity)
			},
			darker: function(t) {
				return new _e(this.l - 18 * (null == t ? 1 : t), this.a, this.b,
					this.opacity)
			},
			rgb: function() {
				var t = (this.l + 16) / 116,
					n = isNaN(this.a) ? t : t + this.a / 500,
					e = isNaN(this.b) ? t : t - this.b / 200;
				return new bn(ve(3.1338561 * (n = ae * ye(n)) - 1.6168667 * (t = se *
					ye(t)) - .4906146 * (e = ue * ye(e))), ve(-.9787684 * n +
					1.9161415 * t + .033454 * e), ve(.0719453 * n - .2289914 * t +
					1.4052427 * e), this.opacity)
			}
		})), Kt(xe, be, tn(nn, {
			brighter: function(t) {
				return new xe(this.h, this.c, this.l + 18 * (null == t ? 1 : t),
					this.opacity)
			},
			darker: function(t) {
				return new xe(this.h, this.c, this.l - 18 * (null == t ? 1 : t),
					this.opacity)
			},
			rgb: function() {
				return Me(this).rgb()
			}
		}));
		Te(Rn), Te(On);
		var Ce = -.29227,
			Ne = -.90649,
			Ae = 1.97294,
			Ee = Ae * Ne,
			Se = 1.78277 * Ae,
			ke = 1.78277 * Ce - -.14861 * Ne;

		function Ue(t, n, e, r) {
			return 1 === arguments.length ? function(t) {
				if (t instanceof Pe) return new Pe(t.h, t.s, t.l, t.opacity);
				t instanceof bn || (t = mn(t));
				var n = t.r / 255,
					e = t.g / 255,
					r = t.b / 255,
					i = (ke * r + Ee * n - Se * e) / (ke + Ee - Se),
					o = r - i,
					a = (Ae * (e - i) - Ce * o) / Ne,
					s = Math.sqrt(a * a + o * o) / (Ae * i * (1 - i)),
					u = s ? Math.atan2(a, o) * oe - 120 : NaN;
				return new Pe(u < 0 ? u + 360 : u, s, i, t.opacity)
			}(t) : new Pe(t, n, e, null == r ? 1 : r)
		}

		function Pe(t, n, e, r) {
			this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
		}

		function Re(t) {
			return function n(e) {
				function r(n, r) {
					var i = t((n = Ue(n)).h, (r = Ue(r)).h),
						o = On(n.s, r.s),
						a = On(n.l, r.l),
						s = On(n.opacity, r.opacity);
					return function(t) {
						return n.h = i(t), n.s = o(t), n.l = a(Math.pow(t, e)), n.opacity =
							s(t), n + ""
					}
				}
				return e = +e, r.gamma = n, r
			}(1)
		}
		Kt(Pe, Ue, tn(nn, {
			brighter: function(t) {
				return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new Pe(this.h,
					this.s, this.l * t, this.opacity)
			},
			darker: function(t) {
				return t = null == t ? .7 : Math.pow(.7, t), new Pe(this.h, this.s,
					this.l * t, this.opacity)
			},
			rgb: function() {
				var t = isNaN(this.h) ? 0 : (this.h + 120) * ie,
					n = +this.l,
					e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
					r = Math.cos(t),
					i = Math.sin(t);
				return new bn(255 * (n + e * (-.14861 * r + 1.78277 * i)), 255 * (n +
					e * (Ce * r + Ne * i)), 255 * (n + e * (Ae * r)), this.opacity)
			}
		}));
		Re(Rn), Re(On);
		var Be, Oe, je = 0,
			De = 0,
			Le = 0,
			Ie = 1e3,
			Ye = 0,
			ze = 0,
			Fe = 0,
			qe = "object" == typeof performance && performance.now ? performance :
			Date,
			He = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame
			.bind(window) : function(t) {
				setTimeout(t, 17)
			};

		function Ve() {
			return ze || (He($e), ze = qe.now() + Fe)
		}

		function $e() {
			ze = 0
		}

		function Xe() {
			this._call = this._time = this._next = null
		}

		function Ze(t, n, e) {
			var r = new Xe;
			return r.restart(t, n, e), r
		}

		function Je() {
			ze = (Ye = qe.now()) + Fe, je = De = 0;
			try {
				! function() {
					Ve(), ++je;
					for (var t, n = Be; n;)(t = ze - n._time) >= 0 && n._call.call(null, t),
						n = n._next;
					--je
				}()
			} finally {
				je = 0,
					function() {
						var t, n, e = Be,
							r = 1 / 0;
						for (; e;) e._call ? (r > e._time && (r = e._time), t = e, e = e._next) :
							(n = e._next, e._next = null, e = t ? t._next = n : Be = n);
						Oe = t, Qe(r)
					}(), ze = 0
			}
		}

		function We() {
			var t = qe.now(),
				n = t - Ye;
			n > Ie && (Fe -= n, Ye = t)
		}

		function Qe(t) {
			je || (De && (De = clearTimeout(De)), t - ze > 24 ? (t < 1 / 0 && (De =
					setTimeout(Je, t - qe.now() - Fe)), Le && (Le = clearInterval(Le))) :
				(Le || (Ye = qe.now(), Le = setInterval(We, Ie)), je = 1, He(Je)))
		}
		Xe.prototype = Ze.prototype = {
			constructor: Xe,
			restart: function(t, n, e) {
				if ("function" != typeof t) throw new TypeError(
					"callback is not a function");
				e = (null == e ? Ve() : +e) + (null == n ? 0 : +n), this._next || Oe ===
					this || (Oe ? Oe._next = this : Be = this, Oe = this), this._call = t,
					this._time = e, Qe()
			},
			stop: function() {
				this._call && (this._call = null, this._time = 1 / 0, Qe())
			}
		};
		var Ge = function(t, n, e) {
				var r = new Xe;
				return n = null == n ? 0 : +n, r.restart((function(e) {
					r.stop(), t(e + n)
				}), n, e), r
			},
			Ke = D("start", "end", "cancel", "interrupt"),
			tr = [],
			nr = 0,
			er = 1,
			rr = 2,
			ir = 3,
			or = 4,
			ar = 5,
			sr = 6,
			ur = function(t, n, e, r, i, o) {
				var a = t.__transition;
				if (a) {
					if (e in a) return
				} else t.__transition = {};
				! function(t, n, e) {
					var r, i = t.__transition;

					function o(u) {
						var c, h, f, l;
						if (e.state !== er) return s();
						for (c in i)
							if ((l = i[c]).name === e.name) {
								if (l.state === ir) return Ge(o);
								l.state === or ? (l.state = sr, l.timer.stop(), l.on.call(
										"interrupt", t, t.__data__, l.index, l.group), delete i[c]) : +c <
									n && (l.state = sr, l.timer.stop(), l.on.call("cancel", t, t.__data__,
										l.index, l.group), delete i[c])
							}
						if (Ge((function() {
								e.state === ir && (e.state = or, e.timer.restart(a, e.delay, e.time),
									a(u))
							})), e.state = rr, e.on.call("start", t, t.__data__, e.index, e.group),
							e.state === rr) {
							for (e.state = ir, r = new Array(f = e.tween.length), c = 0, h = -1; c <
								f; ++c)(l = e.tween[c].value.call(t, t.__data__, e.index, e.group)) &&
								(r[++h] = l);
							r.length = h + 1
						}
					}

					function a(n) {
						for (var i = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer
								.restart(s), e.state = ar, 1), o = -1, a = r.length; ++o < a;) r[o].call(
							t, i);
						e.state === ar && (e.on.call("end", t, t.__data__, e.index, e.group),
							s())
					}

					function s() {
						for (var r in e.state = sr, e.timer.stop(), delete i[n], i) return;
						delete t.__transition
					}
					i[n] = e, e.timer = Ze((function(t) {
						e.state = er, e.timer.restart(o, e.delay, e.time), e.delay <= t &&
							o(t - e.delay)
					}), 0, e.time)
				}(t, e, {
					name: n,
					index: r,
					group: i,
					on: Ke,
					tween: tr,
					time: o.time,
					delay: o.delay,
					duration: o.duration,
					ease: o.ease,
					timer: null,
					state: nr
				})
			};

		function cr(t, n) {
			var e = fr(t, n);
			if (e.state > nr) throw new Error("too late; already scheduled");
			return e
		}

		function hr(t, n) {
			var e = fr(t, n);
			if (e.state > ir) throw new Error("too late; already running");
			return e
		}

		function fr(t, n) {
			var e = t.__transition;
			if (!e || !(e = e[n])) throw new Error("transition not found");
			return e
		}
		var lr = function(t, n) {
			var e, r, i, o = t.__transition,
				a = !0;
			if (o) {
				for (i in n = null == n ? null : n + "", o)(e = o[i]).name === n ? (r =
					e.state > rr && e.state < ar, e.state = sr, e.timer.stop(), e.on.call(
						r ? "interrupt" : "cancel", t, t.__data__, e.index, e.group), delete o[
						i]) : a = !1;
				a && delete t.__transition
			}
		};

		function pr(t, n) {
			var e, r;
			return function() {
				var i = hr(this, t),
					o = i.tween;
				if (o !== e)
					for (var a = 0, s = (r = e = o).length; a < s; ++a)
						if (r[a].name === n) {
							(r = r.slice()).splice(a, 1);
							break
						}
				i.tween = r
			}
		}

		function dr(t, n, e) {
			var r, i;
			if ("function" != typeof e) throw new Error;
			return function() {
				var o = hr(this, t),
					a = o.tween;
				if (a !== r) {
					i = (r = a).slice();
					for (var s = {
							name: n,
							value: e
						}, u = 0, c = i.length; u < c; ++u)
						if (i[u].name === n) {
							i[u] = s;
							break
						}
					u === c && i.push(s)
				}
				o.tween = i
			}
		}

		function _r(t, n, e) {
			var r = t._id;
			return t.each((function() {
					var t = hr(this, r);
					(t.value || (t.value = {}))[n] = e.apply(this, arguments)
				})),
				function(t) {
					return fr(t, r).value[n]
				}
		}
		var gr = function(t, n) {
			var e;
			return ("number" == typeof n ? Yn : n instanceof gn ? jn : (e = gn(n)) ?
				(n = e, jn) : Zn)(t, n)
		};

		function yr(t) {
			return function() {
				this.removeAttribute(t)
			}
		}

		function vr(t) {
			return function() {
				this.removeAttributeNS(t.space, t.local)
			}
		}

		function mr(t, n, e) {
			var r, i, o = e + "";
			return function() {
				var a = this.getAttribute(t);
				return a === o ? null : a === r ? i : i = n(r = a, e)
			}
		}

		function wr(t, n, e) {
			var r, i, o = e + "";
			return function() {
				var a = this.getAttributeNS(t.space, t.local);
				return a === o ? null : a === r ? i : i = n(r = a, e)
			}
		}

		function br(t, n, e) {
			var r, i, o;
			return function() {
				var a, s, u = e(this);
				if (null != u) return (a = this.getAttribute(t)) === (s = u + "") ?
					null : a === r && s === i ? o : (i = s, o = n(r = a, u));
				this.removeAttribute(t)
			}
		}

		function xr(t, n, e) {
			var r, i, o;
			return function() {
				var a, s, u = e(this);
				if (null != u) return (a = this.getAttributeNS(t.space, t.local)) === (
					s = u + "") ? null : a === r && s === i ? o : (i = s, o = n(r = a, u));
				this.removeAttributeNS(t.space, t.local)
			}
		}

		function Mr(t, n) {
			var e, r;

			function i() {
				var i = n.apply(this, arguments);
				return i !== r && (e = (r = i) && function(t, n) {
					return function(e) {
						this.setAttributeNS(t.space, t.local, n(e))
					}
				}(t, i)), e
			}
			return i._value = n, i
		}

		function Tr(t, n) {
			var e, r;

			function i() {
				var i = n.apply(this, arguments);
				return i !== r && (e = (r = i) && function(t, n) {
					return function(e) {
						this.setAttribute(t, n(e))
					}
				}(t, i)), e
			}
			return i._value = n, i
		}

		function Cr(t, n) {
			return function() {
				cr(this, t).delay = +n.apply(this, arguments)
			}
		}

		function Nr(t, n) {
			return n = +n,
				function() {
					cr(this, t).delay = n
				}
		}

		function Ar(t, n) {
			return function() {
				hr(this, t).duration = +n.apply(this, arguments)
			}
		}

		function Er(t, n) {
			return n = +n,
				function() {
					hr(this, t).duration = n
				}
		}

		function Sr(t, n) {
			if ("function" != typeof n) throw new Error;
			return function() {
				hr(this, t).ease = n
			}
		}

		function kr(t, n, e) {
			var r, i, o = function(t) {
				return (t + "").trim().split(/^|\s+/).every((function(t) {
					var n = t.indexOf(".");
					return n >= 0 && (t = t.slice(0, n)), !t || "start" === t
				}))
			}(n) ? cr : hr;
			return function() {
				var a = o(this, t),
					s = a.on;
				s !== r && (i = (r = s).copy()).on(n, e), a.on = i
			}
		}
		var Ur = Zt.prototype.constructor;

		function Pr(t) {
			return function() {
				this.style.removeProperty(t)
			}
		}

		function Rr(t, n, e) {
			var r, i;

			function o() {
				var o = n.apply(this, arguments);
				return o !== i && (r = (i = o) && function(t, n, e) {
					return function(r) {
						this.style.setProperty(t, n(r), e)
					}
				}(t, o, e)), r
			}
			return o._value = n, o
		}
		var Br = 0;

		function Or(t, n, e, r) {
			this._groups = t, this._parents = n, this._name = e, this._id = r
		}

		function jr() {
			return ++Br
		}
		var Dr = Zt.prototype;
		Or.prototype = function(t) {
			return Zt().transition(t)
		}.prototype = {
			constructor: Or,
			select: function(t) {
				var n = this._name,
					e = this._id;
				"function" != typeof t && (t = V(t));
				for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a <
					i; ++a)
					for (var s, u, c = r[a], h = c.length, f = o[a] = new Array(h), l = 0; l <
						h; ++l)(s = c[l]) && (u = t.call(s, s.__data__, l, c)) && (
						"__data__" in s && (u.__data__ = s.__data__), f[l] = u, ur(f[l], n,
							e, l, f, fr(s, e)));
				return new Or(o, this._parents, n, e)
			},
			selectAll: function(t) {
				var n = this._name,
					e = this._id;
				"function" != typeof t && (t = X(t));
				for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++
					s)
					for (var u, c = r[s], h = c.length, f = 0; f < h; ++f)
						if (u = c[f]) {
							for (var l, p = t.call(u, u.__data__, f, c), d = fr(u, e), _ = 0, g =
									p.length; _ < g; ++_)(l = p[_]) && ur(l, n, e, _, p, d);
							o.push(p), a.push(u)
						}
				return new Or(o, a, n, e)
			},
			filter: function(t) {
				"function" != typeof t && (t = Z(t));
				for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i <
					e; ++i)
					for (var o, a = n[i], s = a.length, u = r[i] = [], c = 0; c < s; ++c)
						(o = a[c]) && t.call(o, o.__data__, c, a) && u.push(o);
				return new Or(r, this._parents, this._name, this._id)
			},
			merge: function(t) {
				if (t._id !== this._id) throw new Error;
				for (var n = this._groups, e = t._groups, r = n.length, i = e.length,
						o = Math.min(r, i), a = new Array(r), s = 0; s < o; ++s)
					for (var u, c = n[s], h = e[s], f = c.length, l = a[s] = new Array(f),
							p = 0; p < f; ++p)(u = c[p] || h[p]) && (l[p] = u);
				for (; s < r; ++s) a[s] = n[s];
				return new Or(a, this._parents, this._name, this._id)
			},
			selection: function() {
				return new Ur(this._groups, this._parents)
			},
			transition: function() {
				for (var t = this._name, n = this._id, e = jr(), r = this._groups, i =
						r.length, o = 0; o < i; ++o)
					for (var a, s = r[o], u = s.length, c = 0; c < u; ++c)
						if (a = s[c]) {
							var h = fr(a, n);
							ur(a, t, e, c, s, {
								time: h.time + h.delay + h.duration,
								delay: 0,
								duration: h.duration,
								ease: h.ease
							})
						}
				return new Or(r, this._parents, t, e)
			},
			call: Dr.call,
			nodes: Dr.nodes,
			node: Dr.node,
			size: Dr.size,
			empty: Dr.empty,
			each: Dr.each,
			on: function(t, n) {
				var e = this._id;
				return arguments.length < 2 ? fr(this.node(), e).on.on(t) : this.each(
					kr(e, t, n))
			},
			attr: function(t, n) {
				var e = Y(t),
					r = "transform" === e ? ee : gr;
				return this.attrTween(t, "function" == typeof n ? (e.local ? xr : br)(
						e, r, _r(this, "attr." + t, n)) : null == n ? (e.local ? vr : yr)(e) :
					(e.local ? wr : mr)(e, r, n))
			},
			attrTween: function(t, n) {
				var e = "attr." + t;
				if (arguments.length < 2) return (e = this.tween(e)) && e._value;
				if (null == n) return this.tween(e, null);
				if ("function" != typeof n) throw new Error;
				var r = Y(t);
				return this.tween(e, (r.local ? Mr : Tr)(r, n))
			},
			style: function(t, n, e) {
				var r = "transform" == (t += "") ? ne : gr;
				return null == n ? this.styleTween(t, function(t, n) {
					var e, r, i;
					return function() {
						var o = ft(this, t),
							a = (this.style.removeProperty(t), ft(this, t));
						return o === a ? null : o === e && a === r ? i : i = n(e = o, r =
							a)
					}
				}(t, r)).on("end.style." + t, Pr(t)) : "function" == typeof n ? this.styleTween(
					t,
					function(t, n, e) {
						var r, i, o;
						return function() {
							var a = ft(this, t),
								s = e(this),
								u = s + "";
							return null == s && (this.style.removeProperty(t), u = s = ft(
								this, t)), a === u ? null : a === r && u === i ? o : (i = u, o =
								n(r = a, s))
						}
					}(t, r, _r(this, "style." + t, n))).each(function(t, n) {
					var e, r, i, o, a = "style." + n,
						s = "end." + a;
					return function() {
						var u = hr(this, t),
							c = u.on,
							h = null == u.value[a] ? o || (o = Pr(n)) : void 0;
						c === e && i === h || (r = (e = c).copy()).on(s, i = h), u.on = r
					}
				}(this._id, t)) : this.styleTween(t, function(t, n, e) {
					var r, i, o = e + "";
					return function() {
						var a = ft(this, t);
						return a === o ? null : a === r ? i : i = n(r = a, e)
					}
				}(t, r, n), e).on("end.style." + t, null)
			},
			styleTween: function(t, n, e) {
				var r = "style." + (t += "");
				if (arguments.length < 2) return (r = this.tween(r)) && r._value;
				if (null == n) return this.tween(r, null);
				if ("function" != typeof n) throw new Error;
				return this.tween(r, Rr(t, n, null == e ? "" : e))
			},
			text: function(t) {
				return this.tween("text", "function" == typeof t ? function(t) {
					return function() {
						var n = t(this);
						this.textContent = null == n ? "" : n
					}
				}(_r(this, "text", t)) : function(t) {
					return function() {
						this.textContent = t
					}
				}(null == t ? "" : t + ""))
			},
			remove: function() {
				return this.on("end.remove", (t = this._id, function() {
					var n = this.parentNode;
					for (var e in this.__transition)
						if (+e !== t) return;
					n && n.removeChild(this)
				}));
				var t
			},
			tween: function(t, n) {
				var e = this._id;
				if (t += "", arguments.length < 2) {
					for (var r, i = fr(this.node(), e).tween, o = 0, a = i.length; o < a; ++
						o)
						if ((r = i[o]).name === t) return r.value;
					return null
				}
				return this.each((null == n ? pr : dr)(e, t, n))
			},
			delay: function(t) {
				var n = this._id;
				return arguments.length ? this.each(("function" == typeof t ? Cr : Nr)
					(n, t)) : fr(this.node(), n).delay
			},
			duration: function(t) {
				var n = this._id;
				return arguments.length ? this.each(("function" == typeof t ? Ar : Er)
					(n, t)) : fr(this.node(), n).duration
			},
			ease: function(t) {
				var n = this._id;
				return arguments.length ? this.each(Sr(n, t)) : fr(this.node(), n).ease
			},
			end: function() {
				var t, n, e = this,
					r = e._id,
					i = e.size();
				return new Promise((function(o, a) {
					var s = {
							value: a
						},
						u = {
							value: function() {
								0 == --i && o()
							}
						};
					e.each((function() {
						var e = hr(this, r),
							i = e.on;
						i !== t && ((n = (t = i).copy())._.cancel.push(s), n._.interrupt
							.push(s), n._.end.push(u)), e.on = n
					}))
				}))
			}
		};
		(function t(n) {
			function e(t) {
				return Math.pow(t, n)
			}
			return n = +n, e.exponent = t, e
		})(3),
		function t(n) {
			function e(t) {
				return 1 - Math.pow(1 - t, n)
			}
			return n = +n, e.exponent = t, e
		}(3),
		function t(n) {
			function e(t) {
				return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2
			}
			return n = +n, e.exponent = t, e
		}(3), Math.PI;
		(function t(n) {
			function e(t) {
				return t * t * ((n + 1) * t - n)
			}
			return n = +n, e.overshoot = t, e
		})(1.70158),
		function t(n) {
			function e(t) {
				return --t * t * ((n + 1) * t + n) + 1
			}
			return n = +n, e.overshoot = t, e
		}(1.70158),
		function t(n) {
			function e(t) {
				return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n +
					1) * t + n) + 2) / 2
			}
			return n = +n, e.overshoot = t, e
		}(1.70158);
		var Lr = 2 * Math.PI,
			Ir = (function t(n, e) {
				var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= Lr);

				function i(t) {
					return n * Math.pow(2, 10 * --t) * Math.sin((r - t) / e)
				}
				return i.amplitude = function(n) {
					return t(n, e * Lr)
				}, i.period = function(e) {
					return t(n, e)
				}, i
			}(1, .3), function t(n, e) {
				var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= Lr);

				function i(t) {
					return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / e)
				}
				return i.amplitude = function(n) {
					return t(n, e * Lr)
				}, i.period = function(e) {
					return t(n, e)
				}, i
			}(1, .3), function t(n, e) {
				var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= Lr);

				function i(t) {
					return ((t = 2 * t - 1) < 0 ? n * Math.pow(2, 10 * t) * Math.sin((r -
						t) / e) : 2 - n * Math.pow(2, -10 * t) * Math.sin((r + t) / e)) / 2
				}
				return i.amplitude = function(n) {
					return t(n, e * Lr)
				}, i.period = function(e) {
					return t(n, e)
				}, i
			}(1, .3), {
				time: null,
				delay: 0,
				duration: 250,
				ease: function(t) {
					return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
				}
			});

		function Yr(t, n) {
			for (var e; !(e = t.__transition) || !(e = e[n]);)
				if (!(t = t.parentNode)) return Ir.time = Ve(), Ir;
			return e
		}
		Zt.prototype.interrupt = function(t) {
			return this.each((function() {
				lr(this, t)
			}))
		}, Zt.prototype.transition = function(t) {
			var n, e;
			t instanceof Or ? (n = t._id, t = t._name) : (n = jr(), (e = Ir).time =
				Ve(), t = null == t ? null : t + "");
			for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
				for (var a, s = r[o], u = s.length, c = 0; c < u; ++c)(a = s[c]) && ur(
					a, t, n, c, s, e || Yr(a, n));
			return new Or(r, this._parents, t, n)
		};

		function zr(t) {
			return [+t[0], +t[1]]
		}

		function Fr(t) {
			return [zr(t[0]), zr(t[1])]
		}["w", "e"].map(qr), ["n", "s"].map(qr), ["n", "w", "e", "s", "nw", "ne",
			"sw", "se"
		].map(qr);

		function qr(t) {
			return {
				type: t
			}
		}
		Math.cos, Math.sin, Math.PI, Math.max;
		Array.prototype.slice;
		var Hr = Math.PI,
			Vr = 2 * Hr,
			$r = Vr - 1e-6;

		function Xr() {
			this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
		}

		function Zr() {
			return new Xr
		}
		Xr.prototype = Zr.prototype = {
			constructor: Xr,
			moveTo: function(t, n) {
				this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +
					n)
			},
			closePath: function() {
				null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ +=
					"Z")
			},
			lineTo: function(t, n) {
				this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n)
			},
			quadraticCurveTo: function(t, n, e, r) {
				this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +
					r)
			},
			bezierCurveTo: function(t, n, e, r, i, o) {
				this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +
					i) + "," + (this._y1 = +o)
			},
			arcTo: function(t, n, e, r, i) {
				t = +t, n = +n, e = +e, r = +r, i = +i;
				var o = this._x1,
					a = this._y1,
					s = e - t,
					u = r - n,
					c = o - t,
					h = a - n,
					f = c * c + h * h;
				if (i < 0) throw new Error("negative radius: " + i);
				if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 =
					n);
				else if (f > 1e-6)
					if (Math.abs(h * s - u * c) > 1e-6 && i) {
						var l = e - o,
							p = r - a,
							d = s * s + u * u,
							_ = l * l + p * p,
							g = Math.sqrt(d),
							y = Math.sqrt(f),
							v = i * Math.tan((Hr - Math.acos((d + f - _) / (2 * g * y))) / 2),
							m = v / y,
							w = v / g;
						Math.abs(m - 1) > 1e-6 && (this._ += "L" + (t + m * c) + "," + (n +
								m * h)), this._ += "A" + i + "," + i + ",0,0," + +(h * l > c * p) +
							"," + (this._x1 = t + w * s) + "," + (this._y1 = n + w * u)
					} else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
				else;
			},
			arc: function(t, n, e, r, i, o) {
				t = +t, n = +n, o = !!o;
				var a = (e = +e) * Math.cos(r),
					s = e * Math.sin(r),
					u = t + a,
					c = n + s,
					h = 1 ^ o,
					f = o ? r - i : i - r;
				if (e < 0) throw new Error("negative radius: " + e);
				null === this._x1 ? this._ += "M" + u + "," + c : (Math.abs(this._x1 -
					u) > 1e-6 || Math.abs(this._y1 - c) > 1e-6) && (this._ += "L" + u +
					"," + c), e && (f < 0 && (f = f % Vr + Vr), f > $r ? this._ += "A" +
					e + "," + e + ",0,1," + h + "," + (t - a) + "," + (n - s) + "A" + e +
					"," + e + ",0,1," + h + "," + (this._x1 = u) + "," + (this._y1 = c) :
					f > 1e-6 && (this._ += "A" + e + "," + e + ",0," + +(f >= Hr) + "," +
						h + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n +
							e * Math.sin(i))))
			},
			rect: function(t, n, e, r) {
				this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +
					n) + "h" + +e + "v" + +r + "h" + -e + "Z"
			},
			toString: function() {
				return this._
			}
		};

		function Jr() {}

		function Wr(t, n) {
			var e = new Jr;
			if (t instanceof Jr) t.each((function(t, n) {
				e.set(n, t)
			}));
			else if (Array.isArray(t)) {
				var r, i = -1,
					o = t.length;
				if (null == n)
					for (; ++i < o;) e.set(i, t[i]);
				else
					for (; ++i < o;) e.set(n(r = t[i], i, t), r)
			} else if (t)
				for (var a in t) e.set(a, t[a]);
			return e
		}
		Jr.prototype = Wr.prototype = {
			constructor: Jr,
			has: function(t) {
				return "$" + t in this
			},
			get: function(t) {
				return this["$" + t]
			},
			set: function(t, n) {
				return this["$" + t] = n, this
			},
			remove: function(t) {
				var n = "$" + t;
				return n in this && delete this[n]
			},
			clear: function() {
				for (var t in this) "$" === t[0] && delete this[t]
			},
			keys: function() {
				var t = [];
				for (var n in this) "$" === n[0] && t.push(n.slice(1));
				return t
			},
			values: function() {
				var t = [];
				for (var n in this) "$" === n[0] && t.push(this[n]);
				return t
			},
			entries: function() {
				var t = [];
				for (var n in this) "$" === n[0] && t.push({
					key: n.slice(1),
					value: this[n]
				});
				return t
			},
			size: function() {
				var t = 0;
				for (var n in this) "$" === n[0] && ++t;
				return t
			},
			empty: function() {
				for (var t in this)
					if ("$" === t[0]) return !1;
				return !0
			},
			each: function(t) {
				for (var n in this) "$" === n[0] && t(this[n], n.slice(1), this)
			}
		};
		var Qr = Wr;

		function Gr() {}
		var Kr = Qr.prototype;

		function ti(t, n) {
			var e = new Gr;
			if (t instanceof Gr) t.each((function(t) {
				e.add(t)
			}));
			else if (t) {
				var r = -1,
					i = t.length;
				if (null == n)
					for (; ++r < i;) e.add(t[r]);
				else
					for (; ++r < i;) e.add(n(t[r], r, t))
			}
			return e
		}
		Gr.prototype = ti.prototype = {
			constructor: Gr,
			has: Kr.has,
			add: function(t) {
				return this["$" + (t += "")] = t, this
			},
			remove: Kr.remove,
			clear: Kr.clear,
			values: Kr.keys,
			size: Kr.size,
			empty: Kr.empty,
			each: Kr.each
		};
		Array.prototype.slice;
		var ni = {},
			ei = {},
			ri = 34,
			ii = 10,
			oi = 13;

		function ai(t) {
			return new Function("d", "return {" + t.map((function(t, n) {
				return JSON.stringify(t) + ": d[" + n + "]"
			})).join(",") + "}")
		}

		function si(t) {
			var n = Object.create(null),
				e = [];
			return t.forEach((function(t) {
				for (var r in t) r in n || e.push(n[r] = r)
			})), e
		}

		function ui(t, n) {
			var e = t + "",
				r = e.length;
			return r < n ? new Array(n - r + 1).join(0) + e : e
		}

		function ci(t) {
			var n, e = t.getUTCHours(),
				r = t.getUTCMinutes(),
				i = t.getUTCSeconds(),
				o = t.getUTCMilliseconds();
			return isNaN(t) ? "Invalid Date" : ((n = t.getUTCFullYear()) < 0 ? "-" +
				ui(-n, 6) : n > 9999 ? "+" + ui(n, 6) : ui(n, 4)) + "-" + ui(t.getUTCMonth() +
				1, 2) + "-" + ui(t.getUTCDate(), 2) + (o ? "T" + ui(e, 2) + ":" + ui(r,
					2) + ":" + ui(i, 2) + "." + ui(o, 3) + "Z" : i ? "T" + ui(e, 2) + ":" +
				ui(r, 2) + ":" + ui(i, 2) + "Z" : r || e ? "T" + ui(e, 2) + ":" + ui(r,
					2) + "Z" : "")
		}
		var hi = function(t) {
				var n = new RegExp('["' + t + "\n\r]"),
					e = t.charCodeAt(0);

				function r(t, n) {
					var r, i = [],
						o = t.length,
						a = 0,
						s = 0,
						u = o <= 0,
						c = !1;

					function h() {
						if (u) return ei;
						if (c) return c = !1, ni;
						var n, r, i = a;
						if (t.charCodeAt(i) === ri) {
							for (; a++ < o && t.charCodeAt(a) !== ri || t.charCodeAt(++a) === ri;)
							;
							return (n = a) >= o ? u = !0 : (r = t.charCodeAt(a++)) === ii ? c = !
								0 : r === oi && (c = !0, t.charCodeAt(a) === ii && ++a), t.slice(i +
									1, n - 1).replace(/""/g, '"')
						}
						for (; a < o;) {
							if ((r = t.charCodeAt(n = a++)) === ii) c = !0;
							else if (r === oi) c = !0, t.charCodeAt(a) === ii && ++a;
							else if (r !== e) continue;
							return t.slice(i, n)
						}
						return u = !0, t.slice(i, o)
					}
					for (t.charCodeAt(o - 1) === ii && --o, t.charCodeAt(o - 1) === oi &&
						--o;
						(r = h()) !== ei;) {
						for (var f = []; r !== ni && r !== ei;) f.push(r), r = h();
						n && null == (f = n(f, s++)) || i.push(f)
					}
					return i
				}

				function i(n, e) {
					return n.map((function(n) {
						return e.map((function(t) {
							return a(n[t])
						})).join(t)
					}))
				}

				function o(n) {
					return n.map(a).join(t)
				}

				function a(t) {
					return null == t ? "" : t instanceof Date ? ci(t) : n.test(t += "") ?
						'"' + t.replace(/"/g, '""') + '"' : t
				}
				return {
					parse: function(t, n) {
						var e, i, o = r(t, (function(t, r) {
							if (e) return e(t, r - 1);
							i = t, e = n ? function(t, n) {
								var e = ai(t);
								return function(r, i) {
									return n(e(r), i, t)
								}
							}(t, n) : ai(t)
						}));
						return o.columns = i || [], o
					},
					parseRows: r,
					format: function(n, e) {
						return null == e && (e = si(n)), [e.map(a).join(t)].concat(i(n, e)).join(
							"\n")
					},
					formatBody: function(t, n) {
						return null == n && (n = si(t)), i(t, n).join("\n")
					},
					formatRows: function(t) {
						return t.map(o).join("\n")
					}
				}
			},
			fi = hi(","),
			li = fi.parse,
			pi = (fi.parseRows, fi.format, fi.formatBody, fi.formatRows, hi("\t")),
			di = pi.parse;
		pi.parseRows, pi.format, pi.formatBody, pi.formatRows;

		function _i(t) {
			if (!t.ok) throw new Error(t.status + " " + t.statusText);
			return t.text()
		}
		var gi = function(t, n) {
			return fetch(t, n).then(_i)
		};

		function yi(t) {
			return function(n, e, r) {
				return 2 === arguments.length && "function" == typeof e && (r = e, e =
					void 0), gi(n, e).then((function(n) {
					return t(n, r)
				}))
			}
		}
		yi(li), yi(di);

		function vi(t) {
			return function(n, e) {
				return gi(n, e).then((function(n) {
					return (new DOMParser).parseFromString(n, t)
				}))
			}
		}
		vi("application/xml"), vi("text/html"), vi("image/svg+xml");

		function mi(t, n, e, r) {
			if (isNaN(n) || isNaN(e)) return t;
			var i, o, a, s, u, c, h, f, l, p = t._root,
				d = {
					data: r
				},
				_ = t._x0,
				g = t._y0,
				y = t._x1,
				v = t._y1;
			if (!p) return t._root = d, t;
			for (; p.length;)
				if ((c = n >= (o = (_ + y) / 2)) ? _ = o : y = o, (h = e >= (a = (g + v) /
						2)) ? g = a : v = a, i = p, !(p = p[f = h << 1 | c])) return i[f] = d,
					t;
			if (s = +t._x.call(null, p.data), u = +t._y.call(null, p.data), n === s &&
				e === u) return d.next = p, i ? i[f] = d : t._root = d, t;
			do {
				i = i ? i[f] = new Array(4) : t._root = new Array(4), (c = n >= (o = (_ +
					y) / 2)) ? _ = o : y = o, (h = e >= (a = (g + v) / 2)) ? g = a : v = a
			} while ((f = h << 1 | c) == (l = (u >= a) << 1 | s >= o));
			return i[l] = p, i[f] = d, t
		}
		var wi = function(t, n, e, r, i) {
			this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i
		};

		function bi(t) {
			return t[0]
		}

		function xi(t) {
			return t[1]
		}

		function Mi(t, n, e) {
			var r = new Ti(null == n ? bi : n, null == e ? xi : e, NaN, NaN, NaN, NaN);
			return null == t ? r : r.addAll(t)
		}

		function Ti(t, n, e, r, i, o) {
			this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 =
				o, this._root = void 0
		}

		function Ci(t) {
			for (var n = {
					data: t.data
				}, e = n; t = t.next;) e = e.next = {
				data: t.data
			};
			return n
		}
		var Ni = Mi.prototype = Ti.prototype;
		Ni.copy = function() {
			var t, n, e = new Ti(this._x, this._y, this._x0, this._y0, this._x1,
					this._y1),
				r = this._root;
			if (!r) return e;
			if (!r.length) return e._root = Ci(r), e;
			for (t = [{
					source: r,
					target: e._root = new Array(4)
				}]; r = t.pop();)
				for (var i = 0; i < 4; ++i)(n = r.source[i]) && (n.length ? t.push({
					source: n,
					target: r.target[i] = new Array(4)
				}) : r.target[i] = Ci(n));
			return e
		}, Ni.add = function(t) {
			var n = +this._x.call(null, t),
				e = +this._y.call(null, t);
			return mi(this.cover(n, e), n, e, t)
		}, Ni.addAll = function(t) {
			var n, e, r, i, o = t.length,
				a = new Array(o),
				s = new Array(o),
				u = 1 / 0,
				c = 1 / 0,
				h = -1 / 0,
				f = -1 / 0;
			for (e = 0; e < o; ++e) isNaN(r = +this._x.call(null, n = t[e])) ||
				isNaN(i = +this._y.call(null, n)) || (a[e] = r, s[e] = i, r < u && (u =
					r), r > h && (h = r), i < c && (c = i), i > f && (f = i));
			if (u > h || c > f) return this;
			for (this.cover(u, c).cover(h, f), e = 0; e < o; ++e) mi(this, a[e], s[e],
				t[e]);
			return this
		}, Ni.cover = function(t, n) {
			if (isNaN(t = +t) || isNaN(n = +n)) return this;
			var e = this._x0,
				r = this._y0,
				i = this._x1,
				o = this._y1;
			if (isNaN(e)) i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;
			else {
				for (var a, s, u = i - e, c = this._root; e > t || t >= i || r > n || n >=
					o;) switch (s = (n < r) << 1 | t < e, (a = new Array(4))[s] = c, c = a,
					u *= 2, s) {
					case 0:
						i = e + u, o = r + u;
						break;
					case 1:
						e = i - u, o = r + u;
						break;
					case 2:
						i = e + u, r = o - u;
						break;
					case 3:
						e = i - u, r = o - u
				}
				this._root && this._root.length && (this._root = c)
			}
			return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this
		}, Ni.data = function() {
			var t = [];
			return this.visit((function(n) {
				if (!n.length)
					do {
						t.push(n.data)
					} while (n = n.next)
			})), t
		}, Ni.extent = function(t) {
			return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +
				t[1][1]) : isNaN(this._x0) ? void 0 : [
				[this._x0, this._y0],
				[this._x1, this._y1]
			]
		}, Ni.find = function(t, n, e) {
			var r, i, o, a, s, u, c, h = this._x0,
				f = this._y0,
				l = this._x1,
				p = this._y1,
				d = [],
				_ = this._root;
			for (_ && d.push(new wi(_, h, f, l, p)), null == e ? e = 1 / 0 : (h = t -
					e, f = n - e, l = t + e, p = n + e, e *= e); u = d.pop();)
				if (!(!(_ = u.node) || (i = u.x0) > l || (o = u.y0) > p || (a = u.x1) <
						h || (s = u.y1) < f))
					if (_.length) {
						var g = (i + a) / 2,
							y = (o + s) / 2;
						d.push(new wi(_[3], g, y, a, s), new wi(_[2], i, y, g, s), new wi(_[1],
								g, o, a, y), new wi(_[0], i, o, g, y)), (c = (n >= y) << 1 | t >= g) &&
							(u = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - c], d[d.length -
								1 - c] = u)
					} else {
						var v = t - +this._x.call(null, _.data),
							m = n - +this._y.call(null, _.data),
							w = v * v + m * m;
						if (w < e) {
							var b = Math.sqrt(e = w);
							h = t - b, f = n - b, l = t + b, p = n + b, r = _.data
						}
					}
			return r
		}, Ni.remove = function(t) {
			if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t)))
				return this;
			var n, e, r, i, o, a, s, u, c, h, f, l, p = this._root,
				d = this._x0,
				_ = this._y0,
				g = this._x1,
				y = this._y1;
			if (!p) return this;
			if (p.length)
				for (;;) {
					if ((c = o >= (s = (d + g) / 2)) ? d = s : g = s, (h = a >= (u = (_ +
							y) / 2)) ? _ = u : y = u, n = p, !(p = p[f = h << 1 | c])) return
						this;
					if (!p.length) break;
					(n[f + 1 & 3] || n[f + 2 & 3] || n[f + 3 & 3]) && (e = n, l = f)
				}
			for (; p.data !== t;)
				if (r = p, !(p = p.next)) return this;
			return (i = p.next) && delete p.next, r ? (i ? r.next = i : delete r.next,
				this) : n ? (i ? n[f] = i : delete n[f], (p = n[0] || n[1] || n[2] ||
				n[3]) && p === (n[3] || n[2] || n[1] || n[0]) && !p.length && (e ? e[
				l] = p : this._root = p), this) : (this._root = i, this)
		}, Ni.removeAll = function(t) {
			for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
			return this
		}, Ni.root = function() {
			return this._root
		}, Ni.size = function() {
			var t = 0;
			return this.visit((function(n) {
				if (!n.length)
					do {
						++t
					} while (n = n.next)
			})), t
		}, Ni.visit = function(t) {
			var n, e, r, i, o, a, s = [],
				u = this._root;
			for (u && s.push(new wi(u, this._x0, this._y0, this._x1, this._y1)); n =
				s.pop();)
				if (!t(u = n.node, r = n.x0, i = n.y0, o = n.x1, a = n.y1) && u.length) {
					var c = (r + o) / 2,
						h = (i + a) / 2;
					(e = u[3]) && s.push(new wi(e, c, h, o, a)), (e = u[2]) && s.push(new wi(
						e, r, h, c, a)), (e = u[1]) && s.push(new wi(e, c, i, o, h)), (e = u[
						0]) && s.push(new wi(e, r, i, c, h))
				}
			return this
		}, Ni.visitAfter = function(t) {
			var n, e = [],
				r = [];
			for (this._root && e.push(new wi(this._root, this._x0, this._y0, this._x1,
					this._y1)); n = e.pop();) {
				var i = n.node;
				if (i.length) {
					var o, a = n.x0,
						s = n.y0,
						u = n.x1,
						c = n.y1,
						h = (a + u) / 2,
						f = (s + c) / 2;
					(o = i[0]) && e.push(new wi(o, a, s, h, f)), (o = i[1]) && e.push(new wi(
						o, h, s, u, f)), (o = i[2]) && e.push(new wi(o, a, f, h, c)), (o = i[
						3]) && e.push(new wi(o, h, f, u, c))
				}
				r.push(n)
			}
			for (; n = r.pop();) t(n.node, n.x0, n.y0, n.x1, n.y1);
			return this
		}, Ni.x = function(t) {
			return arguments.length ? (this._x = t, this) : this._x
		}, Ni.y = function(t) {
			return arguments.length ? (this._y = t, this) : this._y
		};
		Math.PI, Math.sqrt(5);
		var Ai = function(t, n) {
				if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf(
						"e")) < 0) return null;
				var e, r = t.slice(0, e);
				return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
			},
			Ei = function(t) {
				return (t = Ai(Math.abs(t))) ? t[1] : NaN
			},
			Si =
			/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

		function ki(t) {
			if (!(n = Si.exec(t))) throw new Error("invalid format: " + t);
			var n;
			return new Ui({
				fill: n[1],
				align: n[2],
				sign: n[3],
				symbol: n[4],
				zero: n[5],
				width: n[6],
				comma: n[7],
				precision: n[8] && n[8].slice(1),
				trim: n[9],
				type: n[10]
			})
		}

		function Ui(t) {
			this.fill = void 0 === t.fill ? " " : t.fill + "", this.align = void 0 ===
				t.align ? ">" : t.align + "", this.sign = void 0 === t.sign ? "-" : t.sign +
				"", this.symbol = void 0 === t.symbol ? "" : t.symbol + "", this.zero = !
				!t.zero, this.width = void 0 === t.width ? void 0 : +t.width, this.comma = !
				!t.comma, this.precision = void 0 === t.precision ? void 0 : +t.precision,
				this.trim = !!t.trim, this.type = void 0 === t.type ? "" : t.type + ""
		}
		ki.prototype = Ui.prototype, Ui.prototype.toString = function() {
			return this.fill + this.align + this.sign + this.symbol + (this.zero ?
					"0" : "") + (void 0 === this.width ? "" : Math.max(1, 0 | this.width)) +
				(this.comma ? "," : "") + (void 0 === this.precision ? "" : "." + Math.max(
					0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
		};
		var Pi, Ri, Bi, Oi, ji = function(t) {
				t: for (var n, e = t.length, r = 1, i = -1; r < e; ++r) switch (t[r]) {
					case ".":
						i = n = r;
						break;
					case "0":
						0 === i && (i = r), n = r;
						break;
					default:
						if (i > 0) {
							if (!+t[r]) break t;
							i = 0
						}
				}
				return i > 0 ? t.slice(0, i) + t.slice(n + 1) : t
			},
			Di = function(t, n) {
				var e = Ai(t, n);
				if (!e) return t + "";
				var r = e[0],
					i = e[1];
				return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r
					.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length +
						2).join("0")
			},
			Li = {
				"%": function(t, n) {
					return (100 * t).toFixed(n)
				},
				b: function(t) {
					return Math.round(t).toString(2)
				},
				c: function(t) {
					return t + ""
				},
				d: function(t) {
					return Math.round(t).toString(10)
				},
				e: function(t, n) {
					return t.toExponential(n)
				},
				f: function(t, n) {
					return t.toFixed(n)
				},
				g: function(t, n) {
					return t.toPrecision(n)
				},
				o: function(t) {
					return Math.round(t).toString(8)
				},
				p: function(t, n) {
					return Di(100 * t, n)
				},
				r: Di,
				s: function(t, n) {
					var e = Ai(t, n);
					if (!e) return t + "";
					var r = e[0],
						i = e[1],
						o = i - (Pi = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
						a = r.length;
					return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o >
						0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join(
							"0") + Ai(t, Math.max(0, n + o - 1))[0]
				},
				X: function(t) {
					return Math.round(t).toString(16).toUpperCase()
				},
				x: function(t) {
					return Math.round(t).toString(16)
				}
			},
			Ii = function(t) {
				return t
			},
			Yi = Array.prototype.map,
			zi = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P",
				"E", "Z", "Y"
			];
		Ri = function(t) {
			var n, e, r = void 0 === t.grouping || void 0 === t.thousands ? Ii : (n =
					Yi.call(t.grouping, Number), e = t.thousands + "",
					function(t, r) {
						for (var i = t.length, o = [], a = 0, s = n[0], u = 0; i > 0 && s > 0 &&
							(u + s + 1 > r && (s = Math.max(1, r - u)), o.push(t.substring(i -=
								s, i + s)), !((u += s + 1) > r));) s = n[a = (a + 1) % n.length];
						return o.reverse().join(e)
					}),
				i = void 0 === t.currency ? "" : t.currency[0] + "",
				o = void 0 === t.currency ? "" : t.currency[1] + "",
				a = void 0 === t.decimal ? "." : t.decimal + "",
				s = void 0 === t.numerals ? Ii : function(t) {
					return function(n) {
						return n.replace(/[0-9]/g, (function(n) {
							return t[+n]
						}))
					}
				}(Yi.call(t.numerals, String)),
				u = void 0 === t.percent ? "%" : t.percent + "",
				c = void 0 === t.minus ? "-" : t.minus + "",
				h = void 0 === t.nan ? "NaN" : t.nan + "";

			function f(t) {
				var n = (t = ki(t)).fill,
					e = t.align,
					f = t.sign,
					l = t.symbol,
					p = t.zero,
					d = t.width,
					_ = t.comma,
					g = t.precision,
					y = t.trim,
					v = t.type;
				"n" === v ? (_ = !0, v = "g") : Li[v] || (void 0 === g && (g = 12), y = !
					0, v = "g"), (p || "0" === n && "=" === e) && (p = !0, n = "0", e =
					"=");
				var m = "$" === l ? i : "#" === l && /[boxX]/.test(v) ? "0" + v.toLowerCase() :
					"",
					w = "$" === l ? o : /[%p]/.test(v) ? u : "",
					b = Li[v],
					x = /[defgprs%]/.test(v);

				function M(t) {
					var i, o, u, l = m,
						M = w;
					if ("c" === v) M = b(t) + M, t = "";
					else {
						var T = (t = +t) < 0;
						if (t = isNaN(t) ? h : b(Math.abs(t), g), y && (t = ji(t)), T && 0 ==
							+t && (T = !1), l = (T ? "(" === f ? f : c : "-" === f || "(" === f ?
								"" : f) + l, M = ("s" === v ? zi[8 + Pi / 3] : "") + M + (T && "(" ===
								f ? ")" : ""), x)
							for (i = -1, o = t.length; ++i < o;)
								if (48 > (u = t.charCodeAt(i)) || u > 57) {
									M = (46 === u ? a + t.slice(i + 1) : t.slice(i)) + M, t = t.slice(
										0, i);
									break
								}
					}
					_ && !p && (t = r(t, 1 / 0));
					var C = l.length + t.length + M.length,
						N = C < d ? new Array(d - C + 1).join(n) : "";
					switch (_ && p && (t = r(N + t, N.length ? d - M.length : 1 / 0), N =
						""), e) {
						case "<":
							t = l + t + M + N;
							break;
						case "=":
							t = l + N + t + M;
							break;
						case "^":
							t = N.slice(0, C = N.length >> 1) + l + t + M + N.slice(C);
							break;
						default:
							t = N + l + t + M
					}
					return s(t)
				}
				return g = void 0 === g ? 6 : /[gprs]/.test(v) ? Math.max(1, Math.min(
					21, g)) : Math.max(0, Math.min(20, g)), M.toString = function() {
					return t + ""
				}, M
			}
			return {
				format: f,
				formatPrefix: function(t, n) {
					var e = f(((t = ki(t)).type = "f", t)),
						r = 3 * Math.max(-8, Math.min(8, Math.floor(Ei(n) / 3))),
						i = Math.pow(10, -r),
						o = zi[8 + r / 3];
					return function(t) {
						return e(i * t) + o
					}
				}
			}
		}({
			decimal: ".",
			thousands: ",",
			grouping: [3],
			currency: ["$", ""],
			minus: "-"
		}), Bi = Ri.format, Oi = Ri.formatPrefix;
		var Fi = function() {
			return new qi
		};

		function qi() {
			this.reset()
		}
		qi.prototype = {
			constructor: qi,
			reset: function() {
				this.s = this.t = 0
			},
			add: function(t) {
				Vi(Hi, t, this.t), Vi(this, Hi.s, this.s), this.s ? this.t += Hi.t :
					this.s = Hi.t
			},
			valueOf: function() {
				return this.s
			}
		};
		var Hi = new qi;

		function Vi(t, n, e) {
			var r = t.s = n + e,
				i = r - n,
				o = r - i;
			t.t = n - o + (e - i)
		}
		var $i = 1e-6,
			Xi = 1e-12,
			Zi = Math.PI,
			Ji = Zi / 2,
			Wi = Zi / 4,
			Qi = 2 * Zi,
			Gi = Zi / 180,
			Ki = Math.abs,
			to = Math.atan,
			no = Math.atan2,
			eo = Math.cos,
			ro = (Math.ceil, Math.exp),
			io = (Math.floor, Math.log),
			oo = (Math.pow, Math.sin),
			ao = Math.sign || function(t) {
				return t > 0 ? 1 : t < 0 ? -1 : 0
			},
			so = Math.sqrt,
			uo = Math.tan;

		function co(t) {
			return t > 1 ? 0 : t < -1 ? Zi : Math.acos(t)
		}

		function ho(t) {
			return t > 1 ? Ji : t < -1 ? -Ji : Math.asin(t)
		}

		function fo() {}
		Fi(), Fi();

		function lo(t) {
			var n = t[0],
				e = t[1],
				r = eo(e);
			return [r * eo(n), r * oo(n), oo(e)]
		}

		function po(t, n) {
			return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] -
				t[1] * n[0]
			]
		}

		function _o(t) {
			var n = so(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
			t[0] /= n, t[1] /= n, t[2] /= n
		}
		Fi();

		function go(t, n) {
			return [Ki(t) > Zi ? t + Math.round(-t / Qi) * Qi : t, n]
		}
		go.invert = go;
		var yo = function() {
				var t, n = [];
				return {
					point: function(n, e) {
						t.push([n, e])
					},
					lineStart: function() {
						n.push(t = [])
					},
					lineEnd: fo,
					rejoin: function() {
						n.length > 1 && n.push(n.pop().concat(n.shift()))
					},
					result: function() {
						var e = n;
						return n = [], t = null, e
					}
				}
			},
			vo = function(t, n) {
				return Ki(t[0] - n[0]) < $i && Ki(t[1] - n[1]) < $i
			};

		function mo(t, n, e, r) {
			this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n =
				this.p = null
		}
		var wo = function(t, n, e, r, i) {
			var o, a, s = [],
				u = [];
			if (t.forEach((function(t) {
					if (!((n = t.length - 1) <= 0)) {
						var n, e, r = t[0],
							a = t[n];
						if (vo(r, a)) {
							for (i.lineStart(), o = 0; o < n; ++o) i.point((r = t[o])[0], r[1]);
							i.lineEnd()
						} else s.push(e = new mo(r, t, null, !0)), u.push(e.o = new mo(r,
							null, e, !1)), s.push(e = new mo(a, t, null, !1)), u.push(e.o =
							new mo(a, null, e, !0))
					}
				})), s.length) {
				for (u.sort(n), bo(s), bo(u), o = 0, a = u.length; o < a; ++o) u[o].e =
					e = !e;
				for (var c, h, f = s[0];;) {
					for (var l = f, p = !0; l.v;)
						if ((l = l.n) === f) return;
					c = l.z, i.lineStart();
					do {
						if (l.v = l.o.v = !0, l.e) {
							if (p)
								for (o = 0, a = c.length; o < a; ++o) i.point((h = c[o])[0], h[1]);
							else r(l.x, l.n.x, 1, i);
							l = l.n
						} else {
							if (p)
								for (c = l.p.z, o = c.length - 1; o >= 0; --o) i.point((h = c[o])[0],
									h[1]);
							else r(l.x, l.p.x, -1, i);
							l = l.p
						}
						c = (l = l.o).z, p = !p
					} while (!l.v);
					i.lineEnd()
				}
			}
		};

		function bo(t) {
			if (n = t.length) {
				for (var n, e, r = 0, i = t[0]; ++r < n;) i.n = e = t[r], e.p = i, i = e;
				i.n = e = t[0], e.p = i
			}
		}
		var xo = Fi();

		function Mo(t) {
			return Ki(t[0]) <= Zi ? t[0] : ao(t[0]) * ((Ki(t[0]) + Zi) % Qi - Zi)
		}
		var To = function(t, n) {
				var e = Mo(n),
					r = n[1],
					i = oo(r),
					o = [oo(e), -eo(e), 0],
					a = 0,
					s = 0;
				xo.reset(), 1 === i ? r = Ji + $i : -1 === i && (r = -Ji - $i);
				for (var u = 0, c = t.length; u < c; ++u)
					if (f = (h = t[u]).length)
						for (var h, f, l = h[f - 1], p = Mo(l), d = l[1] / 2 + Wi, _ = oo(d),
								g = eo(d), y = 0; y < f; ++y, p = m, _ = b, g = x, l = v) {
							var v = h[y],
								m = Mo(v),
								w = v[1] / 2 + Wi,
								b = oo(w),
								x = eo(w),
								M = m - p,
								T = M >= 0 ? 1 : -1,
								C = T * M,
								N = C > Zi,
								A = _ * b;
							if (xo.add(no(A * T * oo(C), g * x + A * eo(C))), a += N ? M + T * Qi :
								M, N ^ p >= e ^ m >= e) {
								var E = po(lo(l), lo(v));
								_o(E);
								var S = po(o, E);
								_o(S);
								var k = (N ^ M >= 0 ? -1 : 1) * ho(S[2]);
								(r > k || r === k && (E[0] || E[1])) && (s += N ^ M >= 0 ? 1 : -1)
							}
						}
					return (a < -$i || a < $i && xo < -$i) ^ 1 & s
			},
			Co = function(t, n, e, r) {
				return function(i) {
					var o, a, s, u = n(i),
						c = yo(),
						h = n(c),
						f = !1,
						l = {
							point: p,
							lineStart: _,
							lineEnd: y,
							polygonStart: function() {
								l.point = v, l.lineStart = m, l.lineEnd = w, a = [], o = []
							},
							polygonEnd: function() {
								l.point = p, l.lineStart = _, l.lineEnd = y, a = g(a);
								var t = To(o, r);
								a.length ? (f || (i.polygonStart(), f = !0), wo(a, Ao, t, e, i)) :
									t && (f || (i.polygonStart(), f = !0), i.lineStart(), e(null,
										null, 1, i), i.lineEnd()), f && (i.polygonEnd(), f = !1), a = o =
									null
							},
							sphere: function() {
								i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(),
									i.polygonEnd()
							}
						};

					function p(n, e) {
						t(n, e) && i.point(n, e)
					}

					function d(t, n) {
						u.point(t, n)
					}

					function _() {
						l.point = d, u.lineStart()
					}

					function y() {
						l.point = p, u.lineEnd()
					}

					function v(t, n) {
						s.push([t, n]), h.point(t, n)
					}

					function m() {
						h.lineStart(), s = []
					}

					function w() {
						v(s[0][0], s[0][1]), h.lineEnd();
						var t, n, e, r, u = h.clean(),
							l = c.result(),
							p = l.length;
						if (s.pop(), o.push(s), s = null, p)
							if (1 & u) {
								if ((n = (e = l[0]).length - 1) > 0) {
									for (f || (i.polygonStart(), f = !0), i.lineStart(), t = 0; t < n; ++
										t) i.point((r = e[t])[0], r[1]);
									i.lineEnd()
								}
							} else p > 1 && 2 & u && l.push(l.pop().concat(l.shift())), a.push(l
								.filter(No))
					}
					return l
				}
			};

		function No(t) {
			return t.length > 1
		}

		function Ao(t, n) {
			return ((t = t.x)[0] < 0 ? t[1] - Ji - $i : Ji - t[1]) - ((n = n.x)[0] <
				0 ? n[1] - Ji - $i : Ji - n[1])
		}
		Co((function() {
			return !0
		}), (function(t) {
			var n, e = NaN,
				r = NaN,
				i = NaN;
			return {
				lineStart: function() {
					t.lineStart(), n = 1
				},
				point: function(o, a) {
					var s = o > 0 ? Zi : -Zi,
						u = Ki(o - e);
					Ki(u - Zi) < $i ? (t.point(e, r = (r + a) / 2 > 0 ? Ji : -Ji), t.point(
							i, r), t.lineEnd(), t.lineStart(), t.point(s, r), t.point(o, r),
						n = 0) : i !== s && u >= Zi && (Ki(e - i) < $i && (e -= i * $i),
						Ki(o - s) < $i && (o -= s * $i), r = function(t, n, e, r) {
							var i, o, a = oo(t - e);
							return Ki(a) > $i ? to((oo(n) * (o = eo(r)) * oo(e) - oo(r) * (i =
								eo(n)) * oo(t)) / (i * o * a)) : (n + r) / 2
						}(e, r, o, a), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(
							s, r), n = 0), t.point(e = o, r = a), i = s
				},
				lineEnd: function() {
					t.lineEnd(), e = r = NaN
				},
				clean: function() {
					return 2 - n
				}
			}
		}), (function(t, n, e, r) {
			var i;
			if (null == t) i = e * Ji, r.point(-Zi, i), r.point(0, i), r.point(Zi,
					i), r.point(Zi, 0), r.point(Zi, -i), r.point(0, -i), r.point(-Zi, -i),
				r.point(-Zi, 0), r.point(-Zi, i);
			else if (Ki(t[0] - n[0]) > $i) {
				var o = t[0] < n[0] ? Zi : -Zi;
				i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
			} else r.point(n[0], n[1])
		}), [-Zi, -Ji]);
		Fi();
		Fi(), Fi();

		function Eo(t) {
			this._context = t
		}
		Eo.prototype = {
			_radius: 4.5,
			pointRadius: function(t) {
				return this._radius = t, this
			},
			polygonStart: function() {
				this._line = 0
			},
			polygonEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._point = 0
			},
			lineEnd: function() {
				0 === this._line && this._context.closePath(), this._point = NaN
			},
			point: function(t, n) {
				switch (this._point) {
					case 0:
						this._context.moveTo(t, n), this._point = 1;
						break;
					case 1:
						this._context.lineTo(t, n);
						break;
					default:
						this._context.moveTo(t + this._radius, n), this._context.arc(t, n,
							this._radius, 0, Qi)
				}
			},
			result: fo
		};
		Fi();

		function So() {
			this._string = []
		}

		function ko(t) {
			return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t +
				"," + t + " 0 1,1 0," + 2 * t + "z"
		}
		So.prototype = {
			_radius: 4.5,
			_circle: ko(4.5),
			pointRadius: function(t) {
				return (t = +t) !== this._radius && (this._radius = t, this._circle =
					null), this
			},
			polygonStart: function() {
				this._line = 0
			},
			polygonEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._point = 0
			},
			lineEnd: function() {
				0 === this._line && this._string.push("Z"), this._point = NaN
			},
			point: function(t, n) {
				switch (this._point) {
					case 0:
						this._string.push("M", t, ",", n), this._point = 1;
						break;
					case 1:
						this._string.push("L", t, ",", n);
						break;
					default:
						null == this._circle && (this._circle = ko(this._radius)), this._string
							.push("M", t, ",", n, this._circle)
				}
			},
			result: function() {
				if (this._string.length) {
					var t = this._string.join("");
					return this._string = [], t
				}
				return null
			}
		};

		function Uo(t) {
			return function(n) {
				var e = new Po;
				for (var r in t) e[r] = t[r];
				return e.stream = n, e
			}
		}

		function Po() {}
		Po.prototype = {
			constructor: Po,
			point: function(t, n) {
				this.stream.point(t, n)
			},
			sphere: function() {
				this.stream.sphere()
			},
			lineStart: function() {
				this.stream.lineStart()
			},
			lineEnd: function() {
				this.stream.lineEnd()
			},
			polygonStart: function() {
				this.stream.polygonStart()
			},
			polygonEnd: function() {
				this.stream.polygonEnd()
			}
		};
		eo(30 * Gi);
		Uo({
			point: function(t, n) {
				this.stream.point(t * Gi, n * Gi)
			}
		});

		function Ro(t) {
			return function(n, e) {
				var r = eo(n),
					i = eo(e),
					o = t(r * i);
				return [o * i * oo(n), o * oo(e)]
			}
		}

		function Bo(t) {
			return function(n, e) {
				var r = so(n * n + e * e),
					i = t(r),
					o = oo(i),
					a = eo(i);
				return [no(n * o, r * a), ho(r && e * o / r)]
			}
		}
		var Oo = Ro((function(t) {
			return so(2 / (1 + t))
		}));
		Oo.invert = Bo((function(t) {
			return 2 * ho(t / 2)
		}));
		var jo = Ro((function(t) {
			return (t = co(t)) && t / oo(t)
		}));
		jo.invert = Bo((function(t) {
			return t
		}));

		function Do(t, n) {
			return [t, io(uo((Ji + n) / 2))]
		}
		Do.invert = function(t, n) {
			return [t, 2 * to(ro(n)) - Ji]
		};

		function Lo(t, n) {
			return [t, n]
		}
		Lo.invert = Lo;
		var Io = 1.340264,
			Yo = -.081106,
			zo = 893e-6,
			Fo = .003796,
			qo = so(3) / 2;

		function Ho(t, n) {
			var e = ho(qo * oo(n)),
				r = e * e,
				i = r * r * r;
			return [t * eo(e) / (qo * (Io + 3 * Yo * r + i * (7 * zo + 9 * Fo * r))),
				e * (Io + Yo * r + i * (zo + Fo * r))
			]
		}
		Ho.invert = function(t, n) {
			for (var e, r = n, i = r * r, o = i * i * i, a = 0; a < 12 && (o = (i =
					(r -= e = (r * (Io + Yo * i + o * (zo + Fo * i)) - n) / (Io + 3 * Yo *
						i + o * (7 * zo + 9 * Fo * i))) * r) * i * i, !(Ki(e) < Xi)); ++a);
			return [qo * t * (Io + 3 * Yo * i + o * (7 * zo + 9 * Fo * i)) / eo(r),
				ho(oo(r) / qo)
			]
		};

		function Vo(t, n) {
			var e = eo(n),
				r = eo(t) * e;
			return [e * oo(t) / r, oo(n) / r]
		}
		Vo.invert = Bo(to);

		function $o(t, n) {
			var e = n * n,
				r = e * e;
			return [t * (.8707 - .131979 * e + r * (r * (.003971 * e - .001529 * r) -
				.013791)), n * (1.007226 + e * (.015085 + r * (.028874 * e - .044475 -
				.005916 * r)))]
		}
		$o.invert = function(t, n) {
			var e, r = n,
				i = 25;
			do {
				var o = r * r,
					a = o * o;
				r -= e = (r * (1.007226 + o * (.015085 + a * (.028874 * o - .044475 - .005916 *
					a))) - n) / (1.007226 + o * (.045255 + a * (.259866 * o - .311325 - .005916 *
					11 * a)))
			} while (Ki(e) > $i && --i > 0);
			return [t / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 *
				o) - .013791) - .131979)), r]
		};

		function Xo(t, n) {
			return [eo(n) * oo(t), oo(n)]
		}
		Xo.invert = Bo(ho);

		function Zo(t, n) {
			var e = eo(n),
				r = 1 + eo(t) * e;
			return [e * oo(t) / r, oo(n) / r]
		}
		Zo.invert = Bo((function(t) {
			return 2 * to(t)
		}));

		function Jo(t, n) {
			return [io(uo((Ji + n) / 2)), -t]
		}
		Jo.invert = function(t, n) {
			return [-n, 2 * to(ro(t)) - Ji]
		};

		function Wo(t) {
			var n = 0,
				e = t.children,
				r = e && e.length;
			if (r)
				for (; --r >= 0;) n += e[r].value;
			else n = 1;
			t.value = n
		}

		function Qo(t, n) {
			var e, r, i, o, a, s = new na(t),
				u = +t.value && (s.value = t.value),
				c = [s];
			for (null == n && (n = Go); e = c.pop();)
				if (u && (e.value = +e.data.value), (i = n(e.data)) && (a = i.length))
					for (e.children = new Array(a), o = a - 1; o >= 0; --o) c.push(r = e.children[
						o] = new na(i[o])), r.parent = e, r.depth = e.depth + 1;
			return s.eachBefore(ta)
		}

		function Go(t) {
			return t.children
		}

		function Ko(t) {
			t.data = t.data.data
		}

		function ta(t) {
			var n = 0;
			do {
				t.height = n
			} while ((t = t.parent) && t.height < ++n)
		}

		function na(t) {
			this.data = t, this.depth = this.height = 0, this.parent = null
		}
		na.prototype = Qo.prototype = {
			constructor: na,
			count: function() {
				return this.eachAfter(Wo)
			},
			each: function(t) {
				var n, e, r, i, o = this,
					a = [o];
				do {
					for (n = a.reverse(), a = []; o = n.pop();)
						if (t(o), e = o.children)
							for (r = 0, i = e.length; r < i; ++r) a.push(e[r])
				} while (a.length);
				return this
			},
			eachAfter: function(t) {
				for (var n, e, r, i = this, o = [i], a = []; i = o.pop();)
					if (a.push(i), n = i.children)
						for (e = 0, r = n.length; e < r; ++e) o.push(n[e]);
				for (; i = a.pop();) t(i);
				return this
			},
			eachBefore: function(t) {
				for (var n, e, r = this, i = [r]; r = i.pop();)
					if (t(r), n = r.children)
						for (e = n.length - 1; e >= 0; --e) i.push(n[e]);
				return this
			},
			sum: function(t) {
				return this.eachAfter((function(n) {
					for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --
						i >= 0;) e += r[i].value;
					n.value = e
				}))
			},
			sort: function(t) {
				return this.eachBefore((function(n) {
					n.children && n.children.sort(t)
				}))
			},
			path: function(t) {
				for (var n = this, e = function(t, n) {
						if (t === n) return t;
						var e = t.ancestors(),
							r = n.ancestors(),
							i = null;
						t = e.pop(), n = r.pop();
						for (; t === n;) i = t, t = e.pop(), n = r.pop();
						return i
					}(n, t), r = [n]; n !== e;) n = n.parent, r.push(n);
				for (var i = r.length; t !== e;) r.splice(i, 0, t), t = t.parent;
				return r
			},
			ancestors: function() {
				for (var t = this, n = [t]; t = t.parent;) n.push(t);
				return n
			},
			descendants: function() {
				var t = [];
				return this.each((function(n) {
					t.push(n)
				})), t
			},
			leaves: function() {
				var t = [];
				return this.eachBefore((function(n) {
					n.children || t.push(n)
				})), t
			},
			links: function() {
				var t = this,
					n = [];
				return t.each((function(e) {
					e !== t && n.push({
						source: e.parent,
						target: e
					})
				})), n
			},
			copy: function() {
				return Qo(this).eachBefore(Ko)
			}
		};
		Array.prototype.slice;
		var ea = function(t, n, e, r, i) {
			for (var o, a = t.children, s = -1, u = a.length, c = t.value && (r - n) /
					t.value; ++s < u;)(o = a[s]).y0 = e, o.y1 = i, o.x0 = n, o.x1 = n += o
				.value * c
		};

		function ra(t, n) {
			this._ = t, this.parent = null, this.children = null, this.A = null, this
				.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null,
				this.i = n
		}
		ra.prototype = Object.create(na.prototype);
		var ia = function(t, n, e, r, i) {
				for (var o, a = t.children, s = -1, u = a.length, c = t.value && (i - e) /
						t.value; ++s < u;)(o = a[s]).x0 = n, o.x1 = r, o.y0 = e, o.y1 = e += o
					.value * c
			},
			oa = (1 + Math.sqrt(5)) / 2;

		function aa(t, n, e, r, i, o) {
			for (var a, s, u, c, h, f, l, p, d, _, g, y = [], v = n.children, m = 0,
					w = 0, b = v.length, x = n.value; m < b;) {
				u = i - e, c = o - r;
				do {
					h = v[w++].value
				} while (!h && w < b);
				for (f = l = h, g = h * h * (_ = Math.max(c / u, u / c) / (x * t)), d =
					Math.max(l / g, g / f); w < b; ++w) {
					if (h += s = v[w].value, s < f && (f = s), s > l && (l = s), g = h * h *
						_, (p = Math.max(l / g, g / f)) > d) {
						h -= s;
						break
					}
					d = p
				}
				y.push(a = {
					value: h,
					dice: u < c,
					children: v.slice(m, w)
				}), a.dice ? ea(a, e, r, i, x ? r += c * h / x : o) : ia(a, e, r, x ? e +=
					u * h / x : i, o), x -= h, m = w
			}
			return y
		}(function t(n) {
			function e(t, e, r, i, o) {
				aa(n, t, e, r, i, o)
			}
			return e.ratio = function(n) {
				return t((n = +n) > 1 ? n : 1)
			}, e
		})(oa),
		function t(n) {
			function e(t, e, r, i, o) {
				if ((a = t._squarify) && a.ratio === n)
					for (var a, s, u, c, h, f = -1, l = a.length, p = t.value; ++f < l;) {
						for (u = (s = a[f]).children, c = s.value = 0, h = u.length; c < h; ++
							c) s.value += u[c].value;
						s.dice ? ea(s, e, r, i, r += (o - r) * s.value / p) : ia(s, e, r, e +=
							(i - e) * s.value / p, o), p -= s.value
					} else t._squarify = a = aa(n, t, e, r, i, o), a.ratio = n
			}
			return e.ratio = function(n) {
				return t((n = +n) > 1 ? n : 1)
			}, e
		}(oa);
		var sa = function() {
				return Math.random()
			},
			ua = (function t(n) {
				function e(t, e) {
					return t = null == t ? 0 : +t, e = null == e ? 1 : +e, 1 === arguments
						.length ? (e = t, t = 0) : e -= t,
						function() {
							return n() * e + t
						}
				}
				return e.source = t, e
			}(sa), function t(n) {
				function e(t, e) {
					var r, i;
					return t = null == t ? 0 : +t, e = null == e ? 1 : +e,
						function() {
							var o;
							if (null != r) o = r, r = null;
							else
								do {
									r = 2 * n() - 1, o = 2 * n() - 1, i = r * r + o * o
								} while (!i || i > 1);
							return t + e * o * Math.sqrt(-2 * Math.log(i) / i)
						}
				}
				return e.source = t, e
			}(sa)),
			ca = (function t(n) {
				function e() {
					var t = ua.source(n).apply(this, arguments);
					return function() {
						return Math.exp(t())
					}
				}
				return e.source = t, e
			}(sa), function t(n) {
				function e(t) {
					return function() {
						for (var e = 0, r = 0; r < t; ++r) e += n();
						return e
					}
				}
				return e.source = t, e
			}(sa));
		(function t(n) {
			function e(t) {
				var e = ca.source(n)(t);
				return function() {
					return e() / t
				}
			}
			return e.source = t, e
		})(sa),
		function t(n) {
			function e(t) {
				return function() {
					return -Math.log(1 - n()) / t
				}
			}
			return e.source = t, e
		}(sa);

		function ha(t, n) {
			switch (arguments.length) {
				case 0:
					break;
				case 1:
					this.range(t);
					break;
				default:
					this.range(n).domain(t)
			}
			return this
		}
		var fa = Array.prototype,
			la = fa.map,
			pa = fa.slice,
			da = {
				name: "implicit"
			};

		function _a() {
			var t, n, e = function t() {
					var n = Qr(),
						e = [],
						r = [],
						i = da;

					function o(t) {
						var o = t + "",
							a = n.get(o);
						if (!a) {
							if (i !== da) return i;
							n.set(o, a = e.push(t))
						}
						return r[(a - 1) % r.length]
					}
					return o.domain = function(t) {
						if (!arguments.length) return e.slice();
						e = [], n = Qr();
						for (var r, i, a = -1, s = t.length; ++a < s;) n.has(i = (r = t[a]) +
							"") || n.set(i, e.push(r));
						return o
					}, o.range = function(t) {
						return arguments.length ? (r = pa.call(t), o) : r.slice()
					}, o.unknown = function(t) {
						return arguments.length ? (i = t, o) : i
					}, o.copy = function() {
						return t(e, r).unknown(i)
					}, ha.apply(o, arguments), o
				}().unknown(void 0),
				r = e.domain,
				i = e.range,
				o = [0, 1],
				a = !1,
				s = 0,
				u = 0,
				h = .5;

			function f() {
				var e = r().length,
					f = o[1] < o[0],
					l = o[f - 0],
					p = o[1 - f];
				t = (p - l) / Math.max(1, e - s + 2 * u), a && (t = Math.floor(t)), l +=
					(p - l - t * (e - s)) * h, n = t * (1 - s), a && (l = Math.round(l), n =
						Math.round(n));
				var d = c(e).map((function(n) {
					return l + t * n
				}));
				return i(f ? d.reverse() : d)
			}
			return delete e.unknown, e.domain = function(t) {
				return arguments.length ? (r(t), f()) : r()
			}, e.range = function(t) {
				return arguments.length ? (o = [+t[0], +t[1]], f()) : o.slice()
			}, e.rangeRound = function(t) {
				return o = [+t[0], +t[1]], a = !0, f()
			}, e.bandwidth = function() {
				return n
			}, e.step = function() {
				return t
			}, e.round = function(t) {
				return arguments.length ? (a = !!t, f()) : a
			}, e.padding = function(t) {
				return arguments.length ? (s = Math.min(1, u = +t), f()) : s
			}, e.paddingInner = function(t) {
				return arguments.length ? (s = Math.min(1, t), f()) : s
			}, e.paddingOuter = function(t) {
				return arguments.length ? (u = +t, f()) : u
			}, e.align = function(t) {
				return arguments.length ? (h = Math.max(0, Math.min(1, t)), f()) : h
			}, e.copy = function() {
				return _a(r(), o).round(a).paddingInner(s).paddingOuter(u).align(h)
			}, ha.apply(f(), arguments)
		}
		var ga = function(t) {
				return function() {
					return t
				}
			},
			ya = function(t) {
				return +t
			},
			va = [0, 1];

		function ma(t) {
			return t
		}

		function wa(t, n) {
			return (n -= t = +t) ? function(e) {
				return (e - t) / n
			} : ga(isNaN(n) ? NaN : .5)
		}

		function ba(t) {
			var n, e = t[0],
				r = t[t.length - 1];
			return e > r && (n = e, e = r, r = n),
				function(t) {
					return Math.max(e, Math.min(r, t))
				}
		}

		function xa(t, n, e) {
			var r = t[0],
				i = t[1],
				o = n[0],
				a = n[1];
			return i < r ? (r = wa(i, r), o = e(a, o)) : (r = wa(r, i), o = e(o, a)),
				function(t) {
					return o(r(t))
				}
		}

		function Ma(t, n, e) {
			var r = Math.min(t.length, n.length) - 1,
				i = new Array(r),
				o = new Array(r),
				a = -1;
			for (t[r] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++
				a < r;) i[a] = wa(t[a], t[a + 1]), o[a] = e(n[a], n[a + 1]);
			return function(n) {
				var e = s(t, n, 1, r) - 1;
				return o[e](i[e](n))
			}
		}

		function Ta(t, n) {
			return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate())
				.clamp(t.clamp()).unknown(t.unknown())
		}

		function Ca() {
			var t, n, e, r, i, o, a = va,
				s = va,
				u = Jn,
				c = ma;

			function h() {
				return r = Math.min(a.length, s.length) > 2 ? Ma : xa, i = o = null, f
			}

			function f(n) {
				return isNaN(n = +n) ? e : (i || (i = r(a.map(t), s, u)))(t(c(n)))
			}
			return f.invert = function(e) {
					return c(n((o || (o = r(s, a.map(t), Yn)))(e)))
				}, f.domain = function(t) {
					return arguments.length ? (a = la.call(t, ya), c === ma || (c = ba(a)),
						h()) : a.slice()
				}, f.range = function(t) {
					return arguments.length ? (s = pa.call(t), h()) : s.slice()
				}, f.rangeRound = function(t) {
					return s = pa.call(t), u = Wn, h()
				}, f.clamp = function(t) {
					return arguments.length ? (c = t ? ba(a) : ma, f) : c !== ma
				}, f.interpolate = function(t) {
					return arguments.length ? (u = t, h()) : u
				}, f.unknown = function(t) {
					return arguments.length ? (e = t, f) : e
				},
				function(e, r) {
					return t = e, n = r, h()
				}
		}

		function Na(t, n) {
			return Ca()(t, n)
		}
		var Aa = function(t, n, e, r) {
			var i, o = _(t, n, e);
			switch ((r = ki(null == r ? ",f" : r)).type) {
				case "s":
					var a = Math.max(Math.abs(t), Math.abs(n));
					return null != r.precision || isNaN(i = function(t, n) {
						return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(Ei(n) /
							3))) - Ei(Math.abs(t)))
					}(o, a)) || (r.precision = i), Oi(r, a);
				case "":
				case "e":
				case "g":
				case "p":
				case "r":
					null != r.precision || isNaN(i = function(t, n) {
						return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Ei(n) - Ei(
							t)) + 1
					}(o, Math.max(Math.abs(t), Math.abs(n)))) || (r.precision = i - ("e" ===
						r.type));
					break;
				case "f":
				case "%":
					null != r.precision || isNaN(i = function(t) {
						return Math.max(0, -Ei(Math.abs(t)))
					}(o)) || (r.precision = i - 2 * ("%" === r.type))
			}
			return Bi(r)
		};

		function Ea(t) {
			var n = t.domain;
			return t.ticks = function(t) {
				var e = n();
				return p(e[0], e[e.length - 1], null == t ? 10 : t)
			}, t.tickFormat = function(t, e) {
				var r = n();
				return Aa(r[0], r[r.length - 1], null == t ? 10 : t, e)
			}, t.nice = function(e) {
				null == e && (e = 10);
				var r, i = n(),
					o = 0,
					a = i.length - 1,
					s = i[o],
					u = i[a];
				return u < s && (r = s, s = u, u = r, r = o, o = a, a = r), (r = d(s, u,
					e)) > 0 ? r = d(s = Math.floor(s / r) * r, u = Math.ceil(u / r) * r,
					e) : r < 0 && (r = d(s = Math.ceil(s * r) / r, u = Math.floor(u * r) /
					r, e)), r > 0 ? (i[o] = Math.floor(s / r) * r, i[a] = Math.ceil(u / r) *
					r, n(i)) : r < 0 && (i[o] = Math.ceil(s * r) / r, i[a] = Math.floor(u *
					r) / r, n(i)), t
			}, t
		}

		function Sa() {
			var t = Na(ma, ma);
			return t.copy = function() {
				return Ta(t, Sa())
			}, ha.apply(t, arguments), Ea(t)
		}
		var ka = new Date,
			Ua = new Date;

		function Pa(t, n, e, r) {
			function i(n) {
				return t(n = 0 === arguments.length ? new Date : new Date(+n)), n
			}
			return i.floor = function(n) {
				return t(n = new Date(+n)), n
			}, i.ceil = function(e) {
				return t(e = new Date(e - 1)), n(e, 1), t(e), e
			}, i.round = function(t) {
				var n = i(t),
					e = i.ceil(t);
				return t - n < e - t ? n : e
			}, i.offset = function(t, e) {
				return n(t = new Date(+t), null == e ? 1 : Math.floor(e)), t
			}, i.range = function(e, r, o) {
				var a, s = [];
				if (e = i.ceil(e), o = null == o ? 1 : Math.floor(o), !(e < r && o > 0))
					return s;
				do {
					s.push(a = new Date(+e)), n(e, o), t(e)
				} while (a < e && e < r);
				return s
			}, i.filter = function(e) {
				return Pa((function(n) {
					if (n >= n)
						for (; t(n), !e(n);) n.setTime(n - 1)
				}), (function(t, r) {
					if (t >= t)
						if (r < 0)
							for (; ++r <= 0;)
								for (; n(t, -1), !e(t););
						else
							for (; --r >= 0;)
								for (; n(t, 1), !e(t););
				}))
			}, e && (i.count = function(n, r) {
				return ka.setTime(+n), Ua.setTime(+r), t(ka), t(Ua), Math.floor(e(ka,
					Ua))
			}, i.every = function(t) {
				return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ?
					function(n) {
						return r(n) % t == 0
					} : function(n) {
						return i.count(0, n) % t == 0
					}) : i : null
			}), i
		}
		var Ra = Pa((function(t) {
			t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
		}), (function(t, n) {
			t.setFullYear(t.getFullYear() + n)
		}), (function(t, n) {
			return n.getFullYear() - t.getFullYear()
		}), (function(t) {
			return t.getFullYear()
		}));
		Ra.every = function(t) {
			return isFinite(t = Math.floor(t)) && t > 0 ? Pa((function(n) {
				n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1),
					n.setHours(0, 0, 0, 0)
			}), (function(n, e) {
				n.setFullYear(n.getFullYear() + e * t)
			})) : null
		};
		var Ba = Ra,
			Oa = (Ra.range, Pa((function(t) {
				t.setDate(1), t.setHours(0, 0, 0, 0)
			}), (function(t, n) {
				t.setMonth(t.getMonth() + n)
			}), (function(t, n) {
				return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
			}), (function(t) {
				return t.getMonth()
			}))),
			ja = (Oa.range, 6e4),
			Da = 6048e5;

		function La(t) {
			return Pa((function(n) {
				n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7), n.setHours(0, 0, 0,
					0)
			}), (function(t, n) {
				t.setDate(t.getDate() + 7 * n)
			}), (function(t, n) {
				return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * ja) /
					Da
			}))
		}
		var Ia = La(0),
			Ya = La(1),
			za = La(2),
			Fa = La(3),
			qa = La(4),
			Ha = La(5),
			Va = La(6),
			$a = (Ia.range, Ya.range, za.range, Fa.range, qa.range, Ha.range, Va.range,
				Pa((function(t) {
					t.setHours(0, 0, 0, 0)
				}), (function(t, n) {
					t.setDate(t.getDate() + n)
				}), (function(t, n) {
					return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * ja) /
						864e5
				}), (function(t) {
					return t.getDate() - 1
				}))),
			Xa = $a,
			Za = ($a.range, Pa((function(t) {
				t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds() - t.getMinutes() *
					ja)
			}), (function(t, n) {
				t.setTime(+t + 36e5 * n)
			}), (function(t, n) {
				return (n - t) / 36e5
			}), (function(t) {
				return t.getHours()
			}))),
			Ja = (Za.range, Pa((function(t) {
				t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds())
			}), (function(t, n) {
				t.setTime(+t + n * ja)
			}), (function(t, n) {
				return (n - t) / ja
			}), (function(t) {
				return t.getMinutes()
			}))),
			Wa = (Ja.range, Pa((function(t) {
				t.setTime(t - t.getMilliseconds())
			}), (function(t, n) {
				t.setTime(+t + 1e3 * n)
			}), (function(t, n) {
				return (n - t) / 1e3
			}), (function(t) {
				return t.getUTCSeconds()
			}))),
			Qa = (Wa.range, Pa((function() {}), (function(t, n) {
				t.setTime(+t + n)
			}), (function(t, n) {
				return n - t
			})));
		Qa.every = function(t) {
			return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? Pa((function(n) {
				n.setTime(Math.floor(n / t) * t)
			}), (function(n, e) {
				n.setTime(+n + e * t)
			}), (function(n, e) {
				return (e - n) / t
			})) : Qa : null
		};
		Qa.range;

		function Ga(t) {
			return Pa((function(n) {
				n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7), n.setUTCHours(
					0, 0, 0, 0)
			}), (function(t, n) {
				t.setUTCDate(t.getUTCDate() + 7 * n)
			}), (function(t, n) {
				return (n - t) / Da
			}))
		}
		var Ka = Ga(0),
			ts = Ga(1),
			ns = Ga(2),
			es = Ga(3),
			rs = Ga(4),
			is = Ga(5),
			os = Ga(6),
			as = (Ka.range, ts.range, ns.range, es.range, rs.range, is.range, os.range,
				Pa((function(t) {
					t.setUTCHours(0, 0, 0, 0)
				}), (function(t, n) {
					t.setUTCDate(t.getUTCDate() + n)
				}), (function(t, n) {
					return (n - t) / 864e5
				}), (function(t) {
					return t.getUTCDate() - 1
				}))),
			ss = as,
			us = (as.range, Pa((function(t) {
				t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
			}), (function(t, n) {
				t.setUTCFullYear(t.getUTCFullYear() + n)
			}), (function(t, n) {
				return n.getUTCFullYear() - t.getUTCFullYear()
			}), (function(t) {
				return t.getUTCFullYear()
			})));
		us.every = function(t) {
			return isFinite(t = Math.floor(t)) && t > 0 ? Pa((function(n) {
				n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t), n.setUTCMonth(
					0, 1), n.setUTCHours(0, 0, 0, 0)
			}), (function(n, e) {
				n.setUTCFullYear(n.getUTCFullYear() + e * t)
			})) : null
		};
		var cs = us;
		us.range;

		function hs(t) {
			if (0 <= t.y && t.y < 100) {
				var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
				return n.setFullYear(t.y), n
			}
			return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
		}

		function fs(t) {
			if (0 <= t.y && t.y < 100) {
				var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
				return n.setUTCFullYear(t.y), n
			}
			return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
		}

		function ls(t) {
			return {
				y: t,
				m: 0,
				d: 1,
				H: 0,
				M: 0,
				S: 0,
				L: 0
			}
		}
		var ps, ds, _s, gs = {
				"-": "",
				_: " ",
				0: "0"
			},
			ys = /^\s*\d+/,
			vs = /^%/,
			ms = /[\\^$*+?|[\]().{}]/g;

		function ws(t, n, e) {
			var r = t < 0 ? "-" : "",
				i = (r ? -t : t) + "",
				o = i.length;
			return r + (o < e ? new Array(e - o + 1).join(n) + i : i)
		}

		function bs(t) {
			return t.replace(ms, "\\$&")
		}

		function xs(t) {
			return new RegExp("^(?:" + t.map(bs).join("|") + ")", "i")
		}

		function Ms(t) {
			for (var n = {}, e = -1, r = t.length; ++e < r;) n[t[e].toLowerCase()] =
				e;
			return n
		}

		function Ts(t, n, e) {
			var r = ys.exec(n.slice(e, e + 1));
			return r ? (t.w = +r[0], e + r[0].length) : -1
		}

		function Cs(t, n, e) {
			var r = ys.exec(n.slice(e, e + 1));
			return r ? (t.u = +r[0], e + r[0].length) : -1
		}

		function Ns(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.U = +r[0], e + r[0].length) : -1
		}

		function As(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.V = +r[0], e + r[0].length) : -1
		}

		function Es(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.W = +r[0], e + r[0].length) : -1
		}

		function Ss(t, n, e) {
			var r = ys.exec(n.slice(e, e + 4));
			return r ? (t.y = +r[0], e + r[0].length) : -1
		}

		function ks(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), e + r[0].length) : -
				1
		}

		function Us(t, n, e) {
			var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
			return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) :
				-1
		}

		function Ps(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.m = r[0] - 1, e + r[0].length) : -1
		}

		function Rs(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.d = +r[0], e + r[0].length) : -1
		}

		function Bs(t, n, e) {
			var r = ys.exec(n.slice(e, e + 3));
			return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1
		}

		function Os(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.H = +r[0], e + r[0].length) : -1
		}

		function js(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.M = +r[0], e + r[0].length) : -1
		}

		function Ds(t, n, e) {
			var r = ys.exec(n.slice(e, e + 2));
			return r ? (t.S = +r[0], e + r[0].length) : -1
		}

		function Ls(t, n, e) {
			var r = ys.exec(n.slice(e, e + 3));
			return r ? (t.L = +r[0], e + r[0].length) : -1
		}

		function Is(t, n, e) {
			var r = ys.exec(n.slice(e, e + 6));
			return r ? (t.L = Math.floor(r[0] / 1e3), e + r[0].length) : -1
		}

		function Ys(t, n, e) {
			var r = vs.exec(n.slice(e, e + 1));
			return r ? e + r[0].length : -1
		}

		function zs(t, n, e) {
			var r = ys.exec(n.slice(e));
			return r ? (t.Q = +r[0], e + r[0].length) : -1
		}

		function Fs(t, n, e) {
			var r = ys.exec(n.slice(e));
			return r ? (t.Q = 1e3 * +r[0], e + r[0].length) : -1
		}

		function qs(t, n) {
			return ws(t.getDate(), n, 2)
		}

		function Hs(t, n) {
			return ws(t.getHours(), n, 2)
		}

		function Vs(t, n) {
			return ws(t.getHours() % 12 || 12, n, 2)
		}

		function $s(t, n) {
			return ws(1 + Xa.count(Ba(t), t), n, 3)
		}

		function Xs(t, n) {
			return ws(t.getMilliseconds(), n, 3)
		}

		function Zs(t, n) {
			return Xs(t, n) + "000"
		}

		function Js(t, n) {
			return ws(t.getMonth() + 1, n, 2)
		}

		function Ws(t, n) {
			return ws(t.getMinutes(), n, 2)
		}

		function Qs(t, n) {
			return ws(t.getSeconds(), n, 2)
		}

		function Gs(t) {
			var n = t.getDay();
			return 0 === n ? 7 : n
		}

		function Ks(t, n) {
			return ws(Ia.count(Ba(t), t), n, 2)
		}

		function tu(t, n) {
			var e = t.getDay();
			return t = e >= 4 || 0 === e ? qa(t) : qa.ceil(t), ws(qa.count(Ba(t), t) +
				(4 === Ba(t).getDay()), n, 2)
		}

		function nu(t) {
			return t.getDay()
		}

		function eu(t, n) {
			return ws(Ya.count(Ba(t), t), n, 2)
		}

		function ru(t, n) {
			return ws(t.getFullYear() % 100, n, 2)
		}

		function iu(t, n) {
			return ws(t.getFullYear() % 1e4, n, 4)
		}

		function ou(t) {
			var n = t.getTimezoneOffset();
			return (n > 0 ? "-" : (n *= -1, "+")) + ws(n / 60 | 0, "0", 2) + ws(n %
				60, "0", 2)
		}

		function au(t, n) {
			return ws(t.getUTCDate(), n, 2)
		}

		function su(t, n) {
			return ws(t.getUTCHours(), n, 2)
		}

		function uu(t, n) {
			return ws(t.getUTCHours() % 12 || 12, n, 2)
		}

		function cu(t, n) {
			return ws(1 + ss.count(cs(t), t), n, 3)
		}

		function hu(t, n) {
			return ws(t.getUTCMilliseconds(), n, 3)
		}

		function fu(t, n) {
			return hu(t, n) + "000"
		}

		function lu(t, n) {
			return ws(t.getUTCMonth() + 1, n, 2)
		}

		function pu(t, n) {
			return ws(t.getUTCMinutes(), n, 2)
		}

		function du(t, n) {
			return ws(t.getUTCSeconds(), n, 2)
		}

		function _u(t) {
			var n = t.getUTCDay();
			return 0 === n ? 7 : n
		}

		function gu(t, n) {
			return ws(Ka.count(cs(t), t), n, 2)
		}

		function yu(t, n) {
			var e = t.getUTCDay();
			return t = e >= 4 || 0 === e ? rs(t) : rs.ceil(t), ws(rs.count(cs(t), t) +
				(4 === cs(t).getUTCDay()), n, 2)
		}

		function vu(t) {
			return t.getUTCDay()
		}

		function mu(t, n) {
			return ws(ts.count(cs(t), t), n, 2)
		}

		function wu(t, n) {
			return ws(t.getUTCFullYear() % 100, n, 2)
		}

		function bu(t, n) {
			return ws(t.getUTCFullYear() % 1e4, n, 4)
		}

		function xu() {
			return "+0000"
		}

		function Mu() {
			return "%"
		}

		function Tu(t) {
			return +t
		}

		function Cu(t) {
			return Math.floor(+t / 1e3)
		}! function(t) {
			ps = function(t) {
				var n = t.dateTime,
					e = t.date,
					r = t.time,
					i = t.periods,
					o = t.days,
					a = t.shortDays,
					s = t.months,
					u = t.shortMonths,
					c = xs(i),
					h = Ms(i),
					f = xs(o),
					l = Ms(o),
					p = xs(a),
					d = Ms(a),
					_ = xs(s),
					g = Ms(s),
					y = xs(u),
					v = Ms(u),
					m = {
						a: function(t) {
							return a[t.getDay()]
						},
						A: function(t) {
							return o[t.getDay()]
						},
						b: function(t) {
							return u[t.getMonth()]
						},
						B: function(t) {
							return s[t.getMonth()]
						},
						c: null,
						d: qs,
						e: qs,
						f: Zs,
						H: Hs,
						I: Vs,
						j: $s,
						L: Xs,
						m: Js,
						M: Ws,
						p: function(t) {
							return i[+(t.getHours() >= 12)]
						},
						Q: Tu,
						s: Cu,
						S: Qs,
						u: Gs,
						U: Ks,
						V: tu,
						w: nu,
						W: eu,
						x: null,
						X: null,
						y: ru,
						Y: iu,
						Z: ou,
						"%": Mu
					},
					w = {
						a: function(t) {
							return a[t.getUTCDay()]
						},
						A: function(t) {
							return o[t.getUTCDay()]
						},
						b: function(t) {
							return u[t.getUTCMonth()]
						},
						B: function(t) {
							return s[t.getUTCMonth()]
						},
						c: null,
						d: au,
						e: au,
						f: fu,
						H: su,
						I: uu,
						j: cu,
						L: hu,
						m: lu,
						M: pu,
						p: function(t) {
							return i[+(t.getUTCHours() >= 12)]
						},
						Q: Tu,
						s: Cu,
						S: du,
						u: _u,
						U: gu,
						V: yu,
						w: vu,
						W: mu,
						x: null,
						X: null,
						y: wu,
						Y: bu,
						Z: xu,
						"%": Mu
					},
					b = {
						a: function(t, n, e) {
							var r = p.exec(n.slice(e));
							return r ? (t.w = d[r[0].toLowerCase()], e + r[0].length) : -1
						},
						A: function(t, n, e) {
							var r = f.exec(n.slice(e));
							return r ? (t.w = l[r[0].toLowerCase()], e + r[0].length) : -1
						},
						b: function(t, n, e) {
							var r = y.exec(n.slice(e));
							return r ? (t.m = v[r[0].toLowerCase()], e + r[0].length) : -1
						},
						B: function(t, n, e) {
							var r = _.exec(n.slice(e));
							return r ? (t.m = g[r[0].toLowerCase()], e + r[0].length) : -1
						},
						c: function(t, e, r) {
							return T(t, n, e, r)
						},
						d: Rs,
						e: Rs,
						f: Is,
						H: Os,
						I: Os,
						j: Bs,
						L: Ls,
						m: Ps,
						M: js,
						p: function(t, n, e) {
							var r = c.exec(n.slice(e));
							return r ? (t.p = h[r[0].toLowerCase()], e + r[0].length) : -1
						},
						Q: zs,
						s: Fs,
						S: Ds,
						u: Cs,
						U: Ns,
						V: As,
						w: Ts,
						W: Es,
						x: function(t, n, r) {
							return T(t, e, n, r)
						},
						X: function(t, n, e) {
							return T(t, r, n, e)
						},
						y: ks,
						Y: Ss,
						Z: Us,
						"%": Ys
					};

				function x(t, n) {
					return function(e) {
						var r, i, o, a = [],
							s = -1,
							u = 0,
							c = t.length;
						for (e instanceof Date || (e = new Date(+e)); ++s < c;) 37 === t.charCodeAt(
							s) && (a.push(t.slice(u, s)), null != (i = gs[r = t.charAt(++s)]) ?
							r = t.charAt(++s) : i = "e" === r ? " " : "0", (o = n[r]) && (r =
								o(e, i)), a.push(r), u = s + 1);
						return a.push(t.slice(u, s)), a.join("")
					}
				}

				function M(t, n) {
					return function(e) {
						var r, i, o = ls(1900);
						if (T(o, t, e += "", 0) != e.length) return null;
						if ("Q" in o) return new Date(o.Q);
						if ("p" in o && (o.H = o.H % 12 + 12 * o.p), "V" in o) {
							if (o.V < 1 || o.V > 53) return null;
							"w" in o || (o.w = 1), "Z" in o ? (i = (r = fs(ls(o.y))).getUTCDay(),
								r = i > 4 || 0 === i ? ts.ceil(r) : ts(r), r = ss.offset(r, 7 * (
									o.V - 1)), o.y = r.getUTCFullYear(), o.m = r.getUTCMonth(), o.d =
								r.getUTCDate() + (o.w + 6) % 7) : (i = (r = n(ls(o.y))).getDay(),
								r = i > 4 || 0 === i ? Ya.ceil(r) : Ya(r), r = Xa.offset(r, 7 * (
									o.V - 1)), o.y = r.getFullYear(), o.m = r.getMonth(), o.d = r.getDate() +
								(o.w + 6) % 7)
						} else("W" in o || "U" in o) && ("w" in o || (o.w = "u" in o ? o.u %
								7 : "W" in o ? 1 : 0), i = "Z" in o ? fs(ls(o.y)).getUTCDay() : n(
								ls(o.y)).getDay(), o.m = 0, o.d = "W" in o ? (o.w + 6) % 7 + 7 *
							o.W - (i + 5) % 7 : o.w + 7 * o.U - (i + 6) % 7);
						return "Z" in o ? (o.H += o.Z / 100 | 0, o.M += o.Z % 100, fs(o)) :
							n(o)
					}
				}

				function T(t, n, e, r) {
					for (var i, o, a = 0, s = n.length, u = e.length; a < s;) {
						if (r >= u) return -1;
						if (37 === (i = n.charCodeAt(a++))) {
							if (i = n.charAt(a++), !(o = b[i in gs ? n.charAt(a++) : i]) || (r =
									o(t, e, r)) < 0) return -1
						} else if (i != e.charCodeAt(r++)) return -1
					}
					return r
				}
				return (m.x = x(e, m), m.X = x(r, m), m.c = x(n, m), w.x = x(e, w), w.X =
					x(r, w), w.c = x(n, w), {
						format: function(t) {
							var n = x(t += "", m);
							return n.toString = function() {
								return t
							}, n
						},
						parse: function(t) {
							var n = M(t += "", hs);
							return n.toString = function() {
								return t
							}, n
						},
						utcFormat: function(t) {
							var n = x(t += "", w);
							return n.toString = function() {
								return t
							}, n
						},
						utcParse: function(t) {
							var n = M(t, fs);
							return n.toString = function() {
								return t
							}, n
						}
					})
			}(t), ps.format, ps.parse, ds = ps.utcFormat, _s = ps.utcParse
		}({
			dateTime: "%x, %X",
			date: "%-m/%-d/%Y",
			time: "%-I:%M:%S %p",
			periods: ["AM", "PM"],
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
				"Saturday"
			],
			shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			months: ["January", "February", "March", "April", "May", "June", "July",
				"August", "September", "October", "November", "December"
			],
			shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
				"Sep", "Oct", "Nov", "Dec"
			]
		});
		Date.prototype.toISOString || ds("%Y-%m-%dT%H:%M:%S.%LZ"); + new Date(
			"2000-01-01T00:00:00.000Z") || _s("%Y-%m-%dT%H:%M:%S.%LZ");
		var Nu = Pa((function(t) {
				t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
			}), (function(t, n) {
				t.setUTCMonth(t.getUTCMonth() + n)
			}), (function(t, n) {
				return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() -
					t.getUTCFullYear())
			}), (function(t) {
				return t.getUTCMonth()
			})),
			Au = (Nu.range, Pa((function(t) {
				t.setUTCMinutes(0, 0, 0)
			}), (function(t, n) {
				t.setTime(+t + 36e5 * n)
			}), (function(t, n) {
				return (n - t) / 36e5
			}), (function(t) {
				return t.getUTCHours()
			}))),
			Eu = (Au.range, Pa((function(t) {
				t.setUTCSeconds(0, 0)
			}), (function(t, n) {
				t.setTime(+t + n * ja)
			}), (function(t, n) {
				return (n - t) / ja
			}), (function(t) {
				return t.getUTCMinutes()
			})));
		Eu.range;
		var Su = function(t) {
				return function() {
					return t
				}
			},
			ku = (Math.abs, Math.atan2, Math.cos, Math.max, Math.min, Math.sin, Math.sqrt,
				1e-12),
			Uu = Math.PI,
			Pu = 2 * Uu;

		function Ru(t) {
			this._context = t
		}
		Ru.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._point = 0
			},
			lineEnd: function() {
				(this._line || 0 !== this._line && 1 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context
							.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
					default:
						this._context.lineTo(t, n)
				}
			}
		};
		var Bu = function(t) {
			return new Ru(t)
		};
		ju(Bu);

		function Ou(t) {
			this._curve = t
		}

		function ju(t) {
			function n(n) {
				return new Ou(t(n))
			}
			return n._curve = t, n
		}
		Ou.prototype = {
			areaStart: function() {
				this._curve.areaStart()
			},
			areaEnd: function() {
				this._curve.areaEnd()
			},
			lineStart: function() {
				this._curve.lineStart()
			},
			lineEnd: function() {
				this._curve.lineEnd()
			},
			point: function(t, n) {
				this._curve.point(n * Math.sin(t), n * -Math.cos(t))
			}
		};
		var Du = Array.prototype.slice;
		Math.sqrt(1 / 3);
		var Lu = Math.sin(Uu / 10) / Math.sin(7 * Uu / 10),
			Iu = (Math.sin(Pu / 10), Math.cos(Pu / 10), Math.sqrt(3), Math.sqrt(3),
				Math.sqrt(12),
				function() {});

		function Yu(t, n, e) {
			t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (
				t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 +
				n) / 6, (t._y0 + 4 * t._y1 + e) / 6)
		}

		function zu(t) {
			this._context = t
		}
		zu.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
			},
			lineEnd: function() {
				switch (this._point) {
					case 3:
						Yu(this, this._x1, this._y1);
					case 2:
						this._context.lineTo(this._x1, this._y1)
				}(this._line || 0 !== this._line && 1 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context
							.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (
							5 * this._y0 + this._y1) / 6);
					default:
						Yu(this, t, n)
				}
				this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
			}
		};

		function Fu(t) {
			this._context = t
		}
		Fu.prototype = {
			areaStart: Iu,
			areaEnd: Iu,
			lineStart: function() {
				this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this
					._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0
			},
			lineEnd: function() {
				switch (this._point) {
					case 1:
						this._context.moveTo(this._x2, this._y2), this._context.closePath();
						break;
					case 2:
						this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 *
							this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (
							this._y3 + 2 * this._y2) / 3), this._context.closePath();
						break;
					case 3:
						this.point(this._x2, this._y2), this.point(this._x3, this._y3), this
							.point(this._x4, this._y4)
				}
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._x2 = t, this._y2 = n;
						break;
					case 1:
						this._point = 2, this._x3 = t, this._y3 = n;
						break;
					case 2:
						this._point = 3, this._x4 = t, this._y4 = n, this._context.moveTo((
								this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) /
							6);
						break;
					default:
						Yu(this, t, n)
				}
				this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
			}
		};

		function qu(t) {
			this._context = t
		}
		qu.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
			},
			lineEnd: function() {
				(this._line || 0 !== this._line && 3 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1;
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3;
						var e = (this._x0 + 4 * this._x1 + t) / 6,
							r = (this._y0 + 4 * this._y1 + n) / 6;
						this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
						break;
					case 3:
						this._point = 4;
					default:
						Yu(this, t, n)
				}
				this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
			}
		};

		function Hu(t, n) {
			this._basis = new zu(t), this._beta = n
		}
		Hu.prototype = {
			lineStart: function() {
				this._x = [], this._y = [], this._basis.lineStart()
			},
			lineEnd: function() {
				var t = this._x,
					n = this._y,
					e = t.length - 1;
				if (e > 0)
					for (var r, i = t[0], o = n[0], a = t[e] - i, s = n[e] - o, u = -1; ++
						u <= e;) r = u / e, this._basis.point(this._beta * t[u] + (1 - this._beta) *
						(i + r * a), this._beta * n[u] + (1 - this._beta) * (o + r * s));
				this._x = this._y = null, this._basis.lineEnd()
			},
			point: function(t, n) {
				this._x.push(+t), this._y.push(+n)
			}
		};
		(function t(n) {
			function e(t) {
				return 1 === n ? new zu(t) : new Hu(t, n)
			}
			return e.beta = function(n) {
				return t(+n)
			}, e
		})(.85);

		function Vu(t, n, e) {
			t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (
					t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e),
				t._x2, t._y2)
		}

		function $u(t, n) {
			this._context = t, this._k = (1 - n) / 6
		}
		$u.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
					this._point = 0
			},
			lineEnd: function() {
				switch (this._point) {
					case 2:
						this._context.lineTo(this._x2, this._y2);
						break;
					case 3:
						Vu(this, this._x1, this._y1)
				}(this._line || 0 !== this._line && 1 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context
							.moveTo(t, n);
						break;
					case 1:
						this._point = 2, this._x1 = t, this._y1 = n;
						break;
					case 2:
						this._point = 3;
					default:
						Vu(this, t, n)
				}
				this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 =
					this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		(function t(n) {
			function e(t) {
				return new $u(t, n)
			}
			return e.tension = function(n) {
				return t(+n)
			}, e
		})(0);

		function Xu(t, n) {
			this._context = t, this._k = (1 - n) / 6
		}
		Xu.prototype = {
			areaStart: Iu,
			areaEnd: Iu,
			lineStart: function() {
				this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this
					._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN,
					this._point = 0
			},
			lineEnd: function() {
				switch (this._point) {
					case 1:
						this._context.moveTo(this._x3, this._y3), this._context.closePath();
						break;
					case 2:
						this._context.lineTo(this._x3, this._y3), this._context.closePath();
						break;
					case 3:
						this.point(this._x3, this._y3), this.point(this._x4, this._y4), this
							.point(this._x5, this._y5)
				}
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._x3 = t, this._y3 = n;
						break;
					case 1:
						this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
						break;
					case 2:
						this._point = 3, this._x5 = t, this._y5 = n;
						break;
					default:
						Vu(this, t, n)
				}
				this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 =
					this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		(function t(n) {
			function e(t) {
				return new Xu(t, n)
			}
			return e.tension = function(n) {
				return t(+n)
			}, e
		})(0);

		function Zu(t, n) {
			this._context = t, this._k = (1 - n) / 6
		}
		Zu.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
					this._point = 0
			},
			lineEnd: function() {
				(this._line || 0 !== this._line && 3 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1;
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) :
							this._context.moveTo(this._x2, this._y2);
						break;
					case 3:
						this._point = 4;
					default:
						Vu(this, t, n)
				}
				this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 =
					this._y1, this._y1 = this._y2, this._y2 = n
			}
		};
		(function t(n) {
			function e(t) {
				return new Zu(t, n)
			}
			return e.tension = function(n) {
				return t(+n)
			}, e
		})(0);

		function Ju(t, n, e) {
			var r = t._x1,
				i = t._y1,
				o = t._x2,
				a = t._y2;
			if (t._l01_a > ku) {
				var s = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
					u = 3 * t._l01_a * (t._l01_a + t._l12_a);
				r = (r * s - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / u, i = (i * s - t._y0 *
					t._l12_2a + t._y2 * t._l01_2a) / u
			}
			if (t._l23_a > ku) {
				var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
					h = 3 * t._l23_a * (t._l23_a + t._l12_a);
				o = (o * c + t._x1 * t._l23_2a - n * t._l12_2a) / h, a = (a * c + t._y1 *
					t._l23_2a - e * t._l12_2a) / h
			}
			t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2)
		}

		function Wu(t, n) {
			this._context = t, this._alpha = n
		}
		Wu.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
					this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a =
					this._l23_2a = this._point = 0
			},
			lineEnd: function() {
				switch (this._point) {
					case 2:
						this._context.lineTo(this._x2, this._y2);
						break;
					case 3:
						this.point(this._x2, this._y2)
				}(this._line || 0 !== this._line && 1 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				if (t = +t, n = +n, this._point) {
					var e = this._x2 - t,
						r = this._y2 - n;
					this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
				}
				switch (this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context
							.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3;
					default:
						Ju(this, t, n)
				}
				this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a =
					this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 =
					this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2,
					this._y2 = n
			}
		};
		(function t(n) {
			function e(t) {
				return n ? new Wu(t, n) : new $u(t, 0)
			}
			return e.alpha = function(n) {
				return t(+n)
			}, e
		})(.5);

		function Qu(t, n) {
			this._context = t, this._alpha = n
		}
		Qu.prototype = {
			areaStart: Iu,
			areaEnd: Iu,
			lineStart: function() {
				this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this
					._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN,
					this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a =
					this._l23_2a = this._point = 0
			},
			lineEnd: function() {
				switch (this._point) {
					case 1:
						this._context.moveTo(this._x3, this._y3), this._context.closePath();
						break;
					case 2:
						this._context.lineTo(this._x3, this._y3), this._context.closePath();
						break;
					case 3:
						this.point(this._x3, this._y3), this.point(this._x4, this._y4), this
							.point(this._x5, this._y5)
				}
			},
			point: function(t, n) {
				if (t = +t, n = +n, this._point) {
					var e = this._x2 - t,
						r = this._y2 - n;
					this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
				}
				switch (this._point) {
					case 0:
						this._point = 1, this._x3 = t, this._y3 = n;
						break;
					case 1:
						this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
						break;
					case 2:
						this._point = 3, this._x5 = t, this._y5 = n;
						break;
					default:
						Ju(this, t, n)
				}
				this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a =
					this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 =
					this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2,
					this._y2 = n
			}
		};
		(function t(n) {
			function e(t) {
				return n ? new Qu(t, n) : new Xu(t, 0)
			}
			return e.alpha = function(n) {
				return t(+n)
			}, e
		})(.5);

		function Gu(t, n) {
			this._context = t, this._alpha = n
		}
		Gu.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
					this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a =
					this._l23_2a = this._point = 0
			},
			lineEnd: function() {
				(this._line || 0 !== this._line && 3 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				if (t = +t, n = +n, this._point) {
					var e = this._x2 - t,
						r = this._y2 - n;
					this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
				}
				switch (this._point) {
					case 0:
						this._point = 1;
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) :
							this._context.moveTo(this._x2, this._y2);
						break;
					case 3:
						this._point = 4;
					default:
						Ju(this, t, n)
				}
				this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a =
					this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 =
					this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2,
					this._y2 = n
			}
		};
		(function t(n) {
			function e(t) {
				return n ? new Gu(t, n) : new Zu(t, 0)
			}
			return e.alpha = function(n) {
				return t(+n)
			}, e
		})(.5);

		function Ku(t) {
			this._context = t
		}
		Ku.prototype = {
			areaStart: Iu,
			areaEnd: Iu,
			lineStart: function() {
				this._point = 0
			},
			lineEnd: function() {
				this._point && this._context.closePath()
			},
			point: function(t, n) {
				t = +t, n = +n, this._point ? this._context.lineTo(t, n) : (this._point =
					1, this._context.moveTo(t, n))
			}
		};

		function tc(t) {
			return t < 0 ? -1 : 1
		}

		function nc(t, n, e) {
			var r = t._x1 - t._x0,
				i = n - t._x1,
				o = (t._y1 - t._y0) / (r || i < 0 && -0),
				a = (e - t._y1) / (i || r < 0 && -0),
				s = (o * i + a * r) / (r + i);
			return (tc(o) + tc(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(
				s)) || 0
		}

		function ec(t, n) {
			var e = t._x1 - t._x0;
			return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n
		}

		function rc(t, n, e) {
			var r = t._x0,
				i = t._y0,
				o = t._x1,
				a = t._y1,
				s = (o - r) / 3;
			t._context.bezierCurveTo(r + s, i + s * n, o - s, a - s * e, o, a)
		}

		function ic(t) {
			this._context = t
		}

		function oc(t) {
			this._context = new ac(t)
		}

		function ac(t) {
			this._context = t
		}

		function sc(t) {
			this._context = t
		}

		function uc(t) {
			var n, e, r = t.length - 1,
				i = new Array(r),
				o = new Array(r),
				a = new Array(r);
			for (i[0] = 0, o[0] = 2, a[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n) i[
				n] = 1, o[n] = 4, a[n] = 4 * t[n] + 2 * t[n + 1];
			for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], n = 1; n <
				r; ++n) e = i[n] / o[n - 1], o[n] -= e, a[n] -= e * a[n - 1];
			for (i[r - 1] = a[r - 1] / o[r - 1], n = r - 2; n >= 0; --n) i[n] = (a[n] -
				i[n + 1]) / o[n];
			for (o[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n) o[n] = 2 *
				t[n + 1] - i[n + 1];
			return [i, o]
		}
		ic.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point =
					0
			},
			lineEnd: function() {
				switch (this._point) {
					case 2:
						this._context.lineTo(this._x1, this._y1);
						break;
					case 3:
						rc(this, this._t0, ec(this, this._t0))
				}(this._line || 0 !== this._line && 1 === this._point) && this._context
					.closePath(), this._line = 1 - this._line
			},
			point: function(t, n) {
				var e = NaN;
				if (n = +n, (t = +t) !== this._x1 || n !== this._y1) {
					switch (this._point) {
						case 0:
							this._point = 1, this._line ? this._context.lineTo(t, n) : this._context
								.moveTo(t, n);
							break;
						case 1:
							this._point = 2;
							break;
						case 2:
							this._point = 3, rc(this, ec(this, e = nc(this, t, n)), e);
							break;
						default:
							rc(this, this._t0, e = nc(this, t, n))
					}
					this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n,
						this._t0 = e
				}
			}
		}, (oc.prototype = Object.create(ic.prototype)).point = function(t, n) {
			ic.prototype.point.call(this, n, t)
		}, ac.prototype = {
			moveTo: function(t, n) {
				this._context.moveTo(n, t)
			},
			closePath: function() {
				this._context.closePath()
			},
			lineTo: function(t, n) {
				this._context.lineTo(n, t)
			},
			bezierCurveTo: function(t, n, e, r, i, o) {
				this._context.bezierCurveTo(n, t, r, e, o, i)
			}
		}, sc.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x = [], this._y = []
			},
			lineEnd: function() {
				var t = this._x,
					n = this._y,
					e = t.length;
				if (e)
					if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(
							t[0], n[0]), 2 === e) this._context.lineTo(t[1], n[1]);
					else
						for (var r = uc(t), i = uc(n), o = 0, a = 1; a < e; ++o, ++a) this._context
							.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[a], n[a]);
					(this._line || 0 !== this._line && 1 === e) && this._context.closePath(),
					this._line = 1 - this._line, this._x = this._y = null
			},
			point: function(t, n) {
				this._x.push(+t), this._y.push(+n)
			}
		};

		function cc(t, n) {
			this._context = t, this._t = n
		}
		cc.prototype = {
			areaStart: function() {
				this._line = 0
			},
			areaEnd: function() {
				this._line = NaN
			},
			lineStart: function() {
				this._x = this._y = NaN, this._point = 0
			},
			lineEnd: function() {
				0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(
						this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) &&
					this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t,
						this._line = 1 - this._line)
			},
			point: function(t, n) {
				switch (t = +t, n = +n, this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context
							.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
					default:
						if (this._t <= 0) this._context.lineTo(this._x, n), this._context.lineTo(
							t, n);
						else {
							var e = this._x * (1 - this._t) + t * this._t;
							this._context.lineTo(e, this._y), this._context.lineTo(e, n)
						}
				}
				this._x = t, this._y = n
			}
		};
		var hc = function(t, n) {
				if ((i = t.length) > 1)
					for (var e, r, i, o = 1, a = t[n[0]], s = a.length; o < i; ++o)
						for (r = a, a = t[n[o]], e = 0; e < s; ++e) a[e][1] += a[e][0] = isNaN(
							r[e][1]) ? r[e][0] : r[e][1]
			},
			fc = function(t) {
				for (var n = t.length, e = new Array(n); --n >= 0;) e[n] = n;
				return e
			};

		function lc(t, n) {
			return t[n]
		}
		var pc = function() {
			var t = Su([]),
				n = fc,
				e = hc,
				r = lc;

			function i(i) {
				var o, a, s = t.apply(this, arguments),
					u = i.length,
					c = s.length,
					h = new Array(c);
				for (o = 0; o < c; ++o) {
					for (var f, l = s[o], p = h[o] = new Array(u), d = 0; d < u; ++d) p[d] =
						f = [0, +r(i[d], l, d, i)], f.data = i[d];
					p.key = l
				}
				for (o = 0, a = n(h); o < c; ++o) h[a[o]].index = o;
				return e(h, a), h
			}
			return i.keys = function(n) {
				return arguments.length ? (t = "function" == typeof n ? n : Su(Du.call(
					n)), i) : t
			}, i.value = function(t) {
				return arguments.length ? (r = "function" == typeof t ? t : Su(+t), i) :
					r
			}, i.order = function(t) {
				return arguments.length ? (n = null == t ? fc : "function" == typeof t ?
					t : Su(Du.call(t)), i) : n
			}, i.offset = function(t) {
				return arguments.length ? (e = null == t ? hc : t, i) : e
			}, i
		};

		function dc() {
			this._ = null
		}

		function _c(t) {
			t.U = t.C = t.L = t.R = t.P = t.N = null
		}

		function gc(t, n) {
			var e = n,
				r = n.R,
				i = e.U;
			i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.R = r.L,
				e.R && (e.R.U = e), r.L = e
		}

		function yc(t, n) {
			var e = n,
				r = n.L,
				i = e.U;
			i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.L = r.R,
				e.L && (e.L.U = e), r.R = e
		}

		function vc(t) {
			for (; t.L;) t = t.L;
			return t
		}
		dc.prototype = {
			constructor: dc,
			insert: function(t, n) {
				var e, r, i;
				if (t) {
					if (n.P = t, n.N = t.N, t.N && (t.N.P = n), t.N = n, t.R) {
						for (t = t.R; t.L;) t = t.L;
						t.L = n
					} else t.R = n;
					e = t
				} else this._ ? (t = vc(this._), n.P = null, n.N = t, t.P = t.L = n, e =
					t) : (n.P = n.N = null, this._ = n, e = null);
				for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C;) e === (r =
						e.U).L ? (i = r.R) && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t ===
						e.R && (gc(this, e), e = (t = e).U), e.C = !1, r.C = !0, yc(this, r)
					) : (i = r.L) && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.L &&
						(yc(this, e), e = (t = e).U), e.C = !1, r.C = !0, gc(this, r)), e =
					t.U;
				this._.C = !1
			},
			remove: function(t) {
				t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
				var n, e, r, i = t.U,
					o = t.L,
					a = t.R;
				if (e = o ? a ? vc(a) : o : a, i ? i.L === t ? i.L = e : i.R = e :
					this._ = e, o && a ? (r = e.C, e.C = t.C, e.L = o, o.U = e, e !== a ?
						(i = e.U, e.U = t.U, t = e.R, i.L = t, e.R = a, a.U = e) : (e.U = i,
							i = e, t = e.R)) : (r = t.C, t = e), t && (t.U = i), !r)
					if (t && t.C) t.C = !1;
					else {
						do {
							if (t === this._) break;
							if (t === i.L) {
								if ((n = i.R).C && (n.C = !1, i.C = !0, gc(this, i), n = i.R), n.L &&
									n.L.C || n.R && n.R.C) {
									n.R && n.R.C || (n.L.C = !1, n.C = !0, yc(this, n), n = i.R), n.C =
										i.C, i.C = n.R.C = !1, gc(this, i), t = this._;
									break
								}
							} else if ((n = i.L).C && (n.C = !1, i.C = !0, yc(this, i), n = i.L),
								n.L && n.L.C || n.R && n.R.C) {
								n.L && n.L.C || (n.R.C = !1, n.C = !0, gc(this, n), n = i.L), n.C =
									i.C, i.C = n.L.C = !1, yc(this, i), t = this._;
								break
							}
							n.C = !0, t = i, i = i.U
						} while (!t.C);
						t && (t.C = !1)
					}
			}
		};
		var mc = dc;

		function wc(t, n, e, r) {
			var i = [null, null],
				o = Hc.push(i) - 1;
			return i.left = t, i.right = n, e && xc(i, t, n, e), r && xc(i, n, t, r),
				Fc[t.index].halfedges.push(o), Fc[n.index].halfedges.push(o), i
		}

		function bc(t, n, e) {
			var r = [n, e];
			return r.left = t, r
		}

		function xc(t, n, e, r) {
			t[0] || t[1] ? t.left === e ? t[1] = r : t[0] = r : (t[0] = r, t.left = n,
				t.right = e)
		}

		function Mc(t, n, e, r, i) {
			var o, a = t[0],
				s = t[1],
				u = a[0],
				c = a[1],
				h = 0,
				f = 1,
				l = s[0] - u,
				p = s[1] - c;
			if (o = n - u, l || !(o > 0)) {
				if (o /= l, l < 0) {
					if (o < h) return;
					o < f && (f = o)
				} else if (l > 0) {
					if (o > f) return;
					o > h && (h = o)
				}
				if (o = r - u, l || !(o < 0)) {
					if (o /= l, l < 0) {
						if (o > f) return;
						o > h && (h = o)
					} else if (l > 0) {
						if (o < h) return;
						o < f && (f = o)
					}
					if (o = e - c, p || !(o > 0)) {
						if (o /= p, p < 0) {
							if (o < h) return;
							o < f && (f = o)
						} else if (p > 0) {
							if (o > f) return;
							o > h && (h = o)
						}
						if (o = i - c, p || !(o < 0)) {
							if (o /= p, p < 0) {
								if (o > f) return;
								o > h && (h = o)
							} else if (p > 0) {
								if (o < h) return;
								o < f && (f = o)
							}
							return !(h > 0 || f < 1) || (h > 0 && (t[0] = [u + h * l, c + h * p]),
								f < 1 && (t[1] = [u + f * l, c + f * p]), !0)
						}
					}
				}
			}
		}

		function Tc(t, n, e, r, i) {
			var o = t[1];
			if (o) return !0;
			var a, s, u = t[0],
				c = t.left,
				h = t.right,
				f = c[0],
				l = c[1],
				p = h[0],
				d = h[1],
				_ = (f + p) / 2,
				g = (l + d) / 2;
			if (d === l) {
				if (_ < n || _ >= r) return;
				if (f > p) {
					if (u) {
						if (u[1] >= i) return
					} else u = [_, e];
					o = [_, i]
				} else {
					if (u) {
						if (u[1] < e) return
					} else u = [_, i];
					o = [_, e]
				}
			} else if (s = g - (a = (f - p) / (d - l)) * _, a < -1 || a > 1)
				if (f > p) {
					if (u) {
						if (u[1] >= i) return
					} else u = [(e - s) / a, e];
					o = [(i - s) / a, i]
				} else {
					if (u) {
						if (u[1] < e) return
					} else u = [(i - s) / a, i];
					o = [(e - s) / a, e]
				} else if (l < d) {
				if (u) {
					if (u[0] >= r) return
				} else u = [n, a * n + s];
				o = [r, a * r + s]
			} else {
				if (u) {
					if (u[0] < n) return
				} else u = [r, a * r + s];
				o = [n, a * n + s]
			}
			return t[0] = u, t[1] = o, !0
		}

		function Cc(t, n) {
			var e = t.site,
				r = n.left,
				i = n.right;
			return e === i && (i = r, r = e), i ? Math.atan2(i[1] - r[1], i[0] - r[0]) :
				(e === r ? (r = n[1], i = n[0]) : (r = n[0], i = n[1]), Math.atan2(r[0] -
					i[0], i[1] - r[1]))
		}

		function Nc(t, n) {
			return n[+(n.left !== t.site)]
		}

		function Ac(t, n) {
			return n[+(n.left === t.site)]
		}
		var Ec, Sc = [];

		function kc() {
			_c(this), this.x = this.y = this.arc = this.site = this.cy = null
		}

		function Uc(t) {
			var n = t.P,
				e = t.N;
			if (n && e) {
				var r = n.site,
					i = t.site,
					o = e.site;
				if (r !== o) {
					var a = i[0],
						s = i[1],
						u = r[0] - a,
						c = r[1] - s,
						h = o[0] - a,
						f = o[1] - s,
						l = 2 * (u * f - c * h);
					if (!(l >= -$c)) {
						var p = u * u + c * c,
							d = h * h + f * f,
							_ = (f * p - c * d) / l,
							g = (u * d - h * p) / l,
							y = Sc.pop() || new kc;
						y.arc = t, y.site = i, y.x = _ + a, y.y = (y.cy = g + s) + Math.sqrt(_ *
							_ + g * g), t.circle = y;
						for (var v = null, m = qc._; m;)
							if (y.y < m.y || y.y === m.y && y.x <= m.x) {
								if (!m.L) {
									v = m.P;
									break
								}
								m = m.L
							} else {
								if (!m.R) {
									v = m;
									break
								}
								m = m.R
							}
						qc.insert(v, y), v || (Ec = y)
					}
				}
			}
		}

		function Pc(t) {
			var n = t.circle;
			n && (n.P || (Ec = n.N), qc.remove(n), Sc.push(n), _c(n), t.circle = null)
		}
		var Rc = [];

		function Bc() {
			_c(this), this.edge = this.site = this.circle = null
		}

		function Oc(t) {
			var n = Rc.pop() || new Bc;
			return n.site = t, n
		}

		function jc(t) {
			Pc(t), zc.remove(t), Rc.push(t), _c(t)
		}

		function Dc(t) {
			var n = t.circle,
				e = n.x,
				r = n.cy,
				i = [e, r],
				o = t.P,
				a = t.N,
				s = [t];
			jc(t);
			for (var u = o; u.circle && Math.abs(e - u.circle.x) < Vc && Math.abs(r -
					u.circle.cy) < Vc;) o = u.P, s.unshift(u), jc(u), u = o;
			s.unshift(u), Pc(u);
			for (var c = a; c.circle && Math.abs(e - c.circle.x) < Vc && Math.abs(r -
					c.circle.cy) < Vc;) a = c.N, s.push(c), jc(c), c = a;
			s.push(c), Pc(c);
			var h, f = s.length;
			for (h = 1; h < f; ++h) c = s[h], u = s[h - 1], xc(c.edge, u.site, c.site,
				i);
			u = s[0], (c = s[f - 1]).edge = wc(u.site, c.site, null, i), Uc(u), Uc(c)
		}

		function Lc(t) {
			for (var n, e, r, i, o = t[0], a = t[1], s = zc._; s;)
				if ((r = Ic(s, a) - o) > Vc) s = s.L;
				else {
					if (!((i = o - Yc(s, a)) > Vc)) {
						r > -Vc ? (n = s.P, e = s) : i > -Vc ? (n = s, e = s.N) : n = e = s;
						break
					}
					if (!s.R) {
						n = s;
						break
					}
					s = s.R
				}! function(t) {
				Fc[t.index] = {
					site: t,
					halfedges: []
				}
			}(t);
			var u = Oc(t);
			if (zc.insert(n, u), n || e) {
				if (n === e) return Pc(n), e = Oc(n.site), zc.insert(u, e), u.edge = e.edge =
					wc(n.site, u.site), Uc(n), void Uc(e);
				if (e) {
					Pc(n), Pc(e);
					var c = n.site,
						h = c[0],
						f = c[1],
						l = t[0] - h,
						p = t[1] - f,
						d = e.site,
						_ = d[0] - h,
						g = d[1] - f,
						y = 2 * (l * g - p * _),
						v = l * l + p * p,
						m = _ * _ + g * g,
						w = [(g * v - p * m) / y + h, (l * m - _ * v) / y + f];
					xc(e.edge, c, d, w), u.edge = wc(c, t, null, w), e.edge = wc(t, d, null,
						w), Uc(n), Uc(e)
				} else u.edge = wc(n.site, u.site)
			}
		}

		function Ic(t, n) {
			var e = t.site,
				r = e[0],
				i = e[1],
				o = i - n;
			if (!o) return r;
			var a = t.P;
			if (!a) return -1 / 0;
			var s = (e = a.site)[0],
				u = e[1],
				c = u - n;
			if (!c) return s;
			var h = s - r,
				f = 1 / o - 1 / c,
				l = h / c;
			return f ? (-l + Math.sqrt(l * l - 2 * f * (h * h / (-2 * c) - u + c / 2 +
				i - o / 2))) / f + r : (r + s) / 2
		}

		function Yc(t, n) {
			var e = t.N;
			if (e) return Ic(e, n);
			var r = t.site;
			return r[1] === n ? r[0] : 1 / 0
		}
		var zc, Fc, qc, Hc, Vc = 1e-6,
			$c = 1e-12;

		function Xc(t, n) {
			return n[1] - t[1] || n[0] - t[0]
		}

		function Zc(t, n) {
			var e, r, i, o = t.sort(Xc).pop();
			for (Hc = [], Fc = new Array(t.length), zc = new mc, qc = new mc;;)
				if (i = Ec, o && (!i || o[1] < i.y || o[1] === i.y && o[0] < i.x)) o[0] ===
					e && o[1] === r || (Lc(o), e = o[0], r = o[1]), o = t.pop();
				else {
					if (!i) break;
					Dc(i.arc)
				}
			if (function() {
					for (var t, n, e, r, i = 0, o = Fc.length; i < o; ++i)
						if ((t = Fc[i]) && (r = (n = t.halfedges).length)) {
							var a = new Array(r),
								s = new Array(r);
							for (e = 0; e < r; ++e) a[e] = e, s[e] = Cc(t, Hc[n[e]]);
							for (a.sort((function(t, n) {
									return s[n] - s[t]
								})), e = 0; e < r; ++e) s[e] = n[a[e]];
							for (e = 0; e < r; ++e) n[e] = s[e]
						}
				}(), n) {
				var a = +n[0][0],
					s = +n[0][1],
					u = +n[1][0],
					c = +n[1][1];
				! function(t, n, e, r) {
					for (var i, o = Hc.length; o--;) Tc(i = Hc[o], t, n, e, r) && Mc(i, t,
						n, e, r) && (Math.abs(i[0][0] - i[1][0]) > Vc || Math.abs(i[0][1] - i[
						1][1]) > Vc) || delete Hc[o]
				}(a, s, u, c),
				function(t, n, e, r) {
					var i, o, a, s, u, c, h, f, l, p, d, _, g = Fc.length,
						y = !0;
					for (i = 0; i < g; ++i)
						if (o = Fc[i]) {
							for (a = o.site, s = (u = o.halfedges).length; s--;) Hc[u[s]] || u.splice(
								s, 1);
							for (s = 0, c = u.length; s < c;) d = (p = Ac(o, Hc[u[s]]))[0], _ = p[
								1], f = (h = Nc(o, Hc[u[++s % c]]))[0], l = h[1], (Math.abs(d - f) >
								Vc || Math.abs(_ - l) > Vc) && (u.splice(s, 0, Hc.push(bc(a, p,
								Math.abs(d - t) < Vc && r - _ > Vc ? [t, Math.abs(f - t) < Vc ?
									l : r
								] : Math.abs(_ - r) < Vc && e - d > Vc ? [Math.abs(l - r) < Vc ?
									f : e, r
								] : Math.abs(d - e) < Vc && _ - n > Vc ? [e, Math.abs(f - e) <
									Vc ? l : n
								] : Math.abs(_ - n) < Vc && d - t > Vc ? [Math.abs(l - n) < Vc ?
									f : t, n
								] : null)) - 1), ++c);
							c && (y = !1)
						}
					if (y) {
						var v, m, w, b = 1 / 0;
						for (i = 0, y = null; i < g; ++i)(o = Fc[i]) && (w = (v = (a = o.site)[
							0] - t) * v + (m = a[1] - n) * m) < b && (b = w, y = o);
						if (y) {
							var x = [t, n],
								M = [t, r],
								T = [e, r],
								C = [e, n];
							y.halfedges.push(Hc.push(bc(a = y.site, x, M)) - 1, Hc.push(bc(a, M,
								T)) - 1, Hc.push(bc(a, T, C)) - 1, Hc.push(bc(a, C, x)) - 1)
						}
					}
					for (i = 0; i < g; ++i)(o = Fc[i]) && (o.halfedges.length || delete Fc[
						i])
				}(a, s, u, c)
			}
			this.edges = Hc, this.cells = Fc, zc = qc = Hc = Fc = null
		}
		Zc.prototype = {
			constructor: Zc,
			polygons: function() {
				var t = this.edges;
				return this.cells.map((function(n) {
					var e = n.halfedges.map((function(e) {
						return Nc(n, t[e])
					}));
					return e.data = n.site.data, e
				}))
			},
			triangles: function() {
				var t = [],
					n = this.edges;
				return this.cells.forEach((function(e, r) {
					if (o = (i = e.halfedges).length)
						for (var i, o, a, s, u, c, h = e.site, f = -1, l = n[i[o - 1]], p =
								l.left === h ? l.right : l.left; ++f < o;) a = p, p = (l = n[i[
								f]]).left === h ? l.right : l.left, a && p && r < a.index && r <
							p.index && (u = a, c = p, ((s = h)[0] - c[0]) * (u[1] - s[1]) -
								(s[0] - u[0]) * (c[1] - s[1]) < 0) && t.push([h.data, a.data, p
								.data
							])
				})), t
			},
			links: function() {
				return this.edges.filter((function(t) {
					return t.right
				})).map((function(t) {
					return {
						source: t.left.data,
						target: t.right.data
					}
				}))
			},
			find: function(t, n, e) {
				for (var r, i, o = this, a = o._found || 0, s = o.cells.length; !(i =
						o.cells[a]);)
					if (++a >= s) return null;
				var u = t - i.site[0],
					c = n - i.site[1],
					h = u * u + c * c;
				do {
					i = o.cells[r = a], a = null, i.halfedges.forEach((function(e) {
						var r = o.edges[e],
							s = r.left;
						if (s !== i.site && s || (s = r.right)) {
							var u = t - s[0],
								c = n - s[1],
								f = u * u + c * c;
							f < h && (h = f, a = s.index)
						}
					}))
				} while (null !== a);
				return o._found = r, null == e || h <= e * e ? i.site : null
			}
		};

		function Jc(t, n, e) {
			this.k = t, this.x = n, this.y = e
		}
		Jc.prototype = {
			constructor: Jc,
			scale: function(t) {
				return 1 === t ? this : new Jc(this.k * t, this.x, this.y)
			},
			translate: function(t, n) {
				return 0 === t & 0 === n ? this : new Jc(this.k, this.x + this.k * t,
					this.y + this.k * n)
			},
			apply: function(t) {
				return [t[0] * this.k + this.x, t[1] * this.k + this.y]
			},
			applyX: function(t) {
				return t * this.k + this.x
			},
			applyY: function(t) {
				return t * this.k + this.y
			},
			invert: function(t) {
				return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
			},
			invertX: function(t) {
				return (t - this.x) / this.k
			},
			invertY: function(t) {
				return (t - this.y) / this.k
			},
			rescaleX: function(t) {
				return t.copy().domain(t.range().map(this.invertX, this).map(t.invert,
					t))
			},
			rescaleY: function(t) {
				return t.copy().domain(t.range().map(this.invertY, this).map(t.invert,
					t))
			},
			toString: function() {
				return "translate(" + this.x + "," + this.y + ") scale(" + this.k +
					")"
			}
		};
		new Jc(1, 0, 0);
		Jc.prototype;
		e.d(n, "a", (function() {
			return k
		})), e.d(n, "b", (function() {
			return _a
		})), e.d(n, "c", (function() {
			return Sa
		})), e.d(n, "d", (function() {
			return Jt
		})), e.d(n, "e", (function() {
			return pc
		}))
	}, , function(t, n) {
		t.exports = function(t, n, e, r, i) {
			this.confidence = e, this.name = r || n.name(t), this.lang = i
		}
	}, function(t, n) {
		var e, r, i = t.exports = {};

		function o() {
			throw new Error("setTimeout has not been defined")
		}

		function a() {
			throw new Error("clearTimeout has not been defined")
		}

		function s(t) {
			if (e === setTimeout) return setTimeout(t, 0);
			if ((e === o || !e) && setTimeout) return e = setTimeout, setTimeout(t, 0);
			try {
				return e(t, 0)
			} catch (n) {
				try {
					return e.call(null, t, 0)
				} catch (n) {
					return e.call(this, t, 0)
				}
			}
		}! function() {
			try {
				e = "function" == typeof setTimeout ? setTimeout : o
			} catch (t) {
				e = o
			}
			try {
				r = "function" == typeof clearTimeout ? clearTimeout : a
			} catch (t) {
				r = a
			}
		}();
		var u, c = [],
			h = !1,
			f = -1;

		function l() {
			h && u && (h = !1, u.length ? c = u.concat(c) : f = -1, c.length && p())
		}

		function p() {
			if (!h) {
				var t = s(l);
				h = !0;
				for (var n = c.length; n;) {
					for (u = c, c = []; ++f < n;) u && u[f].run();
					f = -1, n = c.length
				}
				u = null, h = !1,
					function(t) {
						if (r === clearTimeout) return clearTimeout(t);
						if ((r === a || !r) && clearTimeout) return r = clearTimeout,
							clearTimeout(t);
						try {
							r(t)
						} catch (n) {
							try {
								return r.call(null, t)
							} catch (n) {
								return r.call(this, t)
							}
						}
					}(t)
			}
		}

		function d(t, n) {
			this.fun = t, this.array = n
		}

		function _() {}
		i.nextTick = function(t) {
				var n = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
				c.push(new d(t, n)), 1 !== c.length || h || s(p)
			}, d.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version =
			"", i.versions = {}, i.on = _, i.addListener = _, i.once = _, i.off = _,
			i.removeListener = _, i.removeAllListeners = _, i.emit = _, i.prependListener =
			_, i.prependOnceListener = _, i.listeners = function(t) {
				return []
			}, i.binding = function(t) {
				throw new Error("process.binding is not supported")
			}, i.cwd = function() {
				return "/"
			}, i.chdir = function(t) {
				throw new Error("process.chdir is not supported")
			}, i.umask = function() {
				return 0
			}
	}, function(t, n, e) {
		var r = e(11),
			i = e(12),
			o = e(13);
		t.exports = function(t) {
			return r(t) || i(t) || o()
		}
	}, function(t, n, e) {
		var r = e(18),
			i = e(19),
			o = this,
			a = [new r, new i.sjis, new i.euc_jp, new i.euc_kr];
		t.exports.detect = function(t, n) {
			for (var e = [], r = 0; r < 256; r++) e[r] = 0;
			for (r = t.length - 1; r >= 0; r--) e[255 & t[r]]++;
			var i = !1;
			for (r = 128; r <= 159; r += 1)
				if (0 != e[r]) {
					i = !0;
					break
				}
			var o = {
					fByteStats: e,
					fC1Bytes: i,
					fRawInput: t,
					fRawLength: t.length,
					fInputBytes: t,
					fInputLen: t.length
				},
				s = a.map((function(t) {
					return t.match(o)
				})).filter((function(t) {
					return !!t
				})).sort((function(t, n) {
					return n.confidence - t.confidence
				}));
			return n && !0 === n.returnAllMatches ? s : s.length > 0 ? s[0].name :
				null
		}, t.exports.detectAll = function(t, n) {
			return "object" != typeof n && (n = {}), n.returnAllMatches = !0, o.detect(
				t, n)
		}
	}, function(t, n, e) {
		"use strict";
		(function(n, r) {
			var i = e(23),
				o = t.exports;
			o.encodings = null, o.defaultCharUnicode = "�", o.defaultCharSingleByte =
				"?", o.encode = function(t, e, r) {
					t = "" + (t || "");
					var i = o.getEncoder(e, r),
						a = i.write(t),
						s = i.end();
					return s && s.length > 0 ? n.concat([a, s]) : a
				}, o.decode = function(t, e, r) {
					"string" == typeof t && (o.skipDecodeWarning || (console.error(
						"Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"
					), o.skipDecodeWarning = !0), t = n.from("" + (t || ""), "binary"));
					var i = o.getDecoder(e, r),
						a = i.write(t),
						s = i.end();
					return s ? a + s : a
				}, o.encodingExists = function(t) {
					try {
						return o.getCodec(t), !0
					} catch (t) {
						return !1
					}
				}, o.toEncoding = o.encode, o.fromEncoding = o.decode, o._codecDataCache = {},
				o.getCodec = function(t) {
					o.encodings || (o.encodings = e(24));
					for (var n = o._canonicalizeEncoding(t), r = {};;) {
						var i = o._codecDataCache[n];
						if (i) return i;
						var a = o.encodings[n];
						switch (typeof a) {
							case "string":
								n = a;
								break;
							case "object":
								for (var s in a) r[s] = a[s];
								r.encodingName || (r.encodingName = n), n = a.type;
								break;
							case "function":
								return r.encodingName || (r.encodingName = n), i = new a(r, o), o._codecDataCache[
									r.encodingName] = i, i;
							default:
								throw new Error("Encoding not recognized: '" + t +
									"' (searched as: '" + n + "')")
						}
					}
				}, o._canonicalizeEncoding = function(t) {
					return ("" + t).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "")
				}, o.getEncoder = function(t, n) {
					var e = o.getCodec(t),
						r = new e.encoder(n, e);
					return e.bomAware && n && n.addBOM && (r = new i.PrependBOM(r, n)), r
				}, o.getDecoder = function(t, n) {
					var e = o.getCodec(t),
						r = new e.decoder(n, e);
					return !e.bomAware || n && !1 === n.stripBOM || (r = new i.StripBOM(r,
						n)), r
				};
			var a = void 0 !== r && r.versions && r.versions.node;
			if (a) {
				var s = a.split(".").map(Number);
				(s[0] > 0 || s[1] >= 10) && e(33)(o), e(34)(o)
			}
		}).call(this, e(2).Buffer, e(6))
	}, , function(t, n) {
		t.exports = function(t) {
			if (Array.isArray(t)) {
				for (var n = 0, e = new Array(t.length); n < t.length; n++) e[n] = t[n];
				return e
			}
		}
	}, function(t, n) {
		t.exports = function(t) {
			if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype
				.toString.call(t)) return Array.from(t)
		}
	}, function(t, n) {
		t.exports = function() {
			throw new TypeError("Invalid attempt to spread non-iterable instance")
		}
	}, function(t, n) {
		var e;
		e = function() {
			return this
		}();
		try {
			e = e || new Function("return this")()
		} catch (t) {
			"object" == typeof window && (e = window)
		}
		t.exports = e
	}, function(t, n, e) {
		"use strict";
		n.byteLength = function(t) {
			var n = c(t),
				e = n[0],
				r = n[1];
			return 3 * (e + r) / 4 - r
		}, n.toByteArray = function(t) {
			var n, e, r = c(t),
				a = r[0],
				s = r[1],
				u = new o(function(t, n, e) {
					return 3 * (n + e) / 4 - e
				}(0, a, s)),
				h = 0,
				f = s > 0 ? a - 4 : a;
			for (e = 0; e < f; e += 4) n = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(
					e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)],
				u[h++] = n >> 16 & 255, u[h++] = n >> 8 & 255, u[h++] = 255 & n;
			2 === s && (n = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4, u[
				h++] = 255 & n);
			1 === s && (n = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 |
				i[t.charCodeAt(e + 2)] >> 2, u[h++] = n >> 8 & 255, u[h++] = 255 & n);
			return u
		}, n.fromByteArray = function(t) {
			for (var n, e = t.length, i = e % 3, o = [], a = 0, s = e - i; a < s; a +=
				16383) o.push(h(t, a, a + 16383 > s ? s : a + 16383));
			1 === i ? (n = t[e - 1], o.push(r[n >> 2] + r[n << 4 & 63] + "==")) : 2 ===
				i && (n = (t[e - 2] << 8) + t[e - 1], o.push(r[n >> 10] + r[n >> 4 & 63] +
					r[n << 2 & 63] + "="));
			return o.join("")
		};
		for (var r = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array :
				Array, a =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s =
				0, u = a.length; s < u; ++s) r[s] = a[s], i[a.charCodeAt(s)] = s;

		function c(t) {
			var n = t.length;
			if (n % 4 > 0) throw new Error(
				"Invalid string. Length must be a multiple of 4");
			var e = t.indexOf("=");
			return -1 === e && (e = n), [e, e === n ? 0 : 4 - e % 4]
		}

		function h(t, n, e) {
			for (var i, o, a = [], s = n; s < e; s += 3) i = (t[s] << 16 & 16711680) +
				(t[s + 1] << 8 & 65280) + (255 & t[s + 2]), a.push(r[(o = i) >> 18 & 63] +
					r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
			return a.join("")
		}
		i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
	}, function(t, n) {
		n.read = function(t, n, e, r, i) {
			var o, a, s = 8 * i - r - 1,
				u = (1 << s) - 1,
				c = u >> 1,
				h = -7,
				f = e ? i - 1 : 0,
				l = e ? -1 : 1,
				p = t[n + f];
			for (f += l, o = p & (1 << -h) - 1, p >>= -h, h += s; h > 0; o = 256 * o +
				t[n + f], f += l, h -= 8);
			for (a = o & (1 << -h) - 1, o >>= -h, h += r; h > 0; a = 256 * a + t[n +
					f], f += l, h -= 8);
			if (0 === o) o = 1 - c;
			else {
				if (o === u) return a ? NaN : 1 / 0 * (p ? -1 : 1);
				a += Math.pow(2, r), o -= c
			}
			return (p ? -1 : 1) * a * Math.pow(2, o - r)
		}, n.write = function(t, n, e, r, i, o) {
			var a, s, u, c = 8 * o - i - 1,
				h = (1 << c) - 1,
				f = h >> 1,
				l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
				p = r ? 0 : o - 1,
				d = r ? 1 : -1,
				_ = n < 0 || 0 === n && 1 / n < 0 ? 1 : 0;
			for (n = Math.abs(n), isNaN(n) || n === 1 / 0 ? (s = isNaN(n) ? 1 : 0, a =
					h) : (a = Math.floor(Math.log(n) / Math.LN2), n * (u = Math.pow(2, -a)) <
					1 && (a--, u *= 2), (n += a + f >= 1 ? l / u : l * Math.pow(2, 1 - f)) *
					u >= 2 && (a++, u /= 2), a + f >= h ? (s = 0, a = h) : a + f >= 1 ? (s =
						(n * u - 1) * Math.pow(2, i), a += f) : (s = n * Math.pow(2, f - 1) *
						Math.pow(2, i), a = 0)); i >= 8; t[e + p] = 255 & s, p += d, s /= 256,
				i -= 8);
			for (a = a << i | s, c += i; c > 0; t[e + p] = 255 & a, p += d, a /= 256,
				c -= 8);
			t[e + p - d] |= 128 * _
		}
	}, function(t, n) {
		var e = {}.toString;
		t.exports = Array.isArray || function(t) {
			return "[object Array]" == e.call(t)
		}
	}, function(t, n, e) {
		var r = e(5);
		t.exports = function() {
			this.name = function() {
				return "UTF-8"
			}, this.match = function(t) {
				var n, e = !1,
					i = 0,
					o = 0,
					a = t.fRawInput,
					s = 0;
				t.fRawLength >= 3 && 239 == (255 & a[0]) && 187 == (255 & a[1]) && 191 ==
					(255 & a[2]) && (e = !0);
				for (var u = 0; u < t.fRawLength; u++) {
					var c = a[u];
					if (0 != (128 & c)) {
						if (192 == (224 & c)) s = 1;
						else if (224 == (240 & c)) s = 2;
						else if (240 == (248 & c)) s = 3;
						else {
							if (++o > 5) break;
							s = 0
						}
						for (; !(++u >= t.fRawLength);) {
							if (128 != (192 & a[u])) {
								o++;
								break
							}
							if (0 == --s) {
								i++;
								break
							}
						}
					}
				}
				if (n = 0, e && 0 == o) n = 100;
				else if (e && i > 10 * o) n = 80;
				else if (i > 3 && 0 == o) n = 100;
				else if (i > 0 && 0 == o) n = 80;
				else if (0 == i && 0 == o) n = 10;
				else {
					if (!(i > 10 * o)) return null;
					n = 25
				}
				return new r(t, this, n)
			}
		}
	}, function(t, n, e) {
		var r = e(20),
			i = e(5);

		function o() {
			this.charValue = 0, this.index = 0, this.nextIndex = 0, this.error = !1,
				this.done = !1, this.reset = function() {
					this.charValue = 0, this.index = -1, this.nextIndex = 0, this.error = !
						1, this.done = !1
				}, this.nextByte = function(t) {
					return this.nextIndex >= t.fRawLength ? (this.done = !0, -1) : 255 & t.fRawInput[
						this.nextIndex++]
				}
		}

		function a() {}

		function s(t, n) {
			t.index = t.nextIndex, t.error = !1;
			var e = 0,
				r = 0,
				i = 0;
			return (e = t.charValue = t.nextByte(n)) < 0 ? t.done = !0 : e <= 141 ||
				(r = t.nextByte(n), t.charValue = t.charValue << 8 | r, e >= 161 && e <=
					254 ? r < 161 && (t.error = !0) : 142 != e ? 143 == e && (i = t.nextByte(
						n), t.charValue = t.charValue << 8 | i, i < 161 && (t.error = !0)) : r <
					161 && (t.error = !0)), 0 == t.done
		}
		a.prototype.match = function(t) {
			var n, e = 0,
				r = 0,
				a = 0,
				s = 0,
				u = 0,
				c = new o;
			t: {
				for (c.reset(); this.nextChar(c, t);) {
					if (s++, c.error) a++;
					else {
						var h = 4294967295 & c.charValue;
						h <= 255 ? 0 : (e++, null != this.commonChars && function t(n, e, r,
							i) {
							if (i < r) return -1;
							var o = Math.floor(r + i >>> 1);
							return e > n[o] ? t(n, e, o + 1, i) : e < n[o] ? t(n, e, r, o - 1) :
								o
						}(n = this.commonChars, h, 0, n.length - 1) >= 0 && r++)
					}
					if (a >= 2 && 5 * a >= e) break t
				}
				if (e <= 10 && 0 == a) u = 0 == e && s < 10 ? 0 : 10;
				else if (e < 20 * a) u = 0;
				else if (null == this.commonChars)(u = 30 + e - 20 * a) > 100 && (u =
					100);
				else {
					var f = 90 / Math.log(parseFloat(e) / 4);
					u = Math.floor(Math.log(r + 1) * f + 10), u = Math.min(u, 100)
				}
			}
			return 0 == u ? null : new i(t, this, u)
		}, a.prototype.nextChar = function(t, n) {}, t.exports.sjis = function() {
			this.name = function() {
				return "Shift-JIS"
			}, this.language = function() {
				return "ja"
			}, this.commonChars = [33088, 33089, 33090, 33093, 33115, 33129, 33130,
				33141, 33142, 33440, 33442, 33444, 33449, 33450, 33451, 33453, 33455,
				33457, 33459, 33461, 33463, 33469, 33470, 33473, 33476, 33477, 33478,
				33480, 33481, 33484, 33485, 33500, 33504, 33511, 33512, 33513, 33514,
				33520, 33521, 33601, 33603, 33614, 33615, 33624, 33630, 33634, 33639,
				33653, 33654, 33673, 33674, 33675, 33677, 33683, 36502, 37882, 38314
			], this.nextChar = function(t, n) {
				var e;
				if (t.index = t.nextIndex, t.error = !1, (e = t.charValue = t.nextByte(
						n)) < 0) return !1;
				if (e <= 127 || e > 160 && e <= 223) return !0;
				var r = t.nextByte(n);
				return !(r < 0) && (t.charValue = e << 8 | r, r >= 64 && r <= 127 || r >=
					128 && r <= 255 || (t.error = !0), !0)
			}
		}, r.inherits(t.exports.sjis, a), t.exports.big5 = function() {
			this.name = function() {
				return "Big5"
			}, this.language = function() {
				return "zh"
			}, this.commonChars = [41280, 41281, 41282, 41283, 41287, 41289, 41333,
				41334, 42048, 42054, 42055, 42056, 42065, 42068, 42071, 42084, 42090,
				42092, 42103, 42147, 42148, 42151, 42177, 42190, 42193, 42207, 42216,
				42237, 42304, 42312, 42328, 42345, 42445, 42471, 42583, 42593, 42594,
				42600, 42608, 42664, 42675, 42681, 42707, 42715, 42726, 42738, 42816,
				42833, 42841, 42970, 43171, 43173, 43181, 43217, 43219, 43236, 43260,
				43456, 43474, 43507, 43627, 43706, 43710, 43724, 43772, 44103, 44111,
				44208, 44242, 44377, 44745, 45024, 45290, 45423, 45747, 45764, 45935,
				46156, 46158, 46412, 46501, 46525, 46544, 46552, 46705, 47085, 47207,
				47428, 47832, 47940, 48033, 48593, 49860, 50105, 50240, 50271
			], this.nextChar = function(t, n) {
				t.index = t.nextIndex, t.error = !1;
				var e = t.charValue = t.nextByte(n);
				if (e < 0) return !1;
				if (e <= 127 || 255 == e) return !0;
				var r = t.nextByte(n);
				return !(r < 0) && (t.charValue = t.charValue << 8 | r, (r < 64 || 127 ==
					r || 255 == r) && (t.error = !0), !0)
			}
		}, r.inherits(t.exports.big5, a), t.exports.euc_jp = function() {
			this.name = function() {
				return "EUC-JP"
			}, this.language = function() {
				return "ja"
			}, this.commonChars = [41377, 41378, 41379, 41382, 41404, 41418, 41419,
				41430, 41431, 42146, 42148, 42150, 42152, 42154, 42155, 42156, 42157,
				42159, 42161, 42163, 42165, 42167, 42169, 42171, 42173, 42175, 42176,
				42177, 42179, 42180, 42182, 42183, 42184, 42185, 42186, 42187, 42190,
				42191, 42192, 42206, 42207, 42209, 42210, 42212, 42216, 42217, 42218,
				42219, 42220, 42223, 42226, 42227, 42402, 42403, 42404, 42406, 42407,
				42410, 42413, 42415, 42416, 42419, 42421, 42423, 42424, 42425, 42431,
				42435, 42438, 42439, 42440, 42441, 42443, 42448, 42453, 42454, 42455,
				42462, 42464, 42465, 42469, 42473, 42474, 42475, 42476, 42477, 42483,
				47273, 47572, 47854, 48072, 48880, 49079, 50410, 50940, 51133, 51896,
				51955, 52188, 52689
			], this.nextChar = s
		}, r.inherits(t.exports.euc_jp, a), t.exports.euc_kr = function() {
			this.name = function() {
				return "EUC-KR"
			}, this.language = function() {
				return "ko"
			}, this.commonChars = [45217, 45235, 45253, 45261, 45268, 45286, 45293,
				45304, 45306, 45308, 45496, 45497, 45511, 45527, 45538, 45994, 46011,
				46274, 46287, 46297, 46315, 46501, 46517, 46527, 46535, 46569, 46835,
				47023, 47042, 47054, 47270, 47278, 47286, 47288, 47291, 47337, 47531,
				47534, 47564, 47566, 47613, 47800, 47822, 47824, 47857, 48103, 48115,
				48125, 48301, 48314, 48338, 48374, 48570, 48576, 48579, 48581, 48838,
				48840, 48863, 48878, 48888, 48890, 49057, 49065, 49088, 49124, 49131,
				49132, 49144, 49319, 49327, 49336, 49338, 49339, 49341, 49351, 49356,
				49358, 49359, 49366, 49370, 49381, 49403, 49404, 49572, 49574, 49590,
				49622, 49631, 49654, 49656, 50337, 50637, 50862, 51151, 51153, 51154,
				51160, 51173, 51373
			], this.nextChar = s
		}, r.inherits(t.exports.euc_kr, a), t.exports.gb_18030 = function() {
			this.name = function() {
				return "GB18030"
			}, this.language = function() {
				return "zh"
			}, this.nextChar = function(t, n) {
				t.index = t.nextIndex, t.error = !1;
				var e = 0,
					r = 0,
					i = 0,
					o = 0;
				t: if ((e = t.charValue = t.nextByte(n)) < 0) t.done = !0;
					else
				if (!(e <= 128))
					if (r = t.nextByte(n), t.charValue = t.charValue << 8 | r, e >= 129 &&
						e <= 254) {
						if (r >= 64 && r <= 126 || r >= 80 && r <= 254) break t;
						if (r >= 48 && r <= 57 && (i = t.nextByte(n)) >= 129 && i <= 254 &&
							(o = t.nextByte(n)) >= 48 && o <= 57) {
							t.charValue = t.charValue << 16 | i << 8 | o;
							break t
						}
						t.error = !0
					} else;
				return 0 == t.done
			}, this.commonChars = [41377, 41378, 41379, 41380, 41392, 41393, 41457,
				41459, 41889, 41900, 41914, 45480, 45496, 45502, 45755, 46025, 46070,
				46323, 46525, 46532, 46563, 46767, 46804, 46816, 47010, 47016, 47037,
				47062, 47069, 47284, 47327, 47350, 47531, 47561, 47576, 47610, 47613,
				47821, 48039, 48086, 48097, 48122, 48316, 48347, 48382, 48588, 48845,
				48861, 49076, 49094, 49097, 49332, 49389, 49611, 49883, 50119, 50396,
				50410, 50636, 50935, 51192, 51371, 51403, 51413, 51431, 51663, 51706,
				51889, 51893, 51911, 51920, 51926, 51957, 51965, 52460, 52728, 52906,
				52932, 52946, 52965, 53173, 53186, 53206, 53442, 53445, 53456, 53460,
				53671, 53930, 53938, 53941, 53947, 53972, 54211, 54224, 54269, 54466,
				54490, 54754, 54992
			]
		}, r.inherits(t.exports.gb_18030, a)
	}, function(t, n, e) {
		(function(t) {
			var r = Object.getOwnPropertyDescriptors || function(t) {
					for (var n = Object.keys(t), e = {}, r = 0; r < n.length; r++) e[n[r]] =
						Object.getOwnPropertyDescriptor(t, n[r]);
					return e
				},
				i = /%[sdj%]/g;
			n.format = function(t) {
				if (!y(t)) {
					for (var n = [], e = 0; e < arguments.length; e++) n.push(s(arguments[
						e]));
					return n.join(" ")
				}
				e = 1;
				for (var r = arguments, o = r.length, a = String(t).replace(i, (
						function(t) {
							if ("%%" === t) return "%";
							if (e >= o) return t;
							switch (t) {
								case "%s":
									return String(r[e++]);
								case "%d":
									return Number(r[e++]);
								case "%j":
									try {
										return JSON.stringify(r[e++])
									} catch (t) {
										return "[Circular]"
									}
								default:
									return t
							}
						})), u = r[e]; e < o; u = r[++e]) _(u) || !w(u) ? a += " " + u : a +=
					" " + s(u);
				return a
			}, n.deprecate = function(e, r) {
				if (void 0 !== t && !0 === t.noDeprecation) return e;
				if (void 0 === t) return function() {
					return n.deprecate(e, r).apply(this, arguments)
				};
				var i = !1;
				return function() {
					if (!i) {
						if (t.throwDeprecation) throw new Error(r);
						t.traceDeprecation ? console.trace(r) : console.error(r), i = !0
					}
					return e.apply(this, arguments)
				}
			};
			var o, a = {};

			function s(t, e) {
				var r = {
					seen: [],
					stylize: c
				};
				return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >=
					4 && (r.colors = arguments[3]), d(e) ? r.showHidden = e : e && n._extend(
						r, e), v(r.showHidden) && (r.showHidden = !1), v(r.depth) && (r.depth =
						2), v(r.colors) && (r.colors = !1), v(r.customInspect) && (r.customInspect = !
						0), r.colors && (r.stylize = u), h(r, t, r.depth)
			}

			function u(t, n) {
				var e = s.styles[n];
				return e ? "[" + s.colors[e][0] + "m" + t + "[" + s.colors[e][1] +
					"m" : t
			}

			function c(t, n) {
				return t
			}

			function h(t, e, r) {
				if (t.customInspect && e && M(e.inspect) && e.inspect !== n.inspect &&
					(!e.constructor || e.constructor.prototype !== e)) {
					var i = e.inspect(r, t);
					return y(i) || (i = h(t, i, r)), i
				}
				var o = function(t, n) {
					if (v(n)) return t.stylize("undefined", "undefined");
					if (y(n)) {
						var e = "'" + JSON.stringify(n).replace(/^"|"$/g, "").replace(/'/g,
							"\\'").replace(/\\"/g, '"') + "'";
						return t.stylize(e, "string")
					}
					if (g(n)) return t.stylize("" + n, "number");
					if (d(n)) return t.stylize("" + n, "boolean");
					if (_(n)) return t.stylize("null", "null")
				}(t, e);
				if (o) return o;
				var a = Object.keys(e),
					s = function(t) {
						var n = {};
						return t.forEach((function(t, e) {
							n[t] = !0
						})), n
					}(a);
				if (t.showHidden && (a = Object.getOwnPropertyNames(e)), x(e) && (a.indexOf(
						"message") >= 0 || a.indexOf("description") >= 0)) return f(e);
				if (0 === a.length) {
					if (M(e)) {
						var u = e.name ? ": " + e.name : "";
						return t.stylize("[Function" + u + "]", "special")
					}
					if (m(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp");
					if (b(e)) return t.stylize(Date.prototype.toString.call(e), "date");
					if (x(e)) return f(e)
				}
				var c, w = "",
					T = !1,
					C = ["{", "}"];
				(p(e) && (T = !0, C = ["[", "]"]), M(e)) && (w = " [Function" + (e.name ?
					": " + e.name : "") + "]");
				return m(e) && (w = " " + RegExp.prototype.toString.call(e)), b(e) && (
						w = " " + Date.prototype.toUTCString.call(e)), x(e) && (w = " " + f(e)),
					0 !== a.length || T && 0 != e.length ? r < 0 ? m(e) ? t.stylize(RegExp
						.prototype.toString.call(e), "regexp") : t.stylize("[Object]",
						"special") : (t.seen.push(e), c = T ? function(t, n, e, r, i) {
						for (var o = [], a = 0, s = n.length; a < s; ++a) E(n, String(a)) ?
							o.push(l(t, n, e, r, String(a), !0)) : o.push("");
						return i.forEach((function(i) {
							i.match(/^\d+$/) || o.push(l(t, n, e, r, i, !0))
						})), o
					}(t, e, r, s, a) : a.map((function(n) {
						return l(t, e, r, s, n, T)
					})), t.seen.pop(), function(t, n, e) {
						if (t.reduce((function(t, n) {
								return n.indexOf("\n") >= 0 && 0, t + n.replace(
									/\u001b\[\d\d?m/g, "").length + 1
							}), 0) > 60) return e[0] + ("" === n ? "" : n + "\n ") + " " + t.join(
							",\n  ") + " " + e[1];
						return e[0] + n + " " + t.join(", ") + " " + e[1]
					}(c, w, C)) : C[0] + w + C[1]
			}

			function f(t) {
				return "[" + Error.prototype.toString.call(t) + "]"
			}

			function l(t, n, e, r, i, o) {
				var a, s, u;
				if ((u = Object.getOwnPropertyDescriptor(n, i) || {
						value: n[i]
					}).get ? s = u.set ? t.stylize("[Getter/Setter]", "special") : t.stylize(
						"[Getter]", "special") : u.set && (s = t.stylize("[Setter]",
						"special")), E(r, i) || (a = "[" + i + "]"), s || (t.seen.indexOf(u.value) <
						0 ? (s = _(e) ? h(t, u.value, null) : h(t, u.value, e - 1)).indexOf(
							"\n") > -1 && (s = o ? s.split("\n").map((function(t) {
							return "  " + t
						})).join("\n").substr(2) : "\n" + s.split("\n").map((function(t) {
							return "   " + t
						})).join("\n")) : s = t.stylize("[Circular]", "special")), v(a)) {
					if (o && i.match(/^\d+$/)) return s;
					(a = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (
						a = a.substr(1, a.length - 2), a = t.stylize(a, "name")) : (a = a.replace(
						/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = t.stylize(
						a, "string"))
				}
				return a + ": " + s
			}

			function p(t) {
				return Array.isArray(t)
			}

			function d(t) {
				return "boolean" == typeof t
			}

			function _(t) {
				return null === t
			}

			function g(t) {
				return "number" == typeof t
			}

			function y(t) {
				return "string" == typeof t
			}

			function v(t) {
				return void 0 === t
			}

			function m(t) {
				return w(t) && "[object RegExp]" === T(t)
			}

			function w(t) {
				return "object" == typeof t && null !== t
			}

			function b(t) {
				return w(t) && "[object Date]" === T(t)
			}

			function x(t) {
				return w(t) && ("[object Error]" === T(t) || t instanceof Error)
			}

			function M(t) {
				return "function" == typeof t
			}

			function T(t) {
				return Object.prototype.toString.call(t)
			}

			function C(t) {
				return t < 10 ? "0" + t.toString(10) : t.toString(10)
			}
			n.debuglog = function(e) {
					if (v(o) && (o = t.env.NODE_DEBUG || ""), e = e.toUpperCase(), !a[e])
						if (new RegExp("\\b" + e + "\\b", "i").test(o)) {
							var r = t.pid;
							a[e] = function() {
								var t = n.format.apply(n, arguments);
								console.error("%s %d: %s", e, r, t)
							}
						} else a[e] = function() {};
					return a[e]
				}, n.inspect = s, s.colors = {
					bold: [1, 22],
					italic: [3, 23],
					underline: [4, 24],
					inverse: [7, 27],
					white: [37, 39],
					grey: [90, 39],
					black: [30, 39],
					blue: [34, 39],
					cyan: [36, 39],
					green: [32, 39],
					magenta: [35, 39],
					red: [31, 39],
					yellow: [33, 39]
				}, s.styles = {
					special: "cyan",
					number: "yellow",
					boolean: "yellow",
					undefined: "grey",
					null: "bold",
					string: "green",
					date: "magenta",
					regexp: "red"
				}, n.isArray = p, n.isBoolean = d, n.isNull = _, n.isNullOrUndefined =
				function(t) {
					return null == t
				}, n.isNumber = g, n.isString = y, n.isSymbol = function(t) {
					return "symbol" == typeof t
				}, n.isUndefined = v, n.isRegExp = m, n.isObject = w, n.isDate = b, n.isError =
				x, n.isFunction = M, n.isPrimitive = function(t) {
					return null === t || "boolean" == typeof t || "number" == typeof t ||
						"string" == typeof t || "symbol" == typeof t || void 0 === t
				}, n.isBuffer = e(21);
			var N = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
				"Oct", "Nov", "Dec"
			];

			function A() {
				var t = new Date,
					n = [C(t.getHours()), C(t.getMinutes()), C(t.getSeconds())].join(":");
				return [t.getDate(), N[t.getMonth()], n].join(" ")
			}

			function E(t, n) {
				return Object.prototype.hasOwnProperty.call(t, n)
			}
			n.log = function() {
				console.log("%s - %s", A(), n.format.apply(n, arguments))
			}, n.inherits = e(22), n._extend = function(t, n) {
				if (!n || !w(n)) return t;
				for (var e = Object.keys(n), r = e.length; r--;) t[e[r]] = n[e[r]];
				return t
			};
			var S = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") :
				void 0;

			function k(t, n) {
				if (!t) {
					var e = new Error("Promise was rejected with a falsy value");
					e.reason = t, t = e
				}
				return n(t)
			}
			n.promisify = function(t) {
				if ("function" != typeof t) throw new TypeError(
					'The "original" argument must be of type Function');
				if (S && t[S]) {
					var n;
					if ("function" != typeof(n = t[S])) throw new TypeError(
						'The "util.promisify.custom" argument must be of type Function');
					return Object.defineProperty(n, S, {
						value: n,
						enumerable: !1,
						writable: !1,
						configurable: !0
					}), n
				}

				function n() {
					for (var n, e, r = new Promise((function(t, r) {
							n = t, e = r
						})), i = [], o = 0; o < arguments.length; o++) i.push(arguments[o]);
					i.push((function(t, r) {
						t ? e(t) : n(r)
					}));
					try {
						t.apply(this, i)
					} catch (t) {
						e(t)
					}
					return r
				}
				return Object.setPrototypeOf(n, Object.getPrototypeOf(t)), S && Object
					.defineProperty(n, S, {
						value: n,
						enumerable: !1,
						writable: !1,
						configurable: !0
					}), Object.defineProperties(n, r(t))
			}, n.promisify.custom = S, n.callbackify = function(n) {
				if ("function" != typeof n) throw new TypeError(
					'The "original" argument must be of type Function');

				function e() {
					for (var e = [], r = 0; r < arguments.length; r++) e.push(arguments[r]);
					var i = e.pop();
					if ("function" != typeof i) throw new TypeError(
						"The last argument must be of type Function");
					var o = this,
						a = function() {
							return i.apply(o, arguments)
						};
					n.apply(this, e).then((function(n) {
						t.nextTick(a, null, n)
					}), (function(n) {
						t.nextTick(k, n, a)
					}))
				}
				return Object.setPrototypeOf(e, Object.getPrototypeOf(n)), Object.defineProperties(
					e, r(n)), e
			}
		}).call(this, e(6))
	}, function(t, n) {
		t.exports = function(t) {
			return t && "object" == typeof t && "function" == typeof t.copy &&
				"function" == typeof t.fill && "function" == typeof t.readUInt8
		}
	}, function(t, n) {
		"function" == typeof Object.create ? t.exports = function(t, n) {
			t.super_ = n, t.prototype = Object.create(n.prototype, {
				constructor: {
					value: t,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			})
		} : t.exports = function(t, n) {
			t.super_ = n;
			var e = function() {};
			e.prototype = n.prototype, t.prototype = new e, t.prototype.constructor =
				t
		}
	}, function(t, n, e) {
		"use strict";

		function r(t, n) {
			this.encoder = t, this.addBOM = !0
		}

		function i(t, n) {
			this.decoder = t, this.pass = !1, this.options = n || {}
		}
		n.PrependBOM = r, r.prototype.write = function(t) {
			return this.addBOM && (t = "﻿" + t, this.addBOM = !1), this.encoder.write(
				t)
		}, r.prototype.end = function() {
			return this.encoder.end()
		}, n.StripBOM = i, i.prototype.write = function(t) {
			var n = this.decoder.write(t);
			return this.pass || !n ? n : ("﻿" === n[0] && (n = n.slice(1),
				"function" == typeof this.options.stripBOM && this.options.stripBOM()
			), this.pass = !0, n)
		}, i.prototype.end = function() {
			return this.decoder.end()
		}
	}, function(t, n, e) {
		"use strict";
		for (var r = [e(25), e(28), e(29)], i = 0; i < r.length; i++) {
			t = r[i];
			for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (n[o] = t[
				o])
		}
	}, function(t, n, e) {
		"use strict";
		(function(n) {
			function r(t, e) {
				this.enc = t.encodingName, this.bomAware = t.bomAware, "base64" ===
					this.enc ? this.encoder = s : "cesu8" === this.enc && (this.enc =
						"utf8", this.encoder = u, "💩" !== n.from("eda0bdedb2a9", "hex").toString() &&
						(this.decoder = c, this.defaultCharUnicode = e.defaultCharUnicode))
			}
			t.exports = {
				utf8: {
					type: "_internal",
					bomAware: !0
				},
				cesu8: {
					type: "_internal",
					bomAware: !0
				},
				unicode11utf8: "utf8",
				ucs2: {
					type: "_internal",
					bomAware: !0
				},
				utf16le: "ucs2",
				binary: {
					type: "_internal"
				},
				base64: {
					type: "_internal"
				},
				hex: {
					type: "_internal"
				},
				_internal: r
			}, r.prototype.encoder = a, r.prototype.decoder = o;
			var i = e(26).StringDecoder;

			function o(t, n) {
				i.call(this, n.enc)
			}

			function a(t, n) {
				this.enc = n.enc
			}

			function s(t, n) {
				this.prevStr = ""
			}

			function u(t, n) {}

			function c(t, n) {
				this.acc = 0, this.contBytes = 0, this.accBytes = 0, this.defaultCharUnicode =
					n.defaultCharUnicode
			}
			i.prototype.end || (i.prototype.end = function() {}), o.prototype = i.prototype,
				a.prototype.write = function(t) {
					return n.from(t, this.enc)
				}, a.prototype.end = function() {}, s.prototype.write = function(t) {
					var e = (t = this.prevStr + t).length - t.length % 4;
					return this.prevStr = t.slice(e), t = t.slice(0, e), n.from(t,
						"base64")
				}, s.prototype.end = function() {
					return n.from(this.prevStr, "base64")
				}, u.prototype.write = function(t) {
					for (var e = n.alloc(3 * t.length), r = 0, i = 0; i < t.length; i++) {
						var o = t.charCodeAt(i);
						o < 128 ? e[r++] = o : o < 2048 ? (e[r++] = 192 + (o >>> 6), e[r++] =
							128 + (63 & o)) : (e[r++] = 224 + (o >>> 12), e[r++] = 128 + (o >>>
							6 & 63), e[r++] = 128 + (63 & o))
					}
					return e.slice(0, r)
				}, u.prototype.end = function() {}, c.prototype.write = function(t) {
					for (var n = this.acc, e = this.contBytes, r = this.accBytes, i = "",
							o = 0; o < t.length; o++) {
						var a = t[o];
						128 != (192 & a) ? (e > 0 && (i += this.defaultCharUnicode, e = 0), a <
							128 ? i += String.fromCharCode(a) : a < 224 ? (n = 31 & a, e = 1, r =
								1) : a < 240 ? (n = 15 & a, e = 2, r = 1) : i += this.defaultCharUnicode
						) : e > 0 ? (n = n << 6 | 63 & a, r++, 0 === --e && (i += 2 === r &&
							n < 128 && n > 0 ? this.defaultCharUnicode : 3 === r && n < 2048 ?
							this.defaultCharUnicode : String.fromCharCode(n))) : i += this.defaultCharUnicode
					}
					return this.acc = n, this.contBytes = e, this.accBytes = r, i
				}, c.prototype.end = function() {
					var t = 0;
					return this.contBytes > 0 && (t += this.defaultCharUnicode), t
				}
		}).call(this, e(2).Buffer)
	}, function(t, n, e) {
		"use strict";
		var r = e(27).Buffer,
			i = r.isEncoding || function(t) {
				switch ((t = "" + t) && t.toLowerCase()) {
					case "hex":
					case "utf8":
					case "utf-8":
					case "ascii":
					case "binary":
					case "base64":
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
					case "raw":
						return !0;
					default:
						return !1
				}
			};

		function o(t) {
			var n;
			switch (this.encoding = function(t) {
				var n = function(t) {
					if (!t) return "utf8";
					for (var n;;) switch (t) {
						case "utf8":
						case "utf-8":
							return "utf8";
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return "utf16le";
						case "latin1":
						case "binary":
							return "latin1";
						case "base64":
						case "ascii":
						case "hex":
							return t;
						default:
							if (n) return;
							t = ("" + t).toLowerCase(), n = !0
					}
				}(t);
				if ("string" != typeof n && (r.isEncoding === i || !i(t))) throw new Error(
					"Unknown encoding: " + t);
				return n || t
			}(t), this.encoding) {
				case "utf16le":
					this.text = u, this.end = c, n = 4;
					break;
				case "utf8":
					this.fillLast = s, n = 4;
					break;
				case "base64":
					this.text = h, this.end = f, n = 3;
					break;
				default:
					return this.write = l, void(this.end = p)
			}
			this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(n)
		}

		function a(t) {
			return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ?
				4 : t >> 6 == 2 ? -1 : -2
		}

		function s(t) {
			var n = this.lastTotal - this.lastNeed,
				e = function(t, n, e) {
					if (128 != (192 & n[0])) return t.lastNeed = 0, "�";
					if (t.lastNeed > 1 && n.length > 1) {
						if (128 != (192 & n[1])) return t.lastNeed = 1, "�";
						if (t.lastNeed > 2 && n.length > 2 && 128 != (192 & n[2])) return t.lastNeed =
							2, "�"
					}
				}(this, t);
			return void 0 !== e ? e : this.lastNeed <= t.length ? (t.copy(this.lastChar,
					n, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) :
				(t.copy(this.lastChar, n, 0, t.length), void(this.lastNeed -= t.length))
		}

		function u(t, n) {
			if ((t.length - n) % 2 == 0) {
				var e = t.toString("utf16le", n);
				if (e) {
					var r = e.charCodeAt(e.length - 1);
					if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal =
						4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length -
							1], e.slice(0, -1)
				}
				return e
			}
			return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length -
				1], t.toString("utf16le", n, t.length - 1)
		}

		function c(t) {
			var n = t && t.length ? this.write(t) : "";
			if (this.lastNeed) {
				var e = this.lastTotal - this.lastNeed;
				return n + this.lastChar.toString("utf16le", 0, e)
			}
			return n
		}

		function h(t, n) {
			var e = (t.length - n) % 3;
			return 0 === e ? t.toString("base64", n) : (this.lastNeed = 3 - e, this.lastTotal =
				3, 1 === e ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[
					t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString(
					"base64", n, t.length - e))
		}

		function f(t) {
			var n = t && t.length ? this.write(t) : "";
			return this.lastNeed ? n + this.lastChar.toString("base64", 0, 3 - this.lastNeed) :
				n
		}

		function l(t) {
			return t.toString(this.encoding)
		}

		function p(t) {
			return t && t.length ? this.write(t) : ""
		}
		n.StringDecoder = o, o.prototype.write = function(t) {
			if (0 === t.length) return "";
			var n, e;
			if (this.lastNeed) {
				if (void 0 === (n = this.fillLast(t))) return "";
				e = this.lastNeed, this.lastNeed = 0
			} else e = 0;
			return e < t.length ? n ? n + this.text(t, e) : this.text(t, e) : n ||
				""
		}, o.prototype.end = function(t) {
			var n = t && t.length ? this.write(t) : "";
			return this.lastNeed ? n + "�" : n
		}, o.prototype.text = function(t, n) {
			var e = function(t, n, e) {
				var r = n.length - 1;
				if (r < e) return 0;
				var i = a(n[r]);
				if (i >= 0) return i > 0 && (t.lastNeed = i - 1), i;
				if (--r < e || -2 === i) return 0;
				if ((i = a(n[r])) >= 0) return i > 0 && (t.lastNeed = i - 2), i;
				if (--r < e || -2 === i) return 0;
				if ((i = a(n[r])) >= 0) return i > 0 && (2 === i ? i = 0 : t.lastNeed =
					i - 3), i;
				return 0
			}(this, t, n);
			if (!this.lastNeed) return t.toString("utf8", n);
			this.lastTotal = e;
			var r = t.length - (e - this.lastNeed);
			return t.copy(this.lastChar, 0, r), t.toString("utf8", n, r)
		}, o.prototype.fillLast = function(t) {
			if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal -
				this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding,
				0, this.lastTotal);
			t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this
				.lastNeed -= t.length
		}
	}, function(t, n, e) {
		var r = e(2),
			i = r.Buffer;

		function o(t, n) {
			for (var e in t) n[e] = t[e]
		}

		function a(t, n, e) {
			return i(t, n, e)
		}
		i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = r :
			(o(r, n), n.Buffer = a), o(i, a), a.from = function(t, n, e) {
				if ("number" == typeof t) throw new TypeError(
					"Argument must not be a number");
				return i(t, n, e)
			}, a.alloc = function(t, n, e) {
				if ("number" != typeof t) throw new TypeError(
					"Argument must be a number");
				var r = i(t);
				return void 0 !== n ? "string" == typeof e ? r.fill(n, e) : r.fill(n) :
					r.fill(0), r
			}, a.allocUnsafe = function(t) {
				if ("number" != typeof t) throw new TypeError(
					"Argument must be a number");
				return i(t)
			}, a.allocUnsafeSlow = function(t) {
				if ("number" != typeof t) throw new TypeError(
					"Argument must be a number");
				return r.SlowBuffer(t)
			}
	}, function(t, n, e) {
		"use strict";
		(function(t) {
			n._dbcs = s;
			for (var e = -1, r = -2, i = -1e3, o = new Array(256), a = 0; a < 256; a++)
				o[a] = e;

			function s(t, n) {
				if (this.encodingName = t.encodingName, !t) throw new Error(
					"DBCS codec is called without the data.");
				if (!t.table) throw new Error("Encoding '" + this.encodingName +
					"' has no data.");
				var a = t.table();
				this.decodeTables = [], this.decodeTables[0] = o.slice(0), this.decodeTableSeq = [];
				for (var s = 0; s < a.length; s++) this._addDecodeChunk(a[s]);
				this.defaultCharUnicode = n.defaultCharUnicode, this.encodeTable = [],
					this.encodeTableSeq = [];
				var u = {};
				if (t.encodeSkipVals)
					for (s = 0; s < t.encodeSkipVals.length; s++) {
						var c = t.encodeSkipVals[s];
						if ("number" == typeof c) u[c] = !0;
						else
							for (var h = c.from; h <= c.to; h++) u[h] = !0
					}
				if (this._fillEncodeTable(0, 0, u), t.encodeAdd)
					for (var f in t.encodeAdd) Object.prototype.hasOwnProperty.call(t.encodeAdd,
						f) && this._setEncodeChar(f.charCodeAt(0), t.encodeAdd[f]);
				if (this.defCharSB = this.encodeTable[0][n.defaultCharSingleByte.charCodeAt(
						0)], this.defCharSB === e && (this.defCharSB = this.encodeTable[0][
						"?"
					]), this.defCharSB === e && (this.defCharSB = "?".charCodeAt(0)),
					"function" == typeof t.gb18030) {
					this.gb18030 = t.gb18030();
					var l = this.decodeTables.length,
						p = this.decodeTables[l] = o.slice(0),
						d = this.decodeTables.length,
						_ = this.decodeTables[d] = o.slice(0);
					for (s = 129; s <= 254; s++) {
						var g = i - this.decodeTables[0][s],
							y = this.decodeTables[g];
						for (h = 48; h <= 57; h++) y[h] = i - l
					}
					for (s = 129; s <= 254; s++) p[s] = i - d;
					for (s = 48; s <= 57; s++) _[s] = r
				}
			}

			function u(t, n) {
				this.leadSurrogate = -1, this.seqObj = void 0, this.encodeTable = n.encodeTable,
					this.encodeTableSeq = n.encodeTableSeq, this.defaultCharSingleByte = n
					.defCharSB, this.gb18030 = n.gb18030
			}

			function c(n, e) {
				this.nodeIdx = 0, this.prevBuf = t.alloc(0), this.decodeTables = e.decodeTables,
					this.decodeTableSeq = e.decodeTableSeq, this.defaultCharUnicode = e.defaultCharUnicode,
					this.gb18030 = e.gb18030
			}

			function h(t, n) {
				if (t[0] > n) return -1;
				for (var e = 0, r = t.length; e < r - 1;) {
					var i = e + Math.floor((r - e + 1) / 2);
					t[i] <= n ? e = i : r = i
				}
				return e
			}
			s.prototype.encoder = u, s.prototype.decoder = c, s.prototype._getDecodeTrieNode =
				function(t) {
					for (var n = []; t > 0; t >>= 8) n.push(255 & t);
					0 == n.length && n.push(0);
					for (var r = this.decodeTables[0], a = n.length - 1; a > 0; a--) {
						var s = r[n[a]];
						if (s == e) r[n[a]] = i - this.decodeTables.length, this.decodeTables
							.push(r = o.slice(0));
						else {
							if (!(s <= i)) throw new Error("Overwrite byte in " + this.encodingName +
								", addr: " + t.toString(16));
							r = this.decodeTables[i - s]
						}
					}
					return r
				}, s.prototype._addDecodeChunk = function(t) {
					var n = parseInt(t[0], 16),
						e = this._getDecodeTrieNode(n);
					n &= 255;
					for (var r = 1; r < t.length; r++) {
						var i = t[r];
						if ("string" == typeof i)
							for (var o = 0; o < i.length;) {
								var a = i.charCodeAt(o++);
								if (55296 <= a && a < 56320) {
									var s = i.charCodeAt(o++);
									if (!(56320 <= s && s < 57344)) throw new Error(
										"Incorrect surrogate pair in " + this.encodingName +
										" at chunk " + t[0]);
									e[n++] = 65536 + 1024 * (a - 55296) + (s - 56320)
								} else if (4080 < a && a <= 4095) {
									for (var u = 4095 - a + 2, c = [], h = 0; h < u; h++) c.push(i.charCodeAt(
										o++));
									e[n++] = -10 - this.decodeTableSeq.length, this.decodeTableSeq.push(
										c)
								} else e[n++] = a
							} else {
								if ("number" != typeof i) throw new Error("Incorrect type '" +
									typeof i + "' given in " + this.encodingName + " at chunk " + t[0]
								);
								var f = e[n - 1] + 1;
								for (o = 0; o < i; o++) e[n++] = f++
							}
					}
					if (n > 255) throw new Error("Incorrect chunk in " + this.encodingName +
						" at addr " + t[0] + ": too long" + n)
				}, s.prototype._getEncodeBucket = function(t) {
					var n = t >> 8;
					return void 0 === this.encodeTable[n] && (this.encodeTable[n] = o.slice(
						0)), this.encodeTable[n]
				}, s.prototype._setEncodeChar = function(t, n) {
					var r = this._getEncodeBucket(t),
						i = 255 & t;
					r[i] <= -10 ? this.encodeTableSeq[-10 - r[i]][-1] = n : r[i] == e && (
						r[i] = n)
				}, s.prototype._setEncodeSequence = function(t, n) {
					var r, i = t[0],
						o = this._getEncodeBucket(i),
						a = 255 & i;
					o[a] <= -10 ? r = this.encodeTableSeq[-10 - o[a]] : (r = {}, o[a] !==
						e && (r[-1] = o[a]), o[a] = -10 - this.encodeTableSeq.length, this.encodeTableSeq
						.push(r));
					for (var s = 1; s < t.length - 1; s++) {
						var u = r[i];
						"object" == typeof u ? r = u : (r = r[i] = {}, void 0 !== u && (r[-1] =
							u))
					}
					r[i = t[t.length - 1]] = n
				}, s.prototype._fillEncodeTable = function(t, n, e) {
					for (var r = this.decodeTables[t], o = 0; o < 256; o++) {
						var a = r[o],
							s = n + o;
						e[s] || (a >= 0 ? this._setEncodeChar(a, s) : a <= i ? this._fillEncodeTable(
							i - a, s << 8, e) : a <= -10 && this._setEncodeSequence(this.decodeTableSeq[-
							10 - a], s))
					}
				}, u.prototype.write = function(n) {
					for (var r = t.alloc(n.length * (this.gb18030 ? 4 : 3)), i = this.leadSurrogate,
							o = this.seqObj, a = -1, s = 0, u = 0;;) {
						if (-1 === a) {
							if (s == n.length) break;
							var c = n.charCodeAt(s++)
						} else {
							c = a;
							a = -1
						}
						if (55296 <= c && c < 57344)
							if (c < 56320) {
								if (-1 === i) {
									i = c;
									continue
								}
								i = c, c = e
							} else -1 !== i ? (c = 65536 + 1024 * (i - 55296) + (c - 56320), i = -
								1) : c = e;
						else -1 !== i && (a = c, c = e, i = -1);
						var f = e;
						if (void 0 !== o && c != e) {
							var l = o[c];
							if ("object" == typeof l) {
								o = l;
								continue
							}
							"number" == typeof l ? f = l : null == l && void 0 !== (l = o[-1]) &&
								(f = l, a = c), o = void 0
						} else if (c >= 0) {
							var p = this.encodeTable[c >> 8];
							if (void 0 !== p && (f = p[255 & c]), f <= -10) {
								o = this.encodeTableSeq[-10 - f];
								continue
							}
							if (f == e && this.gb18030) {
								var d = h(this.gb18030.uChars, c);
								if (-1 != d) {
									f = this.gb18030.gbChars[d] + (c - this.gb18030.uChars[d]);
									r[u++] = 129 + Math.floor(f / 12600), f %= 12600, r[u++] = 48 +
										Math.floor(f / 1260), f %= 1260, r[u++] = 129 + Math.floor(f / 10),
										f %= 10, r[u++] = 48 + f;
									continue
								}
							}
						}
						f === e && (f = this.defaultCharSingleByte), f < 256 ? r[u++] = f : f <
							65536 ? (r[u++] = f >> 8, r[u++] = 255 & f) : (r[u++] = f >> 16, r[u++] =
								f >> 8 & 255, r[u++] = 255 & f)
					}
					return this.seqObj = o, this.leadSurrogate = i, r.slice(0, u)
				}, u.prototype.end = function() {
					if (-1 !== this.leadSurrogate || void 0 !== this.seqObj) {
						var n = t.alloc(10),
							e = 0;
						if (this.seqObj) {
							var r = this.seqObj[-1];
							void 0 !== r && (r < 256 ? n[e++] = r : (n[e++] = r >> 8, n[e++] =
								255 & r)), this.seqObj = void 0
						}
						return -1 !== this.leadSurrogate && (n[e++] = this.defaultCharSingleByte,
							this.leadSurrogate = -1), n.slice(0, e)
					}
				}, u.prototype.findIdx = h, c.prototype.write = function(n) {
					var o = t.alloc(2 * n.length),
						a = this.nodeIdx,
						s = this.prevBuf,
						u = this.prevBuf.length,
						c = -this.prevBuf.length;
					u > 0 && (s = t.concat([s, n.slice(0, 10)]));
					for (var f = 0, l = 0; f < n.length; f++) {
						var p, d = f >= 0 ? n[f] : s[f + u];
						if ((p = this.decodeTables[a][d]) >= 0);
						else if (p === e) f = c, p = this.defaultCharUnicode.charCodeAt(0);
						else if (p === r) {
							var _ = c >= 0 ? n.slice(c, f + 1) : s.slice(c + u, f + 1 + u),
								g = 12600 * (_[0] - 129) + 1260 * (_[1] - 48) + 10 * (_[2] - 129) +
								(_[3] - 48),
								y = h(this.gb18030.gbChars, g);
							p = this.gb18030.uChars[y] + g - this.gb18030.gbChars[y]
						} else {
							if (p <= i) {
								a = i - p;
								continue
							}
							if (!(p <= -10)) throw new Error(
								"iconv-lite internal error: invalid decoding table value " + p +
								" at " + a + "/" + d);
							for (var v = this.decodeTableSeq[-10 - p], m = 0; m < v.length - 1; m++)
								p = v[m], o[l++] = 255 & p, o[l++] = p >> 8;
							p = v[v.length - 1]
						}
						if (p > 65535) {
							p -= 65536;
							var w = 55296 + Math.floor(p / 1024);
							o[l++] = 255 & w, o[l++] = w >> 8, p = 56320 + p % 1024
						}
						o[l++] = 255 & p, o[l++] = p >> 8, a = 0, c = f + 1
					}
					return this.nodeIdx = a, this.prevBuf = c >= 0 ? n.slice(c) : s.slice(
						c + u), o.slice(0, l).toString("ucs2")
				}, c.prototype.end = function() {
					for (var n = ""; this.prevBuf.length > 0;) {
						n += this.defaultCharUnicode;
						var e = this.prevBuf.slice(1);
						this.prevBuf = t.alloc(0), this.nodeIdx = 0, e.length > 0 && (n +=
							this.write(e))
					}
					return this.nodeIdx = 0, n
				}
		}).call(this, e(2).Buffer)
	}, function(t, n, e) {
		"use strict";
		t.exports = {
			shiftjis: {
				type: "_dbcs",
				table: function() {
					return e(30)
				},
				encodeAdd: {
					"¥": 92,
					"‾": 126
				},
				encodeSkipVals: [{
					from: 60736,
					to: 63808
				}]
			},
			csshiftjis: "shiftjis",
			mskanji: "shiftjis",
			sjis: "shiftjis",
			windows31j: "shiftjis",
			ms31j: "shiftjis",
			xsjis: "shiftjis",
			windows932: "shiftjis",
			ms932: "shiftjis",
			932: "shiftjis",
			cp932: "shiftjis",
			eucjp: {
				type: "_dbcs",
				table: function() {
					return e(31)
				},
				encodeAdd: {
					"¥": 92,
					"‾": 126
				}
			},
			windows949: "cp949",
			ms949: "cp949",
			949: "cp949",
			cp949: {
				type: "_dbcs",
				table: function() {
					return e(32)
				}
			},
			cseuckr: "cp949",
			csksc56011987: "cp949",
			euckr: "cp949",
			isoir149: "cp949",
			korean: "cp949",
			ksc56011987: "cp949",
			ksc56011989: "cp949",
			ksc5601: "cp949"
		}
	}, function(t) {
		t.exports = JSON.parse(
			'[["0","\\u0000",128],["a1","｡",62],["8140","　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",9,"＋－±×"],["8180","÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"],["81b8","∈∋⊆⊇⊂⊃∪∩"],["81c8","∧∨￢⇒⇔∀∃"],["81da","∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"],["81f0","Å‰♯♭♪†‡¶"],["81fc","◯"],["824f","０",9],["8260","Ａ",25],["8281","ａ",25],["829f","ぁ",82],["8340","ァ",62],["8380","ム",22],["839f","Α",16,"Σ",6],["83bf","α",16,"σ",6],["8440","А",5,"ЁЖ",25],["8470","а",5,"ёж",7],["8480","о",17],["849f","─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"],["8740","①",19,"Ⅰ",9],["875f","㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"],["877e","㍻"],["8780","〝〟№㏍℡㊤",4,"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"],["889f","亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"],["8940","院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"],["8980","園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"],["8a40","魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"],["8a80","橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"],["8b40","機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"],["8b80","朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"],["8c40","掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"],["8c80","劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"],["8d40","后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"],["8d80","項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"],["8e40","察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"],["8e80","死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"],["8f40","宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"],["8f80","準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"],["9040","拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"],["9080","逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"],["9140","繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"],["9180","操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"],["9240","叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"],["9280","逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"],["9340","邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"],["9380","凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"],["9440","如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"],["9480","楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"],["9540","鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"],["9580","斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"],["9640","法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"],["9680","摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"],["9740","諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"],["9780","沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"],["9840","蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"],["989f","弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"],["9940","僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"],["9980","凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"],["9a40","咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"],["9a80","噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"],["9b40","奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"],["9b80","它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"],["9c40","廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"],["9c80","怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"],["9d40","戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"],["9d80","捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"],["9e40","曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"],["9e80","梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"],["9f40","檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"],["9f80","麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"],["e040","漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"],["e080","烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"],["e140","瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"],["e180","痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"],["e240","磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"],["e280","窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"],["e340","紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"],["e380","縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"],["e440","隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"],["e480","艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"],["e540","蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"],["e580","蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"],["e640","襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"],["e680","諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"],["e740","蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"],["e780","轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"],["e840","錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"],["e880","閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"],["e940","顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"],["e980","騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"],["ea40","鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"],["ea80","黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"],["ed40","纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"],["ed80","塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"],["ee40","犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"],["ee80","蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"],["eeef","ⅰ",9,"￢￤＇＂"],["f040","",62],["f080","",124],["f140","",62],["f180","",124],["f240","",62],["f280","",124],["f340","",62],["f380","",124],["f440","",62],["f480","",124],["f540","",62],["f580","",124],["f640","",62],["f680","",124],["f740","",62],["f780","",124],["f840","",62],["f880","",124],["f940",""],["fa40","ⅰ",9,"Ⅰ",9,"￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"],["fa80","兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"],["fb40","涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"],["fb80","祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"],["fc40","髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"]]'
		)
	}, function(t) {
		t.exports = JSON.parse(
			'[["0","\\u0000",127],["8ea1","｡",62],["a1a1","　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",9,"＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"],["a2a1","◆□■△▲▽▼※〒→←↑↓〓"],["a2ba","∈∋⊆⊇⊂⊃∪∩"],["a2ca","∧∨￢⇒⇔∀∃"],["a2dc","∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"],["a2f2","Å‰♯♭♪†‡¶"],["a2fe","◯"],["a3b0","０",9],["a3c1","Ａ",25],["a3e1","ａ",25],["a4a1","ぁ",82],["a5a1","ァ",85],["a6a1","Α",16,"Σ",6],["a6c1","α",16,"σ",6],["a7a1","А",5,"ЁЖ",25],["a7d1","а",5,"ёж",25],["a8a1","─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"],["ada1","①",19,"Ⅰ",9],["adc0","㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"],["addf","㍻〝〟№㏍℡㊤",4,"㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"],["b0a1","亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"],["b1a1","院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"],["b2a1","押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"],["b3a1","魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"],["b4a1","粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"],["b5a1","機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"],["b6a1","供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"],["b7a1","掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"],["b8a1","検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"],["b9a1","后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"],["baa1","此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"],["bba1","察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"],["bca1","次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"],["bda1","宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"],["bea1","勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"],["bfa1","拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"],["c0a1","澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"],["c1a1","繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"],["c2a1","臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"],["c3a1","叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"],["c4a1","帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"],["c5a1","邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"],["c6a1","董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"],["c7a1","如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"],["c8a1","函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"],["c9a1","鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"],["caa1","福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"],["cba1","法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"],["cca1","漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"],["cda1","諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"],["cea1","痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"],["cfa1","蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"],["d0a1","弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"],["d1a1","僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"],["d2a1","辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"],["d3a1","咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"],["d4a1","圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"],["d5a1","奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"],["d6a1","屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"],["d7a1","廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"],["d8a1","悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"],["d9a1","戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"],["daa1","據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"],["dba1","曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"],["dca1","棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"],["dda1","檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"],["dea1","沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"],["dfa1","漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"],["e0a1","燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"],["e1a1","瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"],["e2a1","癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"],["e3a1","磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"],["e4a1","筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"],["e5a1","紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"],["e6a1","罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"],["e7a1","隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"],["e8a1","茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"],["e9a1","蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"],["eaa1","蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"],["eba1","襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"],["eca1","譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"],["eda1","蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"],["eea1","遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"],["efa1","錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"],["f0a1","陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"],["f1a1","顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"],["f2a1","髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"],["f3a1","鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"],["f4a1","堯槇遙瑤凜熙"],["f9a1","纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"],["faa1","忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"],["fba1","犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"],["fca1","釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"],["fcf1","ⅰ",9,"￢￤＇＂"],["8fa2af","˘ˇ¸˙˝¯˛˚～΄΅"],["8fa2c2","¡¦¿"],["8fa2eb","ºª©®™¤№"],["8fa6e1","ΆΈΉΊΪ"],["8fa6e7","Ό"],["8fa6e9","ΎΫ"],["8fa6ec","Ώ"],["8fa6f1","άέήίϊΐόςύϋΰώ"],["8fa7c2","Ђ",10,"ЎЏ"],["8fa7f2","ђ",10,"ўџ"],["8fa9a1","ÆĐ"],["8fa9a4","Ħ"],["8fa9a6","Ĳ"],["8fa9a8","ŁĿ"],["8fa9ab","ŊØŒ"],["8fa9af","ŦÞ"],["8fa9c1","æđðħıĳĸłŀŉŋøœßŧþ"],["8faaa1","ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"],["8faaba","ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"],["8faba1","áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"],["8fabbd","ġĥíìïîǐ"],["8fabc5","īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"],["8fb0a1","丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"],["8fb1a1","侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"],["8fb2a1","傒傓傔傖傛傜傞",4,"傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"],["8fb3a1","凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"],["8fb4a1","匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"],["8fb5a1","咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"],["8fb6a1","嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",5,"嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",4,"囱囫园"],["8fb7a1","囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",4,"坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"],["8fb8a1","堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"],["8fb9a1","奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"],["8fbaa1","嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",4,"寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"],["8fbba1","屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"],["8fbca1","巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",4,"幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"],["8fbda1","彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",4,"忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"],["8fbea1","悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",4,"愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"],["8fbfa1","懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"],["8fc0a1","捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"],["8fc1a1","擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"],["8fc2a1","昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"],["8fc3a1","杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",4,"桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"],["8fc4a1","棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"],["8fc5a1","樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"],["8fc6a1","歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"],["8fc7a1","泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"],["8fc8a1","湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"],["8fc9a1","濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",4,"炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",4,"焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"],["8fcaa1","煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"],["8fcba1","狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"],["8fcca1","珿琀琁琄琇琊琑琚琛琤琦琨",9,"琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"],["8fcda1","甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",5,"疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"],["8fcea1","瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",6,"皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"],["8fcfa1","睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"],["8fd0a1","碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"],["8fd1a1","秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"],["8fd2a1","笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",5],["8fd3a1","籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"],["8fd4a1","綞綦綧綪綳綶綷綹緂",4,"緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"],["8fd5a1","罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"],["8fd6a1","胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"],["8fd7a1","艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"],["8fd8a1","荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"],["8fd9a1","蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",4,"蕖蕙蕜",6,"蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"],["8fdaa1","藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",4,"虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"],["8fdba1","蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",6,"螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"],["8fdca1","蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",4,"裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"],["8fdda1","襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",4,"觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"],["8fdea1","誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",4,"譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"],["8fdfa1","貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"],["8fe0a1","踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"],["8fe1a1","轃轇轏轑",4,"轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"],["8fe2a1","郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"],["8fe3a1","釂釃釅釓釔釗釙釚釞釤釥釩釪釬",5,"釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",4,"鉻鉼鉽鉿銈銉銊銍銎銒銗"],["8fe4a1","銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",4,"鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"],["8fe5a1","鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",4,"鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"],["8fe6a1","镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"],["8fe7a1","霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"],["8fe8a1","頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",4,"餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"],["8fe9a1","馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",4],["8feaa1","鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",4,"魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"],["8feba1","鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",4,"鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"],["8feca1","鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"],["8feda1","黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",4,"齓齕齖齗齘齚齝齞齨齩齭",4,"齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"]]'
		)
	}, function(t) {
		t.exports = JSON.parse(
			'[["0","\\u0000",127],["8141","갂갃갅갆갋",4,"갘갞갟갡갢갣갥",6,"갮갲갳갴"],["8161","갵갶갷갺갻갽갾갿걁",9,"걌걎",5,"걕"],["8181","걖걗걙걚걛걝",18,"걲걳걵걶걹걻",4,"겂겇겈겍겎겏겑겒겓겕",6,"겞겢",5,"겫겭겮겱",6,"겺겾겿곀곂곃곅곆곇곉곊곋곍",7,"곖곘",7,"곢곣곥곦곩곫곭곮곲곴곷",4,"곾곿괁괂괃괅괇",4,"괎괐괒괓"],["8241","괔괕괖괗괙괚괛괝괞괟괡",7,"괪괫괮",5],["8261","괶괷괹괺괻괽",6,"굆굈굊",5,"굑굒굓굕굖굗"],["8281","굙",7,"굢굤",7,"굮굯굱굲굷굸굹굺굾궀궃",4,"궊궋궍궎궏궑",10,"궞",5,"궥",17,"궸",7,"귂귃귅귆귇귉",6,"귒귔",7,"귝귞귟귡귢귣귥",18],["8341","귺귻귽귾긂",5,"긊긌긎",5,"긕",7],["8361","긝",18,"긲긳긵긶긹긻긼"],["8381","긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",4,"깞깢깣깤깦깧깪깫깭깮깯깱",6,"깺깾",5,"꺆",5,"꺍",46,"꺿껁껂껃껅",6,"껎껒",5,"껚껛껝",8],["8441","껦껧껩껪껬껮",5,"껵껶껷껹껺껻껽",8],["8461","꼆꼉꼊꼋꼌꼎꼏꼑",18],["8481","꼤",7,"꼮꼯꼱꼳꼵",6,"꼾꽀꽄꽅꽆꽇꽊",5,"꽑",10,"꽞",5,"꽦",18,"꽺",5,"꾁꾂꾃꾅꾆꾇꾉",6,"꾒꾓꾔꾖",5,"꾝",26,"꾺꾻꾽꾾"],["8541","꾿꿁",5,"꿊꿌꿏",4,"꿕",6,"꿝",4],["8561","꿢",5,"꿪",5,"꿲꿳꿵꿶꿷꿹",6,"뀂뀃"],["8581","뀅",6,"뀍뀎뀏뀑뀒뀓뀕",6,"뀞",9,"뀩",26,"끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",29,"끾끿낁낂낃낅",6,"낎낐낒",5,"낛낝낞낣낤"],["8641","낥낦낧낪낰낲낶낷낹낺낻낽",6,"냆냊",5,"냒"],["8661","냓냕냖냗냙",6,"냡냢냣냤냦",10],["8681","냱",22,"넊넍넎넏넑넔넕넖넗넚넞",4,"넦넧넩넪넫넭",6,"넶넺",5,"녂녃녅녆녇녉",6,"녒녓녖녗녙녚녛녝녞녟녡",22,"녺녻녽녾녿놁놃",4,"놊놌놎놏놐놑놕놖놗놙놚놛놝"],["8741","놞",9,"놩",15],["8761","놹",18,"뇍뇎뇏뇑뇒뇓뇕"],["8781","뇖",5,"뇞뇠",7,"뇪뇫뇭뇮뇯뇱",7,"뇺뇼뇾",5,"눆눇눉눊눍",6,"눖눘눚",5,"눡",18,"눵",6,"눽",26,"뉙뉚뉛뉝뉞뉟뉡",6,"뉪",4],["8841","뉯",4,"뉶",5,"뉽",6,"늆늇늈늊",4],["8861","늏늒늓늕늖늗늛",4,"늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"],["8881","늸",15,"닊닋닍닎닏닑닓",4,"닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",6,"댒댖",5,"댝",54,"덗덙덚덝덠덡덢덣"],["8941","덦덨덪덬덭덯덲덳덵덶덷덹",6,"뎂뎆",5,"뎍"],["8961","뎎뎏뎑뎒뎓뎕",10,"뎢",5,"뎩뎪뎫뎭"],["8981","뎮",21,"돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",18,"돽",18,"됑",6,"됙됚됛됝됞됟됡",6,"됪됬",7,"됵",15],["8a41","둅",10,"둒둓둕둖둗둙",6,"둢둤둦"],["8a61","둧",4,"둭",18,"뒁뒂"],["8a81","뒃",4,"뒉",19,"뒞",5,"뒥뒦뒧뒩뒪뒫뒭",7,"뒶뒸뒺",5,"듁듂듃듅듆듇듉",6,"듑듒듓듔듖",5,"듞듟듡듢듥듧",4,"듮듰듲",5,"듹",26,"딖딗딙딚딝"],["8b41","딞",5,"딦딫",4,"딲딳딵딶딷딹",6,"땂땆"],["8b61","땇땈땉땊땎땏땑땒땓땕",6,"땞땢",8],["8b81","땫",52,"떢떣떥떦떧떩떬떭떮떯떲떶",4,"떾떿뗁뗂뗃뗅",6,"뗎뗒",5,"뗙",18,"뗭",18],["8c41","똀",15,"똒똓똕똖똗똙",4],["8c61","똞",6,"똦",5,"똭",6,"똵",5],["8c81","똻",12,"뙉",26,"뙥뙦뙧뙩",50,"뚞뚟뚡뚢뚣뚥",5,"뚭뚮뚯뚰뚲",16],["8d41","뛃",16,"뛕",8],["8d61","뛞",17,"뛱뛲뛳뛵뛶뛷뛹뛺"],["8d81","뛻",4,"뜂뜃뜄뜆",33,"뜪뜫뜭뜮뜱",6,"뜺뜼",7,"띅띆띇띉띊띋띍",6,"띖",9,"띡띢띣띥띦띧띩",6,"띲띴띶",5,"띾띿랁랂랃랅",6,"랎랓랔랕랚랛랝랞"],["8e41","랟랡",6,"랪랮",5,"랶랷랹",8],["8e61","럂",4,"럈럊",19],["8e81","럞",13,"럮럯럱럲럳럵",6,"럾렂",4,"렊렋렍렎렏렑",6,"렚렜렞",5,"렦렧렩렪렫렭",6,"렶렺",5,"롁롂롃롅",11,"롒롔",7,"롞롟롡롢롣롥",6,"롮롰롲",5,"롹롺롻롽",7],["8f41","뢅",7,"뢎",17],["8f61","뢠",7,"뢩",6,"뢱뢲뢳뢵뢶뢷뢹",4],["8f81","뢾뢿룂룄룆",5,"룍룎룏룑룒룓룕",7,"룞룠룢",5,"룪룫룭룮룯룱",6,"룺룼룾",5,"뤅",18,"뤙",6,"뤡",26,"뤾뤿륁륂륃륅",6,"륍륎륐륒",5],["9041","륚륛륝륞륟륡",6,"륪륬륮",5,"륶륷륹륺륻륽"],["9061","륾",5,"릆릈릋릌릏",15],["9081","릟",12,"릮릯릱릲릳릵",6,"릾맀맂",5,"맊맋맍맓",4,"맚맜맟맠맢맦맧맩맪맫맭",6,"맶맻",4,"먂",5,"먉",11,"먖",33,"먺먻먽먾먿멁멃멄멅멆"],["9141","멇멊멌멏멐멑멒멖멗멙멚멛멝",6,"멦멪",5],["9161","멲멳멵멶멷멹",9,"몆몈몉몊몋몍",5],["9181","몓",20,"몪몭몮몯몱몳",4,"몺몼몾",5,"뫅뫆뫇뫉",14,"뫚",33,"뫽뫾뫿묁묂묃묅",7,"묎묐묒",5,"묙묚묛묝묞묟묡",6],["9241","묨묪묬",7,"묷묹묺묿",4,"뭆뭈뭊뭋뭌뭎뭑뭒"],["9261","뭓뭕뭖뭗뭙",7,"뭢뭤",7,"뭭",4],["9281","뭲",21,"뮉뮊뮋뮍뮎뮏뮑",18,"뮥뮦뮧뮩뮪뮫뮭",6,"뮵뮶뮸",7,"믁믂믃믅믆믇믉",6,"믑믒믔",35,"믺믻믽믾밁"],["9341","밃",4,"밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"],["9361","밶밷밹",6,"뱂뱆뱇뱈뱊뱋뱎뱏뱑",8],["9381","뱚뱛뱜뱞",37,"벆벇벉벊벍벏",4,"벖벘벛",4,"벢벣벥벦벩",6,"벲벶",5,"벾벿볁볂볃볅",7,"볎볒볓볔볖볗볙볚볛볝",22,"볷볹볺볻볽"],["9441","볾",5,"봆봈봊",5,"봑봒봓봕",8],["9461","봞",5,"봥",6,"봭",12],["9481","봺",5,"뵁",6,"뵊뵋뵍뵎뵏뵑",6,"뵚",9,"뵥뵦뵧뵩",22,"붂붃붅붆붋",4,"붒붔붖붗붘붛붝",6,"붥",10,"붱",6,"붹",24],["9541","뷒뷓뷖뷗뷙뷚뷛뷝",11,"뷪",5,"뷱"],["9561","뷲뷳뷵뷶뷷뷹",6,"븁븂븄븆",5,"븎븏븑븒븓"],["9581","븕",6,"븞븠",35,"빆빇빉빊빋빍빏",4,"빖빘빜빝빞빟빢빣빥빦빧빩빫",4,"빲빶",4,"빾빿뺁뺂뺃뺅",6,"뺎뺒",5,"뺚",13,"뺩",14],["9641","뺸",23,"뻒뻓"],["9661","뻕뻖뻙",6,"뻡뻢뻦",5,"뻭",8],["9681","뻶",10,"뼂",5,"뼊",13,"뼚뼞",33,"뽂뽃뽅뽆뽇뽉",6,"뽒뽓뽔뽖",44],["9741","뾃",16,"뾕",8],["9761","뾞",17,"뾱",7],["9781","뾹",11,"뿆",5,"뿎뿏뿑뿒뿓뿕",6,"뿝뿞뿠뿢",89,"쀽쀾쀿"],["9841","쁀",16,"쁒",5,"쁙쁚쁛"],["9861","쁝쁞쁟쁡",6,"쁪",15],["9881","쁺",21,"삒삓삕삖삗삙",6,"삢삤삦",5,"삮삱삲삷",4,"삾샂샃샄샆샇샊샋샍샎샏샑",6,"샚샞",5,"샦샧샩샪샫샭",6,"샶샸샺",5,"섁섂섃섅섆섇섉",6,"섑섒섓섔섖",5,"섡섢섥섨섩섪섫섮"],["9941","섲섳섴섵섷섺섻섽섾섿셁",6,"셊셎",5,"셖셗"],["9961","셙셚셛셝",6,"셦셪",5,"셱셲셳셵셶셷셹셺셻"],["9981","셼",8,"솆",5,"솏솑솒솓솕솗",4,"솞솠솢솣솤솦솧솪솫솭솮솯솱",11,"솾",5,"쇅쇆쇇쇉쇊쇋쇍",6,"쇕쇖쇙",6,"쇡쇢쇣쇥쇦쇧쇩",6,"쇲쇴",7,"쇾쇿숁숂숃숅",6,"숎숐숒",5,"숚숛숝숞숡숢숣"],["9a41","숤숥숦숧숪숬숮숰숳숵",16],["9a61","쉆쉇쉉",6,"쉒쉓쉕쉖쉗쉙",6,"쉡쉢쉣쉤쉦"],["9a81","쉧",4,"쉮쉯쉱쉲쉳쉵",6,"쉾슀슂",5,"슊",5,"슑",6,"슙슚슜슞",5,"슦슧슩슪슫슮",5,"슶슸슺",33,"싞싟싡싢싥",5,"싮싰싲싳싴싵싷싺싽싾싿쌁",6,"쌊쌋쌎쌏"],["9b41","쌐쌑쌒쌖쌗쌙쌚쌛쌝",6,"쌦쌧쌪",8],["9b61","쌳",17,"썆",7],["9b81","썎",25,"썪썫썭썮썯썱썳",4,"썺썻썾",5,"쎅쎆쎇쎉쎊쎋쎍",50,"쏁",22,"쏚"],["9c41","쏛쏝쏞쏡쏣",4,"쏪쏫쏬쏮",5,"쏶쏷쏹",5],["9c61","쏿",8,"쐉",6,"쐑",9],["9c81","쐛",8,"쐥",6,"쐭쐮쐯쐱쐲쐳쐵",6,"쐾",9,"쑉",26,"쑦쑧쑩쑪쑫쑭",6,"쑶쑷쑸쑺",5,"쒁",18,"쒕",6,"쒝",12],["9d41","쒪",13,"쒹쒺쒻쒽",8],["9d61","쓆",25],["9d81","쓠",8,"쓪",5,"쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",9,"씍씎씏씑씒씓씕",6,"씝",10,"씪씫씭씮씯씱",6,"씺씼씾",5,"앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",6,"앲앶",5,"앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"],["9e41","얖얙얚얛얝얞얟얡",7,"얪",9,"얶"],["9e61","얷얺얿",4,"엋엍엏엒엓엕엖엗엙",6,"엢엤엦엧"],["9e81","엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",6,"옚옝",6,"옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",6,"왒왖",5,"왞왟왡",10,"왭왮왰왲",5,"왺왻왽왾왿욁",6,"욊욌욎",5,"욖욗욙욚욛욝",6,"욦"],["9f41","욨욪",5,"욲욳욵욶욷욻",4,"웂웄웆",5,"웎"],["9f61","웏웑웒웓웕",6,"웞웟웢",5,"웪웫웭웮웯웱웲"],["9f81","웳",4,"웺웻웼웾",5,"윆윇윉윊윋윍",6,"윖윘윚",5,"윢윣윥윦윧윩",6,"윲윴윶윸윹윺윻윾윿읁읂읃읅",4,"읋읎읐읙읚읛읝읞읟읡",6,"읩읪읬",7,"읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",4,"잢잧",4,"잮잯잱잲잳잵잶잷"],["a041","잸잹잺잻잾쟂",5,"쟊쟋쟍쟏쟑",6,"쟙쟚쟛쟜"],["a061","쟞",5,"쟥쟦쟧쟩쟪쟫쟭",13],["a081","쟻",4,"젂젃젅젆젇젉젋",4,"젒젔젗",4,"젞젟젡젢젣젥",6,"젮젰젲",5,"젹젺젻젽젾젿졁",6,"졊졋졎",5,"졕",26,"졲졳졵졶졷졹졻",4,"좂좄좈좉좊좎",5,"좕",7,"좞좠좢좣좤"],["a141","좥좦좧좩",18,"좾좿죀죁"],["a161","죂죃죅죆죇죉죊죋죍",6,"죖죘죚",5,"죢죣죥"],["a181","죦",14,"죶",5,"죾죿줁줂줃줇",4,"줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",9,"±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"],["a241","줐줒",5,"줙",18],["a261","줭",6,"줵",18],["a281","쥈",7,"쥒쥓쥕쥖쥗쥙",6,"쥢쥤",7,"쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"],["a341","쥱쥲쥳쥵",6,"쥽",10,"즊즋즍즎즏"],["a361","즑",6,"즚즜즞",16],["a381","즯",16,"짂짃짅짆짉짋",4,"짒짔짗짘짛！",58,"￦］",32,"￣"],["a441","짞짟짡짣짥짦짨짩짪짫짮짲",5,"짺짻짽짾짿쨁쨂쨃쨄"],["a461","쨅쨆쨇쨊쨎",5,"쨕쨖쨗쨙",12],["a481","쨦쨧쨨쨪",28,"ㄱ",93],["a541","쩇",4,"쩎쩏쩑쩒쩓쩕",6,"쩞쩢",5,"쩩쩪"],["a561","쩫",17,"쩾",5,"쪅쪆"],["a581","쪇",16,"쪙",14,"ⅰ",9],["a5b0","Ⅰ",9],["a5c1","Α",16,"Σ",6],["a5e1","α",16,"σ",6],["a641","쪨",19,"쪾쪿쫁쫂쫃쫅"],["a661","쫆",5,"쫎쫐쫒쫔쫕쫖쫗쫚",5,"쫡",6],["a681","쫨쫩쫪쫫쫭",6,"쫵",18,"쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",7],["a741","쬋",4,"쬑쬒쬓쬕쬖쬗쬙",6,"쬢",7],["a761","쬪",22,"쭂쭃쭄"],["a781","쭅쭆쭇쭊쭋쭍쭎쭏쭑",6,"쭚쭛쭜쭞",5,"쭥",7,"㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",9,"㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",9,"㎀",4,"㎺",5,"㎐",4,"Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"],["a841","쭭",10,"쭺",14],["a861","쮉",18,"쮝",6],["a881","쮤",19,"쮹",11,"ÆÐªĦ"],["a8a6","Ĳ"],["a8a8","ĿŁØŒºÞŦŊ"],["a8b1","㉠",27,"ⓐ",25,"①",14,"½⅓⅔¼¾⅛⅜⅝⅞"],["a941","쯅",14,"쯕",10],["a961","쯠쯡쯢쯣쯥쯦쯨쯪",18],["a981","쯽",14,"찎찏찑찒찓찕",6,"찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",27,"⒜",25,"⑴",14,"¹²³⁴ⁿ₁₂₃₄"],["aa41","찥찦찪찫찭찯찱",6,"찺찿",4,"챆챇챉챊챋챍챎"],["aa61","챏",4,"챖챚",5,"챡챢챣챥챧챩",6,"챱챲"],["aa81","챳챴챶",29,"ぁ",82],["ab41","첔첕첖첗첚첛첝첞첟첡",6,"첪첮",5,"첶첷첹"],["ab61","첺첻첽",6,"쳆쳈쳊",5,"쳑쳒쳓쳕",5],["ab81","쳛",8,"쳥",6,"쳭쳮쳯쳱",12,"ァ",85],["ac41","쳾쳿촀촂",5,"촊촋촍촎촏촑",6,"촚촜촞촟촠"],["ac61","촡촢촣촥촦촧촩촪촫촭",11,"촺",4],["ac81","촿",28,"쵝쵞쵟А",5,"ЁЖ",25],["acd1","а",5,"ёж",25],["ad41","쵡쵢쵣쵥",6,"쵮쵰쵲",5,"쵹",7],["ad61","춁",6,"춉",10,"춖춗춙춚춛춝춞춟"],["ad81","춠춡춢춣춦춨춪",5,"춱",18,"췅"],["ae41","췆",5,"췍췎췏췑",16],["ae61","췢",5,"췩췪췫췭췮췯췱",6,"췺췼췾",4],["ae81","츃츅츆츇츉츊츋츍",6,"츕츖츗츘츚",5,"츢츣츥츦츧츩츪츫"],["af41","츬츭츮츯츲츴츶",19],["af61","칊",13,"칚칛칝칞칢",5,"칪칬"],["af81","칮",5,"칶칷칹칺칻칽",6,"캆캈캊",5,"캒캓캕캖캗캙"],["b041","캚",5,"캢캦",5,"캮",12],["b061","캻",5,"컂",19],["b081","컖",13,"컦컧컩컪컭",6,"컶컺",5,"가각간갇갈갉갊감",7,"같",4,"갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"],["b141","켂켃켅켆켇켉",6,"켒켔켖",5,"켝켞켟켡켢켣"],["b161","켥",6,"켮켲",5,"켹",11],["b181","콅",14,"콖콗콙콚콛콝",6,"콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"],["b241","콭콮콯콲콳콵콶콷콹",6,"쾁쾂쾃쾄쾆",5,"쾍"],["b261","쾎",18,"쾢",5,"쾩"],["b281","쾪",5,"쾱",18,"쿅",6,"깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"],["b341","쿌",19,"쿢쿣쿥쿦쿧쿩"],["b361","쿪",5,"쿲쿴쿶",5,"쿽쿾쿿퀁퀂퀃퀅",5],["b381","퀋",5,"퀒",5,"퀙",19,"끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",4,"낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"],["b441","퀮",5,"퀶퀷퀹퀺퀻퀽",6,"큆큈큊",5],["b461","큑큒큓큕큖큗큙",6,"큡",10,"큮큯"],["b481","큱큲큳큵",6,"큾큿킀킂",18,"뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",4,"닳담답닷",4,"닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"],["b541","킕",14,"킦킧킩킪킫킭",5],["b561","킳킶킸킺",5,"탂탃탅탆탇탊",5,"탒탖",4],["b581","탛탞탟탡탢탣탥",6,"탮탲",5,"탹",11,"덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"],["b641","턅",7,"턎",17],["b661","턠",15,"턲턳턵턶턷턹턻턼턽턾"],["b681","턿텂텆",5,"텎텏텑텒텓텕",6,"텞텠텢",5,"텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"],["b741","텮",13,"텽",6,"톅톆톇톉톊"],["b761","톋",20,"톢톣톥톦톧"],["b781","톩",6,"톲톴톶톷톸톹톻톽톾톿퇁",14,"래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"],["b841","퇐",7,"퇙",17],["b861","퇫",8,"퇵퇶퇷퇹",13],["b881","툈툊",5,"툑",24,"륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",4,"맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"],["b941","툪툫툮툯툱툲툳툵",6,"툾퉀퉂",5,"퉉퉊퉋퉌"],["b961","퉍",14,"퉝",6,"퉥퉦퉧퉨"],["b981","퉩",22,"튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",4,"받",4,"밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"],["ba41","튍튎튏튒튓튔튖",5,"튝튞튟튡튢튣튥",6,"튭"],["ba61","튮튯튰튲",5,"튺튻튽튾틁틃",4,"틊틌",5],["ba81","틒틓틕틖틗틙틚틛틝",6,"틦",9,"틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"],["bb41","틻",4,"팂팄팆",5,"팏팑팒팓팕팗",4,"팞팢팣"],["bb61","팤팦팧팪팫팭팮팯팱",6,"팺팾",5,"퍆퍇퍈퍉"],["bb81","퍊",31,"빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"],["bc41","퍪",17,"퍾퍿펁펂펃펅펆펇"],["bc61","펈펉펊펋펎펒",5,"펚펛펝펞펟펡",6,"펪펬펮"],["bc81","펯",4,"펵펶펷펹펺펻펽",6,"폆폇폊",5,"폑",5,"샥샨샬샴샵샷샹섀섄섈섐섕서",4,"섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"],["bd41","폗폙",7,"폢폤",7,"폮폯폱폲폳폵폶폷"],["bd61","폸폹폺폻폾퐀퐂",5,"퐉",13],["bd81","퐗",5,"퐞",25,"숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"],["be41","퐸",7,"푁푂푃푅",14],["be61","푔",7,"푝푞푟푡푢푣푥",7,"푮푰푱푲"],["be81","푳",4,"푺푻푽푾풁풃",4,"풊풌풎",5,"풕",8,"쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",6,"엌엎"],["bf41","풞",10,"풪",14],["bf61","풹",18,"퓍퓎퓏퓑퓒퓓퓕"],["bf81","퓖",5,"퓝퓞퓠",7,"퓩퓪퓫퓭퓮퓯퓱",6,"퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",5,"옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"],["c041","퓾",5,"픅픆픇픉픊픋픍",6,"픖픘",5],["c061","픞",25],["c081","픸픹픺픻픾픿핁핂핃핅",6,"핎핐핒",5,"핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",7,"읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"],["c141","핤핦핧핪핬핮",5,"핶핷핹핺핻핽",6,"햆햊햋"],["c161","햌햍햎햏햑",19,"햦햧"],["c181","햨",31,"점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"],["c241","헊헋헍헎헏헑헓",4,"헚헜헞",5,"헦헧헩헪헫헭헮"],["c261","헯",4,"헶헸헺",5,"혂혃혅혆혇혉",6,"혒"],["c281","혖",5,"혝혞혟혡혢혣혥",7,"혮",9,"혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"],["c341","혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",4],["c361","홢",4,"홨홪",5,"홲홳홵",11],["c381","횁횂횄횆",5,"횎횏횑횒횓횕",7,"횞횠횢",5,"횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"],["c441","횫횭횮횯횱",7,"횺횼",7,"훆훇훉훊훋"],["c461","훍훎훏훐훒훓훕훖훘훚",5,"훡훢훣훥훦훧훩",4],["c481","훮훯훱훲훳훴훶",5,"훾훿휁휂휃휅",11,"휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"],["c541","휕휖휗휚휛휝휞휟휡",6,"휪휬휮",5,"휶휷휹"],["c561","휺휻휽",6,"흅흆흈흊",5,"흒흓흕흚",4],["c581","흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",6,"흾흿힀힂",5,"힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"],["c641","힍힎힏힑",6,"힚힜힞",5],["c6a1","퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"],["c7a1","퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"],["c8a1","혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"],["caa1","伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"],["cba1","匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"],["cca1","瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"],["cda1","棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"],["cea1","科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"],["cfa1","區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"],["d0a1","鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"],["d1a1","朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",5,"那樂",4,"諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"],["d2a1","納臘蠟衲囊娘廊",4,"乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",5,"駑魯",10,"濃籠聾膿農惱牢磊腦賂雷尿壘",7,"嫩訥杻紐勒",5,"能菱陵尼泥匿溺多茶"],["d3a1","丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"],["d4a1","棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"],["d5a1","蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"],["d6a1","煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"],["d7a1","遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"],["d8a1","立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"],["d9a1","蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"],["daa1","汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"],["dba1","發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"],["dca1","碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"],["dda1","孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"],["dea1","脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"],["dfa1","傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"],["e0a1","胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"],["e1a1","聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"],["e2a1","戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"],["e3a1","嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"],["e4a1","沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"],["e5a1","櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"],["e6a1","旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"],["e7a1","簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"],["e8a1","烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"],["e9a1","窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"],["eaa1","運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"],["eba1","濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"],["eca1","議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"],["eda1","立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"],["eea1","障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"],["efa1","煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"],["f0a1","靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"],["f1a1","踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"],["f2a1","咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"],["f3a1","鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"],["f4a1","責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"],["f5a1","椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"],["f6a1","贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"],["f7a1","鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"],["f8a1","阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"],["f9a1","品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"],["faa1","行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"],["fba1","形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"],["fca1","禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"],["fda1","爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"]]'
		)
	}]
]);
