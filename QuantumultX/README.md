# YouTube Enhance for Quantumult X

这是不依赖资源解析器的 Quantumult X 原生适配。

## 一键订阅

在 Quantumult X 的“重写资源”中添加：

```text
https://raw.githubusercontent.com/vcdog/QuantumultX_sgmodule/master/QuantumultX/YouTube.Enhance.snippet
```

也可以在主配置中加入：

```ini
[rewrite_remote]
https://raw.githubusercontent.com/vcdog/QuantumultX_sgmodule/master/QuantumultX/YouTube.Enhance.snippet, tag=YouTube Enhance, update-interval=86400, enabled=true
```

启用该重写资源和 MitM，生成、安装并信任 Quantumult X 证书，然后完全退出并重开 YouTube。片段已使用本仓库的 GitHub Raw 脚本地址，不需要把脚本手动复制到设备。

## 可选：本地安装

1. 将以下文件复制到 iCloud Drive（或“我的 iPhone”）的 `Quantumult X/Scripts` 目录：
   - `Script/Youtube/youtube.request.js`
   - `Script/Youtube/youtube.response.js`
   - `Script/Youtube/youtube.settings.js`（仅修改选项时需要）
2. 把 `YouTube.Enhance.snippet` 中的三条规则加入主配置 `[rewrite_local]`。
3. 把片段中的 `hostname` 域名合并到主配置 `[mitm]` 的 `hostname`。
4. 在 Quantumult X 中开启“重写”和 MitM，并生成、安装及信任证书，然后完全退出并重开 YouTube。

## 选项

默认配置为：

```json
{
  "captionLang": "off",
  "blockUpload": true,
  "blockImmersive": true,
  "blockShorts": false
}
```

Quantumult X 没有 Surge 的模块参数占位符。需要修改时，编辑 `youtube.settings.js` 顶部的 `SETTINGS`，在 Quantumult X 中手动运行一次。设置会保存到 `$prefs` 的 `YouTubeEnhanceSettings` 键，两个 YouTube 脚本会自动读取。字幕语言使用 Google Translate 语言代码，例如简体中文为 `zh-Hans`；`off` 表示关闭翻译。

## 适配说明

- Surge 的 `[Script]`、`type=http-*`、`binary-body-mode` 和 `%APPEND%` 已改为 Quantumult X 的 `script-request-*`、`script-response-body` 与原生 `hostname` 语法。
- 二进制请求和响应通过 `$request/$response.bodyBytes` 读取，并用 Quantumult X 需要的 `ArrayBuffer` 返回。
- `log_event` 只改请求头，因此使用 `script-request-header`；`initplayback` 需要读取二进制请求体，因此使用 `script-request-body`。
- 现有的广告缓存和密钥配置继续使用 `$prefs` 保存。
