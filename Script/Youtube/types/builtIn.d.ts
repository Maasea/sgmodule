declare interface BRequest<T> {
  url: string
  method: string
  headers: Record<string, string>
  body?: T
}

declare interface BResponse<T> {
  status: number
  headers: Record<string, string>
  body?: T
}

declare interface BDone<S, T> {
  status?: S
  headers?: Record<string, string>
  body?: T
}

declare interface FetchRequest<T> {
  url: string
  method: string
  headers?: Record<string, string>
  body?: string
  bodyBytes?: T
}

declare interface FetchResponse<T> {
  status: number
  headers: Record<string, string>
  body?: string
  bodyBytes?: T
}

// $.request
declare interface CRequest extends BRequest<string> {
  id?: string
  bodyBytes?: Uint8Array
}

// $.response
declare interface CResponse extends BResponse<string> {
  id: string
  bodyBytes?: Uint8Array
}

// $.done
declare interface CDone extends BDone<number, string> {
  bodyBytes?: Uint8Array
  isResponse?: boolean
}

declare interface CFetchRequest extends FetchRequest<Uint8Array> {
  id?: string
}

declare interface CFetchResponse extends FetchResponse<Uint8Array> {
  id?: string
}

declare interface ConversionRule<T> {
  key: keyof T
  newKey?: keyof T
  convert: (value: any) => any
}

declare const $environment: SgEnvironment | QxEnvironment
declare const $request: SgRequest | QxRequest
declare const $response: SgResponse | QxResponse
declare const $done: (options?: SgDone | QxDone) => void
declare const $loon: any
declare const $rocket: any
declare const $persistentStore: PersistentStore
declare const $httpClient: HttpClient
declare const $notification: Notification
declare const $notify: (title: string, subtitle: string, message: string, option?: NotifyOption) => void
declare const $prefs: Prefs
declare const $task: Task
