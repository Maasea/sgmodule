import createMessage from './lib/factory'
import { $ } from './lib/env'

async function run (): Promise<void> {
  const responseMsg = createMessage($.request.url)

  if (responseMsg) {
    const body = $.response.bodyBytes

    $.timeStart('fromBinary')
    responseMsg.fromBinary(body)
    $.timeEnd('fromBinary')

    $.timeStart('modify')
    await responseMsg.modify()
    $.timeEnd('modify')

    responseMsg.done()
  } else {
    $.msg('YouTube Enhance', '脚本需要更新', '外部资源 -> 全部更新')
    $.exit()
  }
}

run().catch(e => {
  $.log(e.toString())
}).finally(() => {
  $.exit()
})
