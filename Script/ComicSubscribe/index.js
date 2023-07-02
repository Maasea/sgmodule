import {
  cronFuc,
  requestHandleSubscribe,
  responseAddButton,
} from "./src/enter.js";

const scriptType = $script.type;

switch (scriptType) {
  case "cron":
    cronFuc();
    break;
  case "http-request":
    requestHandleSubscribe();
    break;
  case "http-response":
    responseAddButton();
    break;
}

