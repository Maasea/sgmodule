import {
  BrowseMessage,
  NextMessage,
  PlayerMessage,
  SearchMessage,
  ShortsMessage,
  GuideMessage,
  SettingMessage,
} from 'src/responseHandler'

export default class Factory {
  static create (url) {
    if (url.includes('/v1/browse')) {
      return new BrowseMessage()
    } else if (url.includes('/v1/next')) {
      return new NextMessage()
    } else if (url.includes('/v1/player')) {
      return new PlayerMessage()
    } else if (url.includes('/v1/search')) {
      return new SearchMessage()
    } else if (url.includes('/v1/reel/reel_watch_sequence')) {
      return new ShortsMessage()
    } else if (url.includes('/v1/guide')) {
      return new GuideMessage()
    } else if (url.includes('/v1/account/get_setting')) {
      return new SettingMessage()
    }
    return null
  }
}
