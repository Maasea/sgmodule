import RequestMessage from './src/requestHandler'
import { $ } from './lib/env'

try {
  const requestMsg = new RequestMessage()
  const bodyBytes = (requestMsg.fromBinary($.request.bodyBytes).pure() as RequestMessage).toBinary()
  $.done({ bodyBytes })
} catch (e) {
  $.log(e.toString())
  $.exit()
}
