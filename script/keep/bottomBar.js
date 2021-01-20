let obj = JSON.parse($response.body);
let bottomBarTabs = obj.data.bottomBarControl.tabs;
bottomBarTabs.forEach((e, i) => {
  if (e.tabType == "entry" || e.tabType == "mall") bottomBarTabs.splice(i--, 1);
});
//obj.data.discoveryTabs = [];
$done({ body: JSON.stringify(obj) });