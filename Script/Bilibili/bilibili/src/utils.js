const originRegex = /^(http|https):\/\/[^/]*/;

// Refer to BiliUniverse/ADBlock
export function newRawBody(body) {
  const checksum = Checksum(body.length);
  const rawBody = new Uint8Array(5 + body.length);

  rawBody[0] = 0; // 直接置protobuf 为未压缩状态
  rawBody.set(checksum, 1); // 1-4位： 校验值(4位)
  rawBody.set(body, 5); // 5-end位：protobuf数据
  return rawBody;
}

function Checksum(num) {
  let arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
  let view = new DataView(arr);
  view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
  return new Uint8Array(arr);
}

export const defaultCDN = {
  protocol: "http",
  hostname: "upos-sz-mirrorali.bilivideo.com",
  port: 80,
  active: false,
  needWrite: true,
};

export function getCDNHost() {
  const { protocol, hostname, port, active, needWrite } = getCDN();
  const replaceHost = `${protocol}://${hostname}:${port}`;

  if (needWrite) {
    setDefaultCDN();
  }

  return active ? replaceHost : null;
}

export function getCDN() {
  const bilibiliCDN = $persistentStore.read("Bilibili-CDN");
  return bilibiliCDN ? JSON.parse(bilibiliCDN) : defaultCDN;
}

export function setDefaultCDN() {
  delete defaultCDN.needWrite;
  $persistentStore.write(JSON.stringify(defaultCDN), "Bilibili-CDN");
}

export function replaceViewBaseUrl(items, replaceHost) {
  for (const item of items) {
    const baseUrl = item.base_url;
    // change CDN
    item.base_url = baseUrl.replace(originRegex, replaceHost);
  }
}

export function replacePlayBaseURL(items, replaceHost) {
  for (let item of items) {
    const info = item.baseURL ? item : item.dashVideo;

    if (info) {
      const baseURL = info.baseURL;
      info.baseURL = baseURL.replace(originRegex, replaceHost);
    }
  }
  console.log(`CDN replace -> ${replaceHost}`);
}

export function modifyBody(IMessage, message) {
  const binaryBody = IMessage.toBinary(message);
  $done({ body: newRawBody(binaryBody) });
}
