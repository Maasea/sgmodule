import createMessage from './lib/factory'
import { $ } from './lib/env'

async function start (): Promise<void> {
  try {
    const responseMsg = createMessage($.request.url)

    if (!responseMsg) {
      $.msg('YouTube Enhance', '脚本需要更新', '外部资源 -> 全部更新')
      $.exit()
      return
    }

    const body = $.response.bodyBytes as Uint8Array
    await responseMsg.fromBinary(body).modify()
    responseMsg.doneResponse()
  } catch (e) {
    console.log(e.toString())
    $.exit()
  }
}

void start()
