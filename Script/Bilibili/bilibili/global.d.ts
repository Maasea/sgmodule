import {
    SgEnvironment,
    SgRequest,
    SgResponse,
    SgDone,
    HttpClient,
    Notification,
    PersistentStore,
    Utils
} from "./types/surge"
import {QxEnvironment, QxRequest, QxResponse, QxDone, NotifyOption, Prefs, Task} from "./types/quantumultX";

declare global {
    const $environment: SgEnvironment | QxEnvironment
    const $request: SgRequest | QxRequest
    const $response: SgResponse | QxResponse
    const $done: (options?: SgDone | QxDone) => void
    const $utils: Utils
    const $loon: any
    const $rocket: any
    const $persistentStore: PersistentStore
    const $httpClient: HttpClient
    const $notification: Notification
    const $notify: (title: string, subtitle: string, message: string, option?: NotifyOption) => void
    const $prefs: Prefs
    const $task: Task
}

