import PromiseQueue from "./promiseQueue.js";
import {
  getSubscribes,
  saveSubscribes,
  fetchCatalogue,
  addSubButton,
  comicIdRegex,
} from "./utils.js";
import { $ } from "./env.js";
import URLs from "../lib/urls.js";

export function cronFuc () {
  const subscribes = getSubscribes();
  const queue = new PromiseQueue(4);

  for (let i = 0; i < subscribes.length; i++) {
    queue.add(() => fetchCatalogue(subscribes[i]["comicId"], subscribes));
  }

  $.exit();
}

export function responseAddButton () {
  const url = $.request.url;
  const body = $.response.body;
  const comicId = url.match(comicIdRegex)[1];
  const subscribes = getSubscribes();
  const isSub = subscribes.some((sub) => sub.comicId === comicId);
  const newBody = addSubButton(body, comicId, isSub);

  $.done({ body: newBody });
}

export function requestHandleSubscribe () {
  const url = $.request.url;
  const urlObj = new URLs(url);
  const path = urlObj.path;
  const comicName = decodeURIComponent(urlObj.params.comicName);
  let subscribes = getSubscribes();
  const p = path.split("/");
  const action = p[0];
  const comicId = p[1];
  let subscribeStatus = false;

  let msgDesc = "添加订阅成功";

  if (action === "subscribe") {
    const now = new Date().toISOString();
    subscribes.push({
      comicId,
      name: comicName,
      updateDate: now,
    });
    subscribeStatus = true;
  } else if (action === "unsubscribe") {
    subscribes = subscribes.filter((sub) => sub.comicId !== comicId);
    msgDesc = "取消订阅成功";
  }

  saveSubscribes(subscribes);

  $.msg("Comic Subscribe", comicName, msgDesc);
  $.done({
    response:
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscribe: subscribeStatus }),
      },
  });
}
