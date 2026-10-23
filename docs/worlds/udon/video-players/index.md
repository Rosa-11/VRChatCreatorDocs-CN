# 视频播放器 {#video-players}

你可以使用 SDK 的 `VRCAVProVideoPlayer` 或 `VRCUnityVideoPlayer` 为你的 VRChat 世界添加视频播放器。

:::note top 社区预制件

你在寻找社区制作的视频播放器预制件吗？可以试试 [VideoTXL](https://github.com/vrctxl/VideoTXL)、[ProTV](https://gitlab.com/techanon/protv) 或 [USharpVideo](https://github.com/MerlinVR/USharpVideo)。

:::

## 使用预制件 {#using-the-prefabs}

在你的 Udon 世界中放置视频播放器最简单的方式，是使用其中一个预制件，你可以在 `Packages/VRChat SDK - Worlds/Samples/UdonExampleScene/Prefabs/VideoPlayers` 中找到它们。

![两个视频播放器预制件，可以直接拖入你的世界。](/img/worlds/video-players-aae04e6-video-player-prefabs.png)

这两个预制件都会播放你选择的视频，并为你世界中的每个人同步。它们不会循环播放——目前图表会关闭循环以让同步正常工作。如果你希望它们循环播放，请开启「Loop」并移除 UdonBehaviour。

:::note 这些是同步播放器的示例

你不必使用「UdonSyncPlayer」Udon 行为。如果你的世界不需要视频同步，你可以只使用 VRC Video Player 组件。你也可以以提供的图表为起点制作自己的同步图表，或者从头开始制作一个。

:::
## 选择 AVPro 还是 Unity Video Player {#choosing-avpro-or-unity-video-player}

为什么你会选择其中一个而不是另一个呢？
**AVPro** 在多个平台上支持直播流，例如 YouTube Live、Twitch 以及其他一些平台！你需要制作一个调用 Video Player 上 PlayURL 的图表才能让它工作。**Unity Video** 播放器不支持这些直播流。

此外，**AVPro** 无法在编辑器中播放——你需要对世界执行构建与测试才能看到它工作。**Unity Video** 在编辑器中使用直接指向受支持视频文件类型（如 'mp4' 和 'webm'）的链接时，可以在 Play Mode 下工作。YouTube 和 Vimeo 这类托管服务只会在客户端中工作。

需要注意的是，AVPro 扬声器组件暗示支持 8 声道音频。这并不正确——只能播放 6 声道（通常是 5.1 音频）。[AVPro 仅在 PCVR 上支持 EAC3 7.1 音频]

## Android / Quest 兼容性 {#android--quest-compatibility}

VRChat 用来将链接解析为视频的应用程序现在也可用于 Android，因此之前那些变通方法不再需要了。
过去，由于 Quest 没有 URL 解析器，曾为高级用户提供过一些变通方法。

## 速率限制 {#rate-limiting}

每个用户每五秒只允许处理一个新的视频播放器 URL。这是所有视频播放器共享的全局限制。该限制既适用于默认 URL，也适用于通过 LoadURL 和 PlayURL 设置的 URL。

只有一个视频播放器时，这不成问题——但如果你有多个视频播放器，就需要确保某个请求不会在上一个请求之后过快地发出。

这也适用于后加入的玩家。如果你的世界中运行着 2 个视频播放器，后加入的玩家会发现自己必须发出两个视频请求。如果没有妥善处理，它们会同时尝试并失败。当一个世界中同时有多个视频播放器在播放时，你必须考虑到这一点。

## 支持的视频托管方 {#supported-video-hosts}
要播放视频，你需要在编辑器中设置视频播放器时，在 Video URL 字段中提供一个 URL，或者把 URL 粘贴到预制件中提供的 VRCUrlInputField 中。

我们支持的托管方完整列表见[视频播放器允许列表](/worlds/udon/video-players/www-whitelist)。以下是一些推荐。
:::note 免责声明

*下列条目不构成合作关系或背书*。这些是广泛可用的服务，并且已测试能与 VRChat 视频播放器正常工作。
:::
### 你自己的托管方 {#your-own-host}

- **费用**：付费——具体取决于你的服务提供商
- **链接**：直接链接到 .mp4 或 .webm 文件
- **限制**：如果你使用我们允许列表之外的自有托管方，用户必须在其设置中启用「Allow Untrusted URLs」选项才能看到你的内容。

你可以考虑使用「内容分发网络」（CDN）来托管你的内容。如果你打算让你的视频可供许多用户访问，或者希望世界各地的许多用户都能快速访问，这会很有用。CDN 会把你的文件分发到世界各地的许多服务器上，确保在离观看者较近的位置有源，以保证快速下载。

我们测试过 *Amazon Cloudfront* 和 *BunnyCDN*。CDN 服务通常是付费服务，但在数据的大容量存储/传输方面往往成本较低。不过，由于其开放性，它们不在我们的允许列表中，需要用户启用「Allow Untrusted URLs」设置。

### YouTube
- **费用**：免费
- **链接**：使用['watch' url](https://www.youtube.com/watch?v=8yaQY0arCnc)
- **限制**：无
### Vimeo Basic
- **费用**：免费
- **链接**：使用[基础视频 url](https://vimeo.com/383935156)
- **限制**：无

### Vimeo Pro 或 Business {#vimeo-pro-or-business}
- **费用**：[付费](https://vimeo.com/upgrade)
- **链接**：使用直接视频链接
- **限制**：无

### 优化你的视频 {#optimizing-your-videos}
在编码视频时，我们强烈建议上传经过 Web 优化的版本。对于 `.MP4` 文件，该选项也被称为「fast start」。它只是一个勾选设置，却能极大地影响自托管视频文件的可流式播放性。如果不启用 fast start，通常必须下载完整个视频文件才能播放。启用 fast start 后，你可以分块流式播放视频文件，流会立即开始。

- 在 FFMPEG 中，使用参数 `-movflags +faststart`。
- 在 HandBrake 中，勾选「Web Optimized」复选框。
- 其他软件应该也有类似的选项来启用 fast start。

![启用 Fast Start](/img/worlds/video-players-dc8e54f-image.png)
