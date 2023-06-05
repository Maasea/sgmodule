import { UnknownFieldHandler } from '@protobuf-ts/runtime'
import { $ } from '../lib/env'

export abstract class YouTubeMessage {
  needProcess: boolean
  needSave: boolean
  message: any
  whiteNo: number[]
  blackNo: number[]
  whiteEml: string[]
  blackEml: string[]
  decoder = new TextDecoder('utf-8', {
    fatal: false,
    ignoreBOM: true
  })

  protected constructor (name: string) {
    $.log(name)
    Object.assign(this, $.getJSON('YouTubeAdvertiseInfo', {
      whiteNo: [],
      blackNo: [],
      whiteEml: [],
      blackEml: ['cell_divider.eml']
    }))
  }

  abstract fromBinary (binaryBody: Uint8Array): this

  abstract pure (): this

  abstract toBinary (): Uint8Array

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

  iterate (obj: any = {}, target: string, call: Function, proto?: Function): any {
    const stack: any = []
    stack.push(obj)

    while (stack.length) {
      const item = stack.pop()
      const keys = Object.keys(item)

      while (keys.length) {
        const key = keys.pop() as any
        if (key === target) {
          call(item, stack)
        } else if (typeof item[key] === 'object') {
          stack.push(item[key])
          if (typeof proto === 'function') {
            proto(item, stack)
          }
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

  isUpload (o): boolean {
    const isUpload = o?.g4F318370163
    if (isUpload) this.needProcess = true
    return isUpload
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
        'type',
        () => {
        },
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
