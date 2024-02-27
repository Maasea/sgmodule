import createMessage from './lib/factory'
import { $ } from './lib/env'
$.timeStart('Script Execute')
async function start (): Promise<void> {
  try {
    const responseMsg = createMessage($.request.url)

    if (!responseMsg) {
      $.msg('YouTube Enhance', '脚本需要更新', '外部资源 -> 全部更新')
      $.exit()
      return
    }

    const body = $.response.bodyBytes
    $.timeStart('fromBinary')
    responseMsg.fromBinary(body)
    $.timeEnd('fromBinary')
    $.timeStart('modify')
    await responseMsg.modify()
    $.timeEnd('modify')
    responseMsg.doneResponse()
  } catch (e) {
    $.log(e.toString())
    $.exit()
  }
}

void start()
