import $ from "./lib/env.js"
import {queryTweetsTimeline, queryUserTweets} from "./src/x.js";
import {generateRss} from "./src/rssUtil.js";
import {exit, finish, getHeaderIgnoreCase} from "./src/httpUtil.js";

const url = $.request.url
if (url.startsWith("https://api.x.com/1.1/account/settings.json")) {
    const headers = $.request.headers
    const auth = getHeaderIgnoreCase(headers, "authorization")
    const refreshToken = getHeaderIgnoreCase(headers, "x-csrf-token")
    const cookie = getHeaderIgnoreCase(headers, "cookie")
    const account = {auth, refreshToken, cookie}
    $.setJSON(account, "S-RSS-ACCOUNT")
    $.msg("S-RSS", "X账户信息获取成功")
    $.exit()
} else if (url.startsWith("http://s.rss/x/user/")) {
    const path = url.split("/")
    const screenName = path[path.length - 1]
    if (!screenName.startsWith("@")) {
        exit("RSS链接错误", "参考模板http://s.rss/x/user/@username")
    }
    const username = screenName.substring(1)
    queryUserTweets(username).then((resp) => {
        const rss = generateRss(username, `https://x.com/${username}`, `http://s.rss/x/user/${username}`, resp)
        finish(rss)
    }).catch(e => {
        console.log(e)
    }).finally(() => {
        exit()
    })
} else if (url.startsWith("http://s.rss/x/list/")) {
    const path = url.split("/")
    const listName = path[path.length - 1]
    queryTweetsTimeline(listName).then((resp) => {
        const rss = generateRss(listName, `https://x.com/home`, `http://s.rss/x/list/${listName}`, resp)
        finish(rss)
    }).catch(e => {
        console.log(e)
    }).finally(() => {
        exit()
    })
} else {
    exit()
}