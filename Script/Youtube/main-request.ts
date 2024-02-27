import RequestMessage from './src/requestHandler'
import { $ } from './lib/env'

async function run (): Promise<void> {
  const requestMsg = new RequestMessage()
  await requestMsg.fromBinary($.request.bodyBytes).pure()
  requestMsg.done()
}

run().catch(e => {
  $.log(e.toString())
}).finally(() => {
  $.exit()
})
