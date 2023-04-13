import { $ } from "lib/env";
import Factory from "lib/factory";
import RequestMessage from "src/requestHandler";

// Handle request body
const url = $request.url;
const requestMsg = new RequestMessage();
requestMsg.fromBinary($request.body);
requestMsg.pure();
requestMsg.toBinary();
$request.body = requestMsg.body;

// Build request
$httpClient.post(
  {
    ...$request,
    "binary-mode": true,
  },
  (error, response, data) => {
    if (error) {
      $.done();
    }

    // Handle response
    response.headers["Content-Encoding"] = "identity";

    const responseMsg = Factory.create(url);
    if (responseMsg) {
      responseMsg.fromBinary(data);
      responseMsg.pure();
      responseMsg.done(response, data);
    } else {
      $.msg("YouTubeAds", "脚本需要更新", "外部资源 -> 全部更新");
      $.done();
    }
  }
);
