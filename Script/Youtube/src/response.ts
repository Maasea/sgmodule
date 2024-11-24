/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Browse } from '../lib/protobuf/response/browse_pb'
import { Next } from '../lib/protobuf/response/next_pb'
import { Search } from '../lib/protobuf/response/search_pb'
import { Shorts } from '../lib/protobuf/response/shorts_pb'
import { Guide } from '../lib/protobuf/response/guide_pb'
import { Player, BackgroundPlayer, TranslationLanguage, CaptionTrack } from '../lib/protobuf/response/player_pb'
import { Setting, SubSetting, SettingItem } from '../lib/protobuf/response/setting_pb'
import { Watch } from '../lib/protobuf/response/watch_pb'
import { Entity } from '../lib/protobuf/response/frameworkUpdate_pb'

import { YouTubeMessage } from './youtube'
import { $ } from '../lib/env'
import { translateURL } from '../lib/googleTranslate'
import { protoBase64 } from '@bufbuild/protobuf'

export class BrowseMessage extends YouTubeMessage {
  constructor (msgType: any = Browse, name: string = 'Browse') {
    super(msgType, name)
  }

  async pure (): Promise<YouTubeMessage> {
    this.iterate(this.message, 'sectionListSupportedRenderers', (obj) => {
      for (let i = obj.sectionListSupportedRenderers.length - 1; i >= 0; i--) {
        this.removeCommonAD(obj, i)
        this.removeShorts(obj, i)
      }
    })
    // this.removeFrameworkUpdateAd()
    await this.translate()
    return this
  }

  removeCommonAD (obj: any, index: number): void {
    const content = obj.sectionListSupportedRenderers[index]
    const richItemContent = content?.itemSectionRenderer?.richItemContent
    for (let j = richItemContent?.length - 1; j >= 0; j--) {
      if (this.isAdvertise(richItemContent[j])) {
        richItemContent.splice(j, 1)
        this.needProcess = true
      }
    }
  }

