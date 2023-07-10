import { gunzipSync } from "fflate";
import {
  handleDMView,
  handleModeStatus,
  handlePlayView,
  handleV1View,
  handleReplyList,
  handleSearchAll,
  handleDynAll,
  handleViewProgress,
} from "./src/handler.js";
import URLs from "./lib/urls.js";

const url = $request.url;
const body = $response.body;
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
  "Teenagers/ModeStatus": handleModeStatus,
  "v1.PlayURL/PlayView": handlePlayView,
  "v1.View/View": handleV1View,
  "v1.Reply/MainList": handleReplyList,
  "v1.Search/SearchAll": handleSearchAll,
  "v2.Dynamic/DynAll": handleDynAll,
  "v1.View/ViewProgress": handleViewProgress,
};

for (let route in routeHandlers) {
  if (path.endsWith(route)) {
    routeHandlers[route](grpcBody);
    break;
  }
}

$done({});
