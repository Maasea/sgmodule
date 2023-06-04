export abstract class Client {
  protected name: string
  protected debug: boolean

  protected constructor (name?: string, options?: { debug?: boolean }) {
    this.name = name || ''
    this.debug = options?.debug || false
    if (name) {
      this.log(`${name} Start`)
    }
  }

  abstract getVal (key: string): string | null | undefined;

  abstract setVal (val: string, key: string): void;

  getJSON (key: string, alter: object = {}): object {
    const val = this.getVal(key)
    return val ? JSON.parse(val) : alter
  }

  setJSON (val: object, key: string): void {
    this.setVal(JSON.stringify(val), key)
  }

  msg (
    title: string = this.name,
    subt: string = '',
    desc: string = '',
    opts?: string | object
  ): void {
    // Implement in subclasses
  }

  log (val: any): void {
    if (this.debug) {
      if (typeof val === 'object') {
        val = JSON.stringify(val)
      }
      console.log(val)
    }
  }

  done (val: object = {}): void {
    $done(val)
  }
}

export class Surge extends Client {
  constructor (name?: string, options?: { debug?: boolean }) {
    super(name, options)
  }

  getVal (key: string): string | null | undefined {
    return $persistentStore.read(key)
  }

  setVal (val: string, key: string): void {
    $persistentStore.write(val, key)
  }

  msg (
    title: string = this.name,
    subt: string = '',
    desc: string = '',
    opts?: string | object
  ): void {
    const toEnvOpts = (rawopts) => {
      if (!rawopts) return rawopts
      if (typeof rawopts === 'string') {
        return { url: rawopts }
      } else if (typeof rawopts === 'object') {
        const openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
        return { url: openUrl }
      } else {
        return undefined
      }
    }
    $notification.post(title, subt, desc, toEnvOpts(opts))
  }
}

export class QuanX extends Client {
  constructor (name?: string, options?: { debug?: boolean }) {
    super(name, options)
  }

  getVal (key: string): string | null | undefined {
    return $prefs.valueForKey(key)?.replace(/\0/g, '')
  }

  setVal (val: string, key: string): void {
    $prefs.setValueForKey(val, key)
  }

  msg (
    title: string = this.name,
    subt: string = '',
    desc: string = '',
    opts?: string | object
  ): void {
    const toEnvOpts = (rawopts) => {
      if (!rawopts) return rawopts
      if (typeof rawopts === 'string') {
        return { 'open-url': rawopts }
      } else if (typeof rawopts === 'object') {
        const openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
        const mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
        const updatePasteboard = rawopts['update-pasteboard'] || rawopts.updatePasteboard
        return {
          'open-url': openUrl,
          'media-url': mediaUrl,
          'update-pasteboard': updatePasteboard,
        }
      } else {
        return undefined
      }
    }
    $notify(title, subt, desc, toEnvOpts(opts))
  }
}

export class Loon extends Surge {
  msg (
    title: string = this.name,
    subt: string = '',
    desc: string = '',
    opts?: string | object
  ): void {
    const toEnvOpts = (rawopts) => {
      if (!rawopts) return rawopts
      if (typeof rawopts === 'string') {
        return rawopts
      } else if (typeof rawopts === 'object') {
        const openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
        const mediaUrl = rawopts.mediaUrl || rawopts['media-url']
        return {
          openUrl,
          mediaUrl,
        }
      } else {
        return undefined
      }
    }
    $notification.post(title, subt, desc, toEnvOpts(opts))
  }
}

