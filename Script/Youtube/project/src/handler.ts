/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UnknownFieldHandler } from '@protobuf-ts/runtime'
import { Browse, Next, Player, Search, Shorts, Guide, Setting } from '../lib/youtube'
import { $ } from '../lib/env'

abstract class YouTubeMessage {
  needProcess: boolean
  needSave: boolean
  body: Uint8Array
  message: any
  whiteNo: number[]
  blackNo: number[]
  whiteEml: string[]
  blackEml: string[]
  decoder = new TextDecoder('utf-8', {
    fatal: false,
    ignoreBOM: true
  })

  protected constructor (whiteObj: any, name: string) {
    $.log(name)
    this.whiteNo = whiteObj.whiteNo
    this.blackNo = whiteObj.blackNo
    this.whiteEml = whiteObj.whiteEml
    this.blackEml = whiteObj.blackEml
  }

  abstract fromBinary (binaryBody: Uint8Array): void

  abstract pure (): void

  abstract toBinary (): void

  save (): void {
    if (this.needSave) {
      $.log('Update Config')
      const YouTubeWhiteObj = {
        whiteNo: this.whiteNo,
        blackNo: this.blackNo,
        whiteEml: this.whiteEml,
        blackEml: this.blackEml
      }
      $.setjson(YouTubeWhiteObj, 'YouTubeWhiteStr')
    }
  }

  done (): void {
    this.save()
    if (this.needProcess) {
      this.toBinary()
      $.log('Handle')
      if ($.isQuanX()) {
        $.done({
          bodyBytes: this.body.buffer.slice(
            this.body.byteOffset,
            this.body.byteLength + this.body.byteOffset
          )
        })
      } else {
        $.done({ body: this.body })
      }
    } else {
      $.done()
    }
  }

