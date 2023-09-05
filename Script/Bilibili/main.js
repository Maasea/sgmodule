import { gunzipSync } from "fflate";
import {
  handleDMView,
  handleModeStatus,
  handleV1View,
  handleReplyList,
  handleSearchAll,
  handleDynAll,
  handleViewProgress,
  handleViewUnite,
} from "./src/handler.js";
import URLs from "./lib/urls.js";
import Client from "./lib/client.js";

const $ = Client.getInstance("Bilibili Helper", { debug: false });
const url = $.request.url;
const body = $.response.bodyBytes;
const path = new URLs(url).path;
const decompress =
  typeof $utils === "object" && typeof $utils?.ungzip === "function"
    ? $utils.ungzip
    : gunzipSync;
const grpcHeader = body.slice(0, 5);
let grpcBody = body.slice(5);

if (grpcHeader[0]) {
  grpcBody = decompress(grpcBody);
}

const routeHandlers = {
  "v1.DM/DmView": handleDMView,
  "v1.Teenagers/ModeStatus": handleModeStatus,
  "v1.Reply/MainList": handleReplyList,
  "v1.Search/SearchAll": handleSearchAll,
  "v2.Dynamic/DynAll": handleDynAll,
  "viewunite.v1.View/View": handleViewUnite,
  "view.v1.View/ViewProgress": handleViewProgress,
  "view.v1.View/View": handleV1View,
};

for (let route in routeHandlers) {
  if (path.endsWith(route)) {
    routeHandlers[route](grpcBody);
    break;
  }
}

$.exit();
