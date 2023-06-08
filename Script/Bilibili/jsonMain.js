import { handleSearch, handleIndex, handleSplash } from "./src/jsonHandler.js";

const url = $request.url;
const body = $response.body;

const routeHandlers = {
  "search": handleSearch,
  "feed/index": handleIndex,
  "splash": handleSplash,
};

for (let route in routeHandlers) {
  if (url.includes(route)) {
    routeHandlers[route](body);
    break;
  }
}

$done({});
