import { $ } from "./env.js";

const baseURL = "https://rouman5.com/books/";
export const comicIdRegex = /\/books\/([^\/]+)/;

export async function fetchCatalogue (comicId, subscribes) {
  const url = baseURL + comicId;
  const resp = await $.fetch({
    url: url,
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    },
  });
  const jsonData = parseHtml(resp.body);
  const bookInfo = jsonData.props.pageProps.book;

  const name = bookInfo.name;
  const updateTime = bookInfo.updatedAt;

  if (updateDate(comicId, name, updateTime, subscribes)) {
    $.msg("Comic Subscribe", `${name} 已更新`, updateTime.split("T")[0], url);
    saveSubscribes(subscribes);
  }

  return true;
}

function parseHtml (responseText) {
  const scriptRegex =
    /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
  let match = responseText.match(scriptRegex);
  if (match) {
    return JSON.parse(match[1]);
  }
  return null;
}

export function getSubscribes () {
  return $.getJSON("ComicSubscribe", []);
}

function updateDate (comicId, name, dateStr, subscribes) {
  const subscribe = subscribes.find(sub => sub.comicId === comicId);
  if (subscribe) {
    const updateDate = new Date(dateStr);
    const preData = subscribe.updateDate ? new Date(subscribe.updateDate) : 0;
    const isNew = (updateDate - preData) > 0;
    if (isNew) {
      subscribe.updateDate = dateStr;
    }
    return isNew;
  } else {
    subscribes.push({
      comicId,
      name,
      updateDate: dateStr,
    });
    return true;
  }
}

export function saveSubscribes (subscribes) {
  $.setJSON(subscribes, "ComicSubscribe");
}

export function addSubButton (responseText, comicId, isSub) {
  const nameRegex = /<div class="col"><h5>(.*?)<\/h5><div>/;
  const originalText = "</body></html>";
  const path = isSub ? "unsubscribe" : "subscribe";
  const buttonStyle = isSub ? "btn-warning" : "btn-primary";
  const text = isSub ? "取消订阅" : "添加订阅";
  const comicName = responseText.match(nameRegex)[1];

  const insertText = `<script type="text/javascript">
    window.onload = function() {
        const targetDivs = Array.from(document.querySelectorAll("div"));
        const targetDiv = targetDivs.find(div => div.className.startsWith("bookid_operations__"));
  
        if (targetDiv) {
            const a = document.createElement("a");
            a.setAttribute("role", "button");
            a.setAttribute("href", \`/${path}/${comicId}?comicName=${comicName}\`);
            a.setAttribute("class", \`btn ${buttonStyle}\`);
            a.setAttribute("style", "margin-right: 1rem");
            a.textContent = "${text}";
            
            targetDiv.appendChild(a);
            
            a.addEventListener("click",async (event)=>{
                event.preventDefault();
                const response = await fetch(event.target.href);
                if (response.status===200){
                    const jsonBody = await response.json();
                    const isSub = jsonBody.subscribe;
                    const newPath = isSub ? "unsubscribe" : "subscribe";
                    const newButtonStyle = isSub ? "btn-warning" : "btn-primary";
                    const newText = isSub ? "取消订阅" : "添加订阅";
                    
                    a.setAttribute("href","/"+newPath+\`/${comicId}?comicName=${comicName}\`);
                    a.setAttribute("class","btn " +newButtonStyle);
                    a.textContent = newText;
                }
            });
        }
};
</script>`;

  return responseText.replace(originalText, insertText + originalText);
}
