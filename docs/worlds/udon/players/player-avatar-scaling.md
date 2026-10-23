---
title: "玩家虚拟形象缩放"
slug: "player-avatar-scaling"
hidden: false
createdAt: "2023-06-22T01:23:45.678Z"
updatedAt: "2023-07-19T01:23:45.678Z"
---
Udon 提供了让世界创作者能够执行以下操作的函数：
- 允许或强制启用虚拟形象缩放功能与参数。
- 对玩家身高变化做出响应。

要查看与这些函数配合使用的相关事件，包括 "OnAvatarChanged" 和 "OnAvatarEyeHeightChanged"，请参阅[虚拟形象事件](/worlds/udon/avatar-events)。

:::note 缩放与碰撞
请注意，将虚拟形象缩放到其他尺寸**不会**影响其与环境的碰撞——就像在 Unity 中放大虚拟形象后再上传也不会影响碰撞一样。
:::

虚拟形象缩放以两种模式运行，并且可以按玩家逐个单独调整：

1. 玩家控制模式，在该模式下允许玩家使用其动作菜单中的径向控制盘或其快捷菜单中的 "Match Eye Height" 按钮来调整自己的身高。
2. 世界权威模式，在该模式下这些功能被禁用，玩家身高只能由运行在世界中的 Udon 程序设置。

无论哪种情况，虚拟形象变化和视点高度变化都会触发 "OnAvatarChanged" 和 "OnAvatarEyeHeightChanged" 事件，以便 Udon 程序能够对这些情况做出响应。

:::note 默认由玩家控制

目前，虚拟形象缩放默认以玩家控制模式运行。如果你希望以世界权威模式运行，必须在网站上或使用下方的 Udon 函数将其禁用。

:::

玩家控制模式的范围为 0.2 米到 5 米，Udon 可以设置 0.01 米到 10000 米之间的值。请注意，0.1 米到 100 米之外的范围不受 VRChat 官方支持，并且可能导致不良后果，例如 UI 出错或运行不稳定。

## 通过网站禁用玩家控制的缩放 {#disabling-player-controlled-scaling-via-the-website}
如果你只是想禁用世界中的虚拟形象缩放系统，可以登录 [VRChat 网站的 My Worlds 部分](https://vrchat.com/home/content/worlds)，选择你的世界，将其关闭，然后保存更改。

![这真的很简单！](/img/worlds/udon/website_avatar_scaling_enabled.png)

当你通过网站禁用虚拟形象缩放后，该系统中的功能会在你的世界中对玩家完全禁用。他们将只能以默认体型使用你的世界，虚拟形象缩放相关的菜单组件将被禁用。

因此，当通过网站禁用虚拟形象缩放后，以下 `VRCPlayerApi` 函数对 Udon 不可用，使用它们不会产生任何效果：`SetManualAvatarScalingAllowed`、`SetAvatarEyeHeightMinimumByMeters`、`SetAvatarEyeHeightMaximumByMeters`、`SetAvatarEyeHeightByMeters`、`SetAvatarEyeHeightByMultiplier`。

如果你希望保留对这些 Udon 函数的访问权限，但不想让用户能够通过其动作菜单中的径向控制盘自行缩放，请保持通过网站启用的虚拟形象缩放，并改用 Udon 通过 `SetManualAvatarScalingAllowed` 禁用玩家控制的虚拟形象缩放模式。

## 用于玩家控制缩放的函数 {#functions-for-player-controlled-scaling}
:::note 仅限本地玩家
除非另有说明，下方所有函数只能由影响本地玩家的 Udon 程序使用，并且无法成功在属于其他玩家的 `VRCPlayerApi` 对象上调用。
:::

### GetManualAvatarScalingAllowed
检查是否允许本地玩家控制其虚拟形象缩放。

**输出**
- `bool`：如果本地玩家处于玩家控制的虚拟形象缩放模式则为 `true`，如果处于世界权威的虚拟形象缩放模式则为 `false`。

### SetManualAvatarScalingAllowed
在玩家控制模式与世界权威模式之间切换。

**输入**
- `bool`：`true` 设置为玩家控制模式，`false` 设置为世界权威模式。

### GetAvatarEyeHeightMinimumAsMeters

返回在玩家控制的虚拟形象缩放模式下，允许本地玩家缩放自身至的最小视点高度（以米为单位）。（大于或等于 0.2 米。）

**输出**
- `float`：最小视点高度（以米为单位）。

### SetAvatarEyeHeightMinimumByMeters
设置在玩家控制的虚拟形象缩放模式下，允许本地玩家缩放自身至的最小身高（以米为单位）。（必须大于或等于 0.2 米。）

**输入**
- `float`：设置虚拟形象的最小视点高度（以米为单位）。

### GetAvatarEyeHeightMaximumAsMeters

返回在玩家控制的虚拟形象缩放模式下，允许本地玩家缩放自身至的最大视点高度。（小于或等于 5 米）

**输出**
- `float`：虚拟形象的最大视点高度（以米为单位）。

### SetAvatarEyeHeightMaximumByMeters
设置允许本地玩家在玩家控制的虚拟形象缩放模式下缩放自身至的最大视点高度（以米为单位）。（必须小于或等于 5 米。）

**输入**
- `float`：设置虚拟形象的最大视点高度（以米为单位）。

## 用于世界权威缩放的函数 {#functions-for-world-authoritative-scaling}

:::note 仅限本地玩家
除非另有说明，下方所有函数只能由影响本地玩家的 Udon 程序使用，并且无法成功在属于其他玩家的 `VRCPlayerApi` 对象上调用。
:::

### GetAvatarEyeHeightAsMeters

返回目标玩家虚拟形象所配置的视点高度。此函数对本地玩家**和**远程玩家均有效。

**输出**
- `float`：目标玩家虚拟形象所配置的视点高度。

### SetAvatarEyeHeightByMeters

**输入**
- `float`：设置当前玩家虚拟形象的视点高度（以米为单位）。

### SetAvatarEyeHeightByMultiplier

**输入**
- `float`：以目标玩家虚拟形象在预制件缩放比例下视点高度的倍数来设置视点高度。
