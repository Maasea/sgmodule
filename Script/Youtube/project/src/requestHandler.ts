import { Request } from '../lib/request'
import { YouTubeMessage } from './youtube'

export default class RequestMessage extends YouTubeMessage {
  constructor (name: string = 'Request') {
    super(name)
  }

  fromBinary (binaryBody): void {
    this.message = Request.fromBinary(binaryBody)
  }

  pure (): void {
    this.message.context.adSignalsInfo.params.length = 0
    this.needProcess = true
  }

  toBinary (): void {
    this.body = Request.toBinary(this.message)
  }
}
