import {
    HttpClient, Notification, NotifyOption,
    PersistentStore, Prefs,
    QxDone,
    QxEnvironment,
    QxRequest,
    QxResponse,
    SgDone,
    SgEnvironment,
    SgRequest,
    SgResponse, Task
} from "./type";

declare global {
    const $environment: SgEnvironment | QxEnvironment
    const $request: SgRequest | QxRequest
    const $response: SgResponse | QxResponse
    const $done: (options?: SgDone | QxDone) => void
    const $loon: any
    const $rocket: any
    const $persistentStore: PersistentStore
    const $httpClient: HttpClient
    const $notification: Notification
    const $notify: (title: string, subtitle: string, message: string, option?: NotifyOption) => void
    const $prefs: Prefs
    const $task: Task
    const $argument: string | undefined
}
