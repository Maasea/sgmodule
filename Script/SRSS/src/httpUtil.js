import $ from "../lib/env.js";
import {AGENT} from "./constant.js";
import URLs from "../lib/urls.js";

export async function sendRequest(api, variables, features) {
    const url = new URLs(api)
    if (typeof variables == 'object') {
        variables = JSON.stringify(variables)
    }
    if (typeof features == 'object') {
        features = JSON.stringify(features)
    }
    if (variables) {
        url.params.variables = variables
    }
    if (features) {
        url.params.features = features
    }
    const {auth, refreshToken, cookie} = $.getJSON("S-RSS-ACCOUNT")
    if (!(auth && refreshToken && cookie)) {
        $.msg("S-RSS", "无可用账户信息", "使用浏览器登录X获取")
        $.done({response: {}})
    }
    const response = await $.fetch(
        {
            url: url.toString(),
            method: "GET",
            headers: {
                ...AGENT,
                authorization: auth,
                cookie: cookie,
                "x-csrf-token": refreshToken
            }
        })
    if (response.status !== 200) {
        exit("获取X数据错误", "可能需要重新获取账户信息")
    }
    return JSON.parse(response.body)
}

export function parseProfileResponse(respBody) {
    return respBody.data['user_result_by_screen_name'].result['rest_id']
}

export function parsePinnedTimeResponse(respBody, listName) {
    const pinned_timelines = respBody.data['pinned_timelines']['pinned_timelines']
    for (let timeline of pinned_timelines) {
        if (timeline['__typename'] === 'ListPinnedTimeline' && timeline.list.name === listName) {
            return timeline.list['id_str']
        }
    }
}

export function parseTweetResponse(instructions) {
    const instruction = instructions.find(instruction => instruction.type === 'TimelineAddEntries')
    const result = []
    for (let entry of instruction.entries) {
        const temp = {items: []}

        if (entry.entryId.startsWith("profile-conversation-")) {
            temp.items = convertProfileConversation(entry.content.items)
        } else if (entry.entryId.startsWith("tweet-")) {
            temp.items.push(convertItemContent(entry.content.itemContent.tweet_results.result))
        }

        if (temp.items.length === 0) {
            continue
        }
        result.push(temp)
    }
    return result
}

export function getHeaderIgnoreCase(headers, key) {
    const propKey = Object.keys(headers).find(header => header.toLowerCase() === key.toLowerCase());
    return headers[propKey];
}

function convertProfileConversation(items) {
    const finalItems = []
    for (let item of items) {
        const template = convertItemContent(item.item.itemContent.tweet_results.result)
        finalItems.push(template)
    }
    return finalItems
}

function convertItemContent(tweetResult) {
    const template = {}
    template.user = convertUserResult(tweetResult)
    template.tweet = convertTweetResult(tweetResult)
    // 引用
    if (tweetResult?.quoted_status_result?.result) {
        const quoteResult = tweetResult.quoted_status_result.result
        template.quoted = convertItemContent(quoteResult)
    }
    // 转发
    if (tweetResult?.legacy?.retweeted_status_result?.result) {
        const reTweetResult = tweetResult.legacy.retweeted_status_result.result
        template.reTweet = convertItemContent(reTweetResult)
    }
    return template
}

function convertUserResult(tweetResult) {
    const user = tweetResult.core.user_results.result.legacy
    return {
        name: user.name,
        screenName: user.screen_name,
        avatar: user.profile_image_url_https
    }
}

function convertTweetResult(tweetResult) {
    const legacy = tweetResult.legacy
    const noteTweet = tweetResult?.note_tweet?.note_tweet_results?.result
    const template = {
        tweetId: tweetResult.rest_id,
        legacy: {
            text: legacy.full_text,
            urls: legacy?.entities?.urls?.map(it => {
                return {
                    url: it.expanded_url,
                    display: it.display_url,
                    shortUrl: it.url
                }
            }),
        },
        media: legacy?.entities?.media?.map(it => {
            return {
                type: it.type,
                url: it.media_url_https,
                shortUrl: it.url,
                videoUrl: it?.video_info?.variants?.[0]?.url
            }
        }),
        createDate: legacy.created_at
    }
    if (noteTweet) {
        template.noteTweet = {
            text: noteTweet.text,
            urls: noteTweet?.entity_set?.urls?.map(it => {
                return {
                    url: it.expanded_url,
                    display: it.display_url,
                    shortUrl: it.url
                }
            })
        }
    }
    return template
}

export function exit(subTitle, msg) {
    if (subTitle || msg) {
        $.msg("S-RSS", subTitle || "", msg || "")
    }
    $.done({response: {}})
}

export function finish(rss) {
    $.done({
        response: {
            body: rss,
            headers: {
                "Content-Type": "application/rss+xml; charset=UTF-8"
            }
        }
    })
}