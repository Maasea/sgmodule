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
}
if (resp)
    $done({ body: JSON.stringify(resp) })
else
    $done({})