let url = $request.url
let resp = null

if (url.includes("book/readingstat")) {
    resp = { "friendFinishReadingCount": 0, "markedStatus": 1, "friendReadingCount": 0, "friendNotFollowingCount": 0, "readingUsers": [], "recommendUsers": [], "isReading": 0, "readingCount": 0, "finishReadingCount": 0, "todayReadingCount": 0 }
} else if (url.includes("book/readingStat")) {
    resp = { "friendFinishReadingCount": 0, "mixReadingUsers": [], "friendReadingCount": 0, "friendNotFollowingCount": 0, "recommendUsers": [], "isReading": 0, "readingCount": 0, "finishReadingCount": 0, "todayReadingCount": 0 }
} else if (url.includes("book/chapterReview")) {
    resp = { "synckey": 0, "shareCount": 0 }
} else if (url.includes("groups/readerEntrance")) {
    resp = { "synckey": parseInt(new Date().getTime() / 1000), "hasGroup": 0 }
} else if (url.includes("review/list")) {
    resp = { "refUsers": [], "hasMore": 0, "totalCount": 0, "removed": [], "columns": [], "atUsers": [], "reviews": [] }
} else if (url.includes("discoverfeed/new")) {
    resp = JSON.parse($response.body)
    resp.data = resp.data.filter(item => item.type !== 2)
} else if (url.includes("discoverfeed/get")) {
    resp = JSON.parse($response.body)
    if (Array.isArray(resp.removed)) {
        resp.removed.push("63", "dailybooklist")
        resp.updated = 1
    }
    if (Array.isArray(resp.updatedNewRawItemIds)) {
        resp.updatedNewRawItemIds = resp.updatedNewRawItemIds.filter(item => item === "26")
    }
    if (Array.isArray(resp.items)) {
        resp.items = resp.items.filter(item => item.rawItemId === 26)
    }

} else if (url.includes("user/profile")) {
    resp = JSON.parse($response.body)
    resp.showMedal = 0
    resp.showReview = 0
    resp.canExchangeDay = 0
    resp.exchangeMsg = ""
} else if (url.includes("mobileSync")) {
    resp = JSON.parse($response.body)
    resp.discover = false
    resp.discoverFeed = 0
    resp.browseUpdate = 0
    resp.notifCount = 0
    resp.storyfeed = 0
    resp.storyfeedUpdated = 0
    resp.readingExchange = 0
    resp.friendReviewUpdate = 0
}
if (resp)
    $done({ body: JSON.stringify(resp) })
else
    $done({})