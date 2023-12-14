export default abstract class Client {
  private static instances: Record<string, Client> = {}
  private _times: Map<string, number> = new Map()
  protected static readonly classNames = {
    QuanX: (name?: string, className?: string, options?: { debug?: boolean }) =>
      new QuanXClient(name, className, options),
    Surge: (name?: string, className?: string, options?: { debug?: boolean }) =>
      new SurgeClient(name, className, options)
  }

  protected name: string
  protected debug: boolean
  readonly className: string
  request: CRequest
  response: CResponse

  protected constructor (
    name?: string,
    className?: string,
    options?: { debug?: boolean }
  ) {
    this.name = name ?? ''
    this.debug = options?.debug ?? false
    if (name) {
      this.log(`${name} Start`)
    }
    this.className = className ?? ''
    this.init()
  }

  public static getInstance (
    name?: string,
    options?: { debug?: boolean }
  ): Client {
    const className = typeof $task !== 'undefined' ? 'QuanX' : 'Surge'

    if (!Client.instances[className]) {
      Client.instances[className] = Client.classNames[className](
        name,
        className,
        options
      )
    }
    return Client.instances[className]
  }

  abstract init (): void

  abstract getVal (key: string): string | null | undefined

  abstract setVal (val: string, key: string): void

  abstract fetch (request: CFetchRequest): Promise<CFetchResponse>

  abstract done (done: CDone): void

  protected createProxy<T extends object, C extends object> (target: T): C {
    return new Proxy(target, {
      get: this.getFn,
      set: this.setFn
    }) as unknown as C
  }

  protected getFn<T> (t: T, p: string, r: any): any {
    return t[p]
  }

  protected setFn<T> (t: T, p: string, v: any, r: any): boolean {
    t[p] = v
    return true
  }

  getJSON (key: string, alter: object = {}): object {
    const val = this.getVal(key)
    return val ? JSON.parse(val) : alter
  }

  setJSON (val: object, key: string): void {
    this.setVal(JSON.stringify(val), key)
  }

  msg (
    title: string = this.name,
    subTitle: string = '',
    desc: string = '',
    url?: string
  ): void {
  }

  log (val: any): void {
    if (this.debug) {
      if (typeof val === 'object') {
        val = JSON.stringify(val)
      }
      console.log(val)
    }
  }

  timeStart (label: string): void {
    this._times = this._times || {}
    this._times[label] = Date.now()
  }

  timeEnd (label: string): void {
    if (this._times?.has(label)) {
      const timeElapsed = Date.now() - this._times[label]
      this.log(`${label}: ${timeElapsed}ms`)
      this._times.delete(label)
    } else {
      this.log(`Timer with label ${label} does not exist.`)
    }
  }

  exit (): void {
    $done({})
  }

  reject (): void {
    $done()
  }
}

export class SurgeClient extends Client {
  static clientAdapter = {
    bodyBytes: 'body'
  }

  protected getFn<T> (t: T, p: string, receiver: any): any {
    const key = SurgeClient.clientAdapter[p] || p
    return super.getFn(t, key, receiver)
  }

  protected setFn<T> (t: T, p: string, newValue: any, receiver: any): boolean {
    const key = SurgeClient.clientAdapter[p] || p
    return super.setFn(t, key, newValue, receiver)
  }

  init (): void {
    try {
      this.request = this.createProxy<SgRequest, CRequest>(
        $request as SgRequest
      )
      this.response = this.createProxy<SgResponse, CResponse>(
        $response as SgResponse
      )
    } catch (e) {
      this.log(e.toString())
    }
  }

  getVal (key: string): string | null | undefined {
    return $persistentStore.read(key)
  }

  setVal (val: string, key: string): void {
    $persistentStore.write(val, key)
  }

  msg (
    title: string = this.name,
    subTitle: string = '',
    desc: string = '',
    url?: string
  ): void {
    $notification.post(title, subTitle, desc, { url: url ?? '' })
  }

  async fetch (request: CFetchRequest): Promise<CFetchResponse> {
    return await new Promise((resolve, reject) => {
      const {
        method,
        body,
        bodyBytes,
        ...httpClientRequest
      } = request
      const realBody = bodyBytes ?? body
      const isBinary = realBody instanceof Uint8Array

      $httpClient[method.toLowerCase()](
        {
          ...httpClientRequest,
          body: realBody,
          'binary-mode': isBinary
        },
        (error: any, response: HttpClientResponse, data: SurgeBody) => {
          if (error) {
            reject(error)
          }

          const bodyKey = isBinary ? 'bodyBytes' : 'body'
          resolve({
            status: response.status || response.statusCode,
            headers: response.headers,
            [bodyKey]: data
          })
        }
      )
    })
  }

