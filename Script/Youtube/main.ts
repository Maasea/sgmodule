import { checkSurgeVersion, buildRequest } from './src/handler'

const main = (): void => {
  checkSurgeVersion()
  buildRequest()
}

main()
