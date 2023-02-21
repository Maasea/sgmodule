import {
  BrowseMessage,
  NextMessage,
  PlayerMessage,
  SearchMessage,
  ShortsMessage,
  GuideMessage,
  SettingMessage
} from 'src/handler'

export default class Factory {
  static create (url, opt) {
    if (url.includes('/v1/browse')) {
      return new BrowseMessage(opt)
    } else if (url.includes('/v1/next')) {
      return new NextMessage(opt)
    } else if (url.includes('/v1/player')) {
      return new PlayerMessage(opt)
    } else if (url.includes('/v1/search')) {
      return new SearchMessage(opt)
    } else if (url.includes('/v1/reel/reel_watch_sequence')) {
      return new ShortsMessage(opt)
    } else if (url.includes('/v1/guide')) {
      return new GuideMessage(opt)
      // } else if (url.includes('/v1/log_event')) {
      //   return new LogMessage(opt)
    } else if (url.includes('/v1/account/get_setting')) {
      return new SettingMessage(opt)
    } else {
      return false
    }
  }
}
