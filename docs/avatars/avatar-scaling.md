---
title: "Avatar 缩放"
slug: "avatar-scaling"
hidden: false
createdAt: "2023-07-26T15:58:00.000Z"
updatedAt: "2023-07-26T15:58:00.000Z"
---

# 关于 Avatar 缩放的技术考量 {#technical-considerations-around-avatar-scaling}

Avatar 缩放让玩家可以更改其当前虚拟形象（Avatar）的高度。

本页记录了 VRChat 的 Avatar 缩放内部工作原理，其详细程度可能有助于围绕该功能开发社区资源。

阅读 [Avatar 事件文档](/worlds/udon/players/player-avatar-scaling) 或我们的[示例脚本](/worlds/examples/udon-example-scene/avatar-scaling-settings)，了解如何在 Udon 中使用 Avatar 缩放。
阅读 [Avatar 参数](/avatars/animator-parameters) 页面，了解与缩放相关的可用 Avatar 参数。


## 术语定义 {#term-definitions}

* **Eye Height**：Avatar 处于 T-Pose 时，其视点相对于 0 的高度（transform 位置中的 Y 分量）。
* **Prefab Height**：缩放处于默认值时 Avatar 的眼高。这是你在 SDK 中通过放置「View Position」所配置的值。
* **Target Eye Height**：Avatar 希望缩放到的眼高，由玩家或 Udon 设置。
* **Avatar Scale**：「Prefab Height」与「Target Eye Height」之间的比值。例如，如果目标为 4.5 米，而预制件高度为 1.5 米，则「Avatar Scale」为 3。

## 取值范围 {#range-of-values}

「Prefab Height」没有限制。你可以在 SDK 中把 Avatar 的「View Position」放在任意高度。但请注意，Avatar 的整体缩放会影响你的性能等级。

对 Udon 而言，「Target Eye Height」被限制在 0.1 到 100 米之间，而动作菜单（Action Menu）中可用的缩放范围为 0.2 到 5.0 米。但通过上传一个超出该范围的 Avatar 并且*不*使用缩放缓钮，你仍然可以突破这些限制。在这种情况下，「Target Eye Height」将等于「Prefab Height」，而后者不受限制。

这一限制意味着 Udon *必须*在「avatar eye height changed」事件上重新应用缩放，以完全强制执行缩放。否则，用户可以通过切换到更矮或更高的 Avatar 来绕过世界所设定的限制。

在通过网站禁用缩放的世界中，「Target Eye Height」将*始终*等于「Prefab Height」。

## 缩放的应用方式 {#how-scaling-is-applied}

对 Avatar 进行缩放的方式是更改其根 transform 的「localScale」。**该缩放会被强制执行**。除了与 Avatar 缩放相关的 Udon 函数外，没有用户可用的方式可以覆盖 Avatar 根部的缩放。

每当缩放发生变化时（即每当你切换 Avatar，或重置/重新加载当前 Avatar 时），Avatar 会在本地被「重新测量」。该过程会调整你的视点以匹配新高度，并重新定位一些内部组件，例如你的语音位置。

缩放会以「eye height」的形式为每位玩家自动同步，并量化为 3 位小数。对于远程用户，每当收到新的高度时，缩放变化会在一小段时间内平滑过渡。

在动作菜单中使用缩放缓钮时，你的 Avatar 只会在镜子中被缩放。在缓钮上确认缩放后，新缩放会立即应用到你的 Avatar，然后发送给远程用户。
