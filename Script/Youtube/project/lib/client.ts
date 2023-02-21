export default class SimpleClient {
  evaluate: boolean
  name: string
  debug: boolean

  constructor (name?: string, opt?: any) {
    this.name = name || ''
    this.debug = opt.debug || false
    if (name) {
      this.log(`${name} Start`)
    }
  }

  isQuanX () {
    return typeof $task !== 'undefined'
  }

  isSurge () {
    return typeof $environment !== 'undefined' && $environment['surge-version']
  }

  isLoon () {
    return typeof $loon !== 'undefined'
  }

  isShadowrocket () {
    return typeof $rocket !== 'undefined'
  }

  isStash () {
    return typeof $environment !== 'undefined' && $environment['stash-version']
  }

  getval (key) {
    let val = ''
    if (this.isSurge() || this.isLoon() || this.isStash()) {
      val = $persistentStore.read(key)
    } else if (this.isQuanX()) {
      val = $prefs.valueForKey(key)
    }
    return val?.replace(/\0/g, '')
  }

  setval (val, key) {
    if (this.isSurge() || this.isLoon() || this.isStash()) {
      return $persistentStore.write(val, key)
    } else if (this.isQuanX()) {
      return $prefs.setValueForKey(val, key)
    }
  }

  getjson (key, alter = {}) {
    const val = this.getval(key)
    return val ? JSON.parse(val) : alter
  }

  setjson (val, key) {
    this.setval(JSON.stringify(val), key)
  }

  msg (title = this.name, subt = '', desc = '', opts) {
    const toEnvOpts = (rawopts) => {
      if (!rawopts) return rawopts
      if (typeof rawopts === 'string') {
        if (this.isLoon()) {
          return rawopts
        } else if (this.isQuanX()) {
          return { 'open-url': rawopts }
        } else if (this.isSurge() || this.isStash()) {
          return { url: rawopts }
        } else {
          return undefined
        }
      } else if (typeof rawopts === 'object') {
        if (this.isLoon()) {
          const openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
          const mediaUrl = rawopts.mediaUrl || rawopts['media-url']
          return {
            openUrl,
            mediaUrl
          }
        } else if (this.isQuanX()) {
          const openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
          const mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
          const updatePasteboard = rawopts['update-pasteboard'] || rawopts.updatePasteboard
          return {
            'open-url': openUrl,
            'media-url': mediaUrl,
            'update-pasteboard': updatePasteboard
          }
        } else if (this.isSurge() || this.isStash()) {
          const openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
          return { url: openUrl }
        }
      } else {
        return undefined
      }
    }

    if (this.isSurge() || this.isLoon() || this.isStash()) {
      $notification.post(title, subt, desc, toEnvOpts(opts))
    } else if (this.isQuanX()) {
      $notify(title, subt, desc, toEnvOpts(opts))
    }

  }

  log (val) {
    if (this.debug) {
      if (typeof val === 'object') {
        val = JSON.stringify(val)
      }
      console.log(val)
    }
  }

  done (val = {}) {
    $done(val)
  }
}


