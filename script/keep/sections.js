let obj = JSON.parse($response.body);
let sections = obj.data.sections;
for (i = 0; i < sections.length; i++) {
  let e = sections[i];
  if (!(e.type == "recent" || e.type == "courseAlbum")) {
    sections.splice(i--, 1);
  }
}

$done({ body: JSON.stringify(obj) });