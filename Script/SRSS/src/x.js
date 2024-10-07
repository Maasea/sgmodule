import $ from '../lib/env.js'
import {sendRequest, parseProfileResponse, parsePinnedTimeResponse, parseTweetResponse, exit} from './httpUtil.js'
import {API} from "./constant.js";

export async function queryUserId(username) {
    const rssCache = $.getJSON("S-RSS", {users: {}, list: {}})
    let userId = rssCache.users[username]
    if (!userId) {
        const api = API.ProfileSpotlightsQuery
        api.variables.screen_name = username
        const respBody = await sendRequest(api.url, api.variables)
        userId = parseProfileResponse(respBody)
        if (!userId) {
            exit(`未找到用户:${username}`)
        }
        rssCache.users[username] = userId
        $.setJSON(rssCache, "S-RSS")
    }
    return userId
}

export async function queryListId(listName) {
    const rssCache = $.getJSON("S-RSS", {users: {}, list: {}})
    let listId = rssCache.list[listName]
    if (!listId) {
        const api = API.PinnedTimelines
        const respBody = await sendRequest(api.url, null, api.features)
        listId = parsePinnedTimeResponse(respBody, listName)
        if (!listId) {
            exit(`该账户信息未找到列表:${listName}`)
        }
        rssCache.list[listName] = listId
        $.setJSON(rssCache, "S-RSS",)
    }
    return listId
}

export async function queryUserTweets(username) {
    const userId = await queryUserId(username)
    $.log(userId)
    const api = API.UserTweets
    api.variables.userId = userId
    const respBody = await sendRequest(api.url, api.variables, api.features)
    return parseTweetResponse(respBody.data.user.result.timeline_v2.timeline.instructions)
}

export async function queryTweetsTimeline(listName) {
    const listId = await queryListId(listName)
    const api = API.ListLatestTweetsTimeline
    api.variables.listId = listId
    const respBody = await sendRequest(api.url, api.variables, api.features)
    return parseTweetResponse(respBody.data.list.tweets_timeline.timeline.instructions)
}
