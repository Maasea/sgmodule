let obj = JSON.parse($response.body);

obj.data.generalConfigs["AD.link.download.source"] = false;
obj.data.bottomBarControl.defaultTab = "personal";

let bottomBarTabs = obj.data.bottomBarControl.tabs;
for (let i = bottomBarTabs.length - 1; i >= 0; i--) {
  let e = bottomBarTabs[i];
  if (e.tabType == "entry" || e.tabType == "mall") {
    bottomBarTabs.splice(i--, 1);
  }
}

$done({ body: JSON.stringify(obj) });
