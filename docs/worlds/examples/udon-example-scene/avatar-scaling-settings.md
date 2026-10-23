---
title: "虚拟形象缩放设置"
slug: "avatar-scaling-settings"
excerpt: "在你的世界中配置虚拟形象缩放"
hidden: true
createdAt: "2023-06-24T00:00:00.076Z"
updatedAt: "2023-06-24T00:00:00.070Z"
---

这个UdonBehaviour示例脚本让你可以轻松覆盖你的世界的虚拟形象缩放设置。

要了解如何为虚拟形象缩放编写自己的Udon脚本，请阅读我们的[虚拟形象缩放文档](/worlds/udon/players/player-avatar-scaling)。

![avatar-scaling-example-component.png](/img/worlds/udon/avatar-scaling-example-component.png)

## 变量 {#variables}

| 名称 | 类型 | 默认值 | 说明 |
| - | - | - | - |
| **disableAvatarScaling** | bool | false | | 如果启用，你的世界中的玩家将无法自行选择虚拟形象缩放，即使你在VRChat.com上启用了该功能。 |
| **minimumHeight** | float | 0.2 | 玩家可以选择的最小虚拟形象眼睛高度，单位为米。 |
| **maximumHeight** | float | 5 | 玩家可以选择的最大虚拟形象眼睛高度，单位为米。 |
| **alwaysEnforceHeight** | bool | false | 如果启用，切换到非常高或非常矮的虚拟形象的玩家将被自动设置为“minimumHeight”或“maximumHeight”。
 
## 示例 {#examples}

- 我希望玩家可以自由使用虚拟形象缩放。
	- 你不需要更改任何设置。
- 我不希望玩家使用虚拟形象缩放。
	- 打开“disableAvatarScaling”。
- 我希望玩家使用特定的虚拟形象身高。
	- 按你的偏好设置“minimumHeight”和“maximumHeight”。
	- 如果你想防止非常高或非常矮的虚拟形象，请启用“alwaysEnforceHeight”。

示例脚本的Udon Graph如下所示：

![avatar-scaling-example-component.png](/img/worlds/udon/avatar-scaling-example-graph.png)
