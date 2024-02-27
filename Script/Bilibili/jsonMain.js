import { handleSearch, handleIndex, handleSplash } from "./src/jsonHandler.js";
try{
const url = $request.url;
let body = $response.body;
if (!body) $done({});

body = JSON.parse(body);

const routeHandlers = {
  search: handleSearch,
  "feed/index": handleIndex,
  splash: handleSplash,
};

for (let route in routeHandlers) {
  if (url.includes(route)) {
    routeHandlers[route](body);
    break;
  }
}
}catch(e){
  console.log(e)
}finally{
  $done({});
}

