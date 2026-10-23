---
sidebar_position: 0
---

# 跨平台设置 {#cross-platform-setup}

本页说明如何为 Android 或 iOS 开发设置你的项目。在 Unity 中切换平台非常简单

为 Android 和 iOS 创建内容非常相似——一旦你学会如何构建 Android 内容，构建 iOS 内容也很容易。

## 设置 {#setup}

要安装 Unity 的 Android 和 iOS 模块，请遵循以下指南。

- [为创建 iOS 内容设置 Unity](/platforms/iOS/setting-up-unity-for-creating-ios-content)
- [为创建 Android 内容设置 Unity](/platforms/android/setting-up-unity-for-creating-quest-content)

两个指南相似，你可以同时安装这两个模块。

## 切换平台 {#switch-platforms}

安装模块后，将项目的构建目标切换为 Android 或 iOS。

1. 打开 SDK Control Panel 并切换到 Builder 选项卡
2. 在 "Build" 部分选择平台下拉菜单。取消勾选 "Windows"，勾选 "Android"
3. 在出现的弹窗中点击 "Switch" 以确认更改。

切换到某个平台会导致 Unity 重新导入所有资源并执行一次性设置。这需要一段时间——但如果你将来再次切换，会快得多。

## 验证你的项目 {#validate-your-project}

切换到某个平台后，请确保你的项目在该平台上可正常工作。

- 检查 VRChat SDK control panel 中出现的验证消息，确保你的内容与 Android 兼容。
- 检查 Unity 控制台中是否有任何新的错误或警告消息。
- 检查场景是否存在视觉问题。如果这是一个世界，请在播放模式下试一试。

## 微调与优化 {#fine-tuning-and-optimization}

现在你的项目已准备就绪，你需要开始优化了。**你不能跳过这一步。** 现代 Android 设备相当强大，但远不及典型的 VR 就绪 PC。你需要查看我们的 [Quest 内容优化](/platforms/android/quest-content-optimization)页面，了解需要做哪些工作。对于世界而言，这意味着烘焙光照、降低几何体复杂度、避免透明以及降低纹理分辨率。对于 Avatar，这意味着移除多余的组件、多余的骨骼、降低几何体复杂度、避免透明并减小纹理尺寸。

这需要一段时间，而且预计会有挑战性。为移动端硬件优化是很困难的！幸运的是，有大量资源可供参考，即使只是在 YouTube 上粗略搜索 "optimizing Unity for mobile" 也能找到大量优质内容。

你也可以查看我们关于为 Oculus Quest 优化内容的一些文档。

- [Quest 内容优化](/platforms/android/quest-content-optimization)
- [Quest 内容限制](/platforms/android/quest-content-limitations)
- [Avatar 性能等级系统](/avatars/avatar-performance-ranking-system)

我们还强烈建议使用 EasyQuestSwitch（在 VRChat Creator Companion 中作为包提供）之类的工具来按平台调整内容。

:::info

如果你有适用于不同平台的多个版本的 Avatar。例如一个专门的 PC 版本和一个 Quest 版本——你可以使用 SDK 中的[按平台覆盖](/avatars/per-platform-avatar-overrides)功能来使用它们。

:::

## 上传内容 {#uploading-content}

一旦你的世界或 Avatar 准备就绪，你就可以上传了！此上传流程与 VRChat PC 上传流程相同，只不过 SDK 在性能问题上给出的警告会激进得多。

如果你想一次性为所有平台上传内容——你可以在 SDK Control Panel 中 Build 部分的 "Platforms" 下拉菜单中选择多个目标。

**你需要将世界或 Avatar 上传到与该内容的 VRChat PC 版本相同的 blueprint ID。** Blueprint ID 由 Game Object 上的 [Pipeline Manager 组件](/sdk/vrcpipelinemanager)定义，该组件通常与 VRC Scene Descriptor 一起出现，一般位于你的 VRCWorld 预制件上。按下 "Detach" 按钮以编辑 blueprint ID，并粘贴你首次上传的版本中的 ID（你也可以在 VRChat SDK control panel 的 "Content Manager" 选项卡中找到它）。

你上传的版本取决于源项目的构建目标。如果你的项目设置为 Android，它将为 Quest 上传。如果构建目标是 Windows，那么你上传的就是 PC 版本。基本上就是这样——一旦你上传，任何查看你内容的客户端都会像这样与我们的服务器通信：

>"嘿，我是 Meta Quest，我想要这个内容。"
>"好的，这是一个 VRChat Android 版本。"

>"嘿，我是 VRChat PC 用户，我想要这个内容。"
>"好的，这是 VRChat PC 版本。"

>"嘿，我是 VRChat iOS 用户，我想要这个内容。"
>"好的，这是 VRChat iOS 版本。"

:::info

VRChat 正在为 iOS 试验内容回退系统。如果你的世界在 Android 上可用但在 iOS 上不可用，VRChat 会尝试在 iOS 上加载 Android 版本。

对于主要使用 [Quest 内容限制](/platforms/android/quest-content-limitations)中所列出的 Standard Lite 着色器的内容，这通常效果不错。为获得最佳效果，建议使用 SDK 上传内容的 iOS 版本。

:::

如果某个 Avatar 在你所在平台上不可用，你反而会看到一个[替代 Avatar（impostor）](https://creators.vrchat.com/avatars/avatar-impostors/)。

如果某个世界在你所在平台上不可用，你将无法进入通往该世界的传送门，也无法通过 UI 加入其中。

**但是**，如果你加入一个同时具有 Android 和 PC 版本的世界，并且实例中的玩家都有各自 Avatar 的 Android 和 PC 版本，你将按自己平台的情况正确查看该世界，并能与所有人一起游玩，毫无问题！

:::danger Armatures 必须完全一致！

要让 Avatar 跨平台正常工作，PC 版本与 Quest 版本之间的骨架（armature）路径对于头部、手部、脚部等关键骨骼必须完全一致。此外，"root bone"（层级结构中的第一个骨骼）的缩放和旋转在不同版本之间必须完全一致。

:::

Android 与 PC Avatar 之间的骨骼绑定（armatures）必须基本一致。如果你希望为 Android 版本移除裙摆/头发等非关键骨骼，那是可以的——但不要改变骨架布局的基础结构。否则在跨平台查看时会出现异常行为。

最重要的是，"root bone"（即 Hips）应当是 Armature GameObject 之后的第一个骨骼。具体来说，只要 "root bones" 的设置（缩放、旋转）一致，你就不会遇到问题。

## 提示 {#tips}

- 你的 VRChat PC Avatar 可以拥有 VRChat Android Avatar 无法拥有的各种花哨功能。根据平台不同，用户会看到适合其客户端的版本。
- 你也可以在这方面发挥创意——你可以为 PC 用户准备高多边形数的世界或 Avatar，然后为 Quest 用户准备一个低配（但仍然时尚）的版本。
- 为世界的 PC 和 Quest 版本定义一组盒形碰撞体或一个低多边形网格碰撞体，并用它替代网格碰撞体。将这些碰撞体作为子物体挂到特定坐标处的空 GameObject 上，这样如果你更新了一个项目，就可以轻松地把该对象复制/粘贴到另一个项目。这样你就永远不会看到不同平台上的用户"漂浮"，也不会遇到昂贵复杂的高顶点数网格碰撞体的问题。
- 记住，不惜一切代价避免透明！它的开销相当大。
  - 顺便说一句，是的，"alpha cutout" 也算作透明。
