// Quantumult X: edit these values, then run this script once.
const SETTINGS = {
  captionLang: "off",
  blockUpload: true,
  blockImmersive: true,
  blockShorts: false,
};

const SETTINGS_KEY = "YouTubeEnhanceSettings";
const booleanKeys = ["blockUpload", "blockImmersive", "blockShorts"];
const isValid =
  typeof SETTINGS.captionLang === "string" &&
  booleanKeys.every((key) => typeof SETTINGS[key] === "boolean");

if (!isValid) {
  $notify(
    "YouTube Enhance",
    "设置未保存",
    "captionLang 必须是字符串，其余选项必须是 true 或 false。",
  );
  $done();
} else {
  const saved = $prefs.setValueForKey(JSON.stringify(SETTINGS), SETTINGS_KEY);
  $notify(
    "YouTube Enhance",
    saved ? "设置已保存" : "设置保存失败",
    JSON.stringify(SETTINGS),
  );
  $done();
}
