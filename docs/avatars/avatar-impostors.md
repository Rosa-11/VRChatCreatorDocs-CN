---
title: "替身"
slug: "avatar-impostors"
hidden: false
---

# 替身 {#impostors}
## 什么是替身？ {#what-are-impostors}
替身是虚拟形象（Avatar）的替代模型，让你在通常会看到回退Avatar或机器人的情况下仍能看到Avatar。它们旨在弥合VRChat中不同系统/用户类型之间的差异。例如，如果某个用户的Avatar仅为Windows上传，VRChat会自动为Quest创建一个可接受的替身。你只能为自己拥有并已上传的Avatar生成替身。

即使你从未上传过Avatar的跨平台版本，或者你的Avatar因其性能等级而被“性能阻止”，其他用户仍然能够看到你Avatar的替身。替身会自动生成，但你也可以通过几个简单步骤更新它们或跳到队列前面。创建替身后，你可以开启和关闭它——关闭时，将改为显示你的回退Avatar。

## 如何创建替身？ {#how-do-i-create-an-impostor}
创建替身的第一步是[创建并上传Avatar](/avatars/creating-your-first-avatar)。

上传Avatar后，为其创建替身就很简单了：

- 登录VRChat网站。

- 导航到你想要为其创建替身的Avatar的信息页面。你可以依次点击“Avatars”、“My Avatars”，然后点击目标Avatar的名称和图标来完成此操作。

- 点击“Generate Impostors”；如果该Avatar已有替身且你希望更新它，则点击“Regenerate Impostors”

- 等待。

- 刷新页面，一段时间后，你应该会看到你的Avatar现在拥有适用于Quest和PC的替身。

![一张vrchat.com上某个Avatar页面的截图。该页面允许Avatar创作者（重新）生成替身，并查看哪些替身已经生成。你可以查看是否为PC和/或Android生成了替身。你还可以查看替身是否已由Avatar创作者自定义。](/img/avatars/impostors/generation.png)

:::note

替身目前仅支持[Humanoid](https://docs.unity3d.com/Manual/AvatarCreationandSetup.html) Avatar。[Generic](https://docs.unity3d.com/Manual/GenericAnimations.html) Avatar将在未来得到支持。

:::

## 预览替身 {#previewing-an-impostor}
生成替身后，你可能会很兴奋地想看看它的效果！别担心，我们已经为你准备好了！

登录VRChat后，打开Avatar菜单，然后点击你为其生成了替身的Avatar。

你应该会注意到，Avatar的“Features”现在包含“Impostor”。 

![VRChat中某个Avatar的“Features”部分的截图。图中显示了一个“Imposter”图标以及其他功能。](/img/avatars/impostors/features-row.png)


你还应该会在Avatar模型预览下方看到一个新按钮，它允许你在查看替身和普通Avatar之间切换，以便快速预览。

![VRChat菜单中正在预览某个Avatar的截图。](/img/avatars/impostors/preview-avatar.png)
![VRChat菜单中正在预览某个Avatar替身的截图。底部附近的一个开关已被启用。](/img/avatars/impostors/preview-impostor.png)

:::note
在菜单中预览的替身可能会比在其他玩家身上查看时显示更多伪影。
:::

## VRCImpostorSettings

替身默认效果就相当不错。不过，复杂的Avatar可能会受益于一些自定义设置。

要自定义替身，请在上传Avatar之前将“VRCImpostorSettings”组件添加到Avatar上。更改此组件的设置可以改变替身的外观。你可以添加多个“VRCImpostorSettings”来自定义不同的身体部位。

### 分辨率缩放 {#resolution-scale}

更改替身纹理图集中专门用于此身体部位纹理的空间大小。
例如，你可以将此脚本放在头部骨骼上并更改此值，使头部占据纹理图集中更多或更少的空间，从而提高或降低整体纹理质量。
请注意，如果需要，这可能会缩小图集上的其他身体部位。


_这是相对于VRCImpostorSettings所放置的骨骼而言的。_


### 要忽略的Transform {#transforms-to-ignore}
在捕获替身数据时忽略这些Transform。这会将它们从最终结果中隐藏。

_这与VRCImpostorSettings所放置的骨骼无关。_

### 额外子Transform {#extra-child-transforms}
这适用于翅膀和尾巴之类的东西；它会告诉Impostorizer为脚本所在的骨骼制作单独的精灵。

以下是一个不应采用的示例——你*可以*在每个手指上放置一个这样的组件，将它们变成独立的精灵。然而，由于所有精灵共享同一张纹理图集，用手指之类的东西填满它会导致其他位置的质量下降——这是一种平衡取舍。

_这与VRCImpostorSettings所放置的骨骼无关。_

### 在此处重新设置父级 {#re-parent-here}
将另一根骨骼重新设置为这个替身精灵的父级。这意味着它将被作为此身体部位的一部分进行替身化，并成为该精灵的一部分。

例如，如果你希望翅膀成为上半身的一部分，可以在替身化过程中使用此设置将翅膀根骨骼重新设置为胸部骨骼的子级。

_这是相对于VRCImpostorSettings所放置的骨骼而言的。_

## 替身何时可见？ {#when-is-an-impostor-visible}
目前，只有三种方式可以看到替身。

- Avatar预览（例如在Avatar的详情页上查看替身）
- 性能阻止（例如，Avatar的性能等级为“Very Poor”，但你的[最低显示性能等级](https://docs.vrchat.com/docs/vrchat-configuration-window#minimum-displayed-performance-rank)被设为“Medium”）。
- 平台不匹配（例如，Avatar是为PC上传的，但你使用的是Android，反之亦然）
