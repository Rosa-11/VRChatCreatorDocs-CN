---
title: "世界创建、优化和Community Labs提示"
slug: "submitting-a-world-to-be-made-public"
sidebar_position: -1
hidden: false
createdAt: "2018-12-29T00:05:06.003Z"
updatedAt: "2023-04-21T14:54:14.165Z"
---
想把你的世界公开？你来对地方了！你需要将世界提交到**Community Labs**。

在将世界提交到Community Labs之前，有一些事项需要考虑。**请务必阅读所有这些内容！** 不这样做可能会导致你的世界被下架，或永远无法离开Community Labs。

你可以在VRChat.com上将世界提交到Community Labs（Edit World Info -> Danger Zone -> World Visibility -> Publish），或在Unity中上传新版本时提交。

发布世界将使其立即对选择加入Community Labs的所有用户可用。最终，你的世界将公开，并对Community Labs之外的所有用户开放！[在此处了解更多关于Labs的信息。](https://docs.vrchat.com/docs/vrchat-community-labs)

## 重要信息 {#important-info}

- **每个用户每七天只能向Community Labs提交一个世界。** 
- **你可以随意更新世界。** 只需推送更新！这不会改变世界的状态。
- **如果你的世界已经是Public，更新时无需重新提交。** 它应会自动更新，并且你不会失去Public状态。
- 如果你的世界或世界中的任何内容（视频、虚拟形象（Avatar）、图像）违反VRChat服务条款或社区指南，你向Community Labs提交世界的能力将被暂停一段时间。多次暂停可能会导致应用内审核操作。
- **内容警告已弃用，目前不使用。** 你不得向VRChat上传违反我们[社区指南](https://vrchat.com/community-guidelines)或[服务条款](https://vrchat.com/legal)的内容。这样做（即使你勾选了内容警告）将导致审核操作。
- 我们不通过Discord私信、发送给VRChat的电子邮件或任何其他渠道批准世界。
- 如果你的世界_文件大小非常大_，我们可能会要求你减小世界大小，并在此期间将其从Public移除。**尽量将世界保持在200MB以下。**

## Avatar世界/任何世界中的所有Avatar Pedestals {#avatar-worlds--all-avatar-pedestals-in-any-world}

- **基座上的Avatar应“合理优化”。** 查看我们的[Avatar优化文档](/avatars/avatar-optimizing-tips)了解更多详情。  
  避免分享性能非常差的Avatar。这适用于所有世界，而不仅仅是Avatar世界。如果你世界中的Avatar存在严重性能问题，你的世界可能会从Public或Community Labs中移除。
- **如果你上传带有占位Avatar的世界，并在公开后将其替换为违反TOS的Avatar，你将被暂停提交世界一个月。根据违规严重程度，你可能会受到应用内审核。**
- **如果你拥有Avatar世界，你的任何Avatar都不得违反TOS/社区指南。**
- 研究使用[Cat's Blender Plugin](https://github.com/absolute-quantum/cats-blender-plugin)和Shotariya的Texture Combiner Blender插件来优化你的模型。 

## 性能提示 {#performance-tips}

- **目标是在出生点有单个VR用户时至少达到45 FPS。** 如果你没有VR，请让朋友帮你测试世界。世界性能不佳意味着人们不会在你的世界中停留，而且你可能很难让它离开Labs。
- **不要使用不兼容VR的着色器。** 着色器必须支持单通道立体渲染。如果你在寻找好的水体着色器，[查看Silent的Water Shader](https://gitlab.com/s-ilent/clear-water)。
- **在Android上使用移动端着色器。** 大多数着色器在Android上_可以_工作，但通常需要更多处理能力来渲染。尽可能坚持使用移动端着色器。
- **为世界内UI使用超级采样着色器。** 这是一种在VR中获得清晰文本的性能友好方式。如果SDK发现任何使用Unity内置UI着色器的UI材质，它会建议切换。
- **对后处理效果要非常小心。** 一些屏幕空间后处理效果会给VR用户带来重大问题。特别要小心色差、屏幕空间反射和屏幕空间环境光遮蔽。 
- **在房间里放超过2个视频播放器会发生糟糕的事情。** 这通常会对性能产生负面影响。
- **在房间里放超过1面镜子也会发生糟糕的事情。** 镜子会严重影响世界性能。如果房间里有1面镜子，请确保将其设置为可切换。
- **我们** **_强烈建议_** **不要默认启用镜子。** 添加一个可由玩家激活，或在玩家进入特定区域时自动激活的开关。
- **不要过度使用实时光。** 它们**非常**昂贵，如果使用不当，可能会拖垮世界的性能。
- **烘焙光照极其重要，可以带来巨大的性能提升。** 你可以在[Unity文档](https://docs.unity3d.com/Manual/progressive-lightmapper.html)或[Android开发指南](https://developer.android.com/games/optimize/lighting-for-mobile-games-with-unity#lightmap-baking)中了解更多关于光照烘焙的信息。

## 通用提示 {#general-tips}

- 测试你的世界！我们经常看到一些世界，玩家会立刻从传送门掉出去，永远回不来。
- 也要在VR中测试世界。检查你的着色器是否正常工作，并在VR中正确显示。如果你没有VR头显，请让朋友四处看看。
- **_测试你的光照！_** 为世界打光非常重要，正确打光更是极其重要。不要只用Toon着色器测试，因为它们不能正确表现光照；使用Standard或PBR着色器来查看光照的影响。如果你看起来过曝，可能是灯光太多、强度太高，或者你需要研究使用Tonemapping。
- 想让世界再次变为私有？在网站上编辑世界，即可将其设置为Private。
- 避免直接使用`.blend`文件。从Blender导出FBX文件用于VRChat通常会引起更少的问题。

如果你对该流程有任何疑问，[访问我们的论坛](https://ask.vrchat.com/c/worlds/27)或发送电子邮件至hello@vrchat.com提出你的问题。如果你在应用中举办活动或拥有高流量世界，需要在其他时间将世界公开，请至少提前48小时通过电子邮件与我们联系。

## 提交到Community Labs {#submitting-to-community-labs}

阅读完以上所有内容后，将你的新世界提交到Community Labs！如果你对Community Labs的运作方式感到好奇，请查看我们的[VRChat Community Labs](https://docs.vrchat.com/docs/vrchat-community-labs)文档。

## 成为游戏世界或Avatar世界 {#becoming-a-game-or-avatar-world}

如果你希望世界被归类为Avatar世界或游戏世界，只需在上传时添加相应的标签。


:::caution 不要滥用世界展示位

这些规则旨在让**所有**世界都有机会被发现。不允许使用“类似SEO”的技术，否则将导致标签移除等操作，或在重复/更严重的情况下，对作者进行审核。

VRChat保留对滥用我们系统以不公平或误导性方式推广自己内容的用户采取行动的权利。

:::

### Avatar世界 {#avatar-worlds}

Avatar世界是以分享各种Avatar为主要焦点的世界。在Avatar世界中，Avatar应当快速且易于找到。Avatar不应是事后才想到的或后期才添加的内容。

要将世界归类为Avatar世界，其标题必须包含“avatar”、“avatars”、“avi”或“avis”之一。 

通过在世界标题中包含这些术语之一，它将显示在VRChat菜单的“Avatar World”类别中，使用户更容易发现。

:::caution 不要错误分类你的世界

你的世界包含Avatar，但它不是Avatar世界？

请改为向你的世界添加“avatar”标签。它不会被归类为Avatar世界，但用户仍可以通过搜索“avatar”找到它。

如果Avatar不是你世界的主要焦点，请不要在世界标题中包含“avatar”等术语。你的世界可能会从某些类别中隐藏，使用户更难发现。

:::

### 游戏世界 {#game-worlds}

**游戏世界是以游玩一个游戏或一组游戏为** **_主要焦点_** **的世界。** 在标记为游戏世界的世界中玩游戏应该快速且简单，不应成为世界另一个明显主要功能的事后补充或“附加项”。

要将世界归类为游戏世界，请添加标签`game`。