  removeShorts (obj: any, index: number): void {
    const shelfRenderer = obj.sectionListSupportedRenderers[index]?.shelfRenderer
    if (this.isShorts(shelfRenderer)) {
      obj.sectionListSupportedRenderers.splice(index, 1)
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
    const lyricTargetLang = this.argument.lyricLang?.trim()
    if (!(this.name === 'Browse' && this.getBrowseId().startsWith('MPLYt')) || lyricTargetLang === 'off') return
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

    const origin = lyricTargetLang.split('-')[0]
    const url = translateURL(lyric, lyricTargetLang)
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

  removeFrameworkUpdateAd (): void {
    const mutations = this.message?.frameworkUpdateTransport?.entityBatchUpdate?.mutations
    if (!mutations) return

    for (let j = mutations.length - 1; j >= 0; j--) {
      const mutation = mutations[j]
      const entity = Entity.fromBinary(protoBase64.dec(decodeURIComponent(mutation.entityKey)))
      let adFlag = this.blackEml.includes(entity.name)
      if (!adFlag && this.checkUnknownFiled(mutation?.payload)) {
        adFlag = true
        this.blackEml.push(entity.name)
        this.needSave = true
      }
      if (adFlag) {
        mutations.splice(j, 1)
        this.needProcess = true
      }
    }
  }
}

export class NextMessage extends BrowseMessage {
  constructor (msgType: any = Next, name: string = 'Next') {
    super(msgType, name)
  }
}

export class PlayerMessage extends YouTubeMessage {
  constructor (msgType: any = Player, name: string = 'Player') {
    super(msgType, name)
  }

  pure (): YouTubeMessage {
    // 去除广告
    if (this.message.adPlacements?.length) {
      this.message.adPlacements.length = 0
    }
    if (this.message.adSlots?.length) {
      this.message.adSlots.length = 0
    }
    // 去除广告追踪
    delete this.message?.playbackTracking?.pageadViewthroughconversion
    // 增加 premium 特性
    this.addPlayAbility()
    this.addTranslateCaption()
    this.needProcess = true
    return this
  }

  addPlayAbility (): void {
    // 开启画中画
    const miniPlayerRender = this.message?.playabilityStatus?.miniPlayer?.miniPlayerRender
    if (typeof miniPlayerRender === 'object') {
      miniPlayerRender.active = true
    }
    // 开启后台播放
    if (typeof this.message.playabilityStatus === 'object') {
      this.message.playabilityStatus.backgroundPlayer = new BackgroundPlayer({
        backgroundPlayerRender: {
          active: true
        }
      })
    }
  }

  addTranslateCaption (): void {
    const captionTargetLang = this.argument.captionLang as string
    if (captionTargetLang === 'off') return

    this.iterate(this.message, 'captionTracks', (obj, stack) => {
      const captionTracks = obj.captionTracks
      const audioTracks = obj.audioTracks

      // 添加默认翻译语言
      if (Array.isArray(captionTracks)) {
        const captionPriority = {
          [captionTargetLang]: 2,
          en: 1
        }
        let priority = -1
        let targetIndex = 0

        for (let i = 0; i < captionTracks.length; i++) {
          const captionTrack = captionTracks[i]
          const currentPriority = captionPriority[captionTrack.languageCode]
          if (currentPriority && (currentPriority > priority)) {
            priority = currentPriority
            targetIndex = i
          }
          captionTrack.isTranslatable = true
        }

        if (priority !== 2) {
          const newCaption = new CaptionTrack({
            baseUrl: captionTracks[targetIndex].baseUrl + `&tlang=${captionTargetLang}`,
            name: { runs: [{ text: `@Enhance (${captionTargetLang})` }] },
            vssId: `.${captionTargetLang}`,
            languageCode: captionTargetLang
          })
          captionTracks.push(newCaption)
        }

        // 开启默认字幕
        if (Array.isArray(audioTracks)) {
          const trackIndex = priority === 2 ? targetIndex : captionTracks.length - 1
          for (const audioTrack of audioTracks) {
            if (!audioTrack.captionTrackIndices?.includes(trackIndex)) {
              audioTrack.captionTrackIndices.push(trackIndex)
            }
            audioTrack.defaultCaptionTrackIndex = trackIndex
            audioTrack.captionsInitialState = 3
          }
        }
      }

      // 重建自动翻译
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
      stack.length = 0
    })
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

  pure (): YouTubeMessage {
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

  pure (): YouTubeMessage {
    const blackList = ['SPunlimited']
    if (this.argument.blockUpload) blackList.push('FEuploads')
    if (this.argument.blockImmersive) blackList.push('FEmusic_immersive')
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

  pure (): YouTubeMessage {
    // 增加 PIP
    this.iterate(this.message.settingItems, 'categoryId', (obj) => {
      if (obj.categoryId === 10135) {
        const PipSettingRender = new SubSetting({
          settingBooleanRenderer: {
            itemId: 0,
            enableServiceEndpoint: {
              setClientSettingEndpoint: {
                settingData: {
                  clientSettingEnum: { item: 151 },
                  boolValue: true
                }
              }
            },
            disableServiceEndpoint: {
              setClientSettingEndpoint: {
                settingData: {
                  clientSettingEnum: { item: 151 },
                  boolValue: false
                }
              }
            }
          }
        })
        obj.subSettings.push(PipSettingRender)
      }
    })
    // 增加后台播放
    const fakePlayBackgroundSetting = new SettingItem({
      backgroundPlayBackSettingRenderer: {
        backgroundPlayback: true,
        download: true,
        downloadQualitySelection: true,
        smartDownload: true,
        icon: { iconType: 1093 }
      }
    })
    this.message.settingItems.push(fakePlayBackgroundSetting)
    this.needProcess = true
    return this
  }
}

export class WatchMessage extends YouTubeMessage {
  player: PlayerMessage
  next: NextMessage

  constructor (msgType: any = Watch, name: string = 'Watch') {
    super(msgType, name)
    this.player = new PlayerMessage()
    this.next = new NextMessage()
  }

  async pure (): Promise<YouTubeMessage> {
    for (const msg of this.message.contents) {
      if (msg.player) {
        this.player.message = msg.player
        await this.player.pure()
      }
      if (msg.next) {
        this.next.message = msg.next
        await this.next.pure()
      }
      this.needProcess = true
    }
    return this
  }
}
