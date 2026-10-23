---
sidebar_position: -2
---
# 创建你的第一个世界 {#creating-your-first-world}

本指南说明如何创建并上传一个非常简单的VRChat世界。你将学习设置Unity场景、使用VRChat控制面板以及发布世界的基础知识。

## 要求 {#requirements}

开始之前，请确保你满足以下要求：

- 你应当已设置好一个[装有VRChat SDK的Unity项目](/sdk)。
- 你必须拥有[VRChat.com](https://vrchat.com/)账户。
  - 如果你使用Steam或Meta账户游玩，需要先[关联你的账户](https://help.vrchat.com/hc/en-us/articles/360062659053-I-want-to-turn-my-platform-account-through-Steam-Meta-Pico-or-Viveport-into-a-VRChat-account)。
- 要上传世界，你的VRChat账户的[信任等级](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system#trust-rank)必须为“New User”或更高。
  - 如果你是VRChat新手，当你获准上传世界时会收到一封电子邮件。
  - 在达到该信任等级之前，你仍可以在本地构建与测试世界。这意味着你可以开发和测试你的世界，但只有你能访问它。

:::info

需要帮助？请访问我们的Discord：[discord.gg/vrchat](https://discord.gg/vrchat)，或我们的官方论坛：[ask.vrchat.com](https://ask.vrchat.com)。

:::

## 第1步 - 设置场景 {#step-1---setting-up-a-scene}

你首先需要一个Unity场景。你可以创建新场景，或打开包含现有内容的Unity场景。如果你是从Creator Companion创建的新项目，请跳到[第2步](/worlds/creating-your-first-world/#step-2---creating-spawn-points)。

打开场景后，你需要向场景添加一个**VRC Scene Descriptor**。你可以通过VRChat SDK轻松添加：

![通过VRChat SDK构建面板自动添加场景描述符。](/img/worlds/build-panel-add-vrc-scene-descriptor.png)

1. 点击**VRChat SDK** > **Show Control Panel**。
	- 如果你在Unity窗口顶部看不到此菜单，则SDK可能未正确安装。请尝试点击**Assets** > **Reimport All**，并查看我们的[SDK故障排除指南](/sdk/sdk-troubleshooting)。
2. 在**Authentication**中，登录你的VRChat账户。
3. 切换到**Builder**选项卡，点击**Add a VRCSceneDescriptor**。

![通过VRChat SDK构建面板自动添加场景描述符。](/img/worlds/vrcworld-prefab-in-scene.png)

一个名为**VRCWorld**的Game Object会自动添加到你的场景中。它包含一个**VRC Scene Descriptor**和其他有用的组件。在层级视图中点击VRCWorld以查看其设置。

## 第2步 - 创建出生点 {#step-2---creating-spawn-points}

你的世界至少需要一个出生点。当玩家加入你的世界时，他们会出现在那里。默认情况下，玩家会在你的VRCWorld预制件的位置出生。只需将VRCWorld预制件移动到你想让用户出生的位置即可。

![移动你的场景描述符以更改出生点。](/img/worlds/vrc-scene-descriptor-gizmo.png)

如果你想创建更多出生点，请创建一个空Game Object并将其放置在你希望用户出现的位置。将该Game Object添加到[VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor)组件的**Spawns**列表中。你可以按需要添加任意数量的出生点。

如果你有多个出生点，可以通过更改**Spawn Order**属性来选择人们在各出生点出生的顺序。

当多名玩家快速连续地出生到你的世界时（例如，大家都在通过传送门后被送到这里），如果他们使用同一个出生点，可能会彼此重叠。为避免这种情况，你可以将Spawn Radius设置为大于零的值，让玩家改为在每个出生点周围圆盘内的随机位置出生。

## 第3步 - 描述符设置 {#step-3---descriptor-settings}

[VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor)中有多种设置会改变世界的行为。以下是一些较重要的设置。

_Spawns_ - 一组Transform，玩家加入你的世界时会在此出生。默认情况下，玩家在你的Scene Descriptor处出生。

_Respawn Height_ - 垂直高度（y轴），玩家在此处重生，拾取物也在此处重生（或被销毁，取决于“Object Behaviour At Respawn”设置）。

_Reference Camera_ - 你应用于此摄像机的设置会在玩家加入房间时应用于玩家。它最常用于调整裁剪平面和添加后处理效果。

更多设置可在[VRC_SceneDescriptor](/worlds/components/vrc_scenedescriptor)页面中找到。


## 第4步 - 在SDK构建面板中配置你的世界 {#step-4---configure-your-world-in-the-sdk-build-panel}

点击`VRChat SDK > Show Control Panel`。在上传世界之前，你需要向VRChat提供一些基本信息，例如世界名称、容量或内容警告。

![VRChat的SDK世界构建面板。](/img/worlds/build-panel-worlds-2025.png)

- Name - 你的世界名称，将展示给所有人。
- Description - 这将显示在VRChat的“World Details”页面和网站上。
- Maximum Capacity - 你的世界允许的最大玩家数量。
  - 如果实例已达到其玩家容量，新玩家将无法加入。
  - 实例创建者、世界创建者或群组所有者始终可以加入，即使会超出玩家容量。（除非他们没有进入/查看该实例的权限）
- Recommended Capacity - 你世界推荐的最高玩家数量。
  - 如果公开实例已达到其推荐容量，VRChat会劝阻更多玩家加入。该实例将不再出现在VRChat的公开实例列表中。
  - 在某些情况下，如果玩家在vrchat.com上有直接的邀请URL，仍然可以尝试加入该实例。
- Content Warnings - 与VRChat的[内容门控系统](https://hello.vrchat.com/blog/content-gating)配合使用的警告。
- Tags - 帮助用户在VRChat中找到你世界的关键词。
- World Debugging - 允许其他用户调试你的Udon代码。
- Thumbnail - 你的世界的预览图像。

:::note 如果我的世界没有推荐容量怎么办？

如果你使用旧版VRChat SDK上传世界且未设置“recommended capacity”，玩家容量的工作方式会有所不同：

 - “Recommended capacity”将与你的玩家容量值相同
 - “Player capacity”将是你的玩家容量值**两倍**
 
 例如：如果你将“Player capacity”设置为10且未设置“Recommended capacity”，你_实际_的“Player capacity”将是20。正因如此，“Player capacity”有时被称为“soft cap”。

:::

## 第5步 - 检查警告或验证消息 {#step-5---check-for-warnings-or-validation-messages}

在VRChat SDK构建面板的第二部分，你会看到一个提醒和验证消息列表。这些是关于如何设置场景和构建世界的建议。例如：

- 你的场景是否缺少VRC Scene Descriptor？
- 你的场景是否缺少VRChat的图层和碰撞图层矩阵？
- Audio Sources、纹理或Udon脚本是否存在任何问题？

SDK通常会提供自动修复这些问题的选项。如果没有，请仔细阅读验证消息以了解如何改进你的世界。有些消息是可选的，并非上传世界所必需。

## 第6步 - 构建并发布你的世界 {#step-6---building-and-publishing-your-world}

:::info

你的[信任等级](https://docs.vrchat.com/docs/vrchat-safety-and-trust-system#trust-rank)必须为“New User”或更高才能将内容上传到VRChat。如果你的等级是“Visitor”，你仍可以在本地构建与测试世界。

:::

接下来，你需要构建世界！在“Build Type”下拉菜单下，有几个不同选项可供你选择接下来要做什么：
- 如果你想直接将世界上传到VRChat以便其他用户访问，请选择“Build & Publish Your World Online”。
- 如果你希望在不上传的情况下测试世界，请选择任意合适的测试选项：
  - “Build & Test Your World” - 构建你的世界，然后在VRChat中启动它。
  - “Build & Reload Your World” - 构建你的世界，然后自动将你发送到当前VRChat会话中的本地构建世界。如果VRChat未运行，则只会构建世界。
  - “Test Your Last Build” - 在VRChat中启动你最近一次构建的世界。
  - “Reload Your Last Build” - 自动将你发送到当前VRChat会话中你最近一次构建的世界。如果VRChat未运行，则不会执行任何操作。

你还应选择要为其构建世界的平台。

使用任何本地构建选项时，你会看到这些额外设置：
- Clients - 本地测试期间SDK应启动多少个VRChat客户端。将其设置为大于1的值会启动多个可独立控制的VRChat会话，这对于测试网络相关功能很有用。设置为0将阻止任何客户端启动。
- Force Non-VR - 如果启用，即使检测到VR头显，SDK也会以桌面模式启动VRChat。
- Enable World Reload - 如果启用，SDK会以启用世界监视的方式启动VRChat。这意味着客户端会自动将你发送到其运行期间构建的本地世界。

![SDK世界构建部分。](/img/worlds/build-panel-section.png)

请记住，你不得向VRChat上传违反我们的[社区准则](https://vrchat.com/community-guidelines)或[服务条款](https://vrchat.com/legal)的内容。这样做将导致审核处理。

上传世界后，它便可在VRChat中访问！你应该能在游戏中看到它，或通过SDK中的内容管理器`VRChat SDK > Show Control Panel > Content Manager`看到它。

:::caution 世界上传失败

如果你的世界上传失败，请[检查Unity控制台](https://docs.unity3d.com/Manual/Console.html)以查看是否有任何错误。如果有，请在再次尝试构建世界前解决它们。请务必阅读Unity日志的全部内容，并点击错误以查看附加信息。

如果需要帮助，请查看我们的其他文档、[Ask论坛](https://ask.vrchat.com/)，或在[Discord](https://discord.com/invite/vrchat)上提问。请务必提供尽可能多的信息，例如Unity控制台错误。

:::
