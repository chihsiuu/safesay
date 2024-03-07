(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver((s) => {
        for (const i of s)
            if (i.type === "childList")
                for (const o of i.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(s) {
        const i = {};
        return (
            s.integrity && (i.integrity = s.integrity),
            s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
            s.crossOrigin === "use-credentials"
                ? (i.credentials = "include")
                : s.crossOrigin === "anonymous"
                ? (i.credentials = "omit")
                : (i.credentials = "same-origin"),
            i
        );
    }
    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const i = n(s);
        fetch(s.href, i);
    }
})();
function rr(e, t) {
    const n = Object.create(null),
        r = e.split(",");
    for (let s = 0; s < r.length; s++) n[r[s]] = !0;
    return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function sr(e) {
    if (D(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                s = X(r) ? uo(r) : sr(r);
            if (s) for (const i in s) t[i] = s[i];
        }
        return t;
    } else {
        if (X(e)) return e;
        if (q(e)) return e;
    }
}
const co = /;(?![^(]*\))/g,
    lo = /:([^]+)/,
    fo = /\/\*.*?\*\//gs;
function uo(e) {
    const t = {};
    return (
        e
            .replace(fo, "")
            .split(co)
            .forEach((n) => {
                if (n) {
                    const r = n.split(lo);
                    r.length > 1 && (t[r[0].trim()] = r[1].trim());
                }
            }),
        t
    );
}
function ir(e) {
    let t = "";
    if (X(e)) t = e;
    else if (D(e))
        for (let n = 0; n < e.length; n++) {
            const r = ir(e[n]);
            r && (t += r + " ");
        }
    else if (q(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const ho = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    po = rr(ho);
function Ms(e) {
    return !!e || e === "";
}
const go = (e) =>
        X(e)
            ? e
            : e == null
            ? ""
            : D(e) || (q(e) && (e.toString === Rs || !M(e.toString)))
            ? JSON.stringify(e, Ns, 2)
            : String(e),
    Ns = (e, t) =>
        t && t.__v_isRef
            ? Ns(e, t.value)
            : dt(t)
            ? {
                  [`Map(${t.size})`]: [...t.entries()].reduce(
                      (n, [r, s]) => ((n[`${r} =>`] = s), n),
                      {}
                  ),
              }
            : Ps(t)
            ? { [`Set(${t.size})`]: [...t.values()] }
            : q(t) && !D(t) && !Bs(t)
            ? String(t)
            : t,
    K = {},
    ut = [],
    _e = () => {},
    mo = () => !1,
    bo = /^on[^a-z]/,
    en = (e) => bo.test(e),
    or = (e) => e.startsWith("onUpdate:"),
    ne = Object.assign,
    ar = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    _o = Object.prototype.hasOwnProperty,
    k = (e, t) => _o.call(e, t),
    D = Array.isArray,
    dt = (e) => tn(e) === "[object Map]",
    Ps = (e) => tn(e) === "[object Set]",
    M = (e) => typeof e == "function",
    X = (e) => typeof e == "string",
    cr = (e) => typeof e == "symbol",
    q = (e) => e !== null && typeof e == "object",
    ks = (e) => q(e) && M(e.then) && M(e.catch),
    Rs = Object.prototype.toString,
    tn = (e) => Rs.call(e),
    yo = (e) => tn(e).slice(8, -1),
    Bs = (e) => tn(e) === "[object Object]",
    lr = (e) => X(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Wt = rr(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    nn = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    wo = /-(\w)/g,
    gt = nn((e) => e.replace(wo, (t, n) => (n ? n.toUpperCase() : ""))),
    Eo = /\B([A-Z])/g,
    _t = nn((e) => e.replace(Eo, "-$1").toLowerCase()),
    Fs = nn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    _n = nn((e) => (e ? `on${Fs(e)}` : "")),
    St = (e, t) => !Object.is(e, t),
    yn = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    Jt = (e, t, n) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
    },
    Io = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let Kr;
const vo = () =>
    Kr ||
    (Kr =
        typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
            ? self
            : typeof window < "u"
            ? window
            : typeof global < "u"
            ? global
            : {});
let he;
class To {
    constructor(t = !1) {
        (this.detached = t),
            (this._active = !0),
            (this.effects = []),
            (this.cleanups = []),
            (this.parent = he),
            !t && he && (this.index = (he.scopes || (he.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    run(t) {
        if (this._active) {
            const n = he;
            try {
                return (he = this), t();
            } finally {
                he = n;
            }
        }
    }
    on() {
        he = this;
    }
    off() {
        he = this.parent;
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
function Co(e, t = he) {
    t && t.active && t.effects.push(e);
}
function Ao() {
    return he;
}
const fr = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    $s = (e) => (e.w & je) > 0,
    Ls = (e) => (e.n & je) > 0,
    So = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= je;
    },
    Oo = (e) => {
        const { deps: t } = e;
        if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
                const s = t[r];
                $s(s) && !Ls(s) ? s.delete(e) : (t[n++] = s), (s.w &= ~je), (s.n &= ~je);
            }
            t.length = n;
        }
    },
    Fn = new WeakMap();
let Tt = 0,
    je = 1;
const $n = 30;
let ge;
const Ze = Symbol(""),
    Ln = Symbol("");
class ur {
    constructor(t, n = null, r) {
        (this.fn = t),
            (this.scheduler = n),
            (this.active = !0),
            (this.deps = []),
            (this.parent = void 0),
            Co(this, r);
    }
    run() {
        if (!this.active) return this.fn();
        let t = ge,
            n = Be;
        for (; t; ) {
            if (t === this) return;
            t = t.parent;
        }
        try {
            return (
                (this.parent = ge),
                (ge = this),
                (Be = !0),
                (je = 1 << ++Tt),
                Tt <= $n ? So(this) : Ur(this),
                this.fn()
            );
        } finally {
            Tt <= $n && Oo(this),
                (je = 1 << --Tt),
                (ge = this.parent),
                (Be = n),
                (this.parent = void 0),
                this.deferStop && this.stop();
        }
    }
    stop() {
        ge === this
            ? (this.deferStop = !0)
            : this.active && (Ur(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function Ur(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let Be = !0;
const js = [];
function yt() {
    js.push(Be), (Be = !1);
}
function wt() {
    const e = js.pop();
    Be = e === void 0 ? !0 : e;
}
function oe(e, t, n) {
    if (Be && ge) {
        let r = Fn.get(e);
        r || Fn.set(e, (r = new Map()));
        let s = r.get(n);
        s || r.set(n, (s = fr())), Hs(s);
    }
}
function Hs(e, t) {
    let n = !1;
    Tt <= $n ? Ls(e) || ((e.n |= je), (n = !$s(e))) : (n = !e.has(ge)),
        n && (e.add(ge), ge.deps.push(e));
}
function Me(e, t, n, r, s, i) {
    const o = Fn.get(e);
    if (!o) return;
    let a = [];
    if (t === "clear") a = [...o.values()];
    else if (n === "length" && D(e)) {
        const l = Number(r);
        o.forEach((u, d) => {
            (d === "length" || d >= l) && a.push(u);
        });
    } else
        switch ((n !== void 0 && a.push(o.get(n)), t)) {
            case "add":
                D(e)
                    ? lr(n) && a.push(o.get("length"))
                    : (a.push(o.get(Ze)), dt(e) && a.push(o.get(Ln)));
                break;
            case "delete":
                D(e) || (a.push(o.get(Ze)), dt(e) && a.push(o.get(Ln)));
                break;
            case "set":
                dt(e) && a.push(o.get(Ze));
                break;
        }
    if (a.length === 1) a[0] && jn(a[0]);
    else {
        const l = [];
        for (const u of a) u && l.push(...u);
        jn(fr(l));
    }
}
function jn(e, t) {
    const n = D(e) ? e : [...e];
    for (const r of n) r.computed && Wr(r);
    for (const r of n) r.computed || Wr(r);
}
function Wr(e, t) {
    (e !== ge || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Do = rr("__proto__,__v_isRef,__isVue"),
    Ks = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter(cr)
    ),
    xo = dr(),
    Mo = dr(!1, !0),
    No = dr(!0),
    Vr = Po();
function Po() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...n) {
                const r = R(this);
                for (let i = 0, o = this.length; i < o; i++) oe(r, "get", i + "");
                const s = r[t](...n);
                return s === -1 || s === !1 ? r[t](...n.map(R)) : s;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...n) {
                yt();
                const r = R(this)[t].apply(this, n);
                return wt(), r;
            };
        }),
        e
    );
}
function ko(e) {
    const t = R(this);
    return oe(t, "has", e), t.hasOwnProperty(e);
}
function dr(e = !1, t = !1) {
    return function (r, s, i) {
        if (s === "__v_isReactive") return !e;
        if (s === "__v_isReadonly") return e;
        if (s === "__v_isShallow") return t;
        if (s === "__v_raw" && i === (e ? (t ? Go : zs) : t ? qs : Vs).get(r)) return r;
        const o = D(r);
        if (!e) {
            if (o && k(Vr, s)) return Reflect.get(Vr, s, i);
            if (s === "hasOwnProperty") return ko;
        }
        const a = Reflect.get(r, s, i);
        return (cr(s) ? Ks.has(s) : Do(s)) || (e || oe(r, "get", s), t)
            ? a
            : ee(a)
            ? o && lr(s)
                ? a
                : a.value
            : q(a)
            ? e
                ? Js(a)
                : gr(a)
            : a;
    };
}
const Ro = Us(),
    Bo = Us(!0);
function Us(e = !1) {
    return function (n, r, s, i) {
        let o = n[r];
        if (mt(o) && ee(o) && !ee(s)) return !1;
        if (!e && (!Yt(s) && !mt(s) && ((o = R(o)), (s = R(s))), !D(n) && ee(o) && !ee(s)))
            return (o.value = s), !0;
        const a = D(n) && lr(r) ? Number(r) < n.length : k(n, r),
            l = Reflect.set(n, r, s, i);
        return n === R(i) && (a ? St(s, o) && Me(n, "set", r, s) : Me(n, "add", r, s)), l;
    };
}
function Fo(e, t) {
    const n = k(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && Me(e, "delete", t, void 0), r;
}
function $o(e, t) {
    const n = Reflect.has(e, t);
    return (!cr(t) || !Ks.has(t)) && oe(e, "has", t), n;
}
function Lo(e) {
    return oe(e, "iterate", D(e) ? "length" : Ze), Reflect.ownKeys(e);
}
const Ws = { get: xo, set: Ro, deleteProperty: Fo, has: $o, ownKeys: Lo },
    jo = {
        get: No,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        },
    },
    Ho = ne({}, Ws, { get: Mo, set: Bo }),
    hr = (e) => e,
    rn = (e) => Reflect.getPrototypeOf(e);
function $t(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = R(e),
        i = R(t);
    n || (t !== i && oe(s, "get", t), oe(s, "get", i));
    const { has: o } = rn(s),
        a = r ? hr : n ? br : Ot;
    if (o.call(s, t)) return a(e.get(t));
    if (o.call(s, i)) return a(e.get(i));
    e !== s && e.get(t);
}
function Lt(e, t = !1) {
    const n = this.__v_raw,
        r = R(n),
        s = R(e);
    return (
        t || (e !== s && oe(r, "has", e), oe(r, "has", s)),
        e === s ? n.has(e) : n.has(e) || n.has(s)
    );
}
function jt(e, t = !1) {
    return (e = e.__v_raw), !t && oe(R(e), "iterate", Ze), Reflect.get(e, "size", e);
}
function qr(e) {
    e = R(e);
    const t = R(this);
    return rn(t).has.call(t, e) || (t.add(e), Me(t, "add", e, e)), this;
}
function zr(e, t) {
    t = R(t);
    const n = R(this),
        { has: r, get: s } = rn(n);
    let i = r.call(n, e);
    i || ((e = R(e)), (i = r.call(n, e)));
    const o = s.call(n, e);
    return n.set(e, t), i ? St(t, o) && Me(n, "set", e, t) : Me(n, "add", e, t), this;
}
function Jr(e) {
    const t = R(this),
        { has: n, get: r } = rn(t);
    let s = n.call(t, e);
    s || ((e = R(e)), (s = n.call(t, e))), r && r.call(t, e);
    const i = t.delete(e);
    return s && Me(t, "delete", e, void 0), i;
}
function Yr() {
    const e = R(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Me(e, "clear", void 0, void 0), n;
}
function Ht(e, t) {
    return function (r, s) {
        const i = this,
            o = i.__v_raw,
            a = R(o),
            l = t ? hr : e ? br : Ot;
        return !e && oe(a, "iterate", Ze), o.forEach((u, d) => r.call(s, l(u), l(d), i));
    };
}
function Kt(e, t, n) {
    return function (...r) {
        const s = this.__v_raw,
            i = R(s),
            o = dt(i),
            a = e === "entries" || (e === Symbol.iterator && o),
            l = e === "keys" && o,
            u = s[e](...r),
            d = n ? hr : t ? br : Ot;
        return (
            !t && oe(i, "iterate", l ? Ln : Ze),
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
function Ko() {
    const e = {
            get(i) {
                return $t(this, i);
            },
            get size() {
                return jt(this);
            },
            has: Lt,
            add: qr,
            set: zr,
            delete: Jr,
            clear: Yr,
            forEach: Ht(!1, !1),
        },
        t = {
            get(i) {
                return $t(this, i, !1, !0);
            },
            get size() {
                return jt(this);
            },
            has: Lt,
            add: qr,
            set: zr,
            delete: Jr,
            clear: Yr,
            forEach: Ht(!1, !0),
        },
        n = {
            get(i) {
                return $t(this, i, !0);
            },
            get size() {
                return jt(this, !0);
            },
            has(i) {
                return Lt.call(this, i, !0);
            },
            add: ke("add"),
            set: ke("set"),
            delete: ke("delete"),
            clear: ke("clear"),
            forEach: Ht(!0, !1),
        },
        r = {
            get(i) {
                return $t(this, i, !0, !0);
            },
            get size() {
                return jt(this, !0);
            },
            has(i) {
                return Lt.call(this, i, !0);
            },
            add: ke("add"),
            set: ke("set"),
            delete: ke("delete"),
            clear: ke("clear"),
            forEach: Ht(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
            (e[i] = Kt(i, !1, !1)),
                (n[i] = Kt(i, !0, !1)),
                (t[i] = Kt(i, !1, !0)),
                (r[i] = Kt(i, !0, !0));
        }),
        [e, n, t, r]
    );
}
const [Uo, Wo, Vo, qo] = Ko();
function pr(e, t) {
    const n = t ? (e ? qo : Vo) : e ? Wo : Uo;
    return (r, s, i) =>
        s === "__v_isReactive"
            ? !e
            : s === "__v_isReadonly"
            ? e
            : s === "__v_raw"
            ? r
            : Reflect.get(k(n, s) && s in r ? n : r, s, i);
}
const zo = { get: pr(!1, !1) },
    Jo = { get: pr(!1, !0) },
    Yo = { get: pr(!0, !1) },
    Vs = new WeakMap(),
    qs = new WeakMap(),
    zs = new WeakMap(),
    Go = new WeakMap();
function Xo(e) {
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
function Qo(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Xo(yo(e));
}
function gr(e) {
    return mt(e) ? e : mr(e, !1, Ws, zo, Vs);
}
function Zo(e) {
    return mr(e, !1, Ho, Jo, qs);
}
function Js(e) {
    return mr(e, !0, jo, Yo, zs);
}
function mr(e, t, n, r, s) {
    if (!q(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const i = s.get(e);
    if (i) return i;
    const o = Qo(e);
    if (o === 0) return e;
    const a = new Proxy(e, o === 2 ? r : n);
    return s.set(e, a), a;
}
function ht(e) {
    return mt(e) ? ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
function mt(e) {
    return !!(e && e.__v_isReadonly);
}
function Yt(e) {
    return !!(e && e.__v_isShallow);
}
function Ys(e) {
    return ht(e) || mt(e);
}
function R(e) {
    const t = e && e.__v_raw;
    return t ? R(t) : e;
}
function Gs(e) {
    return Jt(e, "__v_skip", !0), e;
}
const Ot = (e) => (q(e) ? gr(e) : e),
    br = (e) => (q(e) ? Js(e) : e);
function Xs(e) {
    Be && ge && ((e = R(e)), Hs(e.dep || (e.dep = fr())));
}
function Qs(e, t) {
    e = R(e);
    const n = e.dep;
    n && jn(n);
}
function ee(e) {
    return !!(e && e.__v_isRef === !0);
}
function ea(e) {
    return ta(e, !1);
}
function ta(e, t) {
    return ee(e) ? e : new na(e, t);
}
class na {
    constructor(t, n) {
        (this.__v_isShallow = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = n ? t : R(t)),
            (this._value = n ? t : Ot(t));
    }
    get value() {
        return Xs(this), this._value;
    }
    set value(t) {
        const n = this.__v_isShallow || Yt(t) || mt(t);
        (t = n ? t : R(t)),
            St(t, this._rawValue) &&
                ((this._rawValue = t), (this._value = n ? t : Ot(t)), Qs(this));
    }
}
function ra(e) {
    return ee(e) ? e.value : e;
}
const sa = {
    get: (e, t, n) => ra(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const s = e[t];
        return ee(s) && !ee(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
    },
};
function Zs(e) {
    return ht(e) ? e : new Proxy(e, sa);
}
var ei;
class ia {
    constructor(t, n, r, s) {
        (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this[ei] = !1),
            (this._dirty = !0),
            (this.effect = new ur(t, () => {
                this._dirty || ((this._dirty = !0), Qs(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !s),
            (this.__v_isReadonly = r);
    }
    get value() {
        const t = R(this);
        return (
            Xs(t),
            (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())),
            t._value
        );
    }
    set value(t) {
        this._setter(t);
    }
}
ei = "__v_isReadonly";
function oa(e, t, n = !1) {
    let r, s;
    const i = M(e);
    return i ? ((r = e), (s = _e)) : ((r = e.get), (s = e.set)), new ia(r, s, i || !s, n);
}
function Fe(e, t, n, r) {
    let s;
    try {
        s = r ? e(...r) : e();
    } catch (i) {
        sn(i, t, n);
    }
    return s;
}
function ue(e, t, n, r) {
    if (M(e)) {
        const i = Fe(e, t, n, r);
        return (
            i &&
                ks(i) &&
                i.catch((o) => {
                    sn(o, t, n);
                }),
            i
        );
    }
    const s = [];
    for (let i = 0; i < e.length; i++) s.push(ue(e[i], t, n, r));
    return s;
}
function sn(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let i = t.parent;
        const o = t.proxy,
            a = n;
        for (; i; ) {
            const u = i.ec;
            if (u) {
                for (let d = 0; d < u.length; d++) if (u[d](e, o, a) === !1) return;
            }
            i = i.parent;
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            Fe(l, null, 10, [e, o, a]);
            return;
        }
    }
    aa(e, n, s, r);
}
function aa(e, t, n, r = !0) {
    console.error(e);
}
let Dt = !1,
    Hn = !1;
const Z = [];
let Te = 0;
const pt = [];
let Se = null,
    Ye = 0;
const ti = Promise.resolve();
let _r = null;
function ca(e) {
    const t = _r || ti;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function la(e) {
    let t = Te + 1,
        n = Z.length;
    for (; t < n; ) {
        const r = (t + n) >>> 1;
        xt(Z[r]) < e ? (t = r + 1) : (n = r);
    }
    return t;
}
function yr(e) {
    (!Z.length || !Z.includes(e, Dt && e.allowRecurse ? Te + 1 : Te)) &&
        (e.id == null ? Z.push(e) : Z.splice(la(e.id), 0, e), ni());
}
function ni() {
    !Dt && !Hn && ((Hn = !0), (_r = ti.then(si)));
}
function fa(e) {
    const t = Z.indexOf(e);
    t > Te && Z.splice(t, 1);
}
function ua(e) {
    D(e) ? pt.push(...e) : (!Se || !Se.includes(e, e.allowRecurse ? Ye + 1 : Ye)) && pt.push(e),
        ni();
}
function Gr(e, t = Dt ? Te + 1 : 0) {
    for (; t < Z.length; t++) {
        const n = Z[t];
        n && n.pre && (Z.splice(t, 1), t--, n());
    }
}
function ri(e) {
    if (pt.length) {
        const t = [...new Set(pt)];
        if (((pt.length = 0), Se)) {
            Se.push(...t);
            return;
        }
        for (Se = t, Se.sort((n, r) => xt(n) - xt(r)), Ye = 0; Ye < Se.length; Ye++) Se[Ye]();
        (Se = null), (Ye = 0);
    }
}
const xt = (e) => (e.id == null ? 1 / 0 : e.id),
    da = (e, t) => {
        const n = xt(e) - xt(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1;
        }
        return n;
    };
function si(e) {
    (Hn = !1), (Dt = !0), Z.sort(da);
    const t = _e;
    try {
        for (Te = 0; Te < Z.length; Te++) {
            const n = Z[Te];
            n && n.active !== !1 && Fe(n, null, 14);
        }
    } finally {
        (Te = 0), (Z.length = 0), ri(), (Dt = !1), (_r = null), (Z.length || pt.length) && si();
    }
}
function ha(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || K;
    let s = n;
    const i = t.startsWith("update:"),
        o = i && t.slice(7);
    if (o && o in r) {
        const d = `${o === "modelValue" ? "model" : o}Modifiers`,
            { number: y, trim: E } = r[d] || K;
        E && (s = n.map((A) => (X(A) ? A.trim() : A))), y && (s = n.map(Io));
    }
    let a,
        l = r[(a = _n(t))] || r[(a = _n(gt(t)))];
    !l && i && (l = r[(a = _n(_t(t)))]), l && ue(l, e, 6, s);
    const u = r[a + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[a]) return;
        (e.emitted[a] = !0), ue(u, e, 6, s);
    }
}
function ii(e, t, n = !1) {
    const r = t.emitsCache,
        s = r.get(e);
    if (s !== void 0) return s;
    const i = e.emits;
    let o = {},
        a = !1;
    if (!M(e)) {
        const l = (u) => {
            const d = ii(u, t, !0);
            d && ((a = !0), ne(o, d));
        };
        !n && t.mixins.length && t.mixins.forEach(l),
            e.extends && l(e.extends),
            e.mixins && e.mixins.forEach(l);
    }
    return !i && !a
        ? (q(e) && r.set(e, null), null)
        : (D(i) ? i.forEach((l) => (o[l] = null)) : ne(o, i), q(e) && r.set(e, o), o);
}
function on(e, t) {
    return !e || !en(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, "")),
          k(e, t[0].toLowerCase() + t.slice(1)) || k(e, _t(t)) || k(e, t));
}
let me = null,
    an = null;
function Gt(e) {
    const t = me;
    return (me = e), (an = (e && e.type.__scopeId) || null), t;
}
function pa(e) {
    an = e;
}
function ga() {
    an = null;
}
function ma(e, t = me, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && is(-1);
        const i = Gt(t);
        let o;
        try {
            o = e(...s);
        } finally {
            Gt(i), r._d && is(1);
        }
        return o;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function wn(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: s,
        props: i,
        propsOptions: [o],
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
    let z, $;
    const le = Gt(e);
    try {
        if (n.shapeFlag & 4) {
            const U = s || r;
            (z = ve(d.call(U, U, y, i, A, E, B))), ($ = l);
        } else {
            const U = t;
            (z = ve(U.length > 1 ? U(i, { attrs: l, slots: a, emit: u }) : U(i, null))),
                ($ = t.props ? l : ba(l));
        }
    } catch (U) {
        (At.length = 0), sn(U, e, 1), (z = et(De));
    }
    let x = z;
    if ($ && S !== !1) {
        const U = Object.keys($),
            { shapeFlag: Q } = x;
        U.length && Q & 7 && (o && U.some(or) && ($ = _a($, o)), (x = He(x, $)));
    }
    return (
        n.dirs && ((x = He(x)), (x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs)),
        n.transition && (x.transition = n.transition),
        (z = x),
        Gt(le),
        z
    );
}
const ba = (e) => {
        let t;
        for (const n in e) (n === "class" || n === "style" || en(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    _a = (e, t) => {
        const n = {};
        for (const r in e) (!or(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n;
    };
function ya(e, t, n) {
    const { props: r, children: s, component: i } = e,
        { props: o, children: a, patchFlag: l } = t,
        u = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return r ? Xr(r, o, u) : !!o;
        if (l & 8) {
            const d = t.dynamicProps;
            for (let y = 0; y < d.length; y++) {
                const E = d[y];
                if (o[E] !== r[E] && !on(u, E)) return !0;
            }
        }
    } else
        return (s || a) && (!a || !a.$stable)
            ? !0
            : r === o
            ? !1
            : r
            ? o
                ? Xr(r, o, u)
                : !0
            : !!o;
    return !1;
}
function Xr(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const i = r[s];
        if (t[i] !== e[i] && !on(n, i)) return !0;
    }
    return !1;
}
function wa({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ea = (e) => e.__isSuspense;
function Ia(e, t) {
    t && t.pendingBranch ? (D(e) ? t.effects.push(...e) : t.effects.push(e)) : ua(e);
}
function va(e, t) {
    if (Y) {
        let n = Y.provides;
        const r = Y.parent && Y.parent.provides;
        r === n && (n = Y.provides = Object.create(r)), (n[e] = t);
    }
}
function Vt(e, t, n = !1) {
    const r = Y || me;
    if (r) {
        const s =
            r.parent == null
                ? r.vnode.appContext && r.vnode.appContext.provides
                : r.parent.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && M(t) ? t.call(r.proxy) : t;
    }
}
const Ut = {};
function En(e, t, n) {
    return oi(e, t, n);
}
function oi(e, t, { immediate: n, deep: r, flush: s, onTrack: i, onTrigger: o } = K) {
    const a = Ao() === (Y == null ? void 0 : Y.scope) ? Y : null;
    let l,
        u = !1,
        d = !1;
    if (
        (ee(e)
            ? ((l = () => e.value), (u = Yt(e)))
            : ht(e)
            ? ((l = () => e), (r = !0))
            : D(e)
            ? ((d = !0),
              (u = e.some((x) => ht(x) || Yt(x))),
              (l = () =>
                  e.map((x) => {
                      if (ee(x)) return x.value;
                      if (ht(x)) return ft(x);
                      if (M(x)) return Fe(x, a, 2);
                  })))
            : M(e)
            ? t
                ? (l = () => Fe(e, a, 2))
                : (l = () => {
                      if (!(a && a.isUnmounted)) return y && y(), ue(e, a, 3, [E]);
                  })
            : (l = _e),
        t && r)
    ) {
        const x = l;
        l = () => ft(x());
    }
    let y,
        E = (x) => {
            y = $.onStop = () => {
                Fe(x, a, 4);
            };
        },
        A;
    if (Pt)
        if (((E = _e), t ? n && ue(t, a, 3, [l(), d ? [] : void 0, E]) : l(), s === "sync")) {
            const x = Ic();
            A = x.__watcherHandles || (x.__watcherHandles = []);
        } else return _e;
    let B = d ? new Array(e.length).fill(Ut) : Ut;
    const S = () => {
        if ($.active)
            if (t) {
                const x = $.run();
                (r || u || (d ? x.some((U, Q) => St(U, B[Q])) : St(x, B))) &&
                    (y && y(),
                    ue(t, a, 3, [x, B === Ut ? void 0 : d && B[0] === Ut ? [] : B, E]),
                    (B = x));
            } else $.run();
    };
    S.allowRecurse = !!t;
    let z;
    s === "sync"
        ? (z = S)
        : s === "post"
        ? (z = () => ie(S, a && a.suspense))
        : ((S.pre = !0), a && (S.id = a.uid), (z = () => yr(S)));
    const $ = new ur(l, z);
    t ? (n ? S() : (B = $.run())) : s === "post" ? ie($.run.bind($), a && a.suspense) : $.run();
    const le = () => {
        $.stop(), a && a.scope && ar(a.scope.effects, $);
    };
    return A && A.push(le), le;
}
function Ta(e, t, n) {
    const r = this.proxy,
        s = X(e) ? (e.includes(".") ? ai(r, e) : () => r[e]) : e.bind(r, r);
    let i;
    M(t) ? (i = t) : ((i = t.handler), (n = t));
    const o = Y;
    bt(this);
    const a = oi(s, i.bind(r), n);
    return o ? bt(o) : tt(), a;
}
function ai(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r;
    };
}
function ft(e, t) {
    if (!q(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), ee(e))) ft(e.value, t);
    else if (D(e)) for (let n = 0; n < e.length; n++) ft(e[n], t);
    else if (Ps(e) || dt(e))
        e.forEach((n) => {
            ft(n, t);
        });
    else if (Bs(e)) for (const n in e) ft(e[n], t);
    return e;
}
function Ca() {
    const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
    return (
        ui(() => {
            e.isMounted = !0;
        }),
        di(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const fe = [Function, Array],
    Aa = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: fe,
            onEnter: fe,
            onAfterEnter: fe,
            onEnterCancelled: fe,
            onBeforeLeave: fe,
            onLeave: fe,
            onAfterLeave: fe,
            onLeaveCancelled: fe,
            onBeforeAppear: fe,
            onAppear: fe,
            onAfterAppear: fe,
            onAppearCancelled: fe,
        },
        setup(e, { slots: t }) {
            const n = pc(),
                r = Ca();
            let s;
            return () => {
                const i = t.default && li(t.default(), !0);
                if (!i || !i.length) return;
                let o = i[0];
                if (i.length > 1) {
                    for (const S of i)
                        if (S.type !== De) {
                            o = S;
                            break;
                        }
                }
                const a = R(e),
                    { mode: l } = a;
                if (r.isLeaving) return In(o);
                const u = Qr(o);
                if (!u) return In(o);
                const d = Kn(u, a, r, n);
                Un(u, d);
                const y = n.subTree,
                    E = y && Qr(y);
                let A = !1;
                const { getTransitionKey: B } = u.type;
                if (B) {
                    const S = B();
                    s === void 0 ? (s = S) : S !== s && ((s = S), (A = !0));
                }
                if (E && E.type !== De && (!Ge(u, E) || A)) {
                    const S = Kn(E, a, r, n);
                    if ((Un(E, S), l === "out-in"))
                        return (
                            (r.isLeaving = !0),
                            (S.afterLeave = () => {
                                (r.isLeaving = !1), n.update.active !== !1 && n.update();
                            }),
                            In(o)
                        );
                    l === "in-out" &&
                        u.type !== De &&
                        (S.delayLeave = (z, $, le) => {
                            const x = ci(r, E);
                            (x[String(E.key)] = E),
                                (z._leaveCb = () => {
                                    $(), (z._leaveCb = void 0), delete d.delayedLeave;
                                }),
                                (d.delayedLeave = le);
                        });
                }
                return o;
            };
        },
    },
    Sa = Aa;
function ci(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Kn(e, t, n, r) {
    const {
            appear: s,
            mode: i,
            persisted: o = !1,
            onBeforeEnter: a,
            onEnter: l,
            onAfterEnter: u,
            onEnterCancelled: d,
            onBeforeLeave: y,
            onLeave: E,
            onAfterLeave: A,
            onLeaveCancelled: B,
            onBeforeAppear: S,
            onAppear: z,
            onAfterAppear: $,
            onAppearCancelled: le,
        } = t,
        x = String(e.key),
        U = ci(n, e),
        Q = (N, G) => {
            N && ue(N, r, 9, G);
        },
        at = (N, G) => {
            const W = G[1];
            Q(N, G), D(N) ? N.every((ae) => ae.length <= 1) && W() : N.length <= 1 && W();
        },
        Pe = {
            mode: i,
            persisted: o,
            beforeEnter(N) {
                let G = a;
                if (!n.isMounted)
                    if (s) G = S || a;
                    else return;
                N._leaveCb && N._leaveCb(!0);
                const W = U[x];
                W && Ge(e, W) && W.el._leaveCb && W.el._leaveCb(), Q(G, [N]);
            },
            enter(N) {
                let G = l,
                    W = u,
                    ae = d;
                if (!n.isMounted)
                    if (s) (G = z || l), (W = $ || u), (ae = le || d);
                    else return;
                let ye = !1;
                const Ce = (N._enterCb = (It) => {
                    ye ||
                        ((ye = !0),
                        It ? Q(ae, [N]) : Q(W, [N]),
                        Pe.delayedLeave && Pe.delayedLeave(),
                        (N._enterCb = void 0));
                });
                G ? at(G, [N, Ce]) : Ce();
            },
            leave(N, G) {
                const W = String(e.key);
                if ((N._enterCb && N._enterCb(!0), n.isUnmounting)) return G();
                Q(y, [N]);
                let ae = !1;
                const ye = (N._leaveCb = (Ce) => {
                    ae ||
                        ((ae = !0),
                        G(),
                        Ce ? Q(B, [N]) : Q(A, [N]),
                        (N._leaveCb = void 0),
                        U[W] === e && delete U[W]);
                });
                (U[W] = e), E ? at(E, [N, ye]) : ye();
            },
            clone(N) {
                return Kn(N, t, n, r);
            },
        };
    return Pe;
}
function In(e) {
    if (cn(e)) return (e = He(e)), (e.children = null), e;
}
function Qr(e) {
    return cn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Un(e, t) {
    e.shapeFlag & 6 && e.component
        ? Un(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function li(e, t = !1, n) {
    let r = [],
        s = 0;
    for (let i = 0; i < e.length; i++) {
        let o = e[i];
        const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
        o.type === pe
            ? (o.patchFlag & 128 && s++, (r = r.concat(li(o.children, t, a))))
            : (t || o.type !== De) && r.push(a != null ? He(o, { key: a }) : o);
    }
    if (s > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
    return r;
}
const qt = (e) => !!e.type.__asyncLoader,
    cn = (e) => e.type.__isKeepAlive;
function Oa(e, t) {
    fi(e, "a", t);
}
function Da(e, t) {
    fi(e, "da", t);
}
function fi(e, t, n = Y) {
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
    if ((ln(t, r, n), n)) {
        let s = n.parent;
        for (; s && s.parent; ) cn(s.parent.vnode) && xa(r, t, n, s), (s = s.parent);
    }
}
function xa(e, t, n, r) {
    const s = ln(t, e, r, !0);
    hi(() => {
        ar(r[t], s);
    }, n);
}
function ln(e, t, n = Y, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            i =
                t.__weh ||
                (t.__weh = (...o) => {
                    if (n.isUnmounted) return;
                    yt(), bt(n);
                    const a = ue(t, n, e, o);
                    return tt(), wt(), a;
                });
        return r ? s.unshift(i) : s.push(i), i;
    }
}
const Ne =
        (e) =>
        (t, n = Y) =>
            (!Pt || e === "sp") && ln(e, (...r) => t(...r), n),
    Ma = Ne("bm"),
    ui = Ne("m"),
    Na = Ne("bu"),
    Pa = Ne("u"),
    di = Ne("bum"),
    hi = Ne("um"),
    ka = Ne("sp"),
    Ra = Ne("rtg"),
    Ba = Ne("rtc");
function Fa(e, t = Y) {
    ln("ec", e, t);
}
function Ve(e, t, n, r) {
    const s = e.dirs,
        i = t && t.dirs;
    for (let o = 0; o < s.length; o++) {
        const a = s[o];
        i && (a.oldValue = i[o].value);
        let l = a.dir[r];
        l && (yt(), ue(l, n, 8, [e.el, a, e, t]), wt());
    }
}
const $a = Symbol(),
    Wn = (e) => (e ? (vi(e) ? vr(e) || e.proxy : Wn(e.parent)) : null),
    Ct = ne(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Wn(e.parent),
        $root: (e) => Wn(e.root),
        $emit: (e) => e.emit,
        $options: (e) => wr(e),
        $forceUpdate: (e) => e.f || (e.f = () => yr(e.update)),
        $nextTick: (e) => e.n || (e.n = ca.bind(e.proxy)),
        $watch: (e) => Ta.bind(e),
    }),
    vn = (e, t) => e !== K && !e.__isScriptSetup && k(e, t),
    La = {
        get({ _: e }, t) {
            const {
                ctx: n,
                setupState: r,
                data: s,
                props: i,
                accessCache: o,
                type: a,
                appContext: l,
            } = e;
            let u;
            if (t[0] !== "$") {
                const A = o[t];
                if (A !== void 0)
                    switch (A) {
                        case 1:
                            return r[t];
                        case 2:
                            return s[t];
                        case 4:
                            return n[t];
                        case 3:
                            return i[t];
                    }
                else {
                    if (vn(r, t)) return (o[t] = 1), r[t];
                    if (s !== K && k(s, t)) return (o[t] = 2), s[t];
                    if ((u = e.propsOptions[0]) && k(u, t)) return (o[t] = 3), i[t];
                    if (n !== K && k(n, t)) return (o[t] = 4), n[t];
                    Vn && (o[t] = 0);
                }
            }
            const d = Ct[t];
            let y, E;
            if (d) return t === "$attrs" && oe(e, "get", t), d(e);
            if ((y = a.__cssModules) && (y = y[t])) return y;
            if (n !== K && k(n, t)) return (o[t] = 4), n[t];
            if (((E = l.config.globalProperties), k(E, t))) return E[t];
        },
        set({ _: e }, t, n) {
            const { data: r, setupState: s, ctx: i } = e;
            return vn(s, t)
                ? ((s[t] = n), !0)
                : r !== K && k(r, t)
                ? ((r[t] = n), !0)
                : k(e.props, t) || (t[0] === "$" && t.slice(1) in e)
                ? !1
                : ((i[t] = n), !0);
        },
        has(
            {
                _: {
                    data: e,
                    setupState: t,
                    accessCache: n,
                    ctx: r,
                    appContext: s,
                    propsOptions: i,
                },
            },
            o
        ) {
            let a;
            return (
                !!n[o] ||
                (e !== K && k(e, o)) ||
                vn(t, o) ||
                ((a = i[0]) && k(a, o)) ||
                k(r, o) ||
                k(Ct, o) ||
                k(s.config.globalProperties, o)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null
                    ? (e._.accessCache[t] = 0)
                    : k(n, "value") && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
let Vn = !0;
function ja(e) {
    const t = wr(e),
        n = e.proxy,
        r = e.ctx;
    (Vn = !1), t.beforeCreate && Zr(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: i,
        methods: o,
        watch: a,
        provide: l,
        inject: u,
        created: d,
        beforeMount: y,
        mounted: E,
        beforeUpdate: A,
        updated: B,
        activated: S,
        deactivated: z,
        beforeDestroy: $,
        beforeUnmount: le,
        destroyed: x,
        unmounted: U,
        render: Q,
        renderTracked: at,
        renderTriggered: Pe,
        errorCaptured: N,
        serverPrefetch: G,
        expose: W,
        inheritAttrs: ae,
        components: ye,
        directives: Ce,
        filters: It,
    } = t;
    if ((u && Ha(u, r, null, e.appContext.config.unwrapInjectedRef), o))
        for (const V in o) {
            const L = o[V];
            M(L) && (r[V] = L.bind(n));
        }
    if (s) {
        const V = s.call(n, n);
        q(V) && (e.data = gr(V));
    }
    if (((Vn = !0), i))
        for (const V in i) {
            const L = i[V],
                Ue = M(L) ? L.bind(n, n) : M(L.get) ? L.get.bind(n, n) : _e,
                Bt = !M(L) && M(L.set) ? L.set.bind(n) : _e,
                We = wc({ get: Ue, set: Bt });
            Object.defineProperty(r, V, {
                enumerable: !0,
                configurable: !0,
                get: () => We.value,
                set: (we) => (We.value = we),
            });
        }
    if (a) for (const V in a) pi(a[V], r, n, V);
    if (l) {
        const V = M(l) ? l.call(n) : l;
        Reflect.ownKeys(V).forEach((L) => {
            va(L, V[L]);
        });
    }
    d && Zr(d, e, "c");
    function re(V, L) {
        D(L) ? L.forEach((Ue) => V(Ue.bind(n))) : L && V(L.bind(n));
    }
    if (
        (re(Ma, y),
        re(ui, E),
        re(Na, A),
        re(Pa, B),
        re(Oa, S),
        re(Da, z),
        re(Fa, N),
        re(Ba, at),
        re(Ra, Pe),
        re(di, le),
        re(hi, U),
        re(ka, G),
        D(W))
    )
        if (W.length) {
            const V = e.exposed || (e.exposed = {});
            W.forEach((L) => {
                Object.defineProperty(V, L, { get: () => n[L], set: (Ue) => (n[L] = Ue) });
            });
        } else e.exposed || (e.exposed = {});
    Q && e.render === _e && (e.render = Q),
        ae != null && (e.inheritAttrs = ae),
        ye && (e.components = ye),
        Ce && (e.directives = Ce);
}
function Ha(e, t, n = _e, r = !1) {
    D(e) && (e = qn(e));
    for (const s in e) {
        const i = e[s];
        let o;
        q(i)
            ? "default" in i
                ? (o = Vt(i.from || s, i.default, !0))
                : (o = Vt(i.from || s))
            : (o = Vt(i)),
            ee(o) && r
                ? Object.defineProperty(t, s, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => o.value,
                      set: (a) => (o.value = a),
                  })
                : (t[s] = o);
    }
}
function Zr(e, t, n) {
    ue(D(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function pi(e, t, n, r) {
    const s = r.includes(".") ? ai(n, r) : () => n[r];
    if (X(e)) {
        const i = t[e];
        M(i) && En(s, i);
    } else if (M(e)) En(s, e.bind(n));
    else if (q(e))
        if (D(e)) e.forEach((i) => pi(i, t, n, r));
        else {
            const i = M(e.handler) ? e.handler.bind(n) : t[e.handler];
            M(i) && En(s, i, e);
        }
}
function wr(e) {
    const t = e.type,
        { mixins: n, extends: r } = t,
        {
            mixins: s,
            optionsCache: i,
            config: { optionMergeStrategies: o },
        } = e.appContext,
        a = i.get(t);
    let l;
    return (
        a
            ? (l = a)
            : !s.length && !n && !r
            ? (l = t)
            : ((l = {}), s.length && s.forEach((u) => Xt(l, u, o, !0)), Xt(l, t, o)),
        q(t) && i.set(t, l),
        l
    );
}
function Xt(e, t, n, r = !1) {
    const { mixins: s, extends: i } = t;
    i && Xt(e, i, n, !0), s && s.forEach((o) => Xt(e, o, n, !0));
    for (const o in t)
        if (!(r && o === "expose")) {
            const a = Ka[o] || (n && n[o]);
            e[o] = a ? a(e[o], t[o]) : t[o];
        }
    return e;
}
const Ka = {
    data: es,
    props: ze,
    emits: ze,
    methods: ze,
    computed: ze,
    beforeCreate: se,
    created: se,
    beforeMount: se,
    mounted: se,
    beforeUpdate: se,
    updated: se,
    beforeDestroy: se,
    beforeUnmount: se,
    destroyed: se,
    unmounted: se,
    activated: se,
    deactivated: se,
    errorCaptured: se,
    serverPrefetch: se,
    components: ze,
    directives: ze,
    watch: Wa,
    provide: es,
    inject: Ua,
};
function es(e, t) {
    return t
        ? e
            ? function () {
                  return ne(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function Ua(e, t) {
    return ze(qn(e), qn(t));
}
function qn(e) {
    if (D(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function se(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function ze(e, t) {
    return e ? ne(ne(Object.create(null), e), t) : t;
}
function Wa(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = ne(Object.create(null), e);
    for (const r in t) n[r] = se(e[r], t[r]);
    return n;
}
function Va(e, t, n, r = !1) {
    const s = {},
        i = {};
    Jt(i, un, 1), (e.propsDefaults = Object.create(null)), gi(e, t, s, i);
    for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
    n ? (e.props = r ? s : Zo(s)) : e.type.props ? (e.props = s) : (e.props = i), (e.attrs = i);
}
function qa(e, t, n, r) {
    const {
            props: s,
            attrs: i,
            vnode: { patchFlag: o },
        } = e,
        a = R(s),
        [l] = e.propsOptions;
    let u = !1;
    if ((r || o > 0) && !(o & 16)) {
        if (o & 8) {
            const d = e.vnode.dynamicProps;
            for (let y = 0; y < d.length; y++) {
                let E = d[y];
                if (on(e.emitsOptions, E)) continue;
                const A = t[E];
                if (l)
                    if (k(i, E)) A !== i[E] && ((i[E] = A), (u = !0));
                    else {
                        const B = gt(E);
                        s[B] = zn(l, a, B, A, e, !1);
                    }
                else A !== i[E] && ((i[E] = A), (u = !0));
            }
        }
    } else {
        gi(e, t, s, i) && (u = !0);
        let d;
        for (const y in a)
            (!t || (!k(t, y) && ((d = _t(y)) === y || !k(t, d)))) &&
                (l
                    ? n &&
                      (n[y] !== void 0 || n[d] !== void 0) &&
                      (s[y] = zn(l, a, y, void 0, e, !0))
                    : delete s[y]);
        if (i !== a) for (const y in i) (!t || !k(t, y)) && (delete i[y], (u = !0));
    }
    u && Me(e, "set", "$attrs");
}
function gi(e, t, n, r) {
    const [s, i] = e.propsOptions;
    let o = !1,
        a;
    if (t)
        for (let l in t) {
            if (Wt(l)) continue;
            const u = t[l];
            let d;
            s && k(s, (d = gt(l)))
                ? !i || !i.includes(d)
                    ? (n[d] = u)
                    : ((a || (a = {}))[d] = u)
                : on(e.emitsOptions, l) || ((!(l in r) || u !== r[l]) && ((r[l] = u), (o = !0)));
        }
    if (i) {
        const l = R(n),
            u = a || K;
        for (let d = 0; d < i.length; d++) {
            const y = i[d];
            n[y] = zn(s, l, y, u[y], e, !k(u, y));
        }
    }
    return o;
}
function zn(e, t, n, r, s, i) {
    const o = e[n];
    if (o != null) {
        const a = k(o, "default");
        if (a && r === void 0) {
            const l = o.default;
            if (o.type !== Function && M(l)) {
                const { propsDefaults: u } = s;
                n in u ? (r = u[n]) : (bt(s), (r = u[n] = l.call(null, t)), tt());
            } else r = l;
        }
        o[0] && (i && !a ? (r = !1) : o[1] && (r === "" || r === _t(n)) && (r = !0));
    }
    return r;
}
function mi(e, t, n = !1) {
    const r = t.propsCache,
        s = r.get(e);
    if (s) return s;
    const i = e.props,
        o = {},
        a = [];
    let l = !1;
    if (!M(e)) {
        const d = (y) => {
            l = !0;
            const [E, A] = mi(y, t, !0);
            ne(o, E), A && a.push(...A);
        };
        !n && t.mixins.length && t.mixins.forEach(d),
            e.extends && d(e.extends),
            e.mixins && e.mixins.forEach(d);
    }
    if (!i && !l) return q(e) && r.set(e, ut), ut;
    if (D(i))
        for (let d = 0; d < i.length; d++) {
            const y = gt(i[d]);
            ts(y) && (o[y] = K);
        }
    else if (i)
        for (const d in i) {
            const y = gt(d);
            if (ts(y)) {
                const E = i[d],
                    A = (o[y] = D(E) || M(E) ? { type: E } : Object.assign({}, E));
                if (A) {
                    const B = ss(Boolean, A.type),
                        S = ss(String, A.type);
                    (A[0] = B > -1),
                        (A[1] = S < 0 || B < S),
                        (B > -1 || k(A, "default")) && a.push(y);
                }
            }
        }
    const u = [o, a];
    return q(e) && r.set(e, u), u;
}
function ts(e) {
    return e[0] !== "$";
}
function ns(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : "";
}
function rs(e, t) {
    return ns(e) === ns(t);
}
function ss(e, t) {
    return D(t) ? t.findIndex((n) => rs(n, e)) : M(t) && rs(t, e) ? 0 : -1;
}
const bi = (e) => e[0] === "_" || e === "$stable",
    Er = (e) => (D(e) ? e.map(ve) : [ve(e)]),
    za = (e, t, n) => {
        if (t._n) return t;
        const r = ma((...s) => Er(t(...s)), n);
        return (r._c = !1), r;
    },
    _i = (e, t, n) => {
        const r = e._ctx;
        for (const s in e) {
            if (bi(s)) continue;
            const i = e[s];
            if (M(i)) t[s] = za(s, i, r);
            else if (i != null) {
                const o = Er(i);
                t[s] = () => o;
            }
        }
    },
    yi = (e, t) => {
        const n = Er(t);
        e.slots.default = () => n;
    },
    Ja = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? ((e.slots = R(t)), Jt(t, "_", n)) : _i(t, (e.slots = {}));
        } else (e.slots = {}), t && yi(e, t);
        Jt(e.slots, un, 1);
    },
    Ya = (e, t, n) => {
        const { vnode: r, slots: s } = e;
        let i = !0,
            o = K;
        if (r.shapeFlag & 32) {
            const a = t._;
            a
                ? n && a === 1
                    ? (i = !1)
                    : (ne(s, t), !n && a === 1 && delete s._)
                : ((i = !t.$stable), _i(t, s)),
                (o = t);
        } else t && (yi(e, t), (o = { default: 1 }));
        if (i) for (const a in s) !bi(a) && !(a in o) && delete s[a];
    };
function wi() {
    return {
        app: null,
        config: {
            isNativeTag: mo,
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
let Ga = 0;
function Xa(e, t) {
    return function (r, s = null) {
        M(r) || (r = Object.assign({}, r)), s != null && !q(s) && (s = null);
        const i = wi(),
            o = new Set();
        let a = !1;
        const l = (i.app = {
            _uid: Ga++,
            _component: r,
            _props: s,
            _container: null,
            _context: i,
            _instance: null,
            version: vc,
            get config() {
                return i.config;
            },
            set config(u) {},
            use(u, ...d) {
                return (
                    o.has(u) ||
                        (u && M(u.install)
                            ? (o.add(u), u.install(l, ...d))
                            : M(u) && (o.add(u), u(l, ...d))),
                    l
                );
            },
            mixin(u) {
                return i.mixins.includes(u) || i.mixins.push(u), l;
            },
            component(u, d) {
                return d ? ((i.components[u] = d), l) : i.components[u];
            },
            directive(u, d) {
                return d ? ((i.directives[u] = d), l) : i.directives[u];
            },
            mount(u, d, y) {
                if (!a) {
                    const E = et(r, s);
                    return (
                        (E.appContext = i),
                        d && t ? t(E, u) : e(E, u, y),
                        (a = !0),
                        (l._container = u),
                        (u.__vue_app__ = l),
                        vr(E.component) || E.component.proxy
                    );
                }
            },
            unmount() {
                a && (e(null, l._container), delete l._container.__vue_app__);
            },
            provide(u, d) {
                return (i.provides[u] = d), l;
            },
        });
        return l;
    };
}
function Jn(e, t, n, r, s = !1) {
    if (D(e)) {
        e.forEach((E, A) => Jn(E, t && (D(t) ? t[A] : t), n, r, s));
        return;
    }
    if (qt(r) && !s) return;
    const i = r.shapeFlag & 4 ? vr(r.component) || r.component.proxy : r.el,
        o = s ? null : i,
        { i: a, r: l } = e,
        u = t && t.r,
        d = a.refs === K ? (a.refs = {}) : a.refs,
        y = a.setupState;
    if (
        (u != null &&
            u !== l &&
            (X(u) ? ((d[u] = null), k(y, u) && (y[u] = null)) : ee(u) && (u.value = null)),
        M(l))
    )
        Fe(l, a, 12, [o, d]);
    else {
        const E = X(l),
            A = ee(l);
        if (E || A) {
            const B = () => {
                if (e.f) {
                    const S = E ? (k(y, l) ? y[l] : d[l]) : l.value;
                    s
                        ? D(S) && ar(S, i)
                        : D(S)
                        ? S.includes(i) || S.push(i)
                        : E
                        ? ((d[l] = [i]), k(y, l) && (y[l] = d[l]))
                        : ((l.value = [i]), e.k && (d[e.k] = l.value));
                } else
                    E
                        ? ((d[l] = o), k(y, l) && (y[l] = o))
                        : A && ((l.value = o), e.k && (d[e.k] = o));
            };
            o ? ((B.id = -1), ie(B, n)) : B();
        }
    }
}
const ie = Ia;
function Qa(e) {
    return Za(e);
}
function Za(e, t) {
    const n = vo();
    n.__VUE__ = !0;
    const {
            insert: r,
            remove: s,
            patchProp: i,
            createElement: o,
            createText: a,
            createComment: l,
            setText: u,
            setElementText: d,
            parentNode: y,
            nextSibling: E,
            setScopeId: A = _e,
            insertStaticContent: B,
        } = e,
        S = (c, f, h, g = null, p = null, _ = null, I = !1, b = null, w = !!f.dynamicChildren) => {
            if (c === f) return;
            c && !Ge(c, f) && ((g = Ft(c)), we(c, p, _, !0), (c = null)),
                f.patchFlag === -2 && ((w = !1), (f.dynamicChildren = null));
            const { type: m, ref: T, shapeFlag: v } = f;
            switch (m) {
                case fn:
                    z(c, f, h, g);
                    break;
                case De:
                    $(c, f, h, g);
                    break;
                case Tn:
                    c == null && le(f, h, g, I);
                    break;
                case pe:
                    ye(c, f, h, g, p, _, I, b, w);
                    break;
                default:
                    v & 1
                        ? Q(c, f, h, g, p, _, I, b, w)
                        : v & 6
                        ? Ce(c, f, h, g, p, _, I, b, w)
                        : (v & 64 || v & 128) && m.process(c, f, h, g, p, _, I, b, w, ct);
            }
            T != null && p && Jn(T, c && c.ref, _, f || c, !f);
        },
        z = (c, f, h, g) => {
            if (c == null) r((f.el = a(f.children)), h, g);
            else {
                const p = (f.el = c.el);
                f.children !== c.children && u(p, f.children);
            }
        },
        $ = (c, f, h, g) => {
            c == null ? r((f.el = l(f.children || "")), h, g) : (f.el = c.el);
        },
        le = (c, f, h, g) => {
            [c.el, c.anchor] = B(c.children, f, h, g, c.el, c.anchor);
        },
        x = ({ el: c, anchor: f }, h, g) => {
            let p;
            for (; c && c !== f; ) (p = E(c)), r(c, h, g), (c = p);
            r(f, h, g);
        },
        U = ({ el: c, anchor: f }) => {
            let h;
            for (; c && c !== f; ) (h = E(c)), s(c), (c = h);
            s(f);
        },
        Q = (c, f, h, g, p, _, I, b, w) => {
            (I = I || f.type === "svg"),
                c == null ? at(f, h, g, p, _, I, b, w) : G(c, f, p, _, I, b, w);
        },
        at = (c, f, h, g, p, _, I, b) => {
            let w, m;
            const { type: T, props: v, shapeFlag: C, transition: O, dirs: P } = c;
            if (
                ((w = c.el = o(c.type, _, v && v.is, v)),
                C & 8
                    ? d(w, c.children)
                    : C & 16 && N(c.children, w, null, g, p, _ && T !== "foreignObject", I, b),
                P && Ve(c, null, g, "created"),
                Pe(w, c, c.scopeId, I, g),
                v)
            ) {
                for (const F in v)
                    F !== "value" && !Wt(F) && i(w, F, null, v[F], _, c.children, g, p, Ae);
                "value" in v && i(w, "value", null, v.value),
                    (m = v.onVnodeBeforeMount) && Ie(m, g, c);
            }
            P && Ve(c, null, g, "beforeMount");
            const j = (!p || (p && !p.pendingBranch)) && O && !O.persisted;
            j && O.beforeEnter(w),
                r(w, f, h),
                ((m = v && v.onVnodeMounted) || j || P) &&
                    ie(() => {
                        m && Ie(m, g, c), j && O.enter(w), P && Ve(c, null, g, "mounted");
                    }, p);
        },
        Pe = (c, f, h, g, p) => {
            if ((h && A(c, h), g)) for (let _ = 0; _ < g.length; _++) A(c, g[_]);
            if (p) {
                let _ = p.subTree;
                if (f === _) {
                    const I = p.vnode;
                    Pe(c, I, I.scopeId, I.slotScopeIds, p.parent);
                }
            }
        },
        N = (c, f, h, g, p, _, I, b, w = 0) => {
            for (let m = w; m < c.length; m++) {
                const T = (c[m] = b ? Re(c[m]) : ve(c[m]));
                S(null, T, f, h, g, p, _, I, b);
            }
        },
        G = (c, f, h, g, p, _, I) => {
            const b = (f.el = c.el);
            let { patchFlag: w, dynamicChildren: m, dirs: T } = f;
            w |= c.patchFlag & 16;
            const v = c.props || K,
                C = f.props || K;
            let O;
            h && qe(h, !1),
                (O = C.onVnodeBeforeUpdate) && Ie(O, h, f, c),
                T && Ve(f, c, h, "beforeUpdate"),
                h && qe(h, !0);
            const P = p && f.type !== "foreignObject";
            if (
                (m ? W(c.dynamicChildren, m, b, h, g, P, _) : I || L(c, f, b, null, h, g, P, _, !1),
                w > 0)
            ) {
                if (w & 16) ae(b, f, v, C, h, g, p);
                else if (
                    (w & 2 && v.class !== C.class && i(b, "class", null, C.class, p),
                    w & 4 && i(b, "style", v.style, C.style, p),
                    w & 8)
                ) {
                    const j = f.dynamicProps;
                    for (let F = 0; F < j.length; F++) {
                        const J = j[F],
                            de = v[J],
                            lt = C[J];
                        (lt !== de || J === "value") && i(b, J, de, lt, p, c.children, h, g, Ae);
                    }
                }
                w & 1 && c.children !== f.children && d(b, f.children);
            } else !I && m == null && ae(b, f, v, C, h, g, p);
            ((O = C.onVnodeUpdated) || T) &&
                ie(() => {
                    O && Ie(O, h, f, c), T && Ve(f, c, h, "updated");
                }, g);
        },
        W = (c, f, h, g, p, _, I) => {
            for (let b = 0; b < f.length; b++) {
                const w = c[b],
                    m = f[b],
                    T = w.el && (w.type === pe || !Ge(w, m) || w.shapeFlag & 70) ? y(w.el) : h;
                S(w, m, T, null, g, p, _, I, !0);
            }
        },
        ae = (c, f, h, g, p, _, I) => {
            if (h !== g) {
                if (h !== K)
                    for (const b in h)
                        !Wt(b) && !(b in g) && i(c, b, h[b], null, I, f.children, p, _, Ae);
                for (const b in g) {
                    if (Wt(b)) continue;
                    const w = g[b],
                        m = h[b];
                    w !== m && b !== "value" && i(c, b, m, w, I, f.children, p, _, Ae);
                }
                "value" in g && i(c, "value", h.value, g.value);
            }
        },
        ye = (c, f, h, g, p, _, I, b, w) => {
            const m = (f.el = c ? c.el : a("")),
                T = (f.anchor = c ? c.anchor : a(""));
            let { patchFlag: v, dynamicChildren: C, slotScopeIds: O } = f;
            O && (b = b ? b.concat(O) : O),
                c == null
                    ? (r(m, h, g), r(T, h, g), N(f.children, h, T, p, _, I, b, w))
                    : v > 0 && v & 64 && C && c.dynamicChildren
                    ? (W(c.dynamicChildren, C, h, p, _, I, b),
                      (f.key != null || (p && f === p.subTree)) && Ei(c, f, !0))
                    : L(c, f, h, T, p, _, I, b, w);
        },
        Ce = (c, f, h, g, p, _, I, b, w) => {
            (f.slotScopeIds = b),
                c == null
                    ? f.shapeFlag & 512
                        ? p.ctx.activate(f, h, g, I, w)
                        : It(f, h, g, p, _, I, w)
                    : Br(c, f, w);
        },
        It = (c, f, h, g, p, _, I) => {
            const b = (c.component = hc(c, g, p));
            if ((cn(c) && (b.ctx.renderer = ct), gc(b), b.asyncDep)) {
                if ((p && p.registerDep(b, re), !c.el)) {
                    const w = (b.subTree = et(De));
                    $(null, w, f, h);
                }
                return;
            }
            re(b, c, f, h, p, _, I);
        },
        Br = (c, f, h) => {
            const g = (f.component = c.component);
            if (ya(c, f, h))
                if (g.asyncDep && !g.asyncResolved) {
                    V(g, f, h);
                    return;
                } else (g.next = f), fa(g.update), g.update();
            else (f.el = c.el), (g.vnode = f);
        },
        re = (c, f, h, g, p, _, I) => {
            const b = () => {
                    if (c.isMounted) {
                        let { next: T, bu: v, u: C, parent: O, vnode: P } = c,
                            j = T,
                            F;
                        qe(c, !1),
                            T ? ((T.el = P.el), V(c, T, I)) : (T = P),
                            v && yn(v),
                            (F = T.props && T.props.onVnodeBeforeUpdate) && Ie(F, O, T, P),
                            qe(c, !0);
                        const J = wn(c),
                            de = c.subTree;
                        (c.subTree = J),
                            S(de, J, y(de.el), Ft(de), c, p, _),
                            (T.el = J.el),
                            j === null && wa(c, J.el),
                            C && ie(C, p),
                            (F = T.props && T.props.onVnodeUpdated) && ie(() => Ie(F, O, T, P), p);
                    } else {
                        let T;
                        const { el: v, props: C } = f,
                            { bm: O, m: P, parent: j } = c,
                            F = qt(f);
                        if (
                            (qe(c, !1),
                            O && yn(O),
                            !F && (T = C && C.onVnodeBeforeMount) && Ie(T, j, f),
                            qe(c, !0),
                            v && bn)
                        ) {
                            const J = () => {
                                (c.subTree = wn(c)), bn(v, c.subTree, c, p, null);
                            };
                            F ? f.type.__asyncLoader().then(() => !c.isUnmounted && J()) : J();
                        } else {
                            const J = (c.subTree = wn(c));
                            S(null, J, h, g, c, p, _), (f.el = J.el);
                        }
                        if ((P && ie(P, p), !F && (T = C && C.onVnodeMounted))) {
                            const J = f;
                            ie(() => Ie(T, j, J), p);
                        }
                        (f.shapeFlag & 256 || (j && qt(j.vnode) && j.vnode.shapeFlag & 256)) &&
                            c.a &&
                            ie(c.a, p),
                            (c.isMounted = !0),
                            (f = h = g = null);
                    }
                },
                w = (c.effect = new ur(b, () => yr(m), c.scope)),
                m = (c.update = () => w.run());
            (m.id = c.uid), qe(c, !0), m();
        },
        V = (c, f, h) => {
            f.component = c;
            const g = c.vnode.props;
            (c.vnode = f),
                (c.next = null),
                qa(c, f.props, g, h),
                Ya(c, f.children, h),
                yt(),
                Gr(),
                wt();
        },
        L = (c, f, h, g, p, _, I, b, w = !1) => {
            const m = c && c.children,
                T = c ? c.shapeFlag : 0,
                v = f.children,
                { patchFlag: C, shapeFlag: O } = f;
            if (C > 0) {
                if (C & 128) {
                    Bt(m, v, h, g, p, _, I, b, w);
                    return;
                } else if (C & 256) {
                    Ue(m, v, h, g, p, _, I, b, w);
                    return;
                }
            }
            O & 8
                ? (T & 16 && Ae(m, p, _), v !== m && d(h, v))
                : T & 16
                ? O & 16
                    ? Bt(m, v, h, g, p, _, I, b, w)
                    : Ae(m, p, _, !0)
                : (T & 8 && d(h, ""), O & 16 && N(v, h, g, p, _, I, b, w));
        },
        Ue = (c, f, h, g, p, _, I, b, w) => {
            (c = c || ut), (f = f || ut);
            const m = c.length,
                T = f.length,
                v = Math.min(m, T);
            let C;
            for (C = 0; C < v; C++) {
                const O = (f[C] = w ? Re(f[C]) : ve(f[C]));
                S(c[C], O, h, null, p, _, I, b, w);
            }
            m > T ? Ae(c, p, _, !0, !1, v) : N(f, h, g, p, _, I, b, w, v);
        },
        Bt = (c, f, h, g, p, _, I, b, w) => {
            let m = 0;
            const T = f.length;
            let v = c.length - 1,
                C = T - 1;
            for (; m <= v && m <= C; ) {
                const O = c[m],
                    P = (f[m] = w ? Re(f[m]) : ve(f[m]));
                if (Ge(O, P)) S(O, P, h, null, p, _, I, b, w);
                else break;
                m++;
            }
            for (; m <= v && m <= C; ) {
                const O = c[v],
                    P = (f[C] = w ? Re(f[C]) : ve(f[C]));
                if (Ge(O, P)) S(O, P, h, null, p, _, I, b, w);
                else break;
                v--, C--;
            }
            if (m > v) {
                if (m <= C) {
                    const O = C + 1,
                        P = O < T ? f[O].el : g;
                    for (; m <= C; )
                        S(null, (f[m] = w ? Re(f[m]) : ve(f[m])), h, P, p, _, I, b, w), m++;
                }
            } else if (m > C) for (; m <= v; ) we(c[m], p, _, !0), m++;
            else {
                const O = m,
                    P = m,
                    j = new Map();
                for (m = P; m <= C; m++) {
                    const ce = (f[m] = w ? Re(f[m]) : ve(f[m]));
                    ce.key != null && j.set(ce.key, m);
                }
                let F,
                    J = 0;
                const de = C - P + 1;
                let lt = !1,
                    Lr = 0;
                const vt = new Array(de);
                for (m = 0; m < de; m++) vt[m] = 0;
                for (m = O; m <= v; m++) {
                    const ce = c[m];
                    if (J >= de) {
                        we(ce, p, _, !0);
                        continue;
                    }
                    let Ee;
                    if (ce.key != null) Ee = j.get(ce.key);
                    else
                        for (F = P; F <= C; F++)
                            if (vt[F - P] === 0 && Ge(ce, f[F])) {
                                Ee = F;
                                break;
                            }
                    Ee === void 0
                        ? we(ce, p, _, !0)
                        : ((vt[Ee - P] = m + 1),
                          Ee >= Lr ? (Lr = Ee) : (lt = !0),
                          S(ce, f[Ee], h, null, p, _, I, b, w),
                          J++);
                }
                const jr = lt ? ec(vt) : ut;
                for (F = jr.length - 1, m = de - 1; m >= 0; m--) {
                    const ce = P + m,
                        Ee = f[ce],
                        Hr = ce + 1 < T ? f[ce + 1].el : g;
                    vt[m] === 0
                        ? S(null, Ee, h, Hr, p, _, I, b, w)
                        : lt && (F < 0 || m !== jr[F] ? We(Ee, h, Hr, 2) : F--);
                }
            }
        },
        We = (c, f, h, g, p = null) => {
            const { el: _, type: I, transition: b, children: w, shapeFlag: m } = c;
            if (m & 6) {
                We(c.component.subTree, f, h, g);
                return;
            }
            if (m & 128) {
                c.suspense.move(f, h, g);
                return;
            }
            if (m & 64) {
                I.move(c, f, h, ct);
                return;
            }
            if (I === pe) {
                r(_, f, h);
                for (let v = 0; v < w.length; v++) We(w[v], f, h, g);
                r(c.anchor, f, h);
                return;
            }
            if (I === Tn) {
                x(c, f, h);
                return;
            }
            if (g !== 2 && m & 1 && b)
                if (g === 0) b.beforeEnter(_), r(_, f, h), ie(() => b.enter(_), p);
                else {
                    const { leave: v, delayLeave: C, afterLeave: O } = b,
                        P = () => r(_, f, h),
                        j = () => {
                            v(_, () => {
                                P(), O && O();
                            });
                        };
                    C ? C(_, P, j) : j();
                }
            else r(_, f, h);
        },
        we = (c, f, h, g = !1, p = !1) => {
            const {
                type: _,
                props: I,
                ref: b,
                children: w,
                dynamicChildren: m,
                shapeFlag: T,
                patchFlag: v,
                dirs: C,
            } = c;
            if ((b != null && Jn(b, null, h, c, !0), T & 256)) {
                f.ctx.deactivate(c);
                return;
            }
            const O = T & 1 && C,
                P = !qt(c);
            let j;
            if ((P && (j = I && I.onVnodeBeforeUnmount) && Ie(j, f, c), T & 6))
                ao(c.component, h, g);
            else {
                if (T & 128) {
                    c.suspense.unmount(h, g);
                    return;
                }
                O && Ve(c, null, f, "beforeUnmount"),
                    T & 64
                        ? c.type.remove(c, f, h, p, ct, g)
                        : m && (_ !== pe || (v > 0 && v & 64))
                        ? Ae(m, f, h, !1, !0)
                        : ((_ === pe && v & 384) || (!p && T & 16)) && Ae(w, f, h),
                    g && Fr(c);
            }
            ((P && (j = I && I.onVnodeUnmounted)) || O) &&
                ie(() => {
                    j && Ie(j, f, c), O && Ve(c, null, f, "unmounted");
                }, h);
        },
        Fr = (c) => {
            const { type: f, el: h, anchor: g, transition: p } = c;
            if (f === pe) {
                oo(h, g);
                return;
            }
            if (f === Tn) {
                U(c);
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
        oo = (c, f) => {
            let h;
            for (; c !== f; ) (h = E(c)), s(c), (c = h);
            s(f);
        },
        ao = (c, f, h) => {
            const { bum: g, scope: p, update: _, subTree: I, um: b } = c;
            g && yn(g),
                p.stop(),
                _ && ((_.active = !1), we(I, c, f, h)),
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
        Ae = (c, f, h, g = !1, p = !1, _ = 0) => {
            for (let I = _; I < c.length; I++) we(c[I], f, h, g, p);
        },
        Ft = (c) =>
            c.shapeFlag & 6
                ? Ft(c.component.subTree)
                : c.shapeFlag & 128
                ? c.suspense.next()
                : E(c.anchor || c.el),
        $r = (c, f, h) => {
            c == null
                ? f._vnode && we(f._vnode, null, null, !0)
                : S(f._vnode || null, c, f, null, null, null, h),
                Gr(),
                ri(),
                (f._vnode = c);
        },
        ct = { p: S, um: we, m: We, r: Fr, mt: It, mc: N, pc: L, pbc: W, n: Ft, o: e };
    let mn, bn;
    return t && ([mn, bn] = t(ct)), { render: $r, hydrate: mn, createApp: Xa($r, mn) };
}
function qe({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function Ei(e, t, n = !1) {
    const r = e.children,
        s = t.children;
    if (D(r) && D(s))
        for (let i = 0; i < r.length; i++) {
            const o = r[i];
            let a = s[i];
            a.shapeFlag & 1 &&
                !a.dynamicChildren &&
                ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = s[i] = Re(s[i])), (a.el = o.el)),
                n || Ei(o, a)),
                a.type === fn && (a.el = o.el);
        }
}
function ec(e) {
    const t = e.slice(),
        n = [0];
    let r, s, i, o, a;
    const l = e.length;
    for (r = 0; r < l; r++) {
        const u = e[r];
        if (u !== 0) {
            if (((s = n[n.length - 1]), e[s] < u)) {
                (t[r] = s), n.push(r);
                continue;
            }
            for (i = 0, o = n.length - 1; i < o; )
                (a = (i + o) >> 1), e[n[a]] < u ? (i = a + 1) : (o = a);
            u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
        }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
    return n;
}
const tc = (e) => e.__isTeleport,
    pe = Symbol(void 0),
    fn = Symbol(void 0),
    De = Symbol(void 0),
    Tn = Symbol(void 0),
    At = [];
let be = null;
function nc(e = !1) {
    At.push((be = e ? null : []));
}
function rc() {
    At.pop(), (be = At[At.length - 1] || null);
}
let Mt = 1;
function is(e) {
    Mt += e;
}
function sc(e) {
    return (e.dynamicChildren = Mt > 0 ? be || ut : null), rc(), Mt > 0 && be && be.push(e), e;
}
function ic(e, t, n, r, s, i) {
    return sc(Nt(e, t, n, r, s, i, !0));
}
function oc(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Ge(e, t) {
    return e.type === t.type && e.key === t.key;
}
const un = "__vInternal",
    Ii = ({ key: e }) => e ?? null,
    zt = ({ ref: e, ref_key: t, ref_for: n }) =>
        e != null ? (X(e) || ee(e) || M(e) ? { i: me, r: e, k: t, f: !!n } : e) : null;
function Nt(e, t = null, n = null, r = 0, s = null, i = e === pe ? 0 : 1, o = !1, a = !1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Ii(t),
        ref: t && zt(t),
        scopeId: an,
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
        shapeFlag: i,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: me,
    };
    return (
        a ? (Ir(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= X(n) ? 8 : 16),
        Mt > 0 && !o && be && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && be.push(l),
        l
    );
}
const et = ac;
function ac(e, t = null, n = null, r = 0, s = null, i = !1) {
    if (((!e || e === $a) && (e = De), oc(e))) {
        const a = He(e, t, !0);
        return (
            n && Ir(a, n),
            Mt > 0 && !i && be && (a.shapeFlag & 6 ? (be[be.indexOf(e)] = a) : be.push(a)),
            (a.patchFlag |= -2),
            a
        );
    }
    if ((yc(e) && (e = e.__vccOpts), t)) {
        t = cc(t);
        let { class: a, style: l } = t;
        a && !X(a) && (t.class = ir(a)),
            q(l) && (Ys(l) && !D(l) && (l = ne({}, l)), (t.style = sr(l)));
    }
    const o = X(e) ? 1 : Ea(e) ? 128 : tc(e) ? 64 : q(e) ? 4 : M(e) ? 2 : 0;
    return Nt(e, t, n, r, s, o, i, !0);
}
function cc(e) {
    return e ? (Ys(e) || un in e ? ne({}, e) : e) : null;
}
function He(e, t, n = !1) {
    const { props: r, ref: s, patchFlag: i, children: o } = e,
        a = t ? fc(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && Ii(a),
        ref: t && t.ref ? (n && s ? (D(s) ? s.concat(zt(t)) : [s, zt(t)]) : zt(t)) : s,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: o,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== pe ? (i === -1 ? 16 : i | 16) : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && He(e.ssContent),
        ssFallback: e.ssFallback && He(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce,
    };
}
function lc(e = " ", t = 0) {
    return et(fn, null, e, t);
}
function ve(e) {
    return e == null || typeof e == "boolean"
        ? et(De)
        : D(e)
        ? et(pe, null, e.slice())
        : typeof e == "object"
        ? Re(e)
        : et(fn, null, String(e));
}
function Re(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : He(e);
}
function Ir(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (D(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), Ir(e, s()), s._c && (s._d = !0));
            return;
        } else {
            n = 32;
            const s = t._;
            !s && !(un in t)
                ? (t._ctx = me)
                : s === 3 &&
                  me &&
                  (me.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        M(t)
            ? ((t = { default: t, _ctx: me }), (n = 32))
            : ((t = String(t)), r & 64 ? ((n = 16), (t = [lc(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function fc(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class") t.class !== r.class && (t.class = ir([t.class, r.class]));
            else if (s === "style") t.style = sr([t.style, r.style]);
            else if (en(s)) {
                const i = t[s],
                    o = r[s];
                o && i !== o && !(D(i) && i.includes(o)) && (t[s] = i ? [].concat(i, o) : o);
            } else s !== "" && (t[s] = r[s]);
    }
    return t;
}
function Ie(e, t, n, r = null) {
    ue(e, t, 7, [n, r]);
}
const uc = wi();
let dc = 0;
function hc(e, t, n) {
    const r = e.type,
        s = (t ? t.appContext : e.appContext) || uc,
        i = {
            uid: dc++,
            vnode: e,
            type: r,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new To(!0),
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
            propsOptions: mi(r, s),
            emitsOptions: ii(r, s),
            emit: null,
            emitted: null,
            propsDefaults: K,
            inheritAttrs: r.inheritAttrs,
            ctx: K,
            data: K,
            props: K,
            attrs: K,
            slots: K,
            refs: K,
            setupState: K,
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
        (i.ctx = { _: i }),
        (i.root = t ? t.root : i),
        (i.emit = ha.bind(null, i)),
        e.ce && e.ce(i),
        i
    );
}
let Y = null;
const pc = () => Y || me,
    bt = (e) => {
        (Y = e), e.scope.on();
    },
    tt = () => {
        Y && Y.scope.off(), (Y = null);
    };
function vi(e) {
    return e.vnode.shapeFlag & 4;
}
let Pt = !1;
function gc(e, t = !1) {
    Pt = t;
    const { props: n, children: r } = e.vnode,
        s = vi(e);
    Va(e, n, s, t), Ja(e, r);
    const i = s ? mc(e, t) : void 0;
    return (Pt = !1), i;
}
function mc(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = Gs(new Proxy(e.ctx, La)));
    const { setup: r } = n;
    if (r) {
        const s = (e.setupContext = r.length > 1 ? _c(e) : null);
        bt(e), yt();
        const i = Fe(r, e, 0, [e.props, s]);
        if ((wt(), tt(), ks(i))) {
            if ((i.then(tt, tt), t))
                return i
                    .then((o) => {
                        os(e, o, t);
                    })
                    .catch((o) => {
                        sn(o, e, 0);
                    });
            e.asyncDep = i;
        } else os(e, i, t);
    } else Ti(e, t);
}
function os(e, t, n) {
    M(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : q(t) && (e.setupState = Zs(t)),
        Ti(e, n);
}
let as;
function Ti(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && as && !r.render) {
            const s = r.template || wr(e).template;
            if (s) {
                const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
                    { delimiters: a, compilerOptions: l } = r,
                    u = ne(ne({ isCustomElement: i, delimiters: a }, o), l);
                r.render = as(s, u);
            }
        }
        e.render = r.render || _e;
    }
    bt(e), yt(), ja(e), wt(), tt();
}
function bc(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return oe(e, "get", "$attrs"), t[n];
        },
    });
}
function _c(e) {
    const t = (r) => {
        e.exposed = r || {};
    };
    let n;
    return {
        get attrs() {
            return n || (n = bc(e));
        },
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function vr(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(Zs(Gs(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in Ct) return Ct[n](e);
                },
                has(t, n) {
                    return n in t || n in Ct;
                },
            }))
        );
}
function yc(e) {
    return M(e) && "__vccOpts" in e;
}
const wc = (e, t) => oa(e, t, Pt),
    Ec = Symbol(""),
    Ic = () => Vt(Ec),
    vc = "3.2.47",
    Tc = "http://www.w3.org/2000/svg",
    Xe = typeof document < "u" ? document : null,
    cs = Xe && Xe.createElement("template"),
    Cc = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, r) => {
            const s = t ? Xe.createElementNS(Tc, e) : Xe.createElement(e, n ? { is: n } : void 0);
            return (
                e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple),
                s
            );
        },
        createText: (e) => Xe.createTextNode(e),
        createComment: (e) => Xe.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => Xe.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        insertStaticContent(e, t, n, r, s, i) {
            const o = n ? n.previousSibling : t.lastChild;
            if (s && (s === i || s.nextSibling))
                for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); );
            else {
                cs.innerHTML = r ? `<svg>${e}</svg>` : e;
                const a = cs.content;
                if (r) {
                    const l = a.firstChild;
                    for (; l.firstChild; ) a.appendChild(l.firstChild);
                    a.removeChild(l);
                }
                t.insertBefore(a, n);
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    };
function Ac(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
        t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
function Sc(e, t, n) {
    const r = e.style,
        s = X(n);
    if (n && !s) {
        if (t && !X(t)) for (const i in t) n[i] == null && Yn(r, i, "");
        for (const i in n) Yn(r, i, n[i]);
    } else {
        const i = r.display;
        s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
            "_vod" in e && (r.display = i);
    }
}
const ls = /\s*!important$/;
function Yn(e, t, n) {
    if (D(n)) n.forEach((r) => Yn(e, t, r));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const r = Oc(e, t);
        ls.test(n) ? e.setProperty(_t(r), n.replace(ls, ""), "important") : (e[r] = n);
    }
}
const fs = ["Webkit", "Moz", "ms"],
    Cn = {};
function Oc(e, t) {
    const n = Cn[t];
    if (n) return n;
    let r = gt(t);
    if (r !== "filter" && r in e) return (Cn[t] = r);
    r = Fs(r);
    for (let s = 0; s < fs.length; s++) {
        const i = fs[s] + r;
        if (i in e) return (Cn[t] = i);
    }
    return t;
}
const us = "http://www.w3.org/1999/xlink";
function Dc(e, t, n, r, s) {
    if (r && t.startsWith("xlink:"))
        n == null ? e.removeAttributeNS(us, t.slice(6, t.length)) : e.setAttributeNS(us, t, n);
    else {
        const i = po(t);
        n == null || (i && !Ms(n)) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
    }
}
function xc(e, t, n, r, s, i, o) {
    if (t === "innerHTML" || t === "textContent") {
        r && o(r, s, i), (e[t] = n ?? "");
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
            ? (n = Ms(n))
            : n == null && l === "string"
            ? ((n = ""), (a = !0))
            : l === "number" && ((n = 0), (a = !0));
    }
    try {
        e[t] = n;
    } catch {}
    a && e.removeAttribute(t);
}
function Mc(e, t, n, r) {
    e.addEventListener(t, n, r);
}
function Nc(e, t, n, r) {
    e.removeEventListener(t, n, r);
}
function Pc(e, t, n, r, s = null) {
    const i = e._vei || (e._vei = {}),
        o = i[t];
    if (r && o) o.value = r;
    else {
        const [a, l] = kc(t);
        if (r) {
            const u = (i[t] = Fc(r, s));
            Mc(e, a, u, l);
        } else o && (Nc(e, a, o, l), (i[t] = void 0));
    }
}
const ds = /(?:Once|Passive|Capture)$/;
function kc(e) {
    let t;
    if (ds.test(e)) {
        t = {};
        let r;
        for (; (r = e.match(ds)); )
            (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : _t(e.slice(2)), t];
}
let An = 0;
const Rc = Promise.resolve(),
    Bc = () => An || (Rc.then(() => (An = 0)), (An = Date.now()));
function Fc(e, t) {
    const n = (r) => {
        if (!r._vts) r._vts = Date.now();
        else if (r._vts <= n.attached) return;
        ue($c(r, n.value), t, 5, [r]);
    };
    return (n.value = e), (n.attached = Bc()), n;
}
function $c(e, t) {
    if (D(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((r) => (s) => !s._stopped && r && r(s))
        );
    } else return t;
}
const hs = /^on[a-z]/,
    Lc = (e, t, n, r, s = !1, i, o, a, l) => {
        t === "class"
            ? Ac(e, r, s)
            : t === "style"
            ? Sc(e, n, r)
            : en(t)
            ? or(t) || Pc(e, t, n, r, o)
            : (
                  t[0] === "."
                      ? ((t = t.slice(1)), !0)
                      : t[0] === "^"
                      ? ((t = t.slice(1)), !1)
                      : jc(e, t, r, s)
              )
            ? xc(e, t, r, i, o, a, l)
            : (t === "true-value" ? (e._trueValue = r) : t === "false-value" && (e._falseValue = r),
              Dc(e, t, r, s));
    };
function jc(e, t, n, r) {
    return r
        ? !!(t === "innerHTML" || t === "textContent" || (t in e && hs.test(t) && M(n)))
        : t === "spellcheck" ||
          t === "draggable" ||
          t === "translate" ||
          t === "form" ||
          (t === "list" && e.tagName === "INPUT") ||
          (t === "type" && e.tagName === "TEXTAREA") ||
          (hs.test(t) && X(n))
        ? !1
        : t in e;
}
const Hc = {
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
Sa.props;
const Kc = ne({ patchProp: Lc }, Cc);
let ps;
function Uc() {
    return ps || (ps = Qa(Kc));
}
const Wc = (...e) => {
    const t = Uc().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (r) => {
            const s = Vc(r);
            if (!s) return;
            const i = t._component;
            !M(i) && !i.render && !i.template && (i.template = s.innerHTML), (s.innerHTML = "");
            const o = n(s, !1, s instanceof SVGElement);
            return (
                s instanceof Element &&
                    (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
                o
            );
        }),
        t
    );
};
function Vc(e) {
    return X(e) ? document.querySelector(e) : e;
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
 */ const Ci = function (e) {
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
    qc = function (e) {
        const t = [];
        let n = 0,
            r = 0;
        for (; n < e.length; ) {
            const s = e[n++];
            if (s < 128) t[r++] = String.fromCharCode(s);
            else if (s > 191 && s < 224) {
                const i = e[n++];
                t[r++] = String.fromCharCode(((s & 31) << 6) | (i & 63));
            } else if (s > 239 && s < 365) {
                const i = e[n++],
                    o = e[n++],
                    a = e[n++],
                    l = (((s & 7) << 18) | ((i & 63) << 12) | ((o & 63) << 6) | (a & 63)) - 65536;
                (t[r++] = String.fromCharCode(55296 + (l >> 10))),
                    (t[r++] = String.fromCharCode(56320 + (l & 1023)));
            } else {
                const i = e[n++],
                    o = e[n++];
                t[r++] = String.fromCharCode(((s & 15) << 12) | ((i & 63) << 6) | (o & 63));
            }
        }
        return t.join("");
    },
    Ai = {
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
                const i = e[s],
                    o = s + 1 < e.length,
                    a = o ? e[s + 1] : 0,
                    l = s + 2 < e.length,
                    u = l ? e[s + 2] : 0,
                    d = i >> 2,
                    y = ((i & 3) << 4) | (a >> 4);
                let E = ((a & 15) << 2) | (u >> 6),
                    A = u & 63;
                l || ((A = 64), o || (E = 64)), r.push(n[d], n[y], n[E], n[A]);
            }
            return r.join("");
        },
        encodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(Ci(e), t);
        },
        decodeString(e, t) {
            return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : qc(this.decodeStringToByteArray(e, t));
        },
        decodeStringToByteArray(e, t) {
            this.init_();
            const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
                r = [];
            for (let s = 0; s < e.length; ) {
                const i = n[e.charAt(s++)],
                    a = s < e.length ? n[e.charAt(s)] : 0;
                ++s;
                const u = s < e.length ? n[e.charAt(s)] : 64;
                ++s;
                const y = s < e.length ? n[e.charAt(s)] : 64;
                if ((++s, i == null || a == null || u == null || y == null)) throw Error();
                const E = (i << 2) | (a >> 4);
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
    zc = function (e) {
        const t = Ci(e);
        return Ai.encodeByteArray(t, !0);
    },
    Si = function (e) {
        return zc(e).replace(/\./g, "");
    },
    Jc = function (e) {
        try {
            return Ai.decodeString(e, !0);
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
 */ function Yc() {
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
 */ const Gc = () => Yc().__FIREBASE_DEFAULTS__,
    Xc = () => {
        if (typeof process > "u" || typeof process.env > "u") return;
        const e = {}.__FIREBASE_DEFAULTS__;
        if (e) return JSON.parse(e);
    },
    Qc = () => {
        if (typeof document > "u") return;
        let e;
        try {
            e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
        } catch {
            return;
        }
        const t = e && Jc(e[1]);
        return t && JSON.parse(t);
    },
    Zc = () => {
        try {
            return Gc() || Xc() || Qc();
        } catch (e) {
            console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
            return;
        }
    },
    el = () => {
        var e;
        return (e = Zc()) === null || e === void 0 ? void 0 : e.config;
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
 */ class tl {
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
function Oi() {
    try {
        return typeof indexedDB == "object";
    } catch {
        return !1;
    }
}
function Di() {
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
                    var i;
                    t(((i = s.error) === null || i === void 0 ? void 0 : i.message) || "");
                });
        } catch (n) {
            t(n);
        }
    });
}
function nl() {
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
 */ const rl = "FirebaseError";
class Et extends Error {
    constructor(t, n, r) {
        super(n),
            (this.code = t),
            (this.customData = r),
            (this.name = rl),
            Object.setPrototypeOf(this, Et.prototype),
            Error.captureStackTrace && Error.captureStackTrace(this, dn.prototype.create);
    }
}
class dn {
    constructor(t, n, r) {
        (this.service = t), (this.serviceName = n), (this.errors = r);
    }
    create(t, ...n) {
        const r = n[0] || {},
            s = `${this.service}/${t}`,
            i = this.errors[t],
            o = i ? sl(i, r) : "Error",
            a = `${this.serviceName}: ${o} (${s}).`;
        return new Et(s, a, r);
    }
}
function sl(e, t) {
    return e.replace(il, (n, r) => {
        const s = t[r];
        return s != null ? String(s) : `<${r}?>`;
    });
}
const il = /\{\$([^}]+)}/g;
function Gn(e, t) {
    if (e === t) return !0;
    const n = Object.keys(e),
        r = Object.keys(t);
    for (const s of n) {
        if (!r.includes(s)) return !1;
        const i = e[s],
            o = t[s];
        if (gs(i) && gs(o)) {
            if (!Gn(i, o)) return !1;
        } else if (i !== o) return !1;
    }
    for (const s of r) if (!n.includes(s)) return !1;
    return !0;
}
function gs(e) {
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
 */ function Tr(e) {
    return e && e._delegate ? e._delegate : e;
}
class Ke {
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
 */ const Je = "[DEFAULT]";
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
 */ class ol {
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
            const r = new tl();
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
            } catch (i) {
                if (s) return null;
                throw i;
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
            if (cl(t))
                try {
                    this.getOrInitializeService({ instanceIdentifier: Je });
                } catch {}
            for (const [n, r] of this.instancesDeferred.entries()) {
                const s = this.normalizeInstanceIdentifier(n);
                try {
                    const i = this.getOrInitializeService({ instanceIdentifier: s });
                    r.resolve(i);
                } catch {}
            }
        }
    }
    clearInstance(t = Je) {
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
    isInitialized(t = Je) {
        return this.instances.has(t);
    }
    getOptions(t = Je) {
        return this.instancesOptions.get(t) || {};
    }
    initialize(t = {}) {
        const { options: n = {} } = t,
            r = this.normalizeInstanceIdentifier(t.instanceIdentifier);
        if (this.isInitialized(r)) throw Error(`${this.name}(${r}) has already been initialized`);
        if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`);
        const s = this.getOrInitializeService({ instanceIdentifier: r, options: n });
        for (const [i, o] of this.instancesDeferred.entries()) {
            const a = this.normalizeInstanceIdentifier(i);
            r === a && o.resolve(s);
        }
        return s;
    }
    onInit(t, n) {
        var r;
        const s = this.normalizeInstanceIdentifier(n),
            i = (r = this.onInitCallbacks.get(s)) !== null && r !== void 0 ? r : new Set();
        i.add(t), this.onInitCallbacks.set(s, i);
        const o = this.instances.get(s);
        return (
            o && t(o, s),
            () => {
                i.delete(t);
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
                instanceIdentifier: al(t),
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
    normalizeInstanceIdentifier(t = Je) {
        return this.component ? (this.component.multipleInstances ? t : Je) : t;
    }
    shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT";
    }
}
function al(e) {
    return e === Je ? void 0 : e;
}
function cl(e) {
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
 */ class ll {
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
        const n = new ol(t, this);
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
const fl = {
        debug: H.DEBUG,
        verbose: H.VERBOSE,
        info: H.INFO,
        warn: H.WARN,
        error: H.ERROR,
        silent: H.SILENT,
    },
    ul = H.INFO,
    dl = {
        [H.DEBUG]: "log",
        [H.VERBOSE]: "log",
        [H.INFO]: "info",
        [H.WARN]: "warn",
        [H.ERROR]: "error",
    },
    hl = (e, t, ...n) => {
        if (t < e.logLevel) return;
        const r = new Date().toISOString(),
            s = dl[t];
        if (s) console[s](`[${r}]  ${e.name}:`, ...n);
        else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
    };
class pl {
    constructor(t) {
        (this.name = t),
            (this._logLevel = ul),
            (this._logHandler = hl),
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
        this._logLevel = typeof t == "string" ? fl[t] : t;
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
const gl = (e, t) => t.some((n) => e instanceof n);
let ms, bs;
function ml() {
    return ms || (ms = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function bl() {
    return (
        bs ||
        (bs = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ])
    );
}
const xi = new WeakMap(),
    Xn = new WeakMap(),
    Mi = new WeakMap(),
    Sn = new WeakMap(),
    Cr = new WeakMap();
function _l(e) {
    const t = new Promise((n, r) => {
        const s = () => {
                e.removeEventListener("success", i), e.removeEventListener("error", o);
            },
            i = () => {
                n(xe(e.result)), s();
            },
            o = () => {
                r(e.error), s();
            };
        e.addEventListener("success", i), e.addEventListener("error", o);
    });
    return (
        t
            .then((n) => {
                n instanceof IDBCursor && xi.set(n, e);
            })
            .catch(() => {}),
        Cr.set(t, e),
        t
    );
}
function yl(e) {
    if (Xn.has(e)) return;
    const t = new Promise((n, r) => {
        const s = () => {
                e.removeEventListener("complete", i),
                    e.removeEventListener("error", o),
                    e.removeEventListener("abort", o);
            },
            i = () => {
                n(), s();
            },
            o = () => {
                r(e.error || new DOMException("AbortError", "AbortError")), s();
            };
        e.addEventListener("complete", i),
            e.addEventListener("error", o),
            e.addEventListener("abort", o);
    });
    Xn.set(e, t);
}
let Qn = {
    get(e, t, n) {
        if (e instanceof IDBTransaction) {
            if (t === "done") return Xn.get(e);
            if (t === "objectStoreNames") return e.objectStoreNames || Mi.get(e);
            if (t === "store")
                return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
        }
        return xe(e[t]);
    },
    set(e, t, n) {
        return (e[t] = n), !0;
    },
    has(e, t) {
        return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
    },
};
function wl(e) {
    Qn = e(Qn);
}
function El(e) {
    return e === IDBDatabase.prototype.transaction &&
        !("objectStoreNames" in IDBTransaction.prototype)
        ? function (t, ...n) {
              const r = e.call(On(this), t, ...n);
              return Mi.set(r, t.sort ? t.sort() : [t]), xe(r);
          }
        : bl().includes(e)
        ? function (...t) {
              return e.apply(On(this), t), xe(xi.get(this));
          }
        : function (...t) {
              return xe(e.apply(On(this), t));
          };
}
function Il(e) {
    return typeof e == "function"
        ? El(e)
        : (e instanceof IDBTransaction && yl(e), gl(e, ml()) ? new Proxy(e, Qn) : e);
}
function xe(e) {
    if (e instanceof IDBRequest) return _l(e);
    if (Sn.has(e)) return Sn.get(e);
    const t = Il(e);
    return t !== e && (Sn.set(e, t), Cr.set(t, e)), t;
}
const On = (e) => Cr.get(e);
function hn(e, t, { blocked: n, upgrade: r, blocking: s, terminated: i } = {}) {
    const o = indexedDB.open(e, t),
        a = xe(o);
    return (
        r &&
            o.addEventListener("upgradeneeded", (l) => {
                r(xe(o.result), l.oldVersion, l.newVersion, xe(o.transaction));
            }),
        n && o.addEventListener("blocked", () => n()),
        a
            .then((l) => {
                i && l.addEventListener("close", () => i()),
                    s && l.addEventListener("versionchange", () => s());
            })
            .catch(() => {}),
        a
    );
}
function Dn(e, { blocked: t } = {}) {
    const n = indexedDB.deleteDatabase(e);
    return t && n.addEventListener("blocked", () => t()), xe(n).then(() => {});
}
const vl = ["get", "getKey", "getAll", "getAllKeys", "count"],
    Tl = ["put", "add", "delete", "clear"],
    xn = new Map();
function _s(e, t) {
    if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
    if (xn.get(t)) return xn.get(t);
    const n = t.replace(/FromIndex$/, ""),
        r = t !== n,
        s = Tl.includes(n);
    if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || vl.includes(n))) return;
    const i = async function (o, ...a) {
        const l = this.transaction(o, s ? "readwrite" : "readonly");
        let u = l.store;
        return r && (u = u.index(a.shift())), (await Promise.all([u[n](...a), s && l.done]))[0];
    };
    return xn.set(t, i), i;
}
wl((e) => ({
    ...e,
    get: (t, n, r) => _s(t, n) || e.get(t, n, r),
    has: (t, n) => !!_s(t, n) || e.has(t, n),
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
 */ class Cl {
    constructor(t) {
        this.container = t;
    }
    getPlatformInfoString() {
        return this.container
            .getProviders()
            .map((n) => {
                if (Al(n)) {
                    const r = n.getImmediate();
                    return `${r.library}/${r.version}`;
                } else return null;
            })
            .filter((n) => n)
            .join(" ");
    }
}
function Al(e) {
    const t = e.getComponent();
    return (t == null ? void 0 : t.type) === "VERSION";
}
const Zn = "@firebase/app",
    ys = "0.9.3";
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
 */ const nt = new pl("@firebase/app"),
    Sl = "@firebase/app-compat",
    Ol = "@firebase/analytics-compat",
    Dl = "@firebase/analytics",
    xl = "@firebase/app-check-compat",
    Ml = "@firebase/app-check",
    Nl = "@firebase/auth",
    Pl = "@firebase/auth-compat",
    kl = "@firebase/database",
    Rl = "@firebase/database-compat",
    Bl = "@firebase/functions",
    Fl = "@firebase/functions-compat",
    $l = "@firebase/installations",
    Ll = "@firebase/installations-compat",
    jl = "@firebase/messaging",
    Hl = "@firebase/messaging-compat",
    Kl = "@firebase/performance",
    Ul = "@firebase/performance-compat",
    Wl = "@firebase/remote-config",
    Vl = "@firebase/remote-config-compat",
    ql = "@firebase/storage",
    zl = "@firebase/storage-compat",
    Jl = "@firebase/firestore",
    Yl = "@firebase/firestore-compat",
    Gl = "firebase";
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
 */ const er = "[DEFAULT]",
    Xl = {
        [Zn]: "fire-core",
        [Sl]: "fire-core-compat",
        [Dl]: "fire-analytics",
        [Ol]: "fire-analytics-compat",
        [Ml]: "fire-app-check",
        [xl]: "fire-app-check-compat",
        [Nl]: "fire-auth",
        [Pl]: "fire-auth-compat",
        [kl]: "fire-rtdb",
        [Rl]: "fire-rtdb-compat",
        [Bl]: "fire-fn",
        [Fl]: "fire-fn-compat",
        [$l]: "fire-iid",
        [Ll]: "fire-iid-compat",
        [jl]: "fire-fcm",
        [Hl]: "fire-fcm-compat",
        [Kl]: "fire-perf",
        [Ul]: "fire-perf-compat",
        [Wl]: "fire-rc",
        [Vl]: "fire-rc-compat",
        [ql]: "fire-gcs",
        [zl]: "fire-gcs-compat",
        [Jl]: "fire-fst",
        [Yl]: "fire-fst-compat",
        "fire-js": "fire-js",
        [Gl]: "fire-js-all",
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
    tr = new Map();
function Ql(e, t) {
    try {
        e.container.addComponent(t);
    } catch (n) {
        nt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n);
    }
}
function rt(e) {
    const t = e.name;
    if (tr.has(t)) return nt.debug(`There were multiple attempts to register component ${t}.`), !1;
    tr.set(t, e);
    for (const n of Qt.values()) Ql(n, e);
    return !0;
}
function Ar(e, t) {
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
 */ const Zl = {
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
    $e = new dn("app", "Firebase", Zl);
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
 */ class ef {
    constructor(t, n, r) {
        (this._isDeleted = !1),
            (this._options = Object.assign({}, t)),
            (this._config = Object.assign({}, n)),
            (this._name = n.name),
            (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
            (this._container = r),
            this.container.addComponent(new Ke("app", () => this, "PUBLIC"));
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
        if (this.isDeleted) throw $e.create("app-deleted", { appName: this._name });
    }
}
function Ni(e, t = {}) {
    let n = e;
    typeof t != "object" && (t = { name: t });
    const r = Object.assign({ name: er, automaticDataCollectionEnabled: !1 }, t),
        s = r.name;
    if (typeof s != "string" || !s) throw $e.create("bad-app-name", { appName: String(s) });
    if ((n || (n = el()), !n)) throw $e.create("no-options");
    const i = Qt.get(s);
    if (i) {
        if (Gn(n, i.options) && Gn(r, i.config)) return i;
        throw $e.create("duplicate-app", { appName: s });
    }
    const o = new ll(s);
    for (const l of tr.values()) o.addComponent(l);
    const a = new ef(n, r, o);
    return Qt.set(s, a), a;
}
function tf(e = er) {
    const t = Qt.get(e);
    if (!t && e === er) return Ni();
    if (!t) throw $e.create("no-app", { appName: e });
    return t;
}
function Le(e, t, n) {
    var r;
    let s = (r = Xl[e]) !== null && r !== void 0 ? r : e;
    n && (s += `-${n}`);
    const i = s.match(/\s|\//),
        o = t.match(/\s|\//);
    if (i || o) {
        const a = [`Unable to register library "${s}" with version "${t}":`];
        i && a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),
            i && o && a.push("and"),
            o && a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
            nt.warn(a.join(" "));
        return;
    }
    rt(new Ke(`${s}-version`, () => ({ library: s, version: t }), "VERSION"));
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
 */ const nf = "firebase-heartbeat-database",
    rf = 1,
    kt = "firebase-heartbeat-store";
let Mn = null;
function Pi() {
    return (
        Mn ||
            (Mn = hn(nf, rf, {
                upgrade: (e, t) => {
                    switch (t) {
                        case 0:
                            e.createObjectStore(kt);
                    }
                },
            }).catch((e) => {
                throw $e.create("idb-open", { originalErrorMessage: e.message });
            })),
        Mn
    );
}
async function sf(e) {
    try {
        return (await Pi()).transaction(kt).objectStore(kt).get(ki(e));
    } catch (t) {
        if (t instanceof Et) nt.warn(t.message);
        else {
            const n = $e.create("idb-get", {
                originalErrorMessage: t == null ? void 0 : t.message,
            });
            nt.warn(n.message);
        }
    }
}
async function ws(e, t) {
    try {
        const r = (await Pi()).transaction(kt, "readwrite");
        return await r.objectStore(kt).put(t, ki(e)), r.done;
    } catch (n) {
        if (n instanceof Et) nt.warn(n.message);
        else {
            const r = $e.create("idb-set", {
                originalErrorMessage: n == null ? void 0 : n.message,
            });
            nt.warn(r.message);
        }
    }
}
function ki(e) {
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
 */ const of = 1024,
    af = 30 * 24 * 60 * 60 * 1e3;
class cf {
    constructor(t) {
        (this.container = t), (this._heartbeatsCache = null);
        const n = this.container.getProvider("app").getImmediate();
        (this._storage = new ff(n)),
            (this._heartbeatsCachePromise = this._storage
                .read()
                .then((r) => ((this._heartbeatsCache = r), r)));
    }
    async triggerHeartbeat() {
        const n = this.container
                .getProvider("platform-logger")
                .getImmediate()
                .getPlatformInfoString(),
            r = Es();
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
                    const i = new Date(s.date).valueOf();
                    return Date.now() - i <= af;
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
        const t = Es(),
            { heartbeatsToSend: n, unsentEntries: r } = lf(this._heartbeatsCache.heartbeats),
            s = Si(JSON.stringify({ version: 2, heartbeats: n }));
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
function Es() {
    return new Date().toISOString().substring(0, 10);
}
function lf(e, t = of) {
    const n = [];
    let r = e.slice();
    for (const s of e) {
        const i = n.find((o) => o.agent === s.agent);
        if (i) {
            if ((i.dates.push(s.date), Is(n) > t)) {
                i.dates.pop();
                break;
            }
        } else if ((n.push({ agent: s.agent, dates: [s.date] }), Is(n) > t)) {
            n.pop();
            break;
        }
        r = r.slice(1);
    }
    return { heartbeatsToSend: n, unsentEntries: r };
}
class ff {
    constructor(t) {
        (this.app = t), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
        return Oi()
            ? Di()
                  .then(() => !0)
                  .catch(() => !1)
            : !1;
    }
    async read() {
        return (await this._canUseIndexedDBPromise)
            ? (await sf(this.app)) || { heartbeats: [] }
            : { heartbeats: [] };
    }
    async overwrite(t) {
        var n;
        if (await this._canUseIndexedDBPromise) {
            const s = await this.read();
            return ws(this.app, {
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
            return ws(this.app, {
                lastSentHeartbeatDate:
                    (n = t.lastSentHeartbeatDate) !== null && n !== void 0
                        ? n
                        : s.lastSentHeartbeatDate,
                heartbeats: [...s.heartbeats, ...t.heartbeats],
            });
        } else return;
    }
}
function Is(e) {
    return Si(JSON.stringify({ version: 2, heartbeats: e })).length;
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
 */ function uf(e) {
    rt(new Ke("platform-logger", (t) => new Cl(t), "PRIVATE")),
        rt(new Ke("heartbeat", (t) => new cf(t), "PRIVATE")),
        Le(Zn, ys, e),
        Le(Zn, ys, "esm2017"),
        Le("fire-js", "");
}
uf("");
var df = "firebase",
    hf = "9.17.1";
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
 */ Le(df, hf, "app");
const Ri = "@firebase/installations",
    Sr = "0.6.3";
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
 */ const Bi = 1e4,
    Fi = `w:${Sr}`,
    $i = "FIS_v2",
    pf = "https://firebaseinstallations.googleapis.com/v1",
    gf = 60 * 60 * 1e3,
    mf = "installations",
    bf = "Installations";
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
 */ const _f = {
        ["missing-app-config-values"]: 'Missing App configuration value: "{$valueName}"',
        ["not-registered"]: "Firebase Installation is not registered.",
        ["installation-not-found"]: "Firebase Installation not found.",
        ["request-failed"]:
            '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        ["app-offline"]: "Could not process request. Application offline.",
        ["delete-pending-registration"]:
            "Can't delete installation while there is a pending registration request.",
    },
    st = new dn(mf, bf, _f);
function Li(e) {
    return e instanceof Et && e.code.includes("request-failed");
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
 */ function ji({ projectId: e }) {
    return `${pf}/projects/${e}/installations`;
}
function Hi(e) {
    return {
        token: e.token,
        requestStatus: 2,
        expiresIn: wf(e.expiresIn),
        creationTime: Date.now(),
    };
}
async function Ki(e, t) {
    const r = (await t.json()).error;
    return st.create("request-failed", {
        requestName: e,
        serverCode: r.code,
        serverMessage: r.message,
        serverStatus: r.status,
    });
}
function Ui({ apiKey: e }) {
    return new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": e,
    });
}
function yf(e, { refreshToken: t }) {
    const n = Ui(e);
    return n.append("Authorization", Ef(t)), n;
}
async function Wi(e) {
    const t = await e();
    return t.status >= 500 && t.status < 600 ? e() : t;
}
function wf(e) {
    return Number(e.replace("s", "000"));
}
function Ef(e) {
    return `${$i} ${e}`;
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
 */ async function If({ appConfig: e, heartbeatServiceProvider: t }, { fid: n }) {
    const r = ji(e),
        s = Ui(e),
        i = t.getImmediate({ optional: !0 });
    if (i) {
        const u = await i.getHeartbeatsHeader();
        u && s.append("x-firebase-client", u);
    }
    const o = { fid: n, authVersion: $i, appId: e.appId, sdkVersion: Fi },
        a = { method: "POST", headers: s, body: JSON.stringify(o) },
        l = await Wi(() => fetch(r, a));
    if (l.ok) {
        const u = await l.json();
        return {
            fid: u.fid || n,
            registrationStatus: 2,
            refreshToken: u.refreshToken,
            authToken: Hi(u.authToken),
        };
    } else throw await Ki("Create Installation", l);
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
 */ function Vi(e) {
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
 */ function vf(e) {
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
 */ const Tf = /^[cdef][\w-]{21}$/,
    nr = "";
function Cf() {
    try {
        const e = new Uint8Array(17);
        (self.crypto || self.msCrypto).getRandomValues(e), (e[0] = 112 + (e[0] % 16));
        const n = Af(e);
        return Tf.test(n) ? n : nr;
    } catch {
        return nr;
    }
}
function Af(e) {
    return vf(e).substr(0, 22);
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
 */ function pn(e) {
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
 */ const qi = new Map();
function zi(e, t) {
    const n = pn(e);
    Ji(n, t), Sf(n, t);
}
function Ji(e, t) {
    const n = qi.get(e);
    if (n) for (const r of n) r(t);
}
function Sf(e, t) {
    const n = Of();
    n && n.postMessage({ key: e, fid: t }), Df();
}
let Qe = null;
function Of() {
    return (
        !Qe &&
            "BroadcastChannel" in self &&
            ((Qe = new BroadcastChannel("[Firebase] FID Change")),
            (Qe.onmessage = (e) => {
                Ji(e.data.key, e.data.fid);
            })),
        Qe
    );
}
function Df() {
    qi.size === 0 && Qe && (Qe.close(), (Qe = null));
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
 */ const xf = "firebase-installations-database",
    Mf = 1,
    it = "firebase-installations-store";
let Nn = null;
function Or() {
    return (
        Nn ||
            (Nn = hn(xf, Mf, {
                upgrade: (e, t) => {
                    switch (t) {
                        case 0:
                            e.createObjectStore(it);
                    }
                },
            })),
        Nn
    );
}
async function Zt(e, t) {
    const n = pn(e),
        s = (await Or()).transaction(it, "readwrite"),
        i = s.objectStore(it),
        o = await i.get(n);
    return await i.put(t, n), await s.done, (!o || o.fid !== t.fid) && zi(e, t.fid), t;
}
async function Yi(e) {
    const t = pn(e),
        r = (await Or()).transaction(it, "readwrite");
    await r.objectStore(it).delete(t), await r.done;
}
async function gn(e, t) {
    const n = pn(e),
        s = (await Or()).transaction(it, "readwrite"),
        i = s.objectStore(it),
        o = await i.get(n),
        a = t(o);
    return (
        a === void 0 ? await i.delete(n) : await i.put(a, n),
        await s.done,
        a && (!o || o.fid !== a.fid) && zi(e, a.fid),
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
 */ async function Dr(e) {
    let t;
    const n = await gn(e.appConfig, (r) => {
        const s = Nf(r),
            i = Pf(e, s);
        return (t = i.registrationPromise), i.installationEntry;
    });
    return n.fid === nr
        ? { installationEntry: await t }
        : { installationEntry: n, registrationPromise: t };
}
function Nf(e) {
    const t = e || { fid: Cf(), registrationStatus: 0 };
    return Gi(t);
}
function Pf(e, t) {
    if (t.registrationStatus === 0) {
        if (!navigator.onLine) {
            const s = Promise.reject(st.create("app-offline"));
            return { installationEntry: t, registrationPromise: s };
        }
        const n = { fid: t.fid, registrationStatus: 1, registrationTime: Date.now() },
            r = kf(e, n);
        return { installationEntry: n, registrationPromise: r };
    } else
        return t.registrationStatus === 1
            ? { installationEntry: t, registrationPromise: Rf(e) }
            : { installationEntry: t };
}
async function kf(e, t) {
    try {
        const n = await If(e, t);
        return Zt(e.appConfig, n);
    } catch (n) {
        throw (
            (Li(n) && n.customData.serverCode === 409
                ? await Yi(e.appConfig)
                : await Zt(e.appConfig, { fid: t.fid, registrationStatus: 0 }),
            n)
        );
    }
}
async function Rf(e) {
    let t = await vs(e.appConfig);
    for (; t.registrationStatus === 1; ) await Vi(100), (t = await vs(e.appConfig));
    if (t.registrationStatus === 0) {
        const { installationEntry: n, registrationPromise: r } = await Dr(e);
        return r || n;
    }
    return t;
}
function vs(e) {
    return gn(e, (t) => {
        if (!t) throw st.create("installation-not-found");
        return Gi(t);
    });
}
function Gi(e) {
    return Bf(e) ? { fid: e.fid, registrationStatus: 0 } : e;
}
function Bf(e) {
    return e.registrationStatus === 1 && e.registrationTime + Bi < Date.now();
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
 */ async function Ff({ appConfig: e, heartbeatServiceProvider: t }, n) {
    const r = $f(e, n),
        s = yf(e, n),
        i = t.getImmediate({ optional: !0 });
    if (i) {
        const u = await i.getHeartbeatsHeader();
        u && s.append("x-firebase-client", u);
    }
    const o = { installation: { sdkVersion: Fi, appId: e.appId } },
        a = { method: "POST", headers: s, body: JSON.stringify(o) },
        l = await Wi(() => fetch(r, a));
    if (l.ok) {
        const u = await l.json();
        return Hi(u);
    } else throw await Ki("Generate Auth Token", l);
}
function $f(e, { fid: t }) {
    return `${ji(e)}/${t}/authTokens:generate`;
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
 */ async function xr(e, t = !1) {
    let n;
    const r = await gn(e.appConfig, (i) => {
        if (!Xi(i)) throw st.create("not-registered");
        const o = i.authToken;
        if (!t && Hf(o)) return i;
        if (o.requestStatus === 1) return (n = Lf(e, t)), i;
        {
            if (!navigator.onLine) throw st.create("app-offline");
            const a = Uf(i);
            return (n = jf(e, a)), a;
        }
    });
    return n ? await n : r.authToken;
}
async function Lf(e, t) {
    let n = await Ts(e.appConfig);
    for (; n.authToken.requestStatus === 1; ) await Vi(100), (n = await Ts(e.appConfig));
    const r = n.authToken;
    return r.requestStatus === 0 ? xr(e, t) : r;
}
function Ts(e) {
    return gn(e, (t) => {
        if (!Xi(t)) throw st.create("not-registered");
        const n = t.authToken;
        return Wf(n) ? Object.assign(Object.assign({}, t), { authToken: { requestStatus: 0 } }) : t;
    });
}
async function jf(e, t) {
    try {
        const n = await Ff(e, t),
            r = Object.assign(Object.assign({}, t), { authToken: n });
        return await Zt(e.appConfig, r), n;
    } catch (n) {
        if (Li(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
            await Yi(e.appConfig);
        else {
            const r = Object.assign(Object.assign({}, t), { authToken: { requestStatus: 0 } });
            await Zt(e.appConfig, r);
        }
        throw n;
    }
}
function Xi(e) {
    return e !== void 0 && e.registrationStatus === 2;
}
function Hf(e) {
    return e.requestStatus === 2 && !Kf(e);
}
function Kf(e) {
    const t = Date.now();
    return t < e.creationTime || e.creationTime + e.expiresIn < t + gf;
}
function Uf(e) {
    const t = { requestStatus: 1, requestTime: Date.now() };
    return Object.assign(Object.assign({}, e), { authToken: t });
}
function Wf(e) {
    return e.requestStatus === 1 && e.requestTime + Bi < Date.now();
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
 */ async function Vf(e) {
    const t = e,
        { installationEntry: n, registrationPromise: r } = await Dr(t);
    return r ? r.catch(console.error) : xr(t).catch(console.error), n.fid;
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
 */ async function qf(e, t = !1) {
    const n = e;
    return await zf(n), (await xr(n, t)).token;
}
async function zf(e) {
    const { registrationPromise: t } = await Dr(e);
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
 */ function Jf(e) {
    if (!e || !e.options) throw Pn("App Configuration");
    if (!e.name) throw Pn("App Name");
    const t = ["projectId", "apiKey", "appId"];
    for (const n of t) if (!e.options[n]) throw Pn(n);
    return {
        appName: e.name,
        projectId: e.options.projectId,
        apiKey: e.options.apiKey,
        appId: e.options.appId,
    };
}
function Pn(e) {
    return st.create("missing-app-config-values", { valueName: e });
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
 */ const Qi = "installations",
    Yf = "installations-internal",
    Gf = (e) => {
        const t = e.getProvider("app").getImmediate(),
            n = Jf(t),
            r = Ar(t, "heartbeat");
        return {
            app: t,
            appConfig: n,
            heartbeatServiceProvider: r,
            _delete: () => Promise.resolve(),
        };
    },
    Xf = (e) => {
        const t = e.getProvider("app").getImmediate(),
            n = Ar(t, Qi).getImmediate();
        return { getId: () => Vf(n), getToken: (s) => qf(n, s) };
    };
function Qf() {
    rt(new Ke(Qi, Gf, "PUBLIC")), rt(new Ke(Yf, Xf, "PRIVATE"));
}
Qf();
Le(Ri, Sr);
Le(Ri, Sr, "esm2017");
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
 */ const Zf = "/safesay/firebase-messaging-sw.js",
    eu = "/safesay/firebase-cloud-messaging-push-scope",
    Zi = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",
    tu = "https://fcmregistrations.googleapis.com/v1",
    eo = "google.c.a.c_id",
    nu = "google.c.a.c_l",
    ru = "google.c.a.ts",
    su = "google.c.a.e";
var Cs;
(function (e) {
    (e[(e.DATA_MESSAGE = 1)] = "DATA_MESSAGE"),
        (e[(e.DISPLAY_NOTIFICATION = 3)] = "DISPLAY_NOTIFICATION");
})(Cs || (Cs = {}));
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
 */ var Rt;
(function (e) {
    (e.PUSH_RECEIVED = "push-received"), (e.NOTIFICATION_CLICKED = "notification-clicked");
})(Rt || (Rt = {}));
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
 */ function Oe(e) {
    const t = new Uint8Array(e);
    return btoa(String.fromCharCode(...t))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
function iu(e) {
    const t = "=".repeat((4 - (e.length % 4)) % 4),
        n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"),
        r = atob(n),
        s = new Uint8Array(r.length);
    for (let i = 0; i < r.length; ++i) s[i] = r.charCodeAt(i);
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
 */ const kn = "fcm_token_details_db",
    ou = 5,
    As = "fcm_token_object_Store";
async function au(e) {
    if ("databases" in indexedDB && !(await indexedDB.databases()).map((i) => i.name).includes(kn))
        return null;
    let t = null;
    return (
        (
            await hn(kn, ou, {
                upgrade: async (r, s, i, o) => {
                    var a;
                    if (s < 2 || !r.objectStoreNames.contains(As)) return;
                    const l = o.objectStore(As),
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
                                        typeof d.vapidKey == "string" ? d.vapidKey : Oe(d.vapidKey),
                                },
                            };
                        } else if (s === 3) {
                            const d = u;
                            t = {
                                token: d.fcmToken,
                                createTime: d.createTime,
                                subscriptionOptions: {
                                    auth: Oe(d.auth),
                                    p256dh: Oe(d.p256dh),
                                    endpoint: d.endpoint,
                                    swScope: d.swScope,
                                    vapidKey: Oe(d.vapidKey),
                                },
                            };
                        } else if (s === 4) {
                            const d = u;
                            t = {
                                token: d.fcmToken,
                                createTime: d.createTime,
                                subscriptionOptions: {
                                    auth: Oe(d.auth),
                                    p256dh: Oe(d.p256dh),
                                    endpoint: d.endpoint,
                                    swScope: d.swScope,
                                    vapidKey: Oe(d.vapidKey),
                                },
                            };
                        }
                    }
                },
            })
        ).close(),
        await Dn(kn),
        await Dn("fcm_vapid_details_db"),
        await Dn("undefined"),
        cu(t) ? t : null
    );
}
function cu(e) {
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
 */ const lu = "firebase-messaging-database",
    fu = 1,
    ot = "firebase-messaging-store";
let Rn = null;
function Mr() {
    return (
        Rn ||
            (Rn = hn(lu, fu, {
                upgrade: (e, t) => {
                    switch (t) {
                        case 0:
                            e.createObjectStore(ot);
                    }
                },
            })),
        Rn
    );
}
async function to(e) {
    const t = Pr(e),
        r = await (await Mr()).transaction(ot).objectStore(ot).get(t);
    if (r) return r;
    {
        const s = await au(e.appConfig.senderId);
        if (s) return await Nr(e, s), s;
    }
}
async function Nr(e, t) {
    const n = Pr(e),
        s = (await Mr()).transaction(ot, "readwrite");
    return await s.objectStore(ot).put(t, n), await s.done, t;
}
async function uu(e) {
    const t = Pr(e),
        r = (await Mr()).transaction(ot, "readwrite");
    await r.objectStore(ot).delete(t), await r.done;
}
function Pr({ appConfig: e }) {
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
 */ const du = {
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
    te = new dn("messaging", "Messaging", du);
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
 */ async function hu(e, t) {
    const n = await Rr(e),
        r = ro(t),
        s = { method: "POST", headers: n, body: JSON.stringify(r) };
    let i;
    try {
        i = await (await fetch(kr(e.appConfig), s)).json();
    } catch (o) {
        throw te.create("token-subscribe-failed", { errorInfo: o == null ? void 0 : o.toString() });
    }
    if (i.error) {
        const o = i.error.message;
        throw te.create("token-subscribe-failed", { errorInfo: o });
    }
    if (!i.token) throw te.create("token-subscribe-no-token");
    return i.token;
}
async function pu(e, t) {
    const n = await Rr(e),
        r = ro(t.subscriptionOptions),
        s = { method: "PATCH", headers: n, body: JSON.stringify(r) };
    let i;
    try {
        i = await (await fetch(`${kr(e.appConfig)}/${t.token}`, s)).json();
    } catch (o) {
        throw te.create("token-update-failed", { errorInfo: o == null ? void 0 : o.toString() });
    }
    if (i.error) {
        const o = i.error.message;
        throw te.create("token-update-failed", { errorInfo: o });
    }
    if (!i.token) throw te.create("token-update-no-token");
    return i.token;
}
async function no(e, t) {
    const r = { method: "DELETE", headers: await Rr(e) };
    try {
        const i = await (await fetch(`${kr(e.appConfig)}/${t}`, r)).json();
        if (i.error) {
            const o = i.error.message;
            throw te.create("token-unsubscribe-failed", { errorInfo: o });
        }
    } catch (s) {
        throw te.create("token-unsubscribe-failed", {
            errorInfo: s == null ? void 0 : s.toString(),
        });
    }
}
function kr({ projectId: e }) {
    return `${tu}/projects/${e}/registrations`;
}
async function Rr({ appConfig: e, installations: t }) {
    const n = await t.getToken();
    return new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": e.apiKey,
        "x-goog-firebase-installations-auth": `FIS ${n}`,
    });
}
function ro({ p256dh: e, auth: t, endpoint: n, vapidKey: r }) {
    const s = { web: { endpoint: n, auth: t, p256dh: e } };
    return r !== Zi && (s.web.applicationPubKey = r), s;
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
 */ const gu = 7 * 24 * 60 * 60 * 1e3;
async function mu(e) {
    const t = await yu(e.swRegistration, e.vapidKey),
        n = {
            vapidKey: e.vapidKey,
            swScope: e.swRegistration.scope,
            endpoint: t.endpoint,
            auth: Oe(t.getKey("auth")),
            p256dh: Oe(t.getKey("p256dh")),
        },
        r = await to(e.firebaseDependencies);
    if (r) {
        if (wu(r.subscriptionOptions, n))
            return Date.now() >= r.createTime + gu
                ? _u(e, { token: r.token, createTime: Date.now(), subscriptionOptions: n })
                : r.token;
        try {
            await no(e.firebaseDependencies, r.token);
        } catch (s) {
            console.warn(s);
        }
        return Ss(e.firebaseDependencies, n);
    } else return Ss(e.firebaseDependencies, n);
}
async function bu(e) {
    const t = await to(e.firebaseDependencies);
    t && (await no(e.firebaseDependencies, t.token), await uu(e.firebaseDependencies));
    const n = await e.swRegistration.pushManager.getSubscription();
    return n ? n.unsubscribe() : !0;
}
async function _u(e, t) {
    try {
        const n = await pu(e.firebaseDependencies, t),
            r = Object.assign(Object.assign({}, t), { token: n, createTime: Date.now() });
        return await Nr(e.firebaseDependencies, r), n;
    } catch (n) {
        throw (await bu(e), n);
    }
}
async function Ss(e, t) {
    const r = { token: await hu(e, t), createTime: Date.now(), subscriptionOptions: t };
    return await Nr(e, r), r.token;
}
async function yu(e, t) {
    const n = await e.pushManager.getSubscription();
    return n || e.pushManager.subscribe({ userVisibleOnly: !0, applicationServerKey: iu(t) });
}
function wu(e, t) {
    const n = t.vapidKey === e.vapidKey,
        r = t.endpoint === e.endpoint,
        s = t.auth === e.auth,
        i = t.p256dh === e.p256dh;
    return n && r && s && i;
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
 */ function Os(e) {
    const t = { from: e.from, collapseKey: e.collapse_key, messageId: e.fcmMessageId };
    return Eu(t, e), Iu(t, e), vu(t, e), t;
}
function Eu(e, t) {
    if (!t.notification) return;
    e.notification = {};
    const n = t.notification.title;
    n && (e.notification.title = n);
    const r = t.notification.body;
    r && (e.notification.body = r);
    const s = t.notification.image;
    s && (e.notification.image = s);
    const i = t.notification.icon;
    i && (e.notification.icon = i);
}
function Iu(e, t) {
    t.data && (e.data = t.data);
}
function vu(e, t) {
    var n, r, s, i, o;
    if (!t.fcmOptions && !(!((n = t.notification) === null || n === void 0) && n.click_action))
        return;
    e.fcmOptions = {};
    const a =
        (s = (r = t.fcmOptions) === null || r === void 0 ? void 0 : r.link) !== null && s !== void 0
            ? s
            : (i = t.notification) === null || i === void 0
            ? void 0
            : i.click_action;
    a && (e.fcmOptions.link = a);
    const l = (o = t.fcmOptions) === null || o === void 0 ? void 0 : o.analytics_label;
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
 */ function Tu(e) {
    return typeof e == "object" && !!e && eo in e;
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
 */ so("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
so("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
function so(e, t) {
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
 */ function Cu(e) {
    if (!e || !e.options) throw Bn("App Configuration Object");
    if (!e.name) throw Bn("App Name");
    const t = ["projectId", "apiKey", "appId", "messagingSenderId"],
        { options: n } = e;
    for (const r of t) if (!n[r]) throw Bn(r);
    return {
        appName: e.name,
        projectId: n.projectId,
        apiKey: n.apiKey,
        appId: n.appId,
        senderId: n.messagingSenderId,
    };
}
function Bn(e) {
    return te.create("missing-app-config-values", { valueName: e });
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
 */ class Au {
    constructor(t, n, r) {
        (this.deliveryMetricsExportedToBigQueryEnabled = !1),
            (this.onBackgroundMessageHandler = null),
            (this.onMessageHandler = null),
            (this.logEvents = []),
            (this.isLogServiceStarted = !1);
        const s = Cu(t);
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
 */ async function Su(e) {
    try {
        (e.swRegistration = await navigator.serviceWorker.register(Zf, { scope: eu })),
            e.swRegistration.update().catch(() => {});
    } catch (t) {
        throw te.create("failed-service-worker-registration", {
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
 */ async function Ou(e, t) {
    if ((!t && !e.swRegistration && (await Su(e)), !(!t && e.swRegistration))) {
        if (!(t instanceof ServiceWorkerRegistration)) throw te.create("invalid-sw-registration");
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
 */ async function Du(e, t) {
    t ? (e.vapidKey = t) : e.vapidKey || (e.vapidKey = Zi);
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
 */ async function io(e, t) {
    if (!navigator) throw te.create("only-available-in-window");
    if (
        (Notification.permission === "default" && (await Notification.requestPermission()),
        Notification.permission !== "granted")
    )
        throw te.create("permission-blocked");
    return (
        await Du(e, t == null ? void 0 : t.vapidKey),
        await Ou(e, t == null ? void 0 : t.serviceWorkerRegistration),
        mu(e)
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
 */ async function xu(e, t, n) {
    const r = Mu(t);
    (await e.firebaseDependencies.analyticsProvider.get()).logEvent(r, {
        message_id: n[eo],
        message_name: n[nu],
        message_time: n[ru],
        message_device_time: Math.floor(Date.now() / 1e3),
    });
}
function Mu(e) {
    switch (e) {
        case Rt.NOTIFICATION_CLICKED:
            return "notification_open";
        case Rt.PUSH_RECEIVED:
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
 */ async function Nu(e, t) {
    const n = t.data;
    if (!n.isFirebaseMessaging) return;
    e.onMessageHandler &&
        n.messageType === Rt.PUSH_RECEIVED &&
        (typeof e.onMessageHandler == "function"
            ? e.onMessageHandler(Os(n))
            : e.onMessageHandler.next(Os(n)));
    const r = n.data;
    Tu(r) && r[su] === "1" && (await xu(e, n.messageType, r));
}
const Ds = "@firebase/messaging",
    xs = "0.12.3";
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
 */ const Pu = (e) => {
        const t = new Au(
            e.getProvider("app").getImmediate(),
            e.getProvider("installations-internal").getImmediate(),
            e.getProvider("analytics-internal")
        );
        return navigator.serviceWorker.addEventListener("message", (n) => Nu(t, n)), t;
    },
    ku = (e) => {
        const t = e.getProvider("messaging").getImmediate();
        return { getToken: (r) => io(t, r) };
    };
function Ru() {
    rt(new Ke("messaging", Pu, "PUBLIC")),
        rt(new Ke("messaging-internal", ku, "PRIVATE")),
        Le(Ds, xs),
        Le(Ds, xs, "esm2017");
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
 */ async function Bu() {
    try {
        await Di();
    } catch {
        return !1;
    }
    return (
        typeof window < "u" &&
        Oi() &&
        nl() &&
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
 */ function Fu(e, t) {
    if (!navigator) throw te.create("only-available-in-window");
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
 */ function $u(e = tf()) {
    return (
        Bu().then(
            (t) => {
                if (!t) throw te.create("unsupported-browser");
            },
            (t) => {
                throw te.create("indexed-db-unsupported");
            }
        ),
        Ar(Tr(e), "messaging").getImmediate()
    );
}
async function Lu(e, t) {
    return (e = Tr(e)), io(e, t);
}
function ju(e, t) {
    return (e = Tr(e)), Fu(e, t);
}
Ru();
const Hu = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [r, s] of t) n[r] = s;
        return n;
    },
    Ku = (e) => (pa("data-v-d9534d1e"), (e = e()), ga(), e),
    Uu = Ku(() => Nt("p", null, "Token is:", -1)),
    Wu = { style: { "word-break": "break-all" } },
    Vu = {
        __name: "App",
        setup(e) {
            Ni({
                apiKey: "AIzaSyDRW88ThMD_Oqse2gDHoDOmuI90-8jQI2o",
                authDomain: "talkod-backend.firebaseapp.com",
                projectId: "talkod-backend",
                storageBucket: "talkod-backend.appspot.com",
                messagingSenderId: "384579638016",
                appId: "1:384579638016:web:b4bb289ebe72d26ad0d9e5",
                measurementId: "G-TJQTGN6QPG",
            });
            const n = $u();
            ju(n, (i) => {
                console.log("Message received. ", i);
            });
            const r = ea(""),
                s = () => {
                    Lu(n, {
                        vapidKey:
                            "BOIhW3Sf8Zq-GBqvV192s8s--aB0hnX273ZgZEbITi8QitToyCqni8Ukp3p1YdxYnMFp-ACXBZQ5CWmSROKLOgQ",
                    })
                        .then((i) => {
                            i
                                ? (console.log("Token is:", i), (r.value = i))
                                : console.log(
                                      "No registration token available. Request permission to generate one."
                                  );
                        })
                        .catch((i) => {
                            console.log("An error occurred while retrieving token. ", i);
                        }),
                        "serviceWorker" in navigator
                            ? window.navigator.serviceWorker
                                  .register("/safesay/firebase-messaging-sw.js")
                                  .then(
                                      function (i) {
                                          const o = "SEND NOTIFICATION FROM CLICK EVENT",
                                              a = "send background message from click event";
                                          i.showNotification(o, { body: a });
                                      },
                                      function (i) {
                                          console.log("Service worker registration failed:", i);
                                      }
                                  )
                            : console.log("Service workers are not supported.");
                };
            return (i, o) => (
                nc(),
                ic(
                    pe,
                    null,
                    [
                        Uu,
                        Nt("h3", Wu, go(r.value), 1),
                        Nt("button", { onClick: s }, "Send Notification From Background"),
                    ],
                    64
                )
            );
        },
    },
    qu = Hu(Vu, [["__scopeId", "data-v-d9534d1e"]]);
Wc(qu).mount("#app");
