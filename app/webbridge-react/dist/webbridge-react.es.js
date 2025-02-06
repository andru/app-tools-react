import react, {
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "react";
const hn = (t) => t && Object.keys(t).length === 0 && t.constructor === Object;
function dn(t) {
  const e = {};
  if (!Array.isArray(t)) return e;
  for (const r of t) r && r.name && r.enabled && (e[r.name] = r);
  return e;
}
const pn = (t) => {
    if (!t) return {};
    const e = (n) =>
        Array.isArray(n)
          ? n.reduce(
              (a, { namespace: s, key: i, value: o }) => (
                a[s]
                  ? (a[s][i] = o)
                  : (a[s] = {
                      [i]: o,
                    }),
                a
              ),
              {}
            )
          : n,
      r = Object.entries(t).reduce(
        (n, [a, s]) => ((n[a] = hn(s) ? null : s), n),
        {}
      );
    return (
      t.product &&
        (t.product.metafields &&
          (r.product.metafields = e(t.product.metafields)),
        t.product.sourceCollection &&
          t.product.sourceCollection.metafields &&
          (r.product.sourceCollection.metafields = e(
            t.product.sourceCollection.metafields
          ))),
      t.collection &&
        t.collection.metafields &&
        (r.collection.metafields = e(t.collection.metafields)),
      t.customer &&
        t.customer.metafields &&
        (r.customer.metafields = e(t.customer.metafields)),
      t.integrations && (r.integrations = dn(t.integrations)),
      r
    );
  },
  mn = () => {
    let t = {};
    return {
      get variables() {
        return t;
      },
      setVariables: (r = {}) => {
        t = {
          ...t,
          ...pn(r),
        };
      },
    };
  };
let rr = (t = 21) =>
  crypto
    .getRandomValues(new Uint8Array(t))
    .reduce(
      (e, r) => (
        (r &= 63),
        r < 36
          ? (e += r.toString(36))
          : r < 62
          ? (e += (r - 26).toString(36).toUpperCase())
          : r > 62
          ? (e += "-")
          : (e += "_"),
        e
      ),
      ""
    );
var Pe;
try {
  Pe = Map;
} catch {}
var Ie;
try {
  Ie = Set;
} catch {}
function nr(t, e, r) {
  if (!t || typeof t != "object" || typeof t == "function") return t;
  if (t.nodeType && "cloneNode" in t) return t.cloneNode(!0);
  if (t instanceof Date) return new Date(t.getTime());
  if (t instanceof RegExp) return new RegExp(t);
  if (Array.isArray(t)) return t.map(Ne);
  if (Pe && t instanceof Pe) return new Map(Array.from(t.entries()));
  if (Ie && t instanceof Ie) return new Set(Array.from(t.values()));
  if (t instanceof Object) {
    e.push(t);
    var n = Object.create(t);
    r.push(n);
    for (var a in t) {
      var s = e.findIndex(function (i) {
        return i === t[a];
      });
      n[a] = s > -1 ? r[s] : nr(t[a], e, r);
    }
    return n;
  }
  return t;
}
function Ne(t) {
  return nr(t, [], []);
}
const yn = Object.prototype.toString,
  vn = Error.prototype.toString,
  gn = RegExp.prototype.toString,
  _n = typeof Symbol < "u" ? Symbol.prototype.toString : () => "",
  bn = /^Symbol\((.*)\)(.*)$/;
function $n(t) {
  return t != +t ? "NaN" : t === 0 && 1 / t < 0 ? "-0" : "" + t;
}
function lt(t, e = !1) {
  if (t == null || t === !0 || t === !1) return "" + t;
  const r = typeof t;
  if (r === "number") return $n(t);
  if (r === "string") return e ? `"${t}"` : t;
  if (r === "function") return "[Function " + (t.name || "anonymous") + "]";
  if (r === "symbol") return _n.call(t).replace(bn, "Symbol($1)");
  const n = yn.call(t).slice(8, -1);
  return n === "Date"
    ? isNaN(t.getTime())
      ? "" + t
      : t.toISOString(t)
    : n === "Error" || t instanceof Error
    ? "[" + vn.call(t) + "]"
    : n === "RegExp"
    ? gn.call(t)
    : null;
}
function V(t, e) {
  let r = lt(t, e);
  return r !== null
    ? r
    : JSON.stringify(
        t,
        function (n, a) {
          let s = lt(this[n], e);
          return s !== null ? s : a;
        },
        2
      );
}
let j = {
    default: "${path} is invalid",
    required: "${path} is a required field",
    oneOf: "${path} must be one of the following values: ${values}",
    notOneOf: "${path} must not be one of the following values: ${values}",
    notType: ({ path: t, type: e, value: r, originalValue: n }) => {
      let a = n != null && n !== r,
        s =
          `${t} must be a \`${e}\` type, but the final value was: \`${V(
            r,
            !0
          )}\`` + (a ? ` (cast from the value \`${V(n, !0)}\`).` : ".");
      return (
        r === null &&
          (s +=
            '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`'),
        s
      );
    },
    defined: "${path} must be defined",
  },
  O = {
    length: "${path} must be exactly ${length} characters",
    min: "${path} must be at least ${min} characters",
    max: "${path} must be at most ${max} characters",
    matches: '${path} must match the following: "${regex}"',
    email: "${path} must be a valid email",
    url: "${path} must be a valid URL",
    uuid: "${path} must be a valid UUID",
    trim: "${path} must be a trimmed string",
    lowercase: "${path} must be a lowercase string",
    uppercase: "${path} must be a upper case string",
  },
  I = {
    min: "${path} must be greater than or equal to ${min}",
    max: "${path} must be less than or equal to ${max}",
    lessThan: "${path} must be less than ${less}",
    moreThan: "${path} must be greater than ${more}",
    positive: "${path} must be a positive number",
    negative: "${path} must be a negative number",
    integer: "${path} must be an integer",
  },
  Re = {
    min: "${path} field must be later than ${min}",
    max: "${path} field must be at earlier than ${max}",
  },
  Me = {
    isValue: "${path} field must be ${value}",
  },
  je = {
    noUnknown: "${path} field has unspecified keys: ${unknown}",
  },
  le = {
    min: "${path} field must have at least ${min} items",
    max: "${path} field must have less than or equal to ${max} items",
    length: "${path} must have ${length} items",
  };
Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed: j,
  string: O,
  number: I,
  date: Re,
  object: je,
  array: le,
  boolean: Me,
});
var ae =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  wn = Object.prototype,
  xn = wn.hasOwnProperty;
function En(t, e) {
  return t != null && xn.call(t, e);
}
var Fn = En,
  Tn = Array.isArray,
  R = Tn,
  Sn = typeof ae == "object" && ae && ae.Object === Object && ae,
  ar = Sn,
  An = ar,
  On = typeof self == "object" && self && self.Object === Object && self,
  Cn = An || On || Function("return this")(),
  P = Cn,
  Dn = P,
  Pn = Dn.Symbol,
  be = Pn,
  ft = be,
  sr = Object.prototype,
  In = sr.hasOwnProperty,
  Nn = sr.toString,
  X = ft ? ft.toStringTag : void 0;
function Rn(t) {
  var e = In.call(t, X),
    r = t[X];
  try {
    t[X] = void 0;
    var n = !0;
  } catch {}
  var a = Nn.call(t);
  return n && (e ? (t[X] = r) : delete t[X]), a;
}
var Mn = Rn,
  jn = Object.prototype,
  Un = jn.toString;
function Ln(t) {
  return Un.call(t);
}
var qn = Ln,
  ht = be,
  zn = Mn,
  kn = qn,
  Gn = "[object Null]",
  Hn = "[object Undefined]",
  dt = ht ? ht.toStringTag : void 0;
function Vn(t) {
  return t == null
    ? t === void 0
      ? Hn
      : Gn
    : dt && dt in Object(t)
    ? zn(t)
    : kn(t);
}
var te = Vn;
function Bn(t) {
  return t != null && typeof t == "object";
}
var re = Bn,
  Kn = te,
  Wn = re,
  Jn = "[object Symbol]";
function Zn(t) {
  return typeof t == "symbol" || (Wn(t) && Kn(t) == Jn);
}
var Je = Zn,
  Yn = R,
  Xn = Je,
  Qn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  ea = /^\w*$/;
