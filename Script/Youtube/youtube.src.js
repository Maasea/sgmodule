// Build: 2023/3/3 12:14:26
(() => {
  // lib/text-polyfill.mjs
  function text(r) {
    "use strict";
    function x() {
    }
    function y() {
    }
    var z = String.fromCharCode, v = {}.toString, A = v.call(r.SharedArrayBuffer), B = v(), q = r.Uint8Array, t = q || Array, w = q ? ArrayBuffer : t, C = w.isView || function(g) {
      return g && "length" in g;
    }, D = v.call(w.prototype);
    w = y.prototype;
    var E = r.TextEncoder, a = new (q ? Uint16Array : t)(32);
    x.prototype.decode = function(g) {
      if (!C(g)) {
        var l = v.call(g);
        if (l !== D && l !== A && l !== B)
          throw TypeError(
            "Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'"
          );
        g = q ? new t(g) : g || [];
      }
      for (var f = l = "", b = 0, c = g.length | 0, u = c - 32 | 0, e, d, h = 0, p = 0, m, k = 0, n = -1; b < c; ) {
        for (e = b <= u ? 32 : c - b | 0; k < e; b = b + 1 | 0, k = k + 1 | 0) {
          d = g[b] & 255;
          switch (d >> 4) {
            case 15:
              m = g[b = b + 1 | 0] & 255;
              if (2 !== m >> 6 || 247 < d) {
                b = b - 1 | 0;
                break;
              }
              h = (d & 7) << 6 | m & 63;
              p = 5;
              d = 256;
            case 14:
              m = g[b = b + 1 | 0] & 255, h <<= 6, h |= (d & 15) << 6 | m & 63, p = 2 === m >> 6 ? p + 4 | 0 : 24, d = d + 256 & 768;
            case 13:
            case 12:
              m = g[b = b + 1 | 0] & 255, h <<= 6, h |= (d & 31) << 6 | m & 63, p = p + 7 | 0, b < c && 2 === m >> 6 && h >> p && 1114112 > h ? (d = h, h = h - 65536 | 0, 0 <= h && (n = (h >> 10) + 55296 | 0, d = (h & 1023) + 56320 | 0, 31 > k ? (a[k] = n, k = k + 1 | 0, n = -1) : (m = n, n = d, d = m))) : (d >>= 8, b = b - d - 1 | 0, d = 65533), h = p = 0, e = b <= u ? 32 : c - b | 0;
            default:
              a[k] = d;
              continue;
            case 11:
            case 10:
            case 9:
            case 8:
          }
          a[k] = 65533;
        }
        f += z(
          a[0],
          a[1],
          a[2],
          a[3],
          a[4],
          a[5],
          a[6],
          a[7],
          a[8],
          a[9],
          a[10],
          a[11],
          a[12],
          a[13],
          a[14],
          a[15],
          a[16],
          a[17],
          a[18],
          a[19],
          a[20],
          a[21],
          a[22],
          a[23],
          a[24],
          a[25],
          a[26],
          a[27],
          a[28],
          a[29],
          a[30],
          a[31]
        );
        32 > k && (f = f.slice(0, k - 32 | 0));
        if (b < c) {
          if (a[0] = n, k = ~n >>> 31, n = -1, f.length < l.length)
            continue;
        } else
          -1 !== n && (f += z(n));
        l += f;
        f = "";
      }
      return l;
    };
    w.encode = function(g) {
      g = void 0 === g ? "" : "" + g;
      var l = g.length | 0, f = new t((l << 1) + 8 | 0), b, c = 0, u = !q;
      for (b = 0; b < l; b = b + 1 | 0, c = c + 1 | 0) {
        var e = g.charCodeAt(b) | 0;
        if (127 >= e)
          f[c] = e;
        else {
          if (2047 >= e)
            f[c] = 192 | e >> 6;
          else {
            a: {
              if (55296 <= e)
                if (56319 >= e) {
                  var d = g.charCodeAt(b = b + 1 | 0) | 0;
                  if (56320 <= d && 57343 >= d) {
                    e = (e << 10) + d - 56613888 | 0;
                    if (65535 < e) {
                      f[c] = 240 | e >> 18;
                      f[c = c + 1 | 0] = 128 | e >> 12 & 63;
                      f[c = c + 1 | 0] = 128 | e >> 6 & 63;
                      f[c = c + 1 | 0] = 128 | e & 63;
                      continue;
                    }
                    break a;
                  }
                  e = 65533;
                } else
                  57343 >= e && (e = 65533);
              !u && b << 1 < c && b << 1 < (c - 7 | 0) && (u = true, d = new t(3 * l), d.set(f), f = d);
            }
            f[c] = 224 | e >> 12;
            f[c = c + 1 | 0] = 128 | e >> 6 & 63;
          }
          f[c = c + 1 | 0] = 128 | e & 63;
        }
      }
      return q ? f.subarray(0, c) : f.slice(0, c);
    };
    r.TextDecoder = x;
    r.TextEncoder = y;
  }
  var ___ = text(globalThis);

  // lib/client.ts
  var SimpleClient = class {
    constructor(name, opt2) {
      this.name = name || "";
      this.debug = opt2.debug || false;
      if (name) {
        this.log(`${name} Start`);
      }
    }
    isQuanX() {
      return typeof $task !== "undefined";
    }
    isSurge() {
      return typeof $environment !== "undefined" && $environment["surge-version"];
    }
    isLoon() {
      return typeof $loon !== "undefined";
    }
    isShadowrocket() {
      return typeof $rocket !== "undefined";
    }
    isStash() {
      return typeof $environment !== "undefined" && $environment["stash-version"];
    }
    getval(key) {
      let val = "";
      if (this.isSurge() || this.isLoon() || this.isStash()) {
        val = $persistentStore.read(key);
      } else if (this.isQuanX()) {
        val = $prefs.valueForKey(key);
      }
      return val == null ? void 0 : val.replace(/\0/g, "");
    }
    setval(val, key) {
      if (this.isSurge() || this.isLoon() || this.isStash()) {
        return $persistentStore.write(val, key);
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(val, key);
      }
    }
    getjson(key, alter = {}) {
      const val = this.getval(key);
      return val ? JSON.parse(val) : alter;
    }
    setjson(val, key) {
      this.setval(JSON.stringify(val), key);
    }
    msg(title = this.name, subt = "", desc = "", opts) {
      const toEnvOpts = (rawopts) => {
        if (!rawopts)
          return rawopts;
        if (typeof rawopts === "string") {
          if (this.isLoon()) {
            return rawopts;
          } else if (this.isQuanX()) {
            return { "open-url": rawopts };
          } else if (this.isSurge() || this.isStash()) {
            return { url: rawopts };
          } else {
            return void 0;
          }
        } else if (typeof rawopts === "object") {
          if (this.isLoon()) {
            const openUrl = rawopts.openUrl || rawopts.url || rawopts["open-url"];
            const mediaUrl = rawopts.mediaUrl || rawopts["media-url"];
            return {
              openUrl,
              mediaUrl
            };
          } else if (this.isQuanX()) {
            const openUrl = rawopts["open-url"] || rawopts.url || rawopts.openUrl;
            const mediaUrl = rawopts["media-url"] || rawopts.mediaUrl;
            const updatePasteboard = rawopts["update-pasteboard"] || rawopts.updatePasteboard;
            return {
              "open-url": openUrl,
              "media-url": mediaUrl,
              "update-pasteboard": updatePasteboard
            };
          } else if (this.isSurge() || this.isStash()) {
            const openUrl = rawopts.url || rawopts.openUrl || rawopts["open-url"];
            return { url: openUrl };
          }
        } else {
          return void 0;
        }
      };
      if (this.isSurge() || this.isLoon() || this.isStash()) {
        $notification.post(title, subt, desc, toEnvOpts(opts));
      } else if (this.isQuanX()) {
        $notify(title, subt, desc, toEnvOpts(opts));
      }
    }
    log(val) {
      if (this.debug) {
        if (typeof val === "object") {
          val = JSON.stringify(val);
        }
        console.log(val);
      }
    }
    done(val = {}) {
      $done(val);
    }
  };

  // lib/env.ts
  var $ = new SimpleClient("YouTube", { debug: true });

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
    var _a, _b, _c, _d;
    field.localName = (_a = field.localName) !== null && _a !== void 0 ? _a : lowerCamelCase(field.name);
    field.jsonName = (_b = field.jsonName) !== null && _b !== void 0 ? _b : lowerCamelCase(field.name);
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
      var _a;
      this.fields = (_a = info.fields) !== null && _a !== void 0 ? _a : [];
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
      var _a;
      if (this.fMap === void 0) {
        this.fMap = {};
        const fieldsInput = (_a = this.info.fields) !== null && _a !== void 0 ? _a : [];
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
      var _a;
      this.fields = (_a = info.fields) !== null && _a !== void 0 ? _a : [];
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
        const opt2 = field.kind == "scalar" || field.kind == "enum" ? Object.assign(Object.assign({}, options), { emitDefaultValues: true }) : options;
        let jsonValue = this.field(field, group[field.localName], opt2);
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
      var _a;
      if (!this.fieldNoToField) {
        const fieldsInput = (_a = this.info.fields) !== null && _a !== void 0 ? _a : [];
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
          let u = options.readUnknownField;
          if (u == "throw")
            throw new Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.info.typeName}`);
          let d = reader.skip(wireType);
          if (u !== false)
            (u === true ? UnknownFieldHandler.onRead : u)(this.info.typeName, message, fieldNo, wireType, d);
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
        this.fields = fieldsInput.sort((a, b) => a.no - b.no);
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
      let u = options.writeUnknownFields;
      if (u !== false)
        (u === true ? UnknownFieldHandler.onWrite : u)(this.info.typeName, message, writer);
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
  function reflectionEquals(info, a, b) {
    if (a === b)
      return true;
    if (!a || !b)
      return false;
    for (let field of info.fields) {
      let localName = field.localName;
      let val_a = field.oneof ? a[field.oneof][localName] : a[localName];
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
  function primitiveEq(type, a, b) {
    if (a === b)
      return true;
    if (type !== ScalarType.BYTES)
      return false;
    let ba = a;
    let bb = b;
    if (ba.length !== bb.length)
      return false;
    for (let i = 0; i < ba.length; i++)
      if (ba[i] != bb[i])
        return false;
    return true;
  }
  function repeatedPrimitiveEq(type, a, b) {
    if (a.length !== b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!primitiveEq(type, a[i], b[i]))
        return false;
    return true;
  }
  function repeatedMsgEq(type, a, b) {
    if (a.length !== b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!type.equals(a[i], b[i]))
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
    equals(a, b) {
      return reflectionEquals(this, a, b);
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
      let opt2 = binaryReadOptions(options);
      return this.internalBinaryRead(opt2.readerFactory(data), data.byteLength, opt2);
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
      var _a;
      let value = this.toJson(message, options);
      return JSON.stringify(value, null, (_a = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a !== void 0 ? _a : 0);
    }
    /**
     * Write the message to binary format.
     */
    toBinary(message, options) {
      let opt2 = binaryWriteOptions(options);
      return this.internalBinaryWrite(message, opt2.writerFactory(), opt2).finish();
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

  // lib/youtube.ts
  var Browse$Type = class extends MessageType {
    constructor() {
      super("Browse", [
        { no: 9, name: "n1F9", kind: "message", T: () => n1F9 },
        { no: 10, name: "n1F10", kind: "message", T: () => n1F10 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n1F9 n1F9 */
          9:
            message.n1F9 = n1F9.internalBinaryRead(reader, reader.uint32(), options, message.n1F9);
            break;
          case /* n1F10 n1F10 */
          10:
            message.n1F10 = n1F10.internalBinaryRead(reader, reader.uint32(), options, message.n1F10);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n1F9)
        n1F9.internalBinaryWrite(message.n1F9, writer.tag(9, WireType.LengthDelimited).fork(), options).join();
      if (message.n1F10)
        n1F10.internalBinaryWrite(message.n1F10, writer.tag(10, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Browse = new Browse$Type();
  var n1F9$Type = class extends MessageType {
    constructor() {
      super("n1F9", [
        { no: 58173949, name: "m2F58173949", kind: "message", T: () => m2F58173949 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* m2F58173949 m2F58173949 */
          58173949:
            message.m2F58173949 = m2F58173949.internalBinaryRead(reader, reader.uint32(), options, message.m2F58173949);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.m2F58173949)
        m2F58173949.internalBinaryWrite(message.m2F58173949, writer.tag(58173949, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n1F9 = new n1F9$Type();
  var n1F10$Type = class extends MessageType {
    constructor() {
      super("n1F10", [
        { no: 49399797, name: "n2F49399797", kind: "message", T: () => n2F49399797 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n2F49399797 n2F49399797 */
          49399797:
            message.n2F49399797 = n2F49399797.internalBinaryRead(reader, reader.uint32(), options, message.n2F49399797);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n2F49399797)
        n2F49399797.internalBinaryWrite(message.n2F49399797, writer.tag(49399797, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n1F10 = new n1F10$Type();
  var m2F58173949$Type = class extends MessageType {
    constructor() {
      super("m2F58173949", [
        { no: 1, name: "m3F1", kind: "message", repeat: 1, T: () => m3F1 }
      ]);
    }
    create(value) {
      const message = { m3F1: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated m3F1 m3F1 */
          1:
            message.m3F1.push(m3F1.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.m3F1.length; i++)
        m3F1.internalBinaryWrite(message.m3F1[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var m2F58173949 = new m2F58173949$Type();
  var m3F1$Type = class extends MessageType {
    constructor() {
      super("m3F1", [
        { no: 58174010, name: "m4F58174010", kind: "message", T: () => m4F58174010 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* m4F58174010 m4F58174010 */
          58174010:
            message.m4F58174010 = m4F58174010.internalBinaryRead(reader, reader.uint32(), options, message.m4F58174010);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.m4F58174010)
        m4F58174010.internalBinaryWrite(message.m4F58174010, writer.tag(58174010, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var m3F1 = new m3F1$Type();
  var m4F58174010$Type = class extends MessageType {
    constructor() {
      super("m4F58174010", [
        { no: 4, name: "n1F10", kind: "message", T: () => n1F10 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n1F10 n1F10 */
          4:
            message.n1F10 = n1F10.internalBinaryRead(reader, reader.uint32(), options, message.n1F10);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n1F10)
        n1F10.internalBinaryWrite(message.n1F10, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var m4F58174010 = new m4F58174010$Type();
  var n2F49399797$Type = class extends MessageType {
    constructor() {
      super("n2F49399797", [
        { no: 1, name: "n3F1", kind: "message", repeat: 1, T: () => n3F1 }
      ]);
    }
    create(value) {
      const message = { n3F1: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated n3F1 n3F1 */
          1:
            message.n3F1.push(n3F1.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.n3F1.length; i++)
        n3F1.internalBinaryWrite(message.n3F1[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n2F49399797 = new n2F49399797$Type();
  var n3F1$Type = class extends MessageType {
    constructor() {
      super("n3F1", [
        { no: 50195462, name: "n4F50195462", kind: "message", T: () => n4F50195462 },
        { no: 51845067, name: "n4F51845067", kind: "message", T: () => n4F51845067 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n4F50195462 n4F50195462 */
          50195462:
            message.n4F50195462 = n4F50195462.internalBinaryRead(reader, reader.uint32(), options, message.n4F50195462);
            break;
          case /* n4F51845067 n4F51845067 */
          51845067:
            message.n4F51845067 = n4F51845067.internalBinaryRead(reader, reader.uint32(), options, message.n4F51845067);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n4F50195462)
        n4F50195462.internalBinaryWrite(message.n4F50195462, writer.tag(50195462, WireType.LengthDelimited).fork(), options).join();
      if (message.n4F51845067)
        n4F51845067.internalBinaryWrite(message.n4F51845067, writer.tag(51845067, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n3F1 = new n3F1$Type();
  var n4F50195462$Type = class extends MessageType {
    constructor() {
      super("n4F50195462", [
        { no: 1, name: "n5F1", kind: "message", repeat: 1, T: () => n5F1 }
      ]);
    }
    create(value) {
      const message = { n5F1: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated n5F1 n5F1 */
          1:
            message.n5F1.push(n5F1.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.n5F1.length; i++)
        n5F1.internalBinaryWrite(message.n5F1[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n4F50195462 = new n4F50195462$Type();
  var n4F51845067$Type = class extends MessageType {
    constructor() {
      super("n4F51845067", [
        { no: 5, name: "n5F5", kind: "message", T: () => n5F5 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n5F5 n5F5 */
          5:
            message.n5F5 = n5F5.internalBinaryRead(reader, reader.uint32(), options, message.n5F5);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n5F5)
        n5F5.internalBinaryWrite(message.n5F5, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n4F51845067 = new n4F51845067$Type();
  var n5F1$Type = class extends MessageType {
    constructor() {
      super("n5F1", [
        { no: 153515154, name: "n6F153515154", kind: "message", T: () => n6F153515154 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n6F153515154 n6F153515154 */
          153515154:
            message.n6F153515154 = n6F153515154.internalBinaryRead(reader, reader.uint32(), options, message.n6F153515154);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n6F153515154)
        n6F153515154.internalBinaryWrite(message.n6F153515154, writer.tag(153515154, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n5F1 = new n5F1$Type();
  var n5F5$Type = class extends MessageType {
    constructor() {
      super("n5F5", [
        { no: 51431404, name: "n6F51431404", kind: "message", T: () => n6F51431404 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n6F51431404 n6F51431404 */
          51431404:
            message.n6F51431404 = n6F51431404.internalBinaryRead(reader, reader.uint32(), options, message.n6F51431404);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n6F51431404)
        n6F51431404.internalBinaryWrite(message.n6F51431404, writer.tag(51431404, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n5F5 = new n5F5$Type();
  var n6F153515154$Type = class extends MessageType {
    constructor() {
      super("n6F153515154", [
        { no: 172660663, name: "n7F172660663", kind: "message", T: () => n7F172660663 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n7F172660663 n7F172660663 */
          172660663:
            message.n7F172660663 = n7F172660663.internalBinaryRead(reader, reader.uint32(), options, message.n7F172660663);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n7F172660663)
        n7F172660663.internalBinaryWrite(message.n7F172660663, writer.tag(172660663, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n6F153515154 = new n6F153515154$Type();
  var n6F51431404$Type = class extends MessageType {
    constructor() {
      super("n6F51431404", [
        { no: 1, name: "n5F1", kind: "message", repeat: 1, T: () => n5F1 }
      ]);
    }
    create(value) {
      const message = { n5F1: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated n5F1 n5F1 */
          1:
            message.n5F1.push(n5F1.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.n5F1.length; i++)
        n5F1.internalBinaryWrite(message.n5F1[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n6F51431404 = new n6F51431404$Type();
  var n7F172660663$Type = class extends MessageType {
    constructor() {
      super("n7F172660663", [
        { no: 1, name: "n8F1", kind: "message", T: () => n8F1 },
        { no: 2, name: "n8F2", kind: "message", T: () => n8F2 },
        { no: 3, name: "n8F3", kind: "message", T: () => n8F3 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n8F1 n8F1 */
          1:
            message.n8F1 = n8F1.internalBinaryRead(reader, reader.uint32(), options, message.n8F1);
            break;
          case /* n8F2 n8F2 */
          2:
            message.n8F2 = n8F2.internalBinaryRead(reader, reader.uint32(), options, message.n8F2);
            break;
          case /* n8F3 n8F3 */
          3:
            message.n8F3 = n8F3.internalBinaryRead(reader, reader.uint32(), options, message.n8F3);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n8F1)
        n8F1.internalBinaryWrite(message.n8F1, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      if (message.n8F2)
        n8F2.internalBinaryWrite(message.n8F2, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      if (message.n8F3)
        n8F3.internalBinaryWrite(message.n8F3, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n7F172660663 = new n7F172660663$Type();
  var n8F1$Type = class extends MessageType {
    constructor() {
      super("n8F1", [
        { no: 168777401, name: "n9F168777401", kind: "message", T: () => n9F168777401 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n9F168777401 n9F168777401 */
          168777401:
            message.n9F168777401 = n9F168777401.internalBinaryRead(reader, reader.uint32(), options, message.n9F168777401);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n9F168777401)
        n9F168777401.internalBinaryWrite(message.n9F168777401, writer.tag(168777401, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n8F1 = new n8F1$Type();
  var n8F2$Type = class extends MessageType {
    constructor() {
      super("n8F2", [
        { no: 183314536, name: "n9F183314536", kind: "message", T: () => n9F183314536 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n9F183314536 n9F183314536 */
          183314536:
            message.n9F183314536 = n9F183314536.internalBinaryRead(reader, reader.uint32(), options, message.n9F183314536);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n9F183314536)
        n9F183314536.internalBinaryWrite(message.n9F183314536, writer.tag(183314536, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n8F2 = new n8F2$Type();
  var n8F3$Type = class extends MessageType {
    constructor() {
      super("n8F3", [
        { no: 1, name: "n8F1", kind: "message", T: () => n8F1 },
        { no: 2, name: "n8F2", kind: "message", T: () => n8F2 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n8F1 n8F1 */
          1:
            message.n8F1 = n8F1.internalBinaryRead(reader, reader.uint32(), options, message.n8F1);
            break;
          case /* n8F2 n8F2 */
          2:
            message.n8F2 = n8F2.internalBinaryRead(reader, reader.uint32(), options, message.n8F2);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n8F1)
        n8F1.internalBinaryWrite(message.n8F1, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      if (message.n8F2)
        n8F2.internalBinaryWrite(message.n8F2, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n8F3 = new n8F3$Type();
  var n9F168777401$Type = class extends MessageType {
    constructor() {
      super("n9F168777401", [
        { no: 3, name: "n10F3", kind: "message", T: () => n10F3 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n10F3 n10F3 */
          3:
            message.n10F3 = n10F3.internalBinaryRead(reader, reader.uint32(), options, message.n10F3);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n10F3)
        n10F3.internalBinaryWrite(message.n10F3, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n9F168777401 = new n9F168777401$Type();
  var n9F183314536$Type = class extends MessageType {
    constructor() {
      super("n9F183314536", [
        {
          no: 1,
          name: "type",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { type: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string type */
          1:
            message.type = reader.string();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.type !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.type);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n9F183314536 = new n9F183314536$Type();
  var n10F3$Type = class extends MessageType {
    constructor() {
      super("n10F3", [
        { no: 172035250, name: "n11F172035250", kind: "message", T: () => n11F172035250 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n11F172035250 n11F172035250 */
          172035250:
            message.n11F172035250 = n11F172035250.internalBinaryRead(reader, reader.uint32(), options, message.n11F172035250);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n11F172035250)
        n11F172035250.internalBinaryWrite(message.n11F172035250, writer.tag(172035250, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n10F3 = new n10F3$Type();
  var n11F172035250$Type = class extends MessageType {
    constructor() {
      super("n11F172035250", [
        {
          no: 1,
          name: "type",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { type: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string type */
          1:
            message.type = reader.string();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.type !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.type);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n11F172035250 = new n11F172035250$Type();
  var Next$Type = class extends MessageType {
    constructor() {
      super("Next", [
        { no: 7, name: "a1F7", kind: "message", T: () => a1F7 },
        { no: 8, name: "a1F8", kind: "message", T: () => a1F8 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* a1F7 a1F7 */
          7:
            message.a1F7 = a1F7.internalBinaryRead(reader, reader.uint32(), options, message.a1F7);
            break;
          case /* a1F8 a1F8 */
          8:
            message.a1F8 = a1F8.internalBinaryRead(reader, reader.uint32(), options, message.a1F8);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.a1F7)
        a1F7.internalBinaryWrite(message.a1F7, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
      if (message.a1F8)
        a1F8.internalBinaryWrite(message.a1F8, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Next = new Next$Type();
  var a1F7$Type = class extends MessageType {
    constructor() {
      super("a1F7", [
        { no: 51779735, name: "a2F51779735", kind: "message", T: () => a2F51779735 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* a2F51779735 a2F51779735 */
          51779735:
            message.a2F51779735 = a2F51779735.internalBinaryRead(reader, reader.uint32(), options, message.a2F51779735);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.a2F51779735)
        a2F51779735.internalBinaryWrite(message.a2F51779735, writer.tag(51779735, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var a1F7 = new a1F7$Type();
  var a1F8$Type = class extends MessageType {
    constructor() {
      super("a1F8", [
        { no: 49399797, name: "n2F49399797", kind: "message", T: () => n2F49399797 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n2F49399797 n2F49399797 */
          49399797:
            message.n2F49399797 = n2F49399797.internalBinaryRead(reader, reader.uint32(), options, message.n2F49399797);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n2F49399797)
        n2F49399797.internalBinaryWrite(message.n2F49399797, writer.tag(49399797, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var a1F8 = new a1F8$Type();
  var a2F51779735$Type = class extends MessageType {
    constructor() {
      super("a2F51779735", [
        { no: 1, name: "a3F1", kind: "message", T: () => a3F1 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* a3F1 a3F1 */
          1:
            message.a3F1 = a3F1.internalBinaryRead(reader, reader.uint32(), options, message.a3F1);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.a3F1)
        a3F1.internalBinaryWrite(message.a3F1, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var a2F51779735 = new a2F51779735$Type();
  var a3F1$Type = class extends MessageType {
    constructor() {
      super("a3F1", [
        { no: 49399797, name: "n2F49399797", kind: "message", T: () => n2F49399797 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n2F49399797 n2F49399797 */
          49399797:
            message.n2F49399797 = n2F49399797.internalBinaryRead(reader, reader.uint32(), options, message.n2F49399797);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n2F49399797)
        n2F49399797.internalBinaryWrite(message.n2F49399797, writer.tag(49399797, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var a3F1 = new a3F1$Type();
  var Search$Type = class extends MessageType {
    constructor() {
      super("Search", [
        { no: 4, name: "s1F4", kind: "message", T: () => s1F4 },
        { no: 7, name: "s1F7", kind: "message", T: () => s1F7 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* s1F4 s1F4 */
          4:
            message.s1F4 = s1F4.internalBinaryRead(reader, reader.uint32(), options, message.s1F4);
            break;
          case /* s1F7 s1F7 */
          7:
            message.s1F7 = s1F7.internalBinaryRead(reader, reader.uint32(), options, message.s1F7);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.s1F4)
        s1F4.internalBinaryWrite(message.s1F4, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
      if (message.s1F7)
        s1F7.internalBinaryWrite(message.s1F7, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Search = new Search$Type();
  var s1F4$Type = class extends MessageType {
    constructor() {
      super("s1F4", [
        { no: 49399797, name: "n2F49399797", kind: "message", T: () => n2F49399797 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n2F49399797 n2F49399797 */
          49399797:
            message.n2F49399797 = n2F49399797.internalBinaryRead(reader, reader.uint32(), options, message.n2F49399797);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n2F49399797)
        n2F49399797.internalBinaryWrite(message.n2F49399797, writer.tag(49399797, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var s1F4 = new s1F4$Type();
  var s1F7$Type = class extends MessageType {
    constructor() {
      super("s1F7", [
        { no: 50195462, name: "n4F50195462", kind: "message", T: () => n4F50195462 },
        { no: 49399797, name: "n2F49399797", kind: "message", T: () => n2F49399797 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n4F50195462 n4F50195462 */
          50195462:
            message.n4F50195462 = n4F50195462.internalBinaryRead(reader, reader.uint32(), options, message.n4F50195462);
            break;
          case /* n2F49399797 n2F49399797 */
          49399797:
            message.n2F49399797 = n2F49399797.internalBinaryRead(reader, reader.uint32(), options, message.n2F49399797);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n4F50195462)
        n4F50195462.internalBinaryWrite(message.n4F50195462, writer.tag(50195462, WireType.LengthDelimited).fork(), options).join();
      if (message.n2F49399797)
        n2F49399797.internalBinaryWrite(message.n2F49399797, writer.tag(49399797, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var s1F7 = new s1F7$Type();
  var Shorts$Type = class extends MessageType {
    constructor() {
      super("Shorts", [
        { no: 2, name: "t1F2", kind: "message", repeat: 1, T: () => t1F2 }
      ]);
    }
    create(value) {
      const message = { t1F2: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated t1F2 t1F2 */
          2:
            message.t1F2.push(t1F2.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.t1F2.length; i++)
        t1F2.internalBinaryWrite(message.t1F2[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Shorts = new Shorts$Type();
  var t1F2$Type = class extends MessageType {
    constructor() {
      super("t1F2", [
        { no: 1, name: "n2F1", kind: "message", T: () => n2F1 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n2F1 n2F1 */
          1:
            message.n2F1 = n2F1.internalBinaryRead(reader, reader.uint32(), options, message.n2F1);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n2F1)
        n2F1.internalBinaryWrite(message.n2F1, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var t1F2 = new t1F2$Type();
  var n2F1$Type = class extends MessageType {
    constructor() {
      super("n2F1", [
        { no: 139608561, name: "n3F139608561", kind: "message", T: () => n3F139608561 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n3F139608561 n3F139608561 */
          139608561:
            message.n3F139608561 = n3F139608561.internalBinaryRead(reader, reader.uint32(), options, message.n3F139608561);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n3F139608561)
        n3F139608561.internalBinaryWrite(message.n3F139608561, writer.tag(139608561, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n2F1 = new n2F1$Type();
  var n3F139608561$Type = class extends MessageType {
    constructor() {
      super("n3F139608561", [
        { no: 8, name: "n4F8", kind: "message", T: () => n4F8 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n4F8 n4F8 */
          8:
            message.n4F8 = n4F8.internalBinaryRead(reader, reader.uint32(), options, message.n4F8);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n4F8)
        n4F8.internalBinaryWrite(message.n4F8, writer.tag(8, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n3F139608561 = new n3F139608561$Type();
  var n4F8$Type = class extends MessageType {
    constructor() {
      super("n4F8", [
        { no: 139970731, name: "n4F139970731", kind: "message", T: () => n4F139970731 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* n4F139970731 n4F139970731 */
          139970731:
            message.n4F139970731 = n4F139970731.internalBinaryRead(reader, reader.uint32(), options, message.n4F139970731);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.n4F139970731)
        n4F139970731.internalBinaryWrite(message.n4F139970731, writer.tag(139970731, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n4F8 = new n4F8$Type();
  var n4F139970731$Type = class extends MessageType {
    constructor() {
      super("n4F139970731", [
        {
          no: 12,
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 f1 */
          12:
            message.f1 = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.f1 !== 0)
        writer.tag(12, WireType.Varint).int32(message.f1);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var n4F139970731 = new n4F139970731$Type();
  var Guide$Type = class extends MessageType {
    constructor() {
      super("Guide", [
        { no: 4, name: "g1F4", kind: "message", repeat: 1, T: () => g1F4 },
        { no: 6, name: "g1F6", kind: "message", repeat: 1, T: () => g1F6 }
      ]);
    }
    create(value) {
      const message = { g1F4: [], g1F6: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated g1F4 g1F4 */
          4:
            message.g1F4.push(g1F4.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* repeated g1F6 g1F6 */
          6:
            message.g1F6.push(g1F6.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.g1F4.length; i++)
        g1F4.internalBinaryWrite(message.g1F4[i], writer.tag(4, WireType.LengthDelimited).fork(), options).join();
      for (let i = 0; i < message.g1F6.length; i++)
        g1F6.internalBinaryWrite(message.g1F6[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Guide = new Guide$Type();
  var g1F4$Type = class extends MessageType {
    constructor() {
      super("g1F4", [
        { no: 117866661, name: "g2F117866661", kind: "message", T: () => g2F117866661 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* g2F117866661 g2F117866661 */
          117866661:
            message.g2F117866661 = g2F117866661.internalBinaryRead(reader, reader.uint32(), options, message.g2F117866661);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.g2F117866661)
        g2F117866661.internalBinaryWrite(message.g2F117866661, writer.tag(117866661, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var g1F4 = new g1F4$Type();
  var g1F6$Type = class extends MessageType {
    constructor() {
      super("g1F6", [
        { no: 117866661, name: "g2F117866661", kind: "message", T: () => g2F117866661 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* g2F117866661 g2F117866661 */
          117866661:
            message.g2F117866661 = g2F117866661.internalBinaryRead(reader, reader.uint32(), options, message.g2F117866661);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.g2F117866661)
        g2F117866661.internalBinaryWrite(message.g2F117866661, writer.tag(117866661, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var g1F6 = new g1F6$Type();
  var g2F117866661$Type = class extends MessageType {
    constructor() {
      super("g2F117866661", [
        { no: 1, name: "g3F1", kind: "message", repeat: 1, T: () => g3F1 }
      ]);
    }
    create(value) {
      const message = { g3F1: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated g3F1 g3F1 */
          1:
            message.g3F1.push(g3F1.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.g3F1.length; i++)
        g3F1.internalBinaryWrite(message.g3F1[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var g2F117866661 = new g2F117866661$Type();
  var g3F1$Type = class extends MessageType {
    constructor() {
      super("g3F1", [
        { no: 318370163, name: "g4F318370163", kind: "message", T: () => g4F318370163 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* g4F318370163 g4F318370163 */
          318370163:
            message.g4F318370163 = g4F318370163.internalBinaryRead(reader, reader.uint32(), options, message.g4F318370163);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.g4F318370163)
        g4F318370163.internalBinaryWrite(message.g4F318370163, writer.tag(318370163, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var g3F1 = new g3F1$Type();
  var g4F318370163$Type = class extends MessageType {
    constructor() {
      super("g4F318370163", [
        {
          no: 1,
          name: "f1",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { f1: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string f1 */
          1:
            message.f1 = reader.string();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.f1 !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.f1);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var g4F318370163 = new g4F318370163$Type();
  var Name$Type = class extends MessageType {
    constructor() {
      super("Name", [
        { no: 1, name: "runs", kind: "message", repeat: 1, T: () => Name_Runs }
      ]);
    }
    create(value) {
      const message = { runs: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated Name.Runs runs */
          1:
            message.runs.push(Name_Runs.internalBinaryRead(reader, reader.uint32(), options));
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.runs.length; i++)
        Name_Runs.internalBinaryWrite(message.runs[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Name = new Name$Type();
  var Name_Runs$Type = class extends MessageType {
    constructor() {
      super("Name.Runs", [
        {
          no: 1,
          name: "text",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        }
      ]);
    }
    create(value) {
      const message = { text: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string text */
          1:
            message.text = reader.string();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.text !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.text);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Name_Runs = new Name_Runs$Type();
  var Player$Type = class extends MessageType {
    constructor() {
      super("Player", [
        { no: 7, name: "p1F7", kind: "message", repeat: 1, T: () => p1F7 },
        { no: 2, name: "p1F2", kind: "message", T: () => p1F2 },
        { no: 10, name: "captions", kind: "message", T: () => Player_Captions }
      ]);
    }
    create(value) {
      const message = { p1F7: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated p1F7 p1F7 */
          7:
            message.p1F7.push(p1F7.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* p1F2 p1F2 */
          2:
            message.p1F2 = p1F2.internalBinaryRead(reader, reader.uint32(), options, message.p1F2);
            break;
          case /* Player.Captions captions */
          10:
            message.captions = Player_Captions.internalBinaryRead(reader, reader.uint32(), options, message.captions);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.p1F7.length; i++)
        p1F7.internalBinaryWrite(message.p1F7[i], writer.tag(7, WireType.LengthDelimited).fork(), options).join();
      if (message.p1F2)
        p1F2.internalBinaryWrite(message.p1F2, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      if (message.captions)
        Player_Captions.internalBinaryWrite(message.captions, writer.tag(10, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Player = new Player$Type();
  var Player_Captions$Type = class extends MessageType {
    constructor() {
      super("Player.Captions", [
        { no: 51621377, name: "playerCaptionsTracklistRenderer", kind: "message", T: () => Player_Captions_PlayerCaptionsTracklistRenderer }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* Player.Captions.PlayerCaptionsTracklistRenderer playerCaptionsTracklistRenderer */
          51621377:
            message.playerCaptionsTracklistRenderer = Player_Captions_PlayerCaptionsTracklistRenderer.internalBinaryRead(reader, reader.uint32(), options, message.playerCaptionsTracklistRenderer);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.playerCaptionsTracklistRenderer)
        Player_Captions_PlayerCaptionsTracklistRenderer.internalBinaryWrite(message.playerCaptionsTracklistRenderer, writer.tag(51621377, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Player_Captions = new Player_Captions$Type();
  var Player_Captions_PlayerCaptionsTracklistRenderer$Type = class extends MessageType {
    constructor() {
      super("Player.Captions.PlayerCaptionsTracklistRenderer", [
        { no: 1, name: "captionTracks", kind: "message", repeat: 1, T: () => Player_Captions_PlayerCaptionsTracklistRenderer_CaptionTracks },
        { no: 2, name: "audioTracks", kind: "message", repeat: 1, T: () => Player_Captions_PlayerCaptionsTracklistRenderer_AudioTracks },
        { no: 3, name: "translationLanguages", kind: "message", repeat: 1, T: () => Player_Captions_PlayerCaptionsTracklistRenderer_TranslationLanguages },
        {
          no: 4,
          name: "defaultAudioTrackIndex",
          kind: "scalar",
          opt: true,
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 6,
          name: "defaultCaptionTrackIndex",
          kind: "scalar",
          jsonName: "defaultAudioTrackIndex",
          opt: true,
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { captionTracks: [], audioTracks: [], translationLanguages: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated Player.Captions.PlayerCaptionsTracklistRenderer.CaptionTracks captionTracks */
          1:
            message.captionTracks.push(Player_Captions_PlayerCaptionsTracklistRenderer_CaptionTracks.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* repeated Player.Captions.PlayerCaptionsTracklistRenderer.AudioTracks audioTracks */
          2:
            message.audioTracks.push(Player_Captions_PlayerCaptionsTracklistRenderer_AudioTracks.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* repeated Player.Captions.PlayerCaptionsTracklistRenderer.TranslationLanguages translationLanguages */
          3:
            message.translationLanguages.push(Player_Captions_PlayerCaptionsTracklistRenderer_TranslationLanguages.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* optional int32 defaultAudioTrackIndex */
          4:
            message.defaultAudioTrackIndex = reader.int32();
            break;
          case /* optional int32 defaultCaptionTrackIndex = 6 [json_name = "defaultAudioTrackIndex"];*/
          6:
            message.defaultCaptionTrackIndex = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.captionTracks.length; i++)
        Player_Captions_PlayerCaptionsTracklistRenderer_CaptionTracks.internalBinaryWrite(message.captionTracks[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      for (let i = 0; i < message.audioTracks.length; i++)
        Player_Captions_PlayerCaptionsTracklistRenderer_AudioTracks.internalBinaryWrite(message.audioTracks[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      for (let i = 0; i < message.translationLanguages.length; i++)
        Player_Captions_PlayerCaptionsTracklistRenderer_TranslationLanguages.internalBinaryWrite(message.translationLanguages[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
      if (message.defaultAudioTrackIndex !== void 0)
        writer.tag(4, WireType.Varint).int32(message.defaultAudioTrackIndex);
      if (message.defaultCaptionTrackIndex !== void 0)
        writer.tag(6, WireType.Varint).int32(message.defaultCaptionTrackIndex);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Player_Captions_PlayerCaptionsTracklistRenderer = new Player_Captions_PlayerCaptionsTracklistRenderer$Type();
  var Player_Captions_PlayerCaptionsTracklistRenderer_CaptionTracks$Type = class extends MessageType {
    constructor() {
      super("Player.Captions.PlayerCaptionsTracklistRenderer.CaptionTracks", [
        {
          no: 1,
          name: "baseUrl",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        { no: 2, name: "name", kind: "message", T: () => Name },
        {
          no: 3,
          name: "vssId",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 4,
          name: "languageCode",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 5,
          name: "kind",
          kind: "scalar",
          opt: true,
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 6,
          name: "rtl",
          kind: "scalar",
          opt: true,
          T: 8
          /*ScalarType.BOOL*/
        },
        {
          no: 7,
          name: "isTranslatable",
          kind: "scalar",
          T: 8
          /*ScalarType.BOOL*/
        }
      ]);
    }
    create(value) {
      const message = { baseUrl: "", vssId: "", languageCode: "", isTranslatable: false };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string baseUrl */
          1:
            message.baseUrl = reader.string();
            break;
          case /* Name name */
          2:
            message.name = Name.internalBinaryRead(reader, reader.uint32(), options, message.name);
            break;
          case /* string vssId */
          3:
            message.vssId = reader.string();
            break;
          case /* string languageCode */
          4:
            message.languageCode = reader.string();
            break;
          case /* optional string kind */
          5:
            message.kind = reader.string();
            break;
          case /* optional bool rtl */
          6:
            message.rtl = reader.bool();
            break;
          case /* bool isTranslatable */
          7:
            message.isTranslatable = reader.bool();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.baseUrl !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.baseUrl);
      if (message.name)
        Name.internalBinaryWrite(message.name, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      if (message.vssId !== "")
        writer.tag(3, WireType.LengthDelimited).string(message.vssId);
      if (message.languageCode !== "")
        writer.tag(4, WireType.LengthDelimited).string(message.languageCode);
      if (message.kind !== void 0)
        writer.tag(5, WireType.LengthDelimited).string(message.kind);
      if (message.rtl !== void 0)
        writer.tag(6, WireType.Varint).bool(message.rtl);
      if (message.isTranslatable !== false)
        writer.tag(7, WireType.Varint).bool(message.isTranslatable);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Player_Captions_PlayerCaptionsTracklistRenderer_CaptionTracks = new Player_Captions_PlayerCaptionsTracklistRenderer_CaptionTracks$Type();
  var Player_Captions_PlayerCaptionsTracklistRenderer_AudioTracks$Type = class extends MessageType {
    constructor() {
      super("Player.Captions.PlayerCaptionsTracklistRenderer.AudioTracks", [
        {
          no: 2,
          name: "captionTrackIndices",
          kind: "scalar",
          repeat: 2,
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 3,
          name: "defaultCaptionTrackIndex",
          kind: "scalar",
          opt: true,
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 4,
          name: "forcedCaptionTrackIndex",
          kind: "scalar",
          opt: true,
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 5,
          name: "visibility",
          kind: "scalar",
          opt: true,
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 6,
          name: "hasDefaultTrack",
          kind: "scalar",
          opt: true,
          T: 8
          /*ScalarType.BOOL*/
        },
        {
          no: 7,
          name: "hasForcedTrack",
          kind: "scalar",
          opt: true,
          T: 8
          /*ScalarType.BOOL*/
        },
        {
          no: 8,
          name: "audioTrackId",
          kind: "scalar",
          opt: true,
          T: 9
          /*ScalarType.STRING*/
        },
        {
          no: 11,
          name: "captionsInitialState",
          kind: "scalar",
          opt: true,
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { captionTrackIndices: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated int32 captionTrackIndices = 2 [packed = false];*/
          2:
            if (wireType === WireType.LengthDelimited)
              for (let e = reader.int32() + reader.pos; reader.pos < e; )
                message.captionTrackIndices.push(reader.int32());
            else
              message.captionTrackIndices.push(reader.int32());
            break;
          case /* optional int32 defaultCaptionTrackIndex */
          3:
            message.defaultCaptionTrackIndex = reader.int32();
            break;
          case /* optional int32 forcedCaptionTrackIndex */
          4:
            message.forcedCaptionTrackIndex = reader.int32();
            break;
          case /* optional int32 visibility */
          5:
            message.visibility = reader.int32();
            break;
          case /* optional bool hasDefaultTrack */
          6:
            message.hasDefaultTrack = reader.bool();
            break;
          case /* optional bool hasForcedTrack */
          7:
            message.hasForcedTrack = reader.bool();
            break;
          case /* optional string audioTrackId */
          8:
            message.audioTrackId = reader.string();
            break;
          case /* optional int32 captionsInitialState */
          11:
            message.captionsInitialState = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.captionTrackIndices.length; i++)
        writer.tag(2, WireType.Varint).int32(message.captionTrackIndices[i]);
      if (message.defaultCaptionTrackIndex !== void 0)
        writer.tag(3, WireType.Varint).int32(message.defaultCaptionTrackIndex);
      if (message.forcedCaptionTrackIndex !== void 0)
        writer.tag(4, WireType.Varint).int32(message.forcedCaptionTrackIndex);
      if (message.visibility !== void 0)
        writer.tag(5, WireType.Varint).int32(message.visibility);
      if (message.hasDefaultTrack !== void 0)
        writer.tag(6, WireType.Varint).bool(message.hasDefaultTrack);
      if (message.hasForcedTrack !== void 0)
        writer.tag(7, WireType.Varint).bool(message.hasForcedTrack);
      if (message.audioTrackId !== void 0)
        writer.tag(8, WireType.LengthDelimited).string(message.audioTrackId);
      if (message.captionsInitialState !== void 0)
        writer.tag(11, WireType.Varint).int32(message.captionsInitialState);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Player_Captions_PlayerCaptionsTracklistRenderer_AudioTracks = new Player_Captions_PlayerCaptionsTracklistRenderer_AudioTracks$Type();
  var Player_Captions_PlayerCaptionsTracklistRenderer_TranslationLanguages$Type = class extends MessageType {
    constructor() {
      super("Player.Captions.PlayerCaptionsTracklistRenderer.TranslationLanguages", [
        {
          no: 1,
          name: "languageCode",
          kind: "scalar",
          T: 9
          /*ScalarType.STRING*/
        },
        { no: 2, name: "languageName", kind: "message", T: () => Name }
      ]);
    }
    create(value) {
      const message = { languageCode: "" };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string languageCode */
          1:
            message.languageCode = reader.string();
            break;
          case /* Name languageName */
          2:
            message.languageName = Name.internalBinaryRead(reader, reader.uint32(), options, message.languageName);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.languageCode !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.languageCode);
      if (message.languageName)
        Name.internalBinaryWrite(message.languageName, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Player_Captions_PlayerCaptionsTracklistRenderer_TranslationLanguages = new Player_Captions_PlayerCaptionsTracklistRenderer_TranslationLanguages$Type();
  var p1F2$Type = class extends MessageType {
    constructor() {
      super("p1F2", [
        { no: 21, name: "p2F21", kind: "message", T: () => p2F21 },
        { no: 11, name: "p2F11", kind: "message", T: () => p2F11 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* p2F21 p2F21 */
          21:
            message.p2F21 = p2F21.internalBinaryRead(reader, reader.uint32(), options, message.p2F21);
            break;
          case /* p2F11 p2F11 */
          11:
            message.p2F11 = p2F11.internalBinaryRead(reader, reader.uint32(), options, message.p2F11);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.p2F21)
        p2F21.internalBinaryWrite(message.p2F21, writer.tag(21, WireType.LengthDelimited).fork(), options).join();
      if (message.p2F11)
        p2F11.internalBinaryWrite(message.p2F11, writer.tag(11, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var p1F2 = new p1F2$Type();
  var p1F7$Type = class extends MessageType {
    constructor() {
      super("p1F7", [
        { no: 84813246, name: "p2F84813246", kind: "message", T: () => p2F84813246 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* p2F84813246 p2F84813246 */
          84813246:
            message.p2F84813246 = p2F84813246.internalBinaryRead(reader, reader.uint32(), options, message.p2F84813246);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.p2F84813246)
        p2F84813246.internalBinaryWrite(message.p2F84813246, writer.tag(84813246, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var p1F7 = new p1F7$Type();
  var p2F84813246$Type = class extends MessageType {
    constructor() {
      super("p2F84813246", [
        {
          no: 3,
          name: "v",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { v: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 v */
          3:
            message.v = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.v !== 0)
        writer.tag(3, WireType.Varint).int32(message.v);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var p2F84813246 = new p2F84813246$Type();
  var p2F21$Type = class extends MessageType {
    constructor() {
      super("p2F21", [
        { no: 151635310, name: "p3F151635310", kind: "message", T: () => p3F151635310 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* p3F151635310 p3F151635310 */
          151635310:
            message.p3F151635310 = p3F151635310.internalBinaryRead(reader, reader.uint32(), options, message.p3F151635310);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.p3F151635310)
        p3F151635310.internalBinaryWrite(message.p3F151635310, writer.tag(151635310, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var p2F21 = new p2F21$Type();
  var p2F11$Type = class extends MessageType {
    constructor() {
      super("p2F11", [
        { no: 64657230, name: "p3F64657230", kind: "message", T: () => p3F64657230 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* p3F64657230 p3F64657230 */
          64657230:
            message.p3F64657230 = p3F64657230.internalBinaryRead(reader, reader.uint32(), options, message.p3F64657230);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.p3F64657230)
        p3F64657230.internalBinaryWrite(message.p3F64657230, writer.tag(64657230, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var p2F11 = new p2F11$Type();
  var p3F151635310$Type = class extends MessageType {
    constructor() {
      super("p3F151635310", [
        {
          no: 1,
          name: "pip",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { pip: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 pip */
          1:
            message.pip = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.pip !== 0)
        writer.tag(1, WireType.Varint).int32(message.pip);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var p3F151635310 = new p3F151635310$Type();
  var p3F64657230$Type = class extends MessageType {
    constructor() {
      super("p3F64657230", [
        {
          no: 1,
          name: "backPlay",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { backPlay: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 backPlay */
          1:
            message.backPlay = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.backPlay !== 0)
        writer.tag(1, WireType.Varint).int32(message.backPlay);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var p3F64657230 = new p3F64657230$Type();
  var Setting$Type = class extends MessageType {
    constructor() {
      super("Setting", [
        { no: 6, name: "st1F6", kind: "message", repeat: 1, T: () => st1F6 },
        { no: 7, name: "st1F7", kind: "message", T: () => st1F7 },
        { no: 10, name: "st1F10", kind: "message", T: () => st1F10 }
      ]);
    }
    create(value) {
      const message = { st1F6: [] };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated st1F6 st1F6 */
          6:
            message.st1F6.push(st1F6.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* st1F7 st1F7 */
          7:
            message.st1F7 = st1F7.internalBinaryRead(reader, reader.uint32(), options, message.st1F7);
            break;
          case /* st1F10 st1F10 */
          10:
            message.st1F10 = st1F10.internalBinaryRead(reader, reader.uint32(), options, message.st1F10);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.st1F6.length; i++)
        st1F6.internalBinaryWrite(message.st1F6[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
      if (message.st1F7)
        st1F7.internalBinaryWrite(message.st1F7, writer.tag(7, WireType.LengthDelimited).fork(), options).join();
      if (message.st1F10)
        st1F10.internalBinaryWrite(message.st1F10, writer.tag(10, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var Setting = new Setting$Type();
  var st1F6$Type = class extends MessageType {
    constructor() {
      super("st1F6", [
        { no: 88478200, name: "st2F88478200", kind: "message", T: () => st2F88478200 },
        { no: 66930374, name: "st2F66930374", kind: "message", T: () => st2F66930374 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st2F88478200 st2F88478200 */
          88478200:
            message.st2F88478200 = st2F88478200.internalBinaryRead(reader, reader.uint32(), options, message.st2F88478200);
            break;
          case /* st2F66930374 st2F66930374 */
          66930374:
            message.st2F66930374 = st2F66930374.internalBinaryRead(reader, reader.uint32(), options, message.st2F66930374);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st2F88478200)
        st2F88478200.internalBinaryWrite(message.st2F88478200, writer.tag(88478200, WireType.LengthDelimited).fork(), options).join();
      if (message.st2F66930374)
        st2F66930374.internalBinaryWrite(message.st2F66930374, writer.tag(66930374, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st1F6 = new st1F6$Type();
  var st1F7$Type = class extends MessageType {
    constructor() {
      super("st1F7", [
        { no: 88478200, name: "st2F88478200", kind: "message", T: () => st2F88478200 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st2F88478200 st2F88478200 */
          88478200:
            message.st2F88478200 = st2F88478200.internalBinaryRead(reader, reader.uint32(), options, message.st2F88478200);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st2F88478200)
        st2F88478200.internalBinaryWrite(message.st2F88478200, writer.tag(88478200, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st1F7 = new st1F7$Type();
  var st1F10$Type = class extends MessageType {
    constructor() {
      super("st1F10", [
        { no: 4, name: "st2F4", kind: "message", T: () => st2F4 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st2F4 st2F4 */
          4:
            message.st2F4 = st2F4.internalBinaryRead(reader, reader.uint32(), options, message.st2F4);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st2F4)
        st2F4.internalBinaryWrite(message.st2F4, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st1F10 = new st1F10$Type();
  var st2F4$Type = class extends MessageType {
    constructor() {
      super("st2F4", [
        {
          no: 1,
          name: "f1",
          kind: "scalar",
          T: 4
          /*ScalarType.UINT64*/
        },
        {
          no: 2,
          name: "f2",
          kind: "scalar",
          T: 7
          /*ScalarType.FIXED32*/
        },
        {
          no: 3,
          name: "f3",
          kind: "scalar",
          T: 7
          /*ScalarType.FIXED32*/
        }
      ]);
    }
    create(value) {
      const message = { f1: "0", f2: 0, f3: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* uint64 f1 = 1 [jstype = JS_STRING];*/
          1:
            message.f1 = reader.uint64().toString();
            break;
          case /* fixed32 f2 */
          2:
            message.f2 = reader.fixed32();
            break;
          case /* fixed32 f3 */
          3:
            message.f3 = reader.fixed32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.f1 !== "0")
        writer.tag(1, WireType.Varint).uint64(message.f1);
      if (message.f2 !== 0)
        writer.tag(2, WireType.Bit32).fixed32(message.f2);
      if (message.f3 !== 0)
        writer.tag(3, WireType.Bit32).fixed32(message.f3);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st2F4 = new st2F4$Type();
  var st2F88478200$Type = class extends MessageType {
    constructor() {
      super("st2F88478200", [
        {
          no: 2,
          name: "f2",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 3,
          name: "f3",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        { no: 5, name: "st3F5", kind: "message", T: () => st3F5 },
        {
          no: 6,
          name: "f6",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 7,
          name: "f7",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 8,
          name: "f8",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 9,
          name: "f9",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 10,
          name: "f10",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 12,
          name: "f12",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { f2: 0, f3: 0, f6: 0, f7: 0, f8: 0, f9: 0, f10: 0, f12: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 f2 */
          2:
            message.f2 = reader.int32();
            break;
          case /* int32 f3 */
          3:
            message.f3 = reader.int32();
            break;
          case /* st3F5 st3F5 */
          5:
            message.st3F5 = st3F5.internalBinaryRead(reader, reader.uint32(), options, message.st3F5);
            break;
          case /* int32 f6 */
          6:
            message.f6 = reader.int32();
            break;
          case /* int32 f7 */
          7:
            message.f7 = reader.int32();
            break;
          case /* int32 f8 */
          8:
            message.f8 = reader.int32();
            break;
          case /* int32 f9 */
          9:
            message.f9 = reader.int32();
            break;
          case /* int32 f10 */
          10:
            message.f10 = reader.int32();
            break;
          case /* int32 f12 */
          12:
            message.f12 = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.f2 !== 0)
        writer.tag(2, WireType.Varint).int32(message.f2);
      if (message.f3 !== 0)
        writer.tag(3, WireType.Varint).int32(message.f3);
      if (message.st3F5)
        st3F5.internalBinaryWrite(message.st3F5, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
      if (message.f6 !== 0)
        writer.tag(6, WireType.Varint).int32(message.f6);
      if (message.f7 !== 0)
        writer.tag(7, WireType.Varint).int32(message.f7);
      if (message.f8 !== 0)
        writer.tag(8, WireType.Varint).int32(message.f8);
      if (message.f9 !== 0)
        writer.tag(9, WireType.Varint).int32(message.f9);
      if (message.f10 !== 0)
        writer.tag(10, WireType.Varint).int32(message.f10);
      if (message.f12 !== 0)
        writer.tag(12, WireType.Varint).int32(message.f12);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st2F88478200 = new st2F88478200$Type();
  var st2F66930374$Type = class extends MessageType {
    constructor() {
      super("st2F66930374", [
        { no: 3, name: "st3F3", kind: "message", repeat: 1, T: () => st3F3 },
        {
          no: 4,
          name: "num",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { st3F3: [], num: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* repeated st3F3 st3F3 */
          3:
            message.st3F3.push(st3F3.internalBinaryRead(reader, reader.uint32(), options));
            break;
          case /* int32 num */
          4:
            message.num = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      for (let i = 0; i < message.st3F3.length; i++)
        st3F3.internalBinaryWrite(message.st3F3[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
      if (message.num !== 0)
        writer.tag(4, WireType.Varint).int32(message.num);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st2F66930374 = new st2F66930374$Type();
  var st3F1$Type = class extends MessageType {
    constructor() {
      super("st3F1", [
        { no: 1, name: "st4F1", kind: "message", T: () => st4F1 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st4F1 st4F1 */
          1:
            message.st4F1 = st4F1.internalBinaryRead(reader, reader.uint32(), options, message.st4F1);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st4F1)
        st4F1.internalBinaryWrite(message.st4F1, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st3F1 = new st3F1$Type();
  var st3F3$Type = class extends MessageType {
    constructor() {
      super("st3F3", [
        { no: 61331416, name: "st4F61331416", kind: "message", T: () => st4F61331416 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st4F61331416 st4F61331416 */
          61331416:
            message.st4F61331416 = st4F61331416.internalBinaryRead(reader, reader.uint32(), options, message.st4F61331416);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st4F61331416)
        st4F61331416.internalBinaryWrite(message.st4F61331416, writer.tag(61331416, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st3F3 = new st3F3$Type();
  var st3F5$Type = class extends MessageType {
    constructor() {
      super("st3F5", [
        {
          no: 1,
          name: "f1",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 2,
          name: "f2",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        {
          no: 3,
          name: "f3",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        },
        { no: 4, name: "st2F4", kind: "message", T: () => st2F4 }
      ]);
    }
    create(value) {
      const message = { f1: 0, f2: 0, f3: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 f1 */
          1:
            message.f1 = reader.int32();
            break;
          case /* int32 f2 */
          2:
            message.f2 = reader.int32();
            break;
          case /* int32 f3 */
          3:
            message.f3 = reader.int32();
            break;
          case /* st2F4 st2F4 */
          4:
            message.st2F4 = st2F4.internalBinaryRead(reader, reader.uint32(), options, message.st2F4);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.f1 !== 0)
        writer.tag(1, WireType.Varint).int32(message.f1);
      if (message.f2 !== 0)
        writer.tag(2, WireType.Varint).int32(message.f2);
      if (message.f3 !== 0)
        writer.tag(3, WireType.Varint).int32(message.f3);
      if (message.st2F4)
        st2F4.internalBinaryWrite(message.st2F4, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st3F5 = new st3F5$Type();
  var st4F1$Type = class extends MessageType {
    constructor() {
      super("st4F1", [
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* string title */
          1:
            message.title = reader.string();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.title !== "")
        writer.tag(1, WireType.LengthDelimited).string(message.title);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st4F1 = new st4F1$Type();
  var st4F61331416$Type = class extends MessageType {
    constructor() {
      super("st4F61331416", [
        { no: 5, name: "st5F5", kind: "message", T: () => st5F5 },
        { no: 6, name: "st5F6", kind: "message", T: () => st5F5 },
        { no: 13, name: "st3F5", kind: "message", T: () => st3F5 },
        {
          no: 15,
          name: "f15",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { f15: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st5F5 st5F5 */
          5:
            message.st5F5 = st5F5.internalBinaryRead(reader, reader.uint32(), options, message.st5F5);
            break;
          case /* st5F5 st5F6 */
          6:
            message.st5F6 = st5F5.internalBinaryRead(reader, reader.uint32(), options, message.st5F6);
            break;
          case /* st3F5 st3F5 */
          13:
            message.st3F5 = st3F5.internalBinaryRead(reader, reader.uint32(), options, message.st3F5);
            break;
          case /* int32 f15 */
          15:
            message.f15 = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st5F5)
        st5F5.internalBinaryWrite(message.st5F5, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
      if (message.st5F6)
        st5F5.internalBinaryWrite(message.st5F6, writer.tag(6, WireType.LengthDelimited).fork(), options).join();
      if (message.st3F5)
        st3F5.internalBinaryWrite(message.st3F5, writer.tag(13, WireType.LengthDelimited).fork(), options).join();
      if (message.f15 !== 0)
        writer.tag(15, WireType.Varint).int32(message.f15);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st4F61331416 = new st4F61331416$Type();
  var st5F5$Type = class extends MessageType {
    constructor() {
      super("st5F5", [
        { no: 2, name: "st3F5", kind: "message", T: () => st3F5 },
        { no: 81212182, name: "st6F81212182", kind: "message", T: () => st6F81212182 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st3F5 st3F5 */
          2:
            message.st3F5 = st3F5.internalBinaryRead(reader, reader.uint32(), options, message.st3F5);
            break;
          case /* st6F81212182 st6F81212182 */
          81212182:
            message.st6F81212182 = st6F81212182.internalBinaryRead(reader, reader.uint32(), options, message.st6F81212182);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st3F5)
        st3F5.internalBinaryWrite(message.st3F5, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
      if (message.st6F81212182)
        st6F81212182.internalBinaryWrite(message.st6F81212182, writer.tag(81212182, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st5F5 = new st5F5$Type();
  var st6F81212182$Type = class extends MessageType {
    constructor() {
      super("st6F81212182", [
        { no: 1, name: "st7F1", kind: "message", T: () => st7F1 }
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st7F1 st7F1 */
          1:
            message.st7F1 = st7F1.internalBinaryRead(reader, reader.uint32(), options, message.st7F1);
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st7F1)
        st7F1.internalBinaryWrite(message.st7F1, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st6F81212182 = new st6F81212182$Type();
  var st7F1$Type = class extends MessageType {
    constructor() {
      super("st7F1", [
        { no: 1, name: "st8F1", kind: "message", T: () => st8F1 },
        {
          no: 3,
          name: "f3",
          kind: "scalar",
          T: 5
          /*ScalarType.INT32*/
        }
      ]);
    }
    create(value) {
      const message = { f3: 0 };
      globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
      if (value !== void 0)
        reflectionMergePartial(this, message, value);
      return message;
    }
    internalBinaryRead(reader, length, options, target) {
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* st8F1 st8F1 */
          1:
            message.st8F1 = st8F1.internalBinaryRead(reader, reader.uint32(), options, message.st8F1);
            break;
          case /* int32 f3 */
          3:
            message.f3 = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.st8F1)
        st8F1.internalBinaryWrite(message.st8F1, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
      if (message.f3 !== 0)
        writer.tag(3, WireType.Varint).int32(message.f3);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st7F1 = new st7F1$Type();
  var st8F1$Type = class extends MessageType {
    constructor() {
      super("st8F1", [
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
      let message = target != null ? target : this.create(), end = reader.pos + length;
      while (reader.pos < end) {
        let [fieldNo, wireType] = reader.tag();
        switch (fieldNo) {
          case /* int32 f1 */
          1:
            message.f1 = reader.int32();
            break;
          default:
            let u = options.readUnknownField;
            if (u === "throw")
              throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
            let d = reader.skip(wireType);
            if (u !== false)
              (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
        }
      }
      return message;
    }
    internalBinaryWrite(message, writer, options) {
      if (message.f1 !== 0)
        writer.tag(1, WireType.Varint).int32(message.f1);
      let u = options.writeUnknownFields;
      if (u !== false)
        (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
      return writer;
    }
  };
  var st8F1 = new st8F1$Type();

  // src/handler.ts
  var YouTubeMessage = class {
    constructor(whiteObj, name) {
      this.decoder = new TextDecoder("utf-8", {
        fatal: false,
        ignoreBOM: true
      });
      $.log(name);
      this.whiteNo = whiteObj.whiteNo;
      this.blackNo = whiteObj.blackNo;
      this.whiteEml = whiteObj.whiteEml;
      this.blackEml = whiteObj.blackEml;
    }
    save() {
      if (this.needSave) {
        $.log("Update Config");
        const YouTubeWhiteObj = {
          whiteNo: this.whiteNo,
          blackNo: this.blackNo,
          whiteEml: this.whiteEml,
          blackEml: this.blackEml
        };
        $.setjson(YouTubeWhiteObj, "YouTubeWhiteStr");
      }
    }
    done() {
      this.save();
      if (this.needProcess) {
        this.toBinary();
        $.log("Handle");
        if ($.isQuanX()) {
          $.done({
            bodyBytes: this.body.buffer.slice(
              this.body.byteOffset,
              this.body.byteLength + this.body.byteOffset
            )
          });
        } else {
          $.done({ body: this.body });
        }
      } else {
        $.done();
      }
    }
    iterate(obj = {}, target, call, proto) {
      const stack = [];
      stack.push(obj);
      while (stack.length) {
        const item = stack.pop();
        for (const key of Object.keys(item)) {
          if (key === target) {
            call(item, stack);
          } else if (typeof item[key] === "object") {
            stack.push(item[key]);
            if (typeof proto === "function") {
              proto(item, stack);
            }
          }
        }
      }
    }
    isAdvertise(o) {
      const unknownFiled = UnknownFieldHandler.list(o)[0];
      const adFlag = unknownFiled ? this.handleUnknownField(unknownFiled) : this.handleKnownField(o);
      if (adFlag)
        this.needProcess = true;
      return adFlag;
    }
    isUpload(o) {
      const isUpload = o == null ? void 0 : o.g4F318370163;
      if (isUpload)
        this.needProcess = true;
      return isUpload;
    }
    handleUnknownField(field) {
      const no = field.no;
      if (this.whiteNo.includes(no)) {
        return false;
      } else if (this.blackNo.includes(no))
        return true;
      const rawText = this.decoder.decode(field.data);
      const adFlag = rawText.includes("pagead");
      adFlag ? this.blackNo.push(no) : this.whiteNo.push(no);
      this.needSave = true;
      $.log("UnknownField:" + no + ": " + adFlag);
      return adFlag;
    }
    handleKnownField(field) {
      let adFlag = false;
      let match = true;
      let type = "";
      this.iterate(field, "type", (obj, stack) => {
        type = obj.type.split("|")[0];
        if (this.whiteEml.includes(type)) {
          adFlag = false;
        } else if (this.blackEml.includes(type) || /shorts(?!_pivot_item)/.test(type)) {
          adFlag = true;
        } else {
          match = false;
        }
        if (match)
          stack.length = 0;
      });
      if (!match) {
        this.iterate(
          field,
          "type",
          () => {
          },
          (obj, stack) => {
            for (const unknownFiled of UnknownFieldHandler.list(obj)) {
              if (unknownFiled.data.length > 1e3) {
                const rawText = this.decoder.decode(unknownFiled.data);
                adFlag = rawText.includes("pagead");
                if (adFlag) {
                  stack.length = 0;
                  break;
                }
              }
            }
          }
        );
        adFlag ? this.blackEml.push(type) : this.whiteEml.push(type);
        this.needSave = true;
      }
      return adFlag;
    }
  };
  var BrowseMessage = class extends YouTubeMessage {
    constructor(whiteObj, name = "Browse") {
      super(whiteObj, name);
    }
    fromBinary(binaryBody2) {
      this.message = Browse.fromBinary(binaryBody2);
    }
    pure() {
      this.iterate(this.message, "n5F1", (obj) => {
        var _a;
        for (let i = ((_a = obj.n5F1) == null ? void 0 : _a.length) - 1; i >= 0; i--) {
          if (this.isAdvertise(obj.n5F1[i])) {
            obj.n5F1.splice(i, 1);
          }
        }
      });
    }
    toBinary() {
      this.body = Browse.toBinary(this.message);
    }
  };
  var NextMessage = class extends BrowseMessage {
    constructor(whiteObj, name = "Next") {
      super(whiteObj, name);
    }
    fromBinary(binaryBody2) {
      this.message = Next.fromBinary(binaryBody2);
    }
    toBinary() {
      this.body = Next.toBinary(this.message);
    }
  };
  var PlayerMessage = class extends YouTubeMessage {
    constructor(whiteObj, name = "Player") {
      super(whiteObj, name);
    }
    fromBinary(binaryBody2) {
      this.message = Player.fromBinary(binaryBody2);
    }
    pure() {
      var _a, _b, _c, _d, _e;
      if ((_a = this.message.p1F7) == null ? void 0 : _a.length) {
        this.message.p1F7.length = 0;
      }
      const option = (_d = (_c = (_b = this.message) == null ? void 0 : _b.p1F2) == null ? void 0 : _c.p2F21) == null ? void 0 : _d.p3F151635310;
      if (typeof option === "object") {
        option.pip = 1;
      }
      const backPlayFake = {
        p2F11: {
          p3F64657230: {
            backPlay: 1
          }
        }
      };
      if (typeof ((_e = this.message) == null ? void 0 : _e.p1F2) === "object") {
        Object.assign(this.message.p1F2, backPlayFake);
      }
      this.iterate(this.message, "captionTracks", (obj, stack) => {
        let captionTracks = obj.captionTracks;
        if (Array.isArray(captionTracks)) {
          for (let captionTrack of captionTracks) {
            captionTrack.isTranslatable = true;
          }
        }
        obj.translationLanguages = [{ "languageCode": "sq", "languageName": { "runs": [{ "text": "\u963F\u5C14\u5DF4\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "ak", "languageName": { "runs": [{ "text": "\u963F\u80AF\u8BED" }] } }, { "languageCode": "ar", "languageName": { "runs": [{ "text": "\u963F\u62C9\u4F2F\u8BED" }] } }, { "languageCode": "am", "languageName": { "runs": [{ "text": "\u963F\u59C6\u54C8\u62C9\u8BED" }] } }, { "languageCode": "as", "languageName": { "runs": [{ "text": "\u963F\u8428\u59C6\u8BED" }] } }, { "languageCode": "az", "languageName": { "runs": [{ "text": "\u963F\u585E\u62DC\u7586\u8BED" }] } }, { "languageCode": "ee", "languageName": { "runs": [{ "text": "\u57C3\u7EF4\u8BED" }] } }, { "languageCode": "ay", "languageName": { "runs": [{ "text": "\u827E\u9A6C\u62C9\u8BED" }] } }, { "languageCode": "ga", "languageName": { "runs": [{ "text": "\u7231\u5C14\u5170\u8BED" }] } }, { "languageCode": "et", "languageName": { "runs": [{ "text": "\u7231\u6C99\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "or", "languageName": { "runs": [{ "text": "\u5965\u91CC\u4E9A\u8BED" }] } }, { "languageCode": "om", "languageName": { "runs": [{ "text": "\u5965\u7F57\u83AB\u8BED" }] } }, { "languageCode": "eu", "languageName": { "runs": [{ "text": "\u5DF4\u65AF\u514B\u8BED" }] } }, { "languageCode": "be", "languageName": { "runs": [{ "text": "\u767D\u4FC4\u7F57\u65AF\u8BED" }] } }, { "languageCode": "bg", "languageName": { "runs": [{ "text": "\u4FDD\u52A0\u5229\u4E9A\u8BED" }] } }, { "languageCode": "nso", "languageName": { "runs": [{ "text": "\u5317\u7D22\u6258\u8BED" }] } }, { "languageCode": "is", "languageName": { "runs": [{ "text": "\u51B0\u5C9B\u8BED" }] } }, { "languageCode": "pl", "languageName": { "runs": [{ "text": "\u6CE2\u5170\u8BED" }] } }, { "languageCode": "bs", "languageName": { "runs": [{ "text": "\u6CE2\u65AF\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "fa", "languageName": { "runs": [{ "text": "\u6CE2\u65AF\u8BED" }] } }, { "languageCode": "bho", "languageName": { "runs": [{ "text": "\u535A\u6770\u666E\u5C14\u8BED" }] } }, { "languageCode": "ts", "languageName": { "runs": [{ "text": "\u806A\u52A0\u8BED" }] } }, { "languageCode": "tt", "languageName": { "runs": [{ "text": "\u9791\u977C\u8BED" }] } }, { "languageCode": "da", "languageName": { "runs": [{ "text": "\u4E39\u9EA6\u8BED" }] } }, { "languageCode": "de", "languageName": { "runs": [{ "text": "\u5FB7\u8BED" }] } }, { "languageCode": "dv", "languageName": { "runs": [{ "text": "\u8FEA\u7EF4\u5E0C\u8BED" }] } }, { "languageCode": "ru", "languageName": { "runs": [{ "text": "\u4FC4\u8BED" }] } }, { "languageCode": "fr", "languageName": { "runs": [{ "text": "\u6CD5\u8BED" }] } }, { "languageCode": "sa", "languageName": { "runs": [{ "text": "\u68B5\u8BED" }] } }, { "languageCode": "fil", "languageName": { "runs": [{ "text": "\u83F2\u5F8B\u5BBE\u8BED" }] } }, { "languageCode": "fi", "languageName": { "runs": [{ "text": "\u82AC\u5170\u8BED" }] } }, { "languageCode": "km", "languageName": { "runs": [{ "text": "\u9AD8\u68C9\u8BED" }] } }, { "languageCode": "ka", "languageName": { "runs": [{ "text": "\u683C\u9C81\u5409\u4E9A\u8BED" }] } }, { "languageCode": "gu", "languageName": { "runs": [{ "text": "\u53E4\u5409\u62C9\u7279\u8BED" }] } }, { "languageCode": "gn", "languageName": { "runs": [{ "text": "\u74DC\u62C9\u5C3C\u8BED" }] } }, { "languageCode": "kk", "languageName": { "runs": [{ "text": "\u54C8\u8428\u514B\u8BED" }] } }, { "languageCode": "ht", "languageName": { "runs": [{ "text": "\u6D77\u5730\u514B\u91CC\u5965\u5C14\u8BED" }] } }, { "languageCode": "ko", "languageName": { "runs": [{ "text": "\u97E9\u8BED" }] } }, { "languageCode": "ha", "languageName": { "runs": [{ "text": "\u8C6A\u8428\u8BED" }] } }, { "languageCode": "nl", "languageName": { "runs": [{ "text": "\u8377\u5170\u8BED" }] } }, { "languageCode": "gl", "languageName": { "runs": [{ "text": "\u52A0\u5229\u897F\u4E9A\u8BED" }] } }, { "languageCode": "ca", "languageName": { "runs": [{ "text": "\u52A0\u6CF0\u7F57\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "cs", "languageName": { "runs": [{ "text": "\u6377\u514B\u8BED" }] } }, { "languageCode": "kn", "languageName": { "runs": [{ "text": "\u5361\u7EB3\u8FBE\u8BED" }] } }, { "languageCode": "ky", "languageName": { "runs": [{ "text": "\u67EF\u5C14\u514B\u5B5C\u8BED" }] } }, { "languageCode": "xh", "languageName": { "runs": [{ "text": "\u79D1\u8428\u8BED" }] } }, { "languageCode": "co", "languageName": { "runs": [{ "text": "\u79D1\u897F\u5609\u8BED" }] } }, { "languageCode": "hr", "languageName": { "runs": [{ "text": "\u514B\u7F57\u5730\u4E9A\u8BED" }] } }, { "languageCode": "qu", "languageName": { "runs": [{ "text": "\u514B\u4E18\u4E9A\u8BED" }] } }, { "languageCode": "ku", "languageName": { "runs": [{ "text": "\u5E93\u5C14\u5FB7\u8BED" }] } }, { "languageCode": "la", "languageName": { "runs": [{ "text": "\u62C9\u4E01\u8BED" }] } }, { "languageCode": "lv", "languageName": { "runs": [{ "text": "\u62C9\u8131\u7EF4\u4E9A\u8BED" }] } }, { "languageCode": "lo", "languageName": { "runs": [{ "text": "\u8001\u631D\u8BED" }] } }, { "languageCode": "lt", "languageName": { "runs": [{ "text": "\u7ACB\u9676\u5B9B\u8BED" }] } }, { "languageCode": "ln", "languageName": { "runs": [{ "text": "\u6797\u52A0\u62C9\u8BED" }] } }, { "languageCode": "lg", "languageName": { "runs": [{ "text": "\u5362\u5E72\u8FBE\u8BED" }] } }, { "languageCode": "lb", "languageName": { "runs": [{ "text": "\u5362\u68EE\u5821\u8BED" }] } }, { "languageCode": "rw", "languageName": { "runs": [{ "text": "\u5362\u65FA\u8FBE\u8BED" }] } }, { "languageCode": "ro", "languageName": { "runs": [{ "text": "\u7F57\u9A6C\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "mt", "languageName": { "runs": [{ "text": "\u9A6C\u8033\u4ED6\u8BED" }] } }, { "languageCode": "mr", "languageName": { "runs": [{ "text": "\u9A6C\u62C9\u5730\u8BED" }] } }, { "languageCode": "mg", "languageName": { "runs": [{ "text": "\u9A6C\u62C9\u52A0\u65AF\u8BED" }] } }, { "languageCode": "ml", "languageName": { "runs": [{ "text": "\u9A6C\u62C9\u96C5\u62C9\u59C6\u8BED" }] } }, { "languageCode": "ms", "languageName": { "runs": [{ "text": "\u9A6C\u6765\u8BED" }] } }, { "languageCode": "mk", "languageName": { "runs": [{ "text": "\u9A6C\u5176\u987F\u8BED" }] } }, { "languageCode": "mi", "languageName": { "runs": [{ "text": "\u6BDB\u5229\u8BED" }] } }, { "languageCode": "mn", "languageName": { "runs": [{ "text": "\u8499\u53E4\u8BED" }] } }, { "languageCode": "bn", "languageName": { "runs": [{ "text": "\u5B5F\u52A0\u62C9\u8BED" }] } }, { "languageCode": "my", "languageName": { "runs": [{ "text": "\u7F05\u7538\u8BED" }] } }, { "languageCode": "hmn", "languageName": { "runs": [{ "text": "\u82D7\u8BED" }] } }, { "languageCode": "af", "languageName": { "runs": [{ "text": "\u5357\u975E\u8377\u5170\u8BED" }] } }, { "languageCode": "st", "languageName": { "runs": [{ "text": "\u5357\u7D22\u6258\u8BED" }] } }, { "languageCode": "ne", "languageName": { "runs": [{ "text": "\u5C3C\u6CCA\u5C14\u8BED" }] } }, { "languageCode": "no", "languageName": { "runs": [{ "text": "\u632A\u5A01\u8BED" }] } }, { "languageCode": "pa", "languageName": { "runs": [{ "text": "\u65C1\u906E\u666E\u8BED" }] } }, { "languageCode": "pt", "languageName": { "runs": [{ "text": "\u8461\u8404\u7259\u8BED" }] } }, { "languageCode": "ps", "languageName": { "runs": [{ "text": "\u666E\u4EC0\u56FE\u8BED" }] } }, { "languageCode": "ny", "languageName": { "runs": [{ "text": "\u9F50\u5207\u74E6\u8BED" }] } }, { "languageCode": "ja", "languageName": { "runs": [{ "text": "\u65E5\u8BED" }] } }, { "languageCode": "sv", "languageName": { "runs": [{ "text": "\u745E\u5178\u8BED" }] } }, { "languageCode": "sm", "languageName": { "runs": [{ "text": "\u8428\u6469\u4E9A\u8BED" }] } }, { "languageCode": "sr", "languageName": { "runs": [{ "text": "\u585E\u5C14\u7EF4\u4E9A\u8BED" }] } }, { "languageCode": "si", "languageName": { "runs": [{ "text": "\u50E7\u4F3D\u7F57\u8BED" }] } }, { "languageCode": "sn", "languageName": { "runs": [{ "text": "\u7ECD\u7EB3\u8BED" }] } }, { "languageCode": "eo", "languageName": { "runs": [{ "text": "\u4E16\u754C\u8BED" }] } }, { "languageCode": "sk", "languageName": { "runs": [{ "text": "\u65AF\u6D1B\u4F10\u514B\u8BED" }] } }, { "languageCode": "sl", "languageName": { "runs": [{ "text": "\u65AF\u6D1B\u6587\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "sw", "languageName": { "runs": [{ "text": "\u65AF\u74E6\u5E0C\u91CC\u8BED" }] } }, { "languageCode": "gd", "languageName": { "runs": [{ "text": "\u82CF\u683C\u5170\u76D6\u5C14\u8BED" }] } }, { "languageCode": "ceb", "languageName": { "runs": [{ "text": "\u5BBF\u52A1\u8BED" }] } }, { "languageCode": "so", "languageName": { "runs": [{ "text": "\u7D22\u9A6C\u91CC\u8BED" }] } }, { "languageCode": "tg", "languageName": { "runs": [{ "text": "\u5854\u5409\u514B\u8BED" }] } }, { "languageCode": "te", "languageName": { "runs": [{ "text": "\u6CF0\u5362\u56FA\u8BED" }] } }, { "languageCode": "ta", "languageName": { "runs": [{ "text": "\u6CF0\u7C73\u5C14\u8BED" }] } }, { "languageCode": "th", "languageName": { "runs": [{ "text": "\u6CF0\u8BED" }] } }, { "languageCode": "ti", "languageName": { "runs": [{ "text": "\u63D0\u683C\u5229\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "tr", "languageName": { "runs": [{ "text": "\u571F\u8033\u5176\u8BED" }] } }, { "languageCode": "tk", "languageName": { "runs": [{ "text": "\u571F\u5E93\u66FC\u8BED" }] } }, { "languageCode": "cy", "languageName": { "runs": [{ "text": "\u5A01\u5C14\u58EB\u8BED" }] } }, { "languageCode": "ug", "languageName": { "runs": [{ "text": "\u7EF4\u543E\u5C14\u8BED" }] } }, { "languageCode": "und", "languageName": { "runs": [{ "text": "\u672A\u77E5\u8BED\u8A00" }] } }, { "languageCode": "ur", "languageName": { "runs": [{ "text": "\u4E4C\u5C14\u90FD\u8BED" }] } }, { "languageCode": "uk", "languageName": { "runs": [{ "text": "\u4E4C\u514B\u5170\u8BED" }] } }, { "languageCode": "uz", "languageName": { "runs": [{ "text": "\u4E4C\u5179\u522B\u514B\u8BED" }] } }, { "languageCode": "es", "languageName": { "runs": [{ "text": "\u897F\u73ED\u7259\u8BED" }] } }, { "languageCode": "fy", "languageName": { "runs": [{ "text": "\u897F\u5F17\u91CC\u897F\u4E9A\u8BED" }] } }, { "languageCode": "iw", "languageName": { "runs": [{ "text": "\u5E0C\u4F2F\u6765\u8BED" }] } }, { "languageCode": "el", "languageName": { "runs": [{ "text": "\u5E0C\u814A\u8BED" }] } }, { "languageCode": "haw", "languageName": { "runs": [{ "text": "\u590F\u5A01\u5937\u8BED" }] } }, { "languageCode": "sd", "languageName": { "runs": [{ "text": "\u4FE1\u5FB7\u8BED" }] } }, { "languageCode": "hu", "languageName": { "runs": [{ "text": "\u5308\u7259\u5229\u8BED" }] } }, { "languageCode": "su", "languageName": { "runs": [{ "text": "\u5DFD\u4ED6\u8BED" }] } }, { "languageCode": "hy", "languageName": { "runs": [{ "text": "\u4E9A\u7F8E\u5C3C\u4E9A\u8BED" }] } }, { "languageCode": "ig", "languageName": { "runs": [{ "text": "\u4F0A\u535A\u8BED" }] } }, { "languageCode": "it", "languageName": { "runs": [{ "text": "\u610F\u5927\u5229\u8BED" }] } }, { "languageCode": "yi", "languageName": { "runs": [{ "text": "\u610F\u7B2C\u7EEA\u8BED" }] } }, { "languageCode": "hi", "languageName": { "runs": [{ "text": "\u5370\u5730\u8BED" }] } }, { "languageCode": "id", "languageName": { "runs": [{ "text": "\u5370\u5EA6\u5C3C\u897F\u4E9A\u8BED" }] } }, { "languageCode": "en", "languageName": { "runs": [{ "text": "\u82F1\u8BED" }] } }, { "languageCode": "yo", "languageName": { "runs": [{ "text": "\u7EA6\u9C81\u5DF4\u8BED" }] } }, { "languageCode": "vi", "languageName": { "runs": [{ "text": "\u8D8A\u5357\u8BED" }] } }, { "languageCode": "jv", "languageName": { "runs": [{ "text": "\u722A\u54C7\u8BED" }] } }, { "languageCode": "zh-Hant", "languageName": { "runs": [{ "text": "\u4E2D\u6587\uFF08\u7E41\u4F53\uFF09" }] } }, { "languageCode": "zh-Hans", "languageName": { "runs": [{ "text": "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09" }] } }, { "languageCode": "zu", "languageName": { "runs": [{ "text": "\u7956\u9C81\u8BED" }] } }, { "languageCode": "kri", "languageName": { "runs": [{ "text": "Kri" }] } }];
        if (!(obj == null ? void 0 : obj.defaultCaptionTrackIndex))
          obj.defaultCaptionTrackIndex = 0;
        stack.length = 0;
      });
      this.needProcess = true;
    }
    toBinary() {
      this.body = Player.toBinary(this.message);
    }
  };
  var SearchMessage = class extends BrowseMessage {
    constructor(whiteObj, name = "Search") {
      super(whiteObj, name);
    }
    fromBinary(binaryBody2) {
      this.message = Search.fromBinary(binaryBody2);
    }
    toBinary() {
      this.body = Search.toBinary(this.message);
    }
  };
  var ShortsMessage = class extends YouTubeMessage {
    constructor(whiteObj, name = "Shorts") {
      super(whiteObj, name);
    }
    fromBinary(binaryBody2) {
      this.message = Shorts.fromBinary(binaryBody2);
    }
    pure() {
      var _a, _b, _c;
      const shortsRawLength = (_a = this.message.t1F2) == null ? void 0 : _a.length;
      if (shortsRawLength) {
        for (let i = shortsRawLength - 1; i >= 0; i--) {
          if (!((_c = (_b = this.message.t1F2[i].n2F1) == null ? void 0 : _b.n3F139608561) == null ? void 0 : _c.n4F8)) {
            this.message.t1F2.splice(i, 1);
            this.needProcess = true;
          }
        }
      }
    }
    toBinary() {
      this.body = Shorts.toBinary(this.message);
    }
  };
  var GuideMessage = class extends YouTubeMessage {
    constructor(whiteObj, name = "Guide") {
      super(whiteObj, name);
    }
    fromBinary(binaryBody2) {
      this.message = Guide.fromBinary(binaryBody2);
    }
    pure() {
      this.iterate(this.message, "g3F1", (obj) => {
        for (let i = obj.g3F1.length - 1; i >= 0; i--) {
          if (this.isUpload(obj.g3F1[i])) {
            obj.g3F1.splice(i, 1);
          }
        }
      });
    }
    toBinary() {
      this.body = Guide.toBinary(this.message);
    }
  };
  var SettingMessage = class extends YouTubeMessage {
    constructor(whiteObj, name = "Setting") {
      super(whiteObj, name);
    }
    fromBinary(binaryBody2) {
      this.message = Setting.fromBinary(binaryBody2);
    }
    pure() {
      this.iterate(this.message, "num", (obj) => {
        if (obj.num === 10005) {
          const st3F52 = {
            f1: 135,
            f2: 20434,
            f3: 2,
            st2F4: this.message.st1F10.st2F4
          };
          const fakePIP = {
            st4F61331416: {
              f15: 0,
              st5F5: {
                st3F5: st3F52,
                st6F81212182: {
                  st7F1: {
                    st8F1: { f1: 151 },
                    f3: 1
                  }
                }
              },
              st5F6: {
                st3F5: st3F52,
                st6F81212182: {
                  st7F1: {
                    st8F1: { f1: 151 },
                    f3: 0
                  }
                }
              },
              st3F5: st3F52
            }
          };
          obj.st3F3.push(fakePIP);
        }
      });
      const fakeF88478200 = {
        st2F88478200: {
          // st3F1: { st4F1: { title: 'Background & downloads' } },
          f2: 1,
          f3: 1,
          st3F5: {
            f1: 2,
            f2: 20020,
            f3: 8,
            st2F4: this.message.st1F10.st2F4
          },
          f6: 0,
          f7: 1,
          f8: 1,
          f9: 1,
          f10: 1,
          f12: 1
        }
      };
      this.message.st1F6.push(JSON.parse(JSON.stringify(fakeF88478200)));
      fakeF88478200.st2F88478200.st3F5.f1 = 1;
      fakeF88478200.st2F88478200.st3F5.f3 = 9;
      this.message.st1F7 = fakeF88478200;
      this.needProcess = true;
    }
    toBinary() {
      this.body = Setting.toBinary(this.message);
    }
  };

  // lib/factory.ts
  var Factory = class {
    static create(url2, opt2) {
      if (url2.includes("/v1/browse")) {
        return new BrowseMessage(opt2);
      } else if (url2.includes("/v1/next")) {
        return new NextMessage(opt2);
      } else if (url2.includes("/v1/player")) {
        return new PlayerMessage(opt2);
      } else if (url2.includes("/v1/search")) {
        return new SearchMessage(opt2);
      } else if (url2.includes("/v1/reel/reel_watch_sequence")) {
        return new ShortsMessage(opt2);
      } else if (url2.includes("/v1/guide")) {
        return new GuideMessage(opt2);
      } else if (url2.includes("/v1/account/get_setting")) {
        return new SettingMessage(opt2);
      } else {
        return false;
      }
    }
  };

  // main.ts
  var url = $request.url;
  var binaryBody = $.isQuanX() ? new Uint8Array($response.bodyBytes) : $response.body;
  var opt = $.getjson("YouTubeWhiteStr", {
    whiteNo: [],
    blackNo: [],
    whiteEml: [],
    blackEml: []
  });
  var youtubeMsg = Factory.create(url, opt);
  if (youtubeMsg) {
    youtubeMsg.fromBinary(binaryBody);
    youtubeMsg.pure();
    youtubeMsg.done();
  } else {
    $.msg("YouTubeAds", "\u811A\u672C\u9700\u8981\u66F4\u65B0", "\u5916\u90E8\u8D44\u6E90 -> \u5168\u90E8\u66F4\u65B0");
    $.done();
  }
})();