  done (cDone: CDone): void {
    const realResponse = cDone.response ?? cDone
    let body: SurgeBody
    let sgDone: SgDone

    if (realResponse.bodyBytes) {
      body = realResponse.bodyBytes
      delete realResponse.bodyBytes

      sgDone = { ...cDone }
      sgDone.response ? (sgDone.response.body = body) : (sgDone.body = body)
    } else {
      sgDone = cDone
    }

    $done(sgDone)
  }
}

export class QuanXClient extends Client {
  static clientAdapter = {
    id: 'sessionIndex',
    status: 'statusCode'
  }

  static transferBodyBytes (
    bodyBytes: Uint8Array | ArrayBuffer | undefined,
    target: 'Uint8Array' | 'ArrayBuffer'
  ): Uint8Array | ArrayBuffer | undefined {
    if (bodyBytes instanceof ArrayBuffer) {
      return target === 'Uint8Array' ? new Uint8Array(bodyBytes) : bodyBytes
    } else if (bodyBytes instanceof Uint8Array) {
      return target === 'ArrayBuffer'
        ? bodyBytes.buffer.slice(
          bodyBytes.byteOffset,
          bodyBytes.byteLength + bodyBytes.byteOffset
        )
        : bodyBytes
    }
    return bodyBytes
  }

  init (): void {
    try {
      this.request = this.createProxy<QxRequest, CRequest>(
        $request as QxRequest
      )
      this.response = this.createProxy<QxResponse, CResponse>(
        $response as QxResponse
      )
    } catch (e) {
      this.log(e.toString())
    }
  }

  protected getFn<T> (t: T, p: string, receiver: any): any {
    const key = QuanXClient.clientAdapter[p] || p
    let output = super.getFn(t, key, receiver)
    if (p === 'bodyBytes') {
      output = QuanXClient.transferBodyBytes(output, 'Uint8Array')
    }
    return output
  }

  protected setFn<T> (t: T, p: string, newValue: any, receiver: any): boolean {
    const key = QuanXClient.clientAdapter[p] || p
    let output = newValue
    if (p === 'bodyBytes') {
      output = QuanXClient.transferBodyBytes(output, 'Uint8Array')
    }
    return super.setFn(t, key, output, receiver)
  }

  getVal (key: string): string | null | undefined {
    return $prefs.valueForKey(key)?.replace(/\0/g, '')
  }

  setVal (val: string, key: string): void {
    $prefs.setValueForKey(val, key)
  }

  msg (
    title: string = this.name,
    subTitle: string = '',
    desc: string = '',
    url?: string
  ): void {
    $notify(title, subTitle, desc, { 'open-url': url ?? '' })
  }

  async fetch (request: CFetchRequest): Promise<CFetchResponse> {
    return await new Promise((resolve) => {
      const qxFetchRequest: QxFetchRequest = {
        url: '',
        method: 'GET'
      }

      for (const [key, value] of Object.entries(request)) {
        if (key === 'id') {
          qxFetchRequest.sessionIndex = value
        } else if (key === 'bodyBytes') {
          qxFetchRequest.bodyBytes = QuanXClient.transferBodyBytes(
            value,
            'ArrayBuffer'
          )
        } else {
          qxFetchRequest[key] = value
        }
      }

      if (request.bodyBytes) delete qxFetchRequest.body

      void $task.fetch(qxFetchRequest).then((resp) => {
        const cFetchResponse: CFetchResponse = {
          status: 200,
          headers: {}
        }

        for (const [key, value] of Object.entries(resp)) {
          if (key === 'sessionIndex') {
            cFetchResponse.id = value
          } else if (key === 'bodyBytes') {
            cFetchResponse.bodyBytes = QuanXClient.transferBodyBytes(
              value,
              'Uint8Array'
            ) as Uint8Array
          } else if (key === 'statusCode') {
            cFetchResponse.status = value
          } else {
            cFetchResponse[key] = value
          }
        }
        resolve(cFetchResponse)
      })
    })
  }

  done (cDone: CDone): void {
    const realResponse = cDone.response ?? cDone
    const qxDone: QxDone = {}
    for (const [key, value] of Object.entries(realResponse)) {
      if (key === 'status') {
        qxDone.status = `HTTP/1.1 ${value as number}`
      } else if (key === 'bodyBytes') {
        qxDone.bodyBytes = QuanXClient.transferBodyBytes(
          value as Uint8Array,
          'ArrayBuffer'
        )
      } else {
        qxDone[key] = value
      }
    }
    $done(qxDone)
  }
}
