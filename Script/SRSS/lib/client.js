export default class Client {
  constructor(name, className, options) {
    this._times = new Map();
    this.name = name ?? "";
    this.debug = options?.debug ?? false;
    if (name) {
      this.log(`${name} Start`);
    }
    this.className = className ?? "";
    this.init();
  }
  static getInstance(name, options) {
    const className = typeof $task !== "undefined" ? "QuanX" : "Surge";
    if (!Client.instances[className]) {
      Client.instances[className] = Client.classNames[className](
        name,
        className,
        options
      );
    }
    return Client.instances[className];
  }
  createProxy(target) {
    return new Proxy(target, {
      get: this.getFn,
      set: this.setFn,
    });
  }
  getFn(t, p, r) {
    return t[p];
  }
  setFn(t, p, v, r) {
    t[p] = v;
    return true;
  }
  getJSON(key, alter = {}) {
    const val = this.getVal(key);
    return val ? JSON.parse(val) : alter;
  }
  setJSON(val, key) {
    this.setVal(JSON.stringify(val), key);
  }
  msg(title = this.name, subTitle = "", desc = "", url) {}
  log(val) {
    if (this.debug) {
      if (typeof val === "object") {
        val = JSON.stringify(val);
      }
      console.log(val);
    }
  }
  timeStart(label) {
    this._times.set(label, Date.now());
  }
  timeEnd(label) {
    if (this._times?.has(label)) {
      const timeElapsed = Date.now() - this._times.get(label);
      this.log(`${label}: ${timeElapsed}ms`);
      this._times.delete(label);
    } else {
      this.log(`Timer with label ${label} does not exist.`);
    }
  }
  exit() {
    $done({});
  }
  reject() {
    $done();
  }
}
Client.instances = {};
Client.classNames = {
  QuanX: (name, className, options) =>
    new QuanXClient(name, className, options),
  Surge: (name, className, options) =>
    new SurgeClient(name, className, options),
};
export class SurgeClient extends Client {
  getFn(t, p, receiver) {
    const key = SurgeClient.clientAdapter[p] || p;
    return super.getFn(t, key, receiver);
  }
  setFn(t, p, newValue, receiver) {
    const key = SurgeClient.clientAdapter[p] || p;
    return super.setFn(t, key, newValue, receiver);
  }
  init() {
    try {
      this.request = this.createProxy($request);
      this.response = this.createProxy($response);
    } catch (e) {
      this.log(e.toString());
    }
  }
  getVal(key) {
    return $persistentStore.read(key);
  }
  setVal(val, key) {
    $persistentStore.write(val, key);
  }
  msg(title = this.name, subTitle = "", desc = "", url) {
    $notification.post(title, subTitle, desc, { url: url ?? "" });
  }
  async fetch(request) {
    return await new Promise((resolve, reject) => {
      const { method, body, bodyBytes, ...httpClientRequest } = request;
      const realBody = bodyBytes ?? body;
      const isBinary = realBody instanceof Uint8Array;
      $httpClient[method.toLowerCase()](
        {
          ...httpClientRequest,
          body: realBody,
          "binary-mode": isBinary,
        },
        (error, response, data) => {
          if (error) {
            reject(error);
          }
          const bodyKey = isBinary ? "bodyBytes" : "body";
          resolve({
            status: response.status || response.statusCode,
            headers: response.headers,
            [bodyKey]: data,
          });
        }
      );
    });
  }
  done(cDone) {
    const realResponse = cDone.response ?? cDone;
    let body;
    let sgDone;
    if (realResponse.bodyBytes) {
      body = realResponse.bodyBytes;
      delete realResponse.bodyBytes;
      sgDone = { ...cDone };
      sgDone.response ? (sgDone.response.body = body) : (sgDone.body = body);
    } else {
      sgDone = cDone;
    }
    $done(sgDone);
  }
}
SurgeClient.clientAdapter = {
  bodyBytes: "body",
};
export class QuanXClient extends Client {
  static transferBodyBytes(bodyBytes, target) {
    if (bodyBytes instanceof ArrayBuffer) {
      return target === "Uint8Array" ? new Uint8Array(bodyBytes) : bodyBytes;
    } else if (bodyBytes instanceof Uint8Array) {
      return target === "ArrayBuffer"
        ? bodyBytes.buffer.slice(
            bodyBytes.byteOffset,
            bodyBytes.byteLength + bodyBytes.byteOffset
          )
        : bodyBytes;
    }
    return bodyBytes;
  }
  init() {
    try {
      this.request = this.createProxy($request);
      this.response = this.createProxy($response);
    } catch (e) {
      this.log(e.toString());
    }
  }
  getFn(t, p, receiver) {
    const key = QuanXClient.clientAdapter[p] || p;
    let output = super.getFn(t, key, receiver);
    if (p === "bodyBytes") {
      output = QuanXClient.transferBodyBytes(output, "Uint8Array");
    }
    return output;
  }
  setFn(t, p, newValue, receiver) {
    const key = QuanXClient.clientAdapter[p] || p;
    let output = newValue;
    if (p === "bodyBytes") {
      output = QuanXClient.transferBodyBytes(output, "Uint8Array");
    }
    return super.setFn(t, key, output, receiver);
  }
  getVal(key) {
    return $prefs.valueForKey(key)?.replace(/\0/g, "");
  }
  setVal(val, key) {
    $prefs.setValueForKey(val, key);
  }
  msg(title = this.name, subTitle = "", desc = "", url) {
    $notify(title, subTitle, desc, { "open-url": url ?? "" });
  }
  async fetch(request) {
    return await new Promise((resolve) => {
      const qxFetchRequest = {
        url: "",
        method: "GET",
      };
      for (const [key, value] of Object.entries(request)) {
        if (key === "id") {
          qxFetchRequest.sessionIndex = value;
        } else if (key === "bodyBytes") {
          qxFetchRequest.bodyBytes = QuanXClient.transferBodyBytes(
            value,
            "ArrayBuffer"
          );
        } else {
          qxFetchRequest[key] = value;
        }
      }
      if (request.bodyBytes) delete qxFetchRequest.body;
      void $task.fetch(qxFetchRequest).then((resp) => {
        const cFetchResponse = {
          status: 200,
          headers: {},
        };
        for (const [key, value] of Object.entries(resp)) {
          if (key === "sessionIndex") {
            cFetchResponse.id = value;
          } else if (key === "bodyBytes") {
            cFetchResponse.bodyBytes = QuanXClient.transferBodyBytes(
              value,
              "Uint8Array"
            );
          } else if (key === "statusCode") {
            cFetchResponse.status = value;
          } else {
            cFetchResponse[key] = value;
          }
        }
        resolve(cFetchResponse);
      });
    });
  }
  done(cDone) {
    const realResponse = cDone.response ?? cDone;
    const qxDone = {};
    for (const [key, value] of Object.entries(realResponse)) {
      if (key === "status") {
        qxDone.status = `HTTP/1.1 ${value}`;
      } else if (key === "bodyBytes") {
        qxDone.bodyBytes = QuanXClient.transferBodyBytes(value, "ArrayBuffer");
      } else {
        qxDone[key] = value;
      }
    }
    $done(qxDone);
  }
}
QuanXClient.clientAdapter = {
  id: "sessionIndex",
  status: "statusCode",
};
