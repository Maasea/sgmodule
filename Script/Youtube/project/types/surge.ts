export interface Environment {
  system: string
  ['surge-build']: string
  ['surge-version']: string
  language: string
}

export interface Script {
  name: string
  startTime: Date
  type: string
}

export interface PersistentStore {
  write: (data: string, key?: string) => boolean
  read: (key?: string) => string | null
}

export type HttpAPI = (method: string, path: string, body: object, callback: (result: object) => void) => void

export interface HttpClient {
  post: (
    options: Record<string, any>,
    callback: (error: any, response: Response, data: any) => void
  ) => void
  // Add other methods (get, put, delete, head, options, patch) here
}

export interface Notification {
  post: (title: string, subtitle: string, body: string, url?: { url: string }) => void
}

export interface Network {
  'cellular-data': {
    carrier: string | null
    radio: string
  }
  wifi: {
    bssid: string
    ssid: string
  }
  v4: {
    primaryAddress: string
    primaryRouter: string
    primaryInterface: string
  }
  dns: string[]
  v6: {
    primaryAddress: string | null
    primaryInterface: string | null
  }
}

export interface Utils {
  geoip: (ip: string) => string
  ipasn: (ip: string) => string
  ipaso: (ip: string) => string
  ungzip: (binary: Uint8Array) => Uint8Array
}

export interface Request {
  url: string
  method: string
  headers: Record<string, string>
  body: string | Uint8Array
  id: string
  hostname: string
  destPort: number
  processPath: string
  userAgent: string
  sourceIP: string
  listenPort: number
  dnsResult: object
}

export interface Response {
  status: number
  headers: Record<string, string>
  body: string | Uint8Array
}

export interface DoneRequestOptions {
  url?: string
  headers?: Record<string, string>
  body?: string | Uint8Array
}

export interface DoneResponseOptions {
  status?: number
  headers?: Record<string, string>
  body?: string | Uint8Array
}

export interface RuleResult {
  matched: boolean
}

export interface DnsResult {
  address?: string
  addresses?: string[]
  server?: string
  servers?: string[]
  ttl?: number
}

export interface DoneOptions {
  request?: DoneRequestOptions
  response?: DoneResponseOptions
  ruleResult?: RuleResult
  dnsResult?: DnsResult
}

export interface Event {
  data: any
}

export interface API {
  $network: Network
  $script: Script
  $environment: Environment
  $persistentStore: PersistentStore
  $httpAPI: HttpAPI
  $httpClient: HttpClient
  $notification: Notification
  $utils: Utils
  $request: Request
  $response: Response
  $event: Event
  $domain: string
  $cronexp: string

  console: {
    log: (message: string) => void
  }

  setTimeout: (func: () => void, delay?: number) => void
  $done: (options?: DoneOptions) => void
}
