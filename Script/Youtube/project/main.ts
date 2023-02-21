import { $ } from 'lib/env'
import Factory from 'lib/factory'

const url = $request.url
const binaryBody = $.isQuanX() ? new Uint8Array($response.bodyBytes) : $response.body
const opt = $.getjson('YouTubeWhiteStr', {
  whiteNo: [],
  blackNo: [],
  whiteEml: [],
  blackEml: []
})

const youtubeMsg = Factory.create(url, opt)
if (youtubeMsg) {
  youtubeMsg.fromBinary(binaryBody)
  youtubeMsg.pure()
  youtubeMsg.done()
} else {
  $.msg('YouTubeAds', '脚本需要更新', '外部资源 -> 全部更新')
  $.done()
}
