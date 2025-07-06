( () => {
    "use strict";
    var t = {
        370: (t, e) => {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.visibleForTesting = void 0,
            e.visibleForTesting = (t, e) => {}
        }
        ,
        568: (t, e, i) => {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.AppStorage = void 0;
            const n = i(923);
            e.AppStorage = class {
                static save(t, e) {
                    const i = JSON.stringify(e);
                    localStorage.setItem(t, i)
                }
                static load(t) {
                    const e = localStorage.getItem(t);
                    return e ? JSON.parse(e) : null
                }
                static getFbc() {
                    const t = document.cookie.split(";");
                    for (const e of t) {
                        const [t,i] = e.trim().split("=");
                        if ("_fbc" === t)
                            return decodeURIComponent(i)
                    }
                }
                static getFbp() {
                    var t;
                    return null !== (t = n.Utils.getCookieByNames("_fbp", "fbp")) && void 0 !== t ? t : void 0
                }
            }
        }
        ,
        717: function(t, e) {
            var i = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.CountryService = void 0,
            e.CountryService = class {
                static getCountry(t) {
                    var e, n;
                    return i(this, void 0, void 0, (function*() {
                        if (null === (e = t.geolocation) || void 0 === e ? void 0 : e.country)
                            return t.geolocation.country;
                        const i = yield(yield fetch("https://ipapi.co/json/")).json();
                        return null !== (n = i.country) && void 0 !== n ? n : null
                    }
                    ))
                }
            }
        },
        75: (t, e) => {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.FBC = void 0;
            class i {
                constructor(t) {
                    this.version = "fb",
                    this.fbclid = t,
                    this.subdomainIndex = 1,
                    this.creationTime = Date.now()
                }
                static fromClid(t) {
                    return t ? new i(t) : null
                }
                formatted() {
                    return `${this.version}.${this.subdomainIndex}.${this.creationTime}.${this.fbclid}`
                }
            }
            e.FBC = i
        }
        ,
        865: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var o, r = arguments.length, l = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    l = Reflect.decorate(t, e, i, n);
                else
                    for (var a = t.length - 1; a >= 0; a--)
                        (o = t[a]) && (l = (r < 3 ? o(l) : r > 3 ? o(e, i, l) : o(e, i)) || l);
                return r > 3 && l && Object.defineProperty(e, i, l),
                l
            }
              , o = this && this.__metadata || function(t, e) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(t, e)
            }
              , r = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.FormsListener = void 0;
            const l = i(370)
              , a = i(119)
              , s = i(568)
              , c = i(717)
              , d = i(562)
              , u = i(554)
              , v = i(526)
              , p = i(923);
            class h {
                static init() {
                    h.inited || (h.inited = !0,
                    "complete" === document.readyState ? h.startListening() : window.addEventListener("load", h.startListening))
                }
                static startListening() {
                    h.listenToForms(!0),
                    new d.Observer({
                        throttle: 2e3,
                        groupEvents: !0
                    }).observeNewElements(document.body, ( () => {
                        h.listenToForms(!1)
                    }
                    ))
                }
                static listenToForms(t) {
                    Array.from(document.querySelectorAll("input, textarea")).forEach((e => {
                        (t || h.canUseEl(e)) && (h.tryFill(e),
                        e.addEventListener("input", h.handleInput),
                        e.addEventListener("blur", h.handleInput))
                    }
                    ))
                }
                static tryFill(t) {
                    var e, i, n, o;
                    return r(this, void 0, void 0, (function*() {
                        const r = yield v.Tracker.getTruthyLead()
                          , l = h.classifyInput(t);
                        l === a.InputType.Phone && (t.value = null !== (e = r.phone) && void 0 !== e ? e : ""),
                        l === a.InputType.Email && (t.value = null !== (i = r.email) && void 0 !== i ? i : ""),
                        l === a.InputType.Name && (t.value = `${null !== (n = r.firstName) && void 0 !== n ? n : ""} ${null !== (o = r.lastName) && void 0 !== o ? o : ""}`)
                    }
                    ))
                }
                static handleInput(t) {
                    return r(this, void 0, void 0, (function*() {
                        const e = t.target
                          , i = h.classifyInput(e)
                          , n = yield v.Tracker.getTruthyLead();
                        if (i === a.InputType.Phone) {
                            const t = yield c.CountryService.getCountry(n)
                              , i = u.Phone.format(e.value, "BR" === t);
                            s.AppStorage.save(v.Tracker.leadKey, Object.assign(Object.assign({}, n), {
                                phone: i
                            }))
                        }
                        if (i === a.InputType.Email && s.AppStorage.save(v.Tracker.leadKey, Object.assign(Object.assign({}, n), {
                            email: e.value
                        })),
                        i === a.InputType.Name) {
                            const t = e.value.split(" ")
                              , i = t[0]
                              , o = t.slice(1).join(" ");
                            s.AppStorage.save(v.Tracker.leadKey, Object.assign(Object.assign({}, n), {
                                firstName: i,
                                lastName: o
                            }))
                        }
                    }
                    ))
                }
                static classifyInput(t) {
                    const {id: e, name: i, type: n, placeholder: o} = t;
                    return "email" === n || (null == o ? void 0 : o.toLowerCase().includes("email")) || (null == e ? void 0 : e.toLowerCase().includes("field-email")) || (null == i ? void 0 : i.toLowerCase().includes("email")) ? a.InputType.Email : (null == i ? void 0 : i.toLowerCase().includes("phone")) || (null == e ? void 0 : e.toLowerCase().includes("field-phone")) || (null == o ? void 0 : o.toLowerCase().includes("phone")) ? a.InputType.Phone : (null == i ? void 0 : i.toLowerCase().includes("name")) || (null == e ? void 0 : e.toLowerCase().includes("field-name")) || (null == o ? void 0 : o.toLowerCase().includes("name")) ? a.InputType.Name : a.InputType.Unknown
                }
                static canUseEl(t) {
                    if (h.usedIds.has(t.id))
                        return !1;
                    const e = p.Utils.getId(t);
                    return h.usedIds.add(e),
                    !0
                }
            }
            h.inited = !1,
            h.usedIds = new Set,
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", []), o("design:returntype", void 0)], h, "startListening", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [HTMLInputElement]), o("design:returntype", Promise)], h, "tryFill", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Event]), o("design:returntype", Promise)], h, "handleInput", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [HTMLInputElement]), o("design:returntype", String)], h, "classifyInput", null),
            e.FormsListener = h
        },
        8: function(t, e) {
            var i = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Ips = void 0;
            class n {
                static getIpv4(t) {
                    return i(this, void 0, void 0, (function*() {
                        return yield n.fetchIp("https://api.ipify.org?format=json", "error on getIpv4", null == t ? void 0 : t.timeoutMs)
                    }
                    ))
                }
                static getIpv6(t) {
                    return i(this, void 0, void 0, (function*() {
                        return yield n.fetchIp("https://api6.ipify.org?format=json", "error on getIpv6", null == t ? void 0 : t.timeoutMs)
                    }
                    ))
                }
                static fetchIp(t, e, n) {
                    var o;
                    return i(this, void 0, void 0, (function*() {
                        const i = n ? AbortSignal.timeout(n) : null;
                        try {
                            const e = yield fetch(t, {
                                signal: i
                            }).then((t => t.json()));
                            return null !== (o = e.ip) && void 0 !== o ? o : void 0
                        } catch (t) {
                            return void console.log(e, t)
                        }
                    }
                    ))
                }
            }
            e.Ips = n
        },
        774: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var o, r = arguments.length, l = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    l = Reflect.decorate(t, e, i, n);
                else
                    for (var a = t.length - 1; a >= 0; a--)
                        (o = t[a]) && (l = (r < 3 ? o(l) : r > 3 ? o(e, i, l) : o(e, i)) || l);
                return r > 3 && l && Object.defineProperty(e, i, l),
                l
            }
              , o = this && this.__metadata || function(t, e) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(t, e)
            }
              , r = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.checkoutButtonKeywors = e.checkoutLinkKeywords = e.NavigationListener = void 0;
            const l = i(370)
              , a = i(562)
              , s = i(526)
              , c = i(923);
            class d {
                static init() {
                    this.inited || (this.inited = !0,
                    d.monitorWindowOpen(),
                    d.monitorLinks(!0),
                    d.monitorButtons(!0),
                    d.monitorForms(!0),
                    new a.Observer({
                        throttle: 2e3,
                        groupEvents: !0
                    }).observeNewElements(document.body, ( () => {
                        d.monitorLinks(!1),
                        d.monitorButtons(!1),
                        d.monitorForms(!1)
                    }
                    )))
                }
                static monitorButtons(t) {
                    const e = Array.from(document.querySelectorAll("button"));
                    console.log("buttons", e),
                    e.forEach((e => {
                        (t || this.canUseEl(e)) && e.addEventListener("click", (t => {
                            var i, n, o, r;
                            console.log("button clicked pixel", e),
                            (d.isCheckoutButtonText(null !== (i = e.textContent) && void 0 !== i ? i : "") || d.isCheckoutButtonClassList(null !== (n = e.classList) && void 0 !== n ? n : "")) && (console.log("tracking ic with button", e),
                            s.Tracker.track("InitiateCheckout")),
                            d.isLeadButtonText(null !== (o = e.textContent) && void 0 !== o ? o : "") && (console.log("tracking lead with button", e),
                            s.Tracker.track("Lead")),
                            d.isAddToCartButtonText(null !== (r = e.textContent) && void 0 !== r ? r : "") && (console.log("tracking add to cart with button", e),
                            s.Tracker.track("AddToCart"))
                        }
                        ), !0)
                    }
                    ))
                }
                static monitorForms(t) {
                    Array.from(document.querySelectorAll("form")).forEach((e => {
                        (t || this.canUseEl(e)) && e.addEventListener("submit", (t => {
                            var i, n, o, r;
                            const l = e.querySelector('button[type="submit"]');
                            console.log("submitButton", l),
                            d.isCheckoutButtonText(null !== (i = null == l ? void 0 : l.textContent) && void 0 !== i ? i : "") && (console.log("tracking ic with form", e),
                            s.Tracker.track("InitiateCheckout")),
                            d.isCheckoutButtonClassList(null !== (n = null == l ? void 0 : l.classList) && void 0 !== n ? n : null) && (console.log("tracking ic with form", e),
                            s.Tracker.track("InitiateCheckout")),
                            d.isCheckoutLink(e.action, void 0, void 0) && (console.log("tracking ic with form", e),
                            s.Tracker.track("InitiateCheckout")),
                            d.isLeadButtonText(null !== (o = null == l ? void 0 : l.textContent) && void 0 !== o ? o : "") && (console.log("tracking lead with button", l),
                            s.Tracker.track("Lead")),
                            d.isAddToCartButtonText(null !== (r = null == l ? void 0 : l.textContent) && void 0 !== r ? r : "") && (console.log("tracking add to cart with button", l),
                            s.Tracker.track("AddToCart"))
                        }
                        ), !0)
                    }
                    ))
                }
                static monitorWindowOpen() {
                    const t = window.open;
                    window.open = function(e, i, n) {
                        const o = () => t(e, i || "", n || "");
                        return d.isCheckoutLink(null == e ? void 0 : e.toString(), void 0, void 0) ? (s.Tracker.track("InitiateCheckout").finally(( () => {
                            o()
                        }
                        )),
                        null) : o()
                    }
                }
                static monitorLinks(t) {
                    Array.from(document.querySelectorAll("a")).forEach((e => {
                        (t || this.canUseEl(e)) && e.addEventListener("click", (t => {
                            var i, n, o;
                            console.log("link clicked v", e);
                            const r = d.isCheckoutLink(e.href, null !== (i = e.textContent) && void 0 !== i ? i : "", e.classList);
                            console.log("canSendIc", r),
                            r && d.waitBeforeAction(t, s.Tracker.track("InitiateCheckout"), e);
                            const l = d.isLeadButtonText(null !== (n = e.textContent) && void 0 !== n ? n : "");
                            console.log("canSendLead", l),
                            l && d.waitBeforeAction(t, s.Tracker.track("Lead"), e);
                            const a = d.isAddToCartButtonText(null !== (o = e.textContent) && void 0 !== o ? o : "");
                            console.log("canAddToCart", a),
                            a && (console.log("tracking add to cart with button", e),
                            d.waitBeforeAction(t, s.Tracker.track("AddToCart"), e))
                        }
                        ), !0)
                    }
                    ))
                }
                static waitBeforeAction(t, e, i) {
                    var n, o;
                    return r(this, void 0, void 0, (function*() {
                        if (d.isShopify())
                            return void (yield e);
                        if (d.isElementorButton(i))
                            return void (yield e);
                        if (null !== (n = null == t ? void 0 : t.flagged) && void 0 !== n && n)
                            return void console.log("flagged event", t);
                        null == t || t.preventDefault(),
                        null == t || t.stopPropagation();
                        const r = i.onclick;
                        i.onclick = null;
                        try {
                            yield e,
                            console.log("tracking done")
                        } catch (t) {
                            console.error("Error tracking", t)
                        }
                        console.log("target", i),
                        console.log("insance of a el", i instanceof HTMLAnchorElement);
                        const l = i.classList.contains("link_interno");
                        if (r)
                            r.call(i);
                        else if (i instanceof HTMLAnchorElement && null != i.href && "" !== i.href && !l)
                            console.log("TARGET.href", i.href),
                            window.location.href = i.href;
                        else if (i instanceof HTMLButtonElement && "submit" === i.type) {
                            const t = i.closest("form");
                            t && t.submit()
                        }
                        const a = new Event(t.type,t);
                        a.flagged = !0,
                        null === (o = t.target) || void 0 === o || o.dispatchEvent(a),
                        console.log("dispatched event", a),
                        i.onclick = r
                    }
                    ))
                }
                static canUseEl(t) {
                    if (this.usedIds.has(t.id))
                        return !1;
                    const e = c.Utils.getId(t);
                    return this.usedIds.add(e),
                    !0
                }
                static removeInvisibleCharsFromText(t) {
                    return null == t ? void 0 : t.replace(/[\u200B-\u200D\uFEFF]/g, "")
                }
                static isCheckoutLink(t, i, n) {
                    var o, r, l;
                    console.log("check is checkout link: ", t);
                    const a = s.Tracker.getTruthyLead();
                    if (a.icURLMatch)
                        return null !== (o = null == t ? void 0 : t.includes(a.icURLMatch)) && void 0 !== o && o;
                    if (null != a.icTextMatch) {
                        if (null == i ? void 0 : i.includes(a.icTextMatch))
                            return !0;
                        const t = d.removeInvisibleCharsFromText(i);
                        return null !== (r = null == t ? void 0 : t.includes(a.icTextMatch)) && void 0 !== r && r
                    }
                    if (a.icCSSMatch)
                        return null !== (l = null == n ? void 0 : n.contains(a.icCSSMatch)) && void 0 !== l && l;
                    for (const i of e.checkoutLinkKeywords)
                        if (null == t ? void 0 : t.toLowerCase().includes(i.toLowerCase()))
                            return !0;
                    return !1
                }
                static isCheckoutButtonText(t) {
                    var i;
                    console.log("check can iniate checkout: ", t);
                    const n = s.Tracker.getTruthyLead();
                    if (null != n.icTextMatch) {
                        if (null == t ? void 0 : t.includes(n.icTextMatch))
                            return !0;
                        const e = d.removeInvisibleCharsFromText(t);
                        return null !== (i = null == e ? void 0 : e.includes(n.icTextMatch)) && void 0 !== i && i
                    }
                    return e.checkoutButtonKeywors.some((e => t.toLowerCase().includes(e)))
                }
                static isCheckoutButtonClassList(t) {
                    var e;
                    const i = s.Tracker.getTruthyLead();
                    return null != i.icCSSMatch && null !== (e = null == t ? void 0 : t.contains(i.icCSSMatch)) && void 0 !== e && e
                }
                static isLeadButtonText(t) {
                    var e;
                    console.log("check can send lead: ", t);
                    const i = s.Tracker.getTruthyLead();
                    return null != i.leadTextMatch && null !== (e = null == t ? void 0 : t.includes(i.leadTextMatch)) && void 0 !== e && e
                }
                static isAddToCartButtonText(t) {
                    var e;
                    console.log("check can send add to cart: ", t);
                    const i = s.Tracker.getTruthyLead();
                    return null != i.addToCartTextMatch && null !== (e = null == t ? void 0 : t.includes(i.addToCartTextMatch)) && void 0 !== e && e
                }
                static isShopify() {
                    var t;
                    const e = null === (t = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === t ? void 0 : t.themeName;
                    return null != e && "" !== e
                }
                static isElementorButton(t) {
                    return null == t ? void 0 : t.classList.contains("elementor-button")
                }
            }
            d.inited = !1,
            d.usedIds = new Set,
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Boolean]), o("design:returntype", void 0)], d, "monitorButtons", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Boolean]), o("design:returntype", void 0)], d, "monitorForms", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", []), o("design:returntype", void 0)], d, "monitorWindowOpen", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Boolean]), o("design:returntype", void 0)], d, "monitorLinks", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Object]), o("design:returntype", Object)], d, "removeInvisibleCharsFromText", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Object, Object, Object]), o("design:returntype", Boolean)], d, "isCheckoutLink", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [String]), o("design:returntype", Boolean)], d, "isCheckoutButtonText", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Object]), o("design:returntype", Boolean)], d, "isCheckoutButtonClassList", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [String]), o("design:returntype", Boolean)], d, "isLeadButtonText", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [String]), o("design:returntype", Boolean)], d, "isAddToCartButtonText", null),
            e.NavigationListener = d,
            e.checkoutLinkKeywords = ["checkout", "pagamento", "payment", "pay", "kiwify", "hotmart", "eduzz", "monetizze", "vindi", "pague", "comprar", "finalizar", "compra", "cart", "carrinho", "order", "pedido", "confirmar", "confirmacao", "confirmation", "adoorei", "vega", "buygoods", "octuspay", "perfect", "iexperience", "payt", "guru", "green", "yampi", "appmax", "pepper"],
            e.checkoutButtonKeywors = ["comprar", "finalizar", "compra", "confirmar", "quero ter", "proximo passo", "próximo passo", "inscrição", "inscricao", "participar", "participe", "quero participar", "checkout"]
        },
        562: (t, e) => {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Observer = void 0,
            e.Observer = class {
                constructor(t) {
                    var e, i;
                    this.mutations = [],
                    this.timer = null,
                    this.setThrottle(null !== (e = t.throttle) && void 0 !== e ? e : 100),
                    this.groupEvents = null !== (i = t.groupEvents) && void 0 !== i && i
                }
                observeNewElements(t, e) {
                    this.callback = e,
                    new MutationObserver(( (t, e) => {
                        const i = this.groupEvents ? 1 : null;
                        (null == i || this.mutations.length < i) && this.mutations.push({
                            list: t,
                            _observer: e
                        })
                    }
                    )).observe(t, {
                        subtree: !0,
                        childList: !0
                    })
                }
                setThrottle(t) {
                    var e;
                    this.throttle = t,
                    null === (e = this.timer) || void 0 === e || e.unref(),
                    this.timer = setInterval(( () => {
                        this.checkMutations()
                    }
                    ), this.throttle)
                }
                checkMutations() {
                    const t = this.mutations.length;
                    for (let e = 0; e < t; e++) {
                        const t = this.mutations.shift();
                        t && this.callback(t.list, t._observer)
                    }
                }
            }
        }
        ,
        554: (t, e) => {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Phone = void 0,
            e.Phone = class {
                static format(t, e=!0) {
                    const i = t.replace(/\D/g, "");
                    let n = i;
                    const o = e ? "55" : "";
                    return e && (i.startsWith("00") ? n = i.substring(2) : i.startsWith("0") && (n = i.substring(1)),
                    10 === n.length ? n = `55${n.substring(0, 2)}9${n.substring(2)}` : 12 === n.length && n.startsWith("55") && (n = `55${n.substring(0, 4)}9${n.substring(4)}`)),
                    n.startsWith(o) || (n = `${o}${n}`),
                    n.replace(/^0+/, "")
                }
            }
        }
        ,
        428: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var o, r = arguments.length, l = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    l = Reflect.decorate(t, e, i, n);
                else
                    for (var a = t.length - 1; a >= 0; a--)
                        (o = t[a]) && (l = (r < 3 ? o(l) : r > 3 ? o(e, i, l) : o(e, i)) || l);
                return r > 3 && l && Object.defineProperty(e, i, l),
                l
            }
              , o = this && this.__metadata || function(t, e) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(t, e)
            }
              , r = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.PixelUtmify = void 0;
            const l = i(370)
              , a = i(186)
              , s = i(937)
              , c = i(792)
              , d = i(923);
            class u {
                static init(t) {
                    return r(this, void 0, void 0, (function*() {
                        var e, i, n, o, l, a;
                        "undefined" == typeof fbq && (e = window,
                        i = document,
                        n = "script",
                        e.fbq || (o = e.fbq = function() {
                            o.callMethod ? o.callMethod.apply(o, arguments) : o.queue.push(arguments)
                        }
                        ,
                        e._fbq || (e._fbq = o),
                        o.push = o,
                        o.loaded = !0,
                        o.version = "2.0",
                        o.queue = [],
                        (l = i.createElement(n)).async = !0,
                        l.src = "https://connect.facebook.net/en_US/fbevents.js",
                        null == (a = i.getElementsByTagName(n)[0]) || a.parentNode.insertBefore(l, a))),
                        t && t.length > 0 && (yield Promise.all(t.map((t => r(this, void 0, void 0, (function*() {
                            u.initedPixels.includes(t) || (yield fbq("init", t),
                            u.initedPixels.push(t))
                        }
                        ))))))
                    }
                    ))
                }
                static get baseUrl() {
                    return "localhost" === window.location.hostname || "127.0.0.1" === window.location.hostname ? "http://localhost:3001/tracking/v1" : "https://tracking.utmify.com.br/tracking/v1"
                }
                static event(t) {
                    var e, i, n, o, l, a, c, d, u, v, p, h, g, f, y, m, b, T, w, k, C, _, L, x, I, F, M, P, S, O;
                    return r(this, void 0, void 0, (function*() {
                        const r = `${this.baseUrl}/events`
                          , j = yield fetch(r, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(t)
                        }).then((t => t.json()));
                        if (console.log(`response for ${null === (e = t.lead) || void 0 === e ? void 0 : e.pixelId}: ${null === (i = null == j ? void 0 : j.lead) || void 0 === i ? void 0 : i.metaPixelIds}`),
                        null == j.lead._id)
                            return null;
                        const A = new s.Lead({
                            _id: j.lead._id,
                            pixelId: j.lead.pixelId,
                            userAgent: null !== (o = null === (n = null == t ? void 0 : t.lead) || void 0 === n ? void 0 : n.userAgent) && void 0 !== o ? o : "",
                            birthdate: j.lead.birthdate,
                            email: j.lead.email,
                            fbc: j.lead.fbc,
                            fbp: null === (l = null == t ? void 0 : t.lead) || void 0 === l ? void 0 : l.fbp,
                            gclid: null !== (p = null !== (c = null === (a = null == j ? void 0 : j.lead) || void 0 === a ? void 0 : a.gclid) && void 0 !== c ? c : null === (v = null === (u = null === (d = null == j ? void 0 : j.event) || void 0 === d ? void 0 : d.log) || void 0 === u ? void 0 : u.leadData) || void 0 === v ? void 0 : v.gclid) && void 0 !== p ? p : null === (h = null == t ? void 0 : t.lead) || void 0 === h ? void 0 : h.gclid,
                            kclid: null !== (T = null !== (f = null === (g = null == j ? void 0 : j.lead) || void 0 === g ? void 0 : g.kclid) && void 0 !== f ? f : null === (b = null === (m = null === (y = null == j ? void 0 : j.event) || void 0 === y ? void 0 : y.log) || void 0 === m ? void 0 : m.leadData) || void 0 === b ? void 0 : b.kclid) && void 0 !== T ? T : null === (w = null == t ? void 0 : t.lead) || void 0 === w ? void 0 : w.kclid,
                            firstName: j.lead.firstName,
                            geolocation: j.lead.geolocation,
                            ip: j.lead.ip,
                            ipv6: j.lead.ipv6,
                            lastName: j.lead.lastName,
                            metaPixelIds: j.lead.metaPixelIds,
                            phone: j.lead.phone,
                            parameters: j.lead.parameters,
                            updatedAt: new Date,
                            icTextMatch: null !== (k = j.icTextMatch) && void 0 !== k ? k : null,
                            icCSSMatch: null !== (C = j.icCSSMatch) && void 0 !== C ? C : null,
                            ipConfiguration: j.ipConfiguration,
                            leadTextMatch: null !== (_ = j.leadTextMatch) && void 0 !== _ ? _ : null,
                            icURLMatch: null !== (L = j.icURLMatch) && void 0 !== L ? L : null,
                            addToCartTextMatch: null !== (x = j.addToCartTextMatch) && void 0 !== x ? x : null
                        });
                        return "PageView" === t.type && (yield this.init(A.metaPixelIds)),
                        (null !== (F = null === (I = A.metaPixelIds) || void 0 === I ? void 0 : I.length) && void 0 !== F ? F : 0) > 0 && this.metaEvent(Object.assign(Object.assign({}, t), {
                            event: {
                                _id: j.event._id,
                                pageTitle: null !== (P = null === (M = t.event) || void 0 === M ? void 0 : M.pageTitle) && void 0 !== P ? P : null,
                                sourceUrl: null !== (O = null === (S = t.event) || void 0 === S ? void 0 : S.sourceUrl) && void 0 !== O ? O : null
                            }
                        })),
                        A
                    }
                    ))
                }
                static updateLead(t) {
                    return r(this, void 0, void 0, (function*() {
                        const e = `${this.baseUrl}/lead`;
                        return !0 === (yield fetch(e, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(t)
                        }).then((t => t.json())))
                    }
                    ))
                }
                static getClientIpAddress(t, e, i) {
                    return r(this, void 0, void 0, (function*() {
                        switch (i) {
                        case a.IpConfigurationType.IPV6_ONLY:
                            return t;
                        case a.IpConfigurationType.IPV6_OR_IPV4:
                            return t || e;
                        case a.IpConfigurationType.NO_IP:
                            return;
                        default:
                            return t || e
                        }
                    }
                    ))
                }
                static metaEvent(t) {
                    var e, i, n, o, l, a, s, u, v, p, h, g, f, y, m, b, T, w, k, C, _, L, x, I;
                    return r(this, void 0, void 0, (function*() {
                        const r = c.StringUtils.removeAllNonAlphaChars(null !== (n = null === (i = null === (e = t.lead) || void 0 === e ? void 0 : e.geolocation) || void 0 === i ? void 0 : i.city) && void 0 !== n ? n : void 0)
                          , F = c.StringUtils.removeAllNonAlphaChars(null !== (a = null === (l = null === (o = t.lead) || void 0 === o ? void 0 : o.geolocation) || void 0 === l ? void 0 : l.state) && void 0 !== a ? a : void 0)
                          , M = c.StringUtils.removeAllNonAlhaNumericChars(null !== (v = null === (u = null === (s = t.lead) || void 0 === s ? void 0 : s.geolocation) || void 0 === u ? void 0 : u.zipcode) && void 0 !== v ? v : void 0)
                          , P = c.StringUtils.removeAllNonAlphaAccentChars(null === (p = t.lead) || void 0 === p ? void 0 : p.firstName)
                          , S = c.StringUtils.removeAllNonAlphaAccentChars(null === (h = t.lead) || void 0 === h ? void 0 : h.lastName)
                          , O = yield this.getClientIpAddress(null === (g = t.lead) || void 0 === g ? void 0 : g.ipv6, null === (f = t.lead) || void 0 === f ? void 0 : f.ip, null === (y = t.lead) || void 0 === y ? void 0 : y.ipConfiguration);
                        fbq("track", t.type, {
                            event_time: d.Utils.getEventTime(),
                            event_day: d.Utils.getEventDay(),
                            event_day_in_month: d.Utils.getEventDayInMonth(),
                            event_month: d.Utils.getEventMonth(),
                            event_time_interval: d.Utils.getEventTimeInterval(),
                            event_url: window.location.href,
                            event_source_url: window.location.href,
                            traffic_source: document.referrer,
                            ct: yield d.Utils.hashValue(r),
                            st: yield d.Utils.hashValue(F),
                            zp: yield d.Utils.hashValue(M),
                            client_user_agent: null === (m = t.lead) || void 0 === m ? void 0 : m.userAgent,
                            client_ip_address: O,
                            country: yield d.Utils.hashValue(null !== (w = null === (T = null === (b = t.lead) || void 0 === b ? void 0 : b.geolocation) || void 0 === T ? void 0 : T.country) && void 0 !== w ? w : void 0),
                            external_id: null === (k = t.lead) || void 0 === k ? void 0 : k._id,
                            fn: yield d.Utils.hashValue(P),
                            ln: yield d.Utils.hashValue(S),
                            em: yield d.Utils.hashValue(null === (C = null == t ? void 0 : t.lead) || void 0 === C ? void 0 : C.email),
                            ph: yield d.Utils.hashValue(null === (_ = null == t ? void 0 : t.lead) || void 0 === _ ? void 0 : _.phone),
                            fbc: null === (L = t.lead) || void 0 === L ? void 0 : L.fbc,
                            fbp: null === (x = t.lead) || void 0 === x ? void 0 : x.fbp,
                            content_type: "product",
                            page_title: document.title
                        }, {
                            eventID: null === (I = t.event) || void 0 === I ? void 0 : I._id
                        })
                    }
                    ))
                }
            }
            u.initedPixels = [],
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Object, Object, Object]), o("design:returntype", Promise)], u, "getClientIpAddress", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [Object]), o("design:returntype", Promise)], u, "metaEvent", null),
            e.PixelUtmify = u
        },
        792: (t, e) => {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.StringUtils = void 0,
            e.StringUtils = class {
                static removeAllNonAlphaAccentChars(t) {
                    return null != t ? t.replace(/[0-9]/g, "").replace(/[^a-zA-ZÀ-ÿ\s]/g, "").replace(/[^a-zA-ZÀ-ÿ]/g, "").toLowerCase() : void 0
                }
                static removeAllNonAlphaChars(t) {
                    return null != t ? t.replace(/[^a-zA-Z]/g, "").toLowerCase() : void 0
                }
                static removeAllNonAlhaNumericChars(t) {
                    return null != t ? t.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() : void 0
                }
            }
        }
        ,
        526: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var o, r = arguments.length, l = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    l = Reflect.decorate(t, e, i, n);
                else
                    for (var a = t.length - 1; a >= 0; a--)
                        (o = t[a]) && (l = (r < 3 ? o(l) : r > 3 ? o(e, i, l) : o(e, i)) || l);
                return r > 3 && l && Object.defineProperty(e, i, l),
                l
            }
              , o = this && this.__metadata || function(t, e) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(t, e)
            }
              , r = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Tracker = void 0;
            const l = i(370)
              , a = i(937)
              , s = i(568)
              , c = i(75)
              , d = i(865)
              , u = i(8)
              , v = i(774)
              , p = i(428)
              , h = i(436);
            class g {
                static get leadKey() {
                    return "Meta" === this.type ? "lead" : "Google" === this.type ? "lead-google" : "lead-kwai"
                }
                static get pixelId() {
                    return "Meta" === this.type ? window.pixelId : "Google" === this.type ? window.googlePixelId : window.kwaiPixelId
                }
                static init(t) {
                    return r(this, void 0, void 0, (function*() {
                        if (console.log("Tracker.inited?:", this.inited),
                        this.inited)
                            return;
                        this.inited = !0,
                        this.type = t;
                        const [e,i] = yield Promise.all([u.Ips.getIpv4({
                            timeoutMs: 5e3
                        }), u.Ips.getIpv6({
                            timeoutMs: 5e3
                        })]);
                        g.ipv4 = e,
                        g.ipv6 = i,
                        d.FormsListener.init(),
                        v.NavigationListener.init(),
                        g.track("PageView"),
                        h.ViewContentListener.init(),
                        "Meta" === this.type && (yield g.trySendFbp())
                    }
                    ))
                }
                static trySendFbp() {
                    return r(this, void 0, void 0, (function*() {
                        const t = () => r(this, void 0, void 0, (function*() {
                            const t = g.getTruthyLead();
                            (null == t ? void 0 : t._id) && t.fbp && (yield p.PixelUtmify.updateLead({
                                _id: t._id,
                                fbp: t.fbp
                            })) && s.AppStorage.save(g.leadKey, t)
                        }
                        ));
                        setTimeout(t, 2500),
                        setTimeout(t, 5e3)
                    }
                    ))
                }
                static track(t) {
                    return r(this, void 0, void 0, (function*() {
                        if (this.trackedEvents.includes(t))
                            return;
                        this.trackedEvents.push(t);
                        const e = this.getTruthyLead()
                          , i = yield p.PixelUtmify.event({
                            type: t,
                            lead: e,
                            event: this.getEventData()
                        });
                        s.AppStorage.save(this.leadKey, i)
                    }
                    ))
                }
                static getTruthyLead() {
                    const t = g.getLeadFromLocalStorageOrNew();
                    return g.getLeadWithBasicFields(t)
                }
                static getLeadFromLocalStorageOrNew() {
                    return s.AppStorage.load(this.leadKey) || new a.Lead({
                        pixelId: this.pixelId,
                        userAgent: navigator.userAgent,
                        icTextMatch: null,
                        icCSSMatch: null,
                        icURLMatch: null,
                        leadTextMatch: null,
                        addToCartTextMatch: null
                    })
                }
                static getLeadWithBasicFields(t) {
                    const e = g.getFbc(t)
                      , i = g.getFbp(t)
                      , n = g.getGclid(t)
                      , o = g.getKclid(t);
                    return Object.assign(Object.assign({}, t), {
                        fbc: e,
                        fbp: i,
                        gclid: n,
                        kclid: o,
                        parameters: window.location.search,
                        ip: g.ipv4,
                        ipv6: g.ipv6
                    })
                }
                static getFbc(t) {
                    var e;
                    if (t.fbc)
                        return t.fbc;
                    const i = null !== (e = new URLSearchParams(window.location.search).get("fbclid")) && void 0 !== e ? e : void 0
                      , n = i ? c.FBC.fromClid(i) : void 0
                      , o = null == n ? void 0 : n.formatted();
                    if (o)
                        return o;
                    return s.AppStorage.getFbc() || o
                }
                static getFbp(t) {
                    return t.fbp ? t.fbp : s.AppStorage.getFbp()
                }
                static getGclid(t) {
                    var e;
                    return t.gclid ? t.gclid : null !== (e = new URLSearchParams(window.location.search).get("gclid")) && void 0 !== e ? e : void 0
                }
                static getKclid(t) {
                    var e, i;
                    return t.kclid ? t.kclid : null != (null !== (e = new URLSearchParams(window.location.search).get("CampaignID")) && void 0 !== e ? e : void 0) && null !== (i = new URLSearchParams(window.location.search).get("click_id")) && void 0 !== i ? i : void 0
                }
                static getEventData() {
                    return {
                        sourceUrl: document.referrer || null,
                        pageTitle: document.title || null
                    }
                }
            }
            g.inited = !1,
            g.type = "Meta",
            g.trackedEvents = [],
            n([l.visibleForTesting, o("design:type", String), o("design:paramtypes", [])], g, "pixelId", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", []), o("design:returntype", a.Lead)], g, "getLeadFromLocalStorageOrNew", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [a.Lead]), o("design:returntype", a.Lead)], g, "getLeadWithBasicFields", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [a.Lead]), o("design:returntype", Object)], g, "getFbc", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [a.Lead]), o("design:returntype", Object)], g, "getFbp", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", [a.Lead]), o("design:returntype", Object)], g, "getGclid", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", []), o("design:returntype", Object)], g, "getEventData", null),
            e.Tracker = g
        },
        923: function(t, e) {
            var i = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Utils = void 0;
            class n {
                static hashValue(t) {
                    return i(this, void 0, void 0, (function*() {
                        if (t && t.length) {
                            if (crypto && crypto.subtle) {
                                const e = (new TextEncoder).encode(t)
                                  , i = yield crypto.subtle.digest("SHA-256", e);
                                return Array.from(new Uint8Array(i)).map((t => t.toString(16).padStart(2, "0"))).join("")
                            }
                            return sha256 || (yield n.loadScript("https://cdn.jsdelivr.net/npm/js-sha256/src/sha256.min.js")),
                            sha256(t)
                        }
                    }
                    ))
                }
                static loadScript(t) {
                    return i(this, void 0, void 0, (function*() {
                        return new Promise(( (e, i) => {
                            const n = document.createElement("script");
                            n.src = t,
                            n.onload = e,
                            n.onerror = i,
                            document.head.appendChild(n)
                        }
                        ))
                    }
                    ))
                }
                static wait(t) {
                    return new Promise((e => {
                        setTimeout(e, t)
                    }
                    ))
                }
                static getEventTime() {
                    const t = new Date
                      , e = Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds());
                    return Math.floor(e / 1e3)
                }
                static getEventDayInMonth() {
                    return (new Date).getDate()
                }
                static getEventDay() {
                    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(new Date).getDay()]
                }
                static getEventMonth() {
                    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][(new Date).getMonth()]
                }
                static getEventTimeInterval() {
                    const t = (new Date).getHours();
                    return `${t}-${t + 1}`
                }
                static getCookieByNames(...t) {
                    for (const e of t) {
                        const t = e
                          , i = n.getCookieFromStorage(t);
                        if (i)
                            return i
                    }
                    for (const e of t) {
                        const t = e
                          , i = n.getCookieFromUrl(t);
                        if (i)
                            return i
                    }
                    return null
                }
                static getCookieFromStorage(t) {
                    const e = document.cookie.split(";");
                    for (const i of e) {
                        const [e,n] = i.trim().split("=");
                        if (e === t)
                            return n
                    }
                    return null
                }
                static getCookieFromUrl(...t) {
                    const e = new URLSearchParams(window.location.search);
                    for (const i of t)
                        if (e.has(i))
                            return e.get(i);
                    return null
                }
                static getId(t) {
                    if (t.id)
                        return t.id;
                    const e = n.uuid();
                    return t.id = e,
                    e
                }
                static uuid() {
                    const t = () => Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                    return `${t() + t()}-${t()}-${t()}-${t()}-${t() + t() + t()}`
                }
            }
            e.Utils = n
        },
        436: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var o, r = arguments.length, l = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                    l = Reflect.decorate(t, e, i, n);
                else
                    for (var a = t.length - 1; a >= 0; a--)
                        (o = t[a]) && (l = (r < 3 ? o(l) : r > 3 ? o(e, i, l) : o(e, i)) || l);
                return r > 3 && l && Object.defineProperty(e, i, l),
                l
            }
              , o = this && this.__metadata || function(t, e) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
                    return Reflect.metadata(t, e)
            }
              , r = this && this.__awaiter || function(t, e, i, n) {
                return new (i || (i = Promise))((function(o, r) {
                    function l(t) {
                        try {
                            s(n.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function a(t) {
                        try {
                            s(n.throw(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof i ? e : new i((function(t) {
                            t(e)
                        }
                        ))).then(l, a)
                    }
                    s((n = n.apply(t, e || [])).next())
                }
                ))
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.ViewContentListener = void 0;
            const l = i(370)
              , a = i(526)
              , s = i(923);
            class c {
                static init() {
                    c.trackByTime(),
                    c.trackByScroll()
                }
                static trackByTime() {
                    return r(this, void 0, void 0, (function*() {
                        yield s.Utils.wait(8e3),
                        a.Tracker.track("ViewContent")
                    }
                    ))
                }
                static trackByScroll() {
                    return r(this, void 0, void 0, (function*() {
                        window.addEventListener("scroll", ( () => r(this, void 0, void 0, (function*() {
                            console.log("scrolling", window.scrollY),
                            window.scrollY > 100 && a.Tracker.track("ViewContent")
                        }
                        ))))
                    }
                    ))
                }
            }
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", []), o("design:returntype", Promise)], c, "trackByTime", null),
            n([l.visibleForTesting, o("design:type", Function), o("design:paramtypes", []), o("design:returntype", Promise)], c, "trackByScroll", null),
            e.ViewContentListener = c
        },
        119: (t, e) => {
            var i;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.InputType = void 0,
            (i = e.InputType || (e.InputType = {})).Name = "Name",
            i.Email = "Email",
            i.Phone = "Phone",
            i.Unknown = "Unknown"
        }
        ,
        186: (t, e) => {
            var i;
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.IpConfigurationType = void 0,
            (i = e.IpConfigurationType || (e.IpConfigurationType = {})).IPV6_ONLY = "IPV6_ONLY",
            i.IPV6_OR_IPV4 = "IPV6_OR_IPV4",
            i.NO_IP = "NO_IP"
        }
        ,
        937: (t, e) => {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.Lead = void 0,
            e.Lead = class {
                constructor(t) {
                    this.pixelId = t.pixelId,
                    this._id = t._id,
                    this.email = t.email,
                    this.firstName = t.firstName,
                    this.lastName = t.lastName,
                    this.phone = t.phone,
                    this.birthdate = t.birthdate,
                    this.metaPixelIds = t.metaPixelIds,
                    this.geolocation = t.geolocation,
                    this.userAgent = t.userAgent,
                    this.ip = t.ip,
                    this.ipv6 = t.ipv6,
                    this.fbc = t.fbc,
                    this.fbp = t.fbp,
                    this.gclid = t.gclid,
                    this.kclid = t.kclid,
                    this.parameters = t.parameters,
                    this.updatedAt = t.updatedAt,
                    this.icTextMatch = t.icTextMatch,
                    this.icCSSMatch = t.icCSSMatch,
                    this.icURLMatch = t.icURLMatch,
                    this.leadTextMatch = t.leadTextMatch,
                    this.addToCartTextMatch = t.addToCartTextMatch,
                    this.ipConfiguration = t.ipConfiguration
                }
            }
        }
    }
      , e = {};
    function i(n) {
        var o = e[n];
        if (void 0 !== o)
            return o.exports;
        var r = e[n] = {
            exports: {}
        };
        return t[n].call(r.exports, r, r.exports, i),
        r.exports
    }
    ( () => {
        const t = i(526);
        console.log("Tracker Meta version 1.6.1"),
        t.Tracker.init("Meta")
    }
    )()
}
)();
