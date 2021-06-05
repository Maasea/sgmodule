let obj = JSON.parse($response.body);
obj.data.bottomBarControl.defaultTab = "personal";
let bottomBarTabs = obj.data.bottomBarControl.tabs;
bottomBarTabs.forEach((e, i) => {
  if (e.tabType == "entry" || e.tabType == "mall") bottomBarTabs.splice(i--, 1);
});
$done({ body: JSON.stringify(obj) });
