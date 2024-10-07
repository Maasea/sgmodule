/**
 * Built In Interface
 */
export interface BRequest<T> {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: T;
}

export interface BResponse<T> {
  status: number;
  headers: Record<string, string>;
  body?: T;
}

export interface BDone<S, T> {
  status?: S;
  headers?: Record<string, string>;
  body?: T;
}

export interface FetchRequest<T> {
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
  bodyBytes?: T;
}

export interface FetchResponse<T> {
  status: number;
  headers: Record<string, string>;
  body?: string;
  bodyBytes?: T;
}

/**
 * Universal Client API
 */

// $.request
declare interface CRequest extends BRequest<string> {
  id?: string;
  bodyBytes?: Uint8Array;
}

// $.response
export interface CResponse extends BResponse<string> {
  id: string;
  bodyBytes?: Uint8Array;
}

// $.done
export interface CDone extends BDone<number, string> {
  bodyBytes?: Uint8Array;
  response?: Omit<CDone, "response">;
}

export interface CFetchRequest extends FetchRequest<Uint8Array> {
  id?: string;
}

export interface CFetchResponse extends FetchResponse<Uint8Array> {
  id?: string;
}

/**
 * Surge API
 */

export type SurgeBody = string | Uint8Array;

// $request
export interface SgRequest extends BRequest<SurgeBody> {
  id?: string;
}

// $response
export interface SgResponse extends BResponse<SurgeBody> {
  id?: string;
}

// httpClient
export interface HttpClientRequest
  extends Omit<FetchRequest<Uint8Array>, "method"> {
  id?: string;
  ["binary-mode"]?: boolean;
}

export interface HttpClientResponse
  extends Omit<FetchResponse<Uint8Array>, "body" | "bodyBytes"> {
  statusCode: number;
}

export interface SgDone extends BDone<number, SurgeBody> {
  response?: BDone<number, SurgeBody>;
  ruleResult?: RuleResult;
  dnsResult?: DnsResult;
}

export interface SgEnvironment {
  system: string;
  ["surge-build"]: string;
  ["surge-version"]: string;
  language: string;
}

export interface Script {
  name: string;
  startTime: Date;
  type: string;
}

export interface PersistentStore {
  write: (data: string, key?: string) => boolean;
  read: (key?: string) => string | null;
}

export type HttpAPI = (
  method: string,
  path: string,
  body: object,
  callback: (result: object) => void
) => void;

export interface HttpClient {
  post: (
    options: HttpClientRequest,
    callback: (
      error: any,
      response: HttpClientResponse,
      data: string | Uint8Array
    ) => void
  ) => void;
  get: (
    options: HttpClientRequest,
    callback: (
      error: any,
      response: HttpClientResponse,
      data: string | Uint8Array
    ) => void
  ) => void;
  // Add other methods (get, put, delete, head, options, patch) here
}

export interface Notification {
  post: (
    title: string,
    subtitle: string,
    body: string,
    url?: { url: string }
  ) => void;
}

export interface Network {
  "cellular-data": {
    carrier: string | null;
    radio: string;
  };
  wifi: {
    bssid: string;
    ssid: string;
  };
  v4: {
    primaryAddress: string;
    primaryRouter: string;
    primaryInterface: string;
  };
  dns: string[];
  v6: {
    primaryAddress: string | null;
    primaryInterface: string | null;
  };
}

export interface Utils {
  geoip: (ip: string) => string;
  ipasn: (ip: string) => string;
  ipaso: (ip: string) => string;
  ungzip: (binary: Uint8Array) => Uint8Array;
}

export interface RuleResult {
  matched: boolean;
}

export interface DnsResult {
  address?: string;
  addresses?: string[];
  server?: string;
  servers?: string[];
  ttl?: number;
}

export interface Event {
  data: any;
}

export module Surge {
  const $network: Network;
  const $script: Script;
  const $environment: SgEnvironment;
  const $persistentStore: PersistentStore;
  const $httpAPI: HttpAPI;
  const $httpClient: HttpClient;
  const $notification: Notification;
  const $utils: Utils;
  const $request: SgRequest;
  const $response: SgResponse;
  const $event: Event;
  const $domain: string;
  const $cronexp: string;
}

/**
 * Quantumult-X API
 */

export interface QxRequest extends BRequest<string> {
  bodyBytes?: ArrayBuffer;
  sessionIndex?: string;
}

// $response
export interface QxResponse extends Omit<BResponse<string>, "status"> {
  statusCode: number;
  bodyBytes?: ArrayBuffer;
  sessionIndex?: string;
}

export interface QxFetchRequest extends FetchRequest<ArrayBuffer> {
  sessionIndex?: string;
}

export interface QxFetchResponse
  extends Omit<FetchResponse<ArrayBuffer>, "status"> {
  statusCode: number;
  sessionIndex?: string;
}

export interface QxDone extends BDone<string, string> {
  bodyBytes?: ArrayBuffer;
}

export interface QxEnvironment {
  version: string;
}

export interface Prefs {
  valueForKey: (key: string) => string | null;
  setValueForKey: (value: string, key: string) => void;
  removeValueForKey: (key: string) => void;
  removeAllValues: () => void;
}

export interface Task {
  fetch: (options: QxFetchRequest) => Promise<QxFetchResponse>;
}

export interface NotifyOption {
  "open-url": string;
}
