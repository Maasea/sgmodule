let body = JSON.parse($response.body);
let section = body.data.sections_v2;

section.forEach((element, index) => {
  if (element.title == "创作中心" || element.title == "推荐服务") {
    delete section[index];
  }
});

$done({ body: JSON.stringify(body) });
