export interface Prefs {
  valueForKey: (key: string) => string | null
  setValueForKey: (value: string, key: string) => void
  removeValueForKey: (key: string) => void
  removeAllValues: () => void
}

export interface Task {
  fetch: (
    options: Record<string, any>,
    callback: (error: any, response: Response, data: any) => void
  ) => void
}

export interface Request {
  sessionIndex: string
  scheme: string
  method: string
  url: string
  path: string
  headers: Record<string, string>
}

export interface Response {
  sessionIndex: string
  statusCode: number
  headers: Record<string, string>
  body: string
}

export interface DoneOptions {
  status: string
  headers: Record<string, string>
  body: string
}

export interface NotifyOption {

  'open-url': string
  'media-url': string
  'update-pasteboard': string

}

export interface API {
  $request: Request
  $response: Response
  $notify: (title: string, subtitle: string, message: string, option?: NotifyOption) => void
  console: {
    log: (message: string) => void
  }
  $prefs: Prefs
  $task: Task
  setTimeout: (func: () => void, delay?: number) => void
}
