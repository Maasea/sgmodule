import * as Surge from './surge'
import * as QuantumultX from './quantumultX'

declare global {
  const $network: Surge.Network
  const $script: Surge.Script
  const $environment: Surge.Environment
  const $persistentStore: Surge.PersistentStore
  const $httpAPI: Surge.HttpAPI
  const $httpClient: Surge.HttpClient
  const $notification: Surge.Notification
  const $utils: Surge.Utils
  const $request: Surge.Request
  const $response: Surge.Response
  const $event: Surge.Event
  const $domain: string
  const $cronexp: string
  const $done: (options?: Surge.DoneOptions | QuantumultX.DoneOptions) => void
  const $task: QuantumultX.Task
  const $notify: (title: string, subtitle: string, message: string, option?: QuantumultX.NotifyOption) => void
  const $prefs: QuantumultX.Prefs
  const $loon: any
  const $rocket: any
}
