/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Browse,
  Next,
  Player,
  Search,
  Shorts,
  Guide,
  Setting
} from '../lib/response'
import { YouTubeMessage } from './youtube'
import { $ } from '../lib/env'
import { translateURL } from '../lib/googleTranslate'

export class BrowseMessage extends YouTubeMessage {
  needTranslate: boolean

  constructor (msgType: any = Browse, name: string = 'Browse') {
    super(msgType, name)
  }

  pure (): this {
    this.iterate(this.message, 'n5F1', (obj) => {
      for (let i = obj.n5F1?.length - 1; i >= 0; i--) {
        if (this.isAdvertise(obj.n5F1[i])) {
          obj.n5F1.splice(i, 1)
        }
      }
    })
    const browseId = this.getBrowseId()
    if (browseId.startsWith('MPLYt')) {
      this.needTranslate = true
    }
    return this
  }

  getBrowseId (): string {
    let browseId = ''
    this.iterate(this.message?.responseContext, 'key', (obj, stack) => {
      if (obj.key === 'browse_id') {
        browseId = obj.value
        stack.length = 0
      }
    })
    return browseId
  }

  async translate (): Promise<void> {
    let lyric = ''
    let tempObj: any
    let flag = false
    this.iterate(this.message, 'n13F1', (obj, stack) => {
      tempObj = obj
      lyric = obj.n13F1.map((item) => item.f1).join('\n')
      flag = true
      stack.length = 0
    })
    if (!flag) {
      this.iterate(this.message, 'staticLyric', (obj, stack) => {
        tempObj = obj
        lyric = obj.staticLyric
        stack.length = 0
        flag = true
      })
    }

    if (!flag) return

    const url = translateURL(lyric)
    const resp = await $.fetch({
      method: 'GET',
      url
    })
    if (resp.status === 200 && resp.body) {
      const data = JSON.parse(resp.body)
      const tips = ' & Translated by Google'
      const isZh = data[2].includes('zh')

      if (tempObj.staticLyric) {
        tempObj.staticLyric = data[0].map((item) => isZh ? item[0] : item[1] + item[0] || '').join('\r\n')
        this.iterate(this.message, 'originText', (ob, stack) => {
          ob.originText += tips
          stack.length = 0
        })
      } else {
        if (tempObj.n13F1.length <= data[0].length) {
          tempObj.n13F1.forEach((item, i) => {
            item.f1 = isZh ? data[0][i][0] : item.f1 + `\n${data[0][i][0] as string}`
          })
          tempObj.originText += tips
        }
      }
      this.needProcess = true
    }
  }
}

export class NextMessage extends BrowseMessage {
  constructor (msgType: any = Next, name: string = 'Next') {
    super(msgType, name)
  }

  pure (): this {
    super.pure()
    // this.addTranslateTab()
    return this
  }

  addTranslateTab (): void {
    this.iterate(this.message?.a1F7?.musicPlayRender, 'items', (obj, stack) => {
      const item = obj.items.find((item) =>
        item.tab.info?.browseInfo?.browseId.startsWith('MPLYt')
      )
      if (item) item.tab.name = item.tab.name + '⇄'
      this.needProcess = true
      // if (item) {
      //   const name = item.tab.name
      //   const translateTab = {
      //     tab: {
      //       name: name === 'Lyrics' ? 'Lyrics(ZH)' : '歌词(中文)',
      //       info: {
      //         browseInfo: {
      //           browseId: 'translate$' + item.tab.info.browseInfo.browseId
      //         }
      //       }
      //     }
      //   }
      //
      //   obj.items.splice(2, 0, translateTab)
      //   this.needProcess = true
      // }
      stack.length = 0
    })
  }
}

export class PlayerMessage extends YouTubeMessage {
  constructor (msgType: any = Player, name: string = 'Player') {
    super(msgType, name)
  }

  pure (): this {
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

    this.iterate(this.message, 'captionTracks', (obj, stack) => {
      // obj 就是 playerCaptionsTrackListRenderer
      const captionTracks = obj.captionTracks
      if (Array.isArray(captionTracks)) {
        // 有基础字幕
        for (const captionTrack of captionTracks) {
          captionTrack.isTranslatable = true
        }
      }
      obj.translationLanguages = [
        {
          languageCode: 'de',
          languageName: { runs: [{ text: 'Deutsch' }] }
        },
        {
          languageCode: 'ru',
          languageName: { runs: [{ text: 'Русский' }] }
        },
        {
          languageCode: 'fr',
          languageName: { runs: [{ text: 'Français' }] }
        },
        {
          languageCode: 'fil',
          languageName: { runs: [{ text: 'Filipino' }] }
        },
        {
          languageCode: 'ko',
          languageName: { runs: [{ text: '한국어' }] }
        },
        {
          languageCode: 'ja',
          languageName: { runs: [{ text: '日本語' }] }
        },
        {
          languageCode: 'en',
          languageName: { runs: [{ text: 'English' }] }
        },
        {
          languageCode: 'vi',
          languageName: { runs: [{ text: 'Tiếng Việt' }] }
        },
        {
          languageCode: 'zh-Hant',
          languageName: { runs: [{ text: '中文（繁體）' }] }
        },
        {
          languageCode: 'zh-Hans',
          languageName: { runs: [{ text: '中文（简体）' }] }
        },
        {
          languageCode: 'und',
          languageName: { runs: [{ text: '@VirgilClyne' }] }
        }
      ]

      if (!obj?.defaultCaptionTrackIndex) obj.defaultCaptionTrackIndex = 0
      stack.length = 0
    })
    this.needProcess = true
    return this
  }
}

export class SearchMessage extends BrowseMessage {
  constructor (msgType: any = Search, name: string = 'Search') {
    super(msgType, name)
  }
}

export class ShortsMessage extends YouTubeMessage {
  constructor (msgType: any = Shorts, name: string = 'Shorts') {
    super(msgType, name)
  }

  pure (): this {
    const shortsRawLength = this.message.t1F2?.length
    if (shortsRawLength) {
      for (let i = shortsRawLength - 1; i >= 0; i--) {
        if (!this.message.t1F2[i].n2F1?.n3F139608561?.n4F8) {
          this.message.t1F2.splice(i, 1)
          this.needProcess = true
        }
      }
    }
    return this
  }
}

export class GuideMessage extends YouTubeMessage {
  constructor (msgType: any = Guide, name: string = 'Guide') {
    super(msgType, name)
  }

  pure (): this {
    const blackList = ['FEmusic_immersive', 'SPunlimited', 'FEuploads']
    this.iterate(this.message, 'g3F1', (obj) => {
      for (let i = obj.g3F1.length - 1; i >= 0; i--) {
        const browseId =
          obj.g3F1[i]?.iconRender?.browseId ||
          obj.g3F1[i]?.labelRender?.browseId
        if (blackList.includes(browseId)) {
          obj.g3F1.splice(i, 1)
          this.needProcess = true
        }
      }
    })
    return this
  }
}

export class SettingMessage extends YouTubeMessage {
  constructor (msgType: any = Setting, name: string = 'Setting') {
    super(msgType, name)
  }

  pure (): this {
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
              st3F5,
              st6F81212182: {
                st7F1: {
                  st8F1: { f1: 151 },
                  f3: 1
                }
              }
            },
            st5F6: {
              st3F5,
              st6F81212182: {
                st7F1: {
                  st8F1: { f1: 151 },
                  f3: 0
                }
              }
            },
            st3F5
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
    return this
  }
}
