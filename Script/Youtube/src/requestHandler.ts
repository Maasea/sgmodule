import { Request } from '../lib/request'
import { YouTubeMessage } from './youtube'

export default class RequestMessage extends YouTubeMessage {
  needTranslate: boolean

  constructor (msgType: any = Request, name: string = 'Request') {
    super(msgType, name)
    this.needTranslate = false
  }

  pure (): this {
    const [prefix, browseId] = this.message.browseId.split('$')
    if (prefix === 'translate') {
      this.message.browseId = browseId
      this.needTranslate = true
    }
    this.message.context.adSignalsInfo.params.length = 0
    this.needProcess = true
    return this
  }
}
