import RequestMessage from './src/requestHandler'
import { $ } from './lib/env'

const requestMsg = new RequestMessage()

try {
  const bodyBytes = requestMsg.fromBinary($.request.bodyBytes as Uint8Array).pure().toBinary()
  $.done({
    headers: {
      ...$.request.headers,
      needTranslate: requestMsg.needTranslate.toString()
    },
    bodyBytes
  })
} catch (e) {
  $.log(e.toString())
  $.exit()
}
