(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver((s) => {
        for (const o of s)
            if (o.type === "childList")
                for (const i of o.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(s) {
        const o = {};
        return (
            s.integrity && (o.integrity = s.integrity),
            s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
            s.crossOrigin === "use-credentials"
                ? (o.credentials = "include")
                : s.crossOrigin === "anonymous"
                ? (o.credentials = "omit")
                : (o.credentials = "same-origin"),
            o
        );
    }
    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o);
    }
})();
function or(e, t) {
    const n = Object.create(null),
        r = e.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function ir(e) {
    if (x(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                s = X(r) ? wi(r) : ir(r);
            if (s) for (const o in s) t[o] = s[o];
        }
        return t;
    } else {
        if (X(e)) return e;
        if (z(e)) return e;
    }
}
const bi = /;(?![^(]*\))/g,
    _i = /:([^]+)/,
    yi = /\/\*.*?\*\//gs;
function wi(e) {
    const t = {};
    return (
        e
            .replace(yi, "")
            .split(bi)
            .forEach((n) => {
                if (n) {
                    const r = n.split(_i);
                    r.length > 1 && (t[r[0].trim()] = r[1].trim());
                }
            }),
        t
    );
}
function ar(e) {
    let t = "";
    if (X(e)) t = e;
    else if (x(e))
        for (let n = 0; n < e.length; n++) {
            const r = ar(e[n]);
            r && (t += r + " ");
        }
    else if (z(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const Ei = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Ii = or(Ei);
function Rs(e) {
    return !!e || e === "";
}
const Vr = (e) =>
        X(e)
            ? e
            : e == null
            ? ""
            : x(e) || (z(e) && (e.toString === $s || !M(e.toString)))
            ? JSON.stringify(e, ks, 2)
            : String(e),
    ks = (e, t) =>
        t && t.__v_isRef
            ? ks(e, t.value)
            : pt(t)
            ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                      (n, [r, s]) => ((n[`${r} =>`] = s), n),
                      {}
                  ),
              }
            : Bs(t)
            ? { [`Set(${t.size})`]: [...t.values()] }
            : z(t) && !x(t) && !Ls(t)
            ? String(t)
            : t,
    U = {},
    ht = [],
    ye = () => {},
    vi = () => !1,
    Ci = /^on[^a-z]/,
    tn = (e) => Ci.test(e),
    cr = (e) => e.startsWith("onUpdate:"),
    re = Object.assign,
    lr = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    Ti = Object.prototype.hasOwnProperty,
    R = (e, t) => Ti.call(e, t),
    x = Array.isArray,
    pt = (e) => nn(e) === "[object Map]",
    Bs = (e) => nn(e) === "[object Set]",
    M = (e) => typeof e == "function",
    X = (e) => typeof e == "string",
    fr = (e) => typeof e == "symbol",
    z = (e) => e !== null && typeof e == "object",
    Fs = (e) => z(e) && M(e.then) && M(e.catch),
    $s = Object.prototype.toString,
    nn = (e) => $s.call(e),
    Ai = (e) => nn(e).slice(8, -1),
    Ls = (e) => nn(e) === "[object Object]",
    ur = (e) => X(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Wt = or(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    rn = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    Si = /-(\w)/g,
    bt = rn((e) => e.replace(Si, (t, n) => (n ? n.toUpperCase() : ""))),
    Oi = /\B([A-Z])/g,
    wt = rn((e) => e.replace(Oi, "-$1").toLowerCase()),
    js = rn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    wn = rn((e) => (e ? `on${js(e)}` : "")),
    xt = (e, t) => !Object.is(e, t),
    En = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    Yt = (e, t, n) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
    },
    xi = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let Wr;
const Di = () =>
    Wr ||
    (Wr =
        typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
            ? self
            : typeof window < "u"
            ? window
            : typeof global < "u"
            ? global
            : {});
let ge;
class Mi {
    constructor(t = !1) {
        (this.detached = t),
            (this._active = !0),
            (this.effects = []),
            (this.cleanups = []),
            (this.parent = ge),
            !t && ge && (this.index = (ge.scopes || (ge.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    run(t) {
        if (this._active) {
            const n = ge;
            try {
                return (ge = this), t();
            } finally {
                ge = n;
            }
        }
    }
    on() {
        ge = this;
    }
    off() {
        ge = this.parent;
    }
    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes)
                for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index));
            }
            (this.parent = void 0), (this._active = !1);
        }
    }
}
function Ni(e, t = ge) {
    t && t.active && t.effects.push(e);
}
function Pi() {
    return ge;
}
const dr = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    Hs = (e) => (e.w & Ue) > 0,
    Us = (e) => (e.n & Ue) > 0,
    Ri = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ue;
    },
    ki = (e) => {
        const { deps: t } = e;
        if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
                const s = t[r];
                Hs(s) && !Us(s) ? s.delete(e) : (t[n++] = s), (s.w &= ~Ue), (s.n &= ~Ue);
            }
            t.length = n;
        }
    },
    Ln = new WeakMap();
let At = 0,
    Ue = 1;
const jn = 30;
let me;
const tt = Symbol(""),
    Hn = Symbol("");
