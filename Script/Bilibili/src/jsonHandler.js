import { stringifyBody } from "./utils.js";

export function handleSearch(body) {
  body.data.item = body.data.item.filter(
    (item) => !item.linktype.endsWith("_ad")
  );
  stringifyBody(body);
}

export function handleSplash(body) {
  const item = ["account", "event_list", "preload", "show"];
  const staticValues = {
    max_time: 0,
    min_interval: 31536000,
    pull_interval: 31536000,
  };
  const staticListValues = {
    duration: 0,
    enable_pre_download: false,
    end_time: 2209046399,
    begin_time: 2208960000,
  };

  if (body.data) {
    item.forEach((i) => delete obj.data[i]);

    Object.entries(staticValues).forEach(([key, value]) => {
      if (obj.data[key]) obj.data[key] = value;
    });

    if (body.data.list) {
      for (let i of obj.data.list) {
        Object.assign(i, staticListValues);
      }
    }
  }
  stringifyBody(body);
}

export function handleIndex(body) {
  body.data.items = body.data.items.filter(
    (item) => !/banner|cm/.test(item.card_type)
  );

  stringifyBody(body);
}
