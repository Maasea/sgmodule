// modified https://github.com/DualSubs/URL/blob/main/URLs.embedded.js
const URLRegex =
  /(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/;

export default class URLs {
  constructor (url = "") {
    this.name = "URL v1.0.2";
    if (!url) throw new Error("Empty URL");
    this.parse(url);
  }

  parse (url) {
    const {
      scheme,
      host,
      path = "",
      params,
    } = url.match(URLRegex)?.groups ?? {};

    this.scheme = scheme;
    this.host = host;
    this.path = path;
    this.params = params
      ? params.split("&").reduce((result, pair) => {
        const [key, value] = pair.split("=");
        result[key] = value;
        return result;
      }, {})
      : {};
  }

  toString () {
    let url = this.scheme + "://" + this.host + "/" + this.path;

    if (this.params) {
      url +=
        "?" +
        Object.entries(this.params).reduce((result, [key, value], index) => {
          return result + (index ? "&" : "") + key + "=" + value;
        }, "");
    }

    return url;
  }
}
