// Build: 2024/2/24 16:27:27
(() => {
  // lib/time-polyfill.js
  console.time = function(label) {
    this._times = this._times || {};
    this._times[label] = Date.now();
  };
  console.timeEnd = function(label) {
    if (this._times && this._times[label]) {
      let timeElapsed = Date.now() - this._times[label];
      console.log(`${label}: ${timeElapsed}ms`);
      delete this._times[label];
    } else {
      console.log(`Timer with label ${label} does not exist.`);
    }
  };

  // lib/text-polyfill.js
  function textPolyfill(r) {
    "use strict";
    function x() {
    }
    function y2() {
    }
    var z = String.fromCharCode, v = {}.toString, A = v.call(r.SharedArrayBuffer), B = v(), q = r.Uint8Array, t = q || Array, w = q ? ArrayBuffer : t, C = w.isView || function(g2) {
      return g2 && "length" in g2;
    }, D = v.call(w.prototype);
    w = y2.prototype;
    var E = r.TextEncoder, a2 = new (q ? Uint16Array : t)(32);
    x.prototype.decode = function(g2) {
      if (!C(g2)) {
        var l = v.call(g2);
        if (l !== D && l !== A && l !== B)
          throw TypeError(
            "Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'"
          );
        g2 = q ? new t(g2) : g2 || [];
      }
      for (var f = l = "", b = 0, c2 = g2.length | 0, u2 = c2 - 32 | 0, e, d, h = 0, p = 0, m, k = 0, n = -1; b < c2; ) {
        for (e = b <= u2 ? 32 : c2 - b | 0; k < e; b = b + 1 | 0, k = k + 1 | 0) {
          d = g2[b] & 255;
          switch (d >> 4) {
            case 15:
              m = g2[b = b + 1 | 0] & 255;
              if (2 !== m >> 6 || 247 < d) {
                b = b - 1 | 0;
                break;
              }
              h = (d & 7) << 6 | m & 63;
              p = 5;
              d = 256;
            case 14:
              m = g2[b = b + 1 | 0] & 255, h <<= 6, h |= (d & 15) << 6 | m & 63, p = 2 === m >> 6 ? p + 4 | 0 : 24, d = d + 256 & 768;
            case 13:
            case 12:
              m = g2[b = b + 1 | 0] & 255, h <<= 6, h |= (d & 31) << 6 | m & 63, p = p + 7 | 0, b < c2 && 2 === m >> 6 && h >> p && 1114112 > h ? (d = h, h = h - 65536 | 0, 0 <= h && (n = (h >> 10) + 55296 | 0, d = (h & 1023) + 56320 | 0, 31 > k ? (a2[k] = n, k = k + 1 | 0, n = -1) : (m = n, n = d, d = m))) : (d >>= 8, b = b - d - 1 | 0, d = 65533), h = p = 0, e = b <= u2 ? 32 : c2 - b | 0;
            default:
              a2[k] = d;
              continue;
            case 11:
            case 10:
            case 9:
            case 8:
          }
          a2[k] = 65533;
        }
        f += z(
          a2[0],
          a2[1],
          a2[2],
          a2[3],
          a2[4],
          a2[5],
          a2[6],
          a2[7],
          a2[8],
          a2[9],
          a2[10],
          a2[11],
          a2[12],
          a2[13],
          a2[14],
          a2[15],
          a2[16],
          a2[17],
          a2[18],
          a2[19],
          a2[20],
          a2[21],
          a2[22],
          a2[23],
          a2[24],
          a2[25],
          a2[26],
          a2[27],
          a2[28],
          a2[29],
          a2[30],
          a2[31]
        );
        32 > k && (f = f.slice(0, k - 32 | 0));
        if (b < c2) {
          if (a2[0] = n, k = ~n >>> 31, n = -1, f.length < l.length)
            continue;
        } else
          -1 !== n && (f += z(n));
        l += f;
        f = "";
      }
      return l;
    };
    w.encode = function(g2) {
      g2 = void 0 === g2 ? "" : "" + g2;
      var l = g2.length | 0, f = new t((l << 1) + 8 | 0), b, c2 = 0, u2 = !q;
      for (b = 0; b < l; b = b + 1 | 0, c2 = c2 + 1 | 0) {
        var e = g2.charCodeAt(b) | 0;
        if (127 >= e)
          f[c2] = e;
        else {
          if (2047 >= e)
            f[c2] = 192 | e >> 6;
          else {
            a: {
              if (55296 <= e)
                if (56319 >= e) {
                  var d = g2.charCodeAt(b = b + 1 | 0) | 0;
                  if (56320 <= d && 57343 >= d) {
                    e = (e << 10) + d - 56613888 | 0;
                    if (65535 < e) {
                      f[c2] = 240 | e >> 18;
                      f[c2 = c2 + 1 | 0] = 128 | e >> 12 & 63;
                      f[c2 = c2 + 1 | 0] = 128 | e >> 6 & 63;
                      f[c2 = c2 + 1 | 0] = 128 | e & 63;
                      continue;
                    }
                    break a;
                  }
                  e = 65533;
                } else
                  57343 >= e && (e = 65533);
              !u2 && b << 1 < c2 && b << 1 < (c2 - 7 | 0) && (u2 = true, d = new t(3 * l), d.set(f), f = d);
            }
            f[c2] = 224 | e >> 12;
            f[c2 = c2 + 1 | 0] = 128 | e >> 6 & 63;
          }
          f[c2 = c2 + 1 | 0] = 128 | e & 63;
        }
      }
      return q ? f.subarray(0, c2) : f.slice(0, c2);
    };
    r.TextDecoder = x;
    r.TextEncoder = y2;
  }
  var ___ = textPolyfill(globalThis);

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
      b[i] = start += 1 << eb[i - 1];
    }
    var r = new i32(b[30]);
    for (var i = 1; i < 30; ++i) {
      for (var j = b[i]; j < b[i + 1]; ++j) {
        r[j] = j - b[i] << 5 | i;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = function(cd, mb, r) {
    var s = cd.length;
    var i = 0;
    var l = new u16(mb);
    for (; i < s; ++i) {
      if (cd[i])
        ++l[cd[i] - 1];
    }
    var le = new u16(mb);
    for (i = 1; i < mb; ++i) {
      le[i] = le[i - 1] + l[i - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          var sv = i << 4 | cd[i];
          var r_1 = mb - cd[i];
          var v = le[cd[i] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
        }
      }
    }
    return co;
  };
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a2) {
    var m = a2[0];
    for (var i = 1; i < a2.length; ++i) {
      if (a2[i] > m)
        m = a2[i];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o2 = p / 8 | 0;
    return (d[o2] | d[o2 + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o2 = p / 8 | 0;
    return (d[o2] | d[o2 + 1] << 8 | d[o2 + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    var n = new u8(e - s);
    n.set(v.subarray(s, e));
    return n;
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf || st.i != 2;
    var noSt = st.i;
    if (!buf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i = 0; i < hcLen; ++i) {
            clt[clim[i]] = bits(dat, pos + i * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i = 0; i < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i++] = s;
            } else {
              var c2 = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i++] = c2;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (noBuf)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c2 = lm[bits16(dat, pos) & lms], sym = c2 >> 4;
        pos += c2 & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c2)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i = sym - 257, b = fleb[i];
            add = bits(dat, pos, (1 << b) - 1) + fl[i];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (noBuf)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; bt += 4) {
            buf[bt] = buf[bt - dt];
            buf[bt + 1] = buf[bt + 1 - dt];
            buf[bt + 2] = buf[bt + 2 - dt];
            buf[bt + 3] = buf[bt + 3 - dt];
          }
          bt = end;
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
      err(6, "invalid gzip data");
    var flg = d[3];
    var st = 10;
    if (flg & 4)
      st += (d[10] | d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
      ;
    return st + (flg & 2);
  };
  var gzl = function(d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
  };
  function gunzipSync(data, opts) {
    var st = gzs(data);
    if (st + 8 > data.length)
      err(6, "invalid gzip data");
    return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/json-typings.js
  function typeofJsonValue(value) {
    let t = typeof value;
    if (t == "object") {
      if (Array.isArray(value))
        return "array";
      if (value === null)
        return "null";
    }
    return t;
  }
  function isJsonObject(value) {
    return value !== null && typeof value == "object" && !Array.isArray(value);
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/base64.js
  var encTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  var decTable = [];
  for (let i = 0; i < encTable.length; i++)
    decTable[encTable[i].charCodeAt(0)] = i;
  decTable["-".charCodeAt(0)] = encTable.indexOf("+");
  decTable["_".charCodeAt(0)] = encTable.indexOf("/");
  function base64decode(base64Str) {
    let es = base64Str.length * 3 / 4;
    if (base64Str[base64Str.length - 2] == "=")
      es -= 2;
    else if (base64Str[base64Str.length - 1] == "=")
      es -= 1;
    let bytes = new Uint8Array(es), bytePos = 0, groupPos = 0, b, p = 0;
    for (let i = 0; i < base64Str.length; i++) {
      b = decTable[base64Str.charCodeAt(i)];
      if (b === void 0) {
        switch (base64Str[i]) {
          case "=":
            groupPos = 0;
          case "\n":
          case "\r":
          case "	":
          case " ":
            continue;
          default:
            throw Error(`invalid base64 string.`);
        }
      }
      switch (groupPos) {
        case 0:
          p = b;
          groupPos = 1;
          break;
        case 1:
          bytes[bytePos++] = p << 2 | (b & 48) >> 4;
          p = b;
          groupPos = 2;
          break;
        case 2:
          bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
          p = b;
          groupPos = 3;
          break;
        case 3:
          bytes[bytePos++] = (p & 3) << 6 | b;
          groupPos = 0;
          break;
      }
    }
    if (groupPos == 1)
      throw Error(`invalid base64 string.`);
    return bytes.subarray(0, bytePos);
  }
  function base64encode(bytes) {
    let base64 = "", groupPos = 0, b, p = 0;
    for (let i = 0; i < bytes.length; i++) {
      b = bytes[i];
      switch (groupPos) {
        case 0:
          base64 += encTable[b >> 2];
          p = (b & 3) << 4;
          groupPos = 1;
          break;
        case 1:
          base64 += encTable[p | b >> 4];
          p = (b & 15) << 2;
          groupPos = 2;
          break;
        case 2:
          base64 += encTable[p | b >> 6];
          base64 += encTable[b & 63];
          groupPos = 0;
          break;
      }
    }
    if (groupPos) {
      base64 += encTable[p];
      base64 += "=";
      if (groupPos == 1)
        base64 += "=";
    }
    return base64;
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/binary-format-contract.js
  var UnknownFieldHandler;
  (function(UnknownFieldHandler2) {
    UnknownFieldHandler2.symbol = Symbol.for("protobuf-ts/unknown");
    UnknownFieldHandler2.onRead = (typeName, message, fieldNo, wireType, data) => {
      let container = is(message) ? message[UnknownFieldHandler2.symbol] : message[UnknownFieldHandler2.symbol] = [];
      container.push({ no: fieldNo, wireType, data });
    };
    UnknownFieldHandler2.onWrite = (typeName, message, writer) => {
      for (let { no, wireType, data } of UnknownFieldHandler2.list(message))
        writer.tag(no, wireType).raw(data);
    };
    UnknownFieldHandler2.list = (message, fieldNo) => {
      if (is(message)) {
        let all = message[UnknownFieldHandler2.symbol];
        return fieldNo ? all.filter((uf) => uf.no == fieldNo) : all;
      }
      return [];
    };
    UnknownFieldHandler2.last = (message, fieldNo) => UnknownFieldHandler2.list(message, fieldNo).slice(-1)[0];
    const is = (message) => message && Array.isArray(message[UnknownFieldHandler2.symbol]);
  })(UnknownFieldHandler || (UnknownFieldHandler = {}));
  var WireType;
  (function(WireType2) {
    WireType2[WireType2["Varint"] = 0] = "Varint";
    WireType2[WireType2["Bit64"] = 1] = "Bit64";
    WireType2[WireType2["LengthDelimited"] = 2] = "LengthDelimited";
    WireType2[WireType2["StartGroup"] = 3] = "StartGroup";
    WireType2[WireType2["EndGroup"] = 4] = "EndGroup";
    WireType2[WireType2["Bit32"] = 5] = "Bit32";
  })(WireType || (WireType = {}));

  // node_modules/@protobuf-ts/runtime/build/es2015/goog-varint.js
  function varint64read() {
    let lowBits = 0;
    let highBits = 0;
    for (let shift = 0; shift < 28; shift += 7) {
      let b = this.buf[this.pos++];
      lowBits |= (b & 127) << shift;
      if ((b & 128) == 0) {
        this.assertBounds();
        return [lowBits, highBits];
      }
    }
    let middleByte = this.buf[this.pos++];
    lowBits |= (middleByte & 15) << 28;
    highBits = (middleByte & 112) >> 4;
    if ((middleByte & 128) == 0) {
      this.assertBounds();
      return [lowBits, highBits];
    }
    for (let shift = 3; shift <= 31; shift += 7) {
      let b = this.buf[this.pos++];
      highBits |= (b & 127) << shift;
      if ((b & 128) == 0) {
        this.assertBounds();
        return [lowBits, highBits];
      }
    }
    throw new Error("invalid varint");
  }
  function varint64write(lo, hi, bytes) {
    for (let i = 0; i < 28; i = i + 7) {
      const shift = lo >>> i;
      const hasNext = !(shift >>> 7 == 0 && hi == 0);
      const byte = (hasNext ? shift | 128 : shift) & 255;
      bytes.push(byte);
      if (!hasNext) {
        return;
      }
    }
    const splitBits = lo >>> 28 & 15 | (hi & 7) << 4;
    const hasMoreBits = !(hi >> 3 == 0);
    bytes.push((hasMoreBits ? splitBits | 128 : splitBits) & 255);
    if (!hasMoreBits) {
      return;
    }
    for (let i = 3; i < 31; i = i + 7) {
      const shift = hi >>> i;
      const hasNext = !(shift >>> 7 == 0);
      const byte = (hasNext ? shift | 128 : shift) & 255;
      bytes.push(byte);
      if (!hasNext) {
        return;
      }
    }
    bytes.push(hi >>> 31 & 1);
  }
  var TWO_PWR_32_DBL = (1 << 16) * (1 << 16);
  function int64fromString(dec) {
    let minus = dec[0] == "-";
    if (minus)
      dec = dec.slice(1);
    const base = 1e6;
    let lowBits = 0;
    let highBits = 0;
    function add1e6digit(begin, end) {
      const digit1e6 = Number(dec.slice(begin, end));
      highBits *= base;
      lowBits = lowBits * base + digit1e6;
      if (lowBits >= TWO_PWR_32_DBL) {
        highBits = highBits + (lowBits / TWO_PWR_32_DBL | 0);
        lowBits = lowBits % TWO_PWR_32_DBL;
      }
    }
    add1e6digit(-24, -18);
    add1e6digit(-18, -12);
    add1e6digit(-12, -6);
    add1e6digit(-6);
    return [minus, lowBits, highBits];
  }
  function int64toString(bitsLow, bitsHigh) {
    if (bitsHigh <= 2097151) {
      return "" + (TWO_PWR_32_DBL * bitsHigh + (bitsLow >>> 0));
    }
    let low = bitsLow & 16777215;
    let mid = (bitsLow >>> 24 | bitsHigh << 8) >>> 0 & 16777215;
    let high = bitsHigh >> 16 & 65535;
    let digitA = low + mid * 6777216 + high * 6710656;
    let digitB = mid + high * 8147497;
    let digitC = high * 2;
    let base = 1e7;
    if (digitA >= base) {
      digitB += Math.floor(digitA / base);
      digitA %= base;
    }
    if (digitB >= base) {
      digitC += Math.floor(digitB / base);
      digitB %= base;
    }
    function decimalFrom1e7(digit1e7, needLeadingZeros) {
      let partial = digit1e7 ? String(digit1e7) : "";
      if (needLeadingZeros) {
        return "0000000".slice(partial.length) + partial;
      }
      return partial;
    }
    return decimalFrom1e7(
      digitC,
      /*needLeadingZeros=*/
      0
    ) + decimalFrom1e7(
      digitB,
      /*needLeadingZeros=*/
      digitC
    ) + // If the final 1e7 digit didn't need leading zeros, we would have
    // returned via the trivial code path at the top.
    decimalFrom1e7(
      digitA,
      /*needLeadingZeros=*/
      1
    );
  }
  function varint32write(value, bytes) {
    if (value >= 0) {
      while (value > 127) {
        bytes.push(value & 127 | 128);
        value = value >>> 7;
      }
      bytes.push(value);
    } else {
      for (let i = 0; i < 9; i++) {
        bytes.push(value & 127 | 128);
        value = value >> 7;
      }
      bytes.push(1);
    }
  }
  function varint32read() {
    let b = this.buf[this.pos++];
    let result = b & 127;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 7;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 14;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 127) << 21;
    if ((b & 128) == 0) {
      this.assertBounds();
      return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 15) << 28;
    for (let readBytes = 5; (b & 128) !== 0 && readBytes < 10; readBytes++)
      b = this.buf[this.pos++];
    if ((b & 128) != 0)
      throw new Error("invalid varint");
    this.assertBounds();
    return result >>> 0;
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/pb-long.js
  function detectBi() {
    const dv = new DataView(new ArrayBuffer(8));
    const ok = globalThis.BigInt !== void 0 && typeof dv.getBigInt64 === "function" && typeof dv.getBigUint64 === "function" && typeof dv.setBigInt64 === "function" && typeof dv.setBigUint64 === "function";
    return ok ? {
      MIN: BigInt("-9223372036854775808"),
      MAX: BigInt("9223372036854775807"),
      UMIN: BigInt("0"),
      UMAX: BigInt("18446744073709551615"),
      C: BigInt,
      V: dv
    } : void 0;
  }
  var BI = detectBi();
  function assertBi(bi) {
    if (!bi)
      throw new Error("BigInt unavailable, see https://github.com/timostamm/protobuf-ts/blob/v1.0.8/MANUAL.md#bigint-support");
  }
  var RE_DECIMAL_STR = /^-?[0-9]+$/;
  var TWO_PWR_32_DBL2 = (1 << 16) * (1 << 16);
  var SharedPbLong = class {
    /**
     * Create a new instance with the given bits.
     */
    constructor(lo, hi) {
      this.lo = lo | 0;
      this.hi = hi | 0;
    }
    /**
     * Is this instance equal to 0?
     */
    isZero() {
      return this.lo == 0 && this.hi == 0;
    }
    /**
     * Convert to a native number.
     */
    toNumber() {
      let result = this.hi * TWO_PWR_32_DBL2 + (this.lo >>> 0);
      if (!Number.isSafeInteger(result))
        throw new Error("cannot convert to safe number");
      return result;
    }
  };
  var PbULong = class extends SharedPbLong {
    /**
     * Create instance from a `string`, `number` or `bigint`.
     */
    static from(value) {
      if (BI)
        switch (typeof value) {
          case "string":
            if (value == "0")
              return this.ZERO;
            if (value == "")
              throw new Error("string is no integer");
            value = BI.C(value);
          case "number":
            if (value === 0)
              return this.ZERO;
            value = BI.C(value);
          case "bigint":
            if (!value)
              return this.ZERO;
            if (value < BI.UMIN)
              throw new Error("signed value for ulong");
            if (value > BI.UMAX)
              throw new Error("ulong too large");
            BI.V.setBigUint64(0, value, true);
            return new PbULong(BI.V.getInt32(0, true), BI.V.getInt32(4, true));
        }
      else
        switch (typeof value) {
          case "string":
            if (value == "0")
              return this.ZERO;
            value = value.trim();
            if (!RE_DECIMAL_STR.test(value))
              throw new Error("string is no integer");
            let [minus, lo, hi] = int64fromString(value);
            if (minus)
              throw new Error("signed value");
            return new PbULong(lo, hi);
          case "number":
            if (value == 0)
              return this.ZERO;
            if (!Number.isSafeInteger(value))
              throw new Error("number is no integer");
            if (value < 0)
              throw new Error("signed value for ulong");
            return new PbULong(value, value / TWO_PWR_32_DBL2);
        }
      throw new Error("unknown value " + typeof value);
    }
    /**
     * Convert to decimal string.
     */
    toString() {
      return BI ? this.toBigInt().toString() : int64toString(this.lo, this.hi);
    }
    /**
     * Convert to native bigint.
     */
    toBigInt() {
      assertBi(BI);
      BI.V.setInt32(0, this.lo, true);
      BI.V.setInt32(4, this.hi, true);
      return BI.V.getBigUint64(0, true);
    }
  };
  PbULong.ZERO = new PbULong(0, 0);
  var PbLong = class extends SharedPbLong {
    /**
     * Create instance from a `string`, `number` or `bigint`.
     */
    static from(value) {
      if (BI)
        switch (typeof value) {
          case "string":
            if (value == "0")
              return this.ZERO;
            if (value == "")
              throw new Error("string is no integer");
            value = BI.C(value);
          case "number":
            if (value === 0)
              return this.ZERO;
            value = BI.C(value);
          case "bigint":
            if (!value)
              return this.ZERO;
            if (value < BI.MIN)
              throw new Error("ulong too small");
            if (value > BI.MAX)
              throw new Error("ulong too large");
            BI.V.setBigInt64(0, value, true);
            return new PbLong(BI.V.getInt32(0, true), BI.V.getInt32(4, true));
        }
      else
        switch (typeof value) {
          case "string":
            if (value == "0")
              return this.ZERO;
            value = value.trim();
            if (!RE_DECIMAL_STR.test(value))
              throw new Error("string is no integer");
            let [minus, lo, hi] = int64fromString(value);
            let pbl = new PbLong(lo, hi);
            return minus ? pbl.negate() : pbl;
          case "number":
            if (value == 0)
              return this.ZERO;
            if (!Number.isSafeInteger(value))
              throw new Error("number is no integer");
            return value > 0 ? new PbLong(value, value / TWO_PWR_32_DBL2) : new PbLong(-value, -value / TWO_PWR_32_DBL2).negate();
        }
      throw new Error("unknown value " + typeof value);
    }
    /**
     * Do we have a minus sign?
     */
    isNegative() {
      return (this.hi & 2147483648) !== 0;
    }
    /**
     * Negate two's complement.
     * Invert all the bits and add one to the result.
     */
    negate() {
      let hi = ~this.hi, lo = this.lo;
      if (lo)
        lo = ~lo + 1;
      else
        hi += 1;
      return new PbLong(lo, hi);
    }
    /**
     * Convert to decimal string.
     */
    toString() {
      if (BI)
        return this.toBigInt().toString();
      if (this.isNegative()) {
        let n = this.negate();
        return "-" + int64toString(n.lo, n.hi);
      }
      return int64toString(this.lo, this.hi);
    }
    /**
     * Convert to native bigint.
     */
    toBigInt() {
      assertBi(BI);
      BI.V.setInt32(0, this.lo, true);
      BI.V.setInt32(4, this.hi, true);
      return BI.V.getBigInt64(0, true);
    }
  };
  PbLong.ZERO = new PbLong(0, 0);

  // node_modules/@protobuf-ts/runtime/build/es2015/binary-reader.js
  var defaultsRead = {
    readUnknownField: true,
    readerFactory: (bytes) => new BinaryReader(bytes)
  };
  function binaryReadOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsRead), options) : defaultsRead;
  }
  var BinaryReader = class {
    constructor(buf, textDecoder) {
      console.log(typeof buf)
      console.log(buf instanceof Uint8Array)
      this.varint64 = varint64read;
      this.uint32 = varint32read;
      this.buf = buf;
      this.len = buf.length;
      this.pos = 0;
      this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
      this.textDecoder = textDecoder !== null && textDecoder !== void 0 ? textDecoder : new TextDecoder("utf-8", {
        fatal: true,
        ignoreBOM: true
      });
    }
    /**
     * Reads a tag - field number and wire type.
     */
    tag() {
      let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
      if (fieldNo <= 0 || wireType < 0 || wireType > 5)
        throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
      return [fieldNo, wireType];
    }
    /**
     * Skip one element on the wire and return the skipped data.
     * Supports WireType.StartGroup since v2.0.0-alpha.23.
     */
    skip(wireType) {
      let start = this.pos;
      switch (wireType) {
        case WireType.Varint:
          while (this.buf[this.pos++] & 128) {
          }
          break;
        case WireType.Bit64:
          this.pos += 4;
        case WireType.Bit32:
          this.pos += 4;
          break;
        case WireType.LengthDelimited:
          let len = this.uint32();
          this.pos += len;
          break;
        case WireType.StartGroup:
          let t;
          while ((t = this.tag()[1]) !== WireType.EndGroup) {
            this.skip(t);
          }
          break;
        default:
          throw new Error("cant skip wire type " + wireType);
      }
      this.assertBounds();
      return this.buf.subarray(start, this.pos);
    }
    /**
     * Throws error if position in byte array is out of range.
     */
    assertBounds() {
      if (this.pos > this.len)
        throw new RangeError("premature EOF");
    }
    /**
     * Read a `int32` field, a signed 32 bit varint.
     */
    int32() {
      return this.uint32() | 0;
    }
    /**
     * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
     */
    sint32() {
      let zze = this.uint32();
      return zze >>> 1 ^ -(zze & 1);
    }
    /**
     * Read a `int64` field, a signed 64-bit varint.
     */
    int64() {
      return new PbLong(...this.varint64());
    }
    /**
     * Read a `uint64` field, an unsigned 64-bit varint.
     */
    uint64() {
      return new PbULong(...this.varint64());
    }
    /**
     * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64() {
      let [lo, hi] = this.varint64();
      let s = -(lo & 1);
      lo = (lo >>> 1 | (hi & 1) << 31) ^ s;
      hi = hi >>> 1 ^ s;
      return new PbLong(lo, hi);
    }
    /**
     * Read a `bool` field, a variant.
     */
    bool() {
      let [lo, hi] = this.varint64();
      return lo !== 0 || hi !== 0;
    }
    /**
     * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
     */
    fixed32() {
      return this.view.getUint32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
     */
    sfixed32() {
      return this.view.getInt32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
     */
    fixed64() {
      return new PbULong(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
     */
    sfixed64() {
      return new PbLong(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `float` field, 32-bit floating point number.
     */
    float() {
      return this.view.getFloat32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `double` field, a 64-bit floating point number.
     */
    double() {
      return this.view.getFloat64((this.pos += 8) - 8, true);
    }
    /**
     * Read a `bytes` field, length-delimited arbitrary data.
     */
    bytes() {
      let len = this.uint32();
      let start = this.pos;
      this.pos += len;
      this.assertBounds();
      return this.buf.subarray(start, start + len);
    }
    /**
     * Read a `string` field, length-delimited data converted to UTF-8 text.
     */
    string() {
      return this.textDecoder.decode(this.bytes());
    }
  };

  // node_modules/@protobuf-ts/runtime/build/es2015/assert.js
  function assert(condition, msg) {
    if (!condition) {
      throw new Error(msg);
    }
  }
  var FLOAT32_MAX = 34028234663852886e22;
  var FLOAT32_MIN = -34028234663852886e22;
  var UINT32_MAX = 4294967295;
  var INT32_MAX = 2147483647;
  var INT32_MIN = -2147483648;
  function assertInt32(arg) {
    if (typeof arg !== "number")
      throw new Error("invalid int 32: " + typeof arg);
    if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
      throw new Error("invalid int 32: " + arg);
  }
  function assertUInt32(arg) {
    if (typeof arg !== "number")
      throw new Error("invalid uint 32: " + typeof arg);
    if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
      throw new Error("invalid uint 32: " + arg);
  }
  function assertFloat32(arg) {
    if (typeof arg !== "number")
      throw new Error("invalid float 32: " + typeof arg);
    if (!Number.isFinite(arg))
      return;
    if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
      throw new Error("invalid float 32: " + arg);
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/binary-writer.js
  var defaultsWrite = {
    writeUnknownFields: true,
    writerFactory: () => new BinaryWriter()
  };
  function binaryWriteOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsWrite), options) : defaultsWrite;
  }
  var BinaryWriter = class {
    constructor(textEncoder) {
      this.stack = [];
      this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
      this.chunks = [];
      this.buf = [];
    }
    /**
     * Return all bytes written and reset this writer.
     */
    finish() {
      this.chunks.push(new Uint8Array(this.buf));
      let len = 0;
      for (let i = 0; i < this.chunks.length; i++)
        len += this.chunks[i].length;
      let bytes = new Uint8Array(len);
      let offset = 0;
      for (let i = 0; i < this.chunks.length; i++) {
        bytes.set(this.chunks[i], offset);
        offset += this.chunks[i].length;
      }
      this.chunks = [];
      return bytes;
    }
    /**
     * Start a new fork for length-delimited data like a message
     * or a packed repeated field.
     *
     * Must be joined later with `join()`.
     */
    fork() {
      this.stack.push({ chunks: this.chunks, buf: this.buf });
      this.chunks = [];
      this.buf = [];
      return this;
    }
    /**
     * Join the last fork. Write its length and bytes, then
     * return to the previous state.
     */
    join() {
      let chunk = this.finish();
      let prev = this.stack.pop();
      if (!prev)
        throw new Error("invalid state, fork stack empty");
      this.chunks = prev.chunks;
      this.buf = prev.buf;
      this.uint32(chunk.byteLength);
      return this.raw(chunk);
    }
    /**
     * Writes a tag (field number and wire type).
     *
     * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
     *
     * Generated code should compute the tag ahead of time and call `uint32()`.
     */
    tag(fieldNo, type) {
      return this.uint32((fieldNo << 3 | type) >>> 0);
    }
    /**
     * Write a chunk of raw bytes.
     */
    raw(chunk) {
      if (this.buf.length) {
        this.chunks.push(new Uint8Array(this.buf));
        this.buf = [];
      }
      this.chunks.push(chunk);
      return this;
    }
    /**
     * Write a `uint32` value, an unsigned 32 bit varint.
     */
    uint32(value) {
      assertUInt32(value);
      while (value > 127) {
        this.buf.push(value & 127 | 128);
        value = value >>> 7;
      }
      this.buf.push(value);
      return this;
    }
    /**
     * Write a `int32` value, a signed 32 bit varint.
     */
    int32(value) {
      assertInt32(value);
      varint32write(value, this.buf);
      return this;
    }
    /**
     * Write a `bool` value, a variant.
     */
    bool(value) {
      this.buf.push(value ? 1 : 0);
      return this;
    }
    /**
     * Write a `bytes` value, length-delimited arbitrary data.
     */
    bytes(value) {
      this.uint32(value.byteLength);
      return this.raw(value);
    }
    /**
     * Write a `string` value, length-delimited data converted to UTF-8 text.
     */
    string(value) {
      let chunk = this.textEncoder.encode(value);
      this.uint32(chunk.byteLength);
      return this.raw(chunk);
    }
    /**
     * Write a `float` value, 32-bit floating point number.
     */
    float(value) {
      assertFloat32(value);
      let chunk = new Uint8Array(4);
      new DataView(chunk.buffer).setFloat32(0, value, true);
      return this.raw(chunk);
    }
    /**
     * Write a `double` value, a 64-bit floating point number.
     */
    double(value) {
      let chunk = new Uint8Array(8);
      new DataView(chunk.buffer).setFloat64(0, value, true);
      return this.raw(chunk);
    }
    /**
     * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
     */
    fixed32(value) {
      assertUInt32(value);
      let chunk = new Uint8Array(4);
      new DataView(chunk.buffer).setUint32(0, value, true);
      return this.raw(chunk);
    }
    /**
     * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
     */
    sfixed32(value) {
      assertInt32(value);
      let chunk = new Uint8Array(4);
      new DataView(chunk.buffer).setInt32(0, value, true);
      return this.raw(chunk);
    }
    /**
     * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
     */
    sint32(value) {
      assertInt32(value);
      value = (value << 1 ^ value >> 31) >>> 0;
      varint32write(value, this.buf);
      return this;
    }
    /**
     * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
     */
    sfixed64(value) {
      let chunk = new Uint8Array(8);
      let view = new DataView(chunk.buffer);
      let long = PbLong.from(value);
      view.setInt32(0, long.lo, true);
      view.setInt32(4, long.hi, true);
      return this.raw(chunk);
    }
    /**
     * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
     */
    fixed64(value) {
      let chunk = new Uint8Array(8);
      let view = new DataView(chunk.buffer);
      let long = PbULong.from(value);
      view.setInt32(0, long.lo, true);
      view.setInt32(4, long.hi, true);
      return this.raw(chunk);
    }
    /**
     * Write a `int64` value, a signed 64-bit varint.
     */
    int64(value) {
      let long = PbLong.from(value);
      varint64write(long.lo, long.hi, this.buf);
      return this;
    }
    /**
     * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64(value) {
      let long = PbLong.from(value), sign = long.hi >> 31, lo = long.lo << 1 ^ sign, hi = (long.hi << 1 | long.lo >>> 31) ^ sign;
      varint64write(lo, hi, this.buf);
      return this;
    }
    /**
     * Write a `uint64` value, an unsigned 64-bit varint.
     */
    uint64(value) {
      let long = PbULong.from(value);
      varint64write(long.lo, long.hi, this.buf);
      return this;
    }
  };

  // node_modules/@protobuf-ts/runtime/build/es2015/json-format-contract.js
  var defaultsWrite2 = {
    emitDefaultValues: false,
    enumAsInteger: false,
    useProtoFieldName: false,
    prettySpaces: 0
  };
  var defaultsRead2 = {
    ignoreUnknownFields: false
  };
  function jsonReadOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsRead2), options) : defaultsRead2;
  }
  function jsonWriteOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsWrite2), options) : defaultsWrite2;
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/message-type-contract.js
  var MESSAGE_TYPE = Symbol.for("protobuf-ts/message-type");

  // node_modules/@protobuf-ts/runtime/build/es2015/lower-camel-case.js
  function lowerCamelCase(snakeCase) {
    let capNext = false;
    const sb = [];
    for (let i = 0; i < snakeCase.length; i++) {
      let next = snakeCase.charAt(i);
      if (next == "_") {
        capNext = true;
      } else if (/\d/.test(next)) {
        sb.push(next);
        capNext = true;
      } else if (capNext) {
        sb.push(next.toUpperCase());
        capNext = false;
      } else if (i == 0) {
        sb.push(next.toLowerCase());
      } else {
        sb.push(next);
      }
    }
    return sb.join("");
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-info.js
  var ScalarType;
  (function(ScalarType2) {
    ScalarType2[ScalarType2["DOUBLE"] = 1] = "DOUBLE";
    ScalarType2[ScalarType2["FLOAT"] = 2] = "FLOAT";
    ScalarType2[ScalarType2["INT64"] = 3] = "INT64";
    ScalarType2[ScalarType2["UINT64"] = 4] = "UINT64";
    ScalarType2[ScalarType2["INT32"] = 5] = "INT32";
    ScalarType2[ScalarType2["FIXED64"] = 6] = "FIXED64";
    ScalarType2[ScalarType2["FIXED32"] = 7] = "FIXED32";
    ScalarType2[ScalarType2["BOOL"] = 8] = "BOOL";
    ScalarType2[ScalarType2["STRING"] = 9] = "STRING";
    ScalarType2[ScalarType2["BYTES"] = 12] = "BYTES";
    ScalarType2[ScalarType2["UINT32"] = 13] = "UINT32";
    ScalarType2[ScalarType2["SFIXED32"] = 15] = "SFIXED32";
    ScalarType2[ScalarType2["SFIXED64"] = 16] = "SFIXED64";
    ScalarType2[ScalarType2["SINT32"] = 17] = "SINT32";
    ScalarType2[ScalarType2["SINT64"] = 18] = "SINT64";
  })(ScalarType || (ScalarType = {}));
  var LongType;
  (function(LongType2) {
    LongType2[LongType2["BIGINT"] = 0] = "BIGINT";
    LongType2[LongType2["STRING"] = 1] = "STRING";
    LongType2[LongType2["NUMBER"] = 2] = "NUMBER";
  })(LongType || (LongType = {}));
  var RepeatType;
  (function(RepeatType2) {
    RepeatType2[RepeatType2["NO"] = 0] = "NO";
    RepeatType2[RepeatType2["PACKED"] = 1] = "PACKED";
    RepeatType2[RepeatType2["UNPACKED"] = 2] = "UNPACKED";
  })(RepeatType || (RepeatType = {}));
  function normalizeFieldInfo(field) {
    var _a2, _b2, _c, _d;
    field.localName = (_a2 = field.localName) !== null && _a2 !== void 0 ? _a2 : lowerCamelCase(field.name);
    field.jsonName = (_b2 = field.jsonName) !== null && _b2 !== void 0 ? _b2 : lowerCamelCase(field.name);
    field.repeat = (_c = field.repeat) !== null && _c !== void 0 ? _c : RepeatType.NO;
    field.opt = (_d = field.opt) !== null && _d !== void 0 ? _d : field.repeat ? false : field.oneof ? false : field.kind == "message";
    return field;
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/oneof.js
  function isOneofGroup(any) {
    if (typeof any != "object" || any === null || !any.hasOwnProperty("oneofKind")) {
      return false;
    }
    switch (typeof any.oneofKind) {
      case "string":
        if (any[any.oneofKind] === void 0)
          return false;
        return Object.keys(any).length == 2;
      case "undefined":
        return Object.keys(any).length == 1;
      default:
        return false;
    }
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-type-check.js
  var ReflectionTypeCheck = class {
    constructor(info) {
      var _a2;
      this.fields = (_a2 = info.fields) !== null && _a2 !== void 0 ? _a2 : [];
    }
    prepare() {
      if (this.data)
        return;
      const req = [], known = [], oneofs = [];
      for (let field of this.fields) {
        if (field.oneof) {
          if (!oneofs.includes(field.oneof)) {
            oneofs.push(field.oneof);
            req.push(field.oneof);
            known.push(field.oneof);
          }
        } else {
          known.push(field.localName);
          switch (field.kind) {
            case "scalar":
            case "enum":
              if (!field.opt || field.repeat)
                req.push(field.localName);
              break;
            case "message":
              if (field.repeat)
                req.push(field.localName);
              break;
            case "map":
              req.push(field.localName);
              break;
          }
        }
      }
      this.data = { req, known, oneofs: Object.values(oneofs) };
    }
    /**
     * Is the argument a valid message as specified by the
     * reflection information?
     *
     * Checks all field types recursively. The `depth`
     * specifies how deep into the structure the check will be.
     *
     * With a depth of 0, only the presence of fields
     * is checked.
     *
     * With a depth of 1 or more, the field types are checked.
     *
     * With a depth of 2 or more, the members of map, repeated
     * and message fields are checked.
     *
     * Message fields will be checked recursively with depth - 1.
     *
     * The number of map entries / repeated values being checked
     * is < depth.
     */
    is(message, depth, allowExcessProperties = false) {
      if (depth < 0)
        return true;
      if (message === null || message === void 0 || typeof message != "object")
        return false;
      this.prepare();
      let keys = Object.keys(message), data = this.data;
      if (keys.length < data.req.length || data.req.some((n) => !keys.includes(n)))
        return false;
      if (!allowExcessProperties) {
        if (keys.some((k) => !data.known.includes(k)))
          return false;
      }
      if (depth < 1) {
        return true;
      }
      for (const name of data.oneofs) {
        const group = message[name];
        if (!isOneofGroup(group))
          return false;
        if (group.oneofKind === void 0)
          continue;
        const field = this.fields.find((f) => f.localName === group.oneofKind);
        if (!field)
          return false;
        if (!this.field(group[group.oneofKind], field, allowExcessProperties, depth))
          return false;
      }
      for (const field of this.fields) {
        if (field.oneof !== void 0)
          continue;
        if (!this.field(message[field.localName], field, allowExcessProperties, depth))
          return false;
      }
      return true;
    }
    field(arg, field, allowExcessProperties, depth) {
      let repeated = field.repeat;
      switch (field.kind) {
        case "scalar":
          if (arg === void 0)
            return field.opt;
          if (repeated)
            return this.scalars(arg, field.T, depth, field.L);
          return this.scalar(arg, field.T, field.L);
        case "enum":
          if (arg === void 0)
            return field.opt;
          if (repeated)
            return this.scalars(arg, ScalarType.INT32, depth);
          return this.scalar(arg, ScalarType.INT32);
        case "message":
          if (arg === void 0)
            return true;
          if (repeated)
            return this.messages(arg, field.T(), allowExcessProperties, depth);
          return this.message(arg, field.T(), allowExcessProperties, depth);
        case "map":
          if (typeof arg != "object" || arg === null)
            return false;
          if (depth < 2)
            return true;
          if (!this.mapKeys(arg, field.K, depth))
            return false;
          switch (field.V.kind) {
            case "scalar":
              return this.scalars(Object.values(arg), field.V.T, depth, field.V.L);
            case "enum":
              return this.scalars(Object.values(arg), ScalarType.INT32, depth);
            case "message":
              return this.messages(Object.values(arg), field.V.T(), allowExcessProperties, depth);
          }
          break;
      }
      return true;
    }
    message(arg, type, allowExcessProperties, depth) {
      if (allowExcessProperties) {
        return type.isAssignable(arg, depth);
      }
      return type.is(arg, depth);
    }
    messages(arg, type, allowExcessProperties, depth) {
      if (!Array.isArray(arg))
        return false;
      if (depth < 2)
        return true;
      if (allowExcessProperties) {
        for (let i = 0; i < arg.length && i < depth; i++)
          if (!type.isAssignable(arg[i], depth - 1))
            return false;
      } else {
        for (let i = 0; i < arg.length && i < depth; i++)
          if (!type.is(arg[i], depth - 1))
            return false;
      }
      return true;
    }
    scalar(arg, type, longType) {
      let argType = typeof arg;
      switch (type) {
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
          switch (longType) {
            case LongType.BIGINT:
              return argType == "bigint";
            case LongType.NUMBER:
              return argType == "number" && !isNaN(arg);
            default:
              return argType == "string";
          }
        case ScalarType.BOOL:
          return argType == "boolean";
        case ScalarType.STRING:
          return argType == "string";
        case ScalarType.BYTES:
          return arg instanceof Uint8Array;
        case ScalarType.DOUBLE:
        case ScalarType.FLOAT:
          return argType == "number" && !isNaN(arg);
        default:
          return argType == "number" && Number.isInteger(arg);
      }
    }
    scalars(arg, type, depth, longType) {
      if (!Array.isArray(arg))
        return false;
      if (depth < 2)
        return true;
      if (Array.isArray(arg)) {
        for (let i = 0; i < arg.length && i < depth; i++)
          if (!this.scalar(arg[i], type, longType))
            return false;
      }
      return true;
    }
    mapKeys(map, type, depth) {
      let keys = Object.keys(map);
      switch (type) {
        case ScalarType.INT32:
        case ScalarType.FIXED32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
        case ScalarType.UINT32:
          return this.scalars(keys.slice(0, depth).map((k) => parseInt(k)), type, depth);
        case ScalarType.BOOL:
          return this.scalars(keys.slice(0, depth).map((k) => k == "true" ? true : k == "false" ? false : k), type, depth);
        default:
          return this.scalars(keys, type, depth, LongType.STRING);
      }
    }
  };

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-long-convert.js
  function reflectionLongConvert(long, type) {
    switch (type) {
      case LongType.BIGINT:
        return long.toBigInt();
      case LongType.NUMBER:
        return long.toNumber();
      default:
        return long.toString();
    }
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-json-reader.js
  var ReflectionJsonReader = class {
    constructor(info) {
      this.info = info;
    }
    prepare() {
      var _a2;
      if (this.fMap === void 0) {
        this.fMap = {};
        const fieldsInput = (_a2 = this.info.fields) !== null && _a2 !== void 0 ? _a2 : [];
        for (const field of fieldsInput) {
          this.fMap[field.name] = field;
          this.fMap[field.jsonName] = field;
          this.fMap[field.localName] = field;
        }
      }
    }
    // Cannot parse JSON <type of jsonValue> for <type name>#<fieldName>.
    assert(condition, fieldName, jsonValue) {
      if (!condition) {
        let what = typeofJsonValue(jsonValue);
        if (what == "number" || what == "boolean")
          what = jsonValue.toString();
        throw new Error(`Cannot parse JSON ${what} for ${this.info.typeName}#${fieldName}`);
      }
    }
    /**
     * Reads a message from canonical JSON format into the target message.
     *
     * Repeated fields are appended. Map entries are added, overwriting
     * existing keys.
     *
     * If a message field is already present, it will be merged with the
     * new data.
     */
    read(input, message, options) {
      this.prepare();
      const oneofsHandled = [];
      for (const [jsonKey, jsonValue] of Object.entries(input)) {
        const field = this.fMap[jsonKey];
        if (!field) {
          if (!options.ignoreUnknownFields)
            throw new Error(`Found unknown field while reading ${this.info.typeName} from JSON format. JSON key: ${jsonKey}`);
          continue;
        }
        const localName = field.localName;
        let target;
        if (field.oneof) {
          if (oneofsHandled.includes(field.oneof))
            throw new Error(`Multiple members of the oneof group "${field.oneof}" of ${this.info.typeName} are present in JSON.`);
          oneofsHandled.push(field.oneof);
          target = message[field.oneof] = {
            oneofKind: localName
          };
        } else {
          target = message;
        }
        if (field.kind == "map") {
          if (jsonValue === null) {
            continue;
          }
          this.assert(isJsonObject(jsonValue), field.name, jsonValue);
          const fieldObj = target[localName];
          for (const [jsonObjKey, jsonObjValue] of Object.entries(jsonValue)) {
            this.assert(jsonObjValue !== null, field.name + " map value", null);
            let val;
            switch (field.V.kind) {
              case "message":
                val = field.V.T().internalJsonRead(jsonObjValue, options);
                break;
              case "enum":
                val = this.enum(field.V.T(), jsonObjValue, field.name, options.ignoreUnknownFields);
                if (val === false)
                  continue;
                break;
              case "scalar":
                val = this.scalar(jsonObjValue, field.V.T, field.V.L, field.name);
                break;
            }
            this.assert(val !== void 0, field.name + " map value", jsonObjValue);
            let key = jsonObjKey;
            if (field.K == ScalarType.BOOL)
              key = key == "true" ? true : key == "false" ? false : key;
            key = this.scalar(key, field.K, LongType.STRING, field.name).toString();
            fieldObj[key] = val;
          }
        } else if (field.repeat) {
          if (jsonValue === null)
            continue;
          this.assert(Array.isArray(jsonValue), field.name, jsonValue);
          const fieldArr = target[localName];
          for (const jsonItem of jsonValue) {
            this.assert(jsonItem !== null, field.name, null);
            let val;
            switch (field.kind) {
              case "message":
                val = field.T().internalJsonRead(jsonItem, options);
                break;
              case "enum":
                val = this.enum(field.T(), jsonItem, field.name, options.ignoreUnknownFields);
                if (val === false)
                  continue;
                break;
              case "scalar":
                val = this.scalar(jsonItem, field.T, field.L, field.name);
                break;
            }
            this.assert(val !== void 0, field.name, jsonValue);
            fieldArr.push(val);
          }
        } else {
          switch (field.kind) {
            case "message":
              if (jsonValue === null && field.T().typeName != "google.protobuf.Value") {
                this.assert(field.oneof === void 0, field.name + " (oneof member)", null);
                continue;
              }
              target[localName] = field.T().internalJsonRead(jsonValue, options, target[localName]);
              break;
            case "enum":
              let val = this.enum(field.T(), jsonValue, field.name, options.ignoreUnknownFields);
              if (val === false)
                continue;
              target[localName] = val;
              break;
            case "scalar":
              target[localName] = this.scalar(jsonValue, field.T, field.L, field.name);
              break;
          }
        }
      }
    }
    /**
     * Returns `false` for unrecognized string representations.
     *
     * google.protobuf.NullValue accepts only JSON `null`.
     */
    enum(type, json, fieldName, ignoreUnknownFields) {
      if (type[0] == "google.protobuf.NullValue")
        assert(json === null, `Unable to parse field ${this.info.typeName}#${fieldName}, enum ${type[0]} only accepts null.`);
      if (json === null)
        return 0;
      switch (typeof json) {
        case "number":
          assert(Number.isInteger(json), `Unable to parse field ${this.info.typeName}#${fieldName}, enum can only be integral number, got ${json}.`);
          return json;
        case "string":
          let localEnumName = json;
          if (type[2] && json.substring(0, type[2].length) === type[2])
            localEnumName = json.substring(type[2].length);
          let enumNumber = type[1][localEnumName];
          if (typeof enumNumber === "undefined" && ignoreUnknownFields) {
            return false;
          }
          assert(typeof enumNumber == "number", `Unable to parse field ${this.info.typeName}#${fieldName}, enum ${type[0]} has no value for "${json}".`);
          return enumNumber;
      }
      assert(false, `Unable to parse field ${this.info.typeName}#${fieldName}, cannot parse enum value from ${typeof json}".`);
    }
    scalar(json, type, longType, fieldName) {
      let e;
      try {
        switch (type) {
          case ScalarType.DOUBLE:
          case ScalarType.FLOAT:
            if (json === null)
              return 0;
            if (json === "NaN")
              return Number.NaN;
            if (json === "Infinity")
              return Number.POSITIVE_INFINITY;
            if (json === "-Infinity")
              return Number.NEGATIVE_INFINITY;
            if (json === "") {
              e = "empty string";
              break;
            }
            if (typeof json == "string" && json.trim().length !== json.length) {
              e = "extra whitespace";
              break;
            }
            if (typeof json != "string" && typeof json != "number") {
              break;
            }
            let float = Number(json);
            if (Number.isNaN(float)) {
              e = "not a number";
              break;
            }
            if (!Number.isFinite(float)) {
              e = "too large or small";
              break;
            }
            if (type == ScalarType.FLOAT)
              assertFloat32(float);
            return float;
          case ScalarType.INT32:
          case ScalarType.FIXED32:
          case ScalarType.SFIXED32:
          case ScalarType.SINT32:
          case ScalarType.UINT32:
            if (json === null)
              return 0;
            let int32;
            if (typeof json == "number")
              int32 = json;
            else if (json === "")
              e = "empty string";
            else if (typeof json == "string") {
              if (json.trim().length !== json.length)
                e = "extra whitespace";
              else
                int32 = Number(json);
            }
            if (int32 === void 0)
              break;
            if (type == ScalarType.UINT32)
              assertUInt32(int32);
            else
              assertInt32(int32);
            return int32;
          case ScalarType.INT64:
          case ScalarType.SFIXED64:
          case ScalarType.SINT64:
            if (json === null)
              return reflectionLongConvert(PbLong.ZERO, longType);
            if (typeof json != "number" && typeof json != "string")
              break;
            return reflectionLongConvert(PbLong.from(json), longType);
          case ScalarType.FIXED64:
          case ScalarType.UINT64:
            if (json === null)
              return reflectionLongConvert(PbULong.ZERO, longType);
            if (typeof json != "number" && typeof json != "string")
              break;
            return reflectionLongConvert(PbULong.from(json), longType);
          case ScalarType.BOOL:
            if (json === null)
              return false;
            if (typeof json !== "boolean")
              break;
            return json;
          case ScalarType.STRING:
            if (json === null)
              return "";
            if (typeof json !== "string") {
              e = "extra whitespace";
              break;
            }
            try {
              encodeURIComponent(json);
            } catch (e2) {
              e2 = "invalid UTF8";
              break;
            }
            return json;
          case ScalarType.BYTES:
            if (json === null || json === "")
              return new Uint8Array(0);
            if (typeof json !== "string")
              break;
            return base64decode(json);
        }
      } catch (error) {
        e = error.message;
      }
      this.assert(false, fieldName + (e ? " - " + e : ""), json);
    }
  };

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-json-writer.js
  var ReflectionJsonWriter = class {
    constructor(info) {
      var _a2;
      this.fields = (_a2 = info.fields) !== null && _a2 !== void 0 ? _a2 : [];
    }
    /**
     * Converts the message to a JSON object, based on the field descriptors.
     */
    write(message, options) {
      const json = {}, source = message;
      for (const field of this.fields) {
        if (!field.oneof) {
          let jsonValue2 = this.field(field, source[field.localName], options);
          if (jsonValue2 !== void 0)
            json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue2;
          continue;
        }
        const group = source[field.oneof];
        if (group.oneofKind !== field.localName)
          continue;
        const opt = field.kind == "scalar" || field.kind == "enum" ? Object.assign(Object.assign({}, options), { emitDefaultValues: true }) : options;
        let jsonValue = this.field(field, group[field.localName], opt);
        assert(jsonValue !== void 0);
        json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
      }
      return json;
    }
    field(field, value, options) {
      let jsonValue = void 0;
      if (field.kind == "map") {
        assert(typeof value == "object" && value !== null);
        const jsonObj = {};
        switch (field.V.kind) {
          case "scalar":
            for (const [entryKey, entryValue] of Object.entries(value)) {
              const val = this.scalar(field.V.T, entryValue, field.name, false, true);
              assert(val !== void 0);
              jsonObj[entryKey.toString()] = val;
            }
            break;
          case "message":
            const messageType = field.V.T();
            for (const [entryKey, entryValue] of Object.entries(value)) {
              const val = this.message(messageType, entryValue, field.name, options);
              assert(val !== void 0);
              jsonObj[entryKey.toString()] = val;
            }
            break;
          case "enum":
            const enumInfo = field.V.T();
            for (const [entryKey, entryValue] of Object.entries(value)) {
              assert(entryValue === void 0 || typeof entryValue == "number");
              const val = this.enum(enumInfo, entryValue, field.name, false, true, options.enumAsInteger);
              assert(val !== void 0);
              jsonObj[entryKey.toString()] = val;
            }
            break;
        }
        if (options.emitDefaultValues || Object.keys(jsonObj).length > 0)
          jsonValue = jsonObj;
      } else if (field.repeat) {
        assert(Array.isArray(value));
        const jsonArr = [];
        switch (field.kind) {
          case "scalar":
            for (let i = 0; i < value.length; i++) {
              const val = this.scalar(field.T, value[i], field.name, field.opt, true);
              assert(val !== void 0);
              jsonArr.push(val);
            }
            break;
          case "enum":
            const enumInfo = field.T();
            for (let i = 0; i < value.length; i++) {
              assert(value[i] === void 0 || typeof value[i] == "number");
              const val = this.enum(enumInfo, value[i], field.name, field.opt, true, options.enumAsInteger);
              assert(val !== void 0);
              jsonArr.push(val);
            }
            break;
          case "message":
            const messageType = field.T();
            for (let i = 0; i < value.length; i++) {
              const val = this.message(messageType, value[i], field.name, options);
              assert(val !== void 0);
              jsonArr.push(val);
            }
            break;
        }
        if (options.emitDefaultValues || jsonArr.length > 0 || options.emitDefaultValues)
          jsonValue = jsonArr;
      } else {
        switch (field.kind) {
          case "scalar":
            jsonValue = this.scalar(field.T, value, field.name, field.opt, options.emitDefaultValues);
            break;
          case "enum":
            jsonValue = this.enum(field.T(), value, field.name, field.opt, options.emitDefaultValues, options.enumAsInteger);
            break;
          case "message":
            jsonValue = this.message(field.T(), value, field.name, options);
            break;
        }
      }
      return jsonValue;
    }
    /**
     * Returns `null` for google.protobuf.NullValue.
     */
    enum(type, value, fieldName, optional, emitDefaultValues, enumAsInteger) {
      if (type[0] == "google.protobuf.NullValue")
        return null;
      if (value === void 0) {
        assert(optional);
        return void 0;
      }
      if (value === 0 && !emitDefaultValues && !optional)
        return void 0;
      assert(typeof value == "number");
      assert(Number.isInteger(value));
      if (enumAsInteger || !type[1].hasOwnProperty(value))
        return value;
      if (type[2])
        return type[2] + type[1][value];
      return type[1][value];
    }
    message(type, value, fieldName, options) {
      if (value === void 0)
        return options.emitDefaultValues ? null : void 0;
      return type.internalJsonWrite(value, options);
    }
    scalar(type, value, fieldName, optional, emitDefaultValues) {
      if (value === void 0) {
        assert(optional);
        return void 0;
      }
      const ed = emitDefaultValues || optional;
      switch (type) {
        case ScalarType.INT32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
          if (value === 0)
            return ed ? 0 : void 0;
          assertInt32(value);
          return value;
        case ScalarType.FIXED32:
        case ScalarType.UINT32:
          if (value === 0)
            return ed ? 0 : void 0;
          assertUInt32(value);
          return value;
        case ScalarType.FLOAT:
          assertFloat32(value);
        case ScalarType.DOUBLE:
          if (value === 0)
            return ed ? 0 : void 0;
          assert(typeof value == "number");
          if (Number.isNaN(value))
            return "NaN";
          if (value === Number.POSITIVE_INFINITY)
            return "Infinity";
          if (value === Number.NEGATIVE_INFINITY)
            return "-Infinity";
          return value;
        case ScalarType.STRING:
          if (value === "")
            return ed ? "" : void 0;
          assert(typeof value == "string");
          return value;
        case ScalarType.BOOL:
          if (value === false)
            return ed ? false : void 0;
          assert(typeof value == "boolean");
          return value;
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
          assert(typeof value == "number" || typeof value == "string" || typeof value == "bigint");
          let ulong = PbULong.from(value);
          if (ulong.isZero() && !ed)
            return void 0;
          return ulong.toString();
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
          assert(typeof value == "number" || typeof value == "string" || typeof value == "bigint");
          let long = PbLong.from(value);
          if (long.isZero() && !ed)
            return void 0;
          return long.toString();
        case ScalarType.BYTES:
          assert(value instanceof Uint8Array);
          if (!value.byteLength)
            return ed ? "" : void 0;
          return base64encode(value);
      }
    }
  };

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-scalar-default.js
  function reflectionScalarDefault(type, longType = LongType.STRING) {
    switch (type) {
      case ScalarType.BOOL:
        return false;
      case ScalarType.UINT64:
      case ScalarType.FIXED64:
        return reflectionLongConvert(PbULong.ZERO, longType);
      case ScalarType.INT64:
      case ScalarType.SFIXED64:
      case ScalarType.SINT64:
        return reflectionLongConvert(PbLong.ZERO, longType);
      case ScalarType.DOUBLE:
      case ScalarType.FLOAT:
        return 0;
      case ScalarType.BYTES:
        return new Uint8Array(0);
      case ScalarType.STRING:
        return "";
      default:
        return 0;
    }
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-binary-reader.js
  var ReflectionBinaryReader = class {
    constructor(info) {
      this.info = info;
    }
    prepare() {
      var _a2;
      if (!this.fieldNoToField) {
        const fieldsInput = (_a2 = this.info.fields) !== null && _a2 !== void 0 ? _a2 : [];
        this.fieldNoToField = new Map(fieldsInput.map((field) => [field.no, field]));
      }
    }
    /**
     * Reads a message from binary format into the target message.
     *
     * Repeated fields are appended. Map entries are added, overwriting
     * existing keys.
     *
     * If a message field is already present, it will be merged with the
     * new data.
     */
    read(reader, message, options, length) {
      this.prepare();
      const end = length === void 0 ? reader.len : reader.pos + length;
      while (reader.pos < end) {
        const [fieldNo, wireType] = reader.tag(), field = this.fieldNoToField.get(fieldNo);
        if (!field) {
          let u2 = options.readUnknownField;
          if (u2 == "throw")
            throw new Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.info.typeName}`);
          let d = reader.skip(wireType);
          if (u2 !== false)
            (u2 === true ? UnknownFieldHandler.onRead : u2)(this.info.typeName, message, fieldNo, wireType, d);
          continue;
        }
        let target = message, repeated = field.repeat, localName = field.localName;
        if (field.oneof) {
          target = target[field.oneof];
          if (target.oneofKind !== localName)
            target = message[field.oneof] = {
              oneofKind: localName
            };
        }
        switch (field.kind) {
          case "scalar":
          case "enum":
            let T = field.kind == "enum" ? ScalarType.INT32 : field.T;
            let L = field.kind == "scalar" ? field.L : void 0;
            if (repeated) {
              let arr = target[localName];
              if (wireType == WireType.LengthDelimited && T != ScalarType.STRING && T != ScalarType.BYTES) {
                let e = reader.uint32() + reader.pos;
                while (reader.pos < e)
                  arr.push(this.scalar(reader, T, L));
              } else
                arr.push(this.scalar(reader, T, L));
            } else
              target[localName] = this.scalar(reader, T, L);
            break;
          case "message":
            if (repeated) {
              let arr = target[localName];
              let msg = field.T().internalBinaryRead(reader, reader.uint32(), options);
              arr.push(msg);
            } else
              target[localName] = field.T().internalBinaryRead(reader, reader.uint32(), options, target[localName]);
            break;
          case "map":
            let [mapKey, mapVal] = this.mapEntry(field, reader, options);
            target[localName][mapKey] = mapVal;
            break;
        }
      }
    }
    /**
     * Read a map field, expecting key field = 1, value field = 2
     */
    mapEntry(field, reader, options) {
      let length = reader.uint32();
      let end = reader.pos + length;
      let key = void 0;
      let val = void 0;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case 1:
            if (field.K == ScalarType.BOOL)
              key = reader.bool().toString();
            else
              key = this.scalar(reader, field.K, LongType.STRING);
            break;
          case 2:
            switch (field.V.kind) {
              case "scalar":
                val = this.scalar(reader, field.V.T, field.V.L);
                break;
              case "enum":
                val = reader.int32();
                break;
              case "message":
                val = field.V.T().internalBinaryRead(reader, reader.uint32(), options);
                break;
            }
            break;
          default:
            throw new Error(`Unknown field ${fieldNo} (wire type ${wireType}) in map entry for ${this.info.typeName}#${field.name}`);
        }
      }
      if (key === void 0) {
        let keyRaw = reflectionScalarDefault(field.K);
        key = field.K == ScalarType.BOOL ? keyRaw.toString() : keyRaw;
      }
      if (val === void 0)
        switch (field.V.kind) {
          case "scalar":
            val = reflectionScalarDefault(field.V.T, field.V.L);
            break;
          case "enum":
            val = 0;
            break;
          case "message":
            val = field.V.T().create();
            break;
        }
      return [key, val];
    }
    scalar(reader, type, longType) {
      switch (type) {
        case ScalarType.INT32:
          return reader.int32();
        case ScalarType.STRING:
          return reader.string();
        case ScalarType.BOOL:
          return reader.bool();
        case ScalarType.DOUBLE:
          return reader.double();
        case ScalarType.FLOAT:
          return reader.float();
        case ScalarType.INT64:
          return reflectionLongConvert(reader.int64(), longType);
        case ScalarType.UINT64:
          return reflectionLongConvert(reader.uint64(), longType);
        case ScalarType.FIXED64:
          return reflectionLongConvert(reader.fixed64(), longType);
        case ScalarType.FIXED32:
          return reader.fixed32();
        case ScalarType.BYTES:
          return reader.bytes();
        case ScalarType.UINT32:
          return reader.uint32();
        case ScalarType.SFIXED32:
          return reader.sfixed32();
        case ScalarType.SFIXED64:
          return reflectionLongConvert(reader.sfixed64(), longType);
        case ScalarType.SINT32:
          return reader.sint32();
        case ScalarType.SINT64:
          return reflectionLongConvert(reader.sint64(), longType);
      }
    }
  };

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-binary-writer.js
  var ReflectionBinaryWriter = class {
    constructor(info) {
      this.info = info;
    }
    prepare() {
      if (!this.fields) {
        const fieldsInput = this.info.fields ? this.info.fields.concat() : [];
        this.fields = fieldsInput.sort((a2, b) => a2.no - b.no);
      }
    }
    /**
     * Writes the message to binary format.
     */
    write(message, writer, options) {
      this.prepare();
      for (const field of this.fields) {
        let value, emitDefault, repeated = field.repeat, localName = field.localName;
        if (field.oneof) {
          const group = message[field.oneof];
          if (group.oneofKind !== localName)
            continue;
          value = group[localName];
          emitDefault = true;
        } else {
          value = message[localName];
          emitDefault = false;
        }
        switch (field.kind) {
          case "scalar":
          case "enum":
            let T = field.kind == "enum" ? ScalarType.INT32 : field.T;
            if (repeated) {
              assert(Array.isArray(value));
              if (repeated == RepeatType.PACKED)
                this.packed(writer, T, field.no, value);
              else
                for (const item of value)
                  this.scalar(writer, T, field.no, item, true);
            } else if (value === void 0)
              assert(field.opt);
            else
              this.scalar(writer, T, field.no, value, emitDefault || field.opt);
            break;
          case "message":
            if (repeated) {
              assert(Array.isArray(value));
              for (const item of value)
                this.message(writer, options, field.T(), field.no, item);
            } else {
              this.message(writer, options, field.T(), field.no, value);
            }
            break;
          case "map":
            assert(typeof value == "object" && value !== null);
            for (const [key, val] of Object.entries(value))
              this.mapEntry(writer, options, field, key, val);
            break;
        }
      }
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 === true ? UnknownFieldHandler.onWrite : u2)(this.info.typeName, message, writer);
    }
    mapEntry(writer, options, field, key, value) {
      writer.tag(field.no, WireType.LengthDelimited);
      writer.fork();
      let keyValue = key;
      switch (field.K) {
        case ScalarType.INT32:
        case ScalarType.FIXED32:
        case ScalarType.UINT32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
          keyValue = Number.parseInt(key);
          break;
        case ScalarType.BOOL:
          assert(key == "true" || key == "false");
          keyValue = key == "true";
          break;
      }
      this.scalar(writer, field.K, 1, keyValue, true);
      switch (field.V.kind) {
        case "scalar":
          this.scalar(writer, field.V.T, 2, value, true);
          break;
        case "enum":
          this.scalar(writer, ScalarType.INT32, 2, value, true);
          break;
        case "message":
          this.message(writer, options, field.V.T(), 2, value);
          break;
      }
      writer.join();
    }
    message(writer, options, handler, fieldNo, value) {
      if (value === void 0)
        return;
      handler.internalBinaryWrite(value, writer.tag(fieldNo, WireType.LengthDelimited).fork(), options);
      writer.join();
    }
    /**
     * Write a single scalar value.
     */
    scalar(writer, type, fieldNo, value, emitDefault) {
      let [wireType, method, isDefault] = this.scalarInfo(type, value);
      if (!isDefault || emitDefault) {
        writer.tag(fieldNo, wireType);
        writer[method](value);
      }
    }
    /**
     * Write an array of scalar values in packed format.
     */
    packed(writer, type, fieldNo, value) {
      if (!value.length)
        return;
      assert(type !== ScalarType.BYTES && type !== ScalarType.STRING);
      writer.tag(fieldNo, WireType.LengthDelimited);
      writer.fork();
      let [, method] = this.scalarInfo(type);
      for (let i = 0; i < value.length; i++)
        writer[method](value[i]);
      writer.join();
    }
    /**
     * Get information for writing a scalar value.
     *
     * Returns tuple:
     * [0]: appropriate WireType
     * [1]: name of the appropriate method of IBinaryWriter
     * [2]: whether the given value is a default value
     *
     * If argument `value` is omitted, [2] is always false.
     */
    scalarInfo(type, value) {
      let t = WireType.Varint;
      let m;
      let i = value === void 0;
      let d = value === 0;
      switch (type) {
        case ScalarType.INT32:
          m = "int32";
          break;
        case ScalarType.STRING:
          d = i || !value.length;
          t = WireType.LengthDelimited;
          m = "string";
          break;
        case ScalarType.BOOL:
          d = value === false;
          m = "bool";
          break;
        case ScalarType.UINT32:
          m = "uint32";
          break;
        case ScalarType.DOUBLE:
          t = WireType.Bit64;
          m = "double";
          break;
        case ScalarType.FLOAT:
          t = WireType.Bit32;
          m = "float";
          break;
        case ScalarType.INT64:
          d = i || PbLong.from(value).isZero();
          m = "int64";
          break;
        case ScalarType.UINT64:
          d = i || PbULong.from(value).isZero();
          m = "uint64";
          break;
        case ScalarType.FIXED64:
          d = i || PbULong.from(value).isZero();
          t = WireType.Bit64;
          m = "fixed64";
          break;
        case ScalarType.BYTES:
          d = i || !value.byteLength;
          t = WireType.LengthDelimited;
          m = "bytes";
          break;
        case ScalarType.FIXED32:
          t = WireType.Bit32;
          m = "fixed32";
          break;
        case ScalarType.SFIXED32:
          t = WireType.Bit32;
          m = "sfixed32";
          break;
        case ScalarType.SFIXED64:
          d = i || PbLong.from(value).isZero();
          t = WireType.Bit64;
          m = "sfixed64";
          break;
        case ScalarType.SINT32:
          m = "sint32";
          break;
        case ScalarType.SINT64:
          d = i || PbLong.from(value).isZero();
          m = "sint64";
          break;
      }
      return [t, m, i || d];
    }
  };

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-create.js
  function reflectionCreate(type) {
    const msg = {};
    Object.defineProperty(msg, MESSAGE_TYPE, { enumerable: false, value: type });
    for (let field of type.fields) {
      let name = field.localName;
      if (field.opt)
        continue;
      if (field.oneof)
        msg[field.oneof] = { oneofKind: void 0 };
      else if (field.repeat)
        msg[name] = [];
      else
        switch (field.kind) {
          case "scalar":
            msg[name] = reflectionScalarDefault(field.T, field.L);
            break;
          case "enum":
            msg[name] = 0;
            break;
          case "map":
            msg[name] = {};
            break;
        }
    }
    return msg;
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-merge-partial.js
  function reflectionMergePartial(info, target, source) {
    let fieldValue, input = source, output;
    for (let field of info.fields) {
      let name = field.localName;
      if (field.oneof) {
        const group = input[field.oneof];
        if ((group === null || group === void 0 ? void 0 : group.oneofKind) == void 0) {
          continue;
        }
        fieldValue = group[name];
        output = target[field.oneof];
        output.oneofKind = group.oneofKind;
        if (fieldValue == void 0) {
          delete output[name];
          continue;
        }
      } else {
        fieldValue = input[name];
        output = target;
        if (fieldValue == void 0) {
          continue;
        }
      }
      if (field.repeat)
        output[name].length = fieldValue.length;
      switch (field.kind) {
        case "scalar":
        case "enum":
          if (field.repeat)
            for (let i = 0; i < fieldValue.length; i++)
              output[name][i] = fieldValue[i];
          else
            output[name] = fieldValue;
          break;
        case "message":
          let T = field.T();
          if (field.repeat)
            for (let i = 0; i < fieldValue.length; i++)
              output[name][i] = T.create(fieldValue[i]);
          else if (output[name] === void 0)
            output[name] = T.create(fieldValue);
          else
            T.mergePartial(output[name], fieldValue);
          break;
        case "map":
          switch (field.V.kind) {
            case "scalar":
            case "enum":
              Object.assign(output[name], fieldValue);
              break;
            case "message":
              let T2 = field.V.T();
              for (let k of Object.keys(fieldValue))
                output[name][k] = T2.create(fieldValue[k]);
              break;
          }
          break;
      }
    }
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/reflection-equals.js
  function reflectionEquals(info, a2, b) {
    if (a2 === b)
      return true;
    if (!a2 || !b)
      return false;
    for (let field of info.fields) {
      let localName = field.localName;
      let val_a = field.oneof ? a2[field.oneof][localName] : a2[localName];
      let val_b = field.oneof ? b[field.oneof][localName] : b[localName];
      switch (field.kind) {
        case "enum":
        case "scalar":
          let t = field.kind == "enum" ? ScalarType.INT32 : field.T;
          if (!(field.repeat ? repeatedPrimitiveEq(t, val_a, val_b) : primitiveEq(t, val_a, val_b)))
            return false;
          break;
        case "map":
          if (!(field.V.kind == "message" ? repeatedMsgEq(field.V.T(), objectValues(val_a), objectValues(val_b)) : repeatedPrimitiveEq(field.V.kind == "enum" ? ScalarType.INT32 : field.V.T, objectValues(val_a), objectValues(val_b))))
            return false;
          break;
        case "message":
          let T = field.T();
          if (!(field.repeat ? repeatedMsgEq(T, val_a, val_b) : T.equals(val_a, val_b)))
            return false;
          break;
      }
    }
    return true;
  }
  var objectValues = Object.values;
  function primitiveEq(type, a2, b) {
    if (a2 === b)
      return true;
    if (type !== ScalarType.BYTES)
      return false;
    let ba = a2;
    let bb = b;
    if (ba.length !== bb.length)
      return false;
    for (let i = 0; i < ba.length; i++)
      if (ba[i] != bb[i])
        return false;
    return true;
  }
  function repeatedPrimitiveEq(type, a2, b) {
    if (a2.length !== b.length)
      return false;
    for (let i = 0; i < a2.length; i++)
      if (!primitiveEq(type, a2[i], b[i]))
        return false;
    return true;
  }
  function repeatedMsgEq(type, a2, b) {
    if (a2.length !== b.length)
      return false;
    for (let i = 0; i < a2.length; i++)
      if (!type.equals(a2[i], b[i]))
        return false;
    return true;
  }

  // node_modules/@protobuf-ts/runtime/build/es2015/message-type.js
  var MessageType = class {
    constructor(name, fields, options) {
      this.defaultCheckDepth = 16;
      this.typeName = name;
      this.fields = fields.map(normalizeFieldInfo);
      this.options = options !== null && options !== void 0 ? options : {};
      this.refTypeCheck = new ReflectionTypeCheck(this);
      this.refJsonReader = new ReflectionJsonReader(this);
      this.refJsonWriter = new ReflectionJsonWriter(this);
      this.refBinReader = new ReflectionBinaryReader(this);
      this.refBinWriter = new ReflectionBinaryWriter(this);
    }
    create(value) {
      let message = reflectionCreate(this);
      if (value !== void 0) {
        reflectionMergePartial(this, message, value);
      }
      return message;
    }
    /**
     * Clone the message.
     *
     * Unknown fields are discarded.
     */
    clone(message) {
      let copy = this.create();
      reflectionMergePartial(this, copy, message);
      return copy;
    }
    /**
     * Determines whether two message of the same type have the same field values.
     * Checks for deep equality, traversing repeated fields, oneof groups, maps
     * and messages recursively.
     * Will also return true if both messages are `undefined`.
     */
    equals(a2, b) {
      return reflectionEquals(this, a2, b);
    }
    /**
     * Is the given value assignable to our message type
     * and contains no [excess properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks)?
     */
    is(arg, depth = this.defaultCheckDepth) {
      return this.refTypeCheck.is(arg, depth, false);
    }
    /**
     * Is the given value assignable to our message type,
     * regardless of [excess properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks)?
     */
    isAssignable(arg, depth = this.defaultCheckDepth) {
      return this.refTypeCheck.is(arg, depth, true);
    }
    /**
     * Copy partial data into the target message.
     */
    mergePartial(target, source) {
      reflectionMergePartial(this, target, source);
    }
    /**
     * Create a new message from binary format.
     */
    fromBinary(data, options) {
      let opt = binaryReadOptions(options);
      return this.internalBinaryRead(opt.readerFactory(data), data.byteLength, opt);
    }
    /**
     * Read a new message from a JSON value.
     */
    fromJson(json, options) {
      return this.internalJsonRead(json, jsonReadOptions(options));
    }
    /**
     * Read a new message from a JSON string.
     * This is equivalent to `T.fromJson(JSON.parse(json))`.
     */
    fromJsonString(json, options) {
      let value = JSON.parse(json);
      return this.fromJson(value, options);
    }
    /**
     * Write the message to canonical JSON value.
     */
    toJson(message, options) {
      return this.internalJsonWrite(message, jsonWriteOptions(options));
    }
    /**
     * Convert the message to canonical JSON string.
     * This is equivalent to `JSON.stringify(T.toJson(t))`
     */
    toJsonString(message, options) {
      var _a2;
      let value = this.toJson(message, options);
      return JSON.stringify(value, null, (_a2 = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a2 !== void 0 ? _a2 : 0);
    }
    /**
     * Write the message to binary format.
     */
    toBinary(message, options) {
      let opt = binaryWriteOptions(options);
      return this.internalBinaryWrite(message, opt.writerFactory(), opt).finish();
    }
    /**
     * This is an internal method. If you just want to read a message from
     * JSON, use `fromJson()` or `fromJsonString()`.
     *
     * Reads JSON value and merges the fields into the target
     * according to protobuf rules. If the target is omitted,
     * a new instance is created first.
     */
    internalJsonRead(json, options, target) {
      if (json !== null && typeof json == "object" && !Array.isArray(json)) {
        let message = target !== null && target !== void 0 ? target : this.create();
        this.refJsonReader.read(json, message, options);
        return message;
      }
      throw new Error(`Unable to parse message ${this.typeName} from JSON ${typeofJsonValue(json)}.`);
    }
    /**
     * This is an internal method. If you just want to write a message
     * to JSON, use `toJson()` or `toJsonString().
     *
     * Writes JSON value and returns it.
     */
    internalJsonWrite(message, options) {
      return this.refJsonWriter.write(message, options);
    }
    /**
     * This is an internal method. If you just want to write a message
     * in binary format, use `toBinary()`.
     *
     * Serializes the message in binary format and appends it to the given
     * writer. Returns passed writer.
     */
    internalBinaryWrite(message, writer, options) {
      this.refBinWriter.write(message, writer, options);
      return writer;
    }
    /**
     * This is an internal method. If you just want to read a message from
     * binary data, use `fromBinary()`.
     *
     * Reads data from binary format and merges the fields into
     * the target according to protobuf rules. If the target is
     * omitted, a new instance is created first.
     */
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create();
      this.refBinReader.read(reader, message, options, length);
      return message;
    }
  };

  // lib/protos/dmView.js
  var CommandDm$Type = class extends MessageType {
    constructor() {
      super("CommandDm", [
        {
          no: 1,
          name: "id",
          kind: "scalar",
          T: 3,
          L: 0
          /*LongType.BIGINT*/
        },
        {
          no: 2,
          name: "oid",
          kind: "scalar",
          T: 3,
          L: 0
          /*LongType.BIGINT*/
        },
        {
          no: 3,
          name: "mid",
          kind: "scalar",
          T: 3,
          L: 0
          /*LongType.BIGINT*/
        },
        {
          no: 4,
          name: "command",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 5,
          name: "content",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 6,
          name: "progress",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 7,
          name: "ctime",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 8,
          name: "mtime",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 9,
          name: "extra",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 10,
          name: "idStr",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { id: 0n, oid: 0n, mid: 0n, command: "", content: "", progress: 0, ctime: "", mtime: "", extra: "", idStr: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int64 id */
          1:
            message.id = reader.int64().toBigInt();
            break;
          case /* int64 oid */
          2:
            message.oid = reader.int64().toBigInt();
            break;
          case /* int64 mid */
          3:
            message.mid = reader.int64().toBigInt();
            break;
          case /* string command */
          4:
            message.command = reader.string();
            break;
          case /* string content */
          5:
            message.content = reader.string();
            break;
          case /* int32 progress */
          6:
            message.progress = reader.int32();
            break;
          case /* string ctime */
          7:
            message.ctime = reader.string();
            break;
          case /* string mtime */
          8:
            message.mtime = reader.string();
            break;
          case /* string extra */
          9:
            message.extra = reader.string();
            break;
          case /* string idStr */
          10:
            message.idStr = reader.string();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.id !== 0n)
        writer.tag(1, WireType.Varint).int64(message.id);
      if (message.oid !== 0n)
        writer.tag(2, WireType.Varint).int64(message.oid);
      if (message.mid !== 0n)
        writer.tag(3, WireType.Varint).int64(message.mid);
      if (message.command !== "")
        writer.tag(4, WireType.LengthDelimited).string(message.command);
      if (message.content !== "")
        writer.tag(5, WireType.LengthDelimited).string(message.content);
      if (message.progress !== 0)
        writer.tag(6, WireType.Varint).int32(message.progress);
      if (message.ctime !== "")
        writer.tag(7, WireType.LengthDelimited).string(message.ctime);
      if (message.mtime !== "")
        writer.tag(8, WireType.LengthDelimited).string(message.mtime);
      if (message.extra !== "")
        writer.tag(9, WireType.LengthDelimited).string(message.extra);
      if (message.idStr !== "")
        writer.tag(10, WireType.LengthDelimited).string(message.idStr);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var CommandDm = new CommandDm$Type();
  var DmView$Type = class extends MessageType {
    constructor() {
      super("DmView", [
        { no: 1, name: "commandDms", kind: "message", repeat: 1, T: () => CommandDm }
      ]);
    }
    create(value) {
      const message = { commandDms: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated CommandDm commandDms */
          1:
            message.commandDms.push(CommandDm.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.commandDms.length; i++)
        CommandDm.internalBinaryWrite(message.commandDms[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var DmView = new DmView$Type();
  var DmViewReply$Type = class extends MessageType {
    constructor() {
      super("DmViewReply", [
        { no: 22, name: "dmView", kind: "message", T: () => DmView }
      ]);
    }
    create(value) {
      const message = {};
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* DmView dmView */
          22:
            message.dmView = DmView.internalBinaryRead(reader, reader.uint32(), options, message.dmView);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.dmView)
        DmView.internalBinaryWrite(message.dmView, writer.tag(22, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var DmViewReply = new DmViewReply$Type();

  // lib/client.js
  var c = class {
    constructor(e, t, s) {
      this._times = /* @__PURE__ */ new Map();
      this.name = e ?? "", this.debug = s?.debug ?? false, e && this.log(`${e} Start`), this.className = t ?? "", this.init();
    }
    static getInstance(e, t) {
      let s = typeof $task < "u" ? "QuanX" : "Surge";
      return c.instances[s] || (c.instances[s] = c.classNames[s](e, s, t)), c.instances[s];
    }
    createProxy(e) {
      return new Proxy(e, { get: this.getFn, set: this.setFn });
    }
    getFn(e, t, s) {
      return e[t];
    }
    setFn(e, t, s, n) {
      return e[t] = s, true;
    }
    getJSON(e, t = {}) {
      let s = this.getVal(e);
      return s ? JSON.parse(s) : t;
    }
    setJSON(e, t) {
      this.setVal(JSON.stringify(e), t);
    }
    msg(e = this.name, t = "", s = "", n) {
    }
    log(e) {
      this.debug && (typeof e == "object" && (e = JSON.stringify(e)), console.log(e));
    }
    timeStart(e) {
      this._times.set(e, Date.now());
    }
    timeEnd(e) {
      if (this._times?.has(e)) {
        let t = Date.now() - this._times.get(e);
        this.log(`${e}: ${t}ms`), this._times.delete(e);
      } else
        this.log(`Timer with label ${e} does not exist.`);
    }
    exit() {
      $done({});
    }
    reject() {
      $done();
    }
  };
  var a = c;
  a.instances = {}, a.classNames = { QuanX: (e, t, s) => new u(e, t, s), Surge: (e, t, s) => new y(e, t, s) };
  var g = class extends a {
    getFn(e, t, s) {
      let n = g.clientAdapter[t] || t;
      return super.getFn(e, n, s);
    }
    setFn(e, t, s, n) {
      let r = g.clientAdapter[t] || t;
      return super.setFn(e, r, s, n);
    }
    init() {
      try {
        this.request = this.createProxy($request), this.response = this.createProxy($response);
      } catch (e) {
        this.log(e.toString());
      }
    }
    getVal(e) {
      return $persistentStore.read(e);
    }
    setVal(e, t) {
      $persistentStore.write(e, t);
    }
    msg(e = this.name, t = "", s = "", n) {
      $notification.post(e, t, s, { url: n ?? "" });
    }
    async fetch(e) {
      return await new Promise((t, s) => {
        let { method: n, body: r, bodyBytes: i, ...d } = e, f = i ?? r, l = f instanceof Uint8Array;
        $httpClient[n.toLowerCase()]({ ...d, body: f, "binary-mode": l }, (p, h, b) => {
          p && s(p);
          let R = l ? "bodyBytes" : "body";
          t({ status: h.status, headers: h.headers, [R]: b });
        });
      });
    }
    done(e) {
      let t = e.response ?? e, s, n;
      t.bodyBytes ? (s = t.bodyBytes, delete t.bodyBytes, n = { ...e }, n.response ? n.response.body = s : n.body = s) : n = e, $done(n);
    }
  };
  var y = g;
  y.clientAdapter = { bodyBytes: "body" };
  var o = class extends a {
    static transferBodyBytes(e, t) {
      return e instanceof ArrayBuffer ? t === "Uint8Array" ? new Uint8Array(e) : e : e instanceof Uint8Array && t === "ArrayBuffer" ? e.buffer.slice(e.byteOffset, e.byteLength + e.byteOffset) : e;
    }
    init() {
      try {
        this.request = this.createProxy($request), this.response = this.createProxy($response);
      } catch (e) {
        this.log(e.toString());
      }
    }
    getFn(e, t, s) {
      let n = o.clientAdapter[t] || t, r = super.getFn(e, n, s);
      return t === "bodyBytes" && (r = o.transferBodyBytes(r, "Uint8Array")), r;
    }
    setFn(e, t, s, n) {
      let r = o.clientAdapter[t] || t, i = s;
      return t === "bodyBytes" && (i = o.transferBodyBytes(i, "Uint8Array")), super.setFn(e, r, i, n);
    }
    getVal(e) {
      return $prefs.valueForKey(e)?.replace(/\0/g, "");
    }
    setVal(e, t) {
      $prefs.setValueForKey(e, t);
    }
    msg(e = this.name, t = "", s = "", n) {
      $notify(e, t, s, { "open-url": n ?? "" });
    }
    async fetch(e) {
      return await new Promise((t) => {
        let s = { url: "", method: "GET" };
        for (let [n, r] of Object.entries(e))
          n === "id" ? s.sessionIndex = r : n === "bodyBytes" ? s.bodyBytes = o.transferBodyBytes(r, "ArrayBuffer") : s[n] = r;
        e.bodyBytes && delete s.body, $task.fetch(s).then((n) => {
          let r = { status: 200, headers: {} };
          for (let [i, d] of Object.entries(n))
            i === "sessionIndex" ? r.id = d : i === "bodyBytes" ? r.bodyBytes = o.transferBodyBytes(d, "Uint8Array") : i === "statusCode" ? r.status = d : r[i] = d;
          t(r);
        });
      });
    }
    done(e) {
      let t = e.response ?? e, s = {};
      for (let [n, r] of Object.entries(t))
        n === "status" ? s.status = `HTTP/1.1 ${r}` : n === "bodyBytes" ? s.bodyBytes = o.transferBodyBytes(r, "ArrayBuffer") : s[n] = r;
      $done(s);
    }
  };
  var u = o;
  u.clientAdapter = { id: "sessionIndex", status: "statusCode" };

  // src/utils.js
  var $ = a.getInstance("Bilibili Helper", { debug: false });
  function newRawBody(body2) {
    const checksum = Checksum(body2.length);
    const rawBody = new Uint8Array(5 + body2.length);
    rawBody[0] = 0;
    rawBody.set(checksum, 1);
    rawBody.set(body2, 5);
    return rawBody;
  }
  function Checksum(num) {
    let arr = new ArrayBuffer(4);
    let view = new DataView(arr);
    view.setUint32(0, num, false);
    return new Uint8Array(arr);
  }
  function modifyBody(IMessage, message) {
    const binaryBody = IMessage.toBinary(message);
    $.done({ bodyBytes: newRawBody(binaryBody) });
  }

  // lib/protos/modeStatus.js
  var ModeStatus$Type = class extends MessageType {
    constructor() {
      super("ModeStatus", [
        { no: 1, name: "modes", kind: "message", repeat: 1, T: () => Mode }
      ]);
    }
    create(value) {
      const message = { modes: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated Mode modes */
          1:
            message.modes.push(Mode.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.modes.length; i++)
        Mode.internalBinaryWrite(message.modes[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var ModeStatus = new ModeStatus$Type();
  var Mode$Type = class extends MessageType {
    constructor() {
      super("Mode", [
        {
          no: 1,
          name: "id",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 2,
          name: "name",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 4,
          name: "f4",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        { no: 5, name: "f5", kind: "message", T: () => F5 }
      ]);
    }
    create(value) {
      const message = { id: 0, name: "", f4: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 id */
          1:
            message.id = reader.int32();
            break;
          case /* string name */
          2:
            message.name = reader.string();
            break;
          case /* int32 f4 */
          4:
            message.f4 = reader.int32();
            break;
          case /* F5 f5 */
          5:
            message.f5 = F5.internalBinaryRead(reader, reader.uint32(), options, message.f5);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.id !== 0)
        writer.tag(1, WireType.Varint).int32(message.id);
      if (message.name !== "")
        writer.tag(2, WireType.LengthDelimited).string(message.name);
      if (message.f4 !== 0)
        writer.tag(4, WireType.Varint).int32(message.f4);
      if (message.f5)
        F5.internalBinaryWrite(message.f5, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var Mode = new Mode$Type();
  var F5$Type = class extends MessageType {
    constructor() {
      super("F5", [
        {
          no: 1,
          name: "f1",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { f1: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 f1 */
          1:
            message.f1 = reader.int32();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.f1 !== 0)
        writer.tag(1, WireType.Varint).int32(message.f1);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var F5 = new F5$Type();

  // lib/google/protobuf/any.js
  var Any$Type = class extends MessageType {
    constructor() {
      super("google.protobuf.Any", [
        {
          no: 1,
          name: "type_url",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 2,
          name: "value",
          kind: "scalar",
          T: 12
          /*ScalarType.BYTES*/
        }
      ]);
    }
    /**
     * Pack the message into a new `Any`.
     *
     * Uses 'type.googleapis.com/full.type.name' as the type URL.
     */
    pack(message, type) {
      return {
        typeUrl: this.typeNameToUrl(type.typeName),
        value: type.toBinary(message)
      };
    }
    /**
     * Unpack the message from the `Any`.
     */
    unpack(any, type, options) {
      if (!this.contains(any, type))
        throw new Error("Cannot unpack google.protobuf.Any with typeUrl '" + any.typeUrl + "' as " + type.typeName + ".");
      return type.fromBinary(any.value, options);
    }
    /**
     * Does the given `Any` contain a packed message of the given type?
     */
    contains(any, type) {
      if (!any.typeUrl.length)
        return false;
      let wants = typeof type == "string" ? type : type.typeName;
      let has = this.typeUrlToName(any.typeUrl);
      return wants === has;
    }
    /**
     * Convert the message to canonical JSON value.
     *
     * You have to provide the `typeRegistry` option so that the
     * packed message can be converted to JSON.
     *
     * The `typeRegistry` option is also required to read
     * `google.protobuf.Any` from JSON format.
     */
    internalJsonWrite(any, options) {
      var _a2;
      if (any.typeUrl === "")
        return {};
      let typeName = this.typeUrlToName(any.typeUrl);
      let opt = jsonWriteOptions(options);
      let type = (_a2 = opt.typeRegistry) === null || _a2 === void 0 ? void 0 : _a2.find((t) => t.typeName === typeName);
      if (!type)
        throw new globalThis.Error("Unable to convert google.protobuf.Any with typeUrl '" + any.typeUrl + "' to JSON. The specified type " + typeName + " is not available in the type registry.");
      let value = type.fromBinary(any.value, { readUnknownField: false });
      let json = type.internalJsonWrite(value, opt);
      if (typeName.startsWith("google.protobuf.") || !isJsonObject(json))
        json = { value: json };
      json["@type"] = any.typeUrl;
      return json;
    }
    internalJsonRead(json, options, target) {
      var _a2;
      if (!isJsonObject(json))
        throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON " + typeofJsonValue(json) + ".");
      if (typeof json["@type"] != "string" || json["@type"] == "")
        return this.create();
      let typeName = this.typeUrlToName(json["@type"]);
      let type = (_a2 = options === null || options === void 0 ? void 0 : options.typeRegistry) === null || _a2 === void 0 ? void 0 : _a2.find((t) => t.typeName == typeName);
      if (!type)
        throw new globalThis.Error("Unable to parse google.protobuf.Any from JSON. The specified type " + typeName + " is not available in the type registry.");
      let value;
      if (typeName.startsWith("google.protobuf.") && json.hasOwnProperty("value"))
        value = type.fromJson(json["value"], options);
      else {
        let copy = Object.assign({}, json);
        delete copy["@type"];
        value = type.fromJson(copy, options);
      }
      if (target === void 0)
        target = this.create();
      target.typeUrl = json["@type"];
      target.value = type.toBinary(value);
      return target;
    }
    typeNameToUrl(name) {
      if (!name.length)
        throw new Error("invalid type name: " + name);
      return "type.googleapis.com/" + name;
    }
    typeUrlToName(url2) {
      if (!url2.length)
        throw new Error("invalid type url: " + url2);
      let slash = url2.lastIndexOf("/");
      let name = slash > 0 ? url2.substring(slash + 1) : url2;
      if (!name.length)
        throw new Error("invalid type url: " + url2);
      return name;
    }
    create(value) {
      const message = { typeUrl: "", value: new Uint8Array(0) };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string type_url */
          1:
            message.typeUrl = reader.string();
            break;
          case /* bytes value */
          2:
            message.value = reader.bytes();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.typeUrl !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.typeUrl);
      if (message.value.length)
        writer.tag(2, WireType.LengthDelimited).bytes(message.value);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var Any = new Any$Type();

  // lib/protos/view.js
  var CM$Type = class extends MessageType {
    constructor() {
      super("CM", [
        { no: 1, name: "source_content", kind: "message", T: () => Any }
      ]);
    }
    create(value) {
      const message = {};
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* google.protobuf.Any source_content */
          1:
            message.sourceContent = Any.internalBinaryRead(reader, reader.uint32(), options, message.sourceContent);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.sourceContent)
        Any.internalBinaryWrite(message.sourceContent, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var CM = new CM$Type();
  var CMConfig$Type = class extends MessageType {
    constructor() {
      super("CMConfig", [
        { no: 1, name: "ads_control", kind: "message", T: () => Any }
      ]);
    }
    create(value) {
      const message = {};
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* google.protobuf.Any ads_control */
          1:
            message.adsControl = Any.internalBinaryRead(reader, reader.uint32(), options, message.adsControl);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.adsControl)
        Any.internalBinaryWrite(message.adsControl, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var CMConfig = new CMConfig$Type();
  var CmIpad$Type = class extends MessageType {
    constructor() {
      super("CmIpad", [
        { no: 1, name: "cm", kind: "message", T: () => CM },
        {
          no: 4,
          name: "duration",
          kind: "scalar",
          T: 3,
          L: 0
          /*LongType.BIGINT*/
        },
        {
          no: 5,
          name: "aid",
          kind: "scalar",
          T: 3,
          L: 0
          /*LongType.BIGINT*/
        }
      ]);
    }
    create(value) {
      const message = { duration: 0n, aid: 0n };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* CM cm */
          1:
            message.cm = CM.internalBinaryRead(reader, reader.uint32(), options, message.cm);
            break;
          case /* int64 duration */
          4:
            message.duration = reader.int64().toBigInt();
            break;
          case /* int64 aid */
          5:
            message.aid = reader.int64().toBigInt();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.cm)
        CM.internalBinaryWrite(message.cm, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      if (message.duration !== 0n)
        writer.tag(4, WireType.Varint).int64(message.duration);
      if (message.aid !== 0n)
        writer.tag(5, WireType.Varint).int64(message.aid);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var CmIpad = new CmIpad$Type();
  var ViewReply$Type = class extends MessageType {
    constructor() {
      super("ViewReply", [
        { no: 30, name: "cms", kind: "message", repeat: 1, T: () => CM },
        { no: 31, name: "cm_config", kind: "message", T: () => CMConfig },
        { no: 41, name: "cm_ipad", kind: "message", T: () => CmIpad }
      ]);
    }
    create(value) {
      const message = { cms: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated CM cms */
          30:
            message.cms.push(CM.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* CMConfig cm_config */
          31:
            message.cmConfig = CMConfig.internalBinaryRead(reader, reader.uint32(), options, message.cmConfig);
            break;
          case /* CmIpad cm_ipad */
          41:
            message.cmIpad = CmIpad.internalBinaryRead(reader, reader.uint32(), options, message.cmIpad);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.cms.length; i++)
        CM.internalBinaryWrite(message.cms[i], writer.tag(30, WireType.LengthDelimited).fork(), options).join();
      if (message.cmConfig)
        CMConfig.internalBinaryWrite(message.cmConfig, writer.tag(31, WireType.LengthDelimited).fork(), options).join();
      if (message.cmIpad)
        CmIpad.internalBinaryWrite(message.cmIpad, writer.tag(41, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var ViewReply = new ViewReply$Type();

  // lib/protos/mainReply.js
  var MainListReply$Type = class extends MessageType {
    constructor() {
      super("MainListReply", [
        { no: 11, name: "cm", kind: "message", T: () => CM }
      ]);
    }
    create(value) {
      const message = {};
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* CM cm */
          11:
            message.cm = CM.internalBinaryRead(reader, reader.uint32(), options, message.cm);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.cm)
        CM.internalBinaryWrite(message.cm, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var MainListReply = new MainListReply$Type();

  // lib/protos/searchAll.js
  var Item$Type = class extends MessageType {
    constructor() {
      super("Item", [
        {
          no: 4,
          name: "linktype",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { linktype: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string linktype */
          4:
            message.linktype = reader.string();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.linktype !== "")
        writer.tag(4, WireType.LengthDelimited).string(message.linktype);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var Item = new Item$Type();
  var SearchAll$Type = class extends MessageType {
    constructor() {
      super("SearchAll", [
        { no: 4, name: "items", kind: "message", repeat: 1, T: () => Item }
      ]);
    }
    create(value) {
      const message = { items: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated Item items */
          4:
            message.items.push(Item.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.items.length; i++)
        Item.internalBinaryWrite(message.items[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var SearchAll = new SearchAll$Type();

  // lib/protos/dynAll.js
  var DynamicType;
  (function(DynamicType2) {
    DynamicType2[DynamicType2["dyn_none"] = 0] = "dyn_none";
    DynamicType2[DynamicType2["forward"] = 1] = "forward";
    DynamicType2[DynamicType2["av"] = 2] = "av";
    DynamicType2[DynamicType2["pgc"] = 3] = "pgc";
    DynamicType2[DynamicType2["courses"] = 4] = "courses";
    DynamicType2[DynamicType2["fold"] = 5] = "fold";
    DynamicType2[DynamicType2["word"] = 6] = "word";
    DynamicType2[DynamicType2["draw"] = 7] = "draw";
    DynamicType2[DynamicType2["article"] = 8] = "article";
    DynamicType2[DynamicType2["music"] = 9] = "music";
    DynamicType2[DynamicType2["common_square"] = 10] = "common_square";
    DynamicType2[DynamicType2["common_vertical"] = 11] = "common_vertical";
    DynamicType2[DynamicType2["live"] = 12] = "live";
    DynamicType2[DynamicType2["medialist"] = 13] = "medialist";
    DynamicType2[DynamicType2["courses_season"] = 14] = "courses_season";
    DynamicType2[DynamicType2["ad"] = 15] = "ad";
    DynamicType2[DynamicType2["applet"] = 16] = "applet";
    DynamicType2[DynamicType2["subscription"] = 17] = "subscription";
    DynamicType2[DynamicType2["live_rcmd"] = 18] = "live_rcmd";
    DynamicType2[DynamicType2["banner"] = 19] = "banner";
    DynamicType2[DynamicType2["ugc_season"] = 20] = "ugc_season";
    DynamicType2[DynamicType2["subscription_new"] = 21] = "subscription_new";
    DynamicType2[DynamicType2["story"] = 22] = "story";
    DynamicType2[DynamicType2["topic_rcmd"] = 23] = "topic_rcmd";
  })(DynamicType || (DynamicType = {}));
  var DynamicItem$Type = class extends MessageType {
    constructor() {
      super("DynamicItem", [
        { no: 1, name: "card_type", kind: "enum", T: () => ["DynamicType", DynamicType] },
        { no: 2, name: "item_type", kind: "enum", T: () => ["DynamicType", DynamicType] },
        {
          no: 5,
          name: "has_fold",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 6,
          name: "server_info",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { cardType: 0, itemType: 0, hasFold: 0, serverInfo: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* DynamicType card_type */
          1:
            message.cardType = reader.int32();
            break;
          case /* DynamicType item_type */
          2:
            message.itemType = reader.int32();
            break;
          case /* int32 has_fold */
          5:
            message.hasFold = reader.int32();
            break;
          case /* string server_info */
          6:
            message.serverInfo = reader.string();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.cardType !== 0)
        writer.tag(1, WireType.Varint).int32(message.cardType);
      if (message.itemType !== 0)
        writer.tag(2, WireType.Varint).int32(message.itemType);
      if (message.hasFold !== 0)
        writer.tag(5, WireType.Varint).int32(message.hasFold);
      if (message.serverInfo !== "")
        writer.tag(6, WireType.LengthDelimited).string(message.serverInfo);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var DynamicItem = new DynamicItem$Type();
  var DynamicList$Type = class extends MessageType {
    constructor() {
      super("DynamicList", [
        { no: 1, name: "list", kind: "message", repeat: 1, T: () => DynamicItem },
        {
          no: 2,
          name: "update_num",
          kind: "scalar",
          T: 3,
          L: 0
          /*LongType.BIGINT*/
        },
        {
          no: 3,
          name: "history_offset",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 4,
          name: "update_baseline",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 5,
          name: "has_more",
          kind: "scalar",
          T: 8
          /*ScalarType.BOOL*/
        }
      ]);
    }
    create(value) {
      const message = { list: [], updateNum: 0n, historyOffset: "", updateBaseline: "", hasMore: false };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated DynamicItem list */
          1:
            message.list.push(DynamicItem.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* int64 update_num */
          2:
            message.updateNum = reader.int64().toBigInt();
            break;
          case /* string history_offset */
          3:
            message.historyOffset = reader.string();
            break;
          case /* string update_baseline */
          4:
            message.updateBaseline = reader.string();
            break;
          case /* bool has_more */
          5:
            message.hasMore = reader.bool();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.list.length; i++)
        DynamicItem.internalBinaryWrite(message.list[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      if (message.updateNum !== 0n)
        writer.tag(2, WireType.Varint).int64(message.updateNum);
      if (message.historyOffset !== "")
        writer.tag(3, WireType.LengthDelimited).string(message.historyOffset);
      if (message.updateBaseline !== "")
        writer.tag(4, WireType.LengthDelimited).string(message.updateBaseline);
      if (message.hasMore !== false)
        writer.tag(5, WireType.Varint).bool(message.hasMore);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var DynamicList = new DynamicList$Type();
  var TopicList$Type = class extends MessageType {
    constructor() {
      super("TopicList", [
        {
          no: 1,
          name: "title",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { title: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string title */
          1:
            message.title = reader.string();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.title !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.title);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var TopicList = new TopicList$Type();
  var DynAllReply$Type = class extends MessageType {
    constructor() {
      super("DynAllReply", [
        { no: 1, name: "dynamic_list", kind: "message", T: () => DynamicList },
        { no: 3, name: "topic_list", kind: "message", T: () => TopicList }
      ]);
    }
    create(value) {
      const message = {};
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* DynamicList dynamic_list */
          1:
            message.dynamicList = DynamicList.internalBinaryRead(reader, reader.uint32(), options, message.dynamicList);
            break;
          case /* TopicList topic_list */
          3:
            message.topicList = TopicList.internalBinaryRead(reader, reader.uint32(), options, message.topicList);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.dynamicList)
        DynamicList.internalBinaryWrite(message.dynamicList, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      if (message.topicList)
        TopicList.internalBinaryWrite(message.topicList, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var DynAllReply = new DynAllReply$Type();

  // lib/protos/viewProgress.js
  var ViewProgress$Type = class extends MessageType {
    constructor() {
      super("ViewProgress", [
        { no: 1, name: "dm", kind: "message", T: () => DM }
      ]);
    }
    create(value) {
      const message = {};
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* DM dm */
          1:
            message.dm = DM.internalBinaryRead(reader, reader.uint32(), options, message.dm);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.dm)
        DM.internalBinaryWrite(message.dm, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var ViewProgress = new ViewProgress$Type();
  var DM$Type = class extends MessageType {
    constructor() {
      super("DM", [
        { no: 2, name: "commandDms", kind: "message", repeat: 1, T: () => CommandDm }
      ]);
    }
    create(value) {
      const message = { commandDms: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated CommandDm commandDms */
          2:
            message.commandDms.push(CommandDm.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.commandDms.length; i++)
        CommandDm.internalBinaryWrite(message.commandDms[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var DM = new DM$Type();

  // lib/protos/viewUnite.js
  var TabType;
  (function(TabType2) {
    TabType2[TabType2["TAB_NONE"] = 0] = "TAB_NONE";
    TabType2[TabType2["TAB_INTRODUCTION"] = 1] = "TAB_INTRODUCTION";
    TabType2[TabType2["TAB_REPLY"] = 2] = "TAB_REPLY";
    TabType2[TabType2["TAB_OGV_ACTIVITY"] = 3] = "TAB_OGV_ACTIVITY";
  })(TabType || (TabType = {}));
  var ModuleType;
  (function(ModuleType2) {
    ModuleType2[ModuleType2["UNKNOWN"] = 0] = "UNKNOWN";
    ModuleType2[ModuleType2["OGV_INTRODUCTION"] = 1] = "OGV_INTRODUCTION";
    ModuleType2[ModuleType2["OGV_TITLE"] = 2] = "OGV_TITLE";
    ModuleType2[ModuleType2["UGC_HEADLINE"] = 3] = "UGC_HEADLINE";
    ModuleType2[ModuleType2["UGC_INTRODUCTION"] = 4] = "UGC_INTRODUCTION";
    ModuleType2[ModuleType2["KING_POSITION"] = 5] = "KING_POSITION";
    ModuleType2[ModuleType2["MASTER_USER_LIST"] = 6] = "MASTER_USER_LIST";
    ModuleType2[ModuleType2["STAFFS"] = 7] = "STAFFS";
    ModuleType2[ModuleType2["HONOR"] = 8] = "HONOR";
    ModuleType2[ModuleType2["OWNER"] = 9] = "OWNER";
    ModuleType2[ModuleType2["PAGE"] = 10] = "PAGE";
    ModuleType2[ModuleType2["ACTIVITY_RESERVE"] = 11] = "ACTIVITY_RESERVE";
    ModuleType2[ModuleType2["LIVE_ORDER"] = 12] = "LIVE_ORDER";
    ModuleType2[ModuleType2["POSITIVE"] = 13] = "POSITIVE";
    ModuleType2[ModuleType2["SECTION"] = 14] = "SECTION";
    ModuleType2[ModuleType2["RELATE"] = 15] = "RELATE";
    ModuleType2[ModuleType2["PUGV"] = 16] = "PUGV";
    ModuleType2[ModuleType2["COLLECTION_CARD"] = 17] = "COLLECTION_CARD";
    ModuleType2[ModuleType2["ACTIVITY"] = 18] = "ACTIVITY";
    ModuleType2[ModuleType2["CHARACTER"] = 19] = "CHARACTER";
    ModuleType2[ModuleType2["FOLLOW_LAYER"] = 20] = "FOLLOW_LAYER";
    ModuleType2[ModuleType2["OGV_SEASONS"] = 21] = "OGV_SEASONS";
    ModuleType2[ModuleType2["UGC_SEASON"] = 22] = "UGC_SEASON";
    ModuleType2[ModuleType2["OGV_LIVE_RESERVE"] = 23] = "OGV_LIVE_RESERVE";
    ModuleType2[ModuleType2["COMBINATION_EPISODE"] = 24] = "COMBINATION_EPISODE";
    ModuleType2[ModuleType2["SPONSOR"] = 25] = "SPONSOR";
    ModuleType2[ModuleType2["ACTIVITY_ENTRANCE"] = 26] = "ACTIVITY_ENTRANCE";
    ModuleType2[ModuleType2["THEATRE_HOT_TOPIC"] = 27] = "THEATRE_HOT_TOPIC";
    ModuleType2[ModuleType2["RELATED_RECOMMEND"] = 28] = "RELATED_RECOMMEND";
    ModuleType2[ModuleType2["PAY_BAR"] = 29] = "PAY_BAR";
    ModuleType2[ModuleType2["BANNER"] = 30] = "BANNER";
    ModuleType2[ModuleType2["AUDIO"] = 31] = "AUDIO";
    ModuleType2[ModuleType2["AGG_CARD"] = 32] = "AGG_CARD";
    ModuleType2[ModuleType2["SINGLE_EP"] = 33] = "SINGLE_EP";
    ModuleType2[ModuleType2["LIKE_COMMENT"] = 34] = "LIKE_COMMENT";
    ModuleType2[ModuleType2["ATTENTION_RECOMMEND"] = 35] = "ATTENTION_RECOMMEND";
    ModuleType2[ModuleType2["COVENANTER"] = 36] = "COVENANTER";
  })(ModuleType || (ModuleType = {}));
  var RelateCardType;
  (function(RelateCardType2) {
    RelateCardType2[RelateCardType2["CARD_TYPE_UNKNOWN"] = 0] = "CARD_TYPE_UNKNOWN";
    RelateCardType2[RelateCardType2["AV"] = 1] = "AV";
    RelateCardType2[RelateCardType2["BANGUMI"] = 2] = "BANGUMI";
    RelateCardType2[RelateCardType2["RESOURCE"] = 3] = "RESOURCE";
    RelateCardType2[RelateCardType2["GAME"] = 4] = "GAME";
    RelateCardType2[RelateCardType2["CM_TYPE"] = 5] = "CM_TYPE";
    RelateCardType2[RelateCardType2["LIVE"] = 6] = "LIVE";
    RelateCardType2[RelateCardType2["AI_RECOMMEND"] = 7] = "AI_RECOMMEND";
    RelateCardType2[RelateCardType2["BANGUMI_AV"] = 8] = "BANGUMI_AV";
    RelateCardType2[RelateCardType2["BANGUMI_UGC"] = 9] = "BANGUMI_UGC";
    RelateCardType2[RelateCardType2["SPECIAL"] = 10] = "SPECIAL";
  })(RelateCardType || (RelateCardType = {}));
  var RelateCard$Type = class extends MessageType {
    constructor() {
      super("viewunite.v1.RelateCard", [
        { no: 1, name: "relate_card_type", kind: "enum", T: () => ["viewunite.v1.RelateCardType", RelateCardType] }
      ]);
    }
    create(value) {
      const message = { relateCardType: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* viewunite.v1.RelateCardType relate_card_type */
          1:
            message.relateCardType = reader.int32();
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.relateCardType !== 0)
        writer.tag(1, WireType.Varint).int32(message.relateCardType);
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var RelateCard = new RelateCard$Type();
  var Relates$Type = class extends MessageType {
    constructor() {
      super("viewunite.v1.Relates", [
        { no: 1, name: "cards", kind: "message", repeat: 1, T: () => RelateCard }
      ]);
    }
    create(value) {
      const message = { cards: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated viewunite.v1.RelateCard cards */
          1:
            message.cards.push(RelateCard.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.cards.length; i++)
        RelateCard.internalBinaryWrite(message.cards[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var Relates = new Relates$Type();
  var CommonModule$Type = class extends MessageType {
    constructor() {
      super("viewunite.v1.CommonModule", [
        { no: 1, name: "type", kind: "enum", T: () => ["viewunite.v1.ModuleType", ModuleType] },
        { no: 22, name: "relates", kind: "message", oneof: "data", T: () => Relates }
      ]);
    }
    create(value) {
      const message = { type: 0, data: { oneofKind: void 0 } };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* viewunite.v1.ModuleType type */
          1:
            message.type = reader.int32();
            break;
          case /* viewunite.v1.Relates relates */
          22:
            message.data = {
              oneofKind: "relates",
              relates: Relates.internalBinaryRead(reader, reader.uint32(), options, message.data.relates)
            };
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.type !== 0)
        writer.tag(1, WireType.Varint).int32(message.type);
      if (message.data.oneofKind === "relates")
        Relates.internalBinaryWrite(message.data.relates, writer.tag(22, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var CommonModule = new CommonModule$Type();
  var IntroductionTab$Type = class extends MessageType {
    constructor() {
      super("viewunite.v1.IntroductionTab", [
        {
          no: 1,
          name: "title",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        { no: 2, name: "modules", kind: "message", repeat: 1, T: () => CommonModule }
      ]);
    }
    create(value) {
      const message = { title: "", modules: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string title */
          1:
            message.title = reader.string();
            break;
          case /* repeated viewunite.v1.CommonModule modules */
          2:
            message.modules.push(CommonModule.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.title !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.title);
      for (let i = 0; i < message.modules.length; i++)
        CommonModule.internalBinaryWrite(message.modules[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var IntroductionTab = new IntroductionTab$Type();
  var TabModule$Type = class extends MessageType {
    constructor() {
      super("viewunite.v1.TabModule", [
        { no: 1, name: "tab_type", kind: "enum", T: () => ["viewunite.v1.TabType", TabType] },
        { no: 2, name: "introduction", kind: "message", oneof: "tab", T: () => IntroductionTab }
      ]);
    }
    create(value) {
      const message = { tabType: 0, tab: { oneofKind: void 0 } };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* viewunite.v1.TabType tab_type */
          1:
            message.tabType = reader.int32();
            break;
          case /* viewunite.v1.IntroductionTab introduction */
          2:
            message.tab = {
              oneofKind: "introduction",
              introduction: IntroductionTab.internalBinaryRead(reader, reader.uint32(), options, message.tab.introduction)
            };
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.tabType !== 0)
        writer.tag(1, WireType.Varint).int32(message.tabType);
      if (message.tab.oneofKind === "introduction")
        IntroductionTab.internalBinaryWrite(message.tab.introduction, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var TabModule = new TabModule$Type();
  var Tab$Type = class extends MessageType {
    constructor() {
      super("viewunite.v1.Tab", [
        { no: 1, name: "tab_module", kind: "message", repeat: 1, T: () => TabModule }
      ]);
    }
    create(value) {
      const message = { tabModule: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated viewunite.v1.TabModule tab_module */
          1:
            message.tabModule.push(TabModule.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.tabModule.length; i++)
        TabModule.internalBinaryWrite(message.tabModule[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var Tab = new Tab$Type();
  var CM$Type2 = class extends MessageType {
    constructor() {
      super("viewunite.v1.CM", [
        { no: 1, name: "cm_under_player", kind: "message", T: () => Any },
        { no: 2, name: "ads_control", kind: "message", T: () => Any },
        { no: 3, name: "source_content", kind: "message", repeat: 1, T: () => Any }
      ]);
    }
    create(value) {
      const message = { sourceContent: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* google.protobuf.Any cm_under_player */
          1:
            message.cmUnderPlayer = Any.internalBinaryRead(reader, reader.uint32(), options, message.cmUnderPlayer);
            break;
          case /* google.protobuf.Any ads_control */
          2:
            message.adsControl = Any.internalBinaryRead(reader, reader.uint32(), options, message.adsControl);
            break;
          case /* repeated google.protobuf.Any source_content */
          3:
            message.sourceContent.push(Any.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.cmUnderPlayer)
        Any.internalBinaryWrite(message.cmUnderPlayer, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      if (message.adsControl)
        Any.internalBinaryWrite(message.adsControl, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      for (let i = 0; i < message.sourceContent.length; i++)
        Any.internalBinaryWrite(message.sourceContent[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var CM2 = new CM$Type2();
  var ViewUniteReply$Type = class extends MessageType {
    constructor() {
      super("viewunite.v1.ViewUniteReply", [
        { no: 5, name: "tab", kind: "message", T: () => Tab },
        { no: 7, name: "cm", kind: "message", T: () => CM2 }
      ]);
    }
    create(value) {
      const message = {};
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* viewunite.v1.Tab tab */
          5:
            message.tab = Tab.internalBinaryRead(reader, reader.uint32(), options, message.tab);
            break;
          case /* viewunite.v1.CM cm */
          7:
            message.cm = CM2.internalBinaryRead(reader, reader.uint32(), options, message.cm);
            break;
          default:
            let u2 = options.readUnknownField;
            if (u2 === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u2 !== false)
              (u2 === true ? UnknownFieldHandler.onRead : u2)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.tab)
        Tab.internalBinaryWrite(message.tab, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
      if (message.cm)
        CM2.internalBinaryWrite(message.cm, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
      let u2 = options.writeUnknownFields;
      if (u2 !== false)
        (u2 == true ? UnknownFieldHandler.onWrite : u2)(this.typeName, message, writer);
      return writer;
    }
  };
  var ViewUniteReply = new ViewUniteReply$Type();

  // src/handler.js
  function handleDMView(grpcBody2) {
    const dmMessage = DmViewReply.fromBinary(grpcBody2);
    if (dmMessage.dmView?.commandDms?.length) {
      dmMessage.dmView.commandDms.length = 0;
      modifyBody(DmViewReply, dmMessage);
    }
  }
  function handleModeStatus(grpcBody2) {
    const modeMessage = ModeStatus.fromBinary(grpcBody2);
    const teenagersMode = modeMessage.modes.find(
      (mode) => mode.name === "teenagers"
    );
    if (teenagersMode?.f5?.f1) {
      teenagersMode.f5.f1 = 0;
      modifyBody(ModeStatus, modeMessage);
    }
  }
  function handleV1View(grpcBody2) {
    const viewMessage = ViewReply.fromBinary(grpcBody2);
    delete viewMessage.cmConfig;
    delete viewMessage.cmIpad;
    viewMessage.cms.length = 0;
    modifyBody(ViewReply, viewMessage);
  }
  function handleReplyList(grpcBody2) {
    const mainMessage = MainListReply.fromBinary(grpcBody2);
    delete mainMessage.cm;
    modifyBody(MainListReply, mainMessage);
  }
  function handleSearchAll(grpcBody2) {
    const searchAllMessage = SearchAll.fromBinary(grpcBody2);
    searchAllMessage.items = searchAllMessage.items.filter(
      (item) => !item.linktype.endsWith("_ad")
    );
    modifyBody(SearchAll, searchAllMessage);
  }
  function handleDynAll(grpcBody2) {
    const dynAllMessage = DynAllReply.fromBinary(grpcBody2);
    delete dynAllMessage.topicList;
    dynAllMessage.dynamicList.list = dynAllMessage.dynamicList.list.filter(
      (item) => item.cardType !== DynamicType.ad
    );
    modifyBody(DynAllReply, dynAllMessage);
  }
  function handleViewProgress(grpcBody2) {
    const viewProgressMessage = ViewProgress.fromBinary(grpcBody2);
    delete viewProgressMessage.dm;
    modifyBody(ViewProgress, viewProgressMessage);
  }
  function handleViewUnite(grpcBody2) {
    const viewUniteMessage = ViewUniteReply.fromBinary(grpcBody2);
    delete viewUniteMessage.cm;
    viewUniteMessage?.tab?.tabModule?.forEach((tabModule) => {
      if (tabModule.tab.oneofKind !== "introduction")
        return;
      const relateModule = tabModule.tab.introduction.modules.find(
        (module) => module.type === ModuleType.RELATED_RECOMMEND
      );
      if (relateModule?.data?.oneofKind !== "relates" || !relateModule.data.relates.cards)
        return;
      relateModule.data.relates.cards = relateModule.data.relates.cards.filter(
        (card) => card.relateCardType === RelateCardType.AV
      );
    });
    modifyBody(ViewUniteReply, viewUniteMessage);
  }

  // lib/urls.js
  var URLRegex = /(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/;
  var URLs = class {
    constructor(url2 = "") {
      this.name = "URL v1.0.2";
      if (!url2)
        throw new Error("Empty URL");
      this.parse(url2);
    }
    parse(url2) {
      const {
        scheme,
        host,
        path: path2 = "",
        params
      } = url2.match(URLRegex)?.groups ?? {};
      this.scheme = scheme;
      this.host = host;
      this.path = path2;
      this.params = params ? params.split("&").reduce((result, pair) => {
        const [key, value] = pair.split("=");
        result[key] = value;
        return result;
      }, {}) : {};
    }
    toString() {
      let url2 = this.scheme + "://" + this.host + "/" + this.path;
      if (this.params) {
        url2 += "?" + Object.entries(this.params).reduce((result, [key, value], index) => {
          return result + (index ? "&" : "") + key + "=" + value;
        }, "");
      }
      return url2;
    }
  };

  // main.js
  var $2 = a.getInstance("Bilibili Helper", { debug: false });
  var url = $2.request.url;
  var body = $2.response.bodyBytes;
  var path = new URLs(url).path;
  var decompress = typeof $utils === "object" && typeof $utils?.ungzip === "function" ? $utils.ungzip : gunzipSync;
  var grpcHeader = body.slice(0, 5);
  var grpcBody = body.slice(5);
  if (grpcHeader[0]) {
    grpcBody = decompress(grpcBody);
  }
  console.log(grpcBody instanceof Uint8Array)
  var routeHandlers = {
    "v1.DM/DmView": handleDMView,
    "v1.Teenagers/ModeStatus": handleModeStatus,
    "v1.Reply/MainList": handleReplyList,
    "v1.Search/SearchAll": handleSearchAll,
    "v2.Dynamic/DynAll": handleDynAll,
    "viewunite.v1.View/View": handleViewUnite,
    "view.v1.View/ViewProgress": handleViewProgress,
    "view.v1.View/View": handleV1View
  };
  for (let route in routeHandlers) {
    if (path.endsWith(route)) {
      routeHandlers[route](grpcBody);
      break;
    }
  }
  $2.exit();
})();
