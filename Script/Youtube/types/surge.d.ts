declare type SurgeBody = string | Uint8Array

// $request
declare interface SgRequest extends BRequest<SurgeBody> {
  id?: string
}

// $response
declare interface SgResponse extends BResponse<SurgeBody> {
  id?: string
}

// httpClient
declare interface HttpClientRequest extends Omit<FetchRequest<Uint8Array>, 'method'> {
  id?: string
  ['binary-mode']?: boolean
}

declare interface HttpClientResponse extends Omit<FetchResponse<Uint8Array>, 'body' | 'bodyBytes'> {
  statusCode: number
}

declare interface SgDone extends BDone<number, SurgeBody> {
  response?: BDone<number, SurgeBody>
  ruleResult?: RuleResult
  dnsResult?: DnsResult
}

declare interface SgEnvironment {
  system: string
  ['surge-build']: string
  ['surge-version']: string
  language: string
}

declare interface Script {
  name: string
  startTime: Date
  type: string
}

declare interface PersistentStore {
  write: (data: string, key?: string) => boolean
  read: (key?: string) => string | null
}

declare type HttpAPI = (method: string, path: string, body: object, callback: (result: object) => void) => void

declare interface HttpClient {
  post: (
    options: HttpClientRequest,
    callback: (error: any, response: HttpClientResponse, data: string | Uint8Array) => void
  ) => void
  get: (
    options: HttpClientRequest,
    callback: (error: any, response: HttpClientResponse, data: string | Uint8Array) => void
  ) => void
  // Add other methods (get, put, delete, head, options, patch) here
}

declare interface Notification {
  post: (title: string, subtitle: string, body: string, url?: { url: string }) => void
}

declare interface Network {
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

declare interface Utils {
  geoip: (ip: string) => string
  ipasn: (ip: string) => string
  ipaso: (ip: string) => string
  ungzip: (binary: Uint8Array) => Uint8Array
}

declare interface RuleResult {
  matched: boolean
}

declare interface DnsResult {
  address?: string
  addresses?: string[]
  server?: string
  servers?: string[]
  ttl?: number
}

declare interface Event {
  data: any
}

declare module Surge {
  const $network: Network
  const $script: Script
  const $environment: SgEnvironment
  const $persistentStore: PersistentStore
  const $httpAPI: HttpAPI
  const $httpClient: HttpClient
  const $notification: Notification
  const $utils: Utils
  const $request: SgRequest
  const $response: SgResponse
  const $event: Event
  const $domain: string
  const $cronexp: string
}