function ta(t, e) {
  if (Yn(t)) return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || Xn(t)
    ? !0
    : ea.test(t) || !Qn.test(t) || (e != null && t in Object(e));
}
var Ze = ta;
function ra(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ye = ra,
  na = te,
  aa = Ye,
  sa = "[object AsyncFunction]",
  ia = "[object Function]",
  oa = "[object GeneratorFunction]",
  ua = "[object Proxy]";
function ca(t) {
  if (!aa(t)) return !1;
  var e = na(t);
  return e == ia || e == oa || e == sa || e == ua;
}
var ir = ca,
  la = P,
  fa = la["__core-js_shared__"],
  ha = fa,
  Ae = ha,
  pt = (function () {
    var t = /[^.]+$/.exec((Ae && Ae.keys && Ae.keys.IE_PROTO) || "");
    return t ? "Symbol(src)_1." + t : "";
  })();
function da(t) {
  return !!pt && pt in t;
}
var pa = da,
  ma = Function.prototype,
  ya = ma.toString;
function va(t) {
  if (t != null) {
    try {
      return ya.call(t);
    } catch {}
    try {
      return t + "";
    } catch {}
  }
  return "";
}
var or = va,
  ga = ir,
  _a = pa,
  ba = Ye,
  $a = or,
  wa = /[\\^$.*+?()[\]{}|]/g,
  xa = /^\[object .+?Constructor\]$/,
  Ea = Function.prototype,
  Fa = Object.prototype,
  Ta = Ea.toString,
  Sa = Fa.hasOwnProperty,
  Aa = RegExp(
    "^" +
      Ta.call(Sa)
        .replace(wa, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  );
function Oa(t) {
  if (!ba(t) || _a(t)) return !1;
  var e = ga(t) ? Aa : xa;
  return e.test($a(t));
}
var Ca = Oa;
function Da(t, e) {
  return t == null ? void 0 : t[e];
}
var Pa = Da,
  Ia = Ca,
  Na = Pa;
function Ra(t, e) {
  var r = Na(t, e);
  return Ia(r) ? r : void 0;
}
var z = Ra,
  Ma = z,
  ja = Ma(Object, "create"),
  $e = ja,
  mt = $e;
function Ua() {
  (this.__data__ = mt ? mt(null) : {}), (this.size = 0);
}
var La = Ua;
function qa(t) {
  var e = this.has(t) && delete this.__data__[t];
  return (this.size -= e ? 1 : 0), e;
}
var za = qa,
  ka = $e,
  Ga = "__lodash_hash_undefined__",
  Ha = Object.prototype,
  Va = Ha.hasOwnProperty;
function Ba(t) {
  var e = this.__data__;
  if (ka) {
    var r = e[t];
    return r === Ga ? void 0 : r;
  }
  return Va.call(e, t) ? e[t] : void 0;
}
var Ka = Ba,
  Wa = $e,
  Ja = Object.prototype,
  Za = Ja.hasOwnProperty;
function Ya(t) {
  var e = this.__data__;
  return Wa ? e[t] !== void 0 : Za.call(e, t);
}
var Xa = Ya,
  Qa = $e,
  es = "__lodash_hash_undefined__";
function ts(t, e) {
  var r = this.__data__;
  return (
    (this.size += this.has(t) ? 0 : 1),
    (r[t] = Qa && e === void 0 ? es : e),
    this
  );
}
var rs = ts,
  ns = La,
  as = za,
  ss = Ka,
  is = Xa,
  os = rs;
function B(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
B.prototype.clear = ns;
B.prototype.delete = as;
B.prototype.get = ss;
B.prototype.has = is;
B.prototype.set = os;
var us = B;
function cs() {
  (this.__data__ = []), (this.size = 0);
}
var ls = cs;
function fs(t, e) {
  return t === e || (t !== t && e !== e);
}
var ur = fs,
  hs = ur;
function ds(t, e) {
  for (var r = t.length; r--; ) if (hs(t[r][0], e)) return r;
  return -1;
}
var we = ds,
  ps = we,
  ms = Array.prototype,
  ys = ms.splice;
function vs(t) {
  var e = this.__data__,
    r = ps(e, t);
  if (r < 0) return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : ys.call(e, r, 1), --this.size, !0;
}
var gs = vs,
  _s = we;
function bs(t) {
  var e = this.__data__,
    r = _s(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var $s = bs,
  ws = we;
function xs(t) {
  return ws(this.__data__, t) > -1;
}
var Es = xs,
  Fs = we;
function Ts(t, e) {
  var r = this.__data__,
    n = Fs(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : (r[n][1] = e), this;
}
var Ss = Ts,
  As = ls,
  Os = gs,
  Cs = $s,
  Ds = Es,
  Ps = Ss;
function K(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
K.prototype.clear = As;
K.prototype.delete = Os;
K.prototype.get = Cs;
K.prototype.has = Ds;
K.prototype.set = Ps;
var xe = K,
  Is = z,
  Ns = P,
  Rs = Is(Ns, "Map"),
  Xe = Rs,
  yt = us,
  Ms = xe,
  js = Xe;
function Us() {
  (this.size = 0),
    (this.__data__ = {
      hash: new yt(),
      map: new (js || Ms)(),
      string: new yt(),
    });
}
var Ls = Us;
function qs(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean"
    ? t !== "__proto__"
    : t === null;
}
var zs = qs,
  ks = zs;
function Gs(t, e) {
  var r = t.__data__;
  return ks(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var Ee = Gs,
  Hs = Ee;
function Vs(t) {
  var e = Hs(this, t).delete(t);
  return (this.size -= e ? 1 : 0), e;
}
var Bs = Vs,
  Ks = Ee;
function Ws(t) {
  return Ks(this, t).get(t);
}
var Js = Ws,
  Zs = Ee;
function Ys(t) {
  return Zs(this, t).has(t);
}
var Xs = Ys,
  Qs = Ee;
function ei(t, e) {
  var r = Qs(this, t),
    n = r.size;
  return r.set(t, e), (this.size += r.size == n ? 0 : 1), this;
}
var ti = ei,
  ri = Ls,
  ni = Bs,
  ai = Js,
  si = Xs,
  ii = ti;
function W(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
W.prototype.clear = ri;
W.prototype.delete = ni;
W.prototype.get = ai;
W.prototype.has = si;
W.prototype.set = ii;
var Qe = W,
  cr = Qe,
  oi = "Expected a function";
function et(t, e) {
  if (typeof t != "function" || (e != null && typeof e != "function"))
    throw new TypeError(oi);
  var r = function () {
    var n = arguments,
      a = e ? e.apply(this, n) : n[0],
      s = r.cache;
    if (s.has(a)) return s.get(a);
    var i = t.apply(this, n);
    return (r.cache = s.set(a, i) || s), i;
  };
  return (r.cache = new (et.Cache || cr)()), r;
}
et.Cache = cr;
var ui = et,
  ci = ui,
  li = 500;
function fi(t) {
  var e = ci(t, function (n) {
      return r.size === li && r.clear(), n;
    }),
    r = e.cache;
  return e;
}
var hi = fi,
  di = hi,
  pi =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  mi = /\\(\\)?/g,
  yi = di(function (t) {
    var e = [];
    return (
      t.charCodeAt(0) === 46 && e.push(""),
      t.replace(pi, function (r, n, a, s) {
        e.push(a ? s.replace(mi, "$1") : n || r);
      }),
      e
    );
  }),
  vi = yi;
function gi(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = Array(n); ++r < n; )
    a[r] = e(t[r], r, t);
  return a;
}
var _i = gi,
  vt = be,
  bi = _i,
  $i = R,
  wi = Je,
  xi = 1 / 0,
  gt = vt ? vt.prototype : void 0,
  _t = gt ? gt.toString : void 0;
function lr(t) {
  if (typeof t == "string") return t;
  if ($i(t)) return bi(t, lr) + "";
  if (wi(t)) return _t ? _t.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -xi ? "-0" : e;
}
var Ei = lr,
  Fi = Ei;
function Ti(t) {
  return t == null ? "" : Fi(t);
}
var ne = Ti,
  Si = R,
  Ai = Ze,
  Oi = vi,
  Ci = ne;
function Di(t, e) {
  return Si(t) ? t : Ai(t, e) ? [t] : Oi(Ci(t));
}
var fr = Di,
  Pi = te,
  Ii = re,
  Ni = "[object Arguments]";
function Ri(t) {
  return Ii(t) && Pi(t) == Ni;
}
var Mi = Ri,
  bt = Mi,
  ji = re,
  hr = Object.prototype,
  Ui = hr.hasOwnProperty,
  Li = hr.propertyIsEnumerable,
  qi = bt(
    (function () {
      return arguments;
    })()
  )
    ? bt
    : function (t) {
        return ji(t) && Ui.call(t, "callee") && !Li.call(t, "callee");
      },
  dr = qi,
  zi = 9007199254740991,
  ki = /^(?:0|[1-9]\d*)$/;
function Gi(t, e) {
  var r = typeof t;
  return (
    (e = e ?? zi),
    !!e &&
      (r == "number" || (r != "symbol" && ki.test(t))) &&
      t > -1 &&
      t % 1 == 0 &&
      t < e
  );
}
var pr = Gi,
  Hi = 9007199254740991;
function Vi(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Hi;
}
var tt = Vi,
  Bi = Je,
  Ki = 1 / 0;
function Wi(t) {
  if (typeof t == "string" || Bi(t)) return t;
  var e = t + "";
  return e == "0" && 1 / t == -Ki ? "-0" : e;
}
var Fe = Wi,
  Ji = fr,
  Zi = dr,
  Yi = R,
  Xi = pr,
  Qi = tt,
  eo = Fe;
function to(t, e, r) {
  e = Ji(e, t);
  for (var n = -1, a = e.length, s = !1; ++n < a; ) {
    var i = eo(e[n]);
    if (!(s = t != null && r(t, i))) break;
    t = t[i];
  }
  return s || ++n != a
    ? s
    : ((a = t == null ? 0 : t.length),
      !!a && Qi(a) && Xi(i, a) && (Yi(t) || Zi(t)));
}
var mr = to,
  ro = Fn,
  no = mr;
function ao(t, e) {
  return t != null && no(t, e, ro);
}
var he = ao;
const rt = (t) => t && t.__isYupSchema__;
class so {
  constructor(e, r) {
    if (
      ((this.fn = void 0),
      (this.refs = e),
      (this.refs = e),
      typeof r == "function")
    ) {
      this.fn = r;
      return;
    }
    if (!he(r, "is"))
      throw new TypeError("`is:` is required for `when()` conditions");
    if (!r.then && !r.otherwise)
      throw new TypeError(
        "either `then:` or `otherwise:` is required for `when()` conditions"
      );
    let { is: n, then: a, otherwise: s } = r,
      i = typeof n == "function" ? n : (...o) => o.every((u) => u === n);
    this.fn = function (...o) {
      let u = o.pop(),
        c = o.pop(),
        f = i(...o) ? a : s;
      if (f) return typeof f == "function" ? f(c) : c.concat(f.resolve(u));
    };
  }
  resolve(e, r) {
    let n = this.refs.map((s) =>
        s.getValue(
          r == null ? void 0 : r.value,
          r == null ? void 0 : r.parent,
          r == null ? void 0 : r.context
        )
      ),
      a = this.fn.apply(e, n.concat(e, r));
    if (a === void 0 || a === e) return e;
    if (!rt(a)) throw new TypeError("conditions must return a schema object");
    return a.resolve(r);
  }
}
function yr(t) {
  return t == null ? [] : [].concat(t);
}
function Ue() {
  return (
    (Ue =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
        return t;
      }),
    Ue.apply(this, arguments)
  );
}
let io = /\$\{\s*(\w+)\s*\}/g;
class E extends Error {
  static formatError(e, r) {
    const n = r.label || r.path || "this";
    return (
      n !== r.path &&
        (r = Ue({}, r, {
          path: n,
        })),
      typeof e == "string"
        ? e.replace(io, (a, s) => V(r[s]))
        : typeof e == "function"
        ? e(r)
        : e
    );
  }
  static isError(e) {
    return e && e.name === "ValidationError";
  }
  constructor(e, r, n, a) {
    super(),
      (this.value = void 0),
      (this.path = void 0),
      (this.type = void 0),
      (this.errors = void 0),
      (this.params = void 0),
      (this.inner = void 0),
      (this.name = "ValidationError"),
      (this.value = r),
      (this.path = n),
      (this.type = a),
      (this.errors = []),
      (this.inner = []),
      yr(e).forEach((s) => {
        E.isError(s)
          ? (this.errors.push(...s.errors),
            (this.inner = this.inner.concat(s.inner.length ? s.inner : s)))
          : this.errors.push(s);
      }),
      (this.message =
        this.errors.length > 1
          ? `${this.errors.length} errors occurred`
          : this.errors[0]),
      Error.captureStackTrace && Error.captureStackTrace(this, E);
  }
}
const oo = (t) => {
  let e = !1;
  return (...r) => {
    e || ((e = !0), t(...r));
  };
};
function de(t, e) {
  let {
      endEarly: r,
      tests: n,
      args: a,
      value: s,
      errors: i,
      sort: o,
      path: u,
    } = t,
    c = oo(e),
    f = n.length;
  const l = [];
  if (((i = i || []), !f)) return i.length ? c(new E(i, s, u)) : c(null, s);
  for (let h = 0; h < n.length; h++) {
    const p = n[h];
    p(a, function (y) {
      if (y) {
        if (!E.isError(y)) return c(y, s);
        if (r) return (y.value = s), c(y, s);
        l.push(y);
      }
      if (--f <= 0) {
        if (
          (l.length && (o && l.sort(o), i.length && l.push(...i), (i = l)),
          i.length)
        ) {
          c(new E(i, s, u), s);
          return;
        }
        c(null, s);
      }
    });
  }
}
var uo = z,
  co = (function () {
    try {
      var t = uo(Object, "defineProperty");
      return t({}, "", {}), t;
    } catch {}
  })(),
  lo = co,
  $t = lo;
function fo(t, e, r) {
  e == "__proto__" && $t
    ? $t(t, e, {
        configurable: !0,
        enumerable: !0,
        value: r,
        writable: !0,
      })
    : (t[e] = r);
}
var vr = fo;
function ho(t) {
  return function (e, r, n) {
    for (var a = -1, s = Object(e), i = n(e), o = i.length; o--; ) {
      var u = i[t ? o : ++a];
      if (r(s[u], u, s) === !1) break;
    }
    return e;
  };
}
var po = ho,
  mo = po,
  yo = mo(),
  vo = yo;
function go(t, e) {
  for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r);
  return n;
}
var _o = go,
  ee = {},
  bo = {
    get exports() {
      return ee;
    },
    set exports(t) {
      ee = t;
    },
  };
function $o() {
  return !1;
}
var wo = $o;
(function (t, e) {
  var r = P,
    n = wo,
    a = e && !e.nodeType && e,
    s = a && !0 && t && !t.nodeType && t,
    i = s && s.exports === a,
    o = i ? r.Buffer : void 0,
    u = o ? o.isBuffer : void 0,
    c = u || n;
  t.exports = c;
})(bo, ee);
var xo = te,
  Eo = tt,
  Fo = re,
  To = "[object Arguments]",
  So = "[object Array]",
  Ao = "[object Boolean]",
  Oo = "[object Date]",
  Co = "[object Error]",
  Do = "[object Function]",
  Po = "[object Map]",
  Io = "[object Number]",
  No = "[object Object]",
  Ro = "[object RegExp]",
  Mo = "[object Set]",
  jo = "[object String]",
  Uo = "[object WeakMap]",
  Lo = "[object ArrayBuffer]",
  qo = "[object DataView]",
  zo = "[object Float32Array]",
  ko = "[object Float64Array]",
  Go = "[object Int8Array]",
  Ho = "[object Int16Array]",
  Vo = "[object Int32Array]",
  Bo = "[object Uint8Array]",
  Ko = "[object Uint8ClampedArray]",
  Wo = "[object Uint16Array]",
  Jo = "[object Uint32Array]",
  _ = {};
_[zo] = _[ko] = _[Go] = _[Ho] = _[Vo] = _[Bo] = _[Ko] = _[Wo] = _[Jo] = !0;
_[To] =
  _[So] =
  _[Lo] =
  _[Ao] =
  _[qo] =
  _[Oo] =
  _[Co] =
  _[Do] =
  _[Po] =
  _[Io] =
  _[No] =
  _[Ro] =
  _[Mo] =
  _[jo] =
  _[Uo] =
    !1;
function Zo(t) {
  return Fo(t) && Eo(t.length) && !!_[xo(t)];
}
var Yo = Zo;
function Xo(t) {
  return function (e) {
    return t(e);
  };
}
var Qo = Xo,
  pe = {},
  eu = {
    get exports() {
      return pe;
    },
    set exports(t) {
      pe = t;
    },
  };
(function (t, e) {
  var r = ar,
    n = e && !e.nodeType && e,
    a = n && !0 && t && !t.nodeType && t,
    s = a && a.exports === n,
    i = s && r.process,
    o = (function () {
      try {
        var u = a && a.require && a.require("util").types;
        return u || (i && i.binding && i.binding("util"));
      } catch {}
    })();
  t.exports = o;
})(eu, pe);
var tu = Yo,
  ru = Qo,
  wt = pe,
  xt = wt && wt.isTypedArray,
  nu = xt ? ru(xt) : tu,
  gr = nu,
  au = _o,
  su = dr,
  iu = R,
  ou = ee,
  uu = pr,
  cu = gr,
  lu = Object.prototype,
  fu = lu.hasOwnProperty;
function hu(t, e) {
  var r = iu(t),
    n = !r && su(t),
    a = !r && !n && ou(t),
    s = !r && !n && !a && cu(t),
    i = r || n || a || s,
    o = i ? au(t.length, String) : [],
    u = o.length;
  for (var c in t)
    (e || fu.call(t, c)) &&
      !(
        i && // Safari 9 has enumerable `arguments.length` in strict mode.
        (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          (a && (c == "offset" || c == "parent")) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          (s && (c == "buffer" || c == "byteLength" || c == "byteOffset")) || // Skip index properties.
          uu(c, u))
      ) &&
      o.push(c);
  return o;
}
var du = hu,
  pu = Object.prototype;
function mu(t) {
  var e = t && t.constructor,
    r = (typeof e == "function" && e.prototype) || pu;
  return t === r;
}
var yu = mu;
function vu(t, e) {
  return function (r) {
    return t(e(r));
  };
}
var gu = vu,
  _u = gu,
  bu = _u(Object.keys, Object),
  $u = bu,
  wu = yu,
  xu = $u,
  Eu = Object.prototype,
  Fu = Eu.hasOwnProperty;
function Tu(t) {
  if (!wu(t)) return xu(t);
  var e = [];
  for (var r in Object(t)) Fu.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
var Su = Tu,
  Au = ir,
  Ou = tt;
function Cu(t) {
  return t != null && Ou(t.length) && !Au(t);
}
var Du = Cu,
  Pu = du,
  Iu = Su,
  Nu = Du;
function Ru(t) {
  return Nu(t) ? Pu(t) : Iu(t);
}
var nt = Ru,
  Mu = vo,
  ju = nt;
function Uu(t, e) {
  return t && Mu(t, e, ju);
}
var _r = Uu,
  Lu = xe;
function qu() {
  (this.__data__ = new Lu()), (this.size = 0);
}
var zu = qu;
function ku(t) {
  var e = this.__data__,
    r = e.delete(t);
  return (this.size = e.size), r;
}
var Gu = ku;
function Hu(t) {
  return this.__data__.get(t);
}
var Vu = Hu;
function Bu(t) {
  return this.__data__.has(t);
}
var Ku = Bu,
  Wu = xe,
  Ju = Xe,
  Zu = Qe,
  Yu = 200;
function Xu(t, e) {
  var r = this.__data__;
  if (r instanceof Wu) {
    var n = r.__data__;
    if (!Ju || n.length < Yu - 1)
      return n.push([t, e]), (this.size = ++r.size), this;
    r = this.__data__ = new Zu(n);
  }
  return r.set(t, e), (this.size = r.size), this;
}
var Qu = Xu,
  ec = xe,
  tc = zu,
  rc = Gu,
  nc = Vu,
  ac = Ku,
  sc = Qu;
function J(t) {
  var e = (this.__data__ = new ec(t));
  this.size = e.size;
}
J.prototype.clear = tc;
J.prototype.delete = rc;
J.prototype.get = nc;
J.prototype.has = ac;
J.prototype.set = sc;
var br = J,
  ic = "__lodash_hash_undefined__";
function oc(t) {
  return this.__data__.set(t, ic), this;
}
var uc = oc;
function cc(t) {
  return this.__data__.has(t);
}
var lc = cc,
  fc = Qe,
  hc = uc,
  dc = lc;
function me(t) {
  var e = -1,
    r = t == null ? 0 : t.length;
  for (this.__data__ = new fc(); ++e < r; ) this.add(t[e]);
}
me.prototype.add = me.prototype.push = hc;
me.prototype.has = dc;
var pc = me;
function mc(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length; ++r < n; )
    if (e(t[r], r, t)) return !0;
  return !1;
}
var yc = mc;
function vc(t, e) {
  return t.has(e);
}
var gc = vc,
  _c = pc,
  bc = yc,
  $c = gc,
  wc = 1,
  xc = 2;
function Ec(t, e, r, n, a, s) {
  var i = r & wc,
    o = t.length,
    u = e.length;
  if (o != u && !(i && u > o)) return !1;
  var c = s.get(t),
    f = s.get(e);
  if (c && f) return c == e && f == t;
  var l = -1,
    h = !0,
    p = r & xc ? new _c() : void 0;
  for (s.set(t, e), s.set(e, t); ++l < o; ) {
    var m = t[l],
      y = e[l];
    if (n) var g = i ? n(y, m, l, e, t, s) : n(m, y, l, t, e, s);
    if (g !== void 0) {
      if (g) continue;
      h = !1;
      break;
    }
    if (p) {
      if (
        !bc(e, function ($, F) {
          if (!$c(p, F) && (m === $ || a(m, $, r, n, s))) return p.push(F);
        })
      ) {
        h = !1;
        break;
      }
    } else if (!(m === y || a(m, y, r, n, s))) {
      h = !1;
      break;
    }
  }
  return s.delete(t), s.delete(e), h;
}
var $r = Ec,
  Fc = P,
  Tc = Fc.Uint8Array,
  Sc = Tc;
function Ac(t) {
  var e = -1,
    r = Array(t.size);
  return (
    t.forEach(function (n, a) {
      r[++e] = [a, n];
    }),
    r
  );
}
var Oc = Ac;
function Cc(t) {
  var e = -1,
    r = Array(t.size);
  return (
    t.forEach(function (n) {
      r[++e] = n;
    }),
    r
  );
}
var Dc = Cc,
  Et = be,
  Ft = Sc,
  Pc = ur,
  Ic = $r,
  Nc = Oc,
  Rc = Dc,
  Mc = 1,
  jc = 2,
  Uc = "[object Boolean]",
  Lc = "[object Date]",
  qc = "[object Error]",
  zc = "[object Map]",
  kc = "[object Number]",
  Gc = "[object RegExp]",
  Hc = "[object Set]",
  Vc = "[object String]",
  Bc = "[object Symbol]",
  Kc = "[object ArrayBuffer]",
  Wc = "[object DataView]",
  Tt = Et ? Et.prototype : void 0,
  Oe = Tt ? Tt.valueOf : void 0;
function Jc(t, e, r, n, a, s, i) {
  switch (r) {
    case Wc:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      (t = t.buffer), (e = e.buffer);
    case Kc:
      return !(t.byteLength != e.byteLength || !s(new Ft(t), new Ft(e)));
    case Uc:
    case Lc:
    case kc:
      return Pc(+t, +e);
    case qc:
      return t.name == e.name && t.message == e.message;
    case Gc:
    case Vc:
      return t == e + "";
    case zc:
      var o = Nc;
    case Hc:
      var u = n & Mc;
      if ((o || (o = Rc), t.size != e.size && !u)) return !1;
      var c = i.get(t);
      if (c) return c == e;
      (n |= jc), i.set(t, e);
      var f = Ic(o(t), o(e), n, a, s, i);
      return i.delete(t), f;
    case Bc:
      if (Oe) return Oe.call(t) == Oe.call(e);
  }
  return !1;
}
var Zc = Jc;
function Yc(t, e) {
  for (var r = -1, n = e.length, a = t.length; ++r < n; ) t[a + r] = e[r];
  return t;
}
var Xc = Yc,
  Qc = Xc,
  el = R;
function tl(t, e, r) {
  var n = e(t);
  return el(t) ? n : Qc(n, r(t));
}
var rl = tl;
function nl(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, a = 0, s = []; ++r < n; ) {
    var i = t[r];
    e(i, r, t) && (s[a++] = i);
  }
  return s;
}
var al = nl;
function sl() {
  return [];
}
var il = sl,
  ol = al,
  ul = il,
  cl = Object.prototype,
  ll = cl.propertyIsEnumerable,
  St = Object.getOwnPropertySymbols,
  fl = St
    ? function (t) {
        return t == null
          ? []
          : ((t = Object(t)),
            ol(St(t), function (e) {
              return ll.call(t, e);
            }));
      }
    : ul,
  hl = fl,
  dl = rl,
  pl = hl,
  ml = nt;
function yl(t) {
  return dl(t, ml, pl);
}
var vl = yl,
  At = vl,
  gl = 1,
  _l = Object.prototype,
  bl = _l.hasOwnProperty;
function $l(t, e, r, n, a, s) {
  var i = r & gl,
    o = At(t),
    u = o.length,
    c = At(e),
    f = c.length;
  if (u != f && !i) return !1;
  for (var l = u; l--; ) {
    var h = o[l];
    if (!(i ? h in e : bl.call(e, h))) return !1;
  }
  var p = s.get(t),
    m = s.get(e);
  if (p && m) return p == e && m == t;
  var y = !0;
  s.set(t, e), s.set(e, t);
  for (var g = i; ++l < u; ) {
    h = o[l];
    var $ = t[h],
      F = e[h];
    if (n) var C = i ? n(F, $, h, e, t, s) : n($, F, h, t, e, s);
    if (!(C === void 0 ? $ === F || a($, F, r, n, s) : C)) {
      y = !1;
      break;
    }
    g || (g = h == "constructor");
  }
  if (y && !g) {
    var T = t.constructor,
      D = e.constructor;
    T != D &&
      "constructor" in t &&
      "constructor" in e &&
      !(
        typeof T == "function" &&
        T instanceof T &&
        typeof D == "function" &&
        D instanceof D
      ) &&
      (y = !1);
  }
  return s.delete(t), s.delete(e), y;
}
var wl = $l,
  xl = z,
  El = P,
  Fl = xl(El, "DataView"),
  Tl = Fl,
  Sl = z,
  Al = P,
  Ol = Sl(Al, "Promise"),
  Cl = Ol,
  Dl = z,
  Pl = P,
  Il = Dl(Pl, "Set"),
  Nl = Il,
  Rl = z,
  Ml = P,
  jl = Rl(Ml, "WeakMap"),
  Ul = jl,
  Le = Tl,
  qe = Xe,
  ze = Cl,
  ke = Nl,
  Ge = Ul,
  wr = te,
  Z = or,
  Ot = "[object Map]",
  Ll = "[object Object]",
  Ct = "[object Promise]",
  Dt = "[object Set]",
  Pt = "[object WeakMap]",
  It = "[object DataView]",
  ql = Z(Le),
  zl = Z(qe),
  kl = Z(ze),
  Gl = Z(ke),
  Hl = Z(Ge),
  U = wr;
((Le && U(new Le(new ArrayBuffer(1))) != It) ||
  (qe && U(new qe()) != Ot) ||
  (ze && U(ze.resolve()) != Ct) ||
  (ke && U(new ke()) != Dt) ||
  (Ge && U(new Ge()) != Pt)) &&
  (U = function (t) {
    var e = wr(t),
      r = e == Ll ? t.constructor : void 0,
      n = r ? Z(r) : "";
    if (n)
      switch (n) {
        case ql:
          return It;
        case zl:
          return Ot;
        case kl:
          return Ct;
        case Gl:
          return Dt;
        case Hl:
          return Pt;
      }
    return e;
  });
var Vl = U,
  Ce = br,
  Bl = $r,
  Kl = Zc,
  Wl = wl,
  Nt = Vl,
  Rt = R,
  Mt = ee,
  Jl = gr,
  Zl = 1,
  jt = "[object Arguments]",
  Ut = "[object Array]",
  se = "[object Object]",
  Yl = Object.prototype,
  Lt = Yl.hasOwnProperty;
function Xl(t, e, r, n, a, s) {
  var i = Rt(t),
    o = Rt(e),
    u = i ? Ut : Nt(t),
    c = o ? Ut : Nt(e);
  (u = u == jt ? se : u), (c = c == jt ? se : c);
  var f = u == se,
    l = c == se,
    h = u == c;
  if (h && Mt(t)) {
    if (!Mt(e)) return !1;
    (i = !0), (f = !1);
  }
  if (h && !f)
    return (
      s || (s = new Ce()),
      i || Jl(t) ? Bl(t, e, r, n, a, s) : Kl(t, e, u, r, n, a, s)
    );
  if (!(r & Zl)) {
    var p = f && Lt.call(t, "__wrapped__"),
      m = l && Lt.call(e, "__wrapped__");
    if (p || m) {
      var y = p ? t.value() : t,
        g = m ? e.value() : e;
      return s || (s = new Ce()), a(y, g, r, n, s);
    }
  }
  return h ? (s || (s = new Ce()), Wl(t, e, r, n, a, s)) : !1;
}
var Ql = Xl,
  ef = Ql,
  qt = re;
function xr(t, e, r, n, a) {
  return t === e
    ? !0
    : t == null || e == null || (!qt(t) && !qt(e))
    ? t !== t && e !== e
    : ef(t, e, r, n, xr, a);
}
var Er = xr,
  tf = br,
  rf = Er,
  nf = 1,
  af = 2;
function sf(t, e, r, n) {
  var a = r.length,
    s = a,
    i = !n;
  if (t == null) return !s;
  for (t = Object(t); a--; ) {
    var o = r[a];
    if (i && o[2] ? o[1] !== t[o[0]] : !(o[0] in t)) return !1;
  }
  for (; ++a < s; ) {
    o = r[a];
    var u = o[0],
      c = t[u],
      f = o[1];
    if (i && o[2]) {
      if (c === void 0 && !(u in t)) return !1;
    } else {
      var l = new tf();
      if (n) var h = n(c, f, u, t, e, l);
      if (!(h === void 0 ? rf(f, c, nf | af, n, l) : h)) return !1;
    }
  }
  return !0;
}
var of = sf,
  uf = Ye;
function cf(t) {
  return t === t && !uf(t);
}
var Fr = cf,
  lf = Fr,
  ff = nt;
function hf(t) {
  for (var e = ff(t), r = e.length; r--; ) {
    var n = e[r],
      a = t[n];
    e[r] = [n, a, lf(a)];
  }
  return e;
}
var df = hf;
function pf(t, e) {
  return function (r) {
    return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r));
  };
}
var Tr = pf,
  mf = of,
  yf = df,
  vf = Tr;
function gf(t) {
  var e = yf(t);
  return e.length == 1 && e[0][2]
    ? vf(e[0][0], e[0][1])
    : function (r) {
        return r === t || mf(r, t, e);
      };
}
var _f = gf,
  bf = fr,
  $f = Fe;
function wf(t, e) {
  e = bf(e, t);
  for (var r = 0, n = e.length; t != null && r < n; ) t = t[$f(e[r++])];
  return r && r == n ? t : void 0;
}
var Sr = wf,
  xf = Sr;
function Ef(t, e, r) {
  var n = t == null ? void 0 : xf(t, e);
  return n === void 0 ? r : n;
}
var Ff = Ef;
function Tf(t, e) {
  return t != null && e in Object(t);
}
var Sf = Tf,
  Af = Sf,
  Of = mr;
function Cf(t, e) {
  return t != null && Of(t, e, Af);
}
var Df = Cf,
  Pf = Er,
  If = Ff,
  Nf = Df,
  Rf = Ze,
  Mf = Fr,
  jf = Tr,
  Uf = Fe,
  Lf = 1,
  qf = 2;
function zf(t, e) {
  return Rf(t) && Mf(e)
    ? jf(Uf(t), e)
    : function (r) {
        var n = If(r, t);
        return n === void 0 && n === e ? Nf(r, t) : Pf(e, n, Lf | qf);
      };
}
var kf = zf;
function Gf(t) {
  return t;
}
var Hf = Gf;
function Vf(t) {
  return function (e) {
    return e == null ? void 0 : e[t];
  };
}
var Bf = Vf,
  Kf = Sr;
function Wf(t) {
  return function (e) {
    return Kf(e, t);
  };
}
var Jf = Wf,
  Zf = Bf,
  Yf = Jf,
  Xf = Ze,
  Qf = Fe;
function eh(t) {
  return Xf(t) ? Zf(Qf(t)) : Yf(t);
}
var th = eh,
  rh = _f,
  nh = kf,
  ah = Hf,
  sh = R,
  ih = th;
function oh(t) {
  return typeof t == "function"
    ? t
    : t == null
    ? ah
    : typeof t == "object"
    ? sh(t)
      ? nh(t[0], t[1])
      : rh(t)
    : ih(t);
}
var Ar = oh,
  uh = vr,
  ch = _r,
  lh = Ar;
function fh(t, e) {
  var r = {};
  return (
    (e = lh(e)),
    ch(t, function (n, a, s) {
      uh(r, a, e(n, a, s));
    }),
    r
  );
}
var Or = fh;
function k(t) {
  (this._maxSize = t), this.clear();
}
k.prototype.clear = function () {
  (this._size = 0), (this._values = /* @__PURE__ */ Object.create(null));
};
k.prototype.get = function (t) {
  return this._values[t];
};
k.prototype.set = function (t, e) {
  return (
    this._size >= this._maxSize && this.clear(),
    t in this._values || this._size++,
    (this._values[t] = e)
  );
};
var hh = /[^.^\]^[]+|(?=\[\]|\.\.)/g,
  Cr = /^\d+$/,
  dh = /^\d/,
  ph = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g,
  mh = /^\s*(['"]?)(.*?)(\1)\s*$/,
  at = 512,
  zt = new k(at),
  kt = new k(at),
  Gt = new k(at),
  Te = {
    Cache: k,
    split: He,
    normalizePath: De,
    setter: function (t) {
      var e = De(t);
      return (
        kt.get(t) ||
        kt.set(t, function (n, a) {
          for (var s = 0, i = e.length, o = n; s < i - 1; ) {
            var u = e[s];
            if (u === "__proto__" || u === "constructor" || u === "prototype")
              return n;
            o = o[e[s++]];
          }
          o[e[s]] = a;
        })
      );
    },
    getter: function (t, e) {
      var r = De(t);
      return (
        Gt.get(t) ||
        Gt.set(t, function (a) {
          for (var s = 0, i = r.length; s < i; )
            if (a != null || !e) a = a[r[s++]];
            else return;
          return a;
        })
      );
    },
    join: function (t) {
      return t.reduce(function (e, r) {
        return e + (st(r) || Cr.test(r) ? "[" + r + "]" : (e ? "." : "") + r);
      }, "");
    },
    forEach: function (t, e, r) {
      yh(Array.isArray(t) ? t : He(t), e, r);
    },
  };
function De(t) {
  return (
    zt.get(t) ||
    zt.set(
      t,
      He(t).map(function (e) {
        return e.replace(mh, "$2");
      })
    )
  );
}
function He(t) {
  return t.match(hh) || [""];
}
function yh(t, e, r) {
  var n = t.length,
    a,
    s,
    i,
    o;
  for (s = 0; s < n; s++)
    (a = t[s]),
      a &&
        (_h(a) && (a = '"' + a + '"'),
        (o = st(a)),
        (i = !o && /^\d+$/.test(a)),
        e.call(r, a, o, i, s, t));
}
function st(t) {
  return typeof t == "string" && t && ["'", '"'].indexOf(t.charAt(0)) !== -1;
}
function vh(t) {
  return t.match(dh) && !t.match(Cr);
}
function gh(t) {
  return ph.test(t);
}
function _h(t) {
  return !st(t) && (vh(t) || gh(t));
}
const ie = {
  context: "$",
  value: ".",
};
class N {
  constructor(e, r = {}) {
    if (
      ((this.key = void 0),
      (this.isContext = void 0),
      (this.isValue = void 0),
      (this.isSibling = void 0),
      (this.path = void 0),
      (this.getter = void 0),
      (this.map = void 0),
      typeof e != "string")
    )
      throw new TypeError("ref must be a string, got: " + e);
    if (((this.key = e.trim()), e === ""))
      throw new TypeError("ref must be a non-empty string");
    (this.isContext = this.key[0] === ie.context),
      (this.isValue = this.key[0] === ie.value),
      (this.isSibling = !this.isContext && !this.isValue);
    let n = this.isContext ? ie.context : this.isValue ? ie.value : "";
    (this.path = this.key.slice(n.length)),
      (this.getter = this.path && Te.getter(this.path, !0)),
      (this.map = r.map);
  }
  getValue(e, r, n) {
    let a = this.isContext ? n : this.isValue ? e : r;
    return (
      this.getter && (a = this.getter(a || {})),
      this.map && (a = this.map(a)),
      a
    );
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(e, r) {
    return this.getValue(
      e,
      r == null ? void 0 : r.parent,
      r == null ? void 0 : r.context
    );
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: "ref",
      key: this.key,
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(e) {
    return e && e.__isYupRef;
  }
}
N.prototype.__isYupRef = !0;
function ye() {
  return (
    (ye =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
        return t;
      }),
    ye.apply(this, arguments)
  );
}
function bh(t, e) {
  if (t == null) return {};
  var r = {},
    n = Object.keys(t),
    a,
    s;
  for (s = 0; s < n.length; s++)
    (a = n[s]), !(e.indexOf(a) >= 0) && (r[a] = t[a]);
  return r;
}
function oe(t) {
  function e(r, n) {
    let {
        value: a,
        path: s = "",
        label: i,
        options: o,
        originalValue: u,
        sync: c,
      } = r,
      f = bh(r, ["value", "path", "label", "options", "originalValue", "sync"]);
    const { name: l, test: h, params: p, message: m } = t;
    let { parent: y, context: g } = o;
    function $(w) {
      return N.isRef(w) ? w.getValue(a, y, g) : w;
    }
    function F(w = {}) {
      const Se = Or(
          ye(
            {
              value: a,
              originalValue: u,
              label: i,
              path: w.path || s,
            },
            p,
            w.params
          ),
          $
        ),
        ut = new E(E.formatError(w.message || m, Se), a, Se.path, w.type || l);
      return (ut.params = Se), ut;
    }
    let C = ye(
      {
        path: s,
        parent: y,
        type: l,
        createError: F,
        resolve: $,
        options: o,
        originalValue: u,
      },
      f
    );
    if (!c) {
      try {
        Promise.resolve(h.call(C, a, C))
          .then((w) => {
            E.isError(w) ? n(w) : w ? n(null, w) : n(F());
          })
          .catch(n);
      } catch (w) {
        n(w);
      }
      return;
    }
    let T;
    try {
      var D;
      if (
        ((T = h.call(C, a, C)),
        typeof ((D = T) == null ? void 0 : D.then) == "function")
      )
        throw new Error(
          `Validation test of type: "${C.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`
        );
    } catch (w) {
      n(w);
      return;
    }
    E.isError(T) ? n(T) : T ? n(null, T) : n(F());
  }
  return (e.OPTIONS = t), e;
}
let $h = (t) => t.substr(0, t.length - 1).substr(1);
function wh(t, e, r, n = r) {
  let a, s, i;
  return e
    ? (Te.forEach(e, (o, u, c) => {
        let f = u ? $h(o) : o;
        if (
          ((t = t.resolve({
            context: n,
            parent: a,
            value: r,
          })),
          t.innerType)
        ) {
          let l = c ? parseInt(f, 10) : 0;
          if (r && l >= r.length)
            throw new Error(
              `Yup.reach cannot resolve an array item at index: ${o}, in the path: ${e}. because there is no value at that index. `
            );
          (a = r), (r = r && r[l]), (t = t.innerType);
        }
        if (!c) {
          if (!t.fields || !t.fields[f])
            throw new Error(
              `The schema does not contain the path: ${e}. (failed at: ${i} which is a type: "${t._type}")`
            );
          (a = r), (r = r && r[f]), (t = t.fields[f]);
        }
        (s = f), (i = u ? "[" + o + "]" : "." + o);
      }),
      {
        schema: t,
        parent: a,
        parentPath: s,
      })
    : {
        parent: a,
        parentPath: e,
        schema: t,
      };
}
class ve {
  constructor() {
    (this.list = void 0),
      (this.refs = void 0),
      (this.list = /* @__PURE__ */ new Set()),
      (this.refs = /* @__PURE__ */ new Map());
  }
  get size() {
    return this.list.size + this.refs.size;
  }
  describe() {
    const e = [];
    for (const r of this.list) e.push(r);
    for (const [, r] of this.refs) e.push(r.describe());
    return e;
  }
  toArray() {
    return Array.from(this.list).concat(Array.from(this.refs.values()));
  }
  resolveAll(e) {
    return this.toArray().reduce((r, n) => r.concat(N.isRef(n) ? e(n) : n), []);
  }
  add(e) {
    N.isRef(e) ? this.refs.set(e.key, e) : this.list.add(e);
  }
  delete(e) {
    N.isRef(e) ? this.refs.delete(e.key) : this.list.delete(e);
  }
  clone() {
    const e = new ve();
    return (e.list = new Set(this.list)), (e.refs = new Map(this.refs)), e;
  }
  merge(e, r) {
    const n = this.clone();
    return (
      e.list.forEach((a) => n.add(a)),
      e.refs.forEach((a) => n.add(a)),
      r.list.forEach((a) => n.delete(a)),
      r.refs.forEach((a) => n.delete(a)),
      n
    );
  }
}
function A() {
  return (
    (A =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
        return t;
      }),
    A.apply(this, arguments)
  );
}
class x {
  constructor(e) {
    (this.deps = []),
      (this.tests = void 0),
      (this.transforms = void 0),
      (this.conditions = []),
      (this._mutate = void 0),
      (this._typeError = void 0),
      (this._whitelist = new ve()),
      (this._blacklist = new ve()),
      (this.exclusiveTests = /* @__PURE__ */ Object.create(null)),
      (this.spec = void 0),
      (this.tests = []),
      (this.transforms = []),
      this.withMutation(() => {
        this.typeError(j.notType);
      }),
      (this.type = (e == null ? void 0 : e.type) || "mixed"),
      (this.spec = A(
        {
          strip: !1,
          strict: !1,
          abortEarly: !0,
          recursive: !0,
          nullable: !1,
          presence: "optional",
        },
        e == null ? void 0 : e.spec
      ));
  }
  // TODO: remove
  get _type() {
    return this.type;
  }
  _typeCheck(e) {
    return !0;
  }
  clone(e) {
    if (this._mutate) return e && Object.assign(this.spec, e), this;
    const r = Object.create(Object.getPrototypeOf(this));
    return (
      (r.type = this.type),
      (r._typeError = this._typeError),
      (r._whitelistError = this._whitelistError),
      (r._blacklistError = this._blacklistError),
      (r._whitelist = this._whitelist.clone()),
      (r._blacklist = this._blacklist.clone()),
      (r.exclusiveTests = A({}, this.exclusiveTests)),
      (r.deps = [...this.deps]),
      (r.conditions = [...this.conditions]),
      (r.tests = [...this.tests]),
      (r.transforms = [...this.transforms]),
      (r.spec = Ne(A({}, this.spec, e))),
      r
    );
  }
  label(e) {
    let r = this.clone();
    return (r.spec.label = e), r;
  }
  meta(...e) {
    if (e.length === 0) return this.spec.meta;
    let r = this.clone();
    return (r.spec.meta = Object.assign(r.spec.meta || {}, e[0])), r;
  }
  // withContext<TContext extends AnyObject>(): BaseSchema<
  //   TCast,
  //   TContext,
  //   TOutput
  // > {
  //   return this as any;
  // }
  withMutation(e) {
    let r = this._mutate;
    this._mutate = !0;
    let n = e(this);
    return (this._mutate = r), n;
  }
  concat(e) {
    if (!e || e === this) return this;
    if (e.type !== this.type && this.type !== "mixed")
      throw new TypeError(
        `You cannot \`concat()\` schema's of different types: ${this.type} and ${e.type}`
      );
    let r = this,
      n = e.clone();
    const a = A({}, r.spec, n.spec);
    return (
      (n.spec = a),
      n._typeError || (n._typeError = r._typeError),
      n._whitelistError || (n._whitelistError = r._whitelistError),
      n._blacklistError || (n._blacklistError = r._blacklistError),
      (n._whitelist = r._whitelist.merge(e._whitelist, e._blacklist)),
      (n._blacklist = r._blacklist.merge(e._blacklist, e._whitelist)),
      (n.tests = r.tests),
      (n.exclusiveTests = r.exclusiveTests),
      n.withMutation((s) => {
        e.tests.forEach((i) => {
          s.test(i.OPTIONS);
        });
      }),
      (n.transforms = [...r.transforms, ...n.transforms]),
      n
    );
  }
  isType(e) {
    return this.spec.nullable && e === null ? !0 : this._typeCheck(e);
  }
  resolve(e) {
    let r = this;
    if (r.conditions.length) {
      let n = r.conditions;
      (r = r.clone()),
        (r.conditions = []),
        (r = n.reduce((a, s) => s.resolve(a, e), r)),
        (r = r.resolve(e));
    }
    return r;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {*=} options.parent
   * @param {*=} options.context
   */
  cast(e, r = {}) {
    let n = this.resolve(
        A(
          {
            value: e,
          },
          r
        )
      ),
      a = n._cast(e, r);
    if (e !== void 0 && r.assert !== !1 && n.isType(a) !== !0) {
      let s = V(e),
        i = V(a);
      throw new TypeError(
        `The value of ${
          r.path || "field"
        } could not be cast to a value that satisfies the schema type: "${
          n._type
        }". 

attempted value: ${s} 
` + (i !== s ? `result of cast: ${i}` : "")
      );
    }
    return a;
  }
  _cast(e, r) {
    let n =
      e === void 0
        ? e
        : this.transforms.reduce((a, s) => s.call(this, a, e, this), e);
    return n === void 0 && (n = this.getDefault()), n;
  }
  _validate(e, r = {}, n) {
    let {
        sync: a,
        path: s,
        from: i = [],
        originalValue: o = e,
        strict: u = this.spec.strict,
        abortEarly: c = this.spec.abortEarly,
      } = r,
      f = e;
    u ||
      (f = this._cast(
        f,
        A(
          {
            assert: !1,
          },
          r
        )
      ));
    let l = {
        value: f,
        path: s,
        options: r,
        originalValue: o,
        schema: this,
        label: this.spec.label,
        sync: a,
        from: i,
      },
      h = [];
    this._typeError && h.push(this._typeError);
    let p = [];
    this._whitelistError && p.push(this._whitelistError),
      this._blacklistError && p.push(this._blacklistError),
      de(
        {
          args: l,
          value: f,
          path: s,
          sync: a,
          tests: h,
          endEarly: c,
        },
        (m) => {
          if (m) return void n(m, f);
          de(
            {
              tests: this.tests.concat(p),
              args: l,
              path: s,
              sync: a,
              value: f,
              endEarly: c,
            },
            n
          );
        }
      );
  }
  validate(e, r, n) {
    let a = this.resolve(
      A({}, r, {
        value: e,
      })
    );
    return typeof n == "function"
      ? a._validate(e, r, n)
      : new Promise((s, i) =>
          a._validate(e, r, (o, u) => {
            o ? i(o) : s(u);
          })
        );
  }
  validateSync(e, r) {
    let n = this.resolve(
        A({}, r, {
          value: e,
        })
      ),
      a;
    return (
      n._validate(
        e,
        A({}, r, {
          sync: !0,
        }),
        (s, i) => {
          if (s) throw s;
          a = i;
        }
      ),
      a
    );
  }
  isValid(e, r) {
    return this.validate(e, r).then(
      () => !0,
      (n) => {
        if (E.isError(n)) return !1;
        throw n;
      }
    );
  }
  isValidSync(e, r) {
    try {
      return this.validateSync(e, r), !0;
    } catch (n) {
      if (E.isError(n)) return !1;
      throw n;
    }
  }
  _getDefault() {
    let e = this.spec.default;
    return e == null ? e : typeof e == "function" ? e.call(this) : Ne(e);
  }
  getDefault(e) {
    return this.resolve(e || {})._getDefault();
  }
  default(e) {
    return arguments.length === 0
      ? this._getDefault()
      : this.clone({
          default: e,
        });
  }
  strict(e = !0) {
    let r = this.clone();
    return (r.spec.strict = e), r;
  }
  _isPresent(e) {
    return e != null;
  }
  defined(e = j.defined) {
    return this.test({
      message: e,
      name: "defined",
      exclusive: !0,
      test(r) {
        return r !== void 0;
      },
    });
  }
  required(e = j.required) {
    return this.clone({
      presence: "required",
    }).withMutation((r) =>
      r.test({
        message: e,
        name: "required",
        exclusive: !0,
        test(n) {
          return this.schema._isPresent(n);
        },
      })
    );
  }
  notRequired() {
    let e = this.clone({
      presence: "optional",
    });
    return (e.tests = e.tests.filter((r) => r.OPTIONS.name !== "required")), e;
  }
  nullable(e = !0) {
    return this.clone({
      nullable: e !== !1,
    });
  }
  transform(e) {
    let r = this.clone();
    return r.transforms.push(e), r;
  }
  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */
  test(...e) {
    let r;
    if (
      (e.length === 1
        ? typeof e[0] == "function"
          ? (r = {
              test: e[0],
            })
          : (r = e[0])
        : e.length === 2
        ? (r = {
            name: e[0],
            test: e[1],
          })
        : (r = {
            name: e[0],
            message: e[1],
            test: e[2],
          }),
      r.message === void 0 && (r.message = j.default),
      typeof r.test != "function")
    )
      throw new TypeError("`test` is a required parameters");
    let n = this.clone(),
      a = oe(r),
      s = r.exclusive || (r.name && n.exclusiveTests[r.name] === !0);
    if (r.exclusive && !r.name)
      throw new TypeError(
        "Exclusive tests must provide a unique `name` identifying the test"
      );
    return (
      r.name && (n.exclusiveTests[r.name] = !!r.exclusive),
      (n.tests = n.tests.filter(
        (i) =>
          !(
            i.OPTIONS.name === r.name &&
            (s || i.OPTIONS.test === a.OPTIONS.test)
          )
      )),
      n.tests.push(a),
      n
    );
  }
  when(e, r) {
    !Array.isArray(e) && typeof e != "string" && ((r = e), (e = "."));
    let n = this.clone(),
      a = yr(e).map((s) => new N(s));
    return (
      a.forEach((s) => {
        s.isSibling && n.deps.push(s.key);
      }),
      n.conditions.push(new so(a, r)),
      n
    );
  }
  typeError(e) {
    let r = this.clone();
    return (
      (r._typeError = oe({
        message: e,
        name: "typeError",
        test(n) {
          return n !== void 0 && !this.schema.isType(n)
            ? this.createError({
                params: {
                  type: this.schema._type,
                },
              })
            : !0;
        },
      })),
      r
    );
  }
  oneOf(e, r = j.oneOf) {
    let n = this.clone();
    return (
      e.forEach((a) => {
        n._whitelist.add(a), n._blacklist.delete(a);
      }),
      (n._whitelistError = oe({
        message: r,
        name: "oneOf",
        test(a) {
          if (a === void 0) return !0;
          let s = this.schema._whitelist,
            i = s.resolveAll(this.resolve);
          return i.includes(a)
            ? !0
            : this.createError({
                params: {
                  values: s.toArray().join(", "),
                  resolved: i,
                },
              });
        },
      })),
      n
    );
  }
  notOneOf(e, r = j.notOneOf) {
    let n = this.clone();
    return (
      e.forEach((a) => {
        n._blacklist.add(a), n._whitelist.delete(a);
      }),
      (n._blacklistError = oe({
        message: r,
        name: "notOneOf",
        test(a) {
          let s = this.schema._blacklist,
            i = s.resolveAll(this.resolve);
          return i.includes(a)
            ? this.createError({
                params: {
                  values: s.toArray().join(", "),
                  resolved: i,
                },
              })
            : !0;
        },
      })),
      n
    );
  }
  strip(e = !0) {
    let r = this.clone();
    return (r.spec.strip = e), r;
  }
  describe() {
    const e = this.clone(),
      { label: r, meta: n } = e.spec;
    return {
      meta: n,
      label: r,
      type: e.type,
      oneOf: e._whitelist.describe(),
      notOneOf: e._blacklist.describe(),
      tests: e.tests
        .map((s) => ({
          name: s.OPTIONS.name,
          params: s.OPTIONS.params,
        }))
        .filter((s, i, o) => o.findIndex((u) => u.name === s.name) === i),
    };
  }
}
x.prototype.__isYupSchema__ = !0;
for (const t of ["validate", "validateSync"])
  x.prototype[`${t}At`] = function (e, r, n = {}) {
    const { parent: a, parentPath: s, schema: i } = wh(this, e, r, n.context);
    return i[t](
      a && a[s],
      A({}, n, {
        parent: a,
        path: e,
      })
    );
  };
for (const t of ["equals", "is"]) x.prototype[t] = x.prototype.oneOf;
for (const t of ["not", "nope"]) x.prototype[t] = x.prototype.notOneOf;
x.prototype.optional = x.prototype.notRequired;
const xh = x;
xh.prototype;
const b = (t) => t == null;
function Y() {
  return new Dr();
}
class Dr extends x {
  constructor() {
    super({
      type: "boolean",
    }),
      this.withMutation(() => {
        this.transform(function (e) {
          if (!this.isType(e)) {
            if (/^(true|1)$/i.test(String(e))) return !0;
            if (/^(false|0)$/i.test(String(e))) return !1;
          }
          return e;
        });
      });
  }
  _typeCheck(e) {
    return e instanceof Boolean && (e = e.valueOf()), typeof e == "boolean";
  }
  isTrue(e = Me.isValue) {
    return this.test({
      message: e,
      name: "is-value",
      exclusive: !0,
      params: {
        value: "true",
      },
      test(r) {
        return b(r) || r === !0;
      },
    });
  }
  isFalse(e = Me.isValue) {
    return this.test({
      message: e,
      name: "is-value",
      exclusive: !0,
      params: {
        value: "false",
      },
      test(r) {
        return b(r) || r === !1;
      },
    });
  }
}
Y.prototype = Dr.prototype;
let Eh =
    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  Fh =
    /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
  Th =
    /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
  Sh = (t) => b(t) || t === t.trim(),
  Ah = {}.toString();
function d() {
  return new Pr();
}
class Pr extends x {
  constructor() {
    super({
      type: "string",
    }),
      this.withMutation(() => {
        this.transform(function (e) {
          if (this.isType(e) || Array.isArray(e)) return e;
          const r = e != null && e.toString ? e.toString() : e;
          return r === Ah ? e : r;
        });
      });
  }
  _typeCheck(e) {
    return e instanceof String && (e = e.valueOf()), typeof e == "string";
  }
  _isPresent(e) {
    return super._isPresent(e) && !!e.length;
  }
  length(e, r = O.length) {
    return this.test({
      message: r,
      name: "length",
      exclusive: !0,
      params: {
        length: e,
      },
      test(n) {
        return b(n) || n.length === this.resolve(e);
      },
    });
  }
  min(e, r = O.min) {
    return this.test({
      message: r,
      name: "min",
      exclusive: !0,
      params: {
        min: e,
      },
      test(n) {
        return b(n) || n.length >= this.resolve(e);
      },
    });
  }
  max(e, r = O.max) {
    return this.test({
      name: "max",
      exclusive: !0,
      message: r,
      params: {
        max: e,
      },
      test(n) {
        return b(n) || n.length <= this.resolve(e);
      },
    });
  }
  matches(e, r) {
    let n = !1,
      a,
      s;
    return (
      r &&
        (typeof r == "object"
          ? ({ excludeEmptyString: n = !1, message: a, name: s } = r)
          : (a = r)),
      this.test({
        name: s || "matches",
        message: a || O.matches,
        params: {
          regex: e,
        },
        test: (i) => b(i) || (i === "" && n) || i.search(e) !== -1,
      })
    );
  }
  email(e = O.email) {
    return this.matches(Eh, {
      name: "email",
      message: e,
      excludeEmptyString: !0,
    });
  }
  url(e = O.url) {
    return this.matches(Fh, {
      name: "url",
      message: e,
      excludeEmptyString: !0,
    });
  }
  uuid(e = O.uuid) {
    return this.matches(Th, {
      name: "uuid",
      message: e,
      excludeEmptyString: !1,
    });
  }
  //-- transforms --
  ensure() {
    return this.default("").transform((e) => (e === null ? "" : e));
  }
  trim(e = O.trim) {
    return this.transform((r) => (r != null ? r.trim() : r)).test({
      message: e,
      name: "trim",
      test: Sh,
    });
  }
  lowercase(e = O.lowercase) {
    return this.transform((r) => (b(r) ? r : r.toLowerCase())).test({
      message: e,
      name: "string_case",
      exclusive: !0,
      test: (r) => b(r) || r === r.toLowerCase(),
    });
  }
  uppercase(e = O.uppercase) {
    return this.transform((r) => (b(r) ? r : r.toUpperCase())).test({
      message: e,
      name: "string_case",
      exclusive: !0,
      test: (r) => b(r) || r === r.toUpperCase(),
    });
  }
}
d.prototype = Pr.prototype;
let Oh = (t) => t != +t;
function Q() {
  return new Ir();
}
class Ir extends x {
  constructor() {
    super({
      type: "number",
    }),
      this.withMutation(() => {
        this.transform(function (e) {
          let r = e;
          if (typeof r == "string") {
            if (((r = r.replace(/\s/g, "")), r === "")) return NaN;
            r = +r;
          }
          return this.isType(r) ? r : parseFloat(r);
        });
      });
  }
  _typeCheck(e) {
    return (
      e instanceof Number && (e = e.valueOf()), typeof e == "number" && !Oh(e)
    );
  }
  min(e, r = I.min) {
    return this.test({
      message: r,
      name: "min",
      exclusive: !0,
      params: {
        min: e,
      },
      test(n) {
        return b(n) || n >= this.resolve(e);
      },
    });
  }
  max(e, r = I.max) {
    return this.test({
      message: r,
      name: "max",
      exclusive: !0,
      params: {
        max: e,
      },
      test(n) {
        return b(n) || n <= this.resolve(e);
      },
    });
  }
  lessThan(e, r = I.lessThan) {
    return this.test({
      message: r,
      name: "max",
      exclusive: !0,
      params: {
        less: e,
      },
      test(n) {
        return b(n) || n < this.resolve(e);
      },
    });
  }
  moreThan(e, r = I.moreThan) {
    return this.test({
      message: r,
      name: "min",
      exclusive: !0,
      params: {
        more: e,
      },
      test(n) {
        return b(n) || n > this.resolve(e);
      },
    });
  }
  positive(e = I.positive) {
    return this.moreThan(0, e);
  }
  negative(e = I.negative) {
    return this.lessThan(0, e);
  }
  integer(e = I.integer) {
    return this.test({
      name: "integer",
      message: e,
      test: (r) => b(r) || Number.isInteger(r),
    });
  }
  truncate() {
    return this.transform((e) => (b(e) ? e : e | 0));
  }
  round(e) {
    var r;
    let n = ["ceil", "floor", "round", "trunc"];
    if (
      ((e = ((r = e) == null ? void 0 : r.toLowerCase()) || "round"),
      e === "trunc")
    )
      return this.truncate();
    if (n.indexOf(e.toLowerCase()) === -1)
      throw new TypeError(
        "Only valid options for round() are: " + n.join(", ")
      );
    return this.transform((a) => (b(a) ? a : Math[e](a)));
  }
}
Q.prototype = Ir.prototype;
var Ch =
  /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function Dh(t) {
  var e = [1, 4, 5, 6, 7, 10, 11],
    r = 0,
    n,
    a;
  if ((a = Ch.exec(t))) {
    for (var s = 0, i; (i = e[s]); ++s) a[i] = +a[i] || 0;
    (a[2] = (+a[2] || 1) - 1),
      (a[3] = +a[3] || 1),
      (a[7] = a[7] ? String(a[7]).substr(0, 3) : 0),
      (a[8] === void 0 || a[8] === "") && (a[9] === void 0 || a[9] === "")
        ? (n = +new Date(a[1], a[2], a[3], a[4], a[5], a[6], a[7]))
        : (a[8] !== "Z" &&
            a[9] !== void 0 &&
            ((r = a[10] * 60 + a[11]), a[9] === "+" && (r = 0 - r)),
          (n = Date.UTC(a[1], a[2], a[3], a[4], a[5] + r, a[6], a[7])));
  } else n = Date.parse ? Date.parse(t) : NaN;
  return n;
}
let Nr = /* @__PURE__ */ new Date(""),
  Ph = (t) => Object.prototype.toString.call(t) === "[object Date]";
class Rr extends x {
  constructor() {
    super({
      type: "date",
    }),
      this.withMutation(() => {
        this.transform(function (e) {
          return this.isType(e)
            ? e
            : ((e = Dh(e)), isNaN(e) ? Nr : new Date(e));
        });
      });
  }
  _typeCheck(e) {
    return Ph(e) && !isNaN(e.getTime());
  }
  prepareParam(e, r) {
    let n;
    if (N.isRef(e)) n = e;
    else {
      let a = this.cast(e);
      if (!this._typeCheck(a))
        throw new TypeError(
          `\`${r}\` must be a Date or a value that can be \`cast()\` to a Date`
        );
      n = a;
    }
    return n;
  }
  min(e, r = Re.min) {
    let n = this.prepareParam(e, "min");
    return this.test({
      message: r,
      name: "min",
      exclusive: !0,
      params: {
        min: e,
      },
      test(a) {
        return b(a) || a >= this.resolve(n);
      },
    });
  }
  max(e, r = Re.max) {
    let n = this.prepareParam(e, "max");
    return this.test({
      message: r,
      name: "max",
      exclusive: !0,
      params: {
        max: e,
      },
      test(a) {
        return b(a) || a <= this.resolve(n);
      },
    });
  }
}
Rr.INVALID_DATE = Nr;
Rr.prototype;
function Ih(t, e, r, n) {
  var a = -1,
    s = t == null ? 0 : t.length;
  for (n && s && (r = t[++a]); ++a < s; ) r = e(r, t[a], a, t);
  return r;
}
var Nh = Ih;
function Rh(t) {
  return function (e) {
    return t == null ? void 0 : t[e];
  };
}
var Mh = Rh,
  jh = Mh,
  Uh = {
    // Latin-1 Supplement block.
    À: "A",
    Á: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    Å: "A",
    à: "a",
    á: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    Ç: "C",
    ç: "c",
    Ð: "D",
    ð: "d",
    È: "E",
    É: "E",
    Ê: "E",
    Ë: "E",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    Ì: "I",
    Í: "I",
    Î: "I",
    Ï: "I",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    Ñ: "N",
    ñ: "n",
    Ò: "O",
    Ó: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ø: "O",
    ò: "o",
    ó: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ø: "o",
    Ù: "U",
    Ú: "U",
    Û: "U",
    Ü: "U",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
    Ý: "Y",
    ý: "y",
    ÿ: "y",
    Æ: "Ae",
    æ: "ae",
    Þ: "Th",
    þ: "th",
    ß: "ss",
    // Latin Extended-A block.
    Ā: "A",
    Ă: "A",
    Ą: "A",
    ā: "a",
    ă: "a",
    ą: "a",
    Ć: "C",
    Ĉ: "C",
    Ċ: "C",
    Č: "C",
    ć: "c",
    ĉ: "c",
    ċ: "c",
    č: "c",
    Ď: "D",
    Đ: "D",
    ď: "d",
    đ: "d",
    Ē: "E",
    Ĕ: "E",
    Ė: "E",
    Ę: "E",
    Ě: "E",
    ē: "e",
    ĕ: "e",
    ė: "e",
    ę: "e",
    ě: "e",
    Ĝ: "G",
    Ğ: "G",
    Ġ: "G",
    Ģ: "G",
    ĝ: "g",
    ğ: "g",
    ġ: "g",
    ģ: "g",
    Ĥ: "H",
    Ħ: "H",
    ĥ: "h",
    ħ: "h",
    Ĩ: "I",
    Ī: "I",
    Ĭ: "I",
    Į: "I",
    İ: "I",
    ĩ: "i",
    ī: "i",
    ĭ: "i",
    į: "i",
    ı: "i",
    Ĵ: "J",
    ĵ: "j",
    Ķ: "K",
    ķ: "k",
    ĸ: "k",
    Ĺ: "L",
    Ļ: "L",
    Ľ: "L",
    Ŀ: "L",
    Ł: "L",
    ĺ: "l",
    ļ: "l",
    ľ: "l",
    ŀ: "l",
    ł: "l",
    Ń: "N",
    Ņ: "N",
    Ň: "N",
    Ŋ: "N",
    ń: "n",
    ņ: "n",
    ň: "n",
    ŋ: "n",
    Ō: "O",
    Ŏ: "O",
    Ő: "O",
    ō: "o",
    ŏ: "o",
    ő: "o",
    Ŕ: "R",
    Ŗ: "R",
    Ř: "R",
    ŕ: "r",
    ŗ: "r",
    ř: "r",
    Ś: "S",
    Ŝ: "S",
    Ş: "S",
    Š: "S",
    ś: "s",
    ŝ: "s",
    ş: "s",
    š: "s",
    Ţ: "T",
    Ť: "T",
    Ŧ: "T",
    ţ: "t",
    ť: "t",
    ŧ: "t",
    Ũ: "U",
    Ū: "U",
    Ŭ: "U",
    Ů: "U",
    Ű: "U",
    Ų: "U",
    ũ: "u",
    ū: "u",
    ŭ: "u",
    ů: "u",
    ű: "u",
    ų: "u",
    Ŵ: "W",
    ŵ: "w",
    Ŷ: "Y",
    ŷ: "y",
    Ÿ: "Y",
    Ź: "Z",
    Ż: "Z",
    Ž: "Z",
    ź: "z",
    ż: "z",
    ž: "z",
    Ĳ: "IJ",
    ĳ: "ij",
    Œ: "Oe",
    œ: "oe",
    ŉ: "'n",
    ſ: "s",
  },
  Lh = jh(Uh),
  qh = Lh,
  zh = qh,
  kh = ne,
  Gh = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
  Hh = "\\u0300-\\u036f",
  Vh = "\\ufe20-\\ufe2f",
  Bh = "\\u20d0-\\u20ff",
  Kh = Hh + Vh + Bh,
  Wh = "[" + Kh + "]",
  Jh = RegExp(Wh, "g");
function Zh(t) {
  return (t = kh(t)), t && t.replace(Gh, zh).replace(Jh, "");
}
var Yh = Zh,
  Xh = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Qh(t) {
  return t.match(Xh) || [];
}
var ed = Qh,
  td = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function rd(t) {
  return td.test(t);
}
var nd = rd,
  Mr = "\\ud800-\\udfff",
  ad = "\\u0300-\\u036f",
  sd = "\\ufe20-\\ufe2f",
  id = "\\u20d0-\\u20ff",
  od = ad + sd + id,
  jr = "\\u2700-\\u27bf",
  Ur = "a-z\\xdf-\\xf6\\xf8-\\xff",
  ud = "\\xac\\xb1\\xd7\\xf7",
  cd = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
  ld = "\\u2000-\\u206f",
  fd =
    " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
  Lr = "A-Z\\xc0-\\xd6\\xd8-\\xde",
  hd = "\\ufe0e\\ufe0f",
  qr = ud + cd + ld + fd,
  zr = "['’]",
  Ht = "[" + qr + "]",
  dd = "[" + od + "]",
  kr = "\\d+",
  pd = "[" + jr + "]",
  Gr = "[" + Ur + "]",
  Hr = "[^" + Mr + qr + kr + jr + Ur + Lr + "]",
  md = "\\ud83c[\\udffb-\\udfff]",
  yd = "(?:" + dd + "|" + md + ")",
  vd = "[^" + Mr + "]",
  Vr = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  Br = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  G = "[" + Lr + "]",
  gd = "\\u200d",
  Vt = "(?:" + Gr + "|" + Hr + ")",
  _d = "(?:" + G + "|" + Hr + ")",
  Bt = "(?:" + zr + "(?:d|ll|m|re|s|t|ve))?",
  Kt = "(?:" + zr + "(?:D|LL|M|RE|S|T|VE))?",
  Kr = yd + "?",
  Wr = "[" + hd + "]?",
  bd = "(?:" + gd + "(?:" + [vd, Vr, Br].join("|") + ")" + Wr + Kr + ")*",
  $d = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
  wd = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
  xd = Wr + Kr + bd,
  Ed = "(?:" + [pd, Vr, Br].join("|") + ")" + xd,
  Fd = RegExp(
    [
      G + "?" + Gr + "+" + Bt + "(?=" + [Ht, G, "$"].join("|") + ")",
      _d + "+" + Kt + "(?=" + [Ht, G + Vt, "$"].join("|") + ")",
      G + "?" + Vt + "+" + Bt,
      G + "+" + Kt,
      wd,
      $d,
      kr,
      Ed,
    ].join("|"),
    "g"
  );
function Td(t) {
  return t.match(Fd) || [];
}
var Sd = Td,
  Ad = ed,
  Od = nd,
  Cd = ne,
  Dd = Sd;
function Pd(t, e, r) {
  return (
    (t = Cd(t)),
    (e = r ? void 0 : e),
    e === void 0 ? (Od(t) ? Dd(t) : Ad(t)) : t.match(e) || []
  );
}
var Id = Pd,
  Nd = Nh,
  Rd = Yh,
  Md = Id,
  jd = "['’]",
  Ud = RegExp(jd, "g");
function Ld(t) {
  return function (e) {
    return Nd(Md(Rd(e).replace(Ud, "")), t, "");
  };
}
var Jr = Ld,
  qd = Jr,
  zd = qd(function (t, e, r) {
    return t + (r ? "_" : "") + e.toLowerCase();
  }),
  Wt = zd;
function kd(t, e, r) {
  var n = -1,
    a = t.length;
  e < 0 && (e = -e > a ? 0 : a + e),
    (r = r > a ? a : r),
    r < 0 && (r += a),
    (a = e > r ? 0 : (r - e) >>> 0),
    (e >>>= 0);
  for (var s = Array(a); ++n < a; ) s[n] = t[n + e];
  return s;
}
var Gd = kd,
  Hd = Gd;
function Vd(t, e, r) {
  var n = t.length;
  return (r = r === void 0 ? n : r), !e && r >= n ? t : Hd(t, e, r);
}
var Bd = Vd,
  Kd = "\\ud800-\\udfff",
  Wd = "\\u0300-\\u036f",
  Jd = "\\ufe20-\\ufe2f",
  Zd = "\\u20d0-\\u20ff",
  Yd = Wd + Jd + Zd,
  Xd = "\\ufe0e\\ufe0f",
  Qd = "\\u200d",
  ep = RegExp("[" + Qd + Kd + Yd + Xd + "]");
function tp(t) {
  return ep.test(t);
}
var Zr = tp;
function rp(t) {
  return t.split("");
}
var np = rp,
  Yr = "\\ud800-\\udfff",
  ap = "\\u0300-\\u036f",
  sp = "\\ufe20-\\ufe2f",
  ip = "\\u20d0-\\u20ff",
  op = ap + sp + ip,
  up = "\\ufe0e\\ufe0f",
  cp = "[" + Yr + "]",
  Ve = "[" + op + "]",
  Be = "\\ud83c[\\udffb-\\udfff]",
  lp = "(?:" + Ve + "|" + Be + ")",
  Xr = "[^" + Yr + "]",
  Qr = "(?:\\ud83c[\\udde6-\\uddff]){2}",
  en = "[\\ud800-\\udbff][\\udc00-\\udfff]",
  fp = "\\u200d",
  tn = lp + "?",
  rn = "[" + up + "]?",
  hp = "(?:" + fp + "(?:" + [Xr, Qr, en].join("|") + ")" + rn + tn + ")*",
  dp = rn + tn + hp,
  pp = "(?:" + [Xr + Ve + "?", Ve, Qr, en, cp].join("|") + ")",
  mp = RegExp(Be + "(?=" + Be + ")|" + pp + dp, "g");
function yp(t) {
  return t.match(mp) || [];
}
var vp = yp,
  gp = np,
  _p = Zr,
  bp = vp;
function $p(t) {
  return _p(t) ? bp(t) : gp(t);
}
var wp = $p,
  xp = Bd,
  Ep = Zr,
  Fp = wp,
  Tp = ne;
function Sp(t) {
  return function (e) {
    e = Tp(e);
    var r = Ep(e) ? Fp(e) : void 0,
      n = r ? r[0] : e.charAt(0),
      a = r ? xp(r, 1).join("") : e.slice(1);
    return n[t]() + a;
  };
}
var Ap = Sp,
  Op = Ap,
  Cp = Op("toUpperCase"),
  Dp = Cp,
  Pp = ne,
  Ip = Dp;
function Np(t) {
  return Ip(Pp(t).toLowerCase());
}
var Rp = Np,
  Mp = Rp,
  jp = Jr,
  Up = jp(function (t, e, r) {
    return (e = e.toLowerCase()), t + (r ? Mp(e) : e);
  }),
  Lp = Up,
  qp = vr,
  zp = _r,
  kp = Ar;
function Gp(t, e) {
  var r = {};
  return (
    (e = kp(e)),
    zp(t, function (n, a, s) {
      qp(r, e(n, a, s), n);
    }),
    r
  );
}
var Hp = Gp,
  ge = {},
  Vp = {
    get exports() {
      return ge;
    },
    set exports(t) {
      ge = t;
    },
  };
Vp.exports = function (t) {
  return nn(Bp(t), t);
};
ge.array = nn;
function nn(t, e) {
  var r = t.length,
    n = new Array(r),
    a = {},
    s = r,
    i = Kp(e),
    o = Wp(t);
  for (
    e.forEach(function (c) {
      if (!o.has(c[0]) || !o.has(c[1]))
        throw new Error(
          "Unknown node. There is an unknown node in the supplied edges."
        );
    });
    s--;

  )
    a[s] || u(t[s], s, /* @__PURE__ */ new Set());
  return n;
  function u(c, f, l) {
    if (l.has(c)) {
      var h;
      try {
        h = ", node was:" + JSON.stringify(c);
      } catch {
        h = "";
      }
      throw new Error("Cyclic dependency" + h);
    }
    if (!o.has(c))
      throw new Error(
        "Found unknown node. Make sure to provided all involved nodes. Unknown node: " +
          JSON.stringify(c)
      );
    if (!a[f]) {
      a[f] = !0;
      var p = i.get(c) || /* @__PURE__ */ new Set();
      if (((p = Array.from(p)), (f = p.length))) {
        l.add(c);
        do {
          var m = p[--f];
          u(m, o.get(m), l);
        } while (f);
        l.delete(c);
      }
      n[--r] = c;
    }
  }
}
function Bp(t) {
  for (var e = /* @__PURE__ */ new Set(), r = 0, n = t.length; r < n; r++) {
    var a = t[r];
    e.add(a[0]), e.add(a[1]);
  }
  return Array.from(e);
}
function Kp(t) {
  for (var e = /* @__PURE__ */ new Map(), r = 0, n = t.length; r < n; r++) {
    var a = t[r];
    e.has(a[0]) || e.set(a[0], /* @__PURE__ */ new Set()),
      e.has(a[1]) || e.set(a[1], /* @__PURE__ */ new Set()),
      e.get(a[0]).add(a[1]);
  }
  return e;
}
function Wp(t) {
  for (var e = /* @__PURE__ */ new Map(), r = 0, n = t.length; r < n; r++)
    e.set(t[r], r);
  return e;
}
function Jp(t, e = []) {
  let r = [],
    n = /* @__PURE__ */ new Set(),
    a = new Set(e.map(([i, o]) => `${i}-${o}`));
  function s(i, o) {
    let u = Te.split(i)[0];
    n.add(u), a.has(`${o}-${u}`) || r.push([o, u]);
  }
  for (const i in t)
    if (he(t, i)) {
      let o = t[i];
      n.add(i),
        N.isRef(o) && o.isSibling
          ? s(o.path, i)
          : rt(o) && "deps" in o && o.deps.forEach((u) => s(u, i));
    }
  return ge.array(Array.from(n), r).reverse();
}
function Jt(t, e) {
  let r = 1 / 0;
  return (
    t.some((n, a) => {
      var s;
      if (((s = e.path) == null ? void 0 : s.indexOf(n)) !== -1)
        return (r = a), !0;
    }),
    r
  );
}
function an(t) {
  return (e, r) => Jt(t, e) - Jt(t, r);
}
function H() {
  return (
    (H =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
        return t;
      }),
    H.apply(this, arguments)
  );
}
let Zt = (t) => Object.prototype.toString.call(t) === "[object Object]";
function Zp(t, e) {
  let r = Object.keys(t.fields);
  return Object.keys(e).filter((n) => r.indexOf(n) === -1);
}
const Yp = an([]);
class sn extends x {
  constructor(e) {
    super({
      type: "object",
    }),
      (this.fields = /* @__PURE__ */ Object.create(null)),
      (this._sortErrors = Yp),
      (this._nodes = []),
      (this._excludedEdges = []),
      this.withMutation(() => {
        this.transform(function (n) {
          if (typeof n == "string")
            try {
              n = JSON.parse(n);
            } catch {
              n = null;
            }
          return this.isType(n) ? n : null;
        }),
          e && this.shape(e);
      });
  }
  _typeCheck(e) {
    return Zt(e) || typeof e == "function";
  }
  _cast(e, r = {}) {
    var n;
    let a = super._cast(e, r);
    if (a === void 0) return this.getDefault();
    if (!this._typeCheck(a)) return a;
    let s = this.fields,
      i = (n = r.stripUnknown) != null ? n : this.spec.noUnknown,
      o = this._nodes.concat(
        Object.keys(a).filter((l) => this._nodes.indexOf(l) === -1)
      ),
      u = {},
      c = H({}, r, {
        parent: u,
        __validating: r.__validating || !1,
      }),
      f = !1;
    for (const l of o) {
      let h = s[l],
        p = he(a, l);
      if (h) {
        let m,
          y = a[l];
        (c.path = (r.path ? `${r.path}.` : "") + l),
          (h = h.resolve({
            value: y,
            context: r.context,
            parent: u,
          }));
        let g = "spec" in h ? h.spec : void 0,
          $ = g == null ? void 0 : g.strict;
        if (g != null && g.strip) {
          f = f || l in a;
          continue;
        }
        (m =
          !r.__validating || !$
            ? // TODO: use _cast, this is double resolving
              h.cast(a[l], c)
            : a[l]),
          m !== void 0 && (u[l] = m);
      } else p && !i && (u[l] = a[l]);
      u[l] !== a[l] && (f = !0);
    }
    return f ? u : a;
  }
  _validate(e, r = {}, n) {
    let a = [],
      {
        sync: s,
        from: i = [],
        originalValue: o = e,
        abortEarly: u = this.spec.abortEarly,
        recursive: c = this.spec.recursive,
      } = r;
    (i = [
      {
        schema: this,
        value: o,
      },
      ...i,
    ]),
      (r.__validating = !0),
      (r.originalValue = o),
      (r.from = i),
      super._validate(e, r, (f, l) => {
        if (f) {
          if (!E.isError(f) || u) return void n(f, l);
          a.push(f);
        }
        if (!c || !Zt(l)) {
          n(a[0] || null, l);
          return;
        }
        o = o || l;
        let h = this._nodes.map((p) => (m, y) => {
          let g =
              p.indexOf(".") === -1
                ? (r.path ? `${r.path}.` : "") + p
                : `${r.path || ""}["${p}"]`,
            $ = this.fields[p];
          if ($ && "validate" in $) {
            $.validate(
              l[p],
              H({}, r, {
                // @ts-ignore
                path: g,
                from: i,
                // inner fields are always strict:
                // 1. this isn't strict so the casting will also have cast inner values
                // 2. this is strict in which case the nested values weren't cast either
                strict: !0,
                parent: l,
                originalValue: o[p],
              }),
              y
            );
            return;
          }
          y(null);
        });
        de(
          {
            sync: s,
            tests: h,
            value: l,
            errors: a,
            endEarly: u,
            sort: this._sortErrors,
            path: r.path,
          },
          n
        );
      });
  }
  clone(e) {
    const r = super.clone(e);
    return (
      (r.fields = H({}, this.fields)),
      (r._nodes = this._nodes),
      (r._excludedEdges = this._excludedEdges),
      (r._sortErrors = this._sortErrors),
      r
    );
  }
  concat(e) {
    let r = super.concat(e),
      n = r.fields;
    for (let [a, s] of Object.entries(this.fields)) {
      const i = n[a];
      i === void 0
        ? (n[a] = s)
        : i instanceof x && s instanceof x && (n[a] = s.concat(i));
    }
    return r.withMutation(() => r.shape(n, this._excludedEdges));
  }
  getDefaultFromShape() {
    let e = {};
    return (
      this._nodes.forEach((r) => {
        const n = this.fields[r];
        e[r] = "default" in n ? n.getDefault() : void 0;
      }),
      e
    );
  }
  _getDefault() {
    if ("default" in this.spec) return super._getDefault();
    if (this._nodes.length) return this.getDefaultFromShape();
  }
  shape(e, r = []) {
    let n = this.clone(),
      a = Object.assign(n.fields, e);
    return (
      (n.fields = a),
      (n._sortErrors = an(Object.keys(a))),
      r.length &&
        (Array.isArray(r[0]) || (r = [r]),
        (n._excludedEdges = [...n._excludedEdges, ...r])),
      (n._nodes = Jp(a, n._excludedEdges)),
      n
    );
  }
  pick(e) {
    const r = {};
    for (const n of e) this.fields[n] && (r[n] = this.fields[n]);
    return this.clone().withMutation((n) => ((n.fields = {}), n.shape(r)));
  }
  omit(e) {
    const r = this.clone(),
      n = r.fields;
    r.fields = {};
    for (const a of e) delete n[a];
    return r.withMutation(() => r.shape(n));
  }
  from(e, r, n) {
    let a = Te.getter(e, !0);
    return this.transform((s) => {
      if (s == null) return s;
      let i = s;
      return he(s, e) && ((i = H({}, s)), n || delete i[e], (i[r] = a(s))), i;
    });
  }
  noUnknown(e = !0, r = je.noUnknown) {
    typeof e == "string" && ((r = e), (e = !0));
    let n = this.test({
      name: "noUnknown",
      exclusive: !0,
      message: r,
      test(a) {
        if (a == null) return !0;
        const s = Zp(this.schema, a);
        return (
          !e ||
          s.length === 0 ||
          this.createError({
            params: {
              unknown: s.join(", "),
            },
          })
        );
      },
    });
    return (n.spec.noUnknown = e), n;
  }
  unknown(e = !0, r = je.noUnknown) {
    return this.noUnknown(!e, r);
  }
  transformKeys(e) {
    return this.transform((r) => r && Hp(r, (n, a) => e(a)));
  }
  camelCase() {
    return this.transformKeys(Lp);
  }
  snakeCase() {
    return this.transformKeys(Wt);
  }
  constantCase() {
    return this.transformKeys((e) => Wt(e).toUpperCase());
  }
  describe() {
    let e = super.describe();
    return (e.fields = Or(this.fields, (r) => r.describe())), e;
  }
}
function v(t) {
  return new sn(t);
}
v.prototype = sn.prototype;
function _e() {
  return (
    (_e =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
        return t;
      }),
    _e.apply(this, arguments)
  );
}
function q(t) {
  return new on(t);
}
class on extends x {
  constructor(e) {
    super({
      type: "array",
    }),
      (this.innerType = void 0),
      (this.innerType = e),
      this.withMutation(() => {
        this.transform(function (r) {
          if (typeof r == "string")
            try {
              r = JSON.parse(r);
            } catch {
              r = null;
            }
          return this.isType(r) ? r : null;
        });
      });
  }
  _typeCheck(e) {
    return Array.isArray(e);
  }
  get _subType() {
    return this.innerType;
  }
  _cast(e, r) {
    const n = super._cast(e, r);
    if (!this._typeCheck(n) || !this.innerType) return n;
    let a = !1;
    const s = n.map((i, o) => {
      const u = this.innerType.cast(
        i,
        _e({}, r, {
          path: `${r.path || ""}[${o}]`,
        })
      );
      return u !== i && (a = !0), u;
    });
    return a ? s : n;
  }
  _validate(e, r = {}, n) {
    var a, s;
    let i = [],
      o = r.sync,
      u = r.path,
      c = this.innerType,
      f = (a = r.abortEarly) != null ? a : this.spec.abortEarly,
      l = (s = r.recursive) != null ? s : this.spec.recursive,
      h = r.originalValue != null ? r.originalValue : e;
    super._validate(e, r, (p, m) => {
      if (p) {
        if (!E.isError(p) || f) return void n(p, m);
        i.push(p);
      }
      if (!l || !c || !this._typeCheck(m)) {
        n(i[0] || null, m);
        return;
      }
      h = h || m;
      let y = new Array(m.length);
      for (let g = 0; g < m.length; g++) {
        let $ = m[g],
          F = `${r.path || ""}[${g}]`,
          C = _e({}, r, {
            path: F,
            strict: !0,
            parent: m,
            index: g,
            originalValue: h[g],
          });
        y[g] = (T, D) => c.validate($, C, D);
      }
      de(
        {
          sync: o,
          path: u,
          value: m,
          errors: i,
          endEarly: f,
          tests: y,
        },
        n
      );
    });
  }
  clone(e) {
    const r = super.clone(e);
    return (r.innerType = this.innerType), r;
  }
  concat(e) {
    let r = super.concat(e);
    return (
      (r.innerType = this.innerType),
      e.innerType &&
        (r.innerType = r.innerType
          ? // @ts-expect-error Lazy doesn't have concat()
            r.innerType.concat(e.innerType)
          : e.innerType),
      r
    );
  }
  of(e) {
    let r = this.clone();
    if (!rt(e))
      throw new TypeError(
        "`array.of()` sub-schema must be a valid yup schema not: " + V(e)
      );
    return (r.innerType = e), r;
  }
  length(e, r = le.length) {
    return this.test({
      message: r,
      name: "length",
      exclusive: !0,
      params: {
        length: e,
      },
      test(n) {
        return b(n) || n.length === this.resolve(e);
      },
    });
  }
  min(e, r) {
    return (
      (r = r || le.min),
      this.test({
        message: r,
        name: "min",
        exclusive: !0,
        params: {
          min: e,
        },
        // FIXME(ts): Array<typeof T>
        test(n) {
          return b(n) || n.length >= this.resolve(e);
        },
      })
    );
  }
  max(e, r) {
    return (
      (r = r || le.max),
      this.test({
        message: r,
        name: "max",
        exclusive: !0,
        params: {
          max: e,
        },
        test(n) {
          return b(n) || n.length <= this.resolve(e);
        },
      })
    );
  }
  ensure() {
    return this.default(() => []).transform((e, r) =>
      this._typeCheck(e) ? e : r == null ? [] : [].concat(r)
    );
  }
  compact(e) {
    let r = e ? (n, a, s) => !e(n, a, s) : (n) => !!n;
    return this.transform((n) => (n != null ? n.filter(r) : n));
  }
  describe() {
    let e = super.describe();
    return this.innerType && (e.innerType = this.innerType.describe()), e;
  }
  nullable(e = !0) {
    return super.nullable(e);
  }
  defined() {
    return super.defined();
  }
  required(e) {
    return super.required(e);
  }
}
q.prototype = on.prototype;
const Yt = q().of(
    v().shape({
      variantId: d().required(),
      productId: d().nullable(),
      quantity: Q().required(),
      sellingPlanId: d().nullable(),
      attributes: q()
        .of(
          v().shape({
            key: d().required(),
            value: d().required(),
          })
        )
        .nullable(),
    })
  ),
  un = v().shape({
    key: d().required(),
    value: d().required(),
  }),
  Xp = v().shape({
    attributes: q().max(255).of(un).required(),
  }),
  Qp = v().shape({
    note: d(),
  }),
  em = v().shape({
    vaultKey: d().required(),
    scope: d(),
  }),
  tm = v().shape({
    vaultKey: d().required(),
    key: d().required(),
  }),
  rm = v().shape({
    vaultKey: d().required(),
    key: d().required(),
    value: d(),
  }),
  nm = v().shape({
    vaultKey: d().required(),
    key: d().required(),
  }),
  am = v().shape({
    vaultKey: d().required(),
  }),
  sm = v().shape({
    vaultKey: d().required(),
  }),
  im = v().shape({
    vaultKey: d().required(),
    key: d().required(),
  }),
  om = v().shape({
    productId: d().required(),
    variantId: d().required(),
  }),
  um = q().of(
    v().shape({
      id: d().required(),
      name: d().required(),
      variants: q().of(om).required(),
    })
  ),
  cm = v().shape({ name: d().required().min(3) }),
  lm = d().required(),
  fm = v().shape({
    productId: d().required(),
    variantId: d().required(),
    wishlistId: d().required(),
  }),
  hm = Y().required().isTrue(),
  dm = v().shape({
    productId: d().required(),
    variantId: d().required(),
    wishlistId: d().required(),
  }),
  pm = Y().required().isTrue(),
  mm = v()
    .shape({
      action: d()
        .oneOf(
          ["login", "create"],
          'action must be either "login" or "create".'
        )
        .notRequired(),
    })
    .notRequired(),
  ym = Y().required().isTrue(),
  Ke = (t) =>
    typeof t == "function"
      ? !1
      : typeof t == "object" && t !== null
      ? !Object.values(t).some((e) => !Ke(e))
      : !0,
  vm = (t) => {
    if (typeof t == "string")
      try {
        JSON.parse(t);
      } catch {
        return !1;
      }
    return (typeof t == "object" && t !== null) || Array.isArray(t)
      ? Ke(t)
      : !1;
  },
  gm = v().shape({
    analyticEvent: d().required(),
    analyticProperties: v()
      .test("is-json", "Field must be a valid JSON object or array", vm)
      .required(),
  }),
  _m = Y().required().isTrue(),
  bm = (t) => {
    try {
      return new URL(t), !0;
    } catch {
      return !1;
    }
  },
  cn = [
    {
      functionName: "addToCart",
      actionName: "cart/add",
      schema: v().shape({
        cartAttributes: q().of(un),
        lineItems: Yt,
      }),
    },
    {
      functionName: "applyDiscount",
      actionName: "discount/apply",
      schema: v().shape({
        discountCode: d().required(),
      }),
    },
    {
      functionName: "removeDiscounts",
      actionName: "discount/remove/all",
      schema: null,
    },
    {
      functionName: "applyGiftCard",
      actionName: "giftcard/apply",
      schema: v().shape({
        giftCardCode: d().required(),
      }),
    },
    {
      functionName: "openCart",
      actionName: "cart/open",
      schema: null,
    },
    {
      functionName: "authenticationOpen",
      actionName: "authentication/open",
      schema: mm,
      successSchema: ym,
    },
    {
      functionName: "openCollection",
      actionName: "collection/open",
      schema: v().shape({
        collectionId: d().required(),
      }),
    },
    {
      functionName: "openProduct",
      actionName: "product/open",
      schema: v().shape({
        productId: d().required(),
        variantId: d(),
        isRelatedProduct: Y(),
      }),
    },
    {
      functionName: "showToast",
      actionName: "app/toast",
      schema: v().shape({
        message: d().required(),
        type: d().required().oneOf(["success", "warning", "error"]),
      }),
    },
    {
      functionName: "updateView",
      actionName: "view/updated",
      schema: v().shape({
        height: Q().required(),
        width: Q().required(),
        multiplier: Q().required(),
      }),
    },
    {
      functionName: "getCustomerIdentity",
      actionName: "customer/identity",
      schema: null,
    },
    {
      functionName: "renderView",
      actionName: "view/rendered",
      schema: null,
    },
    {
      functionName: "openScreen",
      actionName: "screen/open",
      schema: v().shape({
        destination: v()
          .shape({
            type: d()
              .oneOf(
                ["internal", "web"],
                'Type must be either "internal" or "web".'
              )
              .required("Type is required."),
            url: d()
              .test("valid-url", "URL is not valid.", function (t) {
                const { type: e } = this.parent;
                return e === "internal" ? !0 : e === "web" ? bm(t) : !1;
              })
              .required("URL is required."),
          })
          .required("Destination is required."),
      }),
    },
    {
      functionName: "scrollToBlockTop",
      actionName: "view/scrollToBlockTop",
      schema: null,
    },
    {
      functionName: "scrollToBlockBottom",
      actionName: "view/scrollToBlockBottom",
      schema: null,
    },
    {
      functionName: "removeFromCart",
      actionName: "cart/remove",
      schema: v().shape({
        lineItems: Yt,
      }),
    },
    {
      functionName: "trackAnalyticEvent",
      actionName: "analytics/track",
      schema: gm,
      successSchema: _m,
    },
    {
      functionName: "updateCartAttributes",
      actionName: "cart/updateAttributes",
      schema: Xp,
    },
    {
      functionName: "updateCartNote",
      actionName: "cart/updateNote",
      schema: Qp,
    },
    {
      functionName: "vaultInitialize",
      actionName: "vault/initialize",
      schema: em,
    },
    {
      functionName: "vaultGet",
      actionName: "vault/get",
      schema: tm,
    },
    {
      functionName: "vaultSet",
      actionName: "vault/set",
      schema: rm,
    },
    {
      functionName: "vaultRemove",
      actionName: "vault/remove",
      schema: nm,
    },
    {
      functionName: "vaultClear",
      actionName: "vault/clear",
      schema: am,
    },
    {
      functionName: "vaultKeys",
      actionName: "vault/keys",
      schema: sm,
    },
    {
      functionName: "vaultObserve",
      actionName: "vault/observe",
      schema: im,
    },
    {
      functionName: "wishlistCreate",
      actionName: "wishlist/create",
      schema: cm,
      successSchema: lm,
    },
    {
      functionName: "wishlistsGet",
      actionName: "wishlists/get",
      schema: null,
      successSchema: um,
    },
    {
      functionName: "wishlistItemAdd",
      actionName: "wishlist/item/add",
      schema: fm,
      successSchema: hm,
    },
    {
      functionName: "wishlistItemRemove",
      actionName: "wishlist/item/remove",
      schema: dm,
      successSchema: pm,
    },
  ],
  S = {
    PLATFORM_IOS: "ios",
    PLATFORM_ANDROID: "android",
    PLATFORM_EDITOR: "editor",
    ACTION_RESPONSE_SUCCESS: "success",
    ACTION_RESPONSE_ERROR: "error",
    TAPCART_SDK: "tapcart-sdk",
  },
  $m = (t, e) =>
    cn.reduce((n, a, s) => {
      const { schema: i, functionName: o, actionName: u, successSchema: c } = a,
        f = (l, h = {}) => {
          let p;
          if (i)
            try {
              p = i.validateSync(l);
            } catch (y) {
              throw new Error(y.message);
            }
          const m = {
            id: rr(),
            type: "action",
            name: u,
            data: p,
          };
          (h.onSuccess || h.onError) && t(m.id, h.onSuccess, h.onError, c),
            e(m);
        };
      return (n[o] = f), n;
    }, {}),
  wm = (t) => {
    const e = {},
      r = (i, o, u, c) => {
        let f;
        o &&
          (f = (l) => {
            if (c)
              try {
                o(c.validateSync(l));
              } catch (h) {
                u && u(h);
              }
            else o(l);
          }),
          (e[i] = {
            [S.ACTION_RESPONSE_SUCCESS]: f,
            [S.ACTION_RESPONSE_ERROR]: u,
          });
      },
      n = (i, o, u) => {
        var c;
        typeof ((c = e[i]) == null ? void 0 : c[o]) == "function" && e[i][o](u);
      };
    return {
      actions: $m(r, t),
      respond: n,
      action: (i, o = null, u = {}) => {
        var f;
        if (!i) throw new Error("actionType is a required parameter");
        const c = {
          id: rr(),
          type: "action",
          name: i,
          data: o,
        };
        (u.onSuccess || u.onError) &&
          r(
            c.id,
            u.onSuccess,
            u.onError,
            (f = cn.find((l) => l.actionName === i)) == null
              ? void 0
              : f.successSchema
          ),
          t(c);
      },
    };
  },
  Xt = [
    "cart/updated",
    "product/updated",
    "customer/updated",
    "variables/updated",
  ],
  ue = {
    CART_UPDATED: "cart/updated",
    PRODUCT_UPDATED: "product/updated",
    CUSTOMER_UPDATED: "customer/updated",
    VARIABLES_UPDATED: "variables/updated",
  },
  xm = (t, e) => {
    switch (t) {
      case ue.CART_UPDATED:
        return { cart: e.cart || null };
      case ue.PRODUCT_UPDATED:
        return { product: e.product || null };
      case ue.CUSTOMER_UPDATED:
        return { customer: e.customer || null };
      case ue.VARIABLES_UPDATED:
        return { ...e };
      default:
        return e;
    }
  },
  Em = ({ setVariables: t }) => {
    const e = {};
    return {
      notify: (a, s) => {
        var i;
        if (!Xt.includes(a)) throw new Error("Unsupported Event");
        (i = e[a]) != null && i.size && e[a].forEach((o) => o(s));
      },
      registerEventHandler: (a, s) => {
        if (!Xt.includes(a)) throw new Error("Unsupported Event");
        if (typeof s != "function") throw new TypeError("Invalid Handler");
        const i = (o) => {
          o && t(xm(a, o)), s(o);
        };
        return (
          e[a] ?? (e[a] = /* @__PURE__ */ new Set()),
          e[a].add(i),
          () => e[a].delete(i)
        );
      },
    };
  },
  Fm = () => {
    let t;
    const e = (u, c) =>
        window.webkit.messageHandlers[u].postMessage(JSON.stringify(c)),
      r = (u, c) => window[u].postMessage(JSON.stringify(c)),
      n = (u, c) => {
        var f, l;
        console.log(c),
          window == null ||
            window.postMessage(
              { type: S.TAPCART_SDK, message: JSON.stringify(c) },
              "*"
            ),
          (l =
            (f = window == null ? void 0 : window.parent) == null
              ? void 0
              : f.window) == null ||
            l.postMessage(
              { type: S.TAPCART_SDK, message: JSON.stringify(c) },
              "*"
            );
      },
      a = {
        [S.PLATFORM_IOS]: e,
        [S.PLATFORM_ANDROID]: r,
        [S.PLATFORM_EDITOR]: n,
      },
      s = (u, c) => (f) => a[u](c, f);
    return {
      sendMessage: (u) => t(u),
      init: (u, c) => {
        if (!u || !c) throw new Error("Failed to initialize ActionBridge");
        if (
          u !== S.PLATFORM_IOS &&
          u !== S.PLATFORM_ANDROID &&
          u !== S.PLATFORM_EDITOR
        )
          throw new Error("Unknown Platform");
        if (u === S.PLATFORM_IOS && !window.webkit)
          throw new Error("Webview Interface not available");
        if (u === S.PLATFORM_ANDROID && !window[c])
          throw new Error("Webview Interface  not available");
        t = s(u, c);
      },
    };
  };
class M {
  constructor(e) {
    this.message = e;
  }
}
class Tm extends M {}
class Sm extends M {}
class Am extends M {}
class Om extends M {}
class Cm extends M {}
class Dm extends M {}
const We = {
    VaultAccessException: Tm,
    VaultBuildException: Sm,
    VaultInvalidArgumentException: Am,
    VaultInvalidScopeException: Om,
    VaultScopeModificationException: Cm,
    VaultUserException: M,
    VaultUserIdentifierException: Dm,
  },
  L = (t) => {
    if (Object.values(We).some((r) => t instanceof r)) return t;
    const e = We[t.type];
    return e ? new e(t.message) : new M("unknown error occurred");
  },
  Pm = (t, e) => ({
    get: (n) =>
      new Promise((a, s) => {
        e.actions.vaultGet(
          { vaultKey: t, key: n },
          {
            onSuccess: a,
            onError: (i) => s(L(i)),
          }
        );
      }),
    set: (n, a) =>
      new Promise((s, i) => {
        e.actions.vaultSet(
          {
            vaultKey: t,
            key: n,
            value: a,
          },
          {
            onSuccess: s,
            onError: (o) => i(L(o)),
          }
        );
      }),
    clear: () =>
      new Promise((n, a) => {
        e.actions.vaultClear(
          {
            vaultKey: t,
          },
          {
            onSuccess: n,
            onError: (s) => a(L(s)),
          }
        );
      }),
    remove: (n) =>
      new Promise((a, s) => {
        e.actions.vaultRemove(
          {
            vaultKey: t,
            key: n,
          },
          {
            onSuccess: a,
            onError: (i) => s(L(i)),
          }
        );
      }),
    keys: () =>
      new Promise((n, a) => {
        e.actions.vaultKeys(
          {
            vaultKey: t,
          },
          {
            onSuccess: n,
            onError: (s) => a(L(s)),
          }
        );
      }),
    observe: (n, a, s = () => {}) =>
      new Promise((i, o) => {
        e.actions.vaultObserve(
          {
            vaultKey: t,
            key: n,
          },
          {
            onSuccess: (u) => {
              i(), a(u);
            },
            onError: (u) => {
              const c = L(u);
              o(c), s(c);
            },
          }
        );
      }),
  }),
  Im = (t, e, r) =>
    new Promise((n, a) => {
      r.actions.vaultInitialize(
        { vaultKey: t, scope: e },
        {
          onSuccess: () => {
            n(Pm(t, r));
          },
          onError: (s) => a(L(s)),
        }
      );
    }),
  Nm = (t) => ({
    initialize: (e, r) => Im(e, r, t),
    errorTypes: We,
  }),
  Qt = {
    Error: "Failed to perform wishlist action",
    Auth: "User must be logged in for wishlist actions",
    NoWishlistIntegrationConfigured:
      "A wishlist integration must be configured",
    InvalidName: "Wishlist name must be 3 characters long",
    WishlistDoesNotExist: "Wishlist does not exist",
    WishlistItemDoesNotExist: "Item does not exist",
  },
  Rm = (t) => Qt[t] || Qt.Error,
  ce = (t, e) =>
    new Promise((r, n) => {
      t(e, {
        onSuccess: r,
        onError: (a) => n(Rm(a)),
      });
    }),
  Mm = (t) => {
    const {
      wishlistCreate: e,
      wishlistItemAdd: r,
      wishlistItemRemove: n,
      wishlistsGet: a,
    } = t.actions;
    return {
      createWishlist: (s) => ce(e, { name: s }),
      addItemToWishlist: (s, i, o) =>
        ce(r, { productId: s, variantId: i, wishlistId: o }),
      removeItemFromWishlist: (s, i, o) =>
        ce(n, { productId: s, variantId: i, wishlistId: o }),
      getWishlists: () => ce(a, null),
    };
  },
  er = {
    Error: "Failed to perform authentication action",
  },
  jm = (t) => er[t] || er.Error,
  Um = (t, e) =>
    new Promise((r, n) => {
      t(e, {
        onSuccess: r,
        onError: (a) => n(jm(a)),
      });
    }),
  Lm = (t) => {
    const { authenticationOpen: e } = t.actions;
    return {
      openAuthentication: (r) => Um(e, { action: r }),
    };
  },
  qm = (t, e) =>
    new Promise((r, n) => {
      t(e, {
        onSuccess: r,
        onError: (a) => n(a),
      });
    }),
  zm = (t) => {
    const { trackAnalyticEvent: e } = t.actions;
    return {
      trackAnalyticEvent: (r, n) =>
        qm(e, { analyticEvent: r, analyticProperties: n }),
    };
  },
  km = () => {
    var r, n, a, s;
    if (typeof window !== "undefined") {
      const t = new CustomEvent("webbridge-ready");
      window.dispatchEvent(t);

      const e = JSON.stringify({
        type: "action",
        name: "webbridge/ready",
      });
      (r = window.CustomBlockJavascriptInterface) == null || r.postMessage(e),
        (s =
          (a = (n = window.webkit) == null ? void 0 : n.messageHandlers) == null
            ? void 0
            : a.Tapcart) == null || s.postMessage(e);
    }
  },
  loadWebbridge = () => {
    if (typeof window !== "undefined" && window.Tapcart) return window.Tapcart;
    const t = Fm(),
      e = wm(t.sendMessage),
      r = mn(),
      n = Em({
        setVariables: r.setVariables,
      }),
      a = async (i) => {
        t.init(i.platform, i.messageHandlerName), r.setVariables(i.variables);
        if (typeof window !== "undefined") {
          window.Tapcart.isInitialized = !0;
        }
      },
      s = {
        addToCart: e.actions.addToCart,
        applyDiscount: e.actions.applyDiscount,
        applyGiftCard: e.actions.applyGiftCard,
        getCustomerIdentity: e.actions.getCustomerIdentity,
        openCart: e.actions.openCart,
        openCollection: e.actions.openCollection,
        openProduct: e.actions.openProduct,
        openScreen: e.actions.openScreen,
        removeDiscounts: e.actions.removeDiscounts,
        removeFromCart: e.actions.removeFromCart,
        scrollToBlockBottom: e.actions.scrollToBlockBottom,
        scrollToBlockTop: e.actions.scrollToBlockTop,
        showToast: e.actions.showToast,
        updateCartAttributes: e.actions.updateCartAttributes,
        updateCartNote: e.actions.updateCartNote,
        vault: Nm(e),
        ...Mm(e),
        ...Lm(e),
        ...zm(e),
        action: e.action,
      };
    const tc = {
      mobile: {
        respond: e.respond,
        notify: n.notify,
        load: a,
      },
      registerEventHandler: n.registerEventHandler,
      actions: s,
      get variables() {
        return r.variables;
      },
      isInitialized: !1,
      action: e.action,
    };
    km();
    if (typeof window !== "undefined") {
      window.Tapcart = tc;
    }
    return tc;
  },
  Gm = () => ({
    device: null,
    product: null,
    cart: null,
    customer: null,
    isInitialized: !1,
  }),
  it = createContext(null),
  ot = createContext(null);
function Hm(t, e) {
  switch (e.type) {
    case "set-device":
      return {
        ...t,
        device: {
          ...e.payload,
        },
      };
    case "set-cart":
      return {
        ...t,
        cart: {
          ...e.payload,
        },
      };
    case "set-product":
      return {
        ...t,
        product: {
          ...e.payload,
        },
      };
    case "set-customer":
      return {
        ...t,
        customer: {
          ...e.payload,
        },
      };
    case "set-variables":
      return {
        ...t,
        ...e.payload,
      };
    case "initialize":
      return {
        ...e.payload,
        isInitialized: !0,
      };
    default:
      throw new Error(`Unknown action: ${e.type}`);
  }
}
function WebbridgeProvider({ webbridgeClient, children: e }) {
  const [state, dispatch] = useReducer(Hm, Gm());
  return (
    useEffect(() => {
      if (
        (webbridgeClient.registerEventHandler("cart/updated", (a) => {
          dispatch({ type: "set-cart", payload: a == null ? void 0 : a.cart });
        }),
        webbridgeClient.registerEventHandler("product/updated", (a) => {
          dispatch({ type: "set-product", payload: a == null ? void 0 : a.product });
        }),
        webbridgeClient.registerEventHandler("customer/updated", (a) => {
          dispatch({ type: "set-customer", payload: a == null ? void 0 : a.customer });
        }),
        webbridgeClient.registerEventHandler("variables/updated", (a) => {
          dispatch({ type: "set-variables", payload: a });
        }),
        webbridgeClient.isInitialized)
      )
        dispatch({ type: "initialize", payload: webbridgeClient.variables });
      else {
        const a = webbridgeClient.mobile.load;
        webbridgeClient.mobile.load = (s) => {
          a(s), dispatch({ type: "initialize", payload: s.variables });
        };
      }
    }, [webbridgeClient]),
    /* @__PURE__ */ react.createElement(
      it.Provider,
      { value: state },
      /* @__PURE__ */ react.createElement(ot.Provider, { value: webbridgeClient.actions }, e)
    )
  );
}
const useActions = () => ({
    ...useContext(ot),
  }),
  useVariables = () => useContext(it),
  useTapcart = () => {
    const t = useContext(ot),
      e = useContext(it);
    return {
      action: t.action,
      actions: {
        ...t,
      },
      variables: e,
    };
  };
export {
  WebbridgeProvider,
  loadWebbridge,
  useActions,
  useTapcart,
  useVariables,
};
