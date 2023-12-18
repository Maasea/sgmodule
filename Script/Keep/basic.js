const blackList = ["home", "entry", "mall"];
let obj = JSON.parse($response.body);

obj.data.generalConfigs["AD.link.download.source"] = false;
// 设置默认开启页面
obj.data.bottomBarControl.defaultTab = "new_sports";

obj.data.bottomBarControl.tabs = obj.data.bottomBarControl.tabs.filter(
  (tab) => !blackList.includes(tab.tabType)
);

$done({ body: JSON.stringify(obj) });
