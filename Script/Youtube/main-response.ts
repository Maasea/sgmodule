import createMessage from './lib/factory'
import { $ } from './lib/env'

const responseMsg = createMessage($.request.url)
if (responseMsg) {
  try {
    const body = $.response.bodyBytes as Uint8Array
    responseMsg.fromBinary(body).pure().doneResponse(body)
  } catch (e) {
    console.log(e.toString())
  }
} else {
  $.msg('YouTubeAds', '脚本需要更新', '外部资源 -> 全部更新')
  $.exit()
}
