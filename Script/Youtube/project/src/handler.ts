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
    if (this.message?.captions) { // 有基础字幕
      // 有播放器字幕列表渲染器
      if (this.message?.captions?.playerCaptionsTracklistRenderer) {
        // 处理字幕翻译选项
        if (this.message?.captions?.playerCaptionsTracklistRenderer?.captionTracks) {
          // 改字幕可用性
          this.message.captions.playerCaptionsTracklistRenderer.captionTracks = this.message?.captions?.playerCaptionsTracklistRenderer.captionTracks.map(caption => {
            caption.isTranslatable = true;
            return caption;
          });
        };
        // 增加自动翻译可用语言
        this.message.captions.playerCaptionsTracklistRenderer.translationLanguages = [{"languageCode":"sq","languageName":{"runs":[{"text":"阿尔巴尼亚语"}]}},{"languageCode":"ak","languageName":{"runs":[{"text":"阿肯语"}]}},{"languageCode":"ar","languageName":{"runs":[{"text":"阿拉伯语"}]}},{"languageCode":"am","languageName":{"runs":[{"text":"阿姆哈拉语"}]}},{"languageCode":"as","languageName":{"runs":[{"text":"阿萨姆语"}]}},{"languageCode":"az","languageName":{"runs":[{"text":"阿塞拜疆语"}]}},{"languageCode":"ee","languageName":{"runs":[{"text":"埃维语"}]}},{"languageCode":"ay","languageName":{"runs":[{"text":"艾马拉语"}]}},{"languageCode":"ga","languageName":{"runs":[{"text":"爱尔兰语"}]}},{"languageCode":"et","languageName":{"runs":[{"text":"爱沙尼亚语"}]}},{"languageCode":"or","languageName":{"runs":[{"text":"奥里亚语"}]}},{"languageCode":"om","languageName":{"runs":[{"text":"奥罗莫语"}]}},{"languageCode":"eu","languageName":{"runs":[{"text":"巴斯克语"}]}},{"languageCode":"be","languageName":{"runs":[{"text":"白俄罗斯语"}]}},{"languageCode":"bg","languageName":{"runs":[{"text":"保加利亚语"}]}},{"languageCode":"nso","languageName":{"runs":[{"text":"北索托语"}]}},{"languageCode":"is","languageName":{"runs":[{"text":"冰岛语"}]}},{"languageCode":"pl","languageName":{"runs":[{"text":"波兰语"}]}},{"languageCode":"bs","languageName":{"runs":[{"text":"波斯尼亚语"}]}},{"languageCode":"fa","languageName":{"runs":[{"text":"波斯语"}]}},{"languageCode":"bho","languageName":{"runs":[{"text":"博杰普尔语"}]}},{"languageCode":"ts","languageName":{"runs":[{"text":"聪加语"}]}},{"languageCode":"tt","languageName":{"runs":[{"text":"鞑靼语"}]}},{"languageCode":"da","languageName":{"runs":[{"text":"丹麦语"}]}},{"languageCode":"de","languageName":{"runs":[{"text":"德语"}]}},{"languageCode":"dv","languageName":{"runs":[{"text":"迪维希语"}]}},{"languageCode":"ru","languageName":{"runs":[{"text":"俄语"}]}},{"languageCode":"fr","languageName":{"runs":[{"text":"法语"}]}},{"languageCode":"sa","languageName":{"runs":[{"text":"梵语"}]}},{"languageCode":"fil","languageName":{"runs":[{"text":"菲律宾语"}]}},{"languageCode":"fi","languageName":{"runs":[{"text":"芬兰语"}]}},{"languageCode":"km","languageName":{"runs":[{"text":"高棉语"}]}},{"languageCode":"ka","languageName":{"runs":[{"text":"格鲁吉亚语"}]}},{"languageCode":"gu","languageName":{"runs":[{"text":"古吉拉特语"}]}},{"languageCode":"gn","languageName":{"runs":[{"text":"瓜拉尼语"}]}},{"languageCode":"kk","languageName":{"runs":[{"text":"哈萨克语"}]}},{"languageCode":"ht","languageName":{"runs":[{"text":"海地克里奥尔语"}]}},{"languageCode":"ko","languageName":{"runs":[{"text":"韩语"}]}},{"languageCode":"ha","languageName":{"runs":[{"text":"豪萨语"}]}},{"languageCode":"nl","languageName":{"runs":[{"text":"荷兰语"}]}},{"languageCode":"gl","languageName":{"runs":[{"text":"加利西亚语"}]}},{"languageCode":"ca","languageName":{"runs":[{"text":"加泰罗尼亚语"}]}},{"languageCode":"cs","languageName":{"runs":[{"text":"捷克语"}]}},{"languageCode":"kn","languageName":{"runs":[{"text":"卡纳达语"}]}},{"languageCode":"ky","languageName":{"runs":[{"text":"柯尔克孜语"}]}},{"languageCode":"xh","languageName":{"runs":[{"text":"科萨语"}]}},{"languageCode":"co","languageName":{"runs":[{"text":"科西嘉语"}]}},{"languageCode":"hr","languageName":{"runs":[{"text":"克罗地亚语"}]}},{"languageCode":"qu","languageName":{"runs":[{"text":"克丘亚语"}]}},{"languageCode":"ku","languageName":{"runs":[{"text":"库尔德语"}]}},{"languageCode":"la","languageName":{"runs":[{"text":"拉丁语"}]}},{"languageCode":"lv","languageName":{"runs":[{"text":"拉脱维亚语"}]}},{"languageCode":"lo","languageName":{"runs":[{"text":"老挝语"}]}},{"languageCode":"lt","languageName":{"runs":[{"text":"立陶宛语"}]}},{"languageCode":"ln","languageName":{"runs":[{"text":"林加拉语"}]}},{"languageCode":"lg","languageName":{"runs":[{"text":"卢干达语"}]}},{"languageCode":"lb","languageName":{"runs":[{"text":"卢森堡语"}]}},{"languageCode":"rw","languageName":{"runs":[{"text":"卢旺达语"}]}},{"languageCode":"ro","languageName":{"runs":[{"text":"罗马尼亚语"}]}},{"languageCode":"mt","languageName":{"runs":[{"text":"马耳他语"}]}},{"languageCode":"mr","languageName":{"runs":[{"text":"马拉地语"}]}},{"languageCode":"mg","languageName":{"runs":[{"text":"马拉加斯语"}]}},{"languageCode":"ml","languageName":{"runs":[{"text":"马拉雅拉姆语"}]}},{"languageCode":"ms","languageName":{"runs":[{"text":"马来语"}]}},{"languageCode":"mk","languageName":{"runs":[{"text":"马其顿语"}]}},{"languageCode":"mi","languageName":{"runs":[{"text":"毛利语"}]}},{"languageCode":"mn","languageName":{"runs":[{"text":"蒙古语"}]}},{"languageCode":"bn","languageName":{"runs":[{"text":"孟加拉语"}]}},{"languageCode":"my","languageName":{"runs":[{"text":"缅甸语"}]}},{"languageCode":"hmn","languageName":{"runs":[{"text":"苗语"}]}},{"languageCode":"af","languageName":{"runs":[{"text":"南非荷兰语"}]}},{"languageCode":"st","languageName":{"runs":[{"text":"南索托语"}]}},{"languageCode":"ne","languageName":{"runs":[{"text":"尼泊尔语"}]}},{"languageCode":"no","languageName":{"runs":[{"text":"挪威语"}]}},{"languageCode":"pa","languageName":{"runs":[{"text":"旁遮普语"}]}},{"languageCode":"pt","languageName":{"runs":[{"text":"葡萄牙语"}]}},{"languageCode":"ps","languageName":{"runs":[{"text":"普什图语"}]}},{"languageCode":"ny","languageName":{"runs":[{"text":"齐切瓦语"}]}},{"languageCode":"ja","languageName":{"runs":[{"text":"日语"}]}},{"languageCode":"sv","languageName":{"runs":[{"text":"瑞典语"}]}},{"languageCode":"sm","languageName":{"runs":[{"text":"萨摩亚语"}]}},{"languageCode":"sr","languageName":{"runs":[{"text":"塞尔维亚语"}]}},{"languageCode":"si","languageName":{"runs":[{"text":"僧伽罗语"}]}},{"languageCode":"sn","languageName":{"runs":[{"text":"绍纳语"}]}},{"languageCode":"eo","languageName":{"runs":[{"text":"世界语"}]}},{"languageCode":"sk","languageName":{"runs":[{"text":"斯洛伐克语"}]}},{"languageCode":"sl","languageName":{"runs":[{"text":"斯洛文尼亚语"}]}},{"languageCode":"sw","languageName":{"runs":[{"text":"斯瓦希里语"}]}},{"languageCode":"gd","languageName":{"runs":[{"text":"苏格兰盖尔语"}]}},{"languageCode":"ceb","languageName":{"runs":[{"text":"宿务语"}]}},{"languageCode":"so","languageName":{"runs":[{"text":"索马里语"}]}},{"languageCode":"tg","languageName":{"runs":[{"text":"塔吉克语"}]}},{"languageCode":"te","languageName":{"runs":[{"text":"泰卢固语"}]}},{"languageCode":"ta","languageName":{"runs":[{"text":"泰米尔语"}]}},{"languageCode":"th","languageName":{"runs":[{"text":"泰语"}]}},{"languageCode":"ti","languageName":{"runs":[{"text":"提格利尼亚语"}]}},{"languageCode":"tr","languageName":{"runs":[{"text":"土耳其语"}]}},{"languageCode":"tk","languageName":{"runs":[{"text":"土库曼语"}]}},{"languageCode":"cy","languageName":{"runs":[{"text":"威尔士语"}]}},{"languageCode":"ug","languageName":{"runs":[{"text":"维吾尔语"}]}},{"languageCode":"und","languageName":{"runs":[{"text":"未知语言"}]}},{"languageCode":"ur","languageName":{"runs":[{"text":"乌尔都语"}]}},{"languageCode":"uk","languageName":{"runs":[{"text":"乌克兰语"}]}},{"languageCode":"uz","languageName":{"runs":[{"text":"乌兹别克语"}]}},{"languageCode":"es","languageName":{"runs":[{"text":"西班牙语"}]}},{"languageCode":"fy","languageName":{"runs":[{"text":"西弗里西亚语"}]}},{"languageCode":"iw","languageName":{"runs":[{"text":"希伯来语"}]}},{"languageCode":"el","languageName":{"runs":[{"text":"希腊语"}]}},{"languageCode":"haw","languageName":{"runs":[{"text":"夏威夷语"}]}},{"languageCode":"sd","languageName":{"runs":[{"text":"信德语"}]}},{"languageCode":"hu","languageName":{"runs":[{"text":"匈牙利语"}]}},{"languageCode":"su","languageName":{"runs":[{"text":"巽他语"}]}},{"languageCode":"hy","languageName":{"runs":[{"text":"亚美尼亚语"}]}},{"languageCode":"ig","languageName":{"runs":[{"text":"伊博语"}]}},{"languageCode":"it","languageName":{"runs":[{"text":"意大利语"}]}},{"languageCode":"yi","languageName":{"runs":[{"text":"意第绪语"}]}},{"languageCode":"hi","languageName":{"runs":[{"text":"印地语"}]}},{"languageCode":"id","languageName":{"runs":[{"text":"印度尼西亚语"}]}},{"languageCode":"en","languageName":{"runs":[{"text":"英语"}]}},{"languageCode":"yo","languageName":{"runs":[{"text":"约鲁巴语"}]}},{"languageCode":"vi","languageName":{"runs":[{"text":"越南语"}]}},{"languageCode":"jv","languageName":{"runs":[{"text":"爪哇语"}]}},{"languageCode":"zh-Hant","languageName":{"runs":[{"text":"中文（繁体）"}]}},{"languageCode":"zh-Hans","languageName":{"runs":[{"text":"中文（简体）"}]}},{"languageCode":"zu","languageName":{"runs":[{"text":"祖鲁语"}]}},{"languageCode":"kri","languageName":{"runs":[{"text":"Kri"}]}}];
      };
    };
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
