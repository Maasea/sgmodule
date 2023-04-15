import { Request } from '../lib/request'
import { YouTubeMessage } from './youtube'

export default class RequestMessage extends YouTubeMessage {
  constructor (name: string = 'Request') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Request.fromBinary(binaryBody)
    return this
  }

  pure (): this {
    this.message.context.adSignalsInfo.params.length = 0
    this.needProcess = true
    return this
  }

  toBinary (): Uint8Array {
    return Request.toBinary(this.message)
  }
}
