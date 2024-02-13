/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Browse } from '../lib/protobuf/response/browse_pb'
import { Next } from '../lib/protobuf/response/next_pb'
import { Search } from '../lib/protobuf/response/search_pb'
import { Shorts } from '../lib/protobuf/response/shorts_pb'
import { Guide } from '../lib/protobuf/response/guide_pb'
import { Player, BackgroundAbility, TranslationLanguage } from '../lib/protobuf/response/player_pb'
import { Setting, SubSetting, SettingItem } from '../lib/protobuf/response/setting_pb'

import { YouTubeMessage } from './youtube'
import { $ } from '../lib/env'
import { translateURL } from '../lib/googleTranslate'

export class BrowseMessage extends YouTubeMessage {
  constructor (msgType: any = Browse, name: string = 'Browse') {
    super(msgType, name)
  }

  async pure (): Promise<this> {
    this.iterate(this.message, 'richGridContents', (obj) => {
      for (let i = obj.richGridContents.length - 1; i >= 0; i--) {
        this.removeCommonAD(obj, i)
        this.removeShorts(obj, i)
      }
    })
    await this.translate()
    return this
  }

  removeCommonAD (obj: any, index: number): void {
    const content = obj.richGridContents[index]
    const richItemContent = content?.richItemRenderer?.richItemContent
    for (let j = richItemContent?.length - 1; j >= 0; j--) {
      if (this.isAdvertise(richItemContent[j])) {
        richItemContent.splice(j, 1)
        this.needProcess = true
      }
    }
  }

  removeShorts (obj: any, index: number): void {
    const richSectionRenderer = obj.richGridContents[index]?.richSectionRenderer
    if (this.isShorts(richSectionRenderer)) {
      obj.richGridContents.splice(index, 1)
      this.needProcess = true
    }
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
    if (!(this.name === 'Browse' && this.getBrowseId().startsWith('MPLYt'))) return
    let lyric = ''
    let tempObj: any
    let flag = false
    this.iterate(this.message, 'timedLyricsContent', (obj, stack) => {
      tempObj = obj.timedLyricsContent
      lyric = obj.timedLyricsContent.runs.map((item) => item.text).join('\n')
      flag = true
      stack.length = 0
    })
    if (!flag) {
      this.iterate(this.message, 'description', (obj, stack) => {
        tempObj = obj.description.runs[0]
        lyric = obj.description.runs[0].text
        stack.length = 0
        flag = true
      })
    }
    if (!flag) return
    const target = this.argument.targetLang?.trim()
    const origin = target.split('-')[0]
    const url = translateURL(lyric, target)
    const resp = await $.fetch({
      method: 'GET',
      url
    })
    if (resp.status === 200 && resp.body) {
      const data = JSON.parse(resp.body)
      const tips = ' & Translated by Google'
      const isOrigin = data[2].includes(origin)

      if (tempObj.text) {
        tempObj.text = data[0].map((item) => isOrigin ? item[0] : item[1] + item[0] || '').join('\r\n')
        this.iterate(this.message, 'footer', (ob, stack) => {
          ob.footer.runs[0].text += tips
          stack.length = 0
        })
      } else {
        if (tempObj.runs.length <= data[0].length) {
          tempObj.runs.forEach((item, i) => {
            item.text = isOrigin ? data[0][i][0] : item.text + `\n${data[0][i][0] as string}`
          })
          tempObj.footerLabel += tips
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
    if (this.message.adPlacements?.length) {
      this.message.adPlacements.length = 0
    }
    // 尝试开启PIP
    const piplayer = this.message?.playabilityStatus?.pipAbility?.piplayer
    if (typeof piplayer === 'object') {
      piplayer.active = true
    }
    // 尝试开启后台播放
    if (typeof this.message.playabilityStatus === 'object') {
      this.message.playabilityStatus.backgroundAbility = new BackgroundAbility({
        backgroundPlayer: {
          active: true
        }
      })
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
      const languages = {
        de: 'Deutsch',
        ru: 'Русский',
        fr: 'Français',
        fil: 'Filipino',
        ko: '한국어',
        ja: '日本語',
        en: 'English',
        vi: 'Tiếng Việt',
        'zh-Hant': '中文（繁體）',
        'zh-Hans': '中文（简体）',
        und: '@VirgilClyne'
      }
      obj.translationLanguages =
        Object.entries(languages).map(([k, v]) => new TranslationLanguage({
          languageCode: k,
          languageName: { runs: [{ text: v }] }
        }))

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
    const shortsRawLength = this.message.entries?.length
    if (shortsRawLength) {
      for (let i = shortsRawLength - 1; i >= 0; i--) {
        if (!this.message.entries[i].command?.reelWatchEndpoint?.overlay) {
          this.message.entries.splice(i, 1)
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
    const blackList = ['SPunlimited']
    if (this.argument.blockUpload) blackList.push('FEuploads')
    if (this.argument.immersive) blackList.push('FEmusic_immersive')
    this.iterate(this.message, 'rendererItems', (obj) => {
      for (let i = obj.rendererItems.length - 1; i >= 0; i--) {
        const browseId =
          obj.rendererItems[i]?.iconRender?.browseId ||
          obj.rendererItems[i]?.labelRender?.browseId
        if (blackList.includes(browseId)) {
          obj.rendererItems.splice(i, 1)
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
    this.iterate(this.message, 'categoryId', (obj) => {
      if (obj.categoryId === 10005) {
        const trackingParams = {
          f1: 135,
          f2: 20434,
          f3: 2,
          timeInfo: this.message.trackingParams.timeInfo
        }
        const fakePIPSetting = new SubSetting({
          settingBooleanRenderer: {
            itemId: 0,
            enableServiceEndpoint: {
              trackingParams,
              setClientSettingEndpoint: {
                settingDatas: {
                  clientSettingEnum: { item: 151 },
                  boolValue: true
                }
              }
            },
            disableServiceEndpoint: {
              trackingParams,
              setClientSettingEndpoint: {
                settingDatas: {
                  clientSettingEnum: { item: 151 },
                  boolValue: false
                }
              }
            },
            clickTrackingParams: trackingParams
          }
        })

        obj.subSettings.push(fakePIPSetting)
      }
    })
    // 增加后台播放
    const fakePlayBackgroundSetting = new SettingItem({
      settingCategoryEntryRenderer: {
        f2: 1,
        f3: 1,
        trackingParams: {
          f1: 2,
          f2: 20020,
          f3: 8,
          timeInfo: this.message.trackingParams.timeInfo
        },
        f6: 0,
        f7: 1,
        f8: 1,
        f9: 1,
        f10: 1,
        f12: 1
      }
    })
    // deep copy
    this.message.settingItems.push(fakePlayBackgroundSetting)
    // fakeF88478200.st2F88478200.st3F5.f1 = 1
    // fakeF88478200.st2F88478200.st3F5.f3 = 9
    // this.message.st1F7 = fakeF88478200
    this.needProcess = true
    return this
  }
}
