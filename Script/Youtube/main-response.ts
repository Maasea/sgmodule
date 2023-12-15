import createMessage from './lib/factory'
import { BrowseMessage } from './src/responseHandler'
import { $ } from './lib/env'

async function start (): Promise<void> {
  const responseMsg = createMessage($.request.url)
  if (responseMsg) {
    try {
      const body = $.response.bodyBytes as Uint8Array
      responseMsg.fromBinary(body).pure()
      if (responseMsg instanceof BrowseMessage && responseMsg.needTranslate) {
        await responseMsg.translate()
      }
      responseMsg.doneResponse()
    } catch (e) {
      console.log(e.toString())
      $.exit()
    }
  } else {
    $.msg('YouTube Enhance', '脚本需要更新', '外部资源 -> 全部更新')
    $.exit()
  }
}

void start()
