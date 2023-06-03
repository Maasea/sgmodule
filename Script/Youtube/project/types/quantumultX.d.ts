// $request
declare interface QxRequest extends BRequest<string> {
  bodyBytes?: ArrayBuffer
  sessionIndex?: string
}

// $response
declare interface QxResponse extends Omit<BResponse<string>, 'status'> {
  statusCode: number
  bodyBytes?: ArrayBuffer
  sessionIndex?: string
}

declare interface QxFetchRequest extends FetchRequest<ArrayBuffer> {
  sessionIndex?: string
}

declare interface QxFetchResponse extends Omit<FetchResponse<ArrayBuffer>, 'status'> {
  statusCode: number
  sessionIndex?: string
}

declare interface QxDone extends BDone<string, string> {
  bodyBytes?: ArrayBuffer
}

declare interface QxEnvironment {
  version: string
}

declare interface Prefs {
  valueForKey: (key: string) => string | null
  setValueForKey: (value: string, key: string) => void
  removeValueForKey: (key: string) => void
  removeAllValues: () => void
}

declare interface Task {
  fetch: (
    options: QxFetchRequest,
  ) => Promise<QxFetchResponse>
}

declare interface NotifyOption {
  'open-url': string
}

// declare namespace QuanX {
//   const $request: QxRequest
//   const $response: QxResponse
//   const $notify: (title: string, subtitle: string, message: string, option?: NotifyOption) => void
//   const $prefs: Prefs
//   const $task: Task
//   const $done: (done: QxDone) => void
// }
