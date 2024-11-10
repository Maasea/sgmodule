export function generateRss(channelName, link, subLink, parsedRespBody) {
    const items = []
    for (let data of parsedRespBody) {
        const {name, screenName, tweetId, description, pubDate} = generateOnceProp(data.items[0])
        const content = generateItemContent(data.items)
        const itemStr = `<item>
                                   <title>${name}</title>
                                   <link>https://x.com/${screenName}/status/${tweetId}</link>
                                   <description>${description}</description>
                                   <content:encoded>
                                        <![CDATA[${content}]]>
                                   </content:encoded>
                                   <pubDate>${pubDate}</pubDate>
                             </item>`
        items.push(itemStr)
    }
    return rssTemplate(channelName, link, subLink, items)
}

function generateItemContent(items) {
    let content = "";
    let index = 0
    for (let item of items) {

        if (nonFirst(index)) {
            content += "<hr>"
        }
        if (item.reTweet) {
            content += `<strong>RT</strong>${convertItem(item.reTweet)}`
            item = item.reTweet
        } else {
            content += convertItem(item, nonFirst(index))
        }
        if (item.quoted) {
            content += `<blockquote>${convertItem(item.quoted)}</blockquote>`
        }
        index++
    }
    return content;
}

function convertItem(item, header = true) {
    let tweet = item.tweet.legacy
    if (item.tweet.noteTweet) {
        tweet = item.tweet.noteTweet
    }
    let content = ""
    if (header) {
        const originTweet = `https://x.com/${item.user.screenName}/status/${item.tweet.tweetId}`
        const pubDate = new Date(item.tweet.createDate)
        const dateStr = `${pubDate.getFullYear()}年${pubDate.getMonth() + 1}月${pubDate.getDate()}日`
        content += `<H4><a href="${originTweet}">${item.user.name}</H4>`
        content += `<strong>${dateStr}</strong>`
    }

    content += `<p>${tweet.text}</p>`.replace(/\n/g, '<br>')
    tweet?.urls?.map(m => {
        content = replaceResource(content, m.shortUrl, `<a href="${m.url}">${m.display}</a>`)
    })
    item?.tweet?.media?.map(m => {
        let rep = `<img alt="" src="${m.url}"/>`
        if (m.type === 'video') {
            rep = `<video muted src="${m.videoUrl}" poster="${m.url}"></video>`
        }
        content = replaceResource(content, m.shortUrl, rep)
    })
    return content
}

function replaceResource(content, text, rep) {
    const newContent = content.replace(text, rep)
    if (newContent === content) {
        content += rep
    } else {
        content = newContent
    }
    return content
}

function nonFirst(index) {
    return index !== 0
}

function generateOnceProp(item) {
    return {
        name: item.user.name,
        screenName: item.user.screenName,
        tweetId: item.tweet.tweetId,
        description: item.tweet.legacy.text,
        pubDate: new Date(item.tweet.createDate).toUTCString(),
    }
}

function rssTemplate(title, link, subLink, items) {
    const now = new Date().toUTCString();
    return `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
                    <channel>
                        <title>${title}</title>
                        <link>${link}</link>
                        <description>解析X生成RSS订阅</description>
                        <pubDate>${now}</pubDate>
                        <lastBuildDate>${now}</lastBuildDate>
                        <atom:link href="${subLink}" rel="self" type="application/rss+xml"/>
                        ${items.join("\n")}
                    </channel>
            </rss>`
}