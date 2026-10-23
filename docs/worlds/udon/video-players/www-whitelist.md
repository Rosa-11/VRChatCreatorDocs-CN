---
slug: "www-whitelist"
sidebar_position: 2
---

# 视频播放器允许列表 {#video-player-allowlist}

只有当视频的域名在下面的允许列表中，或者观看者已在其设置中启用「Allow Untrusted URLs」时，你世界中的视频才会播放。短链接可能无效——解析后的 URL 必须与允许列表中的某个域名匹配。

Android 上的 VRChat 在托管方未使用 HTTPS 时不会播放视频。

:::caution

SDK 中的示例视频播放器不会处理实例 Master 已禁用「Allow Untrusted URLs」的情况，这会导致视频无法播放。请考虑修改 Udon 代码，把同步所有权交给请求视频的用户。
:::

## 允许列表中的服务 {#allowlisted-services}

下面列出的服务默认受信任。视频 URL 必须解析到本表格中列出的域名。

:::note

下列条目不构成合作关系或背书，并且可能随时更改，恕不另行通知。
:::

| 服务 | 域名 |
| --- | --- |
| Akamai CDN | `vod-progressive.akamaized.net` |
| Facebook Video | `*.facebook.com`,`*.fbcdn.net` |
| Google Video | `*.googlevideo.com` |
| Hyperbeam | `*.hyperbeam.com`,`*.hyperbeam.dev` |
| Mixcloud | `*.mixcloud.com` |
| NicoNico | `*.nicovideo.jp` |
| Soundcloud | `soundcloud.com`,`*.sndcdn.com` |
| Topaz Chat | `*.topaz.chat` |
| Twitch.TV | `*.twitch.tv`,`*.ttvnw.net`,`*.twitchcdn.net` |
| VRCDN | `*.vrcdn.live`,`*.vrcdn.video`,`*.vrcdn.cloud` |
| Vimeo | `*.vimeo.com` |
| Youku | `*.youku.com` |
| YouTube | `*.youtube.com`,`youtu.be` |

## 公开实例中的视频限制 {#video-restrictions-in-public-instances}

在你的世界的公开实例和组公开实例中，来自不受信任 URL 的视频无法播放，除非你将其域名添加到世界的允许列表中。这适用于所有视频 URL，包括在 Udon 中硬编码的 URL 以及用户在运行时输入的 URL。

来自[允许列表中的服务](#allowlisted-services)的视频始终可以由所有用户在所有实例类型中播放。用户可以在其设置中启用「Allow Untrusted URLs」，以允许来自其他域名的视频。不过，在公开实例和组公开实例中，视频播放器会施加以下限制：

- **公开实例和组公开实例**：来自不受信任域名的视频只有在你将它们添加到世界的「Video Player Allowed Domains」后才能播放（并且用户启用了「Allow Untrusted URLs」）。
- **其他实例类型**：可以播放来自所有不受信任域名的视频（前提是用户启用了「Allow Untrusted URLs」）。

### 添加允许的域名 {#adding-allowed-domains}

如果你的世界要播放来自[允许列表中的服务](#allowlisted-services)列表之外的域名的视频，请将其添加到世界的允许域名中：

1. 登录 [VRChat.com](https://vrchat.com/home/)。
2. 前往 [My Worlds](https://vrchat.com/home/content/worlds)。
3. 选择你的世界，进入 **Edit World Info**。
4. 在 **Video Player Allowed Domains** 字段中添加域名。请使用完整域名（例如 `example.com`）。
