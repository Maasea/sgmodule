import { Request } from '../lib/request'
import { YouTubeMessage } from './youtube'

export default class RequestMessage extends YouTubeMessage {
  constructor (msgType: any = Request, name: string = 'Request') {
    super(msgType, name)
  }

  pure (): this {
    this.message.context.adSignalsInfo.params.length = 0
    this.needProcess = true
    return this
  }
}