  iterate (obj: any = {}, target: string, call: Function, proto?: Function): any {
    const stack: any = []
    stack.push(obj)
    while (stack.length) {
      const item = stack.pop()
      for (const key of Object.keys(item)) {
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
    const unknownFiled = UnknownFieldHandler.list(o)[0]
    const adFlag = unknownFiled ? this.handleUnknownField(unknownFiled) : this.handleKnownField(o)
    if (adFlag) this.needProcess = true
    return adFlag
  }

  isUpload (o): boolean {
    const isUpload = o?.g4F318370163
    if (isUpload) this.needProcess = true
    return isUpload
  }

  handleUnknownField (field): boolean {
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
    $.log('UnknownField:' + no + ': ' + adFlag)
    return adFlag
  }

  handleKnownField (field): boolean {
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
          for (const unknownFiled of UnknownFieldHandler.list(obj)) {
            if (unknownFiled.data.length > 1000) {
              const rawText = this.decoder.decode(unknownFiled.data)
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

export class BrowseMessage extends YouTubeMessage {
  constructor (whiteObj: any, name: string = 'Browse') {
    super(whiteObj, name)
  }

  fromBinary (binaryBody): void {
    this.message = Browse.fromBinary(binaryBody)
  }

  pure (): void {
    this.iterate(this.message, 'n5F1', (obj) => {
      for (let i = obj.n5F1?.length - 1; i >= 0; i--) {
        if (this.isAdvertise(obj.n5F1[i])) {
          obj.n5F1.splice(i, 1)
        }
      }
    })
  }

  toBinary (): void {
    this.body = Browse.toBinary(this.message)
  }
}

export class NextMessage extends BrowseMessage {
  constructor (whiteObj: any, name: string = 'Next') {
    super(whiteObj, name)
  }

  fromBinary (binaryBody): void {
    this.message = Next.fromBinary(binaryBody)
  }

  toBinary (): void {
    this.body = Next.toBinary(this.message)
  }
}

export class PlayerMessage extends YouTubeMessage {
  constructor (whiteObj: any, name: string = 'Player') {
    super(whiteObj, name)
  }

  fromBinary (binaryBody): void {
    this.message = Player.fromBinary(binaryBody)
  }

  pure (): void {
    if (this.message.p1F7?.length) {
      this.message.p1F7.length = 0
    }
    // 尝试开启PIP
    const option = this.message?.p1F2?.p2F21?.p3F151635310
    if (typeof option === 'object') {
      option.pip = 1
    }
    // 尝试开启后台播放
    const backPlayFake = {
      p2F11: {
        p3F64657230: {
          backPlay: 1
        }
      }
    }
    if (typeof this.message?.p1F2 === 'object') {
      Object.assign(this.message.p1F2, backPlayFake)
    }
    this.needProcess = true
  }

  toBinary (): void {
    this.body = Player.toBinary(this.message)
  }
}

export class SearchMessage extends BrowseMessage {
  constructor (whiteObj: any, name: string = 'Search') {
    super(whiteObj, name)
  }

  fromBinary (binaryBody): void {
    this.message = Search.fromBinary(binaryBody)
  }

  toBinary (): void {
    this.body = Search.toBinary(this.message)
  }
}

export class ShortsMessage extends YouTubeMessage {
  constructor (whiteObj: any, name: string = 'Shorts') {
    super(whiteObj, name)
  }

  fromBinary (binaryBody): void {
    this.message = Shorts.fromBinary(binaryBody)
  }

  pure (): void {
    const shortsRawLength = this.message.t1F2?.length
    if (shortsRawLength) {
      for (let i = shortsRawLength - 1; i >= 0; i--) {
        if (!this.message.t1F2[i].n2F1?.n3F139608561?.n4F8) {
          this.message.t1F2.splice(i, 1)
          this.needProcess = true
        }
      }
    }
  }

  toBinary (): void {
    this.body = Shorts.toBinary(this.message)
  }
}

export class GuideMessage extends YouTubeMessage {
  constructor (whiteObj: any, name: string = 'Guide') {
    super(whiteObj, name)
  }

  fromBinary (binaryBody): void {
    this.message = Guide.fromBinary(binaryBody)
  }

  pure (): void {
    this.iterate(this.message, 'g3F1', (obj) => {
      for (let i = obj.g3F1.length - 1; i >= 0; i--) {
        if (this.isUpload(obj.g3F1[i])) {
          obj.g3F1.splice(i, 1)
        }
      }
    })
  }

  toBinary (): void {
    this.body = Guide.toBinary(this.message)
  }
}

// export class LogMessage extends YouTubeMessage {
//   constructor (whiteObj: any, name: string = 'Log') {
//     super(whiteObj, name)
//   }
//
//   fromBinary (binaryBody): void {
//     this.message = Log.fromBinary(binaryBody)
//   }
//
//   pure (): void {
//     this.iterate(this.message, 'pip', (obj) => {
//       if (!obj.pip) {
//         obj.pip = 1
//         this.needProcess = true
//       }
//     })
//   }
//
//   toBinary (): void {
//     this.body = Log.toBinary(this.message)
//   }
// }

export class SettingMessage extends YouTubeMessage {
  constructor (whiteObj: any, name: string = 'Setting') {
    super(whiteObj, name)
  }

  fromBinary (binaryBody): void {
    this.message = Setting.fromBinary(binaryBody)
  }

  pure (): void {
    // 增加 PIP
    this.iterate(this.message, 'num', (obj) => {
      if (obj.num === 10005) {
        const st3F5 = {
          f1: 135,
          f2: 20434,
          f3: 2,
          st2F4: this.message.st1F10.st2F4
        }
        const fakePIP = {
          st4F61331416: {
            f15: 0,
            st5F5: {
              st3F5: st3F5,
              st6F81212182: {
                st7F1: {
                  st8F1: { f1: 151 },
                  f3: 1
                }
              }
            },
            st5F6: {
              st3F5: st3F5,
              st6F81212182: {
                st7F1: {
                  st8F1: { f1: 151 },
                  f3: 0
                }
              }
            },
            st3F5: st3F5
          }
        }
        obj.st3F3.push(fakePIP)
      }
    })
    // 增加后台播放
    const fakeF88478200 = {
      st2F88478200: {
        // st3F1: { st4F1: { title: 'Background & downloads' } },
        f2: 1,
        f3: 1,
        st3F5: {
          f1: 2,
          f2: 20020,
          f3: 8,
          st2F4: this.message.st1F10.st2F4
        },
        f6: 0,
        f7: 1,
        f8: 1,
        f9: 1,
        f10: 1,
        f12: 1
      }
    }
    // deep copy
    this.message.st1F6.push(JSON.parse(JSON.stringify(fakeF88478200)))
    fakeF88478200.st2F88478200.st3F5.f1 = 1
    fakeF88478200.st2F88478200.st3F5.f3 = 9
    this.message.st1F7 = fakeF88478200
    this.needProcess = true
  }

  toBinary (): void {
    this.body = Setting.toBinary(this.message)
  }
}
