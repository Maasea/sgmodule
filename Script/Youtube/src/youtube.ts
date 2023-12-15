import { UnknownFieldHandler, IMessageType } from '@protobuf-ts/runtime'
import { $ } from '../lib/env'

export abstract class YouTubeMessage {
  needProcess: boolean
  needSave: boolean
  message: any
  whiteNo: number[]
  blackNo: number[]
  whiteEml: string[]
  blackEml: string[]
  msgType: IMessageType<any>
  decoder = new TextDecoder('utf-8', {
    fatal: false,
    ignoreBOM: true
  })

  protected constructor (msgType: IMessageType<any>, name: string) {
    $.log(name)
    this.msgType = msgType
    Object.assign(this, $.getJSON('YouTubeAdvertiseInfo', {
      whiteNo: [],
      blackNo: [],
      whiteEml: [],
      blackEml: ['cell_divider.eml']
    }))
  }

  fromBinary (binaryBody: Uint8Array): YouTubeMessage {
    this.message = this.msgType.fromBinary(binaryBody)
    return this
  }

  abstract pure (): this

  toBinary (): Uint8Array {
    return this.msgType.toBinary(this.message)
  }

  save (): void {
    if (this.needSave) {
      $.log('Update Config')
      const YouTubeAdvertiseInfo = {
        whiteNo: this.whiteNo,
        blackNo: this.blackNo,
        whiteEml: this.whiteEml,
        blackEml: this.blackEml
      }
      $.setJSON(YouTubeAdvertiseInfo, 'YouTubeAdvertiseInfo')
    }
  }

  done (response: CFetchResponse): void {
    this.save()
    let body = response.bodyBytes
    if (this.needProcess) body = this.toBinary()

    response.headers['Content-Encoding'] = 'identity'
    response.headers['Content-Length'] = (body?.length ?? 0)?.toString()

    $.done({
      response: {
        ...response,
        bodyBytes: body
      }
    })
  }

  doneResponse (): void {
    this.save()
    if (this.needProcess) {
      $.done({ bodyBytes: this.toBinary() })
    }
    $.exit()
  }

  iterate (obj: any = {}, target: string | symbol, call: Function): any {
    const stack: any[] = (typeof obj === 'object') ? [obj] : []
    while (stack.length) {
      const item = stack.pop()
      const keys = Object.keys(item)

      if (typeof target === 'symbol') {
        for (const s of Object.getOwnPropertySymbols(item)) {
          if (Symbol.keyFor(s) === Symbol.keyFor(target)) {
            call(item, stack)
            break
          }
        }
      }

      for (const key of keys) {
        if (key === target) {
          call(item, stack)
        } else if (typeof item[key] === 'object') {
          stack.push(item[key])
        }
      }
    }
  }

  isAdvertise (o): boolean {
    const filed = UnknownFieldHandler.list(o)[0]
    const adFlag = filed ? this.handleFieldNo(filed) : this.handleFieldEml(o)
    if (adFlag) this.needProcess = true
    return adFlag
  }

  handleFieldNo (field): boolean {
    const no = field.no
    // 增加白名单直接跳过用于提升性能
    if (this.whiteNo.includes(no)) {
      return false
    } else if (this.blackNo.includes(no)) return true
    // 包含 pagead 字符则判定为广告
    const rawText = this.decoder.decode(field.data)
    const adFlag = rawText.includes('pagead')
    adFlag ? this.blackNo.push(no) : this.whiteNo.push(no)
    this.needSave = true
    return adFlag
  }

  handleFieldEml (field): boolean {
    let adFlag = false
    let match = true
    let type = ''
    this.iterate(field, 'type', (obj, stack) => {
      type = obj.type.split('|')[0]
      if (this.whiteEml.includes(type)) {
        adFlag = false
      } else if (this.blackEml.includes(type) || /shorts(?!_pivot_item)/.test(type)) {
        adFlag = true
      } else {
        match = false
      }
      if (match) stack.length = 0
    })
    if (!match) {
      this.iterate(
        field,
        Symbol.for('protobuf-ts/unknown'),
        (obj, stack) => {
          const unknownFieldArray = UnknownFieldHandler.list(obj)
          for (const unknownField of unknownFieldArray) {
            if (unknownField.data.length > 1000) {
              const rawText = this.decoder.decode(unknownField.data)
              adFlag = rawText.includes('pagead')
              if (adFlag) {
                stack.length = 0
                break
              }
            }
          }
        }
      )
      adFlag ? this.blackEml.push(type) : this.whiteEml.push(type)
      this.needSave = true
    }
    return adFlag
  }
}
