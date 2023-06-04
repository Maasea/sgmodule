import createMessage from '../lib/factory'
import RequestMessage from './requestHandler'
import { $ } from '../lib/env'
import { Request, Response } from '../types/surge'

const handleRequest = (request: Request): Request => {
  const requestMsg = new RequestMessage()
  request.body = requestMsg.fromBinary(request.body).pure().toBinary()
  return request
}

const handleResponse = (error: any, response: Response, data: Uint8Array): void => {
  if (error) $.done()
  const responseMsg = createMessage($request.url)

  if (responseMsg) {
    responseMsg.fromBinary(data).pure().done(response, data)
  } else {
    $.msg('YouTubeAds', '脚本需要更新', '外部资源 -> 全部更新')
    $.done()
  }
}
export const checkSurgeVersion = (): void => {
  const build = parseInt($environment?.['surge-build'])
  if (build < 2700) {
    $.msg('YouTubeAds Beta', '不支持该 Surge 版本', '点击通知可跳转旧版脚本', {
      url: 'https://raw.githubusercontent.com/Maasea/sgmodule/master/YoutubeAds.sgmodule'
    })
    $.done()
  }
}

export const buildRequest = (): void => {
  const request = handleRequest($request)
  $httpClient.post(
    {
      ...request,
      'binary-mode': true
    },
    handleResponse
  )
}
