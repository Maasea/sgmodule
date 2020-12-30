let body = JSON.parse($response.body);
let tab = body.data.tab;
let top = body.data.top;
let bottom = body.data.bottom;

//去除顶部直播
tab.forEach((element, index) => {
  if (element.id == 39) tab.splice(index, 1);
});

//去除顶部游戏通知
top.forEach((element, index) => {
  if (element.pos != 2) top.splice(index, 1);
});

//去除底部会员购
bottom.forEach((element, index) => {
  if (element.pos == 4) bottom.splice(index, 1);
});

$done({ body: JSON.stringify(body) });
