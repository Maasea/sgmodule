import {
  BrowseMessage,
  NextMessage,
  PlayerMessage,
  SearchMessage,
  ShortsMessage,
  GuideMessage,
  SettingMessage
} from '../src/responseHandler'
import { YouTubeMessage } from '../src/youtube'

const messages = new Map([
  ['browse', BrowseMessage],
  ['next', NextMessage],
  ['player', PlayerMessage],
  ['search', SearchMessage],
  ['reel_watch_sequence', ShortsMessage],
  ['guide', GuideMessage],
  ['get_setting', SettingMessage]
])

export default function createMessage (url): YouTubeMessage | null {
  for (const [path, MessageClass] of messages.entries()) {
    if (url.includes(path)) {
      return new MessageClass()
    }
  }
  return null
}