class hr {
    constructor(t, n = null, r) {
        (this.fn = t),
            (this.scheduler = n),
            (this.active = !0),
            (this.deps = []),
            (this.parent = void 0),
            Ni(this, r);
    }
    run() {
        if (!this.active) return this.fn();
        let t = me,
            n = Fe;
        for (; t; ) {
            if (t === this) return;
            t = t.parent;
        }
        try {
            return (
                (this.parent = me),
                (me = this),
                (Fe = !0),
                (Ue = 1 << ++At),
                At <= jn ? Ri(this) : zr(this),
                this.fn()
            );
        } finally {
            At <= jn && ki(this),
                (Ue = 1 << --At),
                (me = this.parent),
                (Fe = n),
                (this.parent = void 0),
                this.deferStop && this.stop();
        }
    }
    stop() {
        me === this
            ? (this.deferStop = !0)
            : this.active && (zr(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function zr(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let Fe = !0;
const Ks = [];
function Et() {
    Ks.push(Fe), (Fe = !1);
}
function It() {
    const e = Ks.pop();
    Fe = e === void 0 ? !0 : e;
}
function ae(e, t, n) {
    if (Fe && me) {
        let r = Ln.get(e);
        r || Ln.set(e, (r = new Map()));
        let s = r.get(n);
        s || r.set(n, (s = dr())), Vs(s);
    }
}
function Vs(e, t) {
    let n = !1;
    At <= jn ? Us(e) || ((e.n |= Ue), (n = !Hs(e))) : (n = !e.has(me)),
        n && (e.add(me), me.deps.push(e));
}
function Ne(e, t, n, r, s, o) {
    const i = Ln.get(e);
    if (!i) return;
    let a = [];
    if (t === "clear") a = [...i.values()];
    else if (n === "length" && x(e)) {
        const l = Number(r);
        i.forEach((u, d) => {
            (d === "length" || d >= l) && a.push(u);
        });
    } else
        switch ((n !== void 0 && a.push(i.get(n)), t)) {
            case "add":
                x(e)
                    ? ur(n) && a.push(i.get("length"))
                    : (a.push(i.get(tt)), pt(e) && a.push(i.get(Hn)));
                break;
            case "delete":
                x(e) || (a.push(i.get(tt)), pt(e) && a.push(i.get(Hn)));
                break;
            case "set":
                pt(e) && a.push(i.get(tt));
                break;
        }
    if (a.length === 1) a[0] && Un(a[0]);
    else {
        const l = [];
        for (const u of a) u && l.push(...u);
        Un(dr(l));
    }
}
function Un(e, t) {
    const n = x(e) ? e : [...e];
    for (const r of n) r.computed && qr(r);
    for (const r of n) r.computed || qr(r);
}
function qr(e, t) {
    (e !== me || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Bi = or("__proto__,__v_isRef,__isVue"),
    Ws = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter(fr)
    ),
    Fi = pr(),
    $i = pr(!1, !0),
    Li = pr(!0),
    Jr = ji();
function ji() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...n) {
                const r = k(this);
                for (let o = 0, i = this.length; o < i; o++) ae(r, "get", o + "");
                const s = r[t](...n);
                return s === -1 || s === !1 ? r[t](...n.map(k)) : s;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...n) {
                Et();
                const r = k(this)[t].apply(this, n);
                return It(), r;
            };
        }),
        e
    );
}
function Hi(e) {
    const t = k(this);
    return ae(t, "has", e), t.hasOwnProperty(e);
}
function pr(e = !1, t = !1) {
    return function (r, s, o) {
        if (s === "__v_isReactive") return !e;
        if (s === "__v_isReadonly") return e;
        if (s === "__v_isShallow") return t;
        if (s === "__v_raw" && o === (e ? (t ? ra : Gs) : t ? Ys : Js).get(r)) return r;
        const i = x(r);
        if (!e) {
            if (i && R(Jr, s)) return Reflect.get(Jr, s, o);
            if (s === "hasOwnProperty") return Hi;
        }
        const a = Reflect.get(r, s, o);
        return (fr(s) ? Ws.has(s) : Bi(s)) || (e || ae(r, "get", s), t)
            ? a
            : te(a)
            ? i && ur(s)
                ? a
                : a.value
            : z(a)
            ? e
                ? Xs(a)
                : br(a)
            : a;
    };
}
const Ui = zs(),
    Ki = zs(!0);
function zs(e = !1) {
    return function (n, r, s, o) {
        let i = n[r];
        if (_t(i) && te(i) && !te(s)) return !1;
        if (!e && (!Gt(s) && !_t(s) && ((i = k(i)), (s = k(s))), !x(n) && te(i) && !te(s)))
            return (i.value = s), !0;
        const a = x(n) && ur(r) ? Number(r) < n.length : R(n, r),
            l = Reflect.set(n, r, s, o);
        return n === k(o) && (a ? xt(s, i) && Ne(n, "set", r, s) : Ne(n, "add", r, s)), l;
    };
}
function Vi(e, t) {
    const n = R(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && Ne(e, "delete", t, void 0), r;
}
function Wi(e, t) {
    const n = Reflect.has(e, t);
    return (!fr(t) || !Ws.has(t)) && ae(e, "has", t), n;
}
function zi(e) {
    return ae(e, "iterate", x(e) ? "length" : tt), Reflect.ownKeys(e);
}
const qs = { get: Fi, set: Ui, deleteProperty: Vi, has: Wi, ownKeys: zi },
    qi = {
        get: Li,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        },
    },
    Ji = re({}, qs, { get: $i, set: Ki }),
    gr = (e) => e,
    sn = (e) => Reflect.getPrototypeOf(e);
function Lt(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = k(e),
        o = k(t);
    n || (t !== o && ae(s, "get", t), ae(s, "get", o));
    const { has: i } = sn(s),
        a = r ? gr : n ? yr : Dt;
    if (i.call(s, t)) return a(e.get(t));
    if (i.call(s, o)) return a(e.get(o));
    e !== s && e.get(t);
}
function jt(e, t = !1) {
    const n = this.__v_raw,
        r = k(n),
        s = k(e);
    return (
        t || (e !== s && ae(r, "has", e), ae(r, "has", s)),
        e === s ? n.has(e) : n.has(e) || n.has(s)
    );
}
function Ht(e, t = !1) {
    return (e = e.__v_raw), !t && ae(k(e), "iterate", tt), Reflect.get(e, "size", e);
}
function Yr(e) {
    e = k(e);
    const t = k(this);
    return sn(t).has.call(t, e) || (t.add(e), Ne(t, "add", e, e)), this;
}
function Gr(e, t) {
    t = k(t);
    const n = k(this),
        { has: r, get: s } = sn(n);
    let o = r.call(n, e);
    o || ((e = k(e)), (o = r.call(n, e)));
    const i = s.call(n, e);
    return n.set(e, t), o ? xt(t, i) && Ne(n, "set", e, t) : Ne(n, "add", e, t), this;
}
function Xr(e) {
    const t = k(this),
        { has: n, get: r } = sn(t);
    let s = n.call(t, e);
    s || ((e = k(e)), (s = n.call(t, e))), r && r.call(t, e);
    const o = t.delete(e);
    return s && Ne(t, "delete", e, void 0), o;
}
function Zr() {
    const e = k(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Ne(e, "clear", void 0, void 0), n;
}
function Ut(e, t) {
    return function (r, s) {
        const o = this,
            i = o.__v_raw,
            a = k(i),
            l = t ? gr : e ? yr : Dt;
        return !e && ae(a, "iterate", tt), i.forEach((u, d) => r.call(s, l(u), l(d), o));
    };
}
function Kt(e, t, n) {
    return function (...r) {
        const s = this.__v_raw,
            o = k(s),
            i = pt(o),
            a = e === "entries" || (e === Symbol.iterator && i),
            l = e === "keys" && i,
            u = s[e](...r),
            d = n ? gr : t ? yr : Dt;
        return (
            !t && ae(o, "iterate", l ? Hn : tt),
            {
                next() {
                    const { value: y, done: E } = u.next();
                    return E
                        ? { value: y, done: E }
                        : { value: a ? [d(y[0]), d(y[1])] : d(y), done: E };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function ke(e) {
    return function (...t) {
        return e === "delete" ? !1 : this;
    };
}
function Yi() {
    const e = {
            get(o) {
                return Lt(this, o);
            },
            get size() {
                return Ht(this);
            },
            has: jt,
            add: Yr,
            set: Gr,
            delete: Xr,
            clear: Zr,
            forEach: Ut(!1, !1),
        },
        t = {
            get(o) {
                return Lt(this, o, !1, !0);
            },
            get size() {
                return Ht(this);
            },
            has: jt,
            add: Yr,
            set: Gr,
            delete: Xr,
            clear: Zr,
            forEach: Ut(!1, !0),
        },
        n = {
            get(o) {
                return Lt(this, o, !0);
            },
            get size() {
                return Ht(this, !0);
            },
            has(o) {
                return jt.call(this, o, !0);
            },
            add: ke("add"),
            set: ke("set"),
            delete: ke("delete"),
            clear: ke("clear"),
            forEach: Ut(!0, !1),
        },
        r = {
            get(o) {
                return Lt(this, o, !0, !0);
            },
            get size() {
                return Ht(this, !0);
            },
            has(o) {
                return jt.call(this, o, !0);
            },
            add: ke("add"),
            set: ke("set"),
            delete: ke("delete"),
            clear: ke("clear"),
            forEach: Ut(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
            (e[o] = Kt(o, !1, !1)),
                (n[o] = Kt(o, !0, !1)),
                (t[o] = Kt(o, !1, !0)),
                (r[o] = Kt(o, !0, !0));
        }),
        [e, n, t, r]
    );
}
const [Gi, Xi, Zi, Qi] = Yi();
function mr(e, t) {
    const n = t ? (e ? Qi : Zi) : e ? Xi : Gi;
    return (r, s, o) =>
        s === "__v_isReactive"
            ? !e
            : s === "__v_isReadonly"
            ? e
            : s === "__v_raw"
            ? r
            : Reflect.get(R(n, s) && s in r ? n : r, s, o);
}
const ea = { get: mr(!1, !1) },
    ta = { get: mr(!1, !0) },
    na = { get: mr(!0, !1) },
    Js = new WeakMap(),
    Ys = new WeakMap(),
    Gs = new WeakMap(),
    ra = new WeakMap();
function sa(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function oa(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : sa(Ai(e));
}
function br(e) {
    return _t(e) ? e : _r(e, !1, qs, ea, Js);
}
function ia(e) {
    return _r(e, !1, Ji, ta, Ys);
}
function Xs(e) {
    return _r(e, !0, qi, na, Gs);
}
function _r(e, t, n, r, s) {
    if (!z(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const o = s.get(e);
    if (o) return o;
    const i = oa(e);
    if (i === 0) return e;
    const a = new Proxy(e, i === 2 ? r : n);
    return s.set(e, a), a;
}
function gt(e) {
    return _t(e) ? gt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function _t(e) {
    return !!(e && e.__v_isReadonly);
}
function Gt(e) {
    return !!(e && e.__v_isShallow);
}
function Zs(e) {
    return gt(e) || _t(e);
}
function k(e) {
    const t = e && e.__v_raw;
    return t ? k(t) : e;
}
function Qs(e) {
    return Yt(e, "__v_skip", !0), e;
}
const Dt = (e) => (z(e) ? br(e) : e),
    yr = (e) => (z(e) ? Xs(e) : e);
function eo(e) {
    Fe && me && ((e = k(e)), Vs(e.dep || (e.dep = dr())));
}
function to(e, t) {
    e = k(e);
    const n = e.dep;
    n && Un(n);
}
function te(e) {
    return !!(e && e.__v_isRef === !0);
}
function aa(e) {
    return ca(e, !1);
}
function ca(e, t) {
    return te(e) ? e : new la(e, t);
}
class la {
    constructor(t, n) {
        (this.__v_isShallow = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = n ? t : k(t)),
            (this._value = n ? t : Dt(t));
    }
    get value() {
        return eo(this), this._value;
    }
    set value(t) {
        const n = this.__v_isShallow || Gt(t) || _t(t);
        (t = n ? t : k(t)),
            xt(t, this._rawValue) &&
                ((this._rawValue = t), (this._value = n ? t : Dt(t)), to(this));
    }
}
function fa(e) {
    return te(e) ? e.value : e;
}
const ua = {
    get: (e, t, n) => fa(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const s = e[t];
        return te(s) && !te(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
    },
};
function no(e) {
    return gt(e) ? e : new Proxy(e, ua);
}
var ro;
class da {
    constructor(t, n, r, s) {
        (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this[ro] = !1),
            (this._dirty = !0),
            (this.effect = new hr(t, () => {
                this._dirty || ((this._dirty = !0), to(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !s),
            (this.__v_isReadonly = r);
    }
    get value() {
        const t = k(this);
        return (
            eo(t),
            (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())),
            t._value
        );
    }
    set value(t) {
        this._setter(t);
    }
}
ro = "__v_isReadonly";
function ha(e, t, n = !1) {
    let r, s;
    const o = M(e);
    return o ? ((r = e), (s = ye)) : ((r = e.get), (s = e.set)), new da(r, s, o || !s, n);
}
function $e(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e();
    } catch (o) {
        on(o, t, n);
    }
    return s;
}
function he(e, t, n, r) {
    if (M(e)) {
        const o = $e(e, t, n, r);
        return (
            o &&
                Fs(o) &&
                o.catch((i) => {
                    on(i, t, n);
                }),
            o
        );
    }
    const s = [];
    for (let o = 0; o < e.length; o++) s.push(he(e[o], t, n, r));
    return s;
}
function on(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy,
            a = n;
        for (; o; ) {
            const u = o.ec;
            if (u) {
                for (let d = 0; d < u.length; d++) if (u[d](e, i, a) === !1) return;
            }
            o = o.parent;
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            $e(l, null, 10, [e, i, a]);
            return;
        }
    }
    pa(e, n, s, r);
}
function pa(e, t, n, r = !0) {
    console.error(e);
}
let Mt = !1,
    Kn = !1;
const ee = [];
let Te = 0;
const mt = [];
let Oe = null,
    Xe = 0;
const so = Promise.resolve();
let wr = null;
function ga(e) {
    const t = wr || so;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function ma(e) {
    let t = Te + 1,
        n = ee.length;
    for (; t < n; ) {
        const r = (t + n) >>> 1;
        Nt(ee[r]) < e ? (t = r + 1) : (n = r);
    }
    return t;
}
function Er(e) {
    (!ee.length || !ee.includes(e, Mt && e.allowRecurse ? Te + 1 : Te)) &&
        (e.id == null ? ee.push(e) : ee.splice(ma(e.id), 0, e), oo());
}
function oo() {
    !Mt && !Kn && ((Kn = !0), (wr = so.then(ao)));
}
function ba(e) {
    const t = ee.indexOf(e);
    t > Te && ee.splice(t, 1);
}
function _a(e) {
    x(e) ? mt.push(...e) : (!Oe || !Oe.includes(e, e.allowRecurse ? Xe + 1 : Xe)) && mt.push(e),
        oo();
}
function Qr(e, t = Mt ? Te + 1 : 0) {
    for (; t < ee.length; t++) {
        const n = ee[t];
        n && n.pre && (ee.splice(t, 1), t--, n());
    }
}
function io(e) {
    if (mt.length) {
        const t = [...new Set(mt)];
        if (((mt.length = 0), Oe)) {
            Oe.push(...t);
            return;
        }
        for (Oe = t, Oe.sort((n, r) => Nt(n) - Nt(r)), Xe = 0; Xe < Oe.length; Xe++) Oe[Xe]();
        (Oe = null), (Xe = 0);
    }
}
const Nt = (e) => (e.id == null ? 1 / 0 : e.id),
    ya = (e, t) => {
        const n = Nt(e) - Nt(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1;
        }
        return n;
    };
function ao(e) {
    (Kn = !1), (Mt = !0), ee.sort(ya);
    const t = ye;
    try {
        for (Te = 0; Te < ee.length; Te++) {
            const n = ee[Te];
            n && n.active !== !1 && $e(n, null, 14);
        }
    } finally {
        (Te = 0), (ee.length = 0), io(), (Mt = !1), (wr = null), (ee.length || mt.length) && ao();
    }
}
function wa(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || U;
    let s = n;
    const o = t.startsWith("update:"),
        i = o && t.slice(7);
    if (i && i in r) {
        const d = `${i === "modelValue" ? "model" : i}Modifiers`,
            { number: y, trim: E } = r[d] || U;
        E && (s = n.map((A) => (X(A) ? A.trim() : A))), y && (s = n.map(xi));
    }
    let a,
        l = r[(a = wn(t))] || r[(a = wn(bt(t)))];
    !l && o && (l = r[(a = wn(wt(t)))]), l && he(l, e, 6, s);
    const u = r[a + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[a]) return;
        (e.emitted[a] = !0), he(u, e, 6, s);
    }
}
function co(e, t, n = !1) {
    const r = t.emitsCache,
        s = r.get(e);
    if (s !== void 0) return s;
    const o = e.emits;
    let i = {},
        a = !1;
    if (!M(e)) {
        const l = (u) => {
            const d = co(u, t, !0);
            d && ((a = !0), re(i, d));
        };
        !n && t.mixins.length && t.mixins.forEach(l),
            e.extends && l(e.extends),
            e.mixins && e.mixins.forEach(l);
    }
    return !o && !a
        ? (z(e) && r.set(e, null), null)
        : (x(o) ? o.forEach((l) => (i[l] = null)) : re(i, o), z(e) && r.set(e, i), i);
}
function an(e, t) {
    return !e || !tn(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, "")),
          R(e, t[0].toLowerCase() + t.slice(1)) || R(e, wt(t)) || R(e, t));
}
let be = null,
    cn = null;
function Xt(e) {
    const t = be;
    return (be = e), (cn = (e && e.type.__scopeId) || null), t;
}
function lo(e) {
    cn = e;
}
function fo() {
    cn = null;
}
function Ea(e, t = be, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && cs(-1);
        const o = Xt(t);
        let i;
        try {
            i = e(...s);
        } finally {
            Xt(o), r._d && cs(1);
        }
        return i;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function In(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: o,
        propsOptions: [i],
        slots: a,
        attrs: l,
        emit: u,
        render: d,
        renderCache: y,
        data: E,
        setupState: A,
        ctx: B,
        inheritAttrs: S,
    } = e;
    let q, $;
    const fe = Xt(e);
    try {
        if (n.shapeFlag & 4) {
            const K = s || r;
            (q = Ce(d.call(K, K, y, o, A, E, B))), ($ = l);
        } else {
            const K = t;
            (q = Ce(K.length > 1 ? K(o, { attrs: l, slots: a, emit: u }) : K(o, null))),
                ($ = t.props ? l : Ia(l));
        }
    } catch (K) {
        (Ot.length = 0), on(K, e, 1), (q = Le(De));
    }
    let D = q;
    if ($ && S !== !1) {
        const K = Object.keys($),
            { shapeFlag: Q } = D;
        K.length && Q & 7 && (i && K.some(cr) && ($ = va($, i)), (D = Ke(D, $)));
    }
    return (
        n.dirs && ((D = Ke(D)), (D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs)),
        n.transition && (D.transition = n.transition),
        (q = D),
        Xt(fe),
        q
    );
}
const Ia = (e) => {
        let t;
        for (const n in e) (n === "class" || n === "style" || tn(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    va = (e, t) => {
        const n = {};
        for (const r in e) (!cr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n;
    };
function Ca(e, t, n) {
    const { props: r, children: s, component: o } = e,
        { props: i, children: a, patchFlag: l } = t,
        u = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return r ? es(r, i, u) : !!i;
        if (l & 8) {
            const d = t.dynamicProps;
            for (let y = 0; y < d.length; y++) {
                const E = d[y];
                if (i[E] !== r[E] && !an(u, E)) return !0;
            }
        }
    } else
        return (s || a) && (!a || !a.$stable)
            ? !0
            : r === i
            ? !1
            : r
            ? i
                ? es(r, i, u)
                : !0
            : !!i;
    return !1;
}
function es(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !an(n, o)) return !0;
    }
    return !1;
}
function Ta({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Aa = (e) => e.__isSuspense;
function Sa(e, t) {
    t && t.pendingBranch ? (x(e) ? t.effects.push(...e) : t.effects.push(e)) : _a(e);
}
function Oa(e, t) {
    if (Y) {
        let n = Y.provides;
        const r = Y.parent && Y.parent.provides;
        r === n && (n = Y.provides = Object.create(r)), (n[e] = t);
    }
}
function zt(e, t, n = !1) {
    const r = Y || be;
    if (r) {
        const s =
            r.parent == null
                ? r.vnode.appContext && r.vnode.appContext.provides
                : r.parent.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && M(t) ? t.call(r.proxy) : t;
    }
}
const Vt = {};
function vn(e, t, n) {
    return uo(e, t, n);
}
function uo(e, t, { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = U) {
    const a = Pi() === (Y == null ? void 0 : Y.scope) ? Y : null;
    let l,
        u = !1,
        d = !1;
    if (
        (te(e)
            ? ((l = () => e.value), (u = Gt(e)))
            : gt(e)
            ? ((l = () => e), (r = !0))
            : x(e)
            ? ((d = !0),
              (u = e.some((D) => gt(D) || Gt(D))),
              (l = () =>
                  e.map((D) => {
                      if (te(D)) return D.value;
                      if (gt(D)) return dt(D);
                      if (M(D)) return $e(D, a, 2);
                  })))
            : M(e)
            ? t
                ? (l = () => $e(e, a, 2))
                : (l = () => {
                      if (!(a && a.isUnmounted)) return y && y(), he(e, a, 3, [E]);
                  })
            : (l = ye),
        t && r)
    ) {
        const D = l;
        l = () => dt(D());
    }
    let y,
        E = (D) => {
            y = $.onStop = () => {
                $e(D, a, 4);
            };
        },
        A;
    if (Rt)
        if (((E = ye), t ? n && he(t, a, 3, [l(), d ? [] : void 0, E]) : l(), s === "sync")) {
            const D = Cc();
            A = D.__watcherHandles || (D.__watcherHandles = []);
        } else return ye;
    let B = d ? new Array(e.length).fill(Vt) : Vt;
    const S = () => {
        if ($.active)
            if (t) {
                const D = $.run();
                (r || u || (d ? D.some((K, Q) => xt(K, B[Q])) : xt(D, B))) &&
                    (y && y(),
                    he(t, a, 3, [D, B === Vt ? void 0 : d && B[0] === Vt ? [] : B, E]),
                    (B = D));
            } else $.run();
    };
    S.allowRecurse = !!t;
    let q;
    s === "sync"
        ? (q = S)
        : s === "post"
        ? (q = () => ie(S, a && a.suspense))
        : ((S.pre = !0), a && (S.id = a.uid), (q = () => Er(S)));
    const $ = new hr(l, q);
    t ? (n ? S() : (B = $.run())) : s === "post" ? ie($.run.bind($), a && a.suspense) : $.run();
    const fe = () => {
        $.stop(), a && a.scope && lr(a.scope.effects, $);
    };
    return A && A.push(fe), fe;
}
function xa(e, t, n) {
    const r = this.proxy,
        s = X(e) ? (e.includes(".") ? ho(r, e) : () => r[e]) : e.bind(r, r);
    let o;
    M(t) ? (o = t) : ((o = t.handler), (n = t));
    const i = Y;
    yt(this);
    const a = uo(s, o.bind(r), n);
    return i ? yt(i) : nt(), a;
}
function ho(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r;
    };
}
function dt(e, t) {
    if (!z(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), te(e))) dt(e.value, t);
    else if (x(e)) for (let n = 0; n < e.length; n++) dt(e[n], t);
    else if (Bs(e) || pt(e))
        e.forEach((n) => {
            dt(n, t);
        });
    else if (Ls(e)) for (const n in e) dt(e[n], t);
    return e;
}
function Da() {
    const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
    return (
        bo(() => {
            e.isMounted = !0;
        }),
        _o(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const ue = [Function, Array],
    Ma = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: ue,
            onEnter: ue,
            onAfterEnter: ue,
            onEnterCancelled: ue,
            onBeforeLeave: ue,
            onLeave: ue,
            onAfterLeave: ue,
            onLeaveCancelled: ue,
            onBeforeAppear: ue,
            onAppear: ue,
            onAfterAppear: ue,
            onAppearCancelled: ue,
        },
        setup(e, { slots: t }) {
            const n = mc(),
                r = Da();
            let s;
            return () => {
                const o = t.default && go(t.default(), !0);
                if (!o || !o.length) return;
                let i = o[0];
                if (o.length > 1) {
                    for (const S of o)
                        if (S.type !== De) {
                            i = S;
                            break;
                        }
                }
                const a = k(e),
                    { mode: l } = a;
                if (r.isLeaving) return Cn(i);
                const u = ts(i);
                if (!u) return Cn(i);
                const d = Vn(u, a, r, n);
                Wn(u, d);
                const y = n.subTree,
                    E = y && ts(y);
                let A = !1;
                const { getTransitionKey: B } = u.type;
                if (B) {
                    const S = B();
                    s === void 0 ? (s = S) : S !== s && ((s = S), (A = !0));
                }
                if (E && E.type !== De && (!Ze(u, E) || A)) {
                    const S = Vn(E, a, r, n);
                    if ((Wn(E, S), l === "out-in"))
                        return (
                            (r.isLeaving = !0),
                            (S.afterLeave = () => {
                                (r.isLeaving = !1), n.update.active !== !1 && n.update();
                            }),
                            Cn(i)
                        );
                    l === "in-out" &&
                        u.type !== De &&
                        (S.delayLeave = (q, $, fe) => {
                            const D = po(r, E);
                            (D[String(E.key)] = E),
                                (q._leaveCb = () => {
                                    $(), (q._leaveCb = void 0), delete d.delayedLeave;
                                }),
                                (d.delayedLeave = fe);
                        });
                }
                return i;
            };
        },
    },
    Na = Ma;
function po(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Vn(e, t, n, r) {
    const {
            appear: s,
            mode: o,
            persisted: i = !1,
            onBeforeEnter: a,
            onEnter: l,
            onAfterEnter: u,
            onEnterCancelled: d,
            onBeforeLeave: y,
            onLeave: E,
            onAfterLeave: A,
            onLeaveCancelled: B,
            onBeforeAppear: S,
            onAppear: q,
            onAfterAppear: $,
            onAppearCancelled: fe,
        } = t,
        D = String(e.key),
        K = po(n, e),
        Q = (N, G) => {
            N && he(N, r, 9, G);
        },
        lt = (N, G) => {
            const V = G[1];
            Q(N, G), x(N) ? N.every((ce) => ce.length <= 1) && V() : N.length <= 1 && V();
        },
        Re = {
            mode: o,
            persisted: i,
            beforeEnter(N) {
                let G = a;
                if (!n.isMounted)
                    if (s) G = S || a;
                    else return;
                N._leaveCb && N._leaveCb(!0);
                const V = K[D];
                V && Ze(e, V) && V.el._leaveCb && V.el._leaveCb(), Q(G, [N]);
            },
            enter(N) {
                let G = l,
                    V = u,
                    ce = d;
                if (!n.isMounted)
                    if (s) (G = q || l), (V = $ || u), (ce = fe || d);
                    else return;
                let we = !1;
                const Ae = (N._enterCb = (Ct) => {
                    we ||
                        ((we = !0),
                        Ct ? Q(ce, [N]) : Q(V, [N]),
                        Re.delayedLeave && Re.delayedLeave(),
                        (N._enterCb = void 0));
                });
                G ? lt(G, [N, Ae]) : Ae();
            },
            leave(N, G) {
                const V = String(e.key);
                if ((N._enterCb && N._enterCb(!0), n.isUnmounting)) return G();
                Q(y, [N]);
                let ce = !1;
                const we = (N._leaveCb = (Ae) => {
                    ce ||
                        ((ce = !0),
                        G(),
                        Ae ? Q(B, [N]) : Q(A, [N]),
                        (N._leaveCb = void 0),
                        K[V] === e && delete K[V]);
                });
                (K[V] = e), E ? lt(E, [N, we]) : we();
            },
            clone(N) {
                return Vn(N, t, n, r);
            },
        };
    return Re;
}
function Cn(e) {
    if (ln(e)) return (e = Ke(e)), (e.children = null), e;
}
function ts(e) {
    return ln(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Wn(e, t) {
    e.shapeFlag & 6 && e.component
        ? Wn(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function go(e, t = !1, n) {
    let r = [],
        s = 0;
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        const a = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
        i.type === de
            ? (i.patchFlag & 128 && s++, (r = r.concat(go(i.children, t, a))))
            : (t || i.type !== De) && r.push(a != null ? Ke(i, { key: a }) : i);
    }
    if (s > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
    return r;
}
const qt = (e) => !!e.type.__asyncLoader,
    ln = (e) => e.type.__isKeepAlive;
function Pa(e, t) {
    mo(e, "a", t);
}
function Ra(e, t) {
    mo(e, "da", t);
}
function mo(e, t, n = Y) {
    const r =
        e.__wdc ||
        (e.__wdc = () => {
            let s = n;
            for (; s; ) {
                if (s.isDeactivated) return;
                s = s.parent;
            }
            return e();
        });
    if ((fn(t, r, n), n)) {
        let s = n.parent;
        for (; s && s.parent; ) ln(s.parent.vnode) && ka(r, t, n, s), (s = s.parent);
    }
}
function ka(e, t, n, r) {
    const s = fn(t, e, r, !0);
    yo(() => {
        lr(r[t], s);
    }, n);
}
function fn(e, t, n = Y, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            o =
                t.__weh ||
                (t.__weh = (...i) => {
                    if (n.isUnmounted) return;
                    Et(), yt(n);
                    const a = he(t, n, e, i);
                    return nt(), It(), a;
                });
        return r ? s.unshift(o) : s.push(o), o;
    }
}
const Pe =
        (e) =>
        (t, n = Y) =>
            (!Rt || e === "sp") && fn(e, (...r) => t(...r), n),
    Ba = Pe("bm"),
    bo = Pe("m"),
    Fa = Pe("bu"),
    $a = Pe("u"),
    _o = Pe("bum"),
    yo = Pe("um"),
    La = Pe("sp"),
    ja = Pe("rtg"),
    Ha = Pe("rtc");
function Ua(e, t = Y) {
    fn("ec", e, t);
}
function qe(e, t, n, r) {
    const s = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const a = s[i];
        o && (a.oldValue = o[i].value);
        let l = a.dir[r];
        l && (Et(), he(l, n, 8, [e.el, a, e, t]), It());
    }
}
const Ka = Symbol(),
    zn = (e) => (e ? (Mo(e) ? Tr(e) || e.proxy : zn(e.parent)) : null),
    St = re(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => zn(e.parent),
        $root: (e) => zn(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Ir(e),
        $forceUpdate: (e) => e.f || (e.f = () => Er(e.update)),
        $nextTick: (e) => e.n || (e.n = ga.bind(e.proxy)),
        $watch: (e) => xa.bind(e),
    }),
    Tn = (e, t) => e !== U && !e.__isScriptSetup && R(e, t),
    Va = {
        get({ _: e }, t) {
            const {
                ctx: n,
                setupState: r,
                data: s,
                props: o,
                accessCache: i,
                type: a,
                appContext: l,
            } = e;
            let u;
            if (t[0] !== "$") {
                const A = i[t];
                if (A !== void 0)
                    switch (A) {
                        case 1:
                            return r[t];
                        case 2:
                            return s[t];
                        case 4:
                            return n[t];
                        case 3:
                            return o[t];
                    }
                else {
                    if (Tn(r, t)) return (i[t] = 1), r[t];
                    if (s !== U && R(s, t)) return (i[t] = 2), s[t];
                    if ((u = e.propsOptions[0]) && R(u, t)) return (i[t] = 3), o[t];
                    if (n !== U && R(n, t)) return (i[t] = 4), n[t];
                    qn && (i[t] = 0);
                }
            }
            const d = St[t];
            let y, E;
            if (d) return t === "$attrs" && ae(e, "get", t), d(e);
            if ((y = a.__cssModules) && (y = y[t])) return y;
            if (n !== U && R(n, t)) return (i[t] = 4), n[t];
            if (((E = l.config.globalProperties), R(E, t))) return E[t];
        },
        set({ _: e }, t, n) {
            const { data: r, setupState: s, ctx: o } = e;
            return Tn(s, t)
                ? ((s[t] = n), !0)
                : r !== U && R(r, t)
                ? ((r[t] = n), !0)
                : R(e.props, t) || (t[0] === "$" && t.slice(1) in e)
                ? !1
                : ((o[t] = n), !0);
        },
        has(
            {
                _: {
                    data: e,
                    setupState: t,
                    accessCache: n,
                    ctx: r,
                    appContext: s,
                    propsOptions: o,
                },
            },
            i
        ) {
            let a;
            return (
                !!n[i] ||
                (e !== U && R(e, i)) ||
                Tn(t, i) ||
                ((a = o[0]) && R(a, i)) ||
                R(r, i) ||
                R(St, i) ||
                R(s.config.globalProperties, i)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null
                    ? (e._.accessCache[t] = 0)
                    : R(n, "value") && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
let qn = !0;
function Wa(e) {
    const t = Ir(e),
        n = e.proxy,
        r = e.ctx;
    (qn = !1), t.beforeCreate && ns(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: o,
        methods: i,
        watch: a,
        provide: l,
        inject: u,
        created: d,
        beforeMount: y,
        mounted: E,
        beforeUpdate: A,
        updated: B,
        activated: S,
        deactivated: q,
        beforeDestroy: $,
        beforeUnmount: fe,
        destroyed: D,
        unmounted: K,
        render: Q,
        renderTracked: lt,
        renderTriggered: Re,
        errorCaptured: N,
        serverPrefetch: G,
        expose: V,
        inheritAttrs: ce,
        components: we,
        directives: Ae,
        filters: Ct,
    } = t;
    if ((u && za(u, r, null, e.appContext.config.unwrapInjectedRef), i))
        for (const W in i) {
            const L = i[W];
            M(L) && (r[W] = L.bind(n));
        }
    if (s) {
        const W = s.call(n, n);
        z(W) && (e.data = br(W));
    }
    if (((qn = !0), o))
        for (const W in o) {
            const L = o[W],
                We = M(L) ? L.bind(n, n) : M(L.get) ? L.get.bind(n, n) : ye,
                Ft = !M(L) && M(L.set) ? L.set.bind(n) : ye,
                ze = Ic({ get: We, set: Ft });
            Object.defineProperty(r, W, {
                enumerable: !0,
                configurable: !0,
                get: () => ze.value,
                set: (Ee) => (ze.value = Ee),
            });
        }
    if (a) for (const W in a) wo(a[W], r, n, W);
    if (l) {
        const W = M(l) ? l.call(n) : l;
        Reflect.ownKeys(W).forEach((L) => {
            Oa(L, W[L]);
        });
    }
    d && ns(d, e, "c");
    function se(W, L) {
        x(L) ? L.forEach((We) => W(We.bind(n))) : L && W(L.bind(n));
    }
    if (
        (se(Ba, y),
        se(bo, E),
        se(Fa, A),
        se($a, B),
        se(Pa, S),
        se(Ra, q),
        se(Ua, N),
        se(Ha, lt),
        se(ja, Re),
        se(_o, fe),
        se(yo, K),
        se(La, G),
        x(V))
    )
        if (V.length) {
            const W = e.exposed || (e.exposed = {});
            V.forEach((L) => {
                Object.defineProperty(W, L, { get: () => n[L], set: (We) => (n[L] = We) });
            });
        } else e.exposed || (e.exposed = {});
    Q && e.render === ye && (e.render = Q),
        ce != null && (e.inheritAttrs = ce),
        we && (e.components = we),
        Ae && (e.directives = Ae);
}
function za(e, t, n = ye, r = !1) {
    x(e) && (e = Jn(e));
    for (const s in e) {
        const o = e[s];
        let i;
        z(o)
            ? "default" in o
                ? (i = zt(o.from || s, o.default, !0))
                : (i = zt(o.from || s))
            : (i = zt(o)),
            te(i) && r
                ? Object.defineProperty(t, s, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => i.value,
                      set: (a) => (i.value = a),
                  })
                : (t[s] = i);
    }
}
function ns(e, t, n) {
    he(x(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function wo(e, t, n, r) {
    const s = r.includes(".") ? ho(n, r) : () => n[r];
    if (X(e)) {
        const o = t[e];
        M(o) && vn(s, o);
    } else if (M(e)) vn(s, e.bind(n));
    else if (z(e))
        if (x(e)) e.forEach((o) => wo(o, t, n, r));
        else {
            const o = M(e.handler) ? e.handler.bind(n) : t[e.handler];
            M(o) && vn(s, o, e);
        }
}
function Ir(e) {
    const t = e.type,
        { mixins: n, extends: r } = t,
        {
            mixins: s,
            optionsCache: o,
            config: { optionMergeStrategies: i },
        } = e.appContext,
        a = o.get(t);
    let l;
    return (
        a
            ? (l = a)
            : !s.length && !n && !r
            ? (l = t)
            : ((l = {}), s.length && s.forEach((u) => Zt(l, u, i, !0)), Zt(l, t, i)),
        z(t) && o.set(t, l),
        l
    );
}
function Zt(e, t, n, r = !1) {
    const { mixins: s, extends: o } = t;
    o && Zt(e, o, n, !0), s && s.forEach((i) => Zt(e, i, n, !0));
    for (const i in t)
        if (!(r && i === "expose")) {
            const a = qa[i] || (n && n[i]);
            e[i] = a ? a(e[i], t[i]) : t[i];
        }
    return e;
}
const qa = {
    data: rs,
    props: Ye,
    emits: Ye,
    methods: Ye,
    computed: Ye,
    beforeCreate: oe,
    created: oe,
    beforeMount: oe,
    mounted: oe,
    beforeUpdate: oe,
    updated: oe,
    beforeDestroy: oe,
    beforeUnmount: oe,
    destroyed: oe,
    unmounted: oe,
    activated: oe,
    deactivated: oe,
    errorCaptured: oe,
    serverPrefetch: oe,
    components: Ye,
    directives: Ye,
    watch: Ya,
    provide: rs,
    inject: Ja,
};
function rs(e, t) {
    return t
        ? e
            ? function () {
                  return re(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function Ja(e, t) {
    return Ye(Jn(e), Jn(t));
}
function Jn(e) {
    if (x(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function oe(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function Ye(e, t) {
    return e ? re(re(Object.create(null), e), t) : t;
}
function Ya(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = re(Object.create(null), e);
    for (const r in t) n[r] = oe(e[r], t[r]);
    return n;
}
function Ga(e, t, n, r = !1) {
    const s = {},
        o = {};
    Yt(o, dn, 1), (e.propsDefaults = Object.create(null)), Eo(e, t, s, o);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? (e.props = r ? s : ia(s)) : e.type.props ? (e.props = s) : (e.props = o), (e.attrs = o);
}
function Xa(e, t, n, r) {
    const {
            props: s,
            attrs: o,
            vnode: { patchFlag: i },
        } = e,
        a = k(s),
        [l] = e.propsOptions;
    let u = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const d = e.vnode.dynamicProps;
            for (let y = 0; y < d.length; y++) {
                let E = d[y];
                if (an(e.emitsOptions, E)) continue;
                const A = t[E];
                if (l)
                    if (R(o, E)) A !== o[E] && ((o[E] = A), (u = !0));
                    else {
                        const B = bt(E);
                        s[B] = Yn(l, a, B, A, e, !1);
                    }
                else A !== o[E] && ((o[E] = A), (u = !0));
            }
        }
    } else {
        Eo(e, t, s, o) && (u = !0);
        let d;
        for (const y in a)
            (!t || (!R(t, y) && ((d = wt(y)) === y || !R(t, d)))) &&
                (l
                    ? n &&
                      (n[y] !== void 0 || n[d] !== void 0) &&
                      (s[y] = Yn(l, a, y, void 0, e, !0))
                    : delete s[y]);
        if (o !== a) for (const y in o) (!t || !R(t, y)) && (delete o[y], (u = !0));
    }
    u && Ne(e, "set", "$attrs");
}
function Eo(e, t, n, r) {
    const [s, o] = e.propsOptions;
    let i = !1,
        a;
    if (t)
        for (let l in t) {
            if (Wt(l)) continue;
            const u = t[l];
            let d;
            s && R(s, (d = bt(l)))
                ? !o || !o.includes(d)
                    ? (n[d] = u)
                    : ((a || (a = {}))[d] = u)
                : an(e.emitsOptions, l) || ((!(l in r) || u !== r[l]) && ((r[l] = u), (i = !0)));
        }
    if (o) {
        const l = k(n),
            u = a || U;
        for (let d = 0; d < o.length; d++) {
            const y = o[d];
            n[y] = Yn(s, l, y, u[y], e, !R(u, y));
        }
    }
    return i;
}
function Yn(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const a = R(i, "default");
        if (a && r === void 0) {
            const l = i.default;
            if (i.type !== Function && M(l)) {
                const { propsDefaults: u } = s;
                n in u ? (r = u[n]) : (yt(s), (r = u[n] = l.call(null, t)), nt());
            } else r = l;
        }
        i[0] && (o && !a ? (r = !1) : i[1] && (r === "" || r === wt(n)) && (r = !0));
    }
    return r;
}
function Io(e, t, n = !1) {
    const r = t.propsCache,
        s = r.get(e);
    if (s) return s;
    const o = e.props,
        i = {},
        a = [];
    let l = !1;
    if (!M(e)) {
        const d = (y) => {
            l = !0;
            const [E, A] = Io(y, t, !0);
            re(i, E), A && a.push(...A);
        };
        !n && t.mixins.length && t.mixins.forEach(d),
            e.extends && d(e.extends),
            e.mixins && e.mixins.forEach(d);
    }
    if (!o && !l) return z(e) && r.set(e, ht), ht;
    if (x(o))
        for (let d = 0; d < o.length; d++) {
            const y = bt(o[d]);
            ss(y) && (i[y] = U);
        }
    else if (o)
        for (const d in o) {
            const y = bt(d);
            if (ss(y)) {
                const E = o[d],
                    A = (i[y] = x(E) || M(E) ? { type: E } : Object.assign({}, E));
                if (A) {
                    const B = as(Boolean, A.type),
                        S = as(String, A.type);
                    (A[0] = B > -1),
                        (A[1] = S < 0 || B < S),
                        (B > -1 || R(A, "default")) && a.push(y);
                }
            }
        }
    const u = [i, a];
    return z(e) && r.set(e, u), u;
}
function ss(e) {
    return e[0] !== "$";
}
function os(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : "";
}
function is(e, t) {
    return os(e) === os(t);
}
function as(e, t) {
    return x(t) ? t.findIndex((n) => is(n, e)) : M(t) && is(t, e) ? 0 : -1;
}
const vo = (e) => e[0] === "_" || e === "$stable",
    vr = (e) => (x(e) ? e.map(Ce) : [Ce(e)]),
    Za = (e, t, n) => {
        if (t._n) return t;
        const r = Ea((...s) => vr(t(...s)), n);
        return (r._c = !1), r;
    },
    Co = (e, t, n) => {
        const r = e._ctx;
        for (const s in e) {
            if (vo(s)) continue;
            const o = e[s];
            if (M(o)) t[s] = Za(s, o, r);
            else if (o != null) {
                const i = vr(o);
                t[s] = () => i;
            }
        }
    },
    To = (e, t) => {
        const n = vr(t);
        e.slots.default = () => n;
    },
    Qa = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? ((e.slots = k(t)), Yt(t, "_", n)) : Co(t, (e.slots = {}));
        } else (e.slots = {}), t && To(e, t);
        Yt(e.slots, dn, 1);
    },
    ec = (e, t, n) => {
        const { vnode: r, slots: s } = e;
        let o = !0,
            i = U;
        if (r.shapeFlag & 32) {
            const a = t._;
            a
                ? n && a === 1
                    ? (o = !1)
                    : (re(s, t), !n && a === 1 && delete s._)
                : ((o = !t.$stable), Co(t, s)),
                (i = t);
        } else t && (To(e, t), (i = { default: 1 }));
        if (o) for (const a in s) !vo(a) && !(a in i) && delete s[a];
    };
function Ao() {
    return {
        app: null,
        config: {
            isNativeTag: vi,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let tc = 0;
function nc(e, t) {
    return function (r, s = null) {
        M(r) || (r = Object.assign({}, r)), s != null && !z(s) && (s = null);
        const o = Ao(),
            i = new Set();
        let a = !1;
        const l = (o.app = {
            _uid: tc++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: Tc,
            get config() {
                return o.config;
            },
            set config(u) {},
            use(u, ...d) {
                return (
                    i.has(u) ||
                        (u && M(u.install)
                            ? (i.add(u), u.install(l, ...d))
                            : M(u) && (i.add(u), u(l, ...d))),
                    l
                );
            },
            mixin(u) {
                return o.mixins.includes(u) || o.mixins.push(u), l;
            },
            component(u, d) {
                return d ? ((o.components[u] = d), l) : o.components[u];
            },
            directive(u, d) {
                return d ? ((o.directives[u] = d), l) : o.directives[u];
            },
            mount(u, d, y) {
                if (!a) {
                    const E = Le(r, s);
                    return (
                        (E.appContext = o),
                        d && t ? t(E, u) : e(E, u, y),
                        (a = !0),
                        (l._container = u),
                        (u.__vue_app__ = l),
                        Tr(E.component) || E.component.proxy
                    );
                }
            },
            unmount() {
                a && (e(null, l._container), delete l._container.__vue_app__);
            },
            provide(u, d) {
                return (o.provides[u] = d), l;
            },
        });
        return l;
    };
}
function Gn(e, t, n, r, s = !1) {
    if (x(e)) {
        e.forEach((E, A) => Gn(E, t && (x(t) ? t[A] : t), n, r, s));
        return;
    }
    if (qt(r) && !s) return;
    const o = r.shapeFlag & 4 ? Tr(r.component) || r.component.proxy : r.el,
        i = s ? null : o,
        { i: a, r: l } = e,
        u = t && t.r,
        d = a.refs === U ? (a.refs = {}) : a.refs,
        y = a.setupState;
    if (
        (u != null &&
            u !== l &&
            (X(u) ? ((d[u] = null), R(y, u) && (y[u] = null)) : te(u) && (u.value = null)),
        M(l))
    )
        $e(l, a, 12, [i, d]);
    else {
        const E = X(l),
            A = te(l);
        if (E || A) {
            const B = () => {
                if (e.f) {
                    const S = E ? (R(y, l) ? y[l] : d[l]) : l.value;
                    s
                        ? x(S) && lr(S, o)
                        : x(S)
                        ? S.includes(o) || S.push(o)
                        : E
                        ? ((d[l] = [o]), R(y, l) && (y[l] = d[l]))
                        : ((l.value = [o]), e.k && (d[e.k] = l.value));
                } else
                    E
                        ? ((d[l] = i), R(y, l) && (y[l] = i))
                        : A && ((l.value = i), e.k && (d[e.k] = i));
            };
            i ? ((B.id = -1), ie(B, n)) : B();
        }
    }
}
const ie = Sa;
function rc(e) {
    return sc(e);
}
function sc(e, t) {
    const n = Di();
    n.__VUE__ = !0;
    const {
            insert: r,
            remove: s,
            patchProp: o,
            createElement: i,
            createText: a,
            createComment: l,
            setText: u,
            setElementText: d,
            parentNode: y,
            nextSibling: E,
            setScopeId: A = ye,
            insertStaticContent: B,
        } = e,
        S = (c, f, h, g = null, p = null, _ = null, I = !1, b = null, w = !!f.dynamicChildren) => {
            if (c === f) return;
            c && !Ze(c, f) && ((g = $t(c)), Ee(c, p, _, !0), (c = null)),
                f.patchFlag === -2 && ((w = !1), (f.dynamicChildren = null));
            const { type: m, ref: C, shapeFlag: v } = f;
            switch (m) {
                case un:
                    q(c, f, h, g);
                    break;
                case De:
                    $(c, f, h, g);
                    break;
                case An:
                    c == null && fe(f, h, g, I);
                    break;
                case de:
                    we(c, f, h, g, p, _, I, b, w);
                    break;
                default:
                    v & 1
                        ? Q(c, f, h, g, p, _, I, b, w)
                        : v & 6
                        ? Ae(c, f, h, g, p, _, I, b, w)
                        : (v & 64 || v & 128) && m.process(c, f, h, g, p, _, I, b, w, ft);
            }
            C != null && p && Gn(C, c && c.ref, _, f || c, !f);
        },
        q = (c, f, h, g) => {
            if (c == null) r((f.el = a(f.children)), h, g);
            else {
                const p = (f.el = c.el);
                f.children !== c.children && u(p, f.children);
            }
        },
        $ = (c, f, h, g) => {
            c == null ? r((f.el = l(f.children || "")), h, g) : (f.el = c.el);
        },
        fe = (c, f, h, g) => {
            [c.el, c.anchor] = B(c.children, f, h, g, c.el, c.anchor);
        },
        D = ({ el: c, anchor: f }, h, g) => {
            let p;
            for (; c && c !== f; ) (p = E(c)), r(c, h, g), (c = p);
            r(f, h, g);
        },
        K = ({ el: c, anchor: f }) => {
            let h;
            for (; c && c !== f; ) (h = E(c)), s(c), (c = h);
            s(f);
        },
        Q = (c, f, h, g, p, _, I, b, w) => {
            (I = I || f.type === "svg"),
                c == null ? lt(f, h, g, p, _, I, b, w) : G(c, f, p, _, I, b, w);
        },
        lt = (c, f, h, g, p, _, I, b) => {
            let w, m;
            const { type: C, props: v, shapeFlag: T, transition: O, dirs: P } = c;
            if (
                ((w = c.el = i(c.type, _, v && v.is, v)),
                T & 8
                    ? d(w, c.children)
                    : T & 16 && N(c.children, w, null, g, p, _ && C !== "foreignObject", I, b),
                P && qe(c, null, g, "created"),
                Re(w, c, c.scopeId, I, g),
                v)
            ) {
                for (const F in v)
                    F !== "value" && !Wt(F) && o(w, F, null, v[F], _, c.children, g, p, Se);
                "value" in v && o(w, "value", null, v.value),
                    (m = v.onVnodeBeforeMount) && ve(m, g, c);
            }
            P && qe(c, null, g, "beforeMount");
            const j = (!p || (p && !p.pendingBranch)) && O && !O.persisted;
            j && O.beforeEnter(w),
                r(w, f, h),
                ((m = v && v.onVnodeMounted) || j || P) &&
                    ie(() => {
                        m && ve(m, g, c), j && O.enter(w), P && qe(c, null, g, "mounted");
                    }, p);
        },
        Re = (c, f, h, g, p) => {
            if ((h && A(c, h), g)) for (let _ = 0; _ < g.length; _++) A(c, g[_]);
            if (p) {
                let _ = p.subTree;
                if (f === _) {
                    const I = p.vnode;
                    Re(c, I, I.scopeId, I.slotScopeIds, p.parent);
                }
            }
        },
        N = (c, f, h, g, p, _, I, b, w = 0) => {
            for (let m = w; m < c.length; m++) {
                const C = (c[m] = b ? Be(c[m]) : Ce(c[m]));
                S(null, C, f, h, g, p, _, I, b);
            }
        },
        G = (c, f, h, g, p, _, I) => {
            const b = (f.el = c.el);
            let { patchFlag: w, dynamicChildren: m, dirs: C } = f;
            w |= c.patchFlag & 16;
            const v = c.props || U,
                T = f.props || U;
            let O;
            h && Je(h, !1),
                (O = T.onVnodeBeforeUpdate) && ve(O, h, f, c),
                C && qe(f, c, h, "beforeUpdate"),
                h && Je(h, !0);
            const P = p && f.type !== "foreignObject";
            if (
                (m ? V(c.dynamicChildren, m, b, h, g, P, _) : I || L(c, f, b, null, h, g, P, _, !1),
                w > 0)
            ) {
                if (w & 16) ce(b, f, v, T, h, g, p);
                else if (
                    (w & 2 && v.class !== T.class && o(b, "class", null, T.class, p),
                    w & 4 && o(b, "style", v.style, T.style, p),
                    w & 8)
                ) {
                    const j = f.dynamicProps;
                    for (let F = 0; F < j.length; F++) {
                        const J = j[F],
                            pe = v[J],
                            ut = T[J];
                        (ut !== pe || J === "value") && o(b, J, pe, ut, p, c.children, h, g, Se);
                    }
                }
                w & 1 && c.children !== f.children && d(b, f.children);
            } else !I && m == null && ce(b, f, v, T, h, g, p);
            ((O = T.onVnodeUpdated) || C) &&
                ie(() => {
                    O && ve(O, h, f, c), C && qe(f, c, h, "updated");
                }, g);
        },
        V = (c, f, h, g, p, _, I) => {
            for (let b = 0; b < f.length; b++) {
                const w = c[b],
                    m = f[b],
                    C = w.el && (w.type === de || !Ze(w, m) || w.shapeFlag & 70) ? y(w.el) : h;
                S(w, m, C, null, g, p, _, I, !0);
            }
        },
        ce = (c, f, h, g, p, _, I) => {
            if (h !== g) {
                if (h !== U)
                    for (const b in h)
                        !Wt(b) && !(b in g) && o(c, b, h[b], null, I, f.children, p, _, Se);
                for (const b in g) {
                    if (Wt(b)) continue;
                    const w = g[b],
                        m = h[b];
                    w !== m && b !== "value" && o(c, b, m, w, I, f.children, p, _, Se);
                }
                "value" in g && o(c, "value", h.value, g.value);
            }
        },
        we = (c, f, h, g, p, _, I, b, w) => {
            const m = (f.el = c ? c.el : a("")),
                C = (f.anchor = c ? c.anchor : a(""));
            let { patchFlag: v, dynamicChildren: T, slotScopeIds: O } = f;
            O && (b = b ? b.concat(O) : O),
                c == null
                    ? (r(m, h, g), r(C, h, g), N(f.children, h, C, p, _, I, b, w))
                    : v > 0 && v & 64 && T && c.dynamicChildren
                    ? (V(c.dynamicChildren, T, h, p, _, I, b),
                      (f.key != null || (p && f === p.subTree)) && So(c, f, !0))
                    : L(c, f, h, C, p, _, I, b, w);
        },
        Ae = (c, f, h, g, p, _, I, b, w) => {
            (f.slotScopeIds = b),
                c == null
                    ? f.shapeFlag & 512
                        ? p.ctx.activate(f, h, g, I, w)
                        : Ct(f, h, g, p, _, I, w)
                    : $r(c, f, w);
        },
        Ct = (c, f, h, g, p, _, I) => {
            const b = (c.component = gc(c, g, p));
            if ((ln(c) && (b.ctx.renderer = ft), bc(b), b.asyncDep)) {
                if ((p && p.registerDep(b, se), !c.el)) {
                    const w = (b.subTree = Le(De));
                    $(null, w, f, h);
                }
                return;
            }
            se(b, c, f, h, p, _, I);
        },
        $r = (c, f, h) => {
            const g = (f.component = c.component);
            if (Ca(c, f, h))
                if (g.asyncDep && !g.asyncResolved) {
                    W(g, f, h);
                    return;
                } else (g.next = f), ba(g.update), g.update();
            else (f.el = c.el), (g.vnode = f);
        },
        se = (c, f, h, g, p, _, I) => {
            const b = () => {
                    if (c.isMounted) {
                        let { next: C, bu: v, u: T, parent: O, vnode: P } = c,
                            j = C,
                            F;
                        Je(c, !1),
                            C ? ((C.el = P.el), W(c, C, I)) : (C = P),
                            v && En(v),
                            (F = C.props && C.props.onVnodeBeforeUpdate) && ve(F, O, C, P),
                            Je(c, !0);
                        const J = In(c),
                            pe = c.subTree;
                        (c.subTree = J),
                            S(pe, J, y(pe.el), $t(pe), c, p, _),
                            (C.el = J.el),
                            j === null && Ta(c, J.el),
                            T && ie(T, p),
                            (F = C.props && C.props.onVnodeUpdated) && ie(() => ve(F, O, C, P), p);
                    } else {
                        let C;
                        const { el: v, props: T } = f,
                            { bm: O, m: P, parent: j } = c,
                            F = qt(f);
                        if (
                            (Je(c, !1),
                            O && En(O),
                            !F && (C = T && T.onVnodeBeforeMount) && ve(C, j, f),
                            Je(c, !0),
                            v && yn)
                        ) {
                            const J = () => {
                                (c.subTree = In(c)), yn(v, c.subTree, c, p, null);
                            };
                            F ? f.type.__asyncLoader().then(() => !c.isUnmounted && J()) : J();
                        } else {
                            const J = (c.subTree = In(c));
                            S(null, J, h, g, c, p, _), (f.el = J.el);
                        }
                        if ((P && ie(P, p), !F && (C = T && T.onVnodeMounted))) {
                            const J = f;
                            ie(() => ve(C, j, J), p);
                        }
                        (f.shapeFlag & 256 || (j && qt(j.vnode) && j.vnode.shapeFlag & 256)) &&
                            c.a &&
                            ie(c.a, p),
                            (c.isMounted = !0),
                            (f = h = g = null);
                    }
                },
                w = (c.effect = new hr(b, () => Er(m), c.scope)),
                m = (c.update = () => w.run());
            (m.id = c.uid), Je(c, !0), m();
        },
        W = (c, f, h) => {
            f.component = c;
            const g = c.vnode.props;
            (c.vnode = f),
                (c.next = null),
                Xa(c, f.props, g, h),
                ec(c, f.children, h),
                Et(),
                Qr(),
                It();
        },
        L = (c, f, h, g, p, _, I, b, w = !1) => {
            const m = c && c.children,
                C = c ? c.shapeFlag : 0,
                v = f.children,
                { patchFlag: T, shapeFlag: O } = f;
            if (T > 0) {
                if (T & 128) {
                    Ft(m, v, h, g, p, _, I, b, w);
                    return;
                } else if (T & 256) {
                    We(m, v, h, g, p, _, I, b, w);
                    return;
                }
            }
            O & 8
                ? (C & 16 && Se(m, p, _), v !== m && d(h, v))
                : C & 16
                ? O & 16
                    ? Ft(m, v, h, g, p, _, I, b, w)
                    : Se(m, p, _, !0)
                : (C & 8 && d(h, ""), O & 16 && N(v, h, g, p, _, I, b, w));
        },
        We = (c, f, h, g, p, _, I, b, w) => {
            (c = c || ht), (f = f || ht);
            const m = c.length,
                C = f.length,
                v = Math.min(m, C);
            let T;
            for (T = 0; T < v; T++) {
                const O = (f[T] = w ? Be(f[T]) : Ce(f[T]));
                S(c[T], O, h, null, p, _, I, b, w);
            }
            m > C ? Se(c, p, _, !0, !1, v) : N(f, h, g, p, _, I, b, w, v);
        },
        Ft = (c, f, h, g, p, _, I, b, w) => {
            let m = 0;
            const C = f.length;
            let v = c.length - 1,
                T = C - 1;
            for (; m <= v && m <= T; ) {
                const O = c[m],
                    P = (f[m] = w ? Be(f[m]) : Ce(f[m]));
                if (Ze(O, P)) S(O, P, h, null, p, _, I, b, w);
                else break;
                m++;
            }
            for (; m <= v && m <= T; ) {
                const O = c[v],
                    P = (f[T] = w ? Be(f[T]) : Ce(f[T]));
                if (Ze(O, P)) S(O, P, h, null, p, _, I, b, w);
                else break;
                v--, T--;
            }
            if (m > v) {
                if (m <= T) {
                    const O = T + 1,
                        P = O < C ? f[O].el : g;
                    for (; m <= T; )
                        S(null, (f[m] = w ? Be(f[m]) : Ce(f[m])), h, P, p, _, I, b, w), m++;
                }
            } else if (m > T) for (; m <= v; ) Ee(c[m], p, _, !0), m++;
            else {
                const O = m,
                    P = m,
                    j = new Map();
                for (m = P; m <= T; m++) {
                    const le = (f[m] = w ? Be(f[m]) : Ce(f[m]));
                    le.key != null && j.set(le.key, m);
                }
                let F,
                    J = 0;
                const pe = T - P + 1;
                let ut = !1,
                    Hr = 0;
                const Tt = new Array(pe);
                for (m = 0; m < pe; m++) Tt[m] = 0;
                for (m = O; m <= v; m++) {
                    const le = c[m];
                    if (J >= pe) {
                        Ee(le, p, _, !0);
                        continue;
                    }
                    let Ie;
                    if (le.key != null) Ie = j.get(le.key);
                    else
                        for (F = P; F <= T; F++)
                            if (Tt[F - P] === 0 && Ze(le, f[F])) {
                                Ie = F;
                                break;
                            }
                    Ie === void 0
                        ? Ee(le, p, _, !0)
                        : ((Tt[Ie - P] = m + 1),
                          Ie >= Hr ? (Hr = Ie) : (ut = !0),
                          S(le, f[Ie], h, null, p, _, I, b, w),
                          J++);
                }
                const Ur = ut ? oc(Tt) : ht;
                for (F = Ur.length - 1, m = pe - 1; m >= 0; m--) {
                    const le = P + m,
                        Ie = f[le],
                        Kr = le + 1 < C ? f[le + 1].el : g;
                    Tt[m] === 0
                        ? S(null, Ie, h, Kr, p, _, I, b, w)
                        : ut && (F < 0 || m !== Ur[F] ? ze(Ie, h, Kr, 2) : F--);
                }
            }
        },
        ze = (c, f, h, g, p = null) => {
            const { el: _, type: I, transition: b, children: w, shapeFlag: m } = c;
            if (m & 6) {
                ze(c.component.subTree, f, h, g);
                return;
            }
            if (m & 128) {
                c.suspense.move(f, h, g);
                return;
            }
            if (m & 64) {
                I.move(c, f, h, ft);
                return;
            }
            if (I === de) {
                r(_, f, h);
                for (let v = 0; v < w.length; v++) ze(w[v], f, h, g);
                r(c.anchor, f, h);
                return;
            }
            if (I === An) {
                D(c, f, h);
                return;
            }
            if (g !== 2 && m & 1 && b)
                if (g === 0) b.beforeEnter(_), r(_, f, h), ie(() => b.enter(_), p);
                else {
                    const { leave: v, delayLeave: T, afterLeave: O } = b,
                        P = () => r(_, f, h),
                        j = () => {
                            v(_, () => {
                                P(), O && O();
                            });
                        };
                    T ? T(_, P, j) : j();
                }
            else r(_, f, h);
        },
        Ee = (c, f, h, g = !1, p = !1) => {
            const {
                type: _,
                props: I,
                ref: b,
                children: w,
                dynamicChildren: m,
                shapeFlag: C,
                patchFlag: v,
                dirs: T,
            } = c;
            if ((b != null && Gn(b, null, h, c, !0), C & 256)) {
                f.ctx.deactivate(c);
                return;
            }
            const O = C & 1 && T,
                P = !qt(c);
            let j;
            if ((P && (j = I && I.onVnodeBeforeUnmount) && ve(j, f, c), C & 6))
                mi(c.component, h, g);
            else {
                if (C & 128) {
                    c.suspense.unmount(h, g);
                    return;
                }
                O && qe(c, null, f, "beforeUnmount"),
                    C & 64
                        ? c.type.remove(c, f, h, p, ft, g)
                        : m && (_ !== de || (v > 0 && v & 64))
                        ? Se(m, f, h, !1, !0)
                        : ((_ === de && v & 384) || (!p && C & 16)) && Se(w, f, h),
                    g && Lr(c);
            }
            ((P && (j = I && I.onVnodeUnmounted)) || O) &&
                ie(() => {
                    j && ve(j, f, c), O && qe(c, null, f, "unmounted");
                }, h);
        },
        Lr = (c) => {
            const { type: f, el: h, anchor: g, transition: p } = c;
            if (f === de) {
                gi(h, g);
                return;
            }
            if (f === An) {
                K(c);
                return;
            }
            const _ = () => {
                s(h), p && !p.persisted && p.afterLeave && p.afterLeave();
            };
            if (c.shapeFlag & 1 && p && !p.persisted) {
                const { leave: I, delayLeave: b } = p,
                    w = () => I(h, _);
                b ? b(c.el, _, w) : w();
            } else _();
        },
        gi = (c, f) => {
            let h;
            for (; c !== f; ) (h = E(c)), s(c), (c = h);
            s(f);
        },
        mi = (c, f, h) => {
            const { bum: g, scope: p, update: _, subTree: I, um: b } = c;
            g && En(g),
                p.stop(),
                _ && ((_.active = !1), Ee(I, c, f, h)),
                b && ie(b, f),
                ie(() => {
                    c.isUnmounted = !0;
                }, f),
                f &&
                    f.pendingBranch &&
                    !f.isUnmounted &&
                    c.asyncDep &&
                    !c.asyncResolved &&
                    c.suspenseId === f.pendingId &&
                    (f.deps--, f.deps === 0 && f.resolve());
        },
        Se = (c, f, h, g = !1, p = !1, _ = 0) => {
            for (let I = _; I < c.length; I++) Ee(c[I], f, h, g, p);
        },
        $t = (c) =>
            c.shapeFlag & 6
                ? $t(c.component.subTree)
                : c.shapeFlag & 128
                ? c.suspense.next()
                : E(c.anchor || c.el),
        jr = (c, f, h) => {
            c == null
                ? f._vnode && Ee(f._vnode, null, null, !0)
                : S(f._vnode || null, c, f, null, null, null, h),
                Qr(),
                io(),
                (f._vnode = c);
        },
        ft = { p: S, um: Ee, m: ze, r: Lr, mt: Ct, mc: N, pc: L, pbc: V, n: $t, o: e };
    let _n, yn;
    return t && ([_n, yn] = t(ft)), { render: jr, hydrate: _n, createApp: nc(jr, _n) };
}
function Je({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function So(e, t, n = !1) {
    const r = e.children,
        s = t.children;
    if (x(r) && x(s))
        for (let o = 0; o < r.length; o++) {
            const i = r[o];
            let a = s[o];
            a.shapeFlag & 1 &&
                !a.dynamicChildren &&
                ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = s[o] = Be(s[o])), (a.el = i.el)),
                n || So(i, a)),
                a.type === un && (a.el = i.el);
        }
}
function oc(e) {
    const t = e.slice(),
        n = [0];
    let r, s, o, i, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
        const u = e[r];
        if (u !== 0) {
            if (((s = n[n.length - 1]), e[s] < u)) {
                (t[r] = s), n.push(r);
                continue;
            }
            for (o = 0, i = n.length - 1; o < i; )
                (a = (o + i) >> 1), e[n[a]] < u ? (o = a + 1) : (i = a);
            u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
    return n;
}
const ic = (e) => e.__isTeleport,
    de = Symbol(void 0),
    un = Symbol(void 0),
    De = Symbol(void 0),
    An = Symbol(void 0),
    Ot = [];
let _e = null;
function Oo(e = !1) {
    Ot.push((_e = e ? null : []));
}
function ac() {
    Ot.pop(), (_e = Ot[Ot.length - 1] || null);
}
let Pt = 1;
function cs(e) {
    Pt += e;
}
function cc(e) {
    return (e.dynamicChildren = Pt > 0 ? _e || ht : null), ac(), Pt > 0 && _e && _e.push(e), e;
}
function xo(e, t, n, r, s, o) {
    return cc(Z(e, t, n, r, s, o, !0));
}
function lc(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Ze(e, t) {
    return e.type === t.type && e.key === t.key;
}
const dn = "__vInternal",
    Do = ({ key: e }) => e ?? null,
    Jt = ({ ref: e, ref_key: t, ref_for: n }) =>
        e != null ? (X(e) || te(e) || M(e) ? { i: be, r: e, k: t, f: !!n } : e) : null;
function Z(e, t = null, n = null, r = 0, s = null, o = e === de ? 0 : 1, i = !1, a = !1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Do(t),
        ref: t && Jt(t),
        scopeId: cn,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: be,
    };
    return (
        a ? (Cr(l, n), o & 128 && e.normalize(l)) : n && (l.shapeFlag |= X(n) ? 8 : 16),
        Pt > 0 && !i && _e && (l.patchFlag > 0 || o & 6) && l.patchFlag !== 32 && _e.push(l),
        l
    );
}
const Le = fc;
function fc(e, t = null, n = null, r = 0, s = null, o = !1) {
    if (((!e || e === Ka) && (e = De), lc(e))) {
        const a = Ke(e, t, !0);
        return (
            n && Cr(a, n),
            Pt > 0 && !o && _e && (a.shapeFlag & 6 ? (_e[_e.indexOf(e)] = a) : _e.push(a)),
            (a.patchFlag |= -2),
            a
        );
    }
    if ((Ec(e) && (e = e.__vccOpts), t)) {
        t = uc(t);
        let { class: a, style: l } = t;
        a && !X(a) && (t.class = ar(a)),
            z(l) && (Zs(l) && !x(l) && (l = re({}, l)), (t.style = ir(l)));
    }
    const i = X(e) ? 1 : Aa(e) ? 128 : ic(e) ? 64 : z(e) ? 4 : M(e) ? 2 : 0;
    return Z(e, t, n, r, s, i, o, !0);
}
function uc(e) {
    return e ? (Zs(e) || dn in e ? re({}, e) : e) : null;
}
function Ke(e, t, n = !1) {
    const { props: r, ref: s, patchFlag: o, children: i } = e,
        a = t ? dc(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && Do(a),
        ref: t && t.ref ? (n && s ? (x(s) ? s.concat(Jt(t)) : [s, Jt(t)]) : Jt(t)) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== de ? (o === -1 ? 16 : o | 16) : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Ke(e.ssContent),
        ssFallback: e.ssFallback && Ke(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce,
    };
}
function rt(e = " ", t = 0) {
    return Le(un, null, e, t);
}
function Ce(e) {
    return e == null || typeof e == "boolean"
        ? Le(De)
        : x(e)
        ? Le(de, null, e.slice())
        : typeof e == "object"
        ? Be(e)
        : Le(un, null, String(e));
}
function Be(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Ke(e);
}
function Cr(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (x(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), Cr(e, s()), s._c && (s._d = !0));
            return;
        } else {
            n = 32;
            const s = t._;
            !s && !(dn in t)
                ? (t._ctx = be)
                : s === 3 &&
                  be &&
                  (be.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        M(t)
            ? ((t = { default: t, _ctx: be }), (n = 32))
            : ((t = String(t)), r & 64 ? ((n = 16), (t = [rt(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function dc(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class") t.class !== r.class && (t.class = ar([t.class, r.class]));
            else if (s === "style") t.style = ir([t.style, r.style]);
            else if (tn(s)) {
                const o = t[s],
                    i = r[s];
                i && o !== i && !(x(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
            } else s !== "" && (t[s] = r[s]);
    }
    return t;
}
function ve(e, t, n, r = null) {
    he(e, t, 7, [n, r]);
}
const hc = Ao();
let pc = 0;
function gc(e, t, n) {
    const r = e.type,
        s = (t ? t.appContext : e.appContext) || hc,
        o = {
            uid: pc++,
            vnode: e,
            type: r,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Mi(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(s.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Io(r, s),
            emitsOptions: co(r, s),
            emit: null,
            emitted: null,
            propsDefaults: U,
            inheritAttrs: r.inheritAttrs,
            ctx: U,
            data: U,
            props: U,
            attrs: U,
            slots: U,
            refs: U,
            setupState: U,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (
        (o.ctx = { _: o }),
        (o.root = t ? t.root : o),
        (o.emit = wa.bind(null, o)),
        e.ce && e.ce(o),
        o
    );
}
let Y = null;
const mc = () => Y || be,
    yt = (e) => {
        (Y = e), e.scope.on();
    },
    nt = () => {
        Y && Y.scope.off(), (Y = null);
    };
function Mo(e) {
    return e.vnode.shapeFlag & 4;
}
let Rt = !1;
function bc(e, t = !1) {
    Rt = t;
    const { props: n, children: r } = e.vnode,
        s = Mo(e);
    Ga(e, n, s, t), Qa(e, r);
    const o = s ? _c(e, t) : void 0;
    return (Rt = !1), o;
}
function _c(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = Qs(new Proxy(e.ctx, Va)));
    const { setup: r } = n;
    if (r) {
        const s = (e.setupContext = r.length > 1 ? wc(e) : null);
        yt(e), Et();
        const o = $e(r, e, 0, [e.props, s]);
        if ((It(), nt(), Fs(o))) {
            if ((o.then(nt, nt), t))
                return o
                    .then((i) => {
                        ls(e, i, t);
                    })
                    .catch((i) => {
                        on(i, e, 0);
                    });
            e.asyncDep = o;
        } else ls(e, o, t);
    } else No(e, t);
}
function ls(e, t, n) {
    M(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : z(t) && (e.setupState = no(t)),
        No(e, n);
}
let fs;
function No(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && fs && !r.render) {
            const s = r.template || Ir(e).template;
            if (s) {
                const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
                    { delimiters: a, compilerOptions: l } = r,
                    u = re(re({ isCustomElement: o, delimiters: a }, i), l);
                r.render = fs(s, u);
            }
        }
        e.render = r.render || ye;
    }
    yt(e), Et(), Wa(e), It(), nt();
}
function yc(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return ae(e, "get", "$attrs"), t[n];
        },
    });
}
function wc(e) {
    const t = (r) => {
        e.exposed = r || {};
    };
    let n;
    return {
        get attrs() {
            return n || (n = yc(e));
        },
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function Tr(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(no(Qs(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in St) return St[n](e);
                },
                has(t, n) {
                    return n in t || n in St;
                },
            }))
        );
}
function Ec(e) {
    return M(e) && "__vccOpts" in e;
}
const Ic = (e, t) => ha(e, t, Rt),
    vc = Symbol(""),
    Cc = () => zt(vc),
    Tc = "3.2.47",
    Ac = "http://www.w3.org/2000/svg",
    Qe = typeof document < "u" ? document : null,
    us = Qe && Qe.createElement("template"),
    Sc = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, r) => {
            const s = t ? Qe.createElementNS(Ac, e) : Qe.createElement(e, n ? { is: n } : void 0);
            return (
                e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple),
                s
            );
        },
        createText: (e) => Qe.createTextNode(e),
        createComment: (e) => Qe.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => Qe.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        insertStaticContent(e, t, n, r, s, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === o || s.nextSibling))
                for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)); );
            else {
                us.innerHTML = r ? `<svg>${e}</svg>` : e;
                const a = us.content;
                if (r) {
                    const l = a.firstChild;
                    for (; l.firstChild; ) a.appendChild(l.firstChild);
                    a.removeChild(l);
                }
                t.insertBefore(a, n);
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    };
function Oc(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
        t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
function xc(e, t, n) {
    const r = e.style,
        s = X(n);
    if (n && !s) {
        if (t && !X(t)) for (const o in t) n[o] == null && Xn(r, o, "");
        for (const o in n) Xn(r, o, n[o]);
    } else {
        const o = r.display;
        s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
            "_vod" in e && (r.display = o);
    }
}
const ds = /\s*!important$/;
function Xn(e, t, n) {
    if (x(n)) n.forEach((r) => Xn(e, t, r));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const r = Dc(e, t);
        ds.test(n) ? e.setProperty(wt(r), n.replace(ds, ""), "important") : (e[r] = n);
    }
}
const hs = ["Webkit", "Moz", "ms"],
    Sn = {};
function Dc(e, t) {
    const n = Sn[t];
    if (n) return n;
    let r = bt(t);
    if (r !== "filter" && r in e) return (Sn[t] = r);
    r = js(r);
    for (let s = 0; s < hs.length; s++) {
        const o = hs[s] + r;
        if (o in e) return (Sn[t] = o);
    }
    return t;
}
const ps = "http://www.w3.org/1999/xlink";
function Mc(e, t, n, r, s) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(ps, t.slice(6, t.length)) : e.setAttributeNS(ps, t, n);
    else {
        const o = Ii(t);
        n == null || (o && !Rs(n)) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
    }
}
function Nc(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o), (e[t] = n ?? "");
        return;
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const l = n ?? "";
        (e.value !== l || e.tagName === "OPTION") && (e.value = l),
            n == null && e.removeAttribute(t);
        return;
    }
    let a = !1;
    if (n === "" || n == null) {
        const l = typeof e[t];
        l === "boolean"
            ? (n = Rs(n))
            : n == null && l === "string"
            ? ((n = ""), (a = !0))
            : l === "number" && ((n = 0), (a = !0));
    }
    try {
        e[t] = n;
    } catch {}
    a && e.removeAttribute(t);
}
function Pc(e, t, n, r) {
    e.addEventListener(t, n, r);
}
function Rc(e, t, n, r) {
    e.removeEventListener(t, n, r);
}
function kc(e, t, n, r, s = null) {
    const o = e._vei || (e._vei = {}),
        i = o[t];
    if (r && i) i.value = r;
    else {
        const [a, l] = Bc(t);
        if (r) {
            const u = (o[t] = Lc(r, s));
            Pc(e, a, u, l);
        } else i && (Rc(e, a, i, l), (o[t] = void 0));
    }
}
const gs = /(?:Once|Passive|Capture)$/;
function Bc(e) {
    let t;
    if (gs.test(e)) {
        t = {};
        let r;
        for (; (r = e.match(gs)); )
            (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let On = 0;
const Fc = Promise.resolve(),
    $c = () => On || (Fc.then(() => (On = 0)), (On = Date.now()));
function Lc(e, t) {
    const n = (r) => {
        if (!r._vts) r._vts = Date.now();
        else if (r._vts <= n.attached) return;
        he(jc(r, n.value), t, 5, [r]);
    };
    return (n.value = e), (n.attached = $c()), n;
}
function jc(e, t) {
    if (x(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((r) => (s) => !s._stopped && r && r(s))
        );
    } else return t;
}
const ms = /^on[a-z]/,
    Hc = (e, t, n, r, s = !1, o, i, a, l) => {
        t === "class"
            ? Oc(e, r, s)
            : t === "style"
            ? xc(e, n, r)
            : tn(t)
            ? cr(t) || kc(e, t, n, r, i)
            : (
                  t[0] === "."
                      ? ((t = t.slice(1)), !0)
                      : t[0] === "^"
                      ? ((t = t.slice(1)), !1)
                      : Uc(e, t, r, s)
              )
            ? Nc(e, t, r, o, i, a, l)
            : (t === "true-value" ? (e._trueValue = r) : t === "false-value" && (e._falseValue = r),
              Mc(e, t, r, s));
    };
function Uc(e, t, n, r) {
    return r
        ? !!(t === "innerHTML" || t === "textContent" || (t in e && ms.test(t) && M(n)))
        : t === "spellcheck" ||
          t === "draggable" ||
          t === "translate" ||
          t === "form" ||
          (t === "list" && e.tagName === "INPUT") ||
          (t === "type" && e.tagName === "TEXTAREA") ||
          (ms.test(t) && X(n))
        ? !1
        : t in e;
}
const Kc = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
};
Na.props;
const Vc = re({ patchProp: Hc }, Sc);
let bs;
function Wc() {
    return bs || (bs = rc(Vc));
}
const zc = (...e) => {
    const t = Wc().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (r) => {
            const s = qc(r);
            if (!s) return;
            const o = t._component;
            !M(o) && !o.render && !o.template && (o.template = s.innerHTML), (s.innerHTML = "");
            const i = n(s, !1, s instanceof SVGElement);
            return (
                s instanceof Element &&
                    (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
                i
            );
        }),
        t
    );
};
function qc(e) {
    return X(e) ? document.querySelector(e) : e;
}
const Jc = "" + new URL("../vite.svg", import.meta.url).href,
    Yc = "" + new URL("vue-5532db34.svg", import.meta.url).href;
const Po = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [r, s] of t) n[r] = s;
        return n;
    },
    hn = (e) => (lo("data-v-a96fa91f"), (e = e()), fo(), e),
    Gc = { class: "card" },
    Xc = hn(() =>
        Z(
            "p",
            null,
            [rt(" Edit "), Z("code", null, "components/HelloWorld.vue"), rt(" to test HMR ")],
            -1
        )
    ),
    Zc = hn(() =>
        Z(
            "p",
            null,
            [
                rt(" Check out "),
                Z(
                    "a",
                    { href: "https://vuejs.org/guide/quick-start.html#local", target: "_blank" },
                    "create-vue"
                ),
                rt(", the official Vue + Vite starter "),
            ],
            -1
        )
    ),
    Qc = hn(() =>
        Z(
            "p",
            null,
            [
                rt(" Install "),
                Z(
                    "a",
                    { href: "https://github.com/johnsoncodehk/volar", target: "_blank" },
                    "Volar"
                ),
                rt(" in your IDE for a better DX "),
            ],
            -1
        )
    ),
    el = hn(() =>
        Z("p", { class: "read-the-docs" }, "Click on the Vite and Vue logos to learn more", -1)
    ),
    tl = {
        __name: "HelloWorld",
        props: { msg: String },
        setup(e) {
            const t = aa(0);
            return (n, r) => (
                Oo(),
                xo(
                    de,
                    null,
                    [
                        Z("h1", null, Vr(e.msg), 1),
                        Z("div", Gc, [
                            Z(
                                "button",
                                { type: "button", onClick: r[0] || (r[0] = (s) => t.value++) },
                                "count is " + Vr(t.value),
                                1
                            ),
                            Xc,
                        ]),
                        Zc,
                        Qc,
                        el,
                    ],
                    64
                )
            );
        },
    },
    nl = Po(tl, [["__scopeId", "data-v-a96fa91f"]]);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ro = function (e) {
        const t = [];
        let n = 0;
        for (let r = 0; r < e.length; r++) {
            let s = e.charCodeAt(r);
            s < 128
                ? (t[n++] = s)
                : s < 2048
                ? ((t[n++] = (s >> 6) | 192), (t[n++] = (s & 63) | 128))
                : (s & 64512) === 55296 &&
                  r + 1 < e.length &&
                  (e.charCodeAt(r + 1) & 64512) === 56320
                ? ((s = 65536 + ((s & 1023) << 10) + (e.charCodeAt(++r) & 1023)),
                  (t[n++] = (s >> 18) | 240),
                  (t[n++] = ((s >> 12) & 63) | 128),
                  (t[n++] = ((s >> 6) & 63) | 128),
                  (t[n++] = (s & 63) | 128))
                : ((t[n++] = (s >> 12) | 224),
                  (t[n++] = ((s >> 6) & 63) | 128),
                  (t[n++] = (s & 63) | 128));
        }
        return t;
    },
    rl = function (e) {
        const t = [];
        let n = 0,
            r = 0;
        for (; n < e.length; ) {
            const s = e[n++];
            if (s < 128) t[r++] = String.fromCharCode(s);
            else if (s > 191 && s < 224) {
                const o = e[n++];
                t[r++] = String.fromCharCode(((s & 31) << 6) | (o & 63));
            } else if (s > 239 && s < 365) {
                const o = e[n++],
                    i = e[n++],
                    a = e[n++],
                    l = (((s & 7) << 18) | ((o & 63) << 12) | ((i & 63) << 6) | (a & 63)) - 65536;
                (t[r++] = String.fromCharCode(55296 + (l >> 10))),
                    (t[r++] = String.fromCharCode(56320 + (l & 1023)));
            } else {
                const o = e[n++],
                    i = e[n++];
                t[r++] = String.fromCharCode(((s & 15) << 12) | ((o & 63) << 6) | (i & 63));
            }
        }
        return t.join("");
    },
    ko = {
        byteToCharMap_: null,
        charToByteMap_: null,
        byteToCharMapWebSafe_: null,
        charToByteMapWebSafe_: null,
        ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        get ENCODED_VALS() {
            return this.ENCODED_VALS_BASE + "+/=";
        },
        get ENCODED_VALS_WEBSAFE() {
            return this.ENCODED_VALS_BASE + "-_.";
        },
        HAS_NATIVE_SUPPORT: typeof atob == "function",
        encodeByteArray(e, t) {
            if (!Array.isArray(e)) throw Error("encodeByteArray takes an array as a parameter");
            this.init_();
            const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
                r = [];
            for (let s = 0; s < e.length; s += 3) {
                const o = e[s],
                    i = s + 1 < e.length,
                    a = i ? e[s + 1] : 0,
                    l = s + 2 < e.length,
                    u = l ? e[s + 2] : 0,
                    d = o >> 2,
                    y = ((o & 3) << 4) | (a >> 4);
                let E = ((a & 15) << 2) | (u >> 6),
                    A = u & 63;
                l || ((A = 64), i || (E = 64)), r.push(n[d], n[y], n[E], n[A]);
            }
            return r.join("");
        },
        encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(Ro(e), t);
        },
        decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : rl(this.decodeStringToByteArray(e, t));
        },
        decodeStringToByteArray(e, t) {
            this.init_();
            const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                r = [];
            for (let s = 0; s < e.length; ) {
                const o = n[e.charAt(s++)],
                    a = s < e.length ? n[e.charAt(s)] : 0;
                ++s;
                const u = s < e.length ? n[e.charAt(s)] : 64;
                ++s;
                const y = s < e.length ? n[e.charAt(s)] : 64;
                if ((++s, o == null || a == null || u == null || y == null)) throw Error();
                const E = (o << 2) | (a >> 4);
                if ((r.push(E), u !== 64)) {
                    const A = ((a << 4) & 240) | (u >> 2);
                    if ((r.push(A), y !== 64)) {
                        const B = ((u << 6) & 192) | y;
                        r.push(B);
                    }
                }
            }
            return r;
        },
        init_() {
            if (!this.byteToCharMap_) {
                (this.byteToCharMap_ = {}),
                    (this.charToByteMap_ = {}),
                    (this.byteToCharMapWebSafe_ = {}),
                    (this.charToByteMapWebSafe_ = {});
                for (let e = 0; e < this.ENCODED_VALS.length; e++)
                    (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
                        (this.charToByteMap_[this.byteToCharMap_[e]] = e),
                        (this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e)),
                        (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
                        e >= this.ENCODED_VALS_BASE.length &&
                            ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
                            (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
            }
        },
    },
    sl = function (e) {
        const t = Ro(e);
        return ko.encodeByteArray(t, !0);
    },
    Bo = function (e) {
        return sl(e).replace(/\./g, "");
    },
    ol = function (e) {
        try {
            return ko.decodeString(e, !0);
        } catch (t) {
            console.error("base64Decode failed: ", t);
        }
        return null;
    };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function il() {
    if (typeof self < "u") return self;
    if (typeof window < "u") return window;
    if (typeof global < "u") return global;
    throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const al = () => il().__FIREBASE_DEFAULTS__,
    cl = () => {
        if (typeof process > "u" || typeof process.env > "u") return;
        const e = {}.__FIREBASE_DEFAULTS__;
        if (e) return JSON.parse(e);
    },
    ll = () => {
        if (typeof document > "u") return;
        let e;
        try {
            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
        } catch {
            return;
        }
        const t = e && ol(e[1]);
        return t && JSON.parse(t);
    },
    fl = () => {
        try {
            return al() || cl() || ll();
        } catch (e) {
            console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
            return;
        }
    },
    ul = () => {
        var e;
        return (e = fl()) === null || e === void 0 ? void 0 : e.config;
    };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dl {
    constructor() {
        (this.reject = () => {}),
            (this.resolve = () => {}),
            (this.promise = new Promise((t, n) => {
                (this.resolve = t), (this.reject = n);
            }));
    }
    wrapCallback(t) {
        return (n, r) => {
            n ? this.reject(n) : this.resolve(r),
                typeof t == "function" &&
                    (this.promise.catch(() => {}), t.length === 1 ? t(n) : t(n, r));
        };
    }
}
function Fo() {
    try {
        return typeof indexedDB == "object";
    } catch {
        return !1;
    }
}
function $o() {
    return new Promise((e, t) => {
        try {
            let n = !0;
            const r = "validate-browser-context-for-indexeddb-analytics-module",
                s = self.indexedDB.open(r);
            (s.onsuccess = () => {
                s.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
            }),
                (s.onupgradeneeded = () => {
                    n = !1;
                }),
                (s.onerror = () => {
                    var o;
                    t(((o = s.error) === null || o === void 0 ? void 0 : o.message) || "");
                });
        } catch (n) {
            t(n);
        }
    });
}
function hl() {
    return !(typeof navigator > "u" || !navigator.cookieEnabled);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const pl = "FirebaseError";
class vt extends Error {
    constructor(t, n, r) {
        super(n),
            (this.code = t),
            (this.customData = r),
            (this.name = pl),
            Object.setPrototypeOf(this, vt.prototype),
            Error.captureStackTrace && Error.captureStackTrace(this, pn.prototype.create);
    }
}
class pn {
    constructor(t, n, r) {
        (this.service = t), (this.serviceName = n), (this.errors = r);
    }
    create(t, ...n) {
        const r = n[0] || {},
            s = `${this.service}/${t}`,
            o = this.errors[t],
            i = o ? gl(o, r) : "Error",
            a = `${this.serviceName}: ${i} (${s}).`;
        return new vt(s, a, r);
    }
}
function gl(e, t) {
    return e.replace(ml, (n, r) => {
        const s = t[r];
        return s != null ? String(s) : `<${r}?>`;
    });
}
const ml = /\{\$([^}]+)}/g;
function Zn(e, t) {
    if (e === t) return !0;
    const n = Object.keys(e),
        r = Object.keys(t);
    for (const s of n) {
        if (!r.includes(s)) return !1;
        const o = e[s],
            i = t[s];
        if (_s(o) && _s(i)) {
            if (!Zn(o, i)) return !1;
        } else if (o !== i) return !1;
    }
    for (const s of r) if (!n.includes(s)) return !1;
    return !0;
}
function _s(e) {
    return e !== null && typeof e == "object";
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ar(e) {
    return e && e._delegate ? e._delegate : e;
}
class Ve {
    constructor(t, n, r) {
        (this.name = t),
            (this.instanceFactory = n),
            (this.type = r),
            (this.multipleInstances = !1),
            (this.serviceProps = {}),
            (this.instantiationMode = "LAZY"),
            (this.onInstanceCreated = null);
    }
    setInstantiationMode(t) {
        return (this.instantiationMode = t), this;
    }
    setMultipleInstances(t) {
        return (this.multipleInstances = t), this;
    }
    setServiceProps(t) {
        return (this.serviceProps = t), this;
    }
    setInstanceCreatedCallback(t) {
        return (this.onInstanceCreated = t), this;
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ge = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bl {
    constructor(t, n) {
        (this.name = t),
            (this.container = n),
            (this.component = null),
            (this.instances = new Map()),
            (this.instancesDeferred = new Map()),
            (this.instancesOptions = new Map()),
            (this.onInitCallbacks = new Map());
    }
    get(t) {
        const n = this.normalizeInstanceIdentifier(t);
        if (!this.instancesDeferred.has(n)) {
            const r = new dl();
            if (
                (this.instancesDeferred.set(n, r),
                this.isInitialized(n) || this.shouldAutoInitialize())
            )
                try {
                    const s = this.getOrInitializeService({ instanceIdentifier: n });
                    s && r.resolve(s);
                } catch {}
        }
        return this.instancesDeferred.get(n).promise;
    }
    getImmediate(t) {
        var n;
        const r = this.normalizeInstanceIdentifier(t == null ? void 0 : t.identifier),
            s = (n = t == null ? void 0 : t.optional) !== null && n !== void 0 ? n : !1;
        if (this.isInitialized(r) || this.shouldAutoInitialize())
            try {
                return this.getOrInitializeService({ instanceIdentifier: r });
            } catch (o) {
                if (s) return null;
                throw o;
            }
        else {
            if (s) return null;
            throw Error(`Service ${this.name} is not available`);
        }
    }
    getComponent() {
        return this.component;
    }
    setComponent(t) {
        if (t.name !== this.name)
            throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
        if (this.component) throw Error(`Component for ${this.name} has already been provided`);
        if (((this.component = t), !!this.shouldAutoInitialize())) {
            if (yl(t))
                try {
                    this.getOrInitializeService({ instanceIdentifier: Ge });
                } catch {}
            for (const [n, r] of this.instancesDeferred.entries()) {
                const s = this.normalizeInstanceIdentifier(n);
                try {
                    const o = this.getOrInitializeService({ instanceIdentifier: s });
                    r.resolve(o);
                } catch {}
            }
        }
    }
    clearInstance(t = Ge) {
        this.instancesDeferred.delete(t), this.instancesOptions.delete(t), this.instances.delete(t);
    }
    async delete() {
        const t = Array.from(this.instances.values());
        await Promise.all([
            ...t.filter((n) => "INTERNAL" in n).map((n) => n.INTERNAL.delete()),
            ...t.filter((n) => "_delete" in n).map((n) => n._delete()),
        ]);
    }
    isComponentSet() {
        return this.component != null;
    }
    isInitialized(t = Ge) {
        return this.instances.has(t);
    }
    getOptions(t = Ge) {
        return this.instancesOptions.get(t) || {};
    }
    initialize(t = {}) {
        const { options: n = {} } = t,
            r = this.normalizeInstanceIdentifier(t.instanceIdentifier);
        if (this.isInitialized(r)) throw Error(`${this.name}(${r}) has already been initialized`);
        if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`);
        const s = this.getOrInitializeService({ instanceIdentifier: r, options: n });
        for (const [o, i] of this.instancesDeferred.entries()) {
            const a = this.normalizeInstanceIdentifier(o);
            r === a && i.resolve(s);
        }
        return s;
    }
    onInit(t, n) {
        var r;
        const s = this.normalizeInstanceIdentifier(n),
            o = (r = this.onInitCallbacks.get(s)) !== null && r !== void 0 ? r : new Set();
        o.add(t), this.onInitCallbacks.set(s, o);
        const i = this.instances.get(s);
        return (
            i && t(i, s),
            () => {
                o.delete(t);
            }
        );
    }
    invokeOnInitCallbacks(t, n) {
        const r = this.onInitCallbacks.get(n);
        if (r)
            for (const s of r)
                try {
                    s(t, n);
                } catch {}
    }
    getOrInitializeService({ instanceIdentifier: t, options: n = {} }) {
        let r = this.instances.get(t);
        if (
            !r &&
            this.component &&
            ((r = this.component.instanceFactory(this.container, {
                instanceIdentifier: _l(t),
                options: n,
            })),
            this.instances.set(t, r),
            this.instancesOptions.set(t, n),
            this.invokeOnInitCallbacks(r, t),
            this.component.onInstanceCreated)
        )
            try {
                this.component.onInstanceCreated(this.container, t, r);
            } catch {}
        return r || null;
    }
    normalizeInstanceIdentifier(t = Ge) {
        return this.component ? (this.component.multipleInstances ? t : Ge) : t;
    }
    shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT";
    }
}
function _l(e) {
    return e === Ge ? void 0 : e;
}
function yl(e) {
    return e.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class wl {
    constructor(t) {
        (this.name = t), (this.providers = new Map());
    }
    addComponent(t) {
        const n = this.getProvider(t.name);
        if (n.isComponentSet())
            throw new Error(`Component ${t.name} has already been registered with ${this.name}`);
        n.setComponent(t);
    }
    addOrOverwriteComponent(t) {
        this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
            this.addComponent(t);
    }
    getProvider(t) {
        if (this.providers.has(t)) return this.providers.get(t);
        const n = new bl(t, this);
        return this.providers.set(t, n), n;
    }
    getProviders() {
        return Array.from(this.providers.values());
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var H;
(function (e) {
    (e[(e.DEBUG = 0)] = "DEBUG"),
        (e[(e.VERBOSE = 1)] = "VERBOSE"),
        (e[(e.INFO = 2)] = "INFO"),
        (e[(e.WARN = 3)] = "WARN"),
        (e[(e.ERROR = 4)] = "ERROR"),
        (e[(e.SILENT = 5)] = "SILENT");
})(H || (H = {}));
const El = {
        debug: H.DEBUG,
        verbose: H.VERBOSE,
        info: H.INFO,
        warn: H.WARN,
        error: H.ERROR,
        silent: H.SILENT,
    },
    Il = H.INFO,
    vl = {
        [H.DEBUG]: "log",
        [H.VERBOSE]: "log",
        [H.INFO]: "info",
        [H.WARN]: "warn",
        [H.ERROR]: "error",
    },
    Cl = (e, t, ...n) => {
        if (t < e.logLevel) return;
        const r = new Date().toISOString(),
            s = vl[t];
        if (s) console[s](`[${r}]  ${e.name}:`, ...n);
        else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
    };
class Tl {
    constructor(t) {
        (this.name = t),
            (this._logLevel = Il),
            (this._logHandler = Cl),
            (this._userLogHandler = null);
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(t) {
        if (!(t in H)) throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
        this._logLevel = t;
    }
    setLogLevel(t) {
        this._logLevel = typeof t == "string" ? El[t] : t;
    }
    get logHandler() {
        return this._logHandler;
    }
    set logHandler(t) {
        if (typeof t != "function")
            throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = t;
    }
    get userLogHandler() {
        return this._userLogHandler;
    }
    set userLogHandler(t) {
        this._userLogHandler = t;
    }
    debug(...t) {
        this._userLogHandler && this._userLogHandler(this, H.DEBUG, ...t),
            this._logHandler(this, H.DEBUG, ...t);
    }
    log(...t) {
        this._userLogHandler && this._userLogHandler(this, H.VERBOSE, ...t),
            this._logHandler(this, H.VERBOSE, ...t);
    }
    info(...t) {
        this._userLogHandler && this._userLogHandler(this, H.INFO, ...t),
            this._logHandler(this, H.INFO, ...t);
    }
    warn(...t) {
        this._userLogHandler && this._userLogHandler(this, H.WARN, ...t),
            this._logHandler(this, H.WARN, ...t);
    }
    error(...t) {
        this._userLogHandler && this._userLogHandler(this, H.ERROR, ...t),
            this._logHandler(this, H.ERROR, ...t);
    }
}
const Al = (e, t) => t.some((n) => e instanceof n);
let ys, ws;
function Sl() {
    return ys || (ys = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Ol() {
    return (
        ws ||
        (ws = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ])
    );
}
const Lo = new WeakMap(),
    Qn = new WeakMap(),
    jo = new WeakMap(),
    xn = new WeakMap(),
    Sr = new WeakMap();
function xl(e) {
    const t = new Promise((n, r) => {
        const s = () => {
                e.removeEventListener("success", o), e.removeEventListener("error", i);
            },
            o = () => {
                n(Me(e.result)), s();
            },
            i = () => {
                r(e.error), s();
            };
        e.addEventListener("success", o), e.addEventListener("error", i);
    });
    return (
        t
            .then((n) => {
                n instanceof IDBCursor && Lo.set(n, e);
            })
            .catch(() => {}),
        Sr.set(t, e),
        t
    );
}
function Dl(e) {
    if (Qn.has(e)) return;
    const t = new Promise((n, r) => {
        const s = () => {
                e.removeEventListener("complete", o),
                    e.removeEventListener("error", i),
                    e.removeEventListener("abort", i);
            },
            o = () => {
                n(), s();
            },
            i = () => {
                r(e.error || new DOMException("AbortError", "AbortError")), s();
            };
        e.addEventListener("complete", o),
            e.addEventListener("error", i),
            e.addEventListener("abort", i);
    });
    Qn.set(e, t);
}
let er = {
    get(e, t, n) {
        if (e instanceof IDBTransaction) {
            if (t === "done") return Qn.get(e);
            if (t === "objectStoreNames") return e.objectStoreNames || jo.get(e);
            if (t === "store")
                return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
        }
        return Me(e[t]);
    },
    set(e, t, n) {
        return (e[t] = n), !0;
    },
    has(e, t) {
        return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
    },
};
function Ml(e) {
    er = e(er);
}
function Nl(e) {
    return e === IDBDatabase.prototype.transaction &&
        !("objectStoreNames" in IDBTransaction.prototype)
        ? function (t, ...n) {
              const r = e.call(Dn(this), t, ...n);
              return jo.set(r, t.sort ? t.sort() : [t]), Me(r);
          }
        : Ol().includes(e)
        ? function (...t) {
              return e.apply(Dn(this), t), Me(Lo.get(this));
          }
        : function (...t) {
              return Me(e.apply(Dn(this), t));
          };
}
function Pl(e) {
    return typeof e == "function"
        ? Nl(e)
        : (e instanceof IDBTransaction && Dl(e), Al(e, Sl()) ? new Proxy(e, er) : e);
}
function Me(e) {
    if (e instanceof IDBRequest) return xl(e);
    if (xn.has(e)) return xn.get(e);
    const t = Pl(e);
    return t !== e && (xn.set(e, t), Sr.set(t, e)), t;
}
const Dn = (e) => Sr.get(e);
function gn(e, t, { blocked: n, upgrade: r, blocking: s, terminated: o } = {}) {
    const i = indexedDB.open(e, t),
        a = Me(i);
    return (
        r &&
            i.addEventListener("upgradeneeded", (l) => {
                r(Me(i.result), l.oldVersion, l.newVersion, Me(i.transaction));
            }),
        n && i.addEventListener("blocked", () => n()),
        a
            .then((l) => {
                o && l.addEventListener("close", () => o()),
                    s && l.addEventListener("versionchange", () => s());
            })
            .catch(() => {}),
        a
    );
}
function Mn(e, { blocked: t } = {}) {
    const n = indexedDB.deleteDatabase(e);
    return t && n.addEventListener("blocked", () => t()), Me(n).then(() => {});
}
const Rl = ["get", "getKey", "getAll", "getAllKeys", "count"],
    kl = ["put", "add", "delete", "clear"],
    Nn = new Map();
function Es(e, t) {
    if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
    if (Nn.get(t)) return Nn.get(t);
    const n = t.replace(/FromIndex$/, ""),
        r = t !== n,
        s = kl.includes(n);
    if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || Rl.includes(n))) return;
    const o = async function (i, ...a) {
        const l = this.transaction(i, s ? "readwrite" : "readonly");
        let u = l.store;
        return r && (u = u.index(a.shift())), (await Promise.all([u[n](...a), s && l.done]))[0];
    };
    return Nn.set(t, o), o;
}
Ml((e) => ({
    ...e,
    get: (t, n, r) => Es(t, n) || e.get(t, n, r),
    has: (t, n) => !!Es(t, n) || e.has(t, n),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Bl {
    constructor(t) {
        this.container = t;
    }
    getPlatformInfoString() {
        return this.container
            .getProviders()
            .map((n) => {
                if (Fl(n)) {
                    const r = n.getImmediate();
                    return `${r.library}/${r.version}`;
                } else return null;
            })
            .filter((n) => n)
            .join(" ");
    }
}
function Fl(e) {
    const t = e.getComponent();
    return (t == null ? void 0 : t.type) === "VERSION";
}
const tr = "@firebase/app",
    Is = "0.9.3";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const st = new Tl("@firebase/app"),
    $l = "@firebase/app-compat",
    Ll = "@firebase/analytics-compat",
    jl = "@firebase/analytics",
    Hl = "@firebase/app-check-compat",
    Ul = "@firebase/app-check",
    Kl = "@firebase/auth",
    Vl = "@firebase/auth-compat",
    Wl = "@firebase/database",
    zl = "@firebase/database-compat",
    ql = "@firebase/functions",
    Jl = "@firebase/functions-compat",
    Yl = "@firebase/installations",
    Gl = "@firebase/installations-compat",
    Xl = "@firebase/messaging",
    Zl = "@firebase/messaging-compat",
    Ql = "@firebase/performance",
    ef = "@firebase/performance-compat",
    tf = "@firebase/remote-config",
    nf = "@firebase/remote-config-compat",
    rf = "@firebase/storage",
    sf = "@firebase/storage-compat",
    of = "@firebase/firestore",
    af = "@firebase/firestore-compat",
    cf = "firebase";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const nr = "[DEFAULT]",
    lf = {
        [tr]: "fire-core",
        [$l]: "fire-core-compat",
        [jl]: "fire-analytics",
        [Ll]: "fire-analytics-compat",
        [Ul]: "fire-app-check",
        [Hl]: "fire-app-check-compat",
        [Kl]: "fire-auth",
        [Vl]: "fire-auth-compat",
        [Wl]: "fire-rtdb",
        [zl]: "fire-rtdb-compat",
        [ql]: "fire-fn",
        [Jl]: "fire-fn-compat",
        [Yl]: "fire-iid",
        [Gl]: "fire-iid-compat",
        [Xl]: "fire-fcm",
        [Zl]: "fire-fcm-compat",
        [Ql]: "fire-perf",
        [ef]: "fire-perf-compat",
        [tf]: "fire-rc",
        [nf]: "fire-rc-compat",
        [rf]: "fire-gcs",
        [sf]: "fire-gcs-compat",
        [of]: "fire-fst",
        [af]: "fire-fst-compat",
        "fire-js": "fire-js",
        [cf]: "fire-js-all",
    };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Qt = new Map(),
    rr = new Map();
function ff(e, t) {
    try {
        e.container.addComponent(t);
    } catch (n) {
        st.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n);
    }
}
function ot(e) {
    const t = e.name;
    if (rr.has(t)) return st.debug(`There were multiple attempts to register component ${t}.`), !1;
    rr.set(t, e);
    for (const n of Qt.values()) ff(n, e);
    return !0;
}
function Or(e, t) {
    const n = e.container.getProvider("heartbeat").getImmediate({ optional: !0 });
    return n && n.triggerHeartbeat(), e.container.getProvider(t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const uf = {
        ["no-app"]:
            "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
        ["bad-app-name"]: "Illegal App name: '{$appName}",
        ["duplicate-app"]:
            "Firebase App named '{$appName}' already exists with different options or config",
        ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
        ["no-options"]: "Need to provide options, when not being deployed to hosting via source.",
        ["invalid-app-argument"]:
            "firebase.{$appName}() takes either no argument or a Firebase App instance.",
        ["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
        ["idb-open"]:
            "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
        ["idb-get"]:
            "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
        ["idb-set"]:
            "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
        ["idb-delete"]:
            "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    },
    je = new pn("app", "Firebase", uf);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class df {
    constructor(t, n, r) {
        (this._isDeleted = !1),
            (this._options = Object.assign({}, t)),
            (this._config = Object.assign({}, n)),
            (this._name = n.name),
            (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
            (this._container = r),
            this.container.addComponent(new Ve("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
        return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(t) {
        this.checkDestroyed(), (this._automaticDataCollectionEnabled = t);
    }
    get name() {
        return this.checkDestroyed(), this._name;
    }
    get options() {
        return this.checkDestroyed(), this._options;
    }
    get config() {
        return this.checkDestroyed(), this._config;
    }
    get container() {
        return this._container;
    }
    get isDeleted() {
        return this._isDeleted;
    }
    set isDeleted(t) {
        this._isDeleted = t;
    }
    checkDestroyed() {
        if (this.isDeleted) throw je.create("app-deleted", { appName: this._name });
    }
}
function Ho(e, t = {}) {
    let n = e;
    typeof t != "object" && (t = { name: t });
    const r = Object.assign({ name: nr, automaticDataCollectionEnabled: !1 }, t),
        s = r.name;
    if (typeof s != "string" || !s) throw je.create("bad-app-name", { appName: String(s) });
    if ((n || (n = ul()), !n)) throw je.create("no-options");
    const o = Qt.get(s);
    if (o) {
        if (Zn(n, o.options) && Zn(r, o.config)) return o;
        throw je.create("duplicate-app", { appName: s });
    }
    const i = new wl(s);
    for (const l of rr.values()) i.addComponent(l);
    const a = new df(n, r, i);
    return Qt.set(s, a), a;
}
function hf(e = nr) {
    const t = Qt.get(e);
    if (!t && e === nr) return Ho();
    if (!t) throw je.create("no-app", { appName: e });
    return t;
}
function He(e, t, n) {
    var r;
    let s = (r = lf[e]) !== null && r !== void 0 ? r : e;
    n && (s += `-${n}`);
    const o = s.match(/\s|\//),
        i = t.match(/\s|\//);
    if (o || i) {
        const a = [`Unable to register library "${s}" with version "${t}":`];
        o && a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),
            o && i && a.push("and"),
            i && a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
            st.warn(a.join(" "));
        return;
    }
    ot(new Ve(`${s}-version`, () => ({ library: s, version: t }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const pf = "firebase-heartbeat-database",
    gf = 1,
    kt = "firebase-heartbeat-store";
let Pn = null;
function Uo() {
    return (
        Pn ||
            (Pn = gn(pf, gf, {
                upgrade: (e, t) => {
                    switch (t) {
                        case 0:
                            e.createObjectStore(kt);
                    }
                },
            }).catch((e) => {
                throw je.create("idb-open", { originalErrorMessage: e.message });
            })),
        Pn
    );
}
async function mf(e) {
    try {
        return (await Uo()).transaction(kt).objectStore(kt).get(Ko(e));
    } catch (t) {
        if (t instanceof vt) st.warn(t.message);
        else {
            const n = je.create("idb-get", {
                originalErrorMessage: t == null ? void 0 : t.message,
            });
            st.warn(n.message);
        }
    }
}
async function vs(e, t) {
    try {
        const r = (await Uo()).transaction(kt, "readwrite");
        return await r.objectStore(kt).put(t, Ko(e)), r.done;
    } catch (n) {
        if (n instanceof vt) st.warn(n.message);
        else {
            const r = je.create("idb-set", {
                originalErrorMessage: n == null ? void 0 : n.message,
            });
            st.warn(r.message);
        }
    }
}
function Ko(e) {
    return `${e.name}!${e.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const bf = 1024,
    _f = 30 * 24 * 60 * 60 * 1e3;
class yf {
    constructor(t) {
        (this.container = t), (this._heartbeatsCache = null);
        const n = this.container.getProvider("app").getImmediate();
        (this._storage = new Ef(n)),
            (this._heartbeatsCachePromise = this._storage
                .read()
                .then((r) => ((this._heartbeatsCache = r), r)));
    }
    async triggerHeartbeat() {
        const n = this.container
                .getProvider("platform-logger")
                .getImmediate()
                .getPlatformInfoString(),
            r = Cs();
        if (
            (this._heartbeatsCache === null &&
                (this._heartbeatsCache = await this._heartbeatsCachePromise),
            !(
                this._heartbeatsCache.lastSentHeartbeatDate === r ||
                this._heartbeatsCache.heartbeats.some((s) => s.date === r)
            ))
        )
            return (
                this._heartbeatsCache.heartbeats.push({ date: r, agent: n }),
                (this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((s) => {
                    const o = new Date(s.date).valueOf();
                    return Date.now() - o <= _f;
                })),
                this._storage.overwrite(this._heartbeatsCache)
            );
    }
    async getHeartbeatsHeader() {
        if (
            (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
            this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0)
        )
            return "";
        const t = Cs(),
            { heartbeatsToSend: n, unsentEntries: r } = wf(this._heartbeatsCache.heartbeats),
            s = Bo(JSON.stringify({ version: 2, heartbeats: n }));
        return (
            (this._heartbeatsCache.lastSentHeartbeatDate = t),
            r.length > 0
                ? ((this._heartbeatsCache.heartbeats = r),
                  await this._storage.overwrite(this._heartbeatsCache))
                : ((this._heartbeatsCache.heartbeats = []),
                  this._storage.overwrite(this._heartbeatsCache)),
            s
        );
    }
}
function Cs() {
    return new Date().toISOString().substring(0, 10);
}
function wf(e, t = bf) {
    const n = [];
    let r = e.slice();
    for (const s of e) {
        const o = n.find((i) => i.agent === s.agent);
        if (o) {
            if ((o.dates.push(s.date), Ts(n) > t)) {
                o.dates.pop();
                break;
            }
        } else if ((n.push({ agent: s.agent, dates: [s.date] }), Ts(n) > t)) {
            n.pop();
            break;
        }
        r = r.slice(1);
    }
    return { heartbeatsToSend: n, unsentEntries: r };
}
class Ef {
    constructor(t) {
        (this.app = t), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
        return Fo()
            ? $o()
                  .then(() => !0)
                  .catch(() => !1)
            : !1;
    }
    async read() {
        return (await this._canUseIndexedDBPromise)
            ? (await mf(this.app)) || { heartbeats: [] }
            : { heartbeats: [] };
    }
    async overwrite(t) {
        var n;
        if (await this._canUseIndexedDBPromise) {
            const s = await this.read();
            return vs(this.app, {
                lastSentHeartbeatDate:
                    (n = t.lastSentHeartbeatDate) !== null && n !== void 0
                        ? n
                        : s.lastSentHeartbeatDate,
                heartbeats: t.heartbeats,
            });
        } else return;
    }
    async add(t) {
        var n;
        if (await this._canUseIndexedDBPromise) {
            const s = await this.read();
            return vs(this.app, {
                lastSentHeartbeatDate:
                    (n = t.lastSentHeartbeatDate) !== null && n !== void 0
                        ? n
                        : s.lastSentHeartbeatDate,
                heartbeats: [...s.heartbeats, ...t.heartbeats],
            });
        } else return;
    }
}
function Ts(e) {
    return Bo(JSON.stringify({ version: 2, heartbeats: e })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function If(e) {
    ot(new Ve("platform-logger", (t) => new Bl(t), "PRIVATE")),
        ot(new Ve("heartbeat", (t) => new yf(t), "PRIVATE")),
        He(tr, Is, e),
        He(tr, Is, "esm2017"),
        He("fire-js", "");
}
If("");
var vf = "firebase",
    Cf = "9.17.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ He(vf, Cf, "app");
const Vo = "@firebase/installations",
    xr = "0.6.3";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Wo = 1e4,
    zo = `w:${xr}`,
    qo = "FIS_v2",
    Tf = "https://firebaseinstallations.googleapis.com/v1",
    Af = 60 * 60 * 1e3,
    Sf = "installations",
    Of = "Installations";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const xf = {
        ["missing-app-config-values"]: 'Missing App configuration value: "{$valueName}"',
        ["not-registered"]: "Firebase Installation is not registered.",
        ["installation-not-found"]: "Firebase Installation not found.",
        ["request-failed"]:
            '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        ["app-offline"]: "Could not process request. Application offline.",
        ["delete-pending-registration"]:
            "Can't delete installation while there is a pending registration request.",
    },
    it = new pn(Sf, Of, xf);
function Jo(e) {
    return e instanceof vt && e.code.includes("request-failed");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Yo({ projectId: e }) {
    return `${Tf}/projects/${e}/installations`;
}
function Go(e) {
    return {
        token: e.token,
        requestStatus: 2,
        expiresIn: Mf(e.expiresIn),
        creationTime: Date.now(),
    };
}
async function Xo(e, t) {
    const r = (await t.json()).error;
    return it.create("request-failed", {
        requestName: e,
        serverCode: r.code,
        serverMessage: r.message,
        serverStatus: r.status,
    });
}
function Zo({ apiKey: e }) {
    return new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": e,
    });
}
function Df(e, { refreshToken: t }) {
    const n = Zo(e);
    return n.append("Authorization", Nf(t)), n;
}
async function Qo(e) {
    const t = await e();
    return t.status >= 500 && t.status < 600 ? e() : t;
}
function Mf(e) {
    return Number(e.replace("s", "000"));
}
function Nf(e) {
    return `${qo} ${e}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Pf({ appConfig: e, heartbeatServiceProvider: t }, { fid: n }) {
    const r = Yo(e),
        s = Zo(e),
        o = t.getImmediate({ optional: !0 });
    if (o) {
        const u = await o.getHeartbeatsHeader();
        u && s.append("x-firebase-client", u);
    }
    const i = { fid: n, authVersion: qo, appId: e.appId, sdkVersion: zo },
        a = { method: "POST", headers: s, body: JSON.stringify(i) },
        l = await Qo(() => fetch(r, a));
    if (l.ok) {
        const u = await l.json();
        return {
            fid: u.fid || n,
            registrationStatus: 2,
            refreshToken: u.refreshToken,
            authToken: Go(u.authToken),
        };
    } else throw await Xo("Create Installation", l);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ei(e) {
    return new Promise((t) => {
        setTimeout(t, e);
    });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Rf(e) {
    return btoa(String.fromCharCode(...e))
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const kf = /^[cdef][\w-]{21}$/,
    sr = "";
function Bf() {
    try {
        const e = new Uint8Array(17);
        (self.crypto || self.msCrypto).getRandomValues(e), (e[0] = 112 + (e[0] % 16));
        const n = Ff(e);
        return kf.test(n) ? n : sr;
    } catch {
        return sr;
    }
}
function Ff(e) {
    return Rf(e).substr(0, 22);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function mn(e) {
    return `${e.appName}!${e.appId}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ti = new Map();
function ni(e, t) {
    const n = mn(e);
    ri(n, t), $f(n, t);
}
function ri(e, t) {
    const n = ti.get(e);
    if (n) for (const r of n) r(t);
}
function $f(e, t) {
    const n = Lf();
    n && n.postMessage({ key: e, fid: t }), jf();
}
let et = null;
function Lf() {
    return (
        !et &&
            "BroadcastChannel" in self &&
            ((et = new BroadcastChannel("[Firebase] FID Change")),
            (et.onmessage = (e) => {
                ri(e.data.key, e.data.fid);
            })),
        et
    );
}
function jf() {
    ti.size === 0 && et && (et.close(), (et = null));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Hf = "firebase-installations-database",
    Uf = 1,
    at = "firebase-installations-store";
let Rn = null;
function Dr() {
    return (
        Rn ||
            (Rn = gn(Hf, Uf, {
                upgrade: (e, t) => {
                    switch (t) {
                        case 0:
                            e.createObjectStore(at);
                    }
                },
            })),
        Rn
    );
}
async function en(e, t) {
    const n = mn(e),
        s = (await Dr()).transaction(at, "readwrite"),
        o = s.objectStore(at),
        i = await o.get(n);
    return await o.put(t, n), await s.done, (!i || i.fid !== t.fid) && ni(e, t.fid), t;
}
async function si(e) {
    const t = mn(e),
        r = (await Dr()).transaction(at, "readwrite");
    await r.objectStore(at).delete(t), await r.done;
}
async function bn(e, t) {
    const n = mn(e),
        s = (await Dr()).transaction(at, "readwrite"),
        o = s.objectStore(at),
        i = await o.get(n),
        a = t(i);
    return (
        a === void 0 ? await o.delete(n) : await o.put(a, n),
        await s.done,
        a && (!i || i.fid !== a.fid) && ni(e, a.fid),
        a
    );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Mr(e) {
    let t;
    const n = await bn(e.appConfig, (r) => {
        const s = Kf(r),
            o = Vf(e, s);
        return (t = o.registrationPromise), o.installationEntry;
    });
    return n.fid === sr
        ? { installationEntry: await t }
        : { installationEntry: n, registrationPromise: t };
}
function Kf(e) {
    const t = e || { fid: Bf(), registrationStatus: 0 };
    return oi(t);
}
function Vf(e, t) {
    if (t.registrationStatus === 0) {
        if (!navigator.onLine) {
            const s = Promise.reject(it.create("app-offline"));
            return { installationEntry: t, registrationPromise: s };
        }
        const n = { fid: t.fid, registrationStatus: 1, registrationTime: Date.now() },
            r = Wf(e, n);
        return { installationEntry: n, registrationPromise: r };
    } else
        return t.registrationStatus === 1
            ? { installationEntry: t, registrationPromise: zf(e) }
            : { installationEntry: t };
}
async function Wf(e, t) {
    try {
        const n = await Pf(e, t);
        return en(e.appConfig, n);
    } catch (n) {
        throw (
            (Jo(n) && n.customData.serverCode === 409
                ? await si(e.appConfig)
                : await en(e.appConfig, { fid: t.fid, registrationStatus: 0 }),
            n)
        );
    }
}
async function zf(e) {
    let t = await As(e.appConfig);
    for (; t.registrationStatus === 1; ) await ei(100), (t = await As(e.appConfig));
    if (t.registrationStatus === 0) {
        const { installationEntry: n, registrationPromise: r } = await Mr(e);
        return r || n;
    }
    return t;
}
function As(e) {
    return bn(e, (t) => {
        if (!t) throw it.create("installation-not-found");
        return oi(t);
    });
}
function oi(e) {
    return qf(e) ? { fid: e.fid, registrationStatus: 0 } : e;
}
function qf(e) {
    return e.registrationStatus === 1 && e.registrationTime + Wo < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Jf({ appConfig: e, heartbeatServiceProvider: t }, n) {
    const r = Yf(e, n),
        s = Df(e, n),
        o = t.getImmediate({ optional: !0 });
    if (o) {
        const u = await o.getHeartbeatsHeader();
        u && s.append("x-firebase-client", u);
    }
    const i = { installation: { sdkVersion: zo, appId: e.appId } },
        a = { method: "POST", headers: s, body: JSON.stringify(i) },
        l = await Qo(() => fetch(r, a));
    if (l.ok) {
        const u = await l.json();
        return Go(u);
    } else throw await Xo("Generate Auth Token", l);
}
function Yf(e, { fid: t }) {
    return `${Yo(e)}/${t}/authTokens:generate`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Nr(e, t = !1) {
    let n;
    const r = await bn(e.appConfig, (o) => {
        if (!ii(o)) throw it.create("not-registered");
        const i = o.authToken;
        if (!t && Zf(i)) return o;
        if (i.requestStatus === 1) return (n = Gf(e, t)), o;
        {
            if (!navigator.onLine) throw it.create("app-offline");
            const a = eu(o);
            return (n = Xf(e, a)), a;
        }
    });
    return n ? await n : r.authToken;
}
async function Gf(e, t) {
    let n = await Ss(e.appConfig);
    for (; n.authToken.requestStatus === 1; ) await ei(100), (n = await Ss(e.appConfig));
    const r = n.authToken;
    return r.requestStatus === 0 ? Nr(e, t) : r;
}
function Ss(e) {
    return bn(e, (t) => {
        if (!ii(t)) throw it.create("not-registered");
        const n = t.authToken;
        return tu(n) ? Object.assign(Object.assign({}, t), { authToken: { requestStatus: 0 } }) : t;
    });
}
async function Xf(e, t) {
    try {
        const n = await Jf(e, t),
            r = Object.assign(Object.assign({}, t), { authToken: n });
        return await en(e.appConfig, r), n;
    } catch (n) {
        if (Jo(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
            await si(e.appConfig);
        else {
            const r = Object.assign(Object.assign({}, t), { authToken: { requestStatus: 0 } });
            await en(e.appConfig, r);
        }
        throw n;
    }
}
function ii(e) {
    return e !== void 0 && e.registrationStatus === 2;
}
function Zf(e) {
    return e.requestStatus === 2 && !Qf(e);
}
function Qf(e) {
    const t = Date.now();
    return t < e.creationTime || e.creationTime + e.expiresIn < t + Af;
}
function eu(e) {
    const t = { requestStatus: 1, requestTime: Date.now() };
    return Object.assign(Object.assign({}, e), { authToken: t });
}
function tu(e) {
    return e.requestStatus === 1 && e.requestTime + Wo < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function nu(e) {
    const t = e,
        { installationEntry: n, registrationPromise: r } = await Mr(t);
    return r ? r.catch(console.error) : Nr(t).catch(console.error), n.fid;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ru(e, t = !1) {
    const n = e;
    return await su(n), (await Nr(n, t)).token;
}
async function su(e) {
    const { registrationPromise: t } = await Mr(e);
    t && (await t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ou(e) {
    if (!e || !e.options) throw kn("App Configuration");
    if (!e.name) throw kn("App Name");
    const t = ["projectId", "apiKey", "appId"];
    for (const n of t) if (!e.options[n]) throw kn(n);
    return {
        appName: e.name,
        projectId: e.options.projectId,
        apiKey: e.options.apiKey,
        appId: e.options.appId,
    };
}
function kn(e) {
    return it.create("missing-app-config-values", { valueName: e });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const ai = "installations",
    iu = "installations-internal",
    au = (e) => {
        const t = e.getProvider("app").getImmediate(),
            n = ou(t),
            r = Or(t, "heartbeat");
        return {
            app: t,
            appConfig: n,
            heartbeatServiceProvider: r,
            _delete: () => Promise.resolve(),
        };
    },
    cu = (e) => {
        const t = e.getProvider("app").getImmediate(),
            n = Or(t, ai).getImmediate();
        return { getId: () => nu(n), getToken: (s) => ru(n, s) };
    };
function lu() {
    ot(new Ve(ai, au, "PUBLIC")), ot(new Ve(iu, cu, "PRIVATE"));
}
lu();
He(Vo, xr);
He(Vo, xr, "esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fu = "/safesay/firebase-messaging-sw.js",
    uu = "/safesay/firebase-cloud-messaging-push-scope",
    ci = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
    du = "https://fcmregistrations.googleapis.com/v1",
    li = "google.c.a.c_id",
    hu = "google.c.a.c_l",
    pu = "google.c.a.ts",
    gu = "google.c.a.e";
var Os;
(function (e) {
    (e[(e.DATA_MESSAGE = 1)] = "DATA_MESSAGE"),
        (e[(e.DISPLAY_NOTIFICATION = 3)] = "DISPLAY_NOTIFICATION");
})(Os || (Os = {}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */ var Bt;
(function (e) {
    (e.PUSH_RECEIVED = "push-received"), (e.NOTIFICATION_CLICKED = "notification-clicked");
})(Bt || (Bt = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function xe(e) {
    const t = new Uint8Array(e);
    return btoa(String.fromCharCode(...t))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
function mu(e) {
    const t = "=".repeat((4 - (e.length % 4)) % 4),
        n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"),
        r = atob(n),
        s = new Uint8Array(r.length);
    for (let o = 0; o < r.length; ++o) s[o] = r.charCodeAt(o);
    return s;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Bn = "fcm_token_details_db",
    bu = 5,
    xs = "fcm_token_object_Store";
async function _u(e) {
    if ("databases" in indexedDB && !(await indexedDB.databases()).map((o) => o.name).includes(Bn))
        return null;
    let t = null;
    return (
        (
            await gn(Bn, bu, {
                upgrade: async (r, s, o, i) => {
                    var a;
                    if (s < 2 || !r.objectStoreNames.contains(xs)) return;
                    const l = i.objectStore(xs),
                        u = await l.index("fcmSenderId").get(e);
                    if ((await l.clear(), !!u)) {
                        if (s === 2) {
                            const d = u;
                            if (!d.auth || !d.p256dh || !d.endpoint) return;
                            t = {
                                token: d.fcmToken,
                                createTime:
                                    (a = d.createTime) !== null && a !== void 0 ? a : Date.now(),
                                subscriptionOptions: {
                                    auth: d.auth,
                                    p256dh: d.p256dh,
                                    endpoint: d.endpoint,
                                    swScope: d.swScope,
                                    vapidKey:
                                        typeof d.vapidKey == "string" ? d.vapidKey : xe(d.vapidKey),
                                },
                            };
                        } else if (s === 3) {
                            const d = u;
                            t = {
                                token: d.fcmToken,
                                createTime: d.createTime,
                                subscriptionOptions: {
                                    auth: xe(d.auth),
                                    p256dh: xe(d.p256dh),
                                    endpoint: d.endpoint,
                                    swScope: d.swScope,
                                    vapidKey: xe(d.vapidKey),
                                },
                            };
                        } else if (s === 4) {
                            const d = u;
                            t = {
                                token: d.fcmToken,
                                createTime: d.createTime,
                                subscriptionOptions: {
                                    auth: xe(d.auth),
                                    p256dh: xe(d.p256dh),
                                    endpoint: d.endpoint,
                                    swScope: d.swScope,
                                    vapidKey: xe(d.vapidKey),
                                },
                            };
                        }
                    }
                },
            })
        ).close(),
        await Mn(Bn),
        await Mn("fcm_vapid_details_db"),
        await Mn("undefined"),
        yu(t) ? t : null
    );
}
function yu(e) {
    if (!e || !e.subscriptionOptions) return !1;
    const { subscriptionOptions: t } = e;
    return (
        typeof e.createTime == "number" &&
        e.createTime > 0 &&
        typeof e.token == "string" &&
        e.token.length > 0 &&
        typeof t.auth == "string" &&
        t.auth.length > 0 &&
        typeof t.p256dh == "string" &&
        t.p256dh.length > 0 &&
        typeof t.endpoint == "string" &&
        t.endpoint.length > 0 &&
        typeof t.swScope == "string" &&
        t.swScope.length > 0 &&
        typeof t.vapidKey == "string" &&
        t.vapidKey.length > 0
    );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const wu = "firebase-messaging-database",
    Eu = 1,
    ct = "firebase-messaging-store";
let Fn = null;
function Pr() {
    return (
        Fn ||
            (Fn = gn(wu, Eu, {
                upgrade: (e, t) => {
                    switch (t) {
                        case 0:
                            e.createObjectStore(ct);
                    }
                },
            })),
        Fn
    );
}
async function fi(e) {
    const t = kr(e),
        r = await (await Pr()).transaction(ct).objectStore(ct).get(t);
    if (r) return r;
    {
        const s = await _u(e.appConfig.senderId);
        if (s) return await Rr(e, s), s;
    }
}
async function Rr(e, t) {
    const n = kr(e),
        s = (await Pr()).transaction(ct, "readwrite");
    return await s.objectStore(ct).put(t, n), await s.done, t;
}
async function Iu(e) {
    const t = kr(e),
        r = (await Pr()).transaction(ct, "readwrite");
    await r.objectStore(ct).delete(t), await r.done;
}
function kr({ appConfig: e }) {
    return e.appId;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const vu = {
        ["missing-app-config-values"]: 'Missing App configuration value: "{$valueName}"',
        ["only-available-in-window"]: "This method is available in a Window context.",
        ["only-available-in-sw"]: "This method is available in a service worker context.",
        ["permission-default"]:
            "The notification permission was not granted and dismissed instead.",
        ["permission-blocked"]: "The notification permission was not granted and blocked instead.",
        ["unsupported-browser"]:
            "This browser doesn't support the API's required to use the Firebase SDK.",
        ["indexed-db-unsupported"]:
            "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
        ["failed-service-worker-registration"]:
            "We are unable to register the default service worker. {$browserErrorMessage}",
        ["token-subscribe-failed"]:
            "A problem occurred while subscribing the user to FCM: {$errorInfo}",
        ["token-subscribe-no-token"]: "FCM returned no token when subscribing the user to push.",
        ["token-unsubscribe-failed"]:
            "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
        ["token-update-failed"]:
            "A problem occurred while updating the user from FCM: {$errorInfo}",
        ["token-update-no-token"]: "FCM returned no token when updating the user to push.",
        ["use-sw-after-get-token"]:
            "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
        ["invalid-sw-registration"]:
            "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
        ["invalid-bg-handler"]: "The input to setBackgroundMessageHandler() must be a function.",
        ["invalid-vapid-key"]: "The public VAPID key must be a string.",
        ["use-vapid-key-after-get-token"]:
            "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",
    },
    ne = new pn("messaging", "Messaging", vu);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Cu(e, t) {
    const n = await Fr(e),
        r = di(t),
        s = { method: "POST", headers: n, body: JSON.stringify(r) };
    let o;
    try {
        o = await (await fetch(Br(e.appConfig), s)).json();
    } catch (i) {
        throw ne.create("token-subscribe-failed", { errorInfo: i == null ? void 0 : i.toString() });
    }
    if (o.error) {
        const i = o.error.message;
        throw ne.create("token-subscribe-failed", { errorInfo: i });
    }
    if (!o.token) throw ne.create("token-subscribe-no-token");
    return o.token;
}
async function Tu(e, t) {
    const n = await Fr(e),
        r = di(t.subscriptionOptions),
        s = { method: "PATCH", headers: n, body: JSON.stringify(r) };
    let o;
    try {
        o = await (await fetch(`${Br(e.appConfig)}/${t.token}`, s)).json();
    } catch (i) {
        throw ne.create("token-update-failed", { errorInfo: i == null ? void 0 : i.toString() });
    }
    if (o.error) {
        const i = o.error.message;
        throw ne.create("token-update-failed", { errorInfo: i });
    }
    if (!o.token) throw ne.create("token-update-no-token");
    return o.token;
}
async function ui(e, t) {
    const r = { method: "DELETE", headers: await Fr(e) };
    try {
        const o = await (await fetch(`${Br(e.appConfig)}/${t}`, r)).json();
        if (o.error) {
            const i = o.error.message;
            throw ne.create("token-unsubscribe-failed", { errorInfo: i });
        }
    } catch (s) {
        throw ne.create("token-unsubscribe-failed", {
            errorInfo: s == null ? void 0 : s.toString(),
        });
    }
}
function Br({ projectId: e }) {
    return `${du}/projects/${e}/registrations`;
}
async function Fr({ appConfig: e, installations: t }) {
    const n = await t.getToken();
    return new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": e.apiKey,
        "x-goog-firebase-installations-auth": `FIS ${n}`,
    });
}
function di({ p256dh: e, auth: t, endpoint: n, vapidKey: r }) {
    const s = { web: { endpoint: n, auth: t, p256dh: e } };
    return r !== ci && (s.web.applicationPubKey = r), s;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Au = 7 * 24 * 60 * 60 * 1e3;
async function Su(e) {
    const t = await Du(e.swRegistration, e.vapidKey),
        n = {
            vapidKey: e.vapidKey,
            swScope: e.swRegistration.scope,
            endpoint: t.endpoint,
            auth: xe(t.getKey("auth")),
            p256dh: xe(t.getKey("p256dh")),
        },
        r = await fi(e.firebaseDependencies);
    if (r) {
        if (Mu(r.subscriptionOptions, n))
            return Date.now() >= r.createTime + Au
                ? xu(e, { token: r.token, createTime: Date.now(), subscriptionOptions: n })
                : r.token;
        try {
            await ui(e.firebaseDependencies, r.token);
        } catch (s) {
            console.warn(s);
        }
        return Ds(e.firebaseDependencies, n);
    } else return Ds(e.firebaseDependencies, n);
}
async function Ou(e) {
    const t = await fi(e.firebaseDependencies);
    t && (await ui(e.firebaseDependencies, t.token), await Iu(e.firebaseDependencies));
    const n = await e.swRegistration.pushManager.getSubscription();
    return n ? n.unsubscribe() : !0;
}
async function xu(e, t) {
    try {
        const n = await Tu(e.firebaseDependencies, t),
            r = Object.assign(Object.assign({}, t), { token: n, createTime: Date.now() });
        return await Rr(e.firebaseDependencies, r), n;
    } catch (n) {
        throw (await Ou(e), n);
    }
}
async function Ds(e, t) {
    const r = { token: await Cu(e, t), createTime: Date.now(), subscriptionOptions: t };
    return await Rr(e, r), r.token;
}
async function Du(e, t) {
    const n = await e.pushManager.getSubscription();
    return n || e.pushManager.subscribe({ userVisibleOnly: !0, applicationServerKey: mu(t) });
}
function Mu(e, t) {
    const n = t.vapidKey === e.vapidKey,
        r = t.endpoint === e.endpoint,
        s = t.auth === e.auth,
        o = t.p256dh === e.p256dh;
    return n && r && s && o;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ms(e) {
    const t = { from: e.from, collapseKey: e.collapse_key, messageId: e.fcmMessageId };
    return Nu(t, e), Pu(t, e), Ru(t, e), t;
}
function Nu(e, t) {
    if (!t.notification) return;
    e.notification = {};
    const n = t.notification.title;
    n && (e.notification.title = n);
    const r = t.notification.body;
    r && (e.notification.body = r);
    const s = t.notification.image;
    s && (e.notification.image = s);
    const o = t.notification.icon;
    o && (e.notification.icon = o);
}
function Pu(e, t) {
    t.data && (e.data = t.data);
}
function Ru(e, t) {
    var n, r, s, o, i;
    if (!t.fcmOptions && !(!((n = t.notification) === null || n === void 0) && n.click_action))
        return;
    e.fcmOptions = {};
    const a =
        (s = (r = t.fcmOptions) === null || r === void 0 ? void 0 : r.link) !== null && s !== void 0
            ? s
            : (o = t.notification) === null || o === void 0
            ? void 0
            : o.click_action;
    a && (e.fcmOptions.link = a);
    const l = (i = t.fcmOptions) === null || i === void 0 ? void 0 : i.analytics_label;
    l && (e.fcmOptions.analyticsLabel = l);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ku(e) {
    return typeof e == "object" && !!e && li in e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ hi("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
hi("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
function hi(e, t) {
    const n = [];
    for (let r = 0; r < e.length; r++) n.push(e.charAt(r)), r < t.length && n.push(t.charAt(r));
    return n.join("");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Bu(e) {
    if (!e || !e.options) throw $n("App Configuration Object");
    if (!e.name) throw $n("App Name");
    const t = ["projectId", "apiKey", "appId", "messagingSenderId"],
        { options: n } = e;
    for (const r of t) if (!n[r]) throw $n(r);
    return {
        appName: e.name,
        projectId: n.projectId,
        apiKey: n.apiKey,
        appId: n.appId,
        senderId: n.messagingSenderId,
    };
}
function $n(e) {
    return ne.create("missing-app-config-values", { valueName: e });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fu {
    constructor(t, n, r) {
        (this.deliveryMetricsExportedToBigQueryEnabled = !1),
            (this.onBackgroundMessageHandler = null),
            (this.onMessageHandler = null),
            (this.logEvents = []),
            (this.isLogServiceStarted = !1);
        const s = Bu(t);
        this.firebaseDependencies = {
            app: t,
            appConfig: s,
            installations: n,
            analyticsProvider: r,
        };
    }
    _delete() {
        return Promise.resolve();
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function $u(e) {
    try {
        (e.swRegistration = await navigator.serviceWorker.register(fu, { scope: uu })),
            e.swRegistration.update().catch(() => {});
    } catch (t) {
        throw ne.create("failed-service-worker-registration", {
            browserErrorMessage: t == null ? void 0 : t.message,
        });
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Lu(e, t) {
    if ((!t && !e.swRegistration && (await $u(e)), !(!t && e.swRegistration))) {
        if (!(t instanceof ServiceWorkerRegistration)) throw ne.create("invalid-sw-registration");
        e.swRegistration = t;
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function ju(e, t) {
    t ? (e.vapidKey = t) : e.vapidKey || (e.vapidKey = ci);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function pi(e, t) {
    if (!navigator) throw ne.create("only-available-in-window");
    if (
        (Notification.permission === "default" && (await Notification.requestPermission()),
        Notification.permission !== "granted")
    )
        throw ne.create("permission-blocked");
    return (
        await ju(e, t == null ? void 0 : t.vapidKey),
        await Lu(e, t == null ? void 0 : t.serviceWorkerRegistration),
        Su(e)
    );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Hu(e, t, n) {
    const r = Uu(t);
    (await e.firebaseDependencies.analyticsProvider.get()).logEvent(r, {
        message_id: n[li],
        message_name: n[hu],
        message_time: n[pu],
        message_device_time: Math.floor(Date.now() / 1e3),
    });
}
function Uu(e) {
    switch (e) {
        case Bt.NOTIFICATION_CLICKED:
            return "notification_open";
        case Bt.PUSH_RECEIVED:
            return "notification_foreground";
        default:
            throw new Error();
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function Ku(e, t) {
    const n = t.data;
    if (!n.isFirebaseMessaging) return;
    e.onMessageHandler &&
        n.messageType === Bt.PUSH_RECEIVED &&
        (typeof e.onMessageHandler == "function"
            ? e.onMessageHandler(Ms(n))
            : e.onMessageHandler.next(Ms(n)));
    const r = n.data;
    ku(r) && r[gu] === "1" && (await Hu(e, n.messageType, r));
}
const Ns = "@firebase/messaging",
    Ps = "0.12.3";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Vu = (e) => {
        const t = new Fu(
            e.getProvider("app").getImmediate(),
            e.getProvider("installations-internal").getImmediate(),
            e.getProvider("analytics-internal")
        );
        return navigator.serviceWorker.addEventListener("message", (n) => Ku(t, n)), t;
    },
    Wu = (e) => {
        const t = e.getProvider("messaging").getImmediate();
        return { getToken: (r) => pi(t, r) };
    };
function zu() {
    ot(new Ve("messaging", Vu, "PUBLIC")),
        ot(new Ve("messaging-internal", Wu, "PRIVATE")),
        He(Ns, Ps),
        He(Ns, Ps, "esm2017");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ async function qu() {
    try {
        await $o();
    } catch {
        return !1;
    }
    return (
        typeof window < "u" &&
        Fo() &&
        hl() &&
        "serviceWorker" in navigator &&
        "PushManager" in window &&
        "Notification" in window &&
        "fetch" in window &&
        ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") &&
        PushSubscription.prototype.hasOwnProperty("getKey")
    );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ju(e, t) {
    if (!navigator) throw ne.create("only-available-in-window");
    return (
        (e.onMessageHandler = t),
        () => {
            e.onMessageHandler = null;
        }
    );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Yu(e = hf()) {
    return (
        qu().then(
            (t) => {
                if (!t) throw ne.create("unsupported-browser");
            },
            (t) => {
                throw ne.create("indexed-db-unsupported");
            }
        ),
        Or(Ar(e), "messaging").getImmediate()
    );
}
async function Gu(e, t) {
    return (e = Ar(e)), pi(e, t);
}
function Xu(e, t) {
    return (e = Ar(e)), Ju(e, t);
}
zu();
const Zu = (e) => (lo("data-v-a8c17eb9"), (e = e()), fo(), e),
    Qu = Zu(() =>
        Z(
            "div",
            null,
            [
                Z("a", { href: "https://vitejs.dev", target: "_blank" }, [
                    Z("img", { src: Jc, class: "logo", alt: "Vite logo" }),
                ]),
                Z("a", { href: "https://vuejs.org/", target: "_blank" }, [
                    Z("img", { src: Yc, class: "logo vue", alt: "Vue logo" }),
                ]),
            ],
            -1
        )
    ),
    ed = {
        __name: "App",
        setup(e) {
            Ho({
                apiKey: "AIzaSyCFBhdQUVNZbJ6MYtpbN-uie2YhenVGVZc",
                authDomain: "my-safesay.firebaseapp.com",
                projectId: "my-safesay",
                storageBucket: "my-safesay.appspot.com",
                messagingSenderId: "1091024668441",
                appId: "1:1091024668441:web:510e20b9e461b891b92788",
            });
            const n = Yu();
            return (
                Xu(n, (r) => {
                    console.log("Message received. ", r);
                }),
                Gu(n, {
                    vapidKey:
                        "BBgo2fPonG7QUtv4vODU4c_HLEwSUFVgcFUZlQbRO3t2w2h5ZVdeEJhpXm7PpNjXX87jUTjF0HfgKjtrelzmZVQ",
                })
                    .then((r) => {
                        r
                            ? console.log("Token is:", r)
                            : console.log(
                                  "No registration token available. Request permission to generate one."
                              );
                    })
                    .catch((r) => {
                        console.log("An error occurred while retrieving token. ", r);
                    }),
                (r, s) => (Oo(), xo(de, null, [Qu, Le(nl, { msg: "Vite + Vue" })], 64))
            );
        },
    },
    td = Po(ed, [["__scopeId", "data-v-a8c17eb9"]]);
zc(td).mount("#app");
